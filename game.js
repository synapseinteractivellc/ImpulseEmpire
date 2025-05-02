// Main Game Logic for Impulse Empire

// Game state
let gameState;
let oldGameState;

// Create a new game state
function newGame() {
    gameState = {
        tutorialSeen: false,
        lastUpdate: Date.now(),
        energy: 0,
        totalEnergy: 0,
        clickPower: 1,
        energyPerSecond: 0,
        totalClicks: 0,
        playTime: 0,
        offlineProductionRate: 0.25, // 25% of normal production
        maxOfflineTime: 8 * 60 * 60, // 8 hours default cap
        buildings: initBuildings(),
        upgrades: initUpgrades()
    };

    // Initialize Achievements and Prestige
    initAchievements();
    initPrestige();
    
    // Make sure to calculate energy per second
    calculateEnergyPerSecond();
    
    return gameState;
}

// Initialize the game
function initGame() {
    const savedGame = loadGame();
    if (!savedGame) {
        newGame();
    } else {
        // Calculate offline progress when loading a saved game
        calculateOfflineProgress();
    }
    
    // Update visibility of buildings and upgrades
    updateVisibility();
    
    tutorialSeen();
    renderBuildings();
    renderUpgrades();
    renderAchievements();
    renderPrestige();
    updateDisplay();
    startGameLoop();

    // Event listeners
    document.getElementById('impulse-button').addEventListener('click', clickImpulse);
}

// Main game loop
function startGameLoop() {
    setInterval(function() {
        const now = Date.now();
        const deltaTime = (now - gameState.lastUpdate) / 1000; // Convert to seconds
        gameState.lastUpdate = now;
        
        // Add energy from buildings
        const energyToAdd = gameState.energyPerSecond * deltaTime;
        gameState.energy += energyToAdd;
        gameState.totalEnergy += energyToAdd;
        
        // Update play time
        gameState.playTime += deltaTime;
        
        // Call the building effects calculation
        calculateBuildingEffects();
        
        // Check for new unlocks
        updateVisibility();

        // Check for achievements
        checkAchievements();
        
        updateDisplay();
        saveGame();
    }, 100); // Update 10 times per second
}

// Function to calculate offline progress
function calculateOfflineProgress() {
    const now = Date.now();
    const lastTimestamp = gameState.lastUpdate;
    const deltaTimeSeconds = (now - lastTimestamp) / 1000;
    
    // Only calculate if player has been away for at least 10 seconds
    if (deltaTimeSeconds < 10) return;
    
    // Cap offline progress based on maxOfflineTime
    const cappedTime = Math.min(deltaTimeSeconds, gameState.maxOfflineTime);
    
    // Apply the offline production rate
    const offlineProduction = gameState.energyPerSecond * cappedTime * gameState.offlineProductionRate;
    
    // Apply the offline earnings
    gameState.energy += offlineProduction;
    gameState.totalEnergy += offlineProduction;
    gameState.playTime += cappedTime;
    gameState.lastUpdate = now;

    // Check for achievements
    checkAchievements();
    
    // Show the welcome back modal
    showOfflineProgressModal(offlineProduction, cappedTime);
}

// Function to display the offline progress modal
function showOfflineProgressModal(production, timeAwaySeconds) {
    // Create the modal container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'offline-modal-container';
    
    // Format the time away
    let timeAwayFormatted;
    if (timeAwaySeconds < 60) {
        timeAwayFormatted = `${Math.round(timeAwaySeconds)} seconds`;
    } else if (timeAwaySeconds < 3600) {
        timeAwayFormatted = `${Math.round(timeAwaySeconds / 60)} minutes`;
    } else if (timeAwaySeconds < 86400) {
        timeAwayFormatted = `${Math.round(timeAwaySeconds / 3600 * 10) / 10} hours`;
    } else {
        timeAwayFormatted = `${Math.round(timeAwaySeconds / 86400 * 10) / 10} days`;
    }

    // Calculate what percentage of max time was used
    const maxTimePercent = Math.min(100, Math.round((timeAwaySeconds / gameState.maxOfflineTime) * 100));
    
    // Create the modal content
    modalContainer.innerHTML = `
        <div class="offline-modal">
            <h2>Welcome Back!</h2>
            <p>You were away for ${timeAwayFormatted}.</p>
            <p>Your neurons generated <span class="energy-gained">${formatNumber(production)}</span> Impulse Energy while you were away!</p>
            <div class="offline-stats">
                <div class="offline-stat">
                    <span class="stat-label">Efficiency:</span>
                    <span class="stat-value">${Math.round(gameState.offlineProductionRate * 100)}%</span>
                </div>
                <div class="offline-stat">
                    <span class="stat-label">Time Cap:</span>
                    <span class="stat-value">${maxTimePercent}% used</span>
                </div>
            </div>
            <div class="energy-icon">⚡</div>
            <button class="collect-button">Collect</button>
        </div>
    `;
    
    // Add the modal to the document
    document.body.appendChild(modalContainer);
    
    // Add event listener to the collect button
    const collectButton = modalContainer.querySelector('.collect-button');
    collectButton.addEventListener('click', () => {
        // Add a closing animation
        const modal = modalContainer.querySelector('.offline-modal');
        modal.classList.add('closing');
        
        // Remove the modal after animation completes
        setTimeout(() => {
            modalContainer.remove();
        }, 500);
        
        // Update the display
        updateDisplay();
    });
}

