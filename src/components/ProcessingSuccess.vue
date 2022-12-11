<template>
    <div class="border bg-green-600 px-2 py-1 w-11/12">
        <span class="text-white text-sm">{{$t(message)}}</span>
    </div>
</template>
<script setup>
defineProps(['message'])
</script>