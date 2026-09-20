export type VisualKind =
  | "osi"
  | "encapsulation"
  | "web-journey"
  | "signals"
  | "arp"
  | "switch"
  | "frame-trace"
  | "subnet"
  | "routing"
  | "nat"
  | "protocols"
  | "tcp"
  | "tcp-handshake"
  | "tcp-control"
  | "congestion"
  | "quic"
  | "tcp-capture"
  | "dns"
  | "dns-journey"
  | "http"
  | "tls"
  | "applications"
  | "devtools"
  | "security"
  | "attacks"
  | "troubleshooting"
  | "toolkit"
  | "wireshark";

export interface CNLesson {
  slug: string;
  title: string;
  eyebrow: string;
  visual: VisualKind;
  overview: string;
  mentalModel: string;
  deepDive: { title: string; body: string }[];
  flow: { label: string; detail: string }[];
  artifact: { title: string; language: string; code: string; explanation: string };
  mistakes: string[];
  recall: { question: string; answer: string }[];
  feynman: string;
  examAngle: string;
  next: string[];
}

const L = (
  slug: string,
  title: string,
  visual: VisualKind,
  overview: string,
  mentalModel: string,
  deepDive: { title: string; body: string }[],
  flow: { label: string; detail: string }[],
  artifact: { title: string; language: string; code: string; explanation: string },
  mistakes: string[],
  recall: { question: string; answer: string }[],
  feynman: string,
  examAngle: string,
  next: string[],
  eyebrow = "Computer Networks • Deep Lesson",
): CNLesson => ({
  slug, title, eyebrow, visual, overview, mentalModel, deepDive, flow, artifact,
  mistakes, recall, feynman, examAngle, next
});

