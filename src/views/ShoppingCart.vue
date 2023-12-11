<template>
    <section class="col">
        <div class="whiteBox row" style="flex-wrap: wrap; padding: 1rem 0rem 2rem 0rem;">
          <div style="padding: 1rem 3rem 1rem 3rem">
            <label id="lblDados">Endereço:</label>
          </div>

          <div class="row" id="formStance">
            <div class="row" style="padding-left: 1rem; flex-wrap: wrap; max-width: 70rem">
              <!-- <div class="col paddingForm">
                <label class="lblInput">Nome:</label>
                <input id="nome" type="text" class="inputText" v-model="this.name"/>
              </div> -->

              <!-- <div class="col paddingForm">
                <label class="lblInput">Empresa:</label>
                <input id="empresa" type="text" class="inputText" v-model="this.empresa"/>
              </div> -->

              <!-- <div class="col paddingForm">
                <label class="lblInput">CPF:</label>
                <input id="cpf" type="text" class="inputText" v-model="this.cpf"/>
              </div> -->

              <div class="col paddingForm">
                <label class="lblInput">Rua:</label>
                <input id="endereco" type="text" class="inputText" v-model="endereco.street"/>
              </div>

              <div class="col paddingForm">
                <label class="lblInput">Número:</label>
                <input id="numero" type="text" class="inputText" v-model="endereco.number"/>
              </div>

              <div class="col paddingForm">
                <label class="lblInput">Complemento:</label>
                <input id="complemento" type="text" class="inputText" v-model="endereco.complement"/>
              </div>

              <div class="col paddingForm">
                <label class="lblInput">Bairro:</label>
                <input id="bairro" type="text" class="inputText" v-model="endereco.district"/>
              </div>

              <div class="col paddingForm">
                <label class="lblInput">Cidade:</label>
                <input id="cidade" type="text" class="inputText" v-model="endereco.city"/>
              </div>

              <div class="col paddingForm">
                <label class="lblInput">Estado:</label>
                <input id="uf" type="text" class="inputText" v-model="endereco.state"/>
              </div>
            </div>

            <div class="paddingForm">
              <div class="col" style="padding-left: 1rem">
                <label class="lblInput">CEP:</label>
                <input id="cep" type="text" class="inputText" v-model="endereco.zipCode"/>
              </div>
            </div>

            <div class="paddingForm">
              <div class="col" id="save_endereco">
                <button class="endSave" @click="saveAddress()">Salvar Endereço</button>
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
            <button @click="remove(index)">X</button>
          </div>
          <div class="itemInfo">
            <CartItem :item=item  @atualizar-carrinho="atualizarCarrinho"></CartItem>
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
        <!----<RouterLink to="/confirm">  passar o valor total da compra pelo router link-->
        <RouterLink to="/confirm">
          <button class="confirmBuy">Confimar compra</button>
        </RouterLink>
      </div>
    </section> 
</template>

<script>
import CartItem from '@/components/cartItem.vue';
import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'

  export default {
    components: { CartItem },
    data() {
        return {
            chaveComponenteFilho:0,
            listProducts: [],
            som: 0,
            name: '',
            empresa: '',
            cpf: '',
            endereco:{},
            user:{},
            totalPrice:0,
            endereco_form: {
                rua: '',
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
    props:{
        total:Number
    },
    methods: {
        remove(index){
          console.log(index)
          console.log(this.listProducts[index].product_id)
          const url = `${baseApiUrl}/cart`;
          
          const dataToBeDeleted ={} 
          dataToBeDeleted.client_id= this.listProducts[index].client_id;
          dataToBeDeleted.product_id=this.listProducts[index].product_id;
          console.log(dataToBeDeleted)
          axios.delete(url, {data:{client_id:dataToBeDeleted.client_id, product_id:dataToBeDeleted.product_id}})
          .then(res =>{
            console.log(res)
            return;
          }).catch((e=>{
            alert(e.response)
            return;
          }))
          this.listProducts.splice(index,1)
          this.calcTotal()
          // this.atualizarCarrinho()
          },
        async saveAddress(){
          const json = localStorage.getItem(userKey);
          const userData = JSON.parse(json);
          const addressData = await this.getAddress(userData.id);
          console.log(addressData.id)

          console.log(this.endereco)
          const url = `${baseApiUrl}/address/`+addressData.id
          console.log(url)
          console.log(this.endereco)
                  axios.put(url, this.endereco).then(res =>{
                      alert("Endereço Salvo Com Sucesso!!")
                      // return;
                  }).catch((e=>{
                      alert(e.response)
                      return;
                  }))

        },
        async getAddress(userId) {
          try {
            const url = `${baseApiUrl}/address/` + userId;
            const response = await axios.get(url);
            // console.log(response.data)
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

    // Realizando as chamadas em paralelo usando Promise.all
    const [addressData, userInfo, cartData] = await Promise.all([
      this.getAddress(userData.id),
      this.getUser(userData.id),
      this.getCart(userData.id),
    ]);

    this.endereco = { ...addressData };
    this.endereco_form.rua = this.endereco.street;
    this.endereco_form.cep = this.endereco.zipCode;
    this.endereco_form.cidade = this.endereco.city;
    this.endereco_form.uf = this.endereco.state;
    this.endereco_form.bairro = this.endereco.district;
    this.endereco_form.complemento = this.endereco.complement;
    this.endereco_form.numero = this.endereco.number;

    this.user = { ...userInfo };
    this.name = this.user.name;
    this.cpf = this.user.cpf;
    
    this.listProducts = cartData;

    this.som = 0;
    Object.entries(this.listProducts).forEach(([key, value]) => {
      this.som += value.price * value.quantity;
    });
  } catch (error) {
    console.error(error);
  }
},
      async atualizarCarrinho() {
          this.calcTotal()
          console.log(this.som)
          
      },
      calcTotal() {
        console.log("entrou")
              this.som = 0
              // console.log(this.listProducts)
              Object.entries(this.listProducts).forEach(([key, value]) => {
                this.som +=value.price * value.quantity
              });
              console.log(this.som);

          }
    },
    async beforeMount(){
      await this.getInfo()
      // console.log(this.listProducts)
                      
    },
    mounted() {
      // console.log(this.endereco_form)
      setTimeout(() => {     //Por algum motivo o calculo do valor total dos itens no carrinho não é corretamente exibido quando a pagina é carregada, como se os dados necessarios para o calculo
          this.calcTotal();   //não tivessem sido recebidos no momento que é realizado o calculo, mesmo utilizando o async/await, mesmo garantindo que os dados utilizados no calculo já tinham sido 
                              //recebidos(usando um if para garantir que os mesmos não fossem nulos por exemplo), mas continuava não exibindo corretamente, porém ao clicar no botão para aumentar,
                              // ou diminuir a quantidade de um produto o valor passava a ser exibido corretamente, o erro foi somente corrigido ao adicionar o setTimeout de 100ms para chamar a função responsavel
                              // pelo calculo do valor total dos itens, não é uma solução ideal, mas está funcionando.
        }, 800)
    },
   
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
    max-width: 14rem;
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
    background-color: #d6ac00;
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem #a38200, 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
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
    background-color: #eccc48;
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem #a38200, 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
}

.endSave{
    border-radius: 0.5rem;
    background-color: #d6ac00;
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem #a38200, 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
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
    background-color: #eccc48;
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem #a38200, 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
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
