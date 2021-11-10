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
    let myChart, timer;
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
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%",
        },
        series: [
          {
            name: "Pressure",
            type: "gauge",
            detail: {
              formatter: "{value}",
            },
            data: [
              {
                value: 60,
                name: "SCORE",
              },
            ],
          },
        ],
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
    const startTime = function () {
      timer = setInterval(() => {
        state.currentI++;
        if (state.currentI > state.pages) {
          state.currentI = 1;
        }
        updataValue();
      }, 2500);
    };

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