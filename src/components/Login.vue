<template>
    <div>
        <div id="g_id_onload"
            data-client_id="656458709655-86jt0m9ea559r73pdnds2ccff1sgd7tp.apps.googleusercontent.com"
            data-callback="glogin"
            data-auto_prompt="false"
            data-context="signin"
            data-ux_mode="popup">
        </div>
        <div class="g_id_signin"
            data-type="icon"
            data-shape="circle"
            data-theme="outline"
            data-text="signin"
            data-size="medium">
        </div>
    </div>
</template>
<script setup>
import { authorizeUrl, userDetailsUrl, getAddressUrl } from '../utils/APIUrls'
import axios from 'axios'
import { useAuthStore, useUserStore } from './../utils/Store'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

window.glogin = (response)=>{
    console.log(response)
    authorize(response.credential)
}

const authStore = useAuthStore();
const userStore = useUserStore();
const {userDetails} = storeToRefs(userStore);

onMounted(() => {
    //getUserDetails();
})

function authorize(credential){
    let model = {
        credential,
        type: 'google'
    }
    return axios.post(authorizeUrl, model).then(async response=>{
        var res = response.data;
        if(res.status != 'Failed'){
            authStore.updateOAuthToken(res.response);
            await getUserDetails();
            if(userDetails.value.addressId!=null && userDetails.value.addressId!=0){
                getAddressDetails(userDetails.value.addressId);
            }
        }
    })
}

function getUserDetails(){
    return axios.get(userDetailsUrl).then(response=>{
        var res = response.data;
        if(res.status != 'Failed'){
            userStore.updateUserDetails(res.response);
        }
    })
}

function getAddressDetails(id){
    return axios.get(getAddressUrl+id).then(response=>{
        var res = response.data;
        if(res.status != 'Failed'){
            userDetails.value.pincode = res.response.pincode;
            userStore.updateUserDetails(userDetails.value);
        }
    })
}
</script>