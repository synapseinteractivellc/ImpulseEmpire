// Prestige System for Impulse Empire - Neural Rewiring

// Initialize prestige system in the game state
function initPrestige() {
    if (!gameState.prestige) {
        gameState.prestige = {
            neuralPlasticityPoints: 0,     // Current NPP available to spend
            totalNPPEarned: 0,             // Lifetime NPP earned
            prestigeCount: 0,              // Number of times player has prestiged
            lastResetTime: 0,              // Timestamp of last reset
            upgrades: [
                {
                    id: 'click-efficiency',
                    name: 'Neural Firing Efficiency',
                    description: 'Permanently increase click power by +1 per level',
                    cost: 5,                // Base cost in NPP
                    costMultiplier: 1.5,    // Cost scaling per level
                    currentCost: 5,         // Current cost (updates with level)
                    level: 0,               // Current upgrade level
                    maxLevel: 50,           // Maximum upgrade level
                    effect: function(level) {
                        return level;       // +1 click power per level
                    }
                },
                {
                    id: 'production-boost',
                    name: 'Synaptic Enhancement',
                    description: 'Permanently increase all production by +5% per level',
                    cost: 10,
                    costMultiplier: 1.8,
                    currentCost: 10,
                    level: 0,
                    maxLevel: 100,
                    effect: function(level) {
                        return level * 0.05; // +5% production per level
                    }
                },
                {
                    id: 'cost-reduction',
                    name: 'Neural Efficiency',
                    description: 'Permanently reduce building costs by -2% per level',
                    cost: 15,
                    costMultiplier: 2,
                    currentCost: 15,
                    level: 0,
                    maxLevel: 25,           // Max is 50% cost reduction
                    effect: function(level) {
                        return Math.min(0.5, level * 0.02); // Max 50% reduction
                    }
                },
                {
                    id: 'offline-boost',
                    name: 'Neural Persistence',
                    description: 'Permanently increase offline production rate by +5% per level',
                    cost: 20,
                    costMultiplier: 1.7,
                    currentCost: 20,
                    level: 0,
                    maxLevel: 15,           // Max is +75% offline rate
                    effect: function(level) {
                        return level * 0.05; // +5% offline rate per level
                    }
                },
                {
                    id: 'starting-energy',
                    name: 'Residual Impulses',
                    description: 'Start with +100 energy per level after reset',
                    cost: 8,
                    costMultiplier: 1.6,
                    currentCost: 8,
                    level: 0,
                    maxLevel: 50,
                    effect: function(level) {
                        return level * 100; // +100 starting energy per level
                    }
                },
                {
                    id: 'npp-boost',
                    name: 'Neural Plasticity Amplifier',
                    description: 'Earn +10% more NPP on reset per level',
                    cost: 25,
                    costMultiplier: 2.2,
                    currentCost: 25,
                    level: 0,
                    maxLevel: 10,           // Max is +100% NPP
                    effect: function(level) {
                        return level * 0.1; // +10% more NPP per level
                    }
                },
                {
                    id: 'auto-neuron',
                    name: 'Autonomous Neuron Formation',
                    description: 'Start with free Basic Neurons after reset',
                    cost: 30,
                    costMultiplier: 2,
                    currentCost: 30,
                    level: 0,
                    maxLevel: 50,
                    effect: function(level) {
                        return Math.floor(level * 5); // 5 neurons per level
                    }
                },
                {
                    id: 'retention',
                    name: 'Neural Memory',
                    description: 'Retain 5% of your previous total energy per level after reset',
                    cost: 50,
                    costMultiplier: 2.5,
                    currentCost: 50,
                    level: 0,
                    maxLevel: 10,           // Max is 50% energy retention
                    effect: function(level) {
                        return level * 0.05; // 5% energy retention per level
                    }
                }
            ],
            // Special unlocks that can be purchased only once
            specialUnlocks: [
                {
                    id: 'auto-click',
                    name: 'Autonomous Impulse Generator',
                    description: 'Automatically fires 1 impulse per second',
                    cost: 25,
                    purchased: false
                },
                {
                    id: 'auto-upgrade',
                    name: 'Autonomous Upgrade System',
                    description: 'Automatically purchases upgrades when affordable',
                    cost: 250,
                    purchased: false
                },
                {
                    id: 'auto-building',
                    name: 'Autonomous Building Constructor',
                    description: 'Automatically purchases buildings when affordable',
                    cost: 500,
                    purchased: false,
                    options: {
                        enabled: false,
                        buildings: []
                    }
                }
            ]
        };
    }
}

