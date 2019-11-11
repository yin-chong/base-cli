import Menu from '@/pages/Menu'

export default [
  {
    path: '*',
    redirect: 'Menu'
  },
  {
    path: '/Menu',
    component: Menu
  }
]
