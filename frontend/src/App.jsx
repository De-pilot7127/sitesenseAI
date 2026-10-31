import { Routes, Route, NavLink, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, FolderKanban, Camera, BrainCircuit, Boxes, Wallet, FileText,
  Users, UserRound, Bell, Settings, Search, Menu, X, ChevronRight, ArrowUpRight,
  ArrowDownRight, Plus, SlidersHorizontal, CalendarDays, MapPin, MoreHorizontal,
  Sparkles, Send, UploadCloud, ShieldCheck, Clock3, TrendingUp, Construction,
  Building2, CircleDollarSign, ClipboardCheck, TriangleAlert, Download, Eye,
  CheckCircle2, LogOut, EyeOff, Mail, LockKeyhole, Phone, BriefcaseBusiness
} from 'lucide-react'
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import { api } from './services/api'

const projects = [
  { name: 'One Riverside Towers', location: 'Westlands, Nairobi', completion: 68, budget: 'KES 48.2M', health: 'Good', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900' },
  { name: 'Kijani Garden Villas', location: 'Karen, Nairobi', completion: 82, budget: 'KES 31.7M', health: 'Good', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900' },
  { name: 'Mombasa Trade Centre', location: 'Nyali, Mombasa', completion: 43, budget: 'KES 62.4M', health: 'At Risk', image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=900' },
]

const progressData = [
  { month: 'Jan', planned: 18, actual: 16 }, { month: 'Feb', planned: 28, actual: 25 },
  { month: 'Mar', planned: 38, actual: 34 }, { month: 'Apr', planned: 48, actual: 45 },
  { month: 'May', planned: 58, actual: 54 }, { month: 'Jun', planned: 68, actual: 68 },
]
const spendData = [
  { month: 'Jan', planned: 24, actual: 21 }, { month: 'Feb', planned: 31, actual: 28 },
  { month: 'Mar', planned: 38, actual: 42 }, { month: 'Apr', planned: 44, actual: 43 },
  { month: 'May', planned: 51, actual: 49 }, { month: 'Jun', planned: 58, actual: 60 },
]

function Brand({ compact = false }) {
  return <div className="brand"><div className="brand-mark"><Construction size={19}/></div>{!compact && <div><strong>SITESENSE</strong><span>AI</span></div>}</div>
}

function Landing() {
  const navigate = useNavigate()
  return <div className="landing">
    <nav className="landing-nav">
      <Brand />
      <div className="nav-links"><a href="#platform">Platform</a><a href="#intelligence">Intelligence</a><a href="#pricing">Pricing</a></div>
      <div className="nav-actions"><button className="btn ghost" onClick={() => navigate('/login')}>Sign in</button><button className="btn primary" onClick={() => navigate('/app')}>Explore platform <ArrowUpRight size={16}/></button></div>
    </nav>
    <main className="hero">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <motion.div className="hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }}>
        <div className="eyebrow"><span/> CONSTRUCTION INTELLIGENCE PLATFORM</div>
        <h1>BUILD SMARTER.<br/><em>MONITOR EVERYTHING.</em></h1>
        <p>Transform construction operations with intelligent project monitoring, AI-powered progress analysis and predictive construction intelligence.</p>
        <div className="hero-actions"><button className="btn primary large" onClick={() => navigate('/app')}>Explore platform <ArrowUpRight size={18}/></button><button className="btn glass large"><span className="play">▶</span> Watch experience</button></div>
      </motion.div>
      <motion.div className="hero-preview" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .35, duration: .9 }}>
        <div className="preview-head"><div><span className="live-dot"/> LIVE PROJECT</div><span>ONE RIVERSIDE</span></div>
        <div className="preview-ring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="48"/><circle className="ring-progress" cx="60" cy="60" r="48"/></svg><div><strong>68%</strong><span>Complete</span></div></div>
        <div className="preview-metrics">
          <Metric label="Budget utilization" value="74%" color="amber"/>
          <Metric label="Materials efficiency" value="91%" color="green"/>
          <div className="health"><span>Project health</span><strong><ShieldCheck size={14}/> Good</strong></div>
        </div>
      </motion.div>
    </main>
    <section className="trust"><span>TRUSTED ON ACTIVE PROJECTS</span><div>HASSAN • <b>KAHAWA</b> • RIVERA <span className="trust-line"/></div></section>
    <section className="landing-section" id="platform"><div className="section-label">01 — PLATFORM</div><h2>One source of truth.<br/>Every site, every detail.</h2><div className="feature-grid">{[
      ['01','Project Intelligence','Monitor milestones, budgets, teams and progress from a single operational view.'],
      ['02','AI Site Analysis','Turn site photographs into structured progress and risk observations.'],
      ['03','Predictive Operations','Identify delays, shortages and unusual expenditure before they escalate.']
    ].map(x => <div className="feature" key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p><ArrowUpRight/></div>)}</div></section>
    <section className="landing-section intelligence" id="intelligence"><div><div className="section-label">02 — INTELLIGENCE</div><h2>See what’s changing.<br/><em>Act before it matters.</em></h2></div><div className="ai-preview"><div className="ai-orbit"><BrainCircuit size={42}/></div><div><span>ACTIVE ANALYSIS</span><strong>3 signals require attention</strong><p>Material variance detected at Riverside Towers</p></div></div></section>
    <footer className="landing-footer"><Brand/><span>© 2026 SiteSense AI</span><button className="btn primary" onClick={() => navigate('/app')}>Open platform</button></footer>
  </div>
}
function Metric({label,value,color}) { return <div><span>{label}</span><strong className={color}>{value}</strong></div> }

function AuthPage({ register = false }) {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  return <div className="auth-page"><div className="auth-photo"><div className="auth-overlay"/><Brand/><div className="auth-quote"><span>THE FUTURE OF CONSTRUCTION</span><h2>Every structure<br/>starts with clarity.</h2></div></div><div className="auth-form-wrap">
    <button className="back-home" onClick={() => navigate('/')}><ChevronRight className="flip"/> Back to SiteSense</button>
    <motion.form className="auth-form" onSubmit={e => {e.preventDefault(); navigate('/app')}} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}}>
      <div className="mobile-brand"><Brand/></div><div className="section-label">{register ? 'CREATE ACCOUNT' : 'WELCOME BACK'}</div><h1>{register ? 'Join SiteSense AI' : 'Sign in to your workspace'}</h1><p>{register ? 'Set up your construction intelligence account.' : 'Enter your details to continue.'}</p>
      {register && <label>Full name<div className="input"><UserRound/><input required placeholder="Jane Wanjiku"/></div></label>}
      <label>Email address<div className="input"><Mail/><input required type="email" placeholder="name@company.com"/></div></label>
      {register && <label>Phone number<div className="input"><Phone/><input required placeholder="+254 700 000 000"/></div></label>}
      <label>Password<div className="input"><LockKeyhole/><input required type={show?'text':'password'} placeholder="••••••••"/><button type="button" onClick={()=>setShow(!show)}>{show?<EyeOff/>:<Eye/>}</button></div></label>
      {register && <><label>Company name<div className="input"><BriefcaseBusiness/><input required placeholder="Kijani Construction Ltd"/></div></label><label>Account role<select><option>Administrator</option><option>Project Manager</option><option>Site Engineer</option><option>Contractor</option><option>Client</option></select></label></>}
      {!register && <div className="form-row"><label className="check"><input type="checkbox"/> Remember me</label><a>Forgot password?</a></div>}
      <button className="btn primary auth-submit" type="submit">{register ? 'Create account':'Sign in'} <ArrowUpRight size={17}/></button>
      {!register && <><div className="divider"><span>or</span></div><button type="button" className="google"><b>G</b> Continue with Google</button></>}
      <div className="auth-switch">{register?'Already have an account?':'New to SiteSense?'} <button type="button" onClick={() => navigate(register?'/login':'/register')}>{register?'Sign in':'Create account'}</button></div>
    </motion.form>
  </div></div>
}

