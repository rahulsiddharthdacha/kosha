<template>
  <div class="dashboard">

    <!-- ══ HERO ══ -->
    <div class="hero rise">
      <div class="hero-body">
        <div class="hero-eyebrow">
          <span class="live-dot"></span>
          Total Family Net Worth
        </div>
        <div class="hero-number">
          <span class="hero-rupee">₹</span>2,847<span class="hero-frac">.3</span>
          <span class="hero-unit">Cr</span>
        </div>
        <div class="hero-meta">
          <span class="delta-up mono hero-delta">▲ +₹184.2 Cr &nbsp;·&nbsp; +6.92% YoY</span>
          <span class="hero-pipe">·</span>
          <span class="hero-note">27 May 2026 &nbsp;·&nbsp; 14 custodian feeds &nbsp;·&nbsp; FY 2025–26</span>
        </div>
      </div>

      <div class="hero-spark" aria-hidden="true">
        <svg width="180" height="52" viewBox="0 0 180 52" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--green)" stop-opacity=".18"/>
              <stop offset="100%" stop-color="var(--green)" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <polyline points="0,46 22,40 44,44 66,30 88,26 110,18 132,14 154,8 180,3 180,52 0,52"
            fill="url(#hg)" stroke="none"/>
          <polyline points="0,46 22,40 44,44 66,30 88,26 110,18 132,14 154,8 180,3"
            fill="none" stroke="var(--green)" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <div class="hero-actions">
        <button class="btn btn-ghost btn-sm" @click="toast('PDF export is not available in demo mode.', 'warn')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 15V3m0 12l-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Export PDF
        </button>
        <button class="btn btn-outline btn-sm" @click="$router.push('/assets')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          Upload Asset
        </button>
      </div>
    </div>

    <!-- ══ KPI STRIP ══ -->
    <div class="kpi-strip rise-2">

      <div class="kpi-tile" tabindex="0">
        <div class="kpi-tile-top">
          <span class="kpi-tile-label">Liquid (T+2)</span>
          <span class="kpi-dot" style="background:var(--steel)"></span>
        </div>
        <div class="kpi-tile-val mono">₹412.0 <span class="kpi-tile-unit">Cr</span></div>
        <div class="kpi-tile-sub">
          <span class="up">16 months</span> runway
        </div>
        <div class="kpi-tile-spark" aria-hidden="true">
          <svg width="100%" height="24" viewBox="0 0 100 24" preserveAspectRatio="none">
            <polyline points="0,18 18,16 36,20 54,12 72,14 90,8 100,6"
              fill="none" stroke="var(--steel)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/>
          </svg>
        </div>
      </div>

      <div class="kpi-tile" tabindex="0">
        <div class="kpi-tile-top">
          <span class="kpi-tile-label">Annual Income</span>
          <span class="kpi-dot" style="background:var(--gold)"></span>
        </div>
        <div class="kpi-tile-val mono">₹161.4 <span class="kpi-tile-unit">Cr</span></div>
        <div class="kpi-tile-sub" style="color:var(--text3)">Rent · Dividend · Coupon</div>
        <div class="kpi-tile-spark" aria-hidden="true">
          <svg width="100%" height="24" viewBox="0 0 100 24" preserveAspectRatio="none">
            <polyline points="0,20 18,18 36,16 54,14 72,12 90,10 100,8"
              fill="none" stroke="var(--gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity=".65"/>
          </svg>
        </div>
      </div>

      <div class="kpi-tile kpi-tile--alert" tabindex="0" @click="$router.push('/recon')" style="cursor:pointer">
        <div class="kpi-tile-top">
          <span class="kpi-tile-label">Open Reconciliation</span>
          <span class="tag tag-red" style="font-size:9px;padding:1px 6px">{{ openRecon }}</span>
        </div>
        <div class="kpi-tile-val mono">₹31.8 <span class="kpi-tile-unit">L</span></div>
        <div class="kpi-tile-sub">
          <span class="dn">{{ highRecon }} high</span>
          <span class="sep-dot">·</span>
          <span style="color:var(--text3)">{{ medRecon }} medium</span>
        </div>
        <div class="kpi-tile-spark" aria-hidden="true">
          <svg width="100%" height="24" viewBox="0 0 100 24" preserveAspectRatio="none">
            <polyline points="0,6 18,10 36,8 54,12 72,16 90,14 100,18"
              fill="none" stroke="var(--red)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity=".65"/>
          </svg>
        </div>
      </div>

    </div>

    <!-- ══ CHARTS ROW 1 ══ -->
    <div class="charts-row rise-3">

      <!-- Allocation -->
      <div class="card card-alloc">
        <div class="card-head">
          <div>
            <h3>Asset Allocation</h3>
            <span class="sub">Post-tax · Market value</span>
          </div>
          <span class="tag tag-gold">Balanced</span>
        </div>
        <div class="alloc-body">
          <DonutChart :data="allocData" />
          <div class="alloc-legend">
            <div
              v-for="item in allocData" :key="item.label"
              class="leg-row"
              :class="{ 'leg-hover': hoveredAlloc === item.label }"
              @mouseenter="hoveredAlloc = item.label"
              @mouseleave="hoveredAlloc = null"
            >
              <span class="leg-dot" :style="{ background: item.color }"></span>
              <span class="leg-label">{{ item.label }}</span>
              <span class="leg-bar-wrap">
                <span class="leg-bar-fill" :style="{ width: item.pct + '%', background: item.color + '60' }"></span>
              </span>
              <span class="leg-pct mono">{{ item.pct }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Trend -->
      <div class="card">
        <div class="card-head">
          <div>
            <h3>Net Worth Trend</h3>
            <span class="sub">24-month · INR Crore</span>
          </div>
          <span class="trend-badge mono">+6.92%</span>
        </div>
        <TrendChart />
      </div>

    </div>

    <!-- ══ CHARTS ROW 2 ══ -->
    <div class="charts-row rise-4">

      <!-- Cashflow -->
      <div class="card">
        <div class="card-head">
          <div>
            <h3>Monthly Cash Flow</h3>
            <span class="sub">FY 2025–26 · INR Lakh</span>
          </div>
        </div>
        <CashflowChart />
      </div>

      <!-- Alerts -->
      <div class="card card-alerts">
        <div class="card-head">
          <div>
            <h3>Aria AI · Active Alerts</h3>
            <span class="sub">{{ alerts.length }} insights need attention</span>
          </div>
          <div class="aria-badge">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="var(--gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Aria
          </div>
        </div>
        <div class="alerts-list">
          <div
            class="alert-item"
            :class="`alert-item--${a.type}`"
            v-for="a in alerts" :key="a.title"
            tabindex="0"
          >
            <div class="alert-accent"></div>
            <div class="alert-content">
              <div class="alert-title">{{ a.title }}</div>
              <div class="alert-body">{{ a.body }}</div>
            </div>
            <div class="alert-chevron">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWealthStore } from '../stores/wealth'
