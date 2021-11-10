<template>
  <div class="cityList">
    <!-- 标题 -->
    <div class="cityList_title">中国城市境外输入</div>
    <!-- 渲染标题 -->
    <div class="listTitle">
      <div class="city">城市</div>
      <div class="peoples">境外输入</div>
    </div>
    <!-- 渲染内容 -->
    <div
      :class="index % 2 ? 'itemList1' : 'itemList2'"
      v-for="(data, index) in jwsrTop"
      :key="index"
    >
      <div class="city">{{data.name}}</div>
      <div class="peoples">{{data.jwsrNum}}</div>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive } from "vue";
import { getChain } from "@/api/index.js";
export default {
  setup() {
    const state = reactive({
      // render数据
      jwsrTop: [],
    });

    getChain().then((res) => {
      state.jwsrTop = res.data.jwsrTop;
    });
    return {
      ...toRefs(state)
    };
  },
};
</script>
<style scoped>
.cityList {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.cityList_title {
  font-size: 15px;
  padding-left: 10px;
  padding-top: 10px;
  margin-bottom: 20px;
}
.listTitle {
  display: flex;
  text-align: center;
  padding: 20px 0;
  font-size: 15px;
}

.city {
  flex: 1;
}

.peoples {
  flex: 1;
}

.itemList1 {
  display: flex;
  padding: 20px 0;
  text-align: center;
  font-size: 15px;
}

.itemList2 {
  display: flex;
  text-align: center;
  padding: 20px 0;
  background: #0f1e37;
  font-size: 15px;
}
</style>
