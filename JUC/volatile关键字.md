1. 内存可见性问题
- 当多个线程操作共享数据时,彼此不可见
```java
/**
 * 可以使用sync解决
 */
public class JUITest {

    public static void main(String[] args) {
        ThreadDemo td = new ThreadDemo();
        new Thread(td).start();
        while (true) {
            if (td.isFlag()) {
                System.out.println("-------------");
                break;
            }
        }
    }
}

class ThreadDemo implements Runnable {
    private boolean flag = false;

    public void run() {
        try {
            Thread.sleep(2000);
            flag = true;
            System.out.println(flag);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public boolean isFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }
}

```
2. volatile关键字
- 当多个线程进行操作共享数据时,可以保证内存中的数据可见
- 相较于synchronzed是一种较为轻量级的同步策略
- volatile 不具备"互斥性"
- volatile 不能保证变量的"原子性"