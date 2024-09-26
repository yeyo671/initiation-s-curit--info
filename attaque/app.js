const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Page de formulaire NON protégée (sans token CSRF)
app.get('/transfer', (req, res) => {
  res.send(`
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f9;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      }
      form {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      input[type="text"], input[type="number"] {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      button {
        background-color: #5cb85c;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button:hover {
        background-color: #4cae4c;
      }
    </style>

    <h2>Effectuer un virement</h2>
    <form action="/process-transfer" method="POST">
      <label for="account">Compte bénéficiaire:</label>
      <input type="text" id="account" name="account" placeholder="Entrez le numéro de compte bénéficiaire">
      
      <label for="amount">Montant:</label>
      <input type="number" id="amount" name="amount" placeholder="Entrez le montant à transférer">
      
      <button type="submit">Effectuer le virement</button>
    </form>
  `);
});

// Traitement du virement NON protégé
app.post('/process-transfer', (req, res) => {
  const account = req.body.account;
  const amount = req.body.amount;
  res.send(`
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f9;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      }
      .result {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
      }
      .result h1 {
        color: #333;
      }
      .result p {
        font-size: 18px;
        color: #555;
      }
      a {
        color: #5cb85c;
        text-decoration: none;
        font-weight: bold;
      }
      a:hover {
        color: #4cae4c;
      }
    </style>

    <div class="result">
      <h1>Virement effectué avec succès !</h1>
      <p>Montant : ${amount} EUR</p>
      <p>Bénéficiaire : ${account}</p>
      <a href="/transfer">Effectuer un autre virement</a>
    </div>
  `);
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
