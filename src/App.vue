<template>
  <LoginView v-if="!auth.isLoggedIn" />
  <AppShell v-else />
</template>

<script setup>
import { useAuthStore } from './stores/auth'
import LoginView from './views/LoginView.vue'
import AppShell from './components/AppShell.vue'
const auth = useAuthStore()
</script>
