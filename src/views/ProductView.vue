<template>
  <div>
    <div class="conteiner row" style="">
      <div class="whiteBox productView col">
        <div class="row">
          <div class="columns images col">
            <span class="text"> Imagem do produto: </span>

            <div class="bigImage">
              <img :src="bigImage" />
            </div>

            <div class="otherImages">
              <img
                v-for="(image, index) in otherImages"
                :key="index"
                :src="image"
                @click="select(index)"
              />
            </div>
          </div>

          <div class="columns col">
            <div class="text">
              <h2 class="padText">Nome Produto</h2>

              <div class="padText">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt.
              </div>
            </div>

            <div>
              <VideoEmbed url="745aPtV_W60" />
            </div>
          </div>
        </div>
      </div>

      <div class="whiteBox productBuy col">
        <h2>R$ 400,00</h2>

        <p class="paragrafo1">
          <i class="far fa-credit-card"></i> x4 de R$50,00 s/ juros
        </p>

        <a href="#">Outras formas de pagamento </a>

        <p class="paragrafo2">Quantidade</p>

        <div class="flex-container">
          <button
            class="botao"
            id="botaosub"
            @click="subtrair()"
            style="width: 31px; height: 39px"
          >
            -
          </button>

          <input
            class="inputquantidade"
            type="number"
            style="width: 55px; height: 39px"
            id="contador"
            value = "1"
          />

          <button
            class="botao"
            id="botaosoma"
            @click="somar()"
            style="width: 31px; height: 39px"
          >
            +
          </button>
        </div>

        <div class="digitecep">
          <label>Digite seu CEP:</label>
        </div>

        <input
          class="inputcep"
          id="cep"
          type="string"
          style="width: 225px; height: 40px"
        />

        <div class="endereco">
          <hr />
          <p>Seu Endereço:</p>
        </div>

        <div class="paragrafo3">
          <p>
            Rua da Alvorada, Bairro Alto da Aliança, <br />
            Juazeiro - BA
          </p>
          <hr />
        </div>

        <button id="comprar" style="width: 170px; height: 50px" inline="center">
          Comprar
        </button>
        <button id="comprarata" style="width: 191px; height: 34px">
          Comprar em atacado
        </button>
      </div>
    </div>

    <div class="whiteBox detail">
      <h3>Descrição:</h3>
      <div class="descricao">
        <p class="padText">
          Descrição longa: Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Quisque bibendum eros nec finibus lobortis. Quisque ultricies
          nec lorem vitae tincidunt. Vivamus aliquam, nisi posuere maximus
          ullamcorper, lectus magna ultricies eros, et molestie tortor dui at
          nulla. In hac habitasse platea dictumst. Nam ornare elementum arcu
          tincidunt laoreet. In hac habitasse platea dictumst. Nam ornare
          elementum arcu tincidunt laoreet.<br /><br />

          Descrição rápida: Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Quisque bibendum eros nec finibus lobortis. Quisque ultricies
          nec lorem vitae tincidunt. Vivamus aliquam, nisi posuere maximus
          ullamcorper, lectus magna ultricies eros, et molestie tortor dui at
          nulla. In hac habitasse platea dictumst. Nam ornare elementum arcu
          tincidunt laoreet. In hac habitasse platea dictumst. Nam ornare
          elementum arcu tincidunt laoreet.<br /><br />

          Descrição rápida: Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Quisque bibendum eros nec finibus lobortis. Quisque ultricies
          nec lorem vitae tincidunt. Vivamus aliquam, nisi posuere maximus
          ullamcorper, lectus magna ultricies eros, et molestie tortor dui at
          nulla. In hac habitasse platea dictumst. Nam ornare elementum arcu
          tincidunt laoreet. In hac habitasse platea dictumst. Nam ornare
          elementum arcu tincidunt laoreet.<br /><br />
        </p>
        <div class="video-detalhado">
          <h2>Vídeo com descrição detalhada:</h2>
          <VideoEmbed url="j5a0jTc9S10" />
        </div>
      </div>
    </div>
    <SessaoProdutos
      id="itens-similares"
      :nomeSessao="sessao"
      :listaProdutos="produtos"
    />
  </div>
