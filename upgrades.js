// Upgrades System for Impulse Empire

// Initialize upgrades for the game state
function initUpgrades() {
    return upgradeDefinitions.map(def => ({
        ...def,
        purchased: false,
        visible: false
    }));
}

// Upgrade definitions
const upgradeDefinitions = [
    // CLICK POWER UPGRADES - TIER 1-3
    {
        id: 'click-power-1',
        name: 'Enhanced Impulses I',
        description: 'Double your click power',
        requirementText: 'Requires clicking at least 10 times',
        cost: 50,
        effect: function() {
            gameState.clickPower *= 2;
            updateClickPower();
        },
        requirement: function() {
            return gameState.totalClicks >= 10;
        },
        tier: 1,
        upgradeType: 'click'
    },
    {
        id: 'click-power-2',
        name: 'Enhanced Impulses II',
        description: 'Double your click power again',
        requirementText: 'Requires clicking at least 100 times',
        cost: 500,
        effect: function() {
            gameState.clickPower *= 2;
            updateClickPower();
        },
        requirement: function() {
            return gameState.totalClicks >= 100;
        },
        tier: 2,
        upgradeType: 'click'
    },
    {
        id: 'click-power-3',
        name: 'Enhanced Impulses III',
        description: 'Double your click power yet again',
        requirementText: 'Requires clicking at least 500 times',
        cost: 5000,
        effect: function() {
            gameState.clickPower *= 2;
            updateClickPower();
        },
        requirement: function() {
            return gameState.totalClicks >= 500;
        },
        tier: 3,
        upgradeType: 'click'
    },

    // SYNERGY CLICK POWER UPGRADES - TIER 1-3
    {
        id: 'synergy-click-1',
        name: 'Synaptic Synergy I',
        description: 'Each click adds bonus energy equal to 5% of your energy per second',
        requirementText: 'Requires at least 10 energy per second',
        cost: 1000,
        effect: function() {
            // This is handled in the clickImpulse function
        },
        requirement: function() {
            return gameState.energyPerSecond >= 10;
        },
        tier: 1,
        upgradeType: 'click-synergy',
        bonusPercentage: 0.05
    },
    {
        id: 'synergy-click-2',
        name: 'Synaptic Synergy II',
        description: 'Each click adds bonus energy equal to 10% of your energy per second',
        requirementText: 'Requires at least 50 energy per second',
        cost: 10000,
        effect: function() {
            // This is handled in the clickImpulse function
        },
        requirement: function() {
            return gameState.energyPerSecond >= 50;
        },
        tier: 2,
        upgradeType: 'click-synergy',
        bonusPercentage: 0.10
    },
    {
        id: 'synergy-click-3',
        name: 'Synaptic Synergy III',
        description: 'Each click adds bonus energy equal to 20% of your energy per second',
        requirementText: 'Requires at least 200 energy per second',
        cost: 100000,
        effect: function() {
            // This is handled in the clickImpulse function
        },
        requirement: function() {
            return gameState.energyPerSecond >= 200;
        },
        tier: 3,
        upgradeType: 'click-synergy',
        bonusPercentage: 0.20
    },

    // OFFLINE EFFICIENCY UPGRADES - TIER 1-3
    {
        id: 'offline-efficiency-1',
        name: 'Neural Persistence I',
        description: 'Improves offline production to 50% of normal rate',
        requirementText: 'Requires owning at least 20 total neurons',
        cost: 5000,
        effect: function() {
            gameState.offlineProductionRate = 0.5;
        },
        requirement: function() {
            const totalNeurons = gameState.buildings.reduce((total, building) => total + building.count, 0);
            return totalNeurons >= 20;
        },
        tier: 1,
        upgradeType: 'offline-efficiency'
    },
    {
        id: 'offline-efficiency-2',
        name: 'Neural Persistence II',
        description: 'Improves offline production to 75% of normal rate',
        requirementText: 'Requires owning at least 50 total neurons',
        cost: 50000,
        effect: function() {
            gameState.offlineProductionRate = 0.75;
        },
        requirement: function() {
            const totalNeurons = gameState.buildings.reduce((total, building) => total + building.count, 0);
            return totalNeurons >= 50;
        },
        tier: 2,
        upgradeType: 'offline-efficiency'
    },
    {
        id: 'offline-efficiency-3',
        name: 'Neural Persistence III',
        description: 'Achieves 100% offline production efficiency',
        requirementText: 'Requires owning at least 100 total neurons',
        cost: 500000,
        effect: function() {
            gameState.offlineProductionRate = 1.0;
        },
        requirement: function() {
            const totalNeurons = gameState.buildings.reduce((total, building) => total + building.count, 0);
            return totalNeurons >= 100;
        },
        tier: 3,
        upgradeType: 'offline-efficiency'
    },

    // OFFLINE TIME UPGRADES - TIER 1-3
    {
        id: 'offline-time-1',
        name: 'Extended Neural Memory I',
        description: 'Increases maximum offline collection time to 12 hours',
        requirementText: 'Requires generating 100K total energy',
        cost: 20000,
        effect: function() {
            gameState.maxOfflineTime = 12 * 60 * 60; // 12 hours in seconds
        },
        requirement: function() {
            return gameState.totalEnergy >= 100000;
        },
        tier: 1,
        upgradeType: 'offline-time'
    },
    {
        id: 'offline-time-2',
        name: 'Extended Neural Memory II',
        description: 'Increases maximum offline collection time to 18 hours',
        requirementText: 'Requires generating 1M total energy',
        cost: 200000,
        effect: function() {
            gameState.maxOfflineTime = 18 * 60 * 60; // 18 hours in seconds
        },
        requirement: function() {
            return gameState.totalEnergy >= 1000000;
        },
        tier: 2,
        upgradeType: 'offline-time'
    },
    {
        id: 'offline-time-3',
        name: 'Extended Neural Memory III',
        description: 'Increases maximum offline collection time to 24 hours',
        requirementText: 'Requires generating 10M total energy',
        cost: 2000000,
        effect: function() {
            gameState.maxOfflineTime = 24 * 60 * 60; // 24 hours in seconds
        },
        requirement: function() {
            return gameState.totalEnergy >= 10000000;
        },
        tier: 3,
        upgradeType: 'offline-time'
    },

    // NEURON BUILDING UPGRADES - TIER 1-3
    {
        id: 'neuron-upgrade-1',
        name: 'Efficient Neurons I',
        description: 'Basic Neurons are twice as effective',
        requirementText: 'Requires owning at least 10 Basic Neurons',
        cost: 200,
        effect: function() {
            const neuron = gameState.buildings.find(b => b.id === 'neuron');
            neuron.baseProduction = neuron.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'neuron').count >= 10;
        },
        tier: 1,
        upgradeType: 'building',
        buildingId: 'neuron'
    },
    {
        id: 'neuron-upgrade-2',
        name: 'Efficient Neurons II',
        description: 'Basic Neurons are twice as effective again',
        requirementText: 'Requires owning at least 25 Basic Neurons',
        cost: 2000,
        effect: function() {
            const neuron = gameState.buildings.find(b => b.id === 'neuron');
            neuron.baseProduction = neuron.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'neuron').count >= 25;
        },
        tier: 2,
        upgradeType: 'building',
        buildingId: 'neuron'
    },
    {
        id: 'neuron-upgrade-3',
        name: 'Efficient Neurons III',
        description: 'Basic Neurons are twice as effective yet again',
        requirementText: 'Requires owning at least 50 Basic Neurons',
        cost: 20000,
        effect: function() {
            const neuron = gameState.buildings.find(b => b.id === 'neuron');
            neuron.baseProduction = neuron.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'neuron').count >= 50;
        },
        tier: 3,
        upgradeType: 'building',
        buildingId: 'neuron'
    },

    // DENDRITE BUILDING UPGRADES - TIER 1-3
    {
        id: 'dendrite-upgrade-1',
        name: 'Efficient Dendrites I',
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
        },
        tier: 1,
        upgradeType: 'building',
        buildingId: 'dendrite'
    },
    {
        id: 'dendrite-upgrade-2',
        name: 'Efficient Dendrites II',
        description: 'Dendrite Collectors are twice as effective again',
        requirementText: 'Requires owning at least 25 Dendrite Collectors',
        cost: 20000,
        effect: function() {
            const dendrite = gameState.buildings.find(b => b.id === 'dendrite');
            dendrite.baseProduction = dendrite.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'dendrite').count >= 25;
        },
        tier: 2,
        upgradeType: 'building',
        buildingId: 'dendrite'
    },
    {
        id: 'dendrite-upgrade-3',
        name: 'Efficient Dendrites III',
        description: 'Dendrite Collectors are twice as effective yet again',
        requirementText: 'Requires owning at least 50 Dendrite Collectors',
        cost: 200000,
        effect: function() {
            const dendrite = gameState.buildings.find(b => b.id === 'dendrite');
            dendrite.baseProduction = dendrite.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'dendrite').count >= 50;
        },
        tier: 3,
        upgradeType: 'building',
        buildingId: 'dendrite'
    },

    // AXON TERMINAL BUILDING UPGRADES - TIER 1-3
    {
        id: 'axon-upgrade-1',
        name: 'Efficient Axon Terminals I',
        description: 'Axon Terminals are twice as effective',
        requirementText: 'Requires owning at least 10 Axon Terminals',
        cost: 10000,
        effect: function() {
            const axon = gameState.buildings.find(b => b.id === 'axon_terminal');
            axon.baseProduction = axon.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'axon_terminal').count >= 10;
        },
        tier: 1,
        upgradeType: 'building',
        buildingId: 'axon_terminal'
    },
    {
        id: 'axon-upgrade-2',
        name: 'Efficient Axon Terminals II',
        description: 'Axon Terminals are twice as effective again',
        requirementText: 'Requires owning at least 25 Axon Terminals',
        cost: 100000,
        effect: function() {
            const axon = gameState.buildings.find(b => b.id === 'axon_terminal');
            axon.baseProduction = axon.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'axon_terminal').count >= 25;
        },
        tier: 2,
        upgradeType: 'building',
        buildingId: 'axon_terminal'
    },
    {
        id: 'axon-upgrade-3',
        name: 'Efficient Axon Terminals III',
        description: 'Axon Terminals are twice as effective yet again',
        requirementText: 'Requires owning at least 50 Axon Terminals',
        cost: 1000000,
        effect: function() {
            const axon = gameState.buildings.find(b => b.id === 'axon_terminal');
            axon.baseProduction = axon.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'axon_terminal').count >= 50;
        },
        tier: 3,
        upgradeType: 'building',
        buildingId: 'axon_terminal'
    },

    // MYELIN SHEATH BUILDING UPGRADES - TIER 1-3
    {
        id: 'myelin-upgrade-1',
        name: 'Efficient Myelin Sheaths I',
        description: 'Myelin Sheaths are twice as effective',
        requirementText: 'Requires owning at least 10 Myelin Sheaths',
        cost: 50000,
        effect: function() {
            const myelin = gameState.buildings.find(b => b.id === 'myelin_sheath');
            myelin.baseProduction = myelin.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'myelin_sheath').count >= 10;
        },
        tier: 1,
        upgradeType: 'building',
        buildingId: 'myelin_sheath'
    },
    {
        id: 'myelin-upgrade-2',
        name: 'Efficient Myelin Sheaths II',
        description: 'Myelin Sheaths are twice as effective again',
        requirementText: 'Requires owning at least 25 Myelin Sheaths',
        cost: 500000,
        effect: function() {
            const myelin = gameState.buildings.find(b => b.id === 'myelin_sheath');
            myelin.baseProduction = myelin.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'myelin_sheath').count >= 25;
        },
        tier: 2,
        upgradeType: 'building',
        buildingId: 'myelin_sheath'
    },
    {
        id: 'myelin-upgrade-3',
        name: 'Efficient Myelin Sheaths III',
        description: 'Myelin Sheaths are twice as effective yet again',
        requirementText: 'Requires owning at least 50 Myelin Sheaths',
        cost: 5000000,
        effect: function() {
            const myelin = gameState.buildings.find(b => b.id === 'myelin_sheath');
            myelin.baseProduction = myelin.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'myelin_sheath').count >= 50;
        },
        tier: 3,
        upgradeType: 'building',
        buildingId: 'myelin_sheath'
    },

    // SYNAPSE JUNCTION BUILDING UPGRADES - TIER 1-3
    {
        id: 'synapse-upgrade-1',
        name: 'Efficient Synapse Junctions I',
        description: 'Synapse Junctions are twice as effective',
        requirementText: 'Requires owning at least 10 Synapse Junctions',
        cost: 200000,
        effect: function() {
            const synapse = gameState.buildings.find(b => b.id === 'synapse_junction');
            synapse.baseProduction = synapse.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'synapse_junction').count >= 10;
        },
        tier: 1,
        upgradeType: 'building',
        buildingId: 'synapse_junction'
    },
    {
        id: 'synapse-upgrade-2',
        name: 'Efficient Synapse Junctions II',
        description: 'Synapse Junctions are twice as effective again',
        requirementText: 'Requires owning at least 25 Synapse Junctions',
        cost: 2000000,
        effect: function() {
            const synapse = gameState.buildings.find(b => b.id === 'synapse_junction');
            synapse.baseProduction = synapse.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'synapse_junction').count >= 25;
        },
        tier: 2,
        upgradeType: 'building',
        buildingId: 'synapse_junction'
    },
    {
        id: 'synapse-upgrade-3',
        name: 'Efficient Synapse Junctions III',
        description: 'Synapse Junctions are twice as effective yet again',
        requirementText: 'Requires owning at least 50 Synapse Junctions',
        cost: 20000000,
        effect: function() {
            const synapse = gameState.buildings.find(b => b.id === 'synapse_junction');
            synapse.baseProduction = synapse.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'synapse_junction').count >= 50;
        },
        tier: 3,
        upgradeType: 'building',
        buildingId: 'synapse_junction'
    },

    // GLIAL CELL NETWORK BUILDING UPGRADES - TIER 1-3
    {
        id: 'glial-upgrade-1',
        name: 'Efficient Glial Cell Networks I',
        description: 'Glial Cell Networks are twice as effective',
        requirementText: 'Requires owning at least 10 Glial Cell Networks',
        cost: 1000000,
        effect: function() {
            const glial = gameState.buildings.find(b => b.id === 'glial_cell_network');
            glial.baseProduction = glial.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'glial_cell_network').count >= 10;
        },
        tier: 1,
        upgradeType: 'building',
        buildingId: 'glial_cell_network'
    },
    {
        id: 'glial-upgrade-2',
        name: 'Efficient Glial Cell Networks II',
        description: 'Glial Cell Networks are twice as effective again',
        requirementText: 'Requires owning at least 25 Glial Cell Networks',
        cost: 10000000,
        effect: function() {
            const glial = gameState.buildings.find(b => b.id === 'glial_cell_network');
            glial.baseProduction = glial.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'glial_cell_network').count >= 25;
        },
        tier: 2,
        upgradeType: 'building',
        buildingId: 'glial_cell_network'
    },
    {
        id: 'glial-upgrade-3',
        name: 'Efficient Glial Cell Networks III',
        description: 'Glial Cell Networks are twice as effective yet again',
        requirementText: 'Requires owning at least 50 Glial Cell Networks',
        cost: 100000000,
        effect: function() {
            const glial = gameState.buildings.find(b => b.id === 'glial_cell_network');
            glial.baseProduction = glial.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'glial_cell_network').count >= 50;
        },
        tier: 3,
        upgradeType: 'building',
        buildingId: 'glial_cell_network'
    },

    // NEURAL OSCILLATOR BUILDING UPGRADES - TIER 1-3
    {
        id: 'oscillator-upgrade-1',
        name: 'Efficient Neural Oscillators I',
        description: 'Neural Oscillators are twice as effective',
        requirementText: 'Requires owning at least 10 Neural Oscillators',
        cost: 2400000,
        effect: function() {
            const oscillator = gameState.buildings.find(b => b.id === 'neural_oscillator');
            oscillator.baseProduction = oscillator.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'neural_oscillator').count >= 10;
        },
        tier: 1,
        upgradeType: 'building',
        buildingId: 'neural_oscillator'
    },
    {
        id: 'oscillator-upgrade-2',
        name: 'Efficient Neural Oscillators II',
        description: 'Neural Oscillators are twice as effective again',
        requirementText: 'Requires owning at least 25 Neural Oscillators',
        cost: 24000000,
        effect: function() {
            const oscillator = gameState.buildings.find(b => b.id === 'neural_oscillator');
            oscillator.baseProduction = oscillator.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'neural_oscillator').count >= 25;
        },
        tier: 2,
        upgradeType: 'building',
        buildingId: 'neural_oscillator'
    },
    {
        id: 'oscillator-upgrade-3',
        name: 'Efficient Neural Oscillators III',
        description: 'Neural Oscillators are twice as effective yet again',
        requirementText: 'Requires owning at least 50 Neural Oscillators',
        cost: 240000000,
        effect: function() {
            const oscillator = gameState.buildings.find(b => b.id === 'neural_oscillator');
            oscillator.baseProduction = oscillator.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'neural_oscillator').count >= 50;
        },
        tier: 3,
        upgradeType: 'building',
        buildingId: 'neural_oscillator'
    },

    // CORTICAL COLUMN BUILDING UPGRADES - TIER 1-3
    {
        id: 'cortical-upgrade-1',
        name: 'Efficient Cortical Columns I',
        description: 'Cortical Columns are twice as effective',
        requirementText: 'Requires owning at least 10 Cortical Columns',
        cost: 20000000,
        effect: function() {
            const cortical = gameState.buildings.find(b => b.id === 'cortical_column');
            cortical.baseProduction = cortical.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'cortical_column').count >= 10;
        },
        tier: 1,
        upgradeType: 'building',
        buildingId: 'cortical_column'
    },
    {
        id: 'cortical-upgrade-2',
        name: 'Efficient Cortical Columns II',
        description: 'Cortical Columns are twice as effective again',
        requirementText: 'Requires owning at least 25 Cortical Columns',
        cost: 200000000,
        effect: function() {
            const cortical = gameState.buildings.find(b => b.id === 'cortical_column');
            cortical.baseProduction = cortical.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'cortical_column').count >= 25;
        },
        tier: 2,
        upgradeType: 'building',
        buildingId: 'cortical_column'
    },
    {
        id: 'cortical-upgrade-3',
        name: 'Efficient Cortical Columns III',
        description: 'Cortical Columns are twice as effective yet again',
        requirementText: 'Requires owning at least 50 Cortical Columns',
        cost: 2000000000,
        effect: function() {
            const cortical = gameState.buildings.find(b => b.id === 'cortical_column');
            cortical.baseProduction = cortical.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'cortical_column').count >= 50;
        },
        tier: 3,
        upgradeType: 'building',
        buildingId: 'cortical_column'
    },

    // THALAMIC RELAY BUILDING UPGRADES - TIER 1-3
    {
        id: 'thalamic-upgrade-1',
        name: 'Efficient Thalamic Relays I',
        description: 'Thalamic Relays are twice as effective',
        requirementText: 'Requires owning at least 10 Thalamic Relays',
        cost: 100000000,
        effect: function() {
            const thalamic = gameState.buildings.find(b => b.id === 'thalamic_relay');
            thalamic.baseProduction = thalamic.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'thalamic_relay').count >= 10;
        },
        tier: 1,
        upgradeType: 'building',
        buildingId: 'thalamic_relay'
    },
    {
        id: 'thalamic-upgrade-2',
        name: 'Efficient Thalamic Relays II',
        description: 'Thalamic Relays are twice as effective again',
        requirementText: 'Requires owning at least 25 Thalamic Relays',
        cost: 1000000000,
        effect: function() {
            const thalamic = gameState.buildings.find(b => b.id === 'thalamic_relay');
            thalamic.baseProduction = thalamic.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'thalamic_relay').count >= 25;
        },
        tier: 2,
        upgradeType: 'building',
        buildingId: 'thalamic_relay'
    },
    {
        id: 'thalamic-upgrade-3',
        name: 'Efficient Thalamic Relays III',
        description: 'Thalamic Relays are twice as effective yet again',
        requirementText: 'Requires owning at least 50 Thalamic Relays',
        cost: 10000000000,
        effect: function() {
            const thalamic = gameState.buildings.find(b => b.id === 'thalamic_relay');
            thalamic.baseProduction = thalamic.baseProduction * 2;
            calculateEnergyPerSecond();
        },
        requirement: function() {
            return gameState.buildings.find(b => b.id === 'thalamic_relay').count >= 50;
        },
        tier: 3,
        upgradeType: 'building',
        buildingId: 'thalamic_relay'
    },

    // GLOBAL UPGRADES AND SPECIAL EFFECTS
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
        },
        tier: 1,
        upgradeType: 'global'
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
        },
        tier: 1,
        upgradeType: 'global'
    },
    {
        id: 'brain-wave-synchronization',
        name: 'Brain Wave Synchronization',
        description: 'When you buy a building, gain temporary bonus production for 30 seconds',
        requirementText: 'Requires owning at least 5 Neural Oscillators',
        cost: 2000000,
        effect: function() {
            // The effect implementation has been modified to use a flag in the buildings.js file
            // No need to modify the purchaseBuilding function here anymore
        },
        requirement: function() {
            const oscillator = gameState.buildings.find(b => b.id === 'neural_oscillator');
            return oscillator && oscillator.count >= 5;
        },
        tier: 1,
        upgradeType: 'global'
    }
];

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

