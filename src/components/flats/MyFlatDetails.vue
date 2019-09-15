<template>
    <div class="row">
        <div class="col-md-12 col-lg-6">
            <div class="card border-success">
                <div class="card-body text-success text-center">
                    <img :src="require(`@/assets/flats/${ flat.img }`)">
                </div>
            </div>
        </div>
        <div class="col-sd-12 col-lg-6">
            <h1 class="text-center">Flat details</h1>
            <h3 v-if="flat.rented">Flat is being rented!</h3>
            <p>Location: {{ flat.location }}</p>
            <p>Price: {{ flat.price }}$</p>
            <p>Rent per month: {{ rentedMoney }}$</p>
            <p v-if="flat.condition < 4">Upgrade price: {{ upgradePrice }}$</p>
            <p>Squre: {{ flat.squre }}</p>
            <p>Taxes: {{ tax.tax }}$</p>
            <p>Price - taxes: {{ tax.taxPrice }}$</p>
            <div>
                <button class="btn btn-success" @click="sellFlat()">Sell</button>
            </div>
            <div v-if="!flat.rented">
                <button class="btn btn-success" @click="rentFlat()">Rent</button>
            </div>
            <div v-if="flat.condition < 4">
                <button class="btn btn-success" :disabled="balance()" @click="upgradeFlat()">Upgrade</button>
                <p v-if="balance()">Insufficient Funds</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MyFlatDetails",
        computed: {
            flat(){
                return this.$store.getters.myFlat( this.$route.params.id );
            },
            tax(){
                return this.$store.getters.sellTax( this.flat.price );
            },
            rentedMoney() {
                return this.$store.getters.rentedMoney(this.flat);
            },
            upgradePrice() {
                return this.$store.getters.upgradePrice(this.flat);
            },
            trader() {
                return this.$store.getters.trader;
            },
        },
        methods: {
            sellFlat(){
                this.$store.dispatch('sellEstate', this.flat);
                this.$router.push('/my-flats');
            },
            rentFlat(){
                this.$store.dispatch('rentEstate', this.flat);
            },
            upgradeFlat(){
                this.$store.dispatch('upgradeFlat', this.flat);
            },
            balance(){
                let balance = this.trader.currency - this.upgradePrice;
                return balance <=0 ? true : false;
            }
        }
    }
</script>

<style scoped>
    .btn-success{
        margin-bottom: 20px;
    }
    img {
        width: 100%;
    }
</style>