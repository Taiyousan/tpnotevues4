<script setup>
import { onMounted, ref } from 'vue';
import Card from '../components/Card.vue'

//constantes pour gérer les données de l'API ainsi que la pagination
const personnages = ref([]);
const next = ref([]);
const previous = ref([]);
const current = ref()
const pagination = ref()

//constantes pour la recherche
let listeComplete = ref();
let recherche = ref('');

//appel à l'api et stockage des données dans les constantes
onMounted(async () => {
  current.value = 'https://rickandmortyapi.com/api/character'
  const response = await fetch('https://rickandmortyapi.com/api/character');
  const data = await response.json();
  personnages.value = data.results;
  listeComplete.value = data.results;
  next.value = data.info.next;
  previous.value = data.info.prev;
  pagination.value = 1
});

//fonctions pour passer à la page suivante. On modifie les constantes pour que la page suivante soit chargée
function nextpage() {
  console.log(next.value);
  fetch(next.value)
    .then((response) => response.json())
    .then((data) => {
      previous.value = current.value;
      current.value = next.value;
      personnages.value = data.results;
      next.value = data.info.next;
      pagination.value = pagination.value +1
    });
}

//fonctions pour passer à la page précédente. On modifie les constantes pour que la page précédente soit chargée
function previouspage() {
  console.log(previous.value);
  fetch(previous.value)
    .then((response) => response.json())
    .then((data) => {
        next.value = current.value
        current.value = previous.value
      personnages.value = data.results;
      previous.value = data.info.prev;
      pagination.value = pagination.value -1

    });
}

function rechercher() {
    setTimeout(() => {
            personnages.value = listeComplete.value.filter((item) => {
            return item.name.toLowerCase().includes(recherche.value.toLowerCase())
        })
    }, 100)
}

function filtrage() {
    const genre = document.getElementById('genre').value
    const status = document.getElementById('status').value
    const espece = document.getElementById('espece').value
    // const name = document.getElementById('name').value
    console.log(genre, status, espece)
    personnages.value = listeComplete.value.filter((item) => {
        if(item.status.toLowerCase() === status.toLowerCase() && item.gender.toLowerCase() === genre.toLowerCase() && item.species.toLowerCase() === espece.toLowerCase()) {
            return item
        }
    })


}

</script>

<template>
<h1>PERSONNAGES</h1>

<input type="text" v-model="recherche" @keyup="rechercher" class="searchbar">
<!-- <p>{{ recherche }}</p> -->
<button v-on:click="rechercher()" class="searchbarbutton">Filtrer</button>



<div class="container-select">
    <div>
        <label for="genre">Trier par genre :</label>
    
        <select id="genre">
        <option value="Male">Homme</option>
        <option value="Female">Femme</option>
        <option value="other">Autre</option>
        </select>
    </div>

    <div>
        <label for="status">Trier par status :</label>
    
        <select id="status">
        <option value="Alive">Vivant</option>
        <option value="Dead">Mort</option>
        <option value="unknown">Inconnu</option>
        </select>
    </div>

    <div>
        <label for="espece">Trier par espèce :</label>
    
        <select id="espece">
        <option value="human">Humain</option>
        <option value="alien">Alien</option>
        </select>
    </div>
    <div>
        <!-- Je ne laisse pas le tri par nom car je ne trouve pas ça très pertinent, compte tenu de la présence de la barre de recherche.  -->

        <!-- <label for="name">Trier par nom :</label>
    
        <select id="name">
        <option v-for="personnage in personnages"  :value="personnage.name">{{ personnage.name }}</option>
        </select> -->
    </div>

    <button @click="filtrage()">FILTRER</button>
</div>

<div class="cardlist">
    <p v-for="personnage in personnages">
        <Card :data="personnage" :index="personnage.id" />
    </p>
</div>
<div class="boutons">
    <button class="navigate-button" @click="previouspage()" v-if="pagination != 1">Page précédente</button>
    <button class="navigate-button" @click="nextpage()" v-if="pagination !=43">Page suivante</button>
</div>


</template>

<style scoped>

.navigate-button{
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 10%;
    height: 2rem;
    border-radius: 10px;
    border: 1px solid black;
    padding: 0.5rem;
    font-size: 1rem;
    background-color: #f3f3f3;
    color: black;
    cursor: pointer;
}

.container-select {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;
    width: 50%;
}

.container-select select {
    margin-left: 1rem;
    width: 100%;
    height: 2rem;
    border-radius: 10px;
    border: 1px solid black;
    font-size: 1rem;
    background-color: #f3f3f3;
    color: black;
    cursor: pointer;
}
.searchbar {
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 50%;
    height: 2rem;
    border-radius: 10px;
    border: 1px solid black;
    padding: 0.5rem;
    font-size: 1rem;
}

.searchbarbutton {
    margin-top: 2rem;
    margin-bottom: 2rem;
    margin-left: 1rem;
    width: 10%;
    height: 2rem;
    border-radius: 10px;
    border: 1px solid black;
    padding: 0.5rem;
    font-size: 1rem;
    background-color: #f3f3f3;
    color: black;
    cursor: pointer;
}
.personnages-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
}

.personnages-container p {
    margin: 0.5rem;
}

.boutons {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
}

.cardlist {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    color: black;
}
.listepays {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: black;
}

.listepays a {
    text-decoration: none;
    color: black;
    margin: 10px 10px;
    padding: 5px;
    cursor: pointer;
}

.listepays a:hover {
    text-decoration: underline;
}
</style>