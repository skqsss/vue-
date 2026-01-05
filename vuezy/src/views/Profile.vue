<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TabBar from '@/components/TabBar.vue'
import { showToast, showConfirmDialog } from 'vant'

const router = useRouter()

const isLoggedIn = ref(false)

const userInfo = ref({
    avatar: 'https://picsum.photos/100/100?random=91',
    nickname: '用户123',
    phone: '138****8888',
    balance: 99.99,
    points: 1234,
    coupons: 5
})

const orders = ref([
    { id: 1, type: 'pending', icon: 'balance-o', text: '待付款', count: 2 },
    { id: 2, type: 'delivery', icon: 'logistics', text: '待发货', count: 0 },
    { id: 3, type: 'received', icon: 'cart-o', text: '待收货', count: 1 },
    { id: 4, type: 'comment', icon: 'comment-o', text: '待评价', count: 3 },
    { id: 5, type: 'refund', icon: 'after-sale', text: '退款/售后', count: 0 }
])

const menuItems = ref([
    { id: 1, icon: 'location-o', text: '收货地址' },
    { id: 2, icon: 'star-o', text: '我的收藏' },
    { id: 3, icon: 'coupon-o', text: '优惠券' },
    { id: 4, icon: 'balance-list-o', text: '我的钱包' },
    { id: 5, icon: 'service-o', text: '联系客服' },
    { id: 6, icon: 'setting-o', text: '设置' }
])

const checkLoginStatus = () => {
    const storedUserInfo = localStorage.getItem('userInfo')
    if (storedUserInfo) {
        isLoggedIn.value = true
        userInfo.value = JSON.parse(storedUserInfo)
    } else {
        isLoggedIn.value = false
    }
}

const onLogin = () => {
    router.push('/login')
}

const onOrderClick = (type) => {
    if (!isLoggedIn.value) {
        showToast('请先登录')
        return
    }
    console.log('查看订单:', type)
}

const onMenuClick = (item) => {
    if (!isLoggedIn.value) {
        showToast('请先登录')
        return
    }
    console.log('点击菜单:', item.text)
}

const onEditProfile = () => {
    showToast('编辑个人资料')
}

const onLogout = () => {
    showConfirmDialog({
        title: '提示',
        message: '确定要退出登录吗？',
    })
        .then(() => {
            localStorage.removeItem('userInfo')
            isLoggedIn.value = false
            showToast('已退出登录')
        })
        .catch(() => {
        })
}

onMounted(() => {
    checkLoginStatus()
})
</script>

<template>
    <div class="profile">
        <div class="header">
            <div v-if="isLoggedIn" class="user-info" @click="onEditProfile">
                <img :src="userInfo.avatar" class="avatar" />
                <div class="info">
                    <div class="nickname">{{ userInfo.nickname }}</div>
                    <div class="phone">{{ userInfo.phone }}</div>
                </div>
                <van-icon name="arrow" class="arrow" />
            </div>
            <div v-else class="user-info login-prompt" @click="onLogin">
                <img src="https://picsum.photos/60/60?random=92" class="avatar empty-avatar" />
                <div class="info">
                    <div class="nickname">登录 | 注册</div>
                    <div class="phone">点击登录，享受更多服务</div>
                </div>
                <van-icon name="arrow" class="arrow" />
            </div>

            <div v-if="isLoggedIn" class="stats">
                <div class="stat-item">
                    <div class="value">{{ userInfo.balance }}</div>
                    <div class="label">余额</div>
                </div>
                <div class="stat-item">
                    <div class="value">{{ userInfo.points }}</div>
                    <div class="label">积分</div>
                </div>
                <div class="stat-item">
                    <div class="value">{{ userInfo.coupons }}</div>
                    <div class="label">优惠券</div>
                </div>
            </div>
        </div>

        <div v-if="isLoggedIn" class="orders">
            <div class="orders-header">
                <span class="title">我的订单</span>
                <span class="more">查看全部 <van-icon name="arrow" /></span>
            </div>
            <van-grid :column-num="5" :border="false">
                <van-grid-item v-for="order in orders" :key="order.id" :icon="order.icon" :text="order.text"
                    :badge="order.count > 0 ? order.count : undefined" @click="onOrderClick(order.type)" />
            </van-grid>
        </div>

        <div v-if="isLoggedIn" class="menu">
            <van-cell-group>
                <van-cell v-for="item in menuItems" :key="item.id" :title="item.text" :icon="item.icon" is-link
                    @click="onMenuClick(item)" />
            </van-cell-group>
        </div>

        <div v-if="isLoggedIn" class="logout">
            <van-button type="danger" block @click="onLogout">退出登录</van-button>
        </div>

        <TabBar />
    </div>
</template>

<style scoped>
.profile {
    background: #f5f5f5;
    min-height: 100vh;
    padding-bottom: 50px;
}

.header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px 16px;
    color: #fff;
}

.user-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;
}

.login-prompt {
    cursor: pointer;
}

.avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 12px;
    border: 2px solid #fff;
}

.empty-avatar {
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid rgba(255, 255, 255, 0.5);
}

.info {
    flex: 1;
}

.nickname {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 4px;
}

.phone {
    font-size: 14px;
    opacity: 0.8;
}

.arrow {
    font-size: 16px;
}

.stats {
    display: flex;
    justify-content: space-around;
}

.stat-item {
    text-align: center;
}

.value {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 4px;
}

.label {
    font-size: 12px;
    opacity: 0.8;
}

.orders {
    background: #fff;
    margin: 10px;
    border-radius: 8px;
    padding: 16px;
}

.orders-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
}

.more {
    font-size: 12px;
    color: #999;
    display: flex;
    align-items: center;
}

.menu {
    margin: 10px;
    border-radius: 8px;
    overflow: hidden;
}

.logout {
    margin: 20px 10px;
}
</style>