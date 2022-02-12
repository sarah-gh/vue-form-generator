<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="complete-information">

        <div class="complete-information__content">
            <div
                v-for="(step, index) in steps"
                :key="index"
                class="complete-information__stepper-content"
                :step="index + 1"
            >
            <h2>{{step.title}}</h2>
                <myForm
                    ref="form"
                    :rowsForm="rowsss[index]"
                    :schema="step.schema"
                    :type="step.type"
                    :minItemLength="step.minItemLength"
                    :staticRowsData="step.staticRowsData"
                    class="pb-3"
                />
                <hr>
            </div>
        </div>
        <button @click="submit()">click me!!!!!!!!!!!</button>
    </div>
  </div>
</template>

<script>
import form from '@/components/form/form.vue';
import {arr, arr1, arr2, arr3, arr4, arr5, arr6, arr7} from './data.js';

export default {
  name: "about",
  components: {
    myForm : form
  },
  data() {
      return {
        loading: false,
        error: undefined,
        step: 1,
        rowsss: [],
        captcha: {},
        steps: [],
      };
    },
    methods: {
      async submit() {
        let formData = {};
        for await (const i of this.$refs.form) {
            let data = i.getData();
            if(data == false) {
                console.log('false');
                return 
            } else {
                formData = {
                    ...formData,
                    ...data,
                };
            }
        }
        // this.$refs.form.forEach( async (i) => {
        //     let data = i.getData();
        //     if(data == false) {
        //         console.log('false');
        //         return 
        //     } else {
        //         formData = {
        //             ...formData,
        //             ...data,
        //         };
        //     }
            
        // });
        console.log('>>>>>>>', formData);
        for (const i in formData) {
          if (Array.isArray(formData[i]) && formData[i].length === 0) {
            formData[i] = null;
          } else if (typeof formData[i] === 'object' && !Array.isArray(formData[i]) && formData[i] !== null) {
            let f = true;
            const values = Object.values(formData[i]);
            for (const j of values) {
              if (j !== null) {
                f = false;
              }
            }
            if (f) {
              formData[i] = null;
            }
          }
        }
        // console.log('>>>>>>>', formData);
      },
    },
    mounted() {
        console.log(arr1);
        const a = [arr1, arr2, arr3, arr4, arr5, arr6, arr7]
        this.rowsss = [[]]
        a.forEach((element, index) => {
            this.rowsss.push([])
            element.forEach((e, i) => {
                this.rowsss[index+1].push({
                    id: i,
                    data: e
                })
            })
        });
        let data = []
        const s = {
            name: {
                mode: 'text',
                label: 'نام',
                value: null,
                cssClasses: ['mt-5'],
                options: {
                    rules: 'required|min:3',
                },
            },
            formula: {
                mode: 'select',
                label: 'فرمول نویس',
                md: 4,
                value: null,
                options: {
                    rules: '',
                    multiple: false,
                    values: [
                        100, 200, 300, 400, 500, 600, 700, 800
                    ],
                    att: {
                        name: 'aaa',
                        value: 'formula',
                    },
                    items: [
                        'تست فرمول نويس',
                        'تست ضرب',
                        'ساير اندوخته ها',
                        '100 درصد',
                        '100 درصد دوم',
                        '50 درصد',
                        'اندوخته قانوني',
                        'سرمايه گذاري در ساير بانک ها'
                    ]
                },
            },
            codeSarfasl: {
                mode: 'text',
                label: 'کد سرفصل',
                value: null,
                cssClasses: ['mt-5'],
                options: {
                    rules: '',
                    att: {
                        name: 'aaa',
                        value: 'codeSarfasl',
                    },
                    covertToNumber: true
                },
            },
            value: {
                mode: 'text',
                label: 'مقدار',
                value: null,
                cssClasses: ['mt-5'],
                options: {
                    rules: '',
                    att: {
                        name: 'aaa',
                        value: 'value',
                    },
                    covertToNumber: true
                },
            },
        }
        data.push({
            title: '',
            schema: {
                thePurposeOfTheInvestment: {
                    item1: {
                        mode: 'text',
                        label: 'عنوان',
                        value: null,
                        cssClasses: ['mt-5'],
                        options: {
                            rules: 'required|min:3',
                        },
                    },
                    item2: {
                        mode: 'date-picker',
                        label: 'تاریخ',
                        value: null,
                        cssClasses: ['mt-5'],
                        options: {
                            rules: 'required|min:3',
                        },
                    },
                    item3: {
                        mode: 'textarea',
                        label: 'توضیحات',
                        value: null,
                        cssClasses: ['mt-5'],
                        options: {
                            rules: '',
                        },
                    },
                }
            }
        })
        arr.forEach((element, i) => {
            const item = {
                title: element.title,
                type: 'multiple',
                minItemLength: 0,
                schema: {
                    
                },
            }
            data.push(item)
        });
        data.forEach((element, i) => {
            element.schema['items'+i] = JSON.parse(JSON.stringify(s));
        });
        this.steps = data
    },
}
</script>

<style lang="scss">
.complete-information__content{
  width: 1100px;
  margin: 0 auto;
}
// <select class="form-control au-target" value.bind="row.formula" disabled.bind="row.isSpecialType=='4'" change.trigger="specialChange(row,'1','codeSarfasl','manual')" au-target-id="102">
//     <option value.bind="-1" class="au-target" au-target-id="103" value="-1">انتخاب کنید</option>
//     <option value.bind="el.id" class="au-target" au-target-id="104" value="125737">ذذذذ
//     </option><option value.bind="el.id" class="au-target" au-target-id="104" value="125735">ززززز
//     </option><option value.bind="el.id" class="au-target" au-target-id="104" value="125727">تست فرمول نويس
//     </option><option value.bind="el.id" class="au-target" au-target-id="104" value="125707">تست ضرب
//     </option><option value.bind="el.id" class="au-target" au-target-id="104" value="125637">مازاد تجديد ارزيابي دارايي ها ثابت
//     </option><option value.bind="el.id" class="au-target" au-target-id="104" value="125636">ساير اندوخته ها
//     </option><option value.bind="el.id" class="au-target" au-target-id="104" value="125635">ذخيره مطالبات مشکوک الوصول
//     </option><option value.bind="el.id" class="au-target" au-target-id="104" value="125634">100 درصد پنجم
//     </option><option value.bind="el.id" class="au-target" au-target-id="104" value="125633">100 درصد چهارم
//     </option><option value.bind="el.id" class="au-target" au-target-id="104" value="125632">100 درصد سوم
//     </option><option value.bind="el.id" class="au-target" au-target-id="104" value="125631">100 درصد دوم
//     </option><option value.bind="el.id" class="au-target" au-target-id="104" value="125630">100 درصد
//     </option><option value.bind="el.id" class="au-target" au-target-id="104" value="125628">سود و زيان انباشته
//     </option><option value.bind="el.id" class="au-target" au-target-id="104" value="125627">50 درصد
//     </option><option value.bind="el.id" class="au-target" au-target-id="104" value="125626">20 درصد
//     </option><option value.bind="el.id" class="au-target" au-target-id="104" value="125625">اندوخته قانوني
//     </option><option value.bind="el.id" class="au-target" au-target-id="104" value="125624">سرمايه گذاري در ساير بانک ها
//     </option><!--anchor-->
// </select>
</style>

