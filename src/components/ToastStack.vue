<template>
  <Teleport to="body">
    <div class="toast-stack">
      <TransitionGroup name="toast">
        <div v-for="t in toasts" :key="t.id" class="toast" :class="`toast--${t.type}`">
          <svg v-if="t.type === 'info'" width="13" height="13" viewBox="0 0 24 24" fill="none" class="toast-icon"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          <svg v-else-if="t.type === 'success'" width="13" height="13" viewBox="0 0 24 24" fill="none" class="toast-icon"><path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <svg v-else-if="t.type === 'warn'" width="13" height="13" viewBox="0 0 24 24" fill="none" class="toast-icon"><path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          <span>{{ t.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { useToast } from '../composables/useToast'
const { toasts } = useToast()
</script>

<style scoped>
.toast-stack {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 500;
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border: 1px solid rgba(255,255,255,0.6);
  box-shadow: 0 8px 28px rgba(90,55,10,0.16), inset 0 1px 0 rgba(255,255,255,0.9);
  max-width: 340px;
  pointer-events: auto;
}

.toast--info    { background: rgba(255,253,249,0.92); color: #1A1410; }
.toast--success { background: rgba(26,120,64,0.12);   color: #1A7840; border-color: rgba(26,120,64,0.25); }
.toast--warn    { background: rgba(136,80,26,0.12);   color: #88501A; border-color: rgba(136,80,26,0.25); }

.toast-icon { flex-shrink: 0; }

/* Transitions */
.toast-enter-active { transition: opacity .22s ease, transform .22s cubic-bezier(.4,0,.2,1); }
.toast-leave-active { transition: opacity .18s ease, transform .18s ease; }
.toast-enter-from   { opacity: 0; transform: translateX(16px); }
.toast-leave-to     { opacity: 0; transform: translateX(8px); }
.toast-move         { transition: transform .2s ease; }
</style>
