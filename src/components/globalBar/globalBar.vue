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
import { globalBarData } from "@/api/index.js";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const echarts = proxy.$echarts;
    let myChart,timer;
    const state = reactive({
      // 横坐标数组
      xArray: [],
      // 纵坐标数组
      yArray: [],
      // 当前是第几组数据
      currentI: 1,
      // 全部数据
      allData: null,
      // 每一页多少个数据
      pagesize: 5,
    });
    const myRef = ref(null);

    // 请求疫情数据
    globalBarData().then((res) => {
      state.allData = res;
      // 把全部的很坐标都拿出来
      // 把全部的数值拿出来
      res.forEach((item) => {
        if (item.confirmAdd != 0) {
          state.xArray.push(item.name);
          state.yArray.push(item.confirmAdd);
        }
      });

      // 一共可以分多少页
      state.pages = Math.ceil(state.xArray.length / state.pagesize);
      updataValue();
    });

    // 初始化
    const init = function () {
      myChart = echarts.init(myRef.value);
      // 监听窗口缩放
      window.addEventListener("resize", function () {
        setRatio();
        myChart.resize();
      });

      let option = {
        grid:{
          // show:true,
          containLabel:true,
          width:'90%',
          height:'80%',
          bottom:0,
          left:0
        },
        title: {
          text: "全球疫情实况图",
          // left: "5%",
          top: "2%",
          textStyle: {
            color: "white",
          },
        },
        xAxis: {
          type: "category",
          axisLabel : {//坐标轴刻度标签的相关设置。
                interval:0,
            }
        },
        yAxis: {
          type: "value",
          // 缩放 （就是所说Y轴可以不用从0开始）
          scale: true,
        },
        series: [
          {
            name: "globalBar",
            type: "bar",
            // 把每个点的数据标出来
            label: {
              show: true,
              textStyle:{
                color:'#fff'
              }
            },
            itemStyle:{
              color:'#3398db'
            }
          },
        ],
        tooltip: {
          show: true,
          // 触发时机 item 是放在上面才会触发 axis在轴上就会触发
          trigger: "item",
          triggerOn: "mousemove",
          formatter: function (arg) {
            return arg.name + "新增感染" + arg.data + "人";
          }
        },
      };

      option && myChart.setOption(option);
    };

    // 更新数据
    const updataValue = function () {
      let tempOption = {
        xAxis: {
          type: "category",
          // 数据(X)与Y轴之间的留白部分
          data: state.xArray.slice(
            (state.currentI - 1) * state.pagesize,
            state.currentI * state.pagesize
          ),
        },
        series: [
          {
            data: state.yArray.slice(
              (state.currentI - 1) * state.pagesize,
              state.currentI * state.pagesize
            ),
          },
        ],
      };

      myChart.setOption(tempOption);
    };

    // 图标比例调整
    const setRatio = function () {
      let titlefontsize = Math.ceil((myRef.value.offsetWidth / 100)*4.5);
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
    onMounted(async () => {
      await init();
      startTime();
      // 划入暂停
      myChart.on("mousemove", function () {
        clearInterval(timer);
      });
      myChart.on("mouseout", function () {
        startTime();
      });
      setRatio();
    });

    // 组件消亡
    onBeforeUnmount(() => {
      clearInterval(timer);
    });

    // 开启定时器
    const startTime = function (){
      timer = setInterval(() => {
      state.currentI++;
      if (state.currentI > state.pages) {
        state.currentI = 1;
      }
      updataValue();
    }, 2500);
    }

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
  height:100%;
}
</style>