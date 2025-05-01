// Achievement System for Impulse Empire

// Initialize achievements in the game state
function initAchievements() {
    if (!gameState.achievements) {
        gameState.achievements = {
            list: [
                // Clicking achievements
                {
                    id: 'first-impulse',
                    name: 'First Impulse',
                    description: 'Fire your first impulse',
                    icon: '⚡',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 1,
                    reward: {
                        type: 'clickPower',
                        value: 1
                    },
                    rewardDescription: 'Double click power'
                },
                {
                    id: 'neuron-enthusiast',
                    name: 'Neuron Enthusiast',
                    description: 'Fire 100 impulses',
                    icon: '🧠',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 100,
                    reward: {
                        type: 'energy',
                        value: 100
                    },
                    rewardDescription: '+100 Impulse Energy'
                },
                {
                    id: 'impulse-master',
                    name: 'Impulse Master',
                    description: 'Fire 1,000 impulses',
                    icon: '⚡',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 1000,
                    reward: {
                        type: 'clickPower',
                        value: 2
                    },
                    rewardDescription: 'Double click power'
                },
                {
                    id: 'neural-virtuoso',
                    name: 'Neural Virtuoso',
                    description: 'Fire 10,000 impulses',
                    icon: '🌟',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 10000,
                    reward: {
                        type: 'energy',
                        value: 5000
                    },
                    rewardDescription: '+5,000 Impulse Energy'
                },
                
                // Building achievements
                {
                    id: 'neural-foundations',
                    name: 'Neural Foundations',
                    description: 'Build your first Basic Neuron',
                    icon: '🔬',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 1,
                    reward: {
                        type: 'buildingBoost',
                        building: 'neuron',
                        value: 1.5
                    },
                    rewardDescription: '+50% Neuron production'
                },
                {
                    id: 'neural-expansion',
                    name: 'Neural Expansion',
                    description: 'Own 10 Basic Neurons',
                    icon: '📈',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 10,
                    reward: {
                        type: 'energyRate',
                        value: 1.1
                    },
                    rewardDescription: '+10% energy production'
                },
                {
                    id: 'dendrite-developer',
                    name: 'Dendrite Developer',
                    description: 'Build your first Dendrite Collector',
                    icon: '🌿',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 1,
                    reward: {
                        type: 'buildingBoost',
                        building: 'dendrite',
                        value: 1.5
                    },
                    rewardDescription: '+50% Dendrite production'
                },
                {
                    id: 'axon-architect',
                    name: 'Axon Architect',
                    description: 'Build your first Axon Terminal',
                    icon: '🧪',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 1,
                    reward: {
                        type: 'buildingBoost',
                        building: 'axon_terminal',
                        value: 1.5
                    },
                    rewardDescription: '+50% Axon Terminal production'
                },
                {
                    id: 'myelin-manager',
                    name: 'Myelin Manager',
                    description: 'Build your first Myelin Sheath',
                    icon: '🛡️',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 1,
                    reward: {
                        type: 'buildingBoost',
                        building: 'myelin_sheath',
                        value: 1.5
                    },
                    rewardDescription: '+50% Myelin Sheath production'
                },
                {
                    id: 'neural-diversification',
                    name: 'Neural Diversification',
                    description: 'Own all basic neural components',
                    icon: '🧩',
                    achieved: false,
                    hidden: true,
                    progress: 0,
                    goal: 4, // Neuron, Dendrite, Axon Terminal, Myelin Sheath
                    reward: {
                        type: 'energyRate',
                        value: 1.25
                    },
                    rewardDescription: '+25% energy production'
                },
                
                // Energy production achievements
                {
                    id: 'first-automation',
                    name: 'First Automation',
                    description: 'Reach 1 energy per second',
                    icon: '⚙️',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 1,
                    reward: {
                        type: 'energy',
                        value: 50
                    },
                    rewardDescription: '+50 Impulse Energy'
                },
                {
                    id: 'neural-network',
                    name: 'Neural Network',
                    description: 'Reach 10 energy per second',
                    icon: '🔌',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 10,
                    reward: {
                        type: 'energy',
                        value: 500
                    },
                    rewardDescription: '+500 Impulse Energy'
                },
                {
                    id: 'neural-highway',
                    name: 'Neural Highway',
                    description: 'Reach 100 energy per second',
                    icon: '🚀',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 100,
                    reward: {
                        type: 'energy',
                        value: 5000
                    },
                    rewardDescription: '+5,000 Impulse Energy'
                },
                {
                    id: 'brain-power',
                    name: 'Brain Power',
                    description: 'Reach 1,000 energy per second',
                    icon: '💫',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 1000,
                    reward: {
                        type: 'energyRate',
                        value: 1.5
                    },
                    rewardDescription: '+50% energy production'
                },
                
                // Total energy achievements
                {
                    id: 'energy-collector',
                    name: 'Energy Collector',
                    description: 'Generate 1,000 total energy',
                    icon: '💡',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 1000,
                    reward: {
                        type: 'offlineRate',
                        value: 0.05
                    },
                    rewardDescription: '+5% offline production'
                },
                {
                    id: 'energy-stockpiler',
                    name: 'Energy Stockpiler',
                    description: 'Generate 100,000 total energy',
                    icon: '🔋',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 100000,
                    reward: {
                        type: 'offlineRate',
                        value: 0.1
                    },
                    rewardDescription: '+10% offline production'
                },
                {
                    id: 'energy-magnate',
                    name: 'Energy Magnate',
                    description: 'Generate 10,000,000 total energy',
                    icon: '⚡',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 10000000,
                    reward: {
                        type: 'offlineTime',
                        value: 2 * 60 * 60
                    },
                    rewardDescription: '+2 hours max offline time'
                },
                
                // Upgrade achievements
                {
                    id: 'neural-enhancement',
                    name: 'Neural Enhancement',
                    description: 'Purchase your first upgrade',
                    icon: '📊',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 1,
                    reward: {
                        type: 'energy',
                        value: 200
                    },
                    rewardDescription: '+200 Impulse Energy'
                },
                {
                    id: 'neural-optimization',
                    name: 'Neural Optimization',
                    description: 'Purchase 5 different upgrades',
                    icon: '📈',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 5,
                    reward: {
                        type: 'clickPower',
                        value: 2
                    },
                    rewardDescription: 'Double click power'
                },
                
                // Time achievements
                {
                    id: 'neural-dedication',
                    name: 'Neural Dedication',
                    description: 'Play for 1 hour',
                    icon: '⏱️',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 60 * 60,
                    reward: {
                        type: 'energy',
                        value: 1000
                    },
                    rewardDescription: '+1,000 Impulse Energy'
                },
                {
                    id: 'neural-researcher',
                    name: 'Neural Researcher',
                    description: 'Play for 24 hours',
                    icon: '🔍',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 24 * 60 * 60,
                    reward: {
                        type: 'offlineRate',
                        value: 0.1
                    },
                    rewardDescription: '+10% offline production'
                }
            ],
            totalAchieved: 0
        };
    }
}

