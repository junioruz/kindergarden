<template>
    <div>
        <el-dialog v-model="toggle" :title="editToggle
                ? `${title}ni tahrirlash`
                : `Yangi ${title.toLowerCase()}`" width="30%" :before-close="handleClose">
            <el-form ref="priceprodForm" :model="priceprod" :rules="rules" label-position="top"
            @submit.prevent="add(priceprodForm)">
            <el-form-item label="Mahsulot" prop="product">
                <el-select 
                filterable 
                v-model="priceprod.product" 
                placeholder="Ro'yxatdan tanlang">
                    <el-option v-for="item in products" 
                        :key="item._id" 
                        :label="item.title" 
                        :value="item._id" 
                    />
                </el-select>
            </el-form-item> 
                <el-form-item label="Mahsulot narhi" prop="price">
                    <el-input-number 
                        class="text-left"
                        :controls="false" 
                        v-model="priceprod.price" 
                    />
                </el-form-item>
                <el-form-item label="Narh sanasini belgilang">
                    <el-date-picker
                        v-model="priceprod.data"
                        type="date"
                        placeholder="Sanani tanlang"
                    />
                </el-form-item>

            </el-form>>


            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleClose">
                        Bekor qilish
                    </el-button>
                    <el-button type="primary" @click="add(priceprodForm)">
                        Saqlash
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
const props = defineProps([
    'title',
    'id'
])

import { useDialogStore } from '../../stores/usefull/dialog'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { usePriceprodStore } from '../../stores/data/priceprod'
import { useHelperStore } from '../../stores/helpers/index'
import { useTokenStore } from '../../stores/user/token'
import { useProductStore } from '../../stores/data/product';
import { ElMessage } from 'element-plus';

const helperStore = useHelperStore()
const { url } = helperStore
const productStore = useProductStore()
const { products } = storeToRefs(productStore)

const store = usePriceprodStore()
const { new_priceprod, save_priceprod, get_priceprod } = store

const priceprod = ref({
    data: new Date()
})
const rules = ref({
    product: [
        {
            required: true,
            message: 'Mahsulotni tanlang',
            trigger: 'blur'
        }
    ],
    price: [
        {
            required: true,
            message: 'Mahsulot narxini kiriting!',
            trigger: 'change'
        }
    ]
})
const priceprodForm = ref()

const dialogStore = useDialogStore();
const { toggle, editToggle } = storeToRefs(dialogStore);
const { setToggle, setEditToggle } = dialogStore;

const add = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            if (editToggle) {
                save_priceprod(priceprod.value)
            } else {
                new_priceprod(priceprod.value)
            }
            priceprod.value = {}
            handleClose()
        } else {
            ElMessage.error('Barcha maydonlarni to\'ldiring')
        }
    })
}

const handleClose = () => {
    setEditToggle(false)
    setToggle(false)
}

watch(editToggle, async () => {
    if (editToggle.value) {
        await get_priceprod(props.id)
            .then((res) => {
                priceprod.value = { ...res.data }
                priceprod.value.product = priceprod.value.product._id
            })
    }
})

</script>

<style lang="scss" >
@import '@/styles/lib/class.scss';

.el-popper.is-light {
    border: none !important;
}

.el-popper.is-light {
    border: 1px solid #444;
    background: #242424;
}

.el-picker-panel__body {
    background: #242424;
    border: 1px solid #444;
}
.el-date-picker {
    --el-datepicker-text-color: #cfd3dc;
    --el-datepicker-off-text-color: #8d9095;
    --el-datepicker-header-text-color: #cfd3dc;
    --el-datepicker-icon-color: #e5eaf3;
    --el-datepicker-border-color: #414243;
    --el-datepicker-inner-border-color: #414243;
    --el-datepicker-inrange-bg-color: #2b2b2c;
    --el-datepicker-inrange-hover-bg-color: #2b2b2c;
    --el-datepicker-active-color: #409eff;
    --el-datepicker-hover-text-color: #409eff;
}

.el-picker-panel {
    color: #cfd3dc;
    line-height: 30px;
}

.el-date-picker__header-label {
    font-size: 16px;
    font-weight: 500;
    padding: 0 5px;
    line-height: 22px;
    text-align: center;
    cursor: pointer;
    color: #cfd3dc;
}

</style>