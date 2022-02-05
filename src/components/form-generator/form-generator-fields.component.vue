<template>
  <div class=" row mt-3 px-md-6">
    <div class="col py-0"
      v-for="(i, key) in items"
      :key="key"
      :cols="i.cols || 12"
      :sm="i.sm"
      :md="i.md"
      :lg="i.lg"
      :xl="i.xl"
    >
      <div :class="i.cssClasses">
        
        <FormGeneratorFieldHandler :item="i" />
      </div>
    </div>
  </div>
</template>

<script>
  import FormGeneratorFieldHandler from './form-generator-field-handler.component.vue';
  export default {
    components: { FormGeneratorFieldHandler },
    props: {
      items: {
        required: true,
      },
    },
  };
</script>

<style >
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

</style>