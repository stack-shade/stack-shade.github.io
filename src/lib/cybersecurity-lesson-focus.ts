export const CYBERSECURITY_LESSON_FOCUS = [
  [
    "Cybersecurity protects assets, identities, services and decisions against loss of confidentiality, integrity, availability and trust.",
    "Use a concrete application and inventory its data, identities, infrastructure, dependencies and business actions before thinking about attacks.",
    "Separate confidentiality, integrity, availability, authenticity, accountability and privacy so each risk has an observable security property.",
    "Threats describe possible harmful causes, vulnerabilities describe weaknesses, exploits describe ways to trigger them, and controls reduce likelihood or impact.",
    "Threat modeling turns architecture into explicit abuse cases, assumptions, boundaries and controls before implementation choices harden.",
    "An authorized test needs scope, assets, exclusions, evidence rules, stop conditions and contact information before any technical activity begins."
  ],
  [
    "OSI and TCP/IP are useful security maps because every observed event can be associated with a protocol layer and boundary.",
    "Ethernet, ARP/NDP, switching and VLANs determine how local systems discover peers and where broadcasts or segmentation boundaries exist.",
    "IP addressing, routing and NAT determine reachability, identity correlation and where network policy can be enforced.",
    "Ports identify transport endpoints; sockets connect an endpoint to a process, so service inventory must combine network evidence with host evidence.",
    "DNS, TLS and HTTP expose different trust and metadata surfaces, and HTTP/2 and HTTP/3 change transport behavior without removing application-layer risks.",
    "Packet troubleshooting is a security skill: trace name resolution, routing, transport state, TLS and application responses instead of guessing."
  ],
  [
    "Linux permissions define which principals can read, modify or execute resources, and sudo changes effective privilege.",
    "Processes and services explain what is actually running, how it started and which identities or resources it can access.",
    "Command-line pipelines turn raw files and logs into repeatable evidence extraction workflows that can be reviewed and automated.",
    "SSH security depends on identity, key handling, host verification, authorization and safe remote-access configuration.",
    "Logs are security evidence only when they are collected consistently, time-aligned, protected from tampering and rich enough to answer investigative questions.",
    "Defensive Linux triage should preserve evidence while building a timeline across process, file, network and persistence observations."
  ],
  [
    "Windows security combines user identity, service execution, registry configuration, event telemetry and endpoint policy.",
    "PowerShell works with structured objects, making it valuable for repeatable evidence collection and correlation rather than only text manipulation.",
    "Active Directory is both a directory and a relationship graph: groups, delegated rights, trusts and policies can create indirect privilege paths.",
    "Kerberos and NTLM solve authentication problems differently, and defenders need to understand tickets, challenge-response and observable artifacts at a conceptual level.",
    "AD attack-path analysis asks how an identity can traverse relationships toward sensitive privileges, then which control or telemetry breaks that path.",
    "Windows triage should correlate Event Viewer, Sysmon, PowerShell and identity evidence before containment changes destroy useful context."
  ],
  [
    "Authentication answers who are you, while MFA, sessions and SSO determine how that identity is established and maintained.",
    "Authorization answers what this identity may do, and least privilege means minimizing effective permissions across the entire request path.",
    "Symmetric cryptography uses shared secrets for efficient confidentiality; asymmetric cryptography uses key pairs for key exchange, signatures and identity relationships.",
    "Hashes provide fixed-size integrity fingerprints, MACs add a secret, signatures provide asymmetric authenticity, and PKI binds public keys to identities.",
    "Passwords should be protected with purpose-built password hashing and carefully managed secrets, keys and rotation rather than reversible storage.",
    "Certificate inspection is a practical way to connect hashes, signatures, trust chains, hostnames, expiry and TLS configuration."
  ],
  [
    "Security requirements translate business and user needs into explicit abuse cases and security properties that can be tested.",
    "Trust boundaries mark changes in authority, data sensitivity or execution context and deserve explicit validation.",
    "Input validation, output encoding and safe error handling reduce the chance that untrusted data is interpreted by an unintended component.",
    "Authentication and authorization must be modeled as server-side decisions tied to identity, resource and action, not merely interface visibility.",
    "Secrets, dependencies, configuration and build pipelines form a supply chain whose failure can compromise an otherwise well-designed application.",
    "A secure design review should trace trust boundaries, threats, controls, residual risk and evidence through one small full-stack application."
  ],
  [
    "OWASP Top 10:2025 is an awareness map for major web-application risk categories; use it as a vocabulary, not a substitute for testing or secure design.",
    "Broken access control occurs when the server fails to enforce whether the current principal can perform the requested action on the requested resource.",
    "Injection arises when untrusted data crosses into an interpreter with unintended syntax or semantics; prevention is context-specific.",
    "Authentication failures include weak identity proof, unsafe credential recovery, session mistakes and inconsistent access enforcement.",
    "Security misconfiguration and vulnerable components show why secure defaults, patching, dependency inventories and repeatable hardening matter.",
    "Classify realistic bug reports into risk categories before testing so you learn to reason from symptoms to root causes."
  ],
  [
    "Burp Suite is an HTTP investigation workbench: observe requests, reproduce them, alter one variable and record the resulting behavior in an authorized lab.",
    "OWASP ZAP provides automated and passive web-security capabilities that can support discovery and verification without replacing human reasoning.",
    "API security requires object-level authorization, robust authentication, rate limiting, validation and consistent error semantics at every endpoint.",
    "CORS, CSRF, SSRF, file-upload and path-traversal risks come from confused trust boundaries, parser behavior and server-side access decisions.",
    "GraphQL and WebSockets create different request shapes and state models, so security checks must follow the protocol rather than assume REST semantics.",
    "Use intentionally vulnerable training applications to practice a repeatable sequence: understand the request, form a hypothesis, change one variable, validate, document and stop."
  ],
  [
    "Passive reconnaissance uses information already exposed; active reconnaissance creates requests or probes and therefore carries greater operational risk.",
    "DNS records, certificates and subdomains reveal relationships among names, services and trust zones that feed asset inventory.",
    "Nmap can map hosts and services in an authorized scope; the important output is a validated service inventory, not a raw port list.",
    "Vulnerability scanners combine fingerprints and tests to produce signals that must be validated and prioritized in context.",
    "CVE identifiers describe disclosed vulnerabilities, while severity, exposure, exploitability, asset criticality and compensating controls influence remediation priority.",
    "An asset register connects owner, environment, exposure, software, finding, risk decision, remediation owner and verification evidence."
  ],
  [
    "Rules of engagement define the legal and operational boundary for a security assessment and specify what must never be touched.",
    "Pentest planning works best as hypotheses tied to assets, trust boundaries, likely attack paths, evidence goals and stop conditions.",
    "An isolated Kali lab gives you a controlled environment for learning tools without mixing training traffic with real systems.",
    "Credential-auditing tools should be used against generated or explicitly authorized credentials, with rate and data-handling controls.",
    "A professional report separates evidence, impact, reproduction, root cause, remediation and residual risk so another engineer can act on it.",
    "A complete lab assessment should end with validated findings, preserved evidence, remediation recommendations and a clear debrief."
  ],
  [
    "Modern Wi-Fi security depends on authentication, encryption, network segmentation, device posture and safe configuration rather than a single password.",
    "Wireless packet visibility reveals discovery, association, authentication and traffic metadata that can support defensive troubleshooting.",
    "Bluetooth, NFC and IoT devices expand the radio and device-management surface and often introduce constrained security assumptions.",
    "Mobile security includes local storage, permissions, transport trust, authentication state and how mobile clients interact with APIs.",
    "Physical controls matter because an attacker with device or port access can bypass logical assumptions and recover sensitive material.",
    "A defensive wireless lab should map a test network, inspect configuration and document segmentation or authentication weaknesses without targeting others."
  ],
  [
    "Security telemetry comes from endpoints, identities, applications, network sensors and cloud platforms; no single source tells the whole story.",
    "Sysmon and Linux audit data become more useful when event IDs, process identity, timestamps and parent-child relationships support a coherent timeline.",
    "Wazuh and Security Onion illustrate how collection, normalization, rules, search and case workflows fit together in a SOC.",
    "Zeek produces structured network logs while Suricata can generate rule-driven security alerts; the two can complement packet analysis.",
    "Alert triage asks what happened, whether it is benign or malicious, what is affected, what evidence supports that conclusion and what action follows.",
    "A SOC investigation should produce a concise incident timeline with enriched evidence, confidence, next action and escalation state."
  ],
  [
    "MITRE ATT&CK describes adversary behavior as tactics and techniques, giving defenders a common language for detection and threat modeling.",
    "Sigma expresses log-based detection logic in a portable format so a behavioral hypothesis can move across SIEM implementations.",
    "YARA uses file and memory patterns to classify samples; good rules balance discriminating signals with manageable false positives.",
    "Threat intelligence is useful when indicators are paired with source, confidence, context, timestamps and expected defender action.",
    "Threat hunting starts from a hypothesis and searches telemetry for evidence, while alert-driven investigation starts from a signal and tests what it means.",
    "A detection lab should turn an incident timeline into ATT&CK mappings, data requirements, detection logic and explicit gaps."
  ],
  [
    "Incident response is a continuous risk-management capability, not only a reaction after compromise; preparation and learning feed future prevention and detection.",
    "Evidence handling depends on integrity, provenance, timestamps, access records and repeatable collection procedures.",
    "Disk forensics uses filesystem and application artifacts to reconstruct user and system activity while preserving the original evidence.",
    "Memory forensics can reveal volatile process, network and kernel state that may disappear after shutdown or cleanup.",
    "Timeline analysis is hypothesis testing: correlate artifact timestamps, normalize time zones, challenge assumptions and record uncertainty.",
    "A DFIR lab should preserve the supplied evidence set, build a defensible timeline, state findings with confidence and distinguish observation from inference."
  ],
  [
    "Malware analysis should begin with a safe isolated environment, known samples or training binaries and strict controls around execution and data movement.",
    "Static triage starts with hashes, metadata, strings, imports and file structure before any execution decision is made.",
    "Ghidra turns machine code into functions, references and decompiled views that help analysts form behavioral hypotheses.",
    "Dynamic analysis observes process, filesystem, registry, network and memory behavior in a sandbox so static hypotheses can be tested safely.",
    "YARA and reputation/enrichment services help classify and contextualize samples, but matching results still require analyst validation and privacy awareness.",
    "A training-sample report should state observed behavior, evidence, confidence, indicators and defensive implications without claiming more than the evidence supports."
  ],
  [
    "Cloud security uses shared-responsibility boundaries, so the provider and customer each own different controls depending on the service model.",
    "Cloud IAM is the main security control plane: identities, roles, policies, resource boundaries and logging determine effective access.",
    "Cloud security primitives vary by provider, but common ideas include IAM, network segmentation, encryption, secrets, logging and posture management.",
    "Docker security depends on image provenance, minimal privileges, secret handling, capabilities, networking and runtime isolation.",
    "Kubernetes adds APIs, service accounts, admission, workloads, network policy and cluster boundaries; isolation must be treated as a system property.",
    "DevSecOps moves security checks into the software lifecycle: code scanning, secret detection, image scanning, IaC checks, policy gates and verified deployment."
  ],
  [
    "AI systems create new trust boundaries among prompts, models, retrieved data, tools, agents, user input and external side effects.",
    "Prompt injection happens when untrusted content influences an AI system beyond the intended instruction boundary; defenses must not rely on prompts alone.",
    "RAG security depends on source trust, retrieval isolation, metadata filtering, tenant boundaries and validation of what evidence reaches the model.",
    "Model supply chains include datasets, weights, adapters, dependencies, containers and serving infrastructure, so integrity must be considered end to end.",
    "AI red teaming in a test environment probes intended security properties such as instruction boundaries, data exposure and unsafe tool use.",
    "An AI security review should connect threats to controls, tests, telemetry and measurable evaluation cases instead of treating the model as the only asset."
  ],
  [
    "NIST CSF 2.0 organizes cybersecurity outcomes across Govern, Identify, Protect, Detect, Respond and Recover, giving teams a shared risk-management vocabulary.",
    "Policies express intent, standards define required states, procedures describe repeatable actions, and metrics show whether controls are working.",
    "Business continuity and disaster recovery connect security events to service priorities, recovery objectives, dependencies, exercises and lessons learned.",
    "Defense in depth layers preventive, detective, response and recovery controls, while Zero Trust makes explicit verification and least privilege central architectural ideas.",
    "Security careers become easier to navigate when you translate real work into demonstrable skills, portfolio artifacts, evidence and a chosen specialization.",
    "The final capstone should read like a real engineering engagement: threat model, architecture, controls, detections, incident evidence, risk decisions and executive briefing."
  ]
] as const;
