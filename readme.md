# TJUT自习吧

旨在为同学们提供一个快速查找空闲教室的途径。

## 技术路线

|            | 框架          | 备注        |
| ---------- | ------------- | ----------- |
| 微信小程序 | Uni-APP       | 基于VUE框架 |
| 前端       | React + UmiJS |             |
| 后端       | SpringBoot    |             |
| 爬虫       | BS4           |             |
| 数据库     | MySQL         |             |

## 目录说明

```
tjut_zxb
├─ readme.md // readme
├─ front_end // 前端代码
├─ back_end // 后端代码
├─ wx_mini // 微信小程序端代码
├─ crawler // 爬虫代码
├─ imgs // 图片
└─ database // 数据库文件（只有结构）
```

## 截图

### 微信小程序

#### 状态说明

<img src="./imgs/教室使用状态表示.jpg" alt="教室使用状态表示" style="zoom:50%;" />

#### 首页

<img src="./imgs/微信小程序端首页页面-有通知.jpg" alt="微信小程序端首页页面-有通知" style="zoom:25%;" />

#### 教学楼选择

<img src="./imgs/微信小程序端教学楼选择页面.jpg" alt="微信小程序端教学楼选择页面" style="zoom:25%;" />

#### 教学楼详情

<img src="./imgs/微信小程序端-2号教学楼详情.jpg" alt="微信小程序端-2号教学楼详情" style="zoom:25%;" />

#### 教室详情

<img src="./imgs/微信小程序端教室安排页面.jpg" alt="微信小程序端教室安排页面" style="zoom:25%;" />

#### 预约

<img src="./imgs/微信小程序教室预约页面.jpg" alt="微信小程序教室预约页面" style="zoom:25%;" />

## 后天管理-前端

![WEB前端数据统计页面](./imgs/WEB前端数据统计页面.png)

![WEB前端系统配置页面](./imgs/WEB前端系统配置页面.png)

![WEB前端预约审核页面-审核](./imgs/WEB前端预约审核页面-审核.png)

![WEB前端预约审核页面-添加预约](./imgs/WEB前端预约审核页面-添加预约.png)

## 爬虫

将课程表HTML解析成JSON文件，然后解析JSON文件，再入库

<img src="/Users/ziv_l/Desktop/file/2024第一学期(大四下)/毕业项目/tjut_zxb/imgs/Python爬虫生成json文件样例.png" alt="Python爬虫生成json文件样例" style="zoom:25%;" />

![Python爬虫添加预约](/Users/ziv_l/Desktop/file/2024第一学期(大四下)/毕业项目/tjut_zxb/imgs/Python爬虫添加预约.png)

## 说明

由于后期事件紧迫，代码可能有点点乱，将来可能会将重新整代码再上传