<template>
    <div class="whiteBox card">
        <div>
            <div class="nome">{{ nomeProduto }}</div>
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


</style>