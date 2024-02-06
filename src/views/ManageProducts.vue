<template>
  <div>
    <br>
    <div class="product-inventory-container">
        <h1>Produits</h1>
        <br><br>
        <GeneralButton label="Ajouter un produit" @generalEvent="openModal" />
        <table>
          <thead>
              <tr>
                  <th>Image</th>
                  <th>Référence</th>
                  <th>Titre</th>
                  <th>Prix</th>
                  <th>MOQ</th>
                  <th>Catégorie</th>
                  <th>Actions</th>
              </tr>
          </thead>
          <tbody>
            <tr v-for="(actualProduct, index) in actualProducts" :key="index">
              <td class="thumbnail-img"><img :src="actualProduct.image" :alt="actualProduct.titre"></td>
              <td>{{ actualProduct.id }}</td>
              <td>{{ actualProduct.titre }}</td>
              <td>{{ actualProduct.prix }}</td>
              <td>{{ actualProduct.moq }}</td>
              <td>{{ actualProduct.categorieId }}</td>
              <td>
                <button class="action-btns" type="button" @click="openModal(index)">Modifier</button>
                <button class="action-btns" type="button" @click="remove(index)">Supprimer</button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="addNewProduct">
                    <GeneralButton label="Ajouter un produit" @generalEvent="openModal" />
                </td>
            </tr>
          </tfoot>
        </table>
    </div>

    <!-- Modal -->
    <div v-if="openedModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">X</span>
        <h2>{{ editingProduct ? 'Modifier un produit' : 'Ajouter un produit' }}</h2>

        <!-- Form fields -->
        <form @submit.prevent="editingProduct ? edit() : add()">
          <label for="productName">Nom du produit:</label>
          <br>
          <input type="text" id="productName" v-model="form.titre" required>
            <br>
          <label for="productDescription">Description:</label>
          <br>
          <textarea id="productDescription" v-model="form.description" required></textarea>
            <br>
          <label for="productPrice">Prix:</label>
          <br>
          <input type="number" id="productPrice" v-model="form.prix" required>
            <br>
          <label for="productMoq">MOQ (Quantité minimale de commande):</label>
          <br>
          <input type="number" id="productMoq" v-model="form.moq" required>
            <br>
          <label for="productCategory">Catégorie:</label>
          <br>
          <select name="category" id="category" v-model="form.categorieId">
            <option value="1">1 - Mobilier d'intérieur</option>
            <option value="2">2 - Luminaires</option>
            <option value="3">3 - Tapis</option>
            <option value="4">4 - Objets de décorations</option>
          </select>
            <br>
            <br>
          <label for="productImage">Image:</label>
          <br>
          <input type="file" id="productImage" @change="handleImageUpload" accept="image/*">
            <br>
          <button id="addImageBtn" type="submit">Ajouter ce produit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GeneralButton from '@/components/GeneralButton.vue';

export default {
    components: {
        GeneralButton,
    },
    data() {
        return {
            openedModal: false,
            newProduct: {
                image: null,
                titre: '',
                description: '',
                prix: 0,
                moq: 0,
                categorieId: '',
            },
        }
    },
    computed: {
        ...mapState(['produits', 'categories', 'actualProducts'])
    },
    methods: {
        
        remove(index) {
            if (confirm("Etes-vous certain de vouloir supprimer ce produit ?")) {
            this.$store.commit('REMOVE_FROM_STOCK', index);
            }
        },
        add(newProduct) {
            this.$store.commit('ADD_NEW_PRODUCT', newProduct);
            this.closeModal();
        },
        openModal() {
            this.openedModal = true;
        },
        closeModal() {
        this.openedModal = false;
        
        this.newProduct = {
            image: null,
            titre: '',
            description: '',
            prix: 0,
            moq: 0,
            categorieId: '',
        };
    },
    },
    created() {
        const storedActualProducts = JSON.parse(localStorage.getItem('actualProducts'));
        if (storedActualProducts) {
            this.$store.dispatch('setActualProducts', storedActualProducts);
        } else {
            this.$store.dispatch('setActualProducts', [...this.produits]);
        }
    }
}
</script>

<style scoped>

table {
    width: 90%;
    margin: 0 auto;
    font-size: 14px;
}

td, th {
    padding: 8px;
    border-collapse: collapse;
}

tr > td {
    border-right: 1px solid lightgrey;
}

th {
    border-bottom: 1px solid lightgrey;
}

tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tbody tr:nth-child(odd) {
    background-color: #ffffff;
  }

.thumbnail-img {
    width: 50px;
}

.thumbnail-img img {
    width: 40px;
    height: auto
}

.action-btns {
    margin: 5px;
    padding: 5px;
}

#addButton {
    padding: 10px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 5px;
}

.addNewProduct {
    display: flex;
    justify-content: center;
}

.product-inventory-container {
    margin-bottom: 40px;
}

.modal {
    display: flex; 
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    z-index: 1; 
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    width: 100%;
    position: relative;
}

.modal-content input, textarea, select {
    padding: 8px;
    margin-bottom: 10px;
    border-radius: 5px;
}

#productDescription {
    width: 80%;
    height: 60px
}

#category {
    padding: 8px;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 18px;
    color: #333;
    z-index: 2; 
}

h2 {
    margin-bottom: 20px;
}

#addImageBtn {
    padding: 10px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    font-size: .9em;
}

</style>