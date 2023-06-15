<template>
    <div>
        <div class="info">
            <section class="options">
                <RouterLink :to="{name:'userPefil'}">
                  <img class="icon" src="../assets/user.svg" alt="Perfil" title="Perfil" >
                </RouterLink>
                <RouterLink :to="{name:'productCad'}">
                    <img v-if="this.isAdmin" class="icon" src="../assets/prod-add.svg" alt="Adição de Produto" title="Adição de Produto">
                </RouterLink>
                <RouterLink :to="{name:'sectionCad'}">
                    <img v-if="this.isAdmin" class="icon" src="../assets/section-add.svg" alt="Adição de Seção" title="Adição de Seção">
                </RouterLink>
            </section>
            <section class="conteudo">
                <RouterView></RouterView>
            </section>
        </div>
    </div>
</template>
  
<script>

  export default {
    mounted() {
    },
    data() {
        return {
            email: "",
            password: "",
            isAdmin: true,
        }
    },
    methods: {
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
    height: 50rem;
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
    height: 100%;
    width: 6rem;
    border-radius: 8px 0px 0px 8px;
}
.options a img{
    margin-block: auto;
    max-width: 100%;
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

</style>