



# 简介
I: InputStream: 输入流
O: OutPutStream: 输出流

# 什么是输入流、输出流?
输入流: 将持久化层面(硬盘)的数据读入内存当中
输出流：将内存中的数据存入持久化层面(硬盘)

# File类
1. 所在包:java.io.File
2. 简介:
    + 文件和文件目录路径的抽象表示形式,与平台无关
    + File能新建、删除、重命名文件和目录,但File不能访问文件内容。如果需要访问内容,则需要使用输入、输出流。
    + 想要在Java程序中表示一个真实存在的文件或目录,那么必须有一个File对象,但是Java程序中的一个File对象,可能没有一个真实存在的文件或目录。
    + File对象可以作为参数传递给流的构造器

3. File使用
    + 构造器
    ```java
    /**
      * 以pathname为路径创建File对象,可以是绝对路径或者相对路径
      * 如果是相对路径,则默认当前的路径在系统属性user.dir中存储
      */
    public File(String pathname) {
      
    }

    /**
      * 以parent为父路径,child为子路径创建File对象
      */

    public File(String parent, String child) {

    }

    /**
      * 根据一个父File对象和子文件路径创建File对象
      */
    public File(File parent, String child) {

    } 
    public File(URI uri) {

    }
    ```
    + 使用示例
    ```java
    @Test
	public void test02() {
		File file1 = new File("hello.txt"); // 相对路径
        File file2 = new File("D:\\123.txt"); // 绝对路径
        File file3= new File("D:" + File.separator +"123.txt"); // 绝对路径,解决不同操作系统下"\"不一致的问题
	}
    ```
    + 概念
        - 相对路径:相较于某个路径下
        - 绝对路径:包含盘符在内的文件或文件目录的路径
        - 路径分隔符: 
            - windows: \\
            - unix: /
    + 常用方法
    ```java
    public String getAbsolutePath(); // 获取绝对路径
    public String Path(); // 获取路径
    public String getName(); // 获取名称
    public String getParent(); // 获取上层文件目录路径
    public long length(); // 获取文件长度(字节数)
    public long lastModified(); // 获取最后一次的修改时间,毫秒值
    public String[] list(); // 获取指定目录下的所有文件或者文件目录的名称数组
    public File[] listFiles(); // 获取指定目录下所有文件或者文件目录的File数组
    public boolean renameTo(File dest); // 把文件重命名为指定的文件路径
    public boolean isDirectory(); // 判断是否为目录
    public boolean isFile(); // 判断是否为文件
    public boolean exists(); // 判断是否存在
    public boolean canRead(); // 判断是否可读
    public boolean canWrite(); // 判断是否可写
    public boolean isHidden(); // 判断是否隐藏
    public boolean createNewFile(); // 创建文件。若文件存在,则不创建,返回false
    public boolean mkdir(); // 创建文件目录。如果此文件目录存在,则不创建
    public boolean mkdirs(); // 创建文件目录。如果上层文件不存在直接创建上层
    public boolean delete(); // 删除文件或者文件夹

    ```

# IO流原理及流的分类
1. JavaIO原理:
    - I/O是Input/Output的缩写,I/O技术是非常实用的技术,用于处理设备之间的数据传输。如读/写文件,网络通讯等。
    - Java程序中,对于数据的输入/输出操作以"流(stream)"的方式进行。
    - Java.IO包下提供了各种"流"类和接口,用以获取不同种类的数据,并通过标准的方法输入或输出数据。