// Update upgrade visibility based on game progress
function updateUpgradeVisibility() {
    gameState.upgrades.forEach(upgrade => {
        if (!upgrade.purchased) {
            // Logic for making upgrades visible:
            
            // 1. For tiered upgrades, they are visible if:
            //    - Tier 1: 50% of the requirement is met
            //    - Tier 2: Previous tier is purchased
            //    - Tier 3: Previous tier is purchased
            
            if (upgrade.tier > 1) {
                // Find the previous tier upgrade of the same type
                const prevTierUpgrade = gameState.upgrades.find(u => 
                    u.upgradeType === upgrade.upgradeType && 
                    u.tier === upgrade.tier - 1 && 
                    (upgrade.buildingId ? u.buildingId === upgrade.buildingId : true)
                );
                
                if (prevTierUpgrade) {
                    upgrade.visible = prevTierUpgrade.purchased;
                }
            } else {
                // For tier 1 upgrades:
                
                // Click power upgrades
                if (upgrade.upgradeType === 'click') {
                    const clickRequirement = parseInt(upgrade.requirementText.match(/\d+/)[0]);
                    upgrade.visible = gameState.totalClicks >= (clickRequirement * 0.5);
                }
                // Energy per second upgrades
                else if (upgrade.upgradeType === 'click-synergy') {
                    const epsRequirement = parseInt(upgrade.requirementText.match(/\d+/)[0]);
                    upgrade.visible = gameState.energyPerSecond >= (epsRequirement * 0.5);
                }
                // Building-specific upgrades
                else if (upgrade.upgradeType === 'building' && upgrade.buildingId) {
                    const buildingCountMatch = upgrade.requirementText.match(/(\d+)/);
                    if (buildingCountMatch) {
                        const requiredCount = parseInt(buildingCountMatch[1]);
                        const building = gameState.buildings.find(b => b.id === upgrade.buildingId);
                        if (building) {
                            upgrade.visible = building.count >= (requiredCount * 0.5);
                        }
                    }
                }
                // Offline efficiency and time upgrades
                else if (upgrade.upgradeType === 'offline-efficiency' || upgrade.upgradeType === 'offline-time') {
                    if (upgrade.requirementText.includes('total neurons')) {
                        const requiredCount = parseInt(upgrade.requirementText.match(/\d+/)[0]);
                        const totalNeurons = gameState.buildings.reduce((total, b) => total + b.count, 0);
                        upgrade.visible = totalNeurons >= (requiredCount * 0.5);
                    } else if (upgrade.requirementText.includes('total energy')) {
                        const energyMatch = upgrade.requirementText.match(/(\d+)([KMB])/);
                        if (energyMatch) {
                            let requiredEnergy = parseInt(energyMatch[1]);
                            if (energyMatch[2] === 'K') requiredEnergy *= 1000;
                            if (energyMatch[2] === 'M') requiredEnergy *= 1000000;
                            if (energyMatch[2] === 'B') requiredEnergy *= 1000000000;
                            upgrade.visible = gameState.totalEnergy >= (requiredEnergy * 0.5);
                        }
                    }
                }
                // Global upgrades
                else if (upgrade.upgradeType === 'global') {
                    if (upgrade.requirementText.includes('total buildings')) {
                        const requiredCount = parseInt(upgrade.requirementText.match(/\d+/)[0]);
                        const totalBuildings = gameState.buildings.reduce((total, b) => total + b.count, 0);
                        upgrade.visible = totalBuildings >= (requiredCount * 0.5);
                    } else {
                        // Make visible at 50% of cost
                        upgrade.visible = gameState.energy >= (upgrade.cost * 0.5);
                    }
                }
                // Default case - make visible at 50% of cost
                else {
                    upgrade.visible = gameState.energy >= (upgrade.cost * 0.5);
                }
            }
        }
    });
}