import { useToast } from '../composables/useToast'
import DonutChart from '../components/DonutChart.vue'
import TrendChart from '../components/TrendChart.vue'
import CashflowChart from '../components/CashflowChart.vue'

const { toast } = useToast()

const wealth = useWealthStore()
const openRecon = computed(() => wealth.reconItems.filter(r => r.status === 'open').length)
const highRecon = computed(() => wealth.reconItems.filter(r => r.status === 'open' && r.sev === 'high').length)
const medRecon  = computed(() => wealth.reconItems.filter(r => r.status === 'open' && r.sev === 'medium').length)

const hoveredAlloc = ref(null)

const allocData = [
  { label:'Listed Equity',  pct:28, color:'#4A90D9' },
  { label:'Real Estate',    pct:24, color:'#C49A3C' },
  { label:'Fixed Income',   pct:14, color:'#8A7E64' },
  { label:'Private Equity', pct:12, color:'#8B5CF6' },
  { label:'Gold & Bullion', pct:9,  color:'#D4882A' },
  { label:'Offshore',       pct:8,  color:'#2DB87A' },
  { label:'Alternatives',   pct:5,  color:'#D95050' },
]

const alerts = [
  { type:'gold',  title:'LTCG Harvest Window — 12 days left', body:'₹47.2 Cr in LTCG nearing 1-yr anniversary. ₹1.6 Cr tax saving before 8 Jun 2026.' },
  { type:'red',   title:'Concentration Breach', body:'Listed equity at 28% vs 25% ceiling. HDFC Bank at 9.4% — above 8% single-name limit.' },
  { type:'steel', title:'FEMA LRS — 2 heirs have unused quota', body:'Rohan & Priya: $1.32M available before 31 Mar 2027. A2 forms drafted.' },
  { type:'green', title:'Reconciliation Closed — Bullion', body:'₹4.1L BIS variance resolved. Vault folio 091 is clean and reconciled.' },
]
</script>

