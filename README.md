<h1>User Management API</h1>
<p>This API provides endpoints for user registration, getting user information, borrowing money, and repaying loans.</p>
<h2>Endpoints</h2>
<ol>
    <li>
        <h3>1. Register User</h3>
        <p><strong>Endpoint:</strong> <code>POST /register</code></p>
        <p><strong>Functionality:</strong> This API allows users to register themselves on the application. When a user makes a request to register, the API creates a new user account and assigns an initial Purchase Power amount, twice of its monthly salary.</p>
        <p><strong>Postman Screenshot:</strong></p>
        <p><strong><img src="https://github.com/user-attachments/assets/f8f9576d-e187-4329-9482-2a24d21a156c" alt="Register Request Screenshot"></p>
    </li>
     <li>
        <h3>2. Login User</h3>
        <p><strong>
Endpoint:</strong> <code>POST /login</code></p>
        <p><strong>Functionality:</strong>This API allows users to Login themselves on the application.</p>
        <p><strong>Postman Screenshot:</strong></p>
        <p><strong><img src="https://github.com/user-attachments/assets/ecae97aa-7f86-4e80-9082-ee3191c33151" alt="Repay Request Screenshot"></p>
    </li>
    <li>
        <h3>3. Get User</h3>
        <p><strong>Endpoint:</strong> <code>GET /user</code></p>
        <p><strong>Functionality:</strong> This API allows users to retrieve their account information.</p>
        <p><strong>Postman Screenshot:</strong></p>
        <p><strong><img src="https://github.com/user-attachments/assets/03be949a-f40e-4a07-bef6-37d27378efe1" alt="Get User Request Screenshot"></p>
    </li>
    <li>
        <h3>4. Borrow Money</h3>
        <p><strong>Endpoint:</strong> <code>POST /borrow</code></p>
        <p><strong>Functionality:</strong> This API allows users to borrow money from the application. When a user makes a request to borrow money, the API updates the user's Purchase Power amount and calculates the tenure of repayments and the monthly repayments with an interest rate of 8%. The API returns the updated Purchase Power amount and the monthly repayment amount.</p>
        <p><strong>Postman Screenshot:</strong></p>
        <p><strong><img src="https://github.com/user-attachments/assets/613cb562-9ad5-4c8a-bf73-d05560ecc73b" alt="Borrow Request Screenshot"></p>   
    </li>
</ol>
<h2>Error Handling</h2>
<p>If the user is not found, the API returns a 404 error with a message "User not found". If there is an internal server error, the API returns a 500 error with a message "Internal Server Error".</p>
