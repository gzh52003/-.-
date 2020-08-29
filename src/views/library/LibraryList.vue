<template>
  <el-card>
    <!-- 1、面包屑 -->
    <my-bread level1="图书管理" level2="图书列表"></my-bread>
    <!-- 2、输入框 -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入书名"
        v-model="query"
        class="iptSearch"
        clearable
        @clear="loadGoodsList"
        @chnage="loadGoodsList"
      >
        <el-button slot="append" icon="el-icon-search" @click="searchBook()"></el-button>
      </el-input>
      <el-button type="success" @click="$router.push('/library/add')">添加图书</el-button>
    </div>
    <!-- 3、表格 -->
    <el-table :data="booksData" style="width: 100%">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="name" label="书名" width="180"></el-table-column>
      <el-table-column prop="auth" label="作者" width="120"></el-table-column>
      <el-table-column prop="intro" label="书籍简介" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="date" label="更新时间" width="150"></el-table-column>
      <el-table-column label="操作" width="180">
        <template v-slot:default="scope">
          <el-button
            type="primary"
            plain
            icon="el-icon-edit"
            circle
            @click="editbook(scope.row._id)"
          ></el-button>
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            circle
            @click="deletebook(scope.row._id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 4、分页 -->
    <div class="block pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- dialog -->
    <el-dialog title="修改图书信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="书名" label-width="120px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" label-width="120px">
          <el-input v-model="form.auth" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="书籍简介" label-width="120px">
          <!-- <el-input v-model="form.auth" autocomplete="off"></el-input> -->
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="更新时间" label-width="120px">
          <el-input v-model="form.date" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      // 表格绑定的数据
      booksData: [],
      page: 1,
      size: 5,
      total: 0,
      // 分页数据
      // 对话框
      dialogFormVisible: false,
      form: {
        name: "",
        intro: "",
        auth: "",
        date: "",
      },
      pid: "",
    };
  },
  // 创建前加载数据并渲染
  created() {
    this.getGoodsList();
  },
  methods: {
    // 获取数据并渲染到页面
    async getGoodsList() {
      const res = await this.$request.get(
        `/library?query=${this.query}&page=${this.page}&size=${this.size}`
      );
      if (res.status === 200) {
        // 1、给表格数据赋值
        this.booksData = res.data.data.result;
        // console.log(this.booksData)
        // 2、给total赋值
        this.total = res.data.data.datalen;
        // 3、提示
        this.$message({
          type: "success",
          message: "获取图书列表成功!",
        });
      }
    },
    // 分页
    handleSizeChange(val) {
      this.size = val;
      this.page = 1;
      this.getGoodsList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getGoodsList();
      console.log(`当前页: ${val}`);
    },
    // 搜索书名
    async searchBook() {
      if (this.query) {
        const res = await this.$request.get(
          `/library?query=${this.query}&page=${this.page}&size=${this.size}`
        );
        console.log("我是搜索", res);
        if (res.status === 200) {
          // 1、给表格数据赋值
          this.booksData = res.data.data.result;
          // 2、给total赋值
          this.total = res.data.data.result.length;
          // 3、提示
          this.$message({
            type: "success",
            message: "获取图书列表成功!",
          });
        }
      } else {
        // 3、提示
        this.$message({
          type: "error",
          message: "请输入书名后再查询哦",
        });
      }
    },
    // 清空输入框并重新获取数据
    loadGoodsList() {
      this.getGoodsList();
      console.log("2222");
    },
    // 删除某一条数据
    async deletebook(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该书籍, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // console.log(confirmResult)  点击确定之后返回值拿到的是confirm
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除！");
      }

      const res = await this.$request.delete("/library/" + id);
      console.log("我是删除", res);
      if (res.data !== "success") {
        return this.$message.error("删除书籍失败！");
      }
      this.$message.success("删除书籍成功！");
      this.getGoodsList();
    },

    // 获取某一条数据
    async editbook(id) {
      this.dialogFormVisible = true;
      this.pid = id;
      const res = await this.$request.get(`/library/${id}`);
      // console.log(res.data.data.result[0]);
      this.form = res.data.data.result[0];
    },
    // 编辑某一条数据
    async update() {
      this.dialogFormVisible = false;
      const res = await this.$request.put(`/library/${this.pid}`, this.form);
      if (res.data.code === 1) {
        this.$message.success("更新书籍成功！");
      } else {
        this.$message.error("更新书籍失败！");
      }
      this.getGoodsList();
    },
  },
};
</script>

<style>
.iptSearch {
  width: 400px;
  margin-right: 20px;
}
.pagination {
  margin-top: 20px;
}
</style>