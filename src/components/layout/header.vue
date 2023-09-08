<template>
    <header class="header">
        <div class="logo">LOGO</div>
        <el-popconfirm 
            title="Tizimdan chiqmoqchimisiz?"
            @confirm="store.logout"
        >
        <template #reference>
            <el-button type="danger">
                <el-icon>
                    <SwitchButton />
                 </el-icon>
            </el-button>
        </template>
      </el-popconfirm>
    </header>
</template>

<script setup>
import { useAuthStore } from '../../stores/user/auth';
const store = useAuthStore()

</script>

<style lang="scss" >
.el-popper.is-light {
    border: 1px solid #444 !important;
} 

@import '@/styles/components/headers.scss'

</style>