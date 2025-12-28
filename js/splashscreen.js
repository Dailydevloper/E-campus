document.addEventListener('DOMContentLoaded', () => {
    const splashDuration = 1000; 
    
    // **FIXED MISTAKE:** Use the root-relative path for the web server
    const nextPageUrl = '/page/login.html'; 

    const splashContainer = document.querySelector('.splash-container');
    
    setTimeout(() => {
        if (splashContainer) {
            // Start the fade-out transition
            splashContainer.style.opacity = '0'; 
            splashContainer.style.transition = 'opacity 0.5s ease-out';
        }

        // Wait for the fade-out transition to complete (500ms)
        setTimeout(() => {
            window.location.href = "/mainlogin.html"
        }, 500); 

    }, splashDuration); 
});