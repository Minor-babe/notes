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
简介:可以对集合数据进行并行操作

Stream与Collection集合的区别:
- Collection是一种静态的内存数据,Stream主要是计算

使用示例:
```java
public class StreamTest {
    // 创建Stream方式一：通过集合
    @Test
    public void test01() {
        List<Employee> list = getData();
        // 顺序流
        Stream<Employee> stream = list.stream();
        // 并行流
        Stream<Employee> parallelStream = list.parallelStream();

    }

    // 创建Stream方式二: 通过数组
    @Test
    public void test02() {
        int[] ints = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        // 调用Arrays类的static<T> Stream<T> stream(T[] array); 返回一个流
        IntStream stream = Arrays.stream(ints);
        Employee[] arr1 = new Employee[]{new Employee(), new Employee()};
        Stream<Employee> employeeStream = Arrays.stream(arr1);
    }

    // 创建Stream方式三:通过Stream的of()
    @Test
    public void test03() {
        Stream<String> stringStream = Stream.of("", "", "");
    }

    // 创建Stream方式四:创建无限流
    @Test
    public void test04() {
        // 遍历前10个偶数
        Stream.iterate(0, t -> t + 2).limit(10).forEach(System.out::println);

        Stream.generate(Math::random).limit(10).forEach(System.out::println);
    }


    public List<Employee> getData() {
        List<Employee> list = new ArrayList<>();
        list.add(new Employee(1001, "马化腾", 34, 6000.37));
        list.add(new Employee(1002, "码云", 12, 9876.12));
        list.add(new Employee(1003, "刘强东", 33, 3000.82));
        list.add(new Employee(1004, "雷军", 26, 7657.37));
        list.add(new Employee(1005, "李彦宏", 65, 5555.32));
        list.add(new Employee(1006, "比尔盖茨", 42, 9500.43));
        list.add(new Employee(1007, "任正非", 26, 4333.32));
        list.add(new Employee(1008, "扎克伯格", 35, 2500.32));
        return list;
    }
}
```
功能：
- 筛选与切片
```java
    @Test
    public void test01() {
        List<Employee> list = getData();
        Stream<Employee> stream = list.stream();
        // 过滤
        stream.filter( e -> e.getSalaty() > 7000).forEach(System.out::println);
        System.out.println("****************");

        // 截断,使其元素不超过给定数量
        list.stream().limit(3).forEach(System.out::println);
        System.out.println("****************");

        // skip 跳过原元素,返回一个扔掉了前n个元素的流。若流中元素不足n个，则返回一个空流
        list.stream().skip(3).forEach(System.out::println);
        System.out.println("****************");
        // distinct -- 筛选，通过流所生成元素的hashCode()和equals()去除重复元素,类似Set集合去重
        list.stream().distinct().forEach(System.out::println);
    }
```
- 映射
```java
 @Test
    public void test01() {
        List<String> list = Arrays.asList("aa", "bb", "cc", "vv");
        // 接收一个函数作为参数,将元素转换成其他形式或提取信息,该函数会被应用到每个元素上,并将其映射成一个新的元素。
        list.stream().map(str -> str
                .toUpperCase()).forEach(System.out::println);
        // 获取员工姓名长度大于3的姓名
        List<Employee> employeeList = getData();
        Stream<String> stream = employeeList.stream().map(Employee::getName);
        stream.filter(name -> name.length() > 3).forEach(System.out::println);


        // 接收一个函数作为参数，将流中的每个值都换成另一个流，然后把所有流连接成一个流
        Stream<Character> characterStream = list.stream().flatMap(StreamTest::fromStringToStream);
        characterStream.forEach(System.out::println);
        // 如果不用
        Stream<Stream<Character>> streamStream = list.stream().map(StreamTest::fromStringToStream);
        streamStream.forEach(s ->
                s.forEach(x -> {
                    System.out.println(x);
                })
        );
    }

    public static Stream<Character> fromStringToStream(String str) {
        ArrayList<Character> list = new ArrayList<>();
        for (char c : str.toCharArray()) {
            list.add(c);
        }
        return list.stream();
    }
```

