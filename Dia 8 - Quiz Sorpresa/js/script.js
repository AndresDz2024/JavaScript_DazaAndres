function fetchSuperHero() {
    let heroID = document.getElementById('Id').value;
    let url = `https://swapi.py4e.com/api/people/${heroID}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayHero(data);
            if (data.homeworld) {
                fetchAndDisplayData(data.homeworld, "Homeworld", "characterHomeworld");
            }
            if (data.films.length > 0) {
                fetchAndDisplayDataList(data.films, "Films", "characterFilms");
            }
            if (data.species.length > 0) {
                fetchAndDisplayDataList(data.species, "Species", "characterSpecies");
            }
            if (data.vehicles.length > 0) {
                fetchAndDisplayDataList(data.vehicles, "Vehicles", "characterVehicles");
            }
            if (data.starships.length > 0) {
                fetchAndDisplayDataList(data.starships, "Starships", "characterStarships");
            }
            if (data.url) {
                fetchAndDisplayData(data.url, "URL", "characterURL");
            }
        })
        .catch(error => console.error('Error fetching character:', error));
}

function fetchAndDisplayData(url, title, targetElementId) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let infoHTML = `<p>${title}:</p><ul>`;
            for (let key in data) {
                infoHTML += `<li>${key}: ${data[key]}</li>`;
            }
            infoHTML += '</ul>';
            document.getElementById(targetElementId).innerHTML = infoHTML;
        })
        .catch(error => console.error(`Error fetching ${title.toLowerCase()}:`, error));
}

function fetchAndDisplayDataList(urls, title, targetElementId) {
    let promises = urls.map(url => fetch(url).then(response => response.json()));
    Promise.all(promises)
        .then(dataList => {
            let listHTML = `<p>${title}:</p><ul>`;
            dataList.forEach(data => {
                for (let key in data) {
                    listHTML += `<li>${key}: ${data[key]}</li>`;
                }
            });
            listHTML += '</ul>';
            document.getElementById(targetElementId).innerHTML = listHTML;
        })
        .catch(error => console.error(`Error fetching ${title.toLowerCase()}:`, error));
}

function displayHero(data) {
    let heroInfo = document.getElementById("characterInfo");

    if (data.response === "error") {
        heroInfo.innerHTML = `<p>Error: ${data.error}</p>`;
    } else {
        heroInfo.innerHTML = `
            <p>Nombre: ${data.name}</p>
            <p>Height: ${data.height}</p>
            <p>Mass: ${data.mass}</p>
            <p>hair_color: ${data.hair_color}</p>
            <p>skin_color: ${data.skin_color}</p>
            <p>eye_color: ${data.eye_color}</p>
            <p>birth_year: ${data.birth_year}</p>
            <p>gender: ${data.gender}</p>
            <div id="characterHomeworld"></div>
            <div id="characterFilms"></div>
            <div id="characterSpecies"></div>
            <div id="characterVehicles"></div>
            <div id="characterStarships"></div>
            <div id="characterURL"></div>
            <p>Created: ${data.created}</p>
            <p>Edited: ${data.edited}</p>
        `;
    }
}
