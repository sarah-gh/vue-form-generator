<template>
    <div>
        <template v-if="item.mode === 'select'">
            <!-- <v-select
                :menu-props="{ offsetY: true, left: true }"
                outlined
                dense
                v-model="item.value"
                :label="item.label"
                v-bind="item.options"
            /> -->
            <label>{{item.label}}</label>
            <select v-model="item.value" v-bind="item.options">
                <option disabled value="">Please select one</option>
                <option v-for="x in item.options" :value="x"  :key="x">{{ x }}</option>
            </select>
        </template>
        <template v-else-if="item.mode === 'auto-complete'">
            <!-- <v-select
                :menu-props="{ offsetY: true, left: true }"
                outlined
                dense
                v-model="item.value"
                :label="item.label"
                v-bind="item.options"
            /> -->
            <label>{{item.label}}</label>
            <select v-model="item.value" v-bind="item.options">
                <option disabled value="">Please select one</option>
                <option v-for="x in item.options" :value="x"  :key="x">{{ x }}</option>
            </select>
        </template>
        <template v-else-if="item.mode === 'checkbox'">
            <!-- <v-checkbox outlined dense v-model="item.value" :label="item.label" v-bind="item.options" /> -->
            <label>{{item.label}}</label>
            <input type="checkbox" id="jack" value="Jack" v-model="item.value">
            <label for="mike">Mike</label>
        </template>
        <template v-else-if="item.mode === 'checkbox-group'">
            <p v-if="item.label">{{ item.label }}</p>
            <!-- <v-checkbox
                v-for="(j, index) in item.items"
                :key="index"
                outlined
                dense
                v-model="item.value"
                :label="j.label"
                :value="j.value"
                :hide-details="true"
                v-bind="j.options"
            /> -->
        </template>
        <template v-else-if="item.mode === 'radio-group'">
            <p v-if="item.label">{{ item.label }}</p>
            <!-- <v-radio-group v-model="item.value" column v-bind="item.options" class="mt-0">
                <v-radio
                v-for="(j, index) in item.items"
                :key="index"
                dense
                :label="j.label"
                :value="j.value"
                :hide-details="true"
                v-bind="j.options"
                />
            </v-radio-group> -->
        </template>
        <template v-else-if="item.mode === 'textarea'">
            <textarea v-model="item.value" placeholder="add multiple lines"></textarea>
            <!-- <v-textarea outlined dense v-model="item.value" :label="item.label" v-bind="item.options" /> -->
        </template>
        <template v-else-if="item.mode === 'date-picker'"> 
            <label>{{item.label}}</label>
            <input v-model="item.value" placeholder="date-picker">
            <!-- <DatePicker outlined dense v-model="item.value" :label="item.label" v-bind="item.options" /> -->
        </template>
        <template v-else-if="item.mode === 'label'">
            <span>{{ item.value }}</span>
        </template>
        <template v-else-if="item.mode === 'money'"> 
            <label>{{item.label}}</label>
            <input v-model="item.value" placeholder="money">
            <!-- <MoneyTextField outlined dense v-model.number="item.value" :label="item.label" v-bind="item.options" /> -->
        </template>
        <template v-else-if="!item.mode || item.mode === 'text'"> 
            <template v-if="item.options && item.options.covertToNumber">
                <label>{{item.label}}</label>
                <input v-model="item.value" placeholder="text">
                <!-- <v-text-field outlined dense v-model.number="item.value" :label="item.label" v-bind="item.options" /> -->
            </template>
            <template v-else>
                <label>{{item.label}}</label>
                <input v-model="item.value" placeholder="text">
                <!-- <v-text-field outlined dense v-model="item.value" :label="item.label" v-bind="item.options" /> -->
            </template>
        </template>
    </div>
</template>

<script>
  // import DatePicker from '@/common/components/date-picker.component.vue';
  // import MoneyTextField from 'vuetify-money/VuetifyMoney.vue';
  export default {
    // components: { DatePicker, MoneyTextField },
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
