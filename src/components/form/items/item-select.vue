
<template>
    <ValidationProvider :rules="item.options.rules" v-slot="{ errors }" tag="div" class="form-group">
        <div>
            <label>{{item.label}}</label>
            <v-select multiple v-model="item.value" :options="item.options.items" />
        </div> 
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