export default [{
  path: '/test',
  component: () => import( /* webpackChunkName: "test" */ './test.vue'),
  name: 'test'
}]