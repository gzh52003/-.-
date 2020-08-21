<template>
  <div>
    <el-button type="primary" @click="goto">主要按钮</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    goto() {
      console.log(1);
      this.$router.push("/home");
    },
  },
};
</script>