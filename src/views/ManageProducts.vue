<template>
<div>
    <h1>Liste des Produits</h1>
    <br><br>
    <table>
      <thead>
          <tr>
              <th>Référence</th>
              <th>titre</th>
              <th>Image</th>
              <th>Détails</th>
              <th>Prix</th>
              <th>Catégorie</th>
              <th>Actions</th>
          </tr>
      </thead>
      
      <tbody>
        <tr v-for="(produit, index) in produits" :key="index">
          <td>{{ produit.id }}</td>
          <td>{{ produit.titre }}</td>
          <td class="thumbnail-img"><img :src="produit.image" :alt="produit.titre"></td>
          <td>{{ produit.description }}</td>
          <td>{{ produit.prix }}</td>
          <td>{{ produit.categorieId }}</td>
          <td>
            <button type="button" @click="openModal(id)">Modifier</button>
            <button type="button" @click="remove(index)">Supprimer</button>
            <button type="button" @click="add(index)">Ajouter</button>
          </td>
        </tr>
      </tbody>
      </table>
      
  </div>

</template>
<script>
import {mapState} from "vuex"
export default {
  computed:{
    ...mapState(["produits"])
  },

}
</script>

<style scoped>
.thumbnail-img img{
  width:40px;
  height:auto;
}
table{
  margin: 0 auto;
}


</style>