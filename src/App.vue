<template>
  <img src="./assets/WW2.png" alt="logo" />
  <nav>

  </nav>
  <nav>
    <router-link to="/">Accueil</router-link> |
    <router-link to="/produits">Produits</router-link> |
    <router-link to="/inscription">Inscription</router-link> |
    <router-link to="/connexion">Connexion</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
img {
  width: 100px;
  height: 100px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
