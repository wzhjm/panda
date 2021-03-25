<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "panda",
};
</script>

<style>
body,
div,
a,
h1,
h2,
h3,
input,
form,
strong,
span,
select,
option,
textarea,
dl,
dt,
dd,
ul,
li,
p {
  margin: 0;
  padding: 0;
}
strong,
i,
em {
  font-style: normal;
}
li {
  list-style: none;
}
html::-webkit-scrollbar,
body::-webkit-scrollbar {
  width: 0;
  height: 0;
  font-family: "PingFang-SC-Regular", "Microsoft YaHei", "微软雅黑", Arial;
}
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  overflow: hidden;
}
#app {
  height: 100%;
}
</style>