2. 分类:
    - 操作数据的单位: 字节流(8bit),字符流(16bit)
    - 流向: 输入流,输出流
    - 角色: 节点流,处理流

    |分类|字节输入流|字节输出流|字符输入流|字符输出流|
    |:-:|:-:|:-:|:-:|:-:|
    |抽象基类|InputStream|OutPutStream|Reader|Writer|
    |访问文件|FileInputStream|FileOutputStream|FileReader|FileWriter|
    |访问数组|ByteArrayInputStream|ByteArrayOutputStream|CharArrayReader|CharArrayWriter|
    |访问管道|PipedInputStream|PipedOutputStream|PipedReader|PipedWriter|
    |访问字符串|||StringReader|StringWriter|
    |缓冲流|BufferedInputStream|BufferedOutputStream|BufferedReader|BufferedWriter|
    |转换流|||InputStreamReader|OutputStreamWriter|
    |对象流|ObjectInputStream|ObjectOutputStream|||
    ||FilterInputStream|FilterOutputStream|FilterReader|FilterWriter|
    |打印流||PrintStream||PrintWriter|
    |推回输入流|PushbackInputStream||PushbackReader||
    |特殊流|DataInputStream|DataOutputStream|||

# 节点流(文件流)
1. 字符流读入
- 使用示例
```java
    @Test
	public void test02() {
		FileReader reader = null;
		// 1. 实例化File对象,指明要操作的文件
		File file1 = new File("hello.txt"); // 相对路径
		try {
			if (!file1.exists()) {
				file1.createNewFile();
			}
			// 2.提供具体的流
			reader = new FileReader(file1);

			// 3.数据的读入
			int data;
			// while (read != -1) {
			// System.out.println((char)read);
			// read = reader.read();
			// }
			while ((data = reader.read()) != -1) {
				System.out.print((char) data);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			// 4.关闭流
			try {
               if (reader != null) {
					reader.close();
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

	}
```
```java
  /**
     * 对read()操作升级,使用read的重载方法
     * 参数read(char[]),一次性读取多少字符
     */
    @Test
    public void test03(){
        // 1. File类的实例化
        File file = new File("hello.txt");
        FileReader fileReader= null;
        try {
            if (!file.exists()) {
                file.createNewFile();
            }
            // 2. FileReader流的实例化
                fileReader = new FileReader(file);
            // 3. 读入的操作
            char[] buff = new char[5];
            int len = 0 ;
            // 方式一:
            while((len = fileReader.read(buff))!= -1){
                for (int i = 0; i < len; i++) {
                    System.out.print(buff[i]);
                }
            }
            // 方式二：
//            while((len = fileReader.read(buff))!= -1) {
//                System.out.print(new String(buff,0,len));
//            }

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (fileReader !=null) {
                try {
                    fileReader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

```
**注意事项**
- read():返回读入的一个字符。如果达到文件末尾,返回-1
- 异常的处理:为了保证流资源一定可以执行关闭操作。需要使用try-catch-finally
- 读入的文件一定要存在,否则就会报FileNotFoundException

2. 字符流写出
- 使用示例
```java
    @Test
    public void test03(){
        // 1. File类的实例化
        File file = new File("hello.txt");
        // 2. 提供FileWriter的对象,用于数据的写出
        FileWriter writer = null;
        try {

            writer = new FileWriter(file,true);
            writer.write("我是第一句话\n");
            writer.write("我是第二句话");
            writer.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
```
**注意事项**
- 输出操作,对应的File可以不存在。
  - 如果不存在,在输出的过程中,会自动创建此文件
  - 如果存在：
    - 如果流使用的构造器是: FileWriter(file,false) / FileWriter(file)会对原有的文件覆盖
    - 如果流使用的构造器是:FileWriter(file,true)则不会对原有文件覆盖,而是在原有文件基础上追加内容

