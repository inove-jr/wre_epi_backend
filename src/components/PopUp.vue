<template>
    <section class="popup">

        <CreditForm v-if="this.type=='credit'" :price="this.totalValue" v-on:emitType="emitType"/>
        <BoletoForm v-if="this.type=='boleto'" :price="this.totalValue" v-on:emitType="emitType"/>
        <PixForm v-if="this.type=='pix'" :price="this.totalValue" v-on:emitType="emitType"/>

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
          // console.log(this.totalValue)
        },
        methods:{
          emitType(type){
            //console.log('work')
            //console.log(type)
            switch (type[0]) {
                case 1:
                    this.$emit('paymentConcluded', [1,type[1].bankSlipUrl])
                    break;
                case 2:
                    this.$emit('paymentConcluded', [2,type[1].invoiceUrl])
                    break;
                default:
                    this.$emit('paymentConcluded', [3,type[1]])
                    break;
            }
          }
        }
    }

  </script>
<style scoped>
.popup{
    padding: 1rem;
    border-radius: 6px;
    margin: auto;
    margin-left: 34vmax;
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