- 排序
```java
    
    @Test
    public void test01() {
        // 自然排序
        List<Integer> list = Arrays.asList(12, 43, 65, 48, 14, 156, 75);
        list.stream().sorted().forEach(System.out::println);

        // 定制排序
        List<Employee> employeeList = getData();
        employeeList.stream().sorted((e1,e2) -> Integer.compare(e1.getAge(),e2.getAge())).forEach(System.out::println);
    }
```
- 终止操作
 - 匹配与查找
    ```java
      // 检查是否匹配所有元素
        List<Employee> employeeList = getData();
        boolean allMatch = employeeList.stream().allMatch(e -> e.getAge() > 18);

        // 检查是否有一个匹配元素
        boolean anyMatch = employeeList.stream().anyMatch(e -> e.getSalaty() > 10000);

        // 检查是否没有匹配的元素
        boolean noneMatch = employeeList.stream().noneMatch(e -> e.getName().startsWith("雷"));

        // 返回第一个元素
        Optional<Employee> first = employeeList.stream().findFirst();

        // 返回当前流中的任意元素
        Optional<Employee> findAny = employeeList.parallelStream().findAny();

        // 返回流中元素的个数
        long count = employeeList.stream().filter(employee -> employee.getSalaty() > 5000).count();

        // 返回流中最大值
        employeeList.stream().map(e -> e.getSalaty()).max(Double::compare);

        // 返回流中最小值
        employeeList.stream().min((e1, e2) -> Double.compare(e1.getSalaty(), e2.getSalaty()));
        // 迭代
        employeeList.stream().forEach(System.out::println);
        // 使用集合的遍历
        employeeList.forEach(System.out::println);
    ```
    - 规约
    ```java
     @Test
    public void test01() {
        // 计算1-10的自然数的和
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9);

        // 第一个参数为初始值
        list.stream().reduce(0,Integer::sum);
    }
    ```
    - 收集
    ```java
        @Test
        public void test01() {
            List<Map<String, Object>> list = new ArrayList<>();
            for (int i = 0; i < 3; i++) {
                Map<String, Object> map = new HashMap<>();
                map.put("salary", Math.random() * 1000);
                list.add(map);
            }
            // 查找工资大于500的并返回list或set等
            List<Map<String, Object>> salary = list.stream().filter(k -> Integer.valueOf(k.get("salary").toString()) > 500).collect(Collectors.toList());
            Set<Map<String, Object>> set = list.stream().filter(k -> Integer.valueOf(k.get("salary").toString()) > 500).collect(Collectors.toSet());
        }
    ```
    - Collectors主要方法

        |方法|返回类型|作用|
        |:--:|:--:|:--:|
        |toList|List\<T>|把流中元素收集到List|
        |list.stream.collect(Collectors.toList())|
        |toSet|Set\<T>|把流中元素收集到Set|
        |list.stream.collect(Collectors.toSet())|
        |toCollection|Collection\<T>|把流中元素收集到创建的集合|
        |list.stream.collect(Collectors.toCollection(ArrayList::new))|
         |counting|Long|计算流中元素的个数|
        |list.stream.collect(Collectors.counting())|
         |summingInt|Integer|对流中元素的整数属性求和|
        |list.stream().collect(Collectors.summingInt(k -> Integer.valueOf(k.get("salary").toString()))|
         |summingInt|Integer|对流中元素的整数属性求和|
        |list.stream().collect(Collectors.summingInt(k -> Integer.valueOf(k.get("salary").toString())))|
        |averagingInt|Integer|对流中元素的整数属性的平均值|
        |list.stream().collect(Collectors.averagingInt(k -> Integer.valueOf(k.get("salary").toString())))|
        |summarizingInt|Integer|收集流中整数属性的统计值,如:平均值|
        |list.stream().collect(Collectors.averagingInt(k -> Integer.valueOf(k.get("salary").toString())))|


注意:
- stream自己不会存储元素
- Stream不会改变源对象
- stream延迟执行
## Optional类
- 简介:
    - Optional类的开发来源于Google Guave的启发用于检查空值的方式来防止代码污染。
    - 在Java8中是一个容器类,它可以保存类型T的值,代表这个值存在。或者保存null,表示这个值不存在，避免空指针异常
    - Javadoc:这是一个可以为null的容器对象
- 创建Optional类的方法:
 ```java
    Optional.of(T t):创建一个Optional实例,t必须非空
    Optional.empty(): 创建一个空的Optional实例
    Optional.ofNullable(T t): t可以为null
 ```
 - 判断Optional容器中是否包含对象:
 ```java
 boolean isPresent(): 判断是否包含对象
 void ifPresent(Consumer<? super T> consumer):如果有值,就执行Consumer接口的实现代码,并且该值会作为参数传给它。
 ```
 - 获取Optional容器对象:
 ```java
    T get():如果调用对象包含值,返回该值,否则异常
    T orElse(T other): 如果有值则将其返回,否则返回指定的other对象
    T orElseGet(Supplier<? extends T> other):如果有值则将其返回,否则返回有Supplier接口实现提供的对象
    T orElseThrow(Supplier<? extends X> exceptionSupplier):如果有值则将其返回,否则抛出由Supplier接口实现提供的异常
 ```
- 代码示例
```java
public class Girl {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Girl{" +
                "name='" + name + '\'' +
                '}';
    }

    public Girl(String name) {
        this.name = name;
    }

    public Girl() {
    }
}
public class Boy {
    private Girl girl;

    public Boy(Girl girl) {
        this.girl = girl;
    }

    public Boy() {
    }

    public Girl getGirl() {
        return girl;
    }

    public void setGirl(Girl girl) {
        this.girl = girl;
    }

    @Override
    public String toString() {
        return "Boy{" +
                "girl=" + girl +
                '}';
    }
}
```
```java
/**
 * Optional类:为了在程序种避免出现空指针异常而创建的
 *
 */
public class OptionalTest {

    @Test
    public void test1() {
        Girl girl = new Girl();
        //  the value to describe, which must be non-{@code null}  必须不能为空
        Optional<Girl> optionalGirl = Optional.of(girl);
        System.out.println(optionalGirl);
    }

    @Test
    public void test2() {
        Girl girl = null;
        Optional<Girl> optionalGirl = Optional.ofNullable(girl); // 对象可以为空
        System.out.println(optionalGirl); // Optional.empty
    }

    /**
     * 可能会出现空指针异常
     * @param boy
     * @return
     */
    public String getGrilName(Boy boy){
        return boy.getGirl().getName();
    }

    @Test
    public void test33() {
        Boy boy = new Boy();
        String girlName = getGrilName(boy);
        System.out.println(girlName);
    }

    /**
     * 优化（optional之前）
     * @param boy
     * @return
     */
    public String getGrilName1(Boy boy){
        if (boy != null) {
            Girl girl = boy.getGirl();
            if (girl!=null) {
                return  girl.getName();
            }
        }
        return null;
    }



    /**
     * 优化（optional之后）
     * @param boy
     * @return
     */
    public String getGrilName2(Boy boy){
        Optional<Boy> boyOptional = Optional.ofNullable(boy);
        Boy orElse = boyOptional.orElse(new Boy(new Girl("test")));

        Girl girl = orElse.getGirl();
        Optional<Girl> girlOptional = Optional.ofNullable(girl);
        Girl girl1 = girlOptional.orElse(new Girl("test1"));
        return girl1.getName();
    }

    @Test
    public void test5(){
        Boy boy = null;
        String grilName2 = getGrilName2(boy);
        System.out.println(grilName2);
    }
}
```
# Java9新特性
- 模块化系统(Jigsaw)
    - Java运行环境的膨胀和臃肿,每次JVM启动的时候,至少会有30~60MB的内存加载,主要原因是JVM需要加载jt.jar,不管其中的类是否被classloader加载,第一步整个jar都会被JVM加载到内存当中去(而模块化根据模块的需要加载程序运行需要的class)
    - 不同版本的类库交叉依赖导致让人头疼的问题
    - 每一个公共类都可以被类路径之下任何其它的公共类访问到,这样就会导致无意中并不想被公开访问的API
    - 代码示例
        - 项目结构:
        
        ![项目结构](\imgage\目录结构.png)
        ```java
        package com.pyw;

        public class Person {
            private String name;
            private int age;

            public String getName() {
                return name;
            }

            public void setName(String name) {
                this.name = name;
            }

            public int getAge() {
                return age;
            }

            public void setAge(int age) {
                this.age = age;
            }

            public Person() {
            }

            public Person(String name, int age) {
                this.name = name;
                this.age = age;
            }

            @Override
            public String toString() {
                return "Person{" +
                        "name='" + name + '\'' +
                        ", age=" + age +
                        '}';
            }
        }

        module java9module {
            // 导出包

            exports com.pyw;
        }

        ```

        ```java

        package com.pyw.javatest;

        import com.pyw.Person;
        import org.junit.Test;

        public class ModuleTest {

            @Test
            public void test01() {
                Person person = new Person();
            }
        }

        module java9Test {
            // 引入工程(主要引入导出内容)
            requires java9module;
            requires junit;
        }

        ```
    上述代码写过Node的小伙伴们是否很眼熟呢？
- jshell命令
    - 实现目标:让java像脚本一样运行,从控制台启动jShell,运行一些简单的Java程序。
    - 输出hellworld
    ![jshellHelloWorld](\imgage\jshellHelloWorld.png)
    - 实现1+3
    ![jshellAdd](\imgage\jshellAdd.png)
    - 创建加法方法
    ![jshellAddMethod](\imgage\jshellAddMethod.png)
    - 创建类
    ![jshellCreateClassA](\imgage\jshellCreateClassA.png)
    - 帮助
    ![jshellHelp](\imgage\jshellHelp.png)

- 多版本兼容jar包
- 接口的私有方法
- 钻石操作符的使用升级
    - 在匿名内部类当中可以不写泛型,自动推断
- 语法改进:try语句
- Optional新增stream方法
    ```java
    Optional.stream();
    ```
- String存储结构变更
    - 底层原本采用char数组,改为byte数组
- 便利的集合特性
    - Map.of()
    ```java
    @Test
    public void test01() {
       List<String> list = new ArrayList<>();
       list.add("Joe");
       // 创建只读集合jdk8
       list = Collections.unmodifiableList(list);
       // jdk9
        List<Integer> integers = List.of(1, 2, 3, 4, 5, 6);

    }
    ```
- 增强的Stream API
    ```java
     @Test
    public void test01() {
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 8, 9, 5);
        // takeWhile返回从开头开始的满足条件的元素,如果有一个不满足那么则终止
        //  list.stream().takeWhile(x -> x < 4).forEach(System.out::println);

        // dropWhile返回满足条件的剩余元素
        // list.stream().dropWhile(x -> x < 4).forEach(System.out::println);

        // of的参数中的多个元素,可以包含null值,但是参数不能存储单个null
        Stream<Integer> stream = Stream.of(1, 2, 3, null);
        stream.forEach(System.out::println);
    }

    ```
- Deprecated的相关API
- java doc的HTML5支持
- javascript引擎升级:Nashorm
- java的动态编译器
- InputStream增强
    - transferTo,可以用来将数据直接传输到OutputStream
    ```java

        ```java
        @Test
        public void test01() {
            ClassLoader c1 = this.getClass().getClassLoader();
            try (InputStream is = c1.getResourceAsStream("hello.txt");
                OutputStream os = new FileOutputStream("src\\hello1.txt")) {
                is.transferTo(os);
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        ```
    ```
# java 10新特性
- 类型推断
```java
 /**
     * 类型推断: 根据右边的值,推断左边的值
     * 注意事项:
     * 1. 局部变量不赋值,就不能实现类型推断
     * 2. Lambda表达式中,左边的函数式接口不能声明为var
     * 3. 在方法引用中,左边不能使用var
     * 4. 数组的静态初始化中
     * 5. 方法的返回类型
     * 6. 方法的参数类型
     * 7. 构造器的参数类型
     * 8. catch块
     * 9. 属性(即全局变量当中不能使用var，在此处不演示了，var只能用于局部变量)
     * 总结:要想使用var推断类型,需要能够一眼识别此类型是什么
     */
    @Test
    public void test01() {
        var a = 10;
        var list = new ArrayList<Integer>();
        list.add(1);
        for (var o : list) {
            System.out.println(o); // 1
            System.out.println(o.getClass()); // class java.lang.Integer
        }
        for (var i = 0; i < list.size(); i++) {
            System.out.println(i);
        }
        // 错误1
        // var num;
        // 正确写法;
        var num = 10;

        // 错误2
        // var sup = () -> Math.random();
        // 正确写法
        Supplier<Double> supplier = () -> Math.random();

        // 错误3
        // var con = System.out::println;
        // 正确写法
        Consumer<String> con = System.out::println;

        // 错误4
        // var arr = {1,2,3,4};
        // 正确写法
        var arr = new int[]{1, 2, 3, 4};

    }

    // 错误5
//    public var init () {
//
//    }
    // 错误6
//    public int init(var a){
//
//    }

    // 错误7
//    public ModuleTest(var a ) {
//
//    }

    public void test02 (){
        // 错误8
//        try {
//
//        }catch (var e){
//
//        }
    }

```
- 工作原理
    -  编译器先查看表达式右边部分,并根据右边变量值的类型来进行推断,作为左边变量的类型,然后将该类型写入字节码当中
- 注意
    - var不是一个关键字
    - 与JavaScript当中的var不一样
- 集合中新增copyOf()方法,创建不可变集合
```java
    /**
     * 集合中新增copyof()方法,用于创建一个只读集合
     */
    @Test
    public void test01() {
        var list1 = List.of("java","python","c");
        var copyOf = List.copyOf(list1);
        System.out.println(list1 == copyOf); // true

        var list2 = new ArrayList<String>();
        list2.add("aaa");
        var copyOf2 = List.copyOf(list2);
        System.out.println(list2 == copyOf2); // false
        // 结论: copyOf(Xxx coll):如果参数coll本身就是一个只读集合,则copyOf返回当前集合
        // 如果参数有coll不是一个只读集合,则copyof() 返回的就是一个新的只读集合
        // 部分关键源码
//        static <E> List<E> copyOf(Collection<? extends E> coll) {
//            return ImmutableCollections.listCopy(coll);
//        }

//        static <E> List<E> listCopy(Collection<? extends E> coll) {
//            if (coll instanceof ImmutableCollections.AbstractImmutableList && coll.getClass() != ImmutableCollections.SubList.class) {
//                return (List<E>)coll; // 如果本身是不可变集合,则返回
//            } else {
//                return (List<E>)List.of(coll.toArray());
//            }
//        }
        
    }
```
# java11 新特性
- 继java8之后的第一个长期支持版本
- 新增一系列字符串处理方法
```java
    @Test
    public void test01() {
        // isBlank是否为空白(忽略\t\n等以及空格判断是否为空)
        System.out.println("".isBlank()); // true
        // strip去除首尾的空格(可以去掉\t\n等)
        System.out.println("\t abc \n".strip()); // abc

        // stripLeading去除首部的空格
        System.out.println("--------------------------" + "\t abc \t".stripLeading() + "-----------"); // --------------------------abc 	-----------

        // stripTrailing去除尾部的空格
        System.out.println("--------------------------" + "\t abc \t".stripTrailing() + "-----------"); // --------------------------	 abc-----------

        // repeat复制5次
        System.out.println("ABC".repeat(5)); // ABCABCABCABCABC

        // lines().count()判断当前有字符串有多少行
        System.out.println("abc".lines().count()); // 1
        System.out.println("abc\ncdbs".lines().count()); // 2

    }
```
- Optional 新增方法
```java
// Optional 新增方法
    @Test
    public void test02() {
        var op = Optional.empty();
        // jdk 8 判断是否存在
        System.out.println(op.isPresent());

        // jdk11 判断是否为空
        System.out.println(op.isEmpty());

        var obj = op.orElseThrow();
        
        // 返回value的值,如果没有值则抛异常
        System.out.println(obj);
    }
```
- 全新的HTTP客户端API
```java
    /**
     * HttpClient
     * @throws IOException
     * @throws InterruptedException
     */
    @Test
    public void test02() throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder(URI.create("https://www.baidu.com")).build();
        HttpResponse.BodyHandler<String> bodyHandler = HttpResponse.BodyHandlers.ofString();
        HttpResponse<String> send = client.send(request, bodyHandler);
        String body = send.body();
        System.out.println(body);

    }
```
- 记得在模块当中引入
```java
  requires java.net.http;
```
- 可以更加便捷的编译运行类
- jdk11以前
```shell
javac Hello.java
java Hello
```
- jdk11
```shell
java Hello.java
```
- ZGC
- 背景:
    - GC是Java主要优势之一。然而，当GC停顿太长,就会开始影响应用的响应时间
    - 消除或减少GC停顿时长,java将对更广泛的应用场景是一个更有吸引力的平台
    - 现代系统中可用内存不端增长,用户和程序员希望JVM能够以高效的方式充分利用这些内存,并且无需长时间的GC暂停时间
- ZGC是JDK11最为瞩目的特性,没有之一。但官方给出的后缀为Experimental(实验的),还不建议用到生产环境当中
- ZGC是一个并发,基于region,压缩性的垃圾收集器,只有root扫描阶段会STW(stop the world),因此GC停顿时间不会随着堆的增长和存活对象的增长而变长
- 优势:
    - GC暂停时间不会超过10ms
    - 既能处理几百兆的小堆,也能够处理几个T的大堆
    - 和G1相比,应用吞吐能力不会下降超过15%
    - 为未来的GC能工和利用colord指针以及Load barriers优化奠定基础
- 设计目标
    - 支持TB级内存
    - 暂停时间低(<10ms>)
    - 对整个程序的吞吐量影响小于15%
    - 扩展实现机制
    - 多层堆(即热对象置于DRAM和冷对象置于NVMe闪存)或者压缩堆
- Unicode 10
- Deprecate the Pack200 Tools and API
- 新的Epslion垃圾收集器
- 完全支持Linux容器(包括docker)
- 支持G1上的并行完全垃圾收集
- 最新的HTTPS安全协议TLS 1.3
- Java Flight Recorder