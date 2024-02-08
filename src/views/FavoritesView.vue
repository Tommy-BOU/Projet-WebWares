<template>
  <div>
    <div class="favorites-container">
        <br>
        <h2>Favoris</h2>
        <br>
        <br>
        <div class="favorites-grid">
            <div v-for="(favorite, index) in favorites" :key="index" class="favorite">
                <svg v-if="!isFavorite(favorite)" @click="toggleFavorite(favorite)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                </svg>
                <svg v-else @click="toggleFavorite(favorite)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                </svg>
                <img :src="favorite.image" :alt="favorite.titre">
                <div class="product-info">
                    <h4>{{ favorite.titre }}</h4>
                    <br>
                    <p>{{ favorite.prix }} €</p>
                    <p>Commande minimum : {{ favorite.moq }}</p>
                    <br>
                    <p class="description"> {{ favorite.description }}</p>
                    <br>
                </div>
                
                <div>
                    <GeneralButton label="Ajouter au panier" @generalEvent="addOrRemove(favorite)" v-if="!isInCart(favorite)"/>
                    <GeneralButton label="Enlever du panier" @generalEvent="addOrRemove(favorite)" class="removeFromCartBtn" v-if="isInCart(favorite)"/>
                </div>
            
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GeneralButton from '@/components/GeneralButton.vue'

export default {
components: {
    GeneralButton,
},
computed: {
    ...mapState(['produits', 'cartItems', 'favorites', 'categories', 'actualProducts'])
},
methods: {
    isInCart(item) {
            return this.cartItems.find(cartItem => cartItem.id === item.id) !== undefined;
        },
    addOrRemove(product) {
      const isInCart = this.isInCart(product);
      const mutationType = isInCart ? 'REMOVE_FROM_CART' : 'ADD_TO_CART';
      product.quantity = product.moq;
      this.$store.commit(mutationType, product);
      this.saveCart();
    },
    saveCart() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      console.log('Saved Cart:', this.cartItems);
    },
    isFavorite(product) {
      return this.favorites.some(fav => fav.id === product.id);
    },
    toggleFavorite(product) {

      const index = this.favorites.findIndex((fav) => fav.id === product.id);

        if (index === -1) {
          // Adds if not already in favs
          this.$store.commit('ADD_TO_FAVORITES', product);
        } else {
          // If in favs, removes after a conf message
          if (confirm("Etes-vous certain de vouloir supprimer ce produit de vos favoris ?"))
          this.$store.commit('REMOVE_FROM_FAVORITES', product);
        }

        this.saveFavorites();
    },

    saveFavorites() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
      console.log('Saved Favorites:', this.favorites);
    },
    loadFavorites() {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        this.$store.commit('SET_FAVORITES', JSON.parse(storedFavorites));
      }
    },
},

    created() {
        this.loadFavorites();
    }
}

</script>

<style scoped>

.favorites-container h2 {
    color: rgb(231, 67, 39)
}

.favorites-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 20px auto;
  width: 80%;
}

.favorite {
  width: calc(25% - 10px);
  border: 1px solid #EEE;
  padding-bottom: 20px;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.favorite img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: center;
}

.bi-heart, .bi-heart-fill {
  color: rgb(231, 67, 39);
  position: absolute;
  top: 10px;
  right: 10px;
}

.description {
    font-style: italic;
}

.removeFromCartBtn {
  background-color: rgb(94, 25, 111);
}

</style>