export const COMPUTER_NETWORK_LESSONS: Record<string, CNLesson> = Object.fromEntries([
  L(
    "osi-model",
    "OSI Model Explained: 7 Layers, One Mental Model",
    "osi",
    "The OSI model is easiest to understand as a stack of responsibilities rather than seven definitions to memorize. A browser creates application data, higher layers prepare its representation and conversation, Transport gives the conversation end-to-end delivery semantics, Network chooses an inter-network path, Data Link delivers across one local link, and Physical turns bits into signals. The same message therefore changes form as it moves down the sender and back up the receiver.",
    "Think of sending a carefully packed parcel through a huge logistics company. The writer knows the message, the packing desk adds packaging rules, the courier manages the shipment, the routing center chooses roads, the local depot handles the neighborhood hand-off, and the road itself carries the package. Each layer owns a different failure mode.",
    [
      { title: "The seven responsibilities", body: "L7 Application exposes network services to programs; L6 Presentation concerns representation, encoding and cryptographic transformations; L5 Session concerns dialog/session organization; L4 Transport provides process-to-process delivery; L3 Network provides logical addressing and routing; L2 Data Link creates frames for a local link; L1 Physical carries signals." },
      { title: "Peer-layer thinking", body: "A layer logically talks to the same layer on the remote system, but the bytes physically pass through every lower layer first. This distinction explains why an HTTP server can conceptually 'talk HTTP' to another HTTP server even though routers only care about IP and Ethernet headers." },
      { title: "Why engineers still use OSI", body: "The Internet is not implemented as a literal seven-box machine. OSI remains useful because it gives a vocabulary for isolating faults: no link light suggests L1, a wrong VLAN suggests L2, a missing route suggests L3, a blocked port suggests L4, and an application configuration problem may live at L7." },
    ],
    [
      { label: "7 → 5", detail: "The application generates data; representation and session concerns prepare the communication context." },
      { label: "4", detail: "Transport may segment the data and associate it with source/destination ports." },
      { label: "3", detail: "The network layer adds logical addresses and provides routing across networks." },
      { label: "2", detail: "The local link wraps the packet in a frame containing link-layer addressing and error detection." },
      { label: "1", detail: "Bits become electrical, optical or radio signals and cross the medium." },
    ],
    {
      title: "PDU ladder",
      language: "text",
      code: "Application data\n      ↓\nTCP segment / UDP datagram\n      ↓\nIP packet\n      ↓\nEthernet frame\n      ↓\n10101100… (signals)",
      explanation: "Use the PDU name as a retrieval cue. At exams and during debugging, ask: what is the unit at this layer, what address is inside it, and what device normally makes the forwarding decision here?",
    },
    [
      "Treat the OSI model as a literal implementation of the Internet.",
      "Say a switch routes packets by IP; conventional Ethernet switching is primarily a Layer 2 forwarding function.",
      "Memorize layer names without connecting them to PDUs, addresses, devices and failure modes.",
    ],
    [
      { question: "What changes as data descends from L7 to L1?", answer: "Each relevant layer adds control information and/or transforms the representation so the next lower layer can provide its service. The receiver performs the inverse process." },
      { question: "Why can an application talk to another application across routers?", answer: "Because end systems preserve the higher-layer semantics while intermediate devices forward according to lower-layer information they understand." },
      { question: "What is the fastest OSI troubleshooting habit?", answer: "Translate the symptom into the smallest plausible layer, test a concrete claim, then move upward only after the lower dependency is known to work." },
    ],
    "Teach the seven layers without naming them first. Describe the jobs from 'program asks for a service' down to 'a signal moves through a medium', then map each job back to the formal layer name.",
    "Common exam targets: layer ordering, PDU names, device/layer mapping, TCP/IP comparison, and troubleshooting scenarios where the symptom points to a layer.",
    ["encapsulation", "webpage-journey", "tcp-handshake-and-models"]
  ),
  L(
    "encapsulation",
    "Encapsulation & Decapsulation: Watch a Packet Grow",
    "encapsulation",
    "Encapsulation is the mechanism behind the familiar Data → Segment → Packet → Frame → Bits progression. Each layer does not rewrite the entire message from scratch; it treats the payload from the layer above as opaque data and adds the control information needed for its own service. This modularity is why protocols can evolve independently.",
    "Imagine placing a letter inside an envelope, then putting that envelope into a courier bag, then putting the bag into a truck container. Every wrapper has a different label. The receiver peels the wrappers in reverse order.",
    [
      { title: "Headers vs trailers", body: "Transport commonly adds a header; Ethernet adds a frame header and a Frame Check Sequence trailer. A trailer can carry integrity information that is only meaningful at that layer." },
      { title: "Addresses change at different scopes", body: "The destination IP can remain stable end-to-end while the destination MAC address changes at every routed hop. This is one of the most important distinctions in practical networking." },
      { title: "Payload transparency", body: "An IP router does not normally parse the application bytes to decide their route. It forwards based on IP information and treats the higher-layer payload as data." },
    ],
    [
      { label: "Application", detail: "HTTP request becomes application data." },
      { label: "Transport", detail: "TCP or UDP adds ports and transport metadata." },
      { label: "Network", detail: "IP adds source/destination network addresses." },
      { label: "Data Link", detail: "The next-hop MAC addresses and link integrity fields create a frame." },
      { label: "Receiver", detail: "The stack strips the wrappers in reverse order and delivers the original bytes to the application." },
    ],
    {
      title: "A simplified frame",
      language: "text",
      code: "[Ethernet hdr][IP hdr][TCP hdr][HTTP bytes][FCS]\n\\___________ Frame ___________//",
      explanation: "The exact wire format depends on the protocol and options. The useful mental model is nested ownership: each lower layer carries the upper layer's unit as its payload.",
    },
    [
      "Say every layer always adds exactly one header.",
      "Assume the same MAC address travels end-to-end across routed networks.",
      "Confuse encapsulation with encryption; wrapping data and cryptographically protecting data solve different problems.",
    ],
    [
      { question: "Why can the MAC address change while the IP address stays the same?", answer: "MAC addresses are used for local-link delivery. When a packet crosses a router, a new link-layer frame is created for the next link." },
      { question: "What is decapsulation?", answer: "The receiving stack processes and removes protocol metadata in reverse order until the application receives its original payload." },
      { question: "Why is layering powerful?", answer: "A layer can change its implementation without requiring every higher layer to understand the lower-layer mechanics, provided the service contract remains compatible." },
    ],
    "Draw five nested boxes and label each one with the PDU. Then erase the labels and reconstruct them from memory in under 30 seconds.",
    "Typical questions ask for PDU names, header fields, encapsulation order and which addresses are rewritten at each hop.",
    ["webpage-journey", "ethernet-mac-arp", "tcp-reliability"]
  ),
  L(
    "webpage-journey",
    "What Really Happens When You Type google.com",
    "web-journey",
    "Typing a URL triggers a pipeline, not a single network request. The browser must determine where the host is, establish the appropriate transport/security context, send an HTTP request, receive bytes, parse the response, and request additional resources. DNS, ARP/NDP, routing, TCP or QUIC, TLS and HTTP are all parts of the visible 'page load'.",
    "Think of a restaurant reservation. First you discover the correct restaurant, then establish a connection, verify that you are talking to the right place, place the order, receive the meal, and then ask for side dishes such as images, stylesheets and scripts.",
    [
      { title: "Name resolution first", body: "A browser or operating system often consults local caches before asking a DNS resolver. The resolver may obtain an answer by following the DNS hierarchy until an authoritative server provides the requested record." },
      { title: "Reachability is multi-hop", body: "The destination IP is not enough by itself. The host must choose a route, reach the next hop on the local link, and encapsulate frames for every hop." },
      { title: "Security precedes application data", body: "For HTTPS, TLS authenticates the server and establishes cryptographic keys before protected HTTP data is exchanged. Modern HTTP/3 runs inside QUIC rather than TCP." },
    ],
    [
      { label: "1. Resolve", detail: "URL → DNS lookup → destination address." },
      { label: "2. Reach", detail: "Routing + next-hop link resolution move packets toward the server." },
      { label: "3. Establish", detail: "TCP+TLS for classic HTTPS, or QUIC for HTTP/3." },
      { label: "4. Request", detail: "The browser sends an HTTP request and receives headers/body bytes." },
      { label: "5. Render", detail: "The browser parses HTML and issues follow-up requests for dependent resources." },
    ],
    {
      title: "Debugging checklist",
      language: "bash",
      code: "dig +short google.com\ncurl -I https://google.com\ntraceroute google.com\nss -tuna | head",
      explanation: "These commands answer different questions: DNS answer, HTTP/TLS reachability, path visibility and local socket state. Good debugging uses tools that test separate hypotheses.",
    },
    [
      "Think of the entire page as one packet.",
      "Skip DNS because browsers 'just know' the IP.",
      "Assume TCP is always used for modern HTTP.",
    ],
    [
      { question: "What must succeed before an HTTPS request can complete?", answer: "At minimum, name resolution or an equivalent address source, path/link reachability, the chosen transport, and the TLS/application protocol negotiation must all succeed." },
      { question: "Why does one page cause many requests?", answer: "HTML frequently references stylesheets, JavaScript, fonts, images and API endpoints that are fetched separately, subject to caching and browser policies." },
      { question: "Where would you start when a site fails?", answer: "Separate the failure into DNS, connectivity, TLS, HTTP response, or browser/application behavior instead of treating 'the network' as one system." },
    ],
    "Narrate the page load from the keyboard to the server and back without using protocol names until the end. Then map each step to DNS, routing, transport, TLS and HTTP.",
    "Exams often combine several layers in one scenario: be prepared to identify the protocol, layer, address and failure symptom together.",
    ["signals-media", "dns", "tcp-handshake"]
  ),
  L(
    "tcp-handshake-and-models",
    "TCP Handshake, OSI vs TCP/IP & the Big Mapping",
    "protocols",
    "Three separate ideas often get mixed together: OSI is a conceptual seven-layer reference model, TCP/IP is a practical protocol suite and model, and TCP itself is a transport protocol. The key is to place each concept at the correct abstraction level before comparing them.",
    "Think of OSI as the filing system for describing jobs, TCP/IP as the real organizational structure of a working company, and TCP as one specific process run by the transport department.",
    [
      { title: "Mapping the stacks", body: "A common four-layer TCP/IP mapping groups OSI Application/Presentation/Session into Application, keeps Transport as Transport, maps Network to Internet, and groups Data Link + Physical into Link/Network Access." },
      { title: "Why the mapping is approximate", body: "Real protocol suites do not obey a rigid one-to-one mapping. TLS, for example, is often described between application and transport even though OSI's Presentation layer is a conceptual home for representation/security." },
      { title: "TCP is not the whole Internet", body: "TCP provides reliable byte-stream transport. The Internet also depends on IP, routing protocols, DNS, Ethernet/Wi-Fi, TLS, HTTP and many other protocols." },
    ],
    [
      { label: "OSI", detail: "Describes responsibilities in seven conceptual layers." },
      { label: "TCP/IP", detail: "Groups those responsibilities into a practical Internet stack." },
      { label: "TCP", detail: "Lives inside the Transport layer and provides a reliable ordered byte stream." },
      { label: "IP", detail: "Lives at the Internet/Network layer and provides packet forwarding." },
      { label: "HTTP", detail: "Lives at the application end of the stack and uses a transport beneath it." },
    ],
    {
      title: "Mental mapping",
      language: "text",
      code: "OSI 7  6  5 | 4 | 3 | 2  1\n      \\______|___|___|______//\nTCP/IP Application | Transport | Internet | Link",
      explanation: "Do not memorize this as a rigid protocol law. Use it as a reasoning map for where responsibilities normally sit.",
    },
    [
      "Call TCP a Layer 3 protocol.",
      "Say OSI and TCP/IP contain exactly the same number of protocols.",
      "Treat the four-layer mapping as an absolute implementation boundary.",
    ],
    [
      { question: "Where is TCP?", answer: "Transport layer." },
      { question: "Where is IP?", answer: "Network/Internet layer." },
      { question: "What is the key conceptual difference?", answer: "OSI primarily organizes networking responsibilities as a reference model; TCP/IP is the practical suite and architecture used by the Internet." },
    ],
    "On paper, draw both stacks from memory. Then place HTTP, TLS, TCP, UDP, IP, Ethernet and Wi-Fi in the approximate layer where you would debug them.",
    "Common exam targets: mapping tables, differences between models, examples of protocols at each layer, and the reason for using layered abstractions.",
    ["osi-model", "tcp-handshake", "http-versions"]
  ),
  L(
    "signals-media",
    "Signals, Bandwidth, Latency & Transmission Media",
    "signals",
    "Networking begins below packets. Bits are represented by physical phenomena: electrical changes in copper, pulses of light in fiber, or electromagnetic radiation over radio. Bandwidth, latency, attenuation, noise and duplex behavior determine how much information can be moved and how quickly a receiver can distinguish it.",
    "Imagine a highway. Bandwidth resembles the number of lanes, while propagation latency resembles the distance to the destination. Adding lanes does not make a city instantly closer.",
    [
      { title: "Bandwidth is capacity", body: "A 1 Gb/s link can carry more bits per second than a 100 Mb/s link, but users may still experience high latency if propagation, queuing or processing delays dominate." },
      { title: "Propagation vs transmission delay", body: "Transmission delay depends on how long it takes to push all bits of a frame onto the medium. Propagation delay depends on how long the signal takes to travel through the medium." },
      { title: "Media trade-offs", body: "Copper is inexpensive and easy to terminate but is more sensitive to electromagnetic interference and distance. Fiber supports long distances and high capacity with immunity to electrical interference. Radio provides mobility but shares a noisy, contested medium." },
    ],
    [
      { label: "Encode", detail: "Convert bits into a signal pattern suitable for the medium." },
      { label: "Transmit", detail: "Push the signal onto copper, fiber or radio." },
      { label: "Propagate", detail: "The signal physically travels through the medium." },
      { label: "Receive", detail: "The receiver detects signal changes and reconstructs bits." },
      { label: "Validate", detail: "Higher layers use framing and checks to detect corruption or loss." },
    ],
    {
      title: "Delay model",
      language: "text",
      code: "total delay ≈ transmission + propagation + processing + queuing\ntransmission = frame_bits / link_rate",
      explanation: "This decomposition is a powerful performance artifact. When latency changes, ask which component changed rather than blaming 'the Internet'.",
    },
    [
      "Treat bandwidth and latency as synonyms.",
      "Assume fiber is always lower-latency in every deployment; path length and equipment still matter.",
      "Forget that Wi-Fi is a shared medium with contention and interference.",
    ],
    [
      { question: "Why can a 1 Gb/s link still feel slow?", answer: "High propagation, queueing, packet loss, server delay or application processing can dominate the user's perceived latency." },
      { question: "What does a higher bitrate change?", answer: "It increases how quickly bits can be serialized onto the medium; it does not automatically reduce propagation delay." },
      { question: "Why is radio different from fiber?", answer: "Radio shares an open medium subject to interference, contention and mobility, while fiber confines optical transmission inside a physical cable." },
    ],
    "Explain a slow network as four clocks: pushing bits, moving bits, processing bits, and waiting in line. Then choose which clock dominates in three scenarios.",
    "Expect numerical questions involving transmission delay, propagation delay, bandwidth and link capacity.",
    ["ethernet-mac-arp", "switches-vlans", "frame-trace"]
  ),
  L(
    "ethernet-mac-arp",
    "Ethernet Frames, MAC Addresses & ARP",
    "arp",
    "Ethernet provides local-link delivery. Hosts and switches use MAC addresses so frames can reach the correct interface on the current LAN segment. ARP bridges a semantic gap: an application or IP layer may know an IPv4 destination, while the local link still needs a destination MAC address.",
    "Imagine knowing someone's apartment number but not the name of the person at the building door. ARP is the local directory request that asks, 'Who currently owns this IP on this link?'",
    [
      { title: "Ethernet framing", body: "A frame includes source and destination MAC addresses plus an EtherType/length field and an FCS for integrity checking. The precise wire representation includes additional fields such as preamble and inter-frame gap." },
      { title: "ARP is local", body: "ARP broadcasts a request on the local broadcast domain, but the reply is normally unicast. Routers terminate the local ARP process; a router does not forward an Ethernet broadcast into the next LAN as if the two LANs were one." },
      { title: "MAC addresses are local identifiers", body: "A MAC address identifies an interface at the link layer. When a packet crosses routers, the Ethernet frame is replaced for the next link, so the source/destination MAC pair normally changes hop by hop." },
    ],
    [
      { label: "1", detail: "Host determines the destination IP is local or needs the default gateway." },
      { label: "2", detail: "If local IPv4 delivery is needed and the MAC is unknown, ARP requests the mapping." },
      { label: "3", detail: "The owner replies with its MAC address." },
      { label: "4", detail: "The sender caches the result and builds an Ethernet frame." },
      { label: "5", detail: "The switch forwards the frame based on its learned MAC table." },
    ],
    {
      title: "Observe ARP",
      language: "bash",
      code: "ip neigh\narp -a\n# Linux packet capture hint\ntcpdump -ni any arp",
      explanation: "The neighbor table is the artifact to inspect when a host can reach the IP network conceptually but cannot form local link-layer delivery.",
    },
    [
      "Say ARP resolves a domain name; DNS does that job.",
      "Assume ARP works across routers.",
      "Think a switch needs an ARP entry to forward a frame; switches learn MAC addresses directly from observed source addresses.",
    ],
    [
      { question: "What question does an ARP request answer?", answer: "Which interface owns this IPv4 address on the local broadcast domain, and therefore which MAC should receive the frame?" },
      { question: "Why does the default gateway have a MAC address?", answer: "Because the host's next-hop frame still needs a local Layer 2 destination, even when the final IP destination is on another network." },
      { question: "Who learns MAC-to-port mappings?", answer: "A switch learns from the source MAC address of incoming Ethernet frames and associates that MAC with the ingress port." },
    ],
    "Draw a laptop, gateway and server. For one packet to a remote server, explicitly label the destination IP and the destination MAC on the first hop.",
    "Common questions: ARP request/reply, broadcast vs unicast, ARP cache, default gateway MAC, and how MAC and IP addressing interact.",
    ["arp", "switches-vlans", "frame-trace"]
  ),
  L(
    "arp",
    "ARP Resolution: Interactive Request → Reply → Cache",
    "arp",
    "ARP is a tiny protocol with a huge debugging payoff. When a host has an IPv4 destination but lacks a Layer 2 mapping for the next hop, it broadcasts a request. The target or gateway responds, the host caches the result, and the next frame can be sent without repeating the broadcast until the entry expires or changes.",
    "Think of a student shouting in a hostel corridor: 'Who is room 214?' The person in room 214 answers, and now the student remembers the room-to-person mapping for a while.",
    [
      { title: "Broadcast scope", body: "An ARP request is confined to the local broadcast domain. VLAN boundaries and routers define where the broadcast can travel." },
      { title: "Why cache?", body: "Without caching, every packet could trigger a broadcast. Caching reduces chatter and speeds up subsequent local deliveries." },
      { title: "Failure patterns", body: "A stale or incorrect ARP entry can produce black holes or misdelivery. Duplicate address detection and gratuitous ARP are used in real systems to update or announce mappings." },
    ],
    [
      { label: "Request", detail: "Who has 192.168.1.1? Tell 192.168.1.20." },
      { label: "Broadcast", detail: "The Ethernet destination is ff:ff:ff:ff:ff:ff on the local LAN." },
      { label: "Reply", detail: "192.168.1.1 answers with its MAC address." },
      { label: "Cache", detail: "The sender stores the mapping temporarily." },
      { label: "Frame", detail: "Subsequent packets use the learned MAC without another ARP request." },
    ],
    {
      title: "ARP cache artifact",
      language: "text",
      code: "192.168.1.1  →  8c:85:90:aa:bb:cc\nstate: REACHABLE\nused for: next-hop Ethernet delivery",
      explanation: "Treat the neighbor table like a cache with a lifecycle, not a permanent database.",
    },
    [
      "Assume an ARP entry lasts forever.",
      "Use ARP to resolve public DNS names.",
      "Forget the distinction between the final destination IP and the local next-hop MAC.",
    ],
    [
      { question: "Why is the request broadcast but the reply usually unicast?", answer: "The sender does not yet know the owner's MAC, so it must reach everyone on the local broadcast domain. Once the owner identifies itself, the reply can be sent directly." },
      { question: "What happens if the remote destination is not local?", answer: "The host resolves the default gateway's MAC instead of the remote host's MAC and sends the IP packet to the gateway for routing." },
      { question: "Why does the cache expire?", answer: "Topology and ownership can change. Aging limits stale state and allows the host to relearn the current mapping." },
    ],
    "Predict the ARP frames for three cases: local destination, remote destination, and unknown gateway. Check yourself only after drawing the first-hop Ethernet frame.",
    "ARP is a frequent practical-debugging and viva topic because it tests whether you understand IP vs MAC scope.",
    ["switches-vlans", "frame-trace", "ipv4-cidr"]
  ),
  L(
    "switches-vlans",
    "Switches, VLANs & Why Hubs Disappeared",
    "switch",
    "A hub repeats incoming electrical signals out multiple ports. A learning Ethernet switch instead builds a table that maps source MAC addresses to ports and forwards a known destination only toward the appropriate port. VLANs then let one physical switch infrastructure host multiple logical broadcast domains.",
    "A hub is like yelling an announcement through every hostel room. A switch is a receptionist who learns who is in which room and forwards the note only where it belongs.",
    [
      { title: "MAC learning", body: "When a frame arrives on port 7 with source MAC AA:AA, the switch records AA:AA → port 7. Later traffic addressed to AA:AA can be forwarded specifically to port 7." },
      { title: "Unknown destination behavior", body: "If the destination MAC is unknown, the switch floods within the same VLAN, except back out the ingress port. Once the switch learns the destination, forwarding becomes selective." },
      { title: "VLANs change broadcast scope", body: "A VLAN creates a separate Layer 2 broadcast domain. Communication between VLANs requires a Layer 3 function such as a router or Layer 3 switch." },
    ],
    [
      { label: "Learn", detail: "Observe source MAC → ingress port." },
      { label: "Lookup", detail: "Search the destination MAC in the CAM/MAC table." },
      { label: "Forward", detail: "Send only through the destination port when known." },
      { label: "Flood", detail: "If unknown/broadcast, flood inside the relevant VLAN." },
      { label: "Segment", detail: "Use VLANs to isolate broadcast domains and policy boundaries." },
    ],
    {
      title: "Tiny MAC table",
      language: "text",
      code: "VLAN 10\nAA:AA:AA → Gi1/0/1\nBB:BB:BB → Gi1/0/7\nCC:CC:CC → Gi1/0/12",
      explanation: "A switch's forwarding database is state learned from traffic. It is not a static list written by humans for every endpoint.",
    },
    [
      "Say switches route using IP by default.",
      "Say VLANs automatically create Internet connectivity between segments.",
      "Assume a switch floods every frame forever; learning exists specifically to reduce flooding.",
    ],
    [
      { question: "What field teaches a switch where a host lives?", answer: "The source MAC address of an incoming frame, paired with the ingress port and VLAN." },
      { question: "Why are VLANs useful?", answer: "They provide logical separation of Layer 2 broadcast domains and can enforce segmentation without requiring a separate physical switch for every group." },
      { question: "What device is required for inter-VLAN routing?", answer: "A Layer 3 function such as a router or multilayer switch." },
    ],
    "Explain one frame's journey before VLANs and after VLANs. Focus on who receives the broadcast and why.",
    "Expect switch-learning, flooding, MAC table, VLAN, broadcast-domain and inter-VLAN-routing questions.",
    ["frame-trace", "ipv4-cidr", "routing"]
  ),
  L(
    "frame-trace",
    "Trace One Ethernet Frame Across Two Switches",
    "frame-trace",
    "A frame trace forces you to separate end-host knowledge from switch behavior. The sender creates the frame using a local destination MAC. Each switch makes a forwarding decision from its MAC table, while the frame's payload remains an IP packet. When the frame crosses a router, the Layer 2 envelope is recreated for the next link.",
    "Imagine two reception desks connected by a hallway. Each receptionist only needs a directory for the rooms on their side of the hallway. The contents of the parcel do not tell the receptionist which room to use; the envelope address does.",
    [
      { title: "Same-LAN path", body: "If two hosts are in the same VLAN, the source can ARP for the destination and send the frame through one or more switches. The destination MAC remains the same across the switched path." },
      { title: "Routed path", body: "When the destination is remote, the sender uses the gateway MAC. The router removes the inbound frame, examines the IP packet, chooses a route, and builds a fresh outbound frame on the next interface." },
      { title: "Why this matters", body: "Packets and frames have different scopes. A packet may cross multiple networks; a frame normally exists only for one link or LAN segment at a time." },
    ],
    [
      { label: "Host A", detail: "Build frame: src MAC A, dst MAC B or gateway MAC." },
      { label: "Switch 1", detail: "Look up destination MAC and choose output port." },
      { label: "Switch 2", detail: "Repeat the same Layer 2 lookup on its own table." },
      { label: "Router, if needed", detail: "Terminate the frame, route the IP packet, then create a new frame." },
      { label: "Host B", detail: "Receive the frame, validate it, pass the payload up the stack." },
    ],
    {
      title: "Hop-by-hop vs end-to-end",
      language: "text",
      code: "End-to-end:  IP src = A  →  IP dst = B\nHop 1:       MAC A  →  MAC Gateway\nHop 2:       MAC Router2 → MAC Router3\nHop final:   MAC Gateway → MAC B",
      explanation: "Use this artifact whenever an interview question tries to trick you into saying MAC and IP addresses behave the same way.",
    },
    [
      "Keep the first-hop MAC unchanged across the whole Internet.",
      "Assume a switch reads the TCP port to forward an ordinary Ethernet frame.",
      "Forget that each routed hop has its own link-layer envelope.",
    ],
    [
      { question: "Does a switch change the IP packet?", answer: "Ordinary Layer 2 switching forwards the Ethernet frame without changing the IP payload." },
      { question: "What changes at a router?", answer: "The incoming frame is removed and a new outgoing frame is created for the next link. The IP packet is forwarded, subject to routing and fields that may be updated by the router." },
      { question: "Why does this simplify local networking?", answer: "Each hop only needs local link-layer addressing while the IP layer provides a logical identity that can span multiple networks." },
    ],
    "Take a packet from your laptop to a cloud server and list every MAC address you expect to see at each hop. Then list the IP addresses separately.",
    "Frame-vs-packet tracing is a classic interview and Wireshark skill.",
    ["ipv4-cidr", "routing", "tcp-reliability"]
  ),
  L(
    "ipv4-cidr",
    "IPv4 Anatomy: Network Bits, Host Bits & CIDR",
    "subnet",
    "An IPv4 address is 32 bits. A CIDR prefix such as /24 says that the first 24 bits identify the network prefix while the remaining 8 bits are available for host addressing within that subnet. Subnetting is the art of allocating those bits deliberately rather than treating addresses as four unrelated decimal octets.",
    "Think of a postal code plus house number. The postal code gets you to the neighborhood; the house number gets you to the exact building. CIDR tells you how many bits belong to the neighborhood.",
    [
      { title: "Binary is the truth", body: "The decimal form is a human-friendly encoding of 32 binary bits. Subnet masks simply mark which positions belong to the network prefix." },
      { title: "CIDR is variable length", body: "Old classful thinking used fixed A/B/C boundaries. CIDR lets operators choose prefixes such as /20, /27 or /31 to fit actual capacity." },
      { title: "Network, broadcast and usable hosts", body: "For a conventional IPv4 subnet, the all-zero host address is the network address and the all-one host address is the broadcast address, leaving 2^h − 2 conventional host addresses when h ≥ 2. Point-to-point and special-purpose prefixes have exceptions." },
    ],
    [
      { label: "1", detail: "Write the address in 32-bit binary." },
      { label: "2", detail: "Mark the first N bits as the network prefix for /N." },
      { label: "3", detail: "The remaining bits identify hosts inside that prefix." },
      { label: "4", detail: "Compute the network boundary and next subnet boundary." },
      { label: "5", detail: "Check whether the requested host lies inside the subnet." },
    ],
    {
      title: "Example",
      language: "text",
      code: "192.168.10.37/27\nmask = 255.255.255.224\nblock size = 32\nsubnet = 192.168.10.32/27\nrange = .32–.63",
      explanation: "A /27 leaves 5 host bits, giving 32 addresses per block. For conventional host addressing, .32 is the network and .63 is the broadcast address.",
    },
    [
      "Count octets instead of bits when solving CIDR problems.",
      "Use 256−prefix as the host count for arbitrary masks.",
      "Assume every subnet always gives two addresses that can be assigned to endpoints; special prefixes differ.",
    ],
    [
      { question: "How many host bits does /27 leave?", answer: "5 host bits because 32 − 27 = 5." },
      { question: "What determines the subnet size?", answer: "The prefix length. Fewer network bits means more addresses per subnet; more network bits means smaller subnets." },
      { question: "Why learn binary subnetting?", answer: "It reveals the actual bit boundary and prevents memorized decimal tricks from failing on unusual prefixes." },
    ],
    "Convert 10.20.30.65/26 into binary, identify the 26-bit boundary, and explain why the answer is a block boundary rather than a guessed range.",
    "Expect host-count, network-address, broadcast-address, subnet-range and prefix-comparison questions.",
    ["subnetting", "routing", "subnet-design-lab"]
  ),
  L(
    "subnetting",
    "Subnetting Playground: Calculate Networks Instead of Memorizing",
    "subnet",
    "Subnetting becomes much easier when you treat it as a bit-boundary problem. The interactive calculator on this lesson lets you vary an IPv4 address and prefix, then see the network, broadcast, host span and mask change together. The goal is not calculator dependence; it is building a fast internal model you can reproduce on paper.",
    "Imagine slicing a pizza. The prefix length decides how many slices you cut the address space into; the host bits decide how many seats fit inside each slice.",
    [
      { title: "Prefix arithmetic", body: "A /24 has 8 host bits; a /26 has 6; a /30 has 2. The larger the prefix number, the smaller the subnet." },
      { title: "Block boundaries", body: "For a subnet mask with an interesting octet, the block size is 256 minus the mask value in that octet. The containing subnet starts at the nearest multiple of that block size at or below the address." },
      { title: "Design, not just calculation", body: "Real subnetting balances address utilization, route aggregation, broadcast scope, security boundaries and future growth. The mathematically smallest subnet is not always the operationally best design." },
    ],
    [
      { label: "Input", detail: "Enter an IPv4 address and CIDR prefix." },
      { label: "Mask", detail: "Convert the prefix into a dotted-decimal subnet mask." },
      { label: "Network", detail: "Zero the host bits to find the network address." },
      { label: "Broadcast", detail: "Set all host bits to one to find the broadcast address." },
      { label: "Host range", detail: "Inspect the usable endpoints according to the subnet type." },
    ],
    {
      title: "Paper algorithm",
      language: "text",
      code: "host_bits = 32 - prefix\nsize = 2^host_bits\nnetwork = address with host bits = 0\nbroadcast = address with host bits = 1",
      explanation: "Use this invariant even when you use a calculator: every subnet result must obey the bit model.",
    },
    [
      "Memorize block sizes without understanding why they work.",
      "Call the first address a host automatically in every IPv4 context.",
      "Ignore whether the prefix is being used for a normal LAN, point-to-point link or special purpose.",
    ],
    [
      { question: "What is the fastest sanity check?", answer: "The address must fall between the calculated network and broadcast boundaries, and the host count must match the number of remaining bits." },
      { question: "What happens when the prefix increases by one?", answer: "The address space is split into two equal-sized subnets; the number of host bits decreases by one." },
      { question: "Why are /31 links special?", answer: "They are commonly used for point-to-point links under RFC 3021 semantics, where the traditional network/broadcast reservation is not applied." },
    ],
    "Solve a /27 by hand first. Then change the calculator to /28 and predict the new boundaries before looking.",
    "Subnetting is one of the highest-value calculation areas in networking exams and technical interviews.",
    ["routing", "nat-ipv6", "subnet-design-lab"]
  ),
  L(
    "routing",
    "Routing Tables, Default Gateways & Longest-Prefix Match",
    "routing",
    "Routers do not ask 'which route seems generally closest?' They compare the destination IP against candidate prefixes and choose the most specific matching route, called longest-prefix match. The selected route then determines the next hop or outgoing interface.",
    "Picture a set of nested postal codes. A /8 is a broad region, a /16 is a city, a /24 is a street. If a destination fits multiple regions, the most specific map wins.",
    [
      { title: "Route anatomy", body: "A route commonly contains a destination prefix and mask, a next hop or directly connected interface, and metadata such as administrative distance or metric depending on the routing system." },
      { title: "Default route", body: "The default route 0.0.0.0/0 matches everything, but it is less specific than any non-default prefix. It is used only when no more-specific route matches." },
      { title: "Longest prefix first", body: "A /24 beats a /16 because the /24 carries more matching bits. Only after the best prefix is identified do protocol-specific metrics or next-hop rules resolve ties within the relevant routing table." },
    ],
    [
      { label: "Receive", detail: "Router reads the destination IP from the packet." },
      { label: "Match", detail: "Test the destination against candidate prefixes." },
      { label: "Select", detail: "Choose the most specific matching prefix." },
      { label: "Next hop", detail: "Resolve or use the next-hop forwarding information." },
      { label: "Forward", detail: "Build the next link-layer frame and send it out the selected interface." },
    ],
    {
      title: "Longest-prefix example",
      language: "text",
      code: "10.0.0.0/8      → R1\n10.20.0.0/16    → R2\n10.20.30.0/24   → R3\n10.20.30.44 → R3",
      explanation: "All three routes match 10.20.30.44, but /24 is the most specific and therefore wins.",
    },
    [
      "Choose the numerically smallest prefix.",
      "Think a default route wins because it is a default.",
      "Ignore that a route can point to a directly connected interface rather than another router.",
    ],
    [
      { question: "Why is /24 more specific than /16?", answer: "It requires 24 destination bits to match instead of 16, so it describes a smaller set of addresses." },
      { question: "What does a default route do?", answer: "It provides a catch-all path when no more-specific route exists." },
      { question: "What happens after route selection?", answer: "The router performs forwarding actions such as resolving the next-hop link-layer address and emitting a new frame." },
    ],
    "Take a destination like 10.20.30.44 and mark every matching route. Circle the longest prefix without looking at the answer.",
    "Expect routing-table exercises, default route questions and longest-prefix matching problems.",
    ["routing-protocols", "nat-ipv6", "subnet-design-lab"]
  ),
  L(
    "nat-ipv6",
    "NAT, Private Addressing & Why IPv6 Exists",
    "nat",
    "Network Address Translation lets many private hosts share public IPv4 addresses by rewriting address/port information at a translation boundary. NAT became operationally important because public IPv4 addresses are scarce, but it also changes end-to-end connectivity assumptions. IPv6 restores a much larger address space and supports simpler globally unique addressing, while still requiring firewalls and careful policy.",
    "A building can have hundreds of rooms with internal room numbers but one street address. The front desk maps outgoing conversations to the public address and remembers which internal room should receive each reply.",
    [
      { title: "Private IPv4 ranges", body: "RFC 1918 defines 10/8, 172.16/12 and 192.168/16 for private IPv4 use. These are not globally routable addresses on the public Internet." },
      { title: "PAT/NAPT", body: "In common home routers, many internal connections share one public IPv4 address by translating both addresses and transport ports, maintaining a state table for return traffic." },
      { title: "IPv6 is more than 'more addresses'", body: "IPv6 expands addressing, changes header behavior, uses Neighbor Discovery instead of ARP, and supports different operational models. NAT is not the primary mechanism for IPv6 address conservation." },
    ],
    [
      { label: "Private host", detail: "10.0.0.24:51514 opens a connection." },
      { label: "NAT gateway", detail: "Rewrites source to public-ip:40001 and records the mapping." },
      { label: "Internet", detail: "Remote server sees the public tuple, not the private address." },
      { label: "Reply", detail: "The NAT table maps the response back to the internal host." },
      { label: "IPv6 contrast", detail: "A globally routable IPv6 address can exist without requiring address translation for scarcity." },
    ],
    {
      title: "Translation state",
      language: "text",
      code: "inside: 10.0.0.24:51514\noutside: 198.51.100.7:40001\nremote: 203.0.113.10:443",
      explanation: "The translation table behaves like a temporary correspondence between internal and external flow identifiers.",
    },
    [
      "Say NAT is exactly the same thing as a firewall.",
      "Say private IP addresses can be routed across the public Internet unchanged.",
      "Assume IPv6 makes security automatic; security policy is still required.",
    ],
    [
      { question: "Why can NAT break inbound connections?", answer: "If no existing translation state or explicit port-forwarding rule maps an unsolicited inbound packet to an internal host, the gateway does not know where to send it." },
      { question: "What problem did NAT help address?", answer: "IPv4 address scarcity and the ability to connect many private hosts through fewer public addresses." },
      { question: "What replaces ARP in IPv6?", answer: "Neighbor Discovery Protocol, which uses ICMPv6." },
    ],
    "Explain NAT as a state machine, not a magic 'private-to-public' button. Draw one outbound flow and one unsolicited inbound flow.",
    "Exam questions often compare private/public addressing, NAT/PAT behavior, IPv4 exhaustion and IPv6 features.",
    ["routing-protocols", "dns", "firewalls-vpn-proxies"]
  ),
  L(
    "routing-protocols",
    "How Routers Learn: Static, RIP, OSPF & BGP",
    "routing",
    "A routing table can be populated manually or learned dynamically. Static routes are explicit configuration. RIP is a distance-vector protocol with simple hop-count reasoning. OSPF is a link-state interior gateway protocol that builds a topology database and computes shortest paths. BGP is the inter-domain routing protocol that exchanges reachability information between autonomous systems using policy-rich path attributes.",
    "Think of roads in a city versus roads between countries. Inside one organization, routers can share a common topology model; between organizations, routing must also express business and policy constraints.",
    [
      { title: "Static routing", body: "Simple and deterministic, but every topology change requires configuration unless another mechanism handles it. It remains useful for small or special-purpose paths." },
      { title: "RIP", body: "RIP uses hop count as a metric and has a maximum usable path length of 15 hops, making it unsuitable for large modern networks but useful for learning distance-vector concepts." },
      { title: "OSPF vs BGP", body: "OSPF is commonly used within an autonomous system and distributes link-state information. BGP is used between autonomous systems and is strongly policy-driven; path attributes such as AS_PATH matter more than a simple shortest-distance metric." },
    ],
    [
      { label: "Static", detail: "Human defines a destination and next hop." },
      { label: "Distance vector", detail: "Routers learn reachability through neighbor-to-neighbor path information." },
      { label: "Link state", detail: "Routers build a shared topology view and compute paths." },
      { label: "Inter-domain", detail: "BGP exchanges reachable prefixes plus policy-relevant path attributes." },
      { label: "Forwarding", detail: "The best route is installed into forwarding structures used for packets." },
    ],
    {
      title: "Protocol comparison",
      language: "text",
      code: "Static → explicit control\nRIP    → distance vector, hop count\nOSPF   → link state, topology database\nBGP    → inter-domain, policy + AS paths",
      explanation: "Do not reduce protocols to slogans. The real distinction is the information they exchange, the scope where they operate, and the way they select paths.",
    },
    [
      "Call BGP an interior gateway protocol.",
      "Explain OSPF as simply 'hop count'.",
      "Assume the mathematically shortest path is always the operationally selected path.",
    ],
    [
      { question: "Why can BGP choose a longer path?", answer: "BGP is policy-driven. Operators can prefer or reject paths based on business, security and topology policy rather than only physical hop count." },
      { question: "What is the core idea of link-state routing?", answer: "Routers distribute enough topology information to build a common view and independently compute paths." },
      { question: "When is static routing useful?", answer: "Small stable networks, default/special routes, lab environments, controlled paths and cases where an administrator deliberately wants deterministic behavior." },
    ],
    "Teach the protocols as four kinds of map-making: a handwritten route, neighbor gossip, a shared topology map, and an inter-company policy map.",
    "Know protocol type, metric philosophy, scope and basic operational use. Detailed packet formats are usually secondary to the mental model.",
    ["routing", "subnet-design-lab", "tcp-packet-analysis"]
  ),
  L(
    "subnet-design-lab",
    "Subnet Design Lab: Build Three Networks Deliberately",
    "subnet",
    "Subnet design is where arithmetic becomes engineering. A good design allocates enough addresses for each segment, leaves sensible room for growth, keeps broadcast domains manageable, supports route aggregation where useful, and aligns addressing with security and operational boundaries.",
    "Pretend you are designing a campus with three buildings. You do not paint one enormous room and then draw imaginary walls; you create real zones that make movement, security and expansion easier.",
    [
      { title: "Requirements first", body: "Count current hosts, expected growth, infrastructure addresses, special devices and point-to-point links before choosing prefixes." },
      { title: "Choose prefixes from largest need downward", body: "Variable-length subnetting reduces waste. Allocate the largest subnet first so the address space does not get fragmented by small early allocations." },
      { title: "Route summarization", body: "Contiguous prefixes can sometimes be summarized to reduce routing-table size. Good address planning therefore considers the routing system, not only endpoint counts." },
    ],
    [
      { label: "Sales", detail: "Needs 90 hosts → choose the smallest practical subnet that satisfies growth." },
      { label: "Engineering", detail: "Needs 45 hosts → allocate a smaller VLSM prefix." },
      { label: "Infrastructure", detail: "Needs 12 hosts → use a compact subnet." },
      { label: "Validate", detail: "Check non-overlap, host capacity, gateways and future growth." },
      { label: "Summarize", detail: "Look for contiguous prefixes that can be advertised efficiently." },
    ],
    {
      title: "Design worksheet",
      language: "text",
      code: "Need 90 hosts  → /25 (126 conventional usable)\nNeed 45 hosts  → /26 (62 conventional usable)\nNeed 12 hosts  → /28 (14 conventional usable)\n\nThen place them on non-overlapping boundaries.",
      explanation: "The exact allocation depends on the available parent block and future growth. The important habit is to derive the prefix from the requirement rather than choosing a familiar mask first.",
    },
    [
      "Allocate equal-size /24s to every team automatically.",
      "Forget gateway, infrastructure and growth addresses.",
      "Create overlapping subnets because the decimal ranges 'look different'.",
    ],
    [
      { question: "Why allocate the biggest requirement first?", answer: "Large subnets are harder to fit after many smaller fragments have already consumed the address space." },
      { question: "What is VLSM?", answer: "Variable Length Subnet Masking: different subnets use different prefix lengths within a larger address block." },
      { question: "Why does address planning affect routing?", answer: "Hierarchical, contiguous allocations can improve route summarization and reduce the number of individual prefixes that routers must carry." },
    ],
    "Start with a blank /24 and pretend it is an office floor. Allocate rooms for 90, 45 and 12 people without overlap. Then explain every unused address.",
    "This is a strong practical and exam-style exercise because it combines host math, binary boundaries and routing awareness.",
    ["tcp-reliability", "routing-protocols", "dns"]
  ),
  L(
    "tcp-reliability",
    "TCP Reliability: Sequence Numbers, ACKs & Retransmission",
    "tcp",
    "TCP turns an unreliable packet network into a reliable, ordered byte stream. It uses sequence numbers to identify byte positions, acknowledgements to communicate received progress, timers and duplicate acknowledgements to detect loss, and retransmission to recover missing data. TCP does not guarantee that the physical network never loses packets; it detects and repairs the effects at the transport layer.",
    "Imagine mailing numbered pages with receipts. If page 7 is missing, the recipient can say where the gap begins. The sender can then retransmit the missing material rather than restarting the entire shipment.",
    [
      { title: "Byte-oriented sequence numbers", body: "TCP sequence numbers identify byte positions in the stream, not packet counts. An ACK normally indicates the next byte the receiver expects." },
      { title: "Cumulative acknowledgement", body: "A cumulative ACK such as ACK 5000 communicates that bytes before 5000 have been received in order; later bytes may have arrived out of order but the precise semantics depend on options such as SACK." },
      { title: "Loss recovery", body: "TCP can retransmit after a retransmission timeout. Duplicate ACK patterns can trigger faster recovery mechanisms, and Selective Acknowledgement can tell the sender which blocks arrived." },
    ],
    [
      { label: "Send", detail: "Sender transmits a segment carrying a sequence-numbered range of bytes." },
      { label: "Receive", detail: "Receiver validates and buffers bytes." },
      { label: "ACK", detail: "Receiver acknowledges the next expected byte position." },
      { label: "Detect loss", detail: "Timer or duplicate-ACK evidence suggests a missing segment." },
      { label: "Recover", detail: "Sender retransmits and continues the stream." },
    ],
    {
      title: "Sequence math",
      language: "text",
      code: "Segment: SEQ=1000, LEN=500\nReceiver ACK → 1500\nMeaning: next expected byte is 1500",
      explanation: "The ACK is about byte positions. This single idea prevents many off-by-one misunderstandings in packet captures and interview questions.",
    },
    [
      "Say TCP sends an ACK for every packet and nothing else.",
      "Treat a segment's sequence number as its segment index rather than its byte position.",
      "Assume retransmission makes TCP loss-free without any latency cost.",
    ],
    [
      { question: "What does ACK=1500 mean in the simple example?", answer: "The receiver is cumulatively acknowledging all bytes before 1500 and expects byte 1500 next." },
      { question: "Why use sequence numbers?", answer: "To order the byte stream, detect gaps and match acknowledgements and retransmissions to positions in the stream." },
      { question: "What is SACK for?", answer: "Selective Acknowledgement allows the receiver to report non-contiguous blocks that arrived, helping the sender retransmit only missing ranges." },
    ],
    "Draw five segments, delete one in the middle, and compute the ACK values before and after the gap. Then explain how the sender discovers the missing data.",
    "Expect sequence/ACK arithmetic, retransmission concepts, SACK, timeout and duplicate-ACK questions.",
    ["tcp-handshake", "tcp-flow-congestion", "tcp-packet-analysis"]
  ),
  L(
    "tcp-handshake",
    "Animated TCP Three-Way Handshake & Connection Teardown",
    "tcp-handshake",
    "TCP begins with a three-way handshake that establishes both directions of the connection and synchronizes initial sequence numbers. Connection teardown is different: it typically uses FIN/ACK exchanges because each direction of a TCP connection can close independently.",
    "Think of a phone call: 'Can you hear me?' → 'Yes, I can hear you.' → 'Great, I can hear you too.' The handshake proves both sides can exchange state before application data flows.",
    [
      { title: "SYN", body: "The client sends a SYN with an initial sequence number. The server creates connection state and acknowledges it." },
      { title: "SYN-ACK", body: "The server replies with its own initial sequence number and an acknowledgement for the client's SYN." },
      { title: "ACK", body: "The client acknowledges the server's SYN. Both sides now have synchronized sequence-number state and can proceed." },
    ],
    [
      { label: "Client → Server", detail: "SYN, Seq=x" },
      { label: "Server → Client", detail: "SYN-ACK, Seq=y, Ack=x+1" },
      { label: "Client → Server", detail: "ACK, Ack=y+1" },
      { label: "Data", detail: "Application bytes can now flow according to TCP state." },
      { label: "Close", detail: "FIN/ACK sequences independently close each direction." },
    ],
    {
      title: "Handshake on the wire",
      language: "text",
      code: "C → S  SYN      Seq=100\nS → C  SYN-ACK  Seq=900 Ack=101\nC → S  ACK      Ack=901",
      explanation: "The +1 matters because SYN consumes one sequence number. This is a favorite detail in packet-analysis questions.",
    },
    [
      "Call SYN-ACK the second 'connection' rather than the server's response.",
      "Forget that SYN consumes one sequence number.",
      "Assume FIN immediately destroys both directions of a TCP connection.",
    ],
    [
      { question: "Why three messages instead of two?", answer: "Both endpoints need to establish and acknowledge their sequence-number state so each side knows the other side received the information." },
      { question: "What does the +1 represent?", answer: "SYN occupies one sequence-number position, so the acknowledgement advances by one." },
      { question: "Why can TCP close in more than one exchange?", answer: "The connection is full-duplex; each direction can close independently." },
    ],
    "Hide the labels and reconstruct SYN, SYN-ACK and ACK from the sequence/acknowledgement numbers alone.",
    "Common questions: state transitions, sequence-number increments, SYN backlog and FIN/ACK teardown behavior.",
    ["tcp-reliability", "tcp-flow-congestion", "udp-quic"]
  ),
  L(
    "tcp-flow-congestion",
    "Flow Control vs Congestion Control: rwnd, cwnd & Slow Start",
    "tcp-control",
    "TCP has two different reasons to limit how much data can be in flight. Flow control protects the receiver from being overwhelmed; congestion control protects the network from overload. The receiver advertises a receive window (rwnd), while the sender also maintains a congestion window (cwnd). The amount of outstanding data is constrained by both.",
    "One limiter is the size of the receiving warehouse; the other is the traffic jam on the road. A huge warehouse does not make it wise to keep sending into a congested highway.",
    [
      { title: "Flow control", body: "The receiver advertises available buffer space. If the receiver cannot keep up, the sender must slow down even when the network itself is healthy." },
      { title: "Congestion control", body: "The sender infers network capacity from acknowledgements and loss/ECN signals. Slow start probes capacity rapidly, while congestion avoidance grows more cautiously." },
      { title: "The effective window", body: "A simplified mental model is send_window ≈ min(rwnd, cwnd). Real TCP behavior includes many additional limits and algorithms, but this minimum is the crucial conceptual anchor." },
    ],
    [
      { label: "Receiver", detail: "Advertises rwnd based on available receive buffer." },
      { label: "Sender", detail: "Tracks cwnd based on congestion-control state." },
      { label: "In flight", detail: "Outstanding bytes cannot exceed the effective sending window." },
      { label: "Feedback", detail: "ACK progress, loss and ECN-like signals update the control state." },
      { label: "Adapt", detail: "The sender grows, holds or reduces its sending rate." },
    ],
    {
      title: "Core relationship",
      language: "text",
      code: "effective_window = min(rwnd, cwnd)\nslow start: rapid probing\ncongestion avoidance: cautious growth\nloss/congestion signal: reduce sending rate",
      explanation: "Keep the two causes separate in your head. A slow receiver and a congested network are not the same problem.",
    },
    [
      "Use rwnd and cwnd interchangeably.",
      "Say slow start is 'slow' in absolute speed; it can increase aggressively.",
      "Assume packet loss always means the physical cable is broken.",
    ],
    [
      { question: "Who controls rwnd?", answer: "The receiver, based on available receive buffer capacity." },
      { question: "Who controls cwnd?", answer: "The sender's congestion-control algorithm, using network feedback." },
      { question: "Why is min(rwnd, cwnd) useful?", answer: "It reminds you that either the receiver or the network can be the current bottleneck." },
    ],
    "Tell two stories: a fast network with a slow receiver and a fast receiver behind a congested link. Explain which window limits each story.",
    "This topic is frequently tested conceptually because it distinguishes host capacity from network capacity.",
    ["udp-quic", "tcp-packet-analysis", "dns"]
  ),
  L(
    "udp-quic",
    "UDP & QUIC: Why HTTP/3 Uses QUIC",
    "quic",
    "UDP provides minimal datagram transport: it adds ports and a checksum but does not establish a reliable ordered byte stream. QUIC builds richer transport behavior in user space on top of UDP, including encrypted transport, streams, connection migration and modern loss/congestion mechanisms. HTTP/3 maps HTTP semantics onto QUIC streams.",
    "UDP is a blank road. QUIC builds a modern transport system on top of that road instead of modifying the traditional TCP stack.",
    [
      { title: "What UDP does", body: "UDP is connectionless and message-oriented. Applications choose whether and how to handle reliability, ordering, retransmission and pacing." },
      { title: "What QUIC adds", body: "QUIC provides reliable streams, TLS 1.3 integration, congestion control, connection IDs and independent stream delivery on top of UDP datagrams." },
      { title: "Why independent streams matter", body: "Loss on one QUIC stream does not require unrelated streams to wait for the same TCP byte-stream order. This reduces a transport-level source of head-of-line blocking." },
    ],
    [
      { label: "UDP", detail: "Minimal datagram service between endpoints." },
      { label: "QUIC", detail: "Adds encrypted transport semantics and multiplexed streams." },
      { label: "HTTP/3", detail: "Maps HTTP requests/responses onto QUIC streams." },
      { label: "Loss", detail: "QUIC retransmits data at the stream/packet framing level rather than retransmitting a TCP byte stream." },
      { label: "Migration", detail: "Connection IDs help a QUIC connection survive some network-path changes." },
    ],
    {
      title: "Stack comparison",
      language: "text",
      code: "HTTP/1.1, HTTP/2 → TCP → IP\nHTTP/3            → QUIC → UDP → IP\n\nQUIC = streams + TLS 1.3 + congestion control + connection IDs",
      explanation: "The point is not 'UDP is faster'. UDP is merely the substrate; QUIC supplies the sophisticated transport behavior that HTTP/3 needs.",
    },
    [
      "Say HTTP/3 is simply HTTP/2 over UDP.",
      "Say UDP itself provides retransmission and congestion control.",
      "Claim QUIC eliminates every form of head-of-line blocking.",
    ],
    [
      { question: "Why use UDP under QUIC?", answer: "UDP provides a broadly deployable datagram substrate while allowing QUIC to implement its transport features in user space." },
      { question: "What is a QUIC stream?", answer: "An independently managed ordered byte sequence within a QUIC connection, allowing multiple transfers to progress concurrently." },
      { question: "Does QUIC remove all ordering?", answer: "No. Each stream is ordered; the important difference is that unrelated streams do not share one global byte sequence." },
    ],
    "Explain why HTTP/3 is not 'HTTP without reliability'. Reliability still exists; it is implemented by QUIC at a different architectural layer.",
    "Expect comparison questions among TCP, UDP, QUIC and HTTP versions.",
    ["http-versions", "tcp-packet-analysis", "dns"]
  ),
  L(
    "tcp-packet-analysis",
    "Analyze a TCP Stream in a Packet Capture",
    "tcp-capture",
    "Packet capture turns TCP from a textbook into observable state. A good analysis tracks the five-tuple, handshake, sequence/acknowledgement numbers, window advertisements, retransmissions, round-trip timing and connection teardown. The goal is to reconstruct the story the endpoints are telling each other.",
    "Treat the capture like a security camera recording a conversation. Do not stare at packets independently; reconstruct the timeline and infer state transitions.",
    [
      { title: "Start with identity", body: "Filter on the TCP flow's source/destination IPs and ports. The five-tuple identifies a flow sufficiently for most capture analysis." },
      { title: "Read sequence and ACK progression", body: "Check whether sequence numbers advance as expected and whether acknowledgements progress. Duplicate ACKs, retransmissions and gaps often reveal loss." },
      { title: "Separate transport and application symptoms", body: "A slow HTTP response could be server processing, DNS, TCP retransmission, TLS negotiation or congestion. Capture evidence helps isolate the phase." },
    ],
    [
      { label: "Filter", detail: "Find one TCP conversation using a five-tuple filter." },
      { label: "Handshake", detail: "Confirm SYN, SYN-ACK, ACK and option negotiation." },
      { label: "Data", detail: "Track sequence and acknowledgement progression." },
      { label: "Loss", detail: "Look for retransmissions, duplicate ACKs or timing gaps." },
      { label: "Close", detail: "Inspect FIN/ACK or RST behavior and relate it to application completion." },
    ],
    {
      title: "Useful Wireshark display filters",
      language: "text",
      code: "tcp.stream == 0\ntcp.flags.syn == 1\ntcp.analysis.retransmission\ntcp.analysis.duplicate_ack\ntcp.port == 443",
      explanation: "Start narrow. One stream tells a coherent story; the full capture contains too many unrelated conversations for fast reasoning.",
    },
    [
      "Inspect a random packet without identifying its flow.",
      "Call every duplicate ACK a server error.",
      "Assume a retransmission proves a physical cable failure.",
    ],
    [
      { question: "What is a five-tuple?", answer: "Protocol plus source IP, source port, destination IP and destination port, commonly used to identify a transport flow." },
      { question: "What does a retransmission mean?", answer: "The sender sent data again because delivery was not considered successfully acknowledged within the transport's reliability logic. The root cause still needs investigation." },
      { question: "Why filter to one tcp.stream?", answer: "It converts a noisy packet capture into a single ordered conversation that is much easier to interpret." },
    ],
    "Open one capture and narrate only five events: handshake, first application bytes, ACK movement, one anomaly, closure. Ignore everything else.",
    "Wireshark questions often test interpretation rather than memorization: identify the phase and infer the likely symptom from packet timing and flags.",
    ["dns", "http-versions", "wireshark"]
  ),
  L(
    "dns",
    "DNS End-to-End: Resolver → Root → TLD → Authoritative",
    "dns",
    "DNS turns human-readable names into resource records. A client typically asks a recursive resolver, and that resolver uses cached data or follows the DNS hierarchy: root servers point toward the appropriate TLD servers, which point toward authoritative servers for the domain. The final answer is cached according to TTL.",
    "Think of a chain of increasingly specialized librarians. The first librarian either knows the answer or asks the next librarian, keeping a copy so future students do not repeat the whole search.",
    [
      { title: "Recursive vs authoritative", body: "A recursive resolver performs the work of finding an answer on behalf of the client. An authoritative server stores zone data and answers authoritatively for domains it serves." },
      { title: "Records are typed", body: "A records map names to IPv4 addresses, AAAA records to IPv6 addresses, CNAME introduces an alias, MX points to mail exchangers, and TXT carries arbitrary text used for several policy and verification purposes." },
      { title: "Caching is central", body: "Resolvers cache answers for their TTL. This reduces load and latency but means changes do not necessarily appear everywhere instantly." },
    ],
    [
      { label: "Client", detail: "Ask the configured resolver for a record." },
      { label: "Cache", detail: "Resolver checks its own cached answer first." },
      { label: "Root", detail: "If needed, discover which TLD servers know about the domain." },
      { label: "TLD", detail: "Discover the authoritative server for the domain." },
      { label: "Authoritative", detail: "Return the zone's record; resolver caches and returns it to the client." },
    ],
    {
      title: "Inspect DNS",
      language: "bash",
      code: "dig example.com A\ndig example.com AAAA\ndig example.com MX\ndig +trace example.com",
      explanation: "The normal query shows what your resolver returns. +trace illustrates the hierarchy by following referrals more directly.",
    },
    [
      "Say root DNS knows the IP for every website.",
      "Call the authoritative server a cache.",
      "Assume DNS always uses UDP; TCP and other transports are also used in real DNS operations.",
    ],
    [
      { question: "What is recursive resolution?", answer: "The resolver performs the sequence of queries needed to obtain the final answer on behalf of the client." },
      { question: "Why does TTL matter?", answer: "It controls how long a cached answer may be reused before the resolver should refresh it." },
      { question: "What is authoritative about an answer?", answer: "It originates from the zone's authoritative servers rather than from an intermediate cache." },
    ],
    "Explain DNS without saying 'phone book'. Describe exactly who asks whom and where caching happens.",
    "Expect record-type questions, recursive vs iterative resolution, DNS caching, hierarchy and troubleshooting scenarios.",
    ["dns-journey", "http-versions", "devtools"]
  ),
  L(
    "dns-journey",
    "DNS Lookup Journey: See the Referral Chain",
    "dns-journey",
    "The resolver's journey is a perfect example of hierarchical systems. A resolver does not need to memorize every domain. It starts with a small set of root hints, follows referrals toward the correct TLD, then asks the authoritative server that controls the zone.",
    "Think of a university directory: central administration points to the college, the college points to the department, and the department knows the individual office.",
    [
      { title: "Referrals are not final answers", body: "A root or TLD server typically tells the resolver where to ask next. The resolver then continues until an authoritative answer is obtained or an error is established." },
      { title: "Caching short-circuits the trip", body: "A recursive resolver may already know the TLD delegation, nameserver address, or final record. Each cached piece can eliminate one or more network exchanges." },
      { title: "Negative answers are cached too", body: "Resolvers can cache information that a name or record does not exist, subject to DNS rules and TTL/negative caching policies. This matters when debugging recent DNS changes." },
    ],
    [
      { label: "Root", detail: "Here is the referral to the .com TLD infrastructure." },
      { label: "TLD", detail: "Here are the authoritative name servers for example.com." },
      { label: "Authoritative", detail: "Here is the A/AAAA/CNAME answer for www." },
      { label: "Resolver", detail: "Cache the result according to TTL." },
      { label: "Client", detail: "Receive the final usable record." },
    ],
    {
      title: "Trace artifact",
      language: "text",
      code: "client → recursive resolver\nresolver → root → referral\nresolver → .com → referral\nresolver → authoritative → answer\nresolver → client → cached result",
      explanation: "The important artifact is the dependency chain. If one stage is broken, the next stage may never be queried.",
    },
    [
      "Treat root servers as the authoritative database for every domain.",
      "Ignore resolver caching when diagnosing 'works here but not there'.",
      "Conflate a referral with the final record value.",
    ],
    [
      { question: "Why is DNS scalable?", answer: "It delegates responsibility across a hierarchy and uses aggressive caching, so no single server must store or answer for every name." },
      { question: "Why might two users see different answers temporarily?", answer: "Resolvers may have different cached records, clients may use different resolvers, or authoritative infrastructure may intentionally vary responses." },
      { question: "What is the purpose of a referral?", answer: "To tell the resolver which servers are responsible for the next level of the name hierarchy." },
    ],
    "Draw the resolver path from a blank page. Only reveal the labels after you can reproduce root → TLD → authoritative from memory.",
    "Useful for explaining DNS delegation, hierarchy, caching and distributed naming systems in interviews and exams.",
    ["http-versions", "tls", "devtools"]
  ),
  L(
    "http-versions",
    "HTTP/1.1 vs HTTP/2 vs HTTP/3: Same Semantics, Different Transport",
    "http",
    "HTTP semantics evolve more slowly than HTTP transport behavior. HTTP/1.1 uses textual messages and traditionally relies on one request/response stream per TCP connection at a time unless multiple connections are used. HTTP/2 introduces binary framing, multiplexed streams, HPACK header compression and prioritization features. HTTP/3 maps HTTP semantics onto QUIC streams.",
    "Imagine one restaurant with a single waiter, then one waiter carrying several numbered trays, then several delivery channels that do not block each other behind one missing tray.",
    [
      { title: "HTTP/1.1", body: "Keep-alive reduces connection setup overhead, but request serialization and multiple connections create limits. Pipelining existed but was rarely used successfully in browsers." },
      { title: "HTTP/2", body: "Frames from multiple streams can share one TCP connection. This improves utilization but the underlying TCP byte stream can still introduce transport-level head-of-line blocking when packets are lost." },
      { title: "HTTP/3", body: "HTTP frames travel over QUIC streams. Loss affecting one stream does not force unrelated streams to wait for the same ordered TCP byte sequence." },
    ],
    [
      { label: "HTTP/1.1", detail: "Text messages over a TCP byte stream; parallelism often uses several connections." },
      { label: "HTTP/2", detail: "Binary frames multiplex many logical streams over one TCP connection." },
      { label: "HTTP/3", detail: "HTTP semantics over QUIC streams carried in UDP datagrams." },
      { label: "Shared", detail: "Methods, status codes, headers and resource semantics remain recognizably HTTP." },
      { label: "Result", detail: "New versions mostly improve efficiency, multiplexing and transport behavior." },
    ],
    {
      title: "Protocol stack comparison",
      language: "text",
      code: "HTTP/1.1 → TCP → IP\nHTTP/2   → TCP → IP\nHTTP/3   → QUIC → UDP → IP",
      explanation: "The same web request can have radically different on-wire transport behavior depending on the negotiated protocol version.",
    },
    [
      "Say HTTP/2 is simply HTTP/1.1 with bigger packets.",
      "Say HTTP/3 removes TCP because TCP is obsolete.",
      "Claim multiplexing automatically eliminates every head-of-line problem.",
    ],
    [
      { question: "What did HTTP/2 primarily improve?", answer: "Efficient framing and multiplexing of many streams over one connection, plus header compression and other performance-oriented features." },
      { question: "Why can HTTP/2 still suffer head-of-line blocking?", answer: "All its streams share one ordered TCP byte stream; a lost packet can delay delivery of subsequent bytes." },
      { question: "What transport does HTTP/3 use?", answer: "QUIC over UDP." },
    ],
    "Build a three-column comparison from memory: connection model, multiplexing, transport, header compression and loss behavior.",
    "Exams frequently ask for concise differences among HTTP versions and why QUIC changes the transport story.",
    ["tls", "devtools", "webpage-journey"]
  ),
  L(
    "tls",
    "TLS Handshake, Certificates & the Chain of Trust",
    "tls",
    "TLS provides confidentiality, integrity and server authentication for HTTPS. A browser validates the server certificate chain, negotiates cryptographic parameters, and establishes symmetric traffic keys. TLS 1.3 reduces handshake complexity and removes several legacy algorithms, but the core idea remains: authenticate the peer and establish shared cryptographic secrets safely.",
    "Think of entering a secure office. First you inspect the identity badge and the authority that issued it. Then you establish a private communication channel that outsiders can observe but cannot read or modify successfully.",
    [
      { title: "Certificates", body: "A certificate binds a domain name to a public key and is signed by a certificate authority chain trusted by the client. The certificate does not itself encrypt every HTTP byte." },
      { title: "Key exchange", body: "Modern TLS commonly uses ephemeral Diffie-Hellman mechanisms so both parties can derive shared secrets without sending the secret itself over the network." },
      { title: "Symmetric bulk encryption", body: "Once keys are established, symmetric cryptography efficiently protects application records. Integrity/authentication is part of modern authenticated encryption modes." },
    ],
    [
      { label: "ClientHello", detail: "Client proposes TLS version, cipher suites, extensions and key-share information." },
      { label: "Server", detail: "Server chooses parameters and sends its certificate plus key-share data." },
      { label: "Validate", detail: "Client verifies hostname, certificate signatures and validity constraints against trusted roots." },
      { label: "Key schedule", detail: "Both sides derive shared traffic secrets." },
      { label: "Encrypted HTTP", detail: "Application data travels inside authenticated encrypted records." },
    ],
    {
      title: "What the certificate means",
      language: "text",
      code: "example.com\n   ↓\ncertificate contains public key + identity claims\n   ↓ signed by\nintermediate CA\n   ↓ signed by\ntrusted root",
      explanation: "The chain-of-trust model lets a browser verify that the public key presented by the server is vouched for by a trusted authority hierarchy.",
    },
    [
      "Say HTTPS means the domain can never be impersonated by any means.",
      "Confuse certificates with symmetric session keys.",
      "Assume the root CA directly signs every website certificate.",
    ],
    [
      { question: "What does a certificate primarily bind?", answer: "A subject identity such as a domain name to a public key, with that binding authenticated by certificate signatures." },
      { question: "Why use asymmetric cryptography during setup and symmetric cryptography for traffic?", answer: "Asymmetric operations are useful for authentication and key agreement, while symmetric cryptography is much more efficient for bulk data." },
      { question: "What is hostname verification?", answer: "The client checks that the requested domain is represented correctly in the certificate's identity fields." },
    ],
    "Explain HTTPS to someone who thinks 'the lock icon is encryption'. Separate identity proof, key establishment, traffic encryption and certificate validation.",
    "Expect TLS handshake ordering, certificate-chain reasoning, authentication vs encryption, and TLS 1.3 concepts.",
    ["application-protocols", "devtools", "firewalls-vpn-proxies"]
  ),
  L(
    "application-protocols",
    "WebSockets, SMTP/IMAP & DHCP Essentials",
    "applications",
    "Not every application problem is HTTP. WebSockets provide long-lived bidirectional messaging after an HTTP-based opening handshake. SMTP moves mail between mail servers and submission clients, while IMAP lets clients access mailbox state. DHCP automatically configures hosts using a small discovery and response exchange, commonly remembered as DORA.",
    "Think of different city services: HTTP is a request counter, WebSocket is an open phone line, SMTP is a postal sorting system, IMAP is the mailbox viewer, and DHCP is the apartment front desk that gives you an address and basic directions.",
    [
      { title: "WebSockets", body: "After an HTTP Upgrade-style handshake, the connection becomes a bidirectional WebSocket channel with framed messages. It is useful for realtime updates, collaboration and interactive applications." },
      { title: "SMTP vs IMAP", body: "SMTP is primarily a message transfer/submission protocol. IMAP is primarily a mailbox access/synchronization protocol. A mail client commonly uses both roles for sending and reading mail." },
      { title: "DHCP DORA", body: "A new client commonly broadcasts Discover, receives Offer(s), sends Request and receives ACK. The exchange can be nuanced in real deployments, but DORA is the essential conceptual sequence." },
    ],
    [
      { label: "WebSocket", detail: "Handshake → protocol switch → persistent bidirectional frames." },
      { label: "SMTP", detail: "Client/server message submission or server/server transfer." },
      { label: "IMAP", detail: "Mailbox state, folders and message synchronization." },
      { label: "DHCP", detail: "Discover → Offer → Request → ACK." },
      { label: "Common theme", detail: "Each protocol exists because applications need a specific communication contract." },
    ],
    {
      title: "DHCP DORA",
      language: "text",
      code: "Client → broadcast DHCPDISCOVER\nServer → DHCPOFFER\nClient → DHCPREQUEST\nServer → DHCPACK",
      explanation: "DORA is easiest to remember when linked to the problem: the client initially lacks an address, so the first message cannot depend on ordinary unicast IP connectivity.",
    },
    [
      "Say IMAP sends mail between mail servers.",
      "Treat WebSockets as a replacement for TCP; WebSocket still uses a transport beneath it.",
      "Assume DHCP only gives an IP address and nothing else.",
    ],
    [
      { question: "Why use WebSockets?", answer: "To maintain a persistent bidirectional messaging channel suitable for realtime interaction." },
      { question: "What is the core difference between SMTP and IMAP?", answer: "SMTP handles message submission/transfer; IMAP handles mailbox access and synchronization." },
      { question: "Why does DHCP start with broadcast behavior?", answer: "A new client may not yet have an IP configuration, so discovery must work before normal unicast IP communication is established." },
    ],
    "Make a mini protocol zoo. For each protocol, answer: who starts, who responds, whether the interaction is long-lived, and what problem it solves.",
    "Common questions ask for protocol purpose, default transport, DORA order, and differences among realtime, mail and configuration protocols.",
    ["devtools", "dns", "network-toolkit"]
  ),
  L(
    "devtools",
    "Inspect Real Network Requests with Browser DevTools",
    "devtools",
    "Browser DevTools turns a webpage into an observable network system. The Network panel can reveal DNS/connection timing, request and response headers, cookies, payloads, status codes, cache hits, protocol versions and waterfall relationships. Expert debugging starts by asking a question and then selecting the smallest piece of evidence that can answer it.",
    "Think of DevTools as a flight recorder for the browser. Every request leaves a timeline entry; your job is to connect the entries into a story.",
    [
      { title: "Read the request line", body: "Method, URL, status, initiator and protocol already tell you a surprising amount. A 404, 301, 304 and 200 are fundamentally different debugging situations." },
      { title: "Use timing carefully", body: "The waterfall can separate queueing, DNS, connection setup, request sending, waiting/TTFB and download phases. A slow page is rarely explained by one number." },
      { title: "Inspect headers", body: "Cache-Control, ETag, cookies, content type, content encoding, server timing and security headers often reveal why a request behaves differently from expectation." },
    ],
    [
      { label: "Filter", detail: "Narrow to the resource type or URL you care about." },
      { label: "Headers", detail: "Read request/response metadata and caching decisions." },
      { label: "Timing", detail: "Identify DNS, connection, waiting and download costs." },
      { label: "Payload", detail: "Inspect JSON/form/request body when relevant." },
      { label: "Initiator", detail: "Find which script or document caused the request." },
    ],
    {
      title: "Evidence checklist",
      language: "text",
      code: "status → headers → protocol → timing → initiator → response\n\nAsk: is the problem DNS, connection, server, cache, payload, or browser code?",
      explanation: "The artifact is a debugging sequence. It prevents random clicking through tabs and keeps each step tied to a hypothesis.",
    },
    [
      "Open DevTools without first forming a question.",
      "Assume a fast TTFB guarantees a fast page; rendering and dependent requests can still dominate.",
      "Treat browser cache behavior as the same as CDN cache behavior.",
    ],
    [
      { question: "What does TTFB measure conceptually?", answer: "The time until the first response byte is received, incorporating relevant waiting and network/server phases. It is not a complete measure of page performance." },
      { question: "Why inspect the Initiator column?", answer: "It connects a network request to the document, script or other resource that caused it, which is essential for debugging request waterfalls." },
      { question: "What can a 304 tell you?", answer: "The browser performed conditional validation and the server indicated the cached representation remains valid rather than sending the full body again." },
    ],
    "Choose one slow request and explain its entire waterfall aloud. Then pick one fast request and explain why it is fast.",
    "Browser DevTools questions are increasingly practical: understand status codes, headers, caching and timing rather than memorizing the panel layout.",
    ["firewalls-vpn-proxies", "dns", "wireshark"]
  ),
  L(
    "firewalls-vpn-proxies",
    "Firewalls, VPNs & Proxies: What Each One Actually Filters",
    "security",
    "These three mechanisms are often lumped together because all can sit 'in the middle'. Their jobs differ. A firewall enforces traffic policy, a proxy relays application-level or other traffic on behalf of a client, and a VPN creates an encrypted tunnel between endpoints or networks. Understanding what information each can see is the key.",
    "A firewall is a security gate, a proxy is an intermediary receptionist, and a VPN is a private tunnel through a public building.",
    [
      { title: "Firewalls", body: "A firewall can filter using addresses, ports, protocols, state and application context depending on its design. Stateful firewalls track connection state so return traffic can be handled differently from unsolicited packets." },
      { title: "Proxies", body: "A forward proxy acts on behalf of clients. A reverse proxy acts on behalf of servers and can provide TLS termination, load balancing, routing, caching and access control." },
      { title: "VPNs", body: "A VPN encapsulates traffic inside a tunnel that provides confidentiality/integrity and a virtual network relationship. Encryption alone does not guarantee that every destination or endpoint is trustworthy." },
    ],
    [
      { label: "Firewall", detail: "Observe packet/flow attributes and apply allow/deny policy." },
      { label: "Forward proxy", detail: "Client sends traffic to an intermediary that makes the outbound request." },
      { label: "Reverse proxy", detail: "External clients reach an intermediary that selects an internal backend." },
      { label: "VPN", detail: "Endpoints encapsulate traffic through an encrypted tunnel." },
      { label: "Policy", detail: "Security still depends on identity, routing, endpoint controls and application authorization." },
    ],
    {
      title: "Choose by visibility",
      language: "text",
      code: "Firewall → addresses/ports/state/application context\nProxy   → relay at an application/protocol boundary\nVPN     → encrypted tunnel between tunnel endpoints",
      explanation: "The most useful question is not 'where is the box?' but 'which endpoint terminates the protocol and what metadata can it inspect?'",
    },
    [
      "Call every intermediary a proxy.",
      "Assume a VPN automatically makes every application secure.",
      "Assume a firewall can always see encrypted payload contents.",
    ],
    [
      { question: "What is a reverse proxy?", answer: "An intermediary that represents backend servers to clients and can terminate TLS, route requests, balance load and enforce policy." },
      { question: "What does a stateful firewall add?", answer: "It can make decisions based on connection state, not only isolated packets." },
      { question: "What does a VPN fundamentally provide?", answer: "A protected tunnel between tunnel endpoints, carrying encapsulated traffic over another network." },
    ],
    "Draw the same web request with no intermediary, a forward proxy, a reverse proxy and a VPN. Mark which component terminates which protocol.",
    "Expect role-comparison questions and scenarios asking which intermediary sees a port, HTTP path, client identity or encrypted payload.",
    ["network-attacks-defense", "troubleshooting", "network-toolkit"]
  ),
  L(
    "network-attacks-defense",
    "SYN Floods, DNS Spoofing & MITM: Understand the Defense View",
    "attacks",
    "Networking security makes more sense when the attack is explained as abuse of a legitimate protocol assumption. A SYN flood abuses connection-state allocation, DNS spoofing abuses trust in name-to-address answers, and man-in-the-middle attacks exploit a lack of authenticated channel endpoints. Defensive reasoning asks what evidence reveals the abuse and what control reduces the blast radius.",
    "Every attack here is a story about trust or finite resources: a server has limited connection state, a client trusts a name-resolution response, and two endpoints want to believe no one is silently relaying their conversation.",
    [
      { title: "SYN flood", body: "An attacker can send many SYNs without completing the handshake, consuming server-side half-open connection resources. Defenses include SYN cookies, rate limiting, adequate backlog tuning and upstream filtering." },
      { title: "DNS spoofing", body: "A forged or malicious DNS answer can redirect a client. Defensive layers include authenticated DNS mechanisms where applicable, secure resolver design, cache protection and TLS/HTTPS hostname validation." },
      { title: "MITM", body: "A man-in-the-middle positions itself between endpoints and relays or alters communication. Proper certificate validation and authenticated key exchange are designed to make silent interception detectable." },
    ],
    [
      { label: "Abuse", detail: "Exploit a protocol assumption or finite resource." },
      { label: "Signal", detail: "Observe abnormal state, packet rates, unexpected answers or certificate failures." },
      { label: "Contain", detail: "Rate-limit, filter, isolate, or use resource-protection mechanisms." },
      { label: "Authenticate", detail: "Use cryptographic identity checks to defeat silent endpoint substitution." },
      { label: "Recover", detail: "Rotate credentials, invalidate poisoned state and preserve forensic evidence." },
    ],
    {
      title: "Defensive matrix",
      language: "text",
      code: "SYN flood → protect connection state\nDNS spoof  → validate name resolution + TLS identity\nMITM       → authenticated key exchange + certificate checks",
      explanation: "Do not memorize attacks as isolated trivia. Match each attack to the protocol assumption or resource it abuses.",
    },
    [
      "Describe how to perform attacks operationally rather than focusing on the defense model.",
      "Assume TLS prevents all forms of endpoint compromise.",
      "Treat every DNS anomaly as proof of an attacker.",
    ],
    [
      { question: "Why are SYN floods effective?", answer: "They consume finite resources associated with incomplete connection establishment faster than legitimate clients need them." },
      { question: "Why does certificate validation help against MITM?", answer: "It provides an authenticated binding between the expected domain and the public key used for the secure channel." },
      { question: "Why can DNS security not rely on DNS alone?", answer: "The application still needs endpoint authentication and transport security to defend against broader redirection or interception threats." },
    ],
    "For each attack, complete the sentence: 'The protocol assumes X; the attacker abuses Y; the defense verifies or limits Z.'",
    "Exams usually focus on definitions, symptoms, defensive controls and protocol-level reasoning.",
    ["troubleshooting", "network-toolkit", "wireshark"]
  ),
  L(
    "troubleshooting",
    "Layer-by-Layer Network Troubleshooting Scenarios",
    "troubleshooting",
    "Troubleshooting is hypothesis testing. Start with the smallest claim that explains the symptom, choose a tool that can test that claim, interpret the evidence, and move to the next layer only when appropriate. The goal is to avoid changing five things at once and then forgetting which change fixed the problem.",
    "Treat debugging like a detective tree, not a checklist. Every command should answer one question.",
    [
      { title: "Bottom-up", body: "A common approach is physical/link → IP → routing → transport port → application/DNS. Bottom-up reduces the chance of debugging HTTP when the interface has no link." },
      { title: "Divide by observable evidence", body: "Ping a known reachable IP, inspect the local address, check the default route, test a specific port, resolve the name, then inspect the application. Each step narrows the failure domain." },
      { title: "Avoid false certainty", body: "One successful ping proves less than people think. ICMP may be filtered, a host may be reachable while the target application is not, or DNS may work while TLS/HTTP fails." },
    ],
    [
      { label: "L1/L2", detail: "Link state, interface, VLAN, ARP/neighbor state." },
      { label: "L3", detail: "Address, subnet, gateway, route and ICMP reachability." },
      { label: "L4", detail: "Port listening, firewall rules, handshake success." },
      { label: "L7", detail: "DNS, TLS, HTTP/application semantics." },
      { label: "Confirm", detail: "Reproduce after the smallest corrective action and document the evidence." },
    ],
    {
      title: "Decision tree",
      language: "text",
      code: "Link up? no → fix interface/cable/VLAN\nIP configured? no → DHCP/static config\nGateway reachable? no → L2/L3 path\nPort open? no → service/firewall\nName works? no → DNS\nHTTPS works? no → TLS/HTTP/application",
      explanation: "This is a reasoning scaffold. Real incidents may jump layers, but the tree stops you from guessing blindly.",
    },
    [
      "Run every command in a fixed order without considering the symptom.",
      "Treat ping success as proof that HTTPS must work.",
      "Make many configuration changes before reproducing the failure.",
    ],
    [
      { question: "Why is 'ping works but website does not' useful?", answer: "It suggests some lower-layer path is functioning, but it does not prove the target TCP port, TLS handshake, DNS or HTTP application path is healthy." },
      { question: "What makes a troubleshooting command good?", answer: "It tests a specific hypothesis with an interpretable result and minimal ambiguity." },
      { question: "Why change one thing at a time?", answer: "It preserves causal information so you know which change affected the failure." },
    ],
    "Give yourself a broken-site symptom and write five questions before running one command. Then choose the command with the most information value.",
    "Troubleshooting questions are often scenario-based rather than definition-based. Explain your diagnostic reasoning, not only the command.",
    ["network-toolkit", "wireshark", "devtools"]
  ),
  L(
    "network-toolkit",
    "Ping, Traceroute, dig, curl & netstat: The Core Network Toolkit",
    "toolkit",
    "A compact network toolkit becomes powerful when each command has a specific question attached to it. ping tests IP reachability with ICMP or implementation-specific probes; traceroute reveals hop behavior; dig queries DNS; curl exercises HTTP/TLS; ss or netstat exposes local socket state. Experts combine them rather than treating any single command as proof of everything.",
    "Think of each command as a medical instrument. A thermometer, pulse oximeter and X-ray answer different questions; one cannot replace the others.",
    [
      { title: "ping", body: "Useful for testing reachability and round-trip time, but ICMP filtering means failure is not definitive proof that the application is unreachable." },
      { title: "traceroute", body: "Traditional traceroute exploits TTL expiry and ICMP time-exceeded responses. Implementations vary, and some hops may not reveal themselves." },
      { title: "dig/curl/ss", body: "dig isolates DNS, curl exercises the application path, and ss/netstat reveals local listeners and connection state. Together they separate layers quickly." },
    ],
    [
      { label: "ping", detail: "Can the host exchange the selected probe with the destination?" },
      { label: "traceroute", detail: "What path evidence is visible toward the destination?" },
      { label: "dig", detail: "What does DNS return, from which resolver?" },
      { label: "curl", detail: "Can this host complete the HTTP/TLS interaction?" },
      { label: "ss", detail: "What sockets are listening or connected locally?" },
    ],
    {
      title: "Command set",
      language: "bash",
      code: "ping -c 4 1.1.1.1\ntraceroute example.com\ndig example.com\ncurl -vI https://example.com\nss -lntp",
      explanation: "Use the smallest set that isolates the failure. The '-v' curl output is especially useful because it exposes DNS, TCP and TLS stages in one client-visible transcript.",
    },
    [
      "Use ping as a universal health test.",
      "Assume every traceroute hop must answer.",
      "Read curl only as an HTTP tool and ignore its lower-level connection evidence.",
    ],
    [
      { question: "What does dig isolate?", answer: "DNS behavior and the resource-record answers returned by the selected resolver." },
      { question: "What does ss -lntp show on Linux?", answer: "Listening TCP sockets and associated process information, subject to permissions and platform differences." },
      { question: "Why is curl -v useful?", answer: "It exposes connection setup and protocol details while making a real application request." },
    ],
    "Pick one failing domain and explain what each command would prove or fail to prove. This prevents cargo-cult debugging.",
    "Memorize the purpose of the tool, not just the syntax. Practical questions often ask which command distinguishes two failure hypotheses.",
    ["wireshark", "devtools", "troubleshooting"]
  ),
  L(
    "wireshark",
    "Wireshark: Follow One Complete HTTP Conversation",
    "wireshark",
    "Wireshark is most useful when you turn a capture into a narrative: DNS lookup, connection setup, TLS if present, HTTP request, response, retransmissions, closure. Filtering and packet detail then become tools for answering specific questions instead of a wall of protocol fields.",
    "Imagine reading a security camera timeline with timestamps. You first identify the conversation, then zoom into suspicious moments. Do not inspect every pixel when one event is enough to explain the incident.",
    [
      { title: "Capture carefully", body: "Use a capture point where the traffic you need is actually visible. Modern HTTPS encrypts application payloads, so packet capture alone does not expose the HTTP text without appropriate session keys or endpoint instrumentation." },
      { title: "Follow the stream", body: "The 'Follow TCP Stream' view reconstructs a conversation's payload order, making it easier to see request/response boundaries when the payload is available." },
      { title: "Correlate layers", body: "A web request can be related to DNS, TCP, TLS and HTTP records. Use timestamps and stream identifiers to connect them rather than analyzing each protocol in isolation." },
    ],
    [
      { label: "DNS", detail: "Find which destination address was resolved." },
      { label: "TCP", detail: "Check handshake and transport state." },
      { label: "TLS", detail: "Inspect handshake metadata and certificate exchange, not plaintext application data." },
      { label: "HTTP", detail: "Inspect method/status/headers when the payload is visible." },
      { label: "Timing", detail: "Correlate delays with retransmissions, waiting periods and server responses." },
    ],
    {
      title: "Useful filters",
      language: "text",
      code: "dns\ntcp.stream == 0\ntls.handshake\nhttp\ntcp.analysis.retransmission\nframe.time_delta_displayed > 0.2",
      explanation: "Filters should narrow the evidence space. Start from a host, stream or protocol and then add anomaly filters.",
    },
    [
      "Assume HTTPS packet captures expose HTTP bodies in plaintext.",
      "Treat packet order in the capture file as application order without considering TCP streams.",
      "Interpret a long packet gap without correlating it to sequence numbers or retransmissions.",
    ],
    [
      { question: "Why is 'Follow TCP Stream' useful?", answer: "It groups packets belonging to one TCP conversation and reconstructs the payload ordering so the analyst can see the application exchange coherently." },
      { question: "Why might HTTP not be visible?", answer: "HTTPS encrypts HTTP application data inside TLS. You may need endpoint keys, decryption support, or server-side logs to inspect the plaintext." },
      { question: "What does a retransmission tell you?", answer: "TCP considered previous delivery insufficiently acknowledged and sent the data again; correlate timing and ACK behavior to understand the likely cause." },
    ],
    "Use a real capture and create a five-line incident timeline: name resolution, transport setup, first request, response, close. Then add any anomaly as a footnote.",
    "Practical networking exams and interviews increasingly reward packet-level interpretation and tool fluency.",
    ["osi-model", "tcp-packet-analysis", "devtools"]
  ),
].map((lesson) => [lesson.slug, lesson] as const));

export function getComputerNetworkLesson(slug: string): CNLesson | undefined {
  return COMPUTER_NETWORK_LESSONS[slug];
}

export const COMPUTER_NETWORK_LESSON_ORDER = Object.keys(COMPUTER_NETWORK_LESSONS);
