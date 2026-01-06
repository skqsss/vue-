<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TabBar from '@/components/TabBar.vue'

const router = useRouter()

const activeTab = ref(0)

const categories = ref([
  {
    id: 1,
    name: '服饰鞋包',
    children: [
      { id: 11, name: '男装', image: 'https://picsum.photos/100/100?random=31' },
      { id: 12, name: '女装', image: 'https://picsum.photos/100/100?random=32' },
      { id: 13, name: '鞋靴', image: 'https://picsum.photos/100/100?random=33' },
      { id: 14, name: '箱包', image: 'https://picsum.photos/100/100?random=34' },
    ],
  },
  {
    id: 2,
    name: '食品生鲜',
    children: [
      { id: 21, name: '零食', image: 'https://picsum.photos/100/100?random=41' },
      { id: 22, name: '生鲜', image: 'https://picsum.photos/100/100?random=42' },
      { id: 23, name: '饮料', image: 'https://picsum.photos/100/100?random=43' },
      { id: 24, name: '酒水', image: 'https://picsum.photos/100/100?random=44' },
    ],
  },
  {
    id: 3,
    name: '数码家电',
    children: [
      { id: 31, name: '手机', image: 'https://picsum.photos/100/100?random=51' },
      { id: 32, name: '电脑', image: 'https://picsum.photos/100/100?random=52' },
      { id: 33, name: '家电', image: 'https://picsum.photos/100/100?random=53' },
      { id: 34, name: '配件', image: 'https://picsum.photos/100/100?random=54' },
    ],
  },
  {
    id: 4,
    name: '美妆个护',
    children: [
      { id: 41, name: '彩妆', image: 'https://picsum.photos/100/100?random=61' },
      { id: 42, name: '护肤', image: 'https://picsum.photos/100/100?random=62' },
      { id: 43, name: '个护', image: 'https://picsum.photos/100/100?random=63' },
      { id: 44, name: '香水', image: 'https://picsum.photos/100/100?random=64' },
    ],
  },
])

const currentCategory = ref(categories.value[0])

const onTabChange = (index) => {
  currentCategory.value = categories.value[index]
}

const goToCategory = (id) => {
  console.log('进入分类:', id)
}
</script>

<template>
  <div class="category">
    <van-tabs v-model="activeTab" @change="onTabChange" sticky>
      <van-tab v-for="cat in categories" :key="cat.id" :title="cat.name">
        <div class="category-content">
          <van-grid :column-num="3" :border="false">
            <van-grid-item
              v-for="sub in currentCategory.children"
              :key="sub.id"
              @click="goToCategory(sub.id)"
            >
              <img :src="sub.image" class="sub-category-image" />
              <div class="sub-category-name">{{ sub.name }}</div>
            </van-grid-item>
          </van-grid>
        </div>
      </van-tab>
    </van-tabs>

    <TabBar />
  </div>
</template>

<style scoped>
.category {
  padding-bottom: 50px;
  background: #f5f5f5;
  min-height: 100vh;
}

.category-content {
  padding: 10px;
  background: #fff;
  margin-top: 10px;
}

.sub-category-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 8px;
}

.sub-category-name {
  font-size: 13px;
  color: #333;
  text-align: center;
}
</style>