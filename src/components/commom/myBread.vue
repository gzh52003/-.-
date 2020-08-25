<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  //给组件起一个名字！
  name: "my-bread",
  data() {
    return {
      //在父组件引用这个组件的时候，通过自定义的属性的方式传值即可！
    };
  },
  props: ["level1", "level2"],
};
</script>