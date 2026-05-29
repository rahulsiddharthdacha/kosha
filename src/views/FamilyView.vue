<template>
  <div class="family-page">

    <!-- SLIM PAGE HEADER -->
    <div class="fp-header">
      <div>
        <h1>Family Office</h1>
        <p class="fp-sub">Bhandari family · 6 principals · 3 legal structures · ₹2,847 Cr AUM</p>
      </div>
      <div class="fp-actions">
        <button class="btn btn-ghost btn-sm" @click="toast('Family office export is not available in demo mode.', 'warn')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 15V3m0 12l-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Export
        </button>
        <button class="btn btn-ghost btn-sm" @click="showViz = true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/></svg>
          Visualise
        </button>
        <button class="btn btn-outline btn-sm" @click="toast('Member management is not available in demo mode.', 'info')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          Add Member
        </button>
      </div>
    </div>

    <!-- SPLIT LAYOUT -->
    <div class="split-view">

      <!-- ═══════════ LEFT PANEL: Tree ═══════════ -->
      <div class="left-panel">
        <div class="lp-scroll">

          <!-- Gen I -->
          <div class="tree-section">
            <div class="tree-section-label">Founders · Gen I</div>
            <div class="tree-nodes">
              <div
                v-for="m in gen1" :key="m.id"
                class="tree-node"
                :class="{ active: activeId === m.id }"
                @click="pick(m.id)"
                tabindex="0"
                @keydown.enter.prevent="pick(m.id)"
              >
                <div class="tn-av" :style="{ background: `linear-gradient(135deg,${m.color}30,${m.color}12)`, border: `1.5px solid ${m.color}50`, color: m.color }">{{ m.initials }}</div>
                <div class="tn-body">
                  <div class="tn-name">{{ m.name }}</div>
                  <div class="tn-meta">{{ m.role_tag }} · Age {{ m.age }}</div>
                </div>
                <div class="tn-right">
                  <span :class="['tn-2fa', m.twofa ? 'ok' : 'warn']">{{ m.twofa ? '2FA' : '2FA?' }}</span>
                  <span class="tn-worth mono" v-if="m.netWorth > 0">₹{{ m.netWorth.toLocaleString() }}Cr</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Connector Gen I → II -->
          <div class="tree-connector">
            <div class="tc-line"></div>
            <div class="tc-label">Children of Devaraj &amp; Meera</div>
          </div>

          <!-- Gen II -->
          <div class="tree-section tree-indent">
            <div class="tree-section-label">Second Generation · Gen II</div>
            <div class="tree-nodes tree-branch">
              <div
                v-for="m in gen2" :key="m.id"
                class="tree-node"
                :class="{ active: activeId === m.id, minor: m.role_tag === 'Minor' }"
                @click="pick(m.id)"
                tabindex="0"
                @keydown.enter.prevent="pick(m.id)"
              >
                <div class="tn-av" :style="{ background: `linear-gradient(135deg,${m.color}30,${m.color}12)`, border: `1.5px solid ${m.color}50`, color: m.color }">{{ m.initials }}</div>
                <div class="tn-body">
                  <div class="tn-name">{{ m.name }}</div>
                  <div class="tn-meta">{{ m.role_tag }} · Age {{ m.age }}</div>
                </div>
                <div class="tn-right">
                  <span :class="['tn-2fa', m.twofa ? 'ok' : 'warn']" v-if="m.role_tag !== 'Minor'">{{ m.twofa ? '2FA' : '2FA?' }}</span>
                  <span class="tn-worth mono" v-if="m.netWorth > 0">₹{{ m.netWorth.toLocaleString() }}Cr</span>
                  <span class="tn-minor-tag" v-if="m.role_tag === 'Minor'">Minor</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Connector Gen II → III -->
          <div class="tree-connector tree-connector--indent">
            <div class="tc-line"></div>
            <div class="tc-label">Child of Rohan</div>
          </div>

          <!-- Gen III -->
          <div class="tree-section tree-indent-2">
            <div class="tree-section-label">Third Generation · Gen III</div>
            <div class="tree-nodes tree-branch">
              <div
                v-for="m in gen3" :key="m.id"
                class="tree-node minor"
                :class="{ active: activeId === m.id }"
                @click="pick(m.id)"
                tabindex="0"
                @keydown.enter.prevent="pick(m.id)"
              >
                <div class="tn-av" :style="{ background: `linear-gradient(135deg,${m.color}30,${m.color}12)`, border: `1.5px solid ${m.color}50`, color: m.color }">{{ m.initials }}</div>
                <div class="tn-body">
                  <div class="tn-name">{{ m.name }}</div>
                  <div class="tn-meta">{{ m.role_tag }} · Age {{ m.age }}</div>
                </div>
                <div class="tn-right">
                  <span class="tn-minor-tag">Minor</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Separator -->
          <div class="lp-sep"></div>

          <!-- Legal Structures -->
          <div class="lp-section-label">Legal Structures</div>
          <div class="struct-list">
            <div
              v-for="t in wealth.trusts" :key="t.name"
              class="struct-node"
              :class="{ active: activeId === `struct-${t.name}` }"
              @click="pickStruct(t)"
              tabindex="0"
              @keydown.enter.prevent="pickStruct(t)"
            >
              <div class="sn-icon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7M4 21V10.2M8 21V10M12 21V10M16 21V10.2M20 21V10M3 7l9-4 9 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <div class="sn-body">
                <div class="sn-name">{{ t.name }}</div>
                <div class="sn-meta mono">₹{{ t.totalValue }} Cr · {{ t.assetCount }} assets</div>
              </div>
              <span class="tag tag-green sn-status">{{ t.status }}</span>
            </div>
          </div>

        </div>
      </div>

      <!-- ═══════════ RIGHT PANEL: Detail ═══════════ -->
      <div class="right-panel">

        <!-- Empty state -->
        <Transition name="rp-fade" mode="out-in">
          <div class="rp-empty" v-if="!activeId" key="empty">
            <div class="rp-empty-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="rp-empty-title">Select a family member</div>
            <div class="rp-empty-sub">Click any node in the tree to view their complete profile, holdings, and compliance status.</div>
            <div class="rp-empty-hint">Or select a legal structure below the tree for entity details.</div>
          </div>

          <!-- Member detail -->
          <div class="rp-member" v-else-if="selectedMember" key="member">

            <!-- Member header -->
            <div class="rp-header">
              <div class="rp-identity">
                <div class="rp-av" :style="{ background: `linear-gradient(135deg,${selectedMember.color}30,${selectedMember.color}12)`, border: `2px solid ${selectedMember.color}60`, color: selectedMember.color }">
                  {{ selectedMember.initials }}
                </div>
                <div>
                  <div class="rp-name">{{ selectedMember.name }}</div>
                  <div class="rp-tags">
                    <span class="tag tag-gold">{{ selectedMember.role_tag }}</span>
                    <span class="tag tag-green" v-if="selectedMember.twofa">2FA Enabled</span>
                    <span class="tag tag-red" v-else>2FA Pending</span>
                    <span class="tag tag-gray" v-if="selectedMember.netWorth > 0">₹{{ selectedMember.netWorth.toLocaleString() }} Cr</span>
                    <span class="tag tag-gray" v-else>Minor beneficiary</span>
                  </div>
                </div>
              </div>
              <div class="rp-wealth-share" v-if="selectedMember.netWorth > 0">
                <div class="rws-label">{{ wealthShare(selectedMember) }}% of family AUM</div>
                <div class="rws-bar">
                  <div class="rws-fill" :style="{ width: wealthShare(selectedMember) + '%', background: selectedMember.color }"></div>
                </div>
              </div>
            </div>

            <!-- Tabs -->
            <div class="rp-tabs">
              <button :class="['rtab', tab === 'profile' ? 'active' : '']" @click="tab = 'profile'">Profile</button>
              <button :class="['rtab', tab === 'holdings' ? 'active' : '']" @click="tab = 'holdings'">
                Holdings
                <span class="rtab-n">{{ memberAssets(selectedMember).length }}</span>
              </button>
              <button :class="['rtab', tab === 'compliance' ? 'active' : '']" @click="tab = 'compliance'">LRS &amp; Compliance</button>
            </div>

            <!-- TAB: Profile -->
            <div class="rp-body" v-if="tab === 'profile'">
              <div class="rp-two-col">
                <div class="rp-col">
                  <div class="col-head">Personal Information</div>
                  <div class="info-row"><span class="il">Relation</span><span class="iv">{{ selectedMember.relation }}</span></div>
                  <div class="info-row"><span class="il">Date of Birth</span><span class="iv">{{ selectedMember.dob }} · Age {{ selectedMember.age }}</span></div>
                  <div class="info-row" v-if="selectedMember.pan !== '—'"><span class="il">PAN</span><span class="iv mono" style="font-size:12px;letter-spacing:.08em">{{ selectedMember.pan }}</span></div>
                  <div class="info-row" v-if="selectedMember.email !== '—'"><span class="il">Email</span><span class="iv">{{ selectedMember.email }}</span></div>
                  <div class="info-row" v-if="selectedMember.phone !== '—'"><span class="il">Phone</span><span class="iv">{{ selectedMember.phone }}</span></div>
                  <div class="info-row"><span class="il">Last Login</span><span class="iv">{{ selectedMember.last_login }}</span></div>
                </div>
                <div class="rp-col">
                  <div class="col-head">Legal Vehicles</div>
                  <div class="vehicle-list" v-if="selectedMember.trusts?.length">
                    <div class="vehicle-row" v-for="t in selectedMember.trusts" :key="t">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style="color:var(--gold);flex-shrink:0;margin-top:1px"><path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7M4 21V10.2M8 21V10M12 21V10M16 21V10.2M20 21V10M3 7l9-4 9 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      {{ t }}
                    </div>
                  </div>
                  <div class="empty-sm" v-else>No vehicles assigned</div>

                  <div class="col-head" style="margin-top:22px">Net Worth</div>
                  <div v-if="selectedMember.netWorth > 0" class="nw-block">
                    <div class="nw-val mono">₹{{ selectedMember.netWorth.toLocaleString() }} <span style="font-size:.55em;color:var(--text3)">Cr</span></div>
                    <div class="nw-pct">{{ wealthShare(selectedMember) }}% of family AUM</div>
                    <div class="nw-bar"><div class="nw-fill" :style="{ width: wealthShare(selectedMember) + '%', background: selectedMember.color }"></div></div>
                  </div>
                  <div class="empty-sm" v-else>Minor — no direct holdings</div>
                </div>
              </div>
            </div>

            <!-- TAB: Holdings -->
            <div class="rp-body" v-if="tab === 'holdings'">
              <div v-if="memberAssets(selectedMember).length" class="holdings-wrap">
                <div class="ht-head">
                  <span class="ht-hc ht-hc--asset">Asset</span>
                  <span class="ht-hc">Class</span>
                  <span class="ht-hc">Entity</span>
                  <span class="ht-hc ht-hc--r">Value</span>
                  <span class="ht-hc ht-hc--r">P&amp;L</span>
                  <span class="ht-hc">Recon</span>
                </div>
                <div class="ht-row" v-for="a in memberAssets(selectedMember)" :key="a.id">
                  <div class="ht-asset">
                    <div class="hta-name">{{ a.name }}</div>
                    <div class="hta-desc">{{ a.desc }}</div>
                  </div>
                  <span class="tag tag-gray" style="font-size:10px;align-self:center">{{ a.class }}</span>
                  <span class="ht-entity">{{ a.entity }}</span>
                  <span class="mono ht-val">₹{{ a.value }} Cr</span>
                  <span class="ht-pl" :class="a.plPct?.startsWith('+') ? 'pos' : 'neg'">{{ a.plPct }}</span>
                  <span :class="['tag', a.status === 'Clean' ? 'tag-green' : a.status === 'Pending' ? 'tag-amber' : 'tag-red']" style="align-self:center">{{ a.status }}</span>
                </div>
              </div>
              <div class="rp-empty-sm" v-else>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="opacity:.3"><path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                No direct holdings for {{ selectedMember.name.split(' ')[0] }}
              </div>
            </div>

            <!-- TAB: Compliance -->
            <div class="rp-body" v-if="tab === 'compliance'">
              <div class="rp-two-col">
                <div class="rp-col">
                  <div class="col-head">LRS Status — FY 2025–26</div>
                  <div v-if="selectedMember.lrs_limit > 0" class="lrs-section">
                    <div class="lrs-metrics">
                      <div class="lrs-m"><div class="lrs-mv mono">${{ (selectedMember.lrs_used / 1000).toFixed(0) }}K</div><div class="lrs-ml">Used</div></div>
                      <div class="lrs-m"><div class="lrs-mv mono" style="color:var(--text3)">$250K</div><div class="lrs-ml">Cap</div></div>
                      <div class="lrs-m">
                        <div class="lrs-mv mono" :style="{ color: selectedMember.lrs_used > 200000 ? 'var(--red)' : 'var(--green)' }">
                          ${{ ((250000 - selectedMember.lrs_used) / 1000).toFixed(0) }}K
                        </div>
                        <div class="lrs-ml">Remaining</div>
                      </div>
                    </div>
                    <div class="lrs-bar-wrap">
                      <div class="lrs-bar-fill" :style="{ width: Math.min(selectedMember.lrs_used / 250000 * 100, 100) + '%', background: selectedMember.lrs_used > 200000 ? 'var(--red)' : 'var(--green)' }"></div>
                    </div>
                    <div class="lrs-foot">
                      <span>{{ (selectedMember.lrs_used / 250000 * 100).toFixed(0) }}% used</span>
                      <span>Resets 1 Apr 2027</span>
                    </div>
                  </div>
                  <div class="empty-sm" v-else>LRS not applicable for minors</div>
                </div>
                <div class="rp-col">
                  <div class="col-head">Compliance Checklist</div>
                  <div class="checklist">
                    <div class="cl-row"><span class="cl-l">2FA Authentication</span><span :class="['tag', selectedMember.twofa ? 'tag-green' : 'tag-red']">{{ selectedMember.twofa ? 'Enabled' : 'Pending' }}</span></div>
                    <div class="cl-row"><span class="cl-l">PAN Registered</span><span :class="['tag', selectedMember.pan !== '—' ? 'tag-green' : 'tag-gray']">{{ selectedMember.pan !== '—' ? 'Yes' : 'N/A' }}</span></div>
                    <div class="cl-row"><span class="cl-l">Access Level</span><span class="tag tag-gold">{{ selectedMember.role_tag }}</span></div>
                    <div class="cl-row"><span class="cl-l">A2 Forms (FEMA)</span><span :class="['tag', selectedMember.lrs_used > 0 ? 'tag-green' : 'tag-gray']">{{ selectedMember.lrs_used > 0 ? 'Filed' : 'Not required' }}</span></div>
                    <div class="cl-row"><span class="cl-l">Last Activity</span><span class="cl-v">{{ selectedMember.last_login }}</span></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Structure detail -->
          <div class="rp-struct" v-else-if="selectedStructure" key="struct">
            <div class="rp-header">
              <div class="rp-identity">
                <div class="rp-av rp-av--struct">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7M4 21V10.2M8 21V10M12 21V10M16 21V10.2M20 21V10M3 7l9-4 9 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <div>
                  <div class="rp-name">{{ selectedStructure.name }}</div>
                  <div class="rp-tags">
                    <span class="tag tag-green">{{ selectedStructure.status }}</span>
                    <span class="tag tag-blue" style="font-size:10px">{{ selectedStructure.type }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="rp-body">
              <div class="struct-reg">{{ selectedStructure.reg }}</div>
              <div class="struct-metrics">
                <div class="sm-block">
                  <div class="sm-val mono">₹{{ selectedStructure.totalValue }} Cr</div>
                  <div class="sm-lbl">Total Value</div>
                </div>
                <div class="sm-div"></div>
                <div class="sm-block">
                  <div class="sm-val mono">{{ selectedStructure.assetCount }}</div>
                  <div class="sm-lbl">Assets</div>
                </div>
                <div class="sm-div"></div>
                <div class="sm-block">
                  <div class="sm-val mono">{{ Array.isArray(selectedStructure.beneficiaries) ? selectedStructure.beneficiaries.length : '—' }}</div>
                  <div class="sm-lbl">Beneficiaries</div>
                </div>
              </div>

              <div class="rp-two-col" style="margin-top:24px">
                <div class="rp-col">
                  <div class="col-head">Structure Details</div>
                  <div class="info-row"><span class="il">Settlor / Karta</span><span class="iv">{{ selectedStructure.settlor }}</span></div>
                  <div class="info-row"><span class="il">Counsel</span><span class="iv">{{ selectedStructure.counsel }}</span></div>
                  <div class="info-row"><span class="il">Next Review</span><span class="iv" :style="{ color: selectedStructure.nextReview === 'Sep 2026' ? 'var(--amber)' : 'var(--text)' }">{{ selectedStructure.nextReview }}</span></div>
                </div>
                <div class="rp-col">
                  <div class="col-head">Trustees / Partners</div>
                  <div class="trustee-list">
                    <div class="trustee-row" v-for="tr in selectedStructure.trustees" :key="tr">
                      <span class="tr-dot"></span>{{ tr }}
                    </div>
                  </div>

                  <div class="col-head" style="margin-top:20px">Beneficiaries</div>
                  <div class="trustee-list" v-if="Array.isArray(selectedStructure.beneficiaries)">
                    <div class="trustee-row" v-for="b in selectedStructure.beneficiaries" :key="b">
                      <span class="tr-dot"></span>{{ b }}
                    </div>
                  </div>
                  <div class="empty-sm" v-else>{{ selectedStructure.beneficiaries }}</div>
                </div>
              </div>
            </div>
          </div>

        </Transition>
      </div>

    </div>

    <Teleport to="body">
      <Transition name="viz-fade">
        <div v-if="showViz" class="viz-overlay" @click.self="showViz = false">
        <div class="viz-modal">

          <!-- Modal Header -->
          <div class="viz-head">
            <div class="viz-head-left">
              <div class="viz-eyebrow">Family Office · Visual Map</div>
              <div class="viz-title">Bhandari Family Constellation</div>
            </div>
            <div class="viz-head-right">
              <div class="viz-stat"><span class="mono">6</span>&nbsp;Principals</div>
              <div class="viz-divider-v"></div>
              <div class="viz-stat"><span class="mono">₹2,847 Cr</span>&nbsp;AUM</div>
              <div class="viz-divider-v"></div>
              <div class="viz-stat"><span class="mono">3</span>&nbsp;Structures</div>
              <button class="viz-close-btn" @click="showViz = false" title="Close (Esc)">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              </button>
            </div>
          </div>

          <!-- Hover Info Card -->
          <Transition name="hcard-fade">
            <div v-if="vizHovered" class="viz-hcard">
              <template v-if="vizHovered.type === 'member'">
                <div class="vhc-av" :style="{ background: `${vizHovered.color}22`, border: `1.5px solid ${vizHovered.color}60`, color: vizHovered.color }">{{ vizHovered.initials }}</div>
                <div class="vhc-body">
                  <div class="vhc-name">{{ vizHovered.name }}</div>
                  <div class="vhc-role">{{ vizHovered.role_tag }}{{ vizHovered.age ? ` · Age ${vizHovered.age}` : '' }}</div>
                  <div class="vhc-worth mono" v-if="vizHovered.netWorth > 0">₹{{ vizHovered.netWorth.toLocaleString() }} Cr</div>
                  <div class="vhc-trusts" v-if="vizHovered.trusts?.length">{{ vizHovered.trusts.join(' · ') }}</div>
                </div>
              </template>
              <template v-else>
                <div class="vhc-av vhc-struct-av">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7M4 21V10.2M8 21V10M12 21V10M16 21V10.2M20 21V10M3 7l9-4 9 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <div class="vhc-body">
                  <div class="vhc-name">{{ vizHovered.name }}</div>
                  <div class="vhc-role">{{ vizHovered.type_label }}</div>
                  <div class="vhc-worth mono">₹{{ vizHovered.totalValue }} Cr · {{ vizHovered.assetCount }} assets</div>
                  <div class="vhc-trusts">Settlor: {{ vizHovered.settlor }}</div>
                </div>
              </template>
            </div>
          </Transition>

          <!-- SVG Canvas -->
          <div class="viz-canvas">
            <svg viewBox="0 0 900 540" xmlns="http://www.w3.org/2000/svg" class="viz-svg" preserveAspectRatio="xMidYMid meet">

              <!-- ─── Background grid ─── -->
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(122,88,48,0.05)" stroke-width="1"/>
                </pattern>
                <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <rect width="900" height="540" fill="url(#grid)" opacity="0.6"/>

              <!-- ─── Section labels ─── -->
              <text x="28" y="70" class="sec-lbl">GEN I · FOUNDERS</text>
              <text x="28" y="228" class="sec-lbl">GEN II · CHILDREN</text>
              <text x="28" y="362" class="sec-lbl">GEN III</text>
              <text x="28" y="460" class="sec-lbl">LEGAL STRUCTURES</text>

              <!-- ─── CONNECTOR LINES ─── -->

              <!-- Marriage arch Devaraj ↔ Meera (dashed, warm) -->
              <path d="M 366 114 Q 426 91 486 114" fill="none" stroke="rgba(122,88,48,0.42)" stroke-width="1.6" stroke-dasharray="5 3.5"/>

              <!-- Marriage diamond at arch midpoint -->
              <polygon points="426,96 430,101 426,106 422,101" fill="rgba(196,154,60,0.65)"/>

              <!-- Trunk from marriage midpoint down -->
              <line x1="426" y1="114" x2="426" y2="190" stroke="rgba(122,88,48,0.38)" stroke-width="1.6"/>

              <!-- Horizontal Gen II spine -->
              <line x1="150" y1="190" x2="700" y2="190" stroke="rgba(122,88,48,0.22)" stroke-width="1.1"/>

              <!-- Vertical drops to Gen II nodes -->
              <line x1="150" y1="190" x2="150" y2="244" stroke="rgba(122,88,48,0.38)" stroke-width="1.3"/>
              <line x1="426" y1="190" x2="426" y2="244" stroke="rgba(122,88,48,0.38)" stroke-width="1.3"/>
              <line x1="700" y1="190" x2="700" y2="244" stroke="rgba(122,88,48,0.38)" stroke-width="1.3"/>

              <!-- Gen III: Rohan → Kavya (dashed minor lineage) -->
              <line x1="150" y1="300" x2="150" y2="368" stroke="rgba(122,88,48,0.28)" stroke-width="1.2" stroke-dasharray="3.5 3"/>

              <!-- Structures separator -->
              <line x1="40" y1="458" x2="860" y2="458" stroke="rgba(122,88,48,0.12)" stroke-width="1" stroke-dasharray="6 5"/>

              <!-- ─── WEALTH ARC RINGS (% of family AUM) ─── -->

              <!-- Devaraj: 64.6% of 2847 Cr — outer r=42, circ=263.9 -->
              <circle cx="332" cy="114" r="42" fill="none" stroke="rgba(196,154,60,0.55)" stroke-width="3.5"
                stroke-dasharray="170.5 93.4" transform="rotate(-90 332 114)" class="wealth-arc"/>

              <!-- Meera: 21.8% — outer r=42 -->
              <circle cx="520" cy="114" r="42" fill="none" stroke="rgba(74,144,217,0.55)" stroke-width="3.5"
                stroke-dasharray="57.6 206.3" transform="rotate(-90 520 114)" class="wealth-arc"/>

              <!-- Rohan: 8.4% — outer r=36, circ=226.2 -->
              <circle cx="150" cy="272" r="36" fill="none" stroke="rgba(45,184,122,0.55)" stroke-width="3"
                stroke-dasharray="18.9 207.3" transform="rotate(-90 150 272)" class="wealth-arc"/>

              <!-- Priya: 5.2% — outer r=36 -->
              <circle cx="426" cy="272" r="36" fill="none" stroke="rgba(139,92,246,0.55)" stroke-width="3"
                stroke-dasharray="11.8 214.4" transform="rotate(-90 426 272)" class="wealth-arc"/>

              <!-- ─── GEN I: DEVARAJ ─── -->
              <g class="node-g" style="animation-delay:.05s"
                @mouseenter="vizHovered = { type:'member', ...wealth.familyMembers.find(m=>m.id==='devaraj') }"
                @mouseleave="vizHovered = null"
                @click="selectFromViz('devaraj')">
                <circle class="node-glow" cx="332" cy="114" r="50" fill="rgba(196,154,60,0.06)" opacity="0"/>
                <circle class="node-circle" cx="332" cy="114" r="34" fill="rgba(196,154,60,0.14)" stroke="rgba(196,154,60,0.62)" stroke-width="1.8"/>
                <text x="332" y="114" text-anchor="middle" dominant-baseline="central" class="node-init" fill="#9C7440" font-size="14" font-weight="700">DB</text>
                <text x="332" y="163" text-anchor="middle" class="node-name" fill="#1A1410" font-size="11.5" font-weight="600">Devaraj M. Bhandari</text>
                <text x="332" y="177" text-anchor="middle" fill="#8A8278" font-size="9.5">Patriarch</text>
                <text x="332" y="190" text-anchor="middle" class="node-worth" fill="#9C7440" font-size="9.5">₹1,840 Cr</text>
              </g>

              <!-- ─── GEN I: MEERA ─── -->
              <g class="node-g" style="animation-delay:.1s"
                @mouseenter="vizHovered = { type:'member', ...wealth.familyMembers.find(m=>m.id==='meera') }"
                @mouseleave="vizHovered = null"
                @click="selectFromViz('meera')">
                <circle class="node-glow" cx="520" cy="114" r="50" fill="rgba(74,144,217,0.06)" opacity="0"/>
                <circle class="node-circle" cx="520" cy="114" r="34" fill="rgba(74,144,217,0.13)" stroke="rgba(74,144,217,0.55)" stroke-width="1.8"/>
                <text x="520" y="114" text-anchor="middle" dominant-baseline="central" class="node-init" fill="#4A6880" font-size="14" font-weight="700">MB</text>
                <text x="520" y="163" text-anchor="middle" class="node-name" fill="#1A1410" font-size="11.5" font-weight="600">Meera D. Bhandari</text>
                <text x="520" y="177" text-anchor="middle" fill="#8A8278" font-size="9.5">Trustee · Spouse</text>
                <text x="520" y="190" text-anchor="middle" class="node-worth" fill="#4A6880" font-size="9.5">₹621 Cr</text>
              </g>

              <!-- ─── GEN II: ROHAN ─── -->
              <g class="node-g" style="animation-delay:.18s"
                @mouseenter="vizHovered = { type:'member', ...wealth.familyMembers.find(m=>m.id==='rohan') }"
                @mouseleave="vizHovered = null"
                @click="selectFromViz('rohan')">
                <circle class="node-glow" cx="150" cy="272" r="42" fill="rgba(45,184,122,0.07)" opacity="0"/>
                <circle class="node-circle" cx="150" cy="272" r="28" fill="rgba(45,184,122,0.13)" stroke="rgba(45,184,122,0.58)" stroke-width="1.6"/>
                <text x="150" y="272" text-anchor="middle" dominant-baseline="central" class="node-init" fill="#2DB87A" font-size="12" font-weight="700">RB</text>
                <text x="150" y="314" text-anchor="middle" class="node-name" fill="#1A1410" font-size="11" font-weight="600">Rohan Bhandari</text>
                <text x="150" y="327" text-anchor="middle" fill="#8A8278" font-size="9">Son · Beneficiary</text>
                <text x="150" y="340" text-anchor="middle" class="node-worth" fill="#2DB87A" font-size="9">₹238 Cr</text>
              </g>

              <!-- ─── GEN II: PRIYA ─── -->
              <g class="node-g" style="animation-delay:.23s"
                @mouseenter="vizHovered = { type:'member', ...wealth.familyMembers.find(m=>m.id==='priya') }"
                @mouseleave="vizHovered = null"
                @click="selectFromViz('priya')">
                <circle class="node-glow" cx="426" cy="272" r="42" fill="rgba(139,92,246,0.07)" opacity="0"/>
                <circle class="node-circle" cx="426" cy="272" r="28" fill="rgba(139,92,246,0.12)" stroke="rgba(139,92,246,0.52)" stroke-width="1.6"/>
                <text x="426" y="272" text-anchor="middle" dominant-baseline="central" class="node-init" fill="#8B5CF6" font-size="12" font-weight="700">PS</text>
                <text x="426" y="314" text-anchor="middle" class="node-name" fill="#1A1410" font-size="11" font-weight="600">Priya Bhandari-Shah</text>
                <text x="426" y="327" text-anchor="middle" fill="#8A8278" font-size="9">Daughter · Beneficiary</text>
                <text x="426" y="340" text-anchor="middle" class="node-worth" fill="#8B5CF6" font-size="9">₹148 Cr</text>
              </g>

              <!-- ─── GEN II: ARJUN (minor) ─── -->
              <g class="node-g node-minor" style="animation-delay:.28s"
                @mouseenter="vizHovered = { type:'member', ...wealth.familyMembers.find(m=>m.id==='arjun_minor') }"
                @mouseleave="vizHovered = null"
                @click="selectFromViz('arjun_minor')">
                <circle class="node-glow" cx="700" cy="272" r="42" fill="rgba(212,136,42,0.06)" opacity="0"/>
                <circle class="node-circle" cx="700" cy="272" r="28" fill="rgba(212,136,42,0.09)" stroke="rgba(212,136,42,0.45)" stroke-width="1.4" stroke-dasharray="5 3"/>
                <text x="700" y="272" text-anchor="middle" dominant-baseline="central" class="node-init" fill="#D4882A" font-size="12" font-weight="700">AB</text>
                <text x="700" y="314" text-anchor="middle" class="node-name" fill="#1A1410" font-size="11" font-weight="600">Arjun Bhandari</text>
                <text x="700" y="327" text-anchor="middle" fill="#8A8278" font-size="9">Son (Minor) · Age 9</text>
              </g>

              <!-- ─── GEN III: KAVYA (minor) ─── -->
              <g class="node-g node-minor" style="animation-delay:.34s"
                @mouseenter="vizHovered = { type:'member', ...wealth.familyMembers.find(m=>m.id==='kavya_minor') }"
                @mouseleave="vizHovered = null"
                @click="selectFromViz('kavya_minor')">
                <circle class="node-glow" cx="150" cy="390" r="36" fill="rgba(217,80,80,0.07)" opacity="0"/>
                <circle class="node-circle" cx="150" cy="390" r="22" fill="rgba(217,80,80,0.09)" stroke="rgba(217,80,80,0.40)" stroke-width="1.2" stroke-dasharray="4 2.5"/>
                <text x="150" y="390" text-anchor="middle" dominant-baseline="central" class="node-init" fill="#D95050" font-size="10" font-weight="700">KB</text>
                <text x="150" y="426" text-anchor="middle" class="node-name" fill="#1A1410" font-size="10.5" font-weight="600">Kavya Bhandari</text>
                <text x="150" y="439" text-anchor="middle" fill="#8A8278" font-size="9">Daughter of Rohan · Age 6</text>
              </g>

              <!-- ─── TRUST: MB FAMILY TRUST ─── -->
              <g class="struct-g" style="animation-delay:.42s"
                @mouseenter="vizHovered = { type:'trust', name:'MB Family Trust', type_label:'Private Discretionary Trust', totalValue:'1,640', assetCount:8, settlor:'Devaraj M. Bhandari' }"
                @mouseleave="vizHovered = null"
                @click="selectFromViz('struct-MB Family Trust')">
                <rect x="30" y="468" width="264" height="54" rx="8" fill="rgba(255,253,249,0.76)" stroke="rgba(255,255,255,0.82)" stroke-width="1" class="struct-rect"/>
                <rect x="30" y="468" width="3" height="54" rx="1.5" fill="rgba(26,120,64,0.65)"/>
                <text x="48" y="487" fill="#1A1410" font-size="10.5" font-weight="600" class="struct-name">MB Family Trust</text>
                <text x="48" y="503" fill="#8A8278" font-size="9">₹1,640 Cr · 8 assets · 5 beneficiaries</text>
                <text x="286" y="487" text-anchor="end" fill="#1A7840" font-size="8.5" font-weight="700">ACTIVE</text>
              </g>

              <!-- ─── TRUST: BHANDARI INVESTMENTS LLP ─── -->
              <g class="struct-g" style="animation-delay:.47s"
                @mouseenter="vizHovered = { type:'trust', name:'Bhandari Investments LLP', type_label:'LLP – Investment Vehicle', totalValue:'705', assetCount:3, settlor:'Devaraj & Rohan Bhandari' }"
                @mouseleave="vizHovered = null"
                @click="selectFromViz('struct-Bhandari Investments LLP')">
                <rect x="314" y="468" width="272" height="54" rx="8" fill="rgba(255,253,249,0.76)" stroke="rgba(255,255,255,0.82)" stroke-width="1" class="struct-rect"/>
                <rect x="314" y="468" width="3" height="54" rx="1.5" fill="rgba(74,104,128,0.65)"/>
                <text x="332" y="487" fill="#1A1410" font-size="10.5" font-weight="600" class="struct-name">Bhandari Investments LLP</text>
                <text x="332" y="503" fill="#8A8278" font-size="9">₹705 Cr · 3 assets · 2 partners</text>
                <text x="578" y="487" text-anchor="end" fill="#1A7840" font-size="8.5" font-weight="700">ACTIVE</text>
              </g>

              <!-- ─── TRUST: D.M. BHANDARI HUF ─── -->
              <g class="struct-g" style="animation-delay:.52s"
                @mouseenter="vizHovered = { type:'trust', name:'D.M. Bhandari HUF', type_label:'Hindu Undivided Family', totalValue:'445', assetCount:4, settlor:'Devaraj M. Bhandari (Karta)' }"
                @mouseleave="vizHovered = null"
                @click="selectFromViz('struct-D.M. Bhandari HUF')">
                <rect x="606" y="468" width="264" height="54" rx="8" fill="rgba(255,253,249,0.76)" stroke="rgba(255,255,255,0.82)" stroke-width="1" class="struct-rect"/>
                <rect x="606" y="468" width="3" height="54" rx="1.5" fill="rgba(196,154,60,0.65)"/>
                <text x="624" y="487" fill="#1A1410" font-size="10.5" font-weight="600" class="struct-name">D.M. Bhandari HUF</text>
                <text x="624" y="503" fill="#8A8278" font-size="9">₹445 Cr · 4 assets · coparceners</text>
                <text x="862" y="487" text-anchor="end" fill="#1A7840" font-size="8.5" font-weight="700">ACTIVE</text>
              </g>

            </svg>
          </div>

          <!-- Footer legend -->
          <div class="viz-footer">
            <div class="vf-legend">
              <span class="vfl-item">
                <span class="vfl-ring" style="border-color:rgba(196,154,60,0.55)"></span>Gen I
              </span>
              <span class="vfl-item">
                <span class="vfl-dot" style="background:#2DB87A"></span>Gen II
              </span>
              <span class="vfl-item">
                <span class="vfl-dot" style="background:#D95050; opacity:.6"></span>Minors (dashed)
              </span>
              <span class="vfl-item">
                <svg width="18" height="6" viewBox="0 0 18 6"><line x1="0" y1="3" x2="18" y2="3" stroke="rgba(122,88,48,0.5)" stroke-width="1.5" stroke-dasharray="5 3"/></svg>
                Marriage bond
              </span>
              <span class="vfl-item">
                <svg width="18" height="6" viewBox="0 0 18 6"><line x1="0" y1="3" x2="18" y2="3" stroke="rgba(122,88,48,0.35)" stroke-width="1.2" stroke-dasharray="3.5 3"/></svg>
                Minor lineage
              </span>
            </div>
            <div class="vf-note">Arc rings show share of ₹2,847 Cr AUM · Click any node to open profile</div>
          </div>

        </div>
      </div>
    </Transition>
    </Teleport>
  </div>

</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import { useWealthStore } from '../stores/wealth'
import { useToast } from '../composables/useToast'
const { toast } = useToast()

const wealth = useWealthStore()
const activeId = ref(null)
const tab = ref('profile')
const showViz = ref(false)
const vizHovered = ref(null)

const gen1 = computed(() => wealth.familyMembers.filter(m => ['Patriarch', 'Trustee'].includes(m.role_tag)))
const gen1ChildIds = computed(() => gen1.value.flatMap(m => m.children || []))
const gen2 = computed(() => wealth.familyMembers.filter(m => gen1ChildIds.value.includes(m.id)))
const gen2ChildIds = computed(() => gen2.value.flatMap(m => m.children || []))
const gen3 = computed(() => wealth.familyMembers.filter(m => gen2ChildIds.value.includes(m.id)))

const selectedMember = computed(() => wealth.familyMembers.find(m => m.id === activeId.value) || null)
const selectedStructure = computed(() => {
  if (!activeId.value?.startsWith('struct-')) return null
  const name = activeId.value.replace('struct-', '')
  return wealth.trusts.find(t => t.name === name) || null
})

const totalAUM = computed(() => wealth.familyMembers.reduce((s, m) => s + (m.netWorth || 0), 0))
function wealthShare(m) {
  return totalAUM.value > 0 ? (m.netWorth / totalAUM.value * 100).toFixed(1) : '0'
}

function pick(id) {
  activeId.value = activeId.value === id ? null : id
  tab.value = 'profile'
}
function pickStruct(t) {
  const id = `struct-${t.name}`
  activeId.value = activeId.value === id ? null : id
}

function memberAssets(member) {
  const first = member.name.split(' ')[0]
  return wealth.assets.filter(a => a.owners?.includes(first))
}

function selectFromViz(id) {
  showViz.value = false
  vizHovered.value = null
  if (id.startsWith('struct-')) {
    const name = id.replace('struct-', '')
    const t = wealth.trusts.find(t => t.name === name)
    if (t) pickStruct(t)
  } else {
    pick(id)
  }
}

function onEsc(e) { if (e.key === 'Escape') showViz.value = false }
onMounted(() => window.addEventListener('keydown', onEsc))
onBeforeUnmount(() => { showViz.value = false })
onUnmounted(() => window.removeEventListener('keydown', onEsc))
</script>

<style scoped>
.family-page {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--topbar-h) - 44px);
  min-height: 500px;
  gap: 14px;
}

