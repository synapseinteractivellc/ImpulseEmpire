// Mobile-specific enhancements for Impulse Empire

// Initialize mobile-specific features
function initMobile() {
    // Add event listeners for tab navigation with data attributes
    setupTabNavigation();
    
    // Detect mobile devices and adapt the game
    if (isMobileDevice()) {
        adaptForMobile();
    }
    
    // Handle touch events for impulse button
    setupTouchEvents();
    
    // Fix tooltip behavior for touch devices
    fixMobileTooltips();
}

// Determine if the user is on a mobile device
function isMobileDevice() {
    return (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (window.innerWidth <= 768)
    );
}

// Apply mobile-specific adaptations
function adaptForMobile() {
    // Add mobile class to body for CSS targeting
    document.body.classList.add('mobile');
    
    // Adjust game loop for better performance on mobile
    optimizeGameLoop();
    
    // Enable vibration feedback on actions if available
    enableVibrationFeedback();
    
    // Make achievement notifications dismiss on tap
    setupDismissibleNotifications();
}

// Set up improved tab navigation with data attributes instead of onclick
function setupTabNavigation() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        // Remove the onclick attribute
        tab.removeAttribute('onclick');
        
        // Add event listener
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            openTabMobile(tabName);
        });
    });
}

// Improved tab opening function
function openTabMobile(tabName) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    // Deactivate all tabs
    const tabs = document.getElementsByClassName('tab');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    
    // Show the selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Activate the selected tab
    const selectedTab = document.querySelector(`.tab[data-tab="${tabName}"]`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // If switching to achievements tab, check and render achievements
    if (tabName === 'achievements') {
        checkAchievements();
        renderAchievements();
    }
}

// Setup touch events for the impulse button
function setupTouchEvents() {
    const impulseButton = document.getElementById('impulse-button');
    
    if (impulseButton) {
        // Remove existing click event listener
        const oldElement = impulseButton.cloneNode(true);
        impulseButton.parentNode.replaceChild(oldElement, impulseButton);
        
        // Add touch event listeners
        oldElement.addEventListener('touchstart', function(e) {
            e.preventDefault(); // Prevent default to avoid delay
            this.classList.add('active');
            clickImpulse();
            
            // Provide haptic feedback if available
            if (window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate(20);
            }
        });
        
        oldElement.addEventListener('touchend', function() {
            this.classList.remove('active');
        });
        
        // Keep click for non-touch devices
        oldElement.addEventListener('click', function(e) {
            // Only trigger if not a touch device
            if (!e.sourceCapacity || !e.sourceCapacity.firesTouchEvents) {
                clickImpulse();
            }
        });
    }
}

// Fix tooltips for mobile devices
function fixMobileTooltips() {
    // Use touch events to show/hide tooltips
    document.addEventListener('touchstart', function(e) {
        // Hide any visible tooltips
        const visibleTooltips = document.querySelectorAll('.building-tooltip.visible, .upgrade-tooltip.visible');
        visibleTooltips.forEach(tooltip => tooltip.classList.remove('visible'));
        
        // Check if the touched element has a tooltip
        let target = e.target;
        while (target && !target.classList.contains('building') && !target.classList.contains('upgrade')) {
            target = target.parentElement;
        }
        
        // If a building or upgrade was touched, show its tooltip
        if (target) {
            const tooltip = target.querySelector('.building-tooltip, .upgrade-tooltip');
            if (tooltip) {
                tooltip.classList.add('visible');
                
                // Hide the tooltip after 3 seconds
                setTimeout(() => {
                    tooltip.classList.remove('visible');
                }, 3000);
            }
        }
    });
}

// Optimize the game loop for better mobile performance
function optimizeGameLoop() {
    // Reduce update frequency on mobile
    if (window.gameLoopInterval) {
        clearInterval(window.gameLoopInterval);
    }
    
    // Update every 200ms instead of 100ms for better battery life
    window.gameLoopInterval = setInterval(function() {
        const now = Date.now();
        const deltaTime = (now - gameState.lastUpdate) / 1000;
        gameState.lastUpdate = now;
        
        // Add energy from buildings
        const energyToAdd = gameState.energyPerSecond * deltaTime;
        gameState.energy += energyToAdd;
        gameState.totalEnergy += energyToAdd;
        
        // Update play time
        gameState.playTime += deltaTime;
        
        // Call the building effects calculation
        calculateBuildingEffects();
        
        // Reduce frequency of non-critical operations
        // Only check for new unlocks every 2nd cycle
        if (Math.random() < 0.5) {
            updateVisibility();
        }
        
        // Check for achievements less frequently
        if (Math.random() < 0.25) {
            checkAchievements();
        }
        
        updateDisplay();
        
        // Save less frequently to reduce disk operations
        if (Math.random() < 0.1) {
            saveGame();
        }
    }, 200); // Update 5 times per second instead of 10
}

