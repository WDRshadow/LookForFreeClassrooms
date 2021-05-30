# 华南理工大学空闲课室查询爬虫

#### 介绍

一个用python写的程序，利用python网络爬虫查询华南理工大学空闲课室，该软件用于获取主程序后端数据。也可以作为程序使用，或修改后可作为获取华南理工大学需要统一验证登陆后才能获取的内容（可保存统一验证登陆和教务系统的cookie）。

#### 软件架构

python爬虫


#### 安装教程

1. 安装python3.8（理论上python3以上都可以）

2. 安装外部库requests、PyExecJS、beautifulsoup4

   ```
   $ pip3 install requests
   $ pip3 install PyExecJS
   $ pip3 install beautifulsoup4
   ```

3.  下载或克隆源码

4.  利用命令行打开即可

    ```
    $ python3 ./LFFC_SCUT_spider.py
    ```

    

#### 使用说明

1. 登录到教务系统（本程序无后端，无需担心泄漏问题，实在担心你就看看代码）

2. 按提示输入校区号、周次（1-19）、星期几（1-7）、节次，每输入一个参数请回车，号码请按下面输入，请输入本学期内剩余的日期

   | 校区         | 校区号 |
   | ------------ | ------ |
   | 五山校区     | 1      |
   | 大学城校区   | 2      |
   | 广州国际校区 | 3      |

   | 节次号   | 1    | 2    | 3    | 4    | 5    |
   | -------- | ---- | ---- | ---- | ---- | ---- |
   | 对应节次 | 1-2  | 3-4  | 5-6  | 7-8  | 9-11 |

3.  数据以json格式输出到命令行及文件，因为该程序服务于LFFC（Look For Free Classrooms），所以将就着用啦。

#### 参与贡献

1. [WDRshadow]: Https://github.com/WDRshadow

2. [ChuXuan_windy]: Https://github.com/ChuXuan_windy

   
