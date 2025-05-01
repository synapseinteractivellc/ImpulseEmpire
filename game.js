// Game state
let gameState;

// Create a new game state
function newGame() {
    gameState = {
        tutorialSeen: false,
        energy: 0,
        totalEnergy: 0,
        clickPower: 1,
        energyPerSecond: 0,
        totalClicks: 0,
        playTime: 0,
        lastUpdate: Date.now(),
        buildings: [
            {
                id: 'neuron',
                name: 'Basic Neuron',
                baseDescription: 'Generates 0.1 impulse energy per second',
                buildingDescription: 'Generates 0.1 impulse energy per second',
                baseCost: 10,
                cost: 10,
                count: 0,
                baseProduction: 0.1,
                production: 0,  // Set initial production to 0
                costMultiplier: 1.15
            },
            {
                id: 'dendrite',
                name: 'Dendrite Collector',
                baseDescription: 'Generates 0.5 impulse energy per second',
                buildingDescription: 'Generates 0.5 impulse energy per second',
                baseCost: 100,
                cost: 100,
                count: 0,
                baseProduction: 0.5,
                production: 0,  // Set initial production to 0
                costMultiplier: 1.15
            },
            {
                id: 'axon_terminal',
                name: 'Axon Terminal',
                baseDescription: 'Generates 2.5 impulse energy per second',
                buildingDescription: 'Generates 2.5 impulse energy per second',
                baseCost: 500,
                cost: 500,
                count: 0,
                baseProduction: 2.5,
                production: 0,  // Set initial production to 0
                costMultiplier: 1.15
            },
            {
                id: 'myelin_sheath',
                name: 'Myelin Sheath',
                baseDescription: 'Generates 6.25 impulse energy per second',
                buildingDescription: 'Generates 6.25 impulse energy per second',
                baseCost: 2500,
                cost: 2500,
                count: 0,
                baseProduction: 6.25,
                production: 0,  // Set initial production to 0
                costMultiplier: 1.15
            },
        ],
        upgrades: [
            {
                id: 'better-clicks',
                name: 'Enhanced Impulses',
                description: 'Double your click power',
                cost: 50,
                purchased: false,
                effect: function() {
                    gameState.clickPower *= 2;
                    updateClickPower();
                },
                requirement: function() {
                    return gameState.totalClicks >= 10;
                }
            },
            {
                id: 'neuron-boost',
                name: 'Efficient Neurons',
                description: 'Basic Neurons are twice as effective',
                cost: 200,
                purchased: false,
                effect: function() {
                    const neuron = gameState.buildings.find(b => b.id === 'neuron');
                    neuron.baseProduction = neuron.baseProduction * 2;
                    calculateEnergyPerSecond();
                },
                requirement: function() {
                    return gameState.buildings.find(b => b.id === 'neuron').count >= 5;
                }
            },
            {
                id: 'dendrite-boost',
                name: 'Efficient Dendrites',
                description: 'Dendrite Collectors are twice as effective',
                cost: 2000,
                purchased: false,
                effect: function() {
                    const dendrite = gameState.buildings.find(b => b.id === 'dendrite');
                    dendrite.baseProduction = dendrite.baseProduction * 2;
                    calculateEnergyPerSecond();
                },
                requirement: function() {
                    return gameState.buildings.find(b => b.id === 'dendrite').count >= 10;
                }
            }
        ]
    };
    
    // Make sure to calculate energy per second
    calculateEnergyPerSecond();
    
    return gameState;
}

// Initialize the game
function initGame() {
    const savedGame = loadGame();
    if (!savedGame) {
        newGame();
    }
    renderBuildings();
    renderUpgrades();
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
        
        updateDisplay();
        saveGame();
    }, 100); // Update 10 times per second
}

// Handle clicking the impulse button
function clickImpulse() {
    gameState.energy += gameState.clickPower;
    gameState.totalEnergy += gameState.clickPower;
    gameState.totalClicks++;
    
    // Create floating text effect
    const button = document.getElementById('impulse-button');
    const rect = button.getBoundingClientRect();
    const floatingText = document.createElement('div');
    floatingText.textContent = `+${gameState.clickPower}`;
    floatingText.className = 'floating-text';
    floatingText.style.left = `${rect.left + rect.width / 2}px`;
    floatingText.style.top = `${rect.top}px`;
    document.body.appendChild(floatingText);
    
    // Remove floating text after animation ends
    setTimeout(() => {
        floatingText.remove();
    }, 2000);
    
    updateDisplay();
}

// Update click power display
function updateClickPower() {
    // We could update a display of the click power here
}

// Calculate energy per second
function calculateEnergyPerSecond() {
    gameState.energyPerSecond = gameState.buildings.reduce((total, building) => {
        // Only add production if the building count is greater than 0
        return total + (building.count > 0 ? building.production : 0);
    }, 0);
}

// Purchase a building
function purchaseBuilding(buildingId) {
    const building = gameState.buildings.find(b => b.id === buildingId);
    
    if (gameState.energy >= building.cost) {
        gameState.energy -= building.cost;
        building.count++;
        // Update production based on count and baseProduction
        building.production = building.baseProduction * building.count;
        building.cost = Math.floor(building.baseCost * Math.pow(building.costMultiplier, building.count));
        
        calculateEnergyPerSecond();
        renderBuildings();
        renderUpgrades(); // Re-render upgrades in case requirements are met
        updateDisplay();
    }
}

