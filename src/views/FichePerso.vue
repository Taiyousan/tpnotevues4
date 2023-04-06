<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router'


const route = useRoute()
const idperso = route.params.id

const personnage = ref();
const current = ref();


onMounted(async () => {
//   current.value = `https://rickandmortyapi.com/api/character/${idperso}`
  const response = await fetch(`https://rickandmortyapi.com/api/character/${idperso}`);
  const data = await response.json();
  personnage.value = data;
//   next.value = data.info.next;
//   previous.value = data.info.prev;
//   pagination.value = 1
});
</script>

<template>
<div class="card" v-if="personnage != null">
    <h1>{{ personnage.name }}</h1>
    <img :src="personnage.image" alt="portrait du personnage" />
    <p><span class="spanito">Statut :</span> {{ personnage.status }}</p>
    <p><span class="spanito">Espèce : </span>{{ personnage.species }}</p>
    <p><span class="spanito">Genre : </span>{{ personnage.gender }}</p>
    <p><span class="spanito">Emplacement : </span>{{ personnage.location.name }}</p>
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