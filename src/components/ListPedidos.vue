<template>
    <div class="pedidos-list-container">
        <div class="list">
            <div class="pedido" v-for="index, pedido in pedidos" :key="index">
                <span>
                    {{ pedido }}
                </span>
            </div>
        </div>
        <Paginacao v-if="pedidos.length"
            :offset="offset"
            :total="total"
            :limit="limit"
            @change-page="changePage"/>
    </div>
</template>

<script>
import { Paginacao } from '../components/Paginacao.vue';

export default{
    name: 'ListPedidos',
    beforeMount() {
       this.getData()
    },
    data() {
        return {
            colection: [1,2,3,4,5,6,7,8,9,10,11,12],
            pedidos: [],
            offset: 0,
            limit: 30,
            total: 0,
        }
    },
    methods:{
        getData(){
            this.offset = 0;
            this.limit = 4;
            this.pedidos = this.colection.slice((this.offset*this.limit),((this.offset+1)*this.limit));
            this.total = this.colection.length;
        }
    }
}

</script>

<style scoped>

.list{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    background-color: cadetblue;
}

.pedido{
    width: 16;
    height: 4rem;
    background-color: aquamarine;
}

</style>