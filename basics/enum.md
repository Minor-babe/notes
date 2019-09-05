# 枚举(menu)

## 枚举类的使用?

1. 枚举类的理解:类的对象只有**有限个,确定的**。我们称此类为枚举类
2. 当需要定义一组常量时,强烈建议使用枚举类
3. 如果枚举类中只有一个对象,则可以作为单例模式的实现方式

## 如何自定义枚举类

1. jdk5.0之前,自定义枚举类
    
    - 声明对象的属性:private final 修饰
    - 私有化类的构造器,并给对象属性赋值
    - 提供当前枚举类的多个对象：public static final
    - 其它需求: 获取枚举对象的属性
    - 其它需求: 提供toString()方法

    ```java

        public class Season {
            //声明对象的属性:private final 修饰
            private final String seasonName;
            private final String seasonDescString;
            
            // 私有化类的构造器,并给对象属性赋值
            private Season(String seasonName, String seasonDescString) {
                this.seasonName = seasonName;
                this.seasonDescString = seasonDescString;
            }
            
            // 提供当前枚举类的多个对象：public static final
            public static final Season SPRING = new Season("春天", "春天花会开");
            public static final Season SUMMER = new Season("夏天", "夏日炎炎正好眠");
            public static final Season AUTUMN = new Season("秋天", "秋有蚊虫");
            public static final Season WINTER = new Season("冬天", "冬有雪");

            //  获取枚举对象的属性
            public String getSeasonName() {
                return seasonName;
            }

            //  获取枚举对象的属性
            public String getSeasonDescString() {
                return seasonDescString;
            }
            
            // 提供toString()方法
            @Override
            public String toString() {
                return "Season [seasonName=" + seasonName + ", seasonDescString=" + seasonDescString + "]";
            }
            
        }
    ```
    测试代码:
    ```java
    public class SeasonTest {
        public static void main(String[] args) {
            Season spring = Season.SPRING;
            System.out.println(spring);
        }
    }
    ```


2. jdk5.0,可以使用enum关键字定义枚举类
    - 提供当前枚举类的对象,多个对象之间用","隔开,末尾对象";"结束

    ```java
    public enum SeasonEnum {
        // 提供当前枚举类的对象,多个对象之间用","隔开,末尾对象";"结束
        SPRING("春天", "春天花会开"),
        SUMMER("夏天", "夏日炎炎正好眠"),
        AUTUMN("秋天", "秋有蚊虫"),
        WINTER("冬天", "冬有雪");
        private final String seasonName;
        private final String seasonDesc;
        
        private SeasonEnum(String seasonName, String seasonDesc) {
            this.seasonName = seasonName;
            this.seasonDesc = seasonDesc;
        }

        public String getSeasonName() {
            return seasonName;
        }

        public String getSeasonDesc() {
            return seasonDesc;
        }
        
    }

    ```

    **PS:使用enum关键字修饰的类不再继承自Object而是继承自Enum类**

3. 常用方法

    - values()方法：返回枚举类型的对象数组。该方法可以很方便地遍历所有的枚举值
    - valuesOf(String str): 返回枚举类中对象名是str的对象。要求字符串必须是枚举类对象的"名字"。如不是,会有运行时异常: lllegalArgumentException
    - toString(): 返回当前枚举类对象常量的名称

4. enum实现接口
    
    - 实例一(此方法与普通实现无异):

    ```java
    interface info {
	    void show();
    }
    // 实现接口的枚举类
    public enum SeasonEnum implements info{
        // 提供当前枚举类的对象,多个对象之间用","隔开,末尾对象";"结束
        SPRING("春天", "春天花会开"),
        SUMMER("夏天", "夏日炎炎正好眠"),
        AUTUMN("秋天", "秋有蚊虫"),
        WINTER("冬天", "冬有雪");
        private final String seasonName;
        private final String seasonDesc;
        
        private SeasonEnum(String seasonName, String seasonDesc) {
            this.seasonName = seasonName;
            this.seasonDesc = seasonDesc;
        }

        public String getSeasonName() {
            return seasonName;
        }

        public String getSeasonDesc() {
            return seasonDesc;
        }

        @Override
        public void show() {
            // TODO Auto-generated method stub
            
        }
    }
    ```
    - 实例二,此方式可实现枚举类当中每个类重写一份属于自己的show方法:

    ```java

    public enum SeasonEnum implements info{
        SPRING("春天", "春天花会开"){
            @Override
            public void show() {
                // TODO Auto-generated method stub
                
            }
        },
        SUMMER("夏天", "夏日炎炎正好眠"){
            @Override
            public void show() {
                // TODO Auto-generated method stub
                
            }
        },
        AUTUMN("秋天", "秋有蚊虫"){
            @Override
            public void show() {
                // TODO Auto-generated method stub
                
            }
        },
        WINTER("冬天", "冬有雪"){
            @Override
            public void show() {
                // TODO Auto-generated method stub
                
            }
        };
        private final String seasonName;
        private final String seasonDesc;
        
        private SeasonEnum(String seasonName, String seasonDesc) {
            this.seasonName = seasonName;
            this.seasonDesc = seasonDesc;
        }

        public String getSeasonName() {
            return seasonName;
        }

        public String getSeasonDesc() {
            return seasonDesc;
        }
	
    }
    interface info {
        void show();
    }
    ```