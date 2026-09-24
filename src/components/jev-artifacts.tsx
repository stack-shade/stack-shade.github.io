"use client";
import { useState } from "react";

export function JevArchitecture() {
  return (
    <section className="not-prose my-8 rounded-3xl border border-border bg-card/20 p-4 sm:p-6">
      <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Decision pipeline</div>
      <div className="mt-5 grid gap-3 md:grid-cols-5 md:items-center">
        {[
          ["STATE","ticket / email / trace / event"],
          ["QUESTION","Choice / Score / Noul"],
          ["JEV","typed probabilistic answer"],
          ["POLICY","rules + thresholds"],
          ["ACTION","route / verify / execute"],
        ].map(([title,body],i)=><div key={title} className="flex items-center gap-2 md:contents">
          <div className="rounded-2xl border border-border bg-background/40 p-4">
            <div className="font-mono text-[9px] text-muted-foreground">{title}</div>
            <div className="mt-2 text-xs font-bold text-foreground">{body}</div>
          </div>
          {i<4 && <div className="hidden text-center text-muted-foreground md:block">→</div>}
        </div>)}
      </div>
    </section>
  );
}

export function JevDecisionLab() {
  const [active,setActive] = useState<"choice"|"score"|"noul">("choice");
  const cards = {
    choice:{question:"Which team receives this ticket?",rows:[["Billing","96%"],["Technical","1%"],["Sales","0%"],["Account","3%"]]},
    score:{question:"How urgent is this request?",rows:[["1",""],["5",""],["8.4","example"],["10",""]]},
    noul:{question:"Should this be escalated?",rows:[["YES","0.82"],["NO","0.18"]]},
  } as const;
  const card = cards[active];
  return <section className="not-prose my-8 rounded-3xl border border-border bg-muted/10 p-4 sm:p-5">
    <div className="flex flex-wrap gap-2">
      {(["choice","score","noul"] as const).map(key =>
        <button key={key} type="button" onClick={()=>setActive(key)} className={"rounded-xl border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] "+(active===key?"border-foreground bg-foreground text-background":"border-border text-muted-foreground")}>{key}</button>
      )}
    </div>
    <div className="mt-5 grid gap-4 md:grid-cols-[1fr_1.4fr]">
      <div><div className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{active}</div><h3 className="mt-2 text-xl font-black text-foreground">{card.question}</h3><p className="mt-2 text-xs leading-6 text-muted-foreground">Illustrative values for understanding the output shape.</p></div>
      <div className="rounded-2xl border border-border bg-background/40 p-4 space-y-2">{card.rows.map(([label,value])=><div key={label} className="flex items-center justify-between gap-3 rounded-xl border border-border px-3 py-2"><span className="font-mono text-[10px] text-foreground">{label}</span><span className="text-xs font-bold text-foreground">{value}</span></div>)}</div>
    </div>
  </section>;
}
