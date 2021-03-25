<template>
  <div class="di">
    <div class="logo">熊猫阅读</div>
    <el-menu
      default-active="0"
      background-color="#031529"
      text-color="#ffffff"
      @select="handleSelect"
    >
      <el-menu-item index="0">
        <span slot="title">书架</span>
      </el-menu-item>
      <el-menu-item index="1">
        <span slot="title">万能搜索</span>
      </el-menu-item>
      <el-menu-item index="2">
        <span slot="title">免责声明</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "navigation",
  components: {},
  methods: {
    handleSelect(key) {
      //   console.log(key, keyPath);
      this.$store.commit("setState", {
        nav: key,
      });
      console.log(this.$store.state.Counter.nav);
    },
  },
};
</script>
<style scoped>
.di {
  background-color: #031529;
  height: 100%;
  color: #ffffff;
}
.logo {
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
  font-weight: 900;
  font-size: 30px;
}
::v-deep .el-menu {
  border-right: solid 0px #e6e6e6;
}
</style>