<script setup lang="ts">
import {onMounted, PropType, ref} from "vue";
import {GoodsResponse} from "@/api/goods/types.ts";
import {DescData} from "@arco-design/web-vue";
const props = defineProps({
  currentRow: {
    type: Object as PropType<GoodsResponse|null>,
    default: () => null
  }
})
const data = ref<DescData[]>([])

onMounted(()=>{
  data.value = [
    {
      label: '商品ID',
      value: props.currentRow!.id+""
    },
    {
      label: '商品名称',
      value: props.currentRow!.name+""
    },
    {
      label: '发布时间',
      value: props.currentRow!.inboundTime+""
    },
    {
      label: '库存量',
      value: props.currentRow!.stockpile+""
    }
  ]
})

</script>

<template>
<div>
  <a-descriptions style="margin-top: 20px" :data="data" :column="1"/>
</div>
</template>

<style scoped>

</style>