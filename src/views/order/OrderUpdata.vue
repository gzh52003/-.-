<template>
  <el-form
    :model="ruleForm"
    status-icon
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm form-wrap"
  >
    <el-form-item label="订单编号" prop="orderNum">
      <el-input type="text" disabled v-model="ruleForm.orderNum" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="订单价格" prop="orderPrice">
      <el-input type="text" v-model.number="ruleForm.orderPrice" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="是否付款" prop="isPay" class="isPay-box">
      <el-select v-model="ruleForm.isPay" placeholder="是" class="gender-box">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否发货" prop="isDeliver" class="isPay-box">
      <el-select v-model="ruleForm.isDeliver" placeholder="是" class="gender-box">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="add-box" style="margin:0">
      <el-button type="primary" @click="submitForm">更新</el-button>
    </el-form-item>
    <!-- 头像 -->
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        orderNum: "",
        orderPrice: "",
        isPay: "",
        isDeliver: "",
      },
      options1: [
        {
          value: "是",
          label: "是",
        },
        {
          value: "否",
          label: "否",
        },
      ],
      options2: [
        {
          value: "是",
          label: "是",
        },
        {
          value: "否",
          label: "否",
        },
      ],
    };
  },
  async created() {
    const currentOrder = JSON.parse(localStorage.getItem("currentOrder"));
    if (currentOrder) {
      //本地存存在，那么读取本地存储的
      this.ruleForm = currentOrder;
      const curOrderNum = currentOrder.orderNum;
      //当点击编辑的时候，用户名不一样的时候，需要向后端发起请求！
      if (curOrderNum !== this.orderNum) {
        //发起请求
        this.request();
      }
    } else {
      //发起请求
      this.request();
    }
  },
  methods: {
    //发起请求函数！
    async request() {
      const { id } = this.$route.params;
      this.userid = id;
      const { data } = await this.$request.get("order/" + id);
      // console.log("我是订单更新", data);
      this.ruleForm = data.data;
      // //存入本地存储
      localStorage.setItem("currentOrder", JSON.stringify(this.ruleForm));
    },
    async submitForm() {
      const { ruleForm } = this;
      const userid = ruleForm._id;
      const res = await this.$request.put("/order/" + userid, {
        ...ruleForm,
      });
      localStorage.setItem("currentOrder", JSON.stringify(res.data.data));
      this.$message.success("订单更新成功！");
      this.$router.push({
        name: "OrderList",
      });
    },
  },
};
</script>
<style lang="scss">
.form-wrap {
  padding: 20px;
  width: 600px;
  height: 300px;
  background: #fff;
  .isPay-box {
    width: 200px;
  }
  .gender-box {
    width: 80px;
  }
  .add-box {
    .el-form-item__content {
      margin-left: 30px !important;
    }
  }
}
</style>