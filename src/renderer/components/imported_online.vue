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
      <el-col :span="24">
        一个例子： {{ test }}
        <el-button type="primary" @click="input = test">试试</el-button>
      </el-col>
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
    <span slot="footer" class="dialog-footer"> </span>

    <el-dialog
      title="书本预览"
      :visible.sync="ml"
      width="80%"
      :before-close="ml_close"
      append-to-body
    >
      <el-row>
        <el-col :span="10" class="bookico">
          <el-image
            style="width: 140px; height: 200px"
            :src="coverUrl_d"
          ></el-image>
        </el-col>
        <el-col :span="14" class="title">
          <el-col :span="24" class="font0"> 书本名:{{ bookname_d }}</el-col>
          <el-col :span="24" class="font0"> 作者:{{ author_d }}</el-col>
          <el-button type="primary" @click="im_save">导入</el-button>
        </el-col>
        <el-col :span="24" class="ml">
          <el-col :span="24" :key="k" v-for="(v, k) in linkList_d">
            <el-col :span="12">{{ v.title }} </el-col>
            <el-col :span="12">{{ v.url }} </el-col>
          </el-col>
        </el-col>
      </el-row>
    </el-dialog>
  </el-dialog>
</template>
<script>
import { mixin1 } from "../tools/mixins";
export default {
  name: "imported_online",
  components: {},
  mixins: [mixin1],
  data() {
    return {
      input: "",
      test: "https://b.faloo.com/f/876212.html",
      ml: false,
      bookname_d: "",
      author_d: "",
      coverUrl_d: "",
      linkList_d: [],
    };
  },
  methods: {
    ml_close() {
      this.ml = false;
    },
    ml_open() {
      this.ml = true;
    },
    handleClose() {
      this.$store.commit("setState", {
        set_imported: false,
      });
    },
    set_identify() {
      let bs = this.get_web(this.input);
      // console.log(bs);
      let is_bs = false;
      let user_data = this.$store.state.Counter.user_data;
      for (let k in user_data) {
        // console.log(k);
        if (bs == k) {
          is_bs = true;
        }
      }
      if (is_bs) {
        this.get_url(this.input, (rs) => {
          this.test = this.input;
          this.bookname_d = this.bookname(rs, user_data[bs].bookname);
          this.author_d = this.author(rs, user_data[bs].author);
          this.coverUrl_d = this.coverUrl(rs, user_data[bs].coverUrl);
          this.linkList_d = this.linkList(rs, user_data[bs].linkList);
          this.ml_open();
        });
      }
    },
    im_save() {
      if (this.bookname_d == "") {
        return this.$message("请先点识别");
      }
      let a = this.$store.state.Counter.user_book;
      if (!a[this.bookname_d]) {
        a[this.bookname_d] = {};
      }
      a[this.bookname_d].test = this.input;
      a[this.bookname_d].bookname_d = this.bookname_d;
      a[this.bookname_d].author_d = this.author_d;
      a[this.bookname_d].coverUrl_d = this.coverUrl_d;
      a[this.bookname_d].linkList_d = this.linkList_d;

      this.$store.commit("setState", {
        user_book: a,
      });
      this.write_user_book(this);
      this.ml_close();
      this.handleClose();
      this.reflect();
    },
  },
};
</script>
<style scoped>
.tab0 {
  margin-top: 20px;
}
.ml {
  height: 300px;
  overflow: auto;
}
.bookico {
  display: flex;
  justify-content: center;
}
/deep/ .el-dialog__body {
  padding: 0px 20px;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 200px;
}
.font0 {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>