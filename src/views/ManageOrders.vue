<template>
  <div class="order-container">
    <div class="order-card" v-for="(data, index) in listOfOrders" :key="index">
      <h2>Commande N° {{ data.orderNumber }}</h2>
      <div class="order-recap">
        <div class="products">
          <p v-for="produits in data.titreProduits" :key="produits">
            {{ produits }}
          </p>
        </div>
        <div class="quantities">
          <p v-for="quantité in data.quantité" :key="quantité">
            x {{ quantité }}
          </p>
        </div>
        <div class="prices">
          <p v-for="prix in data.prixUnitaire" :key="prix">
            Total article : €{{ prix }}
          </p>
        </div>
      </div>
      <div class="total">
        <p>Total commande HT : €{{ data.coutTotal.toFixed(2) }}</p>
        <p>Total commande TTC : €{{ (data.coutTotal * 1.2).toFixed(2) }}</p>
      </div>
      <div class="client">
        <p>Commanditaire :</p>
        <p>{{ data.entreprise }}</p>
      </div>
      <div class="status-container">
        <p>État de la commande :</p>
        <p
          class="status-pending"
          :class="
            data.delivered === false ? 'status-pending' : 'status-delivered'
          "
          v-html="
            data.delivered === false ? 'Livraison en cours' : 'Commande livrée'
          "
        ></p>
      </div>
      <button
        class="delivery-btn"
        v-if="data.delivered === false"
        @click="data.delivered = true"
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
  .order-card {
    padding: 10px 0 30px 0;
    display: flex;
    flex-direction: column;
    width: 30%;
    border: 1px solid lightgrey;
    gap: 10px;

    .order-recap {
      display: flex;
      justify-content: center;
      gap: 10px;
    }

    .total {
      font-weight: bold;
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