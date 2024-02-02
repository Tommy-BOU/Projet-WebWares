<template>

  <b>Vue des utilisateurs dans le localStorage</b>
  <br><br>
  <form v-on:submit.prevent="register">
    <h1>Inscription</h1>
    <label for="raisonSociale">Raison Sociale :</label> <input type="text" id="raisonSociale" name="raisonSociale" v-model="newUser.raisonSociale" placeholder="2 caractères minimum" @input="verifRaisonSociale" required />
    <span v-html="msg1"></span>
    <br><br>
    <label for="siret">Siret :</label> <input type="text" id="siret" name="siret" v-model="newUser.siret" placeholder="14 chiffres" @input="verifSiret" required />
    <span v-html="msg2"></span>
    <br><br>
    <label for="adresse">Adresse :</label> <input type="text" id="adresse" name="adresse" v-model="newUser.adresse" placeholder="2 caractères minimum" @input="verifAdresse" required />
    <span v-html="msg3"></span>
    <br><br>
    <label for="codePostal">Code Postal :</label> <input type="text" id="codePostal" name="codePostal" v-model="newUser.codePostal" placeholder="5 chiffres" @input="verifCodePostal" required />
    <span v-html="msg4"></span>
    <br><br>
    <label for="ville">Ville :</label> <input type="text" id="ville" name="ville" v-model="newUser.ville" placeholder="2 caractères minimum" @input="verifVille" required />
    <span v-html="msg5"></span>
    <br><br>
    <label for="email">Email :</label> <input type="email" id="email" name="email" v-model="newUser.email" placeholder="Email valide" @input="verifEmail" required />
    <span v-html="msg6"></span>
    <br><br>
    <label for="motDePasse">Mot De Passe :</label> <input type="password" id="motDePasse" name="motDePasse" v-model="newUser.motDePasse" placeholder="5 caractères minimum" @input="verifMotDePasse" required />
    <span v-html="msg7"></span>
    <br><br>
    <label for="confirmationMotDePasse">Confirmation Mot De Passe :</label> <input type="password" id="confirmationMotDePasse" name="confirmationMotDePasse" v-model="newUser.confirmationMotDePasse" placeholder="5 caractères minimum" @input="verifConfirmationMotDePasse" required />
    <span v-html="msg8"></span>
    <br><br><br>
    <input type="submit" value="S'inscrire">
  </form>

</template>

<script>
import { mapState } from 'vuex';

const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

function existeDeja(tableau, cle, element) {
  for (let i = 0; i < tableau.length; i++) {
    if (tableau[i][cle].toLowerCase() === element.toLowerCase()) {
      return true;
    }
  }
  return false;
}

