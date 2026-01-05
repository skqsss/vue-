<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showConfirmDialog, showToast, showSuccessToast } from 'vant'

const router = useRouter()
const route = useRoute()

const active = ref(0)
const collapsed = ref(false)

const adminInfo = ref({})

const menuItems = ref([
  { icon: 'home-o', text: '首页', path: '/' },
  { icon: 'apps-o', text: '分类管理', path: '/category' },
  { icon: 'shopping-cart-o', text: '商品管理', path: '/product' },
  { icon: 'user-o', text: '个人中心', path: '/profile' }
])

const updateActiveMenu = () => {
  const currentPath = route.path
  const index = menuItems.value.findIndex(item => item.path === currentPath)
  if (index !== -1) {
    active.value = index
  }
}

const onMenuClick = (index) => {
  const item = menuItems.value[index]
  if (item && item.path) {
    router.push(item.path)
  }
}

const toggleCollapse = () => {
  collapsed.value = !collapsed.value
}

const handleLogout = () => {
  showConfirmDialog({
    title: '提示',
    message: '确定要退出登录吗？',
  })
    .then(() => {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminInfo')
      showSuccessToast('已退出登录')
      router.push('/login')
    })
    .catch(() => {})
}

onMounted(() => {
  const info = localStorage.getItem('adminInfo')
  if (info) {
    adminInfo.value = JSON.parse(info)
  }
  updateActiveMenu()
})

watch(() => route.path, () => {
  updateActiveMenu()
})
</script>

<template>
  <div class="layout">
    <div class="sidebar" :class="{ collapsed: collapsed }">
      <div class="logo">
        <!-- <img src="https://picsum.photos/40/40?random=100" class="logo-img" /> -->
        <span class="logo-text">后台管理系统</span>
        <van-icon name="fold" class="collapse-icon" @click="toggleCollapse" />
      </div>

      <div class="menu-container">
        <van-cell-group :border="false" class="menu-group">
          <van-cell
            v-for="(item, index) in menuItems"
            :key="index"
            :icon="item.icon"
            :title="item.text"
            :class="{ 'menu-item-active': active === index }"
            @click="onMenuClick(index)"
          />
        </van-cell-group>
      </div>

      <div class="sidebar-footer">
        <div class="user-info">
          <img :src="adminInfo.avatar || 'https://picsum.photos/32/32?random=100'" class="user-avatar" />
          <div class="user-detail">
            <span class="user-name">{{ adminInfo.nickname || '管理员' }}</span>
            <van-icon name="setting-o" class="logout-icon" @click="handleLogout" />
          </div>
        </div>
      </div>
    </div>

    <div class="main-content" :class="{ collapsed: collapsed }">
      <div class="content-wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background: #f0f2f5;
}

.sidebar {
  width: 240px;
  background: linear-gradient(180deg, #1e3c72 0%, #2a5298 100%);
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.sidebar.collapsed {
  width: 64px;
}

.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-img {
  width: 32px;
  height: 32px;
  border-radius: 4px;
}

.logo-text {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  flex: 1;
}

.collapse-icon {
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  transition: transform 0.3s;
}

.collapse-icon:hover {
  transform: rotate(180deg);
}

.menu-container {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.menu-group {
  background: transparent;
}

:deep(.van-cell) {
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  padding: 14px 16px;
  margin: 4px 0;
  border-radius: 4px;
  transition: all 0.3s;
  cursor: pointer;
}

:deep(.van-cell:hover) {
  background: rgba(255, 255, 255, 0.1);
}

:deep(.van-cell.menu-item-active) {
  background: #1890ff;
  color: #fff;
}

:deep(.van-cell__left-icon) {
  color: inherit;
  font-size: 18px;
  margin-right: 8px;
}

:deep(.van-cell__title) {
  font-size: 14px;
}

.sidebar-footer {
  margin-top: auto;
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  padding: 12px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #fff;
}

.user-detail {
  flex: 1;
  margin-left: 12px;
}

.user-name {
  font-size: 14px;
  color: #fff;
  display: block;
}

.logout-icon {
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}

.logout-icon:hover {
  transform: scale(1.1);
}

.main-content {
  flex: 1;
  background: #f0f2f5;
  overflow: hidden;
}

.main-content.collapsed {
  margin-left: 64px;
}

.content-wrapper {
  padding: 20px;
  min-height: calc(100vh - 40px);
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin: 20px;
}
</style>