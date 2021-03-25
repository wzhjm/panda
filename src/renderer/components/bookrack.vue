<template>
  <div>
    <span class="font0">书架</span>
    <span class="font1">我只想开开心心地看会儿书 :)</span>
    <el-row class="ml" v-if="this.$store.state.Counter.reflect">
      <el-col
        :span="6"
        :key="k"
        v-for="(v, k) in this.$store.state.Counter.user_book"
      >
        <el-image
          class="book"
          :src="v.coverUrl_d"
          @click="onbook(v.bookname_d)"
        >
        </el-image>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "bookrack",
  components: {},
  methods: {
    //打开书
    onbook(bookname) {
      console.log(bookname);
      this.$store.commit("setState", {
        cur_book: bookname,
      });
      this.$router.push({ name: "book" });
    },
  },
};
</script>
<style scoped>
.font0 {
  font-size: 20px;
  font-weight: 900;
}
.font1 {
  font-size: 14px;
  color: #b7b9bb;
}
.ml {
  margin-top: 20px;
  text-align: center;
}
.book {
  width: 140px;
  height: 200px;
  margin-bottom: 10px;
}
</style>