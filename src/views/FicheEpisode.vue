<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router'


const route = useRoute()
const id = route.params.id

const personnage = ref();
const episodes = ref();
const current = ref();
const episode = ref([]);


onMounted(async () => {
//   current.value = `https://rickandmortyapi.com/api/character/${idperso}`
  const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
  const data = await response.json();
  episode.value = data
  
//   next.value = data.info.next;
//   previous.value = data.info.prev;
//   pagination.value = 1
});
</script>

<template>
<div class="card" v-if="episode != null">
    <h1>Episode {{ episode.id }}</h1>
    <p><span class="spanito">Nom :</span> {{ episode.name }}</p>
    <p><span class="spanito">Sortie :</span> {{ episode.air_date }}</p>
    <p><span class="spanito">Moment :</span> {{ episode.episode }}</p>
</div>

<div v-for="episode in episodes" v-if="episodes != null">
<p>Episode {{ episode }}</p>
</div>
</template>

<style scoped>

.card {
    width: 300px;
    min-height: 300px;
    background-color: #f3f3f3;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

.card img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 10px;
    border: 1px solid black;
}

.spanito {
    font-weight: bold;
}
</style>