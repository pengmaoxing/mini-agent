// ----http----
// api URL
const apiUrl = "https://www.yueyoupay.com";// 公共的请求地址
// 封装微信请求方法
const request = (params) => {
  let url = params.url;
  let data = params.data;
  let method = params.method;
  let header = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  };

  // 鉴权验证，获取登录之后后端返回的token，存在即在头部Authorization写token，具体的看后端需求
  if (wx.getStorageSync("token")) {
    // header.Authorization = wx.getStorageSync("token");
    header.token = wx.getStorageSync("token");
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: apiUrl + url, // api url
      method: method, // get/post
      data: data, // 请求参数
      header: header, // 头部
      success(res) {
        // 请求成功
        // 判断状态码---errCode状态根据后端定义来判断
        if (res.statusCode < 399) {
          if (res.data.Code === 401) {
            wx.showModal({
              title: "提示",
              content: "请登录",
              showCancel: false,
              success(res) {
                wx.navigateTo({
                  url: "/pages/login/login",
                });
              },
            });
            reject(res.data);
          }
          resolve(res.data);
        } else {
          // 其他异常
          switch (res.statusCode) {
            case 404:
              wx.showToast({
                title: '未知异常',
                duration: 2000,
              })
              break;
            default:
              wx.showToast({
                title: '请重试...',
                duration: 2000,
              })
              break;
          }
          reject("未知错误,请稍后再试");
        }
      },
      fail(err) {
        if (err.errMsg.indexOf('request:fail') !== -1) {
          wx.showToast({
            title: '网络异常',
            icon: "error",
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '未知异常',
            duration: 2000
          })
        }
        reject(err);
      },
      complete() {
        wx.hideLoading()
      },
    });
  });
};

module.exports = {apiUrl,request}

