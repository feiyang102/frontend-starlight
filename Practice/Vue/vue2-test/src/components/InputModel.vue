<template>
  <div>
    <input :value="value" @input="handleInput" type="text" />
  </div>
</template>

<script>
export default {
  name: "InputModel",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleInput(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style></style>
