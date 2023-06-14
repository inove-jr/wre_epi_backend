<template>
    <section class="form-camp">
                <div class="basic-info">
                    <div class="profile-upload">
                        <label for="profile-picture">
                            <img class="iconProfile" v-bind:src='this.imageFile'>
                        </label>
                        <input type="file" id="profile-picture" accept="image/*" @change="changeProfilePic($event)">
                    </div>
                    <div class="data">
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
                            <label for="name">
                                <h3>Nascimento</h3>
                            </label>
                            <h3>
                                <input v-if="this.editing" class="input-camp" type="date" :value="this.date">
                                <span v-if="!this.editing">{{ this.date }}</span>
                            </h3>
                        </div>
                    </div>
                    <div class="edit">
                        <img v-if="!this.editing" @click="this.edit()" src="../../assets/edit.svg">
                        <img v-if="this.editing" @click="this.save()" src="../../assets/save.svg">
                    </div>
                </div>
                
                <div class="form">
                    <form>
                        
                    </form>
                </div>
            </section>
</template>
<script>
export default {
    name: 'UserData',
    beforeMount(){
        this.name = "Juselino Carandino Justiniano"
        this.email = "Juseli.randino.tiniano@somemail.com.br"
        this.date = "02/02/2022"
    },  
    data() {
        return {
            name: '',
            email: '',
            date: '',
            editing: false,
            imageFile: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjc3IiBoZWlnaHQ9IjI3NyIgdmlld0JveD0iMCAwIDI3NyAyNzciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cGF0aCBkPSJNMTM5LjA1NCAyMzIuNjhDODYuOTc4IDIzMi42OCA0NC44NzQgMTkwLjU3NiA0NC44NzQgMTM4LjVDNDQuODc0IDg2LjQyNDEgODYuOTc4IDQ0LjMyMDEgMTM5LjA1NCA0NC4zMjAxQzE5MS4xMyA0NC4zMjAxIDIzMy4yMzQgODYuNDI0MSAyMzMuMjM0IDEzOC41QzIzMy4yMzQgMTkwLjU3NiAxOTAuNTc2IDIzMi42OCAxMzkuMDU0IDIzMi42OFpNMTM5LjA1NCA1NS40MDAxQzkzLjA3MiA1NS40MDAxIDU1Ljk1NCA5Mi41MTgxIDU1Ljk1NCAxMzguNUM1NS45NTQgMTg0LjQ4MiA5My4wNzIgMjIxLjYgMTM5LjA1NCAyMjEuNkMxODUuMDM2IDIyMS42IDIyMi4xNTQgMTg0LjQ4MiAyMjIuMTU0IDEzOC41QzIyMi4xNTQgOTIuNTE4MSAxODQuNDgyIDU1LjQwMDEgMTM5LjA1NCA1NS40MDAxWiIgZmlsbD0iYmxhY2siLz4NCjxwYXRoIGQ9Ik04NC43NjIgMjA2LjY0Mkw3NC43OSAyMDIuMjFDNzcuNTYgMTk1LjU2MiA4Ni40MjQgMTkxLjY4NCA5NS44NDIgMTg3LjI1MkMxMDUuMjYgMTgyLjgyIDExNi44OTQgMTc3LjgzNCAxMTYuODk0IDE3MS43NFYxNjMuNDNDMTEzLjU3IDE2MC42NiAxMDguMDMgMTU0LjU2NiAxMDYuOTIyIDE0NS43MDJDMTA0LjE1MiAxNDIuOTMyIDk5LjcyIDEzNy45NDYgOTkuNzIgMTMxLjI5OEM5OS43MiAxMjcuNDIgMTAxLjM4MiAxMjQuMDk2IDEwMi40OSAxMjEuODhDMTAxLjM4MiAxMTcuNDQ4IDEwMC4yNzQgMTA5LjEzOCAxMDAuMjc0IDEwMi40OUMxMDAuMjc0IDgwLjg4NCAxMTUuMjMyIDY2LjQ4IDEzOS4wNTQgNjYuNDhDMTQ1LjcwMiA2Ni40OCAxNTQuMDEyIDY4LjE0MiAxNTguNDQ0IDczLjEyOEMxNjguOTcgNzUuMzQ0IDE3Ny44MzQgODcuNTMyIDE3Ny44MzQgMTAyLjQ5QzE3Ny44MzQgMTExLjkwOCAxNzYuMTcyIDExOS42NjQgMTc1LjA2NCAxMjMuNTQyQzE3Ni4xNzIgMTI1LjIwNCAxNzcuMjggMTI3Ljk3NCAxNzcuMjggMTMxLjI5OEMxNzcuMjggMTM4LjUgMTczLjQwMiAxNDMuNDg2IDE3MC4wNzggMTQ1LjcwMkMxNjguOTcgMTU0LjU2NiAxNjMuOTg0IDE2MC4xMDYgMTYwLjY2IDE2Mi44NzZWMTcxLjc0QzE2MC42NiAxNzYuNzI2IDE3MC42MzIgMTgwLjYwNCAxNzkuNDk2IDE4My45MjhDMTkwLjAyMiAxODcuODA2IDIwMS4xMDIgMTkyLjIzOCAyMDQuOTggMjAxLjEwMkwxOTQuNDU0IDIwNC45OEMxOTIuNzkyIDIwMC41NDggMTgzLjkyOCAxOTcuMjI0IDE3NS42MTggMTk0LjQ1NEMxNjMuNDMgMTkwLjAyMiAxNDkuNTggMTg1LjAzNiAxNDkuNTggMTcyLjI5NFYxNTcuODlMMTUyLjM1IDE1Ni4yMjhDMTUyLjM1IDE1Ni4yMjggMTU4Ljk5OCAxNTEuNzk2IDE1OC45OTggMTQyLjkzMlYxMzkuMDU0TDE2Mi4zMjIgMTM3LjM5MkMxNjIuODc2IDEzNy4zOTIgMTY1LjY0NiAxMzUuNzMgMTY1LjY0NiAxMzEuMjk4QzE2NS42NDYgMTMwLjE5IDE2NC41MzggMTI4LjUyOCAxNjMuOTg0IDEyNy45NzRMMTYxLjc2OCAxMjUuNzU4TDE2Mi44NzYgMTIyLjk4OEMxNjIuODc2IDEyMi45ODggMTY1LjY0NiAxMTQuMTI0IDE2NS42NDYgMTAzLjA0NEMxNjUuNjQ2IDkyLjUxOCAxNTkuNTUyIDg0Ljc2MiAxNTQuNTY2IDg0Ljc2MkgxNTEuMjQyTDE0OS41OCA4MS45OTJDMTQ5LjU4IDc5Ljc3NiAxNDUuNzAyIDc3LjU2IDEzOS4wNTQgNzcuNTZDMTIxLjg4IDc3LjU2IDExMS4zNTQgODYuOTc4IDExMS4zNTQgMTAyLjQ5QzExMS4zNTQgMTA5LjY5MiAxMTQuMTI0IDEyMS44OCAxMTQuMTI0IDEyMS44OEwxMTQuNjc4IDEyNC42NUwxMTIuNDYyIDEyNy40MkMxMTEuOTA4IDEyNy40MiAxMTAuOCAxMjkuMDgyIDExMC44IDEzMS4yOThDMTEwLjggMTM0LjA2OCAxMTQuMTI0IDEzNy4zOTIgMTE1Ljc4NiAxMzguNUwxMTguMDAyIDE0MC4xNjJWMTQyLjkzMkMxMTguMDAyIDE1MS4yNDIgMTI1LjIwNCAxNTUuNjc0IDEyNS4yMDQgMTU2LjIyOEwxMjcuOTc0IDE1Ny44OVYxNzIuMjk0QzEyNy45NzQgMTg1LjU5IDExMy41NyAxOTIuMjM4IDEwMC4yNzQgMTk3Ljc3OEM5NC4xOCAxOTkuOTk0IDg1Ljg3IDIwMy44NzIgODQuNzYyIDIwNi42NDJaIiBmaWxsPSJibGFjayIvPg0KPC9zdmc+DQo=',
        }
    },
    methods: {
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
            console.log( this.editing)
        },
        save(){

        }
    },
}
</script>

<style>
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
    flex-direction: column;
    align-items: flex-start;
}
.form-camp{
    margin: auto;
}
.iconProfile{
    filter: drop-shadow(2px 3px 3px rgba(0, 0, 0, 0.6));
    cursor: pointer;
    border-radius: 100%;
    margin: 1rem;
    max-height: 28rem;
    min-height: 28rem;
    max-width: 28rem;
    min-width: 28rem;
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
    min-width: 40rem;
}
.edit{
    cursor: pointer;
    margin-bottom: 20%;
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


</style>