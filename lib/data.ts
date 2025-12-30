import { Code2, Cpu, Globe, Sparkles } from "lucide-react"
import React from "react"

export interface ProjectSection {
  type: "text" | "code" | "image" | "callout"
  title?: string
  content: string
  language?: string
}

export interface Project {
  title: string
  description: string
  tags: string[]
  icon: React.ReactNode
  link: string
  slug: string
  featured?: boolean
  liveUrl?: string
  githubUrl?: string
  role?: string
  timeline?: string
  status?: string
  overview?: string
  challenge?: string
  solution?: string
  outcome?: string
  sections?: ProjectSection[] // Added sections for deep customization
}

export interface PostSection {
  type: "text" | "code" | "image" | "callout"
  title?: string
  content: string
  language?: string
}

export interface Post {
  title: string
  excerpt: string
  date: string
  category: string
  slug: string
  readingTime: string
  content?: string
  sections?: PostSection[] // Added sections for editorial flexibility
  published: boolean
  author?: string
}

export const PROJECTS: Project[] = [
  {
    title: "Distributed Compute Engine",
    slug: "compute-engine",
    description:
      "A high-throughput task orchestration system built for scale. Focuses on low-latency scheduling and fault-tolerant worker node management.",
    tags: ["Rust", "gRPC", "Kubernetes"],
    icon: React.createElement(Cpu, { className: "size-6" }),
    link: "/projects/compute-engine",
    featured: true,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    role: "Technical Lead & Systems Architect",
    timeline: "2024 - Present",
    status: "In Production",
    overview:
      "Designed and implemented a distributed compute engine capable of handling millions of concurrent tasks with sub-millisecond latency. The system leverages Rust for maximum performance and gRPC for efficient inter-service communication.",
    challenge:
      "Traditional task schedulers struggled to maintain low latency at scale. We needed a solution that could handle massive workloads while remaining resilient to network partitions and node failures.",
    solution:
      "Built a custom scheduler using consistent hashing for task distribution and implemented a gossip protocol for cluster state synchronization. Worker nodes use connection pooling and batch processing to maximize throughput.",
    outcome:
      "Achieved 99.99% uptime with an average task completion time of 150ms. The system now processes over 50 million tasks daily across 200+ worker nodes.",
    sections: [
      {
        type: "text",
        title: "Architecture Philosophy",
        content:
          "The core of the system is built on a custom gossip protocol that ensures eventual consistency across globally distributed nodes without the overhead of heavy consensus algorithms like Paxos.",
      },
      {
        type: "code",
        language: "rust",
        content: `// Node health check implementation
pub async fn check_node_health(node_id: Uuid) -> Result<HealthStatus, Error> {
    let metrics = fetch_metrics(node_id).await?;
    if metrics.cpu_usage > 0.9 || metrics.memory_usage > 0.85 {
        Ok(HealthStatus::Degraded)
    } else {
        Ok(HealthStatus::Healthy)
    }
}`,
      },
    ],
  },
  {
    title: "Visual Logic Framework",
    slug: "visual-logic",
    description:
      "Nodes-based editor for complex workflow automation. Built with high-performance canvas rendering and reactive state management.",
    tags: ["React", "WebGL", "TypeScript"],
    icon: React.createElement(Code2, { className: "size-6" }),
    link: "/projects/visual-logic",
    featured: true,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    role: "Lead Engineer",
    timeline: "2023 - 2024",
    status: "Open Source",
    overview:
      "Created a visual programming interface that allows users to build complex automations through an intuitive node-based editor. The framework uses WebGL for rendering thousands of nodes without performance degradation.",
    challenge:
      "Existing node editors couldn't handle the complexity required for enterprise workflows. We needed a solution that could render 10,000+ nodes while maintaining 60fps and providing real-time collaboration.",
    solution:
      "Implemented a custom WebGL renderer with spatial indexing for efficient viewport culling. Used Yjs CRDTs for conflict-free collaborative editing and a reactive graph engine for real-time execution.",
    outcome:
      "The framework is now used by over 5,000 teams to automate critical business processes. Users report 70% reduction in development time compared to traditional scripting approaches.",
  },
  {
    title: "Global Edge Runtime",
    slug: "edge-runtime",
    description:
      "Low-latency serverless execution across 100+ regions using isolation-based multi-tenancy and global traffic steering.",
    tags: ["Go", "Wasm", "Anycast"],
    icon: React.createElement(Globe, { className: "size-6" }),
    link: "/projects/edge-runtime",
    featured: true,
    liveUrl: "https://example.com",
    role: "Infrastructure Architect",
    timeline: "2023 - Present",
    status: "In Production",
    overview:
      "Architected a global serverless platform that executes user code at the edge with sub-10ms cold start times. The runtime uses WebAssembly for secure sandboxing and Anycast routing for intelligent request routing.",
    challenge:
      "Traditional serverless platforms have high cold start latency and regional availability constraints. We needed to provide instant execution anywhere in the world while maintaining strong security isolation.",
    solution:
      "Built a custom Wasm runtime in Go with per-request isolation and pre-warmed execution contexts. Deployed across 100+ edge locations with Anycast DNS for automatic routing to the nearest healthy node.",
    outcome:
      "Achieved average p50 latency of 8ms globally and p99 of 45ms. The platform now serves 2 billion requests per day with 99.99% availability.",
  },
  {
    title: "Neural Interface Kit",
    slug: "neural-interface",
    description:
      "Low-latency API for brain-computer interfacing. Built with rigorous signal processing and secure data isolation.",
    tags: ["C++", "Python", "E2EE"],
    icon: React.createElement(Sparkles, { className: "size-6" }),
    link: "/projects/neural-interface",
    featured: true,
    role: "Core Developer",
    timeline: "2025",
    status: "R&D",
  },
]

