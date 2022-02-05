<template>
    <textarea v-model="item.value" placeholder="add multiple lines"></textarea>
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