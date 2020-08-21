<template>
  <div class="container">
    <!-- 头部 -->
    <el-header class="header">Header</el-header>
    <el-container class="container-box">
      <!-- 主体内容区 -->
      <el-container class="main">
        <!-- 左侧 -->
        <el-aside width="200px" class="main-l">
          <el-menu :default-active="activeIndex" class="el-menu-demo" @select="change">
            <template v-for="item in menu">
              <el-menu-item :index="item.path" width="160px" :key="item.path" v-if="!item.submenu">
                <i :class="item.icon"></i>
                {{item.text}}
              </el-menu-item>
              <el-submenu :index="item.path" :key="item.path" v-else>
                <template v-slot:title>
                  <i :class="item.icon"></i>
                  {{item.text}}
                </template>
                <el-menu-item
                  :index="item.path+subitem.path"
                  v-for="subitem in item.submenu"
                  :key="subitem.path"
                >{{subitem.text}}</el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>

        <!-- 右侧 -->
        <el-main class="mian-r">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <!-- <router-view /> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "/home",
      openMenu: ["/user"],
      menu: [
        {
          text: "首页",
          path: "/home",
          currentIndex: 0,
          icon: "el-icon-s-home",
        },
        {
          text: "用户管理",
          path: "/user",
          icon: "el-icon-user-solid",
          submenu: [
            {
              text: "用户列表",
              path: "/list",
            },
            {
              text: "添加用户",
              path: "/add",
            },
            {
              text: "修改用户",
              path: "/updata",
            },
            {
              text: "删除用户",
              path: "/del",
            },
          ],
        },
        {
          text: "商品管理",
          path: "/library",
          icon: "el-icon-grape",
          submenu: [
            {
              text: "图书列表",
              path: "/list",
            },
            {
              text: "添加图书",
              path: "/add",
            },
            {
              text: "修改图书",
              path: "/updata",
            },
          ],
        },
        {
          text: "订单管理",
          path: "/order",
          icon: "el-icon-s-order",
          submenu: [
            {
              text: "订单列表",
              path: "/list",
            },
            {
              text: "修改订单",
              path: "/updata",
            },
            {
              text: "删除订单",
              path: "/del",
            },
          ],
        },
      ],
    };
  },
  methods: {
    change(path, idx) {
      this.activeIndex = path;
      this.currentIndex = idx; //这是点击事件修改的idx值！
      this.$router.push(path);
    },
  },
  components: {},
};
</script>
<style lang="scss">
.container {
  height: calc(100% - 60px);
  .container-box {
    height: 100%;
  }
  .header {
    height: 60px;
    line-height: 60px;
    background: pink;
  }
  .main {
    height: 100%;
    .main-l {
      background: olive;
    }
    .main-r {
      background: yellow;
    }
  }
}
</style>