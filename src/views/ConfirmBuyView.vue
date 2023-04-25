<template>
    <section class="buy-sumary">
        <section class="resumo">
            <div class="title">
                <span>RESUMO DA COMPRA:</span>
                <hr>
            </div>
            <div class="itemCart" v-for="(item, index) in listTest" :key="index">
        
                <CartItemrResume class="itemInfo" @click="calcTotal()" :item=item></CartItemrResume>

            </div>
        </section>
        <div class="data-resume">
            <section class="endereco">
               
                <img class="mapIcon">
               
                <div class="col" id="endereço-data" style="padding: 0.6rem; flex-wrap: wrap;">
                    <span id="endereco">Endereço: {{ endereço }}</span>
                    <div class="row">    
                        <span id="numero">Número: {{ numero }}</span>
                        <span id="complemento">Complemento: {{ complemento }}</span>
                    </div>
                    <span id="bairro">Bairro: {{ bairro }}</span>
                    <div class="row">    
                        <span id="cidade">Cidade: {{ cidade }}</span>
                        <span id="uf">UF: {{ uf }}</span>
                    </div>

                    <div style="width: 100%; text-align: center;">
                        <button class="endereco-change">Escolher outro endereço</button>
                    </div>
                </div>
            </section>

            <section class="forma-pagamento">
                
            </section>
        </div>
    </section>
</template>

<style scoped>
.title{
    text-align: left;
    padding: 1rem;
    font-size: 1.4rem;
}
.buy-sumary{
    display: flex;
    flex-direction: row;
}
.resumo{
    width: 50%;
    margin: 1rem 0rem 1rem 1rem;
    border-radius: 2rem 0 0 2rem;
    background-color: whitesmoke;
    box-shadow: 0 0 0.5rem 0.3rem rgba(0, 0, 0, 0.468);
}

.resumo .itemInfo{
   transform: scale(0.7);
   margin-left: 0;
}

.itemInfo .quantity{
    color: aliceblue;
}
.data-resume{
    flex-direction: column;
    width: 50%;
    
    margin: 1rem 1rem 1rem 0rem;
    border-radius: 0 2rem 2rem 0;
    background-color: whitesmoke;
    box-shadow: 3px 0 0.5rem 0.3rem rgba(0, 0, 0, 0.468);
}

.endereco{
    background-color: rgb(245, 245, 245);
    font-size: 1.4rem;
    display: flex;
    flex-wrap: wrap;
    text-align: left;
    justify-content: center;
}

#endereco{
    min-width: 100%;
}
#numero{
    min-width: 40%;
}
#complemento{
    min-width: 60%;
}
#bairro{
    min-width: 100%;
}
#cidade{
    min-width: 70%;
}
#uf{
    min-width: 30%;
}

#endereço-data{
    gap: 1rem;
    width: 80%;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.endereco-change{
  border-radius: 0.5rem;
    background-color: rgb(0, 167, 0);
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem green, 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
    height: 3.4rem;
    margin-top: 1rem;
    padding: 0.8rem 1.2rem;
    font-size: 1.6rem;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    color: white;
    border: none;
    cursor: pointer;
}

.endereco-change:active{
    background-color: rgb(0, 208, 0);
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem rgb(1, 158, 1), 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
}
.forma-pagamento{
    height: 5rem;
    background-color:cadetblue;
}
</style>

<script>
import CartItemrResume from '@/components/cartItemrResume.vue';

export default {
    name: "ConfirmBuy",
    mounted(){
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
    components: { CartItemrResume },
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
}
</script>