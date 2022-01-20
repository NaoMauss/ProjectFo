'use strict'
/* eslint-env node, es6 */

//Importe le module express
const express = require('express')

const PORT = 6300

//Créé une application express
const app = express()

//Importer la logique de la page d'accueil
const genererPageAccueil = require('./pages/index-get.js')

//Importe le fichier JSON
const data = require('./JSON/adherent.json')

//Ecoute la méthode GET et la route '/'
app.get('/', async(req, res) => {
    const indexHtml = await genererPageAccueil()
    res.send(indexHtml)
})

app.get('/data', async(req, res) => {
    res.send(data)
})


const { response } = require('express')

app.use(express.json())

app.post('/data', (req, res) => {
    const data = req.body;
    console.log(data);

    response.json({
        data: {
          id: 1,
          username: "Dylan",
        },
      });
})

// Retourne les styles 
app.use('/styles', express.static('D:/documents d/Fo/Tutos/ProjectFO/styles'))
app.use('/script', express.static('D:/documents d/Fo/Tutos/ProjectFO/script'))



//Démarrer le serveur et écouter un port donné
app.listen(PORT, () => {
    console.log(`Serveur démarré : http://localhost:${PORT}`);
})