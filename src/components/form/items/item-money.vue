<template>
    <div>
        <label>{{item.label}}</label> 
        <input v-model="item.value" placeholder="money">
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