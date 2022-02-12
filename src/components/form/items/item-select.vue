
<template>
    <ValidationProvider :rules="item.options.rules" v-slot="{ errors }" tag="div" class="form-group">
        <div v-if="item.options.multiple">
            <label>{{item.label}}</label>
            <v-select v-model="item.value" :value="item.options.values" :options="item.options.items" />
        </div> 
        <div v-else>
            <label>{{item.label}}</label>
            <v-select v-model="item.value" :value="item.options.values" :options="item.options.items" />
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
    watch: {
        'item.value':{
            handler() {
                this.$emit('dependency')
            }
        }
    },
    methods: {
        dependency() {
            this.$emit('dependency')
        }
    }
}
</script>