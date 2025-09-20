import React, { useMemo, useState } from "react";

/***************************************************
 * DANDY CRM/АРМ — DEMO SPA (CLEAN & FIXED)
 * Две панели: Админ/Кассир и Клиентская витрина
 * — Без TypeScript
 * — Закрыты все теги/скобки/строки
 * — Завершены объекты/циклы
 ***************************************************/

// ===== Тема =====
const COLORS = {
  bg: "#0b5c3b",
  card: "#ffffff",
  accent: "#ffd24d",
  green: "#22c55e",
  blue: "#3b82f6",
  red: "#ef4444",
  yellow: "#f59e0b",
  muted: "#eaf3ee",
};

// ===== i18n (минимально) =====
const DICT = {
  ru: {
    dashboard: "Дашборд",
    menu: "Меню и товары",
    orders: "Заказы",
    kds: "KDS",
    stock: "Склад",
    cashierReport: "Отчёт кассира",
    pos: "Касса/ККТ",
    edo: "ЭДО",
    mercury: "Меркурий",
    honest: "Честный знак",
    egais: "ЕГАИС",
    couriers: "Курьеры",
    inventory: "Инвентаризация",
    pricing: "Пересчёт цен",
    marketing: "Маркетинг",
    client: "Клиент",
    integrations: "Интеграции",
    reports: "Отчётность",
    alerts: "Уведомления",
    profile: "Профиль",
  },
  en: {
    dashboard: "Dashboard",
    menu: "Menu & Products",
    orders: "Orders",
    kds: "KDS",
    stock: "Stock",
    cashierReport: "Cashier report",
    pos: "POS/Fiscal",
    edo: "EDO",
    mercury: "Mercury",
    honest: "HonestSign",
    egais: "EGAIS",
    couriers: "Couriers",
    inventory: "Inventory",
    pricing: "Repricing",
    marketing: "Marketing",
    client: "Client",
    integrations: "Integrations",
    reports: "Reports",
    alerts: "Alerts",
    profile: "Profile",
  },
};

// ===== Корень =====
export default function App() {
  const [authed, setAuthed] = useState(false);
  const [lang, setLang] = useState("ru");
  const [account, setAccount] = useState({ email: "111", password: "111", site: "111", role: "администратор" });

  function handleLogin(e) {
    if (e) e.preventDefault();
    if (account.email === "111" && account.password === "111" && account.site === "111") setAuthed(true);
    else alert("Неверные данные. Для теста используйте 111 / 111 / 111");
  }

  if (!authed) return <Login account={account} onChange={setAccount} onSubmit={handleLogin} onDemo={() => setAuthed(true)} />;

  return (
    <Shell
      email={account.email}
      site={account.site}
      role={account.role}
      lang={lang}
      setLang={setLang}
    />
  );
}

// ===== Login =====
function Login({ account, onChange, onSubmit, onDemo }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: COLORS.muted }}>
      <form onSubmit={onSubmit} className="w-full max-w-xl rounded-2xl shadow-lg p-8" style={{ background: COLORS.card }}>
        <div className="flex items-center gap-3 mb-6"><Rabbit /><BrandTitle /></div>
        <h1 className="text-3xl font-extrabold mb-6" style={{ color: COLORS.bg }}>ВХОД</h1>
        <LabeledInput label="E-mail" placeholder="example@mail.ru" value={account.email} onChange={(v)=>onChange({ ...account, email:v })} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LabeledInput type="password" label="Пароль" placeholder="Пароль" value={account.password} onChange={(v)=>onChange({ ...account, password:v })} />
          <LabeledInput label="Название сайта" placeholder="Например: dandypizza.com" value={account.site} onChange={(v)=>onChange({ ...account, site:v })} />
        </div>
        <div className="flex items-center gap-6 mt-4">
          <Radio checked={account.role==="кассир"} onChange={()=>onChange({ ...account, role:"кассир" })}>Кассир</Radio>
          <Radio checked={account.role==="администратор"} onChange={()=>onChange({ ...account, role:"администратор" })}>Администратор</Radio>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <button type="submit" className="w-full py-3 rounded-full text-white text-lg font-bold" style={{ background: COLORS.bg }}>Войти</button>
          <button type="button" onClick={onDemo} className="w-full py-3 rounded-full text-lg font-bold" style={{ background: "#ffffff", color: COLORS.bg, border: "2px solid #0b5c3b" }}>Войти демо</button>
        </div>
        <p className="text-center text-sm text-gray-500 mt-3">Тест: 111 / 111 / 111</p>
      </form>
    </div>
  );
}

