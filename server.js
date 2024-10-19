const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path'); // Add this to use path module

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key', // Change this to a secure key
  resave: false,
  saveUninitialized: true
}));

// Serve static files (like HTML, CSS, JS)
app.use(express.static('public')); // Assuming you want to serve files from a 'public' folder

// Root Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Adjust the path if your index.html is in a different location
});

// Handle signup logic
app.post('/signup', (req, res) => {
  // Log form data
  console.log(req.body); // Log form data
  // Simulating successful signup, save user info to session
  req.session.user = {
    name: req.body.username, // Assuming your signup form has a field named 'username'
    email: req.body.email // Assuming your signup form has a field named 'email'
  };
  res.redirect('/account'); // Redirect to account page after signup
});

// Handle login logic
app.post('/login', (req, res) => {
  // Here, you would usually check credentials against a database
  const { 'login-email': email, 'login-password': password } = req.body;

  // Dummy authentication for demonstration (replace with actual logic)
  if (email === 'test@example.com' && password === 'password123') {
    req.session.user = {
      name: 'John Doe', // Replace with the actual user name from your database
      email: email
    };
    res.redirect('/account'); // Redirect to the account page upon successful login
  } else {
    res.send('Login failed!'); // Handle failed login
  }
});

// Account route
app.get('/account', (req, res) => {
  if (req.session.user) {
    // User is logged in, render the account page
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>User Account - E-commerce</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              header {
                  background-color: #007BFF;
                  color: white;
                  padding: 15px;
                  text-align: center;
              }
              .container {
                  max-width: 1200px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: white;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              .section {
                  margin-bottom: 40px;
              }
              .section h2 {
                  color: #007BFF;
                  margin-bottom: 10px;
              }
              .form-group {
                  margin-bottom: 15px;
              }
              label {
                  display: block;
                  margin-bottom: 5px;
              }
              input[type="text"],
              input[type="email"],
              input[type="password"],
              input[type="file"],
              textarea,
              select {
                  width: 100%;
                  padding: 10px;
                  margin-bottom: 10px;
                  border: 1px solid #ccc;
                  border-radius: 5px;
              }
              button {
                  padding: 10px 15px;
                  background-color: #007BFF;
                  color: white;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
              }
              button:hover {
                  background-color: #0056b3;
              }
              /* Responsive Design */
              @media (max-width: 768px) {
                  .container {
                      padding: 15px;
                  }
                  .section {
                      margin-bottom: 30px;
                  }
                  input,
                  button {
                      font-size: 1rem;
                  }
              }
          </style>
      </head>
      <body>
      <header>
          <h1>My Account</h1>
      </header>
      <div class="container">
          <div class="section">
              <h2>Profile Information</h2>
              <div class="form-group">
                  <label for="username">Username/Display Name</label>
                  <input type="text" id="username" name="username" value="${req.session.user.name}" placeholder="Enter your display name" readonly>
              </div>
              <div class="form-group">
                  <label for="avatar">Profile Picture</label>
                  <input type="file" id="avatar" name="avatar">
              </div>
              <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" name="email" value="${req.session.user.email}" placeholder="Enter your email" readonly>
              </div>
              <div class="form-group">
                  <label for="phone">Phone Number</label>
                  <input type="text" id="phone" name="phone" placeholder="Enter your phone number">
              </div>
              <div class="form-group">
                  <label for="shippingAddress">Shipping Address</label>
                  <textarea id="shippingAddress" name="shippingAddress" placeholder="Enter your shipping address"></textarea>
              </div>
              <div class="form-group">
                  <label for="billingAddress">Billing Address</label>
                  <textarea id="billingAddress" name="billingAddress" placeholder="Enter your billing address"></textarea>
              </div>
          </div>
          <!-- More sections can be added as needed -->
          <div class="section">
              <h2>Account Management</h2>
              <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" id="password" name="password" placeholder="Enter your password">
              </div>
              <button>Change Password</button>
          </div>
          <!-- More sections can be added as needed -->
      </div>
      </body>
      </html>
    `);
  } else {
    // User is not logged in
    res.send(`
      <h1>My Account</h1>
      <p>You are not logged in. Please log in or create an account to access your profile.</p>
      <a href="/">Login / Create Account</a>
    `);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
