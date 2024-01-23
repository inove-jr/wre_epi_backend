<template>
  <form class="form-container">

    <div class="card-input">
      <label for="cardNumber" class="card-input__label">
        Número do Cartão
      </label>
      <input v-bind:class="{ invalid: !this.isValidNumber && !this.isEmpty }" autofocus id="cardNumber"
        class="card-input__input" autocomplete="off" type="number" v-model="cardNumber" maxlength="16"
        @input="verifyCard($event.target)" />
    </div>
    <div class="card-input">
      <label for="cardName" class="card-input__label">
        Nome do Titular
      </label>
      <input id="cardName" class="card-input__input" v-model="name" autocomplete="off" />
    </div>
    <div class="select-input">
      <div style="max-width: 46%;">
        <label for="parcelas" class="card-input__label">
          Número de parcelas
        </label>
        <select class="card-input__input -select" id="parcelas" v-model="parcelas">
          <option value="" disabled selected>Parcelas</option>
          <option v-for="n in 10" :value="n" :key="n">
            {{ n + 'x de R$ ' + (this.price / n).toLocaleString("pt-BR", {
              minimumFractionDigits: 2, maximumFractionDigits:
                2
            }) }}
          </option>
        </select>
      </div>

      <div class="card-form__row">
        <div class="card-form__col">
          <div class="card-form__group">
            <label for="cardMonth" class="card-input__label">
              Valido até:
            </label>
            <div style="display: flex; max-width: 60%; gap: 1rem;">
              <select class="card-input__input -select" id="cardMonth" v-model="expireMonth">
                <option value="" disabled selected>Mês</option>
                <option v-for="n in 12" :value="n < 10 ? '0' + n : n" :key="n">
                  {{ 10 > n ? "0" + n : n }}
                </option>
              </select>
              <select class="card-input__input -select" id="cardYear" v-model="expireYear">
                <option value="" disabled selected>Ano</option>
                <option v-for="(n, $index) in 12" :value="$index + currentYear" :key="n">
                  {{ $index + currentYear }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card-form__col-cvv">
      <div class="card-input">
        <label for="cardCvv" class="card-input__label">CVV</label>
        <input v-model="cvv" class="card-input__input" style="max-width: 2rem;" id="cardCvv" autocomplete="off"
          type="number" maxlength="3" oninput="this.value = this.value.replace(/[^0-9.]/g, ''); 
                        this.value = this.value.replace(/(\..*)\./g, '$1');
                        if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" />
      </div>
    </div>

    <div class="confirm-button-div">
      <input type="submit" value="Finalizar Compra" class="card-form-button" name="submit" @click="submitCard" />
      <!-- <input v-if="!this.isValid()" type="submit" value="Pagar" class="card-form__button disable" disabled /> -->
    </div>

  </form>
</template>
<script>
import axios from 'axios'
import { userKey, baseApiUrl } from '@/global';

export default {
  name: 'CreditForm',
  components: {
  },
  props: ['price'],
  data() {
    return {
      cardNumber: "",
      expireMonth: (new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1),
      expireYear: new Date().getFullYear(),
      parcelas: 1,
      name: "",
      cvv: "",
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      isValidNumber: true,
      isEmpty: true,
    };
  },
  methods: {
    async submitCard(e) {
      e.preventDefault();

      // const { parcelas, price, name, cardNumber, cvv, expireMonth, expireYear } = this;
      const data = {}

      if (this.cardNumber) {

      }
      const json = localStorage.getItem(userKey)
      const userData = JSON.parse(json)
      //console.log(userData)
      console.log(userData)
      if (userData) {
        const { cpf } = userData;
        console.log(cpf)
        data.cpfCnpj = cpf;
        // data.cpfCNPJ = await this.getClientId(cpf)
        try {
          data.clientId = await this.getClientId(cpf);
          console.log(data)
        } catch (error) {
          console.error('Erro ao obter o cliente ID:', error);
          alert("Error ao processar o pagamento tente novamente")
          return;
        }
      }


      data.installmentCount = this.parcelas;
      data.installmentValue = this.price / this.parcelas;
      data.description = 'descrição'
      data.name = this.name;
      data.cardNumber = this.cardNumber;
      data.ccv = this.cvv;
      data.expireMonth = this.expireMonth;
      data.expireYear = this.expireYear;
      data.client_id = userData.id
      console.log(data)

      // const data = {
      //   installmentCount: parcelas,
      //   installmentValue: price / parcelas,
      //   description: 'descrição',
      //   name,
      //   cardNumber,
      //   cvv,
      //   expireMonth,
      //   expireYear,
      // };


      console.log(data)
      alert(` Pagamento Realizado Com sucesso!`);
      this.$emit('pagamentoConcluido');
      
      this.$emit('emitType', [3,data])

      this.name = '';
      this.cardNumber = '';
      this.cvv = '';
      this.expireMonth = '';
      this.expireYear = '';

      this.credCardPayment(data)

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
    async credCardPayment(data) {
      try {
        const url = `${baseApiUrl}/credCard-payment`;
        await axios.post(url, data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    verifyCard(input) {

      input.value = input.value.replace(/[^0-9.]/g, '');
      input.value = input.value.replace(/(\..*)\./g, '$1');
      if (input.value.length > input.maxLength) input.value = input.value.slice(0, input.maxLength);

      this.isEmpty = false

      if (input.value.length >= 4) {
        let result = this.getCardType();
        this.isValidNumber = result[1];
      }
    },
    getCardType() {
      let number = this.cardNumber.toString();

      let Visa = new RegExp(/^4[0-9]{12}(?:[0-9]{3})/);
      let Mastercard = new RegExp(/^5[1-5][0-9]{14}/);
      let Amex = new RegExp(/^3[47][0-9]{13}/);
      let DinersClub = new RegExp(/^3(?:0[0-5]|[68][0-9])[0-9]{11}/);
      let Discover = new RegExp(/^6(?:011|5[0-9]{2})[0-9]{12}/);
      let JCB = new RegExp(/^(?:2131|1800|35\d{3})\d{11}/);


      if (number.match(Visa) != null) return ["visa", true];

      if (number.match(Amex) != null) return ["amex", true];

      if (number.match(Mastercard) != null) return ["mastercard", true];

      if (number.match(Discover) != null) return ["discover", true];

      if (number.match(DinersClub) != null) return ['disnerClub', true]

      if (number.match(JCB) != null) return ['jcb', true]

      return ["visa", false]; // default type
    },
    isValid() {
      let temp = false

      if (this.expireYear < this.currentYear) {
        if (this.expireYear == this.currentYear) {
          if (this.expireMonth > this.currentMonth) {
            temp = true
          }
        }
      } else {
        temp = true
      }


      return (this.isValidNumber && this.name != '' && this.cvv.length == 3 && temp)
    }
  },
  beforeMount() {
    const json = localStorage.getItem(userKey)
    const userData = JSON.parse(json)
    //console.log(userData)
    console.log(userData)
    if (userData) {
      // this.loggedIn = true
      // this.user_name = userData.name
      // this.user_email = userData.email
    }
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
  align-items: flex-end;
}

.form-container {
  padding: 2rem;
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

.confirm-button-div{
  width: 100%;
  padding-top: 1rem;
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

.disable {
  filter: grayscale(1);
}

.disable:active {
  background-color: gray;
}

#cardName {
  text-transform: uppercase
}
</style>