import Vue from 'vue';
import Vuex from 'vuex';
import flats from './modules/flats';
import trader from './modules/trader';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
      period: 1
    },
    mutations: {
        "buyEstate": (state, {flat, getters}) => {
            let price = getters.tax( flat.price ),
                numberOfFlats = getters.flatsNumber;
            if( numberOfFlats > 1 ){
                price.taxPrice *= numberOfFlats;
            }
            state.trader.trader.currency -= price.taxPrice
            for( let i=0; i<state.flats.flats.length; i++ ){
                if( state.flats.flats[i].id == flat.id ){
                    state.flats.flats.splice(i, 1);
                    break;
                }
            }
            state.trader.trader.flats.push(flat);
        },
        "sellEstate": (state, {flat, getters}) => {
            let price = getters.sellTax( flat.price );
            state.trader.trader.currency += price.taxPrice
            for( let i=0; i<state.trader.trader.flats.length; i++ ){
                if( state.trader.trader.flats[i].id == flat.id ){
                    state.trader.trader.flats.splice(i, 1);
                    break;
                }
            }
        },
        "endPeriod": (state, {period, getters}) => {
            state.trader.trader.currency += getters.income * period;
            state.flats.flats = [];
            state.period += period;
        },
        "rentEstate": (state, flat) => {
            flat.rented = true;
        },
        'upgradeFlat': (state, {flat, getters}) => {
            flat.img = flat.img.replace('con' + flat.condition, 'con' + (flat.condition + 1) );
            state.trader.trader.currency -= getters.upgradePrice(flat);
            flat.condition++;
            flat.price = flat.price + flat.price * 0.4
        }
    },
    actions: {
        buyEstate: ( {commit, getters}, flat ) => {
            commit( 'buyEstate', {flat, getters} );
        },
        sellEstate: ( {commit, getters}, flat ) => {
            commit( 'sellEstate', {flat, getters} );
        },
        rentEstate: ( {commit}, flat ) => {
            commit( 'rentEstate', flat );
        },
        endPeriod: ( {commit, getters}, period ) => {
            commit( 'endPeriod', {period, getters} );
            commit( 'setFlats' );
        }
    },
    getters: {
        period: (state) => {
            return state.period;
        },
        income: (state, getters) => {
            let flats = state.trader.trader.flats,
                income = 0;
            for( let i=0; i<flats.length; i++ ){
                if(flats[i].rented){
                    income += getters.rentedMoney(flats[i])
                }
            }
            return income;
        },
        rentedMoney: () => (flat) => {
            return Math.floor(flat.squre * ( flat.condition * 2) * 2);
        },
    },
    modules: {
        flats,
        trader
    }
})