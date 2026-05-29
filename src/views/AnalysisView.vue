<template>
  <div>
    <div class="page-header">
      <div>
        <h1>Analysis &amp; AI Intelligence</h1>
        <p>Powered by Aria · XIRR · Concentration · Tax · Liquidity · Scenario</p>
      </div>
      <button class="btn btn-ghost btn-sm" @click="toast('Full report generation is not available in demo mode.', 'warn')">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 15V3m0 12l-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Full Report
      </button>
    </div>

    <div class="grid-2 rise">
      <!-- XIRR table -->
      <div class="card">
        <div class="card-head">
          <div>
            <h3>XIRR by Asset Class</h3>
            <span class="sub">since-inception · absolute return</span>
          </div>
        </div>
        <table>
          <thead>
            <tr><th>Asset Class</th><th>AUM (Cr)</th><th>XIRR</th><th>Abs. Return</th><th>Horizon</th></tr>
          </thead>
          <tbody>
            <tr v-for="r in xirrRows" :key="r.class">
              <td>{{ r.class }}</td>
              <td class="mono">{{ r.aum }}</td>
              <td class="mono xirr-val" :class="parseFloat(r.xirr) >= 15 ? 'xirr-high' : parseFloat(r.xirr) >= 10 ? 'xirr-mid' : 'xirr-low'">{{ r.xirr }}</td>
              <td class="mono" style="color:var(--green)">{{ r.abs }}</td>
              <td style="color:var(--text3);font-size:12px">{{ r.horizon }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Liquidity runway -->
      <div class="card">
        <div class="card-head">
          <div>
            <h3>Liquidity Runway</h3>
            <span class="sub">liquid assets vs projected outflows</span>
          </div>
        </div>
        <div class="bar-rows">
          <div class="bar-row" v-for="item in liquidityItems" :key="item.label">
            <span class="bar-label">{{ item.label }}</span>
            <div class="bar-track">
              <div class="bar-fill" :style="{ width: `${Math.min(item.val/item.max*100,100)}%`, background: item.color }"></div>
            </div>
            <span class="bar-val mono">₹{{ item.val }} Cr</span>
          </div>
        </div>
      </div>
    </div>

    <div class="grid-2 rise-2">
      <!-- Tax harvest -->
      <div class="card">
        <div class="card-head">
          <div>
            <h3>Tax Harvest Opportunities</h3>
            <span class="sub">FY 2025-26 · LTCG / STCG buckets</span>
          </div>
        </div>
        <table>
          <thead><tr><th>Holding</th><th>Gain Type</th><th>Unrealised</th><th>Action</th></tr></thead>
          <tbody>
            <tr v-for="t in taxRows" :key="t.name">
              <td>{{ t.name }}</td>
              <td><span class="tag" :class="t.cls">{{ t.type }}</span></td>
              <td class="mono" style="color:var(--green)">{{ t.gain }}</td>
              <td><button class="btn btn-ghost btn-xs" @click="harvestAlert(t)">{{ t.action }}</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Aria alerts -->
      <div class="card">
        <div class="card-head">
          <div>
            <h3>Aria AI · Recommendations</h3>
            <span class="sub">4 active insights</span>
          </div>
          <div class="aria-badge">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="var(--gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Aria
          </div>
        </div>
        <div class="alerts-list">
          <div class="alert" :class="`alert-${a.type}`" v-for="a in aiAlerts" :key="a.title">
            <div><div class="alert-title">{{ a.title }}</div><div class="alert-body">{{ a.body }}</div></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scenario analysis -->
    <div class="card rise-3">
      <div class="card-head">
        <h3>Stress Test — Scenario Analysis</h3>
        <span class="sub">impact on ₹2,847 Cr AUM</span>
      </div>
      <div class="scenario-grid">
        <div class="scenario-card" v-for="s in scenarios" :key="s.label">
          <div class="sc-label">{{ s.label }}</div>
          <div class="sc-impact mono" :class="s.positive ? 'sc-pos' : 'sc-neg'">{{ s.impact }}</div>
          <div class="sc-pct" :class="s.positive ? 'sc-pos' : 'sc-neg'">{{ s.pct }} of AUM</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '../composables/useToast'
const { toast } = useToast()

const xirrRows = [
  { class:'Listed Equity / PMS', aum:'797.5', xirr:'18.4%', abs:'+₹124.8 Cr', horizon:'7 yr' },
  { class:'Private Equity / AIF', aum:'341.0', xirr:'27.1%', abs:'+₹74.6 Cr', horizon:'4 yr' },
  { class:'Real Estate', aum:'682.2', xirr:'11.2%', abs:'+₹198.4 Cr', horizon:'12 yr' },
  { class:'Fixed Income', aum:'398.2', xirr:'7.6%', abs:'+₹62.1 Cr', horizon:'9 yr' },
  { class:'Gold & Bullion', aum:'255.9', xirr:'14.8%', abs:'+₹78.3 Cr', horizon:'18 yr' },
  { class:'Offshore Holdings', aum:'227.6', xirr:'9.3%', abs:'+₹31.2 Cr', horizon:'4 yr' },
  { class:'Art & Alternatives', aum:'144.9', xirr:'14.0%', abs:'+₹28.9 Cr', horizon:'8 yr' },
]

const liquidityItems = [
  { label:'Cash / T+2 Liquid', val:412, max:412, color:'var(--green)' },
  { label:'30-day outflows',   val:28,  max:412, color:'var(--red)' },
  { label:'90-day outflows',   val:64,  max:412, color:'var(--amber)' },
  { label:'Fixed Income (FD)', val:398, max:412, color:'var(--blue)' },
  { label:'Equity (20% hair.)',val:510, max:638, color:'var(--blue)' },
]

const taxRows = [
  { name:'HDFC Bank · 9,400 sh',  type:'LTCG', cls:'tag-gold',  gain:'₹12.4 Cr', action:'Harvest' },
  { name:'Kotak Bank · 6,200 sh', type:'LTCG', cls:'tag-gold',  gain:'₹8.8 Cr',  action:'Harvest' },
  { name:'Infosys · 4,500 sh',    type:'STCG', cls:'tag-red',   gain:'₹6.1 Cr',  action:'Hold' },
  { name:'REC Bonds ₹50 Cr',      type:'Idx.', cls:'tag-green', gain:'₹3.8 Cr',  action:'Roll over' },
]

const aiAlerts = [
  { type:'gold',  title:'LTCG Harvest — 12 days', body:'₹47.2 Cr unrealised LTCG. Tax saving of ₹1.6 Cr available. 4-trade ladder ready.' },
  { type:'red',   title:'Concentration Breach', body:'Equity at 28% vs 25% ceiling. HDFC Bank at 9.4% — suggest paring over 2 quarters.' },
  { type:'blue',  title:'FEMA LRS — 2 heirs', body:'Rohan & Priya: $1.32M available FY26. A2 forms drafted, awaiting e-sign.' },
  { type:'green', title:'Liquidity: Adequate', body:'16-month runway. Within 12–24 month policy band. Next review: 30 Jun 2026.' },
]

const scenarios = [
  { label:'Rate +200 bps shock',       impact:'-₹48 Cr', pct:'-1.7%', positive:false },
  { label:'INR/USD -10% depreciation', impact:'+₹18 Cr', pct:'+0.6%', positive:true  },
  { label:'Nifty -30% correction',     impact:'-₹180 Cr',pct:'-6.3%', positive:false },
  { label:'Gold +20% rally',           impact:'+₹29 Cr', pct:'+1.0%', positive:true  },
  { label:'Real estate -15% dip',      impact:'-₹102 Cr',pct:'-3.6%', positive:false },
  { label:'PE mark-down -25%',         impact:'-₹85 Cr', pct:'-3.0%', positive:false },
]

function harvestAlert(t) { alert(`Harvest ladder prepared for: ${t.name}\n\nThis action would queue ${t.action === 'Hold' ? 'a review note' : 'a trade order'} for trustee sign-off.`) }
</script>

<style scoped>
.page-header {
  margin-bottom: 20px; display: flex; align-items: flex-start; justify-content: space-between;
  padding-bottom: 18px; border-bottom: 1px solid var(--border);
}
.page-header h1 { font-weight:600; font-size:20px; letter-spacing:-.03em; }
.page-header p  { font-size:12.5px; color:var(--text3); margin-top:3px; font-style:italic; }

.grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px; }

