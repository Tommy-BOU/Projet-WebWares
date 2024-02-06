<template>
  <div class="order-container">
    <div class="order-list" v-if="!toggleCard">
      <table>
        <thead>
          <tr>
            <th>Numéro de commande</th>
            <th>Identité de l'acheteur</th>
            <th>Total commande TTC</th>
            <th>État de la commande</th>
            <th></th>
          </tr>
        </thead>
        <tbody v-for="(data, index) in ordersList" :key="index">
          <tr>
            <td>{{ data.orderNumber }}</td>
            <td>{{ data.entreprise }}</td>
            <td>€ {{ (data.coutTotal * 1.2).toFixed(2) }}</td>
            <td
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
            <td>
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
      <h2>Commande N° {{ this.currentOrder.orderNumber }}</h2>
      <div class="client">
        <div class="entreprise">
          <p class="bold e">Commanditaire :</p>
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
            €{{ prix }}
          </p>
        </div>
        <div class="quantities">
          <p v-for="quantité in this.currentOrder.quantité" :key="quantité">
            x {{ quantité }}
          </p>
        </div>
        <div class="prices">
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
      <button
        class="delivery-btn"
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
  computed: {
    ...mapState(["listOfOrders"]),
  },
};
</script>

<style lang="scss" scoped>
.order-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .order-list {
    table {
      border: 1px solid lightgrey;
      border-collapse: collapse;

      thead {
        th {
          padding: 10px;

          border: 2px solid lightgrey;
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
            border: 1px solid lightgrey;
            padding: 10px;

            button {
              background-color: rgb(94, 25, 111);
              color: white;
              border: none;
              border-radius: 5px;
              padding: 10px 25px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .order-card {
    position: relative;
    padding: 10px 0 30px 0;
    display: flex;
    flex-direction: column;
    width: 50%;
    border: 1px solid lightgrey;
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