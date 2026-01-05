<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showSuccessToast, showFailToast } from 'vant'

const router = useRouter()

const loginForm = ref({
  username: '',
  password: ''
})

const loading = ref(false)

const handleLogin = () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    showFailToast('请输入账号和密码')
    return
  }

  loading.value = true

  setTimeout(() => {
    loading.value = false
    
    if (loginForm.value.username === 'admin' && loginForm.value.password === 'admin') {
      localStorage.setItem('adminToken', 'admin-token-123456')
      localStorage.setItem('adminInfo', JSON.stringify({
        username: 'admin',
        nickname: '管理员',
        avatar: 'https://picsum.photos/100/100?random=100'
      }))
      showSuccessToast('登录成功')
      router.push('/')
    } else {
      showFailToast('账号或密码错误')
    }
  }, 1000)
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <img src="https://picsum.photos/120/120?random=100" class="logo" />
        <h1>后台管理系统</h1>
        <p>欢迎登录</p>
      </div>

      <van-form @submit="handleLogin">
        <van-cell-group inset>
          <van-field
            v-model="loginForm.username"
            name="username"
            label="账号"
            placeholder="请输入账号"
            :rules="[{ required: true, message: '请填写账号' }]"
          />
          <van-field
            v-model="loginForm.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
      </van-form>

      <div class="login-button">
        <van-button round block type="primary" :loading="loading" @click="handleLogin">
          登录
        </van-button>
      </div>

      <div class="login-tips">
        <p>默认账号：admin</p>
        <p>默认密码：admin</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  min-height: -webkit-fill-available; /* 适配 Safari */
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  /* 确保内容不会溢出 */
  overflow: hidden;
}

.login-box {
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 12px;
  padding: 40px 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  /* 确保表单框在容器内 */
  box-sizing: border-box;
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
}

.login-header h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 8px;
}

.login-header p {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.login-button {
  margin-top: 30px;
}

.login-tips {
  margin-top: 30px;
  text-align: center;
  padding: 15px;
  background: #f7f8fa;
  border-radius: 8px;
}

.login-tips p {
  margin: 5px 0;
  font-size: 13px;
  color: #666;
}
</style>