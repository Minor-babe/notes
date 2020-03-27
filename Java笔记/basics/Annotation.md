# 注解(Annotation)

> 概述

- 从JDK5.0开始,Java增加了对元数据(MetaData)的支持,也就是Annotation(注解)

- Annotation其实就是代码里的特殊标记,这些标记可以在编译,类加载，运行时被读取，并执行相应的处理。通过使用Annotation,程序员可以在不改变原有逻辑的情况下,在源文件中嵌入一些补充信息。代码分析工具、开发工具和部署工具可以通过这些补充信息进行验证或进行部署。
- Annotation可以像修饰符一样被使用,可用于修饰包,类,构造器,方法,成员变量,参数,局部变量的声明,这些信息被保存在Annotation的"name=value"对中。
- 举例:Spring2.5以上都是基于注解,Hibernate3.x以后也是基础注解。**框架 = 注解+反射+设计模式**

> jdk内置注解
- @Override:限定重写父类方法,该注解只能用方法
- @Deprecated: 用于表示所修饰的元素(类,方法等)已过时。通常是因为所修饰的结构危险或存在更好的选择
- @SuppressWarnings: 抑制编译器警告

> 自定义注解

- 定义新的Annotation类型使用@interface关键字

- 自定义注解自动继承了java.lang.annotation.Annotation接口

1. @interface

```java
public @interface MyAnnotation {
    String[] value default "";
}
```

- 在注解中可以指定成员的默认值,使用default定义

**如果注解有成员,在使用注解时,需要指明成员的值。**

**自定义注解必须配上注解的信息处理流程(反射)才有意义**

**自定义注解通常会指明两个元注解:Retention、Target**

**元数据**

理解:对现有的注解进行解释说明的注解

JDK提供的4种元注解

- Documented: 表示所修饰的注解再被javadoc解析时,保留下来
- Retention：指定所修饰的Annotation的生命周期,只能用于修饰一个Annotation定义,用于指定该Annotation的生命周期,@Rentention包含一个RetentionPolicy(枚举类)类型的成员变量,使用@Rentention时必须为该value成员变量指定值

    + RetentionPolicy.SOURCE:在源文件中有效(即源文件保留),编译器直接丢弃这种策略的注释

    + RetentionPolicy.CLASS:在class文件中有效(即class保留),当运行Java程序时,JVM不会保留注解。这是默认值

    + RetentionPolicy.RUNTIME:在运行时有效(即运行时保留),当运行Java程序时。
    程序可以通过反射获取该注释。

    ```java

    @Documented
    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.ANNOTATION_TYPE)
    public @interface Retention {
        RetentionPolicy value();
    }
    ```

    ```java

    public enum RetentionPolicy {
        /**
        * Annotations are to be discarded by the compiler.
        */
        SOURCE,

        /**
        * Annotations are to be recorded in the class file by the compiler
        * but need not be retained by the VM at run time.  This is the default
        * behavior.
        */
        CLASS,

        /**
        * Annotations are to be recorded in the class file by the compiler and
        * retained by the VM at run time, so they may be read reflectively.
        *
        * @see java.lang.reflect.AnnotatedElement
        */
        RUNTIME
    }
    ```
- Target: 指定Annotation能够修饰那些程序元素

    | 取值(ElementType) |  | 取值 |  |
    | :----: | :----: | :----: | :----: |
    | CONSTRUCTOR | 用于描述构造器 | PACKAGE | 用于描述包 |
    | FIELD | 用于描述域 | PARAMETER | 用于描述参数 |
    | LOCAL_VARIABLE | 用于描述局部变量 | TYPE | 用于描述类、接口(包括注解类型)或enum声明
    | METHOD | 用于描述方法 | | | 

    ```java

    @Documented
    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.ANNOTATION_TYPE)
    public @interface Target {
        ElementType[] value();
    }
    ```

    ```java

    public enum ElementType {
        /** Class, interface (including annotation type), or enum declaration */
        TYPE,

        /** Field declaration (includes enum constants) */
        FIELD,

        /** Method declaration */
        METHOD,

        /** Parameter declaration */
        PARAMETER,

        /** Constructor declaration */
        CONSTRUCTOR,

        /** Local variable declaration */
        LOCAL_VARIABLE,

        /** Annotation type declaration */
        ANNOTATION_TYPE,

        /** Package declaration */
        PACKAGE
    }
    ```

- Inherited:被它修饰的Annotation将具有继承性。如果某个类使用了被@Inherited修饰的Annotation，其子类将自动具有该注解。

# jdk8新特性

1. 可重复注解

    @Repeatable()：参数为传入一个CLASS,要求传入的CLASS与本注解的Target、Retention、Inherited相同

2. 类型注解: 在Java8 之前,注解只能是在声明的地方所使用,Java8开始,注解可以应用在任何地方
    
    - ElementType.TYPE_PARAMETER 表示该注解能写在类型变量的声明语句中(如泛型)

    - ElementType.TYPE_USE 表示该注解能写在使用类型的任何语句中

    ```java

    public enum ElementType {
        /** Class, interface (including annotation type), or enum declaration */
        TYPE,

        /** Field declaration (includes enum constants) */
        FIELD,

        /** Method declaration */
        METHOD,

        /** Parameter declaration */
        PARAMETER,

        /** Constructor declaration */
        CONSTRUCTOR,

        /** Local variable declaration */
        LOCAL_VARIABLE,

        /** Annotation type declaration */
        ANNOTATION_TYPE,

        /** Package declaration */
        PACKAGE

        /** 
         *Type paratemer declaration
         * 
         * @since 1.8
         */
        TYPE_PARAMETER

        
        /** 
         *Use of a type 
         * 
         * @since 1.8
         */
        TYPE_USE
    }
    ```
