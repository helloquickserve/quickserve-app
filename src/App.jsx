\
import React from "react";
import { Check, QrCode, ShoppingCart, CreditCard, Smartphone, Receipt, LayoutDashboard, TimerReset, Truck, X, ArrowRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

// ---- CONFIG: replace before going live ----
const BRAND = "QuickServe"; // keep as requested
const PICKUP = "Thagarapuvalasa, Andhra Pradesh";
const HOURS = "Sunday–Saturday, 11 a.m.–11 p.m.";
const TABLE_LABEL = "CBKP Thagarapuvalasa";
const RAZORPAY_KEY_ID = "rzp_test_1234567890abcdef"; // <— replace with your real TEST key
const UPI_ID = "quickserve@upi"; // <— replace with your UPI handle if using PhonePe intent
const BASE_URL = (typeof window !== 'undefined') ? window.location.origin + window.location.pathname : 'https://quickserve.example/';

// ---- Helpers ----
const inr = (n) => `₹${n.toLocaleString("en-IN")}`;
const paise = (rupees) => Math.round(rupees * 100);
const code = () => Math.random().toString(36).slice(2, 7).toUpperCase();

// Accent + fallback graphics
const FALLBACK_BG = 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='%23fff7ed' offset='0'/><stop stop-color='%23ffedd5' offset='1'/></linearGradient></defs><rect width='100%' height='100%' fill='url(#g)'/><g opacity='0.12' fill='%23f59e0b'><circle cx='50' cy='40' r='3'/><circle cx='140' cy='80' r='3'/><circle cx='230' cy='60' r='3'/><circle cx='320' cy='110' r='3'/></g></svg>`);

// Pick a representative background image based on item name
const imgFor = (name) => {
  const map = [
    ['Natukodi', 'country chicken biryani'],
    ['Mutton', 'mutton biryani'],
    ['Prawn', 'prawn biryani'],
    ['Fish', 'fish fry rice'],
    ['Crab', 'crab curry rice'],
    ['Chicken Joint Pulav', 'chicken biryani'],
    ['Chicken Special', 'chicken biryani'],
    ['Chicken Pulav', 'chicken biryani'],
    ['Pulav', 'biryani rice'],
    ['Pakoda', 'chicken pakora'],
    ['Lollypop', 'chicken lollipop'],
    ['Nethallu', 'anchovy fry'],
    ['Kamunju', 'quail fry'],
    ['Grill Chicken', 'grilled chicken indian'],
    ['Wings', 'chicken wings indian'],
    ['Fry', 'indian fry seafood'],
  ];
  const hit = map.find(([k]) => name.includes(k));
  const q = hit ? hit[1] : 'south indian biryani';
  return `https://source.unsplash.com/800x600/?${encodeURIComponent(q)}`;
};

const Feature = ({ icon: Icon, title, children }) => (
  <div className="rounded-2xl border border-amber-200 p-6 shadow-sm bg-white/90 backdrop-blur">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 rounded-xl border">
        <Icon className="w-5 h-5" aria-hidden />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-sm text-gray-600">{children}</p>
  </div>
);

