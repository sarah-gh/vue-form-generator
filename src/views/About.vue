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
              <myForm
                ref="form"
                :schema="step.schema"
                :type="step.type"
                :minItemLength="step.minItemLength"
                :staticRowsData="step.staticRowsData"
                class="pb-3"
              />
              <!-- <button @click="aaa"></button> -->
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import form from '@/components/form/form.vue';
import steps from '@/components/a';

export default {
  name: "about",
  components: {
    myForm : form
  },
  data() {
      return {
        loading: false,
        error: undefined,
        // rules: { required },
        step: 1,
        captcha: {},
        steps: [],
        lastStep: {
          title: 'سایر توضیحات',
          schema: {
            otherComment: {
              value: {
                mode: 'textarea',
                label: 'سایر توضیحات',
                md: 12,
                value: null,
                options: {
                  rules: [],
                },
              },
            },
          },
        },
      };
    },
    methods: {
      aaa() {

      },
      changeStep(value) {
        let isValid = true;
        if (this.step < value) isValid = this.$refs.form[this.step - 1].validate();
        if (isValid) this.step = value;
      },
      progressValue(step) {
        return Math.floor((step * 100) / (this.steps.length + 1));
      },
      setCaptchaToken(data) {
        this.captcha.token = data.token;
        console.log(this.captcha);
      },
      async submit() {
        const lastFormValidate = this.$refs.lastForm.validate();
        const captchaValidate = this.$refs.captcha.validate();
        if (!lastFormValidate || !captchaValidate) {
          return;
        }
        let formData = {};
        this.$refs.form.forEach((i) => {
          let data = i.getData();
          formData = {
            ...formData,
            ...data,
          };
        });
        for (const i in formData) {
          if (Array.isArray(formData[i]) && formData[i].length === 0) {
            formData[i] = null;
          } else if (typeof formData[i] === 'object' && !Array.isArray(formData[i]) && formData[i] !== null) {
            let f = false;
            const values = Object.values(formData[i]);
            jFor: for (const j of values) {
              if (j === null) {
                f = true;
                break jFor;
              }
            }
            console.log(f, formData[i]);
            if (f) {
              formData[i] = null;
            }
          }
        }
        formData.captcha = this.captcha;
        const { uniqueKey, id } = this.user;
        formData.id = id;
        formData.uniqueKey = uniqueKey;
        try {
          this.loading = true;
          await this.requestConfirmUserInfo({ body: formData, method: 'put' });
        } catch (error) {
          this.error = error;
        } finally {
          this.loading = false;
        }
      },
    },
    mounted() {
      this.steps = steps
      console.log(this.user, this.sejamUserInformation, this.publicInfo);
      // this.$refs.form.push(this.$refs.lastForm);
      // console.log(this.$refs.form);
    },
}
</script>