3. 字符流读取写入操作
```java
    @Test
    public void test03() {
        // 1. 创建File类对象,指明读入和写出的文件
        File srcFile = new File("hello.txt");
        File destFile = new File("hello1.txt");
        // 2. 创建输入流和输出流的对象
        FileReader fr = null;
        FileWriter fw = null;
        try {
            fr = new FileReader(srcFile);
            fw = new FileWriter(destFile);
            // 3. 数据的读入和写出操作
            char[] buff = new char[5];
            int len;
            while ((len = fr.read(buff)) != -1) {
                // 每次写0-len个字符
                fw.write(buff,0,len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (fr != null) {
                    fr.close();
                }
                if (fw != null) {
                    fw.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

```
**注意:** 上述操作属于字符流，无法复制二进制字节流的图片操作
4. 字节流读取
```java
    @Test
	public void test02() {
		// 1. 实例化File对象,指明要操作的文件
		File file = new File("hello.txt");
		// 2.提供具体的流
		FileInputStream fileInputStream = null;
		try {
			fileInputStream = new FileInputStream(file);
			// 3.数据的读入
			byte[] buff = new byte[5];
			int len;
			while((len = fileInputStream.read(buff)) != -1) {
				System.out.println(new String(buff,0,len));
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			// 4.关闭流
			if (fileInputStream != null) {
				try {
					fileInputStream.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
			}
		}
    }
```
5. 字节流写出
```java
    @Test
	public void test02() {
		// 1. 实例化File对象,指明要操作的文件
		File file = new File("hello.txt");
		// 2.提供具体的流
		FileOutputStream fileOutputStream = null;
		try {
			fileOutputStream = new FileOutputStream(file);
			// 3.数据的写入
			byte[] a = {'c'};
			fileOutputStream.write(a);
			fileOutputStream.flush();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			// 4.关闭流
			if (fileOutputStream != null) {
				try {
					fileOutputStream.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
			}
		}
    }
```
6. 字节流实现复制图片
```java
    @Test
	public void test02() {
		// 1. 实例化File对象,指明要操作的文件
		File srcFile = new File("1.jpg");
		File descFile = new File("2.jpg");
		// 2.提供具体的流
		FileInputStream fileInputStream = null;
		FileOutputStream fileOutputStream = null;
		try {
			fileInputStream = new FileInputStream(srcFile);
			fileOutputStream = new FileOutputStream(descFile);

			// 3.数据的读取与写入
			byte[] buff = new byte[1024];
			int len;
			while((len = fileInputStream.read(buff)) != -1) {
				fileOutputStream.write(buff, 0, len);	
			}
			fileOutputStream.flush();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			// 4.关闭流
			if (fileOutputStream != null) {
				try {
					fileOutputStream.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}
			if (fileInputStream != null) {
				try {
					fileInputStream.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
	}

```

***注意:***
- 对于文本文件(.txt,.java,.c,.cpp),使用字符流处理.
- 对于非文本文件,使用字节流处理
7. 字节流实现文件复制
```java
    @Test
	public void test02() {
		long start = System.currentTimeMillis();
		copyFileTodestPath("C:\\Users\\Administrator\\Desktop\\4.微服务简介-微服务解决复杂问题.mp4","C:\\\\Users\\\\Administrator\\\\Desktop\\\\5.微服务简介-微服务解决复杂问题.mp4");
		long end = System.currentTimeMillis();
		System.out.println("耗时:" + (end - start));
	}

	/**
	 * 文件复制
	 * 
	 * @param srcPath  源文件路径
	 * @param destPath 目标路径
	 */
	public void copyFileTodestPath(String srcPath, String destPath) {
		// 1. 实例化File对象,指明要操作的文件
		File srcFile = new File(srcPath);
		File descFile = new File(destPath);
		// 2.提供具体的流
		FileInputStream fileInputStream = null;
		FileOutputStream fileOutputStream = null;
		try {
			fileInputStream = new FileInputStream(srcFile);
			fileOutputStream = new FileOutputStream(descFile);

			// 3.数据的读取与写入
			byte[] buff = new byte[1024];
			int len;
			while ((len = fileInputStream.read(buff)) != -1) {
				fileOutputStream.write(buff, 0, len);
			}
			fileOutputStream.flush();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			// 4.关闭流
			if (fileOutputStream != null) {
				try {
					fileOutputStream.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}
			if (fileInputStream != null) {
				try {
					fileInputStream.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
	}
```
**注意:** 如果只是对于文本的复制,那么可以使用字节流(在不读的情况下),但对于字符流来说非文本是不能进行复制
# 缓冲流
> 缓冲字节流
1. 使用示例

