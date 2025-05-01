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
        buildings: [
            {
                id: 'neuron',
                name: 'Basic Neuron',
                visible: false,
                description: 'The fundamental processing cell that forms the foundation of your neural network',
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
                visible: false,
                description: 'Branch-like extensions that gather and channel incoming neural signals',
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
                visible: false,
                description: 'Specialized endings that transmit impulses across synaptic junctions',
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
                visible: false,
                description: 'Insulating layer that dramatically accelerates signal transmission speed',
                baseDescription: 'Generates 6.25 impulse energy per second',
                buildingDescription: 'Generates 6.25 impulse energy per second',
                baseCost: 2500,
                cost: 2500,
                count: 0,
                baseProduction: 6.25,
                production: 0,  // Set initial production to 0
                costMultiplier: 1.15
            },
            {
                id: 'synapse_junction',
                name: 'Synapse Junction',
                visible: false,
                description: 'Specialized junction between neurons that improves signal transmission',
                baseDescription: 'Generates 15 impulse energy per second',
                buildingDescription: 'Generates 15 impulse energy per second',
                baseCost: 10000,
                cost: 10000,
                count: 0,
                baseProduction: 15,
                production: 0,  // Set initial production to 0
                costMultiplier: 1.15
            },
            {
                id: 'glial_cell_network',
                name: 'Glial Cell Network',
                visible: false,
                description: 'Support cells that maintain neural health and enhance efficiency',
                baseDescription: 'Generates 40 impulse energy per second',
                buildingDescription: 'Generates 40 impulse energy per second',
                baseCost: 50000,
                cost: 50000,
                count: 0,
                baseProduction: 40,
                production: 0,  // Set initial production to 0
                costMultiplier: 1.15
            },
            {
                id: 'neural_oscillator',
                name: 'Neural Oscillator',
                visible: false,
                description: 'Creates rhythmic impulse patterns for enhanced energy generation',
                baseDescription: 'Generates 250 impulse energy per second',
                buildingDescription: 'Generates 250 impulse energy per second',
                baseCost: 120000,
                cost: 120000,
                count: 0,
                baseProduction: 250,
                production: 0,  // Set initial production to 0
                costMultiplier: 1.15
            },
            {
                id: 'cortical_column',
                name: 'Cortical Column ',
                visible: false,
                description: 'A complex arrangement of neurons forming a functional unit',
                baseDescription: 'Generates 250 impulse energy per second',
                buildingDescription: 'Generates 250 impulse energy per second',
                baseCost: 1000000,
                cost: 1000000,
                count: 0,
                baseProduction: 500,
                production: 0,  // Set initial production to 0
                costMultiplier: 1.15
            },
            {
                id: 'thalamic_relay',
                name: 'Thalamic Relay',
                visible: false,
                description: 'Routes and amplifies signals through major neural pathways',
                baseDescription: 'Generates 2,000 impulse energy per second',
                buildingDescription: 'Generates 2,000 impulse energy per second',
                baseCost: 5000000,
                cost: 5000000,
                count: 0,
                baseProduction: 2000,
                production: 0,  // Set initial production to 0
                costMultiplier: 1.15
            },
        ],
        upgrades: [
            {
                id: 'better-clicks',
                name: 'Enhanced Impulses',
                visible: false,
                description: 'Double your click power',
                requirementText: 'Requires clicking at least 10 times',
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
                id: 'better-clicks-2',
                name: 'Enhanced Impulses',
                visible: false,
                description: 'Double your click power',
                requirementText: 'Requires clicking at least 500 times',
                cost: 2500,
                purchased: false,
                effect: function() {
                    gameState.clickPower *= 2;
                    updateClickPower();
                },
                requirement: function() {
                    return gameState.totalClicks >= 500;
                }
            },
            {
                id: 'neuron-boost',
                name: 'Efficient Neurons',
                visible: false,
                description: 'Basic Neurons are twice as effective',
                requirementText: 'Requires owning at least 5 Basic Neurons',
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
                visible: false,
                description: 'Dendrite Collectors are twice as effective',
                requirementText: 'Requires owning at least 10 Dendrite Collectors',
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
            },
            {
                id: 'neural-plasticity',
                name: 'Neural Plasticity',
                visible: false,
                description: 'All buildings produce 25% more energy',
                requirementText: 'Requires owning at least 15 buildings total',
                cost: 1000,
                purchased: false,
                effect: function() {
                    // Apply 25% boost to all buildings
                    gameState.buildings.forEach(building => {
                        building.baseProduction *= 1.25;
                    });
                    calculateEnergyPerSecond();
                },
                requirement: function() {
                    // Count total buildings
                    const totalBuildings = gameState.buildings.reduce((total, building) => total + building.count, 0);
                    return totalBuildings >= 15;
                }
            },
            {
                id: 'synchronized-firing',
                name: 'Synchronized Firing',
                visible: false,
                description: 'Each click generates additional energy based on your current energy per second (10%)',
                requirementText: 'Requires at least 50 energy per second',
                cost: 5000,
                purchased: false,
                effect: function() {
                    // Update the click function to add this effect
                    // We'll implement this via clickPower since that's already used
                    const originalClickImpulse = clickImpulse;
                    window.clickImpulse = function() {
                        // Call the original function
                        originalClickImpulse();
                        
                        // Add bonus energy from energy per second
                        const bonus = gameState.energyPerSecond * 0.1;
                        gameState.energy += bonus;
                        gameState.totalEnergy += bonus;
                        
                        // Create floating text for the bonus
                        const button = document.getElementById('impulse-button');
                        const rect = button.getBoundingClientRect();
                        const floatingText = document.createElement('div');
                        floatingText.textContent = `+${bonus.toFixed(1)}`;
                        floatingText.className = 'floating-text';
                        floatingText.style.left = `${rect.left + rect.width / 2 + 20}px`;
                        floatingText.style.top = `${rect.top}px`;
                        document.body.appendChild(floatingText);
                        
                        // Remove floating text after animation ends
                        setTimeout(() => {
                            floatingText.remove();
                        }, 2000);
                        
                        updateDisplay();
                    };
                },
                requirement: function() {
                    return gameState.energyPerSecond >= 50;
                }
            },
            {
                id: 'myelin-optimization',
                name: 'Myelin Optimization',
                visible: false,
                description: 'Myelin Sheaths are 3x more effective',
                requirementText: 'Requires owning 20 Myelin Sheaths',
                cost: 15000,
                purchased: false,
                effect: function() {
                    const myelin = gameState.buildings.find(b => b.id === 'myelin_sheath');
                    if (myelin) {
                        myelin.baseProduction *= 3;
                        // Update the actual production
                        myelin.production = myelin.baseProduction * myelin.count;
                        calculateEnergyPerSecond();
                    }
                },
                requirement: function() {
                    const myelin = gameState.buildings.find(b => b.id === 'myelin_sheath');
                    return myelin && myelin.count >= 20;
                }
            },
            {
                id: 'glial-enhancement',
                name: 'Glial Enhancement',
                visible: false,
                description: 'Glial Cell Networks give +5% to all other buildings\' production',
                requirementText: 'Requires owning 10 Glial Cell Networks',
                cost: 60000,
                purchased: false,
                effect: function() {
                    // We need to add a special calculation for this one
                    // Let's add a new function to handle special building effects
                    calculateBuildingEffects = function() {
                        // Reset all buildings to their base production * count
                        gameState.buildings.forEach(building => {
                            building.production = building.baseProduction * building.count;
                        });
                        
                        // Apply Glial Enhancement effect if purchased
                        const upgrade = gameState.upgrades.find(u => u.id === 'glial-enhancement');
                        if (upgrade && upgrade.purchased) {
                            const glial = gameState.buildings.find(b => b.id === 'glial_cell_network');
                            if (glial && glial.count > 0) {
                                const bonusMultiplier = 1 + (glial.count * 0.05);
                                gameState.buildings.forEach(building => {
                                    if (building.id !== 'glial_cell_network') {
                                        building.production *= bonusMultiplier;
                                    }
                                });
                            }
                        }
                        
                        // Call this after any building changes
                        calculateEnergyPerSecond();
                    };
                    
                    // Apply the effect immediately
                    calculateBuildingEffects();
                },
                requirement: function() {
                    const glial = gameState.buildings.find(b => b.id === 'glial_cell_network');
                    return glial && glial.count >= 10;
                }
            },
            {
                id: 'neural-circuit-formation',
                name: 'Neural Circuit Formation',
                visible: false,
                description: 'Buildings occasionally generate random bonus energy bursts',
                requirementText: 'Requires owning at least 50 total buildings',
                cost: 150000,
                purchased: false,
                effect: function() {
                    // Add a function to the game loop for random bursts
                    if (!window.checkRandomBursts) {
                        window.checkRandomBursts = function() {
                            const upgrade = gameState.upgrades.find(u => u.id === 'neural-circuit-formation');
                            if (upgrade && upgrade.purchased) {
                                // 2% chance per second to trigger a burst
                                if (Math.random() < 0.002) { // 0.2% chance per 100ms cycle
                                    // Bonus is between 3-8 seconds worth of energy
                                    const multiplier = 3 + Math.random() * 5;
                                    const bonus = gameState.energyPerSecond * multiplier;
                                    
                                    gameState.energy += bonus;
                                    gameState.totalEnergy += bonus;
                                    
                                    // Create a visual notification
                                    const container = document.querySelector('.resources');
                                    const notification = document.createElement('div');
                                    notification.className = 'energy-burst-notification';
                                    notification.innerHTML = `<span>Neural Burst! +${formatNumber(bonus)} energy</span>`;
                                    notification.style.position = 'absolute';
                                    notification.style.top = '50px';
                                    notification.style.left = '50%';
                                    notification.style.transform = 'translateX(-50%)';
                                    notification.style.backgroundColor = 'rgba(138, 43, 226, 0.8)';
                                    notification.style.padding = '10px 20px';
                                    notification.style.borderRadius = '5px';
                                    notification.style.color = 'white';
                                    notification.style.boxShadow = '0 0 10px rgba(138, 43, 226, 0.7)';
                                    notification.style.zIndex = '1000';
                                    notification.style.animation = 'float-up 3s forwards';
                                    
                                    document.body.appendChild(notification);
                                    
                                    // Remove the notification after animation completes
                                    setTimeout(() => {
                                        notification.remove();
                                    }, 3000);
                                    
                                    updateDisplay();
                                }
                            }
                        };
                        
                        // Add the check to the game loop
                        setInterval(window.checkRandomBursts, 100);
                    }
                },
                requirement: function() {
                    const totalBuildings = gameState.buildings.reduce((total, building) => total + building.count, 0);
                    return totalBuildings >= 50;
                }
            },
            {
                id: 'long-term-potentiation',
                name: 'Long-Term Potentiation',
                visible: false,
                description: 'All click upgrades are 50% more effective',
                requirementText: 'Requires clicking at least 1,000 times total',
                cost: 500000,
                purchased: false,
                effect: function() {
                    // Boost current click power
                    gameState.clickPower *= 1.5;
                    
                    // Make sure future click upgrades are also boosted
                    const originalClickUpgrade = gameState.upgrades.find(u => u.id === 'better-clicks');
                    if (originalClickUpgrade) {
                        const originalEffect = originalClickUpgrade.effect;
                        originalClickUpgrade.effect = function() {
                            // Call the original effect
                            originalEffect();
                            
                            // Add 50% more effectiveness
                            const bonus = gameState.clickPower * 0.5;
                            gameState.clickPower += bonus;
                            updateClickPower();
                        };
                    }
                    
                    updateClickPower();
                },
                requirement: function() {
                    return gameState.totalClicks >= 1000;
                }
            },
            {
                id: 'brain-wave-synchronization',
                name: 'Brain Wave Synchronization',
                visible: false,
                description: 'When you buy a building, gain temporary bonus production for 30 seconds',
                requirementText: 'Requires owning at least 5 Neural Oscillators',
                cost: 2000000,
                purchased: false,
                effect: function() {
                    // Modify the purchaseBuilding function to add this effect
                    const originalPurchaseBuilding = window.purchaseBuilding;
                    window.purchaseBuilding = function(buildingId) {
                        originalPurchaseBuilding(buildingId);
                        
                        const upgrade = gameState.upgrades.find(u => u.id === 'brain-wave-synchronization');
                        if (upgrade && upgrade.purchased) {
                            // Add a 30% boost for 30 seconds
                            activateBrainWaveBoost();
                        }
                    };
                    
                    // Create a function to handle the temporary boost
                    window.activateBrainWaveBoost = function() {
                        // Store original production values
                        const originalProductions = gameState.buildings.map(b => ({
                            id: b.id,
                            production: b.production,
                            baseProduction: b.baseProduction
                        }));
                        
                        // Apply 30% boost
                        gameState.buildings.forEach(building => {
                            building.baseProduction *= 1.3;
                            building.production = building.baseProduction * building.count;
                        });
                        
                        calculateEnergyPerSecond();
                        updateDisplay();
                        
                        // Create a visual indicator
                        const boostIndicator = document.createElement('div');
                        boostIndicator.className = 'brain-wave-boost';
                        boostIndicator.innerHTML = '<span>Brain Wave Boost: +30% production</span><div class="timer-bar"></div>';
                        boostIndicator.style.position = 'fixed';
                        boostIndicator.style.bottom = '20px';
                        boostIndicator.style.right = '20px';
                        boostIndicator.style.backgroundColor = 'rgba(138, 43, 226, 0.8)';
                        boostIndicator.style.padding = '10px';
                        boostIndicator.style.borderRadius = '5px';
                        boostIndicator.style.color = 'white';
                        boostIndicator.style.boxShadow = '0 0 10px rgba(138, 43, 226, 0.7)';
                        boostIndicator.style.zIndex = '1000';
                        
                        const timerBar = boostIndicator.querySelector('.timer-bar');
                        timerBar.style.height = '5px';
                        timerBar.style.backgroundColor = '#00ffff';
                        timerBar.style.width = '100%';
                        timerBar.style.marginTop = '5px';
                        timerBar.style.animation = 'timer-countdown 30s linear forwards';
                        
                        // Add keyframe animation for the timer
                        if (!document.getElementById('timer-animation')) {
                            const style = document.createElement('style');
                            style.id = 'timer-animation';
                            style.innerHTML = `
                                @keyframes timer-countdown {
                                    0% { width: 100%; }
                                    100% { width: 0%; }
                                }
                            `;
                            document.head.appendChild(style);
                        }
                        
                        document.body.appendChild(boostIndicator);
                        
                        // Remove the boost after 30 seconds
                        setTimeout(() => {
                            // Restore original production values
                            gameState.buildings.forEach(building => {
                                const original = originalProductions.find(o => o.id === building.id);
                                if (original) {
                                    building.baseProduction = original.baseProduction;
                                    building.production = original.production;
                                }
                            });
                            
                            calculateEnergyPerSecond();
                            updateDisplay();
                            
                            // Remove the visual indicator
                            boostIndicator.remove();
                        }, 30000);
                    };
                },
                requirement: function() {
                    const oscillator = gameState.buildings.find(b => b.id === 'neural_oscillator');
                    return oscillator && oscillator.count >= 5;
                }
            },
            {
                id: 'neural-maintenance',
                name: 'Neural Maintenance',
                visible: false,
                description: 'Improves offline production to 50% of normal rate',
                requirementText: 'Requires owning at least 25 total neurons',
                cost: 25000,
                purchased: false,
                effect: function() {
                    gameState.offlineProductionRate = 0.5; // 50% of online production
                },
                requirement: function() {
                    const totalNeurons = gameState.buildings.reduce((total, building) => total + building.count, 0);
                    return totalNeurons >= 25;
                }
            },
            {
                id: 'autonomous-processing',
                name: 'Autonomous Processing',
                visible: false,
                description: 'Improves offline production to 75% of normal rate',
                requirementText: 'Requires owning at least 50 total neurons',
                cost: 100000,
                purchased: false,
                effect: function() {
                    gameState.offlineProductionRate = 0.75; // 75% of online production
                },
                requirement: function() {
                    const totalNeurons = gameState.buildings.reduce((total, building) => total + building.count, 0);
                    return totalNeurons >= 50;
                }
            },
            {
                id: 'neural-automation',
                name: 'Neural Automation',
                visible: false,
                description: 'Achieves 100% offline production efficiency',
                requirementText: 'Requires owning at least 100 total neurons',
                cost: 500000,
                purchased: false,
                effect: function() {
                    gameState.offlineProductionRate = 1.0; // 100% of online production
                },
                requirement: function() {
                    const totalNeurons = gameState.buildings.reduce((total, building) => total + building.count, 0);
                    return totalNeurons >= 100;
                }
            },
            {
                id: 'extended-memory',
                name: 'Extended Neural Memory',
                visible: false,
                description: 'Increases maximum offline collection time to 24 hours',
                requirementText: 'Requires generating 1M total energy',
                cost: 250000,
                purchased: false,
                effect: function() {
                    gameState.maxOfflineTime = 24 * 60 * 60; // 24 hours in seconds
                },
                requirement: function() {
                    return gameState.totalEnergy >= 1000000;
                }
            },
            {
                id: 'persistent-memory',
                name: 'Persistent Neural Memory',
                visible: false,
                description: 'Increases maximum offline collection time to 3 days',
                requirementText: 'Requires generating 100M total energy',
                cost: 5000000,
                purchased: false,
                effect: function() {
                    gameState.maxOfflineTime = 3 * 24 * 60 * 60; // 3 days in seconds
                },
                requirement: function() {
                    return gameState.totalEnergy >= 100000000;
                }
            }
        ]
    };

    // Initialize the achievements system
    initAchievements();

    // Initialize the prestige system
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
    
    // Check for achievements
    checkAchievements();

    updateVisibility(); // Check for new buildings/upgrades to show
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

