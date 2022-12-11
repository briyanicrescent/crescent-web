<template>
    <div>
        <div v-for="(error) of errors" :key="error.$uid" :class="'text-red-600 '+size">
            {{error.$message}}
        </div>
    </div>
</template>
<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps(['errors','textSize'])
const size = computed(()=>{
    if(props.textSize!=null || props.textSize!=undefined){
        return props.textSize;
    }
    return 'text-xs';
})
</script>