// Enable vibration feedback for actions if available
function enableVibrationFeedback() {
    // Store the original functions
    const originalPurchaseBuilding = window.purchaseBuilding;
    const originalPurchaseUpgrade = window.purchaseUpgrade;
    const originalPerformPrestige = window.performPrestige;
    
    // Override with versions that include vibration
    window.purchaseBuilding = function(buildingId) {
        const building = gameState.buildings.find(b => b.id === buildingId);
        
        if (gameState.energy >= building.cost) {
            originalPurchaseBuilding(buildingId);
            
            // Vibrate on successful purchase
            if (window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate(30);
            }
        }
    };
    
    window.purchaseUpgrade = function(upgradeId) {
        const upgrade = gameState.upgrades.find(u => u.id === upgradeId);
        
        if (!upgrade.purchased && gameState.energy >= upgrade.cost && upgrade.requirement()) {
            originalPurchaseUpgrade(upgradeId);
            
            // Vibrate on successful purchase
            if (window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate(50);
            }
        }
    };
    
    window.performPrestige = function() {
        const result = originalPerformPrestige();
        
        // Longer vibration for significant events
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate([50, 100, 50]);
        }
        
        return result;
    };
}

// Make notifications dismissible with a tap
function setupDismissibleNotifications() {
    // Achievement notifications
    const originalShowAchievementNotification = window.showAchievementNotification;
    
    window.showAchievementNotification = function(achievement) {
        originalShowAchievementNotification(achievement);
        
        // Find the notification that was just created
        setTimeout(() => {
            const notification = document.querySelector('.achievement-notification:not(.dismissing)');
            if (notification) {
                // Add tap to dismiss
                notification.addEventListener('touchstart', function() {
                    this.classList.add('dismissing');
                    this.classList.add('achievement-fadeout');
                    
                    setTimeout(() => {
                        this.remove();
                    }, 500);
                });
            }
        }, 100);
    };
}

// Make building descriptions more compact for mobile
function compactBuildingDescriptions() {
    // Store the original function
    const originalRenderBuildings = window.renderBuildings;
    
    window.renderBuildings = function() {
        originalRenderBuildings();
        
        // If on mobile, shorten descriptions
        if (isMobileDevice()) {
            const buildingElements = document.querySelectorAll('.building');
            
            buildingElements.forEach(element => {
                const productionText = element.querySelector('.building-current-production-description');
                if (productionText) {
                    const text = productionText.textContent;
                    // Simplify text for mobile
                    if (text.includes('Total Generation:')) {
                        productionText.textContent = text.replace('Total Generation:', '').trim();
                    }
                }
            });
        }
    };
}

// Add PWA functionality
function setupPWA() {
    // Check if the app is already installed
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later
        deferredPrompt = e;
        
        // Show a custom install button if needed
        showInstallButton();
    });
    
    function showInstallButton() {
        // Create a small button in the corner
        const installButton = document.createElement('div');
        installButton.className = 'install-pwa-button';
        installButton.textContent = 'Install App';
        
        installButton.addEventListener('click', async () => {
            if (deferredPrompt) {
                // Show the prompt
                deferredPrompt.prompt();
                // Wait for the user to respond to the prompt
                const { outcome } = await deferredPrompt.userChoice;
                // We've used the prompt, and can't use it again, throw it away
                deferredPrompt = null;
                
                // Hide the button
                installButton.style.display = 'none';
            }
        });
        
        document.body.appendChild(installButton);
    }
}

// Initialize mobile features on window load
window.addEventListener('load', initMobile);

// Export functions to global scope
window.initMobile = initMobile;
window.isMobileDevice = isMobileDevice;
window.openTabMobile = openTabMobile;