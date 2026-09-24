import { ExternalLink, ShieldCheck, Terminal, Wrench, BookOpen } from "lucide-react";

type Tool = {
  name: string;
  category: string;
  url: string;
  what: string;
  usage: string;
  example?: string;
};

const TOOLS: Tool[] = [
  { name: "Nmap", category: "Discovery", url: "https://nmap.org/", what: "Network discovery and service/security auditing tool.", usage: "Inventory hosts, ports and service versions in an authorized lab; compare results against your asset inventory.", example: "nmap -sV -Pn 10.10.10.5" },
  { name: "Wireshark", category: "Network analysis", url: "https://www.wireshark.org/", what: "Packet and protocol analyzer with deep dissectors.", usage: "Capture traffic and filter by DNS, TCP, TLS, HTTP or application behavior to prove what actually crossed the wire.", example: "dns || tls || http" },
  { name: "tcpdump", category: "Network analysis", url: "https://www.tcpdump.org/", what: "Command-line packet capture and inspection.", usage: "Collect a focused capture on Linux servers when a full GUI is unavailable; keep filters narrow to reduce noise.", example: "sudo tcpdump -i any -nn 'port 53'" },
  { name: "Burp Suite", category: "Web security", url: "https://portswigger.net/burp", what: "Web testing proxy for inspecting and modifying HTTP requests.", usage: "Use Proxy to observe a request, Repeater to reproduce one request, and the other tools to test authorized applications.", example: "Browser → Burp Proxy → lab application" },
  { name: "OWASP ZAP", category: "Web security", url: "https://www.zaproxy.org/", what: "Open-source web application security scanner and proxy.", usage: "Use passive inspection and baseline scanning against owned/lab web applications; review findings manually.", example: "Open ZAP → Quick Start → Manual Explore" },
  { name: "Nuclei", category: "Vulnerability management", url: "https://nuclei.projectdiscovery.io/", what: "Template-driven vulnerability and exposure scanner.", usage: "Run vetted templates against assets you own, then validate important findings instead of treating scanner output as proof.", example: "nuclei -u https://lab.example" },
  { name: "Nikto", category: "Web security", url: "https://github.com/sullo/nikto", what: "Web-server scanner for risky configurations and known files.", usage: "Use as a broad hygiene check on a lab server; expect false positives and verify results.", example: "nikto -h https://lab.example" },
  { name: "ffuf", category: "Web discovery", url: "https://github.com/ffuf/ffuf", what: "Fast web content discovery and fuzzing tool.", usage: "Discover intended hidden paths on a training application; tune status/size filters to separate real content from catch-all responses.", example: "ffuf -u https://lab.example/FUZZ -w words.txt" },
  { name: "sqlmap", category: "Web testing", url: "https://sqlmap.org/", what: "Automated SQL injection testing framework.", usage: "Use only on deliberately vulnerable labs or explicitly authorized systems to understand injection behavior and remediation.", example: "Start from an intercepted lab request and validate one parameter" },
  { name: "Metasploit", category: "Security testing", url: "https://www.metasploit.com/", what: "Framework for exploit research, validation and security testing.", usage: "Use against intentionally vulnerable virtual machines to connect a known weakness to a repeatable security-control test.", example: "msfconsole → search → inspect module → use lab target" },
  { name: "Kali Linux", category: "Lab platform", url: "https://www.kali.org/", what: "Security-focused Linux distribution with a large assessment toolkit.", usage: "Run inside a disposable VM or isolated lab; treat it as a tool platform, not a magic hacking operating system.", example: "Use a VM with host-only networking for practice" },
  { name: "Greenbone / OpenVAS", category: "Vulnerability management", url: "https://www.greenbone.net/en/community-edition/", what: "Vulnerability scanning platform for hosts and network services.", usage: "Build an asset baseline, scan lab systems, validate findings and track remediation over time.", example: "Create target → task → scan → validate finding" },
  { name: "BloodHound", category: "Identity security", url: "https://bloodhound.specterops.io/", what: "Graph-based analysis of Active Directory relationships and privilege paths.", usage: "Visualize how memberships and delegated rights create effective privilege paths in an authorized AD lab.", example: "Collect lab data → inspect shortest privilege paths" },
  { name: "Impacket", category: "Windows/AD lab", url: "https://github.com/fortra/impacket", what: "Python toolkit for working with Windows network protocols.", usage: "Learn SMB, Kerberos and RPC mechanics in isolated Windows labs and use it to understand authentication telemetry.", example: "Use individual protocol clients against your lab domain only" },
  { name: "NetExec", category: "Windows/AD lab", url: "https://www.netexec.wiki/", what: "Network service assessment toolkit for authorized Windows environments.", usage: "Inventory and validate authenticated exposure in a lab, then connect observations to IAM and logging controls.", example: "Enumerate an explicitly authorized SMB lab target" },
  { name: "Hashcat", category: "Password auditing", url: "https://hashcat.net/hashcat/", what: "High-performance password recovery and auditing tool.", usage: "Audit passwords from test datasets or lab accounts; compare cracking resistance before and after policy changes.", example: "Benchmark a sample hash set offline" },
  { name: "John the Ripper", category: "Password auditing", url: "https://www.openwall.com/john/", what: "Password security auditing and recovery suite.", usage: "Practice offline password-audit workflows on hashes you generated for the lab.", example: "Audit a lab hash file" },
  { name: "OpenSSL", category: "Cryptography", url: "https://www.openssl.org/", what: "Widely used command-line toolkit for TLS and cryptographic inspection.", usage: "Inspect certificates, chains, protocol negotiation and hashes when debugging transport security.", example: "openssl s_client -connect lab.example:443" },
  { name: "CyberChef", category: "Analysis utility", url: "https://gchq.github.io/CyberChef/", what: "Browser-based toolkit for decoding, transforming and analyzing data.", usage: "Decode Base64/URL encoding, inspect byte representations and build reproducible transformation recipes.", example: "From Base64 → Hex → decompress only when the data format warrants it" },
  { name: "Zeek", category: "Network detection", url: "https://zeek.org/", what: "Network security monitor that converts traffic into rich protocol logs.", usage: "Turn packet streams into structured connection, DNS, HTTP and TLS telemetry useful for detection and hunting.", example: "conn.log + dns.log + http.log → investigation timeline" },
  { name: "Suricata", category: "Network detection", url: "https://suricata.io/", what: "Open-source IDS/IPS and network security engine.", usage: "Run signatures and protocol-aware detection beside packet/log analysis to create alertable network evidence.", example: "Write/test a lab rule and inspect the resulting alert" },
  { name: "Wazuh", category: "SIEM / endpoint", url: "https://wazuh.com/", what: "Open-source security monitoring and XDR-style platform.", usage: "Collect endpoint telemetry, file-integrity events, authentication events and rules into investigations.", example: "Agent → event → rule → alert → case notes" },
  { name: "Security Onion", category: "SOC lab", url: "https://securityonionsolutions.com/", what: "Security monitoring distribution combining network visibility and analysis components.", usage: "Build a realistic home SOC lab with packet capture, alerts and investigation workflows.", example: "Sensor → Zeek/Suricata → search → incident timeline" },
  { name: "Sysmon", category: "Windows telemetry", url: "https://learn.microsoft.com/sysinternals/downloads/sysmon", what: "Windows system monitor that records detailed process and network activity.", usage: "Generate higher-fidelity endpoint events that a SOC can correlate with identity and network logs.", example: "Review process creation + network connection events" },
  { name: "Velociraptor", category: "DFIR", url: "https://docs.velociraptor.app/", what: "Endpoint visibility and digital forensics response platform.", usage: "Collect targeted artifacts from many endpoints while keeping collection queries explicit and auditable.", example: "Run a lab artifact query and save the result set" },
  { name: "Volatility", category: "Memory forensics", url: "https://volatilityfoundation.org/", what: "Framework for analyzing volatile memory captures.", usage: "Recover process, network and kernel-level evidence from memory images in a forensic lab.", example: "Identify OS/profile → list processes → correlate network evidence" },
  { name: "Autopsy", category: "Disk forensics", url: "https://www.autopsy.com/", what: "Digital forensics platform for disk-image analysis.", usage: "Build timelines, inspect filesystem artifacts, recover deleted evidence and document findings.", example: "Add image → ingest → timeline → artifact review" },
  { name: "Ghidra", category: "Reverse engineering", url: "https://ghidra-sre.org/", what: "Software reverse-engineering suite from the NSA Research Directorate.", usage: "Disassemble/decompile training binaries and map functions, strings and control flow without executing the sample.", example: "Import → analyze → functions → decompiler → document behavior" },
  { name: "YARA", category: "Malware classification", url: "https://virustotal.github.io/yara/", what: "Pattern-matching language for classifying files and memory.", usage: "Write narrowly scoped rules against known training samples and test both hits and false positives.", example: "rule LabFamily { strings: $x = \"training-marker\" condition: $x }" },
  { name: "Sigma", category: "Detection engineering", url: "https://sigmahq.io/", what: "Generic signature format for log-based detections.", usage: "Write a behavioral detection once, then translate it for different SIEM/search engines.", example: "Hypothesis → log fields → Sigma rule → test event" },
  { name: "MITRE ATT&CK", category: "Threat intelligence", url: "https://attack.mitre.org/", what: "Knowledge base of adversary tactics and techniques.", usage: "Map observed behavior to tactics/techniques, identify missing telemetry and organize detection coverage.", example: "Incident behavior → technique → evidence → detection gap" },
  { name: "ATT&CK Navigator", category: "Detection planning", url: "https://mitre-attack.github.io/attack-navigator/", what: "Visual matrix for ATT&CK technique mapping.", usage: "Create coverage maps for a SOC or purple-team exercise and track which behaviors you can detect.", example: "Highlight techniques → annotate data sources → export coverage map" },
  { name: "MISP", category: "Threat intelligence", url: "https://www.misp-project.org/", what: "Open-source threat information sharing platform.", usage: "Structure indicators, context and relationships so teams can exchange threat-intelligence data.", example: "Indicator → context → confidence → sharing workflow" },
  { name: "VirusTotal", category: "Enrichment", url: "https://www.virustotal.com/", what: "Multi-source file, URL and indicator intelligence service.", usage: "Enrich a lab sample or suspicious indicator with reputation and contextual data; review privacy implications before uploading anything sensitive.", example: "Hash/URL lookup → vendors → relations → document evidence" },
  { name: "urlscan.io", category: "Web enrichment", url: "https://urlscan.io/", what: "Webpage scanning and observability service.", usage: "Study DNS, HTTP requests, redirects and resource relationships for public URLs; avoid submitting sensitive/private URLs.", example: "Submit a non-sensitive test URL → inspect request graph" },
  { name: "Shodan", category: "Exposure research", url: "https://www.shodan.io/", what: "Search engine for internet-connected service metadata.", usage: "Use to understand how exposed services are indexed and to audit assets you own or are authorized to assess.", example: "Search your organization-owned IP space and compare with asset inventory" },
  { name: "Censys", category: "Exposure research", url: "https://search.censys.io/", what: "Internet-wide host and certificate visibility platform.", usage: "Research certificate and service exposure for assets you are authorized to manage.", example: "Compare certificate names against owned asset records" },
  { name: "Trivy", category: "Cloud / DevSecOps", url: "https://trivy.dev/", what: "Scanner for containers, filesystems, repositories and IaC.", usage: "Catch vulnerable packages, misconfigurations and secrets before deployment.", example: "trivy image my-app:lab" },
  { name: "Semgrep", category: "Secure coding", url: "https://semgrep.dev/", what: "Pattern-aware static analysis and code scanning platform.", usage: "Find insecure coding patterns early in development and write organization-specific rules.", example: "semgrep --config auto" },
  { name: "Gitleaks", category: "Secrets security", url: "https://gitleaks.org/", what: "Git repository secret scanner.", usage: "Detect API keys and credentials accidentally committed to source history, then rotate exposed secrets.", example: "gitleaks detect --source ." },
  { name: "Checkov", category: "IaC security", url: "https://www.checkov.io/", what: "Static analysis for Terraform and cloud infrastructure-as-code.", usage: "Review infrastructure definitions for risky settings before provisioning resources.", example: "checkov -d infra/" },
  { name: "Prowler", category: "Cloud security", url: "https://prowler.pro/", what: "Cloud security assessment framework.", usage: "Assess account configuration against security best practices and build remediation plans.", example: "Run against a dedicated lab cloud account" },
  { name: "Garak", category: "AI security", url: "https://github.com/NVIDIA/garak", what: "LLM vulnerability scanner with probes and detectors for security failure modes.", usage: "Assess a test model or AI application for prompt injection, data leakage and other security weaknesses.", example: "python -m garak --target_type huggingface --target_name gpt2 --probes ..." },
  { name: "PyRIT", category: "AI security", url: "https://github.com/microsoft/PyRIT", what: "Microsoft open-source framework for proactive generative-AI risk identification and red teaming.", usage: "Build controlled AI security test scenarios around seeds, attack techniques, targets and scorers.", example: "Use PyRIT against a dedicated test endpoint" },
  { name: "OWASP GenAI / LLM Top 10", category: "AI security", url: "https://genai.owasp.org/llm-top-10/", what: "Risk taxonomy for securing LLM and generative-AI applications.", usage: "Threat-model AI applications, assign controls and use the categories to structure security reviews.", example: "Map prompt injection → trust boundary → control → regression test" },
];

