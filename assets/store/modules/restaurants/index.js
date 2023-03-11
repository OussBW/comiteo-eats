import apiClient from '../../../api';
import * as types from './mutation-types';

export default {
    namespaced: true,
    state() {
        return {
            restaurants: [],
        };
    },
    mutations: {
        [types.SET_RESTAURANTS](state, payload) {
            state.restaurants = payload;
        },
    },
    getters: {
        restaurantList: (state) => state.restaurants,
    },
    actions: {
        async fetchRestaurants({ commit }) {
            await apiClient.get('restaurants').then(({ data }) => {
                commit(types.SET_RESTAURANTS, data);
            }).catch((error) => {
                commit(types.SET_RESTAURANTS, []);
                console.log(error);
            });
        },
        async fetchRestaurantById(state, restaurantId) {
            try {
                const { data } = await apiClient.get(`restaurants/${restaurantId}`);
                return data;
            } catch (error) {
                console.log(error);
                return null;
            }
        },
    },
};
