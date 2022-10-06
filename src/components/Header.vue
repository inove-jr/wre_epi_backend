<script setup>

</script>
<template>
    <header>
        <img />
        <input type="text">
        <input type="submit">
        <section></section>
    </header>
</template>
<script>
export default {
    name: 'Header',
}
</script>
<style scoped>
    header{
        height: 100px;
        width: 100%;
        background-color: forestgreen;
        display: flex;
        flex-direction: row;
    }
</style>