<template>
  <div>
    <div class="page-header">
      <div>
        <h1>Reconciliation Centre</h1>
        <p>Maker-checker workflow · custodian feed matching · variance resolution</p>
      </div>
      <button class="btn btn-ghost btn-sm" @click="toast('Custodian feeds refresh is not available in demo mode.', 'warn')">↺ Refresh Feeds</button>
    </div>

    <div class="kpi-grid">
      <div class="kpi"><div class="kpi-label">Total Items</div><div class="kpi-value">142</div><div class="kpi-delta">this cycle</div></div>
      <div class="kpi"><div class="kpi-label">Auto-matched</div><div class="kpi-value">{{ 142 - openItems.length }}</div><div class="kpi-delta"><span class="up">{{ matchRate }}%</span> match rate</div></div>
      <div class="kpi"><div class="kpi-label">Pending Review</div><div class="kpi-value">{{ openItems.length }}</div><div class="kpi-delta"><span class="dn">{{ highItems.length }} high</span> severity</div></div>
      <div class="kpi"><div class="kpi-label">Total Variance</div><div class="kpi-value">₹31.8 L</div><div class="kpi-delta"><span class="dn">above ₹25L threshold</span></div></div>
    </div>

    <div class="chips">
      <button class="chip" :class="{ active: filter === 'open' }"    @click="filter = 'open'">Open ({{ openItems.length }})</button>
      <button class="chip" :class="{ active: filter === 'high' }"    @click="filter = 'high'">High Severity ({{ highItems.length }})</button>
      <button class="chip" :class="{ active: filter === 'approved'}" @click="filter = 'approved'">Approved</button>
      <button class="chip" :class="{ active: filter === 'rejected'}" @click="filter = 'rejected'">Rejected</button>
    </div>

    <div class="card" style="padding:0;overflow:hidden">
      <table>
        <thead>
          <tr>
            <th>Severity</th><th>Asset / Source</th>
            <th>Custodian Value</th><th>Ledger Value</th><th>Variance</th>
            <th>Reason</th><th>Maker</th><th>Checker</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in displayed" :key="item.id" :class="{ 'row-muted': item.status !== 'open' }">
            <td>
              <span class="sev-dot" :class="`sev-${item.sev}`"></span>
              {{ item.sev.toUpperCase() }}
            </td>
            <td>
              <div style="font-weight:500">{{ item.asset }}</div>
              <div style="font-size:11.5px;color:var(--text3)">{{ item.src }}</div>
            </td>
            <td class="mono">{{ item.custodian }}</td>
            <td class="mono">{{ item.ledger }}</td>
            <td class="mono" style="color:var(--red)">{{ item.variance }}</td>
            <td style="font-size:12px;max-width:200px;line-height:1.45;color:var(--text2)">{{ item.reason }}</td>
            <td style="font-size:12px">{{ item.maker }}</td>
            <td style="font-size:12px">{{ item.checker }}</td>
            <td>
              <template v-if="item.status === 'open'">
                <div style="display:flex;gap:6px">
                  <button class="btn btn-green btn-xs" @click="approve(item.id)">✓</button>
                  <button class="btn btn-red btn-xs" @click="promptReject(item)">✗</button>
                </div>
              </template>
              <span v-else-if="item.status === 'approved'" class="tag tag-green">Approved</span>
              <span v-else class="tag tag-red">Rejected</span>
            </td>
          </tr>
          <tr v-if="displayed.length === 0">
            <td colspan="9" style="text-align:center;padding:36px;color:var(--text3);font-style:italic">No items in this category</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Reject modal -->
    <Teleport to="body">
      <div v-if="rejectTarget" class="modal-overlay" @click.self="rejectTarget = null">
        <div class="modal" style="max-width:460px">
          <div class="modal-head"><h3>Reject Variance Item</h3><button class="modal-close" @click="rejectTarget = null">×</button></div>
          <div class="modal-body">
            <p style="font-size:13.5px;margin-bottom:18px;color:var(--text2)">Rejecting: <strong style="color:var(--text)">{{ rejectTarget?.asset }}</strong></p>
            <div class="form-group">
              <label>Rejection Reason</label>
              <textarea v-model="rejectReason" rows="4" placeholder="Explain why this variance is being rejected and what corrective action is needed…"/>
            </div>
          </div>
          <div class="modal-foot">
            <button class="btn btn-ghost" @click="rejectTarget = null">Cancel</button>
            <button class="btn btn-red" @click="confirmReject">Reject Item</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWealthStore } from '../stores/wealth'
import { useToast } from '../composables/useToast'
const { toast } = useToast()

const wealth = useWealthStore()
const filter = ref('open')
const rejectTarget = ref(null)
const rejectReason = ref('')

const openItems = computed(() => wealth.reconItems.filter(r => r.status === 'open'))
const highItems = computed(() => wealth.reconItems.filter(r => r.status === 'open' && r.sev === 'high'))
const matchRate = computed(() => Math.round(((142 - openItems.value.length) / 142) * 100))

const displayed = computed(() => wealth.reconItems.filter(r => {
  if (filter.value === 'open')     return r.status === 'open'
  if (filter.value === 'high')     return r.status === 'open' && r.sev === 'high'
  if (filter.value === 'approved') return r.status === 'approved'
  if (filter.value === 'rejected') return r.status === 'rejected'
  return true
}))

function approve(id) { wealth.approveRecon(id) }
function promptReject(item) { rejectTarget.value = item; rejectReason.value = '' }
function confirmReject() {
  if (rejectTarget.value) {
    wealth.rejectRecon(rejectTarget.value.id, rejectReason.value)
    rejectTarget.value = null
  }
}
</script>

<style scoped>
.page-header { margin-bottom:22px; display:flex; align-items:flex-start; justify-content:space-between; }
.page-header h1 { font-weight:600; font-size:20px; letter-spacing:-.03em; }
.page-header p  { font-size:13px; color:var(--text2); margin-top:3px; font-style:italic; }
.sev-dot { display:inline-block; width:8px; height:8px; border-radius:50%; margin-right:6px; }
.sev-high   { background:var(--red); }
.sev-medium { background:var(--amber); }
.row-muted td { opacity:.55; }
</style>
