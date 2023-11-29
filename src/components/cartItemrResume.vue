<template>
    <div class="cartItem">
        <div class="prod-image">
            <img :src=this.item.imagem>
        </div>
        <div class="nameItem">
            <p class="label">Produto</p>
            <p class="Value">{{this.item.name}}</p> 
        </div>
        <div class="quantity">
            <p class="label">Quantidade:</p>
            <p style="margin-top: 0.6rem;">{{this.item.quantity}}</p>
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
import axios from "axios"
import { baseApiUrl } from "@/global"
export default {
    name: "CartItemResume",
    beforeMount() {
        this.getItems()
    },
    mounted(){
        //console.log(this.item.key);
        console.log(this.item.key)
    },
    props:{
        item:{
            name: String,
            quantity: Number,
            price: Number,
            //parcelas: Number,
            imagem: String,
            // atributs: {
            //     cor: String,
            //     tamanho: Number
            // }
        }
    },
    methods:{
        add(){
            this.item.quantity = this.item.quantity+1;
        },
        sub(){
           if(this.item.quantity>1){
                this.item.quantity = this.item.quantity-1;
           }
        },
        getItems(){
            const url=`${baseApiUrl}/products/`+this.item.product_id
                axios.get(url).then(res =>{
                    this.info={...res.data}
                    this.item.name= this.info[0].name
                    this.item.price= this.info[0].price
                    this.item.imagem=this.info[0].imageUrl
                    
                    Object.values(this.info).forEach(value => {
                        // this.totalPrice+=this.value.price*this.value.quantity;
                        // console.log(value)
                        // console.log(this.item)
                    });
                    // console.log(this.totalPrice)

                }).catch((e=>{console.error(e)}))
        }
    }
}
</script>
<style scoped>
hr{
    display: none;
}

.prod-image img{
    min-height: 5rem;
    max-height: 5rem;
    min-width: 5rem;
    margin-right: 3rem;
}
.cartItem{
    display: flex;
    font-size: 1vw;
    margin: 0px;
    justify-content: center;
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
    padding: 0.1rem;
}

.Value{
    min-width: 25rem;
    max-width: 25rem;
    text-wrap: balance;
    font-weight: bolder;
    padding-bottom: 2rem;
    font-size: 1.2vw;
}

.price .Value{
    min-width: 8rem;
    max-width: 8rem;
}

.quantity{
    display: flex;
    flex-direction: column;
    text-align: center;
    min-width: 6rem;
    max-width: 6rem;
    text-wrap: balance;
    align-items: center;
    margin: 0vw 2vw 0vw 3vw;
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
    width: 16rem;
    flex-direction: column;
    flex-wrap: nowrap;
    margin: 0;
}

@media (max-width: 900px) {
    
.Value{
    min-width: 20rem;
    max-width: 20rem;
}
}

@media (max-width: 720px) {
    .cartItem{
        display: flex;
        flex-direction: row;
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
        display: none;
    }
}

@media (max-width: 420px) {
    
    .Value{
        min-width: 15rem;
        max-width: 15rem;
    }
    }
</style>