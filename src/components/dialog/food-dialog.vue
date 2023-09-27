<template>
    <div>
        <el-dialog v-model="toggle" :title="editToggle
            ? `${title}ni tahrirlash`
            : `Yangi ${title.toLowerCase()}`" width="30%" :before-close="handleClose">
            <el-form ref="foodForm" :model="food" :rules="rules" label-position="top" @submit.prevent="add(foodForm)">

                <el-form-item 
                    label="Ovqat nomi" 
                    prop="title">
                    <el-input 
                        v-model="food.title" 
                        placeholder="Ovqat nomini kiriting" />
                </el-form-item>

                <el-row 
                    :gutter="30"
                    v-for="item, index of food.products"
                    :key="index"
                     
                >
                    <el-col :span="12">
                        <el-form-item label="Mahsulotni tanlang">
                            <el-select 
                                filterable 
                                @change="set_append(item.product, index)"
                                v-model="item.product" 
                                placeholder="Ro'yxatdan tanlang">
                                <el-option v-for="item in priceprods" 
                                    :key="item._id" 
                                    :label="item.product.title" 
                                    :value="item.product._id" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Mahsulot nettosi" >
                            <el-input 
                                class="text-left" 
                                v-maska
                                @input="calc"
                                data-maska="######"
                                v-model="item.netto" >
                                <template #append>      
                                    <div>
                                        {{ item.append }}
                                    </div>
                                </template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h3 v-if="food.price">Umumiy narh: {{ food.price?.toLocaleString() }} so`m</h3>
                <!--                 
                <el-form-item label="Mahsulot" prop="product">
                    <el-select filterable v-model="food.product" placeholder="Ro'yxatdan tanlang">
                        <el-option v-for="item in products" :key="item._id" :label="item.title" :value="item._id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Mahsulot narhi" prop="price">
                    <el-input-number class="text-left" :controls="false" v-model="food.price" />
                </el-form-item> -->

            </el-form>>


            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleClose">
                        Bekor qilish
                    </el-button>
                    <el-button type="primary" @click="add(foodForm)">
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
import { useFoodStore } from '../../stores/data/food'
import { useHelperStore } from '../../stores/helpers/index'
import { useTokenStore } from '../../stores/user/token'
import { usePriceprodStore } from '../../stores/data/priceprod';
import { ElMessage } from 'element-plus';

const helperStore = useHelperStore()
const { url } = helperStore
const priceStore = usePriceprodStore()
const { priceprods } = storeToRefs(priceStore)

const store = useFoodStore()
const { new_food, save_food, get_food } = store

const food = ref({
    products: [
        {
           product: '',
           netto: 0 
        }
    ]
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
const foodForm = ref()

const dialogStore = useDialogStore();
const { toggle, editToggle } = storeToRefs(dialogStore);
const { setToggle, setEditToggle } = dialogStore;

const add = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            if (editToggle) {
                save_food(food.value)
            } else {
                new_food(food.value)
            }
            food.value = {}
            handleClose()
        } else {
            ElMessage.error('Barcha maydonlarni to\'ldiring')
        }
    })
}
 
const set_append = (_id, index) => {
    let item = priceprods.value.find(item => item.product._id == _id)
    food.value.products[index].append = item.product.miniunit
    food.value.products[inndex].append = 
        item.product.miniunit == item.product.unit 
        ? item.price 
        : item.price / 1000
}

const calc = () => {

    food.value.products = food.value.products.filter( (item,index) => {
        
    })

    if(food.value.products.at(-1).product && food.value.products.at(-1).netto > 0){
        food.value.products.push({
            product: '',
            netto: ''
        })
    }
}

const handleClose = () => {
    setEditToggle(false)
    setToggle(false)
}

watch(editToggle, async () => {
    if (editToggle.value) {
        await get_food(props.id)
            .then((res) => {
                food.value = { ...res.data }
                food.value.product = food.value.product._id
            })
    }
})

</script>

<style lang="scss" >
@import '@/styles/lib/class.scss';

.el-input-group__append, .el-input-group__prepend {
    background: #444;
    border-radius: 0 5px 5px 0px;
    box-shadow: none;
}

.el-popper.is-light {
    border: none;
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