<template>
    <section class="col" style="padding: 1rem 5rem">
        <div class="whiteBox row" style="flex-wrap: wrap; padding: 1rem 0rem 2rem 0rem; margin: 1rem">
          <div style="padding: 1rem 3rem 1rem 3rem">
            <label id="lblDados">Dados Pessoais:</label>
          </div>

          <div class="row" style="flex-wrap: wrap-reverse;">
            <div class="row" style="padding-left: 1rem; flex-wrap: wrap; max-width: 80rem">
              <div class="col paddingForm">
                <label class="lblInput">Nome:</label>
                <input id="nome" type="text" class="inputText"/>
              </div>

              <div class="col paddingForm">
                <label class="lblInput">Empresa:</label>
                <input id="empresa" type="text" class="inputText"/>
              </div>

              <div class="col paddingForm">
                <label class="lblInput">CPF:</label>
                <input id="cpf" type="text" class="inputText"/>
              </div>

              <div class="col paddingForm">
                <label class="lblInput">Endereço:</label>
                <input id="endereco" type="text" class="inputText"/>
              </div>

              <div class="col paddingForm">
                <label class="lblInput">Número:</label>
                <input id="numero" type="text" class="inputText"/>
              </div>

              <div class="col paddingForm">
                <label class="lblInput">Complemento:</label>
                <input id="complemento" type="text" class="inputText"/>
              </div>

              <div class="col paddingForm">
                <label class="lblInput">Bairro:</label>
                <input id="bairro" type="text" class="inputText"/>
              </div>

              <div class="col paddingForm">
                <label class="lblInput">Cidade:</label>
                <input id="cidade" type="text" class="inputText"/>
              </div>

              <div class="col paddingForm">
                <label class="lblInput">UF:</label>
                <input id="uf" type="text" class="inputText"/>
              </div>
            </div>

            <div class="paddingForm">
              <div class="col" style="padding-left: 1rem">
                <label class="lblInput">CEP:</label>
                <input id="cep" type="text" class="inputText"/>
              </div>
            </div>
          </div>
        </div>

        <div class="whiteBox">

        </div>
    </section> 
</template>

<style scoped>
  .lblInput {
    text-align: left;
    font-family: 'Inter', sans-serif;
    font-size: 1.2rem;
    margin: 1rem 0 0.5rem 0;
    color: #515151;
  }
  .paddingForm {
    margin: 0rem 0.5rem 0.5rem 0.5rem
  }
  #cep {
    width: 12rem;
  }
  #cpf {
    max-width: 15rem;
  }
  #numero {
    max-width: 10rem;
  }
  #uf {
    max-width: 10rem;
  }
  #lblDados {
    font-family: 'Inter', sans-serif;
    font-size: 1.6rem;
    color: #521717;
    white-space: nowrap;
  }
</style>
  
<script>
  export default {
    mounted() {
    },
      data() {
        return {
        }
      }
  }
</script>