/* PAGE HEADER */
.fp-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  flex-shrink: 0;
}
.fp-header h1 { font-size: 20px; font-weight: 600; letter-spacing: -.03em; margin-bottom: 4px; }
.fp-sub { font-size: 12px; color: var(--text3); }
.fp-actions { display: flex; gap: 8px; }

/* SPLIT VIEW */
.split-view {
  display: flex;
  flex: 1;
  min-height: 0;
  border: 1px solid var(--border);
  border-radius: var(--r2);
  overflow: hidden;
  background: var(--s1);
}

/* ═══ LEFT PANEL ═══ */
.left-panel {
  width: 288px;
  flex-shrink: 0;
  border-right: 1px solid var(--border);
  background: var(--s1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.lp-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 14px 10px;
}
.lp-scroll::-webkit-scrollbar { width: 2px; }
.lp-scroll::-webkit-scrollbar-thumb { background: var(--s4); }

/* Tree sections */
.tree-section { margin-bottom: 4px; }
.tree-indent  { margin-left: 16px; }
.tree-indent-2 { margin-left: 32px; }

.tree-section-label {
  font-size: 9.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
  color: var(--text3); padding: 4px 8px 6px; display: block;
}

/* Tree connector */
.tree-connector {
  display: flex; align-items: center; gap: 8px;
  padding: 4px 8px 4px 24px; margin: 2px 0;
}
.tree-connector--indent { padding-left: 40px; }
.tc-line {
  width: 12px; height: 1px; background: var(--border2); flex-shrink: 0;
}
.tc-label { font-size: 10px; color: var(--text3); font-style: italic; }

/* Tree nodes */
.tree-nodes { display: flex; flex-direction: column; gap: 2px; }
.tree-branch { position: relative; }
.tree-branch::before {
  content: '';
  position: absolute;
  left: -9px; top: 8px; bottom: 8px;
  width: 1px;
  background: var(--border2);
}

.tree-node {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 10px; border-radius: var(--r); cursor: pointer;
  transition: background .13s, border-color .13s; outline: none;
  border: 1px solid transparent; position: relative;
}
.tree-node::before {
  display: none; /* reset */
}
.tree-branch .tree-node::before {
  display: block;
  content: '';
  position: absolute;
  left: -9px; top: 50%;
  width: 9px; height: 1px;
  background: var(--border2);
}
.tree-node:hover { background: var(--nav-hover); }
.tree-node.active { background: var(--gold-dim); border-color: rgba(156,116,64,.2); }
.tree-node.minor { opacity: .75; }
.tree-node:focus-visible { outline: 2px solid var(--gold); outline-offset: 1px; }

.tn-av {
  width: 32px; height: 32px; border-radius: 50%;
  display: grid; place-items: center;
  font-size: 11px; font-weight: 700; flex-shrink: 0;
}
.tn-body { flex: 1; min-width: 0; }
.tn-name { font-size: 12.5px; font-weight: 500; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; letter-spacing: -.01em; }
.tn-meta { font-size: 10.5px; color: var(--text3); margin-top: 1px; }
.tn-right { display: flex; flex-direction: column; align-items: flex-end; gap: 3px; flex-shrink: 0; }
.tn-2fa { font-size: 9.5px; font-weight: 700; padding: 1.5px 5px; border-radius: 8px; }
.tn-2fa.ok { background: var(--green-dim); color: var(--green); }
.tn-2fa.warn { background: var(--red-dim); color: var(--red); }
.tn-worth { font-size: 10px; color: var(--text3); }
.tn-minor-tag { font-size: 9.5px; color: var(--text3); background: var(--s3); padding: 1px 5px; border-radius: 4px; }

/* Separator */
.lp-sep { height: 1px; background: var(--border); margin: 14px 4px; }
.lp-section-label {
  font-size: 9.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
  color: var(--text3); padding: 4px 8px 8px; display: block;
}

/* Structure list */
.struct-list { display: flex; flex-direction: column; gap: 2px; }
.struct-node {
  display: flex; align-items: center; gap: 9px;
  padding: 8px 10px; border-radius: var(--r); cursor: pointer;
  transition: background .13s; outline: none;
  border: 1px solid transparent;
}
.struct-node:hover { background: var(--nav-hover); }
.struct-node.active { background: var(--gold-dim); border-color: rgba(156,116,64,.2); }
.struct-node:focus-visible { outline: 2px solid var(--gold); outline-offset: 1px; }
.sn-icon { color: var(--gold); display: grid; place-items: center; flex-shrink: 0; }
.sn-body { flex: 1; min-width: 0; }
.sn-name { font-size: 12px; font-weight: 500; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sn-meta { font-size: 10.5px; color: var(--text3); margin-top: 2px; }
.sn-status { font-size: 9.5px; flex-shrink: 0; }

/* ═══ RIGHT PANEL ═══ */
.right-panel {
  flex: 1;
  overflow-y: auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.right-panel::-webkit-scrollbar { width: 3px; }
.right-panel::-webkit-scrollbar-thumb { background: var(--s4); }

/* Empty state */
.rp-empty {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 10px; padding: 40px;
  color: var(--text3); text-align: center;
}
.rp-empty-icon {
  width: 56px; height: 56px; border-radius: 50%;
  background: var(--s2); border: 1px solid var(--border);
  display: grid; place-items: center; opacity: .5;
}
.rp-empty-title { font-size: 15px; font-weight: 500; color: var(--text2); letter-spacing: -.02em; }
.rp-empty-sub { font-size: 13px; max-width: 300px; line-height: 1.6; }
.rp-empty-hint { font-size: 11.5px; color: var(--text3); opacity: .6; }

/* Member detail */
.rp-member, .rp-struct { display: flex; flex-direction: column; }

.rp-header {
  display: flex; align-items: center; gap: 16px; justify-content: space-between;
  padding: 20px 24px 16px; border-bottom: 1px solid var(--border);
  flex-wrap: wrap; flex-shrink: 0;
}
.rp-identity { display: flex; align-items: center; gap: 14px; }
.rp-av {
  width: 52px; height: 52px; border-radius: 50%;
  display: grid; place-items: center; font-size: 16px; font-weight: 700; flex-shrink: 0;
}
.rp-av--struct {
  background: var(--gold-dim); border: 2px solid rgba(156,116,64,.3); color: var(--gold);
}
.rp-name { font-size: 18px; font-weight: 600; letter-spacing: -.03em; margin-bottom: 7px; }
.rp-tags { display: flex; gap: 6px; flex-wrap: wrap; }

.rp-wealth-share { text-align: right; flex-shrink: 0; }
.rws-label { font-size: 11px; color: var(--text3); margin-bottom: 6px; }
.rws-bar { width: 160px; height: 4px; background: var(--s3); border-radius: 2px; overflow: hidden; }
.rws-fill { height: 100%; border-radius: 2px; transition: width .5s cubic-bezier(.4,0,.2,1); }

/* Tabs */
.rp-tabs {
  display: flex; gap: 0; border-bottom: 1px solid var(--border);
  padding: 0 24px; flex-shrink: 0;
}
.rtab {
  padding: 10px 16px; border: none; background: transparent;
  font-size: 13px; font-weight: 500; color: var(--text3); cursor: pointer;
  transition: color .14s; position: relative; border-bottom: 2px solid transparent;
  margin-bottom: -1px; display: flex; align-items: center; gap: 6px;
}
.rtab:hover { color: var(--text2); }
.rtab.active { color: var(--text); border-bottom-color: var(--gold); }
.rtab-n {
  font-size: 10.5px; font-weight: 700; padding: 1px 6px; border-radius: 10px;
  background: var(--s3); color: var(--text3);
}
.rtab.active .rtab-n { background: var(--gold-dim); color: var(--gold-soft); }

/* Tab body */
.rp-body { padding: 22px 24px; flex: 1; }
.rp-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
.rp-col {}
.col-head {
  font-size: 10px; font-weight: 700; letter-spacing: .10em; text-transform: uppercase;
  color: var(--text3); margin-bottom: 12px; padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}
.info-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 9px 0; border-bottom: 1px solid var(--border); font-size: 13px;
}
.info-row:last-child { border-bottom: none; }
.il { color: var(--text3); font-size: 12px; }
.iv { color: var(--text); text-align: right; }
.empty-sm { font-size: 12px; color: var(--text3); font-style: italic; padding: 4px 0; }

/* Vehicles */
.vehicle-list { display: flex; flex-direction: column; gap: 6px; }
.vehicle-row {
  display: flex; align-items: flex-start; gap: 8px;
  font-size: 12.5px; color: var(--text2);
  padding: 8px 10px; background: var(--s2); border-radius: var(--r);
  border: 1px solid var(--border); line-height: 1.4;
}

/* Net worth */
.nw-block { margin-bottom: 4px; }
.nw-val { font-size: 24px; font-weight: 200; letter-spacing: -.05em; color: var(--text); line-height: 1; margin-bottom: 6px; }
.nw-pct { font-size: 11.5px; color: var(--text3); margin-bottom: 8px; }
.nw-bar { height: 4px; background: var(--s3); border-radius: 2px; overflow: hidden; }
.nw-fill { height: 100%; border-radius: 2px; transition: width .5s cubic-bezier(.4,0,.2,1); }

/* Holdings table */
.holdings-wrap {}
.ht-head {
  display: grid; grid-template-columns: 2.5fr 1.1fr 1.5fr 1fr .8fr 1fr;
  padding: 6px 0; font-size: 10.5px; font-weight: 600; color: var(--text3);
  border-bottom: 1px solid var(--border); letter-spacing: .03em; gap: 8px;
}
.ht-hc--asset {}
.ht-hc--r { text-align: right; }
.ht-row {
  display: grid; grid-template-columns: 2.5fr 1.1fr 1.5fr 1fr .8fr 1fr;
  padding: 10px 0; border-bottom: 1px solid var(--border); gap: 8px;
  align-items: center; transition: background .12s;
}
.ht-row:last-child { border-bottom: none; }
.ht-row:hover { background: var(--row-hover); border-radius: var(--r); }
.hta-name { font-size: 12.5px; font-weight: 500; color: var(--text); }
.hta-desc { font-size: 10.5px; color: var(--text3); margin-top: 2px; }
.ht-entity { font-size: 11px; color: var(--text2); }
.ht-val { font-size: 12.5px; color: var(--text); text-align: right; }
.ht-pl { font-size: 12px; font-weight: 500; text-align: right; }
.ht-pl.pos { color: var(--green); }
.ht-pl.neg { color: var(--red); }
.rp-empty-sm { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 40px; color: var(--text3); font-size: 13px; }

/* LRS section */
.lrs-section { display: flex; flex-direction: column; gap: 14px; }
.lrs-metrics { display: flex; gap: 24px; }
.lrs-m {}
.lrs-mv { font-size: 20px; font-weight: 250; letter-spacing: -.04em; line-height: 1; margin-bottom: 4px; }
.lrs-ml { font-size: 10.5px; color: var(--text3); font-weight: 500; text-transform: uppercase; letter-spacing: .06em; }
.lrs-bar-wrap { height: 6px; background: var(--s3); border-radius: 3px; overflow: hidden; }
.lrs-bar-fill { height: 100%; border-radius: 3px; transition: width .5s cubic-bezier(.4,0,.2,1); }
.lrs-foot { display: flex; justify-content: space-between; font-size: 11px; color: var(--text3); }

/* Checklist */
.checklist { display: flex; flex-direction: column; }
.cl-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border); }
.cl-row:last-child { border-bottom: none; }
.cl-l { font-size: 12.5px; color: var(--text2); }
.cl-v { font-size: 12px; color: var(--text2); }

