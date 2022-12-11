<template>
    <div class="flex flex-col gap-2">
        <div class="text-red-500 underline mb-1">{{$t('user.header')}}</div>
        <div>
            <label class="mobileInputLabel">{{$t('user.mobileNo')}}</label>
            <input type="text" class="mobileInputText" v-model="userDetails.mobileNo">
            <ValidationErrorMessage v-if="v$.mobileNo.$error" :errors="v$.mobileNo.$errors"></ValidationErrorMessage>
        </div>
        <div>
            <label class="mobileInputLabel">{{$t('user.name')}}</label>
            <input type="text" class="mobileInputText" v-model="userDetails.name">
            <ValidationErrorMessage v-if="v$.name.$error" :errors="v$.name.$errors"></ValidationErrorMessage>
        </div>
        <BaseButton @click="save" class="redButton w-fit place-self-center">{{$t('buttons.save')}}</BaseButton>
    </div>
</template>
<script setup>
import { useUserStore } from './../utils/Store'
import BaseButton from './BaseButton.vue';
import { storeToRefs } from 'pinia'
import { updateUserUrl } from './../utils/APIUrls'
import { useVuelidate } from '@vuelidate/core'
import { helpers,required,minLength,maxLength,numeric } from '@vuelidate/validators'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import ValidationErrorMessage from './ValidationErrorMessage.vue'

const {t} = useI18n({})
const userStore = useUserStore();
const {userDetails} = storeToRefs(userStore);

const mobileNoRegex = helpers.regex(/^[6-9]{1}[0-9]{9}$/);

const rules = computed(() => ({
    mobileNo: {
        required: helpers.withMessage(getModelError('required','mobileNo'),required),
        minLength: helpers.withMessage(getModelError('minLength','mobileNo',{length:10}),minLength(10)),
        maxLength: helpers.withMessage(getModelError('maxLength','mobileNo',{length:10}),maxLength(10)),
        numeric: helpers.withMessage(getModelError('invalid','mobileNo'),numeric),
        regex: helpers.withMessage(getModelError('invalid','mobileNo'),mobileNoRegex),
    },
    name: {
        required: helpers.withMessage(getModelError('required','name'),required),
        minLength: helpers.withMessage(getModelError('minLength','name',{length:3}),minLength(3)),
        maxLength: helpers.withMessage(getModelError('maxLength','name',{length:50}),maxLength(50)),
    },
}));

const v$ = useVuelidate(rules, userDetails.value)

function getModelError(validation, property, props){
    if(props!=undefined){
        props['property'] = t('user.'+property);
    }
    else{
        props = {property:t('user.'+property)};
    }
    return t('validations.'+validation,props)
}

function save(){
    v$.value.$validate();
    if(!v$.value.$invalid){
        return axios.patch(updateUserUrl,userDetails.value).then(response=>{
            var res = response.data;
            userStore.updateUserDetails(res.response);
        })
    }
}
</script>