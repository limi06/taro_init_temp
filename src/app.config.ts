export default defineAppConfig({
  pages: [
    'pages/index/index',
    // 'pages/demo/index',
    // 'pages/tcss/index',
    // 'pages/test-hooks/index',
    // 'pages/tcomp/index'
  ],
  subPackages: [
    {
      root: 'subPackage',
      name: 'subPackage',
      // independent: true,
      pages: [
        'pages/temp/index'
      ]
    }
  ],
  // debug: true, // 开启 一些编译时的 log
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  requiredPrivateInfos: ['chooseAddress'],
  // tabBar: {
  //   color: '#828282',
  //   selectedColor: '#333333',
  //   borderStyle: 'black',
  //   backgroundColor: '#ffffff',
  //   custom: true,
  //   list: [
  //     {
  //       pagePath: 'pages/index/index',
  //       iconPath: 'static/tabbar/home.png',
  //       selectedIconPath: 'static/tabbar/home-active.png',
  //       text: '首页'
  //     },
  //     {
  //       pagePath: 'pages/shop/index',
  //       iconPath: 'static/tabbar/shop.png',
  //       selectedIconPath: 'static/tabbar/shop-active.png',
  //       text: '商城'
  //     },
  //     {
  //       pagePath: 'pages/serve/index',
  //       iconPath: 'static/tabbar/serve.png',
  //       selectedIconPath: 'static/tabbar/serve-active.png',
  //       text: '服务项目'
  //     },
  //     {
  //       pagePath: 'pages/my/index',
  //       iconPath: 'static/tabbar/my.png',
  //       selectedIconPath: 'static/tabbar/my-active.png',
  //       text: '我的'
  //     }
  //   ]
  // }
})
