<template>
  <!-- Video -->
  <video autoplay muted loop id="myVideo">
    <source src="../assets/video.mp4" type="video/mp4" />
  </video>
  <div class="overlay">
    <div class="text-center">
      <h1 class="font-weight-bold">WEBWARES: Qualité et Confort pour tous</h1>
      <p>De Professionnels à Professionnels</p>
      <div class="text-center">
        <button type="button">
          <router-link to="/inscription" class="btn"
            >Rejoignez-nous pour consulter notre catalogue</router-link
          >
        </button>
      </div>
    </div>
  </div>

  <!-- ---------Nos meilleures ventes -->

  <div class="best">
    <h2>NOS MEILLEURES VENTES</h2>
  </div>
  <div class="bloc-images">
    <div class="bloc-image">
      <router-link :to="'produits-details/6'" class="details-link"
        ><img src="../assets/mobilier-1.jpg" alt="Table de nuit"
      /></router-link>
      <br />
      <span><strong>Table de nuit en bois massif</strong></span>
    </div>

    <div class="bloc-image">
      <router-link :to="'produits-details/13'" class="details-link"
        ><img src="../assets/mobilier-4.jpg" alt="canape"
      /></router-link>
      <br />
      <span><strong>Canapé comfortable</strong></span>
    </div>
    <div class="bloc-image">
      <router-link :to="'produits-details/3'" class="details-link"
        ><img src="../assets/deco-3.jpg" alt="vases"
      /></router-link>
      <br />
      <span><strong>Vases ethnique en argile</strong></span>
    </div>
    <div class="bloc-image">
      <router-link :to="'produits-details/2'" class="details-link"
        ><img src="../assets/tapis-2.jpg" alt="tapis"
      /></router-link>
      <br />
      <span><strong>Tapis en laine</strong></span>
    </div>
  </div>

  <!-- ----Footer---- -->

<div class="container"></div>
<footer>
  <!-- Footer main -->
  <section class="ft-main">
    <div class="ft-main-item">
      <h2 class="ft-title">LA SOCIETE</h2>
      <ul>
        <li><a href="#">Valeurs et Engagement</a></li>
        <li><router-link :to="'termes-conditions'">Conditions d'utilisation</router-link></li>
        <li><router-link :to="'mentions-legales'">Mentions légales</router-link></li>
        <li><router-link :to="'politique-de-confidentialite'">Politique de confidentialité</router-link></li>
        <li><a href="#">Plan du site</a></li>
      </ul>
    </div>
    <div class="ft-main-item">
      <h2 class="ft-title">NOS PRODUITS</h2>
      <ul>
        <li><a href="#">Promotions</a></li>
        <li><a href="#">Nouveautés</a></li>
      </ul>
    </div>
    <div class="ft-main-item">
      <h2 class="ft-title">BESOIN D'AIDE?</h2>
      <ul>
        <li><a href="#">Prendre RDV avec un conseiller</a></li>
        <li><a href="#">Assemblage des produits</a></li>
        <li><a href="#">Commande/Livraison/Retour</a></li>
          <li><a href="#">Moyens de paiement</a></li>
        </ul>
      </div>

      <div class="ft-main-item">
        <h2 class="ft-title">RESTEZ EN CONTACT</h2>
        <p>Promo & nouveautés en avant-première!</p>
        <p>Vous pouvez vous désinscrire à tout moment</p>
        <form>
          <input
            type="email"
            name="email"
            size="30"
            placeholder="Votre Email"
          />
          <input type="submit" value="Abonnement" />
        </form>
        <br /><br />

  <a href="https://fr.linkedin.com/" ><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
</svg></a>
<a href="https://fr-fr.facebook.com/" ><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
</svg></a>
<a href="https://twitter.com/" ><svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
</svg></a>
</div>
   
  </section>


</footer>


</template>


<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      identite: "guest",
      groupe: "GUEST",
    };
  },
  computed: {
    ...mapState(["listOfOrders"]),
  },
  created() {
    let identity = localStorage.getItem("myIdentity");
    if (identity) {
      this.identite = JSON.parse(
        localStorage.getItem("myIdentity")
      ).raisonSociale;

      this.$store.commit("CHANGE_IDENTITY", this.identite);
    }
    this.$store.dispatch('initializeCategories');
  },
};
</script>

<style lang="scss" scoped>
#myVideo {
  position: relative;
  left: 0;
  top: 0;
  max-width: 100%;
  max-height: 0%;
  opacity: 60%;
}

.overlay {
  color: rgb(231, 67, 39);
  padding: 5px 15px;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;

  top: 35%;
  bottom: 0;
  width: 100%;
  height: auto;
}

.best {
  margin-top: 50px;
}

button {
  transition: all 0.7s ease;
  color: rgb(231, 67, 39);
  border: 3px solid rgb(231, 67, 39);
  text-align: center;
  line-height: 1, 5;
  font-size: 25px;
  background-color: transparent;
  padding: 10px;
  outline: none;
  border-radius: 4px;
}

button:hover {
  color: rgb(231, 67, 39);
  background-color: #fff;
}

.btn {
  text-decoration: none;
  color: rgb(231, 67, 39);
}
.btn:hover {
  text-decoration: none;
  color: rgb(231, 67, 39);
}

// ----nos meilleures ventes
.bloc-images {
  display: inline-block;
  margin-top: 60px;
  margin-bottom: 60px;
}

.bloc-image {
  display: inline;
  float: left;
  margin-left: 60px;
}

.bloc-image img {
  box-shadow: 3px 3px 6px #e74327;
  margin: 5px;
}
.bloc-image span {
  display: inline-block;
}
img {
  margin: 20px;
  width: 300px;
  height: 300px;
}
h2 {
  color: rgb(231, 67, 39);
}

ul {
  list-style: none;
  padding-left: 0;
}
footer {
  background-color: rgb(231, 67, 39);
  color: #bbb;
  line-height: 1.5;
}
footer a {
  text-decoration: none;
  color: #eee;
}
a:hover {
  text-decoration: underline;
}
.ft-title {
  color: #fff;
  font-family: "Merriweather", serif;
  font-size: 1.375rem;
  padding-bottom: 0.625rem;
}
/* Footer en bas */
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.container {
  flex: 1;
}
/* Footer principal */
.ft-main {
  padding: 1.25rem 1.875rem;
  display: flex;
  flex-wrap: wrap;
}
@media only screen and (min-width: 29.8125rem /* 477px */) {
  .ft-main {
    justify-content: space-evenly;
  }
}
@media only screen and (min-width: 77.5rem /* 1240px */) {
  .ft-main {
    justify-content: space-evenly;
  }
}
.ft-main-item {
  padding: 1.25rem;
  min-width: 12.5rem;
}

/* Newsletter  */
form {
  display: flex;
  flex-wrap: wrap;
}

input[type="email"] {
  border: 0;
  padding: 0.625rem;
  margin-top: 0.3125rem;
}
input[type="submit"] {
  background-color: #00d188;
  color: #fff;
  cursor: pointer;
  border: 0;
  padding: 0.625rem 0.9375rem;
  margin-top: 0.3125rem;
}

.socialmedia {
  padding: 145rem;
  min-width: 12.5rem;
}
.bi {
  margin-right: 10px;
}
p {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>