<style scoped>
.dashboard { display: flex; flex-direction: column; gap: 12px; }

/* ══ HERO ══ */
.hero {
  display: flex; align-items: center; gap: 24px;
  background: var(--s1); border: 1px solid var(--border);
  border-radius: var(--r2); padding: 28px 32px;
  position: relative; overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, var(--gold-dim), var(--gold-muted), var(--gold-dim));
  opacity: .6;
}

.hero-body { flex: 1; min-width: 0; }

.hero-eyebrow {
  display: flex; align-items: center; gap: 8px;
  font-size: 10px; font-weight: 700; letter-spacing: .14em;
  text-transform: uppercase; color: var(--text3); margin-bottom: 10px;
}
.live-dot {
  width: 6px; height: 6px; border-radius: 50%; background: var(--green); flex-shrink: 0;
  animation: pulse-g 2.4s infinite;
}
@keyframes pulse-g {
  0%  { box-shadow: 0 0 0 0 rgba(34,168,102,.6); }
  70% { box-shadow: 0 0 0 5px rgba(34,168,102,0); }
  100%{ box-shadow: 0 0 0 0 rgba(34,168,102,0); }
}

.hero-number {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(40px, 4.8vw, 58px);
  font-weight: 200;
  letter-spacing: -.05em;
  line-height: 1;
  color: var(--text);
  margin-bottom: 10px;
  font-variant-numeric: tabular-nums;
}
.hero-rupee { font-size: .58em; color: var(--text2); font-weight: 300; }
.hero-frac  { font-size: .70em; color: var(--text2); font-weight: 300; }
.hero-unit  {
  font-family: 'JetBrains Mono', monospace;
  font-size: .24em; font-weight: 400;
  color: var(--text3); letter-spacing: .08em;
  vertical-align: middle; margin-left: 6px;
}

.hero-meta {
  display: flex; align-items: center; gap: 10px;
  flex-wrap: wrap;
}
.hero-delta {
  font-size: 12.5px; font-weight: 500;
  color: var(--green);
}
.hero-pipe { color: var(--border2); }
.hero-note { font-size: 11.5px; color: var(--text3); }

.hero-spark {
  flex-shrink: 0; opacity: .9;
  display: flex; align-items: center;
}

.hero-actions { display: flex; flex-direction: column; gap: 8px; flex-shrink: 0; }

/* ══ KPI STRIP ══ */
.kpi-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.kpi-tile {
  background: var(--s1); border: 1px solid var(--border);
  border-radius: var(--r2); padding: 18px 20px;
  transition: border-color .18s ease, transform .18s ease, box-shadow .18s ease;
  outline: none;
}
.kpi-tile:hover, .kpi-tile:focus-visible {
  border-color: var(--border2);
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(0,0,0,.15);
}
.kpi-tile--alert:hover { border-color: rgba(192,64,64,.3); }

.kpi-tile-top {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 10px;
}
.kpi-tile-label {
  font-size: 11px; font-weight: 500; color: var(--text3);
  letter-spacing: .03em;
}
.kpi-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