/* Structure detail */
.struct-reg { font-size: 12px; color: var(--text3); padding: 0 24px 0; margin-top: -4px; }
.struct-metrics {
  display: flex; align-items: center;
  margin: 20px 24px 0; background: var(--s2); border: 1px solid var(--border);
  border-radius: var(--r); overflow: hidden;
}
.sm-block { flex: 1; padding: 14px 16px; text-align: center; }
.sm-div { width: 1px; background: var(--border); align-self: stretch; }
.sm-val { font-size: 20px; font-weight: 250; letter-spacing: -.04em; color: var(--text); line-height: 1; margin-bottom: 5px; }
.sm-lbl { font-size: 10px; color: var(--text3); font-weight: 600; text-transform: uppercase; letter-spacing: .06em; }

.trustee-list { display: flex; flex-direction: column; gap: 6px; }
.trustee-row { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--text2); }
.tr-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }

/* Right-panel transition */
.rp-fade-enter-active { transition: opacity .18s ease, transform .18s ease; }
.rp-fade-leave-active { transition: opacity .12s ease; position: absolute; width: 100%; }
.rp-fade-enter-from { opacity: 0; transform: translateX(6px); }
.rp-fade-leave-to   { opacity: 0; }

/* ═══════════════════════════════════════════════ */
/*  FAMILY CONSTELLATION VISUALIZER               */
/* ═══════════════════════════════════════════════ */

