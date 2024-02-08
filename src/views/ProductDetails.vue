<template>
  <div class="product-details-container">
    <div class="svg">
      <svg v-if="!isFavorite(currentProduct)" @click="toggleFavorite(currentProduct)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
      </svg>
      <svg v-else @click="toggleFavorite(currentProduct)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
      </svg>
      <img :src="currentProduct.image" :alt="currentProduct.image" />
    </div>
    <div class="prod-description-container">
      <h2>{{ currentProduct.titre }}</h2>
      <p>{{ currentProduct.description }}</p>
      <br>
      <p v-if="groupe !== 'GUEST'">{{ currentProduct.prix }} €</p>
      <p class="moq-text">
        Quantité minimum de commande : {{ currentProduct.moq }}
      </p>
      <div v-if="groupe !== 'USER'">
        <GeneralButton
          label="Ajouter au panier"
          @generalEvent="addOrRemove(currentProduct)"
          :disabled="disableButton"
          class="disabledButton"
          title="Cette fonctionnalité n'est disponible que pour nos membres."
        />
        <p v-if="identite === 'guest'" class="guestMessage">
          Vous devez être membre pour pouvoir commander.
        </p>
      </div>
      <div v-else>
        <GeneralButton
        v-if="!isInCart(currentProduct)"
        label="Ajouter au panier"
        @generalEvent="addOrRemove(currentProduct)"/>

        <GeneralButton v-else
        label="Remove from Cart"
        @generalEvent="addOrRemove(currentProduct)"
        class="removeFromCartBtn"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import GeneralButton from "@/components/GeneralButton.vue";

export default {
  data() {
    return {
      identite: "guest",
      groupe: 'GUEST',
      disableButton: true,
    };
  },
    components: {
        GeneralButton,
    },
    
    computed: {
        ...mapState(['produits', 'cartItems', 'favorites']),
        currentProduct() {
        const productId = this.$route.params.id;
        return this.produits[productId];
        }
    },
    methods: {
        isInCart(item) {
            return this.cartItems.find(cartItem => cartItem.id === item.id) !== undefined;
        },
        addOrRemove(product) {
            const isInCart = this.isInCart(product);
            const mutationType = isInCart ? 'REMOVE_FROM_CART' : 'ADD_TO_CART';
            product.quantity = product.moq
            this.$store.commit(mutationType, product);

      console.log(this.cartItems);
      console.log(product.quantity);
    },
    loadCart() {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        this.$store.commit('SET_CART_ITEMS', JSON.parse(storedCartItems));
      }
    },
    isFavorite(product) {
      return this.favorites.some(fav => fav.id === product.id);
    },
    toggleFavorite(product) {
      if (this.groupe !== 'USER') {
        alert('Vous devez être membre pour pouvoir créer des favoris.')
      } else {

      const index = this.favorites.findIndex((fav) => fav.id === product.id);

        if (index === -1) {
          // If the product is not in favorites, add it
          this.$store.commit('ADD_TO_FAVORITES', product);
        } else {
          // If the product is in favorites, remove it
          this.$store.commit('REMOVE_FROM_FAVORITES', product);
        }

        this.saveFavorites();
      }
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
    let identity = localStorage.getItem("myIdentity");
    if (identity) {
      this.identite = JSON.parse(localStorage.getItem("myIdentity")).raisonSociale

      this.$store.commit('CHANGE_IDENTITY', this.identite);

      this.groupe = JSON.parse(localStorage.getItem("myIdentity")).role;

      this.loadFavorites();

      this.loadCart();
    }
  },
};
</script>

<style scoped>
.product-details-container {
  display: flex;
  margin: 50px auto;
  align-items: center;
  width: 700px;
  position: relative;
}

.svg {
  position: relative;
}

.bi-heart, .bi-heart-fill {
  color: rgb(231, 67, 39);
  position: absolute;
  top: 35px;
  right: 35px;
  position: absolute;
}

.product-details-container img {
  width: auto;
  height: 300px;
  margin: 20px;
}

.prod-description-container {
  text-align: left;
  margin: 20px;
}

.moq-text {
  font-style: italic;
}

.removeFromCartBtn {
  background-color: rgb(94, 25, 111);
}

.disabledButton {
  background-color: #ccc;
  color: #555;
  cursor: not-allowed;
  opacity: 0.6;
}

.guestMessage {
  font-size: 0.8em;
  font-style: italic;
  color: rgb(231, 67, 39);
}
</style>