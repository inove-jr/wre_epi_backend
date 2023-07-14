<template>
    <div class="cartItem">
        <div class="prod-image">
            <img :src=this.item.imageUrl>
        </div>
        <div class="nameItem">
            <p class="label">Produto</p>
            <p class="Value">{{this.item.name}}</p> 
        </div>
        <div class="quantity">
            <p class="label">Quantidade:</p>
            <div class="controlQuantity">
                <!-- <button class="inputButton" @click="sub(),triggerEvent()">
                -
                </button> -->
                <input type="text" class="quantityInput" v-model="item.quantity">
                <button @click="confirm(),triggerEvent(),calcTotal()">Confirmar</button>
                <!-- <p class="inputText">{{this.item.quantity}}</p> -->
                <!-- <button class="inputButton" @click="add(),triggerEvent()">
                    +
                </button> -->
            </div>
        </div>
        <div class="price">
            <p class="label">Valor</p>
            <p class="Value">R${{ (this.item.price*this.item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2}) }}</p> 
        </div>
        
        <div>
            <hr>
        </div>
    </div>
</template>
<script>
import "/src/assets/main.css"
import axios from 'axios'
import { baseApiUrl } from '@/global'
export default {
    name: "CartItem",
    mounted(){
        this.getItems()
        console.log(this.totalPrice)
        console.log(this.item)
    },
    data(){
        return{
            info:{},
            totalPrice:0,
            som:0,
            cartItemInfo:{},
            itemData:[],
            total:0
            
        }
    },
    watch: {
    flagComponentePai: {
      deep: true,
      handler() {
        // Lógica para atualizar o componente filho quando as propriedades forem alteradas
        // Pode ser deixado vazio se você não precisar de nenhuma ação adicional aqui
      }
        }
    }
    ,
    props:{
        item:{
            name: String,
            quantity: Number,
            price: Number,
            //parcelas: Number,
            imageUrl: String,
            // atributs: {
            //     cor: String,
            //     tamanho: Number
            // }
        },
        flagComponentePai:0
    },
    methods:{
        confirm(){
            this.atualizarItem()
            this.getItems()
        },
        async atualizarItem(){
            const url = `${baseApiUrl}/cart/update`;
            this.cartItemInfo.client_id= this.item.client_id;
            this.cartItemInfo.product_id=this.item.product_id;
            this.cartItemInfo.quantity=this.item.quantity; 
            console.log(this.cartItemInfo)
                axios.put(url, this.cartItemInfo)
                .then(res =>{
                    console.log(res)
                    return;
                }).catch((e=>{
                        alert(e.response)
                        return;
            }))
        },
        add(){
            this.item.quantity = this.item.quantity+1;
            console.log(this.item.quantity)
            this.atualizarItem();   
        },
        sub(){
           if(this.item.quantity>1){
                this.item.quantity = this.item.quantity-1;
                console.log(this.item.quantity)
           }
           console.log(this.info)
           this.atualizarItem()
        },
        triggerEvent(){
            this.$emit('atualizar-carrinho');
            
        },
        async getItems(){
            const url=`${baseApiUrl}/products/`+this.item.product_id
          axios.get(url).then(res =>{
            this.info={...res.data}
            this.item.name= this.info[0].name
            this.item.price= this.info[0].price
            this.item.imagem=this.info[0].imageUrl
            
          const newItem = {
            name: this.item.name,
            price: this.item.price,
            quantity: this.item.quantity
          };

          this.itemData.push(newItem);

          console.log(this.itemData);

          this.totalPrice = this.itemData.reduce(
            (accumulator, item) => accumulator + item.price * item.quantity,
            0
          );


          console.log(this.totalPrice);


            // console.log(this.item.price,this.item.quantity)
            
        // this.calcTotal();
        }).catch((e=>{console.error(e)}))
        },
        calcTotal(){
            // let totalPrice=0
            // console.log(this.itemData)
            // Object.values(this.itemData).forEach(item => {
            // totalPrice += item.price * item.quantity;
            // console.log(totalPrice)
            // });
            // // this.totalPrice +=price*quantity
            // // console.log(this.totalPrice)
            // console.log(this.itemData)
        },
    },
}
</script>
<style scoped>
hr{
    display: none;
}

.prod-image img{
    max-height: 5rem;
    margin-right: 3rem;
}
.cartItem{
    display: flex;
    font-size: 1vw;
    margin: 0px;
    align-items: baseline;
    flex-wrap: nowrap;
}
.nameItem{
    text-align: left;
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    justify-content: baseline;
}

.label{
    font-weight: bolder;
    color: #5D5D5D;
    padding: 0.5rem;
}

.Value{
    font-weight: bolder;
    padding-bottom: 2rem;
    font-size: 1.2vw;
}

.quantity{
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 5rem;
    justify-content: center;
    align-items: center;
    margin: 0vw 2vw 0vw 8vw;
}

.quantityInput{
    height: 2.5rem;
    width: 5rem;
    border-radius: 0.5rem;
    border: solid white 1px;
    background-color: #EEEEEE;
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
    padding: 0.8rem 1.2rem;
    font-size: 1.4rem;
    font-family: 'Inter', sans-serif;
    /* font-weight: 500; */
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
.controlQuantity{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
/*
.controlQuantity button{
    width: 2vw;
    height: 2vw;
    background: linear-gradient(180deg, #F7F7F7 0%, #E7E3E3 100%);
    border: 0.1rem solid #969393;
    border-radius: 0.5rem;
    font-size: 1.2vw;
    
}
/*
.controlQuantity p{
    width: 2.2vw;
    height: 2vw;
    background: #EEEEEE;
    border: 0.1em solid hsl(0, 0%, 100%);
    box-shadow: inset 0 0.05em 0.2em 0.05em rgba(0, 0, 0, 0.25);
    border-radius: 0.3em;
    padding: 0.3em;
    font-size: 0.8vw;
}
*/
.atributs{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 15vw;
}
.atributs p{
    text-transform: capitalize;
    font-size: 1vw;
}
.price{
    text-align: left;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin: 0;
}
@media (max-width: 720px) {
    .cartItem{
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: flex-start;
        font-size: 1rem;
    }  
    .nameItem{
        text-align: left;
        display: flex;
        flex-direction: column;
        white-space:normal;
        justify-content:left;
    }
    .label{
        font-weight: bolder;
        color: #5D5D5D;
        padding:0;
        padding-bottom: 0.5rem;
        align-self: flex-start;
    }

    .Value{
        font-weight: bolder;
        padding-bottom: 1rem;
        font-size: 1.6rem;
        
    }

    .quantity{
        display: flex;
        flex-direction: column;
        text-align: left;
        width: auto;
        justify-content: center;
        align-items: center;
        margin: 0;
    }
    .controlQuantity{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }
    .controlQuantity .inputText{
        width: 8rem;
        text-align: center;
    }
    .controlQuantity .inputButton{
        width: 4rem;
    }
    .atributs p{
        text-transform: capitalize;
        font-size: 1.6rem;
    }
    .atributs .label{
        text-transform: capitalize;
        font-size: 1rem;
    }
    .atributs{
        display:flex;
        flex-direction: column;
        text-align: left;
        width: auto;
        margin-top: 1vh;
    }
    hr{
        display: block;
        width:55vw;
        border-top: 2px solid rgb(27, 27, 27);
    }
}
</style>