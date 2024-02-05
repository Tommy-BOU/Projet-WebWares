<template>

  <form v-on:submit.prevent="login">
    <h1>Connexion</h1>
    <div id="msg" v-if="msg" :style="{ color: textColor }">{{ msg }}</div>
    <div v-if="identite === 'guest'">
      <label for="email">Email :</label> <input type="email" id="email" name="email" v-model="connectUser.email" placeholder="Veuillez saisir votre Email" required />
      <br><br>
      <label for="motDePasse">Mot De Passe :</label> <input type="password" id="motDePasse" name="motDePasse" v-model="connectUser.motDePasse" placeholder="Veuillez saisir votre Mot De Passe" required />
      <br><br><br>
      <input type="submit" value="Se connecter">
      <br><br>
      Mot De Passe oublié
    </div>
    <div v-else><br>Bonjour {{ identite }}</div>
  </form>

</template>

<script>
import { mapState } from 'vuex';

function checkEntries(tableau, email, password) {
  for (let i = 0; i < tableau.length; i++) {
    if (tableau[i]["email"].toLowerCase() === email.toLowerCase()) {
      if (tableau[i]["motDePasse"] === password) {
        let utilisateur = {
            id: tableau[i]["id"],
            raisonSociale: tableau[i]["raisonSociale"],
            siret: tableau[i]["siret"],
            adresse: tableau[i]["adresse"],
            codePostal: tableau[i]["codePostal"],
            ville: tableau[i]["ville"],
            email: tableau[i]["email"],
            motDePasse: tableau[i]["motDePasse"],
            role: tableau[i]["role"]
        }
        localStorage.setItem('myIdentity', JSON.stringify(utilisateur));
        return "Connected";
      }
      else {
        return "ErrorPassword";
      }
    }
  }
  return "UserNotExist";
}

export default {
  data() {
    return {
      users: this.$store.state.listOfUsers,
      connectUser: {},
      msg: '',
      textColor: '',
      identite: 'guest'
    };
  },

  computed: {
    ...mapState(['listOfUsers']),
  },

  methods: {
    login() {
      if (checkEntries(this.users, this.connectUser.email, this.connectUser.motDePasse) === "ErrorPassword") {
        this.msg = "Erreur : Ce mot de passe est erroné.";
        this.textColor = "red";
      }
      else if (checkEntries(this.users, this.connectUser.email, this.connectUser.motDePasse) === "UserNotExist") {
        this.msg = "Erreur : Ce compte utilisateur n'existe pas.";
        this.textColor = "red";
      }
      else {
        this.msg = "Connexion réussie.";
        this.textColor = "green";
        this.identite = JSON.parse(localStorage.getItem("myIdentity")).raisonSociale;

        this.$store.dispatch('logInUser', 'myIdentity');
      }
    }
  },

  created() {
    let identity = localStorage.getItem("myIdentity");
    if (identity) {
      this.identite = JSON.parse(localStorage.getItem("myIdentity")).raisonSociale;
    }

    let storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
    else
    {
      localStorage.setItem("users", JSON.stringify(this.users));
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgb(231, 67, 39);
  padding: 0 40px 30px 20px;
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

input[type="submit"] {
  width: unset;
  padding: 5px 15px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  background-color: rgb(231, 67, 39);
}
</style>