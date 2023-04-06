<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Personnages</RouterLink>
        <RouterLink to="/episodes">Episodes</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>

<style scoped>
  header {
    background-color: #333;
    color: #fff;
    padding: 1rem;
  }

  nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  nav a {
    color: black;
    text-decoration: none;
    padding: 0.5rem;
    border-radius: 0.25rem;
    background-color: white;
    transition: 0.2s ease-in-out;
  }

  nav a:hover {
    transform: translate(0, -0.25rem);
  }
</style>
