import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWealthStore = defineStore('wealth', () => {

  const assets = ref([
    { id:1, name:'Walkeshwar Crescent, Mumbai', desc:'A Wing 22 & B Wing 18 · Malabar Hill', class:'Real Estate', entity:'D.M. Bhandari HUF', owners:['Devaraj','Meera'], value:248.4, cost:41.2, currency:'₹ Cr', plPct:'+502%', recon:'14 Feb 2026', status:'Clean' },
    { id:2, name:'Core Compounders PMS', desc:'360 ONE Wealth · 22 positions', class:'Listed Equity', entity:'MB Family Trust', owners:['Devaraj','Meera','Rohan'], value:612.7, cost:487.9, currency:'₹ Cr', plPct:'+25.6%', recon:'27 May 2026', status:'Clean' },
    { id:3, name:'Bhandari Ventures Fund III', desc:'SEBI AIF Cat II · Vintage 2022', class:'Private Equity', entity:'Bhandari Investments LLP', owners:['Devaraj'], value:184.0, cost:163.0, currency:'₹ Cr', plPct:'+12.9%', recon:'31 Mar 2026', status:'Clean' },
    { id:4, name:'Sovereign & AAA Bond Ladder', desc:'G-Secs, NHAI, REC · 11 yr avg maturity', class:'Fixed Income', entity:'MB Family Trust', owners:['Devaraj','Meera','Rohan','Priya'], value:398.2, cost:336.1, currency:'₹ Cr', plPct:'+18.5%', recon:'27 May 2026', status:'Clean' },
    { id:5, name:"Vault — Brady's Gallery, Fort", desc:'Gold bars, silver, heirloom jewellery · 14 instruments', class:'Gold & Bullion', entity:'D.M. Bhandari HUF', owners:['Devaraj','Meera'], value:142.6, cost:64.3, currency:'₹ Cr', plPct:'+121.8%', recon:'14 Apr 2026', status:'Clean' },
    { id:6, name:'Marina Bay Trust, Singapore', desc:'DBS Private · USD 21.4M NAV', class:'Offshore', entity:'Marina Bay Trust (SG)', owners:['Devaraj','Meera','Rohan','Priya'], value:181.8, cost:150.6, currency:'₹ Cr', plPct:'+20.7%', recon:'31 Mar 2026', status:'Pending' },
    { id:7, name:'Sahyadri Orchard, Nashik', desc:'84 acres · Dindori Taluka · vineyard', class:'Real Estate', entity:'D.M. Bhandari HUF', owners:['Devaraj'], value:31.8, cost:11.4, currency:'₹ Cr', plPct:'+178.9%', recon:'01 Jan 2026', status:'Clean' },
    { id:8, name:'Husain & Souza Collection', desc:'21 works · Drawing room, Walkeshwar', class:'Art & Alternatives', entity:'MB Family Trust', owners:['Devaraj','Meera'], value:86.4, cost:57.5, currency:'₹ Cr', plPct:'+50.3%', recon:'09 Mar 2026', status:'Clean' },
    { id:9, name:'Bhandari Cotton Mills Pvt Ltd', desc:'CIN U17110GJ1948PTC000412 · 64.2% stake', class:'Operating Company', entity:'Bhandari Investments LLP', owners:['Devaraj','Rohan'], value:521.0, cost:461.1, currency:'₹ Cr', plPct:'+13.0%', recon:'18 Apr 2026', status:'Clean' },
    { id:10, name:'Worli Sea-View Penthouse', desc:'Antilia Road, Worli, Mumbai 400018', class:'Real Estate', entity:'Meera D. Bhandari', owners:['Meera'], value:148.0, cost:28.0, currency:'₹ Cr', plPct:'+428.6%', recon:'14 Feb 2026', status:'Variance' },
    { id:11, name:'Rohan Bhandari Demat Folio', desc:'HDFC Sky · 8 holdings', class:'Listed Equity', entity:'Rohan Bhandari', owners:['Rohan'], value:18.4, cost:14.8, currency:'₹ Cr', plPct:'+24.3%', recon:'27 May 2026', status:'Clean' },
    { id:12, name:'Rajasthan Agri Land · 220 acres', desc:'Sikar District · Khasra 4421–4449', class:'Real Estate', entity:'D.M. Bhandari HUF', owners:['Devaraj'], value:22.6, cost:6.1, currency:'₹ Cr', plPct:'+270.5%', recon:'01 Dec 2025', status:'Pending' },
  ])

  const familyMembers = ref([
    {
      id:'devaraj',
      name:'Devaraj M. Bhandari',
      role:'Patriarch',
      age:68,
      pan:'AABDB4412F',
      email:'devaraj@mb-family.in',
      phone:'+91 98200 07743',
      dob:'12 Mar 1958',
      relation:'Head',
      initials:'DB',
      color:'#C49A3C',
      lrs_used: 840000,
      lrs_limit: 250000,
      trusts:['MB Family Trust','Bhandari Investments LLP'],
      role_tag:'Patriarch',
      twofa:true,
      last_login:'Today, 04:18 IST',
      netWorth: 1840.0,
      children:['rohan','priya','arjun_minor']
    },
    {
      id:'meera',
      name:'Meera D. Bhandari',
      role:'Trustee',
      age:64,
      pan:'AABDB4413G',
      email:'meera@mb-family.in',
      phone:'+91 98200 07744',
      dob:'04 Sep 1961',
      relation:'Spouse of Patriarch',
      initials:'MB',
      color:'#4A90D9',
      lrs_used: 500000,
      lrs_limit: 250000,
      trusts:['MB Family Trust'],
      role_tag:'Trustee',
      twofa:true,
      last_login:'26 May 2026',
      netWorth: 621.0,
      children:['rohan','priya','arjun_minor']
    },
    {
      id:'rohan',
      name:'Rohan Bhandari',
      role:'Beneficiary',
      age:38,
      pan:'ABHB1234R',
      email:'rohan@mb-family.in',
      phone:'+91 98200 07745',
      dob:'17 Jun 1987',
      relation:'Son of Devaraj',
      initials:'RB',
      color:'#2DB87A',
      lrs_used: 0,
      lrs_limit: 250000,
      trusts:['MB Family Trust','Bhandari Investments LLP'],
      role_tag:'Beneficiary',
      twofa:true,
      last_login:'24 May 2026',
      netWorth: 238.0,
      children:['kavya_minor']
    },
    {
      id:'priya',
      name:'Priya Bhandari-Shah',
      role:'Beneficiary',
      age:34,
      pan:'ABHB5678P',
      email:'priya@mb-family.in',
      phone:'+91 98200 07746',
      dob:'22 Nov 1991',
      relation:'Daughter of Devaraj',
      initials:'PS',
      color:'#8B5CF6',
      lrs_used: 0,
      lrs_limit: 250000,
      trusts:['MB Family Trust'],
      role_tag:'Beneficiary',
      twofa:false,
      last_login:'20 May 2026',
      netWorth: 148.0,
      children:[]
    },
    {
      id:'arjun_minor',
      name:'Arjun Bhandari',
      role:'Minor Beneficiary',
      age:9,
      pan:'—',
      email:'—',
      phone:'—',
      dob:'03 Jan 2017',
      relation:'Son of Devaraj (Minor)',
      initials:'AB',
      color:'#D4882A',
      lrs_used: 0,
      lrs_limit: 0,
      trusts:['MB Family Trust'],
      role_tag:'Minor',
      twofa:false,
      last_login:'—',
      netWorth: 0,
      children:[]
    },
    {
      id:'kavya_minor',
      name:'Kavya Bhandari',
      role:'Minor Beneficiary',
      age:6,
      pan:'—',
      email:'—',
      phone:'—',
      dob:'15 Aug 2019',
      relation:'Daughter of Rohan (Minor)',
      initials:'KB',
      color:'#D95050',
      lrs_used: 0,
      lrs_limit: 0,
      trusts:['MB Family Trust'],
      role_tag:'Minor',
      twofa:false,
      last_login:'—',
      netWorth: 0,
      children:[]
    },
  ])

  const trusts = ref([
    {
      name: 'MB Family Trust',
      type: 'Private Discretionary Trust',
      reg: 'Indian Trusts Act, 1882 · Reg. No. MH/TR/2014/0012',
      settlor: 'Devaraj M. Bhandari',
      trustees: ['Devaraj M. Bhandari', 'Meera D. Bhandari', 'Aiyar & Co. (Independent)'],
      beneficiaries: ['Meera D. Bhandari', 'Rohan Bhandari', 'Priya Bhandari-Shah', 'Arjun Bhandari', 'Kavya Bhandari'],
      assetCount: 8,
      totalValue: 1640.0,
      counsel: 'Aiyar & Co., Mumbai',
      nextReview: 'Sep 2026',
      status: 'Active'
    },
    {
      name: 'Bhandari Investments LLP',
      type: 'LLP – Investment Vehicle',
      reg: 'LLPIN AAB-1234 · MCA registered',
      settlor: '—',
      trustees: ['Devaraj M. Bhandari (DP)', 'Rohan Bhandari (DP)'],
      beneficiaries: ['Devaraj M. Bhandari', 'Rohan Bhandari'],
      assetCount: 3,
      totalValue: 705.0,
      counsel: 'Khaitan & Co., Mumbai',
      nextReview: 'Mar 2027',
      status: 'Active'
    },
    {
      name: 'D.M. Bhandari HUF',
      type: 'Hindu Undivided Family',
      reg: 'PAN AABDH1122F · Self-governed',
      settlor: 'Devaraj M. Bhandari (Karta)',
      trustees: ['Devaraj M. Bhandari (Karta)'],
      beneficiaries: ['All coparceners – 5 members'],
      assetCount: 4,
      totalValue: 445.4,
      counsel: 'S. R. Batliboi & Co.',
      nextReview: 'Ongoing',
      status: 'Active'
    },
  ])

  const reconItems = ref([
    { id:1, sev:'high',   asset:'Worli Sea-View Penthouse',    src:'CBRE Valuation',     custodian:'₹152.4 Cr', ledger:'₹148.0 Cr', variance:'+₹4.4 Cr',  reason:'Valuation report date mismatch — custodian using Q1 figure', maker:'S. R. Mehta', checker:'Pending', status:'open' },
    { id:2, sev:'high',   asset:'Marina Bay Trust (DBS)',      src:'DBS Statement Apr',  custodian:'$21.8M',    ledger:'$21.4M',    variance:'+$0.4M',    reason:'Accrued interest not yet credited in internal ledger',       maker:'Rohan B.',   checker:'Pending', status:'open' },
    { id:3, sev:'high',   asset:'Bhandari Cotton Mills',       src:'EY Valuation',       custodian:'₹534.2 Cr', ledger:'₹521.0 Cr', variance:'+₹13.2 Cr', reason:'FY25 PAT adjustment not reflected — pending board approval',  maker:'S. R. Mehta', checker:'Pending', status:'open' },
    { id:4, sev:'high',   asset:'Sahyadri Orchard NCD',        src:'HDFC Bank DP',       custodian:'₹12.8 Cr',  ledger:'₹11.4 Cr',  variance:'+₹1.4 Cr',  reason:'Coupon reinvestment transaction missing from ledger',         maker:'Pending',    checker:'—',       status:'open' },
    { id:5, sev:'medium', asset:'Rajasthan Agri Land',         src:'Circle Rate Update', custodian:'₹23.8 Cr',  ledger:'₹22.6 Cr',  variance:'+₹1.2 Cr',  reason:'State circle rate revised Jan 2026 — ledger not updated',     maker:'S. R. Mehta', checker:'Pending', status:'open' },
    { id:6, sev:'medium', asset:'REC Bond FD-7742',            src:'REC Statement',      custodian:'₹50.8 Cr',  ledger:'₹50.1 Cr',  variance:'+₹70L',     reason:'Quarterly coupon accrual timing difference',                  maker:'Pending',    checker:'—',       status:'open' },
  ])

  const documents = ref([
    { id:1,  name:'Walkeshwar — Sale Deed 2017',      type:'pdf',  category:'Sale Deed',    asset:'Walkeshwar Crescent', date:'Mar 2017', size:'4.2 MB', expiry:null },
    { id:2,  name:'Walkeshwar — RERA Cert P51800',    type:'pdf',  category:'RERA',         asset:'Walkeshwar Crescent', date:'Jun 2019', size:'1.8 MB', expiry:'Jun 2026' },
    { id:3,  name:'CBRE Valuation Report Q1 FY26',    type:'pdf',  category:'Valuation',    asset:'Walkeshwar Crescent', date:'Feb 2026', size:'6.1 MB', expiry:null },
    { id:4,  name:'360 ONE PMS Statement Apr 2026',   type:'xlsx', category:'Statement',    asset:'Core Compounders PMS', date:'May 2026', size:'0.9 MB', expiry:null },
    { id:5,  name:'BVF III — PPM (Confidential)',     type:'pdf',  category:'Trust / Legal',asset:'Bhandari Ventures III', date:'Aug 2022', size:'14.2 MB', expiry:null },
    { id:6,  name:'Capital Call Notice Tranche 6',    type:'pdf',  category:'PE Notice',    asset:'Bhandari Ventures III', date:'May 2026', size:'0.4 MB', expiry:null },
    { id:7,  name:'DBS Singapore Statement Apr 2026', type:'pdf',  category:'Statement',    asset:'Marina Bay Trust', date:'May 2026', size:'2.1 MB', expiry:null },
    { id:8,  name:'FEMA A2 Form — SG Remittance',    type:'pdf',  category:'FEMA / RBI',   asset:'Marina Bay Trust', date:'Jan 2022', size:'0.2 MB', expiry:null },
    { id:9,  name:'SBI Locker Receipt — Vault 14A',  type:'pdf',  category:'Vault',        asset:"Brady's Gallery Vault", date:'Nov 2021', size:'0.3 MB', expiry:null },
    { id:10, name:'Tata AIG Bullion Insurance FY26',  type:'pdf',  category:'Insurance',    asset:"Brady's Gallery Vault", date:'May 2025', size:'1.1 MB', expiry:'May 2026' },
    { id:11, name:'EY Valuation — Cotton Mills FY25', type:'pdf',  category:'Valuation',    asset:'Bhandari Cotton Mills', date:'Apr 2026', size:'8.8 MB', expiry:null },
    { id:12, name:'MCA Annual Return FY25',           type:'xlsx', category:'Compliance',   asset:'Bhandari Cotton Mills', date:'Sep 2025', size:'0.6 MB', expiry:null },
    { id:13, name:'MB Family Trust Deed 2014',        type:'pdf',  category:'Trust / Legal',asset:'All', date:'Sep 2014', size:'3.4 MB', expiry:null },
    { id:14, name:'Codicil III — Draft May 2026',     type:'pdf',  category:'Succession',   asset:'All', date:'May 2026', size:'0.8 MB', expiry:null },
    { id:15, name:'Form 26AS — FY 2024-25',           type:'pdf',  category:'Tax',          asset:'All', date:'Jun 2025', size:'1.2 MB', expiry:null },
    { id:16, name:'Allianz Art Insurance — FY26',     type:'pdf',  category:'Insurance',    asset:'Husain & Souza Collection', date:'May 2026', size:'0.9 MB', expiry:'May 2027' },
    { id:17, name:"Sotheby's Appraisal — Husain 2024",type:'pdf',  category:'Valuation',    asset:'Husain & Souza Collection', date:'Nov 2024', size:'2.4 MB', expiry:null },
    { id:18, name:'7/12 Extract — Sahyadri Orchard',  type:'pdf',  category:'Land Records', asset:'Sahyadri Orchard', date:'Jan 2025', size:'0.3 MB', expiry:null },
  ])

  function approveRecon(id) {
    const item = reconItems.value.find(r => r.id === id)
    if (item) item.status = 'approved'
  }
  function rejectRecon(id, reason) {
    const item = reconItems.value.find(r => r.id === id)
    if (item) { item.status = 'rejected'; item.rejectReason = reason; }
  }
  function addAsset(asset) {
    assets.value.push({ id: Date.now(), ...asset, recon: 'Just now', status: 'Clean' })
  }
  function addDocument(doc) {
    documents.value.unshift({ id: Date.now(), ...doc })
  }

  return { assets, familyMembers, trusts, reconItems, documents, approveRecon, rejectRecon, addAsset, addDocument }
})
