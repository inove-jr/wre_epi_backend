<template>
  <div class="screen">
    <HeaderComponent :key="$route.fullPath"/>
    <div class="routerV">
      <router-view/>
    </div>
    <FooterComponent class="footer"/>
  </div>
</template>

<script>
import HeaderComponent from "./components/Header.vue";
import FooterComponent from "./components/footer.vue";
import { baseApiUrl,userKey } from "@/global";

export default {
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data(){
    return{
      validatingToken: true
    }
  }

  
};
</script>

<style>
.screen{
  display: flex;
  flex-direction: column;
}
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
  background-color: #02589a;
  color: #ffffff;
}
.routerV{
  min-height: 79vh;
}

@media(max-width: 720px){
    #footer {
      display: none;
    }
  }
</style>
