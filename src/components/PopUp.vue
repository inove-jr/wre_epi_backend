<template>
    <section class="popup">

        <CreditForm v-if="this.type=='credit'" :price="this.totalValue"/>
        <BoletoForm v-if="this.type=='boleto'" :N="this.nome" :E="this.email"/>
        <PixForm v-if="this.type=='pix'" :N="this.nome" :E="this.email" :T="this.tel"/>

    </section>
</template>
<script>
    import BoletoForm from "./Forms/BoletoForm.vue";
    import CreditForm from "./Forms/CreditForm.vue";
    import PixForm from "./Forms/PixForm.vue";

    export default {
        name: 'PopUp',
        components:{
            CreditForm,
            PixForm,
            BoletoForm
        },
        props:['type', 'nome',  'email', 'tel','totalValue'],
        data() {
          return {
          }
        },
        mounted() {
        console.log(this.totalValue)}
    }

  </script>
<style scoped>
.popup{
    width: 41rem;
    padding: 3rem;
    border-radius: 6px;
    margin: auto;
    margin-left: 39vmax;
    box-shadow: 4px 4px 24px #000000;
    background-color: white;
    z-index: 5;
}

#overlay {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000;
  display: none;
}

#pop-up {
  background-color: white;
  border: 2px solid black;
  display: block;
  width: 350px;
  z-index: 1001;
  top: 60px;
  left: 240px;
  position: fixed; 
  padding-left: 10px;
  margin: auto;
}
</style>