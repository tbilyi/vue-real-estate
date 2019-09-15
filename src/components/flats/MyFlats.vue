<template>
    <div class="row">
        <p v-show="!flats.length">Trader doesn't have any apartment</p>
        <app-list-of-flats-item
                v-for="flat in flats"
                v-bind:key="flat.id"
                :flat="flat"
        ></app-list-of-flats-item>
    </div>
</template>

<script>
    import ListOfFlatsItem from "./ListOfFlatsItem.vue";
    export default {
        components: {
            appListOfFlatsItem: ListOfFlatsItem
        },
        computed: {
            flats(){
                return this.$store.getters.trader.flats;
            }
        }
    }
</script>

<style scoped>

</style>