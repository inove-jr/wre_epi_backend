<template>
    <main>
      <BotaoFaleConosco/>
      
      <div style="display: flex; flex-direction: row;">
      <!--
        <div class="banner">
  
        </div>
  -->
        <section class="resultado-pesquisa">
          <div class="product-list">
            <div v-for="product in produtos" class="produto">
                <ProductCard :produto="product"/>
            </div>
          </div> 
          <div>
            <Paginacao v-if="produtos.length"
            :offset="offset"
            :total="total"
            :limit="limit"
            @change-page="changePage"/>
          </div>
        </section>
      <!--
        <div class="banner">
  
        </div>
  -->
      
      </div>
    </main>
  </template>
  
  <script>
  import BotaoFaleConosco from '@/components/BotaoFaleConosco.vue';
  import HeaderComponent from "../components/Header.vue";
  import CarrouselComponent from "../components/CarrouselComponent.vue";
  import FooterComponent from "../components/footer.vue";
  import Paginacao from '@/components/Paginacao.vue';
import ProductCard from '@/components/ProductCard.vue';
    
  export default {
      components: {
    Paginacao,
    BotaoFaleConosco,
    HeaderComponent,
    FooterComponent,
    ProductCard
},
      props:{
        query: {
            type: [String],
            default: 'A',
        },
      },
        beforeMount() {
            this.getData();
            this.getStartList();
        },
      data(){
        return{
          collection:[],
          produtos:[],
          offset: 0,
          limit: 20,
          total: 0,
        }
      },
      methods:{
        getData() {

            //MOdificar para receber dados do servidor

            //Preenchimento para testes

            let test = [
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
            ]

            this.collection = test;
            
        },
        getStartList() {
            this.offset = 0;//Manter
            this.limit = 20;//Manter
            this.popControl = Array(this.limit).fill(false),
            this.produtos = this.collection.slice((this.offset * this.limit), ((this.offset + 1) * this.limit));
            this.total = this.collection.length;
        },
        changePage(offset){
            this.offset = offset;
            this.produtos = this.collection.slice((this.offset * this.limit), ((this.offset + 1) * this.limit));
        },
      }
  }
  </script>
  
  <style>
    .banner{
      background-image: url('../assets/istockphoto-1027797478-1024x1024.jpg');
      background-size: 12rem 60rem;
      height: 60rem;
      width: 12rem;
      margin: auto;
    }
    main{
      background: rgb(236,236,236);
    }
    .resultado-pesquisa{
      margin: auto;
      margin-block: 2rem;
      width: 80%;
      background-color: white;
      border-radius: 5px;   
      box-shadow: 0px 4px 5px 6px #00000025;
    }
    
    .product-list{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: 98%;
      margin: auto;
      margin-bottom: 2rem;
    }

    .produto{
      transform: scale(0.8);
      height: 31rem;
      width: 20rem;
    }

    .produto .whiteBox{
      box-shadow: 0px 4px 5px 6px #00000025
    }
  
    @media(max-width: 720px){
      main{
        background: rgb(236,236,236);
      }
      .produto{
        height: 23rem;
        width: 17rem;
      }
      
      .banner{
        display: none;  
      }
    }
  </style>
  