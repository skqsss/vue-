<script setup>
import { ref } from 'vue'
import { showSuccessToast, showConfirmDialog, showToast } from 'vant'

const categories = ref([
  { id: 1, name: '服饰鞋包', icon: 'bag-o', productCount: 324, status: '启用' },
  { id: 2, name: '食品生鲜', icon: 'shopping-cart-o', productCount: 256, status: '启用' },
  { id: 3, name: '数码家电', icon: 'phone-o', productCount: 189, status: '启用' },
  { id: 4, name: '美妆个护', icon: 'gem-o', productCount: 145, status: '启用' },
  { id: 5, name: '家居生活', icon: 'home-o', productCount: 98, status: '禁用' },
  { id: 6, name: '运动户外', icon: 'aim', productCount: 67, status: '启用' },
  { id: 7, name: '母婴用品', icon: 'baby-carriage-o', productCount: 45, status: '启用' },
  { id: 8, name: '图书文具', icon: 'book-o', productCount: 23, status: '禁用' }
])

const showAddDialog = ref(false)
const showEditDialog = ref(false)
const currentCategory = ref({ name: '', icon: 'bag-o', status: '启用' })

const handleAdd = () => {
  currentCategory.value = { name: '', icon: 'bag-o', status: '启用' }
  showAddDialog.value = true
}

const handleEdit = (item) => {
  currentCategory.value = { ...item }
  showEditDialog.value = true
}

const handleDelete = (item) => {
  showConfirmDialog({
    title: '提示',
    message: `确定要删除分类"${item.name}"吗？`,
  })
    .then(() => {
      const index = categories.value.findIndex(c => c.id === item.id)
      if (index !== -1) {
        categories.value.splice(index, 1)
        showSuccessToast('删除成功')
      }
    })
    .catch(() => {})
}

const handleSaveAdd = () => {
  if (!currentCategory.value.name) {
    showToast('请输入分类名称')
    return
  }
  const newId = Math.max(...categories.value.map(c => c.id)) + 1
  categories.value.push({
    id: newId,
    name: currentCategory.value.name,
    icon: currentCategory.value.icon,
    productCount: 0,
    status: currentCategory.value.status
  })
  showAddDialog.value = false
  showSuccessToast('添加成功')
}

const handleSaveEdit = () => {
  if (!currentCategory.value.name) {
    showToast('请输入分类名称')
    return
  }
  const index = categories.value.findIndex(c => c.id === currentCategory.value.id)
  if (index !== -1) {
    categories.value[index] = { ...currentCategory.value }
    showEditDialog.value = false
    showSuccessToast('修改成功')
  }
}

const handleToggleStatus = (item) => {
  const index = categories.value.findIndex(c => c.id === item.id)
  if (index !== -1) {
    categories.value[index].status = categories.value[index].status === '启用' ? '禁用' : '启用'
    showSuccessToast('状态已更新')
  }
}
</script>

<template>
  <div class="category">
    <div class="page-header">
      <h1 class="page-title">分类管理</h1>
      <van-button type="primary" size="default" @click="handleAdd" class="add-btn">
        <van-icon name="plus" />
        添加分类
      </van-button>
    </div>

    <div class="category-grid">
      <div v-for="item in categories" :key="item.id" class="category-card">
        <div class="card-header">
          <van-icon :name="item.icon" size="40" :color="item.status === '启用' ? '#1989fa' : '#999'" />
          <div class="header-info">
            <h3 class="category-name">{{ item.name }}</h3>
            <van-tag :type="item.status === '启用' ? 'success' : 'default'" size="small">
              {{ item.status }}
            </van-tag>
          </div>
        </div>
        <div class="card-body">
          <div class="info-item">
            <span class="label">商品数量：</span>
            <span class="value">{{ item.productCount }}</span>
          </div>
        </div>
        <div class="card-footer">
          <van-button size="small" type="primary" @click="handleEdit(item)">编辑</van-button>
          <van-button size="small" @click="handleToggleStatus(item)">
            {{ item.status === '启用' ? '禁用' : '启用' }}
          </van-button>
          <van-button size="small" type="danger" @click="handleDelete(item)">删除</van-button>
        </div>
      </div>
    </div>

    <van-dialog :show="showAddDialog" title="添加分类" width="500px" show-cancel-button>
      <van-field v-model="currentCategory.name" label="分类名称" placeholder="请输入分类名称" />
      <van-field name="icon" label="图标">
        <template #input>
          <van-radio-group v-model="currentCategory.icon" direction="horizontal">
            <van-radio name="bag-o">包</van-radio>
            <van-radio name="shopping-cart-o">购物车</van-radio>
            <van-radio name="phone-o">手机</van-radio>
            <van-radio name="gem-o">宝石</van-radio>
            <van-radio name="home-o">家</van-radio>
            <van-radio name="aim">目标</van-radio>
            <van-radio name="baby-carriage-o">婴儿车</van-radio>
            <van-radio name="book-o">书</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="status" label="状态">
        <template #input>
          <van-radio-group v-model="currentCategory.status" direction="horizontal">
            <van-radio name="启用">启用</van-radio>
            <van-radio name="禁用">禁用</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <template #footer>
        <van-button @click="showAddDialog = false">取消</van-button>
        <van-button type="primary" @click="handleSaveAdd">确定</van-button>
      </template>
    </van-dialog>

    <van-dialog :show="showEditDialog" title="编辑分类" width="500px" show-cancel-button>
      <van-field v-model="currentCategory.name" label="分类名称" placeholder="请输入分类名称" />
      <van-field name="icon" label="图标">
        <template #input>
          <van-radio-group v-model="currentCategory.icon" direction="horizontal">
            <van-radio name="bag-o">包</van-radio>
            <van-radio name="shopping-cart-o">购物车</van-radio>
            <van-radio name="phone-o">手机</van-radio>
            <van-radio name="gem-o">宝石</van-radio>
            <van-radio name="home-o">家</van-radio>
            <van-radio name="aim">目标</van-radio>
            <van-radio name="baby-carriage-o">婴儿车</van-radio>
            <van-radio name="book-o">书</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="status" label="状态">
        <template #input>
          <van-radio-group v-model="currentCategory.status" direction="horizontal">
            <van-radio name="启用">启用</van-radio>
            <van-radio name="禁用">禁用</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <template #footer>
        <van-button @click="showEditDialog = false">取消</van-button>
        <van-button type="primary" @click="handleSaveEdit">确定</van-button>
      </template>
    </van-dialog>
  </div>
</template>

<style scoped>
.category {
  padding: 20px;
  background: #f5f5f5;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.add-btn {
  background: #1989fa;
  border-color: #1989fa;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.category-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.category-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.card-body {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.info-item {
  font-size: 14px;
  color: #666;
}

.info-item .label {
  color: #999;
}

.info-item .value {
  color: #333;
  font-weight: 500;
}

.card-footer {
  display: flex;
  gap: 8px;
}

.card-footer .van-button {
  flex: 1;
}
</style>