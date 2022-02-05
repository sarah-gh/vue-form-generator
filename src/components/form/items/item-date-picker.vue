<template> 
    <div>
        <label>{{item.label}}</label>
        <date-picker v-model="item.value" placeholder="date-picker"></date-picker>
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