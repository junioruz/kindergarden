<template>
    <el-table 
    :header-cell-style="{ background: '#1E1E1E' }" 
    :row-style="{ backgroundColor: '#242424' }" 
    :data="products">
        <el-table-column label="№" type="index"/>
        <el-table-column prop="title" label="Mahsulot nomi" >
            <template #default="scope">
                <div class="df align-items-center">
                    <el-image
                        class="mr-1"
                        style="width: 50px; height: 50px; border-radius: 5px;" 
                        :src="`${url}/${scope.row.img[0].response}`" 
                        fit="cover" 
                    />

                    {{ scope.row.title }}
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="unit" label="Birligi" />
        <el-table-column prop="status" label="Holati">
            <template #default="scope">
                <el-popconfirm 
                effect="dark" 
                width="188px" 
                title="Qaroringiz qat`iymi?"
                    @confirm="changeStatus(scope.row._id)">
                    <template #reference>
                        <el-button :type="scope.row.status == 1 ? 'success' : 'danger'">
                            <el-icon>
                                <check v-if="scope.row.status == 1" />
                                <close v-else />
                            </el-icon>
                        </el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
        <el-table-column width="100" align="right">
            <template #default="scope">
                <el-dropdown 
                popper-class="dark-mode-dropdown"
                effect="dark"
                style="margin-right: 20px;">
                        <el-icon style="cursor: pointer;">
                            <MoreFilled />
                        </el-icon>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="editProduct(scope.row._id)">
                                <el-icon >
                                    <edit />
                                </el-icon>
                                Tahrirlash
                            </el-dropdown-item>
                            <el-dropdown-item @click="remove(scope.row._id)">
                                <el-icon >
                                    <delete />
                                </el-icon>
                                O'chirish
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>

const emit = defineEmits([
    'edit'
])

import { useProductStore } from '../../stores/data/product';
import { useHelperStore } from '../../stores/helpers';
import { useDialogStore } from '../../stores/usefull/dialog';
import { storeToRefs } from 'pinia';
const store = useProductStore()

const helpers = useHelperStore()
const { url } = helpers


const { products } = storeToRefs(store)
const { status_product, delete_product } = store

const changeStatus = (_id) => {
    status_product(_id)
}

const remove = (_id) => {
    if (confirm('Qaroringiz qat`iymi?')){
        delete_product(_id)
    }
}

const dialog = useDialogStore()

const editProduct = (_id) => {
    emit('edit', _id)
    dialog.setToggle(true)
    dialog.setEditToggle(true)
}

</script>

<style lang="scss">
@import '@/styles/components/product-table.scss';
@import '@/styles/lib/class.scss'
</style>