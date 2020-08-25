<template>
  <!-- 将图片真实在卡片内 相当于个容器 -->
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 一行显示el-row -->
    <el-row class="search">
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" class="inputSearch">
          <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" @click="dialogFormVisibleAdd = true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 用户列表 -->
    <el-table ref="multipleTable" :data="userlist" tooltip-effect="dark" style="width: 100%">
      <!-- type是selection 则显示多选框 如果是index 则显示行号 从1开始 计算 prop是字段名-->
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="#" width="120" type="index"></el-table-column>
      <el-table-column prop="username" label="用户名" width="220"></el-table-column>
      <el-table-column prop="age" label="年龄" width="180"></el-table-column>
      <el-table-column prop="gender" label="性别" width="180" show-overflow-tooltip></el-table-column>

      <el-table-column label="操作" show-overflow-tooltip>
        <template v-slot:default="scope">
          <el-button
            size="small"
            @click="goto(scope.row._id)"
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
          <el-button
            size="small"
            @click="deleteUser(scope.row._id)"
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="fenye"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentpage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加用户对话框 -->

    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" label-width="100px">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="100px">
          <el-input v-model="form.gender" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      query: "",
      userlist: [],
      // 当前页
      currentpage: 1,
      // 页面数量
      pagesize: 2,
      // 总数 默认为0 分页的总数
      total: 0,
      dialogFormVisibleAdd: false,
      form: {
        username: "",
        password: "",
        age: "",
        gender: "",
      },
    };
  },
  async created() {
    const { data } = await this.$request.get(`/muser`);
    // const { data } = await this.$request.get(`/user?page=`+ this.currentpage + `&size=` + this.pagesize);
    this.userlist = data.data;
    this.total = this.userlist.length;
  },
  methods: {
    async deleteUser(id) {
      this.$confirm("你确认要删除这条数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const { data } = await this.$request.delete("/muser/" + id);
        if (data.code === 1) {
          this.userlist = this.userlist.filter((item) => item._id !== id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        }
      });
    },
    goto(id) {
      // console.log(id);
      this.$router.push({
        name: "UserUpdata",
        // 将id传过去
        params: { id },
      });
      // this.$router.push("/user/update/" + id);
    },

    async searchUser() {
      console.log(this.query);
      const { data } = await this.$request.get(`/muser?username=` + this.query);
      console.log(data);
      if (data.code === 1) {
        this.userlist = data.data;
        this.$message({
          type: "success",
          message: "搜索成功!",
        });
      }
      this.query = "";
    },
    // 切换每页几条时触发
    async handleSizeChange(val) {
      console.log(`每页 ${val} 条`, this.currentpage);
      this.pagesize = val;
      const { data } = await this.$request.get(
        `/muser?page=` + this.currentpage + `&size=` + val
      );
      console.log(data);
      this.userlist = data.data;
    },
    // 切换页码时触发
    async handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      const { data } = await this.$request.get(
        `/muser?page=` + val + `&size=` + this.pagesize
      );
      console.log(data);
      this.userlist = data.data;
      // 把此时切换到的页码赋值到数据上 避免切换每页几条的函数时从第一页开始
      this.currentpage = val;
    },

    // 添加用户
    async addUser() {
      // 设置为false 不关怎样都要对话框消失 写在弹窗前面消失
      this.dialogFormVisibleAdd = false;
      console.log(999);
      const { data } = await this.$request.post(`/muser`, this.form);
      console.log(data);
      if (data.result.ok === 1) {
        // console.log("添加成功")
        alert("添加用户成功");
        // 重新获取数据库数据 渲染页面
        const { data: data2 } = await this.$request.get(`/muser`);
        this.userlist = data2.data;
        // 添加成功后 并且让分页部分的总数改变
        this.total = this.userlist.length;
      } else {
        alert("添加用户失败");
      }
    },
  },
};
</script>
<style lang="scss">
.car-box {
  height: 100%;
}

.search {
  text-align: left;
  margin: 10px 0;
  .inputSearch {
    width: 300px;
  }
}
.fenye {
  margin: 30px 0;
}
</style>