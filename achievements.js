// Updated and new achievements for Impulse Empire

function initAchievements() {
    if (!gameState.achievements) {
        gameState.achievements = {
            list: [
                // EXISTING CLICK ACHIEVEMENTS with adjusted progress
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
                        value: 2
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
                // ADJUSTED - reduced goal from 10,000 to 5,000
                {
                    id: 'neural-virtuoso',
                    name: 'Neural Virtuoso',
                    description: 'Fire 5,000 impulses',
                    icon: '🌟',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 5000,
                    reward: {
                        type: 'energy',
                        value: 5000
                    },
                    rewardDescription: '+5,000 Impulse Energy'
                },
                
                // NEW click achievements for better progression
                {
                    id: 'impulse-guru',
                    name: 'Impulse Guru',
                    description: 'Fire 10,000 impulses',
                    icon: '✨',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 10000,
                    reward: {
                        type: 'clickPower',
                        value: 3
                    },
                    rewardDescription: 'Triple click power'
                },
                
                // EXISTING BUILDING ACHIEVEMENTS
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
                
                // NEW building achievements for better progression
                {
                    id: 'synapse-engineer',
                    name: 'Synapse Engineer',
                    description: 'Build your first Synapse Junction',
                    icon: '🔌',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 1,
                    reward: {
                        type: 'buildingBoost',
                        building: 'synapse_junction',
                        value: 1.5
                    },
                    rewardDescription: '+50% Synapse Junction production'
                },
                {
                    id: 'glial-technician',
                    name: 'Glial Technician',
                    description: 'Build your first Glial Cell Network',
                    icon: '🔧',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 1,
                    reward: {
                        type: 'buildingBoost',
                        building: 'glial_cell_network',
                        value: 1.5
                    },
                    rewardDescription: '+50% Glial Cell Network production'
                },
                {
                    id: 'oscillation-specialist',
                    name: 'Oscillation Specialist',
                    description: 'Build your first Neural Oscillator',
                    icon: '〰️',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 1,
                    reward: {
                        type: 'buildingBoost',
                        building: 'neural_oscillator',
                        value: 1.5
                    },
                    rewardDescription: '+50% Neural Oscillator production'
                },
                {
                    id: 'cortical-constructor',
                    name: 'Cortical Constructor',
                    description: 'Build your first Cortical Column',
                    icon: '🏛️',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 1,
                    reward: {
                        type: 'buildingBoost',
                        building: 'cortical_column',
                        value: 1.5
                    },
                    rewardDescription: '+50% Cortical Column production'
                },
                {
                    id: 'thalamic-technologist',
                    name: 'Thalamic Technologist',
                    description: 'Build your first Thalamic Relay',
                    icon: '📡',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 1,
                    reward: {
                        type: 'buildingBoost',
                        building: 'thalamic_relay',
                        value: 1.5
                    },
                    rewardDescription: '+50% Thalamic Relay production'
                },
                {
                    id: 'complete-neural-network',
                    name: 'Complete Neural Network',
                    description: 'Own at least one of every building type',
                    icon: '🌐',
                    achieved: false,
                    hidden: true,
                    progress: 0,
                    goal: 9, // All building types
                    reward: {
                        type: 'energyRate',
                        value: 1.5
                    },
                    rewardDescription: '+50% energy production'
                },
                
                // Secret building achievements
                {
                    id: 'neuron-collector',
                    name: 'Neuron Collector',
                    description: 'Own 50 of each building type',
                    icon: '🏆',
                    achieved: false,
                    hidden: true,
                    progress: 0,
                    goal: 9, // All building types at 50+
                    reward: {
                        type: 'energyRate',
                        value: 2
                    },
                    rewardDescription: 'Double energy production'
                },
                {
                    id: 'balanced-growth',
                    name: 'Balanced Growth',
                    description: 'Have exactly the same number of each building type (at least 10 each)',
                    icon: '⚖️',
                    achieved: false,
                    hidden: true,
                    progress: 0,
                    goal: 1,
                    reward: {
                        type: 'clickPower',
                        value: 5
                    },
                    rewardDescription: '5x click power'
                },
                
                // EXISTING Energy production achievements
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
                
                // NEW energy production achievements
                {
                    id: 'neural-supercharger',
                    name: 'Neural Supercharger',
                    description: 'Reach 10,000 energy per second',
                    icon: '⚡',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 10000,
                    reward: {
                        type: 'energyRate',
                        value: 1.75
                    },
                    rewardDescription: '+75% energy production'
                },
                {
                    id: 'neural-superconductor',
                    name: 'Neural Superconductor',
                    description: 'Reach 100,000 energy per second',
                    icon: '☢️',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 100000,
                    reward: {
                        type: 'energyRate',
                        value: 2
                    },
                    rewardDescription: 'Double energy production'
                },
                
                // EXISTING Total energy achievements
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
                
                // NEW total energy achievements
                {
                    id: 'energy-tycoon',
                    name: 'Energy Tycoon',
                    description: 'Generate 1,000,000,000 total energy',
                    icon: '💎',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 1000000000,
                    reward: {
                        type: 'offlineTime',
                        value: 4 * 60 * 60
                    },
                    rewardDescription: '+4 hours max offline time'
                },
                
                // EXISTING Upgrade achievements
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
                
                // NEW upgrade achievements
                {
                    id: 'upgrade-enthusiast',
                    name: 'Upgrade Enthusiast',
                    description: 'Purchase 15 different upgrades',
                    icon: '🔧',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 15,
                    reward: {
                        type: 'energyRate',
                        value: 1.25
                    },
                    rewardDescription: '+25% energy production'
                },
                {
                    id: 'upgrade-master',
                    name: 'Upgrade Master',
                    description: 'Purchase 30 different upgrades',
                    icon: '🛠️',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 30,
                    reward: {
                        type: 'energyRate',
                        value: 1.5
                    },
                    rewardDescription: '+50% energy production'
                },
                
                // EXISTING Time achievements with better progression
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
                // NEW time achievement for better progression
                {
                    id: 'neural-commitment',
                    name: 'Neural Commitment',
                    description: 'Play for 4 hours',
                    icon: '⏰',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 4 * 60 * 60,
                    reward: {
                        type: 'energy',
                        value: 5000
                    },
                    rewardDescription: '+5,000 Impulse Energy'
                },
                {
                    id: 'neural-persistence',
                    name: 'Neural Persistence',
                    description: 'Play for 12 hours',
                    icon: '🕰️',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 12 * 60 * 60,
                    reward: {
                        type: 'offlineRate',
                        value: 0.05
                    },
                    rewardDescription: '+5% offline production'
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
                },
                
                // NEW achievements for gameplay variety
                {
                    id: 'speedy-neuron',
                    name: 'Speedy Neuron',
                    description: 'Click 10 times in 5.0 seconds',
                    icon: '⚡',
                    achieved: false,
                    hidden: true,
                    progress: 0,
                    goal: 10,
                    reward: {
                        type: 'clickPower',
                        value: 1.5
                    },
                    rewardDescription: '+50% click power'
                },
                {
                    id: 'round-numbers',
                    name: 'Round Numbers',
                    description: 'Have exactly 10,000 energy',
                    icon: '🎯',
                    achieved: false,
                    hidden: true,
                    progress: 0,
                    goal: 1,
                    reward: {
                        type: 'energy',
                        value: 10000
                    },
                    rewardDescription: '+10,000 Impulse Energy'
                },
                {
                    id: 'neural-ascension',
                    name: 'Neural Ascension',
                    description: 'Perform your first prestige reset',
                    icon: '🔄',
                    achieved: false,
                    hidden: false,
                    progress: 0,
                    goal: 1,
                    reward: {
                        type: 'nppBoost',
                        value: 1.1
                    },
                    rewardDescription: '+10% Neural Plasticity Points on reset'
                },
                {
                    id: 'sunday-impulses',
                    name: 'Sunday Impulses',
                    description: 'Play the game on a Sunday',
                    icon: '📅',
                    achieved: false,
                    hidden: true,
                    progress: 0,
                    goal: 1,
                    reward: {
                        type: 'energyRate',
                        value: 1.1
                    },
                    rewardDescription: '+10% energy production'
                },
                {
                    id: 'midnight-researcher',
                    name: 'Midnight Researcher',
                    description: 'Play the game between midnight and 4 AM',
                    icon: '🌙',
                    achieved: false,
                    hidden: true,
                    progress: 0,
                    goal: 1,
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

// Updated checkAchievements function with new conditions
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
            achievement.id === 'impulse-master' || achievement.id === 'neural-virtuoso' ||
            achievement.id === 'impulse-guru') {
            // Clicking achievements
            currentProgress = gameState.totalClicks;
        } 
        // Building first purchase achievements
        else if (achievement.id === 'neural-foundations' || achievement.id === 'dendrite-developer' || 
                 achievement.id === 'axon-architect' || achievement.id === 'myelin-manager' ||
                 achievement.id === 'synapse-engineer' || achievement.id === 'glial-technician' ||
                 achievement.id === 'oscillation-specialist' || achievement.id === 'cortical-constructor' ||
                 achievement.id === 'thalamic-technologist') {
            const buildingId = getBuildingIdFromAchievement(achievement.id);
            currentProgress = gameState.buildings.find(b => b.id === buildingId).count > 0 ? 1 : 0;
        }
        else if (achievement.id === 'neural-expansion') {
            // 10 Neurons
            currentProgress = gameState.buildings.find(b => b.id === 'neuron').count;
        }
        else if (achievement.id === 'neural-diversification') {
            // All basic neural components
            const components = ['neuron', 'dendrite', 'axon_terminal', 'myelin_sheath'];
            currentProgress = components.filter(id => gameState.buildings.find(b => b.id === id).count > 0).length;
        }
        else if (achievement.id === 'complete-neural-network') {
            // All building types
            const allBuildingTypes = gameState.buildings.map(b => b.id);
            currentProgress = allBuildingTypes.filter(id => gameState.buildings.find(b => b.id === id).count > 0).length;
        }
        else if (achievement.id === 'neuron-collector') {
            // 50 of each building type
            currentProgress = gameState.buildings.filter(b => b.count >= 50).length;
        }
        else if (achievement.id === 'balanced-growth') {
            // Same number of each building (at least 10)
            const firstBuilding = gameState.buildings[0];
            if (firstBuilding.count >= 10) {
                const allSameCount = gameState.buildings.every(b => b.count === firstBuilding.count);
                currentProgress = allSameCount ? 1 : 0;
            }
        }
        else if (achievement.id === 'first-automation' || achievement.id === 'neural-network' || 
                 achievement.id === 'neural-highway' || achievement.id === 'brain-power' ||
                 achievement.id === 'neural-supercharger' || achievement.id === 'neural-superconductor') {
            // Energy per second achievements
            currentProgress = gameState.energyPerSecond;
        }
        else if (achievement.id === 'energy-collector' || achievement.id === 'energy-stockpiler' || 
                 achievement.id === 'energy-magnate' || achievement.id === 'energy-tycoon') {
            // Total energy achievements
            currentProgress = gameState.totalEnergy;
        }
        else if (achievement.id === 'neural-enhancement' || achievement.id === 'neural-optimization' ||
                 achievement.id === 'upgrade-enthusiast' || achievement.id === 'upgrade-master') {
            // Upgrade achievements
            currentProgress = gameState.upgrades.filter(u => u.purchased).length;
        }
        else if (achievement.id === 'neural-dedication' || achievement.id === 'neural-commitment' ||
                 achievement.id === 'neural-persistence' || achievement.id === 'neural-researcher') {
            // Time achievements
            currentProgress = gameState.playTime;
        }
        else if (achievement.id === 'speedy-neuron') {
            // Click 10 times in 5 seconds - handle in clickImpulse function
            // This will be checked in a separate function we'll add
            checkSpeedyNeuronAchievement();
        }
        else if (achievement.id === 'round-numbers') {
            // Exactly 10,000 energy
            currentProgress = (gameState.energy === 10000) ? 1 : 0;
        }
        else if (achievement.id === 'neural-ascension') {
            // First prestige
            currentProgress = gameState.prestige.prestigeCount;
        }
        else if (achievement.id === 'sunday-impulses') {
            // Play on Sunday
            const today = new Date();
            currentProgress = (today.getDay() === 0) ? 1 : 0;
        }
        else if (achievement.id === 'midnight-researcher') {
            // Play between midnight and 4 AM
            const hour = new Date().getHours();
            currentProgress = (hour >= 0 && hour < 4) ? 1 : 0;
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

// Helper function to get the building ID from achievement ID
function getBuildingIdFromAchievement(achievementId) {
    const mapping = {
        'neural-foundations': 'neuron',
        'dendrite-developer': 'dendrite',
        'axon-architect': 'axon_terminal',
        'myelin-manager': 'myelin_sheath',
        'synapse-engineer': 'synapse_junction',
        'glial-technician': 'glial_cell_network',
        'oscillation-specialist': 'neural_oscillator',
        'cortical-constructor': 'cortical_column',
        'thalamic-technologist': 'thalamic_relay'
    };
    
    return mapping[achievementId] || null;
}

// Add this to the applyAchievementReward function
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
        case 'nppBoost':
            // New reward type for prestige-related achievements
            if (gameState.prestige) {
                const nppBoostUpgrade = gameState.prestige.upgrades.find(u => u.id === 'npp-boost');
                if (nppBoostUpgrade) {
                    nppBoostUpgrade.level += 1;
                    nppBoostUpgrade.currentCost = Math.floor(nppBoostUpgrade.cost * Math.pow(nppBoostUpgrade.costMultiplier, nppBoostUpgrade.level));
                }
            }
            break;
    }
    
    updateDisplay();
}

// Add a system for tracking rapid clicks for the Speedy Neuron achievement
// Store the last 10 click timestamps
let recentClickTimes = [];

// This function should be called from the clickImpulse function
function trackClickForSpeedyNeuron() {
    const now = Date.now();
    
    // Add the current click time
    recentClickTimes.push(now);
    
    // Keep only the most recent 10 clicks
    if (recentClickTimes.length > 10) {
        recentClickTimes.shift();
    }
    
    // Check for achievement
    checkSpeedyNeuronAchievement();
}

// Check for the Speedy Neuron achievement
function checkSpeedyNeuronAchievement() {
    if (recentClickTimes.length < 10) return;
    
    // Check if 10 clicks happened within 5 seconds
    const oldestClick = recentClickTimes[0];
    const newestClick = recentClickTimes[recentClickTimes.length - 1];
    const timeSpan = (newestClick - oldestClick) / 1000; // Convert to seconds
    
    if (timeSpan <= 5.0) {
        // Get the achievement
        const achievement = gameState.achievements.list.find(a => a.id === 'speedy-neuron');
        
        if (achievement && !achievement.achieved) {
            achievement.progress = 10;
            achievement.achieved = true;
            gameState.achievements.totalAchieved++;
            applyAchievementReward(achievement);
            showAchievementNotification(achievement);
            renderAchievements();
            saveGame();
        }
    }
}

// Function to show achievement notification
function showAchievementNotification(achievement) {
    // Create the notification element
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    
    // Create notification content
    notification.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-info">
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
            <div class="achievement-reward">${achievement.rewardDescription}</div>
        </div>
    `;
    
    // Add notification to the document
    document.body.appendChild(notification);
    
    // Play a sound effect if available
    if (window.achievementSound) {
        window.achievementSound.play();
    }
    
    // Remove the notification after 5 seconds
    setTimeout(() => {
        notification.classList.add('achievement-fadeout');
        
        // Remove element from DOM after animation completes
        setTimeout(() => {
            notification.remove();
        }, 500); // Match the CSS animation duration
    }, 5000);
}

// Add a function to create category headers in the achievement display
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
    
    // Define achievement categories
    const categories = {
        'clicking': { title: 'Clicking Achievements', achievements: [] },
        'building': { title: 'Building Achievements', achievements: [] },
        'production': { title: 'Production Achievements', achievements: [] },
        'total-energy': { title: 'Total Energy Achievements', achievements: [] },
        'upgrades': { title: 'Upgrade Achievements', achievements: [] },
        'time': { title: 'Time Achievements', achievements: [] },
        'special': { title: 'Special Achievements', achievements: [] },
        'secret': { title: 'Secret Achievements', achievements: [] }
    };
    
    // Sort achievements into categories
    gameState.achievements.list.forEach(achievement => {
        // Skip hidden achievements that haven't been achieved yet
        if (achievement.hidden && !achievement.achieved) return;
        
        // Determine the category
        let category = 'special'; // Default category
        
        if (achievement.id.includes('impulse') || achievement.id === 'first-impulse' || 
            achievement.id === 'neural-virtuoso' || achievement.id === 'neuron-enthusiast' ||
            achievement.id === 'speedy-neuron') {
            category = 'clicking';
        }
        else if (achievement.id.includes('neuron-') && !achievement.id.includes('collector') || 
                achievement.id.includes('dendrite') || achievement.id.includes('axon') ||
                achievement.id.includes('myelin') || achievement.id.includes('cortical') ||
                achievement.id.includes('synapse') || achievement.id.includes('glial') ||
                achievement.id.includes('thalamic') || achievement.id.includes('oscillation') ||
                achievement.id === 'neural-diversification' || achievement.id === 'complete-neural-network') {
            category = 'building';
        }
        else if (achievement.id === 'first-automation' || achievement.id === 'neural-network' ||
                achievement.id === 'neural-highway' || achievement.id === 'brain-power' ||
                achievement.id === 'neural-supercharger' || achievement.id === 'neural-superconductor') {
            category = 'production';
        }
        else if (achievement.id.includes('energy-')) {
            category = 'total-energy';
        }
        else if (achievement.id === 'neural-enhancement' || achievement.id === 'neural-optimization' ||
                achievement.id === 'upgrade-enthusiast' || achievement.id === 'upgrade-master') {
            category = 'upgrades';
        }
        else if (achievement.id === 'neural-dedication' || achievement.id === 'neural-commitment' ||
                achievement.id === 'neural-persistence' || achievement.id === 'neural-researcher' ||
                achievement.id === 'midnight-researcher') {
            category = 'time';
        }
        else if (achievement.hidden && achievement.achieved) {
            category = 'secret';
        }
        
        categories[category].achievements.push(achievement);
    });
    
    // Sort each category by completion and then by progress percentage
    Object.values(categories).forEach(category => {
        category.achievements.sort((a, b) => {
            if (a.achieved && !b.achieved) return -1;
            if (!a.achieved && b.achieved) return 1;
            
            const aProgress = a.progress / a.goal;
            const bProgress = b.progress / b.goal;
            return bProgress - aProgress;
        });
    });
    
    // Render each category
    Object.values(categories).forEach(category => {
        if (category.achievements.length > 0) {
            // Add category header
            const categoryHeader = document.createElement('h3');
            categoryHeader.textContent = category.title;
            container.appendChild(categoryHeader);
            
            // Render achievements in this category
            category.achievements.forEach(achievement => {
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
    });
}

window.checkAchievements = checkAchievements;

// Update rendering
window.renderAchievements = renderAchievements;

// Add tracking for click speed
window.trackClickForSpeedyNeuron = trackClickForSpeedyNeuron;
window.checkSpeedyNeuronAchievement = checkSpeedyNeuronAchievement;

// Add helper functions
window.getBuildingIdFromAchievement = getBuildingIdFromAchievement;


// Add this to the window object
window.showAchievementNotification = showAchievementNotification;