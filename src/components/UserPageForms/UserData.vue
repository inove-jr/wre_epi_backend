<template>
    <section class="form-camp">
                <div class="basic-info">
                    <div class="profile-upload">
                        <label for="profile-picture">
                            <img class="iconProfile" v-bind:class="{pointer : this.editing}" v-bind:src='this.imageFile'>
                        </label>
                        <input v-if="this.editing" type="file" id="profile-picture" accept="image/*" @change="changeProfilePic($event)">
                    </div>
                    <div class="data">
                        <div>
                            <div>
                                <label for="name">
                                    <h3>Nome</h3>
                                </label>
                                <h3 id="name">
                                    <input v-if="this.editing" class="input-camp" type="text" v-model="this.name">
                                    <span v-if="!this.editing">{{ this.name }}</span>
                                </h3>
                            </div>
                            <div>
                                <label for="email">
                                    <h3>E-mail</h3>
                                </label>
                                <h3 id="email">
                                    <input v-if="this.editing" class="input-camp" type="email" v-model="this.email">
                                    <span v-if="!this.editing">{{ this.email }}</span>
                                </h3>
                            </div>
                            <div>
                                <h3 for="empresa">
                                    Empresa
                                </h3>
                                <h3 id="empresa">
                                    <input v-if="this.editing" class="input-camp" type="text" v-model="this.empresa">
                                    <span v-if="!this.editing">{{ this.empresa }}</span>
                                </h3>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h3 for="cpf" :class="{invalid : invalidCpf}">
                                    CPF
                                </h3>
                                <h3 id="cpf">
                                    <input v-if="this.editing" class="input-camp" type="text" maxlength="14" v-model="this.cpf" @input="this.cpf = this.validateCpf($event.target)">
                                    <span v-if="!this.editing">{{ this.cpf }}</span>
                                </h3>
                            </div>
                            <div>
                                <label for="date">
                                    <h3>Nascimento</h3>
                                </label>
                                <h3 id="date">
                                    <input v-if="this.editing" class="input-camp" type="date" v-model="this.date">
                                    <span v-if="!this.editing">{{ this.dateFormat() }}</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div class="edit">
                        <img v-if="!this.editing" @click="this.edit()" src="../../assets/edit.svg">
                        <img v-if="this.editing" @click="this.save()" src="../../assets/save.svg">
                    </div>
                </div>
                
                <div class="form">
                    <div style="margin-left: 15%;">
                        <h3 for="address-form" id="lblDados">Endereço</h3>
                    </div>
                    <form name="address-form" class="address-form">

                        <div class="col" id="formStance">
                            <div class="col" style="padding-left: 1rem; flex-wrap:wrap; row-gap: 1rem;">
                                <div class="row form-row">
                                    <div class="col paddingForm">
                                        <label class="lblInput">Endereço:</label>
                                        <input id="endereco" type="text" class="inputText" v-model="this.endereco_form.endereco"/>
                                    </div>
                                    <div class="col paddingForm">
                                        <label class="lblInput">Número:</label>
                                        <input id="numero" type="number" class="inputText" v-model="this.endereco_form.numero"/>
                                    </div>
                                </div>

                                <div class="row form-row"> 
                                    <div class="col paddingForm">
                                        <label class="lblInput">Cidade:</label>
                                        <input id="cidade" type="text" class="inputText" v-model="this.endereco_form.cidade"/>
                                    </div>

                                    <div class="col paddingForm">
                                        <label class="lblInput">Bairro:</label>
                                        <input id="bairro" type="text" class="inputText" v-model="this.endereco_form.bairro"/>
                                    </div>
                                    
                                    <div class="col paddingForm">
                                        <label class="lblInput">Complemento:</label>
                                        <input id="complemento" type="text" class="inputText" v-model="this.endereco_form.complemento"/>
                                    </div>
                                </div>

                                <div class="row form-row">
                                    <div class="col paddingForm">
                                        <label class="lblInput">UF:</label>
                                        <input id="uf" type="text" class="inputText" maxlength="2" v-model="this.endereco_form.uf"/>
                                    </div>
            
                                    <div class="col paddingForm">
                                        <label class="lblInput">CEP:</label>
                                        <input id="cep" type="text" class="inputText" v-model="this.endereco_form.cep"/>
                                    </div>
                                </div>
                           
                            </div>

                            <div class="paddingForm">
                                <div class="col" id="save_endereco">
                                    <button class="endSave" @click="saveEndereco()">Salvar Endereço</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
</template>
<script>


