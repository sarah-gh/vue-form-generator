<template>
  <div class="complete-information">

    <div class="complete-information__content">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="complete-information__stepper-content"
          :step="index + 1"
        >
            <formGenerator
              ref="form"
              :schema="step.schema"
              :type="step.type"
              :minItemLength="step.minItemLength"
              :staticRowsData="step.staticRowsData"
              class="pb-3"
            />
        </div>
    </div>
  </div>
</template>

<script>
  // import { mapActions, mapState } from 'vuex';
  // validations
  // import { required } from '@/common/utility/form-validations';
  // import CaptchaInput from '@/common/components/captcha-field/captcha-field.vue';
  // steps
  import  formGenerator from './form-generator/form-generator.component.vue';

  import steps from './a';
  export default {
    name: 'complete-information',
    components: {
      //  FormGenerator, TitledContainer, CaptchaInputDynamicFormComponentVueSample
      formGenerator
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
    // computed: {
    //   ...mapState({
    //     publicInfo: (state) => state.signup.publicInfo,
    //     user: (state) => state.signup.user,
    //     sejamUserInformation: (state) => state.signup.user.sejamProfile,
    //   }),
    // },
    methods: {
      // ...mapActions('signup', ['requestConfirmUserInfo']),
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
      this.$refs.form.push(this.$refs.lastForm);
    },
  };
</script>

<style lang="scss" scoped>
  .complete-information {
    display: flex;
    flex-direction: column;
    $self: &;

    min-height: var(--min-step-height);

    &__stepper-content {
      padding: 0;
    }
    &__content {
      flex-grow: 1;
    }
    #{ $self }__actions {
      display: flex;
      padding: 16px 0;
      align-items: center;
      max-width: 520px;
      margin: 0 auto;
      width: 100%;
      #{ $self }__progress-container {
        flex-grow: 1;
        margin: 0 24px;
        text-align: center;

        #{ $self }__progress-counter {
          display: block;
          margin-bottom: 4px;
        }
      }
    }
  }
</style>


