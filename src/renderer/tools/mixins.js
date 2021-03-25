// 定义一个混入对象
const iconv = require("iconv-lite");
const https = require("https");

const fs = require("fs");
const path = require("path");
var mixin1 = {
  methods: {
    get_web(a) {
      let b = a.split("/");
      for (let i of b) {
        // console.log(i)
        if (
          i.indexOf("com") !== -1 ||
          i.indexOf("cn") !== -1 ||
          i.indexOf("net") !== -1
        ) {
          let c = i.split(".");
          // console.log(c[c.length-2])
          return c[c.length - 2];
        }
      }
    },
    read_data(store) {
      let _path = path.join(__dirname, "../data/data.json");
      // console.log(_path);
      fs.readFile(_path, "utf8", function (err, data) {
        if (!err) {
          store.commit("setState", {
            user_data: JSON.parse(data),
          });
          console.log("读取成功！", store.state.Counter.user_data);
        }
      });
    },
    write_data(store) {
      let _path = path.join(__dirname, "../data/data.json");
      console.log(_path);
      let user_data = JSON.stringify(store.state.Counter.user_data);
      fs.writeFile(_path, user_data, function (err) {
        if (!err) console.log("写入成功！");
      });
    },
    get_url(url, callback) {
      return https.get(url, function (response) {
        var body = "";

        response.on("data", function (data) {
          data = iconv.decode(data, "gbk");
          body += data;
        });

        response.on("end", function () {
          callback(body);
        });
      });
    },
    // 抓取小说题名
    bookname(str, rs) {
      console.log(rs)
      let str2 = str.match(rs);
      if (str2 != null) {
        return this.clean_div(str2[0]);
      }
      return "获取失败";
    },
    // 抓取小说作者
    author(str, rs) {
      console.log(rs)
      let str2 = str.match(rs);
      if (str2 != null) {
        return this.clean_div(str2[0]);
      }
      return "获取失败";
    },
    // 抓取小说简介
    intro(str) {
      let str2 = str.match('<img class="rentouOne.*? />.*?</a>');
      if (str2 != null) {
        return this.clean_div(str2[0]);
      }
      return "获取失败";
    },
    // 抓取小说封面图片地址
    coverUrl(str, rs) {
      console.log(rs)
      let str2 = str.match(rs);
      //   console.log(str2);
      if (str2 != null) {
        return this.get_http(str2[0]);
      }
      return "获取失败";
    },
    // 获取目录
    linkList(str, rs) {
      console.log(rs)
      let str3 = str.replace(new RegExp("(\r\n)|(\n)", "gm"), "");
      let str2 = str3.match(new RegExp(rs, "mg"));
      //   console.log(str2);
      if (str2 != "null") {
        let list0 = [];
        for (let i of str2) {
          let title = this.clean_div(i);
          // console.log(title);
          let url = this.get_href(i);
          // console.log(url);
          if (title != "获取失败" && url != "获取失败") {
            let json = {
              title,
              url,
            };
            list0.push(json);
          }
        }
        return list0;
      }
      return "获取失败";
    },
    // 清除标签
    clean_div(str) {
      return str.replace(new RegExp("</?[^>]+>", "gm"), "");
    },
    get_http(str) {
      let str2 = [];
      str2 = str.match('src=".*?"');
      if (str2 != null) {
        // console.log(str2);
        return str2[0].replace("src=", "").replace(new RegExp('"', "gm"), "");
      }
      return "获取失败";
    },
    get_href(str) {
      let str2 = str.match('href=".*?"');
      if (str2 != null) {
        // console.log(str2);
        return str2[0].replace("href=", "").replace(new RegExp('"', "gm"), "");
      }
      return "获取失败";
    },
  },
}
export { mixin1 }
