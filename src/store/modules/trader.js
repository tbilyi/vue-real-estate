const state = {
    trader: {
        flats: [],
        currency: 100000,
        age: 35
    }
};

const mutations = {

};

const actions = {

};

const getters = {
    trader: state => {
        return state.trader
    },
    myFlat: (state) => (id) => {
        return state.trader.flats.filter( item => item.id === Number(id) )[0];
    },
    sellTax: (state) => (price) => {
        if ( price < 50000) {
            return { taxPrice: Math.floor(price / 1.2), tax: "20%" };
        } else if ( price < 200000) {
            return { taxPrice: Math.floor(price / 1.3), tax: "30%" };
        } else {
            return { taxPrice: Math.floor(price / 1.4), tax: "40%" };
        }
    },
    flatsNumber: state => {
        return state.trader.flats.length;
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}