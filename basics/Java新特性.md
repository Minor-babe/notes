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
## Stream API
## Optional类