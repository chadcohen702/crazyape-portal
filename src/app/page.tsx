"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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

const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || "Crazy Ape Support";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [modal, setModal] = useState<Modal>(null);
  const [walkStep, setWalkStep] = useState(1);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        setLoggedIn(true);
        setEmail(session.user.email || "");
      }
    };

    checkUser();
  }, []);

 async function googleLogin() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin,
    },
  });

  if (error) {
    alert(error.message);
  }
}

  async function emailLogin() {
    if (!email) return alert("Enter an email first.");

    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });

    alert("Login link sent. Check your email.");
  }

  async function signOut() {
    await supabase.auth.signOut();
    setLoggedIn(false);
    setEmail("");
  }

  if (!loggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white p-4">
        <section className="w-full max-w-md rounded-3xl border border-zinc-800 bg-[#0b0b0f] p-6">
          <div className="text-center">
            <p className="text-zinc-400">{BRAND}</p>
            <h1 className="mt-2 text-3xl font-bold">Customer Login</h1>
            <p className="mt-4 text-zinc-400">
              Sign in with Google or receive a login link by email.
            </p>
          </div>

          <button
            onClick={googleLogin}
            className="mt-7 w-full rounded-xl border border-zinc-700 px-5 py-3 font-bold"
          >
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-4 text-zinc-500">
            <div className="h-px flex-1 bg-zinc-800" />
            or
            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          <label className="text-sm text-zinc-300">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-zinc-700 bg-black px-4 py-3"
          />

          <button
            onClick={emailLogin}
            className="mt-4 w-full rounded-xl bg-orange-500 px-5 py-3 font-bold text-black"
          >
            Send Login Link
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className={dark ? "min-h-screen bg-black text-white p-4" : "min-h-screen bg-white text-black p-4"}>
      <section className="mx-auto max-w-7xl">
        <header className="rounded-3xl border border-zinc-800 bg-[#0b0b0f] p-6">
          <p className="text-zinc-400">{BRAND}</p>
          <h1 className="text-4xl font-bold">Customer Portal</h1>
          <p className="mt-2 text-zinc-400">Logged in as {email || "customer"}</p>

          <nav className="mt-6 flex flex-wrap gap-3">
            <TopBtn label="My Game ID's" onClick={() => setModal("gameIds")} />
            <TopBtn label="Deposit" onClick={() => setModal("deposit")} />
            <TopBtn label="Redeem" onClick={() => setModal("redeem")} />
            <TopBtn label="Daily Free Play Spin" onClick={() => setModal("spin")} />
            <TopBtn label="Refer a Friend" onClick={() => setModal("refer")} />
            <TopBtn label="Giveaway" onClick={() => setModal("giveaway")} />
            <TopBtn label="Rules" onClick={() => setModal("rules")} />
            <TopBtn label="Dark / Light Mode" onClick={() => setDark(!dark)} />
            <TopBtn label="Sign Out" onClick={signOut} />
          </nav>
        </header>

        <section className="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-3xl border border-zinc-800 bg-[#0b0b0f] p-6">
            <h3 className="text-2xl font-bold">Welcome to {BRAND}</h3>
            <p className="mt-4 text-zinc-400">
              New here? No worries — we’ll help you get set up. Message support with the game you want to play.
            </p>
            <p className="mt-4 text-zinc-400">
              Already a member? Send your name, game, and Game ID for support.
            </p>
          </div>

          <aside className="space-y-4">
            <Card title="Account">
              <p className="text-zinc-400">Name: Customer</p>
              <p className="text-zinc-400">Email: {email || "customer@email.com"}</p>
            </Card>
            <Card title="Linked Game Accounts">
              <p className="text-zinc-400">No linked game accounts yet.</p>
            </Card>
          </aside>
        </section>
      </section>

      {modal === "privacy" && <Privacy close={() => setModal("walkthrough")} />}
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

function TopBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="rounded-full border border-zinc-700 px-5 py-3 font-bold">
      {label}
    </button>
  );
}

