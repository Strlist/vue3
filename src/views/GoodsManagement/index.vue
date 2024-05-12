<script lang="ts" setup>
import {ref, reactive, defineComponent} from 'vue';
import useLoading from '@/hooks/useLoading';
import {queryGoods, saveGoods,deleteGoods} from '@/api/goods';
import {GoodsRequest, GoodsResponse} from '@/api/goods/types.ts';
import {Pagination} from '@/types/global';
import type {TableColumnData} from '@arco-design/web-vue/es/table/interface';
import EditGoods from "@/views/GoodsManagement/components/EditGoods.vue";
import Details from "@/views/GoodsManagement/components/Details.vue";
import {Message} from "@arco-design/web-vue";
import { h } from 'vue';
import { Modal } from '@arco-design/web-vue';
// 搜索与渲染  开始
type Column = TableColumnData & { checked?: true };
const generateFormModel = () => {
  return {
    id: '',
    name: '',
    inboundTime: []
  };
};
const {loading, setLoading} = useLoading(true);
const renderData = ref<GoodsResponse[]>([]);
const formModel = ref(generateFormModel());
const cloneColumns = ref<Column[]>([
  {
    title: "序号",
    dataIndex: 'index',
    slotName: 'index'
  },
  {
    title: "商品id",
    dataIndex: 'id'
  },
  {
    title: "商品名称",
    dataIndex: 'name'
  },
  {
    title: "库存量",
    dataIndex: 'stockpile'
  },
  {
    title: "入库时间",
    dataIndex: 'inboundTime'
  },
  {
    title: "操作",
    dataIndex: 'operations',
    slotName: 'operations'
  }
]);

const basePagination: Pagination = {
  current: 1,
  pageSize: 20
};
const pagination = reactive({
  ...basePagination
});
const fetchData = async (
    params: GoodsRequest = {id: "", inboundTime: undefined, name: "", current: 1, pageSize: 20}
) => {
  setLoading(true);
  try {
    const {data} = await queryGoods(params);
    renderData.value = data.list;
    pagination.current = params.current;
    pagination.total = data.total;
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};

const search = () => {
  fetchData({
    ...basePagination,
    ...formModel.value
  } as GoodsRequest);
};
const onPageChange = (current: number) => {
  fetchData({...basePagination, current} as GoodsRequest);
};

fetchData();
const reset = () => {
  formModel.value = generateFormModel();
};
// 搜索与渲染  结束
// 添加与修改 起始
const  modalTitle = ref("")
const visible = ref(false)
const chooseType = ref("")
const currentRow = ref<GoodsResponse | null>(null)
const editGoods = ref()
const onAction = (row:GoodsResponse|null,type:string) => {
  modalTitle.value = type === "add" ? "新增商品" : type==="edit" ? "编辑商品" : "商品详情"
  chooseType.value = type
  currentRow.value = row
  visible.value = true
};

const handleBeforeOk = async () => {
  const result= await editGoods.value.getData()
  if(result){
    await saveGoods(result)
    currentRow.value = null
    visible.value = false
    await fetchData()
    Message.success("操作成功")
  }
};
// 添加与修改 结束
// 删除 起始
const onDelete = async (row:GoodsResponse) => {
  currentRow.value=row
  Modal.warning({
    content: () => h(ModalContent),
    hideCancel:false,
    hideTitle:true,
    onOk:async ()=> {
      loading.value = true
      await deleteGoods({id:currentRow.value!.id})
      await fetchData()
      loading.value = false
      Message.success("删除成功")
    },
  });
};

const ModalContent = defineComponent({
  setup() {
    return () => h('div', [
      h('p',{
        'class':'text-xl'
      }, `确定删除 ${currentRow!.value!.name} 吗？`),
    ]);
  }
});
// 删除 结束
</script>
<template>

  <div class="w-full">
    <a-card class="mt-5 w-full" title="搜索参数" >
      <a-row>
        <a-col :flex="1">
          <a-form
              :model="formModel"
              :label-col-props="{ span: 6 }"
              :wrapper-col-props="{ span: 18 }"
              label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="6">
                <a-form-item
                    field="id"
                    label="商品ID"
                >
                  <a-input
                      v-model="formModel.id"
                      placeholder="请输入商品ID"
                  />
                </a-form-item>

              </a-col>
              <a-col :span="6">
                <a-form-item
                    field="name"
                    label="商品名称"
                >
                  <a-input
                      v-model="formModel.name"
                      placeholder="请输入商品名称"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                    field="inboundTime"
                    label="入库时间"
                >
                  <a-range-picker
                      v-model="formModel.inboundTime"
                      style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-space :size="18">
                  <a-button type="primary" @click="search">
                    <template #icon>
                      <icon-search/>
                    </template>
                    搜索
                  </a-button>
                  <a-button @click="reset">
                    <template #icon>
                      <icon-refresh/>
                    </template>
                    重置
                  </a-button>
                </a-space>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
      </a-row>
    </a-card>
    <a-card class="mt-5" title="数据列表">
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary" @click="onAction(null,'add')">
              <template #icon>
                <icon-plus/>
              </template>
              创建
            </a-button>
          </a-space>
        </a-col>
        <a-col
            :span="12"
            style="display: flex; align-items: center; justify-content: end"
        >
          <a-tooltip content="刷新">
            <div class="action-icon" @click="search">
              <icon-refresh size="18"/>
            </div>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-table
          row-key="id"
          :loading="loading"
          :pagination="pagination"
          :columns="cloneColumns as TableColumnData[]"
          :data="renderData"
          :bordered="false"
          size="medium"
          @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #operations="{record}">
          <a-button type="text" size="small" @click="onAction(record,'detail')">
            查看
          </a-button>
          <a-button type="text" size="small" @click="onAction(record,'edit')">
            编辑
          </a-button>
          <a-button type="text" status="danger" size="small" @click="onDelete(record)">
            删除
          </a-button>
        </template>
      </a-table>
    </a-card>
    <a-modal v-model:visible="visible" :simple="true" :width="600">
      <template #title>
        <div class="w-full">
          {{modalTitle}}
        </div>
      </template>
      <template #footer>
        <div v-if="chooseType==='detail'"></div>
        <div v-else class="text-right space-x-2">
          <a-button @click="visible=false">取消</a-button>
          <a-button type="primary" @click="handleBeforeOk()">确定</a-button>
        </div>
      </template>
      <Details v-if="chooseType==='detail'" :currentRow="currentRow"/>
      <EditGoods ref="editGoods" v-else :currentRow="currentRow"/>
    </a-modal>
  </div>
</template>