// Render upgrades
function renderUpgrades() {
    const container = document.getElementById('upgrades-container');
    container.innerHTML = '';
    
    // Group upgrades by type for better organization
    const upgradeGroups = {
        'click': {
            title: 'Click Power Upgrades',
            upgrades: []
        },
        'click-synergy': {
            title: 'Click Synergy Upgrades',
            upgrades: []
        },
        'offline-efficiency': {
            title: 'Offline Efficiency Upgrades',
            upgrades: []
        },
        'offline-time': {
            title: 'Offline Time Upgrades',
            upgrades: []
        },
        'building': {
            title: 'Building Production Upgrades',
            upgrades: []
        },
        'global': {
            title: 'Global Upgrades',
            upgrades: []
        }
    };
    
    // Sort upgrades into groups
    gameState.upgrades.forEach(upgrade => {
        if (!upgrade.purchased && upgrade.visible) {
            if (upgradeGroups[upgrade.upgradeType]) {
                upgradeGroups[upgrade.upgradeType].upgrades.push(upgrade);
            }
        }
    });
    
    // Render each group
    Object.keys(upgradeGroups).forEach(groupKey => {
        const group = upgradeGroups[groupKey];
        if (group.upgrades.length > 0) {
            // Add group header
            const groupHeader = document.createElement('h3');
            groupHeader.textContent = group.title;
            container.appendChild(groupHeader);
            
            // Create a container for this group
            const groupContainer = document.createElement('div');
            groupContainer.className = 'upgrade-group';
            container.appendChild(groupContainer);
            
            // Sort upgrades by tier within the group
            group.upgrades.sort((a, b) => a.tier - b.tier);
            
            // Add each upgrade in the group
            group.upgrades.forEach(upgrade => {
                const meetsRequirement = upgrade.requirement();
                const element = document.createElement('div');
                element.className = 'upgrade';
                
                if (!meetsRequirement || gameState.energy < upgrade.cost) {
                    element.className += ' disabled';
                }
                
                // Add a class for the tier
                element.className += ` tier-${upgrade.tier}`;
                
                // For building upgrades, add a class for the building type
                if (upgrade.buildingId) {
                    element.className += ` building-${upgrade.buildingId}`;
                }
                
                let tierBadge = '';
                if (upgrade.tier > 0) {
                    tierBadge = `<span class="upgrade-tier">Tier ${upgrade.tier}</span>`;
                }
                
                element.innerHTML = `
                    <div class="upgrade-header">
                        <div class="upgrade-name">${upgrade.name}</div>
                        ${tierBadge}
                    </div>
                    <div class="upgrade-description">${upgrade.description}</div>
                    <div class="upgrade-cost">Cost: ${formatNumber(upgrade.cost)} Impulse Energy</div>
                    <div class="upgrade-tooltip">
                        <span class="upgrade-requirement">${upgrade.requirementText}</span>
                    </div>
                `;
                
                if (meetsRequirement) {
                    element.addEventListener('click', () => purchaseUpgrade(upgrade.id));
                }
                
                groupContainer.appendChild(element);
            });
        }
    });
    
    // If no upgrades are visible, show a message
    if (container.childElementCount === 0) {
        const message = document.createElement('p');
        message.textContent = 'No upgrades available yet. Keep playing to unlock them!';
        container.appendChild(message);
    }
}

// Update click power display
function updateClickPower() {
    // We could update a display of the click power here if needed
}

// Get the bonus click power from synergy upgrades
function getClickSynergyBonus() {
    let bonus = 0;
    
    // Check all purchased click-synergy upgrades and get the highest bonus
    const synergyUpgrades = gameState.upgrades.filter(
        u => u.upgradeType === 'click-synergy' && u.purchased
    );
    
    if (synergyUpgrades.length > 0) {
        // Find the highest bonus percentage
        const highestBonus = Math.max(...synergyUpgrades.map(u => u.bonusPercentage));
        bonus = gameState.energyPerSecond * highestBonus;
    }
    
    return Math.floor(bonus);
}

// Export functions to global scope
window.initUpgrades = initUpgrades;
window.purchaseUpgrade = purchaseUpgrade;
window.renderUpgrades = renderUpgrades;
window.updateUpgradeVisibility = updateUpgradeVisibility;
window.updateClickPower = updateClickPower;
window.getClickSynergyBonus = getClickSynergyBonus;