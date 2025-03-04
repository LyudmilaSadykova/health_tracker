<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import HeaderText from './components/HeaderText.vue'
</script>

<template>
  <header>
    <div>
      <HeaderText msg="Трекер здоровья" />

      <nav>
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/settings">Настройки</RouterLink>
        <RouterLink to="/wather_balance">Водный баланс</RouterLink>
        <RouterLink to="/activity">Активность</RouterLink>
        <RouterLink to="/calorific">Калорийность</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  display: flex;
  place-items: center;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  font-size: 1rem;

  padding: 1rem 0;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  nav {
    margin-top: 1rem;
  }
}
</style>