const Stat = ({ value, label }) => (
  <div className="text-center">
    <div className="text-3xl font-bold">{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

// ---- Seed Menu ----
const PULAV = [
  { name: 'Chicken Pulav', variants: [{label: 'Mini', price: 130}, {label: 'Large', price: 200}] },
  { name: 'Chicken Joint Pulav', variants: [{label: 'Mini', price: 200}, {label: 'Large', price: 270}] },
  { name: 'Chicken Special Pulav', variants: [{label: 'Regular', price: 300}] },
  { name: 'Natukodi Pulav', variants: [{label: 'Regular', price: 400}] },
  { name: 'Mutton Pulav', variants: [{label: 'Mini', price: 270}, {label: 'Large', price: 380}] },
  { name: 'Prawn Pulav', variants: [{label: 'Mini', price: 270}, {label: 'Large', price: 380}] },
  { name: 'Fish Pulav', variants: [{label: 'Regular', price: 380}] },
  { name: 'Crab Pulav', variants: [{label: 'Regular', price: 380}] },
  { name: 'Mixid Pulav', variants: [{label: 'Regular', price: 380}] },
  { name: '3 Flavoured Rice Combo', variants: [{label: 'Regular', price: 900}] },
];

const FRY = [
  { name: 'Chicken Fry', variants: [{label: 'Regular', price: 200}] },
  { name: 'Kamunju Bird', variants: [{label: 'Regular', price: 100}] },
  { name: 'Nethallu Fry', variants: [{label: 'Regular', price: 250}] },
  { name: 'Mamidi Nethallu', variants: [{label: 'Regular', price: 250}] },
  { name: 'Prawns Fry', variants: [{label: 'Regular', price: 300}] },
  { name: 'Crab Fry', variants: [{label: '1 Pc', price: 150}, {label: '2 Pcs', price: 300}] },
  { name: 'Cashew Chicken Pakoda (250 gms)', variants: [{label: 'Regular', price: 120}] },
  { name: 'Chicken Wings', variants: [{label: 'Regular', price: 150}] },
  { name: 'Chicken Joint', variants: [{label: '1 Pc', price: 80}, {label: '2 Pcs', price: 150}] },
  { name: 'Chicken Liver Fry', variants: [{label: 'Half', price: 100}, {label: 'Full', price: 200}] },
  { name: 'Kodi Chips', variants: [{label: 'Regular', price: 200}] },
  { name: 'Chicken Lollypop', variants: [{label: 'Regular', price: 200}] },
  { name: 'Fish Pakoda (B/L)', variants: [{label: '1 Pc', price: 100}, {label: '3 Pcs', price: 250}] },
  { name: 'Fish Fry', variants: [{label: 'Regular', price: 250}] },
  { name: '5 Starters Combo', variants: [{label: 'Regular', price: 600}] },
  { name: 'Grill Chicken', variants: [{label: 'Half', price: 200}, {label: 'Full', price: 400}] },
];

export default function App() {
  const [cart, setCart] = React.useState([]); // {name, variant, price, qty}
  const [orders, setOrders] = React.useState([]); // {code, items, total, status, paid, method}
  const [cartOpen, setCartOpen] = React.useState(false);
  const [qtyPick, setQtyPick] = React.useState({ open: false, name: '', variant: '', price: 0, qty: 1 });
  const [seqState, setSeqState] = React.useState({ key: '', n: 0 });

  // Persist daily sequence in localStorage so refresh doesn't reset within the same IST day
  React.useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem('order_seq_v1') || 'null');
      if (s && s.key && typeof s.n === 'number') setSeqState(s);
    } catch {}
  }, []);
  React.useEffect(() => {
    try { localStorage.setItem('order_seq_v1', JSON.stringify(seqState)); } catch {}
  }, [seqState]);

  // Load Razorpay checkout script for sandbox checkout
  React.useEffect(() => {
    if (document.getElementById('rzp-script')) return;
    const s = document.createElement('script');
    s.id = 'rzp-script';
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const openQty = (name, variantLabel, price) => {
    setQtyPick({ open: true, name, variant: variantLabel, price, qty: 1 });
  };

  const addToCart = (name, variantLabel, price, qty = 1) => {
    setCart((c) => {
      const idx = c.findIndex((it) => it.name === name && it.variant === variantLabel && it.price === price);
      if (idx >= 0) {
        const copy = [...c];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [...c, { name, variant: variantLabel, price, qty }];
    });
    setQtyPick({ open: false, name: '', variant: '', price: 0, qty: 1 });
    setCartOpen(true);
  };

  const updateQty = (idx, delta) => {
    setCart((c) => {
      const copy = [...c];
      const next = { ...copy[idx], qty: Math.max(0, copy[idx].qty + delta) };
      if (next.qty === 0) copy.splice(idx, 1); else copy[idx] = next;
      return copy;
    });
  };

  const goToMenu = () => {
    setCartOpen(false);
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const confirmAdd = () => addToCart(qtyPick.name, qtyPick.variant, qtyPick.price, qtyPick.qty);
  const closeQty = () => setQtyPick({ open: false, name: '', variant: '', price: 0, qty: 1 });

  const total = cart.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);

  // ---- Order code like SEP07/01, SEP07/02 ... (resets daily) ----
  const monthAbbr = (d) => d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const pad2 = (n) => String(n).padStart(2, '0');
  const fmtOrderCode = () => {
    // Always use Indian Standard Time (IST)
    const nowUTC = new Date();
    const nowIST = new Date(nowUTC.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const mm = monthAbbr(nowIST);
    const dd = pad2(nowIST.getDate());
    const key = `${nowIST.getFullYear()}${pad2(nowIST.getMonth()+1)}${dd}`; // YYYYMMDD in IST
    const next = (seqState.key === key ? seqState.n : 0) + 1;
    setSeqState({ key, n: next });
    return `${mm}${dd}/${pad2(next)}`; // e.g., SEP07/01
  };

  // ---- Consistent pastel colors per order for KDS cards ----
  const PALETTE = [
    'bg-amber-100 border-amber-300',
    'bg-emerald-100 border-emerald-300',
    'bg-sky-100 border-sky-300',
    'bg-rose-100 border-rose-300',
    'bg-violet-100 border-violet-300',
    'bg-lime-100 border-lime-300',
    'bg-cyan-100 border-cyan-300',
    'bg-fuchsia-100 border-fuchsia-300'
  ];
  const colorFor = (code) => {
    let sum = 0; for (let i = 0; i < code.length; i++) sum = (sum + code.charCodeAt(i)) % 997;
    return PALETTE[sum % PALETTE.length];
  };

  const createOrder = ({ method, paid }) => {
    const orderCode = fmtOrderCode();
    const newOrder = {
      code: orderCode,
      items: cart.slice(),
      total,
      status: 'NEW',
      paid,
      method,
      createdAt: new Date()
    };
    setOrders((o) => [newOrder, ...o]);
    setCart([]);
    setCartOpen(false);
    return newOrder;
  };

  const payOnlineRazorpay = async () => {
    if (!total) return alert('Cart is empty');
    const order = createOrder({ method: 'ONLINE', paid: false });
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: paise(order.total),
      currency: 'INR',
      name: BRAND,
      description: `Order #${order.code}`,
      handler: function (response) {
        setOrders((list) => list.map((o) => o.code === order.code ? { ...o, paid: true } : o));
        alert(`Payment success! Payment Id: ${response?.razorpay_payment_id || 'TEST'}`);
      },
      prefill: { name: 'Customer', email: 'demo@example.com', contact: '9999999999' },
      theme: { color: '#000000' }
    };
    try {
      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        throw new Error('Razorpay not available');
      }
    } catch (e) {
      // DEMO FALLBACK: mark as paid so you can test the flow end-to-end
      setOrders((list) => list.map((o) => o.code === order.code ? { ...o, paid: true } : o));
      alert('Simulated payment success (demo). Add your Razorpay TEST key to enable sandbox checkout.');
    }
  };

  const payOnlinePhonePeIntent = () => {
    if (!total) return alert('Cart is empty');
    const order = createOrder({ method: 'ONLINE', paid: false });
    const upiUrl = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(BRAND)}&am=${encodeURIComponent(order.total)}&cu=INR&tn=${encodeURIComponent('Order ' + order.code)}`;
    // Attempt to open UPI intent (works on mobile). On desktop, show QR as fallback.
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      window.location.href = upiUrl;
    } else {
      alert('PhonePe/UPI intent works best on mobile. Scan the QR below to pay.');
    }
  };

  const placeCOD = () => {
    if (!total) return alert('Cart is empty');
    createOrder({ method: 'COD', paid: false });
    alert('Order placed. Pay at counter when you pick up.');
  };

  const setStatus = (orderCode, next) => {
    setOrders((list) => list.map((o) => o.code === orderCode ? { ...o, status: next } : o));
    if (next === 'READY') {
      // Simulate SMS trigger
      console.log(`SMS: Order #${orderCode} is ready for pickup.`);
    }
  };

  const menuUrl = `${BASE_URL}#menu`;
  const tableCBKPUrl = `${BASE_URL}#menu?table=${encodeURIComponent(TABLE_LABEL)}`;
  const grouped = {
    NEW: orders.filter((o) => o.status === 'NEW'),
    PREPARING: orders.filter((o) => o.status === 'PREPARING'),
    READY: orders.filter((o) => o.status === 'READY'),
  };

  const copyLink = (text) => async () => { try { await navigator.clipboard.writeText(text); alert('Link copied'); } catch { prompt('Copy this link:', text); } };
  const upiUrlGen = (amount) => `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(BRAND)}${amount?`&am=${amount}`:''}&cu=INR&tn=${encodeURIComponent(BRAND + ' - ' + TABLE_LABEL)}`;
  const scrollToId = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setCartOpen(false);
  };

  return (
    <main className="min-h-screen text-gray-900 bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 scroll-smooth">
      {/* Nav */}
      <header className="sticky top-0 z-20 bg-amber-50/70 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-black" />
            <span className="font-semibold">{BRAND}</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#features" onClick={scrollToId('features')}  className="hover:opacity-70">Features</a>
            <a href="#menu" onClick={scrollToId('menu')}  className="hover:opacity-70">Menu</a>
            <a href="#kds" onClick={scrollToId('kds')}  className="hover:opacity-70">KDS</a>
            <a href="#qr" onClick={scrollToId('qr')}  className="hover:opacity-70">QR Codes</a>
          </nav>
          <button onClick={() => setCartOpen(true)} className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl border">
            <ShoppingCart className="w-4 h-4" /> Cart ({cart.length})
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src="https://source.unsplash.com/1600x900/?south%20indian,biryani" onError={(e)=>{e.currentTarget.style.display='none'}} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/40 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-6xl px-4 pt-12 pb-10 md:pt-16 md:pb-14 relative">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              QR ordering, PhonePe/UPI & a real‑time KDS—built in
            </h1>
            <p className="mt-4 text-gray-700">
              Customers scan, add items, pay online (Razorpay/PhonePe) or at the counter. Orders flow into a Kitchen Display Screen with status: NEW → PREPARING → READY.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <Stat value="10 min" label="to test sandbox" />
              <Stat value=">99.9%" label="uptime" />
              <Stat value=">1M" label="orders processed" />
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl border shadow-xl bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Scan to view menu</div>
                  <div className="font-semibold">{TABLE_LABEL}</div>
                </div>
                <div className="rounded-lg border p-2 bg-white"><QRCodeSVG value={tableCBKPUrl} size={96} /></div>
              </div>
              <div className="mt-4 text-sm text-gray-600">Use the Menu below to add items and try the sandbox checkout.</div>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-24 md:scroll-mt-28 mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Flexible solutions for omni‑channel selling</h2>
        <div className="grid md:grid-cols-3 gap-5">
          <Feature icon={LayoutDashboard} title="Point of Sale">
            Sync in‑store and online orders with a unified dashboard and simple billing.
          </Feature>
          <Feature icon={ShoppingCart} title="Online store">
            Publish your branded menu and accept orders for pickup or takeaway in minutes.
          </Feature>
          <Feature icon={QrCode} title="QR ordering">
            Place unique QR codes on tables or at the counter—customers scan, order, and pay.
          </Feature>
          <Feature icon={CreditCard} title="Payments">
            Accept UPI and cards via Razorpay/PhonePe; automatic reconciliation and refunds.
          </Feature>
          <Feature icon={TimerReset} title="Inventory">
            Track stock levels, mark items out‑of‑stock, and set prep times.
          </Feature>
          <Feature icon={Truck} title="Delivery integrations">
            Connect trusted logistics partners; manage dispatch and status updates.
          </Feature>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="scroll-mt-24 md:scroll-mt-28 mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Menu</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[{ title: 'Pulav Varieties', data: PULAV }, { title: 'Fry Items', data: FRY }].map((group) => (
            <div key={group.title} className="rounded-2xl border border-amber-200 p-5 bg-white/90 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">{group.title}</h3>
              <div className="space-y-3">
                {group.data.map((item) => (
                  <div key={item.name} className="group relative overflow-hidden border rounded-xl p-3 transition-colors duration-150 hover:bg-amber-50 hover:border-amber-300 focus-within:ring-2 focus-within:ring-amber-400">
                    <img src={imgFor(item.name)} onError={(e)=>{e.currentTarget.src=FALLBACK_BG}} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-200" />
                    <div className="relative z-10">
                      <div className="font-semibold">{item.name}</div>
                      <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-800">
                        {item.variants.map((v) => (
                          <button
                            key={v.label}
                            onClick={() => openQty(item.name, v.label, v.price)}
                            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 transition-transform duration-75 ease-out hover:bg-amber-50 hover:border-amber-300 hover:shadow active:scale-95 active:translate-y-[1px] active:shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                          >
                            <span>{v.label}</span>
                            <span className="font-medium">{inr(v.price)}</span>
                            <span className="text-xs ml-1 px-2 py-0.5 border rounded-full">Add</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* KDS (Live) */}
      <section id="kds" className="scroll-mt-24 md:scroll-mt-28 mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-center gap-2"><h2 className="text-2xl md:text-3xl font-bold">Kitchen Display Screen (Live)</h2><span className="text-xs px-2 py-0.5 rounded-full border bg-white/70" title="All codes and day reset use Indian Standard Time">IST</span></div>
        {orders.length === 0 && (
          <div className="text-sm text-gray-600 mb-4">Place a test order from the Menu to see it here.</div>
        )}
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          {["NEW","PREPARING","READY"].map((col) => (
            <div key={col} className="rounded-2xl border border-amber-200 p-4 bg-white/90 shadow-sm">
              <div className="font-semibold mb-2">{col}</div>
              <div className="space-y-3 min-h-[120px]">
                {grouped[col].map((o) => (
                  <div key={o.code} className={`rounded-xl border p-3 ${colorFor(o.code)}`}>
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">#{o.code}</div>
                      <div className="text-xs">{o.paid ? 'PAID' : o.method === 'COD' ? 'COD' : 'UNPAID'}</div>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {o.items.map((it, idx) => (
                        <li key={idx} className="flex justify-between"><span>{it.name} ({it.variant})</span><span>{inr(it.price)}</span></li>
                      ))}
                    </ul>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="font-medium">Total: {inr(o.total)}</div>
                      <div className="flex gap-2">
                        {o.status === 'NEW' && <button onClick={() => setStatus(o.code, 'PREPARING')} className="px-2 py-1 text-xs rounded border">Start</button>}
                        {o.status === 'PREPARING' && <button onClick={() => setStatus(o.code, 'READY')} className="px-2 py-1 text-xs rounded border">Mark Ready</button>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QR Codes */}
      <section id="qr" className="scroll-mt-24 md:scroll-mt-28 mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">QR Codes</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-amber-200 p-6 bg-white/90 text-center shadow-sm">
            <div className="font-semibold mb-2">Main Menu (URL)</div>
            <div className="inline-block rounded-lg border p-3 bg-white"><QRCodeSVG value={menuUrl} size={160} /></div>
            <div className="mt-2 text-xs break-all text-gray-600">{menuUrl}</div>
            <div className="mt-3 flex justify-center gap-2">
              <button onClick={copyLink(menuUrl)} className="px-3 py-1 text-xs rounded border">Copy link</button>
              <a href={menuUrl} target="_blank" rel="noreferrer" className="px-3 py-1 text-xs rounded border">Open</a>
            </div>
          </div>
          <div className="rounded-2xl border border-amber-200 p-6 bg-white/90 text-center shadow-sm">
            <div className="font-semibold mb-2">{TABLE_LABEL} (URL)</div>
            <div className="inline-block rounded-lg border p-3 bg-white"><QRCodeSVG value={tableCBKPUrl} size={160} /></div>
            <div className="mt-2 text-xs break-all text-gray-600">{tableCBKPUrl}</div>
            <div className="mt-3 flex justify-center gap-2">
              <button onClick={copyLink(tableCBKPUrl)} className="px-3 py-1 text-xs rounded border">Copy link</button>
              <a href={tableCBKPUrl} target="_blank" rel="noreferrer" className="px-3 py-1 text-xs rounded border">Open</a>
            </div>
          </div>
          <div className="rounded-2xl border border-amber-200 p-6 bg-white/90 text-center shadow-sm">
            <div className="font-semibold mb-2">UPI Pay — {TABLE_LABEL}</div>
            <div className="inline-block rounded-lg border p-3 bg-white"><QRCodeSVG value={upiUrlGen()} size={160} /></div>
            <div className="mt-2 text-xs break-all text-gray-600">{upiUrlGen()}</div>
            <div className="mt-3 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-2">Payment apps expect a UPI QR. If you scan the Menu QR with PhonePe, it may say <em>"No data found"</em>. Use your phone Camera/Google Lens for URL QRs.</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-4 gap-6 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-black" />
              <span className="font-semibold">{BRAND}</span>
            </div>
            <p className="mt-3 text-gray-700">Tools to sell online, in‑store, and everywhere in between.</p>
          </div>
          <div>
            <div className="font-semibold mb-2">Product</div>
            <ul className="space-y-2">
              <li><a href="#features" onClick={scrollToId('features')}  className="hover:opacity-70">Features</a></li>
              <li><a href="#kds" onClick={scrollToId('kds')}  className="hover:opacity-70">KDS</a></li>
              <li><a href="#qr" onClick={scrollToId('qr')}  className="hover:opacity-70">QR Codes</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Company</div>
            <ul className="space-y-2">
              <li><a className="hover:opacity-70">About</a></li>
              <li><a className="hover:opacity-70">Press</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Contact</div>
            <ul className="space-y-2">
              <li><span className="font-medium">Pickup:</span> {PICKUP}</li>
              <li><span className="font-medium">Hours:</span> {HOURS}</li>
              <li>hello@quickserve.in</li>
            </ul>
          </div>
        </div>
        <div className="text-xs text-gray-500 px-4 py-6 border-t">© {new Date().getFullYear()} {BRAND}. All rights reserved.</div>
      </footer>

      {/* QTY PICKER MODAL */}
      {qtyPick.open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={closeQty} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-sm rounded-2xl border bg-white p-5 shadow-xl">
              <div className="font-semibold text-lg">{qtyPick.name}</div>
              <div className="text-sm text-gray-600">{qtyPick.variant} • {inr(qtyPick.price)} each</div>
              <div className="mt-4 flex items-center justify-between">
                <div className="inline-flex items-center gap-2">
                  <button onClick={() => setQtyPick(p=>({...p, qty: Math.max(1, p.qty-1)}))} className="px-3 py-2 rounded border">-</button>
                  <span className="min-w-[2ch] text-center">{qtyPick.qty}</span>
                  <button onClick={() => setQtyPick(p=>({...p, qty: p.qty+1}))} className="px-3 py-2 rounded border">+</button>
                </div>
                <div className="font-semibold">{inr(qtyPick.price * qtyPick.qty)}</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button onClick={closeQty} className="px-3 py-2 rounded-xl border">Cancel</button>
                <button onClick={confirmAdd} className="px-3 py-2 rounded-xl bg-black text-white">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={() => setCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-5 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold text-lg">Your Cart</div>
              <button className="p-1 rounded border" onClick={() => setCartOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 overflow-auto">
              {cart.length === 0 ? (
                <div className="text-sm text-gray-600">Your cart is empty.</div>
              ) : (
                <ul className="space-y-2">
                  {cart.map((it, idx) => (
                    <li key={idx} className="flex items-center justify-between border rounded-lg p-2">
                      <div>
                        <div className="font-medium">{it.name}</div>
                        <div className="text-xs text-gray-600">{it.variant}</div>
                        <div className="mt-2 inline-flex items-center gap-2">
                          <button onClick={() => updateQty(idx, -1)} className="px-2 py-1 text-xs rounded border">-</button>
                          <span className="min-w-[2ch] text-center">{it.qty}</span>
                          <button onClick={() => updateQty(idx, +1)} className="px-2 py-1 text-xs rounded border">+</button>
                        </div>
                      </div>
                      <div className="text-right">
                        <div>{inr(it.price * (it.qty || 1))}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="border-t pt-3 space-y-2">
              <button onClick={goToMenu} className="w-full px-3 py-2 rounded-xl border">Add more items</button>
              <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Total</span><span className="font-semibold">{inr(total)}</span></div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={payOnlineRazorpay} className="px-3 py-2 rounded-xl border flex items-center justify-center gap-2"><CreditCard className="w-4 h-4"/> Pay Online</button>
                <button onClick={placeCOD} className="px-3 py-2 rounded-xl bg-black text-white">Pay at Counter</button>
              </div>
              <button onClick={payOnlinePhonePeIntent} className="w-full px-3 py-2 rounded-xl border">PhonePe / UPI Intent</button>
              <div className="text-xs text-gray-500">Sandbox demo: Razorpay uses test key; PhonePe intent opens UPI app on mobile.</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
