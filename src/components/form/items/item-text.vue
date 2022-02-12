<template>
    <ValidationProvider :rules="item.options.rules" v-slot="{ errors }" tag="div" class="form-group">
        <div>
            <template v-if="item.options && item.options.covertToNumber">
                <label>{{item.label}}<span v-if="item.options.rules">*</span></label>
                <input v-model="model" placeholder="text" @input="dependency" @keypress="isNumber($event)">
            </template>
            <template v-else>
                <label>{{item.label}}<span v-if="item.options.rules">*</span></label>
                <input v-model="model" placeholder="text" @input="dependency">
            </template>
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
    data() {
        return {
            value: '',
            age: 0,
            blur: false
        }
    },
    computed: {
        model: {
            get () {
                return this.item.value
            },
            set (value) {
                this.item.value = value
                // this.$emit('input', value)
            }
        }
    },
    methods: {
        handleBlur() {
            this.blur = true
        },
        isNumber(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
            } else {
                return true;
            }
        },
        dependency() {
            this.$emit('dependency')
        }
        // setName(value) {
        //     this.name = value
        //     this.$v.name.$touch()
        // },
        // setAge(value) {
        //     this.age = value
        //     this.$v.age.$touch()
        // }
    }
}
</script>