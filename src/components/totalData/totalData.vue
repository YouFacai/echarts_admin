<template>
  <div class="MsgBox">
    <!-- 第一行 -->
    <div class="firstMsg">
      <!-- 全球累计 -->
      <div class="globalSum">
        <div class="globalSum_title">全球现有确诊</div>
        <div class="globalSum_content">{{GeconNum}}</div>
      </div>
      <!-- 今日新增 -->
      <div class="addSum">
        <div class="addSum_title">全球累计确诊</div>
        <div class="addSum_content">{{Ggntotal}}</div>
      </div>
    </div>
    <!-- 第二行 -->
    <div class="twetMsg">
      <!-- 中国累计 -->
      <div class="CSum">
        <div class="C_title">中国现有确诊</div>
        <div class="C_content">{{CeconNum}}</div>
      </div>
      <!-- 中国新增 -->
      <div class="CaddSum">
        <div class="CaddSum_title">中国累计确诊</div>
        <div class="CaddSum_content">{{Cgntotal}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getChain,globalBarData } from "@/api/index.js";
import { toRefs, reactive } from "vue";
export default {
  setup() {
      const state = reactive({
        //   中国
          Cgntotal:'',
          CeconNum:'',
        //   世界
          Ggntotal:0,
          GeconNum:0
      })
    getChain().then((res) => {
      state.Cgntotal = res.data.gntotal
      state.CeconNum = res.data.econNum
    });

    globalBarData().then(res=>{
        
        res.forEach(item=>{
            state.Ggntotal+=item.confirm
            state.GeconNum+=item.nowConfirm
        })
    })
    return {
        ...toRefs(state)
    };
  },
};
</script>
<style scoped>
.MsgBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.firstMsg,
.twetMsg {
  display: flex;
  flex: 1;
}

.globalSum,
.addSum,
.CSum,
.CaddSum {
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.CaddSum_title,
.C_title,
.addSum_title,
.globalSum_title {
  color: #1755c8;
  margin-bottom: 5px;
}

.CaddSum_content,
.C_content,
.addSum_content,
.globalSum_content {
  color: #38d9be;
}
</style>