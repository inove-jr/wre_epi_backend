<template>
    <form class="form-container">
        
        <div class="card-input">
          <label for="name" class="card-input__label">
            Nome
          </label>
          <input
            id="name"
            class="card-input__input"
            v-model="name"
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
            v-model="email"
            autocomplete="off"
            @input="validMail($event.target)"
          />
        </div>

        <div class="card-input">
          <label for="telefone" class="card-input__label">
            Telefone
          </label>
          <input
            id="telefone"
            class="card-input__input"
            type="tel"
            v-model="telefone"
            maxlength="15"
            @input="$event.target.value = formatFone($event.target); validNumber($event.target.value)"
          />
        </div>
<!--
        <div class="card-input">
          <label for="endereco" class="card-input__label">
            Endereço
          </label>
          <input
            id="endereco"
            class="card-input__input"
            v-model="name"
            autocomplete="off"
          />
        </div>
-->
        <div style="width: 100%;">
          <button @click="submitCard" class="card-form__button">
            Submit
          </button>
        </div>
        
    </form>
</template>
<script>

    export default {
        name: 'PixForm',
        components:{
        },
        props:['price'],
        data() {
            return {
                email: "",
                //endereco: "",
                name: "",
                telefone: "",
            };
        },
        methods: {
            submitCard() {
              alert(`
                  ${this.name}\n
                  //${this.endereco}\n
                  ${this.email}\n
                  ${this.telefone};`)
            },
            formatFone(input){
                
                    if (input.value.length > input.maxLength) input.value = input.value.slice(0, input.maxLength);
                    input.value = input.value.replace(/[^0-9.]/g, ''); 
                    input.value = input.value.replace(/^(\d{2})(9\d{4})(\d{4})$/, "($1) $2-$3")
                    //input = input.replace(/(\..*)\./g, '$1');
                    
                    return  input.value
            },
            validNumber(input){          
                var phoneRe = /^([0-9]{2})((3[0-9]{3}[0-9]{4})|(9[0-9]{4}[0-9]{4}))$/;  
                var digits = input.replace(/\D/g, "");
                console.log(digits,phoneRe.test(digits))
                return phoneRe.test(digits);
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
.invalid{
  box-shadow: 0 0 10px 1px red;
}
.card-input{
  text-align: left;
  min-width: -webkit-fill-available;
}
.card-input__input{
  min-width: -webkit-fill-available;
}
.select-input{
  display: flex;
  gap: 1rem;
  text-align: left;
}
.form-container{
  font-size: 11pt;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 2rem;
  
}
.popup{
    position: fixed;
    top: 15%;
    left: 10%;
    padding: 5%;
    background-color: aliceblue;
    width: 80%;
    z-index: 5;
}

.card-form__button{
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

.card-form__button:active{
    background-color: rgb(0, 208, 0);
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem rgb(1, 158, 1), 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
}

#cardName{
    text-transform:uppercase
}
</style>