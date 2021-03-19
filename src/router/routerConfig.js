import Menu from '@/pages/Menu'

export default [
  {
    path: '*',
    redirect: 'Menu'
  },
  {
    path: '/Menu',
    component: Menu,
    name: 'Menu',
    meta: {
      title: '首页',
      index: 0
    }
  }
]
