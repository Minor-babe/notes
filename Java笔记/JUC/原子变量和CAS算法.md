1. 原子变量
    - jdk1.5之后java.util.concurrent.atomic包下提供了常用的原子变量
        - volatile 保存内存可见性
        - CAS(Compare-And-Swap)算法保证数据的原子性
            - CAS算法是硬件对于并发操作共享数据的支持
            - CAS包含了三个操作数:
                - 内存值 v
                - 预估值 a
                - 更新值 b
                - 当且仅当 v == a时,v == b,否则,将不做任何的操作
2. CAS算法
    - 模拟
    ```java
    public class JUITest {

        public static void main(String[] args) {
            CompareAndSwap a = new CompareAndSwap();
            for (int i = 0; i < 10; i++) {
                new Thread(()-> {
                    boolean b = a.compareAndSet(a.get(), (int) Math.random() * 101);
                    System.out.println(b);

                }).start();
            }
        }
    }

    class CompareAndSwap {
        private int value;
        // 获取内存值
        public synchronized int get() {
            return value;
        }

        // 比较
        public synchronized  int compareAndSwap(int expecteValue,int newValue) {
            int oldValue  = value;
            // 预估值是否等于旧值
            if (oldValue == expecteValue) {
                this.value = newValue;
            }
            return oldValue;
        }
        // 设置
        public synchronized  boolean compareAndSet(int expecteValue,int newValue) {
            // 判断预估值是否等于旧值
            return expecteValue == compareAndSwap(expecteValue,newValue);
        }
    }
    ```