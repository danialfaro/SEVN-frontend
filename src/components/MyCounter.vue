<template>
    <div class="counter">
        <p>Count is: {{ count }}</p>
        <button @click="increment">Add {{ incrementBy }}</button>
    </div>
</template>

<script>
export default {
    name: 'MyCounter',
    props: {
      incrementBy: Number
    },
    computed: {
        count() {
            return this.$store.state.count
        }
    },
    methods: {
        increment() {
            this.$store.commit('increment', this.incrementBy)
        }
    }
}
</script>

<style scoped>
div {
    text-align: center;
}

p {
    font-weight: bold;
}
</style>