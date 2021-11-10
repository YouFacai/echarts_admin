<template>
  <div id="globalBar" ref="myRef"></div>
</template>

<script>
import { toRefs, reactive, onMounted, getCurrentInstance, ref } from "vue";
import { globalBarData } from "@/api/index.js";
import { getSectorData } from "@/utils/index.js";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const echarts = proxy.$echarts;
    let myChart, renderData;
    const state = reactive({});
    const myRef = ref(null);

    // 请求疫情数据
    globalBarData().then((res) => {
      renderData = getSectorData(res);
      init();
      setRatio();
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
        grid: {
          // show:true,
          // borderColor:'red',
          containLabel: true,
          width: "90%",
          height: "100%",
          top: 0,
          left: 0,
        },
        title: {
          text: "各大洲感染比例",
          // left: "5%",
          top: "2%",
          textStyle: {
            color: "white",
          },
        },
        legend: {
          bottom: "0",
          left: "center",
          textStyle: {
            color: "write",
          }
        },
        series: [
          {
            top:-20,
            name: "各大洲感染比例",
            type: "pie",
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
           
            label: {
              show:false
            },
            data: renderData,
            // 是否支持多个选中
            selectedMode: "multiple",
          },
        ],
         tooltip:{
              formatter: function (arg) {
                console.log(arg);
                return arg.name + "占比" + arg.percent + "%";
              },
            },
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
            radius: [titlefontsize, 4 * titlefontsize],
            label: {
              fontSize: titlefontsize / 1.5,
            },
          },
        ],
      };
      myChart.setOption(tempoption);
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
</style>,