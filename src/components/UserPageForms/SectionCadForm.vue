<template>
    <div class="form">
            <form class="catForm">
                <div class="nameCat">
                    <label for="nomeCategoria">Nome da Categoria</label>
                    <input class="input-camp" type="text" name="nomeCategoria" v-model="category.name" required>
                </div>
                <!-- <div class="descCat">
                    <label for="decricaoCategoria">Descrição</label>
                    <textarea class="input-camp" name="decricaoCategoria"></textarea>
                </div> -->
                <button class="submit" @click="saveCategory()">Salvar</button>
            </form>
        </div>
</template>
<script>
import axios from "axios"
import { baseApiUrl } from "@/global";
export default {
    name: 'SectionCadForm',
    data() {
        return {
            category:{}
        }
    },
    methods: {
        async saveCategory(){
            const url = `${baseApiUrl}/categories`
            console.log(this.category)

            try {
                await axios.post(url,this.category);
                alert("Categoria Salva Com Sucesso!!")
            } catch (error) {
                console.log(error.response.data.message)
                alert(error.response.data.message)
            }
           
        }
    },
}
</script>
<style>
.form{
    margin-block: 2rem;
}
.catForm{
    width: 70%;
    display: flex;
    flex-direction: column;
    text-align: left;
    font-size: 11pt;
    margin-block: 10%;
    margin-inline: auto;
    gap:2rem;
}
.catForm div{
    display: flex;
    flex-direction: column;
}
.nameCat input{
    min-height: 1rem;
    padding: 0.6rem;
}
.descCat textarea{
    min-height: 10rem;
    resize: vertical;
    padding: 0.6rem;
}
.submit{
    margin: auto;
    width: 30%;
    height: 4rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #d6ac00;
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem #a38200, 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
    padding: 0.8rem 1.2rem;
    font-size: 1.6rem;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    color: white;
    cursor: pointer;
}

.submit:active{
    background-color: #eccc48;
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem #a38200, 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
}

.input-camp{
    background-color: rgb(236, 236, 236);
    border-radius: 4px;
    min-height: 1rem;
    padding: 0.6rem;
    border:none;
    box-shadow: inset 0px 0px 6px 2px rgba(0, 0, 0, 0.25);
}

.input-camp:focus-visible{
    outline:none;
}
</style>