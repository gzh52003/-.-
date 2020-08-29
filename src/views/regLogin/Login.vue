<template>
  <div class="form-wrap">
    <el-form class="form-box" :label-position="labelPosition" label-width="80px" :model="formData">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-row class="btn-box">
        <el-button type="primary" @click="goto" class="login-btn">登录</el-button>
      </el-row>
      <span>账号：admin 密码：123456</span>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "top",
      formData: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    goto() {
      this.$request.post("/login", this.formData).then((res) => {
        console.log("我是登录", res);
        const data = res.data;
        if (data.code === 1) {
          this.$message.success("登录成功");
          //保存token值
          let userInfo = data.data;
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          //跳转到首页
          this.$router.push({
            name: "Home",
          });
        } else {
          this.$message.error("用户名或密码错误");
        }
      });
    },
  },
};
</script>
<style lang="scss">
.form-wrap {
  height: 100%;
  background: #ccc;
  display: flex;
  position: relative;
  text-align: left;
  h2 {
    margin: 0;
    padding: 0;
    height: 40px;
    line-height: 40px;
  }
  .form-box {
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 400px;
    height: 320px;
    background: #fff;
    .btn-box {
      position: relative;
      width: 100%;
      height: 46px;
      .login-btn {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>