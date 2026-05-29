<template>
  <div class="shell">
    <!-- ── Top bar ── -->
    <header class="topbar">
      <div class="topbar-left">
        <!-- Sidebar collapse toggle -->
        <button class="collapse-btn" @click="toggleSidebar" :title="collapsed ? 'Expand sidebar' : 'Collapse sidebar'">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path v-if="!collapsed" d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path v-else d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>

        <div class="brand-lockup">
          <div class="brand-mark">K</div>
          <span class="brand">Kosha</span>
        </div>
      </div>

      <!-- Search -->
      <div class="search-wrap">
        <svg class="search-icon" width="12" height="12" viewBox="0 0 16 16" fill="none">
          <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" stroke-width="1.4"/>
          <path d="m10.5 10.5 4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
        <input type="text" placeholder="Search assets, people, documents…" />
        <kbd>⌘K</kbd>
      </div>

      <!-- Right controls -->
      <div class="topbar-right">
        <div class="status-chip">
          <span class="pulse-dot"></span>
          <span class="status-text">Live</span>
        </div>

        <div class="divider-v"></div>
        <div class="date-display mono">{{ today }}</div>
        <div class="divider-v"></div>

        <!-- Notifications -->
        <div class="notif-wrap" ref="notifRef">
          <button class="notif-btn" @click="showNotifs = !showNotifs" :class="{ active: showNotifs }">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span class="notif-badge">{{ notifications.length }}</span>
          </button>

          <Transition name="notif-drop">
            <div v-if="showNotifs" class="notif-panel">
              <div class="notif-head">
                <span class="notif-head-title">Aria Alerts</span>
                <span class="tag tag-gold" style="font-size:9.5px">{{ notifications.length }} new</span>
              </div>
              <div class="notif-list">
                <div
                  v-for="n in notifications" :key="n.title"
                  class="notif-item"
                  :class="`notif--${n.type}`"
                >
                  <div class="notif-accent"></div>
                  <div class="notif-body">
                    <div class="notif-title">{{ n.title }}</div>
                    <div class="notif-text">{{ n.body }}</div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- User chip -->
        <div class="user-chip">
          <div class="user-av">DB</div>
          <div class="user-info">
            <span class="user-name">Devaraj B.</span>
            <span class="user-role">Patriarch · Admin</span>
          </div>
        </div>
      </div>
    </header>

    <div class="body">
      <!-- ── Sidebar ── -->
      <nav class="sidebar" :class="{ collapsed }">
        <div class="nav-group">
          <p class="nav-label">Overview</p>
          <RouterLink to="/dashboard" class="nav-item" data-tip="Dashboard">
            <span class="nav-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>
            </span>
            <span class="nav-text">Dashboard</span>
          </RouterLink>
        </div>

        <div class="nav-group">
          <p class="nav-label">Portfolio</p>
          <RouterLink to="/assets" class="nav-item" data-tip="Assets">
            <span class="nav-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 12h6M9 16h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </span>
            <span class="nav-text">Assets</span>
          </RouterLink>
          <RouterLink to="/family" class="nav-item" data-tip="Family Office">
            <span class="nav-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </span>
            <span class="nav-text">Family Office</span>
          </RouterLink>
          <RouterLink to="/recon" class="nav-item" data-tip="Reconciliation">
            <span class="nav-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <span class="nav-text">Reconciliation</span>
            <span class="nav-badge" v-if="openRecon > 0">{{ openRecon }}</span>
          </RouterLink>
          <RouterLink to="/vault" class="nav-item" data-tip="Document Vault">
            <span class="nav-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <span class="nav-text">Document Vault</span>
          </RouterLink>
        </div>

        <div class="nav-group">
          <p class="nav-label">Intelligence</p>
          <RouterLink to="/analysis" class="nav-item" data-tip="Analysis & AI">
            <span class="nav-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </span>
            <span class="nav-text">Analysis &amp; AI</span>
          </RouterLink>
        </div>

        <div class="nav-group nav-bottom">
          <RouterLink to="/settings" class="nav-item" data-tip="Settings">
            <span class="nav-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" stroke-width="1.5"/></svg>
            </span>
            <span class="nav-text">Settings</span>
          </RouterLink>
          <button class="nav-item nav-logout" @click="auth.logout()" data-tip="Sign Out">
            <span class="nav-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <span class="nav-text">Sign Out</span>
          </button>
        </div>

        <div class="sidebar-foot">
          <span class="foot-text mono">v2.4.1 · PROD</span>
        </div>
      </nav>

      <!-- ── Main ── -->
      <main class="main">
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
    </div>
  </div>
  <ToastStack />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useWealthStore } from '../stores/wealth'
import ToastStack from './ToastStack.vue'

