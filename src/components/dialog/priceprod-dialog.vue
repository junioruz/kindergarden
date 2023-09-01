<template>
    <div>
        <el-dialog v-model="toggle" :title="editToggle
                ? `${title}ni tahrirlash`
                : `Yangi ${title.toLowerCase()}`" width="30%" :before-close="handleClose">
            <el-form ref="priceprodForm" :model="priceprod" :rules="rules" label-position="top"
                @submit.prevent="add(priceprodForm)">
                <el-form-item label="Mahsulot nomi" prop="title">
                    <el-input v-model="priceprod.price" />
                </el-form-item>
                <el-form-item label="Mahsulot birligi" prop="unit">
                    <el-select 
                    filterable 
                    v-model="priceprod.product" 
                    placeholder="Ro'yxatdan tanlang">
                        <el-option v-for="item, index in units" :key="index" :label="item" :value="item" />
                    </el-select>
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
import { ElMessage } from 'element-plus';

const helperStore = useHelperStore()
const { url } = helperStore

const store = usePriceprodStore()
const { new_priceprod, save_priceprod, get_priceprod } = store

const priceprod = ref({})
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
                new_priceprod(priceprod.value)
            } else {
                save_priceprod(priceprod.value)
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
            .then(res => {
                priceprod.value = { ...res.data }
            })
    }
})

</script>

<style lang="scss">
@import '@/styles/components/product-dialog.scss'
</style>