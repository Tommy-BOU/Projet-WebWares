<template>
  <div>
    <div class="category">
      <h1>Catégories</h1>
      <br /><br />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom de la catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(categorie, index) in categoriesV" :key="index">
            <td>{{ categorie.id }}</td>
            <td>{{ categorie.name }}</td>
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
      </table>
      <button
        class="action-btns add-category"
        type="button"
        @click="openModalAdd(index='addCat')"
      >
        Ajouter nouvelle catégorie
      </button>
    </div>
    <!-- Modal -->
    <div v-if="openedModal" class="modal" v-cloak>
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div v-if="index === 'addCat'">
          <h2>Ajouter nouvelle catégorie</h2>
          <br />
          <form v-on:submit.prevent="addCategory">
            <label for="name">Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              v-model="name"
              placeholder="2 caractères minimum"
              required
            />
            <br /><br /><br />
            <input type="submit" value="Enregistrer" />
          </form>
        </div>
        <div v-else>
          <h2>Modifier catégorie : {{ name }}</h2>
          <br />
          <form v-on:submit.prevent="update">
            <label for="name">Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              v-model="name"
              placeholder="2 caractères minimum"
              required
            />
            <br /><br /><br />
            <input type="submit" value="Enregistrer" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openedModal: false,
      name: "",
      // index: null,
      newCategory: {
        categorieId: "",
      },
      editingCategory: "",
    };
  },

  computed: {
    categoriesV() {
      return this.$store.state.categoriesV;
    }
  },

  methods: {
    remove(index) {
      if (confirm("Etes-vous certain de vouloir supprimer cette catégorie?")) {
        this.categoriesV.splice(index, 1);
        this.saveToLocalStorage();
      }
    },

    update() {
      if (this.name !== "") {
        this.categoriesV[this.index].name = this.name;
        this.saveToLocalStorage();
        this.closeModal();
      }
    },

    addCategory() {
  if (this.name.trim() !== "") {
    let newId = this.categoriesV[this.categoriesV.length - 1].id + 1;
    this.categoriesV.push({ id: newId, name: this.name });
    this.saveToLocalStorage();
    this.closeModal();
  }
},


    saveToLocalStorage() {
      localStorage.setItem("categoriesV", JSON.stringify(this.categoriesV));
    },

    openModal(index) {
      this.openedModal = true;
      this.index = index;
      this.name = this.categoriesV[index].name;
    },

    openModalAdd() {
      this.openedModal = true;
      // this.index = -1; 
      this.name = "";
    },

    closeModal() {
      this.openedModal = false;
      this.name = ""; 
    }
  },

  watch: {
    categoriesV: {
      deep: true,
      handler() {
        this.saveToLocalStorage();
      }
    }
  },

  created() {
    let storedCategoriesV = JSON.parse(localStorage.getItem("categoriesV"));
    if (storedCategoriesV) {
      this.$store.commit('SET_CATEGORIESV', storedCategoriesV);
    } else {
      // If categoriesV is not stored in localStorage, initialize it as a replica of categories
      this.$store.commit('SET_CATEGORIESV', [...this.$store.state.categories]);
      // Save to localStorage for future use
      this.saveToLocalStorage();
    }

    this.$store.dispatch('initializeCategories');
  }
}
</script>


<style scoped>
.category {
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgb(231, 67, 39);
  padding: 10px 40px 30px 20px;
}

table {
  width: 100%;
  margin: 10px;
  font-size: 14px;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

tbody tr:nth-child(odd) {
  background-color: #ffffff;
}

td,
th {
  padding: 8px;
  border-collapse: collapse;
  border-bottom: 1px solid lightgrey;
}

label {
  float: left;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 1px solid rgb(231, 67, 39);
}

select {
  float: left;
}

input[type="submit"],
button {
  width: unset;
  padding: 5px 15px;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  border: 1px solid #4caf50;
  color: #4caf50;
}

.modify {
  border: 1px solid rgb(94, 25, 111);
  color: rgb(94, 25, 111);
}

.remove {
  border: 1px solid red;
  color: red;
}

.add-category {
  border: 1px solid #4caf50;
  color: #4caf50;
}

button {
  margin-left: 10px;
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
  max-height: 600px;
  width: 100%;
  overflow-y: scroll;
  position: relative;
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
</style>