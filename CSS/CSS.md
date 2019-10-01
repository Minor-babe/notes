# 什么是CSS？
CSS:(Cascading Style Sheet)层叠样式表
# 常用的CSS
- text-align:center;让内部元素水平居中(注意:如果此元素撑满了整个宽度则无法居中)
- margin:auto;让元素本身水平居中
- backgroud-color:gray;设定背景颜色
- font-size: 24px;设置文字大小
- color:white;设定文字的颜色
# CSS属性的简写
## background:

- backgroud-color:背景色
- backgroud-image:背景图片
- backgroud-repeat:背景图平铺方式

- background: gray(颜色) url(背景图片) no-repeat(平铺方式);
- background: url(背景图片) repeat-y;
- background:gray;

## border:

- border-width: 边框宽度
- border-style:边框样式
- border-color:边框颜色
- border: 1px(宽度) solid(样式) #D3f402(颜色);
- border: 3px dashed;**颜色默认为黑色,只有颜色可以省略**

## font:

- font-style:italic:斜体
- font-weight:bold:加粗
- font-family:arial,sans-serif;字体种类
- font-size:20px;字号大小
- font-height:35px;行高
- font: italic(字体)  bold(加粗)   20px(字号大小)/35px(行高) arial（默认字体）,sans-serif（备用字体）,"微软雅黑"(备用字体)
- font: 20px "微软雅黑";

## margin

- margin-top
- margin-right
- margin-bottom
- margin-left
- margin: 上 右 下 左
- margin: 10px(上) 15px(左右) 15px(下);
- margin: 10px(上下) 15px(左右);
- margin: 50px(上下左右)

## padding

- padding-top
- padding-right
- padding-bottom
- padding-left
- padding: 上 右 下 左
- padding: 10px(上) 15px(左右) 15px(下);
- padding: 10px(上下) 15px(左右);
- padding: 50px(上下左右)

# 颜色

- color: greed
- color:rgb(184,134,11)
- color:#B8860B