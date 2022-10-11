<template>
    <button class="whiteBox"><img src="/img/fale.svg"></button>
</template>
<script>
export default {
    name: 'FaleConosco',
}
</script>
<style scoped>
button{
    position: fixed;
    right: 1rem;
    bottom: 3rem;
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
    border: none;
    align-items: center;
    background: #1D531F;
    z-index: 3;   
    cursor: pointer;
}
img{
    margin-top: 0.3em;
}
</style>