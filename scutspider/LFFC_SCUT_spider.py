import requests
import execjs
import json
import math
from bs4 import BeautifulSoup


class XSJWSpider(object):
    # 初始化数据
    def __init__(self):
        self.post_url = 'https://sso.scut.edu.cn/cas/login?service=http%3A%2F%2Fxsjw2018.jw.scut.edu.cn%2Fsso%2Fdriotlogin'
        self.get_url = 'http://xsjw2018.jw.scut.edu.cn/jwglxt/cdjy/cdjy_cxKxcdlb.html?doType=query&gnmkdm=N2155'
        self.session = requests.session()
        # self.login_in_cookie = self.session.cookies  # 统一验证cookie
        self.xsjw_cookie = self.session.cookies
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 Edg/91.0.864.37',
        }
        self.post_data = {}

    # 登陆并获取cookie
    def get_cookie(self):
        get_1 = self.session.get(url=self.post_url, headers=self.headers)
        lt = BeautifulSoup(get_1.text, 'html.parser').select('#lt')[0].attrs['value']
        print("请输入统一认证账号、密码（回车隔开）：")
        username = input()  # 测试用
        password = input()  # 测试用
        data = username + password + lt
        des = (open("des.js", 'r', encoding='UTF-8'))
        rsa = execjs.compile(des.read()).call('strEnc', data, '1', '2', '3')
        form_data = {
            "rsa": rsa,
            "ul": str(len(username)),
            "pl": str(len(password)),
            "lt": lt,
            "execution": "e2s1",
            "_eventId": "submit",
        }
        self.session.post(url=self.post_url, data=form_data, headers=self.headers, cookies=self.session.cookies)
        login_in = self.session.post(url=self.post_url, data=form_data, headers=self.headers,
                                     cookies=self.session.cookies)
        # self.login_in_cookie = self.session.cookies  # 统一验证cookie
        self.xsjw_cookie = login_in.history[1].cookies

    # 获取搜索表单数据
    def get_search_data(self):
        xqh_id = {
            1: "1",
            2: "2",
            3: "872BEDC0397FABB8E05399C226CAC32F"
        }
        jcd = {
            1: "3",
            2: "12",
            3: "48",
            4: "192",
            5: "1792"
        }
        print("请输入校区号（1-3）、周次（1-19）、星期（1-7）、节次（1-5），回车隔开：")
        n = int(input())
        zcd = str(pow(2, int(input()) - 1))
        xqj = input()
        m = int(input())
        # n = 1  # 测试用
        # zcd = "8192"  # 测试用
        # xqj = "1"  # 测试用
        # m = 1  # 测试用
        self.post_data = {
            'fwzt': 'cx',
            'xqh_id': xqh_id[n],  # 校区  ！1 2 872BEDC0397FABB8E05399C226CAC32F
            'xnm': '2020',  # 学年  ~
            'xqm': '12',  # 学期  ~ 12 3
            'cdlb_id': '02',  # 场地类别
            'cdejlb_id': '',
            'qszws': '',
            'jszws': '',
            'cdmc': '',
            'lh': '',
            'jyfs': '0',  # 借用方式？
            'cdjylx': '',
            'zcd': zcd,  # 周次?  ！ pow(2,x-1)
            'xqj': xqj,  # 星期  ！ 1-7
            'jcd': jcd[m],  # 与节次有关  ！3 12 48 192 1792
            '_search': 'false',
            'nd': '1622266254246',  # 随机号码？
            'queryModel.showCount': '100',  # 每页显示数
            'queryModel.currentPage': '1',  # 当前页
            'queryModel.sortName': 'cdbh',
            'queryModel.sortOrder': 'asc',
            'time': '1',  # 查询次数
        }

    # 获取tid
    def get_tid(self):
        xqm_dict = {
            '12': '2',
            '3': '1'
        }
        xqh_dict = {
            '1': '1',
            '2': '2',
            '872BEDC0397FABB8E05399C226CAC32F': '3'
        }
        jcd_dict = {
            '3': '1',
            '12': '2',
            '48': '3',
            '192': '4',
            '1792': '5'
        }
        a = str(int(self.post_data['xnm']) - 2000)  # 学年相关 2
        b = xqm_dict[self.post_data['xqm']]  # 学期相关 1
        c = xqh_dict[self.post_data['xqh_id']]  # 校区相关 1
        d = str(math.log(int(self.post_data['zcd']), 2) + 1).zfill(2)  # 周数相关，保留两位 2
        e = self.post_data['xqj']  # 星期相关 1
        f = jcd_dict[self.post_data['jcd']]  # 节次相关 1
        return a + b + c + d + e + f

    # 查找程序
    def look_for_free_classrooms(self):
        # 获取数据
        xsjw = self.session.post(url=self.get_url, data=self.post_data, headers=self.headers,
                                 cookies=self.xsjw_cookie)
        data_1 = json.loads(xsjw.text)['items']
        # 整理数据
        data_2 = []
        i = 0
        while i < len(data_1):
            data_2.append(data_1[i]['cdbh'])
            i += 1
        tid = self.get_tid()
        data_final = {  # 数据格式
            'tid': tid,
            'xnm': self.post_data['xnm'],  # 学年
            'xqm': self.post_data['xqm'],  # 学期
            'zcd': self.post_data['zcd'],  # 周次
            'xqj': self.post_data['xqj'],  # 星期
            'jcd': self.post_data['jcd'],  # 节次
            'xqh_id': self.post_data['xqh_id'],  # 校区编号
            'total': len(data_2),  # 结果数
            'items': data_2  # 结果
        }
        index = open(tid + '.json', 'w')  # 测试用
        index.write(json.dumps(data_final))  # 测试用
        print(data_final)  # 测试用

    # main
    def main(self):
        self.get_cookie()
        self.get_search_data()
        self.look_for_free_classrooms()

    # 连接Mysql
    # 存储数据


if __name__ == '__main__':
    spider = XSJWSpider()
    spider.main()
