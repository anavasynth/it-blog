<template>
  <div class="articles-page">
    <h1>Список статей</h1>
    <div v-if="articles.length === 0">Статей ще немає</div>
    <div v-else>
      <div v-for="article in articles" :key="article.id" class="article-card">
        <img :src="article.cover" alt="" class="cover" />
        <h2>{{ article.title }}</h2>
        <p>{{ article.content }}</p>
        <p><strong>Автор:</strong> {{ article.author }} | <strong>Категорія:</strong> {{ article.category }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const { data: articles } = await useFetch(`${config.public.apiBase}/articles`);
</script>

<style scoped>
.articles-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.article-card {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 20px;
}

.cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 10px;
}
</style>