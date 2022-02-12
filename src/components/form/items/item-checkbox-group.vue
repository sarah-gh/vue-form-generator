<template>
    <div>
        <p v-if="item.label">{{ item.label }}</p>
        <div v-for="(i, x) in item.items" :key="x">
            <input  type="checkbox" v-model="item.value" :value="i.value"> {{ i.label }}
        </div>
        <br />
        <span>value: {{item.value}}</span>
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