const LABS = [
  ["TryHackMe", "https://tryhackme.com/", "Guided rooms and learning paths across offensive and defensive security."],
  ["Hack The Box Academy", "https://academy.hackthebox.com/", "Hands-on modules and job-role paths with practical labs."],
  ["PortSwigger Web Security Academy", "https://portswigger.net/web-security", "Free web-security material and interactive labs."],
  ["OWASP Juice Shop", "https://owasp.org/www-project-juice-shop/", "Deliberately vulnerable web application for AppSec practice."],
  ["OWASP WebGoat", "https://owasp.org/www-project-webgoat/", "Interactive lessons for learning common web vulnerabilities safely."],
  ["DVWA", "https://github.com/digininja/DVWA", "Damn Vulnerable Web Application for controlled web-security labs."],
  ["CyberDefenders", "https://cyberdefenders.org/", "Blue-team investigation challenges built around realistic evidence."],
  ["Blue Team Labs Online", "https://blueteamlabs.online/", "Hands-on defensive investigation scenarios."],
  ["LetsDefend", "https://letsdefend.io/", "SOC-style alert triage and investigation practice."],
  ["Metasploitable 3", "https://github.com/rapid7/metasploitable3", "Intentionally vulnerable VM for security testing in an isolated lab."],
];

const REFERENCES = [
  ["Google Cybersecurity Certificate", "https://www.coursera.org/professional-certificates/google-cybersecurity/", "Beginner foundation, SIEM, incident response, Linux, SQL and career preparation."],
  ["TryHackMe Pre Security", "https://tryhackme.com/path/outline/presecurity", "Computing, networking, web basics and first security concepts."],
  ["HTB Information Security Foundations", "https://academy.hackthebox.com/path/preview/information-security-foundations", "Linux, Windows, networking and foundational security practice."],
  ["HTB Junior Cybersecurity Analyst", "https://academy.hackthebox.com/catalogue/paths", "Offensive + defensive fundamentals, logs, tools and security analysis."],
  ["PortSwigger Web Security Academy", "https://portswigger.net/web-security", "Web vulnerabilities, Burp workflows and interactive labs."],
  ["NIST CSF 2.0", "https://www.nist.gov/cyberframework", "Govern, Identify, Protect, Detect, Respond and Recover as the management loop."],
  ["ISC2 Certified in Cybersecurity", "https://www.isc2.org/certifications/cc/cc-certification-exam-outline", "Security principles, governance, IAM, network/cloud security and operations."],
  ["Microsoft SC-900 / SC-200", "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-900", "Security, identity, compliance, cloud and security operations vocabulary."],
];

