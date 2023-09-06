<template>
    <div>
        <el-dialog 
            v-model="toggle" 
            :title="
            editToggle 
            ? `${title}ni tahrirlash` 
            : `Yangi ${title.toLowerCase()}`" 
            width="30%" 
            :before-close="handleClose"
        >
        <el-form 
            ref="productForm" 
            :model="product" 
            :rules="rules" 
            label-position="top"
            @submit.prevent="add(productForm)"
        >
            <el-form-item 
                label="Mahsulot nomi" 
                prop="title">
                <el-input 
                    v-model="product.title" />
            </el-form-item>
            <el-form-item 
                label="Mahsulot birligi" 
                prop="unit">
                <el-select 
                    filterable v-model="product.unit" 
                    placeholder="Ro'yxatdan tanlang">
                    <el-option v-for="item, index in units" 
                        :key="index" 
                        :label="item" 
                        :value="item" 
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="Mahsulot rasmi" prop="img">
                <el-upload 
                        v-model:file-list="product.img"
                        :headers="header.headers"
                        :action="`${url}/image/product`" 
                        list-type="picture-card"
                        :limit="1"
                        :before-upload="handleBefore"
                        :on-preview="hanlePreview"

                >
                    <el-icon>
                            <Plus />
                    </el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </el-form-item>
        </el-form>>


            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleClose">
                        Bekor qilish
                    </el-button>
                    <el-button type="primary" @click="add(productForm)">
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
import { useProductStore } from '../../stores/data/product'
import { useHelperStore } from '../../stores/helpers/index'
import { useTokenStore } from '../../stores/user/token'
import { ElMessage } from 'element-plus';

const tokenStore = useTokenStore()
const { header } = tokenStore

const helperStore = useHelperStore()
const { url } = helperStore

const store = useProductStore()

const { products, productCount, units } = storeToRefs(store)
const { new_product, save_product, get_product } = store

const product = ref({})
const rules = ref({
    title: [
        {
            required: true,
            message: 'Mahsulot nomini kiriting!',
            trigger: 'blur'
        }
    ],
    unit: [
        {
            required: true,
            message: 'Mahsulot birligini kiriting!',
            trigger: 'change'
        }
    ],
    img: [
        {
            required: true,
            message: 'Mahsulot rasmini yuklang!',
            trigger: 'blur'
        }
    ]
})
const productForm = ref()

const dialogStore = useDialogStore();
const { toggle, editToggle } = storeToRefs(dialogStore);
const { setToggle, setEditToggle } = dialogStore;

const add = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            if(editToggle){
                save_product(product.value)
            } else {
                new_product(product.value)
            }
            product.value = {}
            handleClose()
        } else {
            ElMessage.error('Barcha maydonlarni to\'ldiring')
        }
    })
}

const handleBefore = (file) => {
    if(file.size / 1024 > 500) {
        ElMessage.warning('Fayl hajmi 500 KBdan oshmasin!')
        return false
    }
}

const dialogImageUrl = ref('');
const dialogVisible = ref(false)
const hanlePreview = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
}


const handleClose = () => {
    setEditToggle(false)
    setToggle(false)
}

watch(editToggle, async () => {
    if(editToggle.value) {
        await get_product(props.id)
            .then(res => {
                product.value = { ...res.data }
                if (product.value.img) {
                    product.value.img[0].url = `${url}/${product.value.img[0].response}`
                }
        })
    }
})

</script>

<style lang="scss">
@import '@/styles/components/product-dialog.scss'
</style>