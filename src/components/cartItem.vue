<template>
    <section class="cartItem">
        <div class="nameItem">
            <h6>Produto</h6>
            <h4>{{this.item.nome}}</h4> 
        </div>
        <div class="quantity">
            <h6>Quantidade:</h6>
            <div class="controlQuantity">
                <button @click="sub()">
                -
                </button>
                <p>{{this.item.quantity}}</p>
                <button @click="add()">
                    +
                </button>
            </div>
        </div>
        <div class="atributs">
            <h6>Atributos:</h6>
            <div v-if="Object.keys(this.item.atributs) != 0">
                <h4 v-for="(value, index) in Object.entries(this.item.atributs)" :key="index">
                    {{value[0]}}: {{value[1]}}
                </h4>
            </div>
            <h4 v-else> - </h4>
            
        </div>
        <div class="price">
            <h6>Valor</h6>
            <h4>R$ {{ (this.item.preco*this.item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2}) }}</h4> 
        </div>
    </section>
</template>
<script>

export default {
    name: "CartItem",
    mounted(){
        //console.log(this.item.key);
    },
    props:{
        item:{
            nome: String,
            quantity: Number,
            preco: Number,
            parcelas: Number,
            imagem: String,
            atributs: {
                cor: String,
                tamanho: Number, 
                tipo: String
            }
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
        }
    }
}
</script>
<style scoped>
.cartItem{
    display: flex;
    flex-direction: row;
    font-size: 2.5rem;
    background-color: aliceblue;
}
.nameItem{
    text-align: left;
}
.cartItem h6{
    font-weight: 400;
    color: #5D5D5D;
}
h6{
    padding-bottom: 1rem;
}
.nameItem h6{
    padding-left: 2rem;
}

.quantity{
    text-align: center;
    margin: auto;
}
.controlQuantity{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.controlQuantity button{
    width: 2.6em;
    height: 3em;
    background: linear-gradient(180deg, #F7F7F7 0%, #E7E3E3 100%);
    border: 0.1em solid #969393;
    border-radius: 0.3em;
}
.controlQuantity p{
    width: 4em;
    height: 1.8em;
    background: #EEEEEE;
    border: 0.1em solid hsl(0, 0%, 100%);
    box-shadow: inset 0 0.05em 0.2em 0.05em rgba(0, 0, 0, 0.25);
    border-radius: 0.3em;
    padding: 0.3em;
}
.atributs h4{
    text-transform: capitalize;
    margin: auto;
}
.price{
    margin-inline: auto;
    text-align: left;
}
.price h4{
    margin: auto;
}
.price h6{
    padding-left: 2rem;
}
</style>