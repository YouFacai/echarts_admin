import axios from 'axios';
axios.defaults.baseURL = baseURL;

// 一些可以提取的小东西:超时时间 & CORS跨域中是否允许携带资源凭证(例如:cookie)
//   + 客户端的withCredentials:true，那么服务器端也要设置为允许
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;

axios.defaults.validateStatus = status => {
    return status >= 200 && status < 400;
};
// 响应拦截器:onfulfilled/onrejected，发生在请求成功/失败，在业务层具体.then/catch之前进行拦截处理
axios.interceptors.response.use(response => {
    // 请求成功:一般我们会返回响应主体信息
    return response.data;
}, reason => {
    // 请求失败:一般我们会做统一的错误提示
    if (reason && reason.response) {
        let response = reason.response;
        // 有响应信息，但是状态码不对，我们根据不同的状态码做不同的提示
        switch (response.status) {
            case 400:
                // ...
                break;
            case 401:
                // ...
                break;
            case 404:
                // ...
                break;
        }
    } else {
        if (reason && reason.code === 'ECONNABORTED') {
            // 请求超时或者中断
        }
        if (!navigator.onLine) {
            // 断网了
        }
    }
    return Promise.reject(reason);
});

export default axios;