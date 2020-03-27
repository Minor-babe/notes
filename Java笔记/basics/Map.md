# Map
特点:
1. 双列数据,储存key-value对的数据

2. key不可重复,使用Set储存所有的key

3. value无序的、可重复,使用Collection储存所有的value

4. 底层使用Entry对象存储key-value,Entry也是无序的、不可重复的

## HashMap

特点: 
1. Map主要实现类
2. 线程不安全,效率高
3. 可以储存null的key与value
4. 底层:
    - 数组+链表 jdk7
    - 数组+链表+红黑树 jdk8
5. key要求所在的类要重写equals()和hashCode(),value所在类要重写equals()

> 主要方法:
```java
    V put(K key, V value); // 将指定key-value 添加到(或修改)当前map对象中
    void putAll(Map<? extends K, ? extends V> m); // 将m中所有的key-value对,并返回value
    V remove(Object key); // 删除指定key的key-value对,并返回value
    void clear(); // 清空当前map中的所有数据
    V get(Object key); // 获取指定key对应的value
    boolean containsKey(Object key); // 是否包含指定的key
    boolean containsValue(Object value); // 是否包含指定的value
    Set<K> keySet(); // 返回所有key构成的Set集合
    Collection<V> values(); // 返回所有value构成的 Collection集合
    Set<Map.Entry<K, V>> entrySet(); // 返回所有key-value对构成的Set集合
```


面试题:
1. HashMap的底层实现原理
- jdk7:
    + 在实例化以后,底层创建了长度是16的一维数组Entry[] table
    + 调用key1所在类的hashCode方法计算key1哈希值,此哈希值经过某种算法计算以后,得到Entry数组中的存放位置
       
        - 如果此位置上的数据为空,此时的key1-value1添加成功
        - 如果此位置上的数据不为空(此位置存在一个或多个数据(以链表形式存在)),比较key1和已经存在的一个或多个的哈希值:
            - 如果key1的哈希值与已经存在的哈希值都不相同,此时key1-value1添加成功
            - 如果keu1的哈希值和已经存在的某一个数据的哈希值相同,继续比较：
                - 调用key1所在类的equals()方法,比较:
                    - 如果equals返回false:则添加成功
                    - 如果equals返回true:使用value1替换相同key的value值
    + 如超出临界值(且存放的位置为空时)默认扩容为原来的2倍,并将原有的数据复制
```java
    HashMap map = new HashMap();
    map.put(key1,value1);
```
- jdk8:
    
    不同:
    1. new HashMap():底层没有创建一个长度为16的数组
    2. 底层的数组是: Node[],而非Entry[]
    3. 首次调用put()方法,底层创建长度为16的数组
    4. jdk7底层结构只有:数组+链表。jdk8中底层结构:数组+链表+红黑树
        - 当数组的某一个索引位置上的元素以链表形式存在的数据个数 > 8 且当前数组的长度>64时,此时此索引位置上的所有数据改为使用红黑树存储

源码分析:

HashMap源码中的重要常量:

|名称|含义|
| :-: | :-: |
|DEFAULT_INITIAL_CAPACITY |HashMap的默认容量,16|
|MAXIMUM_CAPACITY |HashMap的最大支持容量,2^30|
|DEFAULT_LOAD_FACTOR |HashMap的默认加载因子,0.75|
|TREEIFY_THRESHOLD |Bucket中链表长度大于该默认值,转换为红黑树|
|UNTREEIFY_THRESHOLD |Bucket中红黑树储存的Node小于该默认值,转化为链表|
|MIN_TREEIFY_CAPACITY |桶中的Node被树化时最小的hash表容量:64(当桶中Node的数量大到需要变红黑树时,若hash表容量小于MIN_TREEIFY_CAPACITY时,此时应执行resize扩容操作这个MIN_TREEIFY_CAPACITY的值至少是TREEIFY_THRESHOLD的4倍。)|
|table |存储元素的数组,总是2的n次幂|
|entrySet |存储具体元素的集|
|size |HashMap中存储的键值对的数量|
|modCount |HashMap扩容和结构改变的次数|
|threshold |扩容的临界值,=容量 * 填充因子:16 * 0.75|
|loadFactor |填充因子|

jdk7: 
```java
 /**
   * The default initial capacity - MUST be a power of two.
   */
 static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; // aka 16

 /**
   * The load factor used when none specified in constructor.
   */
 static final float DEFAULT_LOAD_FACTOR = 0.75f;
 /**
   * The maximum capacity, used if a higher value is implicitly specified
   * by either of the constructors with arguments.
   * MUST be a power of two <= 1<<30.
   */
 static final int MAXIMUM_CAPACITY = 1 << 30;
 /**
   * The next size value at which to resize (capacity * load factor).
   * @serial
   */
 // If table == EMPTY_TABLE then this is the initial capacity at which the
 // table will be created when inflated.
 int threshold;

 /**
   * The table, resized as necessary. Length MUST Always be a power of two.
   */
 transient Entry<K,V>[] table = (Entry<K,V>[]) EMPTY_TABLE;
 public HashMap() {
        this(DEFAULT_INITIAL_CAPACITY, DEFAULT_LOAD_FACTOR);
 }

 public HashMap(int initialCapacity, float loadFactor) {
        if (initialCapacity < 0)
            throw new IllegalArgumentException("Illegal initial capacity: " +
                                               initialCapacity);
        if (initialCapacity > MAXIMUM_CAPACITY)
            initialCapacity = MAXIMUM_CAPACITY;
        if (loadFactor <= 0 || Float.isNaN(loadFactor))
            throw new IllegalArgumentException("Illegal load factor: " +
                                               loadFactor);
        int capacity = 1;
        while (capacity < initialCapacity)
            capacity <<= 1;

        this.loadFactor = loadFactor;
        threshold = (int)Math.min(capacity * loadFactor,MAXIMUM_CAPACITY + 1);
        table = new Entry[capacity];
        useAltHashing = sun.misc.VM.isBooted() && (capacity >= Holder.ALTERNATIVE_HASHING_THRESHOLD);
        init();

 }

 public V put(K key,V value) {
     if (key == null) 
         return putForNullkey(value);
     int hash = hash(key);
     int i = indexFor(hash,table.length);
     for(Entry[K,V] e = table[i];e != null; e = e.next){
         Object k;
         if (e.hash == hash && ((k = e.key) == key || key.equals(k))) {
             V oldValue = e.value;
             e.value = value;
             e.recordAccess(this);
             return oldValue;
         }
     }
     modCount++;
     addEntry(hash,key,value,i);
     return null;
 }

```

jdk8:
```java

public HashMap() {
    this.loadFactor = DEFAULT_LOAD_FACTOR;
}

public V put(K key,V value){
    return putVal(hash(key),key,value,false,true);
}

static final int hash (Object key) {
    int h ;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16)
}
```

2. HashMap和Hashtable的异同

3. CurrentHashMap与Hashtable的异同

### LinkedHasMap
特点:
1. 在遍历Map元素时,可以按照添加的顺序实现遍历
    - 在原有的HashMap底层结构基础上,添加了一对指针,指向前一个与后一个

2. 对于频繁的遍历操作,此类执行效率高于HashMap

## TreeMap
特点:
1. 按照添加的key-value对进行排序
2. 按照key进行自然排序或定制排序
3. 底层使用红黑树

## HashTable
特点:
1. 线程安全的,效率低
2. 不能储存null的key和value

### Properties
特点:
1. 常用于处理配置文件
2. key和value都是String类型