```java
    /**
	 * 缓冲流实现图片复制
	 */
    @Test
	public void test03() {
        // 源文件
		File srcFile = new File("1.jpg");
        // 目标文件
		File destFile = new File("2.jpg");
        // 字节流
		FileInputStream fInputStream = null;
		FileOutputStream fOutputStream = null;
        // 缓冲流
		BufferedInputStream inputStream = null;
		BufferedOutputStream outputStream = null;
		try {
			fInputStream = new FileInputStream(srcFile);
			fOutputStream = new FileOutputStream(destFile);
			inputStream = new BufferedInputStream(fInputStream);
			outputStream = new BufferedOutputStream(fOutputStream);
			byte[] buff = new byte[1024];
			int len;
			while ((len = inputStream.read(buff)) != -1) {
				outputStream.write(buff, 0, len);
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (outputStream != null) {
					outputStream.close();
				}
				if (inputStream != null) {
					inputStream.close();
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
```
**注意:** 关闭流时先关外层流,内层流会随着外层流的关闭而关闭,不需要再写代码关闭

2. 缓冲流实现文件复制的方法
```java
	/**
	 * 缓冲流实现文件复制
	 */
	@Test
	public void test03() {
		copyFileTodest("1.jpg","E:/2.jpg");
	}
	
	public void copyFileTodest(String srcPath,String destPath) {
		File srcFile = new File(srcPath);
		File destFile = new File(destPath);
		FileInputStream fInputStream = null;
		FileOutputStream fOutputStream = null;
		BufferedInputStream inputStream = null;
		BufferedOutputStream outputStream = null;
		try {
			fInputStream = new FileInputStream(srcFile);
			fOutputStream = new FileOutputStream(destFile);
			inputStream = new BufferedInputStream(fInputStream);
			outputStream = new BufferedOutputStream(fOutputStream);
			byte[] buff = new byte[1024];
			int len;
			while ((len = inputStream.read(buff)) != -1) {
				outputStream.write(buff, 0, len);
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (outputStream != null) {
					outputStream.close();
				}
				if (inputStream != null) {
					inputStream.close();
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
```

3. 优势
    - 提升读取、写入的速度
        - 内部提供了一个缓冲区来加速
        private static int DEFAULT_BUFFER_SIZE = 8192;
> 缓冲字符流

缓冲字符流的使用可参考缓冲字节流的方法
```java
   @Test
    public void test03() {
        // 1. 创建File类对象,指明读入和写出的文件
        File srcFile = new File("hello.txt");
        File destFile = new File("hello1.txt");
        // 2. 创建字符处理流
        BufferedReader bufferedReader = null;
        BufferedWriter bufferedWriter = null;
        try {
            bufferedReader = new BufferedReader(new FileReader(srcFile));
            bufferedWriter = new BufferedWriter(new FileWriter(destFile));
            char[] buff = new char[1024];
            int len;
            // 方式一
//            while ((len = bufferedReader.read(buff)) != -1) {
//                bufferedWriter.write(buff, 0, len);
//            }
            // 方式二
            String data;
            // 3. 读写操作
            while((data = bufferedReader.readLine()) != null) {
                bufferedWriter.write(data); // 不包含换行符
                bufferedWriter.newLine(); // 提供换行的操作
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 4. 关闭操作
            try {
                if (bufferedReader != null) {
                    bufferedReader.close();
                }
                if (bufferedWriter != null) {
                    bufferedWriter.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
```
使用缓冲流进行文件加密(简易版)
```java
  /**
     * 对文件进行加密、解密
     */
    public void encrytion (String srcFilePath,String toFilePath) {
        // 1. 创建File类对象,指明读入和写出的文件
        File srcFile = new File(srcFilePath);
        File destFile = new File(toFilePath);
        // 3. 创建字符处理流
        BufferedInputStream bufferedInputStream = null;
        BufferedOutputStream bufferedOutputStream = null;
        try {
            bufferedInputStream = new BufferedInputStream(new FileInputStream(srcFile));
            bufferedOutputStream = new BufferedOutputStream(new FileOutputStream(destFile));
            byte[] buff = new byte[1024];
            int len;
            while ((len = bufferedInputStream.read(buff)) != -1) {
                for (int i = 0; i < buff.length; i++) {
                    buff[i] = (byte) (buff[i] ^ 5);
                }
                bufferedOutputStream.write(buff, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 4. 关闭操作
            try {
                if (bufferedInputStream != null) {
                    bufferedInputStream.close();
                }
                if (bufferedOutputStream != null) {
                    bufferedOutputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
```

