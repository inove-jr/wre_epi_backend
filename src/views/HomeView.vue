<template>
  <main>
    <SessaoProdutos :nomeSessao="sessao" :listaProdutos="produtos"/>
    <br>
    <SessaoProdutos :nomeSessao="sessao" :listaProdutos="produtos"/>
  </main>
</template>

<script>
import SessaoProdutos from '../components/sessaoProdutos.vue';
export default {
  components: { SessaoProdutos },
    data(){
      return{
        produtos:[
            {nome: "Nome do produto 1 - Capacete do tipo",
            preco: 100.00,
            parcelas: 4,
            imagem: "/img/produto.svg",
            },
            {nome: "Nome do produto 2 - Capacete do tipo",
            preco: 200.00,
            parcelas: 4,
            imagem: "/img/produto.svg",
            },
            {nome: "Nome do produto 3 - Capacete do tipo",
            preco: 300.00,
            parcelas: 4,
            imagem: "/img/produto.svg",
            },
            {nome: "Nome do produto 4 - Capacete do tipo",
            preco: 400.00,
            parcelas: 4,
            imagem: "/img/produto.svg",
            },
            {nome: "Nome do produto 1 - Capacete do tipo",
            preco: 100.00,
            parcelas: 4,
            imagem: "/img/produto.svg",
            },
            {nome: "Nome do produto 2 - Capacete do tipo",
            preco: 200.00,
            parcelas: 4,
            imagem: "/img/produto.svg",
            },
            {nome: "Nome do produto 3 - Capacete do tipo",
            preco: 300.00,
            parcelas: 4,
            imagem: "/img/produto.svg",
            },
            {nome: "Nome do produto 4 - Capacete do tipo",
            preco: 400.00,
            parcelas: 4,
            imagem: "/img/produto.svg",
            }
        ],
        sessao: "Seção..."
      }
    }
}
</script>

<style>

</style>
