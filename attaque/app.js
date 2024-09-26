const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Page de formulaire NON protégée (sans token CSRF)
app.get('/form', (req, res) => {
    // Générer un formulaire simple sans protection CSRF
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
      input[type="text"] {
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

    <form action="/process" method="POST">
      <input type="text" name="name" placeholder="Entrez votre nom">
      <button type="submit">Soumettre</button>
    </form>
  `);
});

// Traitement du formulaire NON protégé avec du CSS
app.post('/process', (req, res) => {
    // Ajouter du style à la réponse
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
      <h1>Formulaire soumis avec succès !</h1>
      <p>Nom : ${req.body.name}</p>
      <a href="/form">Soumettre un autre nom</a>
    </div>
  `);
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
