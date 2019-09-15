<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <router-link to="/" class="navbar-brand">Real Estate</router-link>
            <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                <ul class="navbar-nav mr-auto">
                    <router-link
                            to="/market"
                            class="navbar-brand"
                            activeClass="active"
                            tag="li">
                        <a class="nav-link">Market</a>
                    </router-link>
                    <router-link
                            to="/my-flats"
                            class="navbar-brand"
                            activeClass="active"
                            tag="li">
                        <a class="nav-link">My flats</a>
                    </router-link>
                </ul>

                <ul class="navbar-nav mr-right">
                    <li class="nav-item dropdown"><span class="nav-link">age: {{ trader.age + Math.floor(period/12)  }}</span></li>
                    <li class="nav-item dropdown"><span class="nav-link">currency: {{ trader.currency }}$</span></li>
                    <li class="nav-item dropdown"><span class="nav-link">current period: {{ period }}</span></li>
                    <li class="nav-item dropdown"><a class="nav-link pointer" @click="endPeriod(1)">end period</a></li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle"
                           href="#"
                           id="navbarDropdown"
                           role="button"
                           data-toggle="dropdown"
                           aria-haspopup="true"
                           aria-expanded="false">
                            skip more periods
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a @click="endPeriod(12)" class="dropdown-item" href="#">year</a>
                            <div class="dropdown-divider"></div>
                            <a @click="endPeriod(120)" class="dropdown-item" href="#">decade</a>
                        </div>
                    </li>
                </ul>

            </div>
        </nav>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        computed: {
            ...mapGetters([
                'trader',
                'period',
            ])
        },
        methods: {
            endPeriod(period){
                this.$store.dispatch( 'endPeriod', period );
                if( this.$route.path.match('market/flat') ){
                    this.$router.push('/market');
                }
            }
        }
    }
</script>
<style scoped>
    .navbar .navbar-nav > .active > a, .navbar .navbar-nav > .active > a:hover, .navbar .navbar-nav > .active > a:focus {
        text-decoration: none;
        background-color: #e5e5e5;
        -webkit-box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.125);
        -moz-box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.125);
        box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.125);
    }
    .pointer{
        cursor: pointer;
    }
</style>