/* Overlay */
.viz-overlay {
  position: fixed; inset: 0; z-index: 300;
  background: rgba(80, 50, 20, 0.22);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}

/* Modal panel */
.viz-modal {
  width: 100%; max-width: 980px;
  max-height: 92vh;
  display: flex; flex-direction: column;
  background: rgba(255, 253, 249, 0.88);
  backdrop-filter: blur(32px) saturate(1.6);
  -webkit-backdrop-filter: blur(32px) saturate(1.6);
  border: 1px solid rgba(255, 255, 255, 0.88);
  border-radius: 16px;
  box-shadow: 0 32px 80px rgba(90, 55, 10, 0.22), inset 0 1px 0 rgba(255,255,255,0.96);
  overflow: hidden;
  position: relative;
}

/* Modal header */
.viz-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 24px 16px;
  border-bottom: 1px solid rgba(30, 22, 12, 0.08);
  flex-shrink: 0;
  background: rgba(250, 246, 240, 0.60);
}
.viz-eyebrow {
  font-size: 9.5px; font-weight: 700; letter-spacing: .14em;
  text-transform: uppercase; color: var(--text3); margin-bottom: 4px;
}
.viz-title {
  font-size: 18px; font-weight: 600; letter-spacing: -.03em; color: var(--text);
}
.viz-head-right {
  display: flex; align-items: center; gap: 14px; flex-shrink: 0;
}
.viz-stat {
  font-size: 11.5px; color: var(--text3);
}
.viz-stat .mono { color: var(--text); font-weight: 500; }
.viz-divider-v { width: 1px; height: 14px; background: var(--border); }
.viz-close-btn {
  width: 30px; height: 30px; border-radius: 50%;
  background: rgba(30, 22, 12, 0.05); border: 1px solid var(--border);
  color: var(--text3); cursor: pointer; display: grid; place-items: center;
  transition: all .15s; flex-shrink: 0;
}
.viz-close-btn:hover { background: var(--red-dim); color: var(--red); border-color: rgba(160,40,40,.2); }

