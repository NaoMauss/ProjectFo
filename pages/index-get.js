'use strict'
/* eslint-env node, es6 */

const { readFile } = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(readFile)

const READ_OPTIONS = { encoding : 'utf-8'}
const INDEX_URL = 'D:/documents d/Fo/Tutos/ProjectFO/index-admin.html'


module.exports = async() => {
    //Récupérer le contenu du fichier html index.html
    const contenu = await readFileAsync(INDEX_URL, READ_OPTIONS)

    //Retourner la page HTML
    return contenu
}