const navGroups = [
  { name: 'Main', items: [
    ['Overview','/app',LayoutDashboard],['Projects','/app/projects',FolderKanban],
    ['Site Map','/app/site-map',MapPin],['Live Activity','/app/activity',Camera]
  ]},
  { name: 'Intelligence', items: [
    ['AI Copilot','/app/ai',BrainCircuit],['AI Site Vision','/app/site-vision',Camera],
    ['Predictive Analytics','/app/predictive',TrendingUp],['Risk Intelligence','/app/risk',TriangleAlert]
  ]},
  { name: 'Operations', items: [
    ['Materials & Inventory','/app/materials',Boxes],['Finance & Expenses','/app/expenses',Wallet],
    ['Workforce Management','/app/team',Users],['Equipment Tracking','/app/equipment',Construction],
    ['Procurement','/app/procurement',ClipboardCheck],['Smart Scheduling','/app/schedule',CalendarDays]
  ]},
  { name: 'Documentation', items: [
    ['BOQ Analyzer','/app/boq',FileText],['Document Vault','/app/documents',FolderKanban],
    ['Quality & Safety','/app/safety',ShieldCheck],['Reports','/app/reports',Download]
  ]},
  { name: 'Management', items: [
    ['Clients & Teams','/app/clients',UserRound],['Payments','/app/payments',CircleDollarSign],
    ['Notifications','/app/notifications',Bell],['Settings','/app/settings',Settings]
  ]}
]
function AppLayout({children}) {
  const [collapsed,setCollapsed]=useState(false), [mobile,setMobile]=useState(false), [openGroups,setOpenGroups]=useState(navGroups.map(g=>g.name))
  const location=useLocation()
  const current=navGroups.flatMap(g=>g.items).find(x=>location.pathname===x[1]) || navGroups[0].items[0]
  const toggleGroup=(name)=>setOpenGroups(v=>v.includes(name)?v.filter(x=>x!==name):[...v,name])
  return <div className={`app-shell ${collapsed?'collapsed':''}`}><aside className={`sidebar ${mobile?'mobile-open':''}`}><div className="sidebar-head"><Brand compact={collapsed}/><button className="close-mobile" onClick={()=>setMobile(false)}><X/></button></div><nav>{navGroups.map(group=><section className="nav-group" key={group.name}>{!collapsed&&<button className="nav-group-title" onClick={()=>toggleGroup(group.name)}><span>{group.name}</span><ChevronRight className={openGroups.includes(group.name)?'open':''}/></button>}<div className={collapsed||openGroups.includes(group.name)?'nav-group-items':'nav-group-items closed'}>{group.items.map(([name,path,Icon])=> <NavLink end={path=== '/app'} to={path} key={path} className={({isActive})=>isActive?'active':''} title={collapsed?name:''}><Icon/><span>{name}</span>{name==='Notifications'&&<b>3</b>}</NavLink>)}</div></section>)}</nav><button className="collapse-btn" onClick={()=>setCollapsed(!collapsed)}><ChevronRight/></button></aside>
  {mobile&&<div className="drawer-backdrop" onClick={()=>setMobile(false)}/>}
  <main className="app-main"><header className="topbar"><div className="topbar-left"><button className="menu-btn" onClick={()=>setMobile(true)}><Menu/></button><div className="breadcrumbs"><span>Workspace</span><ChevronRight/><strong>{current[0]}</strong></div></div><div className="topbar-actions"><div className="searchbox"><Search/><input placeholder="Search anything..." /><kbd>⌘ K</kbd></div><button className="icon-btn"><Bell/><i/></button><button className="avatar">JM</button><div className="profile"><strong>James Mwangi</strong><span>Project Manager</span></div></div></header><div className="page-content"><AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{opacity:0,y:7}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.18}}>{children}</motion.div></AnimatePresence></div></main></div>
}

