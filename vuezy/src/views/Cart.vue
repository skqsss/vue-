<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import TabBar from '@/components/TabBar.vue'
import { showToast } from 'vant'

const router = useRouter()

const checkedItems = ref([])

const cartItems = ref([
  {
    id: 1,
    productId: 1,
    name: '时尚休闲外套',
    price: 299,
    image: 'https://picsum.photos/100/100?random=81',
    quantity: 1,
    stock: 99,
  },
  {
    id: 2,
    productId: 2,
    name: '纯棉T恤',
    price: 99,
    image: 'https://picsum.photos/100/100?random=82',
    quantity: 2,
    stock: 50,
  },
  {
    id: 3,
    productId: 3,
    name: '运动鞋',
    price: 399,
    image: 'https://picsum.photos/100/100?random=83',
    quantity: 1,
    stock: 30,
  },
])

const checkedAll = computed({
  get: () => cartItems.value.length > 0 && checkedItems.value.length === cartItems.value.length,
  set: (value) => {
    checkedItems.value = value ? cartItems.value.map((item) => item.id) : []
  },
})

const totalPrice = computed(() => {
  return cartItems.value
    .filter((item) => checkedItems.value.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const totalCount = computed(() => {
  return checkedItems.value.length
})

const onQuantityChange = (item, value) => {
  if (value > item.stock) {
    showToast('库存不足')
    return
  }
  item.quantity = value
}

const onDelete = (id) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== id)
  checkedItems.value = checkedItems.value.filter((itemId) => itemId !== id)
}

const goToCheckout = () => {
  if (totalCount.value === 0) {
    showToast('请选择商品')
    return
  }
  console.log('结算商品:', totalCount.value, '总价:', totalPrice.value)
}

const goToProduct = (productId) => {
  router.push(`/product/${productId}`)
}
</script>

<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed />

    <div class="content">
      <div class="select-all">
        <van-checkbox v-model="checkedAll">全选</van-checkbox>
      </div>

      <van-checkbox-group v-model="checkedItems">
        <van-swipe-cell v-for="item in cartItems" :key="item.id">
          <div class="cart-item" @click="goToProduct(item.productId)">
            <van-checkbox :name="item.id" @click.stop />
            <img :src="item.image" class="item-image" />
            <div class="item-info">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-price">¥{{ item.price }}</div>
            </div>
            <van-stepper
              v-model="item.quantity"
              min="1"
              :max="item.stock"
              @click.stop
              @change="onQuantityChange(item, item.quantity)"
            />
          </div>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="onDelete(item.id)"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>

      <van-empty v-if="cartItems.length === 0" description="购物车空空如也" />
    </div>

    <van-submit-bar
      v-if="cartItems.length > 0"
      :price="totalPrice * 100"
      button-text="结算"
      @submit="goToCheckout"
      class="full-width-submit-bar"
    >
      <template #tip>
        <div>
          已选 <span style="color: #ff4444">{{ totalCount }}</span> 件商品
        </div>
      </template>
    </van-submit-bar>

    <TabBar />
  </div>
</template>

<style scoped>
.cart {
  background: #f5f5f5;
  min-height: 100vh;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.content {
  padding-top: 46px;
}

.select-all {
  background: #fff;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.cart-item {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  margin: 0 12px;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
}

.item-price {
  font-size: 16px;
  color: #ff4444;
  font-weight: bold;
}

.delete-button {
  height: 100%;
  width: 60px;
}

/* 为submit-bar设置样式，确保购物车结算栏占满整个宽度 */
:deep(.full-width-submit-bar) {
  width: 500px !important;
  max-width: 100% !important;
  margin: 0 auto;
  left: 0 !important;
  right: 0 !important;
  transform: none !important;
  position: fixed !important;
  z-index: 999 !important;
  box-sizing: border-box !important;
  border: none !important;
  padding: 0 !important;
  border-left: 1px solid #ddd !important;
  border-right: 1px solid #ddd !important;
  border-bottom: 1px solid #ddd !important;
  bottom: 50px !important;
  top: auto !important;
}

:deep(.full-width-submit-bar .van-submit-bar__content) {
  width: 100% !important;
  max-width: 100% !important;
  padding: 0 0 !important;
  box-sizing: border-box !important;
  margin: 0 !important;
  border-radius: 0 !important;
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
</style>