// Calculate how many Neural Plasticity Points (NPP) the player would earn on reset
function calculatePrestigeRewards() {
    // Base formula based on total energy generated
    let baseNPP = Math.floor(Math.sqrt(gameState.totalEnergy / 1000));
    
    // Bonus based on buildings owned
    const totalBuildings = gameState.buildings.reduce((total, building) => total + building.count, 0);
    let buildingBonus = Math.floor(Math.sqrt(totalBuildings) * 2);
    
    // Bonus based on achievements
    let achievementBonus = 0;
    if (gameState.achievements) {
        achievementBonus = Math.floor(gameState.achievements.totalAchieved * 2);
    }
    
    // Bonus based on time played (diminishing returns)
    let timeBonus = Math.floor(Math.sqrt(gameState.playTime / 3600)); // Based on hours played
    
    // Sum all bonuses
    let totalNPP = baseNPP + buildingBonus + achievementBonus + timeBonus;
    
    // Apply NPP boost if the player has that upgrade
    const nppBoostUpgrade = gameState.prestige.upgrades.find(u => u.id === 'npp-boost');
    if (nppBoostUpgrade && nppBoostUpgrade.level > 0) {
        const boostMultiplier = 1 + nppBoostUpgrade.effect(nppBoostUpgrade.level);
        totalNPP = Math.floor(totalNPP * boostMultiplier);
    }
    
    return {
        total: totalNPP,
        breakdown: {
            base: baseNPP,
            buildings: buildingBonus,
            achievements: achievementBonus,
            time: timeBonus
        }
    };
}

// Perform the prestige (reset with bonuses)
function performPrestige() {
    if (!window.confirm("Are you sure you want to reset your neural network? You will lose all energy and buildings, but gain Neural Plasticity Points to upgrade your future networks.")) {
        return;
    }
    
    // Calculate NPP rewards before resetting
    const rewards = calculatePrestigeRewards();
    
    // Store current prestige stats
    const currentPrestige = gameState.prestige;
    
    // Add NPP to the player's total
    currentPrestige.neuralPlasticityPoints += rewards.total;
    currentPrestige.totalNPPEarned += rewards.total;
    currentPrestige.prestigeCount++;
    currentPrestige.lastResetTime = Date.now();
    
    // Create a new game state
    const oldGameState = gameState;
    newGame();
    
    // Restore prestige data
    gameState.prestige = currentPrestige;
    
    // Save the game with this updated state before refreshing
    saveGame();
    
    // Show modal with reset results
    showPrestigeModal(rewards, true);
}

