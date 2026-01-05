<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const active = ref(0)

const routeIndexMap = {
    '/': 0,
    '/category': 1,
    '/cart': 2,
    '/message': 3,
    '/profile': 4
}

const updateActiveByRoute = () => {
    const path = route.path
    active.value = routeIndexMap[path] ?? 0
}

const onChange = (index) => {
    const routes = ['/', '/category', '/cart', '/message', '/profile']
    const target = routes[index]
    if (target) {
      router.push(target)
    }
}

onMounted(() => {
    updateActiveByRoute()
})

watch(() => route.path, () => {
    updateActiveByRoute()
})
</script>

<template>
    <div class="tabbar-container">
        <van-tabbar v-model="active" @change="onChange" fixed placeholder>
            <van-tabbar-item icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item icon="apps-o">分类</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
            <van-tabbar-item icon="chat-o">消息</van-tabbar-item>
            <van-tabbar-item icon="user-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<style scoped>
.tabbar-container {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
}

:deep(.van-tabbar-item--active) {
    color: #1989fa !important;
}

:deep(.van-tabbar-item--active .van-tabbar-item__icon) {
    color: #1989fa !important;
}
</style>