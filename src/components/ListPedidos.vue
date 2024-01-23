<template>
    <div class="pedidos-list-container">
        <div class="list">
            <div class="pedido" v-for="pedido in pedidos" :key="pedido.id">
                <div class="id-container">
                    <!-- Identificado do Pedido: -->
                    Pedido:
                    <span class="id">
                       # {{ pedido.id }}
                    </span>
                </div>
                <div class="value">
                   Valor: R$ {{ (pedido.value).toLocaleString("pt-BR", { minimumFractionDigits: 2}) }}
                </div>
                <div class="pedido-details">
                    <span class="status">
                       Status: <span>{{ pedido.status }}</span>
                    </span>
                    <span class="dataPedido">
                       Data da compra: <span>{{ pedido.dataPedido }}</span>
                    </span>
                </div>
                <div class="botoes">
                    <button class="datalhesBnt" @click="showDetails(pedidos.indexOf(pedido))">Detalhes</button>
                    <button class="cancelarBnt">Cançelar</button>
                </div>
                
                <section class="overlay_blur" v-if="this.popControl[pedidos.indexOf(pedido)]" @click="closeDetails(pedidos.indexOf(pedido))">
                </section>
                <section class="overlay" v-if="this.popControl[pedidos.indexOf(pedido)]">
                    <ResumePopUp :itemList=pedido.resume :total="pedido.value"></ResumePopUp>
                </section>
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
import Paginacao from '../components/Paginacao.vue';
import ResumePopUp from '../components/ResumePopUp.vue';

export default{
    name: 'ListPedidos',
    beforeMount() {
        this.getData();
        this.getStartList();
    },
    data() {
        return {
            colection: [],
            pedidos: [],
            offset: 0,
            limit: 6,
            popControl: Array(this.limit).fill(false),
            total: 0,
        };
    },
    methods: {
        getData() {

            //MOdificar para receber dados do servidor

            //Preenchimento para testes

            let test = [];
            for (let index = 1; index <= 12; index++) {
                //Id do pedido, Status,Valor total, e data de pedido
                let status = '';
                switch ((index%3)) {
                    case 0:
                        status = 'Confimado'
                        break;
                    case 1:
                        status = 'Enviado'
                        break;
                    case 2:
                        status = 'Entregue'
                        break;
                    default:
                        status = 'Confimado'
                        break;
                }

                var element = {
                    'id': index,
                    'status': status,
                    'value': 150*index,
                    'dataPedido': this.localizeDate('2012-12-12'),
                    'resume': [
                                {nome: "Nome do produto 1 - Capacete do tipo",
                                    quantity: 2,
                                    price: 100.00,
                                    parcelas: 4,
                                    imagem: "/img/produto.svg"
                                },
                                {nome: "Nome do produto 2 - Capacete do tipo",
                                    quantity: 3,
                                    price: 200.00,
                                    parcelas: 4,
                                    imagem: "/img/produto.svg"
                                },
                                {nome: "Nome do produto 3 - Capacete do tipo",
                                    quantity: 2,
                                    price: 300.00,
                                    parcelas: 4,
                                    imagem: "/img/produto.svg"
                                },
                                {nome: "Nome do produto 4 - Capacete do tipo",
                                    quantity: 1,
                                    price: 400.00,
                                    parcelas: 4,
                                    imagem: "/img/produto.svg"
                                },
                            ]
                };

                test.push(element)
                
            }

            this.colection = test;
            
        },
        getStartList() {
            this.offset = 0;//Manter
            this.limit = 6;//Manter
            this.popControl = Array(this.limit).fill(false),
            this.pedidos = this.colection.slice((this.offset * this.limit), ((this.offset + 1) * this.limit));
            this.total = this.colection.length;
        },
        changePage(offset){
            this.offset = offset;
            this.pedidos = this.colection.slice((this.offset * this.limit), ((this.offset + 1) * this.limit));
        },
        localizeDate(date) {
            if (!date || !date.includes('-')) return date
            const [yyyy, mm, dd] = date.split('-')
            //return new Date(`${mm}/${dd}/${yyyy}`)
            return `${mm}/${dd}/${yyyy}`
        },
        showDetails(index){
            this.popControl[index]=true;
        },
        closeDetails(index){
            this.popControl[index]=false;
        },
    },
    computed:{
    },
    components: { Paginacao, ResumePopUp}
}

</script>

<style scoped>

.list{
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    flex-wrap: wrap;
    align-items: center;
    background-color: #dee0d48f;
    margin-top: 2rem;
    min-height: 41rem;
    padding: 1rem;
    border-radius: 6px;
    box-shadow: 0px 0px 5px 0px #00000082;
}

.pedido{
    width: 100%;
    font-size: 9pt;
    min-height: 5rem;
    background-color: white;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-around;    
    border-radius: 6px;
    box-shadow: 2px 3px 8px 1px #00000082;
}

.id-container{
    font-style: oblique;
    text-transform: uppercase;
    font-weight: bolder;
}

.id-container .id{
    font-size: 11pt;
}

.pedido-details{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.value{
    font-size: 11pt;
}

.pedido-details .status span{
    text-transform: uppercase;
    font-weight: bolder;
}
.pedido-details .dataPedido span{
    text-transform: uppercase;
    font-weight: bolder;
}

.pedido .botoes{
    display: flex;
    gap: 1rem;
}
.pedido .botoes button{
    padding: 1rem 0.6rem 1rem 0.6rem;
    border: none;
    border-radius: 4px;
    box-shadow: 0px 0px 3px 0px #00000082;
    text-transform: uppercase;
    color: white;
    font-weight: bolder;
}
.pedido .botoes .datalhesBnt{
    background-color: #02589a;
}
.pedido .botoes .datalhesBnt:hover{
    background-color: #1f98f4;
}

.pedido .botoes .cancelarBnt{
    background-color: #840101;
}
.pedido .botoes .cancelarBnt:hover{
    background-color: #d80000;
}

.datelhes{
    visibility: hidden;
}

.overlay{
    position: fixed;
    z-index: 4;
    opacity: 0;
    animation: show 0.4s ease-in-out;
    animation-fill-mode: forwards;
}

.overlay_blur{
    position: fixed;
    background-color: rgba(0, 0, 0, 0.555);
    backdrop-filter: blur(6px);
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    z-index: 2;
    opacity: 0;
    animation: show 0.4s ease-in-out;
    animation-fill-mode: forwards;
}

@keyframes show{
    0% {opacity: 0;}
    
    100% {opacity: 1;}
}

</style>