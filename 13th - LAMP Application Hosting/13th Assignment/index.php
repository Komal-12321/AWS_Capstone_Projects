<!DOCTYPE html>
<html>
<head>
    <title>LAMP Project</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <h2>User Registration</h2>

    <form action="insert.php" method="POST">
        <input type="text" name="name" placeholder="Enter Name" required>
        <input type="email" name="email" placeholder="Enter Email" required>
        <button type="submit">Register</button>
    </form>

    <a href="view.php">View Users</a>
</div>

</body>
</html>