// Apply all prestige upgrade effects to the new game
function applyPrestigeUpgrades() {
    if (!gameState.prestige) return;
    
    gameState.prestige.upgrades.forEach(upgrade => {
        if (upgrade.level > 0) {
            switch (upgrade.id) {
                case 'click-efficiency':
                    // Add bonus to click power
                    gameState.clickPower += upgrade.effect(upgrade.level);
                    break;
                    
                case 'production-boost':
                    // Increase production of all buildings
                    const productionBoost = 1 + upgrade.effect(upgrade.level);
                    gameState.buildings.forEach(building => {
                        building.baseProduction *= productionBoost;
                    });
                    break;
                    
                case 'cost-reduction':
                    // Reduce cost of all buildings
                    const costReduction = 1 - upgrade.effect(upgrade.level);
                    gameState.buildings.forEach(building => {
                        building.baseCost = Math.floor(building.baseCost * costReduction);
                        building.cost = Math.floor(building.baseCost * Math.pow(building.costMultiplier, building.count));
                    });
                    break;
                    
                case 'offline-boost':
                    // Boost offline production rate
                    gameState.offlineProductionRate += upgrade.effect(upgrade.level);
                    break;
                    
                case 'starting-energy':
                    // Add starting energy
                    const startingEnergy = upgrade.effect(upgrade.level);
                    gameState.energy += startingEnergy;
                    gameState.totalEnergy += startingEnergy;
                    break;
                    
                case 'auto-neuron':
                    // Start with free neurons
                    const freeNeurons = upgrade.effect(upgrade.level);
                    if (freeNeurons > 0) {
                        const neuron = gameState.buildings.find(b => b.id === 'neuron');
                        if (neuron) {
                            neuron.count += freeNeurons;
                            neuron.production = neuron.baseProduction * neuron.count;
                            neuron.cost = Math.floor(neuron.baseCost * Math.pow(neuron.costMultiplier, neuron.count));
                        }
                    }
                    break;
                    
                case 'retention':
                    // Retain some energy from previous game
                    if (oldGameState && oldGameState.totalEnergy) {
                        const retentionRate = upgrade.effect(upgrade.level);
                        const retainedEnergy = Math.floor(oldGameState.totalEnergy * retentionRate);
                        gameState.energy += retainedEnergy;
                        gameState.totalEnergy += retainedEnergy;
                    }
                    break;
            }
        }
    });
    
    // Apply special unlocks
    applySpecialUnlocks();
    
    // Update energy per second
    calculateEnergyPerSecond();
}

// Apply effects from special unlocks
function applySpecialUnlocks() {
    gameState.prestige.specialUnlocks.forEach(unlock => {
        if (unlock.purchased) {
            switch (unlock.id) {
                case 'auto-click':
                    // Set up auto-clicking
                    if (!window.autoClickInterval) {
                        window.autoClickInterval = setInterval(() => {
                            // Add energy as if clicked but without animation
                            gameState.energy += gameState.clickPower;
                            gameState.totalEnergy += gameState.clickPower;
                            updateDisplay();
                        }, 1000); // Once per second
                    }
                    break;
                    
                case 'auto-upgrade':
                    // Set up auto-upgrade
                    if (!window.autoUpgradeInterval) {
                        window.autoUpgradeInterval = setInterval(() => {
                            // Try to buy the cheapest available upgrade
                            const availableUpgrades = gameState.upgrades.filter(
                                u => !u.purchased && u.visible && gameState.energy >= u.cost && u.requirement()
                            );
                            
                            if (availableUpgrades.length > 0) {
                                // Sort by cost and buy the cheapest
                                availableUpgrades.sort((a, b) => a.cost - b.cost);
                                purchaseUpgrade(availableUpgrades[0].id);
                            }
                        }, 5000); // Check every 5 seconds
                    }
                    break;
                    
                case 'auto-building':
                    // Set up auto-building if enabled
                    if (unlock.options.enabled && !window.autoBuildingInterval) {
                        window.autoBuildingInterval = setInterval(() => {
                            // Get list of buildings that can be purchased
                            const enabledBuildingIds = unlock.options.buildings;
                            const affordableBuildings = gameState.buildings.filter(
                                b => b.visible && gameState.energy >= b.cost && enabledBuildingIds.includes(b.id)
                            );
                            
                            if (affordableBuildings.length > 0) {
                                // Sort by cost/production ratio and buy the most efficient
                                affordableBuildings.sort((a, b) => (a.cost / a.baseProduction) - (b.cost / b.baseProduction));
                                purchaseBuilding(affordableBuildings[0].id);
                            }
                        }, 2000); // Check every 2 seconds
                    }
                    break;
            }
        }
    });
}

