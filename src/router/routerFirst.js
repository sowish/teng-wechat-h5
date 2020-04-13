export default [{
    path: '/',
    redirect: '/home'
},
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {title: '首页'}
    },
    {
        path: '/my_order',
        name: 'my_order',
        component: () => import('@/views/home/my_order.vue'),
        meta: {title: '我的预约'}
    },
    {
        path:'/order_detail',
        name:'order_detail',
        component:()=>import('@/views/home/order_detail.vue'),
        meta:{title:'预约详情'}
    },
    {
        path:'/office_list',
        name:'office_list',
        component:()=>import('@/views/home/office_list.vue'),
        meta:{title:'科室列表'}
    },
    {
        path:'/send_message',
        name:'send_message',
        component:()=>import('@/views/home/send_message.vue'),
        meta:{title:'提交资料'}
    }

]