# 转换流
1. 简介：提供在字节流和字符流之间的转换
2. 成员
	- InputStreamReader
        - 将一个字节的输入流转换为字符的输入流
	- OutputStreamWriter
        - 建一个字符的输出流转换为字节的输出流
3. 补充: 
    - 编码:字节转字节数组----> 字符数组、字符串
    - 编码:字符数组、字符串----> 字节、字节数组
4. 字符集
    - ACSII:美国标准信息交换码
    - ISO8859-1:拉丁码表,欧洲码表
    - GB2312:中国的中文编码表,最多两个字节编码所有字符
    - GBK:中国的中文编码表升级,融合了更多的中文文字符号。最多两个字节编码
    - Unicode: 国际标准码,融合了目前人类使用的所有字符,为每个字符分配唯一的字符码,所有的文字都用两个字节来表示
    - UTF-8: 万国码,可用1-4个字节来表示一个字符
5. 字节流中的数据都是字符时,转成字符流操作更高效
6. 使用示例:
 - 将字节输入流转换为字符输入的转换
 ```java
 
    /**
     * 将字节输入流转换为字符输入的转换
     */
    @Test
    public void test03() {
        FileInputStream fis = null;
        InputStreamReader isr = null;
        try {
            // 申明文本字节流
            fis = new FileInputStream("hello.txt");
            // 使用默认字符集(根据编辑器的编码决定,也可以自己设置)
            // 将字节输入流转换为字符输入流
            isr = new InputStreamReader(fis);
            char[] buff = new char[20];
            int len;
            while((len = isr.read(buff)) != -1){
                System.out.println(new String(buff, 0, len)); // 我是第一句话我是第二句话
            }
            // 使用自定义字符集,具体使用哪个字符集,取决于保存文件使用过的字符集
            //  isr = new InputStreamReader(fis, "UTF-8");
        }  catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (isr != null) {
                try {
                    isr.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
 ```
 - 综合使用
 ```java
    /**
     * 使用InputStreamReader和 OutputStreamWriter实现转码 ---> 将UTF-8 转为 GBK
     */
    @Test
    public void test03() {
        File file1 = new File("hello.txt");
        File file2 = new File("hello_test.txt");
        FileInputStream fis = null;
        FileOutputStream fos = null;
        InputStreamReader isr = null;
        OutputStreamWriter osw = null;
        try {
            fis = new FileInputStream(file1);
            fos = new FileOutputStream(file2);
            isr = new InputStreamReader(fis, "UTF-8");
            osw = new OutputStreamWriter(fos, "GBK");
            char[] buff = new char[1024];
            int len;
            while ((len = isr.read(buff)) != -1) {
                osw.write(buff, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (isr != null) {
                    isr.close();
                }
                if (osw != null) {
                    osw.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }
 ```
# 标准输入、输出流
简介:
- System.in和System.out分别代表了系统标准的输入和输出设备
- 默认输入设备是:键盘,输出设备是:显示器
- System.in的类型是InputStream
- System.out的类型是PrintStream,其是OutputStream的子类,FilterOutputStream的子类
- 重定向:通过System类的setIn,setOut方法对默认设备进行改变
    - public static void setIn(InputStream in)
    - public static void setOut(PrintSteam out)
# 打印流
1. 简介:
- 实现基本数据类型的数据格式转化为字符串输出
2. 主要成员:
    - 打印流: PirintStream和PrintWriter
        - 提供了一系列重载的print()和println(),用于多种数据类型的输出
        - PrintStream和PrintWriter的输出不会抛出IOException异常
        - PrintStream和PrintWriter有自动flush功能
        - PrintStream打印的所有字符都使用平台的默认字符编码转换为字节。在需要写入字符而不是写入字节的情况下,应该使用PrintWriter类
        - System.out返回的是PrintStream的实例
