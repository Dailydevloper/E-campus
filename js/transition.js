document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    // 1. **REQUIRED CHANGE:** The URL of your server's login endpoint.
    const loginApiUrl = '/api/login'; 
    // 2. The URL of the page to transition to after success.
    const homeScreenUrl = '/page/admin/adminhome.html'; 

    // --- Element Selection ---
    const loginButton = document.getElementById('al-login');
    const usernameInput = document.getElementById('al-username');
    const passwordInput = document.getElementById('al-password');
    const bodyElement = document.body;

    // --- Core Login Function ---
    const handleLogin = async () => {
        const enteredUsername = usernameInput.value;
        const enteredPassword = passwordInput.value;

        // Prevent the button from being clicked repeatedly while waiting
        loginButton.disabled = true; 
        loginButton.textContent = 'Verifying...'; 

        try {
            // 1. Send credentials to the server (API)
            const response = await fetch(loginApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username: enteredUsername, 
                    password: enteredPassword 
                }),
            });

            // 2. Process Server Response
            if (response.ok) {
                // HTTP status 200-299 means success
                const result = await response.json();

                if (result.success) {
                    // --- SUCCESS: Start Transition ---
                    console.log("Login successful. Initiating transition.");

                    // Apply smooth fade-out transition
                    bodyElement.style.opacity = '0';
                    bodyElement.style.transition = 'opacity 0.5s ease-out';
                    
                    // 3. Redirect after transition completes
                    setTimeout(() => {
                        window.location.href = homeScreenUrl;
                    }, 500); 

                } else {
                    // Server responded with success: false (e.g., incorrect credentials)
                    alert(result.message || 'Invalid username or password.');
                }
                
            } else {
                // Server responded with an error status (e.g., 500 internal server error)
                alert('Server error occurred. Please try again later.');
            }

        } catch (error) {
            console.error('Network or communication error:', error);
            alert('A connection error occurred. Check your network.');
        } finally {
            // Re-enable button and reset text regardless of success/failure
            loginButton.disabled = false;
            loginButton.textContent = 'Verify'; 
            passwordInput.value = ''; // Clear password field for security
        }
    };

    // --- Event Listener ---
    loginButton.addEventListener('click', (e) => {
        e.preventDefault(); // Stop the button from triggering a form submission (if it were inside a form)
        handleLogin();
    });
});