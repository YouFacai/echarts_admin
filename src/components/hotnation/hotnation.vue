<template>
  <div id="globalBar" ref="myRef"></div>
</template>

<script>
import {
  toRefs,
  reactive,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  ref,
} from "vue";
import { hotnationData } from "@/api/index.js";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const echarts = proxy.$echarts;
    let myChart, timer;
    const state = reactive({});
    // 横坐标数组
    let xAxis = [];
    // 图例
    let legend = [];
    // 数据配置
    let series = [];
    const myRef = ref(null);

    // 请求疫情数据
    hotnationData().then((res) => {
      // x轴数据
      xAxis = res.japan.all.x.slice(
        res.japan.all.x.length - 100,
        res.japan.all.x.length
      );
      // 图例数据
      for (let key in res) {
        if (key != "code") {
          legend.push(key);
          // 去除样式
          Object.values(res[key])[0].series[1].itemStyle = {};
          // 更换名字
          Object.values(res[key])[0].series[1].name = key
          // 设置堆叠图
          Object.values(res[key])[0].series[1].stack = "总量"
          Object.values(res[key])[0].series[1].symbol="rect"

          Object.values(res[key])[0].series[1].data = Object.values(
            res[key]
          )[0].series[1].data.slice(
            Object.values(res[key])[0].series[1].data.length - 100,
            Object.values(res[key])[0].series[1].data.length
          );
          series.push(Object.values(res[key])[0].series[1]);
        }
      }

      init();
    });

    // 初始化
    const init = function () {
      myChart = echarts.init(myRef.value);
      // 监听窗口缩放
      window.addEventListener("resize", function () {
        myChart.resize();
      });

      let option = {
        grid: {
          containLabel: true,
          width: "100%",
          height: "70%",
          bottom: 0,
          left: 0,
        },
        legend:{
          textStyle:{
            color:'#fff'
          }
        },
       /*  title: {
          text: "焦点国家",
          top: "2%",
          textStyle: {
            color: "white",
          },
        }, */
        xAxis: {
          type: "category",
          data: xAxis,
        },
        yAxis: {
          type: "value",
          // 缩放 （就是所说Y轴可以不用从0开始）
          scale: true,
          min:0
        },
        tooltip: {
          show: true,
          // 触发时机 item 是放在上面才会触发 axis在轴上就会触发
          trigger: "item",
          triggerOn: "mousemove",
          formatter: function (arg) {
            return arg.seriesName + "累计感染" + arg.value + "人";
          },
        },
        series: series,
      };

      option && myChart.setOption(option);
    };

    // 图标比例调整
    const setRatio = function () {
      let titlefontsize = Math.ceil((myRef.value.offsetWidth / 100) * 4.5);
      let tempoption = {
        title: {
          textStyle: {
            fontSize: titlefontsize,
          },
        },
        series: [
          {
            barWidth: titlefontsize,
          },
        ],
      };
      myChart.setOption(tempoption);
    };

    // dom 挂载完毕
    onMounted(() => {});

    return {
      ...toRefs(state),
      myRef,
    };
  },
};
</script>
<style  scoped>
#globalBar {
  width: 100%;
  height: 100%;
}
</style>