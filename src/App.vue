<template>
  <div class="header">
    <img src="./assets/WW2.png" alt="logo" />
    <div class="nav-container">
      <nav class="navbar">
        <router-link to="/">Accueil</router-link> |
        <router-link to="/produits">Produits</router-link> |
        <router-link to="/inscription">inscription</router-link> |
        <router-link to="/connexion">connexion</router-link> |
        <router-link to="/panier">
          <div class="icon-container">
            <img src="./assets/panier.png" alt="" class="cart-icon" />
            <div
              class="cart-circle"
              v-if="this.$store.getters.getItemsInCart.length !== 0"
            ></div>
          </div>
        </router-link>
      </nav>
    </div>
  </div>
  <router-view />
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

.header {
  display: flex;
  justify-content: center;
  height: 150px;
  width: 100vw;
  padding: 20px 0;
}

img {
  width: auto;
  height: 100%;
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
  img {
    width: auto;
    height: 50%;
  }

  nav {
    font-size: 0.7em;
  }

  .navbar {
    gap: 3px;
    padding: 15px;
  }
}
</style>
