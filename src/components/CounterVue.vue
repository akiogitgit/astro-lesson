<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
<template>
  <h1>Vueのコンポーネントです</h1>
  <p>{{ count }}</p>
  <button @click="count++">UP</button>
  <button @click="count--">DOWN</button>
</template>
