<template>
  <section class="popup">

    <span>Detalhes do pedido:</span>
    
    <div>
      <hr>
      <div class="itemList">
        <div class="itemCart" v-for="(item, index) in itemList" :key="index">
                  
          <CartItemrResume class="itemInfo" @click="calcTotal()" :item=item></CartItemrResume>
    
        </div>
      </div>
      <hr>
      <div class="listTotal">
        <span> Valor total: R$ {{ (this.total).toLocaleString("pt-BR", { minimumFractionDigits: 2}) }}</span>
      </div>
    </div>

  </section>
</template>
<script>
import CartItemrResume from '../components/cartItemrResume.vue';

export default {
  name: 'ResumePopUp',
  components:{
    CartItemrResume,
  },
  props: {
      itemList: {
          type: [Array],
          default: [],
      },
      total:{
        type: Number,
        default: 0
      }
  },
  data() {
    return {
      }
    }
  }

  </script>
<style scoped>
.popup{
    position: fixed;
    top: 20%;
    left: 25%;
    min-width: 66rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 3rem;
    border-radius: 6px;
    margin: auto;
    box-shadow: 4px 4px 24px #000000;
    background-color: white;
    z-index: 5;
}

.popup span{
  font-size: 14pt;
  padding-bottom: 1rem;
}

.itemList{
  padding-top: 1rem;
  margin: auto;
  max-height: 30rem;
  overflow: auto;
  padding-block: 2rem;
}

.listTotal{
  padding-top: 1rem;
  text-align: right;
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