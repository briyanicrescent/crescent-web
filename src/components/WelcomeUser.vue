<template>
    <div class="text-red-500">
        <span>{{$t('welcome.prefix')}}{{' '}}</span>
        <RouterLink to="/user" class="underline">{{userDetails!=null ? userDetails.name : $t('welcome.default')}}!</RouterLink>
    </div>
</template>
<script setup>
import { useUserStore } from './../utils/Store'
import { storeToRefs } from 'pinia'

const userStore = useUserStore();
const {userDetails} = storeToRefs(userStore);
</script>