function Dashboard() {
  const stats=[
    ['Active Projects','12','+2 this month',LayoutDashboard],
    ['Total Project Value','KES 142.8M','+8.4% vs last month',CircleDollarSign],
    ['Average Completion','64%','+6.2% this quarter',TrendingUp],
    ['Total Expenditure','KES 106.2M','74% of portfolio budget',Wallet],
    ['Budget Utilization','74%','Within planned limit',Wallet],
    ['Pending Reports','5','2 due today',FileText],
    ['Project Risk Alerts','3','1 critical',TriangleAlert],
    ['Material Shortages','4','2 require urgent action',Boxes],
  ]
  return <><PageHead eyebrow="SAMPLE WORKSPACE DATA" title="Good morning, James" actions={<><button className="btn ghost"><CalendarDays/> Jun 18, 2026</button><button className="btn primary"><Plus/> New project</button></>}/><div className="stats-grid">{stats.map((s,i)=>{const Icon=s[3];return <div className={`stat-card ${i===5?'risk':''}`} key={s[0]}><div className="stat-top"><span><Icon/></span><button><MoreHorizontal/></button></div><label>{s[0]}</label><strong>{s[1]}</strong><div className="stat-foot">{i<3?<ArrowUpRight/>:<i/>}<span>{s[2]}</span></div></div>})}</div>
  <div className="analytics-grid"><GlassPanel title="Project progress" subtitle="Planned vs actual completion" wide><div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={progressData}><defs><linearGradient id="actual" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity=".28"/><stop offset="95%" stopColor="#f59e0b" stopOpacity="0"/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.06)" vertical={false}/><XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false}/><YAxis stroke="#64748b" tickLine={false} axisLine={false}/><Tooltip contentStyle={{background:'#11151c',border:'1px solid rgba(255,255,255,.1)',borderRadius:12}}/><Area type="monotone" dataKey="actual" stroke="#f59e0b" strokeWidth={2.5} fill="url(#actual)"/><Line type="monotone" dataKey="planned" stroke="#64748b" strokeDasharray="5 5"/></AreaChart></ResponsiveContainer></div></GlassPanel><GlassPanel title="Project status" subtitle="Current portfolio"><div className="status-chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={[{name:'On track',value:7},{name:'At risk',value:3},{name:'Delayed',value:2}]} innerRadius={58} outerRadius={78} dataKey="value" stroke="none">{['#22c55e','#f59e0b','#ef4444'].map((c,i)=><Cell key={c} fill={c}/>)}</Pie></PieChart></ResponsiveContainer><div className="status-total"><strong>12</strong><span>Total</span></div></div><div className="status-legend"><span><i className="green"/>On track <b>58%</b></span><span><i className="amber"/>At risk <b>25%</b></span><span><i className="red"/>Delayed <b>17%</b></span></div></GlassPanel></div>
  <div className="bottom-grid"><GlassPanel title="Active projects" subtitle="Portfolio overview" action={<button>View all <ChevronRight/></button>}><div className="project-list">{projects.map(p=><div className="project-row" key={p.name}><img src={p.image}/><div><strong>{p.name}</strong><span><MapPin/> {p.location}</span></div><div className="mini-progress"><span><i style={{width:p.completion+'%'}}/></span><b>{p.completion}%</b></div><div className={`health-tag ${p.health==='At Risk'?'risk':''}`}>{p.health}</div></div>)}</div></GlassPanel><GlassPanel title="Recent activity" subtitle="Latest workspace updates"><ActivityFeed/></GlassPanel></div></>
}
function PageHead({eyebrow,title,actions}){return <div className="page-head"><div>{eyebrow&&<div className="section-label">{eyebrow}</div>}<h1>{title}</h1></div>{actions&&<div className="page-actions">{actions}</div>}</div>}
function GlassPanel({title,subtitle,action,children,wide}){return <section className={`glass-panel ${wide?'wide':''}`}><div className="panel-head"><div><h3>{title}</h3>{subtitle&&<p>{subtitle}</p>}</div>{action}</div>{children}</section>}
function ActivityIcon({ type }) {
  if (type === 'check') return <CheckCircle2 />
  if (type === 'risk') return <TriangleAlert />
  return <BrainCircuit />
}
function ActivityFeed(){return <div className="activity-list">{[['Daily report uploaded','Riverside Towers • 12 min ago','check'],['Budget variance detected','Trade Centre • 38 min ago','risk'],['Photo analysis complete','Kijani Villas • 1 hr ago','ai']].map((a,i)=><div key={a[0]}><span className={a[2]}><ActivityIcon type={a[2]}/></span><div><strong>{a[0]}</strong><p>{a[1]}</p></div><ChevronRight/></div>)}</div>}

