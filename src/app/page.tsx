"use client";

import { useState, useEffect } from "react";
import { Gift, Moon, Clipboard, Clover, Send, Plus, X, Copy, Zap, CreditCard, Trophy } from "lucide-react";
import { supabase } from "@/lib/supabase";

const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || "Crazy Ape Support";
const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@example.com";

type Modal =
  | null
  | "privacy"
  | "walkthrough"
  | "gameIds"
  | "deposit"
  | "redeem"
  | "refer"
  | "rules"
  | "spin"
  | "giveaway";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [modal, setModal] = useState<Modal>(null);
  const [walkStep, setWalkStep] = useState(1);
  const [dark, setDark] = useState(true);
useEffect(() => {
  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      setLoggedIn(true);
      setEmail(session.user.email || "");
    }
  };

  checkUser();
}, []);
async function googleLogin() {
  if (supabase) {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin }
    });
  }
}

async function emailLogin() {
  if (!email) return alert("Enter an email first.");

  if (supabase) {
    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    alert("Login link sent. Check your email.");
  }
}

  if (!loggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-black text-white">
        <section className="w-full max-w-md rounded-3xl border border-zinc-800 bg-[#0b0b0f] p-7 shadow-2xl">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-orange-500/10 text-5xl">🐵</div>
            <p className="text-zinc-400">{BRAND}</p>
            <h1 className="mt-2 text-3xl font-bold">Customer Login</h1>
            <p className="mt-4 text-zinc-400">Sign in with Google or receive a login code.</p>
          </div>

          <button onClick={googleLogin} className="mt-7 w-full rounded-xl border border-zinc-700 bg-zinc-900 py-4 font-semibold hover:bg-zinc-800">
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-4 text-zinc-500">
            <div className="h-px flex-1 bg-zinc-800" /> or <div className="h-px flex-1 bg-zinc-800" />
          </div>

          <label className="text-sm text-zinc-300">Phone Number</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your phone number" className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-4 outline-none focus:border-orange-500" />
          <button onClick={emailLogin} className="mt-4 w-full rounded-xl bg-orange-500 py-4 font-semibold hover:bg-orange-400">Send Verification Code</button>
        </section>
      </main>
    );
  }

  return (
    <main className={dark ? "min-h-screen bg-black text-white p-4" : "min-h-screen bg-zinc-100 text-black p-4"}>
      <section className="mx-auto max-w-7xl">
        <header className="rounded-3xl border border-zinc-800 bg-[#0b0b0f] p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-zinc-400">{BRAND}</p>
              <h1 className="text-4xl font-bold leading-tight">Customer<br />Support</h1>
              <p className="mt-3 max-w-xs text-zinc-400">Your messages stay saved to your account.</p>
              <p className="mt-1 text-sm text-zinc-400">Logged in as<br />customer@email.com</p>
            </div>

            <nav className="flex flex-wrap gap-3">
              <TopBtn label="My Game ID's" onClick={() => setModal("gameIds")} />
              <TopBtn label="Deposit" onClick={() => setModal("deposit")} />
              <TopBtn label="Redeem" onClick={() => setModal("redeem")} />
              <TopBtn label="☘️ Daily Free Play Spin ☘️" onClick={() => setModal("spin")} />
              <TopBtn label="🎁 Refer a Friend 🎁" onClick={() => setModal("refer")} />
              <TopBtn label="🎁 Giveaway" onClick={() => setModal("giveaway")} gold />
              <TopBtn label="📋 Rules" onClick={() => setModal("rules")} />
              <TopBtn label={dark ? "🌙 Dark Mode" : "☀️ Light Mode"} onClick={() => setDark(!dark)} muted />
              <TopBtn label="Sign out" onClick={() => setLoggedIn(false)} muted />
            </nav>
          </div>
        </header>

        <div className="mt-4 rounded-2xl border border-orange-900 bg-orange-950/20 p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-bold text-orange-300">Add Support Chat to your phone</h3>
            <p className="text-sm text-zinc-400">Faster access, saved chats, and phone notifications when support replies.</p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-xl bg-orange-500 px-5 py-3 font-bold">Install app</button>
            <button className="rounded-xl border border-zinc-700 px-5 py-3">Not now</button>
          </div>
        </div>

        <section className="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-3xl border border-zinc-800 bg-[#08080b] min-h-[480px] flex flex-col">
            <div className="flex-1 p-6">
              <div className="mx-auto mt-4 max-w-lg rounded-2xl bg-zinc-900 p-6 text-zinc-300">
                <h3 className="font-bold text-white">Welcome to {BRAND}! 🐼</h3>
                <p className="mt-4">New here? No worries — we’ll get you set up. Send us your name and which platform you’d like to join.</p>
                <p className="mt-4">Already a member? Send your name, <b>Game ID / Mobile ID</b>, and let us know how we can help today.</p>
                <p className="mt-4 text-zinc-500">Your chat stays saved so you can come back anytime.</p>
              </div>
            </div>
            <div className="border-t border-zinc-800 p-4">
              <button className="mb-3 w-full rounded-xl border border-orange-700 py-3 text-orange-300">Enable phone notifications</button>
              <div className="flex gap-3">
                <input placeholder={`Message ${BRAND}...`} className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-4 outline-none" />
                <button className="rounded-xl border border-zinc-700 px-4"><Plus /></button>
                <button className="rounded-xl bg-orange-500 px-6 font-bold"><Send size={18} /></button>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <Card title="Account">
              <p className="text-zinc-400">Name: Customer</p>
              <p className="text-zinc-400">Email: customer@email.com</p>
            </Card>
            <Card title="Linked game accounts">
              <p className="text-zinc-400">No linked game accounts yet.</p>
            </Card>
          </aside>
        </section>
      </section>

      {modal === "privacy" && <Privacy onClose={() => { setModal("walkthrough"); setWalkStep(1); }} />}
      {modal === "walkthrough" && <Walkthrough step={walkStep} setStep={setWalkStep} close={() => setModal(null)} />}
      {modal === "gameIds" && <GameIds close={() => setModal(null)} />}
      {modal === "deposit" && <Deposit close={() => setModal(null)} />}
      {modal === "redeem" && <Redeem close={() => setModal(null)} />}
      {modal === "refer" && <Refer close={() => setModal(null)} />}
      {modal === "rules" && <Rules close={() => setModal(null)} />}
      {modal === "spin" && <Spin close={() => setModal(null)} />}
      {modal === "giveaway" && <Giveaway close={() => setModal(null)} />}
    </main>
  );
}

