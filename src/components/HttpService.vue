<template>
    <div></div>
</template>
<script setup>
import axios from 'axios'
import { inject } from 'vue'
import { useI18n } from 'vue-i18n';
import { useAuthStore } from './../utils/Store'
import { storeToRefs } from 'pinia'
import { getRefreshedTokenUrl } from '../utils/APIUrls'

const i18n = useI18n();

const {updateProcessingSuccess} = inject('processingSuccess')
const {updateProcessingFailure} = inject('processingFailed')
const {updateProcessing} = inject('updateProcessing')
const {resetErrors} = inject('resetErrors')

const authStore = useAuthStore();
const {oAuthToken} = storeToRefs(authStore)

axios.interceptors.request.use(request=>{
    updateProcessing(true);
    resetErrors()//Explicitly resetting errorCode while processing to clear previous errors
    if(oAuthToken.value!=null){
        console.log(oAuthToken.value.accessToken);
        request.headers['Authorization'] = 'Bearer '+oAuthToken.value.accessToken;
    }
    //request.timeout=15000;//15 secs timeout for each request. After 15 secs request will be cancelled by the browser. But backend will continue to process the request
    return request;
})

axios.interceptors.response.use(async response=>{
    updateProcessing(false);
    var res = response.data;
    if(res.status == 'Failed'){
        if(res.errortype == 'Authorization'){
            if(res.errorcode == '403'){
                try{
                    const refreshedToken = await getRefreshedAccessToken();
                    console.log(refreshedToken)
                    console.log(oAuthToken.value)
                    if(refreshedToken!=null && oAuthToken.value!=null){
                        response.config.headers['Authorization'] = 'Bearer '+oAuthToken.value.accessToken
                        return axios.request(response.config)
                    }
                    else{
                        updateProcessingFailure(500);
                    }
                }
                catch(error){
                    updateProcessingFailure(403);
                }
            }
            else if(res.errorcode == '401'){
                updateProcessingFailure(401);
            }
        }
        else if(res.errortype == 'Technical'){
            updateProcessingFailure(res.errorcode,{errorid: res.errorid});
        }
    }
    else if(res.status == 'Success' && response.config.successMessage!=null && 
                response.config.successMessage!=undefined && response.config.successMessage!=''){
        updateProcessingSuccess(response.config.successMessage);
    }
    return response;
},
// eslint-disable-next-line no-unused-vars
error=>{
    console.log(error)
    updateProcessing(false);
    updateProcessingFailure(500);
})

const refreshAxios = axios.create();

function getRefreshedAccessToken(){
    return refreshAxios.post(getRefreshedTokenUrl,oAuthToken.value).then(response=>{
        var res = response.data;
        if(res.status == 'Failed'){
            return Promise.reject('Unable to get refreshed token')
        }
        else{
            return authStore.updateOAuthToken(res.response);
        }
    },
    error=>{
        return Promise.reject(error)
    })
}
</script>