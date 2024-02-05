<template>
  <div class="products-section">
    <h2>Tous produits</h2>
    <div class="input-group">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
        <input v-model="searchTerm" @input="handleSearch()" type="text" id="searchInput" placeholder="Rechercher par nom de produit">
    </div>
    <div class="products-grid">
      <div v-for="(produit, index) in filteredProducts" :key="index" class="product">
        <svg v-if="!isFavorite(produit)" @click="toggleFavorite(produit)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
        </svg>
        <svg v-else @click="toggleFavorite(produit)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
        </svg>
        <img :src="produit.image" :alt="produit.titre">
        <div class="product-info">
          <h4>{{ produit.titre }}</h4>
          <p>{{ produit.prix }} €</p>
          <p>Commande minimum : {{ produit.moq }}</p>
        </div>
        <GeneralButton label="Ajouter au panier" @generalEvent="addOrRemove(produit)" v-if="!isInCart(produit)"/>
        <GeneralButton label="Enlever du panier" @generalEvent="addOrRemove(produit)" class="removeFromCartBtn" v-else/>
        <router-link :to="{ name: 'produits-details', params: { id: index } }" class="details-link">Détails du produit</router-link>
      </div>
    </div>
  </div>
  <br>
  <br>
  <br>

</template>

<script>
import { mapState } from 'vuex';
import GeneralButton from '@/components/GeneralButton.vue'

export default {

  components: {
    GeneralButton,
  },

  computed: {
    ...mapState(['produits', 'cartItems', 'favorites']),
  },

  data() {
    return {
      searchTerm: '',
      filteredProducts: [],
    }
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
        // If the product is not in favorites, add it
        this.$store.commit('ADD_TO_FAVORITES', product);
      } else {
        // If the product is in favorites, remove it
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
    handleSearch() {
      const searchTerm = this.searchTerm.toLowerCase();

      if (searchTerm.trim() === '') {
        // If the search term is empty, show all products
        this.filteredProducts = this.produits;
      } else {
        // Filter products based on the search term
        this.filteredProducts = this.produits.filter(product =>
          product.titre.toLowerCase().includes(searchTerm)
        );
      }
    },
    loadCart() {
      const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.$store.commit('SET_CART_ITEMS', JSON.parse(storedCartItems));
    }
    }
  },

  created() {
    this.filteredProducts = this.produits;
    this.loadFavorites();
    this.loadCart();
  }
}
</script>

<style lang="scss" scoped>

.products-section {
  margin-top: 50px;
}

.products-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 0 auto;
  width: 80%;
}

.product {
  width: calc(25% - 10px);
  border: 1px solid #EEE;
  padding-bottom: 20px;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.product img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: center;
}

.product-info {
  padding: 0 20px;
}

.product:hover {
  border: 1px solid rgb(231, 67, 39);
  transition: 0.3s ease;
}

h2 {
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 30px;
}

.input-group svg {
  margin-right: 5px;
}

#searchInput {
  font-size: 1em;
  width: 300px;
  line-height: 1;
  border: 1px solid black;
  border-radius: 5px;
  padding: 8px;
}

.details-link {
  display: block;
  font-size: .9em;
  text-decoration: none;
  margin-top: 5px;
}

.bi-heart, .bi-heart-fill {
  color: rgb(231, 67, 39);
  position: absolute;
  top: 10px;
  right: 10px;
}

.removeFromCartBtn {
  background-color: rgb(94, 25, 111);
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .product {
    width: calc(33.33% - 10px);
  }
}

@media screen and (max-width: 767px) {
  .product {
    width: calc(50% - 10px);
  }
}

@media screen and (max-width: 480px) {
  .product {
    width: calc(100% - 10px);
  }
}

</style>