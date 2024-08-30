document.addEventListener("DOMContentLoaded", () => {
    const sunriseBtn = document.getElementById("toggle-sunrise");
    const middayBtn = document.getElementById("toggle-midday");
    const midnightBtn = document.getElementById("toggle-midnight");
    const duskBtn = document.getElementById("toggle-dusk");
    const skyStars = document.getElementById("sky__stars"); // Container for stars

    const skyPhases = ['dawn', 'noon', 'midnight', 'dusk'];
    let currentPhaseIndex = 0;
    let starsCreated = false;

    // Generate stars randomly using absolute position
    function createStars() {
        if (!starsCreated) {
            const starsCount = 40;
            for (let i = 0; i < starsCount; i++) {
                let x = Math.floor(Math.random() * 100 + 1);
                let y = Math.floor(Math.random() * 100 + 1);
                const starPoint = document.createElement("div");
                starPoint.className = "star";
                starPoint.style.left = `${x}%`;
                starPoint.style.top = `${y}%`;
                skyStars.appendChild(starPoint);
            }
            starsCreated = true;
        }
    }

    // Remove stars
    function removeStars() {
        while (skyStars.firstChild) {
            skyStars.removeChild(skyStars.firstChild);
        }
        starsCreated = false;
    }

    function toggleAnimation(phaseIndex) {
        const currentPhase = skyPhases[phaseIndex];

        // Show only the current sky phase
        const skyPhaseElements = document.querySelectorAll('.sky__phase');
        skyPhaseElements.forEach(phase => {
            phase.style.opacity = phase.classList.contains(`sky__${currentPhase}`) ? '1' : '0';
        });

        // Rotate sun and moon based on the current phase
        const sun = document.querySelector('.sun');
        const moon = document.querySelector('.moon');

        if (currentPhase === 'dawn') {
            sun.style.opacity = '1';
            sun.style.transform = 'translate(-400%, 90%)';
            moon.style.opacity = '0';
            removeStars(); // Remove stars for dusk phase
        } else if (currentPhase === 'noon') {
            sun.style.opacity = '1';
            sun.style.transform = 'translate(10%, -200%)';
            moon.style.opacity = '0';
            removeStars(); // Remove stars for dusk phase
        } else if (currentPhase === 'midnight') {
            sun.style.opacity = '0';
            moon.style.opacity = '1';
            moon.style.transform = 'translate(10%, -200%)';
            createStars(); // Create stars for midnight phase
        } else if (currentPhase === 'dusk') {
            sun.style.opacity = '0';
            moon.style.opacity = '1';
            moon.style.transform = 'translate(460%, 80%)';
            createStars(); // Create stars for dusk phase
        }
    }

    sunriseBtn.addEventListener("click", () => {
        toggleAnimation(0); // Sunrise (dawn)
    });

    middayBtn.addEventListener("click", () => {
        toggleAnimation(1); // Midday (noon)
    });

    midnightBtn.addEventListener("click", () => {
        toggleAnimation(2); // Midnight
    });

    duskBtn.addEventListener("click", () => {
        toggleAnimation(3); // Dusk
    });

    // Initialize with the first phase (dawn)
    toggleAnimation(currentPhaseIndex);
});