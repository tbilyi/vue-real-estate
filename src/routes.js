import Home from './components/Home.vue';
import Market from './components/Market.vue';
import ListOfFlats from './components/flats/ListOfFlats.vue';
import FlatDetails from './components/flats/FlatDetails.vue';
import MyFlats from "./components/flats/MyFlats";
import MyFlatDetails from "./components/flats/MyFlatDetails";


export const routes =  [
    { path: '/', component: Home },
    { path: '/my-flats', component: MyFlats },
    { path: '/my-flats/flat/:id', component: MyFlatDetails },
    { path: '/market', component: Market, children: [
            { path: '', component: ListOfFlats},
            { path: 'flat/:id', component: FlatDetails },
        ] },
]