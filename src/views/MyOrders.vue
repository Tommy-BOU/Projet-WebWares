<template>
  <div class="order-container">
    <div class="order-list" v-if="!toggleCard">
      <h1>Mes Commandes</h1>
      <table>
        <thead>
          <tr>
            <th>Date de la commande</th>
            <th>Total commande TTC</th>
            <th>État de la commande</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in ordersList" :key="index">
            <td v-if="data.entreprise === identite">{{ data.date }}</td>
            <td v-if="data.entreprise === identite">
              {{ (data.coutTotal * 1.2).toFixed(2) }} €
            </td>
            <td
              v-if="data.entreprise === identite"
              class="status-pending"
              :class="
                data.delivered === false ? 'status-pending' : 'status-delivered'
              "
              v-html="
                data.delivered === false
                  ? 'Livraison en cours'
                  : 'Commande livrée'
              "
            ></td>
            <td v-if="data.entreprise === identite">
              <button
                @click="
                  showDetail(data.orderNumber);
                  console.log(data.orderNumber);
                "
              >
                Voir Détails
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="order-card" v-if="toggleCard">
      <button class="close-card" @click="toggleCard = !toggleCard">X</button>
      <h2>Commande du {{ this.currentOrder.date }}</h2>
      <div class="client">
        <div class="entreprise">
          <p class="bold">Commanditaire :</p>
          <p>{{ this.currentOrder.entreprise }}</p>
        </div>

        <div class="adresse">
          <p class="bold">Adresse :</p>
          <p>{{ this.currentOrder.adresse }}</p>
          <p>{{ this.currentOrder.codePostal }}</p>
          <p>{{ this.currentOrder.ville }}</p>
        </div>
      </div>

      <h2>Articles :</h2>
      <div class="order-recap">
        <div class="products">
          <p
            v-for="produits in this.currentOrder.titreProduits"
            :key="produits"
          >
            {{ produits }}
          </p>
        </div>
        <div class="unit-price">
          <p v-for="prix in this.currentOrder.prixUnitaire" :key="prix">
            {{ prix }} €
          </p>
        </div>
        <div class="quantities">
          <p v-for="quantité in this.currentOrder.quantité" :key="quantité">
            x {{ quantité }}
          </p>
        </div>
        <div class="prices">
          <p v-for="prix in this.currentOrder.prixArticles" :key="prix">
            Total HT : {{ prix.toFixed(2) }} €
          </p>
        </div>
      </div>
      <div class="bold">
        <p>
          Total commande HT : {{ this.currentOrder.coutTotal.toFixed(2) }} €
        </p>
        <p>
          Total commande TTC :
          {{ (this.currentOrder.coutTotal * 1.2).toFixed(2) }} €
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
          "
          v-html="
            this.currentOrder.delivered === false
              ? 'Livraison en cours'
              : 'Commande livrée'
          "
        ></p>
      </div>
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
        date: "",
        titreProduits: [],
        prixUnitaire: [],
        prixArticles: [],
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
      identite: "guest",
    };
  },
  methods: {
    reverseOrders() {
      // Create a copy of the array using spread syntax
      const reversedOrders = [...this.listOfOrders];
      // Reverse the copied array
      this.ordersList = reversedOrders.reverse();
    },
    confirmDelivery() {
      if (confirm("Êtes-vous sûr de vouloir valider cette commande ?")) {
        this.currentOrder.delivered = true;
        localStorage.setItem("orders", JSON.stringify(this.listOfOrders));
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
    let orders = localStorage.getItem("orders");
    if (orders) {
      this.$store.commit("SET_ORDERS");
    }
    this.reverseOrders();

    let identity = localStorage.getItem("myIdentity");
    if (identity) {
      this.identite = JSON.parse(
        localStorage.getItem("myIdentity")
      ).raisonSociale;
      this.$store.commit("CHANGE_IDENTITY", this.identite);

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

  .order-list {
    border: 1px solid rgb(231, 67, 39);
    padding: 10px 40px 30px 20px;

    table {
      // border-collapse: collapse;

      thead {
        th {
          padding: 10px;
          border-bottom: 1px solid lightgrey;
        }
      }

      tbody {
        .status-pending {
          color: rgb(231, 67, 39);
        }
        .status-delivered {
          color: #4caf50;
        }
        tr {
          td {
            padding: 10px;
            border-bottom: 1px solid lightgrey;
            button {
              border: 1px solid rgb(94, 25, 111);
              color: rgb(94, 25, 111);
              border-radius: 5px;
              padding: 10px 25px;
              cursor: pointer;
            }
          }
        }
      }
      tbody tr:nth-child(even) {
        background-color: #f2f2f2;
      }

      tbody tr:nth-child(odd) {
        background-color: #ffffff;
      }
    }
  }

  .order-card {
    position: relative;
    padding: 10px 0 30px 0;
    display: flex;
    flex-direction: column;
    width: 50%;
    border: 1px solid rgb(231, 67, 39);
    margin-bottom: 50px;
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
    }

    .bold {
      font-weight: bold;
    }

    .order-recap {
      display: flex;
      justify-content: center;
      gap: 25px;
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
      color: #4caf50;
      border: 1px solid #4caf50;
      border-radius: 5px;
      width: 30%;
      cursor: pointer;
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