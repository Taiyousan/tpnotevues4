<script setup>
import { onMounted, ref } from 'vue';

//constantes pour gérer les données de l'API ainsi que la pagination
const episodes = ref([]);
const next = ref([]);
const previous = ref([]);
const current = ref()
const pagination = ref()

//constantes pour la recherche
let listeComplete = ref();
let recherche = ref('');

//appel à l'api et stockage des données dans les constantes
onMounted(async () => {
  current.value = 'https://rickandmortyapi.com/api/episode'
  const response = await fetch('https://rickandmortyapi.com/api/episode');
  const data = await response.json();
  episodes.value = data.results;
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
      episodes.value = data.results;
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
      episodes.value = data.results;
      previous.value = data.info.prev;
      pagination.value = pagination.value -1

    });
}

function rechercher() {
    setTimeout(() => {
            episodes.value = listeComplete.value.filter((item) => {
            return item.name.toLowerCase().includes(recherche.value.toLowerCase())
        })
    }, 100)
}

</script>

<template>
<h1>Episodes</h1>

<input type="text" v-model="recherche" @keyup="rechercher" class="searchbar">
<button v-on:click="rechercher()" class="searchbarbutton">Filtrer</button>

<div class="episodes-container">
    <router-link v-for="episode in episodes" :v-if="episode" :to="{name: 'ficheepisode', params: {id : episode.id}}">
        Episode {{ episode.id }} | {{ episode.name }}  </router-link>
</div>
<button class="navigate-button" @click="previouspage()" v-if="pagination != 1">Page précédente</button>
<button class="navigate-button" @click="nextpage()" v-if="pagination !=3">Page suivante</button>


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
.episodes-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
}

.episodes-container p {
    margin: 0.5rem;
}

a {
    text-decoration: none;
    color: black;
    font-size: 1.5rem;
    margin: 1rem;
    background-color: #f1f1f1;
    border: none;
    padding: 15px 32px;
}
</style>