// Check for achievements based on various game actions
function checkAchievements() {
    if (!gameState.achievements) return;
    
    const achievements = gameState.achievements.list;
    let newAchievements = false;
    
    // Update progress for each achievement
    achievements.forEach(achievement => {
        if (achievement.achieved) return;
        
        let currentProgress = 0;
        
        // Check achievement type by ID prefix or specific condition
        if (achievement.id === 'first-impulse' || achievement.id === 'neuron-enthusiast' || 
            achievement.id === 'impulse-master' || achievement.id === 'neural-virtuoso') {
            // Clicking achievements
            currentProgress = gameState.totalClicks;
        } 
        else if (achievement.id === 'neural-foundations') {
            // First Neuron
            currentProgress = gameState.buildings.find(b => b.id === 'neuron').count > 0 ? 1 : 0;
        }
        else if (achievement.id === 'neural-expansion') {
            // 10 Neurons
            currentProgress = gameState.buildings.find(b => b.id === 'neuron').count;
        }
        else if (achievement.id === 'dendrite-developer') {
            // First Dendrite
            currentProgress = gameState.buildings.find(b => b.id === 'dendrite').count > 0 ? 1 : 0;
        }
        else if (achievement.id === 'axon-architect') {
            // First Axon
            currentProgress = gameState.buildings.find(b => b.id === 'axon_terminal').count > 0 ? 1 : 0;
        }
        else if (achievement.id === 'myelin-manager') {
            // First Myelin
            currentProgress = gameState.buildings.find(b => b.id === 'myelin_sheath').count > 0 ? 1 : 0;
        }
        else if (achievement.id === 'neural-diversification') {
            // All basic neural components
            const components = ['neuron', 'dendrite', 'axon_terminal', 'myelin_sheath'];
            currentProgress = components.filter(id => gameState.buildings.find(b => b.id === id).count > 0).length;
        }
        else if (achievement.id === 'first-automation' || achievement.id === 'neural-network' || 
                 achievement.id === 'neural-highway' || achievement.id === 'brain-power') {
            // Energy per second achievements
            currentProgress = gameState.energyPerSecond;
        }
        else if (achievement.id === 'energy-collector' || achievement.id === 'energy-stockpiler' || 
                 achievement.id === 'energy-magnate') {
            // Total energy achievements
            currentProgress = gameState.totalEnergy;
        }
        else if (achievement.id === 'neural-enhancement' || achievement.id === 'neural-optimization') {
            // Upgrade achievements
            currentProgress = gameState.upgrades.filter(u => u.purchased).length;
        }
        else if (achievement.id === 'neural-dedication' || achievement.id === 'neural-researcher') {
            // Time achievements
            currentProgress = gameState.playTime;
        }
        
        // Update achievement progress
        achievement.progress = currentProgress;
        
        // Check if achievement is completed
        if (currentProgress >= achievement.goal && !achievement.achieved) {
            achievement.achieved = true;
            gameState.achievements.totalAchieved++;
            applyAchievementReward(achievement);
            showAchievementNotification(achievement);
            newAchievements = true;
        }
    });
    
    // Update achievements tab if new achievements were earned
    if (newAchievements) {
        renderAchievements();
        saveGame(); // Save game after earning achievement
    }
}

