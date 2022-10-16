<template>
  <HeaderComponent/>
  <router-view/>
  
</template>

<script>
import HeaderComponent from './components/header.vue'


export default {
  name: 'App',
  components: {
    HeaderComponent,
}
}
</script>

<style>
  
</style>
