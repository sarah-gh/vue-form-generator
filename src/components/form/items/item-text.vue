<template>
    <div>
        <template v-if="item.options && item.options.covertToNumber">
            <label>{{item.label}}</label>
            <input v-model="item.value" placeholder="text">
        </template>
        <template v-else>
            <label>{{item.label}}</label>
            <input v-model="item.value" placeholder="text">
        </template>
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