## 简答题：
### 1、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。
答：  
&nbsp;&nbsp;工程化认识：工程化是一种用来提高效率，保证代码质量，把繁琐重复工作自动化的一种手段。  
&nbsp;&nbsp;可解决的问题：  
&nbsp;&nbsp;1、可以在使用最新语法规范时避免一些兼容性问题：以我经常做的营销活动为例，因为公司没有对这种经常需要单独定制的小项目有工程化需求，又需要兼容各种奇奇怪怪的、古老的机型，导致很多新出现的语法规范不能使用，对一个流程明明有更好的解决方案，最后偏偏需要用更老，更麻烦的方案；而使用工程化帮我们做代码转换、兼容，可以放心用新特性是很爽的一件事。  
&nbsp;&nbsp;2、模块化的支持：在营销活动中，有很多不少活动大同小异，只是对一些关键性的参数做出了变化，但是我们确需要重复性的开发，如果使用工程化的方案，将这些功能模块化，应该可以减少我们很多工作量吧。  
&nbsp;&nbsp;3、代码打包上线：作为没有工程化，没有自动化的一条业务线，每次打包上线，sit阶段自己拖上服务器，uat测试找测试部的人部署上服务器，预投产环境收到打包找运维部门的部署，生产环境还要打包真的很烦。不用多，可以做到sit、UAT自动部署，预投产自动打包就很省事了。

--
### 2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？
答：  
快速构建项目，节省时间。  
统一开发环境，减少需求换人后环境不同导致的各种啥问题。  
规范开发时代码风格，降低代码阅读难度。

--
## 编程题：

### 1、概述脚手架实现的过程，并使用 NodeJS 完成一个自定义的小型脚手架工具
答：  
&nbsp;&nbsp;1、全局安装yeamon、generator  
&nbsp;&nbsp;2、安装generator基类yeoman-generator,按照generator基本结构要求创建文件夹，yarn inint 初始化项目  
&nbsp;&nbsp;3、创建模板文件，明确需要定义的项目  
&nbsp;&nbsp;4、编写index.js文件  
&nbsp;&nbsp;5、引入yeoman-generato，将需要定义的项用命令行进行询问，找到模板文件，确定生成文件路径，执行模板文件方法。
详情见 2-1

--

### 2、尝试使用 Gulp 完成项目的自动化构建

答：
&nbsp;&nbsp;详情见2-2
