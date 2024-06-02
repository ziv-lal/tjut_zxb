import access from "@/access";

export default [
    {
        name: 'login',
        path: '/login',
        component: './User/Login',
        layout: false,
    },
    {
        name: 'register',
        path: '/register',
        component: './User/Register',
        layout: false,
    },
    {
        // 控制台页面
        name: '数据统计',
        path: '/dashboard',
        component: './Dashboard',
        icon: 'DashboardOutlined',
    },
    {
        // 预约审核界面
        name: '预约审核',
        path: '/applyAudit',
        component: './ApplyAudit',
        icon: 'AuditOutlined',
    },
    {
        // 教室信息界面
        name: '教室信息',
        path: '/classroomInfo',
        component: './ClassroomInfo',
        icon: 'BankOutlined',
    },
    {
        // 管理员注册审核
        name: '管理员注册审核',
        path: '/teacherAudit',
        component: './TeacherAudit',
        icon: 'FileDoneOutlined',
        access: 'isAdmin',
    },
    {
        // 个人中心
        name: '个人中心',
        path: '/account',
        component: './Account',
        icon: 'UserOutlined',
    },
    {
        // 系统配置界面，仅admin可见
        name: '系统配置',
        path: '/config',
        component: './Config',
        access: 'isAdmin',
        icon: 'SettingOutlined',
    },
    {
        path: '*',
        layout: false,
        component: './404',
    },
]