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
        step: 1,
        captcha: {},
        steps: [],
      };
    },
    methods: {
      async submit() {
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
        console.log('>>>>>>>', formData);
      },
    },
    mounted() {
      this.steps = steps
    },
}
</script>

<style lang="scss">
.complete-information__content{
  width: 1100px;
  margin: 0 auto;
}
</style>