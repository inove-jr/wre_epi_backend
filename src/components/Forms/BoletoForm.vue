<template>
  <form class="form-container">
    <!--

          <div class="card-input">
            <label for="name" class="card-input__label">
              Nome
            </label>
            <input
            id="name"
            class="card-input__input"
            v-model="this.nome"
            autocomplete="off"
            />
          </div>
          
          <div class="card-input">
            <label for="email" class="card-input__label">
              E-mail
            </label>
            <input
            id="email"
            class="card-input__input"
            type="email"
            v-model="this.email"
            autocomplete="off"
            @input="this.validM = validMail($event.target)"
            />
          </div>
          
        -->
    <!-- <h1>Confirmar Pagamento Via Boleto Bancário</h1>
    <div style="width: 100%;">
      <input type="submit" value="Confirmar" class="card-form__button" name="submit" @click="submitCard" />-->
      <!-- <input v-if="!(this.nome!='' && this.validM)" type="submit" value="Pagar" class="card-form__button disable" disabled /> -->
    <!-- </div>-->
    <div class="border_line">
          <div class="border">
            <h1>Confirmar Compra</h1>
            <hr>
            <span>Método de pagamento: <b> BOLETO </b></span>
            <div class="show-total">
              <span >Total: <b>R$ {{(this.price).toLocaleString("pt-BR", { minimumFractionDigits: 2})}}</b></span>
              <!--<span style="opacity: 0.6;color: rgb(7, 114, 19);">A VISTA!</span>-->
            </div>
        
            <div class="confirm-button-div">
              <input type="submit" value="Finalizar Compra" class="card-form-button" name="submit" @click="submitCard" />
            </div>
            </div>
    </div>

  </form>
</template>
<script>

import axios from 'axios'
import { userKey, baseApiUrl } from '@/global';
export default {
  name: 'BoletoForm',
  components: {
  },
  props: ['price'],
  beforeMount() {
    this.nome = this.N
    this.email = this.E
  },
  data() {
    return {
      nome: '',
      email: '',
      validM: false
    };
  },
  methods: {
    /*test(e) {
      e.preventDefault();
      this.$emit('emitType', [1,'https://sandbox.asaas.com/b/pdf/7395892015679778'])
    },*/
    async submitCard(e) {
      e.preventDefault();

      // const { parcelas, price, name, cardNumber, cvv, expireMonth, expireYear } = this;
      const data = {}
      const json = localStorage.getItem(userKey)
      const userData = JSON.parse(json)
      //console.log(userData)
      console.log(userData)
      if (userData) {
        const { cpf } = userData;
        console.log(cpf)
        try {
          data.clientId = await this.getClientId(cpf);
          console.log(data)
        } catch (error) {
          console.error('Erro ao obter o cliente ID:', error);
          alert("Error ao processar o pagamento tente novamente")
          return;
        }
      }
      data.total = this.price
      data.description = 'descrição'
      data.client_id = userData.id
      console.log(data)


      console.log(data)
      this.bankSlipPayment(data)
      alert(` Pagamento Realizado Com sucesso!`);
      this.$emit('pagamentoConcluido');
      this.$emit('emitType', [1,data])


    },
    async getClientId(cpf) {
      try {
        const url = `${baseApiUrl}/client-id/` + cpf;
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async bankSlipPayment(data) {
      try {
        const url = `${baseApiUrl}/bankSlip-payment`;
        await axios.post(url, data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    validMail(target) {

      let model = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);

      console.log(target.value.match(model))

      if (target.value.match(model) != null) return true

      return false
    },
  }
}

</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.invalid {
  box-shadow: 0 0 10px 1px red;
}

.card-input {
  text-align: left;
  min-width: -webkit-fill-available;
}

.card-input__input {
  min-width: -webkit-fill-available;
  background-color: rgb(236, 236, 236);
  border-radius: 4px;
  min-height: 1rem;
  padding: 0.6rem;
  border: none;
  box-shadow: inset 0px 0px 6px 2px rgba(0, 0, 0, 0.25);
}

.card-input__input:focus-visible {
  outline: none;
}

.select-input {
  display: flex;
  gap: 1rem;
  text-align: left;
}


.border_line{
    margin: 1rem;
    border: 4px solid rgb(6, 91, 124);
    border-radius: 1rem;
}
.border{
    padding: 5rem 3rem 5rem 3rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 2rem;
}
.border hr{
    width: 100%;
    margin-block: -1rem;
}
.border h1{
    margin: auto;
    font-weight: 100;
}

.form-container {
    font-size: 11pt;
    width: 41rem;
}
.form-container span{
    font-size: 16pt;
}
.show-total{
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.confirm-button-div{
  width: 100%;
  padding-top: 2rem;
}

.card-form-button {
    margin: auto;
    width: 100%;
    padding: 1rem;
    text-transform: uppercase;
    font-size: 14pt;
    border-radius: 0.5rem;
    background-color: rgb(1 173 239);
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem rgb(16, 79, 119), 0rem 0.1rem 0.3rem 0.2rem rgb(0, 0, 0, 0.25);
    font-weight: 700;
    color: white;
    border: none;
    cursor: pointer;
}
  
.card-form-button:active {
    background-color: rgb(61, 200, 255);
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem rgb(1 90 124), 0rem 0.1rem 0.3rem 0.2rem rgb(0, 0, 0, 0.25);
}

.popup {
  position: fixed;
  top: 15%;
  left: 10%;
  padding: 5%;
  background-color: aliceblue;
  width: 80%;
  z-index: 5;
}

.card-form__button {
  margin: auto;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: rgb(0, 167, 0);
  box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem green, 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
  font-weight: 700;
  color: white;
  border: none;
  cursor: pointer;
}

.card-form__button:active {
  background-color: rgb(0, 208, 0);
  box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem rgb(1, 158, 1), 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
}

.disable {
  filter: grayscale(1);
}

.disable:active {
  background-color: gray;
}

#cardName {
  text-transform: uppercase
}</style>