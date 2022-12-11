<template>
    <div class="flex flex-col gap-2">
        <div class="text-red-500 underline mb-1">{{$t('address.header')}}</div>
        <div class="flex">
            <label class="mobileInputLabel place-self-center">{{$t('address.address')}}</label>
            <textarea v-model="address.address" class="bg-red-500 border-none w-44 h-16 text-white text-sm py-0 px-1"></textarea>
            <ValidationErrorMessage v-if="v$.address.$error" :errors="v$.address.$errors"></ValidationErrorMessage>
        </div>
        <div>
            <label class="mobileInputLabel ">{{$t('address.pincode')}}</label>
            <input  type="text" class="mobileInputText" v-model="address.pincode">
            <ValidationErrorMessage v-if="v$.pincode.$error" :errors="v$.pincode.$errors"></ValidationErrorMessage>
        </div>
        <BaseButton @click="save" class="redButton w-fit place-self-center">{{$t('buttons.save')}}</BaseButton>
    </div>
</template>
<script setup>
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'
import { useUserStore } from './../utils/Store'
import { getAddressUrl, createAddressUrl, updateAddressUrl } from './../utils/APIUrls'
import { storeToRefs } from 'pinia'
import BaseButton from './BaseButton.vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers,required,minLength,maxLength,numeric } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n';
import ValidationErrorMessage from './ValidationErrorMessage.vue'

const {t} = useI18n({})
const userStore = useUserStore();
const {userDetails} = storeToRefs(userStore);
const address = ref({});

onMounted(()=>{
    if(userDetails.value.addressId!=null && userDetails.value.addressId!=0){
        loadAddress(userDetails.value.addressId);
    }
})
function loadAddress(id){
    return axios.get(getAddressUrl+id).then(response=>{
        var res = response.data;
        if(res.status != 'Failed'){
            address.value = res.response;
        }
    })
}

const rules = computed(() => ({
    address: {
        required: helpers.withMessage(getModelError('required','address'),required),
        maxLength: helpers.withMessage(getModelError('maxLength','address',{value:1024}),maxLength(1024)),
    },
    pincode: {
        required: helpers.withMessage(getModelError('required','pincode'),required),
        minLength: helpers.withMessage(getModelError('minLength','pincode',{length:6}),minLength(6)),
        maxLength: helpers.withMessage(getModelError('maxLength','pincode',{length:6}),maxLength(6)),
        numeric: helpers.withMessage(getModelError('invalid','pincode'),numeric),
    },
}));

const v$ = useVuelidate(rules, address)

function getModelError(validation, property, props){
    if(props!=undefined){
        props['property'] = t('address.'+property);
    }
    else{
        props = {property:t('address.'+property)};
    }
    return t('validations.'+validation,props)
}

function save(){
    v$.value.$validate();
    if(!v$.value.$invalid){
        address.value.type = 'user';
        address.value.consumer = {
            id: userDetails.value.id
        }
        if(userDetails.value.addressId!=null && userDetails.value.addressId!=0){
            return axios.patch(updateAddressUrl,address.value).then(response=>{
                var res = response.data;
                userStore.updatePincode(res.response.pincode);
            })
        }
        else{
            return axios.put(createAddressUrl,address.value).then(response=>{
                var res = response.data;
                userStore.updateAddressId(res.response.id);
                userStore.updatePincode(res.response.pincode);  
            })
        }
    }
}
</script>