<template>
  <HeaderComponent />
  <CarrouselComponent />
  <FooterComponent />
  <router-view />
</template>

<script>
import HeaderComponent from "./components/Header.vue";
import CarrouselComponent from "./components/CarrouselComponent.vue";
import FooterComponent from "./components/footer.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
    CarrouselComponent,
    FooterComponent,
  },
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
  background-color: grey;
}
.vueperslides--fixed-height {
  height: 200px;
}
body {
  background-color: #ffffff;
}
footer {
  background-color: #3a9e3e;
  color: #ffffff;
}
</style>
