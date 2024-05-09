class NewUser extends HTMLElement {
  connectedCallback() {
    fetchRandomUser().then(userData => {
      this.render(userData);
    });
  }

  render(userData) {
    const { Vnom, Pture, Vemai, Fecha, direccion, phoneN, Contra } = userData;

    this.innerHTML = `
      <div class="RandomUser_datos">
        <div class="cajita"></div>
        <div class="circulo">
          <img id="imagen" src="${Pture}"></img>
        </div>
        <br>
        <div id="cajitaN">
          <p class="hello">Hi, my name is</p>
          <p class="RandomUser">${Vnom}</p>
        </div>
        <div style="display: none;" id="cajitaE">
          <p class="hello">My email address is</p>
          <p class="RandomUser">${Vemai}</p>
        </div>
        <div style="display: none;" id="cajitaB">
          <p class="hello">My birthday is</p>
          <p class="RandomUser">${Fecha}</p>
        </div>
        <div style="display: none;" id="cajitaA">
          <p class="hello">My address is</p>
          <p class="RandomUser">${direccion}</p>
        </div>
        <div style="display: none;" id="cajitaP">
          <p class="hello">My phone number is</p>
          <p class="RandomUser">${phoneN}</p>
        </div>
        <div style="display: none;" id="cajitaC">
          <p class="hello">My password is</p>
          <p class="RandomUser">${Contra}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('datos-usuario', NewUser);

function fetchRandomUser() {
  let url = `https://randomuser.me/api/`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      let Fecha = data.results['0'].dob.date;
      Fecha = Fecha.slice(0,10);
      Fecha = Fecha.split("-");
      Fecha = Fecha[1]+"/" + Fecha[2]+"/" + Fecha[0];
      let nombre1 = data.results['0'].name.first;
      let nombre2 = data.results['0'].name.last;
      let Vnom = nombre1 + " " + nombre2
      let Pture = data.results['0'].picture.large
      let Vemai = data.results['0'].email
      let direccion1 = data.results['0'].location.street.number;
      let direccion2 = data.results['0'].location.street.name;
      let direccion = direccion1 + " " +direccion2;
      let phoneN = data.results['0'].phone;
      let Contra = data.results['0'].login.password
      
      return {
        Vnom: Vnom,
        Pture: Pture,
        Vemai: Vemai,
        Fecha: Fecha,
        direccion: direccion,
        phoneN: phoneN,
        Contra: Contra
      };
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}


function DNombre(){
  document.getElementById("cajitaN").style.display = "block";
  document.getElementById("cajitaE").style.display = "none";
  document.getElementById("cajitaB").style.display = "none";
  document.getElementById("cajitaA").style.display = "none";
  document.getElementById("cajitaP").style.display = "none";
  document.getElementById("cajitaC").style.display = "none";

}
function DEmail(){
  document.getElementById("cajitaN").style.display = "none";
  document.getElementById("cajitaE").style.display = "block";
  document.getElementById("cajitaB").style.display = "none";
  document.getElementById("cajitaA").style.display = "none";
  document.getElementById("cajitaP").style.display = "none";
  document.getElementById("cajitaC").style.display = "none";

}
function DCumple(){
  document.getElementById("cajitaN").style.display = "none";
  document.getElementById("cajitaE").style.display = "none";
  document.getElementById("cajitaB").style.display = "block";
  document.getElementById("cajitaA").style.display = "none";
  document.getElementById("cajitaP").style.display = "none";
  document.getElementById("cajitaC").style.display = "none";

}
function DUbicacion(){
  document.getElementById("cajitaN").style.display = "none";
  document.getElementById("cajitaE").style.display = "none";
  document.getElementById("cajitaB").style.display = "none";
  document.getElementById("cajitaA").style.display = "block";
  document.getElementById("cajitaP").style.display = "none";
  document.getElementById("cajitaC").style.display = "none";

}
function DCelular(){
  document.getElementById("cajitaN").style.display = "none";
  document.getElementById("cajitaE").style.display = "none";
  document.getElementById("cajitaB").style.display = "none";
  document.getElementById("cajitaA").style.display = "none";
  document.getElementById("cajitaP").style.display = "block";
  document.getElementById("cajitaC").style.display = "none";

}
function DContraseña(){
  document.getElementById("cajitaN").style.display = "none";
  document.getElementById("cajitaE").style.display = "none";
  document.getElementById("cajitaB").style.display = "none";
  document.getElementById("cajitaA").style.display = "none";
  document.getElementById("cajitaP").style.display = "none";
  document.getElementById("cajitaC").style.display = "block";

}