// Function to calculate building effects from upgrades
function calculateBuildingEffects() {
    // Reset all buildings to their base production * count
    gameState.buildings.forEach(building => {
        building.production = building.baseProduction * building.count;
    });
    
    // Apply Glial Enhancement effect if purchased
    const glialUpgrade = gameState.upgrades.find(u => u.id === 'glial-enhancement');
    if (glialUpgrade && glialUpgrade.purchased) {
        const glial = gameState.buildings.find(b => b.id === 'glial_cell_network');
        if (glial && glial.count > 0) {
            const bonusMultiplier = 1 + (glial.count * 0.05);
            gameState.buildings.forEach(building => {
                if (building.id !== 'glial_cell_network') {
                    building.production *= bonusMultiplier;
                }
            });
        }
    }
    
    // You can add more special building effects here
    
    // Update energy per second
    calculateEnergyPerSecond();
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
        
        // Apply any special building effects
        calculateBuildingEffects();

        // Check for achievements
        checkAchievements();
        
        updateVisibility(); // Check for new buildings/upgrades to show
        renderBuildings();
        renderUpgrades();
        updateDisplay();
        
        // Check for Brain Wave Synchronization upgrade
        const brainWaveUpgrade = gameState.upgrades.find(u => u.id === 'brain-wave-synchronization');
        if (brainWaveUpgrade && brainWaveUpgrade.purchased) {
            activateBrainWaveBoost();
        }
    }
}

