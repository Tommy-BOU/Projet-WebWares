<template>
  <div
    class="panier-container"
    v-if="this.$store.getters.getItemsInCart.length !== 0 && groupe === 'USER'"
  >
    <div
      class="panier-item-card"
      v-for="(product, index) in this.objectsInCart"
      :key="index"
    >
      <img :src="product.image" alt="" />
      <div class="text-container">
        <p class="product-title">{{ product.titre }}</p>
        <p class="product-description">{{ product.description }}</p>
      </div>
      <div class="buttons-container">
        <button class="remove-button" @click="removeFromCart(product)">
          Supprimer
        </button>
        <div class="quantity-container">
          <button
            @click="
              product.quantity <= product.moq
                ? (product.quantity = product.moq)
                : modifyQuantity(product, -1);
              product.quantity--;
            "
            :class="product.quantity === product.moq ? 'greyed' : ' '"
          >
            -
          </button>
          <p>{{ product.quantity }}</p>
          <button
            @click="
              modifyQuantity(product, 1);
              product.quantity++;
            "
          >
            +
          </button>
          <div class="total-article">
            <p class="totalHT">
              Total article HT €
              {{ (product.quantity * product.prix).toFixed(2) }}
            </p>
            <p class="totalTTC">
              Total article TTC €
              {{ (product.quantity * product.prix * 1.2).toFixed(2) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="total-container">
      <p>Grand total HT : € {{ this.priceTotal.toFixed(2) }}</p>
      <p>Grand total TTC : € {{ (this.priceTotal * 1.2).toFixed(2) }}</p>
      <button @click="modalToggle = !modalToggle">Commander</button>
    </div>
  </div>
  <div
    class="empty-cart"
    v-else-if="
      this.$store.getters.getItemsInCart.length === 0 && groupe === 'USER'
    "
  >
    Pas encore de produits dans le panier. Rendez vous sur notre page
    <router-link to="/produits">Produits</router-link>
  </div>
  <div class="empty-cart" v-else>
    <br />
    Vous n'êtes pas autorisé à afficher cette page !
  </div>

  <div v-if="modalToggle" class="confirmation-modal">
    <button class="close-modal" @click="modalToggle = !modalToggle">X</button>

    <p>Informations de livraison</p>
    <form v-on:submit.prevent="confirmOrder">
      <input
        type="text"
        placeholder="adresse"
        v-model="newOrder.adresse"
        @input="verifAdresse"
        required
      />
      <span v-html="msg3" v-if="msg3 != ''"></span>
      <input
        type="text"
        placeholder="code postal"
        v-model="newOrder.codePostal"
        @input="verifCodePostal"
        required
      />
      <span v-html="msg4" v-if="msg4 != ''"></span>
      <input
        type="text"
        placeholder="ville"
        v-model="newOrder.ville"
        @input="verifVille"
        required
      />
      <span v-html="msg5" v-if="msg5 != ''"></span>
      <div class="modal-total">
        <p>Grand total HT : € {{ this.priceTotal.toFixed(2) }}</p>
        <p>Grand total TTC : € {{ (this.priceTotal * 1.2).toFixed(2) }}</p>
      </div>
      <input class="confirmation" type="submit" value="Confirmer commande" />
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

export default {
  data() {
    return {
      objectsInCart: [],
      priceTotal: 0,
      modalToggle: false,
      validInput3: false,
      validInput4: false,
      validInput5: false,
      msg3: " ",
      msg4: " ",
      msg5: " ",
      newOrder: {
        orderNumber: null,
        titreProduits: [],
        prixUnitaire: [],
        quantité: [],
        coutTotal: 0,
        entreprise: "",
        adresse: "",
        codePostal: "",
        ville: "",
        delivered: false,
      },
      groupe: "GUEST",
    };
  },
  computed: {
    itemsInCart() {
      return this.$store.getters.getItemsInCart;
    },
    ...mapState(["listOfOrders"]),
  },
  methods: {
    verifAdresse() {
      if (this.newOrder.adresse.trim().length >= 2) {
        this.msg3 = "Votre Adresse est correcte. \u2705";
        this.validInput3 = true;
      } else {
        this.msg3 = "Votre Adresse doit contenir au moins 2 caractères. \u274C";
        this.validInput3 = false;
      }
    },

    verifCodePostal() {
      if (
        this.newOrder.codePostal.length === 5 &&
        isNumeric(this.newOrder.codePostal) === true
      ) {
        this.msg4 = "Votre Code Postal est correct. \u2705";
        this.validInput4 = true;
      } else {
        this.msg4 = "Votre Code Postal doit contenir 5 chiffres. \u274C";
        this.validInput4 = false;
      }
    },

    verifVille() {
      if (this.newOrder.ville.trim().length >= 2) {
        this.msg5 = "Votre Ville est correcte. \u2705";
        this.validInput5 = true;
      } else {
        this.msg5 = "Votre Ville doit contenir au moins 2 caractères. \u274C";
        this.validInput5 = false;
      }
    },
    modifyQuantity(product, int) {
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
      for (let obj of storedCartItems) {
        if (obj.id === product.id) {
          obj.quantity += int;
          localStorage.setItem("cartItems", JSON.stringify(storedCartItems));
        }
      }
    },
    setCartData() {
      let sum = 0;
      for (let i of this.objectsInCart) {
        sum += i.quantity * i.prix;
      }
      this.priceTotal = sum;
    },
    removeFromCart(product) {
      if (confirm("Êtes-vous sûr de vouloir retirer ce produit ?")) {
        this.$store.commit("REMOVE_FROM_CART", product);
      }
    },
    confirmOrder() {
      if (this.validInput3 && this.validInput4 && this.validInput5) {
        this.newOrder.orderNumber = this.listOfOrders.length + 1;
        for (let data of this.objectsInCart) {
          this.newOrder.titreProduits.push(data.titre);
          this.newOrder.prixUnitaire.push(data.prix);
          this.newOrder.quantité.push(data.quantity);
          this.newOrder.coutTotal += data.prix * data.quantity;
        }

        this.$store.dispatch("placeNewOrder", this.newOrder);
        this.modalToggle = false;
      }
    },
    loadCart() {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        this.$store.commit("SET_CART_ITEMS", JSON.parse(storedCartItems));
        this.objectsInCart = JSON.parse(storedCartItems);
      }
    },
  },
  created() {
    let identity = localStorage.getItem("myIdentity");
    if (identity) {
      this.groupe = JSON.parse(localStorage.getItem("myIdentity")).role;
      this.$store.commit("CHANGE_GROUP", this.groupe);

      this.loadCart();
      
      this.setCartData();
    }
  },
  mounted() {},
  beforeUpdate() {
    this.loadCart();
  },
  updated() {
    this.setCartData();
  },
};
</script>

<style lang="scss" scoped>
.confirmation-modal {
  form {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgb(231, 67, 39);
    z-index: 100;
    display: flex;
    gap: 15px;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .close-modal {
      position: absolute;
      top: 0;
      right: 0;
      background: none;
      border: none;
      cursor: pointer;
      margin: 10px;
      font-size: 35px;
    }

    .modal-total {
      font-weight: bold;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .confirmation {
      background-color: #4caf50;
      border: none;
      color: white;
      border-radius: 5px;
      padding: 10px 25px;
      cursor: pointer;
    }
  }
}

.panier-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.panier-item-card {
  margin: 10px 0;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  width: 1000px;
  gap: 30px;
  border-bottom: 1px solid lightgrey;

  .text-container {
    p {
      margin: 0 25px;
      width: 500px;
    }

    .product-title {
      font-weight: bold;
      margin-bottom: 25px;
    }
  }

  img {
    width: 100px;
    height: 100px;
  }
}

.remove-button {
  background: none;
  cursor: pointer;
  border: none;
  text-decoration: underline;
  margin: 10px 0;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 100%;
  width: 33%;

  .quantity-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    button {
      width: 25px;
      height: 20px;
      border-radius: 3px;
      align-self: center;
      background-color: rgb(228, 228, 228);
      border: 1px solid black;
      cursor: pointer;
    }

    .greyed {
      border: 1px solid lightgrey;
      color: lightgrey;
    }

    p {
      align-self: center;
      margin: 0 5px;
    }
    .total-article {
      margin-left: 25px;
      line-height: 200%;
      font-size: 0.8em;
      font-weight: bold;
    }
  }
}

.total-container {
  width: 66%;
  display: flex;
  gap: 15px;
  font-weight: bold;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;

  button {
    cursor: pointer;
    color: white;
    background-color: #4caf50;
    border: 1px solid lightgrey;
    border-radius: 5px;
    padding: 10px 25px;
  }
}

@media screen and (max-width: 1024px) {
  .panier-item-card {
    margin: 10px 0;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 500px;
    gap: 10px;
    border-bottom: 1px solid lightgrey;
    border-top: 1px solid lightgrey;

    .text-container {
      align-self: center;
      p {
        margin: 0 10px;
        width: 400px;
      }

      .product-title {
        font-weight: bold;
        margin-bottom: 25px;
      }
    }

    img {
      align-self: center;
      width: 100px;
      height: 100px;
    }
    .buttons-container {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      height: 100%;
      width: 100%;

      .quantity-container {
        width: 70%;
        display: flex;
        justify-content: flex-end;

        p {
          align-self: center;
          margin: 0 5px;
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .empty-cart {
    width: 80%;
  }

  .panier-item-card {
    margin: 10px 0;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 300px;
    gap: 5px;
    border-bottom: 1px solid lightgrey;
    border-top: 1px solid lightgrey;

    .text-container {
      p {
        margin: 0 10px;
        width: 250px;
      }

      .product-title {
        font-weight: bold;
        margin-bottom: 25px;
      }
    }

    img {
      width: 100px;
      height: 100px;
    }
    .buttons-container {
      display: flex;
      height: 100%;
      width: 100%;

      .quantity-container {
        width: 100%;
        display: flex;
        justify-content: center;

        p {
          align-self: center;
          margin: 0 5px;
        }

        .total-article {
          margin-left: 25px;
          line-height: 200%;
          font-size: 0.8em;
          font-weight: bold;
        }
      }
    }

    .remove-button {
      background: none;
      cursor: pointer;
      border: none;
      text-decoration: underline;
      margin: 10px 0;
      width: 100px;
      align-self: center;
    }
  }
}
</style>