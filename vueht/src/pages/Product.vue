<script setup>
import { ref } from 'vue'
import { showSuccessToast, showConfirmDialog, showToast } from 'vant'

const products = ref([
  { id: 1, name: '时尚休闲外套', price: 299, category: '服饰鞋包', stock: 99, sales: 1234, status: '上架', image: 'https://picsum.photos/200/200?random=201' },
  { id: 2, name: '纯棉T恤', price: 99, category: '服饰鞋包', stock: 50, sales: 5678, status: '上架', image: 'https://picsum.photos/200/200?random=202' },
  { id: 3, name: '运动鞋', price: 399, category: '服饰鞋包', stock: 30, sales: 2345, status: '上架', image: 'https://picsum.photos/200/200?random=203' },
  { id: 4, name: '牛仔裤', price: 199, category: '服饰鞋包', stock: 45, sales: 3456, status: '下架', image: 'https://picsum.photos/200/200?random=204' },
  { id: 5, name: '智能手机', price: 2999, category: '数码家电', stock: 20, sales: 890, status: '上架', image: 'https://picsum.photos/200/200?random=205' },
  { id: 6, name: '笔记本电脑', price: 4999, category: '数码家电', stock: 15, sales: 456, status: '上架', image: 'https://picsum.photos/200/200?random=206' }
])

const showAddDialog = ref(false)
const showEditDialog = ref(false)
const currentProduct = ref({ name: '', price: '', category: '服饰鞋包', stock: '', status: '上架' })

const handleAdd = () => {
  currentProduct.value = { name: '', price: '', category: '服饰鞋包', stock: '', status: '上架' }
  showAddDialog.value = true
}

const handleEdit = (item) => {
  currentProduct.value = { ...item }
  showEditDialog.value = true
}

const handleDelete = (item) => {
  showConfirmDialog({
    title: '提示',
    message: `确定要删除商品"${item.name}"吗？`,
  })
    .then(() => {
      const index = products.value.findIndex(p => p.id === item.id)
      if (index !== -1) {
        products.value.splice(index, 1)
        showSuccessToast('删除成功')
      }
    })
    .catch(() => {})
}

const handleSaveAdd = () => {
  if (!currentProduct.value.name || !currentProduct.value.price || !currentProduct.value.stock) {
    showToast('请填写完整信息')
    return
  }
  const newId = Math.max(...products.value.map(p => p.id)) + 1
  products.value.push({
    id: newId,
    name: currentProduct.value.name,
    price: Number(currentProduct.value.price),
    category: currentProduct.value.category,
    stock: Number(currentProduct.value.stock),
    sales: 0,
    status: currentProduct.value.status,
    image: `https://picsum.photos/200/200?random=${newId}`
  })
  showAddDialog.value = false
  showSuccessToast('添加成功')
}

const handleSaveEdit = () => {
  if (!currentProduct.value.name || !currentProduct.value.price || !currentProduct.value.stock) {
    showToast('请填写完整信息')
    return
  }
  const index = products.value.findIndex(p => p.id === currentProduct.value.id)
  if (index !== -1) {
    products.value[index] = { ...currentProduct.value, price: Number(currentProduct.value.price), stock: Number(currentProduct.value.stock) }
    showEditDialog.value = false
    showSuccessToast('修改成功')
  }
}

const handleToggleStatus = (item) => {
  const index = products.value.findIndex(p => p.id === item.id)
  if (index !== -1) {
    products.value[index].status = products.value[index].status === '上架' ? '下架' : '上架'
    showSuccessToast('状态已更新')
  }
}
</script>