</template>

<script>
import SessaoProdutos from "@/components/sessaoProdutos.vue";
import VideoEmbed from "../components/VideoEmbed.vue";
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import { numberLiteralTypeAnnotation } from "@babel/types";
export default {
  components: {
    VideoEmbed,
    SessaoProdutos,
  },
  props: {
    /* bigImage: String,
      otherImages: Array*/
  },
  mounted() {
    console.log(this.$route.params.id);
  },
  data() {
    return {
      bigImage: "/img/prod1.svg",
      otherImages: ["/img/prod1.svg", "/img/prod2.svg", "/img/prod3.svg"],
      count: 1,
      produtos: [
        {
          nome: "Nome do produto 1 - Capacete do tipo",
          preco: 100.0,
          parcelas: 4,
          imagem: "/img/produto.svg",
        },
        {
          nome: "Nome do produto 2 - Capacete do tipo",
          preco: 200.0,
          parcelas: 4,
          imagem: "/img/produto.svg",
        },
        {
          nome: "Nome do produto 3 - Capacete do tipo",
          preco: 300.0,
          parcelas: 4,
          imagem: "/img/produto.svg",
        },
        {
          nome: "Nome do produto 4 - Capacete do tipo",
          preco: 400.0,
          parcelas: 4,
          imagem: "/img/produto.svg",
        },
        {
          nome: "Nome do produto 5 - Capacete do tipo",
          preco: 500.0,
          parcelas: 4,
          imagem: "/img/produto.svg",
        },
        {
          nome: "Nome do produto 6 - Capacete do tipo",
          preco: 600.0,
          parcelas: 4,
          imagem: "/img/produto.svg",
        },
        {
          nome: "Nome do produto 7 - Capacete do tipo",
          preco: 700.0,
          parcelas: 4,
          imagem: "/img/produto.svg",
        },
        {
          nome: "Nome do produto 8 - Capacete do tipo",
          preco: 800.0,
          parcelas: 4,
          imagem: "/img/produto.svg",
        },
      ],
      sessao: "Produtos similares...",
    };
  },
  methods: {
    select(image) {
      this.bigImage = this.otherImages[image];
    },
    somar() {
      let input = document.getElementById("contador");
      this.count++;
      input.value = this.count;
    },
    subtrair() {
      let input = document.getElementById("contador");
      this.count--;
      if(this.count < 1){
        this.count = 1;
      }
      input.value = this.count;
    }
  },
};
</script>

<style scoped>
.conteiner {
  padding: 1rem 4rem;
}
.productView {
  padding: 2rem;
  margin: 0.5rem;
  width: 70%;
  font-size: 1.4rem;
}
.productBuy {
  min-width: 35rem;
  width: 30%;
  padding: 3rem;
  margin: 0.5rem;
}
.bigImage img {
  height: 33rem;
  width: 33rem;
  /* aspect-ratio: 1/1;*/
  width: auto;
  border: 0.1em solid rgb(0, 0, 0, 0.5);
  border-radius: 0.2rem;
}
@media only screen and (max-width: 1200px) {
  .conteiner {
    flex-wrap: wrap;
  }
  .productView {
    width: 100%;
  }
  .productBuy {
    width: 100%;
  }
}
.images {
  text-align: left;
}
.text {
  font-family: Inter;
  text-align: justify;
  padding-bottom: 0.5rem;
}

.otherImages img {
  height: 5rem;
  aspect-ratio: 1/1;
  width: auto;
  margin: 0.1em;
  border: 0.1em solid rgb(0, 0, 0, 0.5);
  border-radius: 0.2rem;
}
.columns {
  padding: 2rem;
}
.padText {
  padding-bottom: 1rem;
}
.video {
  width: 100%;
  aspect-ratio: 16/9;
  border: none;
}
.detail {
  font-size: 1.4rem;
  margin: 4.5rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  padding: 2em;
  display: flex;
  flex-direction: row;
}

