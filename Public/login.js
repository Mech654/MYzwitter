function loginBtn() {
    const User = document.getElementById('username').value;
    const Password = document.getElementById('password').value;
    login(User, Password).then(Nocap => {
        if (Nocap) {
            window.location.href = "index.html";  // Redirect on successful login
        } else {
            alert('Login failed');
        }
    });
}

async function login(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
        const response = await fetch('../Server/account_login.php', {
            method: 'POST',
            body: formData  // Remove Content-Type header when using FormData
        });

        if (response.ok) {
            const data = await response.json();  // Parse the JSON response
            if (data.success) {  // Check for success flag in response
                alert('Login successful');
                return true;  // Successful login
            } else {
                // Handle login failure based on server response
                alert(data.message || 'Login failed');
                return false;
            }
        } else if (response.status === 401) {
            alert('Incorrect password');
        } else if (response.status === 404) {
            alert('User not found');
        } else {
            alert('Authentication error');
        }
    } catch (error) {
        alert('Error: Unable to connect to the server');
    }

    return false;  // Return false in case of any other failure
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('username').value = 'testuser';
    document.getElementById('password').value = 'password123';
});
