<template>
    <section v-if="paidFor" class="compra-concluida">
        <div class="conclusion-screen">
            <div class="sucess-text">
                <h2>Compra concluida com</h2>
                <h1>SUCESSO!</h1>
            </div>
            <div class="byPix" v-if="byPix">
                <!--<iframe :src="payData" width="620" height="280" style="border: 2px black solid;"></iframe>-->
                <a @click="goToPaymentURL" :href="payData" class="link-button" style="padding: 2rem; font-size: 24pt;">
                    <span>Abrir página de pagamento do PIX</span>
                </a>

            </div>
            <div class="byBoleto" v-if="byBoleto">
                <a @click="goToPaymentURL" :href="payData" class="link-button" style="padding: 2rem; font-size: 24pt;">
                    <span>Acessar Boleto</span>
                </a>
            </div>
        </div>
        <RouterLink :to="{ name: 'home' }">
            <button class="continuar-comprar">Continuar a comprar</button>
        </RouterLink>

    </section>
    <section v-if="!paidFor" class="buy-sumary">
        <section class="resumo">
            <div class="title">
                <span>RESUMO DA COMPRA:</span>
                <hr>
            </div>
            <div class="item-list">
                <div class="itemCart" v-for="(item, index) in listProducts" :key="index">
                    <CartItemrResume class="itemInfo" :item=item></CartItemrResume>
                </div>
            </div>
            <hr>
            <div class="label-row">
                <p class="priceLabel">Items: R$ {{ (this.som-this.shippingPrice).toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}</p>
                <p class="priceLabel" v-if="this.shippingPrice">Frete: R$ {{ (this.shippingPrice).toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}</p>
                <p class="priceLabel">Total: R$ {{ (this.som).toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}</p>
            </div>

        </section>
        <div class="data-resume">
            <section class="endereco">
                <div class="col" id="endereço-data" style="flex-wrap: wrap;">
                    <div class="row">
                        <span><b>Endereço</b></span>
                        <img class="mapIcon">
                    </div>

                    <div class="row">
                        <div class="col" id="address-row">
                            <div class="row" style="flex-wrap: wrap;">
                                <span id="cidade">{{ endereco.city }}</span>
                                <span> &nbsp;-&nbsp; </span>
                                <span id="uf">{{ endereco.state }}</span>
                            </div>
                            <div class="row">
                                <span id="bairro">{{ endereco.district }}</span>
                                <span>,&nbsp; </span>
                                <span id="endereco">{{ endereco.street }}</span>
                                <span>,&nbsp; </span>
                                <span id="numero">{{ endereco.number }}</span>
                            </div>
                            <div class="row">
                                <span id="complemento">{{ endereco.complement }}</span>
                            </div>
                        </div>
                        <div style="text-align: center; margin-left: auto;">
                            <button class="endereco-change" @click="this.$router.push({ name: 'cart' });">Escolher outro
                                endereço</button>
                        </div>
                    </div>
                </div>

                <div class="shipping-quote-div col">
                    <span><b>Opções de Frete</b></span>
                    <div class="shipping-container-quotes row">
                        <div class="shipping-options-container col">

                            <select v-model="selectedOption" style="margin: 1rem 0rem 1rem 0rem ;">
                                <option disabled value="">Selecione uma opção de frete</option>
                                <option v-for="(option, index) in shippingOptions" :key="index"
                                    :value="{ name: option.ServiceDescription, index: index, price: option.Price, deliveryTime: option.DeliveryTime }">
                                    {{ option.ServiceDescription }} - Valor: R$ {{ option.Price }} - Entrega em: {{ option.DeliveryTime}}
                                </option>
                            </select>
                            <div v-if="selectedOption">
                                <p><b>Opção selecionada:</b></p>
                                {{ selectedOption.name }} - Valor: R$ {{ selectedOption.price }} - Entrega em: {{ selectedOption.deliveryTime }}
                            </div>
                        </div>

                        <div style="text-align: center; margin-left: auto;">
                            <button class="endereco-change" @click="saveShippingOption">Confirmar
                                Opção de Frete</button>
                        </div>
                    </div>

                </div>

            </section>
            <section class="forma-pagamento">
                <h3>Escolha o método de pagamento</h3>
                <div class="options" v-bind:class="{ deactive: listProducts.length == 0, blur: formSee }">
                    <div class="option_no_def_button" @click="change(1)">
                        <button class="metodo-cartao"><img src="\img\1034362_payment_bank_card_credit_finance_icon.png"
                                alt="CARTÃO"></button>
                        <h3>Cartão</h3>
                    </div>
                    <div class="option_no_def_button" @click="change(2)">
                        <button class="metodo-boleto"><img src="\img\365593_boleto_business_buy_card_cash_icon.png"
                                alt="BOLETO"></button>
                        <h3>Boleto</h3>
                    </div>
                    <div class="option_no_def_button" @click="change(3)">
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
            <PopUp :type="this.type" :nome="this.nome" :email="this.email" :tel="this.tel" :totalValue="this.som"
                v-on:paymentConcluded="paymentConcluded"></PopUp>
        </section>
    </section>
</template>

<script>
import CartItemrResume from '@/components/cartItemrResume.vue';
import PopUp from '@/components/PopUp.vue';
import axios from "axios"
import { baseApiUrl, userKey, clientID } from '@/global';
import { mapGetters } from 'vuex';

export default {
    name: "ConfirmBuy",
    components: {
        PopUp,
        CartItemrResume
    },
    beforeMount() {

        // this.endereco = "Rua Tal..."
        // this.numero = 0
        // this.complemento = "CASA"
        // this.bairro = "Centro"
        // this.cidade = "Lugar Nenhuma"
        // this.uf = "PE"
        this.getInfo();
        // setTimeout((()=>{
        //     console.log(this.listProducts)

        // }),800)

        const script = document.createElement("script");
        script.src =
            "https://www.paypal.com/sdk/js?currency=BRL&client-id=AUKCNaeSeEWq2Z6SDzilgg66vCHVVlDWtgvlWoSQGE84tBZ_qaFzl4CAqxzRLz5CFoicyVxQIW36tqbv";
        script.addEventListener("load", this.setLoaded);
        document.body.appendChild(script);
        
        
    },
    mounted () {
    },
    data() {
        return {
            formSee: false,
            paidFor: false,
            byPix: false,
            byBoleto: false,
            payData: "",
            selectedOption: null,
            shippingPrice:0,
            finalOrder:[],
            shippingOptions: [
                // { name: 'Correios', price: 10.00, deliveryTime: '3 dias úteis' },
                // { name: 'Jadlog', price: 15.00, deliveryTime: '2 dias úteis' },
                // { name: 'Sedex', price: 20.00, deliveryTime: '1 dia útil' }
            ],
            /* listProducts: [
                {name: "Nome do produto 1 - Capacete do tipo",
                  quantity: 2,
                  price: 100.00,
                  parcelas: 4,
                  imagem: "/img/produto.svg",
                  atributs:  {cor: 'tal',
                tamanho: 12}
                },
                {name: "Nome do produto 2 - Capacete do tipo",
                  quantity: 3,
                  price: 200.00,
                  parcelas: 4,
                  imagem: "/img/produto.svg",
                  atributs:  {
    
                  }
                },
                {name: "Nome do produto 3 - Capacete do tipo",
                  quantity: 2,
                  price: 300.00,
                  parcelas: 4,
                  imagem: "/img/produto.svg",
                  atributs:  {
                tamanho: 12}
                },
                {name: "Nome do produto 4 - Capacete do tipo",
                  quantity: 1,
                  price: 400.00,
                  parcelas: 4,
                  imagem: "/img/produto.svg",
                  atributs: {cor: 'tal',
                tamanho: 12}
                },
              ],*/
            listProducts: [],
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
    computed: {
        ...mapGetters(['paymentUrl'])
    },
    components: { CartItemrResume, PopUp },
    methods: {
        calcTotal() {
            if ((this.listProducts.length == 0) || (this.som > 0)) {
                return
            }
            //console.log(this.listProducts)
            this.som = 0;
            this.listProducts.forEach(product => {
                this.som = this.som + product.price * product.quantity
            });
        },
        remove(index) {
            this.listTest.splice(index, 1)
        },
        change(formato) {
            let formasDePagamento = ['credit', 'boleto', 'pix']

            this.type = formasDePagamento[formato - 1]
            this.formSee = !this.formSee

            console.log(this.
                formSee)

        },
        close() {
            this.formSee = false;
        },
        setLoaded: function () {
            this.loaded = true;
            window.paypal
                .Buttons({
                    fundingSource: window.paypal.FUNDING.PAYPAL,

                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    items: this.finalOrder.map((product) => {
                                        return {
                                            name: product.name,
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
                            ],
                            intent: "CAPTURE"
                        });
                    },

                    onApprove: async (data, actions) => {
                        const json = localStorage.getItem(userKey)
                        const client_id = JSON.parse(json).id

                        const body = {
                            client_id: client_id
                        }

                        const url = `${baseApiUrl}/${data.orderID}/capture-paypal-order`;
                        axios.post(url, body, {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                            .then((response) => response.data).then(
                                alert("Pagamento Realizado com Sucesso")

                            );



                    },
                    onError: err => {
                        console.log(err);
                    }
                })
                .render(this.$refs.paypal);
        },

        goToPaymentURL() {
            console.log(this.paymentUrl)
            window.open(this.paymentUrl, '_blank');

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
                // console.log(this.listProducts);
                Object.entries(this.listProducts).forEach(([key, value]) => {
                    this.som += value.price * value.quantity
                });
                console.log(this.som);

                this.shippingQuoteOptions(cartData)


            } catch (error) {
                console.error(error);
            }
        },
        paymentConcluded(type) {
            this.paidFor = true;
            switch (type[0]) {
                case 1:
                    this.payData = type[1];
                    this.byBoleto = true;
                    break;
                case 2:
                    this.payData = type[1];
                    this.byPix = true;
                    break;
                default:
                    break;
            }
        },
        async saveOrderDetails(data) {
            try {
                const url = `${baseApiUrl}/save-order-details`;
                console.log(data, url);
                await axios.post(url, data)

            } catch (error) {

            }
        },

        async saveShippingOption() {
            this.som = 0
            console.log(this.listProducts)
            
            Object.entries(this.listProducts).forEach(([key, value]) => {
                this.som += value.price * value.quantity
            });
            console.log(this.som);
            this.shippingPrice=parseFloat(this.selectedOption.price);
            this.som+=parseFloat(this.selectedOption.price);

            let shippingInfo = {
                name:'Frete' + this.selectedOption.name,
                price:parseFloat(this.selectedOption.price),
                quantity:1

            }
            this.finalOrder = [...this.listProducts,shippingInfo]

            console.log(this.finalOrder)
        }
        ,


        async shippingQuoteOptions(productsList) {
            const json = localStorage.getItem(userKey);
            const userData = JSON.parse(json);
            
            const addressData = await this.getAddress(userData.id);
            console.log(addressData.zipCode)
            const data = {
                zipCode: addressData.zipCode,
                products: productsList,
                Total: this.som
            }
            
            try {
                console.log("calculando frete")
                const url = `${baseApiUrl}/shipping-quote`;
                console.log(data);
                const response = await axios.post(url, data)
                // console.log(response.data)
                this.shippingOptions = response.data;                
                console.log(this.shippingOptions)
            } catch (error) {
                console.log(error)
            }

        }
    }
}
</script>

<style scoped>
.deactive {
    filter: grayscale(1);
    pointer-events: none;
}

.priceLabel {
    text-align: end;
    font-size: 2rem;
    margin: 0rem 2rem 0rem 0rem;
}

.title {
    text-align: left;
    padding: 1rem;
    font-size: 1.4rem;
}

.buy-sumary {
    display: flex;
    flex-direction: row;
    margin-block: 5.1vw;
    margin-inline: 1rem;
}

.resumo {
    width: 50%;
    margin: 1rem 0rem 1rem 1rem;
    border-radius: 2rem 0 0 2rem;
    background-color: whitesmoke;
    box-shadow: 0 0 0.5rem 0.3rem rgba(0, 0, 0, 0.468);
}

.resumo .itemInfo {
    transform: scale(0.8);
    margin-left: 0;
}

.itemInfo .quantity {
    color: aliceblue;
}

.data-resume {
    flex-direction: column;
    width: 50%;

    margin: 1rem 1rem 1rem 0rem;
    border-radius: 0 2rem 2rem 0;
    background-color: whitesmoke;
    box-shadow: 3px 0 0.5rem 0.3rem rgba(0, 0, 0, 0.468);
}

.endereco {
    background-color: rgb(245, 245, 245);
    font-size: 1.4rem;
    display: flex;
    flex-wrap: wrap;
    text-align: left;
    justify-content: center;
    border-radius: 0 2rem 0 0;
}

/* 
#address-row {
    min-width: 40%;
}

#numero {
    min-width: 10%;
}

#complemento {
    min-width: 50%;
}

#bairro {
    min-width: 40%;
} 
 #cidade {
    min-width: 30%;
}

#uf {
    min-width: 30%;
    margin-inline: auto;
} */

.shipping-quote-div {
    width: 80%;
    margin-bottom: 2rem;
}

#endereço-data {
    gap: 1rem;
    width: 80%;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.endereco-change {
    border-radius: 0.5rem;
    background-color: #d6ac00;
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem #a38200, 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
    height: 3.4rem;
    /* margin-top: 1rem; */
    padding: 0.8rem 1.2rem;
    font-size: 1rem;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    color: white;
    border: none;
    cursor: pointer;
    margin-left: auto
}

.endereco-change:active {
    background-color: #d6ac00;
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem #a38200, 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
}

.forma-pagamento {
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

.forma-pagamento h3 {
    margin-left: 0%;
}

.paypal {
    margin: auto;
    width: 100%;
    background: none;
}

.options {
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
    flex-wrap: wrap;
    width: 70%;
    margin: auto;
    margin-inline: 2%;
    justify-content: space-evenly;
}

.options .option_no_def_button {
    border-radius: 5px;
    padding: 2%;
    background: #35b1e5;
    display: flex;
    align-items: center;
    box-shadow: 0rem 0rem 0rem 0rem rgb(0, 0, 0, 0.25);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}

.options .option_no_def_button:hover {
    box-shadow: 1rem 1rem 1rem 0rem rgb(0, 0, 0, 0.25);
}


.options div button {
    background: none;
    border: none;
    margin-inline: 3.4rem;
    width: 3rem;
}

.options div button img {
    max-height: 2vmax;
}

.overlay {
    position: fixed;
    z-index: 4;
    opacity: 0;
    animation: show 0.4s ease-in-out;
    animation-fill-mode: forwards;
}

.overlay_blur {
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

.blur {
    filter: blur(6px);
}

.compra-concluida {
    height: 58.7rem;
    width: 90%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 7rem;
}

.continuar-comprar {
    padding: 1rem;
    width: 100%;
    border-radius: 0.5rem;
    background-color: #4978bf;
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem #335485, 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
    font-weight: 700;
    font-size: 18pt;
    text-transform: uppercase;
    color: white;
    border: none;
    cursor: pointer;
}

.continuar-comprar:hover {
    background-color: #5b94e9;
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem #2e5a9b, 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
}

.conclusion-screen {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    gap: 8rem;
}

.sucess-text {
    font-size: 2vw;
    font-weight: lighter;
}

.sucess-text h1 {
    font-size: 4vw;
    font-weight: 700;
}

.byBoleto {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 3rem;
    font-size: 14pt;
}

.link-button {
    display: flex;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: #4978bf;
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem #335485, 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
    font-weight: 700;
    font-size: 18pt;
    text-transform: uppercase;
    color: white;
    border: none;
    text-decoration: none;
    cursor: pointer;
}

.link-button a {
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: white;
}

.link-button:hover {
    background-color: #5b94e9;
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem #2e5a9b, 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
}

@keyframes show {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@media screen and (max-width: 1050px) {
    .byBoleto iframe {
        width: 50rem;
        height: 30rem;
    }
}

@media screen and (max-width: 850px) {
    .compra-concluida {
        height: 48.7rem;
        margin-block: 2rem;
    }

    .conclusion-screen {
        flex-direction: column;
        align-items: none;
        gap: 4rem;
    }
}

@media screen and (max-width: 800px) {

    .buy-sumary {
        flex-direction: column;
        align-items: center;
    }

    .resumo {
        min-height: 20rem;
        height: 100%;
        width: 90%;
        margin: 0;
        border-radius: 2rem 2rem 0 0;
    }

    .data-resume {
        margin: 0;
        width: 90%;
        border-radius: 0 0 2rem 2rem;
        box-shadow: 0px 3px 0.5rem 0.26rem rgba(0, 0, 0, 0.468)
    }

    .forma-pagamento {

        border-radius: 0 0 2rem 2rem;
    }
}

@media screen and (max-width: 550px) {
    .sucess-text {
        font-size: 2rem;
    }

    .sucess-text h1 {
        font-size: 4rem;
    }

    .byBoleto iframe {
        width: 100%;
        height: 100%;
    }
}

@media screen and (max-width: 500px) {}

@media screen and (max-width: 450px) {

    .resumo .itemInfo {
        transform: scale(0.7);
    }

    .endereco-change {
        height: 5.4rem;
    }

    .options {
        width: 90%;
    }
}

@media screen and (max-width: 370px) {

    .compra-concluida {
        margin-block: 4rem;
    }
}
</style>
