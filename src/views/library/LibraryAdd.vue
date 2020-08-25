<template>
  <el-card>
    <!-- 1、面包屑 -->
    <my-bread level1="图书管理" level2="图书添加"></my-bread>
    <!-- 2、提示el-alert -->
    <el-alert class="alert" title="添加图书信息" type="success" center show-icon></el-alert>
    <!-- 3、步骤条 -->
    <el-steps :active="active*1" finish-status="success" simple style="margin-top: 20px">
      <el-step title="书籍信息"></el-step>
      <el-step title="书籍封面"></el-step>
      <el-step title="更新时间"></el-step>
    </el-steps>
    <!-- 4、tab栏切换 -->
    <el-form
      label-position="top"
      label-width="80px"
      :model="form"
      style="height:400px;overflow:auto;"
    >
      <el-tabs v-model="active" tab-position="left" class="tabChange" @tab-click=" tabChange()">
        <el-tab-pane name="1" label="书籍信息">
          <el-form-item class="formItem" label="书籍名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item class="formItem" label="书籍作者">
            <el-input v-model="form.auth"></el-input>
          </el-form-item>
          <el-form-item class="formItem" label="书籍简介">
            <el-input v-model="form.intro"></el-input>
          </el-form-item>

          <el-form-item label="书籍分类">
            <!-- 级联选择器 -->
            <!-- {{selectOptions}} -->
            <el-cascader
              expandTrigger="hover"
              :options="options"
              v-model="selectOptions"
              :props="defaultPorp"
              @change="handleChange"
              clearable
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="2" label="书籍封面">
          <el-form-item>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="3" label="更新时间">
          <el-form-item>
            <div class="block">
              <el-date-picker
                v-model="date1"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions"
                @change="dateChange"
                format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </div>
            <el-button type="success" style="margin-top:20px" @click="addBook">点击添加小说书籍</el-button>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      active: "1",
      // 添加书籍的表单数据
      // this.$http.post(url,this.form)
      form: {
        name: "",
        intro: "",
        auth: "",
      },
      options: [],
      // 默认的选项 数据库中的 cat_id
      selectOptions: [111, 120, 121],
      defaultPorp: {
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      // 动态数据
      arrDyparams: ["尺寸", "版本", "长宽"],
      // 复选框
      checkList: [],
      // 更新时间
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      date1: "",
      setTime: "",
    };
  },
  // 页面一加载就获取
  created() {
    this.getGoodsCate();
  },
  methods: {
    // 如果点击的是第二个tab 同时 三级分类要有值
    async tabChange() {
      if (this.active === "2") {
        if (this.selectOptions.length !== 3) {
          //提示
          this.$message.warning("请先选择书籍的三级分类");
          return;
        }
      } else if (this.active === "3") {
        // console.log(1);
        if (this.selectOptions.length !== 3) {
          //提示
          this.$message.warning("请先选择书籍的三级分类");
          return;
        }
      }
    },

    // 级联选择器@change 触发方法
    handleChange() {},
    // 获取书籍分类的信息
    async getGoodsCate() {
      const res = await this.$request.get("/goods");
      console.log(res);
      this.options = res.data;
    },

    // 图片上传
    handleRemove(file, fileList) {
      console.log("移除");
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(file) {
      console.log("成功");
      console.log(file);
    },

    // 时间事件
    dateChange(val) {
      // console.log(1, val);
      this.setTime = val;
      // console.log(this.setTime);
    },

    // 添加商品 发送请求
    async addBook() {
      if (this.form.name === "") {
        this.$message.error("请输入书籍名称");
        return;
      } else if (this.form.auth === "") {
        this.$message.error("请输入书籍作者");
        return;
      } else if (this.form.intro === "") {
        this.$message.error("请输入书籍简介");
        return;
      } else {
        this.form.date = this.setTime;
        const res = await this.$request.post("/mlibrary", this.form);
        console.log(res);
        this.$message.success("添加书籍成功");
      }
    },
  },
};
</script>

<style>
.alert {
  margin-top: 20px;
}
.tabChange {
  margin-top: 20px;
}
.formItem {
  width: 1100px;
}
/* 更新时间 */
.el-picker-panel {
  top: 265px;
  margin-top: 0;
  margin-left: 450px;
}
</style>