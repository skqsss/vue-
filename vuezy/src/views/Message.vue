<script setup>
import { ref } from 'vue'
import TabBar from '@/components/TabBar.vue'

const activeTab = ref(0)

const messages = ref([
    {
        id: 1,
        type: 'order',
        title: '订单已发货',
        content: '您的订单已发货，请注意查收',
        time: '10:30',
        read: false
    },
    {
        id: 2,
        type: 'system',
        title: '系统通知',
        content: '您的账户安全等级已提升',
        time: '昨天',
        read: false
    },
    {
        id: 3,
        type: 'promotion',
        title: '限时优惠',
        content: '全场满299减50，快来抢购吧',
        time: '前天',
        read: true
    },
    {
        id: 4,
        type: 'service',
        title: '客服消息',
        content: '您好，有什么可以帮您的吗？',
        time: '3天前',
        read: true
    }
])

const unreadCount = ref(2)

const onTabChange = (index) => {
    console.log('切换标签:', index)
}

const onMessageClick = (message) => {
    message.read = true
    unreadCount.value = messages.value.filter(m => !m.read).length
    console.log('查看消息:', message.id)
}

const getTypeIcon = (type) => {
    const icons = {
        order: 'logistics',
        system: 'bell',
        promotion: 'gift-o',
        service: 'service-o'
    }
    return icons[type] || 'comment-o'
}
</script>

<template>
    <div class="message">
        <van-nav-bar title="消息中心" fixed />

        <div class="content">
            <van-tabs v-model="activeTab" @change="onTabChange" sticky offset-top="46">
                <van-tab title="全部消息">
                    <van-cell-group>
                        <van-cell v-for="message in messages" :key="message.id" :title="message.title"
                            :label="message.content" :value="message.time" :icon="getTypeIcon(message.type)" is-link
                            @click="onMessageClick(message)" :class="{ unread: !message.read }" />
                    </van-cell-group>
                </van-tab>
                <van-tab title="订单消息">
                    <van-empty description="暂无订单消息" />
                </van-tab>
                <van-tab title="系统通知">
                    <van-empty description="暂无系统通知" />
                </van-tab>
                <van-tab title="优惠活动">
                    <van-empty description="暂无优惠活动" />
                </van-tab>
            </van-tabs>
        </div>

        <TabBar />
    </div>
</template>

<style scoped>
.message {
    background: #f5f5f5;
    min-height: 100vh;
    max-width: 500px;
    margin: 0 auto;
    position: relative;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    background: #fff;
}

.content {
    padding-top: 46px;
}

.unread {
    background: #f0f9ff;
}

/* 为nav-bar设置样式，确保导航栏也限制在500px宽度内 */
:deep(.van-nav-bar) {
    width: 500px !important;
    max-width: 100% !important;
    margin: 0 auto;
    left: 0 !important;
    right: 0 !important;
    position: fixed !important;
    z-index: 999 !important;
    border: 1px solid #ddd !important;
    border-left: none !important;
    border-right: none !important;
    box-sizing: border-box !important;
}

:deep(.van-nav-bar)::after {
    display: none !important;
}

/* 为tabs组件设置样式，确保内容也限制在容器宽度内 */
:deep(.van-tabs) {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    box-sizing: border-box;
}

:deep(.van-sticky) {
    width: 500px !important;
    max-width: 100% !important;
    margin: 0 auto !important;
    left: 0 !important;
    right: 0 !important;
    box-sizing: border-box !important;
    border: 1px solid #ddd !important;
    border-left: none !important;
    border-right: none !important;
    border-top: none !important;
}
</style>