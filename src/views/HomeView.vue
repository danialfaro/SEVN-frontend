<template>
  <div class="home flex flex-col items-center">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <MyCounter :incrementBy="1"/>
    <MyCounter :incrementBy="2"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import MyCounter from '@/components/MyCounter.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    MyCounter
  }
}
</script>
