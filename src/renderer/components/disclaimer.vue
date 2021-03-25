<template>
  <div class="font0">
    <div class="font0">免责声明</div>
    <div class="font1">
      <span class="tb0"
        >熊猫阅读是一款提供文本阅读的工具，为广大文学爱好者提供一种方便、快捷舒适的试读体验。</span
      ><br />
      <span class="tb0"
        >当您搜索一本书的时，熊猫阅读会将该书的书名以关键词的形式提交到各个第三方文学网站。各第三方网站返回的内容与熊猫阅读无关，熊猫阅读对其概不负责，亦不承担任何法律责任。任何通过使用熊猫阅读而链接到的第三方网页均系他人制作或提供，您可能从第三方网页上获得其他服务，熊猫阅读对其合法性概不负责，亦不承担任何法律责任。第三方搜索引擎结果根据您提交的书名自动搜索获得并提供试读，不代表熊猫阅读赞成或被搜索链接到的第三方网页上的内容或立场。您应该对使用搜索引擎的结果自行承担风险。</span
      ><br />
      <span class="tb0"
        >熊猫阅读不做任何形式的保证：不保证第三方搜索引擎的搜索结果满足您的要求，不保证搜索服务不中断，不保证搜索结果的安全性、正确性、及时性、合法性。因网络状况、通讯线路、第三方网站等任何原因而导致您不能正常使用熊猫阅读，熊猫阅读不承担任何法律责任。熊猫阅读尊重并保护所有使用熊猫阅读用户的个人隐私权，您注册的用户名、电子邮件地址等个人资料，非经您亲自许可或根据相关法律、法规的强制性规定，熊猫阅读不会主动地泄露给第三方。</span
      ><br />
      <span class="tb0"
        >熊猫阅读在为广大文学爱好者提供方便、快捷舒适的试读体验的同时，也使优秀文学得以迅速、更广泛的传播，从而达到了在一定程度促进文学充分繁荣发展之目的。熊猫阅读鼓励广大文学爱好者通过熊猫阅读发现优秀文学及其提供商，并建议阅读正版图书。任何单位或个人认为通过熊猫阅读搜索链接到的第三方网页内容可能涉嫌侵犯其信息网络传播权，应该及时向熊猫阅读提出书面权力通知，并提供身份证明、权属证明及详细侵权情况证明。熊猫阅读在收到上述法律文件后，将会依法尽快断开相关链接内容。</span
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "disclaimer",
  components: {},
  methods: {},
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
.font0 {
  font-size: 30px;
  font-weight: 900;
  text-align: center;
  padding-bottom: 20px;
}
.font1 {
  font-size: 14px;
  text-align: left;
}
.tb0 {
  padding-left: 30px;
}
</style>