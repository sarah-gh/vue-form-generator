<template>
  <ValidationObserver tag="div" ref="form" style="width: 100%;">
      <form>
          <div v-if="message">
          </div> 
          <template v-if="type === 'simple'">
              <FormFields :items="fields" />
              <!-- <button @click.prevent="_addCard()" color="primary" class="px-10 mx-md-6 mt-5">تایید</button> -->
          </template>
          <template v-else-if="type === 'multiple'">
              <template>
                  <div max-width="1000"> 
                  <div v-if="showDialog" class="white pa-5">
                      <div class="d-flex justify-end">
                      <font-awesome-icon @click.prevent="showDialog = false" :icon="['fas', 'times']" />
                      </div>
                      <FormFields :items="fields" />
                      <button @click.prevent="_addCard()" color="primary" class="px-10 mx-md-6 mt-5">تایید</button>
                  </div>
                  </div>
              </template>
              <template>
                  <div v-if="rows.length" class="mt-4 card">
                  <div v-for="(row, index) in rows" :key="row.id">
                      <div class="mx-3 mb-3 pa-3 pb-5">
                      <div class="d-flex justify-end pr-4">
                          <font-awesome-icon @click.prevent="_removeCard(index)" :icon="['fas', 'times']" />
                      </div>
                      <div class="row no-gutters">
                          <div class="col-sm-4 col-12"
                          v-for="(i, key) in fields"
                          :key="key"
                          >
                          <b>{{ i.label }}: </b>
                          <span>{{ row.data[key] || '---' }}</span>
                          </div>
                      </div>
                      </div>
                  </div>

                  <font-awesome-icon @click.prevent="showDialog = true" :icon="['fas', 'plus']" />
                  </div>
                  <div v-else class="d-flex flex-column align-center my-7">
                  <h3 class="mb-3">لیست خالی است</h3>
                  <font-awesome-icon @click.prevent="showDialog = true" :icon="['fas', 'plus']" />
                  </div>
              </template>
          </template>
      </form>
  </ValidationObserver>
</template>

<script>
  import FormFields from './form-fields.vue';
  export default {
    components: { FormFields },
    props: {
      staticRowsData: {
        type: Array,
        default: () => [],
      },
      schema: {
        type: Object,
        required: true,
      },
      type: {
        type: String,
        default: 'simple',
        validator(value) {
          return ['table', 'multiple', 'simple'].includes(value);
        },
      },
      minItemLength: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        key: null,
        staticRows: false,
        fields: [],
        rows: [],
        showDialog: false,
        message: '',
      };
    },
    mounted() {
        console.log("form : ", this.$refs.form);
    },
    watch: {
      schema: {
        immediate: true,
        deep: true,
        handler(value) {
          const key = Object.keys(value)[0];
          this.key = key;
          this.fields = value[key];
        },
      },
      staticRowsData: { // table 
        immediate: true,
        deep: true,
        handler(value) {
          if (value) {
            value.forEach((i, index) => {
              let item;
              for (const j in this.fields) {
                item = { ...item, [j]: { ...this.fields[j] } };
              }
              for (const j in i) {
                item[j].value = i[j];
              }
              this.rows.push({
                id: index + 1,
                data: item,
              });
            });
            if (this.type === 'table' && this.rows.length === 0) {
              this.rows.push({
                id: 1,
                data: {},
              });
            }
            this.staticRows = true;
          }
        },
      },
    },
    methods: {
      isRequired(value) {
        return value ? true : 'This field is required';
      },
      _addCard() {
        const lastId = this.rows.length ? this.rows[this.rows.length - 1].id : 1;
        this.rows.push({ id: lastId + 1, data: this._getDataFromSchemaObject() });
        // this.$refs.form.reset();
        this.showDialog = false;
        this.message = undefined;
      },
      _removeCard(index) {
        this.rows.splice(index, 1);
      },
      _getDataFromRows() {
        if (this.type === 'table') {
          return this.rows.map((i) => {
            const model = {};
            for (const j in i.data) {
              model[j] = i.data[j].value || i.data[j].default;
              if (i.data[j] && i.data[j].options && i.data[j].options.covertToNumber) model[j] = +model[j];
              else model[j] = model[j] + '';
            }
            return model;
          });
        } else {
          return this.rows.map((i) => {
            let data = {};
            for (const j in i.data) {
              if (this.schema[this.key][j] && this.schema[this.key][j].options && this.schema[this.key][j].options.covertToNumber) data[j] = +i.data[j];
              else data[j] = i.data[j] + '';
            }
            return data;
          });
        }
      },
      _getDataFromSchemaObject() {
        const data = Object.entries(this.schema[this.key]);
        let formData = {};
        if (data.length === 1 && data[0][0] === 'value') {
          formData = this.schema[this.key].value.value || this.schema[this.key].value.default;
          if (this.schema[this.key].value.options && this.schema[this.key].value.options.covertToNumber) formData = +formData;
          else formData = formData? formData + '' : null;
        } else {
          data.forEach(([name, value]) => {
            formData[name] = value.value || value.default;
            if (value.options && value.options.covertToNumber) formData[name] = +formData[name];
            else formData[name] = formData[name]? formData[name] + '' : null;
          });
        }
        return formData;
      },
      getData() {
        if (!this.validate()) return;
        let formData;
        if (['table', 'multiple'].includes(this.type)) formData = this._getDataFromRows();
        else formData = this._getDataFromSchemaObject();
        return {
          [this.key]: formData,
        };
      },
      validate() {
        // if (this.$refs.form && !this.$refs.form.validate()) return false;
        if (this.type === 'multiple' && this.minItemLength && this.rows.length < this.minItemLength) {
          const message = `حداقل ${this.minItemLength} ایتم ضروری است`;
          this.message = message;
          this.$toast.showMessage({ message, color: 'error' });
          return false;
        }
        return true;
      },
    },
  };
</script>

<style lang="scss">
.col > div > div{
  display: flex;
  justify-content: space-between;
}
</style>