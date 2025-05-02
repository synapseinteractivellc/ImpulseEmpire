// Upgrades System for Impulse Empire

// Upgrade definitions
const upgradeDefinitions = [
    {
        id: 'better-clicks',
        name: 'Enhanced Impulses',
        description: 'Double your click power',
        requirementText: 'Requires clicking at least 10 times',
        cost: 50,
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
        description: 'Double your click power',
        requirementText: 'Requires clicking at least 500 times',
        cost: 2500,
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
        description: 'Basic Neurons are twice as effective',
        requirementText: 'Requires owning at least 5 Basic Neurons',
        cost: 200,
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
        requirementText: 'Requires owning at least 10 Dendrite Collectors',
        cost: 2000,
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
        description: 'All buildings produce 25% more energy',
        requirementText: 'Requires owning at least 15 buildings total',
        cost: 1000,
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
        description: 'Each click generates additional energy based on your current energy per second (10%)',
        requirementText: 'Requires at least 50 energy per second',
        cost: 5000,
        effect: function() {
            // Calculated in clickImpulse when this is marked purchased: true;
        },
        requirement: function() {
            return gameState.energyPerSecond >= 50;
        }
    },
    {
        id: 'myelin-optimization',
        name: 'Myelin Optimization',
        description: 'Myelin Sheaths are 3x more effective',
        requirementText: 'Requires owning 20 Myelin Sheaths',
        cost: 15000,
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
        description: 'Glial Cell Networks give +5% to all other buildings\' production',
        requirementText: 'Requires owning 10 Glial Cell Networks',
        cost: 60000,
        effect: function() {
            // Special effect handled in calculateBuildingEffects()
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
        description: 'Buildings occasionally generate random bonus energy bursts',
        requirementText: 'Requires owning at least 50 total buildings',
        cost: 150000,
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
        description: 'All click upgrades are 50% more effective',
        requirementText: 'Requires clicking at least 1,000 times total',
        cost: 500000,
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
        description: 'When you buy a building, gain temporary bonus production for 30 seconds',
        requirementText: 'Requires owning at least 5 Neural Oscillators',
        cost: 2000000,
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
        },
        requirement: function() {
            const oscillator = gameState.buildings.find(b => b.id === 'neural_oscillator');
            return oscillator && oscillator.count >= 5;
        }
    },
    {
        id: 'neural-maintenance',
        name: 'Neural Maintenance',
        description: 'Improves offline production to 50% of normal rate',
        requirementText: 'Requires owning at least 25 total neurons',
        cost: 25000,
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
        description: 'Improves offline production to 75% of normal rate',
        requirementText: 'Requires owning at least 50 total neurons',
        cost: 100000,
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
        description: 'Achieves 100% offline production efficiency',
        requirementText: 'Requires owning at least 100 total neurons',
        cost: 500000,
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
        description: 'Increases maximum offline collection time to 24 hours',
        requirementText: 'Requires generating 1M total energy',
        cost: 250000,
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
        description: 'Increases maximum offline collection time to 3 days',
        requirementText: 'Requires generating 100M total energy',
        cost: 5000000,
        effect: function() {
            gameState.maxOfflineTime = 3 * 24 * 60 * 60; // 3 days in seconds
        },
        requirement: function() {
            return gameState.totalEnergy >= 100000000;
        }
    }
];

// Initialize upgrades for the game state
function initUpgrades() {
    return upgradeDefinitions.map(def => ({
        ...def,
        purchased: false,
        visible: false
    }));
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

// Update upgrade visibility based on game progress
function updateUpgradeVisibility() {
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

// Update click power display
function updateClickPower() {
    // We could update a display of the click power here
}

// Export functions to global scope
window.initUpgrades = initUpgrades;
window.purchaseUpgrade = purchaseUpgrade;
window.renderUpgrades = renderUpgrades;
window.updateUpgradeVisibility = updateUpgradeVisibility;
window.updateClickPower = updateClickPower;