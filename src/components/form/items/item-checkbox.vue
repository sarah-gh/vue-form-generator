
<template>
    <div>
        <label>{{item.label}}</label>
        <input type="checkbox" id="jack" value="Jack" v-model="item.value">
        <label for="mike">{{item.options.items}}</label>
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
