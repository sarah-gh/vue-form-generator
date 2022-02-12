<template>
    <ValidationProvider :rules="item.options.rules" v-slot="{ errors }" tag="div" class="form-group">
        <label>{{item.label}}<span v-if="item.options.rules">*</span></label>
        <textarea v-model="item.value" placeholder="add multiple lines"></textarea>
        <p v-if="errors[0]" class="error">{{ errors[0] }}</p>
    </ValidationProvider>
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