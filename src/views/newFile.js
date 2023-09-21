import { baseApiUrl } from '@/global';
import axios from "axios";

export default (await import('vue')).defineComponent({
components: {
SessaoProdutos,
BotaoFaleConosco,
HeaderComponent,
CarrouselComponent,
FooterComponent,
},
setup() {
// const { cookies } = useCookies();
// return { cookies };
},
data() {
return {
produtos: [
{
nome: "Nome do produto 1 - Capacete do tipo",
preco: 100,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 2 - Capacete do tipo",
preco: 200,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 3 - Capacete do tipo",
preco: 300,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 4 - Capacete do tipo",
preco: 400,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 5 - Capacete do tipo",
preco: 500,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 6 - Capacete do tipo",
preco: 600,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 7 - Capacete do tipo",
preco: 700,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 8 - Capacete do tipo",
preco: 800,
parcelas: 4,
imagem: "/img/produto.svg",
}
],
sessao: "Seção...",
sessao1: "Capacetes de Proteção",
sessao2: "Visores de Proteção",
sessao3: "Luvas de Proteção",
produtos1: [
{
nome: "Nome do produto 1 - Capacete do tipo",
preco: 100,
parcelas: 4,
imagem: '../assets/produto.svg',
},
{
nome: "Nome do produto 2 - Capacete do tipo",
preco: 200,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 3 - Capacete do tipo",
preco: 300,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 4 - Capacete do tipo",
preco: 400,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 5 - Capacete do tipo",
preco: 500,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 6 - Capacete do tipo",
preco: 600,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 7 - Capacete do tipo",
preco: 700,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 8 - Capacete do tipo",
preco: 800,
parcelas: 4,
imagem: "/img/produto.svg",
}
],
produtos2: [
{
nome: "Nome do produto 1 - Capacete do tipo",
preco: 100,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 2 - Capacete do tipo",
preco: 200,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 3 - Capacete do tipo",
preco: 300,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 4 - Capacete do tipo",
preco: 400,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 5 - Capacete do tipo",
preco: 500,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 6 - Capacete do tipo",
preco: 600,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 7 - Capacete do tipo",
preco: 700,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 8 - Capacete do tipo",
preco: 800,
parcelas: 4,
imagem: "/img/produto.svg",
}
],
produtos3: [
{
nome: "Nome do produto 1 - Capacete do tipo",
preco: 100,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 2 - Capacete do tipo",
preco: 200,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 3 - Capacete do tipo",
preco: 300,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 4 - Capacete do tipo",
preco: 400,
parcelas: 4,
imagem: "../assets/produto.svg",
},
{
nome: "Nome do produto 5 - Capacete do tipo",
preco: 500,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 6 - Capacete do tipo",
preco: 600,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 7 - Capacete do tipo",
preco: 700,
parcelas: 4,
imagem: "/img/produto.svg",
},
{
nome: "Nome do produto 8 - Capacete do tipo",
preco: 800,
parcelas: 4,
imagem: "/img/produto.svg",
}
],
info: []
};
},
methods: {
async getItemsSection1(categoryId) {
const url = `${baseApiUrl}/categories/${categoryId}/products-cart`;
await axios.get(url).then(response => {
console.log(response.data);
this.produtos1 = response.data;
})
.catch(error => {
console.log(error);
});
},
async getItemsSection2(categoryId) {
const url = `${baseApiUrl}/categories/${categoryId}/products-cart`;
await axios.get(url).then(response => {
//console.log(response.data)
this.produtos2 = response.data;
})
.catch(error => {
console.log(error);
});
},
async getItemsSection3(categoryId) {
const url = `${baseApiUrl}/categories/${categoryId}/products-cart`;
await axios.get(url).then(response => {
//console.log(response.data)
this.produtos3 = response.data;
})
.catch(error => {
console.log(error);
});
}
},
mounted() {

this.getItemsSection1(1);
this.getItemsSection2(3);
this.getItemsSection3(4);

}
});