// Handle clicking the impulse button
function clickImpulse() {
    trackClickForSpeedyNeuron();

    let energyPerClick = gameState.clickPower;

    // Check for click synergy upgrades 
    // This uses the new getClickSynergyBonus function from upgrades.js
    const synergyBonus = window.getClickSynergyBonus ? window.getClickSynergyBonus() : 0;
    if (synergyBonus > 0) {
        energyPerClick += synergyBonus;
    }

    energyPerClick = Math.floor(energyPerClick);

    gameState.energy += energyPerClick;
    gameState.totalEnergy += energyPerClick;
    gameState.totalClicks++;
    
    // Create floating text effect
    const button = document.getElementById('impulse-button');
    const rect = button.getBoundingClientRect();
    const floatingText = document.createElement('div');
    floatingText.textContent = `+${energyPerClick}`;
    floatingText.className = 'floating-text';
    floatingText.style.left = `${rect.left + rect.width / 2}px`;
    floatingText.style.top = `${rect.top}px`;
    document.body.appendChild(floatingText);
    
    // Remove floating text after animation ends
    setTimeout(() => {
        floatingText.remove();
    }, 2000);
    
    // Check for achievements
    checkAchievements();

    updateVisibility(); // Check for new buildings/upgrades to show
    updateDisplay();
}

// Update visibility of buildings and upgrades
function updateVisibility() {
    updateBuildingVisibility();
    updateUpgradeVisibility();
}

// Update display elements
function updateDisplay() {
    document.getElementById('energy').textContent = formatNumber(gameState.energy);
    document.getElementById('energy-per-second').textContent = gameState.energyPerSecond.toFixed(2);
    document.getElementById('total-energy').textContent = formatNumber(gameState.totalEnergy);
    document.getElementById('total-clicks').textContent = gameState.totalClicks;
    document.getElementById('play-time').textContent = formatNumber(gameState.playTime);

    // Update achievements count in stats
    if (gameState.achievements) {
        const achievementsUnlocked = document.getElementById('achievements-unlocked');
        if (achievementsUnlocked) {
            achievementsUnlocked.textContent = `${gameState.achievements.totalAchieved}/${gameState.achievements.list.length}`;
        }
    }

    document.getElementById('prestige-count').textContent = gameState.prestige ? gameState.prestige.prestigeCount : 0;
    document.getElementById('total-npp-earned').textContent = gameState.prestige ? formatNumber(gameState.prestige.totalNPPEarned) : 0;
    
    // Update buildings that can be afforded
    const buildingElements = document.querySelectorAll('.building');
    buildingElements.forEach((element, index) => {
        const visibleBuildings = gameState.buildings.filter(b => b.visible);
        if (index < visibleBuildings.length) {
            const building = visibleBuildings[index];
            if (gameState.energy >= building.cost) {
                element.classList.remove('disabled');
            } else {
                element.classList.add('disabled');
            }
        }
    });
    
    // Update upgrades that can be afforded
    const visibleUpgrades = gameState.upgrades.filter(u => !u.purchased && u.visible);
    const upgradeElements = document.querySelectorAll('.upgrade');
    upgradeElements.forEach((element, index) => {
        if (index < visibleUpgrades.length) {
            const upgrade = visibleUpgrades[index];
            if (gameState.energy >= upgrade.cost && upgrade.requirement()) {
                element.classList.remove('disabled');
            } else {
                element.classList.add('disabled');
            }
        }
    });
}

