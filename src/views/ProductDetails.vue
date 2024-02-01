<template>
  <div class="product-details-container">
    <img :src="currentProduct.image" :alt="currentProduct.image">
    <div class="prod-description-container">
        <GeneralButton label="Add to Cart" @generalEvent="addOrRemove(currentProduct)" v-if="!isInCart(currentProduct)"/>
        <GeneralButton label="Remove from Cart" @generalEvent="addOrRemove(currentProduct)" v-else/>
        <h2>{{ currentProduct.titre }}</h2>
        <p>{{ currentProduct.description }}</p>
        <p class="moq-text">Quantité minimum de commande : {{ currentProduct.moq }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GeneralButton from '@/components/GeneralButton.vue'

export default {

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

            console.log(this.cartItems)
            console.log(product.quantity)
        },
    }
}
</script>

<style scoped>

.product-details-container {
    display: flex;
    margin: 0 auto;
    align-items: center;
    width: 700px;
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

</style>