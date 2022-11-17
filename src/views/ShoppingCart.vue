<template>
  
    <section class="whiteBox ">
      <div class="label-itens">
       <p>Itens:</p>
      </div>
      <div class="itemCart" v-for="(item, index) in listTest" :key="index">
        
        <div class="rowItem">
          <div class="removeButton">
          <button @click="remove(index), calcTotal()">X</button>
          </div>

          <div class="itemInfo">
          <CartItem @click="calcTotal()" :item=item></CartItem>
          </div> 
          
        </div>
      </div>
      <hr>
      <div class="totalPrice">
      <p class="priceLabel">
        Total: 
      </p>
      <p>R$ {{som}}</p>
      </div>
    </section> 
</template>
  
<script>
import CartItem from '@/components/cartItem.vue';

  export default {
    beforeMount(){
      this.calcTotal()
    },
    data() {
        return {
            listTest: [
              {nome: "Nome do produto 1 - Capacete do tipo",
                quantity: 2,
                preco: 100.00,
                parcelas: 4,
                imagem: "/img/produto.svg",
                atributs:  {cor: 'tal',
              tamanho: 12}
              },
              {nome: "Nome do produto 2 - Capacete do tipo",
                quantity: 3,
                preco: 200.00,
                parcelas: 4,
                imagem: "/img/produto.svg",
                atributs:  {
                  
                }
              },
              {nome: "Nome do produto 3 - Capacete do tipo",
                quantity: 2,
                preco: 300.00,
                parcelas: 4,
                imagem: "/img/produto.svg",
                atributs:  {
              tamanho: 12}
              },
              {nome: "Nome do produto 4 - Capacete do tipo",
                quantity: 1,
                preco: 400.00,
                parcelas: 4,
                imagem: "/img/produto.svg",
                atributs: {cor: 'tal',
              tamanho: 12}
              },
            ],
            som: 0,
        };
    },
    methods: {
        calcTotal() {
            this.som = 0
            this.listTest.forEach(element => {
              this.som = this.som + element.preco*element.quantity
            //  console.log(element.preco)
            });
        },
        remove(index){
          this.listTest.splice(index,1)
        }
    },
    components: { CartItem }
}
</script>
  
<style scoped>
section{
  font-size: 10rem;
  margin:10rem;
}

.label-itens{
  display: flex;
  font-size: 2rem;
  margin: 1rem 0rem 0rem 2rem;
  color: #521717;

}

.rowItem{
  display: flex;
  align-items: center;
  justify-content:center;
  margin:0rem;
  padding: 0rem;
  
}

.itemCart{
  margin-left: 4rem;
}

.removeButton{
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 3rem;
}

.removeButton button{
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 100%;
  font-size: 1.2rem;
  font-weight: bold;
  border: 0px;
  background-color: #e8e8e8;
  justify-content: center;
  margin: auto;
}

.itemInfo{
  flex-grow: 9;
}

.totalPrice{
  display: flex;
  justify-content: flex-end;
  margin: 1rem 5rem;
  margin-bottom: 5rem;
  font-weight: bolder;
}
.totalPrice p{
  font-size: 3rem;
}
hr{
  margin: 2rem;
}
</style>