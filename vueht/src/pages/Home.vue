<script setup>
import { ref } from 'vue'
import { showSuccessToast, showConfirmDialog, showToast } from 'vant'

const stats = ref([
  { title: '商品总数', value: 1234, icon: 'shopping-cart-o', color: '#1989fa' },
  { title: '分类数量', value: 56, icon: 'apps-o', color: '#07c160' },
  { title: '今日订单', value: 89, icon: 'orders-o', color: '#ff976a' },
  { title: '用户总数', value: 4567, icon: 'user-o', color: '#ee0a24' }
])

const recentOrders = ref([
  { id: 1, orderNo: 'ORD20240101001', customer: '张三', amount: 299, status: '已完成', time: '10:30' },
  { id: 2, orderNo: 'ORD20240101002', customer: '李四', amount: 599, status: '待发货', time: '09:15' },
  { id: 3, orderNo: 'ORD20240101003', customer: '王五', amount: 199, status: '已完成', time: '08:45' },
  { id: 4, orderNo: 'ORD20240101004', customer: '赵六', amount: 399, status: '待付款', time: '昨天' },
  { id: 5, orderNo: 'ORD20240101005', customer: '孙七', amount: 159, status: '已完成', time: '昨天' }
])

const getStatusType = (status) => {
  const map = {
    '已完成': 'success',
    '待发货': 'warning',
    '待付款': 'danger'
  }
  return map[status] || 'default'
}
</script>

<template>
  <div class="home">
    <div class="page-header">
      <h1 class="page-title">数据概览</h1>
    </div>

    <div class="stats-grid">
      <div v-for="stat in stats" :key="stat.title" class="stat-card" :style="{ borderColor: stat.color }">
        <van-icon :name="stat.icon" :color="stat.color" size="48" />
        <div class="stat-info">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-title">{{ stat.title }}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2 class="section-title">最新订单</h2>
        <van-button size="small" type="primary">查看全部</van-button>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>订单号</th>
              <th>客户</th>
              <th>金额</th>
              <th>状态</th>
              <th>时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in recentOrders" :key="order.id">
              <td class="order-no">{{ order.orderNo }}</td>
              <td class="customer">{{ order.customer }}</td>
              <td class="amount">¥{{ order.amount }}</td>
              <td>
                <van-tag :type="getStatusType(order.status)">{{ order.status }}</van-tag>
              </td>
              <td class="time">{{ order.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  align-items: center;
  border-left: 4px solid;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.stat-info {
  margin-left: 16px;
  flex: 1;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
}

.stat-title {
  font-size: 14px;
  color: #666;
}

.section {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.table-container {
  overflow-x: auto;
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
}

.order-no {
  font-family: monospace;
  color: #1989fa;
  font-weight: 500;
}

.amount {
  color: #ff4d4f;
  font-weight: 600;
}

.time {
  color: #999;
  font-size: 13px;
}
</style>