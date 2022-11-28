<template>
  <HeaderComponent />
   
  <main>
    <CarrouselComponent />
    <BotaoFaleConosco/>
    <section id="campoSessoes">
      <div class="sessao">
        <SessaoProdutos :nomeSessao="sessao" :listaProdutos="produtos"/>
        <br>
      </div>
      <div class="sessao">
        <SessaoProdutos :nomeSessao="sessao" :listaProdutos="produtos"/>
        <br>
      </div>
    </section>
  </main>

  <FooterComponent />
</template>

<script>
import SessaoProdutos from '../components/sessaoProdutos.vue';
import BotaoFaleConosco from '@/components/BotaoFaleConosco.vue';
import HeaderComponent from "../components/Header.vue";
import CarrouselComponent from "../components/CarrouselComponent.vue";
import FooterComponent from "../components/footer.vue";
export default {
  components: { 
    SessaoProdutos, 
    BotaoFaleConosco,
    HeaderComponent,
    CarrouselComponent,
    FooterComponent,
  },
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
            {nome: "Nome do produto 5 - Capacete do tipo",
            preco: 500.00,
            parcelas: 4,
            imagem: "/img/produto.svg",
            },
            {nome: "Nome do produto 6 - Capacete do tipo",
            preco: 600.00,
            parcelas: 4,
            imagem: "/img/produto.svg",
            },
            {nome: "Nome do produto 7 - Capacete do tipo",
            preco: 700.00,
            parcelas: 4,
            imagem: "/img/produto.svg",
            },
            {nome: "Nome do produto 8 - Capacete do tipo",
            preco: 800.00,
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
  main{
    background: rgb(236,236,236);
    background: linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 14%, rgba(143,143,143,1) 15%, rgba(124,124,124,1) 50%, rgba(157,157,157,1) 84%, white 85%, white 100%);
  }
  #campoSessoes{
    padding-top: 2em;
    width: 70%;
    margin: auto;
  }
  .sessao{
    margin: auto;
  }
</style>