function Card({ title, children }: any) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-[#0b0b0f] p-6">
      <h3 className="font-bold">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Shell({ title, close, children, wide = false, light = false }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className={`${wide ? "max-w-3xl" : "max-w-lg"} max-h-[90vh] w-full overflow-auto rounded-3xl border border-zinc-700 ${light ? "bg-white text-black" : "bg-[#0b0b0f] text-white"}`}>
        <div className="flex items-center justify-between border-b border-zinc-700 p-5">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={close} className="rounded-xl border border-zinc-600 px-3 py-1">X</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function Privacy({ close }: any) {
  return (
    <Shell title="Privacy Notice" close={close} wide>
      <p className="text-zinc-400">Last updated: May 29, 2026</p>
      <h3 className="mt-6 text-xl font-bold">What we collect</h3>
      <ul className="mt-3 list-disc pl-6 text-zinc-300">
        <li>Email address and display name.</li>
        <li>Linked game IDs after account confirmation.</li>
        <li>Messages, deposit/redeem activity, referrals, and reward entries.</li>
        <li>IP address and approximate location for account safety.</li>
      </ul>
      <button onClick={close} className="mt-8 w-full rounded-xl bg-orange-500 py-3 font-bold text-black">
        Continue
      </button>
    </Shell>
  );
}

function Walkthrough({ step, setStep, close }: any) {
  const data = [
    ["Deposit here", "Tap Deposit when you want to add funds."],
    ["Request a redeem here", "Tap Redeem when you want to submit a redeem request."],
    ["Find your Game ID's here", "Support can add your IDs after confirming your game."],
  ][step - 1];

  return (
    <Shell title={`Step ${step} of 3`} close={close}>
      <h2 className="text-2xl font-bold">{data[0]}</h2>
      <p className="mt-5 text-zinc-300">{data[1]}</p>
      <div className="mt-8 grid grid-cols-2 gap-3">
        <button disabled={step === 1} onClick={() => setStep(step - 1)} className="rounded-xl border border-zinc-700 py-3">Back</button>
        <button onClick={() => step === 3 ? close() : setStep(step + 1)} className="rounded-xl bg-orange-500 py-3 font-bold text-black">
          {step === 3 ? "Finish" : "Next"}
        </button>
      </div>
    </Shell>
  );
}

function GameIds({ close }: any) {
  return (
    <Shell title="My Game ID's" close={close}>
      <p className="text-zinc-400">Game accounts linked to your profile.</p>
      <div className="mt-6 rounded-2xl bg-zinc-900 p-5 text-zinc-400">No linked game accounts yet.</div>
    </Shell>
  );
}

function Deposit({ close }: any) {
  return (
    <Shell title="Deposit Options" close={close}>
      <p className="text-zinc-400">Select your preferred deposit method below.</p>
      <button className="mt-6 w-full rounded-2xl border border-orange-700 bg-orange-950 p-4 text-left">
        <b>Zelle / Apple Pay / Google Pay / Card</b>
        <p className="mt-2 text-zinc-400">Payment portal will be connected here.</p>
      </button>
    </Shell>
  );
}

function Redeem({ close }: any) {
  return (
    <Shell title="Redeem" close={close} wide light>
      <div className="rounded-xl bg-orange-950 p-3 text-center font-bold text-white">
        ✅ Redeem Rules: Daily redeem: $50 minimum / $1,000 max
      </div>
      <FormLabel label="Redeem Method"><select className="input"><option>Select Method</option></select></FormLabel>
      <FormLabel label="Game Platform"><select className="input"><option>Select Game</option></select></FormLabel>
      <FormLabel label="Game ID"><input className="input" placeholder="Enter Game ID" /></FormLabel>
      <FormLabel label="Redeem Amount ($)"><input className="input" placeholder="Amount" /></FormLabel>
      <button className="mt-5 w-full rounded-xl bg-orange-500 py-4 font-bold text-black">Submit Redeem</button>
    </Shell>
  );
}

function FormLabel({ label, children }: any) {
  return <label className="mt-5 block font-bold">{label}{children}</label>;
}

function Refer({ close }: any) {
  return (
    <Shell title="Refer a Friend" close={close}>
      <p className="text-zinc-300">Invite friends and earn rewards when they join and play.</p>
    </Shell>
  );
}

function Rules({ close }: any) {
  return (
    <Shell title="Rules" close={close}>
      <ul className="list-disc space-y-2 pl-6 text-zinc-300">
        <li>Minimum buy-in: $15.</li>
        <li>Minimum redeem: $50.</li>
        <li>Max redeem: $700 per day unless otherwise approved.</li>
        <li>No free play unless posted by support.</li>
      </ul>
    </Shell>
  );
}

function Spin({ close }: any) {
  return (
    <Shell title="🎡 Daily Free Play Spin" close={close} wide light>
      <div className="rounded-2xl bg-yellow-950 p-6 text-center">
        <h3 className="text-2xl font-bold text-yellow-300">Daily Spin Coming Soon 🎡</h3>
        <p className="mt-3 text-zinc-300">Check back for free play spin updates and daily rewards.</p>
        <button onClick={close} className="mt-6 rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black">Close</button>
      </div>
    </Shell>
  );
}

function Giveaway({ close }: any) {
  return (
    <Shell title="🎁 Giveaways" close={close} wide light>
      <GiveawayCard title="Weekly Giveaway — 30 Winners!" prize="$750 Prize Pool" days="7" />
      <GiveawayCard title="Monthly Giveaway — 10 Winners!" prize="$10,000 Prize Pool" days="30" />
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
        <b>Ways to Earn Entries:</b><br />
        Every $1 you deposit = 1 entry
      </div>
    </div>
  );
}
