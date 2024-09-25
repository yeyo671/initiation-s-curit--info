-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    role VARCHAR(20) DEFAULT 'user' -- role could be 'user' or 'admin'
);

-- Table des transactions financières
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10, 2),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table des profils d'utilisateurs
CREATE TABLE IF NOT EXISTS profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    address VARCHAR(255),
    phone VARCHAR(15),
    birthdate DATE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table des messages privés
CREATE TABLE IF NOT EXISTS private_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT,
    receiver_id INT,
    message TEXT,
    send_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
);

-- Insérer des utilisateurs fictifs
INSERT INTO users (username, password, email, role) VALUES
('admin', 'admin123', 'admin@example.com', 'admin'),
('user1', 'password1', 'user1@example.com', 'user'),
('user2', 'password2', 'user2@example.com', 'user');

-- Insérer des transactions financières fictives
INSERT INTO transactions (user_id, amount, description) VALUES
(1, 1000.50, 'Payment from client A'),
(2, 250.00, 'Refund for order 123'),
(3, 500.75, 'Salary payment');

-- Insérer des profils d'utilisateurs fictifs
INSERT INTO profiles (user_id, first_name, last_name, address, phone, birthdate) VALUES
(1, 'John', 'Doe', '123 Admin St.', '555-1234', '1980-01-01'),
(2, 'Jane', 'Smith', '456 User St.', '555-5678', '1990-02-02'),
(3, 'Bob', 'Johnson', '789 Guest Rd.', '555-9012', '1985-03-03');

-- Insérer des messages privés fictifs
INSERT INTO private_messages (sender_id, receiver_id, message) VALUES
(1, 2, 'Hello Jane, your account has been updated.'),
(2, 1, 'Thanks Admin, I have seen the changes.'),
(3, 2, 'Hi Jane, I need some information.');