// Purchase a prestige upgrade
function purchasePrestigeUpgrade(upgradeId) {
    const upgrade = gameState.prestige.upgrades.find(u => u.id === upgradeId);
    
    // Check if upgrade can be purchased
    if (upgrade && upgrade.level < upgrade.maxLevel && gameState.prestige.neuralPlasticityPoints >= upgrade.currentCost) {
        gameState.prestige.neuralPlasticityPoints -= upgrade.currentCost;
        upgrade.level++;
        
        // Update the cost for next level
        upgrade.currentCost = Math.floor(upgrade.cost * Math.pow(upgrade.costMultiplier, upgrade.level));
        
        // Apply the upgrade effect immediately
        applyPrestigeUpgrade(upgrade);
        
        // Update display
        renderPrestige();
        updateDisplay();
        saveGame();
    }
}

// Apply a single prestige upgrade effect
function applyPrestigeUpgrade(upgrade) {
    // Apply the effect of a single newly purchased upgrade
    switch (upgrade.id) {
        case 'click-efficiency':
            // Increase click power by 1
            gameState.clickPower += 1;
            break;
            
        case 'production-boost':
            // Increase production by 5%
            const productionBoost = 1.05;
            gameState.buildings.forEach(building => {
                building.baseProduction *= productionBoost;
                building.production = building.baseProduction * building.count;
            });
            calculateEnergyPerSecond();
            break;
            
        case 'cost-reduction':
            // Reduce cost by 2% (multiplicative)
            const costReduction = 0.98;
            gameState.buildings.forEach(building => {
                building.baseCost = Math.floor(building.baseCost * costReduction);
                building.cost = Math.floor(building.baseCost * Math.pow(building.costMultiplier, building.count));
            });
            break;
            
        case 'offline-boost':
            // Increase offline production rate by 5%
            gameState.offlineProductionRate += 0.05;
            break;
            
        // No immediate effect for these upgrades - they apply on reset
        case 'starting-energy':
        case 'npp-boost':
        case 'auto-neuron':
        case 'retention':
            // These are applied after reset
            break;
    }
}

// Purchase a special unlock
function purchaseSpecialUnlock(unlockId) {
    const unlock = gameState.prestige.specialUnlocks.find(u => u.id === unlockId);
    
    // Check if unlock can be purchased
    if (unlock && !unlock.purchased && gameState.prestige.neuralPlasticityPoints >= unlock.cost) {
        gameState.prestige.neuralPlasticityPoints -= unlock.cost;
        unlock.purchased = true;
        
        // Apply the special unlock
        applySpecialUnlock(unlock);
        
        // Update display
        renderPrestige();
        updateDisplay();
        saveGame();
    }
}

