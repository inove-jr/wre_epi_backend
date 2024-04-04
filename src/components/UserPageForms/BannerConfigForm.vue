<template>
    <div class="form">
        <form class="catForm">
            <h3>CONFIGURAÇÃO DE BANNER 1</h3>
            <div class="linkString">
                <label for="linkString">Link do Banner 1(Link para onde será direcionado o usuário)</label>
                <input class="input-camp" type="text" name="linkString" v-model="this.banners[0].banner_link">
            </div>
            <div class="prod-images">
                <section class="input-image">
                    <p>Link Imagen do Banner 1(URL Imagem Banner )</p>
                    <!-- <div id="bannerForm">
                        <div>
                            <label for="prodImages" class="btn">Selecione a imagem do banner 1...</label>
                            <input type="file" id="prodImages" name="prodImages" accept="image/*" @change="addBanner1Img($event)">
                        </div>
                        <section class="bannerImage">
                            <img :src="this.banner1.image" alt="figura">
                        </section>
                    </div> -->
                </section>
                <input class="input-camp" type="text" name="linkString" v-model="this.banners[0].banner_image_url">
            </div>
        </form>

        <form class="catForm">
            <div style="flex-direction: row;">
                <h3>CONFIGURAÇÃO DE BANNER 2</h3>
                <!-- <button class="repeatB1" @click='repeat1'>Repetir Banner 1</button> -->
            </div>
            <div class="linkString">
                <label for="linkString">Link do Banner 2(Link para onde será direcionado o usuário)</label>
                <input class="input-camp" type="text" name="linkString" v-model="this.banners[1].banner_link">
            </div>
            <div class="prod-images">
                <section class="input-image">
                    <p>Link Imagen do Banner 2</p>
                    <!-- <div id="bannerForm">
                        <div>
                            <label for="prodImages" class="btn">Selecione a imagem do banner 2...</label>
                            <input type="file" id="prodImages" name="prodImages" accept="image/*" @change="addBanner2Img($event)">
                        </div>
                        <section class="bannerImage">
                            <img :src="this.banner2.image" alt="figura">
                        </section>
                    </div> -->
                </section>
                <input class="input-camp" type="text" name="linkString" v-model="this.banners[1].banner_image_url">
            </div>
        </form>
        <button class="submit" @click="saveBanners()">Salvar</button>

        <form class="catForm">
            <h3>CASO NÃO QUERIA UTILIZAR TODOS OS SLIDES BASTA DEIXAR OS CAMPOS EM BRANCO QUE NAO IRÁ UTILIZAR</h3>
            <h3>CONFIGURAÇÃO CARROUSEL SLIDE 1</h3>
            <div class="linkString">
                <label for="linkString">Link do Slide 1(Link para onde será direcionado o usuário)</label>
                <input class="input-camp" type="text" name="linkString"
                    v-model="this.carrousel[0].carrousel_image_link">
            </div>
            <div class="prod-images">
                <section class="input-image">
                    <p>Link Slide 1(URL Imagem Banner )</p>
                    <!-- <div id="bannerForm">
                        <div>
                            <label for="prodImages" class="btn">Selecione a imagem do banner 1...</label>
                            <input type="file" id="prodImages" name="prodImages" accept="image/*" @change="addBanner1Img($event)">
                        </div>
                        <section class="bannerImage">
                            <img :src="this.banner1.image" alt="figura">
                        </section>
                    </div> -->
                </section>
                <input class="input-camp" type="text" name="linkString" v-model="this.carrousel[0].carrousel_image_url">
            </div>
        </form>

        <form class="catForm">
            <div style="flex-direction: row;">
                <h3>CONFIGURAÇÃO CARROUSEL SLIDE 2</h3>
                <!-- <button class="repeatB1" @click='repeat1'>Repetir Banner 1</button> -->
            </div>
            <div class="linkString">
                <label for="linkString">Link do Slide 2(Link para onde será direcionado o usuário)</label>
                <input class="input-camp" type="text" name="linkString"
                    v-model="this.carrousel[1].carrousel_image_link">
            </div>
            <div class="prod-images">
                <section class="input-image">
                    <p>Link Imagen do Banner 2</p>
                    <!-- <div id="bannerForm">
                        <div>
                            <label for="prodImages" class="btn">Selecione a imagem do banner 2...</label>
                            <input type="file" id="prodImages" name="prodImages" accept="image/*" @change="addBanner2Img($event)">
                        </div>
                        <section class="bannerImage">
                            <img :src="this.banner2.image" alt="figura">
                        </section>
                    </div> -->
                </section>
                <input class="input-camp" type="text" name="linkString" v-model="this.carrousel[1].carrousel_image_url">
            </div>
        </form>

        <form class="catForm">
            <h3>CONFIGURAÇÃO CARROUSEL SLIDE 3</h3>
            <div class="linkString">
                <label for="linkString">Link do Slide 3(Link para onde será direcionado o usuário)</label>
                <input class="input-camp" type="text" name="linkString"
                    v-model="this.carrousel[2].carrousel_image_link">
            </div>
            <div class="prod-images">
                <section class="input-image">
                    <p>Link Imagem do Slide 3(URL da Imagem do Banner )</p>
                    <!-- <div id="bannerForm">
                        <div>
                            <label for="prodImages" class="btn">Selecione a imagem do banner 1...</label>
                            <input type="file" id="prodImages" name="prodImages" accept="image/*" @change="addBanner1Img($event)">
                        </div>
                        <section class="bannerImage">
                            <img :src="this.banner1.image" alt="figura">
                        </section>
                    </div> -->
                </section>
                <input class="input-camp" type="text" name="linkString" v-model="this.carrousel[2].carrousel_image_url">
            </div>
        </form>

        <form class="catForm">
            <div style="flex-direction: row;">
                <h3>CONFIGURAÇÃO DE CARROUSEL SLIDE 4</h3>
                <!-- <button class="repeatB1" @click='repeat1'>Repetir Banner 1</button> -->
            </div>
            <div class="linkString">
                <label for="linkString">Link do Slide 4(Link para onde será direcionado o usuário)</label>
                <input class="input-camp" type="text" name="linkString"
                    v-model="this.carrousel[3].carrousel_image_link">
            </div>
            <div class="prod-images">
                <section class="input-image">
                    <p>Link Imagem do Slide 4</p>
                    <!-- <div id="bannerForm">
                        <div>
                            <label for="prodImages" class="btn">Selecione a imagem do banner 2...</label>
                            <input type="file" id="prodImages" name="prodImages" accept="image/*" @change="addBanner2Img($event)">
                        </div>
                        <section class="bannerImage">
                            <img :src="this.banner2.image" alt="figura">
                        </section>
                    </div> -->
                </section>
                <input class="input-camp" type="text" name="linkString" v-model="this.carrousel[3].carrousel_image_url">
            </div>
        </form>
        <form class="catForm">
            <div style="flex-direction: row;">
                <h3>CONFIGURAÇÃO DE CARROUSEL SLIDE 5</h3>
            </div>
            <div class="linkString">
                <label for="linkString">Link do Slide 5(Link para onde será direcionado o usuário)</label>
                <input class="input-camp" type="text" name="linkString"
                    v-model="this.carrousel[4].carrousel_image_link">
            </div>
            <div class="prod-images">
                <section class="input-image">
                    <p>Link Imagem do Slide 5</p>
                    <!-- <div id="bannerForm">
                        <div>
                            <label for="prodImages" class="btn">Selecione a imagem do banner 2...</label>
                            <input type="file" id="prodImages" name="prodImages" accept="image/*" @change="addBanner2Img($event)">
                        </div>
                        <section class="bannerImage">
                            <img :src="this.banner2.image" alt="figura">
                        </section>
                    </div> -->
                </section>
                <input class="input-camp" type="text" name="linkString" v-model="this.carrousel[4].carrousel_image_url">
            </div>
        </form>
        <button class="submit" @click="saveCarrousel()">Salvar</button>
    </div>
