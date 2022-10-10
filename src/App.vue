<template>
  <div class="main">
    <CarrouselComponent/>

  </div>
</template>

<script>
import CarrouselComponent from "./components/CarrouselComponent.vue";

export default {
  name: 'App',
  props:[
   
  ],
  
  components: {
    CarrouselComponent,
    
},
}

</script>

<style>
  body{
    margin: 0;

  }
#app {
  margin: 0px;
  padding: 0px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  height: 100%;
  width: 100%;
  background-color: grey;
}
.vueperslides--fixed-height { height: 200px; }
</style>
