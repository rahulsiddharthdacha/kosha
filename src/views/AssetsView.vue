<template>
  <div>
    <div class="page-header">
      <div>
        <h1>Asset Registry</h1>
        <p>{{ filtered.length }} assets shown · last updated 27 May 2026 04:18 IST</p>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-ghost btn-sm" @click="toast('CSV export is not available in demo mode.', 'warn')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 15V3m0 12l-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Export CSV
        </button>
        <button class="btn btn-outline btn-sm" @click="showUpload = true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          Upload Asset
        </button>
      </div>
    </div>

    <!-- Filter chips -->
    <div class="chips">
      <button
        v-for="f in filters" :key="f.key"
        class="chip" :class="{ active: activeFilter === f.key }"
        @click="activeFilter = f.key"
      >{{ f.label }}</button>
    </div>

    <!-- Table -->
    <div class="card" style="padding:0;overflow:hidden">
      <table>
        <thead>
          <tr>
            <th>Asset / Description</th>
            <th>Class</th>
            <th>Held By</th>
            <th>Current Value</th>
            <th>Cost Basis</th>
            <th>Return</th>
            <th>Last Recon</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in filtered" :key="a.id">
            <td>
              <div class="asset-name">{{ a.name }}</div>
              <div class="asset-desc">{{ a.desc }}</div>
            </td>
            <td><span class="tag" :class="classTag(a.class)">{{ a.class }}</span></td>
            <td class="cell-sm">{{ a.entity }}</td>
            <td><span class="mono cell-val">₹{{ a.value }} Cr</span></td>
            <td><span class="mono cell-dim">₹{{ a.cost }} Cr</span></td>
            <td><span class="mono" style="color:var(--green)">{{ a.plPct }}</span></td>
            <td class="cell-sm" style="color:var(--text3)">{{ a.recon }}</td>
            <td>
              <span class="tag" :class="statusTag(a.status).cls">{{ statusTag(a.status).label }}</span>
            </td>
            <td>
              <button class="btn btn-ghost btn-xs" @click="toast(`${a.name} — detailed view coming soon.`, 'info')">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Upload Modal -->
    <Teleport to="body">
      <div v-if="showUpload" class="modal-overlay" @click.self="showUpload = false">
        <div class="modal">
          <div class="modal-head">
            <h3>Upload / Register New Asset</h3>
            <button class="modal-close" @click="showUpload = false">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group" style="margin-bottom:18px">
              <label>Asset Class</label>
              <select v-model="form.class">
                <option value="">— Select class —</option>
                <option v-for="c in assetClasses" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>

            <template v-if="form.class">
              <div class="form-section-label">Core Details</div>
              <div class="form-row">
                <div class="form-group">
                  <label>Asset Name</label>
                  <input v-model="form.name" type="text" placeholder="Descriptive name…"/>
                </div>
                <div class="form-group">
                  <label>Owner Entity</label>
                  <select v-model="form.entity">
                    <option v-for="e in entities" :key="e" :value="e">{{ e }}</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Current Value (₹ Cr)</label>
                  <input v-model="form.value" type="number" placeholder="0.00"/>
                </div>
                <div class="form-group">
                  <label>Cost Basis (₹ Cr)</label>
                  <input v-model="form.cost" type="number" placeholder="0.00"/>
                </div>
              </div>

              <template v-if="form.class === 'Real Estate'">
                <div class="form-section-label">Property Details</div>
                <div class="form-row">
                  <div class="form-group"><label>Full Address</label><input type="text" placeholder="Building, Street, City, PIN"/></div>
                  <div class="form-group"><label>Survey / Plot No.</label><input type="text" placeholder="CTS / Survey number"/></div>
                </div>
                <div class="form-row">
                  <div class="form-group"><label>RERA Certificate No.</label><input type="text" placeholder="P518000XXXXX"/></div>
                  <div class="form-group"><label>Sale Deed / Doc No.</label><input type="text" placeholder="MH/MUM/RG-YYYY/XXXXX"/></div>
                </div>
                <div class="form-row">
                  <div class="form-group"><label>Encumbrance Status</label><select><option>Nil – Clean</option><option>Mortgage</option><option>Under Dispute</option></select></div>
                  <div class="form-group"><label>Property Tax Status</label><select><option>Current</option><option>Arrears</option><option>Exempt</option></select></div>
                </div>
              </template>

              <template v-else-if="form.class === 'Listed Equity'">
                <div class="form-section-label">Security Details</div>
                <div class="form-row">
                  <div class="form-group"><label>ISIN</label><input type="text" placeholder="INE040A01034"/></div>
                  <div class="form-group"><label>Broker / PMS</label><input type="text" placeholder="360 ONE / Zerodha"/></div>
                </div>
                <div class="form-row">
                  <div class="form-group"><label>Quantity</label><input type="number" placeholder="0"/></div>
                  <div class="form-group"><label>Avg Cost per Share (₹)</label><input type="number" placeholder="0.00"/></div>
                </div>
              </template>

              <template v-else-if="form.class === 'Private Equity / AIF'">
                <div class="form-section-label">Fund Details</div>
                <div class="form-row">
                  <div class="form-group"><label>SEBI AIF Reg No.</label><input type="text" placeholder="IN/AIF2/22-23/XXXX"/></div>
                  <div class="form-group"><label>AIF Category</label><select><option>Cat I</option><option>Cat II</option><option>Cat III</option></select></div>
                </div>
                <div class="form-row">
                  <div class="form-group"><label>Commitment (₹ Cr)</label><input type="number" placeholder="0.00"/></div>
                  <div class="form-group"><label>Drawdown to Date (₹ Cr)</label><input type="number" placeholder="0.00"/></div>
                </div>
              </template>

              <template v-else-if="form.class === 'Offshore Holdings'">
                <div class="form-section-label">Offshore Details</div>
                <div class="form-row">
                  <div class="form-group"><label>Jurisdiction</label><input type="text" placeholder="Singapore / Mauritius / GIFT City"/></div>
                  <div class="form-group"><label>FEMA Route</label><select><option>LRS</option><option>ODI</option><option>OPI</option><option>GIFT City IFSC</option></select></div>
                </div>
                <div class="form-row">
                  <div class="form-group"><label>FEMA Ref / UIN</label><input type="text" placeholder="A4471/SG/22"/></div>
                  <div class="form-group"><label>LRS Amount Used (USD)</label><input type="number" placeholder="0"/></div>
                </div>
              </template>

              <template v-else-if="form.class === 'Gold & Bullion'">
                <div class="form-section-label">Bullion Details</div>
                <div class="form-row">
                  <div class="form-group"><label>Form</label><select><option>Physical Bar/Coin</option><option>Jewellery</option><option>SGB</option><option>Gold ETF</option></select></div>
                  <div class="form-group"><label>Purity</label><select><option>24k (99.9%)</option><option>22k (91.6%)</option><option>18k</option></select></div>
                </div>
                <div class="form-row">
                  <div class="form-group"><label>Quantity (grams)</label><input type="number" placeholder="0"/></div>
                  <div class="form-group"><label>Locker / Vault ID</label><input type="text" placeholder="Bank name & locker no."/></div>
                </div>
              </template>

              <div class="form-section-label">Compliance</div>
              <div class="form-row">
                <div class="form-group"><label>PAN of Owner</label><input type="text" placeholder="AABXX1234X" maxlength="10"/></div>
                <div class="form-group">
                  <label>Owner Family Members</label>
                  <select v-model="form.owners" multiple style="height:88px">
                    <option v-for="m in wealth.familyMembers.filter(m=>!m.role.includes('Minor'))" :key="m.id" :value="m.name">{{ m.name }}</option>
                  </select>
                </div>
              </div>

              <div class="form-section-label">Supporting Documents</div>
              <div
                class="upload-zone"
                :class="{ 'drag-over': isDragging }"
                @click="$refs.fileInput.click()"
                @dragover.prevent="isDragging = true"
                @dragleave="isDragging = false"
                @drop.prevent="onDrop"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="margin:auto;opacity:.4"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="1.5"/><polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="12" x2="12" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><polyline points="9 15 12 12 15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                <p>Upload sale deed, valuation, insurance, certificates…</p>
                <div class="hint">PDF, JPG, XLSX — max 50 MB</div>
              </div>
              <input ref="fileInput" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.xlsx" style="display:none" @change="onFileSelect"/>
              <div class="file-list">
                <div v-for="(f, i) in uploadedFiles" :key="i" class="file-item">
                  <span class="fn">{{ f.name }}</span>
                  <span class="fs">{{ formatSize(f.size) }}</span>
                  <button class="rm" @click="uploadedFiles.splice(i,1)">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                  </button>
                </div>
              </div>
            </template>
          </div>
          <div class="modal-foot">
            <button class="btn btn-ghost" @click="showUpload = false">Cancel</button>
            <button class="btn btn-primary" @click="saveAsset">Save &amp; Register</button>
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
const showUpload = ref(false)
const activeFilter = ref('all')
const isDragging = ref(false)
const uploadedFiles = ref([])

