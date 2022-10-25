<template>
    <section>
    </section> 
</template>
  
<script>

  export default {
    components: {  },
    mounted(){
       console.log(this.$route.params.id)
    },
      data(){
        return{
        }
      }
  }
</script>
  
<style scoped>
section{
    height: 100px;
}
</style>