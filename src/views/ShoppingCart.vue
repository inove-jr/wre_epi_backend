<template>
    <section class="col">
        <div class="whiteBox row" style="flex-wrap: wrap; padding: 1rem 0rem 2rem 0rem;">
          <div style="padding: 1rem 3rem 1rem 3rem">
            <label id="lblDados">Dados Pessoais:</label>
          </div>

          <div class="row" id="formStance">
            <div class="row" style="padding-left: 1rem; flex-wrap: wrap; max-width: 70rem">
              <div class="col paddingForm">
                <label class="lblInput">Nome:</label>
                <input id="nome" type="text" class="inputText" v-model="this.name"/>
              </div>

              <div class="col paddingForm">
                <label class="lblInput">Empresa:</label>
                <input id="empresa" type="text" class="inputText" v-model="this.empresa"/>
              </div>

              <div class="col paddingForm">
                <label class="lblInput">CPF:</label>
                <input id="cpf" type="text" class="inputText" v-model="this.cpf"/>
              </div>

              <div class="col paddingForm">
                <label class="lblInput">Endereço:</label>
                <input id="endereco" type="text" class="inputText" v-model="this.endereco_form.endereco"/>
              </div>

              <div class="col paddingForm">
                <label class="lblInput">Número:</label>
                <input id="numero" type="text" class="inputText" v-model="this.endereco_form.numero"/>
              </div>

              <div class="col paddingForm">
                <label class="lblInput">Complemento:</label>
                <input id="complemento" type="text" class="inputText" v-model="this.endereco_form.complemento"/>
              </div>

              <div class="col paddingForm">
                <label class="lblInput">Bairro:</label>
                <input id="bairro" type="text" class="inputText" v-model="this.endereco_form.bairro"/>
              </div>

              <div class="col paddingForm">
                <label class="lblInput">Cidade:</label>
                <input id="cidade" type="text" class="inputText" v-model="this.endereco_form.cidade"/>
              </div>

              <div class="col paddingForm">
                <label class="lblInput">UF:</label>
                <input id="uf" type="text" class="inputText" v-model="this.endereco_form.uf"/>
              </div>
            </div>

            <div class="paddingForm">
              <div class="col" style="padding-left: 1rem">
                <label class="lblInput">CEP:</label>
                <input id="cep" type="text" class="inputText" v-model="this.endereco_form.cep"/>
              </div>
            </div>

            <div class="paddingForm">
              <div class="col" id="save_endereco">
                <button class="endSave">Salvar Endereço</button>
              </div>
            </div>
          </div>
        </div>
    </section>
  
    <section id="listItem" class="whiteBox" >
      <div class="label-itens">
       <p>Itens:</p>
      </div>
      <div class="itemCart" v-for="(item, index) in listProducts" :key="index">
        
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
      <div class="totalPrice col">
        <div class="row">
          <p class="priceLabel">
            Total: 
          </p>
          <p>R$ {{som}}</p>
        </div>
        <!----<RouterLink to="/confirm"> -->
        <RouterLink to="/confirm" :produtos="listProducts" >
          <button class="confirmBuy">Confimar compra</button>
        </RouterLink>
      </div>
    </section> 
</template>

