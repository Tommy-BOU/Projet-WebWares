<template>
  <div>
    <br><br>
    <div class="category">
      <h1>Catégories</h1>
      <br><br>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom de la catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(categorie, index) in categories" :key="index">
            <td>{{ categorie.id }}</td>
            <td>{{ categorie.name }}</td>
            <td>
              <button class="action-btns" type="button" @click="openModal(index)">Modifier</button>
              <button class="action-btns" type="button" @click="remove(index)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="action-btns" type="button" @click="openModalAdd()">Ajouter nouvelle catégorie</button>
    </div>
    <!-- Modal -->
    <div v-if="openedModal" class="modal" v-cloak>
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div v-if="typeof index === 'undefined'">
          <h2>Ajouter nouvelle catégorie</h2>
          <br>
          <form v-on:submit.prevent="add">
            <label for="name">Name :</label> <input type="text" id="name" name="name" v-model="name" placeholder="2 caractères minimum" required />
            <br><br><br>
            <input type="submit" value="Enregistrer">
          </form>
        </div>
        <div v-else>
          <h2>Modifier catégorie : {{ name }}</h2>
          <br>
          <form v-on:submit.prevent="update">
            <label for="name">Name :</label> <input type="text" id="name" name="name" v-model="name" placeholder="2 caractères minimum" required />
            <br><br><br>
            <input type="submit" value="Enregistrer">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      // categoriesV: this.$store.state.categories,
      openedModal: false,
      newCategory: {
          categorieId: ''
      },
      editingCategory: ''
    }
  },

  computed: {
    ...mapState(['categories', 'categoriesV'])
  },

  methods: {
    remove(index) {
      if (confirm("Etes-vous certain de vouloir supprimer cette catégorie?")) {
        this.categories.splice(index, 1);
      }
    },

    update(){
      if (this.name != ""){
        this.index.name = this.name;
        setTimeout(() => this.openedModal = !this.openedModal, 1000);
      }
    },

    add() {
      let newid = this.categories[this.categories.length-1].id+1;
      this.categories.push(Object.assign({id:newid,name:this.name}));
      setTimeout(() => this.openedModal = !this.openedModal, 1000);
    },

    // saveToLocalStorage() {
    //   localStorage.setItem("categories", JSON.stringify(this.categories));
    // },

    openModal(index) {
      this.openedModal = true;
      this.index = this.categories[index];
      this.name = this.categories[index].name;
    },

    openModalAdd() {
      this.openedModal = true;
    },

    closeModal() {
      this.openedModal = false;
      
      this.newCategory = {
        Id: '',
        name: '',
      };
    },
  },

  // watch: {
  //   categories: {
  //     deep: true,
  //     handler() {
  //       this.saveToLocalStorage();
  //     }
  //   }
  // },

  created() {
    let storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      this.categories = JSON.parse(storedCategories);
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
  padding: 0 40px 30px 20px;
}

table {
  width: 100%;
  margin: 10px;
  font-size: 14px;
}

td, th {
  padding: 8px;
  border-collapse: collapse;
}

th {
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

input[type="submit"], button {
  width: unset;
  padding: 5px 15px;
  color: #FFF;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  background-color: rgb(231, 67, 39);
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