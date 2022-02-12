<template>
    <ValidationProvider :rules="item.options.rules" v-slot="{ errors }" tag="div" class="form-group">
        <p v-if="item.label">{{ item.label }}</p>
        <div v-for="(i, x) in item.items" :key="x">
            <input  type="radio" v-model="item.value" :value="i.value"> {{ i.label }}
        </div>
        <br />
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