// Save game to local storage
function saveGame() {
    const saveData = {
        tutorialSeen: gameState.tutorialSeen,
        lastUpdate: gameState.lastUpdate,
        energy: gameState.energy,
        totalEnergy: gameState.totalEnergy,
        clickPower: gameState.clickPower,
        totalClicks: gameState.totalClicks,
        playTime: gameState.playTime,
        offlineProductionRate: gameState.offlineProductionRate,
        maxOfflineTime: gameState.maxOfflineTime,
        buildings: gameState.buildings.map(b => ({
            id: b.id,
            cost: b.cost,
            count: b.count,
            baseProduction: b.baseProduction, // Save the modified baseProduction
            production: b.production,
            visible: b.visible
        })),
        upgrades: gameState.upgrades.map(u => ({
            id: u.id,
            purchased: u.purchased,
            visible: u.visible
        })),
        achievements: gameState.achievements ? {
            totalAchieved: gameState.achievements.totalAchieved,
            list: gameState.achievements.list.map(a => ({
                id: a.id,
                achieved: a.achieved,
                progress: a.progress
            }))
        } : null,
        prestige: {
            neuralPlasticityPoints: gameState.prestige.neuralPlasticityPoints,
            totalNPPEarned: gameState.prestige.totalNPPEarned,
            prestigeCount: gameState.prestige.prestigeCount,
            lastResetTime: gameState.prestige.lastResetTime,
            upgrades: gameState.prestige.upgrades.map(u => ({
                id: u.id,
                level: u.level,
                currentCost: u.currentCost
            })),
            specialUnlocks: gameState.prestige.specialUnlocks.map(u => ({
                id: u.id,
                purchased: u.purchased,
                options: u.options
            }))
        }
    };
    
    localStorage.setItem('impulseEmpire', JSON.stringify(saveData));
}

function loadGame() {
    const saveData = localStorage.getItem('impulseEmpire');
    if (saveData) {
        const parsedData = JSON.parse(saveData);
        
        // Start with a fresh game state
        newGame();
        
        gameState.tutorialSeen = parsedData.tutorialSeen || false;
        gameState.lastUpdate = parsedData.lastUpdate || Date.now();
        gameState.energy = parsedData.energy || 0;
        gameState.totalEnergy = parsedData.totalEnergy || 0;
        gameState.clickPower = parsedData.clickPower || 1;
        gameState.totalClicks = parsedData.totalClicks || 0;
        gameState.playTime = parsedData.playTime || 0;
        gameState.offlineProductionRate = parsedData.offlineProductionRate || 0.25;
        gameState.maxOfflineTime = parsedData.maxOfflineTime || 8 * 60 * 60;
        
        if (parsedData.buildings) {
            parsedData.buildings.forEach(savedBuilding => {
                const building = gameState.buildings.find(b => b.id === savedBuilding.id);
                if (building) {
                    building.count = savedBuilding.count || 0;
                    building.cost = savedBuilding.cost || building.baseCost;
                    // Load the saved baseProduction value which includes all upgrade effects
                    if (savedBuilding.baseProduction !== undefined) {
                        building.baseProduction = savedBuilding.baseProduction;
                    }
                    // Load the saved production value
                    building.production = savedBuilding.production || 0;
                    building.visible = savedBuilding.visible || false;
                }
            });
        }
        
        if (parsedData.upgrades) {
            parsedData.upgrades.forEach(savedUpgrade => {
                const upgrade = gameState.upgrades.find(u => u.id === savedUpgrade.id);
                if (upgrade) {
                    upgrade.purchased = savedUpgrade.purchased || false;      
                    upgrade.visible = savedUpgrade.visible || false;
                    // We don't reapply upgrade effects here - the effects should already be reflected
                    // in the saved state of the game (clickPower, building production, etc.)
                }
            });
        }

        // Load achievement data
        if (parsedData.achievements && gameState.achievements) {
            gameState.achievements.totalAchieved = parsedData.achievements.totalAchieved || 0;
            
            if (parsedData.achievements.list) {
                parsedData.achievements.list.forEach(savedAchievement => {
                    const achievement = gameState.achievements.list.find(a => a.id === savedAchievement.id);
                    if (achievement) {
                        achievement.achieved = savedAchievement.achieved || false;
                        achievement.progress = savedAchievement.progress || 0;
                    }
                });
            }
        }

        // Load prestige data
        if (parsedData.prestige) {
            gameState.prestige.neuralPlasticityPoints = parsedData.prestige.neuralPlasticityPoints || 0;
            gameState.prestige.totalNPPEarned = parsedData.prestige.totalNPPEarned || 0;
            gameState.prestige.prestigeCount = parsedData.prestige.prestigeCount || 0;
            gameState.prestige.lastResetTime = parsedData.prestige.lastResetTime || 0;
            
            if (parsedData.prestige.upgrades) {
                parsedData.prestige.upgrades.forEach(savedUpgrade => {
                    const upgrade = gameState.prestige.upgrades.find(u => u.id === savedUpgrade.id);
                    if (upgrade) {
                        upgrade.level = savedUpgrade.level || 0;
                        upgrade.currentCost = savedUpgrade.currentCost || upgrade.cost;
                    }
                });
            }
            
            if (parsedData.prestige.specialUnlocks) {
                parsedData.prestige.specialUnlocks.forEach(savedUnlock => {
                    const unlock = gameState.prestige.specialUnlocks.find(u => u.id === savedUnlock.id);
                    if (unlock) {
                        unlock.purchased = savedUnlock.purchased || false;
                        if (savedUnlock.options) {
                            unlock.options = savedUnlock.options;
                        }
                    }
                });
            }
        } else {
            initPrestige();
        }
        
        // Apply prestige upgrades effects
        if (gameState.prestige) {
            applyPrestigeUpgrades();
        }
        
        // Make sure to recalculate production values
        calculateBuildingEffects();
        calculateEnergyPerSecond();
        tutorialSeen();
        return true;
    }
    return false;
}