/* Hover info card */
.viz-hcard {
  position: absolute; top: 72px; right: 24px; z-index: 10;
  background: rgba(255, 253, 249, 0.92);
  backdrop-filter: blur(20px) saturate(1.5);
  -webkit-backdrop-filter: blur(20px) saturate(1.5);
  border: 1px solid rgba(255,255,255,0.88);
  border-radius: 10px;
  box-shadow: 0 8px 28px rgba(90,55,10,0.14), inset 0 1px 0 rgba(255,255,255,0.95);
  padding: 12px 14px;
  display: flex; gap: 10px; align-items: flex-start;
  min-width: 200px; max-width: 260px;
  pointer-events: none;
}
.vhc-av {
  width: 36px; height: 36px; border-radius: 50%;
  display: grid; place-items: center;
  font-size: 12px; font-weight: 700; flex-shrink: 0;
}
.vhc-struct-av {
  background: var(--gold-dim); border: 1.5px solid rgba(122,88,48,.3); color: var(--gold);
}
.vhc-body { flex: 1; min-width: 0; }
.vhc-name { font-size: 12.5px; font-weight: 600; color: var(--text); letter-spacing: -.01em; margin-bottom: 3px; }
.vhc-role { font-size: 10.5px; color: var(--text3); margin-bottom: 5px; }
.vhc-worth { font-size: 12px; color: var(--gold); margin-bottom: 4px; }
.vhc-trusts { font-size: 9.5px; color: var(--text3); line-height: 1.5; }

