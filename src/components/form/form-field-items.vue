<template>
    <div>
        <!-- <template v-if="item.mode === 'select'">
            <label>{{item.label}}</label>
            <v-select multiple v-model="item.value" :options="item.options.items" />
        </template>
        <template v-else-if="item.mode === 'checkbox'">
            <label>{{item.label}}</label>
            <input type="checkbox" id="jack" value="Jack" v-model="item.value">
            <label for="mike">{{item.options.items}}</label>
        </template>
        <template v-else-if="item.mode === 'checkbox-group'">
            <p v-if="item.label">{{ item.label }}</p>
        </template>
        <template v-else-if="item.mode === 'radio-group'">
            <p v-if="item.label">{{ item.label }}</p>
        </template>
        <template v-else-if="item.mode === 'textarea'">
            <textarea v-model="item.value" placeholder="add multiple lines"></textarea>
        </template>
        <template v-else-if="item.mode === 'date-picker'"> 
            <label>{{item.label}}</label>
            <date-picker v-model="item.value" placeholder="date-picker"></date-picker>
        </template>
        <template v-else-if="item.mode === 'label'">
            <span>{{ item.value }}</span>
        </template>
        <template v-else-if="item.mode === 'money'"> 
            <label>{{item.label}}</label>
            <input v-model="item.value" placeholder="money">
        </template>
        <template v-else-if="!item.mode || item.mode === 'text'"> 
            <template v-if="item.options && item.options.covertToNumber">
                <label>{{item.label}}</label>
                <input v-model="item.value" placeholder="text">
            </template>
            <template v-else>
                <label>{{item.label}}</label>
                <input v-model="item.value" placeholder="text">
            </template>
        </template> -->
        <component v-bind:is="currentTabComponent" :item="item"></component>
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
