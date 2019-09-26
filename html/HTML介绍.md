1. 什么是HTML、CSS?
    - HTML(超文本标记语言)
2. Vscode
    - 插件: chinese(语言包)、open in browers(打开浏览器)、view in borwer(打开浏览器))
    - <kbd>shift</kbd> + <kbd>alt</kbd> + <kbd>↓</kbd>: 复制一行
    - <kbd>alt</kbd> + <kbd>↑或↓</kbd>:移动一行
    - <kbd>tab</kbd> + <kbd>shift</kbd>:向前缩进
    - <kbd>alt</kbd> + <kbd>左键</kbd>:批量修改

3. chrome浏览器
4. 深入了解网站开发
    - UI设计师
    - WEB前端开发工程师(H5开发)
5. web三大核心技术
    - HTML
    - CSS
    - JavaScript
6. HTML基本结构和属性
    - HTML:超文本标记语言
        - 超文本: 文本内容 + 非文本内容 (图片、视频、音频等)
        - 标记: <单词>,也叫标签
        - 语言: 编程语言
    - HTML: [元素周期表](http://demo.yanue.net/HTML5element/)
    ![HTML元素周期表](img/html元素周期表.png "元素周期表")
7. HTML初始代码
    - 每个.html文件都有的代码叫做初始代码,要符合html文件的规范文件
    - vscode生成快捷键: <kbd>!</kbd> + <kbd>tab</kbd>
    ```html
    <!-- 文档声明: 告诉浏览器这是一个HTML文件  -->
    <!DOCTYPE html> 
    <!-- html文件的最外层标签:包裹着所有html标签代码,lang="en"表示是一个英文网站 -->
    <!-- lang="zh-CN"表示是一个中文网站 -->
    <html lang="en">
    <head>
        <!-- meta元信息:编写网页中的一些赋值信息,charset="UTF-8"设置编码为国际编码防止乱码的情况 -->
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <!-- 设置网页的标题 -->
        <title>Document</title>
    </head>
    <!-- 显示网页内容的区域 -->
    <body>
        
    </body>
    </html>
    ```
8. HTML注释
    - 注释: 在浏览器中看不到,只能在代码中看到注释的内容
    - 写法: \<!-- 注释内容 -->
    - 作用:
        - 把暂时不用的代码注释起来,方便以后使用
        - 对开发人员进行提示
    - VSCode生成注释快捷键:
        - <kbd>ctrl</kbd> + <kbd>/</kbd>
        - <kbd>shift</kbd> + <kbd>alt</kbd> + <kbd>a</kbd>
9. HTML语义化
    - 含义:根据网页中内容的结构,选择适合的HTML标签进行编写
    - 好处:
        - 在没有CSS的情况下,页面也能呈现出很好的内容结构
        - 有利于SEO,让搜索引擎爬虫更好的理解网页
        - 方便其他设备解析
        - 便于团队开发与维护
    - [演示](https://h5o.github.io/)