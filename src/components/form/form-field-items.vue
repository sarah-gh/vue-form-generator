<template>
    <div>
        <ValidationProvider :name="item.name" :rules="item.rules" v-slot="{ errors }" tag="div" class="form-group">
            <component v-bind:is="currentTabComponent" :item="item"></component>
            <p v-if="errors[0]" class="invalid-feedback">{{ errors[0] }}</p>
        </ValidationProvider>
    </div>
</template>

<script>
import itemCheckbox from "./items/item-checkbox.vue"
import itemCheckboxGroup from "./items/item-checkbox-group.vue"
import itemDatePicker from "./items/item-date-picker.vue"
import itemLabel from "./items/item-label.vue"
import itemMoney from "./items/item-money.vue"
import itemRadioGroup from "./items/item-radio-group.vue"
import itemSelect from "./items/item-select.vue"
import itemText from "./items/item-text.vue"
import itemTextarea from "./items/item-textarea.vue"

export default {
    components: {
        itemCheckbox,
        itemCheckboxGroup,
        itemDatePicker,
        itemLabel,
        itemMoney,
        itemRadioGroup,
        itemSelect,
        itemText,
        itemTextarea
    },
    data() {
        return {
            currentTabComponent: "",
            data: {
                select: "item-select",
                checkbox: 'item-checkbox',
                'checkbox-group': 'item-checkbox-group',
                'radio-group': 'item-radio-group',
                textarea: 'item-textarea',
                'date-picker': 'item-date-picker',
                money: 'item-money',
                text: 'item-text',
                label: 'item-label'
            }
        }
    },
    beforeMount() {
        for(const i in this.data){
            if(this.item.mode == i){
                this.currentTabComponent = this.data[i]
                break
            }
        }
        if(!this.currentTabComponent) {
            this.currentTabComponent = 'item-text'
        }
    },
    props: {
        item: {
            required: true,
            type: Object,
        },
    },
};
</script>

<style>

</style>
