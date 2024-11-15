






function loginBtn(){
    const User = document.getElementById('username').value;
    const Password = document.getElementById('password').value;
    login(User, Password);

}





async function login(User, Password) {
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ User, Password })
        });

        if (response.ok) {
            const data = await response.json();
            alert('Login successful');

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
}
