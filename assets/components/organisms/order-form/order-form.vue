<template>
    <div class="flex items-center justify-center px-12 mt-4">
        <div class="mx-auto w-2/3 max-w-[550px]">
            <form @submit.prevent="submitForm">
                <div class="-mx-3 flex flex-wrap">
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-5">
                            <label
                                for="firstName"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Prénom
                            </label>
                            <input
                                id="firstName"
                                v-model="form.first_name"
                                type="text"
                                name="firstName"
                                placeholder="Prénom"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-5">
                            <label
                                for="lastName"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Nom
                            </label>
                            <input
                                id="lastName"
                                v-model="form.last_name"
                                type="text"
                                name="lastName"
                                placeholder="Nom"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                    </div>
                </div>
                <div class="mb-5">
                    <label
                        for="streetAddress"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                        Numéro de la rue
                    </label>
                    <input
                        id="streetAddress"
                        v-model="form.delivery_street_address"
                        name="streetAddress"
                        class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>

                <div class="-mx-3 flex flex-wrap">
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-5">
                            <label
                                for="zipCode"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Code postal
                            </label>
                            <input
                                id="zipCode"
                                v-model="form.delivery_zip_code"
                                name="zipCode"
                                type="number"
                                maxlength="5"
                                min="10000"
                                placeholder="Ex: 75001"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-5">
                            <label
                                for="city"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Ville
                            </label>
                            <input
                                id="city"
                                v-model="form.delivery_city"
                                placeholder="Ex: Paris"
                                name="city"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                    </div>
                </div>

                <div class="w-full flex items-center">
                    <label
                        for="city"
                        class="inline-block text-base font-medium text-[#07074D] mx-2"
                    >
                        Mode de livraison
                    </label>
                    <select
                        v-model="form.delivery_method"
                        class="capitalize rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    >
                        <option
                            value="0"
                            selected
                            disabled
                            hidden
                        >
                            Veuillez choisir
                        </option>
                        <option
                            v-for="(option, index) in deliveryMethods"
                            :key="'delivery '+index"
                            :value="option.value"
                            class="capitalize"
                        >
                            <span>{{ option.label }}</span>
                            <span>-</span>
                            <span>{{ option.price | currencyFormat }}</span>
                            <span>-</span>
                            <span>{{ option.eta + ' min' }}</span>
                        </option>
                    </select>
                </div>

                <div class="w-full flex justify-center mt-8">
                    <base-cta>Je passe ma commande</base-cta>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import BaseCta from '../../atoms/base-cta/base-cta.vue';

export default {
    name: 'OrderForm',
    components: { BaseCta },
    props: {
        deliveryMethods: { type: Array, default: [] },
    },
    data() {
        return {
            form: {
                first_name: '',
                last_name: '',
                delivery_street_address: '',
                delivery_zip_code: null,
                delivery_city: '',
                delivery_method: 0,
            },
        };
    },
    methods: {
        submitForm() {
            if (this.validateForm()) {
                this.$emit('submit', this.form);
            }
        },
        validateForm() {
            const { form } = this;
            const invalidFields = Object.keys(form).filter((key) => ['', null, 0].includes(form[key]));
            if (invalidFields.length) {
                this.$emit('invalid-data', invalidFields);
                return false;
            }
            return true;
        },
    },
};
</script>
<style scoped>
</style>
