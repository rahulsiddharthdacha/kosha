import { ref } from 'vue'

const isDark = ref(true)

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  localStorage.setItem('kosha-theme', dark ? 'dark' : 'light')
}

export function useTheme() {
  function init() {
    const stored = localStorage.getItem('kosha-theme') || 'dark'
    isDark.value = stored === 'dark'
    applyTheme(isDark.value)
  }

  function toggle() {
    isDark.value = !isDark.value
    applyTheme(isDark.value)
  }

  return { isDark, toggle, init }
}