const auth   = useAuthStore()
const wealth = useWealthStore()
const openRecon = computed(() => wealth.reconItems.filter(r => r.status === 'open').length)

/* ── Live date ── */
const today = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date())

/* ── Sidebar collapse ── */
const collapsed = ref(localStorage.getItem('kosha-sidebar') === 'collapsed')

function toggleSidebar() {
  collapsed.value = !collapsed.value
  localStorage.setItem('kosha-sidebar', collapsed.value ? 'collapsed' : 'expanded')
}

/* ── Notifications ── */
const showNotifs = ref(false)
const notifRef   = ref(null)

const notifications = [
  { type:'gold',  title:'LTCG Harvest Window — 12 days left', body:'₹47.2 Cr in LTCG nearing 1-yr anniversary. ₹1.6 Cr tax saving before 8 Jun 2026.' },
  { type:'red',   title:'Concentration Breach', body:'Listed equity at 28% vs 25% ceiling. HDFC Bank at 9.4% — above single-name limit.' },
  { type:'steel', title:'FEMA LRS — 2 heirs have unused quota', body:'Rohan & Priya: $1.32M available before 31 Mar 2027. A2 forms drafted.' },
  { type:'green', title:'Reconciliation Closed — Bullion', body:'₹4.1L BIS variance resolved. Vault folio 091 is clean.' },
]

function onClickOutside(e) {
  if (notifRef.value && !notifRef.value.contains(e.target)) {
    showNotifs.value = false
  }
}

function onKeydown(e) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
    e.preventDefault()
    toggleSidebar()
  }
  if (e.key === 'Escape') showNotifs.value = false
}
onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('mousedown', onClickOutside)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.removeEventListener('mousedown', onClickOutside)
})

</script>

<style scoped>
.shell { display: flex; flex-direction: column; height: 100vh; overflow: hidden; }

/* ── Top bar ── */
.topbar {
  height: var(--topbar-h); flex-shrink: 0;
  display: flex; align-items: center; padding: 0 16px; gap: 12px;
  background: rgba(248, 244, 238, 0.88);
  backdrop-filter: blur(28px) saturate(1.5);
  -webkit-backdrop-filter: blur(28px) saturate(1.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.72);
  box-shadow: 0 1px 0 rgba(30, 22, 12, 0.06);
  position: relative; z-index: 10;
}

