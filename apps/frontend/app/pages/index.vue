<template>
  <div style="padding: 40px; text-align: center;">
    <h1>IT Blog - Тест кнопки Swagger</h1>

    <!-- Кнопка для Swagger -->
    <button @click="openSwagger">
      Відкрити Swagger UI
    </button>
  </div>
</template>

<script setup>
const openSwagger = () => {
  window.open('http://localhost:5000/api-docs', '_blank');
};
</script>

<style scoped>
button {
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  transition: background 0.2s;
}
button:hover {
  background-color: #2563eb;
}
</style>