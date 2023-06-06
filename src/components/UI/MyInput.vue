<template lang="">
    
        <input class="input"
        :value = "modelValue" 
        @input="updateInput"
        type="text"
        />
    
</template>
<script>
export default {
  name: 'my-input',
  props: {
    modelValue: [String, Number]
  }
  , methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>
<style scoped >
.input {

  margin-bottom: 10px;
  padding: 5px;
  border: 2px solid rgb(18, 190, 190);

}
</style>