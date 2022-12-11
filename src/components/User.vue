<template>
    <div class="ml-2 text-red-500">
        <div v-if="!isDetailsAvailable" class="mb-2">{{$t('user.info')}}</div>
        <UserDetails></UserDetails>
        <AddressDetails></AddressDetails>
    </div>
</template>
<script setup>
import UserDetails from './UserDetails.vue';
import AddressDetails from './AddressDetails.vue';
import { useUserStore } from './../utils/Store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const userStore = useUserStore();
const {userDetails} = storeToRefs(userStore);

const isDetailsAvailable = computed(() => {
    return userDetails.value.mobileNo!=null && userDetails.value.pincode!=null;
})
</script>