// Purchase an upgrade
function purchaseUpgrade(upgradeId) {
    const upgrade = gameState.upgrades.find(u => u.id === upgradeId);
    
    if (!upgrade.purchased && gameState.energy >= upgrade.cost && upgrade.requirement()) {
        gameState.energy -= upgrade.cost;
        upgrade.purchased = true;
        upgrade.effect();

        // Check for achievements
        checkAchievements();
        
        updateVisibility(); // Check for new buildings/upgrades to show
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
        // Only render visible buildings
        if (building.visible) {
            const element = document.createElement('div');
            element.className = 'building';
            if (gameState.energy < building.cost) {
                element.className += ' disabled';
            }
            
            // Dynamic description that shows the current production
            const dynamicDescription = `Each one generates ${building.baseProduction.toFixed(2)} impulse energy per second`;
            const dynamicBuildingDescription = `Total Generation: ${building.production.toFixed(2)} impulse energy/second`;
            
            element.innerHTML = `
                <div class="building-info">
                    <div class="building-name">${building.name}</div>              
                    <span class="building-cost">Cost: ${formatNumber(building.cost)} Impulse Energy</span>
                    <span class="building-current-production-description">${dynamicBuildingDescription}</span>
                </div>
                <div class="building-count">${building.count}</div>
                <div class="building-tooltip">
                    <span class="building-description-tooltip">${building.description}</span><br>
                    <span class="building-base-production-description-tooltip">${dynamicDescription}</span>
                </div>
            `;
            
            element.addEventListener('click', () => purchaseBuilding(building.id));
            container.appendChild(element);
        }
    });
}

