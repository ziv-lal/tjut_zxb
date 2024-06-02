const users = [
  { id: 0, name: 'Umi', nickName: 'U', gender: 'MALE' },
  { id: 1, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
];

export default {
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'PUT /api/v1/user/': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
  'POST /usr/login': (req: any, res: any) => {
    res.json({
      code: '00000',
      msg: "登陆成功",
      data: {
        userId: 0,
        nickname: '系统管理员',
        username: 'admin',
        role: 'admin',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      },
    });
  },
  'GET /usr/check': (req: any, res: any) => {
    res.json({
      code: '00000',
      msg: "success",
      data: {
        userId: 72837,
        nickname: '系统管理员',
        username: 'admin',
        role: 'admin',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      },
    });
  },

  'POST /apply/pageList': (req: any, res: any) => {
    res.json({
      "code": "00000",
    "message": "请求正常",
    "data": {
        "recordsFiltered": 3290,
        "applies": [
            {
                "id": 7982,
                "classroom": "0202",
                "building": "1号楼",
                "date": "2024-03-02",
                "sections": "1,2,3,4",
                "event": "教室借用",
                "reason": "新生教育，班会",
                "applyUser": "牛瑞民",
                "contact": null,
                "status": 0,
                "tips": "1,2,3",
                "createTime": "2024-04-14",
                "copeTime": "2024-04-14"
            },
            {
                "id": 7983,
                "classroom": "0202",
                "building": "1号楼",
                "date": "2024-06-08",
                "sections": "1,2,3,4,5,6,7,8",
                "event": "教室借用",
                "reason": "开会",
                "applyUser": "齐霖",
                "contact": null,
                "status": -1,
                "tips": "15",
                "createTime": "2024-04-14",
                "copeTime": "2024-04-14"
            },
            {
                "id": 7984,
                "classroom": "0202",
                "building": "1号楼",
                "date": "2024-07-06",
                "sections": "3,4",
                "event": "教室借用",
                "reason": "院排考试",
                "applyUser": "王志欣",
                "contact": null,
                "status": 3,
                "tips": "19",
                "createTime": "2024-04-14",
                "copeTime": "2024-04-14"
            },
            {
                "id": 7985,
                "classroom": "0202",
                "building": "1号楼",
                "date": "2024-06-29",
                "sections": "3,4,5,6",
                "event": "教室借用",
                "reason": "院排考试",
                "applyUser": "王志欣",
                "contact": null,
                "status": 0,
                "tips": "18",
                "createTime": "2024-04-14",
                "copeTime": "2024-04-14"
            },
            {
                "id": 7986,
                "classroom": "0202",
                "building": "1号楼",
                "date": "2024-07-06",
                "sections": "5,6",
                "event": "教室借用",
                "reason": "院排考试",
                "applyUser": "王志欣",
                "contact": null,
                "status": 1,
                "tips": "19",
                "createTime": "2024-04-14",
                "copeTime": "2024-04-14"
            },
            {
                "id": 7987,
                "classroom": "0202",
                "building": "1号楼",
                "date": "2024-03-09",
                "sections": "5,6,7,8",
                "event": "教室借用",
                "reason": "研究生学院上课",
                "applyUser": "赵学文",
                "contact": null,
                "status": 3,
                "tips": "2,3,4,5,6,7,8,9,10,11",
                "createTime": "2024-04-14",
                "copeTime": "2024-04-14"
            },
            {
                "id": 7988,
                "classroom": "0202",
                "building": "1号楼",
                "date": "2024-06-16",
                "sections": "1,2,3,4",
                "event": "教室借用",
                "reason": "院排考试-高数分级教学考试",
                "applyUser": "熊晓蕾",
                "contact": null,
                "status": 3,
                "tips": "16",
                "createTime": "2024-04-14",
                "copeTime": "2024-04-14"
            },
            {
                "id": 7989,
                "classroom": "0202",
                "building": "1号楼",
                "date": "2024-05-12",
                "sections": "1,2,3,4",
                "event": "教室借用",
                "reason": "四六级口语",
                "applyUser": "齐霖",
                "contact": null,
                "status": 1,
                "tips": "11",
                "createTime": "2024-04-14",
                "copeTime": "2024-04-14"
            },
            {
                "id": 7990,
                "classroom": "0202",
                "building": "1号楼",
                "date": "2024-06-02",
                "sections": "1,2,3,4,5,6,7,8,9,10",
                "event": "教室借用",
                "reason": "上课",
                "applyUser": "袁镜瑶",
                "contact": null,
                "status": -1,
                "tips": "14",
                "createTime": "2024-04-14",
                "copeTime": "2024-04-14"
            },
            {
                "id": 7991,
                "classroom": "0202",
                "building": "1号楼",
                "date": "2024-04-21",
                "sections": "1,2,3,4,5,6,7,8,9,10,11",
                "event": "教室借用",
                "reason": "开会",
                "applyUser": "齐霖",
                "contact": null,
                "status": 0,
                "tips": "8",
                "createTime": "2024-04-14",
                "copeTime": "2024-04-14"
            }
        ],
        "recordsTotal": 4235
    }
    });
  },

  'GET /rooms': (req: any, res: any) => {
    res.json({
      code: "00000",
      msg: "success",
      data: [
          {
            "id": 1,
            "buildingId": "1",
            "floor": 1,
            "classroomName": "101",
          },
          {
            "id": 627,
            "buildingId": 1,
            "floor": 2,
            "classroomName": "0202"
        },
        {
            "id": 628,
            "buildingId": 1,
            "floor": 2,
            "classroomName": "0206"
        },
        {
            "id": 629,
            "buildingId": 1,
            "floor": 3,
            "classroomName": "0301"
        },
        {
            "id": 630,
            "buildingId": 1,
            "floor": 3,
            "classroomName": "0302"
        },
        {
            "id": 631,
            "buildingId": 1,
            "floor": 3,
            "classroomName": "0304"
        },
        {
            "id": 632,
            "buildingId": 1,
            "floor": 3,
            "classroomName": "0306"
        },
        {
            "id": 633,
            "buildingId": 1,
            "floor": 4,
            "classroomName": "0401"
        },
        {
            "id": 634,
            "buildingId": 1,
            "floor": 4,
            "classroomName": "0402"
        },
        {
          "id": 758,
          "buildingId": 28,
          "floor": 1,
          "classroomName": "A101"
      },
      {
          "id": 759,
          "buildingId": 28,
          "floor": 1,
          "classroomName": "A102"
      },
      {
          "id": 760,
          "buildingId": 28,
          "floor": 1,
          "classroomName": "A103"
      },
      {
          "id": 761,
          "buildingId": 28,
          "floor": 1,
          "classroomName": "A104"
      },
      {
          "id": 762,
          "buildingId": 28,
          "floor": 1,
          "classroomName": "A105"
      },
      {
          "id": 763,
          "buildingId": 28,
          "floor": 1,
          "classroomName": "A106"
      },
        ],
    });
  },

  'GET /admin/auditList': (req: any, res: any) => {
    res.json({
      code: "00000",
      msg: "success",
      data: {
        teacherUsers: [
          {
            id: 1,
            username: "张三",
            role: "teacher",
            avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            nickname: "张三",
            ifAccept: 1,
          },
          {
            id: 2,
            username: "李四",
            role: "teacher",
            avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            nickname: "李四",
            ifAccept: 0,
          },
          {
            id: 3,
            username: "王五",
            role: "teacher",
            avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            nickname: "王五",
            ifAccept: 0,
          },
          {
            id: 4,
            username: "赵六",
            role: "teacher",
            avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            nickname: "赵六",
            ifAccept: 0,
          },
          {
            id: 5,
            username: "田七",
            role: "teacher",
            avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            nickname: "田七",
            ifAccept: 0,
          },
          {
            id: 6,
            username: "孙八",
            role: "teacher",
            avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            nickname: "孙八",
            ifAccept: 1,
          },
          {
            id: 7,
            username: "周九",
            role: "teacher",
            avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            nickname: "周九",
            ifAccept: 0,
          },
          {
            id: 8,
            username: "吴十",
            role: "teacher",
            avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            nickname: "吴十",
            ifAccept: 1,
          },
        ],
      },
    });
  },

  'GET /info/available': (req: any, res: any) => {
    return res.json({
      code: "00000",
      msg: "success",
      data: {
        available: ["1", "5", "6", "7", "10", "11", "12"],
      },
    })
  }
};