export default {
    name: 'UserData',
    beforeMount(){
        this.getData()
    },  
    data() {
        return {
            name: '',
            email: '',
            date: '',
            empresa: '',
            cpf: '',
           /* previous: {
                name: '',
                email: '',
                date: '',
                imageFile: ''
            },*/
            endereco_form: {
                endereco: '',
                numero: 0,
                cidade: '',
                bairro: '',
                complemento: '',
                uf: '',
                cep: ''
            },
            endereco_saved: {
                endereco: '',
                numero: 0,
                cidade: '',
                bairro: '',
                complemento: '',
                uf: '',
                cep: ''
            },
            editing: false,
            invalidCpf: false,
            imageFile: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjc3IiBoZWlnaHQ9IjI3NyIgdmlld0JveD0iMCAwIDI3NyAyNzciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cGF0aCBkPSJNMTM5LjA1NCAyMzIuNjhDODYuOTc4IDIzMi42OCA0NC44NzQgMTkwLjU3NiA0NC44NzQgMTM4LjVDNDQuODc0IDg2LjQyNDEgODYuOTc4IDQ0LjMyMDEgMTM5LjA1NCA0NC4zMjAxQzE5MS4xMyA0NC4zMjAxIDIzMy4yMzQgODYuNDI0MSAyMzMuMjM0IDEzOC41QzIzMy4yMzQgMTkwLjU3NiAxOTAuNTc2IDIzMi42OCAxMzkuMDU0IDIzMi42OFpNMTM5LjA1NCA1NS40MDAxQzkzLjA3MiA1NS40MDAxIDU1Ljk1NCA5Mi41MTgxIDU1Ljk1NCAxMzguNUM1NS45NTQgMTg0LjQ4MiA5My4wNzIgMjIxLjYgMTM5LjA1NCAyMjEuNkMxODUuMDM2IDIyMS42IDIyMi4xNTQgMTg0LjQ4MiAyMjIuMTU0IDEzOC41QzIyMi4xNTQgOTIuNTE4MSAxODQuNDgyIDU1LjQwMDEgMTM5LjA1NCA1NS40MDAxWiIgZmlsbD0iYmxhY2siLz4NCjxwYXRoIGQ9Ik04NC43NjIgMjA2LjY0Mkw3NC43OSAyMDIuMjFDNzcuNTYgMTk1LjU2MiA4Ni40MjQgMTkxLjY4NCA5NS44NDIgMTg3LjI1MkMxMDUuMjYgMTgyLjgyIDExNi44OTQgMTc3LjgzNCAxMTYuODk0IDE3MS43NFYxNjMuNDNDMTEzLjU3IDE2MC42NiAxMDguMDMgMTU0LjU2NiAxMDYuOTIyIDE0NS43MDJDMTA0LjE1MiAxNDIuOTMyIDk5LjcyIDEzNy45NDYgOTkuNzIgMTMxLjI5OEM5OS43MiAxMjcuNDIgMTAxLjM4MiAxMjQuMDk2IDEwMi40OSAxMjEuODhDMTAxLjM4MiAxMTcuNDQ4IDEwMC4yNzQgMTA5LjEzOCAxMDAuMjc0IDEwMi40OUMxMDAuMjc0IDgwLjg4NCAxMTUuMjMyIDY2LjQ4IDEzOS4wNTQgNjYuNDhDMTQ1LjcwMiA2Ni40OCAxNTQuMDEyIDY4LjE0MiAxNTguNDQ0IDczLjEyOEMxNjguOTcgNzUuMzQ0IDE3Ny44MzQgODcuNTMyIDE3Ny44MzQgMTAyLjQ5QzE3Ny44MzQgMTExLjkwOCAxNzYuMTcyIDExOS42NjQgMTc1LjA2NCAxMjMuNTQyQzE3Ni4xNzIgMTI1LjIwNCAxNzcuMjggMTI3Ljk3NCAxNzcuMjggMTMxLjI5OEMxNzcuMjggMTM4LjUgMTczLjQwMiAxNDMuNDg2IDE3MC4wNzggMTQ1LjcwMkMxNjguOTcgMTU0LjU2NiAxNjMuOTg0IDE2MC4xMDYgMTYwLjY2IDE2Mi44NzZWMTcxLjc0QzE2MC42NiAxNzYuNzI2IDE3MC42MzIgMTgwLjYwNCAxNzkuNDk2IDE4My45MjhDMTkwLjAyMiAxODcuODA2IDIwMS4xMDIgMTkyLjIzOCAyMDQuOTggMjAxLjEwMkwxOTQuNDU0IDIwNC45OEMxOTIuNzkyIDIwMC41NDggMTgzLjkyOCAxOTcuMjI0IDE3NS42MTggMTk0LjQ1NEMxNjMuNDMgMTkwLjAyMiAxNDkuNTggMTg1LjAzNiAxNDkuNTggMTcyLjI5NFYxNTcuODlMMTUyLjM1IDE1Ni4yMjhDMTUyLjM1IDE1Ni4yMjggMTU4Ljk5OCAxNTEuNzk2IDE1OC45OTggMTQyLjkzMlYxMzkuMDU0TDE2Mi4zMjIgMTM3LjM5MkMxNjIuODc2IDEzNy4zOTIgMTY1LjY0NiAxMzUuNzMgMTY1LjY0NiAxMzEuMjk4QzE2NS42NDYgMTMwLjE5IDE2NC41MzggMTI4LjUyOCAxNjMuOTg0IDEyNy45NzRMMTYxLjc2OCAxMjUuNzU4TDE2Mi44NzYgMTIyLjk4OEMxNjIuODc2IDEyMi45ODggMTY1LjY0NiAxMTQuMTI0IDE2NS42NDYgMTAzLjA0NEMxNjUuNjQ2IDkyLjUxOCAxNTkuNTUyIDg0Ljc2MiAxNTQuNTY2IDg0Ljc2MkgxNTEuMjQyTDE0OS41OCA4MS45OTJDMTQ5LjU4IDc5Ljc3NiAxNDUuNzAyIDc3LjU2IDEzOS4wNTQgNzcuNTZDMTIxLjg4IDc3LjU2IDExMS4zNTQgODYuOTc4IDExMS4zNTQgMTAyLjQ5QzExMS4zNTQgMTA5LjY5MiAxMTQuMTI0IDEyMS44OCAxMTQuMTI0IDEyMS44OEwxMTQuNjc4IDEyNC42NUwxMTIuNDYyIDEyNy40MkMxMTEuOTA4IDEyNy40MiAxMTAuOCAxMjkuMDgyIDExMC44IDEzMS4yOThDMTEwLjggMTM0LjA2OCAxMTQuMTI0IDEzNy4zOTIgMTE1Ljc4NiAxMzguNUwxMTguMDAyIDE0MC4xNjJWMTQyLjkzMkMxMTguMDAyIDE1MS4yNDIgMTI1LjIwNCAxNTUuNjc0IDEyNS4yMDQgMTU2LjIyOEwxMjcuOTc0IDE1Ny44OVYxNzIuMjk0QzEyNy45NzQgMTg1LjU5IDExMy41NyAxOTIuMjM4IDEwMC4yNzQgMTk3Ljc3OEM5NC4xOCAxOTkuOTk0IDg1Ljg3IDIwMy44NzIgODQuNzYyIDIwNi42NDJaIiBmaWxsPSJibGFjayIvPg0KPC9zdmc+DQo=',
        }
    },
    methods: {
        getData(){
            this.name = "Juselino Carandino Justiniano"
            this.email = "Juseli.randino.tiniano@somemail.com.br"
            this.date = "2022-02-02"
            this.empresa = "MeCompre Inc."
            this.cpf = "123.456.789-99"

            this.endereco_saved = {
                endereco: 'Rua Dos Tolos',
                numero: 0,
                cidade: 'Lugar Nenhum',
                bairro: 'Vazio',
                complemento: 'Casa',
                uf: 'ND',
                cep: '000.000.000-99'
            }
            
            this.endereco_form = this.endereco_saved
        },
        saveEndereco(){
            this.endereco_saved = this.endereco_form
        },
        reader(file, callback) {
            const fr = new FileReader();
            fr.onload = () => callback(null, fr.result);
            fr.onerror = (err) => callback(err);
            fr.readAsDataURL(file);
        },
        changeProfilePic(event){
            let input = event.target

            if (input.files && input.files[0]) {
                this.reader(input.files[0], (err, res) => {
                    this.imageFile = res
                    //console.log(imageFile); // Base64 `data:image/...` String result.
                });
            }
        },
        edit(){
            this.editing = true
            /*this.previous.name = this.name
            this.previous.email = this.email
            this.previous.date = this.date
            this.previous.imageFile = this.imageFile*/
        },
        save(){
            this.editing = false
        },
        dateFormat(){
            let D = new Date(this.date)
            return (D.getDay() <= 9 ? '0'+D.getDay().toString() :D.getDay().toString()) + '/' + (D.getMonth()+1 <= 9 ? '0'+(D.getMonth()+1).toString() : (D.getMonth()+1).toString()) + '/' + D.getFullYear().toString()
        },
        
        validateCpf(input){
            input.value = input.value.replace(/[^0-9.]/g, ''); 

            if ((input.value  == "00000000000") ||
            (input.value  == "11111111111") ||
            (input.value  == "22222222222") || (input.value  == "33333333333") ||
            (input.value  == "44444444444") || (input.value  == "55555555555") ||
            (input.value  == "66666666666") || (input.value  == "77777777777") ||
            (input.value  == "88888888888") || (input.value  == "99999999999") ||
            (input.value.length != 11)) {this.invalidCpf = true;}
            else{
                try {
                    let sm = 0;
                    let peso = 10;
                    let r = '';
                    let num = 0;
                    let dig10 = '';
                    let dig11 = '';
                    let i = 0;

                    for (i=0; i<9; i++) {
                        // converte o i-esimo caractere do CPF em um numero:
                        // por exemplo, transforma o caractere '0' no inteiro 0
                        num = parseInt(input.value[i]);
                        sm = sm + (num * peso);
                        peso = peso - 1;
                    }

                    r = 11 - (sm % 11);
                    if ((r == 10) || (r == 11))
                        dig10 = '0';
                    else dig10 = r.toString(); // converte no respectivo caractere numerico

                // Calculo do 2o. Digito Verificador
                    sm = 0;
                    peso = 11;
                    for(i=0; i<10; i++) {
                        num = parseInt(input.value[i]);
                        sm = sm + (num * peso);
                        peso = peso - 1;
                    }

                    r = 11 - (sm % 11);
                    if ((r == 10) || (r == 11))
                        dig11 = '0';
                    else dig11 = r.toString();

                // Verifica se os digitos calculados conferem com os digitos informados.
                    if ((dig10 == input.value[i]) && (dig11 == input.value[i])) this.invalidCpf = false
                    else this.invalidCpf = true;
                } catch(err) {
                    this.invalidCpf = true;
                }
            }

            input.value = input.value.replace(/^([\d]{3})([\d]{3})([\d]{3})([\d]{2})$/, "$1.$2.$3-$4");
            return input.value
        },
    },
}
</script>

