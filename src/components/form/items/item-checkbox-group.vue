<template>
    <p v-if="item.label">{{ item.label }}</p>
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