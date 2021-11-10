<template>
  <div id="globalBar" ref="myRef"></div>
</template>

<script>
import { toRefs, reactive, onMounted, getCurrentInstance, ref } from "vue";
import { getMap, getChain } from "@/api/index.js";
import { sortcity } from "@/utils/index.js";
import chinaCity from "@/../public/jsonData/chinaCity.js";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const echarts = proxy.$echarts;
    let myChart,
      chainMap,
      mapdata,
      focesCity = [];
    const state = reactive({});

    const myRef = ref(null);

    // 请求疫情数据
    getMap().then((res) => {
      chainMap = res;
      init();
    });

    getChain().then((res) => {
      mapdata = sortcity(
        res.data.list.map((item) => {
          if (item.name == "新疆") {
            item.name = item.name + "维吾尔自治区";
          } else if (item.name == "宁夏") {
            item.name = item.name + "回族自治区";
          } else if (item.name == "西藏" || item.name == "内蒙古") {
            item.name = item.name + "自治区";
          } else if (item.name == "广西") {
            item.name = item.name + "壮族自治区";
          } else if (
            item.name == "北京" ||
            item.name == "上海" ||
            item.name == "重庆" ||
            item.name == "天津"
          ) {
            item.name = item.name + "市";
          } else {
            item.name = item.name + "省";
          }

          item.value = Number(item.econNum);
          return item;
        })
      );

      // 找出10个最大的
      let temp = mapdata.slice(0, 10);
      temp.forEach((item) => {
        for (let key in chinaCity) {
          if (item.name.includes(chinaCity[key].name)) {
            focesCity.push(chinaCity[key].value);
          }
        }
      });
    });

    // 初始化
    const init = function () {
      myChart = echarts.init(myRef.value);
      echarts.registerMap("chainMap", chainMap);
      // 监听窗口缩放
      window.addEventListener("resize", function () {
        myChart.resize();
      });

      // 监听地图点击事件
      myChart.on("click", function (e) {
        console.log(e);
      });

      let option;
      option = {
        grid: {
          containLabel: true,
          width: "100%",
          height: "100%",
          top: 10,
          left: 0,
        },
        title: {
          text: "中国疫情各省确诊数",
          // left: "5%",
          top: "2%",
          textStyle: {
            color: "white",
          },
        },
        geo: {
          tooltip: {
            show: true,
          },
          map: "chainMap",
          // 是否可以缩放
          roam: true,
          center: [100.97, 35.71],
          // 打开时的缩放倍数
          zoom: 1.5,
        },
        series: [
          {
            type: "map",
            // 使用地图坐标系
            coordinateSystem: "geo",
            // 数据和哪个geo关联
            geoIndex: 0,
            symbolSize: function (params) {
              return (params[2] / 100) * 15 + 5;
            },
            itemStyle: {
              color: "#b02a02",
            },
            data: mapdata,
          },
          {
            type: "effectScatter",
            // 该系列使用的坐标系
            coordinateSystem: "geo",
            // 写经纬度
            data: focesCity,
            rippleEffect: {
              // 波浪放大倍数
              scale: 5,
              // 波浪颜色
              color: "yellow",
            },
            label: {
              // show:false,
            },
            tooltip: {
              show: false,
            },
          },
        ],
        visualMap: {
          type: "piecewise",
          // 筛选条的颜色
          inRange: {
            color: ["#99cdf4", "#5077d1"],
          },
          pieces: [
            { min: 50, label: "高风险" },
            { min: 5, max: 50, label: "中风险" },
            { max: 0, max:5, label: "低风险" },
          ],
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "item",
          showDelay: 0,
          transitionDuration: 0.2,
          triggerOn: "mousemove",
          formatter: function (params) {
            var value = (params.value + "").split(".");
            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,");
            return "确诊人数" + "<br/>" + params.name + ": " + value;
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