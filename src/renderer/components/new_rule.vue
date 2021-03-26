<template>
  <el-dialog
    title="新建规则"
    :visible.sync="$store.state.Counter.set_new_rule"
    width="80%"
    :before-close="handleClose"
  >
    <el-row>
      <!-- 测试书本地址 -->
      <el-col :span="24" class="tab0">
        <el-col :span="3">测试书本地址</el-col>
        <el-col :span="15">
          <el-input v-model="input1" placeholder="测试书本地址"></el-input>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-button
            type="primary"
            :disabled="input1 == ''"
            @click="input_url1()"
          >
            标识
          </el-button>
        </el-col>
      </el-col>
      <!-- 抓取小说题名 -->
      <el-col :span="24" class="tab0">
        <el-col :span="3">抓取小说题名</el-col>
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
        <el-col :span="3">抓取小说作者</el-col>
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
        <el-col :span="3">抓取小说封面</el-col>
        <el-col :span="15">
          <el-input v-model="input4" placeholder="抓取小说封面"></el-input>
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
        <el-col :span="3">获取目录</el-col>
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
    <el-dialog
      title="目录"
      :visible.sync="ml"
      width="80%"
      :before-close="ml_close"
      append-to-body
    >
      <el-row class="ml">
        <el-col
          :span="24"
          :key="k"
          v-for="(v, k) in ml_list"
          style="height: 50px"
        >
          <el-col :span="8">{{ v.title }} </el-col>
          <el-col :span="8">{{ v.url }} </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="input_ml(v.url)">
              测试
            </el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog
      title="正文"
      :visible.sync="ml2"
      width="80%"
      :before-close="ml_close2"
      append-to-body
    >
      <el-col :span="24" class="tab0">
        <el-col :span="15">
          <el-input v-model="input6" placeholder="正文标题"></el-input>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-button
            type="primary"
            :disabled="input6 == ''"
            @click="input_url6()"
          >
            测试
          </el-button>
        </el-col>
      </el-col>
      <el-col :span="24" class="tab0">
        <el-col :span="15">
          <el-input v-model="input7" placeholder="正文内容"></el-input>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-button
            type="primary"
            :disabled="input7 == ''"
            @click="input_url7()"
          >
            测试
          </el-button>
        </el-col>
      </el-col>
      {{ ml_text }}
    </el-dialog>
    <el-dialog
      title="正文预览"
      :visible.sync="ml3"
      width="80%"
      :before-close="ml_close3"
      append-to-body
    >
      <el-row class="ml">
        <el-col :span="24" :key="k" v-for="(v, k) in ml_list2">
          {{ v }}
        </el-col>
      </el-row>
    </el-dialog>
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
      input6: "<title>.*?</title>",
      input7: '<div class="noveContent">.*?</div>',
      logo: "",
      ml: false,
      ml2: false,
      ml3: false,
      ml_list: [],
      ml_text: "",
      ml_list2: [],
    };
  },
  methods: {
    handleClose() {
      this.$store.commit("setState", {
        set_new_rule: false,
      });
    },
    ml_close() {
      this.ml = false;
    },
    ml_open() {
      this.ml = true;
    },
    ml_close2() {
      this.ml2 = false;
    },
    ml_open2() {
      this.ml2 = true;
    },
    ml_close3() {
      this.ml3 = false;
    },
    ml_open3() {
      this.ml3 = true;
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
        this.ml_open();
        console.log(a);
        this.ml_list = a;
      });
    },
    //标题
    input_url6() {
      let a = this.zw_title(this.ml_text, this.input6);
      this.$message(a);
    },
    //正文
    input_url7() {
      this.ml_list2 = this.zw_content(this.ml_text, this.input7);
      this.ml_open3();
    },
    //书本列表
    input_ml(url) {
      url = this.get_top(this.input1) + url;
      console.log(url);
      this.get_url(url, (rs) => {
        this.ml_text = rs;
        this.ml_open2();
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
      a[this.logo].zw_title = this.input6;
      a[this.logo].zw_content = this.input7;
      this.$store.commit("setState", {
        user_data: a,
      });
      console.log(this.$store.state.Counter.user_data);
      this.write_data(this);
      this.handleClose();
    },
  },
};
</script>
<style scoped>
.tab0 {
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}
.ml {
  height: 300px;
  overflow: auto;
}
/deep/ .el-dialog__body {
  padding: 0px 20px;
}
</style>