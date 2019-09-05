> System

+ System代表系统，系统级的很多属性和控制方法都放置在该类的内部。

+ 由于该类的构造器是private的，所以无法创建该类的对象，也就是无法实例化该类。其内部的成员方法都是static的，所以也可以很方便的进行调用。

+ 成员变量
    - System类内部包含in、out和err三个成员变量，分别代表标准输入流(键盘输入)，标准输出流(显示器)和标准错误输出流(显示器)。

+ 成员方法
    - native long currentTimeMillis()
        
        该方法的作用是返回当前的计算机时间，时间的表达格式为当前计算机时间和GMT时间(格林威治时间)1970年1月1号0时0分0秒所差的毫秒数。
    - void exit(int status)
        
      该方法的作用是退出程序。其中status的值为0代表正常退出，非零代表异常退出。使用该方法可以在图形界面编程中实现程序的退出功能等。
    - void gc()
    
      该方法的作用是请求系统进行垃圾回收。至于系统是否立刻回收，则取决于系统中垃圾回收算法的实现以及系统执行的情况。
    - String getProperty(String key)

      该方法的作用是获得系统中属性名为key的属性对应的值。系统中常见的属性名以及属性的作用如下表所示:
      
        |属性|说明|
        |:---:|:---:|
        |java.version|java运行是环境版本|
        |java.home|java安装目录|
        |os.name|操作系统的名称|
        |os.version|操作系统的版本|
        |user.name|用户的帐户名称|
        |user.home|用户的主目录|
        |user.dir|用户的当前工作目录|

+ 示例
```java
public class Test {
	public static void main(String[] args) {
		System.out.println(System.getProperty("java.version"));
		System.out.println(System.getProperty("java.home"));
		System.out.println(System.getProperty("os.name"));
		System.out.println(System.getProperty("os.version"));
		System.out.println(System.getProperty("user.name"));
		System.out.println(System.getProperty("user.home"));
		System.out.println(System.getProperty("java.version"));
		System.out.println(System.getProperty("java.version"));
		System.out.println(System.getProperty("user.dir"));
	}
}

```

> Math类

说明:java.lang.Math提供了以系统静态方法用于科学计算。其方法的参数和返回值类型一般为double类型。
代表方法:
参数有多种不一一列举，方法名一样的只列出一次
```java
 public static int abs(int a);// 绝对值
 public static double acos(double a); // 反余弦值
 public static double asin(double a); // 反正弦值
 public static double atan(double a); // 反正切值
 public static double sin(double a); // 正弦值
 public static double cos(double a); // 余弦值
 public static double tan(double a); // 正切值
 public static double sqrt(double a); // 平方根
 public static double pow(double a, double b); // a的n次幂
 public static double log(double a); // 自然对数
 public static double exp(double a); // e为底的指数函数
 public static float max(float a, float b); // 最大值
 public static long min(long a, long b); // 最小值
 public static double random(); // 返回0.0到1.0的随机数
 public static long round(double a); // double数据类型a转换为long型(四舍五入)
 public static double toDegrees(double angrad); // 弧度-> 角度
 public static double toRadians(double angdeg); // 角度-> 弧度
```
> BigInteger与BigDecimal类

说明:

1. Integer类作为int的包装类,能存储的最大整型值为2<sup>31</sup>-1,Long类也是有限的,最大为2<sup>63</sup>-1,如果要表示再大的整数,不管是基本数据类型还是他们的包装都无能为力,更不用说进行运算了
2. java.math包的BigInteger可以表示不可变的任意精度的整数。BigInteger提供所有Java的基本整数操作符的对应物,并提供java.lang.Math的所有相关方法。另外,BigInteger还提供以下运算:模算数、GCD计算、质数测试、素数生成、位操作以及一些其他操作。

3. 构造器

    + BigInteger(String val); 根据字符串构建BigInteger对象