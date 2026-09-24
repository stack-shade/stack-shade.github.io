import Link from "next/link";
import type { Course } from "@/lib/courses-data";
import { courseStats } from "@/lib/courses-data";
import { presentationLessonSlug } from "@/lib/course-presentation";

const FRAMEWORKS = [
  ["NIST CSF 2.0", "Risk management outcomes across Govern, Identify, Protect, Detect, Respond and Recover.", "https://www.nist.gov/cyberframework"],
  ["NIST SP 800-61 Rev. 3", "Current incident-response guidance aligned with CSF 2.0.", "https://csrc.nist.gov/pubs/sp/800/61/r3/final"],
  ["OWASP Top 10:2025", "Current awareness model for major web-application security risks.", "https://top10.owasp.org/2025/"],
  ["OWASP API Security Top 10", "API-specific risks including object-level authorization and authentication failures.", "https://owasp.org/projects/api-security-project"],
  ["CIS Controls v8.1", "Prioritized safeguards for practical cyber defense and governance.", "https://www.cisecurity.org/controls/v8-1"],
  ["MITRE ATT&CK", "Behavior-based knowledge base for adversary tactics and techniques.", "https://attack.mitre.org/"],
] as const;

const FAQ = [
  ["What does this cybersecurity course cover?", "It covers security fundamentals, networking, Linux and Windows, identity, cryptography, secure design, web and API security, vulnerability management, authorized testing, wireless and mobile security, SOC operations, detection engineering, DFIR, malware analysis, cloud and DevSecOps, AI security and governance."],
  ["Is this cybersecurity course hands-on?", "Yes. The curriculum includes threat-modeling exercises, packet analysis, endpoint triage, web-security labs, asset inventories, SOC investigations, detection labs, DFIR exercises, cloud and DevSecOps work, and an end-to-end capstone."],
  ["Can beginners learn cybersecurity from this course?", "Yes. The early modules establish security terminology, networking, operating-system fundamentals and identity before moving into application security, SOC, DFIR and cloud topics."],
  ["What tools are covered?", "The toolkit includes Nmap, Wireshark, Burp Suite, OWASP ZAP, Nuclei, Nikto, ffuf, Metasploit, Kali, Wazuh, Security Onion, Zeek, Suricata, Sysmon, Velociraptor, Volatility, Autopsy, Ghidra, YARA, Sigma, BloodHound, Impacket and cloud-security tooling."],
  ["Is offensive security practice safe to use?", "The course is explicitly designed for owned systems and intentionally vulnerable labs. Scope, authorization, evidence preservation and stop conditions are part of the methodology."],
  ["What will the final project produce?", "The capstone produces a defensible security engagement: threat model, architecture review, controls, detections, investigation evidence, remediation plan, validation results and a final briefing."],
] as const;

const CAPABILITIES = [
  ["Build", "Threat models, secure architectures, hardening plans and detection rules."],
  ["Investigate", "Correlate identity, endpoint, network, application, disk and memory evidence."],
  ["Test", "Perform controlled security validation against authorized lab targets."],
  ["Defend", "Design prevention, detection, response and recovery controls and verify them."],
] as const;

