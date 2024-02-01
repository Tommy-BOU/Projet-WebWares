<template>
 <!-- Video -->
        <video autoplay muted loop id="myVideo">
            <source src="../assets/video.mp4" type="video/mp4">
        </video>
        <div class="overlay">
            <div class="text-center">
                <h1 class="font-weight-bold"> WEBWARES: Qualité et Confort pour tous</h1>
                <p>De Professionnels à Professionnels</p>
        
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
        <li><a href="#">Service sur Mesure</a></li>
         <li><a href="#">Confidentialité & CGV</a></li>
          <li><a href="#">Mentions légales</a></li>
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
        <input type="email" name="email" placeholder="Votre Email">
        <input type="submit" value="Abonnement">
      </form>
    </div>
  </section>


</footer>




</template>

<script>

export default {
  components: {

  },
};
</script>

<style lang="scss">

#myVideo {
  position: relative;
    left: 0;
    top: 0;
    max-width:100%;
    max-height:0%;
    opacity: 60%;
  }
  .overlay {
    color: rgb(231, 67, 39);
    padding: 5px 15px;
    text-align: center;
    position:absolute;
    left: 0;
    right: 0;
    top: 60vh;
    bottom: 0;
   
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

</style>