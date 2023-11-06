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
    <h1>Confirmar Pagamento Via Boleto Bancário</h1>
    <div style="width: 100%;">
      <input type="submit" value="Confirmar" class="card-form__button" name="submit" @click="submitCard" />
      <!-- <input v-if="!(this.nome!='' && this.validM)" type="submit" value="Pagar" class="card-form__button disable" disabled /> -->
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
      console.log(data)


      console.log(data)
      this.bankSlipPayment(data)
      alert(` Pagamento Realizado Com sucesso!`);
      this.$emit('pagamentoConcluido');


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

.form-container {
  font-size: 11pt;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 2rem;

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