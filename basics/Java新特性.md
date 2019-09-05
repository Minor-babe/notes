## Lambda表达式
概述: 
1. Lambda 是一个匿名函数,使用它可以写出更简洁、更灵活的代码。
```java
    @Test
    public void test1() {
        // 原本写法
        Runnable r1 = new Runnable() {
            @Override
            public void run() {
                System.out.println("普通方法");
            }
        };
        r1.run();
        // lambda
        Runnable r2 = () -> System.out.println("lambda");
        r2.run();
    }

    @Test
    public void test2() {
        // 原本写法
        Comparator<Integer> comparator = new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return Integer.compare(o1, 02);
            }
        };
        System.out.println(comparator.compare(12, 24));
        // lambda
        Comparator<Integer> comparator1 = (o1, o2) -> Integer.compare(o1, 02);
        System.out.println(comparator1.compare(12, 24));

        // 方法引用
        Comparator<Integer> comparator2 = Integer::compareTo;
        System.out.println(comparator2.compare(12, 24));
    }
```
2. 本质: 作为接口的实例对象
3. 示例
```java
/**
 * 举例: (o1, o2) -> Integer.compare(o1, 02);
 * 格式:
 * ->:箭头符
 * ->左边():lambda形参列表 接口中抽象方法的形参列表
 * ->右边(): lambda重写抽象方法的方法体
 */
public class LambdaTest {
    // 语法格式一: 无参, 无返回值
    @Test
    public void test1() {
        Runnable runnable = () -> System.out.println("run");
        runnable.run();
    }

    // 语法格式二: 需要一个参数,但没有返回值
    @Test
    public void test2() {
        // 普通写法
        Consumer<String> consumer = new Consumer<String>() {
            @Override
            public void accept(String s) {
                System.out.println(s);
            }
        };
        consumer.accept("consumer");
        // lambda
        Consumer<String> consumer1 = (String s) -> {
            System.out.println(s);
        };
        consumer1.accept("consumer1");
    }

    // 语法格式三: 类型推断可以省略,可由编译器推断的处,称为"类型推断"
    @Test
    public void test3() {
        Consumer<String> consumer1 = (s) -> System.out.println(s);
        consumer1.accept("consumer1");
    }

    // 语法格式四: lambda 若只需要一个参数时,参数的小括号可以省略
    @Test
    public void test4() {
        Consumer<String> consumer1 = s -> System.out.println(s);
        consumer1.accept("consumer1");
    }

    // 语法格式五: lambda 需要两个或以上的参数,多条执行语句,并且有返回值
    @Test
    public void test5() {
        // 普通写法
        Comparator<Integer> comparator = new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return o1.compareTo(o2);
            }
        };
        System.out.println(comparator.compare(3, 7));
        // lambda
        comparator = (o1, o2) -> {
            return o1.compareTo(o2);
        };
        System.out.println(comparator.compare(1, 2));
    }

    // 语法格式六: lambda 体只有一条语句时,return 与大括号若有,可以省略
    @Test
    public void test6() {
        // 普通写法
        Comparator<Integer> comparator = new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return o1.compareTo(o2);
            }
        };
        System.out.println(comparator.compare(3, 7));
        // lambda
        comparator = (o1, o2) -> o1.compareTo(o2);
        System.out.println(comparator.compare(1, 2));
    }
}
```
## 函数式(FunctaionalInterFace)接口
简介: lambda表达式作为函数式接口的实例。如果一个接口中,只声明了一个抽象方法,则此接口就称为函数式接口

- 只包含一个抽象方法的接口
- @FunctaionalInterFace(注解): 声明一个接口为函数式接口,可以检查接口是否为函数式接口
- 在java.util.function下定义了Java8的函数式接口

- Java内置四大核心函数接口

|函数式接口|参数类型|返回类型|用途|
|:--:|:--:|:--:|:--:|
|Consumer\<T>消费型接口|T|void|对类型为T的对象应用操作,包含方法void accept(T t)|
|Supplier\<T>供给型接口|无|T|返回类型为T的对象,包含方法: T get()|
|Function\<T,R>函数型接口|T|R|对类型为T的对象应用操作,并返回结果。结果是R类型的对象,包含方法:R apply(T t)|
|Predicate\<T>断定型接口|T|boolean|确定类型为T的对象是否满足某约束,并返回boolean值,包含方法:boolean test(T t)|
|BiFunction<T,U,R>|T,U|R|对类型为T,U参数应用操作,返回R类型的结果。包含方法为: R apply(T t,U u)|
|UnaryOperator\<T>(Function子接口)|T|T|对类型为T的对象进行一元运算,并返回T类型结果。包含方法为: T apply(T t)|
|BinaryOperator\<T>(BiFunction子接口)|T,T|T|对类型为T的对象进行二元运算,并返回T类型的结果。包含方法为: T apply(T t1,T t2)|
|BinConsumer<T,U>|T,U|void|对类型为T,U参数应用操作。包含方法为: void accept(T t, U u)|
|BiPredicate<T,U>|T,U|boolean|包含方法为: boolean test(T t,U u)|
|ToIntFunction\<T>ToLongFunction\<T>ToDouble\<T>|T|int long double |分别计算int、double、long值的函数|
|IntFunction\<R>LongFunction\<R>Double\<R>|int long double |R|参数分别为int、long、double类型的函数|

