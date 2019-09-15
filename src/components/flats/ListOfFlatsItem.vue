<template>
    <div class="col-sm-6 col-md-4 mr-btm">
        <div class="card border-success">
            <div class="card-header text-white bg-success ">{{ flat.location }}
                <small>
                    Price: {{ flat.price }}$;
                </small>
                <small>
                    Rent per month: {{ rentedMoney }}$
                </small>
            </div>
            <div class="card-body text-success text-center">
                <router-link
                        :to="routepath()"
                        activeClass="active"
                        :flat="flat">
                <img :src="require(`@/assets/flats/${ flat.img }`)" width="250" height="200">
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['flat'],
        methods: {
            routepath(){
                if(this.$route.path == "/market"){
                    return `/market/flat/${ this.flat.id }`;
                } else {
                    return `/my-flats/flat/${ this.flat.id }`
                }
            }
        },
        computed: {
            rentedMoney() {
                return this.$store.getters.rentedMoney(this.flat);
            }
        }
    }
</script>
<style scoped>
    .mr-btm {
        margin-bottom: 20px;
    }
</style>