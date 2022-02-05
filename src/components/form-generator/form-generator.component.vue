<template>
  <form ref="form">
    <div v-if="message">
      <!-- <v-alert @input="message = undefined" dismissible class="mt-5" type="error" dense outlined text>
        {{ message }}
      </v-alert> -->
    </div>

    <template v-if="type === 'simple'">
      <FormGeneratorFields :items="fields" />
    </template>
    <template v-else-if="type === 'multiple'">
      <template>
        <!-- v-model="showDialog" -->
        <div max-width="1000"> 
          <div v-if="showDialog" class="white pa-5">
            <div class="d-flex justify-end">
              <button @click="showDialog = false" icon>
                <i>mdi-close</i>
              </button>
            </div>
            <FormGeneratorFields :items="fields" />
            <button @click="_addCard()" color="primary" class="px-10 mx-md-6 mt-5">تایید</button>
          </div>
        </div>
      </template>
      <template>
        <div v-if="rows.length" class="mt-4">
          <div v-for="(row, index) in rows" :key="row.id" flat>
            <div class="mx-3 mb-3 pa-3 pb-5">
              <div class="d-flex justify-end pr-4">
                <button @click="_removeCard(index)" icon color="error" class="mr-4">
                  <i>mdi-close</i>
                </button>
              </div>
              <div class="row no-gutters">
                <div class="col-sm-4 col-12"
                  v-for="(i, key) in fields"
                  :key="key"
                  :cols="i.cols || 12"
                  :sm="i.sm"
                  :md="i.md"
                  :lg="i.lg"
                  :xl="i.xl"
                >
                  <b>{{ i.label }}: </b>
                  <span>{{ row.data[key] || '---' }}</span>
                </div>
              </div>
            </div>
          </div>

          <button @click="showDialog = true" dark class="mt-4 mr-4 success"><i>mdi-plus</i></button>
        </div>
        <div v-else class="d-flex flex-column align-center my-7">
          <h3 class="mb-3">لیست خالی است</h3>
          <button @click="showDialog = true" color="success"><i>mdi-plus</i>افزودن ایتم جدید</button>
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i, index) in rows" :key="index">
            <td v-for="(j, jIndex) in i.data" :key="`td_${jIndex}`">
              <FormGeneratorFieldHandler :item="j" />
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </form>
</template>

