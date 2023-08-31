<template>
    <aside>
        <el-menu
            class="el-menu-vertical-demo"
            :router="true"
            active-text-color="#FFF"
            background-color=" #242424"
            text-color=" #B3B3B3"
        >
            <el-menu-item
                v-for="(item,index) of menuLink"
                :key="index"
                :index="item.path"
            >
              <el-icon><component :is="item.icon"/></el-icon>
              <span>{{ item.title }}</span>
            </el-menu-item>
        </el-menu>
    </aside>
</template>

<script setup>

import { ref } from 'vue';
import { menuLink } from '../../router/menu';

</script>

<style lang="scss" scoped>
aside {
    width: 239px;
    height: 100%;
    padding: 15px;
    border-right: 1px solid #444;
    background: #242424;
    box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.02);

    .el-menu {
        border-right: unset;

        .el-menu-item {
            gap: 5px;
            padding: 11px;
            margin-bottom: 5px;
            line-height: 19.512px;
            font-weight: 400;
            font-size: 18px;
            opacity: 0.5;
            --el-menu-hover-bg-color: none;

            .el-icon {
                font-size: 26px;
            }
        }

        .el-menu-item:hover {
            opacity: 0.8;
            background-color: rgba(25, 157, 251, 0.053);
            border-radius: 10px;
        }

        .el-menu-item.is-active {
            background-color: rgba(25, 157, 251, 0.136);
            color: #FFF;
            border: 1px solid none;
            border-radius: 10px;
            opacity: 1;
        }

        .el-menu-item.is-active i {
            color: #0D99FF;
        }
    }
}

</style>