const filters = [
  { key:'all',   label:'All Classes' },
  { key:'re',    label:'Real Estate' },
  { key:'eq',    label:'Listed Equity' },
  { key:'pe',    label:'Private Equity' },
  { key:'fi',    label:'Fixed Income' },
  { key:'gold',  label:'Gold & Bullion' },
  { key:'off',   label:'Offshore' },
  { key:'alt',   label:'Alternatives' },
]

const classKeyMap = { re:'Real Estate', eq:'Listed Equity', pe:'Private Equity', fi:'Fixed Income', gold:'Gold & Bullion', off:'Offshore', alt:'Art & Alternatives' }

const filtered = computed(() => {
  if (activeFilter.value === 'all') return wealth.assets
  const target = classKeyMap[activeFilter.value] || ''
  return wealth.assets.filter(a => a.class.toLowerCase().includes(target.toLowerCase().split(' ')[0]))
})

const assetClasses = ['Real Estate','Listed Equity','Private Equity / AIF','Fixed Income','Gold & Bullion','Offshore Holdings','Art & Alternatives','Operating Company']
const entities = ['D.M. Bhandari HUF','MB Family Trust','Bhandari Investments LLP','Meera D. Bhandari','Rohan Bhandari','Priya Bhandari-Shah']

const form = ref({ class:'', name:'', entity:'D.M. Bhandari HUF', value:0, cost:0, owners:[] })

