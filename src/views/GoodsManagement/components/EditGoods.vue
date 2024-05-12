<script setup lang="ts">
import {onMounted, PropType, ref, watch} from "vue";
import {GoodsResponse, SaveGoodsRequest} from "@/api/goods/types.ts";

const props = defineProps({
  currentRow: {
    type: Object as PropType<GoodsResponse|null>,
    default: () => null
  }
})
const baseForm = {
  name: '',
  stockpile: undefined,
}

const form = ref<SaveGoodsRequest>({
  ...baseForm
})

const formRef=ref()

const getData=async ()=>{
  const result= await formRef.value.validate()
  if(!result){
    return {...form.value}
  }
  return undefined
}

defineExpose({
  getData
})

const rules = {
  name: [
    {
      required: true,
      message:'商品名称不能为空',
    },
  ],
  stockpile: [
    {
      required: true,
      message:'库存量不能为空',
    },
  ],
}



onMounted(()=>{
  console.log(props.currentRow);
  if(props.currentRow){
    form.value = {...props.currentRow}
  }else {
    form.value = {
      ...baseForm
    }
  }
})
watch(()=>props.currentRow, (newVal)=>{
  if(newVal){
    console.log(newVal);
    form.value = {...newVal}
  }else {
    form.value = {
      ...baseForm
    }
  }
})
</script>

<template>
  <div>
    <a-form ref="formRef" :model="form" :rules="rules">
      <a-form-item field="name" label="商品名称">
        <a-input v-model="form.name" />
      </a-form-item>
      <a-form-item field="stockpile" label="商品库存">
        <a-input-number v-model="form.stockpile" />
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>

</style>