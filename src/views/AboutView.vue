<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ count }}</p>
    <button @click="increment">+1</button>
  </div>
</template>

<script>

import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/store/counter';

export default defineComponent({
  
  setup() {

    const counterStore = useCounterStore()
   
    const { count } = storeToRefs(counterStore)
    const { increment } = counterStore

    return {
        count,
        increment
    }

  }
})

</script>