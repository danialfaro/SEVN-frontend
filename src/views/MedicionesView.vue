<template>
    <div class=".container">
        <h1>Mediciones</h1>
        <MedicionesTabla/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import MedicionesTabla from '@/components/MedicionesTabla.vue'
  
  export default {
    name: 'DashboardView',
    components: {
        MedicionesTabla
    }
  }
  </script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    /*align-items: center;*/
}

h1 {
    text-align: start;
}
</style>