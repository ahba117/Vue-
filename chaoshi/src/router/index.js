import Vue from 'vue'
import Router from 'vue-router'
import test1 from '@/pages/test1.vue'

Vue.use(Router)
const VueRouterPush = Router.prototype.push

Router.prototype.push = function push(to) {

    return VueRouterPush.call(this, to).catch(err => err)

}
export default new Router({

    routes: [{
            path: '/',
            component: test1
        },
        {
            path: '/administrator',
            name: 'administrator',
            component: () =>
                import ('../pages/administrator.vue'),
            children: [

                {
                    path: '/test1',
                    name: 'test1',
                    component: () =>
                        import ('../pages/test1.vue')
                },
                {
                    path: '/shangpin',
                    name: 'shangpin',
                    component: () =>
                        import ('../pages/shangpin.vue')
                },
                {
                    path: '/yh',
                    name: 'yh',
                    component: () =>
                        import ('../pages/yh.vue')
                },
                {
                    path: '/pinglun',
                    name: 'pinglun',
                    component: () =>
                        import ('../pages/pinglun.vue')
                },
                {
                    path: '/dingdan',
                    name: 'dingdan',
                    component: () =>
                        import ('../pages/dingdan.vue')
                },
                {
                    path: '/dd',
                    name: 'dd',
                    component: () =>
                        import ('../pages/dd.vue')
                },
            ]
        },
        {
            path: '/user',
            name: 'user',
            component: () =>
                import ('../pages/user.vue'),
            children: [{
                    path: '/geren',
                    name: 'geren',
                    component: () =>
                        import ('../pages/geren.vue')
                },
                {
                    path: '/shangpin1',
                    name: 'shangpin1',
                    component: () =>
                        import ('../pages/shangpin1.vue')
                },
                {
                    path: '/che',
                    name: 'che',
                    component: () =>
                        import ('../pages/che.vue')
                },
                {
                    path: '/pinglun1',
                    name: 'pinglun1',
                    component: () =>
                        import ('../pages/pinglun1.vue')
                },
                {
                    path: '/dingdan1',
                    name: 'dingdan1',
                    component: () =>
                        import ('../pages/dingdan1.vue')
                },
                {
                    path: '/dd1',
                    name: 'dd1',
                    component: () =>
                        import ('../pages/dd1.vue')
                },
            ]
        },
    ]
})