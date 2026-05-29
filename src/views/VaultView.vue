<template>
  <div>
    <div class="page-header">
      <div>
        <h1>Document Vault</h1>
        <p>Zero-knowledge encrypted · AES-256 at rest · {{ wealth.documents.length }} documents</p>
      </div>
      <button class="btn btn-outline btn-sm" @click="showUpload = true">+ Upload Document</button>
    </div>

    <div class="kpi-grid">
      <div class="kpi"><div class="kpi-label">Total Documents</div><div class="kpi-value">{{ wealth.documents.length }}</div><div class="kpi-delta">across 12 assets</div></div>
      <div class="kpi"><div class="kpi-label">Expiring Soon</div><div class="kpi-value">{{ expiring.length }}</div><div class="kpi-delta"><span class="dn">next 90 days</span></div></div>
      <div class="kpi"><div class="kpi-label">Storage Used</div><div class="kpi-value">14.2 GB</div><div class="kpi-delta">of 100 GB vault</div></div>
      <div class="kpi"><div class="kpi-label">Encryption</div><div class="kpi-value">AES-256</div><div class="kpi-delta"><span class="up">Zero-knowledge</span></div></div>
    </div>

    <div class="chips">
      <button class="chip" v-for="c in categories" :key="c" :class="{ active: activeCategory === c }" @click="activeCategory = c">{{ c }}</button>
    </div>

    <div class="doc-grid">
      <div v-for="doc in filtered" :key="doc.id" class="doc-card" @click="previewDoc(doc)">
        <div class="doc-icon" :class="`doc-${doc.type}`">{{ doc.type.toUpperCase() }}</div>
        <div class="doc-body">
          <h4>{{ doc.name }}</h4>
          <p>{{ doc.asset }} · {{ doc.date }}</p>
          <p>{{ doc.size }}</p>
          <span v-if="doc.expiry" class="tag tag-amber" style="margin-top:6px;font-size:10px">Expires {{ doc.expiry }}</span>
        </div>
      </div>
    </div>

    <!-- Upload modal -->
    <Teleport to="body">
      <div v-if="showUpload" class="modal-overlay" @click.self="showUpload = false">
        <div class="modal">
          <div class="modal-head"><h3>Upload Document to Vault</h3><button class="modal-close" @click="showUpload = false">×</button></div>
          <div class="modal-body">
            <div class="form-row">
              <div class="form-group">
                <label>Document Type</label>
                <select v-model="docForm.category">
                  <option v-for="c in docCategories" :key="c">{{ c }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>Linked Asset</label>
                <select v-model="docForm.asset">
                  <option v-for="a in wealth.assets" :key="a.id" :value="a.name">{{ a.name }}</option>
                  <option value="All">— All / General —</option>
                </select>
              </div>
            </div>
            <div class="form-row full">
              <div class="form-group">
                <label>Document Name</label>
                <input v-model="docForm.name" type="text" placeholder="Descriptive filename…"/>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group"><label>Issue Date</label><input v-model="docForm.date" type="date"/></div>
              <div class="form-group"><label>Expiry Date (if any)</label><input v-model="docForm.expiry" type="date"/></div>
            </div>
            <div
              class="upload-zone"
              :class="{ 'drag-over': isDragging }"
              @click="$refs.docFileInput.click()"
              @dragover.prevent="isDragging = true"
              @dragleave="isDragging = false"
              @drop.prevent="onDrop"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style="margin:auto"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="var(--text3)" stroke-width="1.5"/><polyline points="14 2 14 8 20 8" stroke="var(--text3)" stroke-width="1.5"/><line x1="12" y1="12" x2="12" y2="18" stroke="var(--text3)" stroke-width="1.5" stroke-linecap="round"/><polyline points="9 15 12 12 15 15" stroke="var(--text3)" stroke-width="1.5" stroke-linecap="round"/></svg>
              <p>Drop files here or click to upload</p>
              <div class="hint">PDF, JPG, PNG, XLSX — max 50 MB</div>
            </div>
            <input ref="docFileInput" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.xlsx" style="display:none" @change="onFileSelect"/>
            <div class="file-list">
              <div v-for="(f,i) in files" :key="i" class="file-item">
                <span class="fn">{{ f.name }}</span>
                <span class="fs">{{ formatSize(f.size) }}</span>
                <button class="rm" @click="files.splice(i,1)">×</button>
              </div>
            </div>
          </div>
          <div class="modal-foot">
            <button class="btn btn-ghost" @click="showUpload = false">Cancel</button>
            <button class="btn btn-primary" @click="saveDoc">Encrypt &amp; Save</button>
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
const showUpload   = ref(false)
const isDragging   = ref(false)
const files        = ref([])
const activeCategory = ref('All Documents')

const categories = ['All Documents','Sale Deed','Valuation','Insurance','Trust / Legal','Tax','FEMA / RBI','Statement','Land Records']
const docCategories = ['Sale Deed / Gift Deed','Valuation Report','Encumbrance Certificate','Insurance Policy','Demat Statement','Trust Deed','RERA Certificate','7/12 Extract','Form 16A / TDS Certificate','FEMA / A2 Form','Other']

const docForm = ref({ name:'', category:'Sale Deed / Gift Deed', asset:'', date:'', expiry:'' })

const expiring = computed(() => wealth.documents.filter(d => d.expiry))
const filtered = computed(() => {
  if (activeCategory.value === 'All Documents') return wealth.documents
  return wealth.documents.filter(d => d.category?.toLowerCase().includes(activeCategory.value.toLowerCase().split(' ')[0]))
})

function onDrop(e) { isDragging.value = false; files.value.push(...Array.from(e.dataTransfer.files)) }
function onFileSelect(e) { files.value.push(...Array.from(e.target.files)) }
function formatSize(bytes) { return bytes > 1048576 ? `${(bytes/1048576).toFixed(1)} MB` : `${Math.round(bytes/1024)} KB` }

function previewDoc(doc) { toast(`${doc.name} — document preview not available in demo mode.`, 'info') }

function saveDoc() {
  if (!docForm.value.name) { alert('Please enter a document name.'); return }
  wealth.addDocument({
    name: docForm.value.name,
    type: 'pdf',
    category: docForm.value.category,
    asset: docForm.value.asset || 'All',
    date: docForm.value.date || new Date().toLocaleDateString('en-IN'),
    size: '—',
    expiry: docForm.value.expiry || null,
  })
  showUpload.value = false
  docForm.value = { name:'', category:'Sale Deed / Gift Deed', asset:'', date:'', expiry:'' }
  files.value = []
}
</script>

<style scoped>
.page-header { margin-bottom:22px; display:flex; align-items:flex-start; justify-content:space-between; }
.page-header h1 { font-weight:600; font-size:20px; letter-spacing:-.03em; }
.page-header p  { font-size:13px; color:var(--text2); margin-top:3px; font-style:italic; }

.doc-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(196px,1fr)); gap:13px; }
.doc-card { background:var(--s2); border:1px solid var(--border); border-radius:var(--r); padding:16px; cursor:pointer; transition:.2s; display:flex; flex-direction:column; gap:12px; }
.doc-card:hover { border-color:var(--border2); background:var(--s3); transform:translateY(-1px); }
.doc-icon { width:40px; height:48px; border-radius:4px; display:grid; place-items:center; font-size:11px; font-weight:700; letter-spacing:.04em; flex-shrink:0; }
.doc-pdf  { background:rgba(217,80,80,.18); color:var(--red); }
.doc-xlsx { background:rgba(45,184,122,.18); color:var(--green); }
.doc-img  { background:rgba(74,144,217,.18); color:var(--blue); }
.doc-body h4 { font-size:12.5px; font-weight:500; line-height:1.35; margin-bottom:3px; }
.doc-body p  { font-size:11.5px; color:var(--text3); }
</style>
