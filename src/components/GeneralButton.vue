<template>
  <button @click="general" class="general-btn">{{ label }}</button>
</template>

<script>
export default {
    props: {
        label: String,
        product: Object
    },
    methods: {
        general() {
            this.$emit("generalEvent", this.product)
        }
    },
}
</script>

<style scoped>

    .general-btn {
        padding: 10px;
        background-color: #4caf50;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 5px;
        width: 80%;
        align-self: center;
    }

</style>