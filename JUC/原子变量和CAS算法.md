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