.kpi-tile-val {
  font-size: 26px; font-weight: 250; letter-spacing: -.04em;
  color: var(--text); line-height: 1; margin-bottom: 6px;
  font-variant-numeric: tabular-nums;
}
.kpi-tile-unit { font-size: .5em; color: var(--text3); font-weight: 400; margin-left: 2px; }

.kpi-tile-sub {
  font-size: 11.5px; color: var(--text3); margin-bottom: 8px;
}
.sep-dot { color: var(--border2); margin: 0 4px; }

.kpi-tile-spark { height: 24px; }

/* ══ CHARTS ══ */
.charts-row {
  display: grid;
  grid-template-columns: 38fr 62fr;
  gap: 12px;
}
.charts-row:last-child {
  grid-template-columns: 1fr 1fr;
}

/* Allocation */
.card-alloc .alloc-body { display: flex; gap: 16px; align-items: flex-start; }
.alloc-legend { flex: 1; display: flex; flex-direction: column; gap: 7px; min-width: 0; }

.leg-row {
  display: flex; align-items: center; gap: 8px;
  padding: 4px 6px; border-radius: var(--r);
  transition: background .15s ease;
  cursor: default;
}
.leg-row:hover, .leg-row.leg-hover { background: var(--s2); }
.leg-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.leg-label { flex: 0 0 auto; font-size: 11.5px; color: var(--text2); width: 104px; }
.leg-bar-wrap {
  flex: 1; height: 3px; background: var(--s3);
  border-radius: 2px; overflow: hidden;
}
.leg-bar-fill {
  height: 100%; border-radius: 2px;
  transition: width .4s cubic-bezier(.4,0,.2,1);
}
.leg-pct { font-size: 11.5px; color: var(--text); font-weight: 500; width: 32px; text-align: right; }

/* Trend badge */
.trend-badge {
  font-size: 12px; font-weight: 500; color: var(--green);
  padding: 3px 9px; background: var(--green-dim);
  border: 1px solid rgba(34,168,102,.2); border-radius: 4px;
}

/* Aria badge */
.aria-badge {
  display: flex; align-items: center; gap: 5px;
  padding: 3px 8px; border-radius: 4px;
  background: var(--gold-dim); border: 1px solid rgba(156,116,64,.2);
  font-size: 10.5px; font-weight: 600; letter-spacing: .06em;
  color: var(--gold-soft);
}

/* ══ ALERTS ══ */
.alerts-list { display: flex; flex-direction: column; gap: 6px; }

.alert-item {
  display: flex; align-items: flex-start; gap: 0;
  border: 1px solid var(--border); border-radius: var(--r);
  overflow: hidden; transition: border-color .15s ease, transform .15s ease;
  cursor: pointer; outline: none;
}
.alert-item:hover, .alert-item:focus-visible {
  border-color: var(--border2);
  transform: translateX(2px);
}

.alert-accent {
  width: 3px; flex-shrink: 0; align-self: stretch;
  transition: opacity .15s;
}
.alert-item--gold  .alert-accent { background: var(--gold); }
.alert-item--red   .alert-accent { background: var(--red); }
.alert-item--steel .alert-accent { background: var(--steel); }
.alert-item--green .alert-accent { background: var(--green); }

.alert-item--gold  { background: var(--gold-dim); }
.alert-item--red   { background: var(--red-dim); }
.alert-item--steel { background: var(--steel-dim); }
.alert-item--green { background: var(--green-dim); }

.alert-content { flex: 1; padding: 10px 12px; min-width: 0; }
.alert-title { font-weight: 600; font-size: 12px; margin-bottom: 2px; color: var(--text); }
.alert-body  { font-size: 11.5px; color: var(--text2); line-height: 1.45; }

.alert-chevron {
  padding: 0 10px; display: flex; align-items: center;
  color: var(--text3); opacity: 0; transition: opacity .15s ease;
  flex-shrink: 0;
}
.alert-item:hover .alert-chevron { opacity: 1; }
</style>