.detail h3 {
  width: 8em;
  color: #521717;
}
.descricao {
  display: flex;
  flex-direction: column;
  margin-inline: 2em;
}
.descricao p {
  font-size: 1.6rem;
  text-align: left;
}
.video-detalhado {
  margin: 1em;
  margin-inline: 4em;
}
.video-detalhado h2 {
  text-align: left;
  margin-bottom: 1rem;
}
.video-detalhado iframe {
  max-height: 50em;
}
#itens-similares {
  margin: 2em;
}

.whiteBox {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.whiteBox h2 {
  color: rgba(10, 0, 0, 1);
  font-size: 36px;
  margin-bottom: 5px;
}

.paragrafo1 {
  font-family: "Inter";
  font-size: 15px;
  margin-bottom: 8px;
}

.productBuy a {
  color: rgba(79, 79, 79, 1);
  font-family: "Inter";
  font-size: 15px;
  margin-bottom: 16px;
}

.productBuy label {
  color: rgba(81, 81, 81, 1);
  font-family: "Inter";
  font-size: 12px;
}

.flex-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.inputquantidade {
  border: none;
  margin: 0px 5px;
  border-radius: 5px;
  background: #eeeeee;
  border: 1px solid #ffffff;
  box-shadow: inset 0px 1px 5px 2px rgba(0, 0, 0, 0.25);

  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  color: #000000;

  text-align: center;
}

/* Remover controlador do input type number */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type="number"] {
    -moz-appearance: textfield;
}

.botao {
  font-size: 24px;
  margin: 0 auto;
  border: 1px;
  border-radius: 5px;
  border-color: rgba(150, 147, 147, 1);
  background: linear-gradient(180deg, #f7f7f7 0%, #e7e3e3 100%);
  border: 1px solid #969393;
}

.digitecep {
  display: flex;
  text-align: left;
  justify-content: flex-start;
  width: 225px;
  margin-left: 15px;
}

.inputcep {
  border: none;
  background: linear-gradient(0deg, #eeeeee, #eeeeee),
    linear-gradient(0deg, #ffffff, #ffffff);
  border-radius: 5px;
  border: 1px solid #ffffff;
  box-shadow: inset 0px 1px 5px 2px rgba(0, 0, 0, 0.25);
}

.paragrafo2 {
  color: rgba(93, 93, 93, 1);
  font-family: "Inter";
  font-size: 12px;
}

#cep {
  background: linear-gradient(0deg, #eeeeee, #eeeeee),
    linear-gradient(0deg, #ffffff, #ffffff);

  margin-bottom: 6px;
}

.endereco {
  color: rgba(81, 81, 81, 1);
  font-size: 12px;
  font-family: "Inter";
  margin-bottom: 3px;
  text-align: left;
}

.endereco p {
  margin-left: 25px;
}

.productBuy hr {
  width: 368px;
  left: 942px;
  border: 1px solid #cacada;
  margin-bottom: 5px;
}
.paragrafo3 {
  color: rgba(65, 65, 65, 1);
  font-family: "Inter";
  font-size: 16px;
  align-items: flex-start;
  text-align: left;
}

.paragrafo3 p {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
  line-height: 19.36px;
}

#comprar {
  margin-top: 12px;
  background: linear-gradient(180deg, #d852b2 0%, #9c4483 100%);
  border: none;
  border-radius: 10px;
  color: rgba(255, 255, 255, 1);
  font-size: 30px;
  margin-bottom: 12px;
  font-family: "Lato";
  font-style: normal;
  line-height: 36px;
  font-weight: 700;
}

#comprarata {
  background: rgba(10, 38, 11, 1);
  border: none;
  border-radius: 8px;
  width: 191px;
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
}

@media only screen and (max-width: 820px) {
  .detail {
    margin: 1.5rem;
  }
  .descricao {
    margin-inline: 0.4em;
  }

  .video-detalhado {
    margin: 0;
  }
  .video-detalhado iframe {
    height: 10em;
  }
}
</style>
