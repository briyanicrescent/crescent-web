<template>
    <div>
        <div class="relative" v-click-outside="()=>{preview=false}">
            <div @click="(preview=!preview)">
                <ShoppingCartIcon class="h-7 w-7 text-red-500"></ShoppingCartIcon>
                <span v-if="(count>0)" class="flex h-5 w-5 absolute bottom-3 -right-1">
                    <span class="motion-reduce:animate-ping absolute inline-flex h-5 w-5 rounded-full bg-sky-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-5 w-5 bg-sky-500 flex flex-col items-center justify-center text-xs font-bold text-white">{{count}}</span>
                </span>
            </div>
            <CartPreview class="absolute right-4 top-4" v-if="preview"></CartPreview>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { ShoppingCartIcon } from '@heroicons/vue/24/solid'
import { count } from '../utils/Cart'
import CartPreview from './CartPreview.vue';

const preview = ref(false);
</script>