<template>     
    <div class="col">
        <section id="list" class="col">
            <ul class="col prod-list">
                <li v-for="(produto, index) in this.produtos" :key="index" class="row prod-line"> 
                    <span>
                        #{{ produto.idProduto }}
                    </span>

                    <img :src="produto.prodPics[0]" alt="figura">
                    
                    <span>
                        {{ produto.nome }}
                    </span>
                    
                    <span>
                        Valor: R${{ produto.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2}) }}
                    </span>

                    <span>
                        Quantidade: {{ produto.quantidade }}
                    </span>

                    <button @click="selectProduct(produto, index)" class="edit-btn">
                        Editar
                    </button>
                    
                    <button @click="removeProduct(index)" class="exclude-btn">
                        Excluir
                    </button>
                
                </li>
            </ul>
        </section>

        <section class="col">
            <h1>
                Adicionar/Editar Produto
            </h1>

            <content>
                <span v-if="this.prod.id" id="id-produto">
                    #{{ this.prod.id }}
                </span>

                <form class="form" action="">
                    <div class="form-start">    
                        <small>
                            Título:
                        </small>
                        <input class="inputText" v-model="this.prod.name"/>

                        <small>
                            Valor (R$):
                        </small>
                        <input class="inputText" type="number" placeholder='0.00' step=".01" pattern="^\d*(\.\d{0,2})?$"
                               @keydown="$event => ['e', 'E', '+', '-'].includes($event.key) && $event.preventDefault()"
                               @change="$event => $event.target.value = parseFloat($event.target.value).toFixed(2)"
                               v-model="this.prod.price"/>
                        <small>
                            Descrição curta:
                        </small>
                        <textarea class="inputText" v-model="this.prod.short_description"></textarea>
                    </div>

                    <small>
                        Descrição longa:
                    </small>
                    <textarea class="inputText" v-model="this.prod.long_description"></textarea>
                    
                    <div class="prod-images">
                        <section class="input-image">
                            <h2>Imagens</h2>
                            <label for="prodImages" class="btn">Selecione as imagens...</label>
                            <input type="file" id="prodImages" name="prodImages" accept="image/*" @change="addProdPic($event)" multiple>
                        </section>
                        <section class="image-list">
                            <div class="added-image" v-for="(pic, index) in this.prod.prodPics">
                                <img :key="index" :src="pic" alt="figura">
                                <button @click="removePic(index)">X</button>
                            </div>
                        </section>
                    </div>

                    <small>
                        Link de vídeo curto:
                    </small>
                    <input class="inputText" v-model="this.prod.shortVideoUrl"/>

                    <small>
                        Link de vídeo longo:
                    </small>
                    <input class="inputText" v-model="this.prod.LongVideoUrl"/>

                    <div class="row" style="justify-content: space-between;">
                        <div class="col" style="width: 48%;">
                            <small>
                                Quantidade do estoque:
                            </small>
                            <input type="number" class="inputText"  min="0" max="99" 
                               oninput="if(this.value>99){this.value='99';}else if(this.value<0){this.value='0';}"
                               @keydown="$event => ['e', 'E', '+', '-'].includes($event.key) && $event.preventDefault()"
                               v-model="this.prod.stock"/>
                        </div>
                        <div class="col" style="width: 48%;">
                            <small>
                                Categorias:
                            </small>
                            <select class="inputText" v-model="this.prod.categoryId">
                                <option disabled value="">Selecione uma categoria...</option>
                                <option v-for="option in categorias" :value="option">{{option}}</option>
                            </select>
                        </div>
                    </div>

                    <div class="row submit-container">
                        <button class="purpleButton" :disabled="!this.prod.id" @click="saveExist">Salvar Modificações</button>
                        <button class="purpleButton" @click="saveNew">Adicionar novo produto</button>
                    </div>
                </form>
            </content>
        </section>
    </div>
