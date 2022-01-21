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

//Stream modifier


const { Transform } = require('stream')
const fs = require('fs');

function transform(filename, f) {
  const TransformStream = new Transform();

  TransformStream._transform = function(chunk, encoding, callback) {
    TransformStream.push(f(chunk.toString()))
    callback();
  }
  
  
  const readable = fs.createReadStream(filename);
  const writable = fs.createWriteStream('./JSON/adherent2.json');

  readable.pipe(TransformStream).pipe(writable)
}    

function removeByID(removeId, data){
  var f;
  var found = data.some(function(item, index) { f = index; return item.id == removeId; });
  if (!found) {
      return 'essaye encore looser';
  }
  
  data.splice(f, 1);
  return data
}

/////////////////


const { response } = require('express')

app.use(express.json())

app.post('/data', (req, res) => {
    const data = req.body;   

    try {
      fs.unlinkSync("./JSON/adherent.json");
      console.log("File removed:", "./JSON/adherent.json");
    } catch (err) {
      console.error(err);
    }
  
    fs.rename('./JSON/adherent2.json', './JSON/adherent.json', function(err) {
          if ( err ) console.log('ERROR: ' + err);
      });
  



    response.json({
        data: {
          id: 1,
          username: "Dylan",
        },
      });
})


app.post('/delete', (req, res) => {
    const datapost = req.body;
    const idDelete = datapost.data
    console.log(idDelete)
    transform(
      './JSON/adherent.json',
      function(value){
          let obj = JSON.parse(value)
          let json_f = removeByID(idDelete, obj)
          return JSON.stringify(json_f, null, 2)
      }
         
    )




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