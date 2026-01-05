<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TabBar from '@/components/TabBar.vue'

const router = useRouter()

const searchValue = ref('')

const banners = ref([
  { id: 1, image: 'https://picsum.photos/400/200?random=1' },
  { id: 2, image: 'https://picsum.photos/400/200?random=2' },
  { id: 3, image: 'https://picsum.photos/400/200?random=3' }
])

const categories = ref([
  { id: 1, name: '服饰', icon: 'https://picsum.photos/100/100?random=11' },
  { id: 2, name: '食品', icon: 'https://picsum.photos/100/100?random=12' },
  { id: 3, name: '数码', icon: 'https://picsum.photos/100/100?random=13' },
  { id: 4, name: '美妆', icon: 'https://picsum.photos/100/100?random=14' },
  { id: 5, name: '家居', icon: 'https://picsum.photos/100/100?random=15' },
  { id: 6, name: '母婴', icon: 'https://picsum.photos/100/100?random=16' },
  { id: 7, name: '运动', icon: 'https://picsum.photos/100/100?random=17' },
  { id: 8, name: '图书', icon: 'https://picsum.photos/100/100?random=18' }
])

const products = ref([
  { id: 1, name: '时尚休闲外套', price: 299, image: 'https://picsum.photos/200/200?random=21', sales: 1234 },
  { id: 2, name: '纯棉T恤', price: 99, image: 'https://picsum.photos/200/200?random=22', sales: 5678 },
  { id: 3, name: '运动鞋', price: 399, image: 'https://picsum.photos/200/200?random=23', sales: 2345 },
  { id: 4, name: '牛仔裤', price: 199, image: 'https://picsum.photos/200/200?random=24', sales: 3456 }
])

const goToDetail = (id) => {
  router.push(`/product/${id}`)
}

const onSearch = () => {
  console.log('搜索:', searchValue.value)
}
</script>

<template>
  <div class="home">
    <van-search v-model="searchValue" placeholder="搜索商品" shape="round" @search="onSearch" />

    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="banner in banners" :key="banner.id">
        <img :src="banner.image" class="banner-image" />
      </van-swipe-item>
    </van-swipe>

    <van-grid :column-num="4" :border="false" class="category-grid">
      <van-grid-item v-for="cat in categories" :key="cat.id" :icon="cat.icon" :text="cat.name" />
    </van-grid>

    <van-divider>热门推荐</van-divider>

    <van-grid :column-num="2" :border="false" class="product-grid">
      <van-grid-item v-for="product in products" :key="product.id" @click="goToDetail(product.id)">
        <div class="product-card">
          <img :src="product.image" class="product-image" />
          <div class="product-info">
            <div class="product-name">{{ product.name }}</div>
            <div class="product-price">¥{{ product.price }}</div>
            <div class="product-sales">已售{{ product.sales }}件</div>
          </div>
        </div>
      </van-grid-item>
    </van-grid>

    <TabBar />
  </div>
</template>

<style scoped>
.home {
  padding-bottom: 50px;
  background: #f5f5f5;
  min-height: 100vh;
}

.banner-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.category-grid {
  margin: 10px 0;
  background: #fff;
  padding: 10px 0;
}

.product-grid {
  padding: 0 8px;
}

.product-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin: 4px;
}

.product-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.product-info {
  padding: 8px;
}

.product-name {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-price {
  font-size: 16px;
  color: #ff4444;
  font-weight: bold;
}

.product-sales {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
</style>