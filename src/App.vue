<template>
  <FooterComponent/>
  <router-view/>
</template>

<script>
  import FooterComponent from './components/footer.vue'
  
  
  export default {
    name: 'App',
    components: {
      FooterComponent,
  }
  }
  </script>

<style>

body{ background-color:  #FFFFFF; 

}
footer{background-color: #3A9E3E ;
  color: #FFFFFF; 
}
</style>
