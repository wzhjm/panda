// 定义一个混入对象
const iconv = require("iconv-lite");
const https = require("https");
import { remote } from 'electron'
const fs = require("fs");
const path = require("path");
var mixin1 = {
  methods: {
    //获取标识
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
    read_user_book(store) {
      let _path = path.join(remote.app.getPath('userData'), "/user_book.txt");
      console.log(_path);
      fs.readFile(_path, "utf8", function (err, data) {
        if (!err) {
          store.commit("setState", {
            user_book: JSON.parse(data) || {},
          });
          console.log("读取成功！", store.state.Counter.user_book);
        } else {
          console.log("读取失败！", err)
        }
      });
    },
    write_user_book(store, message) {
      let _path = path.join(remote.app.getPath('userData'), "/user_book.txt");
      console.log(_path);
      message("可写路径" + _path);
      console.log(store.state.Counter.user_book)
      let a = {}
      for (let k in store.state.Counter.user_book) {
        if (k != "") {
          a[k] = store.state.Counter.user_book[k]
        }
      }
      // console.log(a)
      let user_book = JSON.stringify(a);
      console.log(user_book)
      fs.writeFile(_path, user_book, function (err) {
        if (err) {
          console.log("写入失败！", err)
          message("写入失败！");
        } else {
          console.log("写入成功！");
          message("写入成功！");
        }
      });
    },
    read_data(store) {
      let _path = path.join(remote.app.getPath('userData'), "/data.txt");
      console.log(_path);
      fs.readFile(_path, "utf8", function (err, data) {
        if (!err) {
          store.commit("setState", {
            user_data: JSON.parse(data) || {},
          });
          console.log("读取成功！", store.state.Counter.user_data);
        } else {
          console.log("读取失败！", err)
        }
      });
    },
    write_data(store, message) {
      let _path = path.join(remote.app.getPath('userData'), "/data.txt");
      console.log(_path);
      message("可写路径" + _path);
      console.log(store.state.Counter.user_data)
      let a = {}
      for (let k in store.state.Counter.user_data) {
        a[k] = store.state.Counter.user_data[k]
      }
      // console.log(a)
      let user_data = JSON.stringify(a);
      console.log(user_data)
      fs.writeFile(_path, user_data, function (err) {
        if (err) {
          console.log("写入失败！", err)
          message("写入失败！");
        } else {
          console.log("写入成功！");
          message("写入成功！");
        }
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

          if (url.indexOf('https://') == -1 || url.indexOf('http://') == -1) {
            if (url.indexOf('com') != -1) {
              url = url.slice(url.indexOf('com') + 3, url.length)
            }
            if (url.indexOf('cn') != -1) {
              url = url.slice(url.indexOf('cn') + 2, url.length)
            }
          }

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
    get_top(url) {
      console.log(url)
      if (url.indexOf('com') != -1) {
        let a = url.indexOf('com') + 3
        url = url.slice(0, a)
      }
      if (url.indexOf('cn') != -1) {
        url = url.slice(0, url.indexOf('cn') + 2)
      }
      if (url.indexOf('net') != -1) {
        url = url.slice(0, url.indexOf('net') + 3)
      }
      return url
    },
    //获取标题
    zw_title(str, rs) {
      let str2 = str.match(rs);
      if (str2 != null) {
        return this.clean_div(str2[0]);
      }
      return "获取失败";
    },
    //获取正文
    zw_content(str, rs) {
      // console.log(str)
      // rs = '<div class="noveContent">.*?</div>'
      let str3 = str.replace(new RegExp("(\r\n)|(\n)", "gm"), "");
      let str2 = str3.match(new RegExp(rs, "mg"));
      let str4 = str2[0].split('</p>')
      let list = []
      for (let i of str4) {
        list.push(this.clean_div(i));
      }
      // console.log(list)
      return list
    },
    //刷新
    reflect() {
      this.$store.commit("setState", {
        reflect: false,
      });
      this.$store.commit("setState", {
        reflect: true,
      });
    }
  },
}
export { mixin1 }
