<template>
<div>
  <ValidationObserver tag="div" ref="form" style="width: 100%;">
      <form>
          <template v-if="type === 'simple'">
              <FormFields :items="fields" @dependency="itemDependency" />
              <p>{{ message }}</p>
          </template>
          <template v-else-if="type === 'multiple'">
              <template>
                  <div max-width="1000"> 
                  <div v-if="showDialog" class="white formFields pa-5">
                      <button class="close-form" @click.prevent="closeform">
                        <font-awesome-icon :icon="['fas', 'times']" />
                      </button>
                      <FormFields :items="fields" @dependency="itemDependency" />
                      <p class="error">{{ message }}</p>
                      <button @click.prevent="_addCard()" color="primary" class="px-10 mx-md-6 mt-5">تایید</button>
                  </div>
                  </div>
              </template>
              <template>
                  <div v-if="rows.length" class="mt-4 card">
                    <div v-for="(row, index) in rows" :key="row.id">
                        <div class="mx-3 mb-3 pa-3 pb-5">
                          <div style="display: flex">
                            <button class="remove-card" @click.prevent="_removeCard(index)">
                              <font-awesome-icon  :icon="['fas', 'times']" />
                            </button>
                            <button class="edit-form" @click.prevent="_editCard(index)">
                              edit
                            </button>
                          </div>
                          <div class="row no-gutters card-items">
                              <div class="col-sm-4 col-12 card-item"
                              v-for="(i, key) in fields"
                              :key="key"
                              >
                              <b>{{ i.label }}: </b>
                              <span>{{ row.data[key] || '---' }}</span>
                              </div>
                          </div>
                        </div>
                    </div>
                    <button class="plus-form" @click.prevent="showDialog = true">
                      <font-awesome-icon :icon="['fas', 'plus']" />
                    </button>
                  </div>
                  <div v-else class="d-flex flex-column align-center my-7">
                    <h3 class="mb-3">لیست خالی است</h3>
                    <button class="plus-form" @click.prevent="showDialog = true">
                      <font-awesome-icon :icon="['fas', 'plus']" />
                    </button>
                  </div>
              </template>
          </template>
          <template v-if="type === 'table'">
            <table class="form-table my-5">
              <thead>
                <tr>
                  <th v-for="(i, index) in fields" :key="index">
                    {{ i.label }}
                  </th>
                  <th>
                    delete
                  </th>
                </tr>
              </thead>
              
              <tbody>
                <tr v-for="(i, index) in rows" :key="'tr_'+index">
                  <td v-for="(j, jIndex) in i.data" :key="`td_${jIndex}`">
                    <FormFieldItems :item="j" />
                  </td>
                  <td @click="deleteRow(index)">
                    delete {{ index }}
                  </td>
                </tr>
              </tbody>
            </table>
        </template>
      </form>
  </ValidationObserver>
  </div>
</template>

<script>
  import FormFields from './form-fields.vue';
  import FormFieldItems from './form-field-items.vue';
  export default {
    components: { FormFields, FormFieldItems },
    props: {
      staticRowsData: {
        type: Array,
        default: () => [],
      },
      schema: {
        type: Object,
        required: true,
      },
      rowsForm: {
        type: Array,
        required: false,
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
        mode: {
          bool: false,
          index: -1
        },
        showDialog: false,
        message: '',
        dependency: []
      };
    },
    mounted() {
      this.rows = this.rowsForm || []
      console.log("this.schema  : ", this.schema );
      for (const key in this.schema) {
        for (const k in this.schema[key]) {
          if(this.schema[key][k].options && this.schema[key][k].options.att) {
            this.dependency.push(this.schema[key][k].options.att)
          };
        }
      }
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
      itemDependency(item) {
        for (const key in this.fields) {
          if(this.fields[key].options &&
            this.fields[key].options.att &&
            item.options && item.options.att &&
            this.fields[key].options.att.name === item.options.att.name && 
            this.fields[key].options.att.value !== item.options.att.value)
          {
            this.fields[key].value = null;
          }
        }
      },
      closeform() {
        this.showDialog = false;
        this.mode.bool = false;
      },
      _editCard(index) {
        this.setDataToSchemaObject(this.rows[index])
        this.showDialog = true;
        this.mode.bool = true;
        this.mode.index = this.rows[index].id
      },
      _addCard() {
        if(this.mode.bool){
          this.$refs.form.validate().then(async success => {
            if (!success) {
              console.log(false);
              return false;
            }
            if(!this.dependence()) return false
            this.rows.splice(+this.mode.index, 1);
            this.rows.push({ id: +this.mode.index , data: this._getDataFromSchemaObject() });
            // this.$refs.form.reset();
            this.showDialog = false;
          })
        }
        else {
          this.$refs.form.validate().then(async success => {
            if (!success) {
              console.log(false);
              return false;
            }
            if(!this.dependence()) return false
            const lastId = this.rows.length ? this.rows[this.rows.length - 1].id : -1;
            this.rows.push({ id: lastId + 1, data: this._getDataFromSchemaObject() });
            // this.$refs.form.reset();
            this.showDialog = false;
          })
        }
        this.mode.bool = false
      },
      dependence() {
        if(this.dependency.length > 0) { //////////
          let isAtt = false
          let isVal = false
          for (const key in this.fields) {
            if(this.fields[key].options &&
              this.fields[key].options.att ) {
                isAtt = true;
            }
          }
          if(isAtt){
            for (const key in this.fields) {
              if(this.fields[key].options &&
                this.fields[key].options.att && 
                this.fields[key].value)
              {
                isVal = true
              }
            }
          }

          if(isAtt && !isVal) {
            this.message = ' یکی از مقادیر وابسته باید پر شود'
            return false
          } else {
            this.message = ''
            return true
          }
        }
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
      setDataToSchemaObject(data) {
        let id = data.id;
        for(const k in this.schema[this.key]){
          this.schema[this.key][k].value = data.data[k]
        }
      },
      resetForm() {

      },
      getData() {
        if (!this.validate()) return false;
        let formData;
        if (['table', 'multiple'].includes(this.type)) formData = this._getDataFromRows();
        else formData = this._getDataFromSchemaObject();
        return {
          [this.key]: formData,
        };
      },
      validate() {
        console.log('this.$refs.form.validate() : ', this.$refs.form.validate());
        // this.$refs.form.validate().then(function(result) {
        //   console.log(result);
        // }).catch((e)=> {
        //   console.log(e);
        // });
        if (this.$refs.form && !(this.$refs.form.validate())) return false;
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