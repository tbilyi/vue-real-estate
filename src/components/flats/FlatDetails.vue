<template>
    <div class="row">
        <div class="col-sm-6">
            <div class="card border-success">
                <div class="card-body text-success text-center">
                    <img :src="require(`@/assets/flats/${ flat.img }`)">
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <h1 class="text-center">Flat details</h1>
            <p>Location: {{ flat.location }}</p>
            <p>Price: {{ flat.price }}$</p>
            <p>Rent per month: {{ rentedMoney }}$</p>
            <p>Squre: {{ flat.squre }}</p>
            <p>Taxes: {{ tax.tax }}</p>
            <p>Price + taxes: {{ tax.taxPrice }}$</p>
            <p v-if="flatsNumber > 1">You are rich! You have got {{ flatsNumber }} flats</pv-if>
            <p v-if="flatsNumber > 1">Extra tax for luxery!$$$</p>
            <p v-if="flatsNumber > 1">Total price: {{ tax.taxPrice * flatsNumber}}$</p>
            <button class="btn btn-success" :disabled="balance()" @click="buyFlat()">Buy</button>
            <p v-if="balance()">Insufficient Funds</p>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        computed: {
            flat(){
                return this.$store.getters.flat( this.$route.params.id );
            },
            tax(){
                return this.$store.getters.tax( this.flat.price );
            },
            rentedMoney() {
                return this.$store.getters.rentedMoney(this.flat);
            },
            ...mapGetters([
                'flatsNumber',
                'trader',
            ])
        },
        methods: {
            buyFlat(){
                this.$store.dispatch('buyEstate', this.flat);
                this.$router.push('/my-flats');
            },
            balance(){
                let balance = this.trader.currency - ( this.tax.taxPrice * ( this.flatsNumber || 1 ) );
                return balance <=0 ? true : false;
            }
        }
    }
</script>
<style scoped>
    img {
        width: 100%;
    }
</style>