/* SVG canvas */
.viz-canvas {
  flex: 1; overflow: hidden;
  padding: 8px 16px 0;
  display: flex; align-items: stretch;
}
.viz-svg {
  width: 100%; height: 100%;
  display: block;
}

/* SVG element styles */
.viz-svg text {
  font-family: 'Inter', system-ui, sans-serif;
}
.viz-svg .node-worth,
.viz-svg .struct-name { font-family: 'JetBrains Mono', monospace; }

.viz-svg .sec-lbl {
  font-size: 8.5px; font-weight: 700;
  letter-spacing: .16em; text-transform: uppercase;
  fill: rgba(138,130,120,0.7);
  font-family: 'Inter', system-ui, sans-serif;
}
.viz-svg .wealth-arc { stroke-linecap: round; }

/* Node interactions */
.viz-svg .node-g { cursor: pointer; }
.viz-svg .node-g .node-glow { transition: opacity .2s ease; }
.viz-svg .node-g:hover .node-glow { opacity: 1 !important; }
.viz-svg .node-g .node-circle { transition: stroke-width .15s ease; }
.viz-svg .node-g:hover .node-circle { stroke-width: 2.8; }
.viz-svg .node-g.node-minor { opacity: .78; }
.viz-svg .node-g.node-minor:hover { opacity: 1; }