// Purchase an upgrade
function purchaseUpgrade(upgradeId) {
    const upgrade = gameState.upgrades.find(u => u.id === upgradeId);
    
    if (!upgrade.purchased && gameState.energy >= upgrade.cost && upgrade.requirement()) {
        gameState.energy -= upgrade.cost;
        upgrade.purchased = true;
        upgrade.effect();
        
        renderUpgrades();
        renderBuildings();
        updateDisplay();
    }
}

// Render buildings
function renderBuildings() {
    const container = document.getElementById('buildings-container');
    container.innerHTML = '';
    
    gameState.buildings.forEach(building => {
        const element = document.createElement('div');
        element.className = 'building';
        if (gameState.energy < building.cost) {
            element.className += ' disabled';
        }
        
        // Dynamic description that shows the current production
        const dynamicDescription = `Each one generates ${building.baseProduction.toFixed(2)} impulse energy per second`;
        const dynamicBuildingDescription = `Generates ${building.production.toFixed(2)} impulse energy per second`;
        
        element.innerHTML = `
            <div class="building-info">
                <div class="building-name">${building.name}</div>
                <div class="building-description">${dynamicDescription}</div>
                <div class="building-description">${dynamicBuildingDescription}</div>
                <div class="building-cost">Cost: ${Math.floor(building.cost)} Impulse Energy</div>
            </div>
            <div class="building-count">${building.count}</div>
        `;
        
        element.addEventListener('click', () => purchaseBuilding(building.id));
        container.appendChild(element);
    });
}

// Render upgrades
function renderUpgrades() {
    const container = document.getElementById('upgrades-container');
    container.innerHTML = '';
    
    gameState.upgrades.forEach(upgrade => {
        if (!upgrade.purchased) {
            const meetsRequirement = upgrade.requirement();
            const element = document.createElement('div');
            element.className = 'upgrade';
            
            if (!meetsRequirement || gameState.energy < upgrade.cost) {
                element.className += ' disabled';
            }
            
            element.innerHTML = `
                <div class="upgrade-name">${upgrade.name}</div>
                <div class="upgrade-description">${upgrade.description}</div>
                <div class="upgrade-cost">Cost: ${upgrade.cost} Impulse Energy</div>
            `;
            
            if (meetsRequirement) {
                element.addEventListener('click', () => purchaseUpgrade(upgrade.id));
            }
            
            container.appendChild(element);
        }
    });
}

// Update display elements
function updateDisplay() {
    document.getElementById('energy').textContent = Math.floor(gameState.energy);
    document.getElementById('energy-per-second').textContent = gameState.energyPerSecond.toFixed(2);
    document.getElementById('total-energy').textContent = Math.floor(gameState.totalEnergy);
    document.getElementById('total-clicks').textContent = gameState.totalClicks;
    document.getElementById('play-time').textContent = Math.floor(gameState.playTime);
    
    // Update buildings that can be afforded
    const buildingElements = document.querySelectorAll('.building');
    buildingElements.forEach((element, index) => {
        if (gameState.energy >= gameState.buildings[index].cost) {
            element.classList.remove('disabled');
        } else {
            element.classList.add('disabled');
        }
    });
    
    // Update upgrades that can be afforded
    const visibleUpgrades = gameState.upgrades.filter(u => !u.purchased);
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
        energy: gameState.energy,
        totalEnergy: gameState.totalEnergy,
        clickPower: gameState.clickPower,
        totalClicks: gameState.totalClicks,
        playTime: gameState.playTime,
        buildings: gameState.buildings.map(b => ({
            id: b.id,
            count: b.count,
            cost: b.cost,
            production: b.production,
            baseProduction: b.baseProduction
        })),
        upgrades: gameState.upgrades.map(u => ({
            id: u.id,
            purchased: u.purchased
        }))
    };
    
    localStorage.setItem('impulseEmpire', JSON.stringify(saveData));
}

// Load game from local storage
function loadGame() {
    const saveData = localStorage.getItem('impulseEmpire');
    if (saveData) {
        const parsedData = JSON.parse(saveData);
        
        // Start with a fresh game state
        newGame();
        
        
        gameState.tutorialSeen = parsedData.tutorialSeen || false;
        gameState.energy = parsedData.energy || 0;
        gameState.totalEnergy = parsedData.totalEnergy || 0;
        gameState.clickPower = parsedData.clickPower || 1;
        gameState.totalClicks = parsedData.totalClicks || 0;
        gameState.playTime = parsedData.playTime || 0;
        
        if (parsedData.buildings) {
            parsedData.buildings.forEach(savedBuilding => {
                const building = gameState.buildings.find(b => b.id === savedBuilding.id);
                if (building) {
                    building.count = savedBuilding.count || 0;
                    building.cost = savedBuilding.cost || building.baseCost;
                    building.production = savedBuilding.production || 0;
                }
            });
        }
        
        if (parsedData.upgrades) {
            parsedData.upgrades.forEach(savedUpgrade => {
                const upgrade = gameState.upgrades.find(u => u.id === savedUpgrade.id);
                if (upgrade) {
                    upgrade.purchased = savedUpgrade.purchased || false;                    
                }
            });
        }
        
        calculateEnergyPerSecond();
        tutorialSeen();
        return true;
    }
    return false;
}

// Reset game
function resetGame() {
    if (confirm('Are you sure you want to reset your game? All progress will be lost!')) {
        localStorage.removeItem('impulseEmpire');
        
        // Reset game state to initial values
        newGame();
        
        // Update display with reset values
        calculateEnergyPerSecond();
        renderBuildings();
        renderUpgrades();
        updateDisplay();
        tutorialSeen();
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
}

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
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return Math.floor(num);
    }
}

// Initialize the game when the page loads
window.onload = initGame;