// Render upgrades
function renderUpgrades() {
    const container = document.getElementById('upgrades-container');
    container.innerHTML = '';
    
    gameState.upgrades.forEach(upgrade => {
        // Only show unpurchased and visible upgrades
        if (!upgrade.purchased && upgrade.visible) {
            const meetsRequirement = upgrade.requirement();
            const element = document.createElement('div');
            element.className = 'upgrade';
            
            if (!meetsRequirement || gameState.energy < upgrade.cost) {
                element.className += ' disabled';
            }        
            
            element.innerHTML = `
                <div class="upgrade-name">${upgrade.name}</div>
                <div class="upgrade-description">${upgrade.description}</div>
                <div class="upgrade-cost">Cost: ${formatNumber(upgrade.cost)} Impulse Energy</div>
                <div class="upgrade-tooltip">
                    <span class="upgrade-requirement">${upgrade.requirementText}</span>
                </div>
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

function updateVisibility() {
    // Make the first building (neuron) always visible
    const neuron = gameState.buildings.find(b => b.id === 'neuron');
    neuron.visible = true;
    
    // Make buildings visible based on having enough energy or owning previous tier
    for (let i = 1; i < gameState.buildings.length; i++) {
        const prevBuilding = gameState.buildings[i - 1];
        const currentBuilding = gameState.buildings[i];
        
        // Building becomes visible if player has 30% of its cost OR owns at least one of previous tier
        currentBuilding.visible = (gameState.energy >= currentBuilding.cost * 0.3) || (prevBuilding.count > 0);
    }
    
    // Make upgrades visible based on meeting requirements or approaching required thresholds
    gameState.upgrades.forEach(upgrade => {
        if (!upgrade.purchased) {
            // Logic for making upgrades visible:
            // 1. For click-based upgrades, make visible after 50% of required clicks
            if (upgrade.id.includes('better-clicks')) {
                const clickRequirement = parseInt(upgrade.requirementText.match(/\d+/)[0]);
                upgrade.visible = gameState.totalClicks >= (clickRequirement * 0.5);
            }
            // 2. For building count-based upgrades, visible once player has 50% of required count
            else if (upgrade.requirementText.includes('owning at least')) {
                const buildingMatch = upgrade.requirementText.match(/(\d+)\s+(.+?)s?$/);
                if (buildingMatch) {
                    const requiredCount = parseInt(buildingMatch[1]);
                    const buildingName = buildingMatch[2].trim();
                    
                    // Check if it's a specific building or total buildings
                    if (buildingName.toLowerCase().includes('total')) {
                        const totalBuildings = gameState.buildings.reduce((total, b) => total + b.count, 0);
                        upgrade.visible = totalBuildings >= (requiredCount * 0.5);
                    } else {
                        // Find the building by name (partial match)
                        const building = gameState.buildings.find(b => 
                            b.name.toLowerCase().includes(buildingName.toLowerCase()));
                        if (building) {
                            upgrade.visible = building.count >= (requiredCount * 0.5);
                        }
                    }
                }
            }
            // 3. For energy-based upgrades, visible at 50% of required energy
            else if (upgrade.requirementText.includes('energy')) {
                const energyMatch = upgrade.requirementText.match(/(\d+[KMB]?)/);
                if (energyMatch) {
                    let requiredEnergy = parseInt(energyMatch[1]);
                    if (energyMatch[1].includes('K')) requiredEnergy *= 1000;
                    if (energyMatch[1].includes('M')) requiredEnergy *= 1000000;
                    if (energyMatch[1].includes('B')) requiredEnergy *= 1000000000;
                    upgrade.visible = gameState.energyPerSecond >= (requiredEnergy * 0.5);
                }
            }
            // 4. Show generic upgrades when player has at least 50% of the cost in energy
            else {
                upgrade.visible = gameState.energy >= (upgrade.cost * 0.5);
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
        offlineProductionRate:gameState.offlineProductionRate,
        maxOfflineTime: gameState.maxOfflineTime,
        buildings: gameState.buildings.map(b => ({
            id: b.id,
            cost: b.cost,
            count: b.count,
            baseProduction: b.baseProduction,
            production: b.production,
            visible: b.visible // Save visibility status
        })),
        upgrades: gameState.upgrades.map(u => ({
            id: u.id,
            purchased: u.purchased,
            visible: u.visible // Save visibility status
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
        gameState.offlineProductionRate = parsedData.offlineProductionRate || 0.25; // 25% of normal production if nothing saved
        gameState.maxOfflineTime = parsedData.maxOfflineTime || 8 * 60 * 60; // cap at 8 hours offline if nothing saved
        
        if (parsedData.buildings) {
            parsedData.buildings.forEach(savedBuilding => {
                const building = gameState.buildings.find(b => b.id === savedBuilding.id);
                if (building) {
                    building.count = savedBuilding.count || 0;
                    building.cost = savedBuilding.cost || building.baseCost;
                    building.production = savedBuilding.production || 0;
                    building.visible = savedBuilding.visible || false; // Load visibility status
                }
            });
        }
        
        if (parsedData.upgrades) {
            parsedData.upgrades.forEach(savedUpgrade => {
                const upgrade = gameState.upgrades.find(u => u.id === savedUpgrade.id);
                if (upgrade) {
                    upgrade.purchased = savedUpgrade.purchased || false;      
                    upgrade.visible = savedUpgrade.visible || false; // Load visibility status              
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
            // Instead of directly assigning parsed prestige data, we'll update fields individually
            gameState.prestige.neuralPlasticityPoints = parsedData.prestige.neuralPlasticityPoints || 0;
            gameState.prestige.totalNPPEarned = parsedData.prestige.totalNPPEarned || 0;
            gameState.prestige.prestigeCount = parsedData.prestige.prestigeCount || 0;
            gameState.prestige.lastResetTime = parsedData.prestige.lastResetTime || 0;
            
            // Update upgrade levels and costs but keep names and descriptions
            if (parsedData.prestige.upgrades) {
                parsedData.prestige.upgrades.forEach(savedUpgrade => {
                    const upgrade = gameState.prestige.upgrades.find(u => u.id === savedUpgrade.id);
                    if (upgrade) {
                        upgrade.level = savedUpgrade.level || 0;
                        upgrade.currentCost = savedUpgrade.currentCost || upgrade.cost;
                        // The name and description fields are already set in the newGame() initialization
                    }
                });
            }
            
            // Update special unlocks but keep names and descriptions
            if (parsedData.prestige.specialUnlocks) {
                parsedData.prestige.specialUnlocks.forEach(savedUnlock => {
                    const unlock = gameState.prestige.specialUnlocks.find(u => u.id === savedUnlock.id);
                    if (unlock) {
                        unlock.purchased = savedUnlock.purchased || false;
                        if (savedUnlock.options) {
                            unlock.options = savedUnlock.options;
                        }
                        // The name and description fields are already set in the newGame() initialization
                    }
                });
            }
        } else {
            // Initialize prestige system if it doesn't exist
            initPrestige();
        }
        
        // Apply prestige upgrades effects
        if (gameState.prestige) {
            applyPrestigeUpgrades();
        }
        
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

// Initialize the game when the page loads
window.onload = initGame;