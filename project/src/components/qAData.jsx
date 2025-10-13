const qaData = [
  // ----------------- Computer Networks -----------------
  {
    keywords:["Hi","hey","hello","gpt","hi gpt","hello gpt","hi chatbot","hey chatbot","hello chatbot","hi"],
    answer:["Hi!Do you want to know about anything related to the subjects"]
  },
  {
    keywords:["Yes","yeah","yup","sure","ok","okay","fine","alright","ofcourse","definitely"," of course"],
    answer:["Great! Ask me anything related to your subjects."]
  },  
  {
    keywords:["No","nope","nah","not really","don't want","do not want","dont want","no i don't","no i do not","no i dont","Bye","goodbye","see you","see ya","talk later","later","exit","quit","stop"],
    answer:["Alright! Feel free to reach out if you have any study-related questions.Happy Studying!"]
  },
{
    keywords:["difference ","between","difference between","diff","b/w","diff b/w"],
    answer:"Here’s the difference between TCP and UDP as points:TCP(Transmission Control Protocol): Connection-oriented protocol (requires handshake).Reliable – guarantees delivery of data.Ensures packets are received in order. Provides error checking and recovery.  Slower due to extra overhead.  Used in web browsing (HTTP/HTTPS), email, file transfer, etc. UDP (User Datagram Protocol):  Connectionless protocol (no handshake). Unreliable – no guarantee of delivery. Packets may arrive out of order.Provides only error checking (no recovery). Faster and lightweight. Used in streaming, online gaming, VoIP, DNS,etc"
  },
  { keywords: ["protocol","tcp","udp"], answer: "🌐 TCP is reliable and connection-oriented, while UDP is faster but connectionless." },
  { keywords: ["osi", "layers"], answer: "📡 OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application." },
  { keywords: ["ip address", "ipv4", "ipv6"], answer: "🔢 IPv4 is 32-bit addressing, IPv6 is 128-bit with much larger address space." },
  { keywords: ["routing","router"], answer: "🛣 Routing finds the path between networks, switching forwards packets within a network." },
  { keywords: ["control plane", "switching","router"], answer: "The control plane is the part of a network (or system) responsible for managing and directing traffic flow. It makes decisions about how data packets should move through the network. Functions of the control plane include routing, signaling, network topology discovery, and maintaining forwarding tables. Unlike the data plane, which actually forwards the packets, the control plane decides the path they should take." },
  
   { keywords: ["data plane"], answer: "The data plane (also called forwarding plane) is the part of a network device responsible for forwarding actual user data packets from one interface to another, based on rules or forwarding tables built by the control plane. It works at high speed and handles packet switching, filtering, and traffic shaping. Unlike the control plane, it does not make routing decisions but simply executes them." },

  { keywords:["routing table"],
    answer:"A routing table is a data table stored in a router or networked computer that contains information about possible paths to different network destinations. It lists routes, their associated network addresses, and the next hop (or interface) to reach them. The control plane builds and maintains the routing table using routing protocols (like OSPF, BGP, RIP) or manual configuration, while the data plane uses it to forward packets.Example: A routing table entry may say that packets for 192.168.1.0/24 should be sent to the next-hop router at 10.0.0.1 via interface eth0."
  },
  {
    keywords:["forwarding"],
    answer:"Forwarding is the process of moving packets from an incoming interface to the appropriate outgoing interface within a network device (like a router or switch) based on the information in the routing or forwarding table. It operates in the data plane and happens at high speed, ensuring that packets reach their destination efficiently.✅ Example: When a router receives a packet destined for 192.168.1.10, it looks up the routing table, finds the next hop, and forwards the packet through the correct interface"
  },
  // ----------------- Database Management System -----------------
  { keywords: ["dbms", "normalization"], answer: "🗄 Normalization reduces redundancy. Forms: 1NF, 2NF, 3NF, BCNF." },
  { keywords: ["sql", "query"], answer: "💻 SQL is used to interact with databases. Example: SELECT * FROM students WHERE marks > 50;" },
  { keywords: ["acid", "transaction"], answer: "⚡ Transactions follow ACID: Atomicity, Consistency, Isolation, Durability." },
  { keywords: ["er diagram"], answer: "📊 ER Diagram represents entities, attributes, and relationships in DB design." },

  // ----------------- Advanced Data Structures -----------------
  { keywords: ["avl", "tree"], answer: "🌲 AVL Tree is a self-balancing BST with balance factor -1, 0, or +1." },
  { keywords: ["trie"], answer: "🔠 Trie is used for fast string searching, like autocomplete." },
  { keywords: ["graph", "dijkstra"], answer: "📈 Dijkstra’s algorithm finds the shortest path in a weighted graph." },
  { keywords: ["heap", "priority queue"], answer: "📦 Heaps implement priority queues efficiently (min-heap, max-heap)." },

  // ----------------- Machine Learning -----------------
  { keywords: ["machine learning", "ml"], answer: "🤖 ML is a branch of AI where machines learn patterns from data." },
  { keywords: ["supervised", "unsupervised"], answer: "📊 Supervised = labeled data (classification, regression). Unsupervised = unlabeled data (clustering)." },
  { keywords: ["overfitting"], answer: "⚠ Overfitting = model memorizes training data. Fix: regularization, dropout, more data." },
  { keywords: ["neural network"], answer: "🧠 ANN = layers of neurons that process inputs to outputs using activation functions." },

  // ----------------- Compiler Design -----------------
  { keywords: ["compiler phases"], answer: "⚙ Phases: Lexical Analysis → Syntax Analysis → Semantic Analysis → Intermediate Code → Optimization → Code Generation." },
  { keywords: ["lexical", "token"], answer: "🔡 Lexical analysis converts source code into tokens (keywords, identifiers, symbols)." },
  { keywords: ["parser"], answer: "📖 Parser checks grammar of the program based on CFG rules." },

  // ----------------- Distributed Systems -----------------
  { keywords: ["distributed system"], answer: "🌍 A Distributed System is a collection of independent computers appearing as a single system." },
  { keywords: ["concurrency", "synchronization"], answer: "⏱ Synchronization ensures proper coordination among concurrent processes." },
  { keywords: ["rpc"], answer: "📡 RPC = Remote Procedure Call, enables calling a procedure on another machine as if local." },

  // ----------------- NLP & Image Processing -----------------
  { keywords: ["nlp", "natural language"], answer: "🗣 NLP helps machines understand human language (translation, chatbots, sentiment analysis)." },
  { keywords: ["image processing"], answer: "🖼 Image processing = manipulating and analyzing images (filtering, edge detection, segmentation)." },
  { keywords: ["cnn", "convolution"], answer: "📷 CNNs are deep learning models specialized in image recognition tasks." },

  // ----------------- Internet of Things -----------------
  { keywords: ["iot", "internet of things"], answer: "🌐 IoT = network of physical devices connected to the internet, exchanging data (sensors, smart devices)." },
  { keywords: ["mqtt"], answer: "📡 MQTT is a lightweight messaging protocol for IoT communication." },
  { keywords: ["edge computing"], answer: "💡 Edge computing processes IoT data near the source rather than the cloud." },

  // ----------------- ETC (General Study / Miscellaneous) -----------------
  { keywords: ["exam", "study tips"], answer: "📚 Make a timetable, revise regularly, and practice previous year papers." },
  { keywords: ["project", "mini project"], answer: "💡 Choose projects that apply your subject knowledge, like ML classifiers or IoT monitoring systems." },
  { keywords: ["career", "jobs"], answer: "🚀 Career paths include Software Developer, Data Scientist, Network Engineer, Researcher." },
];

// ✅ Case-insensitive matching
export function findAnswer(question) {
  const q = question.toLowerCase();
  for (let item of qaData) {
    for (let key of item.keywords) {
      if (q.includes(key.toLowerCase())) {
        return item.answer;
      }
    }
  }
  return "🤔 Sorry, I don’t have an exact answer for that. Try rephrasing!";
}

export default qaData;