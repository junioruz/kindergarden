<template>
    <headpage :title="title" />

    <priceprod-table @edit="edit" />

    <priceprod-dialog :title="title" :id="id" />
</template>

<script setup>

import headpage from '../../components/layout/usefull/headpage.vue'
import priceprodDialog from '../../components/dialog/priceprod-dialog.vue'
import priceprodTable from '@/components/table/priceprod-table.vue'
import { ref, onMounted } from 'vue'
import { usePriceprodStore } from '../../stores/data/priceprod';
import { useProductStore } from '../../stores/data/product';

const productStore = useProductStore()


const store = usePriceprodStore()

const title = ref('Narh')

const id = ref('')
const edit = (val) => {
    id.value = val
}

onMounted(() => {
    store.get_all_priceprods()
})


</script>

<style lang="scss" scoped></style>