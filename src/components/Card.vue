<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

defineProps({
    data: Object,
    index: Number
  });
</script>

<template>
<div class="card">
    <h1>{{ data.name }}</h1>
    <img :src="data.image" alt="portrait du personnage" />
    <router-link :v-if="data" :to="{name: 'ficheperso', params: {id : data.id}}">En voir +
    </router-link>
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
</style>