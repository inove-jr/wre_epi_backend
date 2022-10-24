<template>
    <div class="whiteBox card">
        <div class="row center">
            <span class="nome">{{ nomeProduto }}</span>
        </div>
        <div class="image">
            <img :src="imagem" alt="Imagem Produto">
        </div>
    
        <div class="row center">
            <div class="col">
                <span>à vista</span>
                <span class="preco">R$ {{ preco.toLocaleString("pt-BR", { minimumFractionDigits: 2}) }}</span>
            </div>
        </div>

        <div class="row center">
            <span>
                x{{parcelas}} de
                <span style="font-weight: bold">
                    R$ {{ (preco/parcelas).toLocaleString("pt-BR", { minimumFractionDigits: 2}) }}
                </span>
                s/ juros
            </span>
        </div>
            
        <div class="row center">
            <a :href="link"><button @click="test">Comprar</button></a>
        </div>
    </div>
</template>
<script>
export default {
    name: "ProductCard",
    props:{
        nomeProduto: String,
        preco: Number,
        parcelas: Number,
        link: String,
        imagem: String
    },
    methods:{
    }
}

</script>
<style scoped>

* {
        font-family: Lato;
    }
    .nome{
        font-size: 1.6rem;
        font-weight: bold;
        margin: 1.5rem;
        text-align: center;
    }
    .image{
        text-align: center;
        align-content: center;
        padding: 2rem;
        margin-bottom: 0.5rem;
        background-color: white;
    }
    span{
        font-size: 1.4rem;
    }
    .text-bot-preco {
        text-align: left;
    }
    .preco{
        font-weight: bold;
        font-size: 2.4rem;
    }

    button{
        color: white;
        font-size: 2rem;
        font-weight: bold;
        background-color: #0a260b;
        border: none;
        border-radius: 0.5rem;
        padding: 0.3rem 2rem 0.6rem 2rem;
        margin: 1.5rem 0;
        cursor: pointer;
        transition: 0.05s ease-in-out;
    }

    button:hover{
        background-color: #2A732A;
    }
    .card{
        max-width: 24rem;
        min-width: 22.4rem;
    }
</style>