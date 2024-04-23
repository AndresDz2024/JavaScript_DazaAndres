function fetchSuperHeroes() {
    let xhr =  new XMLHttpRequest();
    let heroID = document.getElementById("heroId").value;
    let apiKey = "f05b3f328c51b0d3523e3693652fcae0";
    let url = `https://superheroapi.com/api.php/${apiKey}/${heroID}`;
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let response = JSON.parse(this.responseText);
            displayHero(response);
            document.getElementById("getPowersButton").disabled = false;
            document.getElementById("getBiographyButton").disabled = false;
            document.getElementById("getApparenceButton").disabled = false;
            document.getElementById("getWorkButton").disabled = false;
            document.getElementById("getConnectionsButton").disabled = false;
            document.getElementById("getImageButton").disabled = false;
        } else if (this.readyState == 4) {
            console.log('Error', this.statusText);
        }
    };
    xhr.send();
}

function displayHero(data) {
    let heroInfo = document.getElementById('superHeroInfo')
    if (data.response === 'error') {
        heroInfo.innerHTML = `<p>Error: ${data.error}</p>`;
    } else {
        heroInfo.innerHTML = `<p>Nombre: ${data.name}</p>`;
    }
}

function powerHero() {
    let heroID = document.getElementById("heroId").value;
    let apiKey = "f05b3f328c51b0d3523e3693652fcae0";
    let url = `https://superheroapi.com/api.php/${apiKey}/${heroID}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let powers = data.powerstats;
            let powersHTML = '<p>Poderes:</p><ul>';
            for (let power in powers) {
                powersHTML += `<li>${power}: ${powers[power]}</li>`;
            }
            document.getElementById('superHeroPower').innerHTML = powersHTML;
        })
        .catch(error => console.error('Error fetching powers:', error));
}

function heroBiography() {
    let heroID = document.getElementById("heroId").value;
    let apiKey = "f05b3f328c51b0d3523e3693652fcae0";
    let url = `https://superheroapi.com/api.php/${apiKey}/${heroID}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let biographies = data.biography;
            let biographyHTML = '<p>Biografía:</p><ul>';
            for (let biography in biographies) {
                biographyHTML += `<li>${biography}: ${biographies[biography]}</li>`;
            }
            document.getElementById('superHeroBiography').innerHTML = biographyHTML;
        })
        .catch(error => console.error('Error fetching biography:', error));
}

function heroAppearance() {
    let heroID = document.getElementById("heroId").value;
    let apiKey = "f05b3f328c51b0d3523e3693652fcae0";
    let url = `https://superheroapi.com/api.php/${apiKey}/${heroID}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let appearances = data.appearance;
            let appearanceHTML = '<p>Apariencia:</p><ul>';
            for (let appearance in appearances) {
                appearanceHTML += `<li>${appearance}: ${appearances[appearance]}</li>`;
            }
            document.getElementById('superHeroAppearance').innerHTML = appearanceHTML;
        })
        .catch(error => console.error('Error fetching appearance:', error));
}

function heroWork() {
    let heroID = document.getElementById("heroId").value;
    let apiKey = "f05b3f328c51b0d3523e3693652fcae0";
    let url = `https://superheroapi.com/api.php/${apiKey}/${heroID}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let work = data.work;
            let workHTML = '<p>Trabajo:</p><ul>';
            for (let works in work) {
                workHTML += `<li>${works}: ${work[works]}</li>`;
            }
            document.getElementById('superHeroWork').innerHTML = workHTML;
        })
        .catch(error => console.error('Error fetching work:', error));
}

function heroConnections() {
    let heroID = document.getElementById("heroId").value;
    let apiKey = "f05b3f328c51b0d3523e3693652fcae0";
    let url = `https://superheroapi.com/api.php/${apiKey}/${heroID}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let connections = data.connections;
            let connectionsHTML = '<p>Conexiones:</p><ul>';
            for (let connection in connections) {
                connectionsHTML += `<li>${connection}: ${connections[connection]}</li>`;
            }
            document.getElementById('superHeroConnections').innerHTML = connectionsHTML;
        })
        .catch(error => console.error('Error fetching connections:', error));
}

function heroImage() {
    let heroID = document.getElementById("heroId").value;
    let apiKey = "f05b3f328c51b0d3523e3693652fcae0";
    let url = `https://superheroapi.com/api.php/${apiKey}/${heroID}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let imageUrl = data.image.url;
            let imageHTML = `<img src="${imageUrl}" alt="Imagen del superhéroe" class="rounded mx-auto d-block">`;
            document.getElementById('superHeroImage').innerHTML = imageHTML;
        })
        .catch(error => console.error('Error fetching image:', error));
}