</template>
<script>
import axios from 'axios'
import { baseApiUrl } from '@/global';
export default {
    name: 'ProductCadForm',
    beforeMount(){
        this.categorias = this.getCategorias();
        this.produtos = this.getProdutos();
    },
    data() {
        return {
            produtos: [],
            categorias: [],
            picsLimit: 6,
            prod:{},
            prodIndex: null
        }
    },
    methods: {
        getCategorias(){
            return ['A','B','C'];
        },
        getProdutos(){
            return [
                {
                    idProduto: 1124,//Apagar
                    nome: 'Teste',
                    valor: 12.5,
                    descricaoCurta: 'TTTTTTTTT',
                    descricaoLonga: 'TTTTTTTTT',
                    linkVideoCurto: 'TTTTTTTTT',
                    linkVideoLongo: 'TTTTTTTTT',
                    quantidade: 12,
                    categoria: 'A',
                    prodPics: ["/img/prod1.svg"],
                },
                {
                    idProduto: 1125,//Apagar
                    nome: 'Teste B',
                    valor: 12.6,
                    descricaoCurta: 'TTTTTTTTT',
                    descricaoLonga: 'TTTTTTTTT',
                    linkVideoCurto: 'TTTTTTTTT',
                    linkVideoLongo: 'TTTTTTTTT',
                    quantidade: 12,
                    categoria: 'A',
                    prodPics: ["/img/prod2.svg"],
                },
                {
                    idProduto: 1126,//Apagar
                    nome: 'Teste C',
                    valor: 12.7,
                    descricaoCurta: 'TTTTTTTTT',
                    descricaoLonga: 'TTTTTTTTT',
                    linkVideoCurto: 'TTTTTTTTT',
                    linkVideoLongo: 'TTTTTTTTT',
                    quantidade: 12,
                    categoria: 'A',
                    prodPics: ["/img/prod3.svg"],
                },
                {
                    idProduto: 1124,//Apagar
                    nome: 'Teste',
                    valor: 12.5,
                    descricaoCurta: 'TTTTTTTTT',
                    descricaoLonga: 'TTTTTTTTT',
                    linkVideoCurto: 'TTTTTTTTT',
                    linkVideoLongo: 'TTTTTTTTT',
                    quantidade: 12,
                    categoria: 'A',
                    prodPics: ["/img/prod1.svg"],
                },
                {
                    idProduto: 1125,//Apagar
                    nome: 'Teste B',
                    valor: 12.6,
                    descricaoCurta: 'TTTTTTTTT',
                    descricaoLonga: 'TTTTTTTTT',
                    linkVideoCurto: 'TTTTTTTTT',
                    linkVideoLongo: 'TTTTTTTTT',
                    quantidade: 12,
                    categoria: 'A',
                    prodPics: ["/img/prod2.svg"],
                },
                {
                    idProduto: 1126,//Apagar
                    nome: 'Teste C',
                    valor: 12.7,
                    descricaoCurta: 'TTTTTTTTT',
                    descricaoLonga: 'TTTTTTTTT',
                    linkVideoCurto: 'TTTTTTTTT',
                    linkVideoLongo: 'TTTTTTTTT',
                    quantidade: 12,
                    categoria: 'A',
                    prodPics: ["/img/prod3.svg"],
                }];
        },
        selectProduct(produto, index){
            this.prod = produto;
            this.prodIndex = index;
        },
        removeProduct(index){
            if(confirm("Tem certeza que quer remover o produto?")){
                this.produtos.splice(index,1);
                //Remover no backend
            }
        },
        reader(file, callback) {
            const fr = new FileReader();
            fr.onload = () => callback(null, fr.result);
            fr.onerror = (err) => callback(err);
            fr.readAsDataURL(file);
        },
        addProdPic(event){
            let input = event.target

            if (input.files && input.files[0] ) {
                for(let i=0; i< input.files.length ; i++){
                    this.reader(input.files[i], (err, res) => {
                        if(this.prod.prodPics.length<this.picsLimit){
                            this.prod.prodPics.push(res)
                        }
                        //console.log(imageFile); // Base64 `data:image/...` String result.
                    });
                }
            }
        },
        removePic(index){
            this.prod.prodPics.splice(index,1);
        },
        saveExist(event){
            event.preventDefault()
            if(confirm("Deseja salvar as alterações no produto?")){
                this.produtos[this.prodIndex] = this.prod
            }
        },
        saveNew(event){
            event.preventDefault()
            if((this.prod.nome!='') && (this.prod.valor!=0) && (this.prod.descricaoCurta!='') 
                && (this.prod.descricaoLonga!='') && (this.prod.quantidade!=0) && (this.prod.linkVideoCurto!='')
                && (this.prod.linkVideoLongo!='') && (this.prod.categoria!='') && (this.prod.prodPics.length>0)){
                
                if(confirm("Deseja salvar um novo produto?")){
                    this.produtos.push(this.prod);
                    this.prod = {
                        idProduto: null,
                        nome: '',
                        valor: 0,
                        descricaoCurta: '',
                        descricaoLonga: '',
                        linkVideoCurto: '',
                        linkVideoLongo: '',
                        quantidade: 0,
                        categoria: '',
                        prodPics: [],
                    }
                }
            }else{
                alert("Dados Insuficientes para cadastrar produto!")
            }
        },
        async getItemDetails() {
            const id= this.$route.params.id
            const url = `${baseApiUrl}/products/${id}`
            await axios.get(url).then(
                response => {
                this.produto = response.data
                console.log(this.produto.name);
                }
            ).catch(error => {
                console.log(error)
            })
        }
    },
}
</script>
<style>

