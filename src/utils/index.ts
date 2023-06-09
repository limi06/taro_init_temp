import Taro, { getCurrentPages, NodesRef, useRouter } from '@tarojs/taro'
// import { wxLogin } from '@/hooks/index'
import { StoreConfigNameCollect } from '@/config'
import userStore from '@/store/modules/user'
import $api from '@/api/index'
import commonStore from '@/store/modules/common'
// import * as _ from "lodash"

let a = 0
interface LoginOb {
  isLogin: boolean
  fnList: Function[]
}

const loginOb: LoginOb = {
  isLogin: false,
  fnList: []
}

export function protoString(params: any){
  return Object.prototype.toString.call(params)
}
/**
 * 获取 rpx => px 的转换系数
 * @returns { number } factor 单位转换系数 1rpx = factor * px
 */
 export const getFactor = () => {
  const sysInfo = Taro.getSystemInfoSync();
  const { screenWidth } = sysInfo;
  return screenWidth / 750;
};

/**
 * rpx => px 单位转换
 * @param { number } rpx - 需要转换的数值
 * @param { number } factor - 转化因子
 * @returns { number }
 */


export const toPx = (rpx, factor?) => {
  return parseInt(String(rpx * (factor || getFactor())), 10);
}


/**
 * px => rpx 单位转换
 * @param { number } px - 需要转换的数值
 * @param { number } factor - 转化因子
 * @returns { number }
 */
export const toRpx = (px, factor = getFactor()) =>
  parseInt(String(px / factor), 10);

export function isAndroid() {
  const u = navigator.userAgent;
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
}

export function getQueryVar(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}

export function click(fn, timer?) {
  if (a) {
    Taro.showToast({
      title: '请勿重复点击',
      icon: 'none'
    })
    return
  } else {
    setTimeout(() => {
      a = 0
    }, timer || 2000)
    a = 1
    fn()
  }
}

export function handle401() {
  localStorage.removeItem(StoreConfigNameCollect.userInfo)
  // wxLogin()
}

export function watch(fn: Function) {
  if (loginOb.isLogin) {
    // 登录已完成
    fn()
  } else {
    loginOb.fnList.push(fn)
    Object.defineProperty(loginOb, 'isLogin', {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this._isLogin = value
        for (let i = loginOb.fnList.length - 1; i >= 0; i--) {
          const tfn: any = loginOb.fnList[i]
          tfn && tfn()
          // loginOb.fnList.splice(i, 1)
        }
        loginOb.fnList = []
      },
      get: function () {
        return this._isLogin
      }
    })
  }
}

export function setLoginState(val) {
  loginOb.isLogin = val
}

