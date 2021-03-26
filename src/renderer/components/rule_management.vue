<template>
  <el-dialog
    title="规则管理"
    :visible.sync="$store.state.Counter.set_rule"
    width="50%"
    :before-close="handleClose"
  >
    <el-row>
      <el-col
        :key="k"
        v-for="(v, k) in this.$store.state.Counter.user_data"
        class="di"
      >
        <el-col :span="15">{{ k }}</el-col>
        <el-col :span="9">
          <el-button type="primary"> 修改 </el-button>
          <el-button type="primary" @click="dialogVisible = true">
            删除
          </el-button>
        </el-col>
      </el-col>
    </el-row>
    <el-dialog
      title="删除提醒"
      :visible.sync="dialogVisible"
      width="50%"
      append-to-body
    >
      <span>确认删除规则？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="del_rule()"> 删 除 </el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>
<script>
export default {
  name: "rule_management",
  components: {},
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    handleClose() {
      this.$store.commit("setState", {
        set_rule: false,
      });
    },
    del_rule() {},
  },
};
</script>
<style scoped>
.di {
  display: flex;
  align-items: center;
}
</style>