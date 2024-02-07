<template>
  <div class="header">
    <router-link class="logoContainer" to="/"
      ><img src="./assets/WW2.png" alt="logo"
    /></router-link>
    <div class="nav-container">
      <nav class="navbar2">

        <router-link to="/gestion-commandes">Gestion des commandes</router-link> | <router-link to="/gestion-utilisateurs">Gestion des utilisateurs</router-link> | <router-link to="/gestion-produits">Gestion des produits</router-link> 

      </nav>
      <nav class="navbar">
        <router-link to="/">Accueil</router-link> |
        <router-link to="/produits">Produits</router-link> |
        <router-link to="/inscription">Inscription</router-link> |
        <router-link to="/connexion">Connexion</router-link>
      </nav>

    </div>
  </div>
  <router-view @updateGroup="updateGroupFunction"></router-view>
</template>

<style lang="scss">
*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  overflow-x: hidden;
}

.header {
  display: flex;
  height: 250px;
  width: 100%;
  padding: 20px 0;

  .logoContainer {
    width: auto;
    height: 100%;
  }

  img {
    width: auto;
    height: 100%;
  }

  .nav-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .navbar {
      position: relative;
      display: flex;
      gap: 10px;
      .icon-container {
        position: relative;
        width: 40px;
        height: 40px;
        top: -10px;
        .cart-icon {
          position: relative;
          height: 30px;
          width: 30px;
        }
        .cart-circle {
          position: absolute;
          top: 0;
          right: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: red;
        }
      }
    }
  }
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
      color: rgb(231, 67, 39);
    }
  }
}

@media (max-width: 600px) {
  .header {
    flex-direction: column;
    height: 200px;

    img {
      align-self: center;
      width: 100px;
      height: 100px;
    }
  }

  nav {
    font-size: 0.7em;
  }

  .navbar {
    gap: 3px;
    padding: 15px;
    flex-wrap: wrap;
  }
}
</style>