<script>
import CartItem from '@/components/cartItem.vue';

  export default {
    beforeMount(){
      this.calcTotal()
      this.getInfo()
    },
    data() {
        return {
            listProducts: [],
            som: 0,
            name: '',
            empresa: '',
            cpf: '',
            endereco_form: {
                endereco: '',
                numero: 0,
                cidade: '',
                bairro: '',
                complemento: '',
                uf: '',
                cep: ''
            },
            endereco_saved: {
                endereco: '',
                numero: 0,
                cidade: '',
                bairro: '',
                complemento: '',
                uf: '',
                cep: ''
            },
        };
    },
    methods: {
        calcTotal() {
            this.som = 0
            this.listProducts.forEach(element => {
              this.som = this.som + element.preco*element.quantity
            //  console.log(element.preco)
            });
        },
        remove(index){
          this.listProducts.splice(index,1)
        },
        getInfo(){
          
          this.name = "Juselino Carandino Justiniano"
            this.email = "Juseli.randino.tiniano@somemail.com.br"
            this.date = "2022-02-02"
            this.empresa = "MeCompre Inc."
            this.cpf = "123.456.789-99"
          
          this.listProducts = [
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
          this.endereco_saved = {
                endereco: 'Rua Dos Tolos',
                numero: 0,
                cidade: 'Lugar Nenhum',
                bairro: 'Vazio',
                complemento: 'Casa',
                uf: 'ND',
                cep: '000.000.000-99'
          }
            
           this.endereco_form = this.endereco_saved
        }
    },
    components: { CartItem }
}
</script>

<style scoped>
  .lblInput {
    text-align: left;
    font-family: 'Inter', sans-serif;
    font-size: 1.2rem;
    margin: 1rem 0 0.5rem 0;
    color: #515151;
  }

  #formStance{
    flex-wrap: wrap-reverse;
  }

  #save_endereco{
    margin-left: 4rem;
    margin-top:10rem;
    align-items: end;
  }
  .paddingForm {
    margin: 0rem 0.5rem 0.5rem 0.5rem
  }
  #cep {
    width: 16rem;
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
section{
  margin: 2rem 5rem;
} #listItem {
  font-size: 10rem;
}

.confirmBuy{
  border-radius: 0.5rem;
    background-color: rgb(0, 167, 0);
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem green, 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
    height: 4rem;
    width: 100%;
    padding: 0.8rem 1.2rem;
    font-size: 1.6rem;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    color: white;
    border: none;
    cursor: pointer;
}

.confirmBuy:active{
    background-color: rgb(0, 208, 0);
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem rgb(1, 158, 1), 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
}

.endSave{
    border-radius: 0.5rem;
    background-color: rgb(0, 167, 0);
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem green, 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
    height: 4rem;
    width: 100%;
    padding: 0.8rem 1.2rem;
    font-size: 1.6rem;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    color: white;
    border: none;
    cursor: pointer;
}


.endSave:active{
    background-color: rgb(0, 208, 0);
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem rgb(1, 158, 1), 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
}

.label-itens{
  display: flex;
  font-size: 2vw;
  margin: 1rem 0rem 0rem 5rem;
  color: #521717;
  height: fit-content;
}

.rowItem{
  display: flex;
  align-items: center;
  justify-content:center;
  margin:0;
  padding: 0rem;
  
}

.itemCart{
  margin-right: 0vw;
}

.removeButton{
  flex-grow: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0rem 4vw 0rem 6vw;
  
}

.removeButton button{
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 100%;
  font-size: 1.5vw;
  font-weight: bold;
  border: 0px;
  background-color: #e8e8e8;
  justify-content: center;
  margin: auto;
  width: 2vw;
  height: 2vw;
}

.itemInfo{
  flex-grow: 0;
  margin: 0;
}

.totalPrice{
  display: flex;
  justify-content: flex-end;
  margin: 1vw 5vw;
  margin-left: auto;
  margin-bottom: 3vw;
  font-weight: bolder;
  width: 16vw;
}
.totalPrice p{
  font-size: 2.5vw;
}
hr{
  margin: 2rem;
  
}
@media (max-width: 720px) {
  .label-itens{
    font-size: 2rem;
    margin: 0;
  }

  #formStance{
    flex-wrap: wrap;
  }

  #save_endereco{
    margin-left: 7rem;
    margin-top: 1rem;
  }
  .rowItem{
    display: flex;
    flex-direction:column-reverse;
    width: 100%;
    
  }
  .itemCart{
    margin-top: 4vw;
  }
  .removeButton{
    
    margin: 0rem 0vw 0rem 50vw;
  }
  .removeButton button{
    
    position: absolute;
    z-index: 10;
    right: 26vw;
    margin: 0;
    margin-bottom: 4rem;
    font-size: 2.4rem;
    height: 3rem;
    width: 3rem;
    justify-self:right;
  }
  
}
</style>
