<template>
  <div class="products-section">
    <h2>{{ chosenCategory }}</h2>

    <div class="filter-section">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-tag"
        viewBox="0 0 16 16"
      >
        <path
          d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0"
        />
        <path
          d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1m0 5.586 7 7L13.586 9l-7-7H2z"
        />
      </svg>
      <select
        v-model="chosenCategory"
        @change="filterProductsByCategory"
        name="category"
        id="category"
      >
        <option value="Tous produits">Catégorie</option>
        <option
          v-for="category in categoriesV"
          :key="category.id"
          :value="category.name"
        >
          {{ category.name }}
        </option>
      </select>
      <!-- <select v-model="chosenCategory" @change="filterProductsByCategory()" name="categories" id="categories">
        <option value="Tous produits">Catégorie</option>
        <option value="Mobilier d'intérieur">Mobilier d'intérieur</option>
        <option value="Luminaires">Luminaires</option>
        <option value="Tapis">Tapis</option>
        <option value="Objets de décoration">Objets de décoration</option>
      </select> -->
      <div class="input-group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
          />
        </svg>
        <input
          v-model="searchTerm"
          @input="handleSearch()"
          type="text"
          id="searchInput"
          placeholder="Rechercher par nom de produit"
        />
      </div>
    </div>

    <div class="products-grid">
      <div
        v-for="(produit, index) in filteredProducts"
        :key="index"
        class="product"
      >
        <div class="in-stock" v-if="produit.stock >= produit.moq">
          <svg
            v-if="!isFavorite(produit) || groupe != 'USER'"
            @click="toggleFavorite(produit)"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-heart"
            viewBox="0 0 16 16"
          >
            <path
              d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
            />
          </svg>
          <svg
            v-else
            @click="toggleFavorite(produit)"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-heart-fill"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
            />
          </svg>
          <img :src="produit.image" :alt="produit.titre" />
          <div class="product-info">
            <h4>{{ produit.titre }}</h4>
            <br />
            <p v-if="groupe !== 'GUEST'">{{ produit.prix }} €</p>
            <p>Commande minimum : {{ produit.moq }}</p>
          </div>
          <div v-if="groupe !== 'USER'">
            <GeneralButton
              label="Ajouter au panier"
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
              label="Ajouter au panier"
              @generalEvent="addOrRemove(produit)"
              v-if="!isInCart(produit)"
            />
            <GeneralButton
              label="Retirer du panier"
              @generalEvent="addOrRemove(produit)"
              class="removeFromCartBtn"
              v-if="isInCart(produit)"
            />
          </div>
          <router-link
            :to="{ name: 'produits-details', params: { id: index } }"
            class="details-link"
            >Détails du produit</router-link
          >
        </div>
        <div class="out-of-stock" v-else>
          <svg
            v-if="!isFavorite(produit) || groupe != 'USER'"
            @click="toggleFavorite(produit)"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-heart"
            viewBox="0 0 16 16"
          >
            <path
              d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
            />
          </svg>
          <svg
            v-else
            @click="toggleFavorite(produit)"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-heart-fill"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
            />
          </svg>
          <img :src="produit.image" :alt="produit.titre" class="greyed" />
          <div class="product-info">
            <h4>{{ produit.titre }}</h4>
            <br />
            <p v-if="groupe !== 'GUEST'">{{ produit.prix }} €</p>
            <p>Commande minimum : {{ produit.moq }}</p>
          </div>
          <br />
          <p class="unavailable">Produit indisponible</p>
        </div>
      </div>
    </div>
  </div>
  <br />
  <br />
  <br />
</template>

<script>
import { mapState } from "vuex";
import GeneralButton from "@/components/GeneralButton.vue";