.topbar-left { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

/* Collapse toggle */
.collapse-btn {
  width: 30px; height: 30px; border-radius: var(--r);
  background: transparent; border: 1px solid var(--border);
  color: var(--text3); cursor: pointer; display: grid; place-items: center;
  transition: all .15s ease; flex-shrink: 0;
}
.collapse-btn:hover { border-color: var(--border2); color: var(--text2); background: var(--nav-hover); }

.brand-lockup { display: flex; align-items: center; gap: 8px; }
.brand-mark {
  width: 26px; height: 26px; border-radius: var(--r);
  background: var(--gold); display: grid; place-items: center;
  font-family: 'Inter', system-ui, sans-serif; font-size: 12px; font-weight: 700; color: #0A0800;
  flex-shrink: 0; letter-spacing: -.02em;
}
.brand {
  font-family: 'Inter', system-ui, sans-serif; font-weight: 600;
  font-size: 16px; color: var(--text); letter-spacing: -.03em;
}

/* Search */
.search-wrap {
  flex: 1; max-width: 360px; position: relative; display: flex; align-items: center;
  margin: 0 auto;
}
.search-icon { position: absolute; left: 11px; pointer-events: none; color: var(--text3); }
.search-wrap input {
  width: 100%; background: rgba(245, 240, 232, 0.72); border: 1px solid var(--border);
  border-radius: var(--r); padding: 6px 36px 6px 32px;
  font-size: 12.5px; color: var(--text2); outline: none;
  font-family: 'Inter', system-ui, sans-serif; transition: .15s;
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
}
.search-wrap input::placeholder { color: var(--text3); }
.search-wrap input:focus { border-color: var(--gold); color: var(--text); background: rgba(255, 252, 246, 0.88); box-shadow: 0 0 0 2px var(--gold-dim); }
kbd {
  position: absolute; right: 9px;
  font-size: 10px; color: var(--text3); background: var(--s3);
  border: 1px solid var(--border); border-radius: 3px; padding: 1px 5px;
  font-family: 'Inter', system-ui, sans-serif; pointer-events: none;
}

.topbar-right { margin-left: auto; display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

.status-chip {
  display: flex; align-items: center; gap: 6px; padding: 4px 10px;
  border-radius: 20px; background: var(--green-dim);
  border: 1px solid rgba(34,168,102,.18);
}
.pulse-dot {
  width: 5px; height: 5px; border-radius: 50%; background: var(--green); flex-shrink: 0;
  animation: pulse 2.4s infinite;
}
@keyframes pulse {
  0%   { box-shadow: 0 0 0 0 rgba(34,168,102,.55); }
  70%  { box-shadow: 0 0 0 5px rgba(34,168,102,0); }
  100% { box-shadow: 0 0 0 0 rgba(34,168,102,0); }
}
.status-text { font-size: 10px; letter-spacing: .08em; color: var(--green); font-weight: 700; text-transform: uppercase; }

.divider-v { width: 1px; height: 14px; background: var(--border); flex-shrink: 0; }
.date-display { font-size: 11.5px; color: var(--text3); letter-spacing: .04em; }

/* User chip */
.user-chip {
  display: flex; align-items: center; gap: 8px;
  padding: 4px 10px 4px 4px; border-radius: 20px;
  background: var(--s2); border: 1px solid var(--border);
  cursor: pointer; transition: .15s;
}
.user-chip:hover { border-color: var(--border2); }
.user-av {
  width: 24px; height: 24px; border-radius: 50%;
  background: linear-gradient(135deg, var(--gold) 0%, #5A3810 100%);
  display: grid; place-items: center;
  font-size: 9.5px; font-weight: 700; color: rgba(255,248,230,0.95); font-family: 'Inter', system-ui, sans-serif;
}
.user-info { display: flex; flex-direction: column; }
.user-name { font-size: 12px; font-weight: 500; line-height: 1.2; letter-spacing: -.01em; color: var(--text); }
.user-role { font-size: 9px; color: var(--text3); letter-spacing: .06em; text-transform: uppercase; }

/* ── Body layout ── */
.body { display: flex; flex: 1; overflow: hidden; }

/* ── Sidebar ── */
.sidebar {
  width: var(--sidebar-w);
  flex-shrink: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.62);
  background: rgba(250, 247, 242, 0.82);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  padding: 8px 6px 10px;
  display: flex; flex-direction: column;
  overflow: hidden;
  transition: width .22s cubic-bezier(.4,0,.2,1);
  position: relative;
}

.sidebar.collapsed { width: 56px; }

.nav-group { display: flex; flex-direction: column; gap: 1px; margin-bottom: 2px; }
.nav-bottom { margin-top: auto; }

.nav-label {
  font-size: 9px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase;
  color: var(--text3); padding: 10px 10px 5px; display: block;
  white-space: nowrap; overflow: hidden;
  transition: opacity .18s ease, max-height .22s ease, padding .22s ease;
  max-height: 32px;
}
.sidebar.collapsed .nav-label {
  opacity: 0; max-height: 0; padding-top: 0; padding-bottom: 0;
}

.nav-item {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 10px; border-radius: var(--r);
  color: var(--text3); font-size: 13px; font-weight: 400;
  text-decoration: none; transition: all .14s ease;
  cursor: pointer; background: transparent; border: none; width: 100%; text-align: left;
  font-family: 'Inter', system-ui, sans-serif; position: relative; white-space: nowrap;
  overflow: hidden;
}
.nav-item:hover { background: var(--nav-hover); color: var(--text2); }
.nav-item:hover .nav-icon { opacity: 1; }

.nav-icon { display: flex; align-items: center; flex-shrink: 0; opacity: .55; transition: opacity .14s; }

.nav-text {
  overflow: hidden; white-space: nowrap;
  transition: opacity .18s ease, max-width .22s cubic-bezier(.4,0,.2,1);
  max-width: 180px;
}
.sidebar.collapsed .nav-text { opacity: 0; max-width: 0; }

/* Collapsed tooltip */
.sidebar.collapsed .nav-item { justify-content: center; padding: 8px; }
.sidebar.collapsed .nav-item::after {
  content: attr(data-tip);
  position: absolute; left: calc(100% + 10px); top: 50%; transform: translateY(-50%);
  background: rgba(255, 253, 249, 0.95); border: 1px solid rgba(255, 255, 255, 0.80);
  border-radius: var(--r); padding: 5px 10px; font-size: 12px;
  white-space: nowrap; pointer-events: none; opacity: 0;
  transition: opacity .15s ease; z-index: 100; color: var(--text);
  box-shadow: 0 4px 16px rgba(90, 55, 10, 0.15), inset 0 1px 0 rgba(255,255,255,0.90);
  backdrop-filter: blur(12px);
}
.sidebar.collapsed .nav-item:hover::after { opacity: 1; }

/* Active state */
.router-link-active {
  color: var(--gold-soft) !important; font-weight: 500;
  background: var(--gold-dim) !important;
}
.router-link-active::before {
  content: ''; position: absolute; left: 0; top: 18%; bottom: 18%;
  width: 2px; border-radius: 0 2px 2px 0;
  background: var(--gold);
}
.router-link-active .nav-icon { opacity: 1 !important; color: var(--gold-soft); }

/* Nav badge */
.nav-badge {
  margin-left: auto; background: var(--red-dim); color: var(--red);
  border: 1px solid rgba(192,64,64,.2);
  font-size: 9.5px; font-weight: 700; padding: 1px 6px; border-radius: 8px;
  font-family: 'JetBrains Mono', monospace; flex-shrink: 0;
  transition: all .18s ease;
}
.sidebar.collapsed .nav-badge {
  position: absolute; top: 5px; right: 5px;
  width: 7px; height: 7px; padding: 0; border-radius: 50%;
  font-size: 0; min-width: 0;
}

/* Sign out */
.nav-logout { color: var(--text3) !important; }
.nav-logout:hover { background: var(--red-dim) !important; color: var(--red) !important; }
.nav-logout:hover .nav-icon { opacity: 1; color: var(--red); }

/* Sidebar footer */
.sidebar-foot {
  padding: 10px 10px 0; border-top: 1px solid var(--border); margin-top: 4px; flex-shrink: 0;
}
.foot-text {
  font-size: 9px; color: var(--text3); letter-spacing: .06em; display: block;
  white-space: nowrap; overflow: hidden;
  transition: opacity .18s ease, max-width .22s ease;
  max-width: 180px;
}
.sidebar.collapsed .foot-text { opacity: 0; max-width: 0; }

/* ── Main ── */
.main { flex: 1; overflow-y: auto; padding: 22px 26px; background: transparent; }

/* ── Notifications ── */
.notif-wrap { position: relative; }

.notif-btn {
  position: relative; width: 32px; height: 32px; border-radius: var(--r);
  background: transparent; border: 1px solid var(--border);
  color: var(--text3); cursor: pointer; display: grid; place-items: center;
  transition: all .15s ease;
}
.notif-btn:hover, .notif-btn.active { border-color: var(--border2); color: var(--text2); background: var(--nav-hover); }

.notif-badge {
  position: absolute; top: -5px; right: -5px;
  background: var(--red); color: #fff;
  font-size: 8.5px; font-weight: 700;
  min-width: 16px; height: 16px; border-radius: 8px;
  display: grid; place-items: center; padding: 0 3px;
  border: 1.5px solid var(--topbar-bg);
  font-family: 'Inter', system-ui, sans-serif;
}

.notif-panel {
  position: absolute; top: calc(100% + 8px); right: 0;
  width: 320px;
  background: rgba(255, 253, 249, 0.96);
  backdrop-filter: blur(24px) saturate(1.5);
  -webkit-backdrop-filter: blur(24px) saturate(1.5);
  border: 1px solid rgba(255,255,255,0.85);
  border-radius: 10px;
  box-shadow: 0 16px 48px rgba(90,55,10,0.18), inset 0 1px 0 rgba(255,255,255,0.95);
  overflow: hidden;
  z-index: 200;
}

.notif-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 14px 10px;
  border-bottom: 1px solid var(--border);
}
.notif-head-title { font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--text3); }

