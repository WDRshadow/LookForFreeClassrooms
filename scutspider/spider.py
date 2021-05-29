import requests
from bs4 import BeautifulSoup
import execjs


class XSJWSpider(object):
    # 初始化数据
    def __init__(self):
        self.post_url = 'https://sso.scut.edu.cn/cas/login?service=http%3A%2F%2Fxsjw2018.jw.scut.edu.cn%2Fsso%2Fdriotlogin'
        self.get_url = 'http://xsjw2018.jw.scut.edu.cn/jwglxt/cdjy/cdjy_cxKxcdlb.html?doType=query&gnmkdm=N2155'
        self.session = requests.session()
        self.login_in_cookie = self.session.cookies
        self.xsjw_cookie = self.session.cookies
        self.username = str(input())  # 测试用
        self.password = str(input())  # 测试用
        self.rsa = ''
        self.lt = ''
        self.form_data = {}
        self.post_data = {}
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 Edg/91.0.864.37',
        }

    # 获取登陆表单数据
    def get_data(self):
        get_1 = self.session.get(url=self.post_url, headers=self.headers)
        self.lt = BeautifulSoup(get_1.text, 'html.parser').select('#lt')[0].attrs['value']
        data = self.username + self.password + self.lt
        des = (open("des.js", 'r', encoding='UTF-8'))
        self.rsa = execjs.compile(des.read()).call('strEnc', data, '1', '2', '3')
        self.form_data = {
            "rsa": self.rsa,
            "ul": str(len(self.username)),
            "pl": str(len(self.password)),
            "lt": self.lt,
            "execution": "e2s1",
            "_eventId": "submit",
        }

    # 登陆并获取cookie
    def get_cookie(self):
        self.get_data()
        self.session.post(url=self.post_url, data=self.form_data, headers=self.headers, cookies=self.session.
                          cookies)
        login_in = self.session.post(url=self.post_url, data=self.form_data, headers=self.headers,
                                     cookies=self.session.
                                     cookies)
        self.login_in_cookie = self.session.cookies
        self.xsjw_cookie = login_in.history[1].cookies

    # 获取搜索表单数据
    def get_search_data(self):
        self.post_data = {  # 测试用
            'fwzt': 'cx',
            'xqh_id': '1',
            'xnm': '2020',
            'xqm': '12',
            'cdlb_id': '02',
            'cdejlb_id': '',
            'qszws': '',
            'jszws': '',
            'cdmc': '',
            'lh': '',
            'jyfs': '0',
            'cdjylx': '',
            'zcd': '8192',
            'xqj': '1',
            'jcd': '3',
            '_search': 'false',
            'nd': '1622266254246',
            'queryModel.showCount': '15',
            'queryModel.currentPage': '1',
            'queryModel.sortName': 'cdbh',
            'queryModel.sortOrder': 'asc',
            'time': '8',
        }

    # 查找空闲课室
    def look_for_free_classrooms(self):
        self.get_cookie()
        self.get_search_data()
        # POST请求、获取数据（未完善）
        xsjw = self.session.post(url=self.get_url, data=self.post_data, headers=self.headers, cookies=self.xsjw_cookie)
        index = open('data.json', 'w')  # 测试用
        index.write(xsjw.text)  # 测试用
        # 整理数据
        # 连接Mysql
        # 存储数据


if __name__ == '__main__':
    spider = XSJWSpider()
    spider.look_for_free_classrooms()
