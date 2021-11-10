<template>
  <div class="box">
    <!-- 顶部 -->
    <div class="topbar">
      <div class="topbartime">
        数据更新于: &nbsp;{{
          new Date().toLocaleDateString() +
          " " +
          new Date().toLocaleTimeString()
        }}
      </div>
      <div class="topbarTitle">全球疫情实时数据可视化平台</div>
    </div>
    <!-- 一整块布局 -->
    <div class="layout">
      <!-- 左 -->
      <div class="left_L">
        <!-- 第一块数据 -->
        <div class="left_L_Msg">
          <totalData/>
        </div>
        <!-- 第二款全球国家柱状图 -->
        <div class="globalBar">
          <globalBar />
        </div>
        <!-- 各大洲饼状图 -->
        <div class="sector">
            <sector/>
        </div>
      </div>
      <div class="left_M">
        <!-- 中国地图 -->
        <div class="china_Map">
            <chainMap/>
        </div>
        <!-- 热门国家折线图 -->
        <div class="hotnation">
            <hotnation/>
        </div>
      </div>
      <div class="left_R">
        <!-- 一个列表 -->
        <div class="chinaCity">
            <cityList/>
        </div>
        <!-- 各国的治愈和死亡比例 -->
        <!-- <div class="proportion">
            <ratio/>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>

import globalBar from "@/components/globalBar/globalBar.vue";
import sector from "@/components/sector/sector.vue";
import chainMap from "@/components/chainMap/chainMap.vue";
import hotnation from "@/components/hotnation/hotnation.vue";
import cityList from "@/components/cityList/cityList.vue";
import ratio from "@/components/ratio/ratio.vue";
import totalData from '@/components/totalData/totalData.vue';

import { toRefs, reactive } from "vue";
export default {
  components: {
    globalBar,
    sector,
    chainMap,
    hotnation,
    cityList,
    ratio,
    totalData
  },
  setup() {
    return {};
  },
};
</script>
<style  scoped>
.box {
  width: 100%;
  height: 100%;
  padding: 2px;
  color: white;
}

.topbar {
  width: 100%;
  height: 50px;
  position: relative;
  display: flex;
  border-bottom: 1px solid #45474c;
}

.topbarTitle {
  text-align: center;
  font-size: 22px;
  position: absolute;
  left: 50%;
  width: 400px;
  margin-left: -200px;
  top: 50%;
  margin-top: -10px;
}

.topbartime {
  line-height: 50px;
  color: #ccc;
  font-size: 15px;
}

.layout {
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 5px;
}

.left_L {
  width: 25%;
}

.left_L_Msg {
  width: 100%;
  height: 20%;
  background: #0e1528;
  border-radius: 5px;
}

.globalBar {
  margin-top: 10px;
  width: 100%;
  height: 30%;
  background: #0e1528;
  border-radius: 5px;
}

.sector {
  margin-top: 10px;
  width: 100%;
  height: 35%;
  background: #0e1528;
  border-radius: 5px;
  position: relative;
}

.left_M {
  width: 50%;
}

.china_Map {
  margin-left: 10px;
  width: 100%;
  height: 60%;
  background: #0e1528;
  border-radius: 5px;
}

.hotnation {
  margin-top: 10px;
  margin-left: 10px;
  width: 100%;
  height: 27%;
  background: #0e1528;
  border-radius: 5px;
}

.left_R {
  width: 25%;
}

.chinaCity {
  margin-left: 20px;
  width: 92%;
  height: 88%;
  background: #0e1528;
  border-radius: 5px;
}

.proportion {
  margin-top: 10px;
  margin-left: 20px;
  width: 92%;
  height: 27%;
  background: #0e1528;
  border-radius: 5px;
}
</style>
