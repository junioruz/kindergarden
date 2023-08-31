<template>
    <headpage :title="title"/>

    <product-table @edit="edit"/>
    
    <product-dialog 
        :title="title"
        :id="id"
    />
</template>

<script setup>

import headpage from '../../components/layout/usefull/headpage.vue'
import productDialog from '../../components/dialog/product-dialog.vue'
import productTable from '@/components/table/product-table.vue'
import { ref, onMounted } from 'vue'
import { useProductStore } from '../../stores/data/product';

const store = useProductStore()

const title = ref('Mahsulot')

const id = ref('')
const edit = (val) => {
    id.value = val
}

onMounted(() => {
    store.get_all_products()
})


</script>

<style lang="scss" scoped>

</style>