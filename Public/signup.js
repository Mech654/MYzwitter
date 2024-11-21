// Function to handle cancellation (Redirect to logout.html)
function cancelReverse() {
    window.location.href = 'logout.html';
}

// Function to validate registration form values
function verifyRegisterValues(email, username, password, confirmPassword) {
    if (email === '' || username === '' || password === '' || confirmPassword === '') {
        alert('Please fill all fields');
        return false;
    } else if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false;
    } else if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return false;
    } else if (!email.includes('@')) {
        alert('Invalid email');
        return false;
    } else {
        return true;
    }
}

// Main signUp function
async function signUp() {
    console.log('Signing up...');
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('password-repeat').value;
    
    // Validate the form values
    if (verifyRegisterValues(email, username, password, confirmPassword)) {
        // Proceed to register on the server
        const success = await register(email, username, password);
        
        // If registration is successful, redirect user
        if (success) {
            localStorage.setItem('user', username);
            window.location.href = "index.html"; // Redirect to homepage or user dashboard
        }
    }
}

// Function to handle registration logic (calls server-side)
async function register(email, username, password) {
    try {
        const success = await registerServer(email, username, password);
        return success;
        
    } catch (error) {
        return false;
    }
    
}

// Function to handle server-side registration via fetch
function registerServer(email, username, password) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        console.log('Sending form data:', formData);
        console.log('Sending form data:', formData.get('email'));

        // Send data using fetch (POST method)
        fetch('../Server/register.php', {
            method: 'POST',
            body: formData // Send the form data as multipart/form-data
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            // Ensure the response body is not empty
            return response.text().then(text => {
                try {
                    return text ? JSON.parse(text) : {}; // If empty, return an empty object
                } catch (e) {
                    throw new Error('Failed to parse JSON');
                }
            });
        })
        .then(data => {
            console.log('Server Response:', data); // Log the response to check

            if (data.success) {
                resolve(true); // Resolve the promise with success
            } else {
                resolve(false); // Resolve with failure
            }
        })
        .catch(error => {
            console.error('Error:', error);
            reject(error); // Reject the promise on error
        });
    });
}


// Pre-fill the form with test data (for testing purposes)
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('email').value = 'test@email.com';
    document.getElementById('username').value = 'testuser';
    document.getElementById('password').value = 'password123';
    document.getElementById('password-repeat').value = 'password123';
});
