<template>
  <el-card class="box-card order-wrap">
    <!-- 面包屑 -->
    <my-bread level1="订单管理" level2="订单列表"></my-bread>
    <!-- 2：搜索框 -->
    <el-row class="search-wrap">
      <el-col>
        <el-input
          clearable
          @clear="loadUserlist"
          @input="changeNull"
          placeholder="请输入内容"
          v-model="query"
          class="input-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
        </el-input>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" class="order-table">
      <el-table-column type="index" label="编号"></el-table-column>
      <el-table-column prop="orderNum" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="orderPrice" label="订单价格"></el-table-column>
      <el-table-column prop="isPay" label="是否付款" width="180"></el-table-column>
      <el-table-column prop="isDeliver" label="是否发货" width="180"></el-table-column>
      <el-table-column prop="time" label="下单时间" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="goto(scope.row._id)"
          ></el-button>
          <el-button
            size="small"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="del(scope.row._id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block order-paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[3, 6, 9, 12]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      userid: "",
      total: 0,
      pageNum: 1,
      pageSize: 3,
      query: "",
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    changeNull() {
      if (this.query === "") {
        this.getOrderList();
      }
    },
    //获取到订单列表
    async getOrderList() {
      const { data } = await this.$request.get(
        `/morder?page=${this.pageNum}&size=${this.pageSize}`
      );
      console.log("我是订单", data, data.datalen);
      this.tableData = data.data;
      this.total = data.datalen;
    },
    //清空表单后，再渲染页面
    loadUserlist() {
      this.getOrderList();
    },
    //点击搜索按钮
    async searchBtn() {
      if (this.query !== "") {
        this.query = this.query.trim();
        const { data } = await this.$request.get(
          `/morder?query=${this.query}&page=${this.pageNum}&size=${this.pageSize}`
        );
        this.tableData = data.data;
        this.total = data.data.length;
        this.$message.success("搜索成功");
      }
    },
    //点击跳转到更新
    goto(id) {
      this.$router.push({
        name: "OrderUpdata",
        params: { id },
      });
    },
    //点击删除
    del(id) {
      this.userid = id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$request.delete("/morder/" + this.userid);
          if (res.status === 200) {
            this.tableData = this.tableData.filter((item) => item._id !== id);
            this.getOrderList();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //每一个显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.pagenum = 1;
      this.getOrderList();
    },
    //当前页！
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getOrderList();
    },
  },
};
</script>
<style lang="scss">
.order-wrap {
  padding: 20px 20px 40px 20px;
  position: relative;

  .search-wrap {
    position: absolute;
    left: 40px;
    width: 350px;
    margin: 20px 0;
    .input-select {
      width: 350px;
    }
    .add-btn {
      margin-left: 20px;
    }
  }
  // 表格
  .order-table {
    margin-top: 80px;
  }
  // 分页
  .order-paging {
    margin: 10px 0;
    position: absolute;
    left: 40px;
  }
}
</style>