.prod-list{
    gap: 1rem;
    margin: 2rem;
    height: 26rem;
    overflow-x: hidden; 
    overflow-y: scroll;
    border-bottom: #626262 0.2rem solid;
}

.prod-line{
    background-color: #D9D9D9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
}

.prod-line img{
    height: 6rem;
    width: 6rem;
}

.prod-line span{
    font-size: 14pt;
    font-weight: bold;
}

h1 {
    font-size: 20pt;
}

#id-produto {
    font-size: 18pt;
    font-weight: bold;
}

small {
    font-size: 11pt;
}

form {
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem;
}

content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
}

.form-start{
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

textarea{
    resize: vertical;
}

.form-start textarea{
    min-height: 10rem;
    padding: 0.6rem;
}

.prod-images{
    display: flex;
    flex-direction: row;
    gap: 2rem;
    margin-top: 1rem;
}
.btn{
    background-color: #A0A0A0;
    font-size: 9pt;
    padding: 1rem;
    border-radius: 0.2rem;
    box-shadow: inset 0px 0px 0.2rem 0px rgb(47, 47, 47);
    margin: 1rem;
}
.input-image{
    margin: inherit;
    text-align: initial;
    display: flex;
    flex-direction: column;
}
.input-image h2{
    padding: 0rem 1rem 1rem 1rem;
}
.input-image input{
    display: none;
}

.image-list{
    border: 1px solid #000;
    background: rgba(217, 217, 217, 0.49);
    min-height: 20rem;
    width: 60rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: space-between;
    gap: 2rem;
    padding: 1rem;
}
.added-image{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
}
.added-image img{
    max-width: 14rem;
    min-width: 14rem;
    max-height: 14rem;
    border: 1px solid rgba(0, 0, 0, 0.50);
}
.added-image button{
    border-radius: 100%;
    width: 2rem;
    height: 2rem;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.50);
}

.submit-container button{
    margin: 10px;
    min-width: 2rem;
    min-height: 3rem;
    padding: 0.5rem 2rem 0.5rem 2rem;
    border-radius: 0.4rem;
    background-image: linear-gradient(#D852B2, #9C4483);
    box-shadow: 0rem 0.1rem 0.4rem 0rem rgb(0, 0, 0, 0.25);
    font-size: 14pt;
    font-family: Lato;
    color: white;
    border: none;
    cursor: pointer;
}

.submit-container button:active {
    background-image: linear-gradient(#9C4483, #D852B2);
}

.submit-container button:disabled {
    filter: grayscale(0.9);
    pointer-events: none;
}


.edit-btn{
    margin: 10px;
    min-width: 2rem;
    min-height: 2rem;
    padding: 1rem;
    border-radius: 0.4rem;
    background-image: linear-gradient(180deg, #5CD852, #559C44);
    box-shadow: 0rem 0.1rem 0.4rem 0rem rgb(0, 0, 0, 0.25);
    font-size: 14pt;
    font-family: Lato;
    color: white;
    border: none;
    cursor: pointer;
}

.edit-btn:active {
    background-image:  linear-gradient(180deg, #559C44, #5CD852 );
}

.exclude-btn{
    margin: 10px;
    min-width: 2rem;
    min-height: 2rem;
    padding: 1rem;
    border-radius: 0.4rem;
    background-image: linear-gradient(180deg, #D85252, #9C4444);
    box-shadow: 0rem 0.1rem 0.4rem 0rem rgb(0, 0, 0, 0.25);
    font-size: 14pt;
    font-family: Lato;
    color: white;
    border: none;
    cursor: pointer;
}

.exclude-btn:active {
    background-image:  linear-gradient(180deg, #9C4444, #D85252 );
}
</style>