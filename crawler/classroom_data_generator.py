import requests

import decode

num = 0
with open("url_list.txt", "r", encoding='utf-8') as url_list:
    for line in url_list:
        url = line.strip()
        # 发送GET请求并获取HTML代码
        response = requests.get(url)
        # 检查响应状态码，确保请求成功
        if response.status_code == 200:
            # print("数据获取成功！")
            # 生成文件名称
            num = num + 1
            decode.decodeWithHtml(response.text, "./classroom_data/" + str(num))

        else:
            print('请求失败:', response.status_code)
