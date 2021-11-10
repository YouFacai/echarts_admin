import axios from 'axios';
import {sort} from '../utils/index.js';

// 全球疫情数据
export function globalBarData(){
    return new Promise((resolve,reject) => {
        axios.get('https://api.inews.qq.com/newsqa/v1/automation/foreign/country/ranklist').then(res=>{
            resolve(sort(res.data.data))
        })
    })
}

// 热门国家包含历史记录
export function hotnationData(){
    return new Promise((resolve,reject) => {
        axios.get('/sogou/api/sgs/epidemic/area-charts/data/jk?_=0.58376067453884').then(res=>{
            resolve(res.data)
        })
    })
}

// 请求地图数据
export function getMap(url){
    return new Promise((resolve,reject) => {
        axios.get('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json').then(res=>{
            resolve(res.data)
        })
    })
}

// 中国各省疫情数据
export function getChain(){
    return new Promise((resolve,reject) => {
        axios.get('/chinamap/news/wap/fymap2020_data.d.json').then(res=>{
            resolve(res.data)
        })
    })
}