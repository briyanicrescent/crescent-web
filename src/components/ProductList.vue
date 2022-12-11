<template>
    <div>
        <div v-if="(products.length > 0)">
            <div v-for="(product,index) in products" :key="index" class="flex gap-2">
                <img src="./../assets/beefbriyani.jpeg" width="120" class="px-2 py-2 bg-red-500">
                <div>
                    <div>{{$i18n.locale == 'tm' ? product.nameTamil : product.name}}</div>
                    <div class="text-sm">{{$i18n.locale == 'tm' ? product.descriptionTamil : product.description}}</div>
                    <div>{{$t('currency.rs')}}{{product.price}}</div>
                    <div class="flex text-sm gap-1">
                        <div>{{$t('product.dcharge')}} : </div>
                        <RouterLink to="/user" class="underline" v-if="(deliveryCharge==-1)">{{$t('product.addAddress')}}</RouterLink>
                        <div v-else>{{$t('currency.rs')}}{{deliveryCharge}}</div>
                    </div>
                    <div class="flex gap-3">
                        <button class="text-green-600 disabled:text-gray-400"  @click="addToCart(product.name)">
                            <PlusIcon class="h-8 w-8"></PlusIcon>
                        </button>
                        <button class="text-red-500 disabled:text-gray-400" :disabled="!isInCart(product.name)" @click="removeFromCart(product.name)">
                            <MinusIcon class="h-8 w-8"></MinusIcon>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="bg-red-500 border text-white ml-2 mr-2 px-1 mt-10">
            <span>{{$t('product.none')}}!</span>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { getActiveProductUrl, getDeliveryChargesUrl } from '../utils/APIUrls'
import { useBranchesStore, useUserStore } from './../utils/Store'
import { storeToRefs } from 'pinia'
import { addToCart, removeFromCart, isInCart } from './../utils/Cart'
import MinusIcon from './MinusIcon.vue'
import PlusIcon from './PlusIcon.vue'

onMounted(async()=>{
    await loadProducts();
    if(userDetails.value.pincode!=null){
        getDeliveryCharges();
    }
})

const branchesStore = useBranchesStore();
const {selectedBranch} = storeToRefs(branchesStore);
const userStore = useUserStore();
const {userDetails} = storeToRefs(userStore);
const products = ref([]);
const deliveryCharge = ref(-1);

function loadProducts(){
    return axios.get(getActiveProductUrl+selectedBranch.value).then(response=>{
        var res = response.data;
        if(res.status != 'Failed'){
            products.value = res.response;
        }
    })
}

function getDeliveryCharges(){
    let model = {
        branchName: selectedBranch.value,
        pincode: userDetails.value.pincode,
        type: 'branch',
        charge: 20
    }
    return axios.post(getDeliveryChargesUrl, model).then(response=>{
        var res = response.data;
        if(res.status != 'Failed'){
            deliveryCharge.value = res.response.charge;
        }
    })
}
</script>