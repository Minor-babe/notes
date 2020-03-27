> String类

字符串，final修饰类，实现了Serializable(序列化),Comparable(比较大小),CharSequence(可读可写序列)

```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {
    /** The value is used for character storage. */
    private final char value[];
}
```

由于是final 修饰的类，所以String类无法被继承。

从String的源码当中我们可以抽取出一句话

The value is used for character storage.(这个值作为字符存储)

String字符串使用char型数组的方式来进行储存，同时此数组也被final修饰,故String的值也不允许被修改。

String声明

String可通过new对象的方式创建，也可以直接通过字面量的方式来进行赋值。



问题:

 ```java
String a = new String("a");
String b = "b";
 ```

两种方式有何不同？

答：***通过new的方式创建的对象在内存当中分配在堆空间当中，栈中变量的地址值为堆空间的值。而堆空间中的储存为字符串常量池中的地址值(如果有的话)***

***通过字面量直接赋值那么栈中变量的地址值为字符串常量池中的值。***



经典面试题:

请说出运行结果

```java
		String s1 = "hello";
		String s2 = "world";
		String s3 = "helloworld";
		String s4 = s1 + "world";
		String s5 = "hello" + "world";
		String s6 = s1 + s2;
		String s7 = "hello" + s2;
		String s8 = (s1+s2).intern();
		System.out.println(s3 == s4); // false
		System.out.println(s3 == s5); // true
		System.out.println(s3 == s6); // false
		System.out.println(s3 == s7); // false
		System.out.println(s3 == s8); // true
```

> 常用方法

```java
int length(); // 返回字符串的长度 return value.length
char charAt(int index); // 返回某索引出的字符 return value[index]
boolean isEmpty(); // 判断是否为空字符串 return value.length == 0
String toLowerCase(); // 使用默认语言环境,将String中的所有字符串转换为小写
String toUpperCase(); // 使用默认语言环境，将String中的所有字符串为大写
String trim(); // 返回字符串的副本，忽略前导空白和尾部空白
boolean equals(Object obj); // 比较字符串的内容是否相同
boolean equalsIgnoreCase(String anotherString); //与equals方法类似,忽略大小写
String concat(String str); // 将指定字符串连接到此字符串的结尾。等价于用 "+"
int compareTo(String anotherString); // 比较两个字符串的大小
String substring(int beginIndex); // 返回一个新的字符串,它是从字符串的beginIndex开始截取
String substring(int beginIndex,int endIndex); // 返回一个新的字符串,他是从字符串beginIndex开始截取到endIndex结束 左闭右开即从beginIndex开始,包含beginIndex,从endIndex结束不包含endIndex 
boolean endsWith(String suffix); // 测试此字符串是否以指定的后缀结束
boolean startsWith(String prefix); // 测试此字符串是否以指定的前缀开始
boolean startsWith(String prefix,int toffset); // 测试此字符串从指定索引开始的子字符串是否以指定前缀开始
boolean contains(CharSequence s); // 当且仅当此字符串包含指定的char值序列时,返回true
int indexOf(String str); // 返回指定字符串在此字符串中第一次出现的位置
int indexOf(String str,int fromIndex); // 返回指定字符串在此字符串中第一次出现的位置,从指定索引开始。
int lastIndexOf(String str); // 返回指定子字符串在此字符串中最右边出现处的索引
int lastIndexOf(String str,int fromIndex); //返回指定子字符串在此字符串中最右边出现处的索引,从指定位置开始
String replace(char oldChar,char newChar); // 返回一个新的字符串,它是通过用newChar替换此字符串中出现的所有oldChar得到的。
String replace(CharSequence target,CharSequence replacement); // 使用指定的字面值替换序列换此字符串所有匹配字面值目标序列的字符串。
String replaceAll(String regex,String replacement); //使用给定的replacement替换此字符串所有匹配给定的正则表达式的子字符串。
String replaceFist(String regex,String replacement);
// 使用给定的replacement替换此字符串匹配给定的正则表达式的第一个字字符串。
boolean matches(String regex); // 告知此字符串是否匹配给定的正则表达式
String[] split(String regex); // 根据给定正则表达式的匹配拆分此字符。
String[] split(String regex,int limit); // 根据给定的正则表达式来拆分此字符串,最多不超过limit个,如果超过了,剩下的全部都放到最后一个元素中
```

> StringBuffer(线程安全每个方法大部分为synchronized)

StringBuffer初始化的长度为16

length返回的不为value.length而是count

扩容问题:

1. 如果添加的数据底层数组撑不下了，那就需要扩容

   ​	默认情况下，扩容为原来的容量2倍+2，同时将原有数组中的元素复制到新的数组

常用方法:

```java
StringBuffer append(xxx); // 提供了很多的append方法，用于进行字符串拼接
StringBuffer delete(int start,int end); // 删除指定位置的内容
StringBuffer replace(inst start,int end,String str); // 把[start,end]位置替换为str
StringBuffer insert(int offset,xxx); // 在指定位置插入XXX
StringBuffer reverse(); // 反转字符串;
setCharAt(int n,char ch); // 在指定位置替换
```

