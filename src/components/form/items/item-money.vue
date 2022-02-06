<template>
    <div>
        <label>{{item.label}}</label> 
        <!-- <input v-model="item.value" placeholder="money"> -->
        <input v-model="fValue" placeholder="money" @keypress="isNumber($event)">
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
            value: ""
        };
    },
    computed: {
        fValue: {
            // getter
            get: function() {
                if (this.value !== "") {
                    return this.formatUSD(this.value);
                }
            },
            // setter
            set: function(newValue) {
                this.value = this.parseUSD(newValue);
                this.item.value = this.value
            }
        }
    },
    methods: {
        formatUSD(num) {
            return (
                Number(num)
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
            );
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
        parseUSD(text) {
            return Number(text.replace(/,/g, ""));
        }
    }
}
</script>
