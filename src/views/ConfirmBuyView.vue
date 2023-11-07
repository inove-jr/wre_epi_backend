<template>
    <section class="buy-sumary">
        <section class="resumo">
            <div class="title">
                <span>RESUMO DA COMPRA:</span>
                <hr>
            </div>
            <div class="itemCart" v-for="(item, index) in listProducts" :key="index">
                <CartItemrResume class="itemInfo" :item=item></CartItemrResume>
            </div>
            <hr>
            <p class="priceLabel">Total:{{this.som}}</p>

        </section>
        <div class="data-resume">
            <section class="endereco">
               
                <img class="mapIcon">
                <div class="col" id="endereço-data" style="padding: 0.6rem; flex-wrap: wrap;">
                    <span id="endereco"><b> Endereço: </b>{{ endereco.street }}</span>
                    <span id="bairro"><b>Bairro: </b>{{ endereco.district }}</span>
                    <div class="row num-com">    
                        <span id="numero"><b> Número: </b>{{ endereco.number }}</span>
                        <span id="complemento"><b> Complemento: </b>{{ endereco.complement }}</span>
                    </div>
                    <div class="row" style="flex-wrap: wrap;">    
                        <span id="cidade"><b> Cidade: </b>{{ endereco.city }}</span>
                        <span id="uf"><b> Estado: </b>{{ endereco.state }}</span>
                    </div>

                    <div style="width: 100%; text-align: center;">
                        <button class="endereco-change" @click="this.$router.push({name: 'cart'});">Escolher outro endereço</button>
                    </div>
                </div>
   
            </section>
            <section class="forma-pagamento">
                <h3>Escolha o método de pagamento</h3>
                <div class="options" v-bind:class="{ deactive: listProducts.length==0, blur: formSee}">
                    <div @click="change(1)">
                        <button class="metodo-cartao"><img src="\img\1034362_payment_bank_card_credit_finance_icon.png" alt="CARTÃO"></button>
                        <h3>Cartão</h3>
                    </div>
                    <div @click="change(2)">
                        <button class="metodo-boleto"><img src="\img\365593_boleto_business_buy_card_cash_icon.png" alt="BOLETO"></button>
                        <h3>Boleto</h3>
                    </div>
                    <div @click="change(3)">
                        <button class="metodo-pix"><img src="\img\8666421_pix_icon.png" alt="PIX"></button>   
                        <h3>PIX</h3>
                    </div>
                    <div class="paypal" ref="paypal"> </div> 
                </div>
            </section>
        </div>
        <section class="overlay_blur" v-if="this.formSee" @click="close()">
        </section>
        <section class="overlay" v-if="this.formSee">
            <PopUp  :type="this.type" :nome="this.nome" :email="this.email" :tel="this.tel" :totalValue="this.som"></PopUp>
        </section>
    </section>
</template>

<script>
import CartItemrResume from '@/components/cartItemrResume.vue';
import PopUp from '@/components/PopUp.vue';
import axios from "axios"
import { baseApiUrl,userKey } from '@/global';

