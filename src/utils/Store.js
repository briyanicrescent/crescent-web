import {ref} from 'vue'
import { defineStore } from 'pinia';

export const useBranchesStore = defineStore('branchesStore',()=>{
    const branches = ref(getItem('branches',[]));
    const branchesUpdatedTimestamp = ref(getItem('branchesUpdatedTimestamp',''));
    const branchesUpdateIntervalHrs = 10;
    const selectedBranch = ref('Attur');
    function updateSelectedBranch(branch){
        selectedBranch.value = branch;
    }
    function updateBranches(branches){
        setItem('branches',branches);
        branches.value = branches;
        let time = new Date().getTime();
        setItem('branchesUpdatedTimestamp',time);
        branchesUpdatedTimestamp.value = time;
    }
    function shouldUpdateBranches(){
        if(branches.value.length == 0){
            return true;
        }
        else if(new Date().getTime() >= (branchesUpdatedTimestamp.value + (branchesUpdateIntervalHrs*1000))){
            return true;
        }
    }
    return {updateSelectedBranch, updateBranches, shouldUpdateBranches, branches, selectedBranch};
});

export const useAuthStore = defineStore('authStore',()=>{
    const oAuthToken = ref(getItem('oAuthToken',{}));
    function updateOAuthToken(updatedToken){
        setItem('oAuthToken',updatedToken);
        oAuthToken.value = updatedToken;
    }
    return {oAuthToken, updateOAuthToken};
});

export const useUserStore = defineStore('userStore',()=>{
    const userDetails = ref(getItem('userDetails',{}));
    function updateUserDetails(updatedDetails){
        setItem('userDetails',updatedDetails);
        userDetails.value = updatedDetails;
    }
    function updatePincode(pincode){
        userDetails.value.pincode = pincode;
        setItem('userDetails',userDetails.value);
    }
    function updateAddressId(addressId){
        userDetails.value.addressId = addressId;
        setItem('userDetails',userDetails.value);
    }
    return {userDetails, updateUserDetails, updateAddressId, updatePincode};
});

function getItem(key, defaultValue){
    return (window.localStorage.getItem(key)!=undefined) ? JSON.parse(window.localStorage.getItem(key)) : defaultValue;
}

function setItem(key, value){
    window.localStorage.setItem(key,JSON.stringify(value));
}