- 示例
```java
    @Test
    public void test1() {
        // 普通写法
        happyTime(400, new Consumer<Double>() {
            @Override
            public void accept(Double aDouble) {
                System.out.println("上网一天花了: " + aDouble);
            }
        });
        // lambda
        happyTime(300,money -> System.out.println("上网一天花了: " + money));
    }

    public void happyTime (double money, Consumer<Double> consumer){
        consumer.accept(money);
    }

    @Test
    public void test2 () {
        // 普通写法
        List<String> list = Arrays.asList("冬瓜","西瓜","南瓜","西瓜");
        List<String> filterStrs = filterString(list, new Predicate<String>() {
            @Override
            public boolean test(String s) {
                return s.contains("瓜");
            }
        });
        System.out.println(filterStrs);
        // lambda
        filterStrs = filterString(list,s -> s.contains("瓜"));
        System.out.println(filterStrs);
    }
    
    public List<String> filterString (List<String> list, Predicate<String> pre) {
        ArrayList<String> filterList = new ArrayList<>();
        for (String s : list) {
            if (pre.test(s)) {
                filterList.add(s);
            }
        }
        return filterList;
    }
```
## 方法引用与构造器引用
- 方法引用是Lambda表达式深层次的表达。方法引用就是Lambda表达式,也就是函数式接口的一个实例
```java
/**
 * 使用情景:当要传递给Lambda体操作,已经有实现的方法了,可以使用方法引用
 * 方法引用,本质上就是Lambda表达式,而Lambda表达式作为函数式接口的实例。所以方法引用,也是函数式接口的实例。
 * 使用格式: 类(或对象):: 方法名
 * 使用情况：
 * 1. 对象 :: 非静态方法
 * 2. 类 :: 静态方法
 * 3. 类 :: 非静态方法
 * 要求:
 * 1. 接口中的抽象方法的形参列表和返回值类型，与方法引用的方法的形参列表和返回值类型相同
 */
public class FieldTest {
    // 情况一: 对象 :: 实例方法
    @Test
    public void test01() {
        Consumer<String> con1 = str -> System.out.println(str);
        con1.accept("测试");
        System.out.println("************************");
        Consumer<String> con2 = System.out::println;
        con2.accept("test");

    }

    @Test
    public void test2() {
        Employee employee = new Employee();
        Supplier<String> sup1 = () -> employee.getName();
        System.out.println(sup1.get());
        System.out.println("****************");
        sup1 = employee::getName;
        System.out.println(sup1);
    }

    // 情况二： 类 :: 静态方法
    @Test
    public void test3() {
        Comparator<Integer> com1 = ((o1, o2) -> Integer.compare(o1, o2));
        System.out.println(com1.compare(12, 21));
        System.out.println("*****************");
        com1 = Integer::compareTo;
        System.out.println(com1);
    }

    // 情况三: 类 :: 非静态方法
    @Test
    public void test4() {
        Comparator<String> com1 = (s1,s3) -> s1.compareTo(s3);
        System.out.println(com1.compare("abc","abd"));
        System.out.println("******************");
        com1 = String::compareTo;
        System.out.println(com1);
    }
}
```
- 构造器引用
```java
/**
 * 函数式接口的抽象方法的形参列表和构造器的形参列表一致，
 * 邮箱方法的返回值类型即为构造器所属的类的类型
 * 
 * 数组引用与构造器一致
 */
public class FieldTest {
    // 情况一: 对象 :: 实例方法
    @Test
    public void test01() {
        // 普通
        Supplier<Employee> sup = new Supplier<Employee>() {
            @Override
            public Employee get() {
                return new Employee();
            }
        };
        // lambda
        sup = () -> new Employee();
        // 方法引用
        sup = Employee::new;
    }

    @Test
    public void test02() {
        Function<Integer, String[]> function = length -> new String[length];
        String[] apply = function.apply(5);
        System.out.println(Arrays.toString(apply));

        function = String[]::new;
    }
}
```
## Stream API
## Optional类