// Apply achievement reward
function applyAchievementReward(achievement) {
    const reward = achievement.reward;
    
    switch (reward.type) {
        case 'clickPower':
            gameState.clickPower *= reward.value;
            break;
        case 'energy':
            gameState.energy += reward.value;
            gameState.totalEnergy += reward.value;
            break;
        case 'energyRate':
            // Apply a global multiplier to all buildings
            gameState.buildings.forEach(building => {
                building.baseProduction *= reward.value;
            });
            calculateEnergyPerSecond();
            break;
        case 'buildingBoost':
            // Boost a specific building type
            const building = gameState.buildings.find(b => b.id === reward.building);
            if (building) {
                building.baseProduction *= reward.value;
                calculateEnergyPerSecond();
            }
            break;
        case 'offlineRate':
            gameState.offlineProductionRate += reward.value;
            break;
        case 'offlineTime':
            gameState.maxOfflineTime += reward.value;
            break;
    }
    
    updateDisplay();
}

// Show achievement notification when earned
function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-info">
            <div class="achievement-name">Achievement Unlocked: ${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
            <div class="achievement-reward">Reward: ${achievement.rewardDescription}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Play a sound effect if available
    // playSound('achievement');
    
    // Remove notification after animation
    setTimeout(() => {
        notification.classList.add('achievement-fadeout');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

// Render achievements tab
function renderAchievements() {
    if (!gameState.achievements) return;
    
    const container = document.getElementById('achievements-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Add summary at the top
    const summary = document.createElement('div');
    summary.className = 'achievements-summary';
    summary.innerHTML = `
        <div>Achievements Earned: ${gameState.achievements.totalAchieved}/${gameState.achievements.list.length}</div>
        <div class="achievement-progress-bar">
            <div class="achievement-progress" style="width: ${(gameState.achievements.totalAchieved / gameState.achievements.list.length) * 100}%"></div>
        </div>
    `;
    container.appendChild(summary);
    
    // Sort achievements: completed first, then by progress percentage
    const sortedAchievements = [...gameState.achievements.list].sort((a, b) => {
        if (a.achieved && !b.achieved) return -1;
        if (!a.achieved && b.achieved) return 1;
        
        const aProgress = a.progress / a.goal;
        const bProgress = b.progress / b.goal;
        return bProgress - aProgress;
    });
    
    // Render each achievement
    sortedAchievements.forEach(achievement => {
        // Skip hidden achievements that haven't been achieved yet
        if (achievement.hidden && !achievement.achieved) return;
        
        const element = document.createElement('div');
        element.className = 'achievement';
        
        if (achievement.achieved) {
            element.classList.add('achieved');
        }
        
        const progressPercent = Math.min(100, Math.floor((achievement.progress / achievement.goal) * 100));
        
        element.innerHTML = `
            <div class="achievement-header">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-title">
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-description">${achievement.description}</div>
                </div>
            </div>
            <div class="achievement-footer">
                <div class="achievement-progress-text">
                    ${achievement.achieved ? 'Completed!' : `${formatNumber(achievement.progress)}/${formatNumber(achievement.goal)} (${progressPercent}%)`}
                </div>
                <div class="achievement-progress-bar">
                    <div class="achievement-progress" style="width: ${progressPercent}%"></div>
                </div>
                <div class="achievement-reward">${achievement.rewardDescription}</div>
            </div>
        `;
        
        container.appendChild(element);
    });
}

// Add achievement related functions to the global scope
window.initAchievements = initAchievements;
window.checkAchievements = checkAchievements;
window.renderAchievements = renderAchievements;