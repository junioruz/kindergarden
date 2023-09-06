<template>
    <div class="headpage">
        <h1 class="headpage__title"> {{ title }}lar</h1>
        <div>
            <el-button
                v-if="excel"
                @click="getExcel" 
                type="success">
                <el-icon>
                    <document/>
                </el-icon>
                Excel
            </el-button>
            <el-button 
                type="primary"
                @click="setToggle(true)"
                >
                <el-icon><plus/></el-icon>
                Yangi {{ title.toLowerCase() }}
            </el-button>
        </div>
    </div>
</template>

<script setup>
import { useDialogStore } from '../../../stores/usefull/dialog'

const dialogStore = useDialogStore()
const { setToggle } = dialogStore

    defineProps([
        'title',
        'excel'
    ])

    const emit = defineEmits([
        'excel'
    ])


    const getExcel = () => {
        emit('excel')
    }

</script>

<style lang="scss">
.headpage {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    &__title {
        color: #FFFFFF;
    }
}

</style>