function Projects(){const [view,setView]=useState('grid'),[modal,setModal]=useState(false);return <><PageHead eyebrow="PORTFOLIO" title="Projects" actions={<><button className="btn ghost"><SlidersHorizontal/> Filter</button><button className="btn primary" onClick={()=>setModal(true)}><Plus/> Create project</button></>}/><div className="toolbar"><div className="searchbox wide"><Search/><input placeholder="Search projects..."/></div><button className="btn ghost">All statuses</button><div className="view-toggle"><button className={view==='grid'?'active':''} onClick={()=>setView('grid')}>Grid</button><button className={view==='table'?'active':''} onClick={()=>setView('table')}>Table</button></div></div>{view==='grid'?<div className="project-grid">{projects.map(p=><div className="project-card" key={p.name}><div className="project-image"><img src={p.image}/><span className={`health-tag ${p.health==='At Risk'?'risk':''}`}>{p.health}</span><button><MoreHorizontal/></button></div><div className="project-body"><span className="project-code">PRJ-{Math.floor(Math.random()*900+100)}</span><h3>{p.name}</h3><p><MapPin/> {p.location}</p><div className="project-meta"><div><span>Budget</span><strong>{p.budget}</strong></div><div><span>Completion</span><strong>{p.completion}%</strong></div></div><div className="project-bar"><span><i style={{width:p.completion+'%'}}/></span></div><div className="project-footer"><span><CalendarDays/> Jun 2026</span><button>Workspace <ArrowUpRight/></button></div></div></div>)}</div>:<GlassPanel title="Project register"><DataTable/></GlassPanel>}<Modal open={modal} close={()=>setModal(false)} title="Create new project"><div className="modal-grid"><label>Project name<input placeholder="Project name"/></label><label>Location<input placeholder="Nairobi, Kenya"/></label><label>Budget<input type="number" placeholder="0"/></label><label>Expected completion<input type="date"/></label></div><button className="btn primary modal-action" onClick={()=>setModal(false)}>Create project</button></Modal></>}
function DataTable(){return <div className="data-table"><table><thead><tr><th>Project</th><th>Location</th><th>Budget</th><th>Progress</th><th>Status</th></tr></thead><tbody>{projects.map(p=><tr key={p.name}><td><strong>{p.name}</strong></td><td>{p.location}</td><td>{p.budget}</td><td>{p.completion}%</td><td><span className={`health-tag ${p.health==='At Risk'?'risk':''}`}>{p.health}</span></td></tr>)}</tbody></table></div>}
function Modal({open,close,title,children}){return <AnimatePresence>{open&&<><motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={close}/><motion.div className="modal" initial={{opacity:0,scale:.96,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.96}}><div className="modal-head"><h3>{title}</h3><button onClick={close}><X/></button></div>{children}</motion.div></>}</AnimatePresence>}

