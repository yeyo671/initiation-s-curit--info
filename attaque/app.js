const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Page de formulaire NON protégée (sans token CSRF)
app.get('/form', (req, res) => {
    // Générer un formulaire simple sans protection CSRF
    res.send(`
    <form action="/process" method="POST">
      <input type="text" name="name" placeholder="Entrez votre nom">
      <button type="submit">Soumettre</button>
    </form>
  `);
});

// Traitement du formulaire NON protégé
app.post('/process', (req, res) => {
    // Aucun contrôle de token CSRF
    res.send(`Formulaire soumis avec succès. Nom : ${req.body.name}`);
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
