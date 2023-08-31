<template>
    <div class="main">
        <header-vue/>
        <div class="wrapper">
            <side/>
            <div class="content">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import headerVue from '../components/layout/header.vue';
    import side from '../components/layout/aside.vue';
</script>

<style lang="scss">
@import '@/styles/main.scss'

</style>