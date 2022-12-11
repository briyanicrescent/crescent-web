<template>
    <div>
        <HttpService></HttpService>
        <Header class="relative"></Header>
        <div class="md:hidden">
            <Login class="absolute top-2 right-3"></Login>
        </div>
        <div class="md:hidden">
            <RouterLink to="/">
                <HomeIcon class="absolute top-2 left-3 h-7 w-7 text-white"></HomeIcon>
            </RouterLink>
        </div>
        <div class="flex justify-center">
            <ProcessingSpinner class="w-1/2 md:w-1/6 opacity-100" v-if="processingModel.processing"></ProcessingSpinner>
        </div>
        <div :class="(processingModel.processing ? 'opacity-10' : 'opacity-100')">
            <ProcessingError class="md:ml-4 ml-0 md:mr-1 -mr-1 md:mt-3 mt-0 md:mb-0 mb-2" v-if="processingModel.errorOccurred"
                :errorCode="processingModel.errorCode" :errorParams="processingModel.errorParams" :errorMsg="processingModel.errorMsg" ref="processingerror" id="processingerror"></ProcessingError>
            <ProcessingSuccess class="ml-4 mt-3 md:mb-0 mb-2" v-if="showSuccessMessage"
                :message="processingModel.successMessage" ref="processingsuccess" id="processingsuccess"></ProcessingSuccess>
            <div class="mt-2 flex justify-end gap-2">
                <SelectWithoutFilter :options="branches" v-model="selectedBranch"
                        class="w-[6.4rem] border-red-500 border-2 py-1 text-sm"></SelectWithoutFilter>
                <div class="flex justify-end mr-1">
                    <div class="bg-red-500 pt-1 border border-red-500 border-r-0">
                        <GlobeAltIcon class="h-6 w-6 text-white"></GlobeAltIcon>
                    </div>
                    <SelectWithoutFilter :options="localeOptions" display="description" modelParam="code" v-model="language"
                        class="w-[6.4rem] border-red-500 border-2 py-1 text-sm"></SelectWithoutFilter>
                </div>
            </div>
            <div class="mt-2 mx-2 flex gap-2">
                <WelcomeUser class="basis-2/3"></WelcomeUser>
                <BaseButton class="redButton">{{$t('orders.button')}}</BaseButton>
                <Cart></Cart>
            </div>
            <div class="mt-3 text-sm">
                <RouterView></RouterView>
            </div>
        </div>
        <div class="min-h-screen bg-[url('/src/assets/md-background.jpg')] text-red-500 text-3xl text-center pt-72 md:block hidden">
            <span>{{$t('body.md.info')}}</span>
        </div>    
    </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Login from './components/Login.vue';
import { GlobeAltIcon, HomeIcon } from '@heroicons/vue/24/solid'
import { useI18n } from 'vue-i18n';
import SelectWithoutFilter from './components/SelectWithoutFilter.vue'
import { ref, watch, onMounted, provide, computed, nextTick } from 'vue'
import { useBranchesStore } from './utils/Store.js'
import axios from 'axios';
import { getActiveBranchesUrl } from './utils/APIUrls'
import { storeToRefs } from 'pinia'
import ProcessingError from './components/ProcessingError.vue';
import ProcessingSuccess from './components/ProcessingSuccess.vue';
import ProcessingSpinner from './components/ProcessingSpinner.vue';
import HttpService from './components/HttpService.vue';
import WelcomeUser from './components/WelcomeUser.vue';
import BaseButton from './components/BaseButton.vue';
import Cart from './components/Cart.vue';
import { RouterView, useRouter } from 'vue-router'

const router = useRouter();
const i18n = useI18n();

const language = ref('tm');

const localeOptions = [
{
    code: 'en',
    description: 'English'
},
{
    code: 'tm',
    description: 'தமிழ்'
}]

watch(language,(selectedLanguage)=>{
    i18n.locale.value = selectedLanguage;
})

router.afterEach(()=>{
    resetErrors();
})

const branchesStore = useBranchesStore();
const {branches,selectedBranch} = storeToRefs(branchesStore)

onMounted(() => {
    updateBranches();
    setInterval(updateBranches, 10000000)
})

const updateBranches = ()=>{
    console.log('Should I update branches?');
    if(branchesStore.shouldUpdateBranches()){
        console.log('updating branches');
        loadActiveBranches();
    }
}

function loadActiveBranches(){
    return axios.get(getActiveBranchesUrl).then(response=>{
        var res = response.data;
        if(res.status != 'Failed'){
            branchesStore.updateBranches(res.response);
        }
    })
}

const processingModel = ref({
    processing: false,
    errorCode: '',
    errorParams: {},
    errorMsg: '',
    errorOccurred: false,
    successMessage: ''
})

const processingerror = ref(null);
const processingsuccess = ref(null);

async function updateProcessingFailure(errorCode, errorParams, errorMsg){
    processingModel.value.errorOccurred = true;
    processingModel.value.errorCode = errorCode;
    processingModel.value.errorParams = errorParams;
    processingModel.value.errorMsg = errorMsg;
    await nextTick();//Waits for DOM update - Incase of error, waits for ShgProcessingError component load
    if(processingerror.value!=null){
        const yOffset = -120; 
        const element = document.getElementById('processingerror');
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
    }
}

async function resetErrors(){
    processingModel.value.errorOccurred = false;
    processingModel.value.errorCode = '';
    processingModel.value.errorParams = {};
    processingModel.value.errorMsg = '';
}

async function updateProcessingSuccess(successMessage){
    processingModel.value.successMessage = successMessage;
    await nextTick();
    if(successMessage!=null && successMessage!=undefined && successMessage!='' && processingsuccess.value!=null){
        const yOffset = -140; 
        const element = document.getElementById('processingsuccess');
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
        setTimeout(()=>{
            processingModel.value.successMessage='';
        },10000)
    }
}

function updateProcessing(processing){
    processingModel.value.processing = processing;
}

const showSuccessMessage = computed(()=>{
    return processingModel.value.successMessage!=null && processingModel.value.successMessage!=undefined &&
        processingModel.value.successMessage!='';
})

provide('processingSuccess',{
    updateProcessingSuccess
});
provide('processingFailed',{
    updateProcessingFailure
});
provide('updateProcessing',{
    updateProcessing
});
provide('resetErrors',{
    resetErrors
});

</script>
