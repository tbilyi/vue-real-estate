<template>
  <div class="container" id="app">
      <app-header></app-header>
      <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
    name: 'app',
    components: {
        appHeader: Header
    },
    created () {
        this.$store.dispatch('initFlats');
        if(this.$store.state.period == 1 && this.$route.path != "/market"){
            this.$router.push('/market');
        }
    }
}
</script>
