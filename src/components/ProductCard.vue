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
        font-size: 1em;
        font-weight: bold;
        margin: 0.9em;
        text-align: center;
    }
    .image{
        text-align: center;
        align-content: center;
        padding: 1.4em;
        margin-bottom: 0.4em;
        background-color: white;
    }
    span{
        font-size: 0.85rem;
    }
    .text-bot-preco {
        text-align: left;
    }
    .preco{
        font-weight: bold;
        font-size: 1.5em;
    }

    button{
        color: white;
        font-size: 1.25em;
        font-weight: bold;
        background-color: #0a260b;
        border: none;
        border-radius: 0.4em;
        padding: 0.15em 1em 0.3em 1em;
        margin: 0.75em 0;
        cursor: pointer;
        transition: 0.05s ease-in-out;
    }

    button:hover{
        background-color: #2A732A;
    }
    .card{
        max-width: 15rem;
        min-width: 14rem;
    }


/*
    * {
        font-family: Lato;
    }
    .nome{
        font-size: 16px;
        font-weight: bold;
        margin: 15px;
        text-align: center;
    }
    .image{
        text-align: center;
        align-content: center;
        padding: 20px;
        margin: 5px 0;
        background-color: white;
    }
    span{
        font-size: 14px;
    }
    .text-bot-preco {
        text-align: left;
    }
    .preco{
        font-weight: bold;
        font-size: 24px;
    }

    button{
        color: white;
        font-size: 20px;
        font-weight: bold;
        background-color: #0a260b;
        border: none;
        border-radius: 5px;
        padding: 3px 20px 6px 20px;
        margin: 15px 0;
        cursor: pointer;
        transition: 0.05s ease-in-out;
    }

    button:hover{
        background-color: #2A732A;
    }
    .card{
        max-width: 15rem;
        min-width: 14rem;
    }

*/
</style>