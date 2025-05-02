// Buildings System for Impulse Empire

// Building definitions
const buildingDefinitions = [
    {
        id: 'neuron',
        name: 'Basic Neuron',
        description: 'The fundamental processing cell that forms the foundation of your neural network',
        baseDescription: 'Generates 0.1 impulse energy per second',
        buildingDescription: 'Generates 0.1 impulse energy per second',
        baseCost: 10,
        baseProduction: 0.1,
        costMultiplier: 1.15
    },
    {
        id: 'dendrite',
        name: 'Dendrite Collector',
        description: 'Branch-like extensions that gather and channel incoming neural signals',
        baseDescription: 'Generates 0.5 impulse energy per second',
        buildingDescription: 'Generates 0.5 impulse energy per second',
        baseCost: 100,
        baseProduction: 0.5,
        costMultiplier: 1.15
    },
    {
        id: 'axon_terminal',
        name: 'Axon Terminal',
        description: 'Specialized endings that transmit impulses across synaptic junctions',
        baseDescription: 'Generates 2.5 impulse energy per second',
        buildingDescription: 'Generates 2.5 impulse energy per second',
        baseCost: 500,
        baseProduction: 2.5,
        costMultiplier: 1.15
    },
    {
        id: 'myelin_sheath',
        name: 'Myelin Sheath',
        description: 'Insulating layer that dramatically accelerates signal transmission speed',
        baseDescription: 'Generates 6.25 impulse energy per second',
        buildingDescription: 'Generates 6.25 impulse energy per second',
        baseCost: 2500,
        baseProduction: 6.25,
        costMultiplier: 1.15
    },
    {
        id: 'synapse_junction',
        name: 'Synapse Junction',
        description: 'Specialized junction between neurons that improves signal transmission',
        baseDescription: 'Generates 15 impulse energy per second',
        buildingDescription: 'Generates 15 impulse energy per second',
        baseCost: 10000,
        baseProduction: 15,
        costMultiplier: 1.15
    },
    {
        id: 'glial_cell_network',
        name: 'Glial Cell Network',
        description: 'Support cells that maintain neural health and enhance efficiency',
        baseDescription: 'Generates 40 impulse energy per second',
        buildingDescription: 'Generates 40 impulse energy per second',
        baseCost: 50000,
        baseProduction: 40,
        costMultiplier: 1.15
    },
    {
        id: 'neural_oscillator',
        name: 'Neural Oscillator',
        description: 'Creates rhythmic impulse patterns for enhanced energy generation',
        baseDescription: 'Generates 250 impulse energy per second',
        buildingDescription: 'Generates 250 impulse energy per second',
        baseCost: 120000,
        baseProduction: 250,
        costMultiplier: 1.15
    },
    {
        id: 'cortical_column',
        name: 'Cortical Column ',
        description: 'A complex arrangement of neurons forming a functional unit',
        baseDescription: 'Generates 250 impulse energy per second',
        buildingDescription: 'Generates 250 impulse energy per second',
        baseCost: 1000000,
        baseProduction: 500,
        costMultiplier: 1.15
    },
    {
        id: 'thalamic_relay',
        name: 'Thalamic Relay',
        description: 'Routes and amplifies signals through major neural pathways',
        baseDescription: 'Generates 2,000 impulse energy per second',
        buildingDescription: 'Generates 2,000 impulse energy per second',
        baseCost: 5000000,
        baseProduction: 2000,
        costMultiplier: 1.15
    }
];

// Initialize buildings for the game state
function initBuildings() {
    return buildingDefinitions.map(def => ({
        ...def,
        visible: false,
        cost: def.baseCost,
        count: 0,
        production: 0
    }));
}

// Calculate energy per second from buildings
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

// Function to activate brain wave boost (30% production for 30 seconds)
function activateBrainWaveBoost() {
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
}

// Update building visibility based on game progress
function updateBuildingVisibility() {
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
}

// Export functions to global scope
window.initBuildings = initBuildings;
window.calculateEnergyPerSecond = calculateEnergyPerSecond;
window.calculateBuildingEffects = calculateBuildingEffects;
window.purchaseBuilding = purchaseBuilding;
window.renderBuildings = renderBuildings;
window.activateBrainWaveBoost = activateBrainWaveBoost;
window.updateBuildingVisibility = updateBuildingVisibility;