
<template v-if="item.mode === 'select'">
    <div>
        <label>{{item.label}}</label>
        <v-select multiple v-model="item.value" :options="item.options.items" />
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