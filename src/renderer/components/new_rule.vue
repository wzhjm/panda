<template>
  <el-dialog
    title="新建规则"
    :visible.sync="$store.state.Counter.set_new_rule"
    width="50%"
    :before-close="handleClose"
  >
    <el-row>
      <!-- 测试书本地址 -->
      <el-col :span="24" class="tab0">
        <el-col :span="15">
          <el-input v-model="input1" placeholder="测试书本地址"></el-input>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-button
            type="primary"
            :disabled="input1 == ''"
            @click="input_url1()"
          >
            生成标识符
          </el-button>
        </el-col>
      </el-col>
      <!-- 抓取小说题名 -->
      <el-col :span="24" class="tab0">
        <el-col :span="15">
          <el-input v-model="input2" placeholder="抓取小说题名"></el-input>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-button
            type="primary"
            :disabled="input2 == ''"
            @click="input_url2()"
          >
            测试
          </el-button>
        </el-col>
      </el-col>
      <!-- 抓取小说作者 -->
      <el-col :span="24" class="tab0">
        <el-col :span="15">
          <el-input v-model="input3" placeholder="抓取小说作者"></el-input>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-button
            type="primary"
            :disabled="input3 == ''"
            @click="input_url3()"
          >
            测试
          </el-button>
        </el-col>
      </el-col>
      <!-- 抓取小说封面图片地址 -->
      <el-col :span="24" class="tab0">
        <el-col :span="15">
          <el-input
            v-model="input4"
            placeholder="抓取小说封面图片地址"
          ></el-input>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-button
            type="primary"
            :disabled="input4 == ''"
            @click="input_url4()"
          >
            测试
          </el-button>
        </el-col>
      </el-col>
      <!-- 获取目录 -->
      <el-col :span="24" class="tab0">
        <el-col :span="15">
          <el-input v-model="input5" placeholder="获取目录"></el-input>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-button
            type="primary"
            :disabled="input5 == ''"
            @click="input_url5()"
          >
            测试
          </el-button>
        </el-col>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="save()">导入</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mixin1 } from "../tools/mixins";
export default {
  name: "new_rule",
  mixins: [mixin1],
  components: {},
  data() {
    return {
      input1: "https://b.faloo.com/f/876212.html",
      input2: '<h1 id="novelName".*?</h1>',
      input3: '<img class="rentouOne.*? />.*?</a>',
      input4: '<img class="imgcss".*?>',
      input5: '<div class="DivTd".*?</div>',
      logo: "",
    };
  },
  methods: {
    handleClose() {
      this.$store.commit("setState", {
        set_new_rule: false,
      });
    },
    // 测试书本地址
    input_url1() {
      let a = this.get_web(this.input1);
      this.$message(a);
      this.logo = a;
    },
    // 抓取小说题名
    input_url2() {
      this.get_url(this.input1, (rs) => {
        let a = this.bookname(rs, this.input2);
        this.$message(a);
      });
    },
    // 抓取小说题名
    input_url3() {
      this.get_url(this.input1, (rs) => {
        let a = this.author(rs, this.input3);
        this.$message(a);
      });
    },
    // 抓取小说封面图片地址
    input_url4() {
      this.get_url(this.input1, (rs) => {
        let a = this.coverUrl(rs, this.input4);
        this.$message(a);
      });
    },
    // 获取目录
    input_url5() {
      this.get_url(this.input1, (rs) => {
        let a = this.linkList(rs, this.input5);
        console.log(a);
      });
    },
    save() {
      if (this.logo == "") {
        this.input_url1();
      }
      // console.log(this.logo);
      let a = this.$store.state.Counter.user_data;
      if (!a[this.logo]) {
        a[this.logo] = {};
      }
      a[this.logo].test = this.input1;
      a[this.logo].bookname = this.input2;
      a[this.logo].author = this.input3;
      a[this.logo].coverUrl = this.input4;
      a[this.logo].linkList = this.input5;
      this.$store.commit("setState", {
        user_data: a,
      });
      console.log(this.$store.state.Counter.user_data);
      this.write_data(this.$store);
    },
  },
};
</script>
<style scoped>
.tab0 {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>