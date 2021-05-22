const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the dashboard page
        console.log('LOGGED IN SUCCESSFULLY!');
        document.location.replace('/dashboard');
      } else {
          console.log('LOG IN UNSUCCESSSFUL');
        alert(response.statusText);
      }
    }
  };
  

  document
  .querySelector('#loginForm')
  .addEventListener('submit', loginFormHandler);
  