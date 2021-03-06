const BASEURL = "https://easy-mock.com/mock/5e2ff837efe660215074f41b/smile-shop/"
const LOCALURL = 'http://localhost:3000/'
const URL = {
    getShopingMall: BASEURL + 'index', //商城首页
    getGoodsInfo: BASEURL + 'getGoodsInfo',
    registerUser: LOCALURL + 'user/register',//用户注册接口
    login:LOCALURL+'user/login',//用户登录
    getDetailGoodsInfo:LOCALURL+'goods/getDetailGoodsInfo',//用户登录
    getCategoryList:LOCALURL+'goods/getCategoryList',//读取大类数据
    getCategorySubList:LOCALURL+'goods/getCategorySubList',//读取分类数据

}
module.exports = URL