<template>
    <span>{{ item.value }}</span>
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