export function getUserInfo(fn?) {
  return new Promise((resolve, reject) => {
    if (!userStore.userInfo?.nickname || new Date().getTime() - Taro.getStorageSync('login') > 7 * 24 * 60 * 60 * 1000) {
      Taro.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: async (res) => {
          await $api.saveUserInfo({
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl
          })
          Taro.setStorageSync('login', new Date().getTime())
          userStore.userInfo!.nickname = res.userInfo.nickName
          userStore.userInfo!.avatarurl = res.userInfo.avatarUrl
          fn && fn(res)
          resolve(res)
        }
      })
    } else {
      fn && fn()
      resolve(true)
    }
  })
}
// 获取当前页面url及参数
export function getCurrentPageUrlWithArgs(params = {}) {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const url = currentPage.route
  const options = currentPage.options
  let urlWithArgs = `/${url}?`
  for (let key in options) {
    const value = options[key]
    urlWithArgs += `${key}=${value}&`
  }
  for (let key in params) {
    const value = params[key]
    urlWithArgs += `${key}=${value}&`
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
  console.log(urlWithArgs, 'urlWithArgs')
  return urlWithArgs
}

// 转字符串
export function decode(data) {
  var toBinaryTable = [
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    62,
    -1,
    -1,
    -1,
    63,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    -1,
    -1,
    -1,
    0,
    -1,
    -1,
    -1,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    -1,
    -1,
    -1,
    -1,
    -1
  ]
  var base64Pad = '='
  var result = ''
  var leftbits = 0 // number of bits decoded, but yet to be appended
  var leftdata = 0 // bits decoded, but yet to be appended
  // Convert one by one.
  for (var i = 0; i < data.length; i++) {
    var c = toBinaryTable[data.charCodeAt(i) & 0x7f]
    var padding = data.charCodeAt(i) == base64Pad.charCodeAt(0)
    // Skip illegal characters and whitespace
    if (c == -1) continue
    // Collect data into leftdata, update bitcount
    leftdata = (leftdata << 6) | c
    leftbits += 6
    // If we have 8 or more bits, append 8 bits to the result
    if (leftbits >= 8) {
      leftbits -= 8
      // Append if not padding.
      if (!padding)
        result += String.fromCharCode((leftdata >> leftbits) & 0xff)
      leftdata &= (1 << leftbits) - 1
    }
  }
  // If there are any bits left, the base64 string was corrupted
  if (leftbits) throw 'Corrupted base64 string'
  var result = decodeURIComponent(escape(result))
  return result
}


// 检查对象键值对
export function checkObj(obj, rules) {
  for (const k in rules) {
    if (protoString(obj[k]) === '[object Object]' && JSON.stringify(obj[k]) === '{}') {
      Taro.showToast({
        title: rules[k],
        icon: 'none',
      })
      return false
    } else if (protoString(obj[k]) === '[object Array]' && !obj[k].length) {
      Taro.showToast({
        title: rules[k],
        icon: 'none',
      })
      return false
    }
    if (!obj[k]) {
      Taro.showToast({
        title: rules[k],
        icon: 'none',
      })
      return false
    }
  }
  return true
}


// 下载文件
export function downFileAction(file: string) {
  // 临时文件
  return new Promise((resolve, reject) => {
    if (file.includes('/tmp')) {
      resolve(file)
      return file
    }
    Taro.downloadFile({
      url: file,
      success: (res) => {
        resolve(res)
      }
    })
  })
}

// 保存文件
export async function saveImageFileAction(file: string){
  const res: any = await downFileAction(file)
  Taro.saveImageToPhotosAlbum({
    filePath: res,
    success: () => {
      Taro.showToast({
        title: '保存成功!',
        icon: 'success',
        mask: true
      })
    },
    fail: () => {
      Taro.showToast({
        title: '保存失败!',
        icon: 'none',
        mask: true
      })
    }
  })
}

// 打开文档
export async function openDocAction(file: string, fileType?: keyof Taro.openDocument.FileType){
  const res: any = await downFileAction(file)
  Taro.openDocument({
    filePath: res,
    fileType: fileType || 'pdf',
    success: () => {},
    fail: () => {
      Taro.showToast({
        title: '打开失败!',
        icon: 'none',
        mask: true
      })
    }
  })
}


export function usePrependPageSelector(selector?: string) {
  const { path } = useRouter()
  return path ? `${path}__${selector}` : selector
}

// 报错上报
export function handleError() {
  const oldError = console.error;
  console.error = function (error) {
    if (error != '参数有缺失') {
      const message = error.message;
      const stack = error.stack;
      let row = 0, column = 0, url: any = null;
      if (stack) {
        let mres = stack.match(/\(.*?\)/g) || []
        let firstLine = (mres[0] || "").replace("(", "").replace(")", "") // 获取到堆栈信息的第一条

        // 根据:分隔获取行列
        let info = firstLine.split(':')
        row = info[info.length - 2] // 行
        column = info[info.length - 1] // 列
        // 获取报错文件url
        url = [...info].slice(0, info.length - 2).join(':');
      }
      setTimeout(function () {
        // 上报错误内容
        let opt = {
          url,
          row,
          column,
          message,
          stack // 错误堆栈信息
        }
        commonStore.setErrorInfo(`全局捕获:${error} || ${JSON.stringify(opt)}`)
        // $api.reportTerminalException({ stackTraceInfo: `全局捕获:${error} || ${JSON.stringify(opt)}` })
        // 控制台打印的错误信息
        // console.log(error, 'error')
        // console.log(opt, 'opt')
        //进行上报的方法
      }, 0);
    }
    return oldError.apply(console, arguments);
  };
} 

// 检查小程序更新
export function wxMiniUpdate() {
  const updateManager = Taro.getUpdateManager()
  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    // console.log(res.hasUpdate)
  })
  updateManager.onUpdateReady(function () {
    Taro.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      }
    })
  })
  updateManager.onUpdateFailed(function () {
    // 新版本下载失败
  })
}

export const selectorQueryClientRect = (
  selector: string,
): Promise<NodesRef.BoundingClientRectCallbackResult> =>
  new Promise(resolve => {
    const query = Taro.createSelectorQuery()
    query
      .select(selector)
      .boundingClientRect((res: NodesRef.BoundingClientRectCallbackResult) => {
        resolve(res)
      })
      .exec()
  })

// 文本中间替换为*  卢*
export function textMidReplaceStar(str: string){
  if(!str){
    return ''
  }
  let len = str.length
  if(len <= 2){
    return `${str[0]}*`
  }
  return `${str[0]}*${str[len-1]}`
}

// 替换手机号*  157****4830
export function replaceMobileStar(mobile){
  if(!mobile){
    return ''
  }
  mobile = String(mobile)
  mobile = mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  return mobile
}

export function wxWeappPay(res) {
  return new Promise((resolve, reject) => {
    Taro.requestPayment({
      timeStamp: res.timeStamp, 
      nonceStr: res.nonceStr, // 支付签名随机串，不长于 32 位
      package: res.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
      signType: res.signType, // 微信支付V3的传入RSA,微信支付V2的传入格式与V2统一下单的签名格式保持一致
      paySign: res.paySign, // 支付签名
      success: (nres) => {
        Taro.showToast({
          title: '支付成功'
        });
        resolve(nres)
      },
      fail: (err) => {
        reject(err)
      }
    });
  })
}

export async function handleGetWxPhoneFn(e){
  return new Promise((resolve, reject) => {
    if (e.detail.encryptedData) {
      $api.decryptData({
        iv: e.detail.iv,
        encryptedData: e.detail.encryptedData,
        session_key: Taro.getStorageSync('base-login-info').session_key
      }).then(async res => {
        if (!res) {
          return
        }
        await $api.saveUserInfo({
          mobile: res
        })
        let data1 = await $api.getUserInfo()
        if (data1) {
          Taro.setStorageSync(StoreConfigNameCollect.userInfo, data1)
          userStore.userInfo = data1
        }
        resolve(res)
      })
    } else {
      reject('get phone cancel')
    }
  })
}