export function CybersecurityContent({ course }: { course: Course }) {
  const stats = courseStats(course);
  return (
    <>
      <section className="mt-10 rounded-2xl border border-border bg-card/25 p-5 sm:p-6">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="lesson-kicker">COURSE ROADMAP</span>
            <h2 className="mt-1 text-xl font-black">108 lessons · 18 modules · one security workflow</h2>
            <p className="mt-2 max-w-4xl text-xs leading-6 text-muted-foreground">
              Move from fundamentals to implementation: understand the asset, model the threat, inspect evidence, apply a control, validate the result, and communicate residual risk.
            </p>
          </div>
          <span className="font-mono text-[9px] text-muted-foreground">{stats.modules} modules · {stats.lessons} lessons</span>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map(([title, body]) => (
            <div key={title} className="rounded-xl border border-border bg-background/20 p-4">
              <h3 className="text-sm font-bold">{title}</h3>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-2 lg:grid-cols-2">
          {course.modules.map((module, moduleIndex) => (
            <details key={module.title} className="rounded-xl border border-border bg-background/20 p-3" open={moduleIndex < 3}>
              <summary className="cursor-pointer list-none">
                <div className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border font-mono text-[9px]">{String(moduleIndex + 1).padStart(2, "0")}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold">{module.title}</h3>
                    <p className="mt-1 text-[10px] leading-5 text-muted-foreground">{module.hook}</p>
                  </div>
                  <span className="font-mono text-[9px] text-muted-foreground">{module.lessons.length}</span>
                </div>
              </summary>
              <ol className="mt-3 space-y-1 border-t border-border/60 pt-3">
                {module.lessons.map((lesson, lessonIndex) => (
                  <li key={lesson.title}>
                    <Link href={"/courses/" + course.slug + "/" + presentationLessonSlug(moduleIndex, lessonIndex, lesson.title)} className="flex items-start gap-2 rounded-lg px-2 py-2 text-[11px] leading-5 text-muted-foreground hover:bg-muted/30 hover:text-foreground">
                      <span className="font-mono text-[8px] opacity-50">{moduleIndex + 1}.{lessonIndex + 1}</span>
                      <span>{lesson.title}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-border bg-card/25 p-5 sm:p-6">
        <div>
          <span className="lesson-kicker">STANDARDS & REFERENCES</span>
          <h2 className="mt-1 text-xl font-black">Use current security language, not memorized buzzwords</h2>
          <p className="mt-2 max-w-4xl text-xs leading-6 text-muted-foreground">The course deliberately connects technical practice to current public frameworks so findings can be explained in a vocabulary other engineers and security teams recognize.</p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FRAMEWORKS.map(([title, description, href]) => (
            <a key={title} href={href} target="_blank" rel="noreferrer" className="rounded-xl border border-border bg-background/20 p-4 transition hover:border-foreground/25">
              <h3 className="text-sm font-bold">{title}</h3>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-border bg-card/25 p-5 sm:p-6">
        <div>
          <span className="lesson-kicker">LAB CONTRACT</span>
          <h2 className="mt-1 text-xl font-black">Practice like a professional security engineer</h2>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {["Own it or have explicit authorization.", "Define scope, exclusions and stop conditions.", "Preserve evidence before changing state.", "Validate remediation and document residual risk."].map((item, i) => (
            <div key={item} className="rounded-xl border border-border bg-background/20 p-4">
              <span className="font-mono text-[9px] text-muted-foreground">0{i + 1}</span>
              <p className="mt-2 text-xs leading-5">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="cybersecurity-faq" className="mt-8 rounded-2xl border border-border bg-card/25 p-5 sm:p-6">
        <span className="lesson-kicker">FAQ</span>
        <h2 className="mt-1 text-xl font-black">Cybersecurity course questions</h2>
        <div className="mt-4 grid gap-2">
          {FAQ.map(([question, answer]) => (
            <details key={question} className="rounded-xl border border-border bg-background/20 px-4 py-3">
              <summary className="cursor-pointer text-sm font-bold">{question}</summary>
              <p className="mt-2 border-t border-border/60 pt-2 text-xs leading-6 text-muted-foreground">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Cybersecurity course syllabus",
        numberOfItems: stats.lessons,
        itemListElement: course.modules.flatMap((module, moduleIndex) => module.lessons.map((lesson, lessonIndex) => ({
          "@type": "ListItem",
          position: course.modules.slice(0, moduleIndex).reduce((sum, item) => sum + item.lessons.length, 0) + lessonIndex + 1,
          name: lesson.title,
          url: "https://stack-shade.github.io/courses/" + course.slug + "/" + presentationLessonSlug(moduleIndex, lessonIndex, lesson.title),
        }))),
      }) }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }) }} />
    </>
  );
}