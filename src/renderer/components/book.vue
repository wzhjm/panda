<template>
  <el-container class="di">
    <el-aside width="8%" class="nv">
      <el-col :span="24" class="set">
        <el-tooltip content="返回" placement="right">
          <el-button class="el-icon-back" @click="go_home"></el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="24" class="set">
        <el-tooltip content="章节目录" placement="right">
          <el-button class="el-icon-s-unfold"></el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="24" class="set">
        <el-tooltip content="阅读效果" placement="right">
          <el-button class="el-icon-s-open"></el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="24" class="set">
        <el-tooltip content="删除书本" placement="right">
          <el-button class="el-icon-delete" @click="del_book()"></el-button>
        </el-tooltip>
      </el-col>
    </el-aside>
    <el-main
      style="height: 100%; overflow: auto"
      class="page-component__scroll"
    >
      <el-col :span="22" :offset="1" class="bookdi">
        <el-col :span="24" class="font0">{{ cur_title }}</el-col>
        <el-col :span="24" :key="k" v-for="(v, k) in cur_content" class="font1">
          {{ v }}
        </el-col>
        <div
          style="
            width: 50%;
            float: left;
            text-align: right;
            padding-right: 10px;
          "
        >
          <span>&nbsp;</span>
          <el-link @click="on_pre" v-if="cur_index != 0" class="font2">
            上一章
          </el-link>
        </div>
        <div
          style="width: 50%; float: left; text-align: left; padding-left: 10px"
        >
          <span>&nbsp;</span>
          <el-link @click="on_nest" v-if="cur_index != max_index" class="font2">
            下一章
          </el-link>
        </div>
      </el-col>
    </el-main>
    <el-backtop target=".page-component__scroll" :bottom="100">
      <div
        style="
           {
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
          }
        "
      >
        UP
      </div>
    </el-backtop>
  </el-container>
</template>
<script>
import { mixin1 } from "../tools/mixins";
export default {
  name: "book",
  mixins: [mixin1],
  data() {
    return {
      book_data: {},
      user_data: {}, //规则
      cur_index: 0, // 当前页
      max_index: 0,
      cur_title: "",
      cur_content: "",
      test: "",
    };
  },
  components: {},
  created() {
    let cur_book = this.$store.state.Counter.cur_book;
    let user_book = this.$store.state.Counter.user_book;
    let user_data = this.$store.state.Counter.user_data;
    console.log(user_book[cur_book]);
    this.book_data = user_book[cur_book];
    this.max_index = this.book_data.linkList_d.length;
    this.test = this.book_data.test;
    let logo = this.get_web(this.test);
    // console.log(logo);
    // console.log(user_data);
    this.user_data = user_data[logo + ""];
    console.log(this.user_data);
    this.init();
  },

  methods: {
    init() {
      let url = this.book_data.linkList_d[this.cur_index].url;
      this.cur_title = this.book_data.linkList_d[this.cur_index].title;
      url = this.get_top(this.test) + url;
      console.log(url);
      this.get_url(url, (rs) => {
        this.cur_content = this.zw_content(rs, this.user_data.zw_content);
        document.getElementsByClassName(
          "page-component__scroll"
        )[0].scrollTop = 0;
      });
    },
    go_home() {
      this.$router.push({ name: "home" });
    },
    del_book() {
      let bookname_d = this.book_data.bookname_d;
      this.$store.commit("del_book", bookname_d);
      this.write_user_book(this.$store, this.$message);
      this.go_home();
    },
    on_pre() {
      this.cur_index--;
      this.init();
    },
    on_nest() {
      this.cur_index++;
      this.init();
    },
  },
};
</script>
<style scoped>
.di {
  background: #cdc0a4;
  height: 100%;
}
.bookdi {
  background: #ebdcbf;
  padding: 40px;
}
.nv {
  margin-left: 20px;
  margin-top: 20px;
}
.set {
  margin-bottom: 20px;
}
.font0 {
  font-size: 30px;
  line-height: 60px;
}
.font1 {
  font-size: 20px;
  line-height: 40px;
  text-indent: 2em;
}
.font2 {
  font-size: 25px;
}
.down_nv {
  text-align: center;
}
</style>