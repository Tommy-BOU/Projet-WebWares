<template>
  <div>
    <div class="product-inventory-container">
      <h1>Produits</h1>
      <div class="top-button">
          <GeneralButton label="Ajouter un produit" @generalEvent="openModal" class="admin-general" />
      </div>
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
            <td class="thumbnail-img">
              <img :src="actualProduct.image" :alt="actualProduct.titre" />
            </td>
            <td>{{ actualProduct.id }}</td>
            <td>{{ actualProduct.titre }}</td>
            <td>{{ actualProduct.prix }}</td>
            <td>{{ actualProduct.moq }}</td>
            <td>{{ actualProduct.categorieId }}</td>
            <td>
              <button
                class="action-btns modify"
                type="button"
                @click="openModal(index)"
              >
                Modifier
              </button>
              <button
                class="action-btns remove"
                type="button"
                @click="remove(index)"
              >
                Supprimer
              </button>
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
              <GeneralButton
              class="admin-general"
                label="Ajouter un produit"
                @generalEvent="openModal"
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="openedModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">X</span>
        <h2>
          {{ editingProduct ? "Modifier un produit" : "Ajouter un produit" }}
        </h2>

        <!-- Form fields -->
        <form @submit.prevent="editingProduct ? edit() : add()">
          <label for="productName">Nom du produit:</label>
          <br />
          <input type="text" id="productName" v-model="form.titre" required />
          <br />
          <label for="productDescription">Description:</label>
          <br />
          <textarea
            id="productDescription"
            v-model="form.description"
            required
          ></textarea>
          <br />
          <label for="productPrice">Prix:</label>
          <br />
          <input type="number" id="productPrice" v-model="form.prix" required />
          <br />
          <label for="productMoq">MOQ (Quantité minimale de commande):</label>
          <br />
          <input type="number" id="productMoq" v-model="form.moq" required />
          <br />
          <label for="productCategory">Catégorie:</label>
          <br />
          <select name="category" id="category" v-model="form.categorieId">
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
            <!-- <option value="1">1 - Mobilier d'intérieur</option>
            <option value="2">2 - Luminaires</option>
            <option value="3">3 - Tapis</option>
            <option value="4">4 - Objets de décorations</option> -->
          </select>
          <br />
          <br />
          <label for="productImage">Image:</label>
          <br />
          <input
            type="file"
            id="productImage"
            @change="handleImageUpload"
            accept="image/*"
          />
          <br />
          <button id="addButton" type="submit">
            {{ editingProduct ? "Modifier" : "Ajouter" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import GeneralButton from "@/components/GeneralButton.vue";

export default {
  components: {
    GeneralButton,
  },
  data() {
    return {
      openedModal: false,
      editingProduct: false,
      form: {
        id: null,
        image: null,
        titre: "",
        description: "",
        prix: null,
        moq: null,
        categorieId: null,
      },
    };
  },
  computed: {
    ...mapState(["produits", "categories", "actualProducts"]),
  },
  methods: {
    remove(index) {
      if (confirm("Etes-vous certain de vouloir supprimer ce produit ?")) {
        this.$store.commit("REMOVE_FROM_STOCK", index);
      }
    },
    add() {
      this.$store.commit("ADD_NEW_PRODUCT", this.form);
      localStorage.setItem(
        "actualProducts",
        JSON.stringify(this.actualProducts)
      );
      this.closeModal();
    },
    edit() {
      const index = this.actualProducts.findIndex(
        (product) => product.id === this.form.id
      );
      if (index !== -1) {
        this.$store.commit("EDIT_PRODUCT", { index, product: this.form });
      }
      this.closeModal();
    },
    openModal(index) {
      if (index !== undefined) {
        this.editingProduct = true;
        const product = this.actualProducts[index];
        this.form = { ...product }; // populates form with product data, enters edit mode
      } else {
        this.editingProduct = false;
        this.form = {
          // Reset form for adding new product
          id: null,
          image: null,
          titre: "",
          description: "",
          prix: null,
          moq: null,
          categorieId: null,
        };
      }
      this.openedModal = true;
    },
    closeModal() {
      this.openedModal = false;
    },
  },
  created() {
    if (!this.actualProducts) {
      // If actualProducts doesn't exist in the Vuex store, set it to an empty array
      this.$store.dispatch("setActualProducts", [...this.produits]);
    }
    const storedActualProducts = JSON.parse(
      localStorage.getItem("actualProducts")
    );
    if (storedActualProducts) {
      this.$store.dispatch("setActualProducts", storedActualProducts);
    }
  },
};
</script>

<style scoped>

.admin-general{
    background: none;
    color: #4caf50;
    border: 1px solid #4caf50;
}

.top-button{
    width: 20%;
    margin: 10px auto;
}

table {
  width: 90%;
  margin: 0 auto;
  font-size: 14px;
}

td,
th {
  padding: 8px;
  border-collapse: collapse;
}

tr > td {
  border-bottom: 1px solid lightgrey;
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
  height: auto;
}

.action-btns {
  margin: 5px;
  padding: 5px;
}

#addButton {
  padding: 10px;
  color: #4caf50;
  border: 1px solid #4caf50;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 5px;
}

button {
  border-radius: 5px;
  color: white;
  border: none;
  cursor: pointer;
}

.modify {
  border: 1px solid rgb(94, 25, 111);
  color: rgb(94, 25, 111);
}

.remove {
  border: 1px solid red;
  color: red;
}

.addNewProduct {
  display: flex;
  justify-content: center;
}

.product-inventory-container {
  padding: 10px;
  margin-bottom: 40px;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  border: 1px solid rgb(231, 67, 39);
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

.modal-content input,
textarea,
select {
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 5px;
}

#productDescription {
  width: 80%;
  height: 60px;
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
  font-size: 0.9em;
}
</style>