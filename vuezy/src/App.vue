<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f5f5f5;
}

#app {
  width: 100%;
  min-height: 100vh;
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  background: #fff; /* 为内容区域添加白色背景，突出边框效果 */
}

/* 为所有页面内容添加最大宽度限制 */
.message,
.product-detail,
.profile,
.cart,
.category,
.home,
.login,
.product-detail {
  max-width: 500px;
  margin: 0 auto;
}

/* 为TabBar组件添加样式，确保其在500px宽度内并居中显示 */
.van-tabbar {
  max-width: 500px;
  margin: 0 auto !important;
  position: relative;
  left: auto;
  right: auto;
  width: 100%;
}

/* 针对固定定位的TabBar容器进行样式调整 */
.van-tabbar--fixed {
  left: 50% !important;
  transform: translateX(-50%) !important;
  max-width: 500px;
  width: auto;
  right: auto !important;
}

/* 对TabBar的placeholder也要设置居中 */
.van-tabbar--placeholder {
  display: flex;
  justify-content: center;
}

.van-tabbar--placeholder::after {
  content: '';
  max-width: 500px;
  width: 100%;
  height: 50px;
}

</style>