function TopBtn({ label, onClick, gold, muted }: { label: string; onClick: () => void; gold?: boolean; muted?: boolean }) {
  return <button onClick={onClick} className={`rounded-full border px-5 py-3 font-semibold ${gold ? "border-yellow-500 text-yellow-300" : muted ? "border-zinc-700 text-zinc-200" : "border-orange-700 text-orange-300"} hover:bg-white/5`}>{label}</button>;
}

function Card({ title, children }: any) {
  return <div className="rounded-3xl border border-zinc-800 bg-[#0b0b0f] p-6"><h2 className="mb-5 text-2xl font-bold">{title}</h2>{children}</div>;
}

function Shell({ title, close, children, wide=false, light=false }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div className={`${wide ? "max-w-3xl" : "max-w-lg"} max-h-[90vh] w-full overflow-auto rounded-3xl border ${light ? "border-yellow-500 bg-yellow-50 text-zinc-950" : "border-zinc-700 bg-[#0b0b0f] text-white"} shadow-2xl`}>
        <div className={`sticky top-0 flex items-center justify-between border-b ${light ? "border-yellow-300 bg-[#0b0b0f] text-white" : "border-zinc-800 bg-[#0b0b0f]"} p-5`}>
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={close} className="rounded-xl border border-zinc-600 px-4 py-2">Close</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function Privacy({ onClose }: any) {
  return <Shell title="Privacy Notice" close={() => {}} wide>
    <p className="text-zinc-400">Last updated: May 29, 2026</p>
    <h3 className="mt-6 text-xl font-bold">What we collect</h3>
    <ul className="mt-3 list-disc pl-6 text-zinc-300 space-y-2">
      <li>Email address and display name.</li>
      <li>Linked game IDs after account confirmation.</li>
      <li>Messages, attachments, deposit/redeem activity, referrals, and reward activity.</li>
      <li>IP address and approximate location for fraud prevention and account security.</li>
    </ul>
    <h3 className="mt-6 text-xl font-bold">What we do not do</h3>
    <p className="mt-3 text-zinc-300">We do not sell your data or share it with third-party advertisers.</p>
    <h3 className="mt-6 text-xl font-bold">Contact</h3>
    <p className="mt-3 text-zinc-300">Questions? Message support or email {SUPPORT_EMAIL}.</p>
    <button onClick={onClose} className="mt-8 w-full rounded-xl bg-orange-500 py-4 font-bold">I agree to the privacy notice</button>
  </Shell>
}

function Walkthrough({ step, setStep, close }: any) {
  const data = [
    ["Deposit here", "Tap Deposit when you want to add funds. Payment portal connection can be added later."],
    ["Request a redeem here", "Tap Redeem when you want to submit or check a redeem request."],
    ["Find your Game ID’s here", "Support can add your IDs after confirming your account."]
  ][step-1];

  return <Shell title={`Step ${step} of 3`} close={close}>
    <h2 className="text-2xl font-bold">{data[0]}</h2>
    <p className="mt-5 text-zinc-300">{data[1]}</p>
    <div className="mt-8 grid grid-cols-2 gap-3">
      <button disabled={step===1} onClick={() => setStep(step-1)} className="rounded-xl border border-zinc-700 py-3 disabled:opacity-40">Back</button>
      <button onClick={() => step===3 ? close() : setStep(step+1)} className="rounded-xl bg-orange-500 py-3 font-bold">{step===3 ? "Done" : "Next"}</button>
    </div>
    <button onClick={close} className="mt-3 w-full rounded-xl border border-zinc-700 py-3 text-zinc-400">Skip walkthrough</button>
  </Shell>
}

function GameIds({ close }: any) {
  return <Shell title="My Game ID's" close={close}>
    <p className="text-zinc-400">Game accounts linked to your profile.</p>
    <div className="mt-6 rounded-2xl bg-zinc-900 p-5 text-zinc-400">No linked game IDs yet. Support can add them after confirming your account.</div>
  </Shell>
}

function Deposit({ close }: any) {
  return <Shell title="💰 Deposit Options" close={close}>
    <p className="text-zinc-400">Select your preferred deposit method below.</p>
    <button className="mt-6 w-full rounded-2xl border border-orange-700 bg-orange-950/30 p-5 text-left">
      <h3 className="text-xl font-bold"><Zap className="inline text-yellow-300" /> PayLightning</h3>
      <p className="mt-2 text-zinc-400">Cash App, Strike App, Coinbase, and more</p>
    </button>
    <button className="mt-4 w-full rounded-2xl border border-orange-700 bg-orange-950/30 p-5 text-left">
      <h3 className="text-xl font-bold"><CreditCard className="inline" /> Tierlock</h3>
      <p className="mt-2 text-zinc-400">Apple Pay, Google Pay, or Card Payment</p>
    </button>
    <p className="mt-6 text-sm text-zinc-500">Payment portal will be connected later.</p>
  </Shell>
}

function Redeem({ close }: any) {
  return <Shell title="Redeem" close={close} wide light>
    <div className="rounded-xl bg-orange-950 p-3 text-center font-bold text-white">Redeem Hours: 12 PM – 10 PM EST</div>
    <div className="mt-4 rounded-xl border border-orange-200 bg-orange-100 p-4 text-center">
      ✅ <b>Redeem Rules</b><br />Daily redeem: <b>$50 minimum / $1,000 max every 24 hours</b><br />Optional expedited redeem available later.
    </div>
    <FormLabel label="Redeem Method"><select className="input"><option>Select Method</option></select></FormLabel>
    <FormLabel label="Game Platform"><select className="input"><option>Select Game Platform</option></select></FormLabel>
    <FormLabel label="Game ID"><input className="input" placeholder="Enter your Game ID" /></FormLabel>
    <FormLabel label="Redeem Amount ($)"><input className="input" placeholder="Amount" /></FormLabel>
    <button className="mt-5 w-full rounded-xl bg-orange-500 py-4 font-bold text-white">Submit Redeem Request</button>
    <style jsx>{`.input{width:100%;border:1px solid #fdba74;border-radius:12px;padding:14px;margin-top:8px;background:white;color:#111;}`}</style>
  </Shell>
}

function FormLabel({ label, children }: any) {
  return <label className="mt-5 block font-bold">{label}{children}</label>;
}

function Refer({ close }: any) {
  return <Shell title="🎁 Refer a Friend" close={close}>
    <div className="rounded-2xl border border-orange-700 bg-orange-950/30 p-5 text-center">
      <h2 className="text-2xl font-bold text-orange-300">Earn $3 Free Play</h2>
      <p className="mt-3 text-zinc-300">When a friend signs up with your code, gets verified, and deposits to play.</p>
    </div>
    <div className="mt-5 rounded-2xl bg-zinc-900 p-5">
      <p className="text-xs font-bold text-zinc-400">YOUR CODE</p>
      <div className="mt-2 flex gap-3">
        <div className="flex-1 rounded-xl border border-yellow-500 bg-black p-4 text-center text-2xl font-bold text-yellow-300">CA58509</div>
        <button className="rounded-xl bg-orange-500 px-4 font-bold"><Copy size={16} /> Copy</button>
      </div>
      <button className="mt-4 w-full rounded-xl bg-orange-500 py-3 font-bold">📩 Share with a friend</button>
    </div>
  </Shell>
}

function Rules({ close }: any) {
  const q = ["How do I make a deposit?", "What is the minimum deposit amount?", "How long does it take for deposits to appear?", "How do I request a redeem?", "What are the redeem hours?", "How does Spin & Stack work?", "What is the High Roller wheel?"];
  return <Shell title="📋 Rules & FAQ" close={close} wide light>
    <div className="rounded-2xl border border-yellow-300 bg-white p-5">
      <h3 className="text-2xl font-bold text-yellow-700">General Rules</h3>
      <p className="mt-4">Minimum deposit: <b>$20</b><br />Minimum redeem: <b>$50</b><br />One redeem allowed every <b>24 hours</b><br />Redeem hours: <b>12 PM – 10 PM EST</b></p>
    </div>
    <h3 className="mt-6 rounded-xl bg-yellow-100 p-4 text-2xl font-bold">DEPOSIT</h3>
    {q.map((item) => <details key={item} className="mt-3 rounded-xl bg-white p-4"><summary className="cursor-pointer font-bold">{item}</summary><p className="mt-3 text-zinc-700">This answer can be edited to match your exact operating policy.</p></details>)}
  </Shell>
}
}
function Spin({ close }: any) {
  return (
    <Shell title="🎡 Daily Free Play Spin" close={close} wide light>
      <div className="rounded-2xl bg-yellow-950 p-6 text-center">
        <h3 className="text-2xl font-bold text-yellow-300">Daily Spin Coming Soon 🎡</h3>
        <p className="mt-3 text-zinc-300">
          Check back for free play spin updates and daily rewards.
        </p>
        <button
          onClick={close}
          className="mt-6 rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black"
        >
          Close
        </button>
      </div>
    </Shell>
  );
}

function Giveaway({ close }: any) {
  return (
    <Shell title="🎁 Giveaways" close={close} wide light>
      <GiveawayCard
        title="Weekly Giveaway — 30 Winners!"
        prize="$750 Prize Pool"
        days="7"
      />
      <GiveawayCard
        title="Monthly Giveaway — 10 Winners!"
        prize="$10,000 Prize Pool"
        days="30"
      />
    </Shell>
  );
}

function GiveawayCard({ title, prize, days }: any) {
  return (
    <div className="mb-6 rounded-2xl border border-yellow-400 bg-white p-6 text-black">
      <h3 className="text-2xl font-bold text-yellow-800">🎉 {title} 🎉</h3>
      <p className="mt-3 text-xl">{prize}</p>
      <p className="mt-3 text-zinc-700">{days} days remaining</p>
      <div className="mt-5 rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-sm">
        <b>Ways to Earn Entries:</b>
        <br />
        Every $1 you deposit = 1 entry
      </div>
    </div>
  );
}
