<template>
    <section class="whiteBox form-container">
        <h3>Trocar Senha</h3>
        <form class="cadastro-form">
            <div class="input-container">
                <label for="password">Nova senha</label>
                <input type="password" name="password" v-model="user.newPassword" required placeholder="Digite a Nova Senha"/>
            </div>
            <div class="input-container">
                <label for="password">Confirmar Nova senha</label>
                <input type="password" name="confirmPassword" v-model="user.confirmNewPassword" required placeholder="Digite Novamente a Nova Senha"/>
            </div>
            <div class="buttons-container">
                <button class="submit" @click="ChangePassword">Confirmar</button>
                <button class="submit" @click="cancel">Cancelar</button>
            </div>
        </form>
    </section>
</template>
<script>
    import axios from 'axios'
    import { baseApiUrl } from '@/global'

    export default{
        name: 'CadastroForm',
        data(){
            return{
                mode:'save',
                user:{},
            }
        },
        methods:{
            ChangePassword(){
                if (this.user.newPassword !== this.user.confirmNewPassword) {
                alert('As senhas inseridas não são iguais.')
                return
            }
                const url = `${baseApiUrl}/forgot-password/`+this.$route.params.token
                axios.post(url, { newPassword: this.user.newPassword }).then(res =>{
                    alert("Senha Trocada Com Sucesso!")
                    this.reset()
                }).catch((e=>{
                    alert(e.response.data)
                }))
            },
            cancel(){
                this.$router.go(-1)
            }
        },
        mounted(){
            const url = `${baseApiUrl}/forgot-password/`+this.$route.params.token
            console.log(this.$route.params.token)
            console.log(url)
        }
    }
</script>
<style scoped>
.form-container{
    width: fit-content;
    margin: auto;
    margin-block: 3em;
    padding: 3em;
    border-radius: 0.3em;
}
.form-container h3{
    font-size: 2.7em;
    font-weight: 700;
    text-align: center;
    padding-bottom: 1rem;
    color: #0A260B;
}
.input-container{
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 0.3rem;
    gap: 0.3rem;
}
.input-container label{
    font-size: 1.4em;
    font-weight: 600;
    color: #515151;

}
.input-container input{
    padding: 0.8rem;
    width: 24em;
    border: 1px solid #FFFFFF;
    background-color: #EEE;
    box-shadow: inset 0 0.1rem 0.4rem 0.2rem rgba(0, 0, 0, 0.25);
    border-radius: 0.5rem;
}
.buttons-container{
    display: flex;
    flex-direction: row;
    column-gap: 5em;
    justify-content: center;
    padding-top: 2em;
}

.buttons-container button{
    width: fit-content;
}
.submit{
    background: #0A260B;
    color: white;
    border-radius: 0.4rem;
    font-size: 2em;
    font-weight: 600;
    text-align: center;
    padding: 0.2rem;
    padding-inline: 1.8rem;
}
.submit:hover{
    box-shadow: inset 0 0.1rem 2rem 0.4rem #2eff389e;
    border-color: #2eff389e;
}
</style>