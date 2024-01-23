<template>
    <div class="pagination-container">
        <button
            v-if="showPrevious"
            class="item set"
            @click="changePage(previous)"
        >
        <!-- &laquo; -->&lt
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
        <button v-if="showNext" class="item set" @click="changePage(current)">
        <!-- &raquo; -->&gt
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
        previous() {
            return this.offset-1;
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
    padding: 2rem;
    display: flex;
    gap: 0.6rem;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
}
.item{
    font-family: 'Lato';
    font-size: 10pt;
    padding: 0.5rem;
    border-radius: 3px;
    background-color: rgb(177, 216, 255);
    border: none;
    box-shadow: 0px 0px 2px 2px rgba(146, 143, 143, 43%);
}
.current{
    background-color: rgb(91, 172, 252);
}
.set{
    padding: 0 1rem;
    font-weight: bolder;
}
</style>