export const POSTS: Post[] = [
  {
    title: "The Mechanics of Global State Synchronization",
    excerpt: "Deep dive into CRDTs and eventual consistency in distributed systems.",
    date: "Dec 2025",
    category: "Distributed Systems",
    slug: "global-state-sync",
    readingTime: "12 min",
    published: true,
    author: "Your Name",
    content: `Modern distributed applications demand a level of synchronization that defies traditional ACID principles. When we talk about global state, we are navigating the complex intersection of latency, consistency, and availability.`,
    sections: [
      {
        type: "text",
        title: "Beyond Eventual Consistency",
        content:
          "Traditional databases often force a choice between consistency and availability. In the world of global edge computing, we introduce a third dimension: the observer's relative position in the network topology.",
      },
      {
        type: "callout",
        content:
          "CRDTs (Conflict-free Replicated Data Types) allow us to achieve high availability while guaranteeing that all replicas will eventually converge to the same state without central coordination.",
      },
      {
        type: "code",
        language: "javascript",
        content: `// Convergent Replicated Data Type example
const mergeStates = (local, remote) => {
  return {
    ...local,
    counter: Math.max(local.counter, remote.counter),
    lastUpdated: Math.max(local.lastUpdated, remote.lastUpdated)
  };
};`,
      },
    ],
  },
  {
    title: "Optimizing WebGL Renders for Low-End Devices",
    excerpt: "Strategies for achieving 60fps with complex geometry on mobile hardware.",
    date: "Nov 2025",
    category: "Graphics",
    slug: "webgl-optimization",
    readingTime: "8 min",
    published: true,
    author: "Your Name",
    content: `Performance on mobile is critical when rendering complex 3D scenes. In this article, we explore techniques to maintain fluid frame rates even on constrained hardware.`,
  },
  {
    title: "Architecture: The Visual Logic Framework",
    excerpt: "An editorial walkthrough of the design decisions behind my latest open-source tool.",
    date: "Oct 2025",
    category: "Architecture",
    slug: "visual-logic-architecture",
    readingTime: "15 min",
    published: true,
    author: "Your Name",
    content: `Building a node-based editor requires careful consideration of state management, rendering performance, and user experience. Here's how we approached it.`,
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug)
}

export function getPublishedPosts(): Post[] {
  return POSTS.filter((post) => post.published).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((project) => project.featured)
}
