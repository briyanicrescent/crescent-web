<template>
    <div class="bg-red-500 text-white px-2 py-1.5 flex flex-col" v-if="(products.size > 0)">
        <div v-for="[name,count] in products" class="flex gap-1">
            <div class="w-28">{{name}}</div>
            <div>-</div>
            <div>{{count}}</div>
            <PlusIcon class="h-4 w-4 text-white mt-1" @click="addToCart(name)"></PlusIcon>
            <MinusIcon class="h-4 w-4 text-white mt-1" @click="removeFromCart(name)"></MinusIcon>
            <TrashIcon class="h-4 w-4 text-white mt-1" @click="removeAllFromCart(name)"></TrashIcon>
        </div>
        <BaseButton class="whiteBlackSmallButton mt-2 place-self-center" @click="placeOrder">{{$t('cart.place')}}</BaseButton>
    </div>
</template>
<script setup>
import { products } from './../utils/Cart.js'
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/vue/24/solid'
import BaseButton from './BaseButton.vue';
import { addToCart, removeFromCart, removeAllFromCart } from './../utils/Cart'
import { useUserStore } from './../utils/Store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { computed } from 'vue';

const userStore = useUserStore();
const {userDetails} = storeToRefs(userStore);
const router = useRouter()

const isDetailsAvailable = computed(() => {
    return userDetails.value.mobileNo!=null && userDetails.value.pincode!=null;
})

function placeOrder(){
    if(!isDetailsAvailable){
        router.push('/user');
    }
}
</script>