export default {
    name: "ConfirmBuy",
    components:{
        PopUp,
        CartItemrResume
    },
    beforeMount(){
    
        // this.endereco = "Rua Tal..."
        // this.numero = 0
        // this.complemento = "CASA"
        // this.bairro = "Centro"
        // this.cidade = "Lugar Nenhuma"
        // this.uf = "PE"
        this.getInfo();
        this.calcTotal();

        setTimeout((()=>{
            console.log(this.listProducts)

        }),800)

        const script = document.createElement("script");
        script.src =
          "https://www.paypal.com/sdk/js?currency=BRL&client-id=ARTNZxkNzeMEJFwpV6A3kf7OXIprruE6aBU5PY7s5sT0RpoO8o4vXRKhjvg3uNb9hIvtQutOpMwhvsvw";
        script.addEventListener("load", this.setLoaded);
        document.body.appendChild(script);
    },
    mounted: function() {
    },
    data() {
        return {
            formSee: false,
            paidFor: false,
            /*listProducts: [
               {nome: "Nome do produto 1 - Capacete do tipo",
                 quantity: 2,
                 price: 100.00,
                 parcelas: 4,
                 imagem: "/img/produto.svg",
                 atributs:  {cor: 'tal',
               tamanho: 12}
               },
               {nome: "Nome do produto 2 - Capacete do tipo",
                 quantity: 3,
                 price: 200.00,
                 parcelas: 4,
                 imagem: "/img/produto.svg",
                 atributs:  {
            
                 }
               },
               {nome: "Nome do produto 3 - Capacete do tipo",
                 quantity: 2,
                 price: 300.00,
                 parcelas: 4,
                 imagem: "/img/produto.svg",
                 atributs:  {
               tamanho: 12}
               },
               {nome: "Nome do produto 4 - Capacete do tipo",
                 quantity: 1,
                 price: 400.00,
                 parcelas: 4,
                 imagem: "/img/produto.svg",
                 atributs: {cor: 'tal',
               tamanho: 12}
               },
             ],*/
            listProducts:[],
            som: 0,
            type: "",
            endereco: {},
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
            if(this.listProducts.length == 0){
                return 
            }
            console.log(this.listProducts)
            
            this.listProducts.forEach(product => {
                this.som = this.som + product.price*product.quantity
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
        },
        setLoaded: function() {
          this.loaded = true;
          window.paypal
            .Buttons({
              createOrder: (data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {items: this.listProducts.map((product) => {
                        return {name: product.nome,
                                quantity: product.quantity,
                                unit_amount: {
                                    currency_code: "BRL",
                                    value: product.price
                                }
                            };
                    }),
                      amount: {
                        currency_code: "BRL",
                        value: this.som,//Tem de ser igual ao somatorio dos (preço * quantidade) de cada produto
                        breakdown: {
                            item_total: {
                                currency_code: "BRL",
                                value: this.som
                            }
                              }
                    }
                }
                  ]
                });
              },
              onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                
                this.paidFor = true;

                //console.log(order);
                
              },
              onError: err => {
                console.log(err);
              }
            })
            .render(this.$refs.paypal);
        },


        async getAddress(userId) {
            try {
            const url = `${baseApiUrl}/address/` + userId;
            const response = await axios.get(url);
            console.log(response.data)
            return response.data;
            } catch (error) {
            console.error(error);
            throw error;
            }
        },
        async getUser(userId) {
            try {
            const url = `${baseApiUrl}/users/` + userId;
            const response = await axios.get(url);
            return response.data;
            } catch (error) {
            console.error(error);
            throw error;
            }
        },
        async getCart(userId) {
            try {
            const url = `${baseApiUrl}/cart/` + userId;
            const response = await axios.get(url)
            console.log(response.data);
            return response.data;
            } catch (error) {
            console.error(error);
            throw error;
            }
        },
        async getInfo() {
            try {
                console.log("entrou o get info")
                const json = localStorage.getItem(userKey);
                const userData = JSON.parse(json);

                const addressData = await this.getAddress(userData.id);
                this.endereco = { ...addressData };

                const userInfo = await this.getUser(userData.id);
                this.user = { ...userInfo };
                this.name = this.user.name;
                this.cpf = this.user.cpf;

                const cartData = await this.getCart(userData.id);
                this.listProducts = cartData 
                console.log(this.listProducts);
                Object.entries(this.listProducts).forEach(([key, value]) => {
                    this.som +=value.price * value.quantity
                    });
                console.log(this.som);
            

            } catch (error) {
                console.error(error);
            }
    },
    }
}
</script>

<style scoped>

.deactive{
    filter: grayscale(1);
    pointer-events: none;
}
.priceLabel{
    font-size: 2rem;
    margin: 0rem 0rem 0rem 30rem;
}
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
    min-width: 25%;
}
#complemento{
    min-width: 50%;
    margin-inline: auto;
}
#bairro{
    min-width: 100%;
}
#cidade{
    min-width: 30%;
}
#uf{
    min-width: 30%;
    margin-inline: auto;
}

#endereço-data{
    gap: 1rem;
    width: 80%;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.endereco-change{
  border-radius: 0.5rem;
    background-color: #d6ac00;
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem #a38200, 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
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
    background-color: #d6ac00;
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem #a38200, 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
}
.forma-pagamento{
    font-size: 16pt;
    text-transform: uppercase;
    color: whitesmoke;
    padding-block: 3rem;
    background-color: #02589a;
    border-radius: 0 0 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 2rem;
}

.forma-pagamento h3{
    margin-left: 0%;
}

.paypal{
    margin: auto;
    width: 100%;
    background: none;
}

.options{
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
    flex-wrap: wrap;
    width: 70%;
    margin: auto;
    margin-inline: 2%;
    justify-content: space-evenly;
}
.options div{
    border-radius: 2rem;
    padding: 2%;
    background: #35b1e5;
    display: flex;
    align-items: center;
    box-shadow: 0rem 0rem 0rem 0rem rgb(0, 0, 0, 0.25);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}
.options div:hover{
    box-shadow: 1rem 1rem 1rem 0rem rgb(0, 0, 0, 0.25);
}


.options div button{
    background: none;
    border: none;
    margin-inline: 3.4rem;
    width: 3rem;
}

.options div button img{
    max-height: 2vmax;
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
.blur{
    filter: blur(6px);
}

@keyframes show{
    0% {opacity: 0;}
    
    100% {opacity: 1;}
}

</style>

