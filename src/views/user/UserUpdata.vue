<template>
  <el-card class="card-box">
    <my-bread style="margin:10px 0" level1="用户管理" level2="用户修改"></my-bread>

    <!-- :rules="rules"表单校验的规则 -->
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="userForm"
    >
      <el-form-item label="用户名" prop="username" style="width:550px">
        <el-input type="text" v-bind:value="ruleForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="密码" style="width:550px" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="性别" style="width:550px;text-align:left" prop="gender">
        <!-- v-model.number表示只能写数字
        <el-input v-model.number="ruleForm.age"></el-input>-->
        <el-select v-model="ruleForm.gender" placeholder="请选择">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
          <el-option label="保密" value="保密"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" style="width:550px" prop="age">
        <el-input type="text" v-model.number="ruleForm.age" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item class="change">
        <!-- 点击submitform 就会把装新数据的ruleform提交到数据库 -->
        <el-button type="success" @click="submitForm()">修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      userid: "",
      ruleForm: {
        username: "",
        password: "",
        age: "",
        gender: "",
      },

      rules: {
        age: [
          { required: true, message: "年龄必填", trigger: "change" },

          { type: "number", message: "只能输入数字", trigger: "change" },
        ],
        password: [
          {
            min: 6,
            max: 12,
            message: "密码长度必须在 6 到 12 个字符",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        // valid为校验结果，全部校验通过是值为true,否则为false
        if (valid) {
          const { userid, ruleForm } = this;
          console.log(userid, ruleForm);
          const { data } = await this.$request.put("/muser/" + userid, {
            ...ruleForm,
          });

          if (data.code === 1) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
            setTimeout(() => {
              this.$router.push({
                name: "UserList",
              });
            }, 500);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },

  async created() {
    const { id } = this.$route.params;
    // console.log("我是id", id);
    const { data } = await this.$request.get("/muser/" + id);
    // console.log("我是更新", data);
    if (typeof data.data.age === "string") {
      // 转为数字
      data.data.age = data.data.age * 1;
    }
    console.log(data.data.age);
    this.userid = id;
    Object.assign(this.ruleForm, data.data);
  },
};
</script>
<style lang="scss">
.card-box {
  position: relative;
  height: 500px;
}
.userForm {
  padding: 20px;
  padding-left: 0;
  height: 300px;
  width: 560px;
  background: yellow;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 80px auto;
  .change {
    text-align: center;
  }
}
</style>
