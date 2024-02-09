<template>
  <div v-if="groupe === 'USER'" class="user">
    <h1>Profil</h1>
    <br />
    <br />
    <div class="profile-links">
      <router-link to="/mes-commandes" class="orders-link"
        >Mes Commandes
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          fill="currentColor"
          class="bi bi-heart-fill"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
          /></svg
      ></router-link>
      <br /><br /><br />
      <router-link to="/mes-favoris" class="favorites-link"
        >Mes Favoris
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          fill="currentColor"
          class="bi bi-heart-fill"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
          /></svg
      ></router-link>
      <br /><br />
      <button type="button" @click="openModal(id)">
        Modifier mes informations
      </button>
    </div>
    <br />
    <br />

    <!-- MODAL  -->
    <div class="modal" v-if="openedModal" v-cloak>
      <div class="modal-content">
        <span class="close" @click="closeModal">X</span>
        <div v-if="success === ''">
          <h2>
            Modification de vos informations :<br /><b>{{ raisonSociale }}</b>
          </h2>
          <br />
          <form v-on:submit.prevent="update">
            <label for="raisonSociale">Raison Sociale :</label>
            <input
              type="text"
              id="raisonSociale"
              name="raisonSociale"
              v-model="raisonSociale"
              placeholder="2 caractères minimum"
              @input="verifRaisonSociale"
              required
            />
            <span v-html="msg1" v-if="msg1 != ''"></span>
            <br /><br />
            <label for="siret">Siret :</label>
            <input
              type="text"
              id="siret"
              name="siret"
              v-model="siret"
              placeholder="14 chiffres"
              @input="verifSiret"
              required
            />
            <span v-html="msg2" v-if="msg2 != ''"></span>
            <br /><br />
            <label for="adresse">Adresse :</label>
            <input
              type="text"
              id="adresse"
              name="adresse"
              v-model="adresse"
              placeholder="2 caractères minimum"
              @input="verifAdresse"
              required
            />
            <span v-html="msg3" v-if="msg3 != ''"></span>
            <br /><br />
            <label for="codePostal">Code Postal :</label>
            <input
              type="text"
              id="codePostal"
              name="codePostal"
              v-model="codePostal"
              placeholder="5 chiffres"
              @input="verifCodePostal"
              required
            />
            <span v-html="msg4" v-if="msg4 != ''"></span>
            <br /><br />
            <label for="ville">Ville :</label>
            <input
              type="text"
              id="ville"
              name="ville"
              v-model="ville"
              placeholder="2 caractères minimum"
              @input="verifVille"
              required
            />
            <span v-html="msg5" v-if="msg5 != ''"></span>
            <br /><br />
            <label for="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              v-model="email"
              placeholder="Email valide"
              @input="verifEmail"
              required
            />
            <span v-html="msg6" v-if="msg6 != ''"></span>
            <br /><br />
            <label for="motDePasse">Mot De Passe :</label>
            <input
              type="password"
              id="motDePasse"
              name="motDePasse"
              v-model="motDePasse"
              placeholder="5 caractères minimum"
              @input="verifMotDePasse"
              required
            />
            <span v-html="msg7" v-if="msg7 != ''"></span>
            <br /><br /><br />
            <input type="submit" value="Enregistrer" />
          </form>
        </div>
        <div v-else>
          <span :style="{ color: textColor }"><br />{{ success }}</span>
        </div>
      </div>
    </div>
    <!-- MODAL  -->
  </div>
  <div v-else class="user">
    <br />
    Vous n'êtes pas autorisé à afficher cette page !
  </div>
</template>

<script>
import { mapState } from "vuex";

const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