// Apply a single special unlock
function applySpecialUnlock(unlock) {
    switch (unlock.id) {
        case 'auto-click':
            // Set up auto-clicking
            if (!window.autoClickInterval) {
                window.autoClickInterval = setInterval(() => {
                    // Add energy as if clicked but without animation
                    gameState.energy += gameState.clickPower;
                    gameState.totalEnergy += gameState.clickPower;
                    updateDisplay();
                }, 1000); // Once per second
            }
            break;
            
        case 'auto-upgrade':
            // Set up auto-upgrade
            if (!window.autoUpgradeInterval) {
                window.autoUpgradeInterval = setInterval(() => {
                    // Try to buy the cheapest available upgrade
                    const availableUpgrades = gameState.upgrades.filter(
                        u => !u.purchased && u.visible && gameState.energy >= u.cost && u.requirement()
                    );
                    
                    if (availableUpgrades.length > 0) {
                        // Sort by cost and buy the cheapest
                        availableUpgrades.sort((a, b) => a.cost - b.cost);
                        purchaseUpgrade(availableUpgrades[0].id);
                    }
                }, 5000); // Check every 5 seconds
            }
            break;
            
        case 'auto-building':
            // Initialize with all buildings enabled
            unlock.options = {
                enabled: true,
                buildings: gameState.buildings.map(b => b.id)
            };
            
            // Set up auto-building
            if (!window.autoBuildingInterval) {
                window.autoBuildingInterval = setInterval(() => {
                    if (unlock.options.enabled) {
                        // Get list of buildings that can be purchased
                        const enabledBuildingIds = unlock.options.buildings;
                        const affordableBuildings = gameState.buildings.filter(
                            b => b.visible && gameState.energy >= b.cost && enabledBuildingIds.includes(b.id)
                        );
                        
                        if (affordableBuildings.length > 0) {
                            // Sort by cost/production ratio and buy the most efficient
                            affordableBuildings.sort((a, b) => (a.cost / a.baseProduction) - (b.cost / b.baseProduction));
                            purchaseBuilding(affordableBuildings[0].id);
                        }
                    }
                }, 2000); // Check every 2 seconds
            }
            break;
    }
}

// Toggle auto-building on/off
function toggleAutoBuilding(enabled) {
    const autoBuilding = gameState.prestige.specialUnlocks.find(u => u.id === 'auto-building');
    if (autoBuilding && autoBuilding.purchased) {
        autoBuilding.options.enabled = enabled;
        saveGame();
    }
}

// Toggle specific building in auto-building
function toggleAutoBuildingForBuilding(buildingId, enabled) {
    const autoBuilding = gameState.prestige.specialUnlocks.find(u => u.id === 'auto-building');
    if (autoBuilding && autoBuilding.purchased) {
        if (enabled && !autoBuilding.options.buildings.includes(buildingId)) {
            autoBuilding.options.buildings.push(buildingId);
        } else if (!enabled) {
            autoBuilding.options.buildings = autoBuilding.options.buildings.filter(id => id !== buildingId);
        }
        saveGame();
    }
}