<style scoped>
h3{
    margin-top: 0;
    margin-bottom: 0.8rem;
    text-align: initial;
    font-size: 11pt;
}
h3 span{
    font-weight: 400;
}
.data{
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 2rem;
}
.form-camp{
    margin: auto;
}
.iconProfile{
    filter: drop-shadow(2px 3px 3px rgba(0, 0, 0, 0.6));
    border-radius: 100%;
    margin: 1rem;
    max-height: 28rem;
    min-height: 28rem;
    max-width: 28rem;
    min-width: 28rem;
}
.pointer{
    cursor: pointer;
}

.profile-upload>input {
    display: none;
}

.basic-info{
    display: flex;
    align-items: center;
}
.data input{
    font-size: 11pt;
    min-width: 34rem;
}
.edit{
    cursor: pointer;
    margin-bottom: 16%;
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

.invalid{
  box-shadow: 0 0 10px 1px red;
}


@media screen and (max-width: 800px) {
    .basic-info{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-inline: 2rem;
    }
    .edit{
        position:sticky;
        z-index: 10;
        bottom: 68%;
        left: 98%;    
    }
}

.form{
    display: flex;
    flex-direction: column;
    align-items:flex-start;
    padding: 1rem 3rem 1rem 3rem;
}

.paddingForm{
    min-width: 33%;
    width: -webkit-fill-available;
    text-align: left;
    font-size: 9pt;
}

.address-form{
    margin: auto;
}

.form-row{
    column-gap: 0.6rem;
}


.endSave{
    margin: auto;
    width: 30%;
    height: 4rem;
    margin-top: 2rem;
    border-radius: 0.5rem;
    border: none;
    background-color: rgb(0, 167, 0);
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem green, 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
    padding: 0.8rem 1.2rem;
    font-size: 1.6rem;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    color: white;
    cursor: pointer;
}

.endSave:active{
    background-color: rgb(0, 208, 0);
    box-shadow: inset 0rem 0.1rem 0.5rem 0.2rem rgb(1, 158, 1), 0rem 0.1rem 0.5rem 0.2rem rgb(0, 0, 0, 0.25);
}
</style>