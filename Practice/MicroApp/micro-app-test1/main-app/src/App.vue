<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import { reactive } from 'vue'

const child_apps = {
  react: {
    name: 'react',
    url: 'http://localhost:4001/',
    iframe: false
  },
  vue3: {
    name: 'vue3',
    url: 'http://localhost:4002/',
    iframe: true
  }
}
const current_app = reactive(child_apps.react)

const changeApp = (appKey) => {
  console.log(appKey)
  const app = child_apps[appKey]
  if (!app) return
  current_app.name = app.name
  current_app.url = app.url
  current_app.iframe = app.iframe
}
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <!-- <RouterView /> -->
  <div class="main-app">
    <div class="main_buttons">
      <button @click="changeApp('react')">react</button>
      <button @click="changeApp('vue3')">vue3</button>
    </div>
    <div class="child_apps">
      <micro-app
        :name="current_app.name"
        :url="current_app.url"
        :iframe="current_app.iframe"
      ></micro-app>
    </div>
  </div>
</template>

<style scoped>
.main-app {
  display: flex;
  flex-flow: column;
}
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
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
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
