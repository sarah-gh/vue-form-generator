<template>
  <div class=" row mt-3 px-md-6">
    <div class="col py-0"
      v-for="(i, key) in items"
      :key="key"
    >
      <div :class="i.cssClasses">
        <FormFieldItems :item="i" />
      </div>
    </div>
  </div>
</template>

<script>
  import FormFieldItems from './form-field-items.vue';
  export default {
    components: { FormFieldItems },
    props: {
      items: {
        required: true,
      },
    },
  };
</script>
