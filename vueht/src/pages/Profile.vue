<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog, showToast, showSuccessToast } from 'vant'

const router = useRouter()

const adminInfo = ref({})
const showPasswordDialog = ref(false)
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const menuItems = ref([
  { icon: 'setting-o', text: '系统设置', desc: '管理系统配置' },
  { icon: 'shield-o', text: '安全中心', desc: '修改密码和安全设置' },
  { icon: 'service-o', text: '帮助文档', desc: '使用说明和帮助' },
  { icon: 'info-o', text: '关于我们', desc: '版本信息' }
])

onMounted(() => {
  const info = localStorage.getItem('adminInfo')
  if (info) {
    adminInfo.value = JSON.parse(info)
  }
})

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

const handleChangePassword = () => {
  passwordForm.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
  showPasswordDialog.value = true
}

const handleSavePassword = () => {
  if (!passwordForm.value.oldPassword || !passwordForm.value.newPassword || !passwordForm.value.confirmPassword) {
    showToast('请填写完整信息')
    return
  }

  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    showToast('两次密码不一致')
    return
  }

  if (passwordForm.value.newPassword.length < 6) {
    showToast('密码长度不能少于6位')
    return
  }

  showSuccessToast('密码修改成功')
  showPasswordDialog.value = false
}

const handleMenuClick = (item) => {
  showToast(`点击了${item.text}`)
}
</script>

<template>
  <div class="profile">
    <div class="page-header">
      <h1 class="page-title">个人中心</h1>
    </div>

    <div class="profile-grid">
      <div class="profile-card">
        <div class="card-header">
          <img :src="adminInfo.avatar || 'https://picsum.photos/80/80?random=100'" class="avatar" />
          <div class="header-info">
            <h2 class="username">{{ adminInfo.nickname || '管理员' }}</h2>
            <p class="user-role">超级管理员</p>
          </div>
        </div>

        <div class="card-body">
          <div class="info-section">
            <h3 class="section-title">账号信息</h3>
            <div class="info-list">
              <div class="info-item">
                <span class="label">用户名：</span>
                <span class="value">{{ adminInfo.username || 'admin' }}</span>
              </div>
              <div class="info-item">
                <span class="label">昵称：</span>
                <span class="value">{{ adminInfo.nickname || '管理员' }}</span>
              </div>
              <div class="info-item">
                <span class="label">角色：</span>
                <span class="value">超级管理员</span>
              </div>
              <div class="info-item">
                <span class="label">登录时间：</span>
                <span class="value">2024-01-04 10:30:45</span>
              </div>
            </div>
          </div>

          <div class="info-section">
            <h3 class="section-title">安全设置</h3>
            <div class="info-list">
              <div class="info-item clickable" @click="handleChangePassword">
                <span class="label">修改密码</span>
                <van-icon name="arrow" />
              </div>
              <div class="info-item">
                <span class="label">登录设备：</span>
                <span class="value">Chrome / Windows</span>
              </div>
              <div class="info-item">
                <span class="label">上次登录：</span>
                <span class="value">2024-01-03 15:20:30</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <van-button type="danger" size="large" @click="handleLogout">退出登录</van-button>
        </div>
      </div>

      <div class="menu-section">
        <h3 class="section-title">快捷功能</h3>
        <div class="menu-grid">
          <div v-for="(item, index) in menuItems" :key="index" class="menu-item" @click="handleMenuClick(item)">
            <van-icon :name="item.icon" size="32" color="#1989fa" />
            <div class="menu-text">
              <div class="menu-title">{{ item.text }}</div>
              <div class="menu-desc">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <van-dialog v-model="showPasswordDialog" title="修改密码" width="500px" show-cancel-button>
      <van-field v-model="passwordForm.oldPassword" type="password" label="原密码" placeholder="请输入原密码" />
      <van-field v-model="passwordForm.newPassword" type="password" label="新密码" placeholder="请输入新密码" />
      <van-field v-model="passwordForm.confirmPassword" type="password" label="确认密码" placeholder="请再次输入新密码" />
      <template #footer>
        <van-button type="primary" @click="handleSavePassword">确定</van-button>
      </template>
    </van-dialog>
  </div>
</template>

<style scoped>
.profile {
  padding: 20px;
  background: #f5f5f5;
}

.page-header {
  margin-bottom: 20px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.profile-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.profile-card {
  background: #fff;
  border-radius: 8px;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px;
  display: flex;
  align-items: center;
  border-radius: 8px 8px 0 0;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
}

.header-info {
  margin-left: 16px;
  flex: 1;
}

.username {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 4px 0;
}

.user-role {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.card-body {
  padding: 24px;
}

.info-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 4px;
  font-size: 14px;
}

.info-item.clickable {
  cursor: pointer;
  transition: all 0.3s;
}

.info-item.clickable:hover {
  background: #e9ecef;
}

.info-item .label {
  color: #666;
}

.info-item .value {
  color: #333;
  font-weight: 500;
}

.card-footer {
  padding: 24px;
  border-top: 1px solid #f0f0f0;
}

.menu-section {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 20px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.menu-item:hover {
  border-color: #1989fa;
  background: #f0f9ff;
}

.menu-text {
  margin-left: 16px;
  flex: 1;
}

.menu-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.menu-desc {
  font-size: 13px;
  color: #666;
}
</style>