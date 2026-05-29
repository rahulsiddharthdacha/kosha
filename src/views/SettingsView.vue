<template>
  <div>
    <div class="page-header">
      <div><h1>Settings &amp; Compliance</h1><p>Users, roles, access, custodian feeds, compliance status</p></div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-head"><h3>Family Access &amp; Roles</h3></div>
        <table>
          <thead><tr><th>Name</th><th>Role</th><th>Last Login</th><th>2FA</th><th>Access</th></tr></thead>
          <tbody>
            <tr v-for="m in wealth.familyMembers" :key="m.id">
              <td>
                <div style="display:flex;align-items:center;gap:8px">
                  <div class="mini-av" :style="{ background: `linear-gradient(135deg,${m.color},#0D1A10)` }">{{ m.initials }}</div>
                  {{ m.name }}
                </div>
              </td>
              <td><span class="tag" :class="roleTag(m.role_tag)">{{ m.role_tag }}</span></td>
              <td style="font-size:12px;color:var(--text2)">{{ m.last_login }}</td>
              <td><span class="tag" :class="m.twofa ? 'tag-green' : 'tag-red'">{{ m.twofa ? '✓ On' : '✗ Off' }}</span></td>
              <td>
                <span class="tag tag-gray" v-if="m.role_tag === 'Minor'">View only</span>
                <span class="tag tag-blue" v-else-if="m.role_tag === 'Patriarch'">Full access</span>
                <span class="tag tag-gold" v-else-if="m.role_tag === 'Trustee'">Trustee</span>
                <span class="tag tag-gray" v-else>Beneficiary</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card">
        <div class="card-head"><h3>Compliance Status</h3></div>
        <div class="compliance-list">
          <div class="comp-row" v-for="c in compliance" :key="c.name">
            <div class="comp-info">
              <div class="comp-name">{{ c.name }}</div>
              <div class="comp-desc">{{ c.desc }}</div>
            </div>
            <span class="tag" :class="c.cls">{{ c.status }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:16px">
      <div class="card-head"><h3>Custodian Feeds</h3><span class="sub">14 live connections</span></div>
      <table>
        <thead><tr><th>Custodian</th><th>Type</th><th>Last Sync</th><th>Status</th><th>Assets Covered</th></tr></thead>
        <tbody>
          <tr v-for="f in feeds" :key="f.name">
            <td>{{ f.name }}</td>
            <td style="color:var(--text2);font-size:12.5px">{{ f.type }}</td>
            <td style="font-size:12px;color:var(--text3)">{{ f.sync }}</td>
            <td><span class="tag" :class="f.ok ? 'tag-green' : 'tag-red'">{{ f.ok ? '● Live' : '● Error' }}</span></td>
            <td style="font-size:12.5px;color:var(--text2)">{{ f.assets }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useWealthStore } from '../stores/wealth'
const wealth = useWealthStore()

function roleTag(r) {
  if (r === 'Patriarch') return 'tag-gold'
  if (r === 'Trustee')   return 'tag-blue'
  if (r === 'Minor')     return 'tag-gray'
  return 'tag-gray'
}

const compliance = [
  { name:'SEBI Cybersecurity Framework', desc:'Audited under 2023 framework for intermediaries', status:'Compliant', cls:'tag-green' },
  { name:'DPDP Act 2023 — Consent Register', desc:'Data fiduciary role & principal request workflow active', status:'Active', cls:'tag-green' },
  { name:'RBI 2FA Mandate', desc:'Biometric + hardware key for outflows above ₹25L', status:'Enforced', cls:'tag-green' },
  { name:'FEMA / LRS Annual Reconciliation', desc:'All remittances reconciled to A2 forms & FA schedule', status:'Due Jul 31', cls:'tag-amber' },
  { name:'ISO 27001 Information Security', desc:'Certified by BSI Group — audit June 2025', status:'Valid till Jun 2026', cls:'tag-green' },
  { name:'SOC 2 Type II', desc:'Independent attestation over 12-month observation', status:'Clean opinion', cls:'tag-green' },
  { name:'Beneficial Owner Declaration (PMLA)', desc:'All entities declared under Prevention of Money Laundering Act', status:'Filed', cls:'tag-green' },
  { name:'Indian Trusts Act 1882', desc:'3 active trusts — Aiyar & Co., Mumbai as standing counsel', status:'3 trusts active', cls:'tag-blue' },
]

const feeds = [
  { name:'HDFC Bank — Private Banking', type:'SFTP · Daily', sync:'Today 04:18', ok:true, assets:'FDs, NCD, current accounts' },
  { name:'360 ONE Wealth — PMS', type:'API · Daily', sync:'Today 04:20', ok:true, assets:'PMS portfolio, 22 holdings' },
  { name:'DBS Bank Singapore', type:'SFTP · Weekly', sync:'26 May 2026', ok:true, assets:'Marina Bay Trust NAV' },
  { name:'SBI Fort Branch — Locker', type:'Manual · Quarterly', sync:'14 Apr 2026', ok:true, assets:'Bullion vault contents' },
  { name:'NSDL Depository', type:'API · Daily', sync:'Today 04:15', ok:true, assets:'Demat folios — all members' },
  { name:'EY Valuations', type:'Email · Annual', sync:'18 Apr 2026', ok:true, assets:'Cotton Mills valuation' },
  { name:'CBRE India', type:'Email · Bi-annual', sync:'14 Feb 2026', ok:true, assets:'Real estate portfolio' },
  { name:'REC Ltd — Bonds', type:'Portal · Monthly', sync:'01 May 2026', ok:false, assets:'REC bond holding' },
]
</script>

<style scoped>
.page-header { margin-bottom:22px; display:flex; align-items:flex-start; justify-content:space-between; }
.page-header h1 { font-weight:600; font-size:20px; letter-spacing:-.03em; }
.page-header p  { font-size:13px; color:var(--text2); margin-top:3px; font-style:italic; }
.grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.mini-av { width:26px; height:26px; border-radius:50%; display:grid; place-items:center; font-size:10px; font-weight:700; color:#fff; flex-shrink:0; }
.compliance-list { display:flex; flex-direction:column; gap:0; }
.comp-row { display:flex; align-items:center; justify-content:space-between; padding:12px 0; border-bottom:1px solid var(--border); gap:16px; }
.comp-row:last-child { border-bottom:none; }
.comp-name { font-size:13px; font-weight:500; margin-bottom:2px; }
.comp-desc { font-size:11.5px; color:var(--text3); }
</style>
