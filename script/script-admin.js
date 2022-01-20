const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = []
let ttarea = []

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
        console.log(hpCharacters.length)
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
                <textarea >${character.name}</textarea>
                <textarea >${character.house}</textarea>
                <textarea >${character.link}</textarea>
                <p>${character.id}</p>
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

function pushApi() {
  fetch("/data", {
  method: "POST",
  headers: {
    "Content-Type": "application/json", // Cette ligne permet de prévenir le serveur en question que les données que je lui envoie représente du JSON, étant donné que la requête passe par le protocol HTTP ( donc par le réseau ) ce qui transite au final est simplement un chaîne de caractère, il faut donc que le serveur sache ce que représente la chaîne de caractère pour lui rendre sa forme d'objet d'origine
  },
  body: JSON.stringify({ username: "Dylan" }), // C'est ici que tu va insérer les données que tu veux envoyer, comme tu peux le voir je suis obliger de transformer l'objet en chaîne de caractère pour l'envoyer
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Ici je récupère la réponse du serveur ( le response.json )
  });
}



// Make a POST request
/*
fetch('https://jsonplaceholder.typicode.com/posts', {
	method: 'POST'
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.warn('Something went wrong.', error);
});*/

