import { login } from '../../api/index';
Page({
  data: {
    form: {
      username: '',
      password: ''
    }
  },
  onLoad() {
    
  },
  async formSubmit(e:any) {
    const form:any = e.detail.value;
    if(!form.username.trim()) {
      wx.showToast({
        title: '请输入账号',
        icon: 'none'
      })
      return false;
    } else if(!form.password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return false;
    }
    wx.showToast({title: '登录中', icon: 'loading', duration: 10000});
    const res = await login(form)
    wx.hideToast();
    if(!res) return;
    if(res.code!==200) {
      wx.showToast({title: res.msg})
    }
    const info = res.obj;
     wx.setStorageSync('token',info.token)
     wx.navigateTo({url:'/pages/index/index'})
  }
})
