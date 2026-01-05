<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const productId = Number(route.params.id)

const product = ref({
  id: productId,
  name: '时尚休闲外套',
  price: 299,
  originalPrice: 599,
  image: 'https://picsum.photos/400/400?random=71',
  images: [
    'https://picsum.photos/400/400?random=71',
    'https://picsum.photos/400/400?random=72',
    'https://picsum.photos/400/400?random=73'
  ],
  description: '精选优质面料，舒适透气，时尚百搭。适合各种场合穿着，展现你的独特品味。',
  sales: 1234,
  stock: 99
})

const currentImage = ref(0)

const quantity = ref(1)

const showSku = ref(false)

const addToCart = () => {
  console.log('加入购物车:', product.value.id, quantity.value)
}

const buyNow = () => {
  console.log('立即购买:', product.value.id, quantity.value)
}

const onImageChange = (index) => {
  currentImage.value = index
}

const onSkuSelect = () => {
  showSku.value = true
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="product-detail">
    <van-nav-bar title="商品详情" left-arrow @click-left="goBack" fixed />

    <div class="content">
      <van-swipe @change="onImageChange" class="product-swipe">
        <van-swipe-item v-for="(img, index) in product.images" :key="index">
          <img :src="img" class="product-image" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ currentImage + 1 }}/{{ product.images.length }}</div>
        </template>
      </van-swipe>

      <div class="product-info">
        <div class="price-row">
          <span class="price">¥{{ product.price }}</span>
          <span class="original-price">¥{{ product.originalPrice }}</span>
          <span class="sales">已售{{ product.sales }}件</span>
        </div>
        <div class="product-name">{{ product.name }}</div>
      </div>

      <van-cell-group>
        <van-cell title="配送" value="快递 免运费" />
        <van-cell title="库存" :value="`库存${product.stock}件`" />
      </van-cell-group>

      <div class="description">
        <div class="title">商品详情</div>
        <div class="text">{{ product.description }}</div>
      </div>
    </div>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addToCart" />
      <van-goods-action-button type="danger" text="立即购买" @click="buyNow" />
    </van-goods-action>
  </div>
</template>

<style scoped>
.product-detail {
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

.product-swipe {
  height: 375px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.custom-indicator {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border-radius: 12px;
  font-size: 12px;
}

.product-info {
  background: #fff;
  padding: 12px;
  margin-bottom: 8px;
}

.price-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.price {
  font-size: 24px;
  color: #ff4444;
  font-weight: bold;
  margin-right: 8px;
}

.original-price {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
  margin-right: 12px;
}

.sales {
  font-size: 12px;
  color: #999;
}

.product-name {
  font-size: 16px;
  color: #333;
  line-height: 1.5;
}

.description {
  background: #fff;
  padding: 12px;
  margin-top: 8px;
}

.title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.text {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
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

/* 为goods-action设置样式，确保底部操作栏也限制在500px宽度内 */
:deep(.van-goods-action) {
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
  border-top: 1px solid #eee !important;
  box-sizing: border-box !important;
  bottom: 0 !important;
}
</style>