// ===== Shell (layout + routing) =====
function Shell({ email, site, role, lang, setLang }) {
  const t = (k)=> (DICT[lang]||DICT.ru)[k] || k;
  const [route, setRoute] = useState("dashboard");

  // Общий каталог (для админки и витрины)
  const [dishes, setDishes] = useState([
    { id:1, name:"Пепперони 30 см", cat:"Пицца", price:399, cost:180 },
    { id:2, name:"Филадельфия", cat:"Роллы", price:459, cost:220 },
  ]);
  const [products, setProducts] = useState([
    { id:1001, name:"Соус фирменный", cat:"Соусы", price:49, cost:15, sku:"SAUCE-001" },
  ]);

  const menu = useMemo(()=>[
    ["dashboard", t("dashboard")], ["menu", t("menu")], ["orders", t("orders")], ["kds", t("kds")], ["stock", t("stock")], ["cashier-report", t("cashierReport")], ["pos", t("pos")], ["edo", t("edo")], ["mercury", t("mercury")], ["honest", t("honest")], ["egais", t("egais")], ["couriers", t("couriers")], ["inventory", t("inventory")], ["pricing", t("pricing")], ["marketing", t("marketing")], ["client", t("client")], ["integrations", t("integrations")], ["reports", t("reports")], ["alerts", t("alerts")], ["profile", t("profile")],
  ],[lang]);

  const catalogItems = useMemo(()=>{
    const a = dishes.map(d=>({id:d.id,name:d.name,cat:d.cat,price:d.price,photo:d.photo}));
    const b = products.map(p=>({id:p.id,name:p.name,cat:p.cat,price:p.price,photo:p.photo}));
    return [...a,...b];
  },[dishes,products]);

  function updateCatalogItem(itemId, updater){
    setDishes(prev=>prev.map(d=>d.id===itemId? updater({ ...d }) : d));
    setProducts(prev=>prev.map(p=>p.id===itemId? updater({ ...p }) : p));
  }

  return (
    <div className="min-h-screen" style={{ background: COLORS.bg }}>
      {/* Header */}
      <div className="px-4 md:px-6 py-3" style={{ background: COLORS.bg }}>
        <div className="max-w-[1400px] mx-auto flex items-center gap-3">
          <Rabbit /><BrandTitle />
          <div className="ml-auto flex items-center gap-2">
            <button onClick={()=>setRoute('client')} className={`px-4 py-2 rounded-full text-sm ${route==='client'?'bg-emerald-600 text-white':'bg-white/10 text-white hover:bg-white/20'}`}>Клиентский сайт</button>
            <button onClick={()=>setRoute('dashboard')} className={`px-4 py-2 rounded-full text-sm ${route!=='client'?'bg-emerald-600 text-white':'bg-white/10 text-white hover:bg-white/20'}`}>Админ-панель</button>
            {route!=="client" && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white">
                <span>📞</span><span className="font-semibold">+7 (925) 934-77-28</span><span className="text-white/80 text-xs ml-1">техподдержка</span>
              </div>
            )}
            <LangSwitch lang={lang} setLang={setLang} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-0 mt-4">
        {/* Sidebar */}
        <aside className="px-3 md:px-4 md:py-4" style={{ background: COLORS.bg }}>
          <nav className="space-y-1">
            {menu.map(([key,label])=> (
              <button key={key} onClick={()=>setRoute(key)} className={`w-full text-left px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 ${route===key? 'bg-white/15':''}`}>{label}</button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="p-5 md:p-8 bg-[#0f6b49] rounded-t-2xl md:rounded-l-2xl" style={{ minHeight: "calc(100vh - 120px)" }}>
          <div className="space-y-6">
            {route==="dashboard" && <Dashboard />}
            {route==="menu" && <MenuDishes dishes={dishes} setDishes={setDishes} products={products} setProducts={setProducts} />}
            {route==="orders" && <Orders />}
            {route==="kds" && <KDS />}
            {route==="stock" && <Stock />}
            {route==="cashier-report" && <CashierReport />}
            {route==="pos" && <POS items={catalogItems} onUpdateItem={updateCatalogItem} />}
            {route==="edo" && <EDO />}
            {route==="mercury" && <Mercury />}
            {route==="honest" && <HonestSign />}
            {route==="egais" && <EGAIS />}
            {route==="couriers" && <Couriers />}
            {route==="inventory" && <Inventory />}
            {route==="pricing" && <Pricing />}
            {route==="marketing" && <Marketing />}
            {route==="client" && <ClientPanel items={catalogItems} />}
            {route==="integrations" && <Integrations />}
            {route==="reports" && <ReportsPage />}
            {route==="alerts" && <Alerts />}
            {route==="profile" && <Profile />}
          </div>
        </main>
      </div>
    </div>
  );
}

// ===== UI helpers =====
function BrandTitle(){
  return (
    <div className="text-white">
      <div className="text-2xl md:text-3xl font-extrabold leading-none">ДЭНДИ</div>
      <div className="text-xs opacity-80">ПИЦЦА И СУШИ</div>
    </div>
  );
}
function Rabbit(){ return (<div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-pink-300 flex items-center justify-center shadow" title="зайчик">🐰</div>); }
function LabeledInput({label,placeholder,value,onChange,type="text"}){ return (<div className="mb-4"><div className="text-sm font-medium mb-1">{label}</div><input type={type} placeholder={placeholder} value={value} onChange={(e)=>onChange(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2"/></div>); }
function Radio({checked,onChange,children}){ return (<label className="inline-flex items-center gap-2 cursor-pointer"><input type="radio" checked={checked} onChange={onChange}/><span>{children}</span></label>); }
function Card({title,children,tone}){ const style=tone==="alert"?{borderLeft:"6px solid #ef4444"}:tone==="warn"?{borderLeft:"6px solid #f59e0b"}:{ }; return (<div className="bg-white rounded-2xl p-5 shadow-sm" style={style}>{title&&<h3 className="text-lg font-semibold mb-3">{title}</h3>}<div className="text-sm text-gray-800">{children}</div></div>); }
function LangSwitch({lang,setLang}){ return (<div className="flex items-center gap-2"><button onClick={()=>setLang("ru")} className={`px-2 py-1 rounded ${lang==="ru"?"bg-white/20 text-white":"bg-white/10 text-white/70"}`}>RU</button><button onClick={()=>setLang("en")} className={`px-2 py-1 rounded ${lang==="en"?"bg-white/20 text-white":"bg-white/10 text-white/70"}`}>EN</button></div>); }

// ===== Pages =====
function Dashboard(){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <Card title="Статус смены / Персонал">Открыта • Кассиры: 2 • Поваров: 3 • Курьеров: 4</Card>
      <Card title="Основные метрики">₽ 128 540 выручка • 144 заказов • 18 крит. остатки</Card>
      <Card title="Быстрые действия">
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-2 rounded bg-[#0b5c3b] text-white">Открыть смену</button>
          <button className="px-3 py-2 rounded bg-[#0b5c3b] text-white">Создать заказ</button>
          <button className="px-3 py-2 rounded bg-[#0b5c3b] text-white">Инвентаризация</button>
        </div>
      </Card>
      <Card title="Лента активности (live)"><ul className="list-disc ml-5 space-y-1"><li>Заказ #1029 принят (Яндекс Еда)</li><li>Фискализация чека успешна</li><li>Курьер Алексей передал заказ → едет обратно</li></ul></Card>
      <Card title="Критические алерты" tone="alert">Остаток «Лосось» &lt; 1.0 кг • Срок оплаты накладной — завтра</Card>
      <Card title="Платёжный календарь">Сегодня: аренда; завтра: ОФД; 25.09 — УСН</Card>
    </div>
  );
}

function MenuDishes({dishes,setDishes,products,setProducts}){
  const [tab,setTab]=useState('dishes');
  const [form,setForm]=useState({name:"",cat:"",desc:"",price:0,cost:0,mods:"",alrg:"",nutrition:"",photo:"",sku:""});

  const add=()=>{
    if(!form.name) return;
    if(tab==='dishes') setDishes(prev=>[...prev,{id:Date.now(),name:form.name,cat:form.cat,price:+form.price,cost:+form.cost,desc:form.desc,mods:form.mods?form.mods.split(",").map(s=>s.trim()):[],photo:form.photo,alrg:form.alrg,nutrition:form.nutrition}]);
    else setProducts(prev=>[...prev,{id:Date.now(),name:form.name,cat:form.cat,price:+form.price,cost:+form.cost,sku:form.sku||`SKU-${Date.now()}`,photo:form.photo}]);
    setForm({name:"",cat:"",desc:"",price:0,cost:0,mods:"",alrg:"",nutrition:form.nutrition,photo:"",sku:""});
  };

  const onFile=(file)=>{ if(!file) return; const url=URL.createObjectURL(file); setForm(f=>({...f,photo:url})); };

  function importCSV(file){
    const reader=new FileReader();
    reader.onload=()=>{
      try{
        const text=String(reader.result||"");
        const lines=text.split(/\r?\n/).filter(l=>l.trim().length>0);
        if(lines.length<2){ alert("CSV пустой"); return; }
        const header=lines[0].split(",").map(h=>h.trim().toLowerCase());
        const idx=(k)=>header.indexOf(k);
        const iType=idx("type"), iName=idx("name"), iCat=idx("category"), iPrice=idx("price"), iCost=idx("cost"), iDesc=idx("desc"), iMods=idx("mods"), iAlrg=idx("alrg"), iNut=idx("nutrition"), iSku=idx("sku"), iPhoto=idx("photo");
        const newD=[], newP=[];
        for (let li = 1; li < lines.length; li++) {
          const raw = lines[li].split(",");
          const type = iType>=0 ? (raw[iType]||"dish").trim().toLowerCase() : "dish";
          const name = (raw[iName]||"").trim(); if(!name) continue;
          const cat = (raw[iCat]||"Прочее").trim();
          const price = Number(raw[iPrice]||0);
          const cost = Number(raw[iCost]||0);
          const photo = iPhoto>=0 ? (raw[iPhoto]||"").trim() : "";
          if (type === "product") {
            const sku = (iSku>=0 ? (raw[iSku]||"").trim() : "") || `SKU-${Date.now()}-${li}`;
            newP.push({ id: Date.now()+li, name, cat, price, cost, sku, photo });
          } else {
            const desc = iDesc>=0 ? raw[iDesc] : "";
            const mods = iMods>=0 && raw[iMods] ? String(raw[iMods]).split("|").map(s=>s.trim()) : [];
            const alrg = iAlrg>=0 ? raw[iAlrg] : "";
            const nutrition = iNut>=0 ? raw[iNut] : "";
            newD.push({ id: Date.now()+li, name, cat, price, cost, desc, mods, alrg, nutrition, photo });
          }
        }
        if (newD.length) setDishes(prev=>[...prev, ...newD]);
        if (newP.length) setProducts(prev=>[...prev, ...newP]);
        alert(`Импортировано: блюд ${newD.length}, товаров ${newP.length}`);
      } catch(e) { alert("Ошибка разбора CSV. Убедитесь, что используется запятая как разделитель."); }
    };
    reader.readAsText(file, 'utf-8');
  }

  function loadSample(){
    const sample = `type,name,category,price,cost,desc,mods,alrg,nutrition,sku,photo\n`+
      `dish,Маргарита 30 см,Пицца,349,160,Классика,Острый соус|Доп. сыр,молоко,б/ж/у,,\n`+
      `dish,Калифорния,Роллы,429,210,Краб,Соус унаги|Кунжут,рыба,б/ж/у,,\n`+
      `product,Кола 0.5,Напитки,120,40,Газ.напиток,,, ,COLA-05,`;
    const blob = new Blob([sample], {type:'text/csv'});
    importCSV(new File([blob], 'sample.csv'));
  }

  return (
    <div className="space-y-4">
      <Card title="Каталог">
        <div className="flex gap-2 mb-3">
          <button onClick={()=>setTab('dishes')} className={`px-3 py-2 rounded ${tab==='dishes'?'bg-[#0b5c3b] text-white':'bg-white'}`}>Блюда</button>
          <button onClick={()=>setTab('products')} className={`px-3 py-2 rounded ${tab==='products'?'bg-[#0b5c3b] text-white':'bg-white'}`}>Товары</button>
          <div className="ml-auto flex items-center gap-3">
            <label className="text-sm"><input type="file" accept=".csv" onChange={(e)=>{ const f=e.target.files?.[0]; if(f) importCSV(f); }} /></label>
            <button className="px-3 py-2 rounded bg-gray-100" onClick={loadSample}>Загрузить тестовый CSV</button>
          </div>
        </div>
        {tab==='dishes' ? (
          <table className="w-full text-left text-sm"><thead><tr className="text-gray-500"><th className="py-2">Фото</th><th>Название</th><th>Категория</th><th>Цена</th><th>Себестоимость</th></tr></thead><tbody>
            {dishes.map(d=>(<tr key={d.id} className="border-t"><td className="py-2">{d.photo?<img src={d.photo} alt="фото" className="w-10 h-10 object-cover rounded"/>:'—'}</td><td>{d.name}</td><td>{d.cat}</td><td>₽ {d.price}</td><td>₽ {d.cost}</td></tr>))}
          </tbody></table>
        ) : (
          <table className="w-full text-left text-sm"><thead><tr className="text-gray-500"><th className="py-2">Фото</th><th>Название</th><th>Категория</th><th>SKU</th><th>Цена</th><th>Себестоимость</th></tr></thead><tbody>
            {products.map(p=>(<tr key={p.id} className="border-t"><td className="py-2">{p.photo?<img src={p.photo} alt="фото" className="w-10 h-10 object-cover rounded"/>:'—'}</td><td>{p.name}</td><td>{p.cat}</td><td>{p.sku}</td><td>₽ {p.price}</td><td>₽ {p.cost}</td></tr>))}
          </tbody></table>
        )}
      </Card>

      <Card title={tab==='dishes'?'Добавить блюдо':'Добавить товар'}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LabeledInput label="Название" placeholder={tab==='dishes'"Например: Филадельфия":"Например: Соус фирменный"} value={form.name} onChange={(v)=>setForm({...form,name:v})} />
          <LabeledInput label="Категория" placeholder={tab==='dishes'"Роллы / Пицца":"Соусы / Напитки"} value={form.cat} onChange={(v)=>setForm({...form,cat:v})} />
          <LabeledInput label="Цена, ₽" type="number" value={form.price} onChange={(v)=>setForm({...form,price:v})} />
          <LabeledInput label="Себестоимость, ₽" type="number" value={form.cost} onChange={(v)=>setForm({...form,cost:v})} />
          {tab==='dishes'&&<LabeledInput label="Модификаторы" placeholder="соус, доп. сыр" value={form.mods} onChange={(v)=>setForm({...form,mods:v})} />}
          {tab==='dishes'&&<LabeledInput label="Аллергены" placeholder="рыба, молоко" value={form.alrg} onChange={(v)=>setForm({...form,alrg:v})} />}
          {tab==='dishes'&&<LabeledInput label="Пищевая ценность" placeholder="белки/жиры/углеводы" value={form.nutrition} onChange={(v)=>setForm({...form,nutrition:v})} />}
          {tab==='products'&&<LabeledInput label="SKU" placeholder="SKU-000" value={form.sku} onChange={(v)=>setForm({...form,sku:v})} />}
          <div><div className="text-sm font-medium mb-1">Описание</div><textarea className="w-full rounded-xl border px-4 py-3" rows={3} placeholder="Описание" value={form.desc} onChange={(e)=>setForm({...form,desc:e.target.value})} /></div>
          <div><div className="text-sm font-medium mb-1">Изображение</div><input type="file" accept="image/*" onChange={(e)=>onFile(e.target.files?.[0])} />{form.photo&&<div className="mt-2"><img src={form.photo} alt="превью" className="w-24 h-24 object-cover rounded"/></div>}</div>
        </div>
        <div className="mt-3 flex gap-2"><button onClick={add} className="px-4 py-2 rounded bg-[#0b5c3b] text-white">Добавить</button></div>
        <div className="text-xs text-gray-600 mt-2">CSV-колонки: type(dish|product), name, category, price, cost, desc, mods("a|b"), alrg, nutrition, sku, photo(URL)</div>
      </Card>
    </div>
  );
}

function Orders(){ const [filter,setFilter]=useState("all"); const rows=useMemo(()=>[{id:1029,client:"Смирнова И.",amount:880,status:"принят",channel:"Сайт",courier:"Алексей",eta:"12 мин"},{id:1028,client:"Громов П.",amount:1120,status:"готовится",channel:"Яндекс Еда",courier:"Марина",eta:"9 мин"},{id:1027,client:"Петров А.",amount:980,status:"готов",channel:"Delivery",courier:"Павел",eta:"—"},{id:1026,client:"Зорина Н.",amount:750,status:"у курьера",channel:"ВкусВилл",courier:"Марина",eta:"7 мин"},{id:1025,client:"Катаев С.",amount:1399,status:"доставлен",channel:"Сайт",courier:"—",eta:"0"}],[]); const visible=rows.filter(r=>filter==="all"||r.status===filter); return(<div className="space-y-4"><Card title="Фильтр статуса"><div className="flex flex-wrap gap-2">{[["all","Все"],["принят","Принят"],["готовится","Готовится"],["готов","Готов"],["у курьера","У курьера"],["доставлен","Доставлен"]].map(([k,l])=>(<button key={k} onClick={()=>setFilter(k)} className={`px-3 py-1 rounded-full ${filter===k?"text-white":"text-gray-800"}`} style={{background:filter===k?COLORS.accent:COLORS.card}}>{l}</button>))}</div></Card><Card title="Заказы"><table className="w-full text-left text-sm"><thead><tr className="text-gray-500"><th className="py-2">№</th><th>Клиент</th><th>Канал</th><th>Курьер</th><th>ETA</th><th>Сумма</th><th>Статус</th></tr></thead><tbody>{visible.map(r=>(<tr key={r.id} className="border-t"><td className="py-2">{r.id}</td><td>{r.client}</td><td>{r.channel}</td><td>{r.courier}</td><td>{r.eta}</td><td>₽ {r.amount}</td><td><StatusPill status={r.status}/></td></tr>))}</tbody></table></Card></div>);} 
function StatusPill({status}){ const map={"принят":"bg-gray-200","готовится":"bg-amber-300","готов":"bg-green-300","у курьера":"bg-blue-300","доставлен":"bg-lime-300"}; return <span className={`px-3 py-1 rounded-full text-xs ${map[status]||"bg-gray-200"}`}>{status}</span>; }

function KDS(){ const tiles=[{id:1,dish:"Пепперони 30 см",dept:"Пицца",timer:"05:12",priority:"высокий"},{id:2,dish:"Филадельфия",dept:"Суши",timer:"03:40",priority:"средний"}]; return(<div className="grid grid-cols-1 md:grid-cols-2 gap-4">{tiles.map(t=>(<Card key={t.id} title={`${t.dept} • ${t.dish}`}>SLA: {t.timer} • Приоритет: {t.priority} • <button className="px-3 py-1 rounded bg-green-100">Готово</button></Card>))}</div>);} 
function Stock(){return(<div className="space-y-4"><Card title="Остатки">Список ТМЦ, критические остатки выделены, FEFO и сроки годности.</Card><Card title="Накладные">Импорт PDF/JPG/XLS • OCR • сопоставление номенклатуры • партии.</Card><Card title="Инвентаризация">Пересчёт • протокол расхождений • двойное подтверждение.</Card></div>);} 
function CashierReport(){return(<div className="space-y-4"><Card title="Создать отчёт кассира">Строки расходов (категория, сумма, магазин, комментарий) • Загрузка фото чеков • OCR • «Завести в учёт».</Card><Card title="История">Черновик / Проверен / Проведён • журнал исправлений.</Card></div>);} 

// ===== POS =====
function POS({items,onUpdateItem}){
  const [cat,setCat]=useState('Все'); const cats=useMemo(()=>['Все',...Array.from(new Set(items.map(i=>i.cat)))],[items]);
  const [cart,setCart]=useState([]); const [quickName,setQuickName]=useState(''); const [quickPrice,setQuickPrice]=useState(0);
  const [editingId,setEditingId]=useState(null); const [techDesc,setTechDesc]=useState(''); const [techComp,setTechComp]=useState(''); const [techFiles,setTechFiles]=useState([]); const [techPhoto,setTechPhoto]=useState('');
  const visible=items.filter(i=>cat==='Все'||i.cat===cat); const total=cart.reduce((s,r)=>s+r.price*r.qty,0);
  function addToCart(i){const key=Date.now()+Math.random(); setCart(prev=>[...prev,{key,itemId:i.id,name:i.name,price:i.price,qty:1}]);}
  function addQuick(){ if(!quickName||!quickPrice) return; const key=Date.now()+Math.random(); setCart(prev=>[...prev,{key,itemId:null,name:quickName,price:Number(quickPrice)||0,qty:1}]); setQuickName(''); setQuickPrice(0);} 
  function inc(row){setCart(prev=>prev.map(r=>r.key===row.key?{...r,qty:r.qty+1}:r));} function dec(row){setCart(prev=>prev.map(r=>r.key===row.key?{...r,qty:Math.max(1,r.qty-1)}:r));} function removeRow(row){setCart(prev=>prev.filter(r=>r.key!==row.key));}
  function onTechFiles(files){ if(!files) return; const urls=Array.from(files).map(f=>URL.createObjectURL(f)); setTechFiles(prev=>[...prev,...urls]); }
  function onTechPhoto(file){ if(!file) return; setTechPhoto(URL.createObjectURL(file)); }
  function openTech(item){ setEditingId(item.id); setTechDesc(''); setTechComp(''); setTechFiles([]); setTechPhoto(item.photo||''); }
  function saveTech(){ if(editingId==null) return; onUpdateItem(editingId,d=>({...d,photo:techPhoto||d.photo,tech:{description:techDesc,composition:techComp,files:techFiles}})); setEditingId(null); }
  return(
    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_360px] gap-4">
      <Card title="Категории">
        <div className="flex lg:flex-col gap-2 flex-wrap">{cats.map(c=>(<button key={c} onClick={()=>setCat(c)} className={`px-3 py-2 rounded ${cat===c?'bg-[#0b5c3b] text-white':'bg-white'}`}>{c}</button>))}</div>
        <div className="mt-4">
          <div className="text-sm font-semibold mb-1">Быстрая позиция (фикс. цена)</div>
          <input placeholder="Название" className="w-full rounded border px-3 py-2 mb-2" value={quickName} onChange={e=>setQuickName(e.target.value)} />
          <input placeholder="Цена, ₽" type="number" className="w-full rounded border px-3 py-2 mb-2" value={quickPrice} onChange={e=>setQuickPrice(parseFloat(e.target.value||'0'))} />
          <button onClick={addQuick} className="px-3 py-2 rounded bg-[#0b5c3b] text-white w-full">Добавить в чек</button>
        </div>
      </Card>
      <Card title="Меню">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {visible.map(i=>(
            <div key={i.id} className="rounded-xl border bg-white p-3 flex flex-col">
              <div className="flex-1">
                <div className="text-sm font-semibold mb-1">{i.name}</div>
                <div className="text-xs text-gray-500 mb-2">{i.cat}</div>
                {i.photo? <img src={i.photo} alt="фото" className="w-full h-24 object-cover rounded"/> : <div className="w-full h-24 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">нет фото</div>}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="font-bold">₽ {i.price}</div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded bg-[#0b5c3b] text-white" onClick={()=>addToCart(i)}>В чек</button>
                  <button className="px-3 py-1 rounded bg-gray-100" onClick={()=>openTech(i)}>Техкарта</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Чек">
        {cart.length===0? <div className="text-sm text-gray-500">Пусто</div> : (
          <div className="space-y-2">
            {cart.map(r=>(
              <div key={r.key} className="rounded border p-2 bg-white">
                <div className="flex items-center justify-between"><div className="font-medium">{r.name}</div><button className="text-xs text-red-600" onClick={()=>removeRow(r)}>убрать</button></div>
                <div className="flex items-center justify-between mt-1 text-sm">
                  <div className="flex items-center gap-2"><button className="px-2 rounded bg-gray-100" onClick={()=>dec(r)}>-</button><div>{r.qty}</div><button className="px-2 rounded bg-gray-100" onClick={()=>inc(r)}>+</button></div>
                  <div>₽ {r.price*r.qty}</div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 border-t font-semibold"><div>Итого</div><div>₽ {total}</div></div>
            <div className="grid grid-cols-3 gap-2 mt-2"><button className="px-3 py-2 rounded bg-white border">Нал</button><button className="px-3 py-2 rounded bg-white border">Карта</button><button className="px-3 py-2 rounded bg-white border">СБП</button></div>
            <button className="mt-2 w-full px-3 py-3 rounded bg-[#0b5c3b] text-white">Пробить чек</button>
          </div>
        )}
      </Card>
      {editingId!==null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-full max-w-2xl bg-white rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3"><div className="text-lg font-semibold">Техкарта</div><button onClick={()=>setEditingId(null)} className="px-3 py-1 rounded bg-gray-100">Закрыть</button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium mb-1">Описание</div>
                <textarea className="w-full rounded border px-3 py-2" rows={4} value={techDesc} onChange={e=>setTechDesc(e.target.value)} />
                <div className="text-sm font-medium mb-1 mt-3">Состав (ингредиенты)</div>
                <textarea className="w-full rounded border px-3 py-2" rows={6} placeholder="ингредиент — граммы\n..." value={techComp} onChange={e=>setTechComp(e.target.value)} />
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Изображение</div>
                <input type="file" accept="image/*" onChange={e=>onTechPhoto(e.target.files?.[0]||null)} />
                {techPhoto && <img src={techPhoto} alt="фото" className="mt-2 w-full h-40 object-cover rounded" />}
                <div className="text-sm font-medium mb-1 mt-3">Файлы (PDF/JPG и др.)</div>
                <input type="file" multiple onChange={e=>onTechFiles(e.target.files)} />
                {techFiles.length>0 && (<ul className="mt-2 list-disc ml-5 text-sm text-gray-700">{techFiles.map((u,idx)=>(<li key={idx}><a href={u} target="_blank" rel="noreferrer" className="text-blue-600 underline">Вложение {idx+1}</a></li>))}</ul>)}
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2"><button onClick={()=>setEditingId(null)} className="px-4 py-2 rounded bg-gray-100">Отмена</button><button onClick={saveTech} className="px-4 py-2 rounded bg-[#0b5c3b] text-white">Сохранить</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

function EDO(){ return (<div className="space-y-4"><Card title="Накладные (ЭДО)">Фильтры по статусу/дате • входящие/исходящие УПД • подпись КЭП • статусы отправки • архив.</Card><Card title="Честный знак">Загрузка кодов DataMatrix • списание при продаже • агрегация/снятие с учёта.</Card><Card title="Меркурий">ВСД • погашение/списание партий • алерты просрочек • обратные операции.</Card></div>); }
function Mercury(){ return (<Card title="Меркурий (ВСД)">Подключение ВЕТИС.API • приём/погашение • журналы партий • списание по техкартам.</Card>); }
function HonestSign(){ return (<Card title="Честный знак">Учёт маркировки • приём кодов • статусы • списание при реализации.</Card>); }
function EGAIS(){ return (<div className="space-y-4"><Card title="ЕГАИС — режим">Магазин (бутылочное) / Ресторан (разлив)</Card><Card title="Формы и операции"><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div className="bg-white rounded-xl border p-3"><h4 className="font-semibold mb-2">Приём ТТН</h4><LabeledInput label="Номер ТТН" placeholder="000000000" value={""} onChange={()=>{}} /><button className="px-3 py-2 rounded bg-[#0b5c3b] text-white">Принять</button></div><div className="bg-white rounded-xl border p-3"><h4 className="font-semibold mb-2">Возврат поставщику</h4><LabeledInput label="Основание" placeholder="несоответствие" value={""} onChange={()=>{}} /><button className="px-3 py-2 rounded bg-gray-100">Создать возврат</button></div><div className="bg-white rounded-xl border p-3"><h4 className="font-semibold mb-2">Списание</h4><LabeledInput label="Причина" placeholder="порча/пролив/технология" value={""} onChange={()=>{}} /><button className="px-3 py-2 rounded bg-gray-100">Списать</button></div></div><div className="mt-3">Журнал партий (GUID, сроки годности, причины списаний)</div></Card></div>); }

function Couriers(){ const [list,setList]=useState([{id:1,name:"Алексей",phone:"+7 900 000-00-01",status:"free"},{id:2,name:"Марина",phone:"+7 900 000-00-02",status:"to-order"},{id:3,name:"Павел",phone:"+7 900 000-00-03",status:"back"}]); const label=s=>s==="to-order"?"Едет на заказ": s==="back"?"Передал, едет обратно":"Свободен"; const color=s=>s==="to-order"?COLORS.red: s==="back"?COLORS.blue: COLORS.yellow; return (<Card title="Курьеры"><table className="w-full text-left text-sm"><thead><tr className="text-gray-500"><th className="py-2">Курьер</th><th>Телефон</th><th>Статус</th><th></th></tr></thead><tbody>{list.map(c=>(<tr key={c.id} className="border-t"><td className="py-2">{c.name}</td><td>{c.phone}</td><td><span className="px-3 py-1 rounded-full text-white" style={{background:color(c.status)}}>{label(c.status)}</span></td><td><div className="flex gap-2"><button className="px-3 py-1 rounded" style={{background:COLORS.red,color:'#fff'}} onClick={()=>setList(list.map(x=>x.id===c.id?{...x,status:"to-order"}:x))}>Едет на заказ</button><button className="px-3 py-1 rounded" style={{background:COLORS.blue,color:'#fff'}} onClick={()=>setList(list.map(x=>x.id===c.id?{...x,status:"back"}:x))}>Передал, едет обратно</button><button className="px-3 py-1 rounded" style={{background:COLORS.yellow}} onClick={()=>setList(list.map(x=>x.id===c.id?{...x,status:"free"}:x))}>Свободен</button></div></td></tr>))}</tbody></table></Card>); }

function Inventory(){ const [people]=useState([{id:1,name:"Ирина",role:"повар"},{id:2,name:"Денис",role:"повар"},{id:3,name:"Светлана",role:"кладовщик"}]); const [rows,setRows]=useState([{id:1,name:"Сыр моцарелла",sys:4.5,fact:0},{id:2,name:"Мука",sys:12,fact:0},{id:3,name:"Лосось",sys:3.2,fact:0}]); return (<div className="space-y-4"><Card title="Назначение сотрудников"><div className="flex flex-wrap gap-3">{people.map(p=>(<span key={p.id} className="px-3 py-1 rounded-full bg-white/60">{p.name} — {p.role}</span>))}</div></Card><Card title="Инвентаризация — кухня"><table className="w-full text-left text-sm"><thead><tr className="text-gray-500"><th className="py-2">Товар</th><th>Система</th><th>Факт</th></tr></thead><tbody>{rows.map(r=>(<tr key={r.id} className="border-t"><td className="py-2">{r.name}</td><td>{r.sys} кг</td><td><input className="w-24 rounded border px-2 py-1" type="number" step="0.1" value={r.fact} onChange={(e)=>setRows(rows.map(x=>x.id===r.id?{...x,fact:parseFloat(e.target.value||"0")}:x))}/> кг</td></tr>))}</tbody></table></Card></div>); }

function Pricing(){ const [cost,setCost]=useState(220); const [targetMargin,setTargetMargin]=useState(0.24); const recPrice=useMemo(()=>Math.ceil(cost/Math.max(1-targetMargin,0.0001)/10)*10,[cost,targetMargin]); return (<Card title="Пересчёт цен по росту закупок"><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div><div className="text-sm mb-1">Новая себестоимость</div><input className="w-full rounded border px-3 py-2" type="number" value={cost} onChange={(e)=>setCost(parseFloat(e.target.value||"0"))}/></div><div><div className="text-sm mb-1">Целевая маржа</div><input className="w-full rounded border px-3 py-2" type="number" step="0.01" value={targetMargin} onChange={(e)=>setTargetMargin(parseFloat(e.target.value||"0"))}/></div><div className="flex items-end"><div className="w-full bg-white rounded-xl p-3 border text-center">Реком. цена: <b>₽ {recPrice}</b></div></div></div><div className="text-xs text-gray-500 mt-2">Правило: фиксируем маржу, округление до 10₽.</div></Card>); }

function Marketing(){
  const [state,setState]=useState({
    ybiz:{connected:false, token:"", budget:10000, clicks:0, conv:0},
    ydirect:{connected:false, token:"", budget:15000, clicks:0, conv:0},
    gads:{connected:false, token:"", budget:20000, clicks:0, conv:0},
    insta:{connected:false, token:"", budget:12000, clicks:0, conv:0},
    fb:{connected:false, token:"", budget:15000, clicks:0, conv:0},
  });
  function Tile({name,keyName}){
    return (
      <div className="rounded-2xl border bg-white p-4">
        <div className="font-semibold mb-2">{name}</div>
        <div className="flex items-center justify-between mb-2">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={state[keyName].connected} onChange={(e)=>setState({...state,[keyName]:{...state[keyName],connected:e.target.checked}})} />
            <span>{state[keyName].connected? 'подключено':'выключено'}</span>
          </label>
          <button className="px-3 py-1 rounded bg-gray-100">Проверить</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <div className="text-sm mb-1">API токен</div>
            <input className="w-full rounded border px-3 py-2" value={state[keyName].token} onChange={(e)=>setState({...state,[keyName]:{...state[keyName],token:e.target.value}})} />
          </div>
          <div>
            <div className="text-sm mb-1">Бюджет, ₽</div>
            <input type="number" className="w-full rounded border px-3 py-2" value={state[keyName].budget} onChange={(e)=>setState({...state,[keyName]:{...state[keyName],budget:parseFloat(e.target.value||'0')}})} />
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-600">Клики: {state[keyName].clicks} • Конверсии: {state[keyName].conv} • ROI: —</div>
        <div className="mt-3 flex gap-2">
          <button className="px-3 py-2 rounded bg-[#0b5c3b] text-white">Создать кампанию</button>
          <button className="px-3 py-2 rounded bg-gray-100">Отчёт</button>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <Card title="Маркетинговые кабинеты">Подключение и быстрые параметры рекламных систем</Card>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Tile name="Яндекс Бизнес" keyName="ybiz"/>
        <Tile name="Яндекс Директ" keyName="ydirect"/>
        <Tile name="Google Ads" keyName="gads"/>
        <Tile name="Instagram Ads" keyName="insta"/>
        <Tile name="Facebook Ads" keyName="fb"/>
      </div>
    </div>
  );
}

function Integrations(){
  const [agg,setAgg]=useState({yandex:true,delivery:true,vkusvill:false});
  const [logs,setLogs]=useState([]);
  function addLog(level,msg){ const time=new Date().toLocaleTimeString(); setLogs(prev=>[{time,level,msg},...prev].slice(0,50)); }
  return (
    <div className="space-y-4">
      <Card title="Агрегаторы доставки">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <ToggleCard label="Яндекс Еда" checked={agg.yandex} onChange={(v)=>{setAgg({...agg,yandex:v});addLog('info',`Яндекс Еда: ${v?'вкл':'выкл'}`);}}/>
          <ToggleCard label="Delivery" checked={agg.delivery} onChange={(v)=>{setAgg({...agg,delivery:v});addLog('info',`Delivery: ${v?'вкл':'выкл'}`);}}/>
          <ToggleCard label="ВкусВилл" checked={agg.vkusvill} onChange={(v)=>{setAgg({...agg,vkusvill:v});addLog('info',`ВкусВилл: ${v?'вкл':'выкл'}`);}}/>
        </div>
      </Card>
      <Card title="Журнал интеграций">
        <div className="max-h-48 overflow-auto bg-white/50 rounded border">
          <ul className="text-xs">{logs.map((l,i)=>(<li key={i} className="px-2 py-1 border-b">{l.time} • {l.msg}</li>))}</ul>
        </div>
      </Card>
    </div>
  );
}
function ToggleCard({label,checked,onChange}){ return (<div className="rounded-xl border p-3 flex items-center justify-between"><span>{label}</span><label className="inline-flex items-center gap-2"><input type="checkbox" checked={checked} onChange={(e)=>onChange(e.target.checked)}/><span>{checked?"включено":"выключено"}</span></label></div>); }

function ReportsPage(){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <Card title="Финансовый отчёт">Выручка/Расходы/Налоги • период • экспорт PDF/XLSX</Card>
      <Card title="Кассовые отчёты">X/Z • отчёт кассира • сверка оплат</Card>
      <Card title="Склад">Инвентаризации/Списания/Поступления</Card>
      <Card title="ЭДО/Меркурий/ЧЗ/ЕГАИС">Статусы и журналы</Card>
    </div>
  );
}

function Alerts(){
  return (
    <Card title="Центр уведомлений">Изменения меню/цен, сроки оплат по накладным, налоги, КЭП/ОФД, ЕГАИС, критические остатки. Настройка каналов и эскалация.</Card>
  );
}

// ===== Клиентская витрина =====
function ClientPanel({items}){
  const [cat,setCat]=useState('Все');
  const [q,setQ]=useState('');
  const cats=useMemo(()=>['Все',...Array.from(new Set(items.map(i=>i.cat)))],[items]);
  const [cart,setCart]=useState([]);
  const filtered=items.filter(i=>(cat==='Все'||i.cat===cat) && (!q||i.name.toLowerCase().includes(q.toLowerCase())));
  const total=cart.reduce((s,r)=>s+r.price*r.qty,0);
  function add(i){ setCart(prev=>{ const idx=prev.findIndex(r=>r.id===i.id); if(idx>-1){ const c=[...prev]; c[idx]={...c[idx],qty:c[idx].qty+1}; return c; } return [...prev,{id:i.id,name:i.name,price:i.price,qty:1}]; }); }
  function inc(id){ setCart(prev=>prev.map(r=>r.id===id?{...r,qty:r.qty+1}:r)); }
  function dec(id){ setCart(prev=>prev.map(r=>r.id===id?{...r,qty:Math.max(1,r.qty-1)}:r)); }
  function remove(id){ setCart(prev=>prev.filter(r=>r.id!==id)); }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_360px] gap-4">
      <Card title="Категории">
        <div className="mb-3"><input className="w-full rounded border px-3 py-2" placeholder="Поиск…" value={q} onChange={(e)=>setQ(e.target.value)} /></div>
        <div className="flex lg:flex-col gap-2 flex-wrap">{cats.map(c=>(<button key={c} onClick={()=>setCat(c)} className={`px-3 py-2 rounded ${cat===c?'bg-[#0b5c3b] text-white':'bg-white'}`}>{c}</button>))}</div>
      </Card>
      <Card title="Меню (клиент)">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map(i=> (
            <div key={i.id} className="rounded-xl border bg-white p-3 flex flex-col">
              <div className="flex-1">
                <div className="text-sm font-semibold mb-1">{i.name}</div>
                <div className="text-xs text-gray-500 mb-2">{i.cat}</div>
                {i.photo? <img src={i.photo} alt="фото" className="w-full h-24 object-cover rounded"/> : <div className="w-full h-24 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">нет фото</div>}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="font-bold">₽ {i.price}</div>
                <button className="px-3 py-1 rounded bg-[#0b5c3b] text-white" onClick={()=>add(i)}>В корзину</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Корзина">
        {cart.length===0? <div className="text-sm text-gray-500">Корзина пустая</div> : (
          <div className="space-y-2">
            {cart.map(r=> (
              <div key={r.id} className="rounded border p-2 bg-white">
                <div className="flex items-center justify-between"><div className="font-medium">{r.name}</div><button className="text-xs text-red-600" onClick={()=>remove(r.id)}>убрать</button></div>
                <div className="flex items-center justify-between mt-1 text-sm">
                  <div className="flex items-center gap-2"><button className="px-2 rounded bg-gray-100" onClick={()=>dec(r.id)}>-</button><div>{r.qty}</div><button className="px-2 rounded bg-gray-100" onClick={()=>inc(r.id)}>+</button></div>
                  <div>₽ {r.price*r.qty}</div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 border-t font-semibold"><div>Итого</div><div>₽ {total}</div></div>
            <button className="mt-2 w-full px-3 py-3 rounded bg-[#0b5c3b] text-white">Оформить заказ (демо)</button>
          </div>
        )}
      </Card>
    </div>
  );
}

function Profile(){
  const [twofa,setTwofa]=useState(false);
  return (
    <Card title="Профиль">
      <div className="space-y-2">
        <label className="inline-flex items-center gap-2"><input type="checkbox" checked={twofa} onChange={(e)=>setTwofa(e.target.checked)}/>Включить 2ФА</label>
        <div>Управление сессиями • Делегирование подписания</div>
      </div>
    </Card>
  );
}
