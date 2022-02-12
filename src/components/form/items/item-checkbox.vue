
<template>
    <div>
        <label>{{item.label}}</label>
        <input type="checkbox" :value="item.value" v-model="item.value">
        <label :for="item.value">{{item.options.items}}</label>
    </div>        
</template>
<script>
export default {
    props: {
        item: {
            required: true,
            type: Object,
        },
    },
}
</script>
