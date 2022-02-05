<template>
  <div class="home">
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
      return {
        autoCompleteStyle : {
          vueSimpleSuggest: "position-relative",
          inputWrapper: "",
          defaultInput : "form-control",
          suggestions: "position-absolute list-group z-1000",
          suggestItem: "list-group-item"
        },
        chosen: ''
      }
    },
    methods: {
      simpleSuggestionList() {
        return [
          'Vue.js',
          'React.js',
          'Angular.js'
        ]
      }
    }
}
</script>

<style scoped>
.home {
  direction: rtl;
}
</style>