<template>
    <section>
      <div class="whiteBox productView grid-2-col">

        <div class="images item1 flex-col">
          <span>Imagem do produto:</span>
          
          <div class="bigImage">
            <img :src="bigImage">
          </div>

          <div class="otherImages">
            <img v-for="(image, index) in otherImages" :key="index" :src="image" @click="select(index)">
          </div>
        </div>

        <div class="flex-col">
          <div class="text">
            <h2>Nome Produto</h2>
            <p>
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>
          </div>
          <div class="video">
            
          </div>
        </div>
      </div>
    </section> 
</template>
  
<script>

  export default {
    components: {  },
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
  .productView{
      padding: 3em;
      margin: 3em;
      width: 64%;
      font-size: 1.4rem;
  }
  .grid-2-col{
    display: grid;
	  grid-template-columns: 0.6fr 1fr;
  }
  .images{
    text-align: left;
  }
  .flex-col{
    display: flex;
    flex-direction: column;
  }
  .text{
    text-align: justify;
  }
  .bigImage img{
    height: 24em;
    width: auto;
    border: 0.1em solid black;
  }
  .otherImages img{
    height: 3.6em;
    width: auto;
    margin: 0.1em;
    border: 0.1em solid black;
  }
  .item1 {
    grid-column-start: 1;
    grid-column-end: 1;
  }
  .item2 {
    grid-column-start: 2;
    grid-column-end: 2;
  }
</style>