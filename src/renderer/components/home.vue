<template>
  <el-container style="height: 100%">
    <el-aside width="20%"><navigation /> </el-aside>
    <el-container>
      <el-header class="top">
        <el-button type="primary" plain> 新建规则 </el-button>
        <el-button type="primary" plain @click="open_imported_online()">
          导入在线书页
        </el-button>
        <el-button type="primary" plain>导入本地文件</el-button>
        <imported_online />
        <new_rule />
      </el-header>
      <el-main class="main">
        <bookrack v-if="$store.state.Counter.nav == '0'" />
        <disclaimer v-if="$store.state.Counter.nav == '2'" />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import navigation from "./navigation";
import bookrack from "./bookrack";
import disclaimer from "./disclaimer";
import imported_online from "./imported_online";
import new_rule from "./new_rule";
import { mixin1 } from "../tools/mixins";
export default {
  name: "home",
  components: { navigation, bookrack, disclaimer, imported_online, new_rule },
  mixins: [mixin1],
  data() {
    return {};
  },
  methods: {
    open_imported_online() {
      this.$store.commit("setState", {
        set_imported: true,
      });
    },
  },
  created() {
    this.read_data(this.$store);
  },
};
</script>
<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.left {
  width: 20%;
  height: 100%;
}
.top {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding-right: 30px;
}
.main {
  background-color: #f0f2f5;
  height: 100%;
  padding: 20px;
}
</style>