<script>
  import FormGeneratorFields from './form-generator-fields.component.vue';
  import FormGeneratorFieldHandler from './form-generator-field-handler.component.vue';
  export default {
    components: { FormGeneratorFields, FormGeneratorFieldHandler },
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
      staticRowsData: {
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
      _addCard() {
        if (!this.$refs.form.validate()) return;
        const lastId = this.rows.length ? this.rows[this.rows.length - 1].id : 1;
        this.rows.push({ id: lastId + 1, data: this._getDataFromSchemaObject() });
        this.$refs.form.reset();
        this.showDialog = false;
        this.message = undefined;
      },
      _removeCard(index) {
        this.rows.splice(index, 1);
      },
      _getDataFromRows() {
        if (this.type === 'table') {
          console.log(this.rows);
          return this.rows.map((i) => {
            const model = {};
            for (const j in i.data) {
              model[j] = i.data[j].value || i.data[j].default;
              // if (i.data[j]?.options?.covertToNumber) model[j] = +model[j];
              // else model[j] = model[j] + '';
            }
            return model;
          });
        } else {
          return this.rows.map((i) => {
            console.log(i);
            let data = {};
            for (const j in i.data) {
              console.log(this.schema[this.key][j]);
              // if (this.schema[this.key][j]?.options?.covertToNumber) data[j] = +i.data[j];
              // else data[j] = i.data[j] + '';
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
          // if (this.schema[this.key].value?.options?.covertToNumber) formData = +formData;
          // else formData = formData? formData + '' : null;
        } else {
          data.forEach(([name, value]) => {
            formData[name] = value.value || value.default;
            // if (value?.options?.covertToNumber) formData[name] = +formData[name];
            // else formData[name] = formData[name]? formData[name] + '' : null;
          });
        }
        return formData;
      },
      getData() {
        if (!this.validate) return;
        let formData;
        if (['table', 'multiple'].includes(this.type)) formData = this._getDataFromRows();
        else formData = this._getDataFromSchemaObject();
        return {
          [this.key]: formData,
        };
      },
      validate() {
        if (this.$refs.form && !this.$refs.form.validate()) return false;
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

<style>
.row.no-gutters>.col, .row.no-gutters>[class*=col-] {
    padding: 0;
}

.col-12 {
    flex: 0 0 100%;
    max-width: 100%;
}
.col, .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col-auto, .col-lg, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-auto, .col-md, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md-auto, .col-sm, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-auto, .col-xl, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl-auto {
    width: 100%;
    padding: 12px;
}
.row{
  display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
    margin: -12px;
}
.no-gutters{
  margin: 0;
}
.v-sheet.v-card {
    border-radius: 4px;
}
.theme--light.v-card {
    background-color: #fff;
    color: rgba(0,0,0,.87);
}
.theme--light.v-sheet--outlined {
    border: thin solid rgba(0,0,0,.12);
}
.theme--light.v-sheet {
    background-color: #fff;
    border-color: #fff;
    color: rgba(0,0,0,.87);
}
.v-card {
    border-width: thin;
    display: block;
    max-width: 100%;
    outline: none;
    text-decoration: none;
    transition-property: box-shadow,opacity;
    overflow-wrap: break-word;
    position: relative;
    white-space: normal;
}
.v-sheet {
    border-radius: 0;
}
  ::v-deep .v-input {
    text-align: right;
  }

  .form-table {
    table-layout: fixed;
    border-radius: 5px;
    font-size: 12px;
    font-weight: normal;
    border: none;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    background-color: white;
  }

  .form-table td,
  .form-table th {
    text-align: center;
    padding: 8px;
  }

  .form-table td {
    border-right: 1px solid #f8f8f8;
    font-size: 12px;
  }

  .form-table thead th {
    color: #ffffff;
    background: var(--v-primary-base);
  }

  .form-table tr:nth-child(even) {
    background: #f8f8f8;
  }

  .badge {
    margin: 5px;
    display: inline-block;
    padding: 4px 7px;
    color: rgb(13, 56, 119);
    border: rgb(13, 56, 119) 1px solid;
    border-radius: 5px;
  }

  /* Responsive */

  @media (max-width: 767px) {
    .form-table,
    .cms table {
      display: block;
      width: 100%;
    }

    .table-wrapper:before {
      content: 'Scroll horizontally >';
      display: block;
      text-align: right;
      font-size: 11px;
      color: white;
      padding: 0 0 10px;
    }

    .form-table thead,
    .form-table tbody,
    .form-table thead th {
      display: block;
    }

    .form-table thead th:last-child {
      border-bottom: none;
    }

    .form-table thead {
      float: right;
    }

    .form-table tbody {
      width: auto;
      position: relative;
      overflow-x: auto;
    }

    .form-table td,
    .form-table th {
      padding: 0.625em;
      vertical-align: middle;
      box-sizing: border-box;
      overflow-x: hidden;
      overflow-y: auto;
      min-width: 100%;
      width: max-content;
      height: 57px;
      font-size: 13px;
      display: flex !important;
      flex-direction: column;
      justify-content: center;
      text-overflow: ellipsis;
    }

    .form-table thead th {
      text-align: right;
      border-bottom: 1px solid #f7f7f9;
    }

    .form-table tbody tr {
      display: table-cell;
    }

    .form-table tbody tr:nth-child(odd) {
      background: none;
    }

    .form-table tr:nth-child(even) {
      background: transparent;
    }

    .form-table tr td:nth-child(odd) {
      background: #f8f8f8;
      border-right: 1px solid #e6e4e4;
    }

    .form-table tr td:nth-child(even) {
      border-right: 1px solid #e6e4e4;
    }

    .form-table tbody td {
      display: block;
      text-align: center;
    }
  }
  .form-table td {
    white-space: pre-wrap;
    word-break: break-word;
  }
  @media (min-width: 600px){
.col-sm-4 {
    flex: 0 0 33.3333333333%;
    max-width: 33.3333333333%;
}
}

</style>
