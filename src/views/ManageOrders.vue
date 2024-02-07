<template>
  <div class="order-container">
    <div class="order-card" v-for="(data, index) in listOfOrders" :key="index">
      <h2>Commande N° {{ data.orderNumber }}</h2>
      <div class="order-recap">
        <div class="products">
          <p
            v-for="produits in this.currentOrder.titreProduits"
            :key="produits"
          >
          <p
            v-for="produits in this.currentOrder.titreProduits"
            :key="produits"
          >
            {{ produits }}
          </p>
        </div>
        <div class="unit-price">
          <p v-for="prix in this.currentOrder.prixUnitaire" :key="prix">
            €{{ prix }}
          </p>
        </div>
        <div class="unit-price">
          <p v-for="prix in this.currentOrder.prixUnitaire" :key="prix">
            €{{ prix }}
          </p>
        </div>
        <div class="quantities">
          <p v-for="quantité in this.currentOrder.quantité" :key="quantité">
          <p v-for="quantité in this.currentOrder.quantité" :key="quantité">
            x {{ quantité }}
          </p>
        </div>
        <div class="prices">
          <p v-for="prix in this.currentOrder.prixArticles" :key="prix">
            Total : €{{ prix }}
          <p v-for="prix in this.currentOrder.prixArticles" :key="prix">
            Total : €{{ prix }}
          </p>
        </div>
      </div>
      <div class="bold">
        <p>Total commande HT : €{{ this.currentOrder.coutTotal.toFixed(2) }}</p>
        <p>
          Total commande TTC : €{{
            (this.currentOrder.coutTotal * 1.2).toFixed(2)
          }}
        </p>
      <div class="bold">
        <p>Total commande HT : €{{ this.currentOrder.coutTotal.toFixed(2) }}</p>
        <p>
          Total commande TTC : €{{
            (this.currentOrder.coutTotal * 1.2).toFixed(2)
          }}
        </p>
      </div>


      <div class="status-container">
        <p>État de la commande :</p>
        <p
          class="status-pending"
          :class="
            this.currentOrder.delivered === false
              ? 'status-pending'
              : 'status-delivered'
            this.currentOrder.delivered === false
              ? 'status-pending'
              : 'status-delivered'
          "
          v-html="
            this.currentOrder.delivered === false
              ? 'Livraison en cours'
              : 'Commande livrée'
            this.currentOrder.delivered === false
              ? 'Livraison en cours'
              : 'Commande livrée'
          "
        ></p>
      </div>
      <button
        class="delivery-btn"
        v-if="this.currentOrder.delivered === false"
        @click="confirmDelivery()"
        v-if="this.currentOrder.delivered === false"
        @click="confirmDelivery()"
      >
        Confirmer la livraison
      </button>
    </div>
  </div>

</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      currentOrder: {
        orderNumber: 0,
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
      toggleCard: false,
      ordersList: [],
      groupe: "GUEST",
    };
  },
  methods: {
    reverseOrders() {
      this.ordersList = this.listOfOrders.reverse();
      console.log(this.listOfOrders, this.ordersList);
    },
    confirmDelivery() {
      if (confirm("Êtes-vous sûr de vouloir valider cette commande ?")) {
        this.currentOrder.delivered = true;
      }
    },
    showDetail(orderId) {
      this.toggleCard = !this.toggleCard;
      for (let order of this.listOfOrders) {
        if (order.orderNumber === orderId) {
          this.currentOrder = order;
        }
      }
    },
  },
  computed: {
    ...mapState(["listOfOrders"]),
  },
  created() {
    this.reverseOrders();
    let identity = localStorage.getItem("myIdentity");
    if (identity) {
      this.groupe = JSON.parse(localStorage.getItem("myIdentity")).role;

      this.$store.commit("CHANGE_GROUP", this.groupe);
    }
  },
};
</script>

<style lang="scss" scoped>
.order-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .order-card {
    position: relative;
    position: relative;
    padding: 10px 0 30px 0;
    display: flex;
    flex-direction: column;
    width: 50%;
    width: 50%;
    border: 1px solid lightgrey;
    gap: 50px;
    gap: 50px;

    .close-card {
      font-size: 1em;
      background: none;
      border: none;
      width: fit-content;
      cursor: pointer;
      position: relative;
      top: 0;
      left: 95%;
    }

    .client {
    .close-card {
      font-size: 1em;
      background: none;
      border: none;
      width: fit-content;
      cursor: pointer;
      position: relative;
      top: 0;
      left: 95%;
    }

    .client {
      display: flex;
      justify-content: center;
      gap: 50px;

      .entreprise {
        display: flex;
        flex-direction: column;
      }

      .adresse {
        display: flex;
        flex-direction: column;
      }
      gap: 50px;

      .entreprise {
        display: flex;
        flex-direction: column;
      }

      .adresse {
        display: flex;
        flex-direction: column;
      }
    }

    .bold {
    .bold {
      font-weight: bold;
    }

    .order-recap {
      display: flex;
      justify-content: center;
      gap: 50px;
    }

    .order-recap {
      display: flex;
      justify-content: center;
      gap: 50px;
    }

    .status-pending {
      color: rgb(231, 67, 39);
    }
    .status-delivered {
      color: #4caf50;
    }

    .delivery-btn {
      border: none;
      align-self: center;
      background-color: #4caf50;
      border-radius: 5px;
      color: white;
      width: 30%;
      cursor: pointer;
      padding: 10px 25px;
      padding: 10px 25px;
    }
  }
}

@media screen and (max-width: 1024px) {
  .order-container {
    justify-content: none;
    .order-card {
      width: 66%;
    }
  }
}

@media screen and (max-width: 600px) {
  .order-container {
    justify-content: none;
    .order-card {
      width: 100%;
    }
  }
}
</style>