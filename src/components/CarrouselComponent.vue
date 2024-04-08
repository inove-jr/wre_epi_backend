<template>
  <div class="main">
    <vueper-slides autoplay :fixed-height="true">

      <vueper-slide @click="teste(index)" v-for="(slide, index) in slides" :key="index" :image="slide.image" :title="slide.title"
        :content="slide.content" :style="'backgroundSize: auto; backgroundRepeat: no-repeat'">
      </vueper-slide>
    </vueper-slides>
  </div>
</template>

<script>
//Para instalar o componente usa npm i vueperslides    
//link documentação: https://antoniandre.github.io/vueper-slides/?ref=madewithvuejs.com#ex--events
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import axios from "axios"
import { baseApiUrl } from '@/global'

export default {
  name: 'Carousel',
  components: {
    VueperSlides,
    VueperSlide,
  },
  data: () => ({
    slides: [
      // {
      //   //title: 'Slide #1',
      //  // content: 'Slide 1 content.',
      //   image: require('../assets/logo.png'),
      //   style: 'backgroundSize: auto; backgroundRepeat: no-repeat'

      // },
      // {
      //  image: require('../assets/logo.png'),
      //   style: 'backgroundSize: auto; backgroundRepeat: no-repeat'

      // },
      // {
      //   image: require('../assets/logo.png'),
      //   style: 'backgroundSize: auto; backgroundRepeat: no-repeat'
      // },
      // {
      //   image: require('../assets/logo.png'),
      //   style: 'backgroundSize: auto; backgroundRepeat: no-repeat'
      // },
      // {
      //   image: require('../assets/logo.png'),
      //   style: 'backgroundSize: auto; backgroundRepeat: no-repeat'
      // },
    ],
    links:[]
  }),
  methods: {
    teste(index) {
      // console.log("click Funcionou!!!"+this.links[index].link)
      window.open(this.links[index].link, '_blank');
    },
    testeCarrousel() {
      this.slides = [
        {
          image: 'https://quatrorodas.abril.com.br/wp-content/uploads/2022/08/koenigsegg_cc850_9_04c0012e16bc0e95-e1661180294109.jpg?quality=70&strip=info&w=985&h=657&crop=1'
        },
        {
          image: '../img/365593_boleto_business_buy_card_cash_icon.png'

        },
        {
          image: require('../assets/logo.png')

        },
        {
          image: require('../assets/logo.png')

        },
        {
          image: require('../assets/logo.png')

        },
      ]
    },
    async getCarousel() {
      const url = `${baseApiUrl}/assets/carousel`
      try {
        const response = await axios.get(url)
        console.log(response.data)
        this.slides = response.data.imagesUrls
        this.links = response.data.imagesLinks
        console.log(this.links)
      } catch (error) {
        console.log(error)
      }
    }
  },
  beforeMount() {
    // this.testeCarrousel()
    this.getCarousel()
  }

}
</script>

<style>
.vueperslides--fixed-height {
  height: 350px;
}
</style>