<template>
   <div id="showglobarBar">
     <globalBar></globalBar>
   </div>
</template>

<script>
import globalBar from '@/components/globalBar/globalBar.vue';
import {toRefs,reactive} from 'vue';
export default {
  components:{
    globalBar
  },
  setup(){
    
    return{
      
    }
  },
}
</script>
<style lang='less' scoped>
 
</style>