// Reset game
function resetGame() {
    if (confirm('Are you sure you want to reset your game? ALL progress will be lost; even PRESTIGE progress!')) {
        // Clean up prestige-related intervals
        if (typeof cleanupPrestigeIntervals === 'function') {
            cleanupPrestigeIntervals();
        }
        
        // Clear any other intervals that might be running
        const highestTimeoutId = setTimeout(() => {}, 0);
        for (let i = 0; i < highestTimeoutId; i++) {
            clearTimeout(i);
            clearInterval(i);
        }
        
        localStorage.removeItem('impulseEmpire');
        
        // Force a page reload after resetting
        window.location.reload();
    }
}

// Tab navigation
function openTab(tabName) {
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    const tabs = document.getElementsByClassName('tab');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    
    document.getElementById(tabName).classList.add('active');
    
    // Find and activate the tab button
    const tabButtons = document.getElementsByClassName('tab');
    for (let i = 0; i < tabButtons.length; i++) {
        if (tabButtons[i].textContent.toLowerCase().includes(tabName.toLowerCase())) {
            tabButtons[i].classList.add('active');
        }
    }
    
    // If switching to achievements tab, check and render achievements
    if (tabName === 'achievements') {
        checkAchievements();
        renderAchievements();
    }
}

// Tutorial handling
function tutorialClicked() {
    gameState.tutorialSeen = true;
    document.getElementById('tutorial').style.display='none';
}

function tutorialSeen() {
    if (gameState.tutorialSeen){
        document.getElementById('tutorial').style.display='none';
    }
}

// Format large numbers
function formatNumber(num) {
    if (num >= 1000000000000) {
        return (num / 1000000000000).toFixed(1) + 'T';
    } else if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return Math.floor(num);
    }
}

// Export global functions
window.newGame = newGame;
window.initGame = initGame;
window.startGameLoop = startGameLoop;
window.calculateOfflineProgress = calculateOfflineProgress;
window.showOfflineProgressModal = showOfflineProgressModal;
window.clickImpulse = clickImpulse;
window.updateVisibility = updateVisibility;
window.updateDisplay = updateDisplay;
window.saveGame = saveGame;
window.loadGame = loadGame;
window.resetGame = resetGame;
window.openTab = openTab;
window.tutorialClicked = tutorialClicked;
window.tutorialSeen = tutorialSeen;
window.formatNumber = formatNumber;

// Initialize the game when the page loads
window.onload = initGame;