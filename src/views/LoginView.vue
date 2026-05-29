<template>
  <div class="login-page">
    <div class="bg-grid" aria-hidden="true"></div>

    <!-- Left panel — branding -->
    <div class="panel-left">
      <div class="left-content">
        <div class="seal">
          <KoshaTreasuryLogo :size="64" style="color: var(--gold)" />
        </div>

        <h1 class="brand-name">Kosha</h1>
        <p class="brand-tagline">Private Wealth Ledger</p>
        <p class="brand-sanskrit">कोश &thinsp;·&thinsp; Sanskrit for treasury</p>

        <div class="divider-h"></div>

        <div class="stats-list">
          <div class="stat-item">
            <span class="stat-val mono">₹2,847 Cr</span>
            <span class="stat-label">Assets Under Management</span>
          </div>
          <div class="stat-item">
            <span class="stat-val mono">14</span>
            <span class="stat-label">Custodian Feeds Active</span>
          </div>
          <div class="stat-item">
            <span class="stat-val mono">6</span>
            <span class="stat-label">Family Principals</span>
          </div>
        </div>

        <p class="left-foot">
          Encrypted end-to-end · DPDP Act 2023 compliant<br/>
          Mumbai · GIFT City · Singapore
        </p>
      </div>
    </div>

    <!-- Right panel — auth form -->
    <div class="panel-right">
      <div class="form-panel rise">
        <template v-if="step === 1">
          <div class="form-header">
            <h2>Sign in</h2>
            <p class="form-desc">Authorised principals and advisors only.</p>
          </div>

          <div class="form-group">
            <label>Email address</label>
            <input v-model="email" type="email" placeholder="you@family.in" @keyup.enter="toOtp" />
          </div>
          <div class="form-group">
            <label>Passphrase</label>
            <input v-model="pass" type="password" placeholder="16+ character passphrase" @keyup.enter="toOtp" />
          </div>

          <button class="btn btn-primary btn-full" @click="toOtp">
            Continue
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>

          <p class="form-note">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style="opacity:.5;flex-shrink:0"><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            Session encrypted end-to-end · DPDP Act 2023 compliant
          </p>
        </template>

        <template v-else>
          <div class="form-header">
            <h2>Two-factor verification</h2>
            <p class="form-desc">Enter the OTP sent to +91 98••••7743</p>
          </div>

          <div class="otp-group">
            <input
              v-for="(_, i) in 6"
              :key="i"
              :ref="el => otpRefs[i] = el"
              v-model="otp[i]"
              class="otp-box mono"
              maxlength="1"
              type="text"
              inputmode="numeric"
              @input="onOtpInput(i)"
              @keydown.backspace="onBackspace(i)"
            />
          </div>

          <button class="btn btn-primary btn-full" @click="doLogin">
            Verify &amp; Enter
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="otp-footer">
            <button class="resend-link" @click="resendOtp">Resend OTP</button>
            <span class="otp-hint">· expires in {{ otpCountdown }}s</span>
          </div>
          <button class="back-link" @click="step = 1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Back to sign in
          </button>
        </template>
      </div>

      <p class="right-foot">Kosha · Private Wealth Platform · v2.4.1</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import KoshaLogo from '../components/KoshaLogo.vue'
import KoshaTreasuryLogo from '../components/KoshaTreasuryLogo.vue'

const auth = useAuthStore()
const router = useRouter()

const email = ref('devaraj@mb-family.in')
const pass  = ref('')
const step  = ref(1)
const otp   = ref(['','','','','',''])
const otpRefs = ref([])
const otpCountdown = ref(120)
let countdownTimer = null

function toOtp() {
  if (!email.value) return
  step.value = 2
  startCountdown()
}

function startCountdown() {
  otpCountdown.value = 120
  clearInterval(countdownTimer)
  countdownTimer = setInterval(() => {
    if (otpCountdown.value > 0) otpCountdown.value--
    else clearInterval(countdownTimer)
  }, 1000)
}

function resendOtp() {
  otp.value = ['','','','','','']
  otpRefs.value[0]?.focus()
  startCountdown()
}

function onOtpInput(i) {
  if (otp.value[i] && i < 5) {
    otpRefs.value[i + 1]?.focus()
  }
  if (i === 5 && otp.value.every(d => d)) doLogin()
}

function onBackspace(i) {
  if (!otp.value[i] && i > 0) {
    otpRefs.value[i - 1]?.focus()
  }
}

function doLogin() {
  auth.login()
  router.push('/dashboard')
}

onUnmounted(() => clearInterval(countdownTimer))
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  background: transparent;
}