function classTag(c) {
  if (c.includes('Real')) return 'tag-blue'
  if (c.includes('Equity')) return 'tag-green'
  if (c.includes('Private')) return 'tag-gold'
  if (c.includes('Fixed')) return 'tag-gray'
  if (c.includes('Gold')) return 'tag-amber'
  if (c.includes('Offshore')) return 'tag-blue'
  return 'tag-gray'
}
function statusTag(s) {
  if (s === 'Clean')    return { cls:'tag-green', label:'Clean' }
  if (s === 'Pending')  return { cls:'tag-amber', label:'Pending' }
  if (s === 'Variance') return { cls:'tag-red',   label:'Variance' }
  return { cls:'tag-gray', label: s }
}

function onDrop(e) {
  isDragging.value = false
  uploadedFiles.value.push(...Array.from(e.dataTransfer.files))
}
function onFileSelect(e) {
  uploadedFiles.value.push(...Array.from(e.target.files))
}
function formatSize(bytes) {
  return bytes > 1048576 ? `${(bytes/1048576).toFixed(1)} MB` : `${Math.round(bytes/1024)} KB`
}

function saveAsset() {
  if (!form.value.class || !form.value.name) { alert('Please select asset class and provide a name.'); return }
  wealth.addAsset({
    name: form.value.name,
    desc: `${form.value.class} · ${form.value.entity}`,
    class: form.value.class,
    entity: form.value.entity,
    owners: form.value.owners,
    value: parseFloat(form.value.value) || 0,
    cost: parseFloat(form.value.cost) || 0,
    currency: '₹ Cr',
    plPct: form.value.cost > 0 ? `+${(((form.value.value - form.value.cost) / form.value.cost) * 100).toFixed(1)}%` : '—',
    status: 'Clean',
  })
  showUpload.value = false
  form.value = { class:'', name:'', entity:'D.M. Bhandari HUF', value:0, cost:0, owners:[] }
  uploadedFiles.value = []
}
</script>

<style scoped>
.page-header {
  margin-bottom: 20px; display: flex; align-items: flex-start; justify-content: space-between;
  padding-bottom: 18px; border-bottom: 1px solid var(--border);
}
.page-header h1 { font-weight:600; font-size:20px; letter-spacing:-.03em; }
.page-header p { font-size:12.5px; color:var(--text3); margin-top:3px; font-style:italic; }

.asset-name { font-weight:500; font-size:13.5px; }
.asset-desc { font-size:11.5px; color:var(--text3); margin-top:2px; }
.cell-sm { font-size:12.5px; }
.cell-val { font-size:13px; color:var(--text); }
.cell-dim { font-size:12.5px; color:var(--text2); }
</style>
