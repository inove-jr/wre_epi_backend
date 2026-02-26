<template>
  <main>
    <CarrouselComponent id="carrousel" />
    <BotaoFaleConosco />

    <div style="display: flex; flex-direction: row;">

      <div class="banner" @click="goTo(0)">
        <img :src=bannersData[0].banner_image_url alt="Banner">
      </div>

      <section id="campoSessoes">
        <!-- <div>
          <SessaoProdutos class="sessao" :nomeSessao="sessao" :listaProdutos="produtos"/>
          <br>
        </div> 
        <div>
          <SessaoProdutos class="sessao" :nomeSessao="sessao" :listaProdutos="produtos"/>
          <br>
        </div> -->
        <div class="sessao">
          <SessaoProdutos :nomeSessao="sessao1" :listaProdutos="produtos1" />
          <br>
        </div>
        <div class="sessao">
          <SessaoProdutos :nomeSessao="sessao2" :listaProdutos="produtos2" />
          <br>
        </div>
        <div class="sessao">
          <SessaoProdutos :nomeSessao="sessao3" :listaProdutos="produtos3" />
          <br>
        </div>
      </section>

      <div class="banner" @click="goTo(1)">
        <img :src=bannersData[1].banner_image_url alt="Banner">
      </div>

    </div>
  </main>
</template>

<script>
import SessaoProdutos from '../components/sessaoProdutos.vue';
import BotaoFaleConosco from '@/components/BotaoFaleConosco.vue';
import HeaderComponent from "../components/Header.vue";
import CarrouselComponent from "../components/CarrouselComponent.vue";
import FooterComponent from "../components/footer.vue";
import { baseApiUrl } from '@/global';
import axios from "axios"

import { useCookies } from "vue3-cookies";
export default {
  components: {
    SessaoProdutos,
    BotaoFaleConosco,
    HeaderComponent,
    CarrouselComponent,
    FooterComponent,
  },
  setup() {
    // const { cookies } = useCookies();
    // return { cookies };
  },
  data() {
    return {
      // produtos1:[
      //     {nome: "Nome do produto 1 - Capacete do tipo",
      //     preco: 100.00,
      //     parcelas: 4,
      //     imagem: "/img/produto.svg",
      //     },
      //     {nome: "Nome do produto 2 - Capacete do tipo",
      //     preco: 200.00,
      //     parcelas: 4,
      //     imagem: "/img/produto.svg",
      //     },
      //     {nome: "Nome do produto 3 - Capacete do tipo",
      //     preco: 300.00,
      //     parcelas: 4,
      //     imagem: "/img/produto.svg",
      //     },
      //     {nome: "Nome do produto 4 - Capacete do tipo",
      //     preco: 400.00,
      //     parcelas: 4,
      //     imagem: "/img/produto.svg",
      //     },
      //     {nome: "Nome do produto 5 - Capacete do tipo",
      //     preco: 500.00,
      //     parcelas: 4,
      //     imagem: "/img/produto.svg",
      //     },
      //     {nome: "Nome do produto 6 - Capacete do tipo",
      //     preco: 600.00,
      //     parcelas: 4,
      //     imagem: "/img/produto.svg",
      //     },
      //     {nome: "Nome do produto 7 - Capacete do tipo",
      //     preco: 700.00,
      //     parcelas: 4,
      //     imagem: "/img/produto.svg",
      //     },
      //     {nome: "Nome do produto 8 - Capacete do tipo",
      //     preco: 800.00,
      //     parcelas: 4,
      //     imagem: "/img/produto.svg",
      //     }
      // ],
      // sessao: "Seção...",
      sessao1: "Capacetes de Proteção",
      sessao2: "Visores de Proteção",
      sessao3: "Luvas de Proteção",
      produtos1: [],
      produtos2: [],
      produtos3: [],
      bannersData: [
        {
          banner_image_url: "",
          banner_link: null
        },
        {
          banner_image_url: "",
          banner_link: null
        }

      ],

    }
  },
  methods: {

    async getItemsSection1(categoryId) {
      const url = `${baseApiUrl}/categories/${categoryId}/products-cart`
      await axios.get(url).then(response => {
        console.log(response.data)
        this.produtos1 = response.data;
      })
        .catch(error => {
          console.log(error)
        })
    },
    async getItemsSection2(categoryId) {
      const url = `${baseApiUrl}/categories/${categoryId}/products-cart`
      await axios.get(url).then(response => {
        //console.log(response.data)
        this.produtos2 = response.data;
      })
        .catch(error => {
          console.log(error)
        })
    },
    async getItemsSection3(categoryId) {
      const url = `${baseApiUrl}/categories/${categoryId}/products-cart`
      await axios.get(url).then(response => {
        //console.log(response.data)
        this.produtos3 = response.data;
      })
        .catch(error => {
          console.log(error)
        })
    },
    async getData() {
      const url = `${baseApiUrl}/assets/banners`
      try {
        const response = await axios.get(url)
        this.bannersData = response.data;
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    },
    async goTo(index){
      if(this.bannersData[index].banner_link!=null){
        // console.log("click Funcionou!!!"+this.bannersData[index].banner_link)
         window.open(this.bannersData[index].banner_link, '_blank');
      }
    }
  },
  mounted() {

    this.getItemsSection1(1);
    this.getItemsSection2(3);
    this.getItemsSection3(4);
    this.getData();

  }
}
</script>

<style scoped>
main {
  background: rgb(236, 236, 236);
}

#campoSessoes {
  padding-top: 2em;
  width: 70%;
  margin: auto;
}

.sessao {
  margin: auto;
}

.banner {
  height: 100%;
  width: 15%;
  overflow: hidden;
  background-color: black;
}

.banner img {
  width: 100%;
  height: auto;
}

@media(max-width: 720px) {
  main {
    background: rgb(236, 236, 236);
  }

  #carrousel {
    display: none;
  }

  #campoSessoes {
    width: 100%;
  }

  #campoSessoes .sessao {
    width: 90%;
    margin: auto;
    display: flex;
    flex-direction: unset;
    flex-wrap: wrap;
  }

  .banner {
    display: none;
  }
}
</style>
