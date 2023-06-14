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
                    <span id="endereco">Endereço: {{ this.endereco }}</span>
                    <div class="row num-com">    
                        <span id="numero">Número: {{ this.numero }}</span>
                        <span id="complemento">Complemento: {{ this.complemento }}</span>
                    </div>
                    <span id="bairro">Bairro: {{ this.bairro }}</span>
                    <div class="row">    
                        <span id="cidade">Cidade: {{ this.cidade }}</span>
                        <span id="uf">UF: {{ this.uf }}</span>
                    </div>

                    <div style="width: 100%; text-align: center;">
                        <button class="endereco-change" @click="this.$router.back();">Escolher outro endereço</button>
                    </div>
                </div>
   
            </section>

            <section class="forma-pagamento">
                <h3>Escolha o método de pagamento</h3>
                <div class="options">
                    <button @click="change(1)" class="metodo-cartao"><img src="\img\1034362_payment_bank_card_credit_finance_icon.png" alt="CARTÃO"></button>
                    <button @click="change(2)" class="metodo-boleto"><img src="\img\365593_boleto_business_buy_card_cash_icon.png" alt="BOLETO"></button>
                    <button @click="change(3)" class="metodo-pix"><img src="\img\8666421_pix_icon.png" alt="PIX"></button>                
                </div>
            </section>
        </div>
        <section class="overlay_blur" v-if="this.formSee" @click="close()">
        </section>
        <section class="overlay" v-if="this.formSee">
            <PopUp  :type="this.type" :nome="this.nome" :email="this.email" :tel="this.tel"></PopUp>
        </section>
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
    margin-block: 5.1vw;
    margin-inline: 1rem;
}
.resumo{
    width: 50%;
    margin: 1rem 0rem 1rem 1rem;
    border-radius: 2rem 0 0 2rem;
    background-color: whitesmoke;
    box-shadow: 0 0 0.5rem 0.3rem rgba(0, 0, 0, 0.468);
}

.resumo .itemInfo{
   transform: scale(0.8);
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
    border-radius: 0 2rem 0 0;
}

#endereco{
    min-width: 100%;
}
#numero{
    min-width: 32%;
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
    font-size: 16pt;
    text-transform: uppercase;
    color: whitesmoke;
    padding-block: 3rem;
    background-color: rgba(8, 128, 8, 0.707);
    border-radius: 0 0 2rem 0;
}

.forma-pagamento h3{
    margin-left: 30%;
}

.options button{
    background: none;
    border: none;
    margin-inline: 3.4rem;
    margin-block: 2rem;
}

.options button img{
    max-height: 6vmax;
}

.overlay{
    position: fixed;
    z-index: 4;
    opacity: 0;
    animation: show 0.4s ease-in-out;
    animation-fill-mode: forwards;
}
.overlay_blur{
    position: fixed;
    background-color: rgba(0, 0, 0, 0.555);
    backdrop-filter: blur(6px);
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    z-index: 2;
    opacity: 0;
    animation: show 0.4s ease-in-out;
    animation-fill-mode: forwards;
}

@keyframes show{
    0% {opacity: 0;}
    
    100% {opacity: 1;}
}

</style>

<script>
import CartItemrResume from '@/components/cartItemrResume.vue';
import PopUp from '@/components/PopUp.vue';

export default {
    name: "ConfirmBuy",
    components:{
        PopUp,
        CartItemrResume
    },
    beforeMount(){
        this.calcTotal()
    
        this.endereco = "Rua Tal..."
        this.numero = 0
        this.complemento = "CASA"
        this.bairro = "Centro"
        this.cidade = "Lugar Nenhum"
        this.uf = "PE"
    },
    data() {
        return {
            formSee: false,
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
            type: "",
            endereco: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            uf: "",
            nome: 'Alan',
            email: '',
            tel: ''
        };
    },
    components: { CartItemrResume, PopUp },
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
        },
        change(formato){
            let formasDePagamento = ['credit','boleto','pix']

            this.type = formasDePagamento[formato-1]
            this.formSee = !this.formSee
            console.log(this.
            formSee)

        },
        close(){
            this.formSee = false;
        }
    },
}
</script>