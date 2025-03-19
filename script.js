document.addEventListener('DOMContentLoaded', () => {
    const workBonus = document.getElementById('workBonus');
    const container = document.querySelector('.container');
    let isTransformed = false;
    let isAvoidanceActive = true;
    
    // Detect if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Set timer for 7 seconds
    setTimeout(() => {
        isAvoidanceActive = false;
        // Return button to its original position in the flow
        workBonus.style.position = 'static';
    }, 7000);
    
    // Get the container boundaries
    const getContainerBounds = () => {
        const containerBounds = container.getBoundingClientRect();
        return {
            minX: containerBounds.left,
            maxX: containerBounds.right - workBonus.offsetWidth,
            minY: containerBounds.top,
            maxY: containerBounds.bottom - workBonus.offsetHeight
        };
    };

    // Function to get a random position within bounds
    const getRandomPosition = (bounds) => {
        return {
            x: Math.random() * (bounds.maxX - bounds.minX) + bounds.minX,
            y: Math.random() * (bounds.maxY - bounds.minY) + bounds.minY
        };
    };

    // Function to calculate distance between two points
    const getDistance = (x1, y1, x2, y2) => {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    // Function to move the button to a random position
    const moveToRandomPosition = () => {
        const bounds = getContainerBounds();
        const newPos = getRandomPosition(bounds);
        workBonus.style.position = 'fixed';
        workBonus.style.left = `${newPos.x}px`;
        workBonus.style.top = `${newPos.y}px`;
        workBonus.style.transition = 'none';
        workBonus.offsetHeight; // Force a reflow
        workBonus.style.transition = 'background-color 0.3s ease';
    };

    // Function to move the button (desktop version)
    const moveButton = (mouseX, mouseY) => {
        if (!isAvoidanceActive || isTransformed) return;

        const bounds = getContainerBounds();
        const buttonBounds = workBonus.getBoundingClientRect();
        const buttonCenterX = buttonBounds.left + buttonBounds.width / 2;
        const buttonCenterY = buttonBounds.top + buttonBounds.height / 2;

        const distance = getDistance(mouseX, mouseY, buttonCenterX, buttonCenterY);
        
        if (distance < 100) {
            moveToRandomPosition();
        }
    };

    // Function to show KPI alert
    const showKPIAlert = () => {
        alert('Great choice! Time to work on those KPIs! 📈');
    };

    if (isMobile) {
        // Mobile behavior
        workBonus.addEventListener('click', () => {
            if (isAvoidanceActive) {
                moveToRandomPosition();
            } else if (!isTransformed) {
                isTransformed = true;
                workBonus.textContent = 'More KPI';
                workBonus.style.backgroundColor = '#8B0000';
                workBonus.classList.remove('moving-button');
                workBonus.classList.add('static-button');
            } else {
                showKPIAlert();
            }
        });
    } else {
        // Desktop behavior
        document.addEventListener('mousemove', (e) => {
            moveButton(e.clientX, e.clientY);
        });

        workBonus.addEventListener('click', () => {
            if (!isTransformed && !isAvoidanceActive) {
                isTransformed = true;
                workBonus.textContent = 'More KPI';
                workBonus.style.backgroundColor = '#8B0000';
                workBonus.classList.remove('moving-button');
                workBonus.classList.add('static-button');
            } else if (isTransformed) {
                showKPIAlert();
            }
        });
    }

    // Handle the More KPI button click
    document.getElementById('moreKPI').addEventListener('click', showKPIAlert);
}); 