function AIPage(){
  const [chat,setChat]=useState([{role:'ai',text:'Good morning. I’m ready to analyze your active construction portfolio. Which project or operational area should we examine?'}])
  const [input,setInput]=useState('')
  const [backendStatus,setBackendStatus]=useState('checking')

  useEffect(() => {
    api.get('/health')
      .then(() => setBackendStatus('online'))
      .catch(() => setBackendStatus('offline'))
  }, [])

  const send=async (text)=>{
    const prompt=text||input
    if(!prompt)return
    setChat(current=>[...current,{role:'user',text:prompt}])
    setInput('')
    try {
      const {data}=await api.post('/analyses',{input_text:prompt})
      const response=[data.findings,data.recommendations].filter(Boolean).join('\n\n')
      setChat(current=>[...current,{role:'ai',text:response || 'The backend returned an analysis without findings.'}])
    } catch (error) {
      const message=error.response?.data?.detail || 'Unable to reach the FastAPI backend. Start it with uvicorn main:app --reload.'
      setChat(current=>[...current,{role:'ai',text:message}])
      setBackendStatus('offline')
    }
  }

  return <><PageHead eyebrow="SIGNATURE WORKSPACE" title="Sitesense Intelligence" actions={<button className="btn ghost"><Sparkles/> New analysis</button>}/><div className="ai-layout"><section className="chat-panel"><div className="chat-head"><div><span className="ai-avatar"><BrainCircuit/></span><div><strong>SiteSense AI</strong><p><i/> {backendStatus==='online'?'Intelligence assistant online':backendStatus==='checking'?'Checking backend connection':'Backend unavailable'}</p></div></div><button><MoreHorizontal/></button></div><div className="messages">{chat.map((m,i)=><div className={`message ${m.role}`} key={i}>{m.role==='ai'&&<span><BrainCircuit/></span>}<p>{m.text}</p></div>)}</div><div className="prompts">{['Analyze project progress','Identify potential delays','Generate daily report'].map(p=><button key={p} onClick={()=>send(p)}>{p}</button>)}</div><div className="chat-input"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask about your construction portfolio..."/><button onClick={()=>send()}><Send/></button></div></section><aside className="analysis-side"><GlassPanel title="Site photograph analysis" subtitle="Computer vision workspace"><div className="upload-zone"><UploadCloud/><strong>Drop site photograph</strong><span>PNG, JPG or WEBP up to 20MB</span><button>Choose file</button></div><div className="caution"><ShieldCheck/><p><strong>Analysis confidence notice</strong>AI findings are observational estimates and cannot establish structural integrity, exact completion, hidden defects or safety compliance.</p></div></GlassPanel><GlassPanel title="Active prediction" subtitle="Demo intelligence signal"><div className="risk-card"><div><span className="risk-badge high">HIGH</span><strong>Concrete delivery risk</strong></div><p>Riverside Towers is trending 8% above weekly consumption.</p><button>View evidence <ChevronRight/></button></div></GlassPanel></aside></div></>}

function GenericPage({kind}) {
  const configs={
    materials:['Materials','Inventory and consumption','Material'],expenses:['Expenses & Budget','Financial operations','Expense'],
    reports:['Reporting Centre','Generate and export reports','Report'],site:['Site Monitoring','Live project documentation','Site update'],
    team:['Team Management','People and permissions','Team member'],clients:['Client Portal','Authorized project updates','Client'],
    notifications:['Notifications','Workspace activity','Notification'],settings:['Settings','Workspace configuration','Preference'],
    'site-map':['Project Site Map','Geospatial portfolio overview','Location'],
    activity:['Live Activity','Real-time project updates','Activity'],
    'site-vision':['AI Site Vision','Demonstration computer vision workspace','Photograph'],
    predictive:['Predictive Analytics','Forward-looking construction signals','Scenario'],
    risk:['Risk Intelligence','Portfolio risks and mitigations','Risk'],
    equipment:['Equipment Tracking','Fleet and utilization monitoring','Equipment'],
    procurement:['Procurement Centre','Purchase requests and suppliers','Purchase order'],
    schedule:['Smart Scheduling','Milestones and critical paths','Schedule'],
    boq:['BOQ Analyzer','Document extraction and cost analysis','BOQ document'],
    documents:['Document Vault','Controlled project documentation','Document'],
    safety:['Quality & Safety','Inspections and safety observations','Inspection'],
    payments:['Payments','M-Pesa ready payment operations','Payment']
  }
  const [name,subtitle,singular]=configs[kind]
  const rows = kind === 'materials'
    ? [['Cement grade 42.5', 'Bags', '1,240', 'KES 1,150', 'Low']]
    : kind === 'expenses'
      ? [['Concrete pour approval', 'Riverside Towers', 'KES 285,400', 'Pending']]
      : [['Weekly progress report', 'Riverside Towers', 'Jun 16, 2026', 'Ready']]
  return <><PageHead eyebrow="DEMO WORKSPACE DATA" title={name} actions={<><button className="btn ghost"><Download/> Export</button><button className="btn primary"><Plus/> Add {singular.toLowerCase()}</button></>}/><p className="page-subtitle">{subtitle}</p>{kind==='materials'||kind==='expenses'||kind==='reports'?<div className="generic-grid"><GlassPanel title={kind==='materials'?'Material inventory':'Financial summary'} subtitle="Sample operational data"><div className="data-table"><table><thead><tr>{(kind==='materials'?['Material','Unit','Quantity','Unit price','Status']:kind==='expenses'?['Expense','Project','Amount','Status']:['Report','Project','Date','Status']).map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{r.map((v,j)=><td key={j}>{j===4?<span className="health-tag risk">{v}</span>:v}</td>)}</tr>)}</tbody></table></div></GlassPanel><GlassPanel title="AI intelligence" subtitle="Demo insight"><div className="insight-card"><Sparkles/><div><strong>{kind==='materials'?'Shortage predicted in 12 days':'Budget variance detected'}</strong><p>{kind==='materials'?'Cement inventory may fall below the project threshold.':'Riverside expenditure is 6% above its June baseline.'}</p></div></div></GlassPanel></div>:<div className="simple-grid">{[1,2,3].map(i=><GlassPanel key={i} title={`${singular} ${i}`} subtitle="Sample workspace item"><div className="simple-card"><div className="simple-icon"><FolderKanban/></div><strong>{i===1?'Riverside Towers':i===2?'Kijani Villas':'Trade Centre'}</strong><p>Operational data and authorized workspace controls.</p><button className="btn ghost">Open <ChevronRight/></button></div></GlassPanel>)}</div>}</>
}

function App(){return <Routes><Route path="/" element={<Landing/>}/><Route path="/login" element={<AuthPage/>}/><Route path="/register" element={<AuthPage register/>}/><Route path="/app/*" element={<AppLayout><Routes><Route index element={<Dashboard/>}/><Route path="projects" element={<Projects/>}/><Route path="ai" element={<AIPage/>}/><Route path="site-vision" element={<AIPage/>}/><Route path="site" element={<AIPage/>}/>{[
  ['site-map','site-map'],['activity','activity'],['predictive','predictive'],['risk','risk'],
  ['materials','materials'],['expenses','expenses'],['team','team'],['equipment','equipment'],
  ['procurement','procurement'],['schedule','schedule'],['boq','boq'],['documents','documents'],
  ['safety','safety'],['reports','reports'],['clients','clients'],['payments','payments'],
  ['notifications','notifications'],['settings','settings']
].map(([path,kind])=><Route key={path} path={path} element={<GenericPage kind={kind}/>}/>)}<Route path="*" element={<Navigate to="/app"/>}/></Routes></AppLayout>}/><Route path="*" element={<Navigate to="/"/>}/></Routes>}
export default App