export default {
  components: {
    GeneralButton,
  },

  computed: {
    ...mapState([
      "produits",
      "cartItems",
      "favorites",
      "categories",
      "actualProducts",
    ]),
    categoriesV() {
      return this.$store.state.categoriesV;
    },
  },

  data() {
    return {
      identite: "guest",
      groupe: "GUEST",
      searchTerm: "",
      // actualProducts: [...this.$store.state.produits],
      filteredProducts: [],
      chosenCategory: "Tous produits",
      disableButton: true,
    };
  },

  methods: {
    isInCart(item) {
      return (
        this.cartItems.find((cartItem) => cartItem.id === item.id) !== undefined
      );
    },
    addOrRemove(product) {
      const isInCart = this.isInCart(product);
      const mutationType = isInCart ? "REMOVE_FROM_CART" : "ADD_TO_CART";
      product.quantity = product.moq;
      this.$store.commit(mutationType, product);
      this.saveCart();
    },
    saveCart() {
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
      console.log("Saved Cart:", this.cartItems);
    },
    isFavorite(product) {
      return this.favorites.some((fav) => fav.id === product.id);
    },
    toggleFavorite(product) {
      if (this.groupe !== "USER") {
        alert("Vous devez être membre pour pouvoir créer des favoris.");
      } else {
        const index = this.favorites.findIndex((fav) => fav.id === product.id);

        if (index === -1) {
          // If the product is not in favorites, add it
          this.$store.commit("ADD_TO_FAVORITES", product);
        } else {
          // If the product is in favorites, remove it
          this.$store.commit("REMOVE_FROM_FAVORITES", product);
        }

        this.saveFavorites();
      }
    },

    saveFavorites() {
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
      console.log("Saved Favorites:", this.favorites);
    },
    loadFavorites() {
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        this.$store.commit("SET_FAVORITES", JSON.parse(storedFavorites));
      }
    },
    filterProductsByCategory() {
      const selectedCategory = this.categoriesV.find(
        (category) => category.name === this.chosenCategory
      );
      this.filterProducts(selectedCategory);
    },

    handleSearch() {
      const selectedCategory = this.categoriesV.find(
        (category) => category.name === this.chosenCategory
      );

      this.filterProducts(selectedCategory);
    },

    filterProducts(selectedCategory) {
      this.filteredProducts = selectedCategory
        ? this.actualProducts
            .filter((product) => product.categorieId === selectedCategory.id)
            .filter((product) =>
              product.titre
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase())
            )
        : this.actualProducts.filter((product) =>
            product.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
    },
    loadCart() {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        this.$store.commit("SET_CART_ITEMS", JSON.parse(storedCartItems));
      }
    },
  },

  created() {
    console.log("Component created");
    let identity = localStorage.getItem("myIdentity");
    if (identity) {
      this.identite = JSON.parse(
        localStorage.getItem("myIdentity")
      ).raisonSociale;

      this.$store.commit("CHANGE_IDENTITY", this.identite);

      this.groupe = JSON.parse(localStorage.getItem("myIdentity")).role;
    }

    const storedActualProducts = JSON.parse(
      localStorage.getItem("actualProducts")
    );
    if (storedActualProducts) {
      this.$store.commit("SET_ACTUAL_PRODUCTS", storedActualProducts);
    } else {
      this.$store.commit("SET_ACTUAL_PRODUCTS", [
        ...this.$store.state.produits,
      ]);
    }

    this.$store.dispatch('initializeCategories');
    this.$store.dispatch("initializeActualProducts");
    this.filteredProducts = this.actualProducts;
    this.$store.dispatch("updateCategoriesV");
    this.loadFavorites();
    this.loadCart();
  },
};
</script>

<style lang="scss" scoped>
.products-section {
  margin-top: 50px;
}
h2 {
  width: 80%;
  margin: 0 auto;
  text-align: left;
}

.products-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 20px auto;
  width: 80%;
}

.unavailable {
  color: rgb(231, 67, 39);
}

.greyed {
  opacity: 0.4;
}

.product {
  width: calc(25% - 10px);
  border: 1px solid #eee;
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

.filter-section {
  width: 80%;
  margin: 0 auto;
  text-align: left;
}

#categories {
  font-size: 1em;
  width: 250px;
  line-height: 1;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group svg {
  margin-right: 5px;
}

#searchInput {
  font-size: 1em;
  width: 250px;
  line-height: 1;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
}

.details-link {
  display: block;
  font-size: 0.9em;
  text-decoration: none;
  margin-top: 5px;
}

.bi-heart,
.bi-heart-fill {
  color: rgb(231, 67, 39);
  position: absolute;
  top: 10px;
  right: 10px;
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

#category {
  font-size: 1em;
  width: 250px;
  line-height: 1;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
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