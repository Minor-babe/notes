# Spring

> 简介 

Spring 框架是由于软件开发的复杂性而创建的。Spring使用的是基本的JavaBean来完成以前只可能由EJB完成的事情。然儿，Spring的用途不仅仅限于服务器端的开发。从简单行、可测试性和松耦合性角度而言，绝大部分的Java应用都可以从Spring中收益。

​												----引用自百度百科介绍

> 家族大成员一览（本节只涉及Spring framework ，其余后续会有篇章）

![spring家族](spring/spring.png)

距本篇文章截止，目前spring 版本最新为5.1

> spring核心技术(IOC与AOP)

   1. IOC:

      ​	控制反转或称依赖注入，称呼上存在争议，此处统称为IOC或依赖注入。

      ​	依赖注入: 方便解耦，简化开发，将 对象与对象之间的依赖关系交于Spring IOC容器进行统一的管理

   2. AOP：

      ​	切面编程:通过预编译方式和运行期动态代理实现程序功能的同意维护的一种技术。AOP是OOP的延续，利用AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性。

> spring 的HellWorld