.notif-list { display: flex; flex-direction: column; }

.notif-item {
  display: flex; align-items: stretch;
  border-bottom: 1px solid var(--border);
  transition: background .13s;
}
.notif-item:last-child { border-bottom: none; }
.notif-item:hover { background: var(--s2); }

.notif-accent { width: 3px; flex-shrink: 0; }
.notif--gold  .notif-accent { background: var(--gold); }
.notif--red   .notif-accent { background: var(--red); }
.notif--steel .notif-accent { background: var(--steel); }
.notif--green .notif-accent { background: var(--green); }

.notif-body { padding: 10px 12px; flex: 1; min-width: 0; }
.notif-title { font-size: 11.5px; font-weight: 600; color: var(--text); margin-bottom: 3px; line-height: 1.3; }
.notif-text  { font-size: 10.5px; color: var(--text3); line-height: 1.45; }

/* Dropdown transition */
.notif-drop-enter-active { transition: opacity .15s ease, transform .15s cubic-bezier(.4,0,.2,1); }
.notif-drop-leave-active { transition: opacity .12s ease, transform .12s ease; }
.notif-drop-enter-from   { opacity: 0; transform: translateY(-6px) scale(.97); }
.notif-drop-leave-to     { opacity: 0; transform: translateY(-4px) scale(.98); }

/* ── Main ── */
.main { flex: 1; overflow-y: auto; padding: 22px 26px; background: transparent; }

/* Page transition */
.fade-enter-active { transition: opacity .18s ease, transform .18s ease; }
.fade-leave-active { transition: opacity .12s ease; }
.fade-enter-from { opacity: 0; transform: translateY(4px); }
.fade-leave-to   { opacity: 0; }
</style>
