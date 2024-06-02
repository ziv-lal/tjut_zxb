
base_url = "http://ssfw.tjut.edu.cn/ssfw/print/pkgl/kcbxx/3/"
tail_url = "/2023-2024-1.do"

with open("url_list.txt", 'a') as f:
    for i in range(354, 390):
        url = base_url + str(i) + tail_url
        print(url)
        f.write(url + "\n")
print("done!")