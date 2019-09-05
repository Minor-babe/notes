# JPA笔记

## 1.什么是JPA？

​	Java Persistence API 的简称，中文名:Java持久层API，是JDK5.0注解描述对象-关系表的映射关系，并将运行期的实体对象持久化到数据库中。

​	Sun引入新的JPA ORM规范处于两个原因：

1. 简化现有的JavaEE和JavaSE应用开发工作；
2. Sun希望整合ORM技术。

# 2. JPA具体的实现框架

1. HIbernate:不是本次重点
2. Spring Data JPA：
   - Spring Data官网简介:
     - Spring Data’s mission is to provide a familiar and consistent, Spring-based programming model for data access while still retaining the special traits of the underlying data store.
     - It makes it easy to use data access technologies, relational and non-relational databases, map-reduce frameworks, and cloud-based data services. This is an umbrella project which contains many subprojects that are specific to a given database. The projects are developed by working together with many of the companies and developers that are behind these exciting technologies.
     - Spring Data的任务是为数据访问提供一个熟悉的、一致的、基于Spring的编程模型，同时仍然保留底层数据存储的特殊特性。
     - 它使得使用数据访问技术、关系数据库和非关系数据库、map-reduce框架和基于云的数据服务变得很容易。这是一个伞形项目，包含许多特定于给定数据库的子项目。这些项目是通过与许多支持这些令人兴奋的技术的公司和开发人员合作开发的。
   - [Spring Data JPA](https://spring.io/projects/spring-data-jpa) - Spring Data repository support for JPA.
     - Spring数据存储库对JPA的支持



# 3. 需要的jar包

```xml
  <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.1.8.RELEASE</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>5.1.8.RELEASE</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-orm</artifactId>
            <version>5.1.8.RELEASE</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.data</groupId>
            <artifactId>spring-data-jpa</artifactId>
            <version>2.1.8.RELEASE</version>
        </dependency>

        <dependency>
            <groupId>org.hibernate</groupId>
            <artifactId>hibernate-core</artifactId>
            <version>5.4.3.Final</version>
        </dependency>

        <dependency>
            <groupId>org.hibernate</groupId>
            <artifactId>hibernate-entitymanager</artifactId>
            <version>5.4.3.Final</version>
        </dependency>

        <dependency>
            <groupId>com.mchange</groupId>
            <artifactId>c3p0</artifactId>
            <version>0.9.5.2</version>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.16</version>
        </dependency>
```

