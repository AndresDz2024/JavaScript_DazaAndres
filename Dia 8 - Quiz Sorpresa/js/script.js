function fetchSuperHero() {
    let heroID = document.getElementById('Id').value;
    let url = `https://swapi.py4e.com/api/people/${heroID}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayHero(data);
            if (data.homeworld) {
                fetchAndDisplayData(data.homeworld, "", "characterHomeworld");
            }
            if (data.films.length > 0) {
                fetchAndDisplayDataList(data.films, "", "characterFilms");
            }
            if (data.species.length > 0) {
                fetchAndDisplayDataList(data.species, "", "characterSpecies");
            }
            if (data.vehicles.length > 0) {
                fetchAndDisplayDataList(data.vehicles, "", "characterVehicles");
            }
            if (data.starships.length > 0) {
                fetchAndDisplayDataList(data.starships, "", "characterStarships");
            }
        })
        .catch(error => console.error('Error fetching character:', error));
}

function fetchAndDisplayData(url, title, targetElementId) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let filteredData = filterLinks(data);
            let infoHTML = `<ul>`;
            for (let key in filteredData) {
                infoHTML += `<li>${key}: ${filteredData[key]}</li>`;
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
            let listHTML = `<ul>`;
            dataList.forEach(data => {
                let filteredData = filterLinks(data);
                for (let key in filteredData) {
                    listHTML += `<li>${key}: ${filteredData[key]}</li>`;
                }
            });
            listHTML += '</ul>';
            document.getElementById(targetElementId).innerHTML = listHTML;
        })
        .catch(error => console.error(`Error fetching ${title.toLowerCase()}:`, error));
}

function filterLinks(data) {
    let filteredData = {};
    for (let key in data) {
        if (typeof data[key] !== 'string' || !data[key].startsWith('http')) {
            if (!Array.isArray(data[key])) {
                filteredData[key] = data[key];
            } else if (data[key].length === 1) {
                filteredData[key] = data[key][0];
            }
        }
    }
    return filteredData;
}

function displayHero(data) {
    let heroInfo = document.getElementById("characterInfo");

    if (data.response === "error") {
        heroInfo.innerHTML = `<p>Error: ${data.error}</p>`;
    } else {
        heroInfo.innerHTML = `
            <table class="table table-striped">
                <tbody>
                    <tr>
                        <th>Name:</th>
                        <td>${data.name}</td>
                    </tr>
                    <tr>
                        <th>Height:</th>
                        <td>${data.height}</td>
                    </tr>
                    <tr>
                        <th>Mass:</th>
                        <td>${data.mass}</td>
                    </tr>
                    <tr>
                        <th>Hair Color:</th>
                        <td>${data.hair_color}</td>
                    </tr>
                    <tr>
                        <th>Skin Color:</th>
                        <td>${data.skin_color}</td>
                    </tr>
                    <tr>
                        <th>Eyes Color:</th>
                        <td>${data.eye_color}</td>
                    </tr>
                    <tr>
                        <th>Birthday:</th>
                        <td>${data.birth_year}</td>
                    </tr>
                    <tr>
                        <th>Gender:</th>
                        <td>${data.gender}</td>
                    </tr>
                    <tr>
                        <th>Homeworld:</th>
                        <td><div id="characterHomeworld"></div></td>
                    </tr>
                    <tr>
                        <th>Films:</th>
                        <td><div id="characterFilms"></div></td>
                    </tr>
                    <tr>
                        <th>Species:</th>
                        <td><div id="characterSpecies"></div></td>
                    </tr>
                    <tr>
                        <th>Vehicles:</th>
                        <td><div id="characterVehicles"></div></td>
                    </tr>
                    <tr>
                        <th>Starships:</th>
                        <td><div id="characterStarships"></div></td>
                    </tr>
                    <tr>
                        <th>Created:</th>
                        <td>${data.created}</td>
                    </tr>
                    <tr>
                        <th>Last Edited:</th>
                        <td>${data.edited}</td>
                    </tr>
                    <tr>
                        <th>URL:</th>
                        <td>${data.url}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }
}

function scrollToCharacterInfo() {
    const characterInfoElement = document.getElementById('characterInfo');
    const characterInfoPosition = characterInfoElement.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = characterInfoPosition - startPosition + 4000;
    const duration = 28000; 

    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    window.requestAnimationFrame(step);
}
