> java 比较器

**背景:**

​	Java当中比较大小的运算符大多数只对于基本数据类型有效，对于引用数据类型无法进行大小区分。

​	在实际开发当中我们需要根据对象来进行排序，而Java当中比较大小的运算符无法满足我们的需求。

​	为了解决上述情况,Java当中为我们提供了两个接口进行比较。

1. comparable(自然排序)

   实现Comparable接口，重写comparaTo()方法

   重写规则:

   			+ 如果当前对象this大于形参对象obj，则返回正整数
   			+ 如果当前对象this小于形参对象obj，则返回负整数
   			+ 如果当前对象this等于形参对象obj，则返回零

   使用参考: String类

   ```java
   public final class String
       implements java.io.Serializable, Comparable<String>, CharSequence {
        public int compareTo(String anotherString) {
           int len1 = value.length;
           int len2 = anotherString.value.length;
           int lim = Math.min(len1, len2);
           char v1[] = value;
           char v2[] = anotherString.value;
   
           int k = 0;
           while (k < lim) {
               char c1 = v1[k];
               char c2 = v2[k];
               if (c1 != c2) {
                   return c1 - c2;
               }
               k++;
           }
           return len1 - len2;
       }
       
   }
   ```

   ```java
   @Test
       public void test03(){
           String[] arr = new String[]{"D","E","B","A","Q","P"};
           Arrays.sort(arr);
           System.out.println(Arrays.toString(arr));
       }
   ```

   在Java当中还有许多的包装类实现了Comparable接口，此处不一一举例了。

   对于自定义类来说，如果需要排序，可以让自定义类实现Comparable接口，重写comparaTo()方法，在comparaTo方法当中自定义排序规则

   ```java
   public class Student implements Comparable {
   
   	private Integer id;
   	private String name;
   	private Integer className;
   
   	public Integer getId() {
   		return id;
   	}
   
   	public void setId(Integer id) {
   		this.id = id;
   	}
   
   	public String getName() {
   		return name;
   	}
   
   	public void setName(String name) {
   		this.name = name;
   	}
   
   	public Integer getClassName() {
   		return className;
   	}
   
   	public void setClassName(Integer className) {
   		this.className = className;
   	}
   
   	public Student(Integer id, String name, Integer className) {
   		this.id = id;
   		this.name = name;
   		this.className = className;
   	}
   
   	public Student() {
   	}
   
   	//指定比较大小的方式(按学号)
   	@Override
   	public int compareTo(Object o) {
   		if (o instanceof Student) {
   			Student student = (Student) o;
   			if (this.id > student.getId()) {
   				return 1;
   			} else if (this.id < student.getId()) {
   				return -1;
   			} else {
   				return 0;
   			}
   		}
   		throw new RuntimeException("类型不匹配");
   	}
   
   	@Override
   	public String toString() {
   		return "Student [id=" + id + ", name=" + name + ", className=" + className + "]";
   	}
   	
   
   }
   ```

   ```java
   @Test
   	public void test1 () {
   		Student[] arr = new Student[3];
   		arr[0] = new Student(1,"张三",110);
   		arr[1] = new Student(3,"张三",112);
   		arr[2] = new Student(2,"张三",111);
   		Arrays.sort(arr);
   		System.out.println(Arrays.toString(arr));
   	}
   ```

   

2. comparator(定制排序)

   使用场景:

   ​	当元素的类型没有实现Comparable接口而又不方便修改代码,或者实现了comparable接口的排序规则不适合当前的操作，那么可以考虑使用comparator接口。

   实现comparator接口，重写compara(Object o1,Object o2)

   规则:

   	+ 如果方法返回正整数,则表示o1大于o2
   	+ 如果返回0,表示相等
   	+ 返回负整数，表示o1小o2

   String示例:

   ```java
   @Test
   	public void test2() {
   		String[] arr = {"B","A","Q","D"};
   		Arrays.sort(arr, new Comparator() {
   			// 字符串从大到小
   			@Override
   			public int compare(Object o1, Object o2) {
   				// TODO Auto-generated method stub
   				if (o1 instanceof String && o2 instanceof String) {
   					String s1 = (String) o1;
   					String s2 = (String) o2;
   					return -s1.compareTo(s2);
   				}
   				throw new RuntimeException("类型不匹配");
   			}
   			
   		});
   		System.out.println(Arrays.toString(arr));
   	}
   ```

   

   自定义排序:

   ```java
   	@Test
   	public void test3 () {
   		Student[] arr = new Student[3];
   		arr[0] = new Student(1,"张三",110);
   		arr[1] = new Student(3,"张三",112);
   		arr[2] = new Student(2,"张三",111);
   		Arrays.sort(arr,new Comparator() {
   			// 按照班级排序从高到低
   			@Override
   			public int compare(Object o1, Object o2) {
   				if (o1 instanceof Student && o2 instanceof Student) {
   					Student s1 = (Student) o1;
   					Student s2 = (Student) o2;
   					return -s1.getClassName().compareTo(s2.getClassName());
   				}
   				throw new RuntimeException("类型不匹配");
   			}
   		});
   		System.out.println(Arrays.toString(arr));
   	}
   ```

***Comparable接口与Comparator的使用对比***

Comparable接口的方式一旦确定，保证Comparable接口实现类的对象在任何位置都可以比较大小。

Comparator接口属性临时性的比较。