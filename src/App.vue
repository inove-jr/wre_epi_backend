<template>
  <div>
    <HeaderComponent :key="$route.fullPath"/>
    <router-view/>
    <FooterComponent class="footer"/>
  </div>
</template>

<script>
import HeaderComponent from "./components/Header.vue";
// import CarrouselComponent from "./components/CarrouselComponent.vue";
import FooterComponent from "./components/footer.vue";
import axios from "axios"
import { baseApiUrl,userKey } from "@/global";
import { mapMutations } from 'vuex';
import { mapState } from 'vuex';

export default {
  // name: "App",
  // components: {
  //   HeaderComponent,
  //   // CarrouselComponent,
  //   FooterComponent,
  // }
  name: "App",
  components: {
    HeaderComponent,
    // CarrouselComponent,
    FooterComponent,
  },
  data(){
    return{
      validatingToken: true
    }
  },
  methods:{

    ...mapMutations(['setIsLoggedIn']),
    ...mapState(['isLoggedIn']),

     async validateToken(){
      this.validatingToken = true;

      const json = localStorage.getItem(userKey)
      const userData= JSON.parse(json)
      this.$store.commit('setUser',null)
      //console.log(userData)

      if(!userData){
        this.validatingToken = false
        console.log("não validou")
        return;
      }
      const url = `${baseApiUrl}/validateToken`
      const res = await axios.post(url,userData)
        // console.log(res.data)
        console.log()
      if(res.data){
        this.$store.commit('setUser',userData)
        console.log("validado")
        this.setIsLoggedIn(true)
        return;
      }else {
        localStorage.removeItem(userKey)
        this.$router.push('/login')
      }
      this.validatingToken = false
     }
  },
  beforeMount(){
    this.validateToken()
    
  }
  


};
</script>

<style>
body {
  margin: 0;
}
#app {
  margin: 0px;
  padding: 0px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  height: 100%;
  width: 100%;
}
.vueperslides--fixed-height {
  height: 200px;
}

body {
  background-color: #ffffff;
}
.footer {
  position: relative;
  background-color: #3a9e3e;
  color: #ffffff;
}

@media(max-width: 720px){
    #footer {
      display: none;
    }
  }
</style>
