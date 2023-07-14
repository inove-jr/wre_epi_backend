<template>
    <section class="whiteBox form-container">
        <h3>Recuperar Senha</h3>
        <form class="cadastro-form">
            <div class="input-container">
                <label for="email">E-mail Cadastrado</label>
                <input type="text" id="email" name="email" v-model="user.email" required placeholder="Digite o e-mail cadastrado"/>
            </div>
            <div class="buttons-container">
                <button class="submit" @click="sendEmail">Confirmar</button>
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
            sendEmail(){
                const url = `${baseApiUrl}/forgot-password`
                axios.post(url, this.user).then(res =>{
                    console.log("funfou")
                    alert("Email Enviado por favor, verificar sua caixa de mensagens")
                    this.reset()
                }).catch((e=>{
                    alert(e.response.data)
                }))
            },
            cancel(){
                this.$router.go(-1)
            }
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