</template>
<script>
import { baseApiUrl } from '@/global';
import axios from 'axios';

export default {
    name: 'BannerConfigForm',
    beforeMount() {
        this.getBanners();
        this.getCarrousel();

        // this.banner1 = banners[0];
        // this.banner2 = banners[1];
    },
    data() {
        return {
            banners: [
                {
                    banner_image_url: " ",
                    banner_link: " "
                },
                {
                    banner_image_url: " ",
                    banner_link: " "
                }

            ],
            carrousel: [
                {
                    carrousel_image_url: "",
                    carrousel_image_link: " "
                },
                {
                    carrousel_image_url: " ",
                    carrousel_image_link: " "
                },
                {
                    carrousel_image_url: "",
                    carrousel_image_link: " "
                },
                {
                    carrousel_image_url: " ",
                    carrousel_image_link: " "
                },
                {
                    carrousel_image_url: "",
                    carrousel_image_link: " "
                }
            ]
        }
    },
    methods: {
        async getBanners() {
            //pegar banners no banco de dados       

            const url = `${baseApiUrl}/assets/banners`
            try {
                await axios.get(url).then(
                    response => {
                        if(response.data.length > 0){
                            this.banners=response.data
                        }
                    }
                )
                
            } catch (error) {
                
            }

        },
        async saveBanners() {
            const url = `${baseApiUrl}/assets/banners`
            this.data = this.banners
            console.log(this.data)

            if(confirm("Deseja Salvar as alterações nos banners?")){
                try {
                    await axios.put(url, this.data)
                    alert("Banners salvos com sucesso!");
    
                } catch (error) {
                    console.error('Erro ao Salvar Banner:', error);
                    throw error;
                }
            }
        },
        async saveCarrousel() {
            const url = `${baseApiUrl}/assets/carrousel`
            this.data = this.carrousel
            console.log(this.data)

            if(confirm("Deseja Salvar as alterações no carroussel?")){
                try {
                    await axios.put(url, this.data)
                    alert("Carrousel salvo com sucesso!");
    
                } catch (error) {
                    console.error('Erro ao Salvar Carroussel:', error);
                    throw error;
                }
            }
        },
        async getCarrousel() {

            const url = `${baseApiUrl}/assets/carrousel`
            await axios.get(url).then(
                response => {
                    if((response.data).length > 0){
                        this.carrousel = response.data
                    }
                }
            ).catch(error => {
                console.log(error)
            })

        },
        reader(file, callback) {
            const fr = new FileReader();
            fr.onload = () => callback(null, fr.result);
            fr.onerror = (err) => callback(err);
            fr.readAsDataURL(file);
        },
        addBanner1Img(event) {
            let input = event.target

            if (input.files && input.files[0]) {
                for (let i = 0; i < input.files.length; i++) {
                    this.reader(input.files[i], (err, res) => {
                        this.banner1.image = res
                    });
                }
            }
        },
        removeBanner1() {
            this.banner1.link = '';
            this.banner1.image = '';
        },
        addBanner2Img(event) {
            let input = event.target

            if (input.files && input.files[0]) {
                for (let i = 0; i < input.files.length; i++) {
                    this.reader(input.files[i], (err, res) => {
                        this.banner2.image = res
                    });
                }
            }
        },
        removeBanner2() {
            this.banner2.link = '';
            this.banner2.image = '';
        },
    },
}
</script>
<style>
.form {
    margin-block: 2rem;
}