/* Node enter animation */
@keyframes node-appear {
  from { opacity: 0; }
  to { opacity: 1; }
}
.viz-svg .node-g {
  animation: node-appear 0.45s ease both;
}
.viz-svg .wealth-arc {
  animation: node-appear 0.6s ease both;
  animation-delay: 0.3s;
}

/* Structure boxes */
.viz-svg .struct-g { cursor: pointer; }
.viz-svg .struct-g .struct-rect { transition: filter .15s ease; }
.viz-svg .struct-g:hover .struct-rect {
  filter: drop-shadow(0 4px 12px rgba(90,55,10,0.14));
}
.viz-svg .struct-g {
  animation: node-appear 0.4s ease both;
}

/* Footer */
.viz-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 24px 12px;
  border-top: 1px solid rgba(30, 22, 12, 0.06);
  flex-shrink: 0;
  background: rgba(250, 246, 240, 0.50);
}
.vf-legend { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
.vfl-item {
  display: flex; align-items: center; gap: 5px;
  font-size: 10.5px; color: var(--text3);
}
.vfl-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.vfl-ring {
  width: 10px; height: 10px; border-radius: 50%;
  border: 2px solid; flex-shrink: 0;
}
.vf-note { font-size: 10px; color: var(--text3); opacity: .75; text-align: right; }

/* Viz transition */
.viz-fade-enter-active { transition: opacity .2s ease, transform .2s cubic-bezier(.4,0,.2,1); }
.viz-fade-leave-active { transition: opacity .15s ease, transform .15s ease; }
.viz-fade-enter-from { opacity: 0; transform: scale(.97); }
.viz-fade-leave-to   { opacity: 0; transform: scale(.96); }

/* Hover card transition */
.hcard-fade-enter-active { transition: opacity .15s ease, transform .15s ease; }
.hcard-fade-leave-active { transition: opacity .1s ease; }
.hcard-fade-enter-from { opacity: 0; transform: translateX(6px); }
.hcard-fade-leave-to   { opacity: 0; }
</style>
