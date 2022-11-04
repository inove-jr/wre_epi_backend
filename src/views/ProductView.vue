<template>
  <div class="conteiner row" style="">
    <div class="whiteBox productView col">
      <div class="row">
        <div class="columns images col">
          <span class="text">
            Imagem do produto:
          </span>
          
          <div class="bigImage">
            <img :src="bigImage">
          </div>

          <div class="otherImages">
            <img v-for="(image, index) in otherImages" :key="index" :src="image" @click="select(index)">
          </div>
        </div>

        <div class="columns col">
          <div class="text">
            <h2 class="padText">
              Nome Produto
            </h2>

            <div class="padText">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </div>
          </div>

          <div>
            <VideoEmbed url="745aPtV_W60"/>
          </div>
        </div>
      </div>
    </div>

    <div class="whiteBox productBuy col">
    </div>
  </div>
</template>
  
<script>
import VideoEmbed from "../components/VideoEmbed.vue";
  export default {
    components: { 
      VideoEmbed
    },
    props:{
     /* bigImage: String,
      otherImages: Array*/
    },
    mounted(){
       console.log(this.$route.params.id)
    },
      data(){
        return{
          bigImage: "/img/prod1.svg",
          otherImages: ["/img/prod1.svg","/img/prod2.svg","/img/prod3.svg"]
        }
      },
      methods: {
        select(image) {
          this.bigImage = this.otherImages[image]
        }
      }
  }
</script>

<style scoped>
  .conteiner {
    padding: 1rem 4rem;
  }
  .productView{
    padding: 2rem;
    margin: 0.5rem;
    width: 70%;
    font-size: 1.4rem;
  }
  .productBuy{
    min-width: 35rem;
    width: 30%;
    padding: 3rem;
    margin: 0.5rem;
  }
  .bigImage img{
    height: 35rem;
    aspect-ratio: 1/1;
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
  .images{
    text-align: left;
  }
  .text{
    font-family: Inter;
    text-align: justify;
    padding-bottom: 0.5rem;
  }
  
  .otherImages img{
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
</style>