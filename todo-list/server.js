const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware pour analyser les requêtes JSON
app.use(bodyParser.json());

// Servir les fichiers statiques du dossier public
app.use(express.static(path.join(__dirname, 'public')));

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
