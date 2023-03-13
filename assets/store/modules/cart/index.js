import * as types from './mutation-types';

export default {
    namespaced: true,
    state() {
        return {
            dishes: [],
            total: 0,
        };
    },
    mutations: {
        [types.ADD_DISH_TO_CART](state, payload) {
            const existingDish = state.dishes.find((dish) => payload.id === dish.id);
            if (existingDish) {
                existingDish.quantity += 1;
            } else {
                state.dishes.push({ id: payload.id, price: payload.price, quantity: 1 });
            }
        },
        [types.REMOVE_DISH_FROM_CART](state, payload) {
            const existingDish = state.dishes.find((dish) => payload === dish.id);
            console.log(existingDish);
            if (existingDish.quantity > 1) {
                existingDish.quantity -= 1;
            } else {
                state.dishes = state.dishes.filter((dish) => payload !== dish.id);
            }
        },
    },
    getters: {
        dishes: (state) => state.dishes,
        total: (state) => state.dishes.reduce((partialSum, dish) => partialSum + dish.price * dish.quantity, 0),
    },
    actions: {
        addToCart({ commit }, id) {
            commit(types.ADD_DISH_TO_CART, id);
        },
        removeFromCart({ commit }, id) {
            commit(types.REMOVE_DISH_FROM_CART, id);
        },
    },
};
