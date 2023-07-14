<template>
    <section class="header">
      <router-link to="/">
        <div class="header__logo">
          <img src="../assets/Logomarca.png" alt="Imagem do logo da empresa" />
          <div class="logo__title">
            <h1>wre epi</h1>
            <h3>A vida é sua, a segurança é nossa</h3>
          </div>
        </div>
      </router-link>
  
      <div class="header__searchbar">
        <input class="searchbar" type="text" placeholder="Pesquisar produtos" />
        <button class="searchbar-button">
          <img src="../assets/lupa.png" alt="Ícone de busca(lupa)" />
        </button>
      </div>
  
      <div class="header__cart">

        <div v-if="loggedIn === true"  class="cart-info">
          <p>Bem-vindo, <span>{{this.user_name}}</span></p>
          <div class="cart-info-email">
            <p>{{this.user_email}}</p>
            <p @click.prevent="logOut">Sair</p>
          </div>
        </div>

        <div v-if="loggedIn === false" class="cart-info">
          <p>Bem-vindo</p>
          <router-link to="/login" class="log-camp">
            <div class="cart-info-start">
              <p>Realize o login</p>
            </div>
          </router-link>
        </div>
  
        <router-link to="/cart">
          <button class="cart-button" >
            <img src="../assets/Vector.svg" alt="" />
            <p>0</p>
          </button>
        </router-link>
      </div>
    </section>
  </template>
  
  <script>
  
  // import { useCookies } from "vue3-cookies";
  import { mapState } from 'vuex';
  import { userKey } from '@/global';

  export default {
    name: "HeaderComponent",
    setup() {
      // const { cookies } = useCookies();
      // return { cookies };
    },
    data(){
      return {
        loggedIn: false,
        user_name: String,
        user_email: String
      }
    },
    beforeRouteUpdate() {
        console.log(this.$route)
    },
    computed:{
      ...mapState(['user']),
      ...mapState(['isLoggedIn'])
    },
    methods: {
      logOut(){
        localStorage.removeItem(userKey)
        this.$store.commit('setUser',null)
        this.loggedIn=false
        this.$router.push('/login')
      },
      // getCookie: function() { 
        
              //       if(this.cookies.isKey('loggedIn')) {
              //           this.loggedIn = true;
              //           this.user_name = this.cookies.get('loggedUser_name');
              //           this.user_email = this.cookies.get('loggedUser_email');
              //         } 
        
              //     },
        
              
        
                  //   if(this.cookies.isKey('loggedIn')) {
                  //       this.loggedIn = true;
                  //       this.user_name = this.cookies.get('loggedUser_name');
                  //       this.user_email = this.cookies.get('loggedUser_email');
                  //     } 
        
                  // },
      
          setHeaderData: function(){
            const json = localStorage.getItem(userKey)
            const userData= JSON.parse(json)
            //console.log(userData)
            if(userData){
              this.loggedIn=true
              this.user_name = userData.name
              this.user_email = userData.email
            }

          },    
 
              
        

      // makeCookie: function() { this.cookies.set('loggedIn', true, { expires: '1h' }); },//7
      
    },
    beforeMount() {
      // this.getCookie()
      // this.getUserData()
    },
    mounted() {
     this.setHeaderData()
    },
    beforeRouteLeave (to, from) {
      console.log('A')  
      //this.$router.go();
    }
  };
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 9rem;
  
    background-color: #3a9e3e;
    font-family: 'Lato';
  }
  
  .header__logo {
    display: flex;
  
    margin-left: 7.2rem;
  
    padding-top: 1.9rem;
  
    /* border: 1px solid green; */
  }
  .log-camp{
    color: white;
  }
  .log-camp:hover{
    color: rgb(148, 171, 150);
  }
  .header__logo img {
    width: 4.6rem;
    height: 4.3rem;
  }
  
  .logo__title {
    color: #ffffff;
    margin-left: 1.5rem;
  
    padding-top: 0.8rem;
    /* font-size: 1.4rem; */
    font-size: clamp(1rem, 1.2rem, 1.6rem);
  }
  
  .logo__title h1 {
    text-transform: uppercase;
    text-align: left;
    font-size: clamp(1em, 1.2em, 1.6em);
  }
  
  .header__searchbar {
    display: flex;
    align-items: center;
    width: 40%;
    /* border: 1px solid red; */
  }
  
  .searchbar {
    width: 100%;
    /* max-width: 44.7rem; */
    height: 3.5rem;
  
    border: none;
    border-radius: 0.5rem 0 0 0.5rem;
  
    padding: 0.8rem 1.2rem;
  
    font-size: 1.6rem;
  }
  
  .searchbar-button {
    width: 4.3rem;
    height: 3.5rem;
  
    background: linear-gradient(180deg, #efefef 0%, #a0a0a0 100%);
  
    border: none;
    border-radius: 0 0.5rem 0.5rem 0;
  
    display: flex;
    justify-content: center;
    align-items: center;
  
    cursor: pointer;
  }
  
  .header__cart {
    /* width: 29.0rem; */
  
    /* border: 1px solid blue; */
    width: 20%;
    height: 6.3rem;
  
    background: #318234;
    box-shadow: 0 0 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
    border-radius: 0 0 0 2.5rem;
  
    color: #ffffff;
    font-size: 1.6rem;
  
    padding: 0.6rem 2.7rem 0.7rem;
  
    display: flex;
    justify-content: space-between;
  }
  
  .cart-info {
    width: 15.3rem;
    text-align: left;
    font-size: 10pt;
  }
  
  .cart-info span {
    font-weight: bold;
  }

  .cart-info-start{
    display: flex;
    text-decoration: underline;
  }

  .cart-info-email {
    display: flex;
  }
  
  .cart-info-email p:first-child {
    width: 10.8rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  
  .cart-info-email p:last-child {
    text-decoration: underline;
    margin-left: 0.8rem;
  }
  
  .cart-button {
    width: 5.778rem;
    height: 4.8rem;
  
    background: #1d531f;
    border-radius: 1rem;
  
    border: none;
    position: relative;

    cursor: pointer;
  }
  
  .cart-button p {
    top: 0.2rem;
    right: 0.6rem;
  
    width: 1.422rem;
    height: 1.6rem;
    background: #0a260b;
    border-radius: 0.5rem;
  
    color: #ffffff;
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 1.9rem;
    text-align: center;
    position: absolute;
  }
  
  @media (max-width: 1024px) {
    .header__cart {
      padding: 1.1rem 1.4rem 0.7rem;
  
      font-size: 1.2rem;
    }
  
    .cart-info-email p:first-child {
      width: 7rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  
    .cart-button {
      width: 5rem;
      height: 4rem;
  
      background: #1d531f;
      border-radius: 1rem;
  
      border: none;
      position: relative;
    }
  
    .cart-button img {
      width: 3rem;
    }
  
    .cart-button p {
      right: 0.4rem;
    }
  
    h3 {
      font-size: 1.2rem;
    }
  }
  
  @media (max-width: 768px) {
    .cart-info-email p:first-child {
      width: 5.5rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .cart-button img {
      width: 2rem;
    }
  
    p {
      font-size: 1rem;
    }
  
    .header__logo img {
      width: 4.5rem;
      height: 4rem;
    }
  
    h3 {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 720px) {
    .header{
      flex-direction: column;
      height: fit-content;
    }
    .header__logo {
      display: flex;
      margin-left: 2.2rem;
      padding-top: 1.6rem;
      padding-bottom: 0.6rem;
      font-size: clamp(1rem, 1.6em, 3rem);
    }
    .logo__title {
      padding-top: 0.6rem;
    }
    .logo__title h1 {
      font-size: clamp(1rem, 1.8rem, 3rem);
    }
    .logo__title h3 {
      font-size: clamp(1rem, 1.2rem, 3rem);
    }
    
    .header__logo img {
      width: 4.6rem;
      height: 4.3rem;
    }
    .header__searchbar {
      width: 100%;
      margin-top: 1rem;
      padding: 2rem;
      justify-content: center;
      background-color: #318234;
    }
    
    .searchbar {
      width: 100%;
      padding: 0.8rem 1.2rem;
    
    }
    .header__cart {
      position: absolute;
      right: 0;
      width: 50%;
      visibility: hidden;
    }

    .cart-button{
      visibility:visible;
      width: 5.8rem;
      height: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cart-button img {
      width: 3rem;
    }
    .cart-button p {
      right: 0.6rem;
      top: 0.6rem;
    }
  }

  </style>
  