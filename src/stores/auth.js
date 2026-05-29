import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const user = ref(null)
  const step = ref(1) // 1 = credentials, 2 = OTP

  function goToOtp() { step.value = 2 }

  function login() {
    isLoggedIn.value = true
    user.value = {
      name: 'Devaraj M. Bhandari',
      initials: 'DB',
      role: 'Patriarch',
      email: 'devaraj@mb-family.in',
    }
  }

  function logout() {
    isLoggedIn.value = false
    user.value = null
    step.value = 1
  }

  return { isLoggedIn, user, step, goToOtp, login, logout }
})
