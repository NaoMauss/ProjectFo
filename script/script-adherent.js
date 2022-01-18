const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = []

/*[{"name":"Je m’inscris sur e-FO", "house":"Pour s'inscrire sur e-fo, rendez vous sur www.e-fo.fr, sélectionner ‘s’inscrire’ et renseigner les champs demandés. Vous devrez alors sélectionner votre syndicat d’appartenance en filtrant la recherche avec au choix, le nom de votre syndicat et/ou le mail de votre secrétaire et/ou le code postal de votre syndicat. Une fois le syndicat sélectionné.", "image":"http://hp-api.herokuapp.com/images/harry.jpg",
"link":"https://www.loom.com/embed/2a3d1c0990ed4bcabd2b53074ceef0a0", "id":"1"}, {"name":"Inscrit par mon syndicat", "house":"Si votre syndicat vous à inscrit dans e-FO, vous avez reçu un mail d’information vous invitant à suivre un lien pour finaliser la création de votre profil. Une fois connecté, vous aurez accès à tous les services e-FO.", "image":"http://hp-api.herokuapp.com/images/harry.jpg",
"link":"https://www.loom.com/embed/996760b1e47f446f8580fbe4530fce6f"}, {"name":"Mes données personnelles", "house":"Vous données personnelles sont modifiables depuis l’onglet données personnelles.", "image":"http://hp-api.herokuapp.com/images/harry.jpg",
"link":"https://www.loom.com/embed/771c2eb02d764c3ebe21c41a565c9043"},
{"name":"Mes données professionnelles", "house":"Vos données professionnelles sont modifiables depuis l’onglet données professionnelles.", "image":"http://hp-api.herokuapp.com/images/harry.jpg",
"link":"https://www.loom.com/embed/027f696147974c9ab24e2d07e53f8cb2"}, {"name":"Transmission des données personnelles", "house":"Les adhérents, inscrits et validés par les syndicats, ne sont connus/visibles que du syndicat. Les données sont en effet cryptées et inaccessibles aux autres utilisateurs et notamment à la confédération, y inclus les administrateurs informatiques. Seul le syndicat d’appartenance accède à ces données. Cependant, pour participer à des stages, il est nécessaire de consentir à la diffusion de ces données.", "image":"http://hp-api.herokuapp.com/images/harry.jpg",
"link":"https://www.loom.com/embed/69557dd5ce7f4ff6b2ca30370d0d4b22"}, {"name":"Saisie de mon numéro de carte syndicale", "house":"Le numéro de carte présent sur votre carte syndicale peut etre renseigné dans votre compte e-fo sous l’onglet adhésion. Une fois renseigné, votre carte est alors dématérialisée. Pour cela, vérifier votre syndicat d’adhésion, l’année d’exercice et le nombre de timbre présent sur votre carte.", "image":"http://hp-api.herokuapp.com/images/harry.jpg",
"link":"https://www.loom.com/embed/8bfd3d02c11b4a6cb3d00377d61f9375"}, {"name": "Mon syndicat d'adhésion - Vérification", "house": "Pour obtenir des contacts sur son syndicat d’adhésion, se rendre sur l’onglet ‘Mes contacts FO’", "link":"https://www.loom.com/embed/be169fa263d946da9d14652934be3891"},
{"name":"Modification", "house":"La modification de son adhésion est possible depuis l’onglet adhésion. Celle-ci est assujettie à une validation du syndicat désigné.", "link":"https://www.loom.com/embed/865c228ded1045df8a73d705bb2f65b0"}, {"name":"Inscription à une formation", "house":"L’inscription aux stages CFMS découverte CFMS est désormais possible en ligne depuis votre espace adhérent. Il vous suffit d’afficher le calendrier des formations, sélectionner le stage souhaité et renseigner ses données professionnelles. Votre demande de participation au stage sera alors soumise à validation par votre syndicat et par l’organisateur du stage. À tout moment vous pourrez vérifier l’avancée de votre demande de participation.", "link":"https://www.loom.com/embed/5fe5b13ac18e4de89952f1d1dd18b088", "id":"4"}]
*/

/* {"name":"", "house":"", "link":"""}
*/

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});


const loadCharacters = async () => {
    try {
        const res = await fetch('/data');
        hpCharacters = await res.json();
        console.log(hpCharacters);
        displayCharacters(hpCharacters);
    } catch (err) {
        console.error(err);
    }
};



const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="character" id="${character.id}">
                <h2>${character.name}</h2>
                <p>${character.house}</p>
                <div class="embed">
                <iframe src="${character.link}" frameborder="2" allowfullscreen="allowfullscreen" webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
                </div>
            </li>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};

loadCharacters();
console.log(hpCharacters);

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("mySidebar").style.zIndex = "100";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("mySidebar").style.zIndex = "1";
  document.getElementById("main").style.marginLeft= "0";
}

function openSom() {
  if (document.getElementById("mySidebarSom").style.display == "none"){
    document.getElementById("mySidebarSom").style.display = "block";
    document.getElementById("link-Adh").textContent = "Adhérents ↑"
  }
  else {
    document.getElementById("mySidebarSom").style.display = "none";
    document.getElementById("link-Adh").textContent = "Adhérents ↓"
  }
}