.bg-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(30,22,12,.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(30,22,12,.045) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ── Left panel ── */
.panel-left {
  width: 380px; flex-shrink: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.62);
  background: rgba(250, 247, 242, 0.78);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  display: flex; align-items: center; justify-content: center;
  padding: 60px 48px;
  position: relative; z-index: 1;
}

.left-content {
  display: flex; flex-direction: column; align-items: flex-start; width: 100%;
}

.seal {
  margin-bottom: 24px;
  filter: drop-shadow(0 0 20px rgba(122,88,48,.18));
}

.brand-name {
  font-family: 'Inter', system-ui, sans-serif; font-weight: 300;
  font-size: 48px; color: var(--text);
  letter-spacing: -.06em; line-height: 1; margin-bottom: 6px;
}

.brand-tagline {
  font-size: 10px; font-weight: 700; letter-spacing: .22em;
  text-transform: uppercase; color: var(--text3); margin-bottom: 32px;
}

.divider-h {
  width: 100%; height: 1px; margin-bottom: 28px;
  background: var(--border);
}

.stats-list { display: flex; flex-direction: column; gap: 22px; width: 100%; margin-bottom: 40px; }
.stat-item { display: flex; flex-direction: column; gap: 4px; }
.stat-val {
  font-family: 'JetBrains Mono', monospace;
  font-size: 20px; font-weight: 300; color: var(--text);
  letter-spacing: -.02em; line-height: 1;
}
.stat-label { font-size: 11px; color: var(--text3); letter-spacing: .06em; text-transform: uppercase; }

.brand-sanskrit {
  font-size: 12px; color: var(--gold-muted); letter-spacing: .08em;
  margin-bottom: 28px; font-style: italic;
}

.left-foot {
  font-size: 11px; color: var(--text3); line-height: 1.7;
  border-top: 1px solid var(--border); padding-top: 20px; width: 100%;
}

/* ── Right panel ── */
.panel-right {
  flex: 1;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 60px 40px;
  position: relative; z-index: 1;
}

.form-panel {
  width: 100%; max-width: 360px;
  background: rgba(255, 253, 249, 0.80);
  backdrop-filter: blur(28px) saturate(1.6);
  -webkit-backdrop-filter: blur(28px) saturate(1.6);
  border: 1px solid rgba(255, 255, 255, 0.85);
  border-radius: var(--r3); padding: 36px 32px;
  box-shadow: 0 24px 64px rgba(90, 55, 10, 0.18), inset 0 1px 0 rgba(255,255,255,0.95);
}

.form-header { margin-bottom: 26px; }
.form-panel h2 {
  font-family: 'Inter', system-ui, sans-serif; font-weight: 600;
  font-size: 20px; letter-spacing: -.03em; margin-bottom: 5px;
}
.form-desc { font-size: 13px; color: var(--text2); }

.form-group { display: flex; flex-direction: column; gap: 6px; margin-top: 14px; }
.form-group label { font-size: 12px; color: var(--text3); font-weight: 500; letter-spacing: .04em; }

.btn-full { width: 100%; margin-top: 22px; padding: 11px; justify-content: center; gap: 8px; }

.form-note {
  display: flex; align-items: center; gap: 6px; justify-content: center;
  text-align: center; font-size: 11px; color: var(--text3);
  margin-top: 14px; letter-spacing: .03em;
}
.demo-note { color: var(--gold-muted); font-style: italic; }

.back-link {
  display: flex; align-items: center; gap: 6px; justify-content: center;
  width: 100%; text-align: center;
  background: none; border: none; color: var(--text3);
  font-size: 12px; cursor: pointer; margin-top: 10px;
  font-family: 'Inter', system-ui, sans-serif; transition: color .15s;
}
.back-link:hover { color: var(--text2); }

.otp-footer {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  margin-top: 12px;
}
.resend-link {
  background: none; border: none; color: var(--gold-soft);
  font-size: 12px; cursor: pointer; font-family: 'Inter', system-ui, sans-serif;
  font-weight: 500; padding: 0; transition: color .15s;
}
.resend-link:hover { color: var(--gold); }
.otp-hint { font-size: 11px; color: var(--text3); }

/* OTP inputs */
.otp-group { display: flex; gap: 8px; justify-content: space-between; margin-top: 4px; }
.otp-box {
  flex: 1; min-width: 0; height: 52px;
  background: var(--s2); border: 1px solid var(--border);
  border-radius: var(--r); text-align: center;
  font-size: 22px; color: var(--text); outline: none; transition: .15s;
  font-variant-numeric: tabular-nums;
}
.otp-box:focus {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px var(--gold-dim);
  background: var(--s3);
}

.right-foot {
  position: absolute; bottom: 28px;
  font-size: 10.5px; color: var(--text3); letter-spacing: .08em;
}
</style>
