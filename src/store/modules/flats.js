const state = {
    flats : []
};


function genflat(){
    let condition = getRandomInt(1, 3),
        price = getRandomPriceInt(15, 150);
    let flat = {
        id: getRandomInt(1, 100000),
        price: ( price * condition ) / 2,
        squre: price/1000 + 15,
        condition: condition,
        img: 'flat1/con' + condition + '_pic1.jpg',
        location: "District " + getRandomInt(1, 20),
        rented: false
    }
    return flat;
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max) + 1;
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

function getRandomPriceInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max) + 1;
    return ( Math.floor(Math.random() * (max - min)) + min ) * 1000; //The maximum is exclusive and the minimum is inclusive
};


const mutations = {
    'setFlats': (state) => {
        for( let i=0; i<10; i++ ){
            state.flats.push(genflat());
        }
    }
};

const actions = {
    initFlats: ( {commit} ) => {
        commit('setFlats');
    },
    upgradeFlat: ( {commit, getters}, flat ) => {
        commit('upgradeFlat', {flat, getters} );
    },
};

const getters = {
    flats: state => {
        return state.flats;
    },
    flat: (state) => (id) => {
        return state.flats.filter( item => item.id === Number(id) )[0];
    },
    tax: () => (price) => {
        if ( price < 40000) {
            return { taxPrice: Math.floor(price * 1.1), tax: "10%" };
        } else if ( price < 80000) {
            return { taxPrice: Math.floor(price * 1.2), tax: "20%" };
        } else {
            return { taxPrice: Math.floor(price * 1.3), tax: "30%" };
        }
    },
    upgradePrice: () => (flat) => {
        let extraMoney = (flat.condition == 3)? flat.price : 0
        return Math.floor( flat.price * 0.3 + flat.condition * flat.price * 0.1 + extraMoney )
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}