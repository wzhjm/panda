<template>
  <el-dialog
    title="导入在线书页"
    :visible.sync="$store.state.Counter.set_imported"
    width="50%"
    :before-close="handleClose"
  >
    <el-row>
      <el-col :span="24"
        >输入第三方网站的书目页，支持大部分网站（不是全部）</el-col
      >
      <el-col :span="24"
        >本页有完整的目录，且目录点击进去，有完整的文本。</el-col
      >
      <el-col :span="24">理论上，你能看到多少，这软件就能导入多少。</el-col>
      <el-col :span="24" class="tab0">
        <el-col :span="18">
          <el-input v-model="input" placeholder="完整的URL"></el-input>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-button
            type="primary"
            :disabled="input == ''"
            @click="set_identify()"
            >识别</el-button
          >
        </el-col>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleClose">导入</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mixin1 } from "../tools/mixins";
export default {
  name: "imported_online",
  components: {},
  mixins: [mixin1],
  data() {
    return { input: "" };
  },
  methods: {
    handleClose() {
      this.$store.commit("setState", {
        set_imported: false,
      });
    },
    set_identify() {
      this.get_url(this.input, (rs) => {
        //   //   console.log(rs);
        let bookname = this.bookname(rs);
        console.log(bookname);
        let author = this.author(rs);
        console.log(author);
        let coverUrl = this.coverUrl(rs);
        console.log(coverUrl);
        let linkList = this.linkList(rs);
        console.log(linkList);
      });
    },
  },
};
</script>
<style scoped>
.tab0 {
  margin-top: 20px;
}
</style>