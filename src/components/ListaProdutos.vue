<template>
    <section id="content">
        <ProductCard id="line" v-for="(produto, index) in produtos" :key="index" :nomeProduto="produto.nome" :parcelas="produto.parcelas" :preco="produto.preco" :imagem="produto.imagem"/>  
    </section>
</template>
<script>
import ProductCard from '../components/ProductCard.vue';
export default {
    name: 'ListaProdutos',
    components: { ProductCard },
    props:{
        produtos: Array
    }
}
</script>
<style scoped>
#line{
    display: inline-block;
    margin: 0.95rem;
}
#content{
    display: flex;
    justify-content: center;
    width: 100%;
}
</style>