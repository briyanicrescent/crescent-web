<template>
    <div class="border bg-red-500 px-2 py-1 md:w-11/12 md:mr-0 mr-2">
        <span class="text-white md:text-sm text-xs" v-if="errorCode">{{$t('errors.' + errorCode,errorParams)}}</span>
        <span class="text-white md:text-sm text-xs" v-if="errorMsg">{{errorMsg}}</span><!-- For Business Errors -->
    </div>
</template>
<script setup>
defineProps(['errorCode','errorParams','errorMsg'])
</script>