// Render prestige tab content
function renderPrestige() {
    const container = document.getElementById('prestige-container');
    if (!container) return;
    
    // Calculate potential rewards if player resets now
    const potentialRewards = calculatePrestigeRewards();
    
    // Create HTML for the prestige tab
    let html = `
        <div class="prestige-stats">
            <div class="npp-counter">
                <span class="npp-title">Neural Plasticity Points</span>
                <span class="npp-count">${formatNumber(gameState.prestige.neuralPlasticityPoints)}</span>
                <span class="total-npp">Total earned: ${formatNumber(gameState.prestige.totalNPPEarned)}</span>
            </div>
            <div class="prestige-info">
                <p>Resetting your neural network will:</p>
                <ul>
                    <li>Reset all energy, buildings, and basic upgrades</li>
                    <li>Award <span class="highlight">${formatNumber(potentialRewards.total)}</span> Neural Plasticity Points</li>
                    <li>Keep all prestige upgrades and achievements</li>
                </ul>
                <div class="reward-breakdown">
                    <p>Reward breakdown:</p>
                    <div>Energy produced: +${formatNumber(potentialRewards.breakdown.base)} NPP</div>
                    <div>Buildings owned: +${formatNumber(potentialRewards.breakdown.buildings)} NPP</div>
                    <div>Achievements: +${formatNumber(potentialRewards.breakdown.achievements)} NPP</div>
                    <div>Time played: +${formatNumber(potentialRewards.breakdown.time)} NPP</div>
                </div>
                <button class="prestige-button" onclick="performPrestige()">Reset Neural Network</button>
            </div>
        </div>
        
        <h3>Permanent Upgrades</h3>
        <div class="prestige-upgrades-container">
    `;
    
    // Add permanent upgrades
    gameState.prestige.upgrades.forEach(upgrade => {
        const maxedOut = upgrade.level >= upgrade.maxLevel;
        const canAfford = gameState.prestige.neuralPlasticityPoints >= upgrade.currentCost;
        
        html += `
            <div class="prestige-upgrade ${maxedOut ? 'maxed' : (canAfford ? '' : 'disabled')}">
                <div class="prestige-upgrade-header">
                    <div class="prestige-upgrade-name">${upgrade.name}</div>
                    <div class="prestige-upgrade-level">Level ${upgrade.level}${maxedOut ? ' (MAX)' : ''}</div>
                </div>
                <div class="prestige-upgrade-description">${upgrade.description}</div>
                <div class="prestige-upgrade-effect">Current effect: ${formatUpgradeEffect(upgrade)}</div>
                ${maxedOut ? '' : `
                <div class="prestige-upgrade-cost">Cost: ${formatNumber(upgrade.currentCost)} NPP</div>
                <button class="upgrade-button" onclick="purchasePrestigeUpgrade('${upgrade.id}')" ${canAfford ? '' : 'disabled'}>Upgrade</button>
                `}
            </div>
        `;
    });
    
    html += `
        </div>
        
        <h3>Special Unlocks</h3>
        <div class="special-unlocks-container">
    `;
    
    // Add special unlocks
    gameState.prestige.specialUnlocks.forEach(unlock => {
        const isPurchased = unlock.purchased;
        const canAfford = gameState.prestige.neuralPlasticityPoints >= unlock.cost;
        
        html += `
            <div class="special-unlock ${isPurchased ? 'purchased' : (canAfford ? '' : 'disabled')}">
                <div class="special-unlock-header">
                    <div class="special-unlock-name">${unlock.name}</div>
                    <div class="special-unlock-status">${isPurchased ? 'Purchased' : ''}</div>
                </div>
                <div class="special-unlock-description">${unlock.description}</div>
                ${isPurchased ? getSpecialUnlockControls(unlock) : `
                <div class="special-unlock-cost">Cost: ${formatNumber(unlock.cost)} NPP</div>
                <button class="unlock-button" onclick="purchaseSpecialUnlock('${unlock.id}')" ${canAfford ? '' : 'disabled'}>Purchase</button>
                `}
            </div>
        `;
    });
    
    html += `</div>`;
    
    // Update the container
    container.innerHTML = html;
}

// Format upgrade effect for display
function formatUpgradeEffect(upgrade) {
    const effect = upgrade.effect(upgrade.level);
    
    switch (upgrade.id) {
        case 'click-efficiency':
            return `+${effect} click power`;
            
        case 'production-boost':
            return `+${(effect * 100).toFixed(0)}% production`;
            
        case 'cost-reduction':
            return `-${(effect * 100).toFixed(0)}% building costs`;
            
        case 'offline-boost':
            return `+${(effect * 100).toFixed(0)}% offline production`;
            
        case 'starting-energy':
            return `+${formatNumber(effect)} starting energy`;
            
        case 'npp-boost':
            return `+${(effect * 100).toFixed(0)}% NPP gain`;
            
        case 'auto-neuron':
            return `${effect} free neurons on reset`;
            
        case 'retention':
            return `Retain ${(effect * 100).toFixed(0)}% of energy on reset`;
            
        default:
            return `Level ${upgrade.level}`;
    }
}