# 数据流
1. 简介:用于读取或写出基本数据类型的变量或字符串
2. 主要成员:
    - DataInputStream和DataOutputStream
# 对象流
1. 简介:
    - 用于存储和读取基本数据类型数据或对象的处理流。
2. 主要成员
    - ObjectInputStream和ObjectOutputStream
3. 序列化
    - 将Java对象转换成与平台无关的二进制流,转换过后可持久化,也可以通过网络进行传输
    - 用ObjectOutputStream类保存基本数据类型的数据或对象的机制
    ```java
    /**
     * 使用ObjectOutputStream实现序列化
     */
    @Test
    public void test02() {
        ObjectOutputStream objectOutputStream = null;
        try {
            objectOutputStream = new ObjectOutputStream(new FileOutputStream("String.dat"));
            objectOutputStream.writeObject(new String("序列化")); // 这里为了方便所以采用String对象,也可以使用自定义对象,但此自定义对象要求实现Serializable接口,并提供serialVersionUID,对象当中的属性也必须实现Serializable接口,并提供serialVersionUID
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (objectOutputStream != null) {
                try {
                    objectOutputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    ```
    - 补充(serialVersionUID):
        - 一般为 static final long serialVersionUID
        - serialVersionUID用来表名类的不同版本间的兼容性
        - 如没有显式的声明那么Java将根据运行时环境以及类的内部细节来自动生成。若类的实例做了修改,serialVersionUID可能发生变化,建议显式声明。
        - Java通过serialVersionUID判断类的版本是否一致,如果相同则可以进行反序列化,否则就会出现序列化版本不一致的异常

4. 反序列化
    - 将二进制流转换为Java对象
    - 用ObjectInputStream类读取基本数据类型的数据或对象的机制
    ```java
    /**
     * 使用ObjectInputStream进行反序列化
     */
    @Test
    public void test03() {
        ObjectInputStream objectInputStream = null;
        try {
            objectInputStream = new ObjectInputStream(new FileInputStream("String.dat"));
            String readObject = (String) objectInputStream.readObject();
            System.out.println(readObject);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        } finally {
            try {
                if (objectInputStream != null) {
                    objectInputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    ```

5. 注意事项
    - 不能够序列化static和transient修饰的成员变量
# 随机存取文件流
- 主要成员:RandomAccessFile
- 由于实现了DataInput、DataOutput两个接口,所以此类既可以输入也可以输出,父类为Object
```java
  /**
     * RandomAccessFile：
     * mode: 表示以何种访问模式
     * r: 只读
     * rw: 读写(数据不会立即写入硬盘) 异常则会丢失全部数据
     * rwd: 读取、内容更新(数据会被立即写入硬盘) 异常只会丢失未被写入硬盘的数据
     * rws：读取、写入、内容以及元数据的更新
     *
     * 如果RandomAccessFile作为输出流时,写出到的文件如果不存在,则在执行过程中自动创建
     * 如果写出到的文件存在,则会对原有文件内容进行覆盖.(默认情况下，从头覆盖)
     * 可通过RandomAccessFile.seek(long pos)指定从什么位置开始覆盖
     * 也可通过可通过RandomAccessFile.getFilePointer()得到当前指针位置
     */
    @Test
    public void test02() {
        RandomAccessFile randomAccessFile1 = null;
        RandomAccessFile randomAccessFile2 = null;
        try {
            // 也可调用(File file,String mode)构造方法
            randomAccessFile1 = new RandomAccessFile("hello.txt", "r");
            randomAccessFile2 = new RandomAccessFile("hello1.txt", "rw");
            byte[] buff = new byte[1024];
            int len;
            while ((len = randomAccessFile1.read(buff)) != -1) {
                randomAccessFile2.write(buff, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (randomAccessFile1 != null) {
                    randomAccessFile1.close();
                }
                if (randomAccessFile2 != null) {
                    randomAccessFile2.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
```
- 扩展RandomAccessFile实现多线程下载。思路将文件大小划分为N块,交由N个线程去执行下载操作,RandomAccessFile记录每个线程从哪个位置到那个位置。
- 特别之处:
    - 支持任意位置的访问
