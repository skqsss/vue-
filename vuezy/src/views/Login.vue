<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showSuccessToast } from 'vant'

const router = useRouter()

const activeTab = ref(0)

const loginForm = ref({
  phone: '',
  password: ''
})

const registerForm = ref({
  phone: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)

const onLogin = async () => {
  if (!loginForm.value.phone || !loginForm.value.password) {
    showToast('请填写完整信息')
    return
  }

  loading.value = true

  setTimeout(() => {
    loading.value = false
    showSuccessToast('登录成功')

    localStorage.setItem('userInfo', JSON.stringify({
      avatar: 'https://picsum.photos/100/100?random=91',
      nickname: '用户' + loginForm.value.phone.slice(-4),
      phone: loginForm.value.phone,
      balance: 99.99,
      points: 1234,
      coupons: 5
    }))

    router.push('/profile')
  }, 1000)
}

const onRegister = async () => {
  if (!registerForm.value.phone || !registerForm.value.password || !registerForm.value.confirmPassword) {
    showToast('请填写完整信息')
    return
  }

  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    showToast('两次密码不一致')
    return
  }

  loading.value = true

  setTimeout(() => {
    loading.value = false
    showSuccessToast('注册成功')

    localStorage.setItem('userInfo', JSON.stringify({
      avatar: 'https://picsum.photos/100/100?random=91',
      nickname: '用户' + registerForm.value.phone.slice(-4),
      phone: registerForm.value.phone,
      balance: 0,
      points: 0,
      coupons: 0
    }))

    router.push('/profile')
  }, 1000)
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="login">
    <van-nav-bar title="登录/注册" left-arrow @click-left="goBack" fixed />

    <div class="content">
      <div class="logo">
        <img src="https://picsum.photos/120/120?random=101" class="logo-image" />
        <div class="logo-text">微商城</div>
      </div>

      <van-tabs v-model:active="activeTab" animated>
        <van-tab title="登录">
          <van-form @submit="onLogin">
            <van-cell-group inset>
              <van-field v-model="loginForm.phone" name="phone" label="手机号" placeholder="请输入手机号"
                :rules="[{ required: true, message: '请填写手机号' }]" />
              <van-field v-model="loginForm.password" type="password" name="password" label="密码" placeholder="请输入密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
            </van-cell-group>

            <div class="button-group">
              <van-button round block type="primary" native-type="submit" :loading="loading">
                登录
              </van-button>
            </div>
          </van-form>
        </van-tab>

        <van-tab title="注册">
          <van-form @submit="onRegister">
            <van-cell-group inset>
              <van-field v-model="registerForm.phone" name="phone" label="手机号" placeholder="请输入手机号"
                :rules="[{ required: true, message: '请填写手机号' }]" />
              <van-field v-model="registerForm.password" type="password" name="password" label="密码" placeholder="请输入密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
              <van-field v-model="registerForm.confirmPassword" type="password" name="confirmPassword" label="确认密码"
                placeholder="请再次输入密码" :rules="[{ required: true, message: '请再次输入密码' }]" />
            </van-cell-group>

            <div class="button-group">
              <van-button round block type="primary" native-type="submit" :loading="loading">
                注册
              </van-button>
            </div>
          </van-form>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<style scoped>
.login {
  background: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 50px;
}

.content {
  padding-top: 46px;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
}

.logo-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.button-group {
  margin-top: 24px;
  padding: 0 16px;
}
</style>