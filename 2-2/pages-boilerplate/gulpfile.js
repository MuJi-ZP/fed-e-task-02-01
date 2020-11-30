// 实现这个项目的构建任务
const { src, dest, parallel, series, watch } = require("gulp");
const loadPlugins = require("gulp-load-plugins");
const plugins = loadPlugins();
const del = require("del");
const browserSync = require("browser-sync");
const bs = browserSync.create();
const data = {
  menus: [
    {
      name: "Home",
      icon: "aperture",
      link: "index.html"
    },
    {
      name: "Features",
      link: "features.html"
    },
    {
      name: "About",
      link: "about.html"
    },
    {
      name: "Contact",
      link: "#",
      children: [
        {
          name: "Twitter",
          link: "https://twitter.com/w_zce"
        },
        {
          name: "About",
          link: "https://weibo.com/zceme"
        },
        {
          name: "divider"
        },
        {
          name: "About",
          link: "https://github.com/zce"
        }
      ]
    }
  ],
  pkg: require("./package.json"),
  date: new Date()
};

const clean = () => {
  return del(["dist", "temp"]);
};

const style = () => {
  return src("src/assets/styles/*.scss", {
    base: "src"
  })
    .pipe(
      plugins.sass({
        outputStyle: "expanded"
      })
    )
    .pipe(dest("temp"));
};

const script = () => {
  return src("src/assets/scripts/*.js", {
    base: "src"
  })
    .pipe(
      plugins.babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(dest("temp"));
};

const page = () => {
  return src("src/**/*.html", {
    base: "src"
  })
    .pipe(
      plugins.swig({
        data,
        // 防止模板缓存导致页面不能及时更新
        defaults: { cache: false }
      })
    )
    .pipe(dest("temp"));
};

const images = () => {
  return src("src/assets/images/**", {
    base: "src"
  })
    .pipe(plugins.imagemin())
    .pipe(dest("dist"));
};

const font = () => {
  return src("src/assets/fonts/**", {
    base: "src"
  })
    .pipe(plugins.imagemin())
    .pipe(dest("dist"));
};

const extra = () => {
  return src("public/**", {
    base: "public"
  }).pipe(dest("dist"));
};

const serve = () => {
  // 文件变化监视
  watch("src/assets/styles/*.scss", style);
  watch("src/assets/scripts/*.js", script);
  watch("src/**/*.html", page);
  // Watch("src/assets/images/**", images);
  // watch("src/assets/fonts/**", font);
  // watch("public/**", extra);
  watch(
    ["src/assets/images/**", "src/assets/fonts/**", "public/**"],
    bs.reload
  );
  // 初始化服务器设置
  bs.init({
    // 关闭右上角小提示
    notify: false,
    // 设置端口号
    port: 3200,
    // 是否默认打开
    // open: false,
    // 服务启动后监听文件的路径通配符
    files: "temp/**",
    server: {
      // 设置服务器基准目录
      baseDir: ["temp", "src", "public"],
      // 设置路由指定页面请求文件时的访问路径，比baseDir有优先，文件请求时会优先在根目录下node_modules寻找
      routes: {
        "/node_modules": "node_modules"
      }
    }
  });
};

const useref = () => {
  return (
    src("temp/**/*.html")
      .pipe(
        plugins.useref({
          // 设置需要合并的文件路径，遵循使用多的文件路径在前
          searchPath: ["temp", "."]
        })
      )
      // Useref会返回编译、合并过后的所有文件
      .pipe(plugins.if(/\.js$/, plugins.uglify()))
      .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
      // .pipe(plugins.if(/\.css$/, plugins.rename({ extname: ".min.css" })))
      .pipe(
        plugins.if(
          /\.html$/,
          plugins.htmlmin({
            // 移除注释
            removeComments: true,
            // 移除折行和空格
            collapseWhitespace: true,
            // 压缩页面内css
            minifyCSS: true,
            // 压缩页面内js
            minifyJS: true
          })
        )
      )
      .pipe(dest("dist"))
  );
};

const compile = parallel(style, script, page);
const build = series(
  clean,
  parallel(series(compile, useref), images, font, extra)
);
const develop = series(compile, serve);
module.exports = {
  clean,
  build,
  develop,
  serve
};