# NIO
- 简述:

    - JAVA NIO(New IO)是从java1.4版本开始引入的一套新的IO API,可以替代标准的Java IO API。NIO与原来的IO有同样的作用和目的,但是使用的方式完全不同,NIO支持面向缓冲区(IO面向流)、基于通道的IO操作。NIO以更加高效的方式进行文件的读写操作。
    - Java API中提供了两套NIO,一套针对标准输入输出,一套是网络编程NIO
    - java.nio.channels.Channel
        - FileChannel:处理本地文件
        - SocketChannel:TCP网络编程客户端的Channel
        - ServerSocketChannel:TCP网络编程的吴福气端的Channel
        - DatagramChannel:UDP网络编程中发送端和接收端的Channel

- jdk7当中的NIO.2
    - 早起的Java只提供了一个File类来访问文件系统,但File类的功能比较有限,所提供的方法性能也不高。大多数的方法在出错时仅返回失败,并不会提供异常信息。
    - NIO.2引入了Path接口,代表一个平台无关的平台路径描述目录结构中文件的位置。Path是File类的升级版本,实际引用的资源可以不存在。
    - 实例代码
    ```java
        @Test
        public void test02() {
            File file = new File("hello.txt"); // IO 操作
            Path path = Paths.get("hello.txt"); // java7 NIO.2
        }
    ```
    - NIO.2提供了Files、Paths工具类,Files包含了大量静态的工具方法来操作文件:Paths则包含了两个返回Path的静态工厂方法。
    ```java
    public static Path get(String first, String... more) {
        return Path.of(first, more);
    }
    public static Path get(URI uri) {
        return Path.of(uri);
    }
    ```
    - Path常用方法
    ```java
      String toString(); // 返回调用Path对象的字符串表示形式
     startsWith(String other); // 判断是否以other路径开始
     boolean endsWith(String other); // 判断是否以other路径结束
     boolean isAbsolute(); // 是否是绝对路径
     Path getParent();  // 返回Path对象,包含整个路径,不包含Path对象指定的文件路径
     Path getRoot(); // 返回调用Path对象的根路径
     Path getFileName(); // 返回与调用Path对象关联的文件名
     int getNameCount(); // 返回Path根目录后面元素的数量
     Path getName(int index); // 返回指定索引位置index的路径名称
     Path toAbsolutePath(); // 作为绝对路径返回调用Path对象
     Path resolve(Path other); // 合并两个路径,返回合并后的路径对应的Path对象
     File toFile(); // 将Path转化为File类的对象
    ```
    - Files常用方法
    ```java
     public static Path copy(Path source, Path target, CopyOption... options); // 文件的复制
     Path createDirectories(Path dir, FileAttribute<?>... attrs); // 创建一个目录
     Path createFile(Path path, FileAttribute<?>... attrs); // 创建一个文件
     void delete(Path path); // 删除一个文件或目录,如果不存在,执行报错
     boolean deleteIfExists(Path path); // Path对应的文件/目录如果存在,执行删除
     Path move(Path source, Path target, CopyOption... options); // 将source移动到target位置
     long size(Path path); // 返回path指定文件的大小
     exists(Path path, LinkOption... options); // 判断文件是否存在
     isDirectory(Path path, LinkOption... options); // 判断是否为目录
     boolean isRegularFile(Path path, LinkOption... options); // 判断是否为文件
     boolean isHidden(Path path); // 判断是否隐藏文件
     boolean isReadable(Path path); // 判断是否可读
     boolean isWritable(Path path); // 判断是否可写
     boolean notExists(Path path, LinkOption... options); // 判断文件是否不存在
     SeekableByteChannel newByteChannel(Path path, OpenOption... options); // 获取与指定文件的连接,options指定打开方式
     DirectoryStream<Path> newDirectoryStream(Path dir); // 打开path指定的目录
     InputStream newInputStream(Path path, OpenOption... options); // 获取InputStream对象
     OutputStream newOutputStream(Path path, OpenOption... options); // 获取OutputStream对象

    ```
