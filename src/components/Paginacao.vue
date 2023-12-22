<template>
    <div class="pagination-container">
        <button
            v-if="showPrevious"
            class="item prev"
            @click="changePage(current - 1)"
        >
        <!-- &laquo; -->U+003C
        </button>
        <button
            v-for="(page, index) in pages"
            :key="page"
            class="item"
            :class="{ current: page === current }"
            @click="changePage(index)"
        >
        {{ page }}
        </button>
        <button v-if="showNext" class="item next" @click="changePage(current + 1)">
        <!-- &raquo; -->U+003E
        </button>
    </div>
</template>
<script>
export default{
    name:'Paginacao',
    props: {
        offset: {
            type: [String, Number],
            default: 0,
        },
        total: {
            type: [String, Number],
            required: true,
        },
        limit: {
            type: [String, Number],
            default: 10,
        },
    },
    data() {
        return{

    }},
    computed:{
        current() {
            //corect page ( 0 -> 1, 1 -> 2)
            return this.offset ? this.offset + 1 : 1;
        },
        pages() {
            const pageQtd = Math.ceil(this.total / this.limit);
            if (pageQtd <= 1) return [1];
            return Array.from(Array(pageQtd).keys(), (i) => i + 1);
        },
        showPrevious() {
            return this.current > 1;
        },
        showNext() {
            return this.total > this.limit * this.current;
        },
    },
    methods: {
        changePage(offset) {
            this.$emit('change-page', offset);
        },
    },
}
</script>
<style scoped>
.pagination-container{

}
</style>