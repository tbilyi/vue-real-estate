<template>
    <div>
           <p>number of flats: {{ trader.flats.length }}</p>
           <p>currency: {{ trader.currency }}$</p>
           <p>income: {{ income }}$</p>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: "Home",
        computed: {
            ...mapGetters([
                'trader',
                'income',
            ])
        }
    }
</script>

<style scoped>

</style>