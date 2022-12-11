<template>
    <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
        <option value="" disabled>{{$t('select.default')}}</option>
        <option v-for="(option,index) in options" :key="index" :value="(modelParam!=undefined) ? option[modelParam] : option">
            {{(display!=undefined) ? option[display] : option}}
        </option>
    </select>
</template>
<script setup>
const props = defineProps(['options','display','modelParam','modelValue','disabled'])
const emits = defineEmits(['update:modelValue'])
</script>