function ResourceCard({ name, url, eyebrow, description }: { name: string; url: string; eyebrow: string; description: string }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" className="group rounded-2xl border border-border bg-background/25 p-4 transition hover:-translate-y-0.5 hover:border-foreground/25">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">{eyebrow}</span>
          <h3 className="mt-1 text-sm font-bold">{name}</h3>
        </div>
        <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-foreground" />
      </div>
      <p className="mt-2 text-[11px] leading-5 text-muted-foreground">{description}</p>
    </a>
  );
}

export function CybersecurityToolkit() {
  return (
    <section className="cyber-toolkit mt-10">
      <div className="rounded-[1.4rem] border border-border bg-card/25 p-5 sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              <span className="lesson-kicker">SECURITY TOOLKIT</span>
            </div>
            <h2 className="mt-1 text-2xl font-black tracking-[-0.035em]">The tools you will actually learn to reason with</h2>
            <p className="mt-2 max-w-4xl text-xs leading-6 text-muted-foreground">
              Do not collect tools for the sake of collecting tools. Learn the question each tool answers, what evidence it produces, what it can get wrong, and how to validate the result. Every assessment tool below is intended for systems you own or explicitly have permission to test.
            </p>
          </div>
          <span className="font-mono text-[9px] text-muted-foreground">{TOOLS.length} tools · {LABS.length} practice platforms</span>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {TOOLS.map((tool) => (
            <a key={tool.name} href={tool.url} target="_blank" rel="noreferrer" className="rounded-2xl border border-border bg-background/20 p-4 transition hover:border-foreground/25">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted-foreground">{tool.category}</span>
                  <h3 className="mt-1 text-sm font-black">{tool.name}</h3>
                </div>
                <Wrench className="h-4 w-4 shrink-0 text-muted-foreground" />
              </div>
              <p className="mt-2 text-[11px] leading-5 text-muted-foreground">{tool.what}</p>
              <p className="mt-3 text-[11px] leading-5"><strong>Use it for:</strong> {tool.usage}</p>
              {tool.example && (
                <div className="mt-3 flex items-start gap-2 rounded-xl border border-border/70 bg-muted/10 p-2.5">
                  <Terminal className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <code className="min-w-0 break-words font-mono text-[9px] leading-5 text-muted-foreground">{tool.example}</code>
                </div>
              )}
              <span className="mt-3 inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
                Official resource <ExternalLink className="h-3 w-3" />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="lesson-kicker">PRACTICE PLATFORMS</span>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {LABS.map(([name, url, description]) => (
                <ResourceCard key={name} name={name} url={url} eyebrow="LAB" description={description} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="lesson-kicker">REFERENCE SPINE</span>
            </div>
            <div className="mt-3 space-y-2">
              {REFERENCES.map(([name, url, description]) => (
                <ResourceCard key={name} name={name} url={url} eyebrow="CURRICULUM" description={description} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
