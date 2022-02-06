<template>
    <div>
        <template v-if="item.options && item.options.covertToNumber">
            <label>{{item.label}}</label>
            <input v-model="item.value" placeholder="text">
        </template>
        <template v-else>
            <label>{{item.label}}</label>
            <input v-model="item.value" placeholder="text">
        </template>
        <!-- <ValidationProvider tag="div" class="form-group" :name="form.name" :rules="form.rules" v-slot="{ errors }">
            <label for="gender">{{form.label}}</label>
            <select v-model.number="model" @change="changeSelect(model)" class="form-control form-control-select" :class="{ 'is-invalid': errors[0] }">
                <option value=""></option>
                <option v-for="(i, x) in form.option" :key="x" :value="x">{{ i.text }}</option>
            </select>
            <p class="invalid-feedback">{{ errors[0] }}</p>
        </ValidationProvider> -->
        <!-- <ValidationProvider :name="item.name" :rules="item.rules" v-slot="{ errors }" tag="div" class="form-group">
            <label :for="item.name">{{item.label}}</label>
            <input v-model="model" class="form-control" :class="{ 'is-invalid': errors[0] }" :type="item.inputType">
            <input v-model="item.value" placeholder="text">
            <p class="invalid-feedback">{{ errors[0] }}</p>
        </ValidationProvider> -->
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
    data() {
        return {
            value: '',
            age: 0,
            blur: false
        }
    },
    // computed: {
    //     name: {
    //         // getter
    //         get: function() {
    //             return this.value
    //         },
    //         // setter
    //         set: function(newValue) {
    //             console.log('set');
    //             this.value = newValue
    //             this.item.value = this.value
    //         }
    //     }
    // },
    // validations: {
    //     name: {
    //         required,
    //         minLength: minLength(4)
    //     }
    // },
    methods: {
        handleBlur() {
            this.blur = true
        },
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