export default {
  data() {
    return {
      users: this.$store.state.listOfUsers,
      id: 0,
      identite: "guest",
      groupe: "GUEST",
      openedModal: false,
      validInput1: true,
      validInput2: true,
      validInput3: true,
      validInput4: true,
      validInput5: true,
      validInput6: true,
      validInput7: true,
      msg1: "La Raison Sociale est correcte. \u2705",
      msg2: "Le Siret est correct. \u2705",
      msg3: "L'Adresse est correcte. \u2705",
      msg4: "Le Code Postal est correct. \u2705",
      msg5: "La Ville est correcte. \u2705",
      msg6: "L'Email est valide. \u2705",
      msg7: "Le Mot De Passe est correct. \u2705",
      success: "",
      textColor: "",
    };
  },

  computed: {
    ...mapState(["listOfUsers"]),
  },

  methods: {
    verifRaisonSociale() {
      if (this.raisonSociale.trim().length >= 2) {
        this.msg1 = "La Raison Sociale est correcte. \u2705";
        this.validInput1 = true;
      } else {
        this.msg1 =
          "La Raison Sociale doit contenir au moins 2 caractères. \u274C";
        this.validInput1 = false;
      }
    },

    verifSiret() {
      if (this.siret.length === 14 && isNumeric(this.siret) === true) {
        this.msg2 = "Le Siret est correct. \u2705";
        this.validInput2 = true;
      } else {
        this.msg2 = "Le Siret doit contenir 14 chiffres. \u274C";
        this.validInput2 = false;
      }
    },

    verifAdresse() {
      if (this.adresse.trim().length >= 2) {
        this.msg3 = "L'Adresse est correcte. \u2705";
        this.validInput3 = true;
      } else {
        this.msg3 = "L'Adresse doit contenir au moins 2 caractères. \u274C";
        this.validInput3 = false;
      }
    },

    verifCodePostal() {
      if (this.codePostal.length === 5 && isNumeric(this.codePostal) === true) {
        this.msg4 = "Le Code Postal est correct. \u2705";
        this.validInput4 = true;
      } else {
        this.msg4 = "Le Code Postal doit contenir 5 chiffres. \u274C";
        this.validInput4 = false;
      }
    },

    verifVille() {
      if (this.ville.trim().length >= 2) {
        this.msg5 = "La Ville est correcte. \u2705";
        this.validInput5 = true;
      } else {
        this.msg5 = "La Ville doit contenir au moins 2 caractères. \u274C";
        this.validInput5 = false;
      }
    },

    verifEmail() {
      if (regexMail.test(this.email)) {
        this.msg6 = "L'Email est valide. \u2705";
        this.validInput6 = true;
      } else {
        this.msg6 = "L'Email doit être valide. \u274C";
        this.validInput6 = false;
      }
    },

    verifMotDePasse() {
      if (this.motDePasse.trim().length >= 5) {
        this.msg7 = "Le Mot De Passe est correct. \u2705";
        this.validInput7 = true;
      } else {
        this.msg7 =
          "Le Mot De Passe doit contenir au moins 5 caractères. \u274C";
        this.validInput7 = false;
      }
    },

    update() {
      if (
        this.validInput1 &&
        this.validInput2 &&
        this.validInput3 &&
        this.validInput4 &&
        this.validInput5 &&
        this.validInput6 &&
        this.validInput7
      ) {
        let id = this.users.findIndex((element) => element.id === this.id);

        this.users[id].raisonSociale = this.raisonSociale;
        this.users[id].siret = this.siret;
        this.users[id].adresse = this.adresse;
        this.users[id].codePostal = this.codePostal;
        this.users[id].ville = this.ville;
        this.users[id].email = this.email;
        this.users[id].motDePasse = this.motDePasse;

        localStorage.setItem("myIdentity", JSON.stringify(this.users[id]));

        this.success = "Modification réussie.";
        this.textColor = "green";

        setTimeout(() => (this.openedModal = !this.openedModal), 2000);
        setTimeout(() => (this.success = ""), 2000);
      }
    },

    saveToLocalStorage() {
      localStorage.setItem("users", JSON.stringify(this.users));
    },

    openModal(id) {
      this.openedModal = !this.openedModal;

      id = this.users.findIndex((element) => element.id === this.id);

      this.raisonSociale = this.users[id].raisonSociale;
      this.siret = this.users[id].siret;
      this.adresse = this.users[id].adresse;
      this.codePostal = this.users[id].codePostal;
      this.ville = this.users[id].ville;
      this.email = this.users[id].email;
      this.motDePasse = this.users[id].motDePasse;
    },

    closeModal() {
      this.openedModal = !this.openedModal;
    },
  },

  watch: {
    users: {
      deep: true,
      handler() {
        this.saveToLocalStorage();
      },
    },
  },

  created() {
    let identity = localStorage.getItem("myIdentity");
    if (identity) {
      this.identite = JSON.parse(
        localStorage.getItem("myIdentity")
      ).raisonSociale;
      this.$store.commit("CHANGE_IDENTITY", this.identite);

      this.groupe = JSON.parse(localStorage.getItem("myIdentity")).role;
      this.$store.commit("CHANGE_GROUP", "ADMIN");

      this.id = JSON.parse(localStorage.getItem("myIdentity")).id;
    }

    let storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  },
};
</script>

<style lang="scss" scoped>
.user {
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

td,
th {
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

input[type="submit"],
button {
  width: unset;
  padding: 5px 15px;
  color: #fff;
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

[v-cloak] {
  display: none;
}

.profile-links button {
  margin-top: 15px;
}

.orders-link,
.favorites-link {
  border: 2px solid rgb(231, 67, 39);
  border-radius: 5px;
  padding: 5px 15px 5px 20px;
  text-decoration: none;
  color: rgb(231, 67, 39);
  font-weight: bold;
  font-size: 0.9em;
}

.bi-heart-fill {
  padding-top: 3px;
}
</style>