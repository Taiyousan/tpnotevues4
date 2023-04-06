<script setup>
import { onMounted, ref } from 'vue';
import Card from '../components/Card.vue'

//constantes pour gérer les données de l'API ainsi que la pagination
const personnages = ref([]);
const next = ref([]);
const previous = ref([]);
const current = ref()
const pagination = ref()

//appel à l'api et stockage des données dans les constantes
onMounted(async () => {
  current.value = 'https://rickandmortyapi.com/api/character'
  const response = await fetch('https://rickandmortyapi.com/api/character');
  const data = await response.json();
  personnages.value = data.results;
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

</script>

<template>
<h1>PERSONNAGES</h1>
<div class="cardlist">
    <p v-for="personnage in personnages">
        <Card :data="personnage" :index="personnage.id" />
    </p>
</div>
<div class="boutons">
    <button @click="previouspage()" v-if="pagination != 1">Page précédente</button>
    <button @click="nextpage()" v-if="pagination !=43">Page suivante</button>
</div>


</template>

<style scoped>
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