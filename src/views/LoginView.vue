<template>

  <div v-if="identite === 'guest'" class="connect">
    <h1>Connexion</h1>
    <div v-if="error">
      <span :style="{ color: textColor }">{{ error }}</span>
    </div>
    <form v-on:submit.prevent="login">
      <label for="email">Email :</label> <input type="email" id="email" name="email" v-model="connectUser.email" placeholder="Veuillez saisir votre Email" required />
      <br><br>
      <label for="motDePasse">Mot De Passe :</label> <input type="password" id="motDePasse" name="motDePasse" v-model="connectUser.motDePasse" placeholder="Veuillez saisir votre Mot De Passe" required />
      <br><br><br>
      <input type="submit" value="Se connecter">
    </form>
    <br><br>
    <a @click="openModal()">Mot De Passe oublié</a>

    <!-- MODAL  -->
    <div id="editModal" class="modal" v-if="openedModal" v-cloak>
        <div class="modal-content">
          <span class="close" @click="closeModal">X</span>
          <div v-if="success === ''">
            <h2>Mot De Passe oublié</h2>
            <form v-on:submit.prevent="forgot">
              <label for="email">Email :</label> <input type="email" id="email2" name="email2" v-model="email2" style="width:460px" placeholder="Veuillez saisir votre Email" @input="verifEmail" required />
              <span v-html="msg" v-if="msg != ''"></span>
              <br><br>
              <p>Un nouveau mot de passe ainsi que le lien pour l'activer vont être envoyés à cette adresse.</p>
              <br>
              <input type="submit" value="Envoyer l'email">
            </form>
          </div>
          <div v-else>
            <span :style="{ color: textColor }"><br>{{ success }}</span>
          </div>
        </div>
    </div>
    <!-- MODAL  -->

  </div>
  <div v-else class="connect">
    <div v-if="success">
      <span :style="{ color: textColor }"><br>{{ success }}</span>
      <br><br>
      Bonjour <b>{{ identite }}</b>
      <br><br>
      Redirection en cours ...
    </div>
    <div v-else>
      <br>
      Vous êtes déjà connecté sous l'identité <b>{{ identite }}</b>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex';

const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function existeDeja(tableau, mail) {
  for (let i = 0; i < tableau.length; i++) {
    if (tableau[i].email.toLowerCase() === mail.toLowerCase()) {
      return true;
    }
  }
  return false;
}

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
      error: '',
      success: '',
      textColor: '',
      identite: 'guest',
      groupe: 'GUEST',
      openedModal: false,
      msg: '',
      validEmail: false
    };
  },

  computed: {
    ...mapState(['listOfUsers']),
  },

  methods: {
    openModal() {
      this.openedModal = !this.openedModal;
    },

    closeModal() {
      this.openedModal = !this.openedModal;
    },

    verifEmail() {
      if (regexMail.test(this.email2) && !existeDeja(this.users, this.email2)) {
        this.msg = "L'Email que vous avez saisi ne correspond à aucun compte. \u274C";
        this.validEmail = false;
      }
      else {
        this.msg = '';
        this.validEmail = true;
      }
    },
    
    forgot() {
      if (this.validEmail) {
        this.success = "Un Email avec un nouveau mot de passe ainsi que le lien pour l'activer vient de vous être envoyé.";
        this.textColor = "green";
      }
    },

    login() {
      if (checkEntries(this.users, this.connectUser.email, this.connectUser.motDePasse) === "ErrorPassword") {
        this.error = "Erreur : Ce mot de passe est erroné.";
        this.textColor = "red";
      }
      else if (checkEntries(this.users, this.connectUser.email, this.connectUser.motDePasse) === "UserNotExist") {
        this.error = "Erreur : Ce compte utilisateur n'existe pas.";
        this.textColor = "red";
      }
      else {
        this.success = "Connexion réussie.";
        this.textColor = "green";

        this.identite = JSON.parse(localStorage.getItem("myIdentity")).raisonSociale;
        this.$store.commit('CHANGE_IDENTITY', this.identite);

        this.groupe = JSON.parse(localStorage.getItem("myIdentity")).role;
        this.$store.commit('CHANGE_GROUP', this.groupe);

        // Transmission du groupe de l'utilisateur dans App.vue
        this.$emit('updateGroup', this.groupe);

        // Redirection vers l'accueil
        setTimeout( () => this.$router.push({ path: '/'}), 2000);
      }
    }
  },

  created() {
    let identity = localStorage.getItem("myIdentity");
    if (identity) {
      this.identite = JSON.parse(localStorage.getItem("myIdentity")).raisonSociale;
      
      this.$store.commit('CHANGE_IDENTITY', this.identite);
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
.connect {
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
  color: #FFF;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  background-color: rgb(231, 67, 39);
}

a {
  text-decoration: underline;
  cursor: pointer;
}

a:hover {
  color: rgb(231, 67, 39);
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
  max-width: 500px;
  width: 100%;
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