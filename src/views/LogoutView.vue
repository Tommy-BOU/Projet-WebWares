<template>
  <div class="deconnect">
    <span :style="{ color: textColor }"><br />{{ success }}</span>
    <br /><br />
    Redirection en cours ...
  </div>
</template>

<script>
export default {
  data() {
    return {
      success: "Vous êtes déconnecté.",
      textColor: "green",
    };
  },

  created() {
    localStorage.removeItem("myIdentity");

    this.$store.commit("CHANGE_IDENTITY", "guest");

    this.$store.commit("CHANGE_GROUP", "GUEST");

    // Transmission du groupe de l'utilisateur dans App.vue
    this.$emit("updateGroup", "GUEST");

    // Redirection vers l'accueil
    setTimeout(() => this.$router.push({ path: "/" }), 2000);
  },
};
</script>

<style lang="scss" scoped>
.deconnect {
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgb(231, 67, 39);
  padding: 0 40px 30px 20px;
}
</style>