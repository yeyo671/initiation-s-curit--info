const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bodyParser = require('body-parser');

// Configuration CSRF
const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

const app = express();
app.use(cookieParser());

// Page de formulaire protégée par le token CSRF
app.get('/form', csrfProtection, (req, res) => {
    // Générer un formulaire avec un token CSRF
    res.send(`
    <form action="/process" method="POST">
      <input type="hidden" name="_csrf" value="${req.csrfToken()}">
      <input type="text" name="name" placeholder="Entrez votre nom">
      <button type="submit">Soumettre</button>
    </form>
  `);
});

// Traitement du formulaire
app.post('/process', parseForm, csrfProtection, (req, res) => {
    // Le formulaire est sécurisé contre les attaques CSRF
    res.send(`Formulaire soumis avec succès. Nom : ${req.body.name}`);
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
