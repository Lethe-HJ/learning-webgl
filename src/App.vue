<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { ref } from 'vue'
import { ElContainer, ElAside, ElMain, ElCard, ElScrollbar } from 'element-plus'

interface Card {
  id: number
  name?: string
  router?: string
}

const cards = ref<Card[]>([
  { id: 111, name: 'hello', router: '/' },
  { id: 333 },
  { id: 444 },
  { id: 555 },
  { id: 666 },
  { id: 777 },
  { id: 888 },
  { id: 999 },
  { id: 121 },
  { id: 333 },
  { id: 231 },
  { id: 232 },
  { id: 2333 },
  { id: 243 },
  { id: 2354 },
  { id: 2233 },
  { id: 23545 },
  { id: 2312 },
])

const selectedCard = ref<Card | null>(null)
function selectCard(card: Card) {
  selectedCard.value = card
}
</script>
<template>
  <el-container class="container">
    <el-aside class="aside" width="200px">
      <el-scrollbar class="scrollbar">
        <el-card v-for="card in cards" :key="card.id" class="card" @click="selectCard(card)">
          <RouterLink :to="card.router">{{ card.name }}</RouterLink>
        </el-card>
      </el-scrollbar>
    </el-aside>
    <el-main class="main">
      <RouterView />
    </el-main>
  </el-container>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
.container {
  height: 100vh; /* 使容器的高度等于屏幕高度 */
}

.aside {
}

.scrollbar {
  overflow-y: auto;
}

.card {
  margin-bottom: 20px;
  padding: 10px;
  background: #eaeaea;
  cursor: pointer;
}

.main {
  overflow-y: auto; /* 如果右侧内容溢出可以滚动 */
  flex-grow: 1; /* 让右侧主内容区域占据剩余空间 */
}
</style>