export default {
  data() {
    return {
      users: this.$store.state.listOfUsers,
      newUser: {},
      validInput1: false,
      validInput2: false,
      validInput3: false,
      validInput4: false,
      validInput5: false,
      validInput6: false,
      validInput7: false,
      validInput8: false
    };
  },

  computed: {
    ...mapState(['listOfUsers']),
  },

  methods: {
    verifRaisonSociale() {
      if(this.newUser.raisonSociale.length >= 2 && existeDeja(this.users, "raisonSociale", this.newUser.raisonSociale) === false) {
        this.msg1 = "Votre Raison Sociale est correcte. \u2705";
        this.validInput1 = true;
      }
      else if (existeDeja(this.users, "raisonSociale", this.newUser.raisonSociale) === true) {
        this.msg1 = "Votre Raison Sociale existe déjà dans notre base de données. \u274C";
        this.validInput1 = false;
      }
      else {
        this.msg1 = "Votre Raison Sociale doit contenir au moins 2 caractères. \u274C";
        this.validInput1 = false;
      }
    },

    verifSiret() {
      if(this.newUser.siret.length === 14 && isNumeric(this.newUser.siret) === true && existeDeja(this.users, "siret", this.newUser.siret) === false) {
        this.msg2 = "Votre Siret est correct. \u2705";
        this.validInput2 = true;
      }
      else if (existeDeja(this.users, "siret", this.newUser.siret) === true) {
        this.msg2 = "Votre Siret existe déjà dans notre base de données. \u274C";
        this.validInput2 = false;
      }
      else {
        this.msg2 = "Votre Siret doit contenir 14 chiffres. \u274C";
        this.validInput2 = false;
      }
    },

    verifAdresse() {
      if(this.newUser.adresse.length >= 2) {
        this.msg3 = "Votre Adresse est correcte. \u2705";
        this.validInput3 = true;
      }
      else {
        this.msg3 = "Votre Adresse doit contenir au moins 2 caractères. \u274C";
        this.validInput3 = false;
      }
    },

    verifCodePostal() {
      if(this.newUser.codePostal.length === 5 && isNumeric(this.newUser.codePostal) === true) {
        this.msg4 = "Votre Code Postal est correct. \u2705";
        this.validInput4 = true;
      }
      else {
        this.msg4 = "Votre Code Postal doit contenir 5 chiffres. \u274C";
        this.validInput4 = false;
      }
    },

    verifVille() {
      if(this.newUser.ville.length >= 2) {
        this.msg5 = "Votre Ville est correcte. \u2705";
        this.validInput5 = true;
      }
      else {
        this.msg5 = "Votre Ville doit contenir au moins 2 caractères. \u274C";
        this.validInput5 = false;
      }
    },

    verifEmail() {
      if(regexMail.test(this.newUser.email) && existeDeja(this.users, "email", this.newUser.email) === false) {
        this.msg6 = "Votre Email est valide. \u2705";
        this.validInput6 = true;
      }
      else if (existeDeja(this.users, "email", this.newUser.email) === true) {
        this.msg6 = "Votre Email existe déjà dans notre base de données. \u274C";
        this.validInput6 = false;
      }
      else {
        this.msg6 = "Votre Email doit être valide. \u274C";
        this.validInput6 = false;
      }
    },

    verifMotDePasse() {
      if(this.newUser.motDePasse.length >= 5) {
        this.msg7 = "Votre Mot De Passe est correct. \u2705";
        this.validInput7 = true;
      }
      else {
        this.msg7 = "Votre Mot De Passe doit contenir au moins 5 caractères. \u274C";
        this.validInput7 = false;
      }
    },

    verifConfirmationMotDePasse() {
      if(this.newUser.confirmationMotDePasse.length >= 5 && this.newUser.motDePasse === this.newUser.confirmationMotDePasse) {
        this.msg8 = "Votre Confirmation Mot De Passe est correcte. \u2705";
        this.validInput8 = true;
      }
      else if(this.newUser.motDePasse != this.newUser.confirmationMotDePasse) {
        this.msg8 = "Votre Mot De Passe doit être identique à cette confirmation. \u274C";
        this.validInput8 = false;
      }
      else {
        this.msg8 = "Votre Confirmation Mot De Passe doit contenir au moins 5 caractères. \u274C";
        this.validInput8 = false;
      }
    },

    register() {
      if (this.validInput1 && this.validInput2 && this.validInput3 && this.validInput4 && this.validInput5 && this.validInput6 && this.validInput7 && this.validInput8) {

        let newid = this.users[this.users.length-1].id+1;
        
        this.users.push(Object.assign({id:newid},this.newUser,{role:"USER"}));

        this.newUser = {};

        this.msg1 = '';
        this.msg2 = '';
        this.msg3 = '';
        this.msg4 = '';
        this.msg5 = '';
        this.msg6 = '';
        this.msg7 = '';
        this.msg8 = '';
      }
    },
    
    saveToLocalStorage() {
      localStorage.setItem("users", JSON.stringify(this.users));
    }
  },

  watch: {
    users: {
      deep: true,
      handler() {
        this.saveToLocalStorage();
      }
    }
  },

  created() {
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