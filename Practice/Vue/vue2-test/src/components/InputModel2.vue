<template>
  <div class="c-input">
    <input v-model="inputData" @input="changeInp" />
  </div>
</template>

<script>
export default {
  name: "NumPwdInput",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      inputData: "",
    };
  },
  watch: {
    value: {
      handler(value) {
        this.inputData = value;
      },
      immediate: true,
    },
    inputData: {
      handler(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    changeInp(e) {
      const { value } = e.target;
      this.inputData = value.replace(/[^0-9]/g, () => "");
    },
  },
};
</script>

<style scoped></style>
