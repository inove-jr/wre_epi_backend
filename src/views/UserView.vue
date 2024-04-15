<template>
    <div>
        <div class="info">
            <section class="options">
                <RouterLink :to="{name:'userPefil', params:{userId: userId }}">
                  <img class="icon" src="../assets/user.svg" alt="Perfil" title="Perfil" >
                </RouterLink>
                <RouterLink v-if="!this.isAdmin" :to="{name:'listPedidos', params:{userId: userId}}">
                    <img v-if="!this.isAdmin" class="icon" src="../assets/orders.svg" alt="Lista de pedidos" title="Lista de pedidos">
                </RouterLink>
                <RouterLink :to="{name:'sectionCad'}">
                    <img v-if="this.isAdmin" class="icon" src="../assets/section-add.svg" alt="Adição de Seção" title="Adição de Seção">
                </RouterLink>
                <RouterLink :to="{name:'productCad'}">
                    <img v-if="this.isAdmin" class="icon" src="../assets/prod-add.svg" alt="Adição de Produto" title="Adição de Produto">
                </RouterLink>
                <RouterLink :to="{name:'bannerConfig'}">
                    <img v-if="this.isAdmin" class="icon" src="../assets/banner.svg" alt="Configuração dos Banners" title="Configuração dos Banners">
                </RouterLink>
                <RouterLink :to="{name:'OrdersView'}">
                    <img v-if="this.isAdmin" class="icon" src="../assets/mudanca_pedido_icon.svg" alt="Configuração dos Banners" title="Configuração dos Banners">
                </RouterLink>
            </section>
            <section class="conteudo">
                <RouterView></RouterView>
            </section>
        </div>
    </div>
</template>
  
<script>
  import { mapState } from 'vuex';
  import { mapGetters } from 'vuex';
  import { userKey } from '@/global';

  export default {
    computed: {
    ...mapGetters(['isAdmin']),
  },
    beforeMount(){
        this.getUserData()
    },
    data() {
        return {
            email: "",
            password: "",
            userId:0
        }
    },
    methods: {
        getUserData() {
            const json = localStorage.getItem(userKey);
            const userData = JSON.parse(json);
            this.userId=userData.id;
            console.log(this.isAdmin)
        },
    },
}
</script>
  
<style scoped>
.conteudo{
    width: 100%;
    padding-inline: 2rem;
}
.info{
    display: flex;
    flex-direction: row;
    margin: auto;
    margin-block: 4rem;
    width: 80%;
    min-height: 50rem;
    background-color: white;
    transition: width 0.5s ease-in-out;
    border-radius: 8px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);

}
.options{
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 3rem;
    padding: 1rem;
    width: 6rem;
    border-radius: 8px 0px 0px 8px;
}
.options a img{
    margin-block: auto;
    max-width: 100%;
    min-width: 20px;
}
.icon{
    filter: drop-shadow(2px 3px 3px rgba(0, 0, 0, 0.6));
    cursor: pointer;
}

@media screen and (max-width: 1300px) {
    .info{
        width:70%;
        height:70%;
        transition: width 0.5s ease-in-out;
    }
}

@media screen and (max-width: 1110px) {
    .info{
        width:80%;
        transition: width 0.5s ease-in-out;
    }
}

@media screen and (max-width: 960px) {
    .info{
        width:90%;
        transition: width 0.5s ease-in-out;
    }
}

@media screen and (max-width: 860px) {
    .info{
        width:98%;
        transition: width 0.5s ease-in-out;
    }
}

@media screen and (max-width: 800px) {
    .info{
        height: 84vmax;
    }
}



@media screen and (max-width: 675px) {
    
    .info{
        height: 84vmax;
    }
    .data{
        flex-direction: column;
        align-items: flex-start;
    }
}


</style>