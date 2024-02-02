<template>
  <div
    class="panier-container"
    v-if="this.$store.getters.getItemsInCart.length !== 0"
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
                : product.quantity--
            "
            :class="product.quantity === product.moq ? 'greyed' : ' '"
          >
            -
          </button>
          <p>{{ product.quantity }}</p>
          <button @click="product.quantity++">+</button>
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
  <div class="empty-cart" v-else>
    Pas encore de produits dans le panier. Rendez vous sur notre page
    <router-link to="/produits">Produits</router-link>
  </div>

  <div v-if="modalToggle" class="confirmation-modal">
    <button class="close-modal" @click="modalToggle = !modalToggle">X</button>
    <p>Grand total HT : € {{ this.priceTotal.toFixed(2) }}</p>
    <p>Grand total TTC : € {{ (this.priceTotal * 1.2).toFixed(2) }}</p>
    <button>Confirmer commande</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      objectsInCart: this.$store.getters.getItemsInCart,
      priceTotal: 0,
      modalToggle: false,
    };
  },
  methods: {
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
  },
  mounted() {
    this.setCartData();
  },
  updated() {
    this.setCartData();
  },
};
</script>

<style lang="scss" scoped>
.confirmation-modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgb(231, 67, 39) ;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .close-modal{
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
    cursor: pointer;
    margin: 10px;
    font-size: 35px;
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
  border-top: 1px solid lightgrey;

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
  font-weight: bold;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;

  button {
    cursor: pointer;
    background-color: lawngreen;
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