<template>
    <div class="col">
        <section id="list" class="col">
            <ul class="col prod-list">
                <li v-for="(produto, index) in this.produtos" :key="index" class="row prod-line">
                    <span>
                        #{{ produto.id }}
                    </span>

                    <img src="/img/produto.svg" alt="figura">

                    <span>
                        {{ produto.name }}
                    </span>

                    <span>
                        Valor: R${{ produto.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}
                    </span>

                    <span>
                        Quantidade: {{ produto.stock }}
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
                        <input class="inputText" v-model="this.prod.name" required/>

                        <small>
                            Valor (R$):
                        </small>
                        <input class="inputText" type="number" placeholder='0.00' step=".01" pattern="^\d*(\.\d{0,2})?$"
                            @keydown="$event => ['e', 'E', '+', '-'].includes($event.key) && $event.preventDefault()"
                            @change="$event => $event.target.value = parseFloat($event.target.value).toFixed(2)"
                            v-model="this.prod.price" required/>
                        <small>
                            Descrição curta:
                        </small>
                        <textarea class="inputText" v-model="this.prod.short_description" required></textarea>
                    </div>

                    <small>
                        Descrição longa:
                    </small>
                    <textarea class="inputText" v-model="this.prod.long_description" required></textarea>

                    <h1>Dimensões do Produto</h1>
                    <div class="dimensions-section">
                        <div class="row dimensions-row">
                            <div class="row" style="justify-content: center;align-items: center;">
                                <label class="text-label">
                                    <span>
                                        Largura do Produto(Em Cm):
                                    </span>
                                </label>
                                <input type="number" class="inputTextSmall" min="0" v-model="this.prod.product_width" required/>
                            </div>
                            <div class="row" style="justify-content: center;align-items: center;">
                                <label class="text-label">
                                    <span>
                                        Comprimento do Produto(Em Cm):
                                    </span>
                                </label>
                                <input type="number" class="inputTextSmall" min="0" v-model="this.prod.product_length" required/>
                            </div>
                        </div>
                        <div class="row dimensions-row">
                            <div class="row" style="justify-content: center;align-items: center;">
                                <label class="text-label">
                                    <span>
                                        Altura do Produto(Em Cm):
                                    </span>
                                </label>
                                <input type="number" class="inputTextSmall" min="0" v-model="this.prod.product_height" required/>
                            </div>
                            <div class="row" style="justify-content: center;align-items: center;">
                                <label class="text-label">
                                    <span>
                                        Peso do Produto(Em Kg):
                                    </span>
                                </label>
                                <input type="number" class="inputTextSmall" min="0" v-model="this.prod.product_weight" required/>
                            </div>
                        </div>

                        <h1 style="margin:1rem 0rem 1rem 0rem;">Dimensões da Embalagem do Produto</h1>

                        <div class="row dimensions-row">
                            <div class="row" style="justify-content: center;align-items: center;">
                                <label class="text-label">
                                    <span>
                                        Largura da Embalagem do Produto(Em Cm):
                                    </span>
                                </label>
                                <input type="number" class="inputTextSmall" min="0" v-model="this.prod.package_width" required/>
                            </div>
                            <div class="row" style="justify-content: center;align-items: center;">
                                <label class="text-label">
                                    <span>
                                        Comprimento da Embalagem do Produto(Em Cm):
                                    </span>
                                </label>
                                <input type="number" class="inputTextSmall" min="0" v-model="this.prod.package_length" required/>
                            </div>
                        </div>
                        <div class="row dimensions-row">
                            <div class="row" style="justify-content: center;align-items: center;">
                                <label class="text-label">
                                    <span>
                                        Altura da Embalagem do Produto(Em Cm):
                                    </span>
                                </label>
                                <input type="number" class="inputTextSmall" min="0" v-model="this.prod.package_height" required/>
                            </div>
                            <div class="row" style="justify-content: center;align-items: center;">
                                <label class="text-label">
                                    <span>
                                        Peso do Produto + Embalagem(Em Kg):
                                    </span>
                                </label>
                                <input type="number" class="inputTextSmall" min="0" v-model="this.prod.package_weight" required/>
                            </div>
                        </div>

                    </div>

                    <div class="prod-images col">
                        <!-- <section class="input-image">
                            <h2>Imagens</h2>
                            <label for="prodImages" class="btn">Selecione as imagens...</label>
                            <input type="file" id="prodImages" name="prodImages" accept="image/*"
                                @change="addProdPic($event)" multiple>
                        </section>
                        <section class="image-list">
                            <div class="added-image" v-for="(pic, index) in this.prod.prodPics">
                                <img :key="index" :src="pic" alt="figura">
                                <button @click="removePic(index)">X</button>
                            </div>
                        </section> -->
                        <small>
                            Url das Imagens(Minimo 1, no maximo 5):
                        </small>
                        <div class="row">
                            <input class="inputText" placeholder="Url da Imagem" v-model="this.images[0]" />
                            <button type="button" class="add-button" @click="addInput">+</button>
                            <button type="button" class="remove-button" @click="removeInput(0)">-</button>
                        </div>

                        <div class="row">
                            <input class="inputText" placeholder="Url da Imagem" v-model="this.images[1]" />
                            <button type="button" class="add-button" @click="addInput">+</button>
                            <button type="button" class="remove-button" @click="removeInput(1)">-</button>
                        </div>

                        <div class="row">
                            <input class="inputText" placeholder="Url da Imagem" v-model="this.images[2]" />
                            <button type="button" class="add-button" @click="addInput">+</button>
                            <button type="button" class="remove-button" @click="removeInput(2)">-</button>
                        </div>

                        <div class="row">
                            <input class="inputText" placeholder="Url da Imagem" v-model="this.images[3]" />
                            <button type="button" class="add-button" @click="addInput">+</button>
                            <button type="button" class="remove-button" @click="removeInput(3)">-</button>
                        </div>

                        <div class="row">
                            <input class="inputText" placeholder="Url da Imagem" v-model="this.images[4]" />
                            <button type="button" class="add-button" @click="addInput">+</button>
                            <button type="button" class="remove-button" @click="removeInput(4)">-</button>
                        </div>



                    </div>
                    <small>
                        <strong>INSEIR APENAS O ID DO VIDEO DO YOUTUBE PARA ADICIONAR O VÍDEO. POR EXEMPLO: O LINK DO VIDEO É: https://www.youtube.com/watch?v=ASDASaJHGwER</strong>
                    </small>

                    <small>
                        <strong>O "ASDASaJHGwER" SERÁ O ID DO VÍDEO, E ISTO QUE DEVERÁ SER ADICIONADO NOS CAMPOS DE URL DE VIDEO ABAIXO.</strong>
                    </small>

                    <small>
                        Link de vídeo curto:
                    </small>
                    <input class="inputText" v-model="this.prod.shortVideoUrl" />

                    <small>
                        Link de vídeo longo:
                    </small>
                    <input class="inputText" v-model="this.prod.longVideoUrl" />

                    <div class="row" style="justify-content: space-between;">
                        <div class="col" style="width: 48%;">
                            <small>
                                Quantidade do estoque:
                            </small>
                            <input type="number" class="inputText" min="0" max="99"
                                oninput="if(this.value>99){this.value='99';}else if(this.value<0){this.value='0';}"
                                @keydown="$event => ['e', 'E', '+', '-'].includes($event.key) && $event.preventDefault()"
                                v-model="this.prod.stock" />
                        </div>
                        <div class="col" style="width: 48%;">
                            <small>
                                Categorias:
                            </small>
                            <select class="inputText" v-model="this.prod.categoryId">
                                <option disabled value="">Selecione uma categoria...</option>
                                <option v-for="option in categorias" :value="option">{{ option }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="row submit-container">
                        <button class="purpleButton" :disabled="!this.prod.id" @click="saveExist">Salvar
                            Modificações</button>
                        <button class="purpleButton" type='submit'  @click="saveNew">Adicionar novo produto</button>
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
    beforeMount() {
        this.categorias = this.getCategorias();
        this.getProdutos().then((result) => {
            this.produtos = result.data
        });

    },
    data() {
        return {
            produtos: [],
            categorias: [],
            picsLimit: 6,
            prod: {},
            prodIndex: null,
            images: [],
            data: {}
        }
    },
    methods: {
        getCategorias() {
            return [1, 2, 3];
        },
        async getProdutos() {

            const url = `${baseApiUrl}/products`

            try {
                const request = await axios.get(url)
                return request

            } catch (error) {
                console.log(error)
            }

            // console.log(request)




            // return [
            //     {
            //         idProduto: 1124,//Apagar
            //         nome: 'Teste',
            //         valor: 12.5,
            //         descricaoCurta: 'TTTTTTTTT',
            //         descricaoLonga: 'TTTTTTTTT',
            //         linkVideoCurto: 'TTTTTTTTT',
            //         linkVideoLongo: 'TTTTTTTTT',
            //         quantidade: 12,
            //         categoria: 'A',
            //         prodPics: ["/img/prod1.svg"],
            //     },
            //     {
            //         idProduto: 1125,//Apagar
            //         nome: 'Teste B',
            //         valor: 12.6,
            //         descricaoCurta: 'TTTTTTTTT',
            //         descricaoLonga: 'TTTTTTTTT',
            //         linkVideoCurto: 'TTTTTTTTT',
            //         linkVideoLongo: 'TTTTTTTTT',
            //         quantidade: 12,
            //         categoria: 'A',
            //         prodPics: ["/img/prod2.svg"],
            //     },
            //     {
            //         idProduto: 1126,//Apagar
            //         nome: 'Teste C',
            //         valor: 12.7,
            //         descricaoCurta: 'TTTTTTTTT',
            //         descricaoLonga: 'TTTTTTTTT',
            //         linkVideoCurto: 'TTTTTTTTT',
            //         linkVideoLongo: 'TTTTTTTTT',
            //         quantidade: 12,
            //         categoria: 'A',
            //         prodPics: ["/img/prod3.svg"],
            //     },
            //     {
            //         idProduto: 1124,//Apagar
            //         nome: 'Teste',
            //         valor: 12.5,
            //         descricaoCurta: 'TTTTTTTTT',
            //         descricaoLonga: 'TTTTTTTTT',
            //         linkVideoCurto: 'TTTTTTTTT',
            //         linkVideoLongo: 'TTTTTTTTT',
            //         quantidade: 12,
            //         categoria: 'A',
            //         prodPics: ["/img/prod1.svg"],
            //     },
            //     {
            //         idProduto: 1125,//Apagar
            //         nome: 'Teste B',
            //         valor: 12.6,
            //         descricaoCurta: 'TTTTTTTTT',
            //         descricaoLonga: 'TTTTTTTTT',
            //         linkVideoCurto: 'TTTTTTTTT',
            //         linkVideoLongo: 'TTTTTTTTT',
            //         quantidade: 12,
            //         categoria: 'A',
            //         prodPics: ["/img/prod2.svg"],
            //     },
            //     {
            //         idProduto: 1126,//Apagar
            //         nome: 'Teste C',
            //         valor: 12.7,
            //         descricaoCurta: 'TTTTTTTTT',
            //         descricaoLonga: 'TTTTTTTTT',
            //         linkVideoCurto: 'TTTTTTTTT',
            //         linkVideoLongo: 'TTTTTTTTT',
            //         quantidade: 12,
            //         categoria: 'A',
            //         prodPics: ["/img/prod3.svg"],
            //     }];
        },
        selectProduct(produto, index) {
            this.prod = {}
            this.prod = produto;
            this.images = produto.images;
            this.prodIndex = index;
            console.log(this.prod)
        },
        async removeProduct(index) {
            if (confirm("Tem certeza que quer remover o produto?")) {
                console.log(this.produtos[index].id)
                this.produtos.splice(index, 1);
                const url = `${baseApiUrl}/products/`+this.produtos[index].id
                try {
                    await axios.delete(url)
                    alert("Produto Excluido Com Sucesso!")
                } catch (error) {
                    alert("Erro ao Excluir Produto", error)
                }
            }
        },
        reader(file, callback) {
            const fr = new FileReader();
            fr.onload = () => callback(null, fr.result);
            fr.onerror = (err) => callback(err);
            fr.readAsDataURL(file);
        },
        // addProdPic(event) {
        //     let input = event.target

        //     if (input.files && input.files[0]) {
        //         for (let i = 0; i < input.files.length; i++) {
        //             this.reader(input.files[i], (err, res) => {
        //                 if (this.prod.prodPics.length < this.picsLimit) {
        //                     this.prod.prodPics.push(res)
        //                 }
        //                 //console.log(imageFile); // Base64 `data:image/...` String result.
        //             });
        //         }
        //     }
        // },
        // removePic(index) {
        //     this.prod.prodPics.splice(index, 1);
        // },
        addInput() {
            this.images.push('');
            console.log(this.images)
            alert('adicionado!')
        },
        removeInput(index) {
            this.images.splice(index, 1);
            console.log("indice" + index)
            console.log(this.images)
            alert('removido!')
        },
        async saveExist(event, id) {
            event.preventDefault()
            if (confirm("Deseja salvar as alterações no produto?")) {
                this.produtos[this.prodIndex] = this.prod
                this.prod.images = this.images;
                if (this.prod.id) {
                    const url = `${baseApiUrl}/products/` + this.prod.id
                    try {
                        await axios.put(url, this.prod)
                        alert("Produto Salvo Com Sucesso!")
                    } catch (error) {
                        console.log(error.response.data.message)
                        alert(error.response.data.message)   
                    }
                }
            }
        },
        async saveNew(event) {
            event.preventDefault()
            if ((this.prod.nome != '') && (this.prod.valor != 0) && (this.prod.descricaoCurta != '')
                && (this.prod.descricaoLonga != '') && (this.prod.stock != 0) && (this.prod.linkVideoCurto != '')
                && (this.prod.linkVideoLongo != '') && (this.prod.categoria != '')) {

                if (confirm("Deseja salvar um novo produto?")) {

                    const url = `${baseApiUrl}/products`


                    // this.data.push(this.prod,this.inputs)
                    this.data = this.prod
                    this.data.images = this.images


                    try {
                        await axios.post(url, this.data)

                    } catch (error) {
                        console.log(error.response.data)
                        alert(error.response.data.message)
                    }

                    // this.produtos.push(this.prod);
                    this.prod = {}
                }
            } else {
                console.log(error.response.data.message)
                alert(error.response.data.message)
            }
        },
        async getItemDetails() {
            const id = this.$route.params.id
            const url = `${baseApiUrl}/product-details/${id}`
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
<style scoped>
.prod-list {
    gap: 1rem;
    margin: 2rem;
    height: 26rem;
    overflow-x: hidden;
    overflow-y: scroll;
    border-bottom: #626262 0.2rem solid;
}

.prod-line {
    background-color: #D9D9D9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
}

.prod-line img {
    height: 6rem;
    width: 6rem;
}

.prod-line span {
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

.form-start {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

textarea {
    resize: vertical;
}

.form-start textarea {
    min-height: 10rem;
    padding: 0.6rem;
}

.prod-images {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 1rem;
}

.btn {
    background-color: #A0A0A0;
    font-size: 9pt;
    padding: 1rem;
    border-radius: 0.2rem;
    box-shadow: inset 0px 0px 0.2rem 0px rgb(47, 47, 47);
    margin: 1rem;
}

.input-image {
    margin: inherit;
    text-align: initial;
    display: flex;
    flex-direction: column;
}

.input-image h2 {
    padding: 0rem 1rem 1rem 1rem;
}

.input-image input {
    display: none;
}

.image-list {
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

.added-image {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
}

.added-image img {
    max-width: 14rem;
    min-width: 14rem;
    max-height: 14rem;
    border: 1px solid rgba(0, 0, 0, 0.50);
}

.added-image button {
    border-radius: 100%;
    width: 2rem;
    height: 2rem;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.50);
}

.submit-container button {
    margin: 10px;
    min-width: 2rem;
    min-height: 3rem;
    padding: 0.5rem 2rem 0.5rem 2rem;
    border-radius: 0.4rem;
    background-image: linear-gradient(#bfc42d, #9f9a10);
    box-shadow: 0rem 0.1rem 0.4rem 0rem rgb(0, 0, 0, 0.25);
    font-size: 14pt;
    font-family: Lato;
    color: white;
    border: none;
    cursor: pointer;
}

.submit-container button:active {
    background-image: linear-gradient(#a4a631, #d6d852);
}

.submit-container button:disabled {
    filter: grayscale(0.9);
    pointer-events: none;
}

.add-button {
    margin: 10px;
    min-width: 1rem;
    min-height: 1.5rem;
    padding: 0.5rem 2rem 0.5rem 2rem;
    border-radius: 0.4rem;
    background-image: linear-gradient(#bfc42d, #9f9a10);
    box-shadow: 0rem 0.1rem 0.4rem 0rem rgb(0, 0, 0, 0.25);
    font-size: 14pt;
    font-family: Lato;
    color: white;
    border: none;
    cursor: pointer;
}

.remove-button {
    margin: 10px;
    min-width: 1rem;
    min-height: 1.5rem;
    padding: 0.5rem 2rem 0.5rem 2rem;
    border-radius: 0.4rem;
    background-image: linear-gradient(180deg, #D85252, #9C4444);
    box-shadow: 0rem 0.1rem 0.4rem 0rem rgb(0, 0, 0, 0.25);
    font-size: 14pt;
    font-family: Lato;
    color: white;
    border: none;
    cursor: pointer;
}

.inputTextSmall {
    border-radius: 0.5rem;
    border: solid white 1px;
    background-color: #EEEEEE;
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
    height: 4rem;
    width: 8rem;
    padding: 0.8rem 1.2rem;
    font-size: 1.6rem;
    font-family: 'Inter', sans-serif;
    font-weight: 500;

}


.dimensions-section {
    font-size: 11pt;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-flow: column;
    width: 100%;
    margin: 1rem 1rem 1rem 0rem;


}

.row {
    align-items: center;
}

.dimensions-row {
    width: 100%;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.edit-btn {
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
    background-image: linear-gradient(180deg, #559C44, #5CD852);
}

.exclude-btn {
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
    background-image: linear-gradient(180deg, #9C4444, #D85252);
}
</style>