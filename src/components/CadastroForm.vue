<template>
    <section class="whiteBox form-container">
        <h3>Cadastro</h3>
        <form class="cadastro-form">
            <div class="imput-container">
                <label for="name">Nome Completo</label>
                <input type="text" id="name" name="name" v-model="name" placeholder="Digite seu nome..."/>
            </div>
            <div class="imput-container">
                <label for="company">Empresa</label>
                <input type="text" id="company" name="company" v-model="company" placeholder="Digite sua empresa..."/>
            </div>
            <div class="imput-container">
                <label for="CPF">CPF</label>
                <input type="text" id="CPF" name="CPF" v-model="CPF" placeholder="Digite seu CPF..."/>
            </div>
            <div class="imput-container">
                <label for="email">E-mail</label>
                <input type="email" id="email" name="email" v-model="email" placeholder="Digite seu e-mail..."/>
            </div>
            <div class="imput-container">
                <label for="password">Senha</label>
                <input type="password" id="password" name="password" v-model="password" placeholder="Digite sua senha..."/>
            </div>
            <div class="imput-container">
                <label for="password-confirm">Confirme Senha</label>
                <input type="password" id="password-confirm" name="password-confirm" v-model="passwordConfirm" placeholder="Digite sua senha..."/>
            </div>
            <div class="buttons-container">
                <input type="submit" class="submit" value="Cadastrar"/>
                <button class="submit">Cançelar</button>
            </div>
        </form>
    </section>
</template>
<script>
    export default{
        name: 'CadastroForm',

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
.cadastro-form{
   
}
.imput-container{
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 0.3rem;
    gap: 0.3rem;
}
.imput-container label{
    font-size: 1.4em;
    font-weight: 600;
    color: #515151;

}
.imput-container input{
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