.catForm {
    width: 70%;
    display: flex;
    flex-direction: column;
    text-align: left;
    font-size: 11pt;
    /* margin-block: 10%; */
    margin: 2rem 2rem 2rem 2rem;
    gap: 2rem;
}

.catForm div {
    display: flex;
    flex-direction: column;
}

.linkString input {
    min-height: 1rem;
    padding: 0.6rem;
}

.descCat textarea {
    min-height: 10rem;
    resize: vertical;
    padding: 0.6rem;
}

.submit {
    margin: auto;
    width: 15%;
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

.submit:active {
    background-color: #eccc48;
    border: none;
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem #a38200, 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
}

.input-camp {
    background-color: rgb(236, 236, 236);
    border-radius: 4px;
    min-height: 1rem;
    padding: 0.6rem;
    border: none;
    box-shadow: inset 0px 0px 6px 2px rgba(0, 0, 0, 0.25);
}

.input-camp:focus-visible {
    outline: none;
}

#bannerForm {
    display: flex;
    flex-direction: row;
}

.repeatB1 {
    margin-left: 4rem;
    padding: 1rem;
    font-size: 12pt;
    font-family: Lato;
    color: black;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    background-image: linear-gradient(#bfc42d, #9f9a10);
    box-shadow: 0rem 0.2rem 0.6rem 0rem rgb(0, 0, 0, 0.5);
}

.repeatB1:hover {
    background-image: linear-gradient(#a4a631, #d6d852);
}


.prod-images {
    display: flex;
    flex-direction: row;
    /* gap: 2rem;
    margin-top: 1rem; */
}

.btn {
    background-color: #A0A0A0;
    font-size: 9pt;
    padding: 1rem;
    border-radius: 0.2rem;
    box-shadow: inset 0px 0px 0.2rem 0px rgb(47, 47, 47);
    margin: 1rem 1rem 1rem 0rem;
    min-width: 25rem;
}

.input-image {
    margin: inherit;
    text-align: initial;
    display: flex;
    flex-direction: column;
}

.input-image input {
    display: none;
}

.bannerImage {
    border: 1px solid #000;
    background: rgba(217, 217, 217, 0.49);
    min-height: 20rem;
    width: 60rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: space-between;
    justify-content: center;
    gap: 2rem;
    padding: 1rem;
}

.bannerImage img {
    max-width: 14rem;
    min-width: 14rem;
    max-height: 28rem;
    border: 1px solid rgba(0, 0, 0, 0.50);
}
</style>