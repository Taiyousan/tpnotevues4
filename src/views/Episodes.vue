<script setup>
import { onMounted, ref } from 'vue';

//constantes pour gérer les données de l'API ainsi que la pagination
const episodes = ref([]);
const next = ref([]);
const previous = ref([]);
const current = ref()
const pagination = ref()

//appel à l'api et stockage des données dans les constantes
onMounted(async () => {
  current.value = 'https://rickandmortyapi.com/api/episode'
  const response = await fetch('https://rickandmortyapi.com/api/episode');
  const data = await response.json();
  episodes.value = data.results;
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

</script>

<template>
<h1>Episodes</h1>
<div class="episodes-container">
    <p v-for="episode in episodes">
        Episode {{ episode.id }}
    </p>
</div>
<button @click="previouspage()" v-if="pagination != 1">Page précédente</button>
<button @click="nextpage()" v-if="pagination !=3">Page suivante</button>


</template>

<style scoped>
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
</style>