<template>
  <div class="product">
    <div class="page-header">
      <h1 class="page-title">商品管理</h1>
      <van-button type="primary" size="default" @click="handleAdd" class="add-btn">
        <van-icon name="plus" />
        添加商品
      </van-button>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th width="80">商品图片</th>
            <th width="150">商品名称</th>
            <th width="100">分类</th>
            <th width="100">价格</th>
            <th width="80">库存</th>
            <th width="80">销量</th>
            <th width="100">状态</th>
            <th width="180">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>
              <img :src="item.image" class="product-thumb" />
            </td>
            <td class="product-name">{{ item.name }}</td>
            <td class="product-category">{{ item.category }}</td>
            <td class="product-price">¥{{ item.price }}</td>
            <td class="product-stock">{{ item.stock }}</td>
            <td class="product-sales">{{ item.sales }}</td>
            <td>
              <van-tag :type="item.status === '上架' ? 'success' : 'danger'" size="small">
                {{ item.status }}
              </van-tag>
            </td>
            <td class="action-cell">
              <van-button size="small" type="primary" @click="handleEdit(item)">编辑</van-button>
              <van-button size="small" @click="handleToggleStatus(item)">
                {{ item.status === '上架' ? '下架' : '上架' }}
              </van-button>
              <van-button size="small" type="danger" @click="handleDelete(item)">删除</van-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <van-dialog :show="showAddDialog" title="添加商品" width="600px" show-cancel-button>
      <van-field v-model="currentProduct.name" label="商品名称" placeholder="请输入商品名称" />
      <van-field v-model="currentProduct.price" type="number" label="商品价格" placeholder="请输入商品价格" />
      <van-field v-model="currentProduct.stock" type="number" label="商品库存" placeholder="请输入商品库存" />
      <van-field name="category" label="商品分类">
        <template #input>
          <van-radio-group v-model="currentProduct.category" direction="horizontal">
            <van-radio name="服饰鞋包">服饰鞋包</van-radio>
            <van-radio name="食品生鲜">食品生鲜</van-radio>
            <van-radio name="数码家电">数码家电</van-radio>
            <van-radio name="美妆个护">美妆个护</van-radio>
            <van-radio name="家居生活">家居生活</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="status" label="商品状态">
        <template #input>
          <van-radio-group v-model="currentProduct.status" direction="horizontal">
            <van-radio name="上架">上架</van-radio>
            <van-radio name="下架">下架</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <template #footer>
        <van-button @click="showAddDialog = false">取消</van-button>
        <van-button type="primary" @click="handleSaveAdd">确定</van-button>
      </template>
    </van-dialog>

    <van-dialog :show="showEditDialog" title="编辑商品" width="600px" show-cancel-button>
      <van-field v-model="currentProduct.name" label="商品名称" placeholder="请输入商品名称" />
      <van-field v-model="currentProduct.price" type="number" label="商品价格" placeholder="请输入商品价格" />
      <van-field v-model="currentProduct.stock" type="number" label="商品库存" placeholder="请输入商品库存" />
      <van-field name="category" label="商品分类">
        <template #input>
          <van-radio-group v-model="currentProduct.category" direction="horizontal">
            <van-radio name="服饰鞋包">服饰鞋包</van-radio>
            <van-radio name="食品生鲜">食品生鲜</van-radio>
            <van-radio name="数码家电">数码家电</van-radio>
            <van-radio name="美妆个护">美妆个护</van-radio>
            <van-radio name="家居生活">家居生活</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="status" label="商品状态">
        <template #input>
          <van-radio-group v-model="currentProduct.status" direction="horizontal">
            <van-radio name="上架">上架</van-radio>
            <van-radio name="下架">下架</van-radio>
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
.product {
  padding: 20px;
  background: #f5f5f5;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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

.table-container {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  background: #f8f9fa;
}

.data-table th {
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #e9ecef;
}

.data-table tbody tr {
  border-bottom: 1px solid #f1f3f4;
  transition: background 0.2s;
}

.data-table tbody tr:hover {
  background: #f8f9fa;
}

.data-table td {
  padding: 12px;
  color: #666;
  vertical-align: middle;
}

.product-thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.product-name {
  font-weight: 500;
  color: #333;
}

.product-category {
  color: #666;
}

.product-price {
  color: #ff4d4f;
  font-weight: 600;
}

.product-stock {
  color: #666;
}

.product-sales {
  color: #666;
}

.action-cell {
  display: flex;
  gap: 8px;
}

.action-cell .van-button {
  flex: 1;
}
</style>