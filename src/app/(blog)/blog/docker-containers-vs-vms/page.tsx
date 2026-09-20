/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/article-shell";
import { buildArticleMetadata, getArticle } from "@/lib/articles";

const article = getArticle("docker-containers-vs-vms")!;
export const metadata: Metadata = buildArticleMetadata(article);

export default function DockerVsVmPage() {
  return (
    <ArticleShell article={article}>
      <p>
        Containers and virtual machines both isolate workloads, but they do it at
        different layers. A virtual machine virtualizes hardware and runs a complete
        guest operating system. A container usually shares the host kernel while isolating
        processes, filesystems, networking, and resource limits.
      </p>

      <h2>What a virtual machine contains</h2>
      <p>
        A VM includes a guest operating system, its libraries, and the application. A
        hypervisor provides virtual hardware so multiple guest systems can share one
        physical host. This creates a strong boundary and lets different operating
        systems run on the same machine.
      </p>

      <h2>What a container contains</h2>
      <p>
        A container packages an application's filesystem and dependencies, but the
        processes ultimately use the host kernel. Linux namespaces provide isolation,
        while control groups help manage resources such as CPU and memory.
      </p>

      <h2>Why containers start quickly</h2>
      <p>
        Starting a container typically means creating isolated processes rather than
        booting another operating system. That makes containers attractive for web
        services, CI pipelines, local development, and platforms that need to schedule
        many short-lived workloads.
      </p>

      <h2>Containers are not tiny VMs</h2>
      <p>
        This distinction matters operationally. Containers share the host kernel, so
        kernel compatibility and hardening matter. Isolation is strong enough for many
        workloads, but the security boundary is different from a full virtual machine.
      </p>

      <h2>A practical comparison</h2>
      <div className="overflow-x-auto">
        <table>
          <thead><tr><th>Aspect</th><th>Container</th><th>Virtual machine</th></tr></thead>
          <tbody>
            <tr><td>Kernel</td><td>Usually shared with host</td><td>Guest kernel</td></tr>
            <tr><td>Startup</td><td>Usually very fast</td><td>Usually slower</td></tr>
            <tr><td>Image size</td><td>Often smaller</td><td>Often larger</td></tr>
            <tr><td>Isolation model</td><td>Process/kernel isolation</td><td>Hardware virtualization boundary</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Where Docker fits</h2>
      <p>
        Docker provides tooling and conventions for building images, running containers,
        networking them, mounting storage, and moving workloads between environments.
        Docker is not the same thing as containers themselves; it is a platform built
        around container technologies.
      </p>

      <h2>Why this matters for deployment</h2>
      <p>
        A container image can make an application's runtime more reproducible. The
        same image can be tested in CI and deployed to staging or production with fewer
        environment differences. That reduces an entire class of “works on my machine”
        problems, though operational configuration still matters.
      </p>

      <h2>When a VM is still a natural choice</h2>
      <p>
        VMs are useful when you need a different operating system, a stronger isolation
        boundary, legacy software, or workloads that benefit from a full guest environment.
        Cloud platforms also commonly use VMs under the services that run containers.
      </p>

      <h2>Keep the mental model simple</h2>
      <p>
        A VM virtualizes a machine. A container isolates a process environment. Modern
        infrastructure frequently uses both together rather than treating them as
        competing technologies.
      </p>

      <p>
        For the next step, connect deployment with the network stack using our
        <Link href="/blog/http1-http2-http3" className="underline ml-1">
          HTTP protocol guide
        </Link>
        and distributed architecture guide.
      </p>
    </ArticleShell>
  );
}