/* XIRR coloring */
.xirr-val { font-weight:500; }
.xirr-high { color: var(--green) !important; }
.xirr-mid  { color: var(--amber) !important; }
.xirr-low  { color: var(--text2) !important; }

/* Liquidity bars */
.bar-rows { display:flex; flex-direction:column; gap:16px; }
.bar-row { display:flex; align-items:center; gap:12px; }
.bar-label { font-size:12.5px; color:var(--text2); width:148px; flex-shrink:0; }
.bar-track { flex:1; height:6px; background:var(--s3); border-radius:3px; overflow:hidden; }
.bar-fill  { height:100%; border-radius:3px; transition:width 1.2s cubic-bezier(.4,0,.2,1); }
.bar-val   { font-size:12px; color:var(--text2); width:76px; text-align:right; }

/* Alerts */
.alerts-list { display:flex; flex-direction:column; gap:8px; }
.aria-badge {
  display:flex; align-items:center; gap:5px;
  padding:3px 8px; border-radius:4px;
  background:var(--gold-dim); border:1px solid rgba(196,154,60,.2);
  font-size:10.5px; font-weight:600; letter-spacing:.06em; color:var(--gold-soft);
}

/* Scenarios */
.scenario-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
.scenario-card { background:var(--s2); border:1px solid var(--border); border-radius:var(--r); padding:16px 18px; }
.sc-label  { font-size:12px; color:var(--text2); margin-bottom:12px; line-height:1.4; }
.sc-impact { font-family:'JetBrains Mono',monospace; font-size:22px; font-weight:300; letter-spacing:-.01em; }
.sc-pct    { font-size:12px; margin-top:3px; }
.sc-pos { color: var(--green); }
.sc-neg { color: var(--red); }
</style>