// Get controls for purchased special unlocks
function getSpecialUnlockControls(unlock) {
    let html = '';
    
    switch (unlock.id) {
        case 'auto-building':
            const isEnabled = unlock.options.enabled;
            
            html = `
                <div class="auto-building-controls">
                    <div class="toggle-container">
                        <label class="toggle-switch">
                            <input type="checkbox" ${isEnabled ? 'checked' : ''} onchange="toggleAutoBuilding(this.checked)">
                            <span class="toggle-slider"></span>
                        </label>
                        <span>Auto-purchase buildings</span>
                    </div>
                    <div class="building-toggles">
                        <p>Select buildings to auto-purchase:</p>
                        <div class="building-toggle-list">
            `;
            
            // Add toggles for each building
            gameState.buildings.forEach(building => {
                const isSelected = unlock.options.buildings.includes(building.id);
                html += `
                    <div class="building-toggle">
                        <label>
                            <input type="checkbox" ${isSelected ? 'checked' : ''} 
                                onchange="toggleAutoBuildingForBuilding('${building.id}', this.checked)">
                            ${building.name}
                        </label>
                    </div>
                `;
            });
            
            html += `
                        </div>
                    </div>
                </div>
            `;
            break;
            
        default:
            html = '<div class="special-unlock-active">Active</div>';
    }
    
    return html;
}

// Show modal with reset results
function showPrestigeModal(rewards, shouldRefresh = false) {
    // Create the modal container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'prestige-modal-container';
    
    modalContainer.innerHTML = `
        <div class="prestige-modal">
            <h2>Neural Network Reset</h2>
            <p>Your neural network has been reset!</p>
            <div class="prestige-reward">
                <div class="reward-icon">🧠</div>
                <div class="reward-text">
                    <span>You gained</span>
                    <span class="npp-gained">${formatNumber(rewards.total)}</span>
                    <span>Neural Plasticity Points</span>
                </div>
            </div>
            <div class="prestige-breakdown">
                <div class="breakdown-item">
                    <div class="breakdown-label">From energy:</div>
                    <div class="breakdown-value">+${formatNumber(rewards.breakdown.base)}</div>
                </div>
                <div class="breakdown-item">
                    <div class="breakdown-label">From buildings:</div>
                    <div class="breakdown-value">+${formatNumber(rewards.breakdown.buildings)}</div>
                </div>
                <div class="breakdown-item">
                    <div class="breakdown-label">From achievements:</div>
                    <div class="breakdown-value">+${formatNumber(rewards.breakdown.achievements)}</div>
                </div>
                <div class="breakdown-item">
                    <div class="breakdown-label">From time played:</div>
                    <div class="breakdown-value">+${formatNumber(rewards.breakdown.time)}</div>
                </div>
            </div>
            <button class="continue-button">Continue</button>
        </div>
    `;
    
    // Add the modal to the document
    document.body.appendChild(modalContainer);
    
    // Add event listener to the continue button
    const continueButton = modalContainer.querySelector('.continue-button');
    continueButton.addEventListener('click', () => {
        // Add a closing animation
        const modal = modalContainer.querySelector('.prestige-modal');
        modal.classList.add('closing');
        
        // Remove the modal after animation completes and refresh if needed
        setTimeout(() => {
            modalContainer.remove();
            
            if (shouldRefresh) {
                // Force a page reload after the modal closes
                window.location.reload();
            } else {
                // Only update display if not refreshing
                updateDisplay();
            }
        }, 500);
    });
}

// Clean up intervals when resetting
function cleanupPrestigeIntervals() {
    if (window.autoClickInterval) {
        clearInterval(window.autoClickInterval);
        window.autoClickInterval = null;
    }
    
    if (window.autoUpgradeInterval) {
        clearInterval(window.autoUpgradeInterval);
        window.autoUpgradeInterval = null;
    }
    
    if (window.autoBuildingInterval) {
        clearInterval(window.autoBuildingInterval);
        window.autoBuildingInterval = null;
    }
}

// Add prestige functions to the global scope
window.initPrestige = initPrestige;
window.calculatePrestigeRewards = calculatePrestigeRewards;
window.performPrestige = performPrestige;
window.purchasePrestigeUpgrade = purchasePrestigeUpgrade;
window.purchaseSpecialUnlock = purchaseSpecialUnlock;
window.toggleAutoBuilding = toggleAutoBuilding;
window.toggleAutoBuildingForBuilding = toggleAutoBuildingForBuilding;
window.renderPrestige = renderPrestige;