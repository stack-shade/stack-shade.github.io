import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/article-shell";
import { buildArticleMetadata, getArticle } from "@/lib/articles";

const article = getArticle("git-internals-explained")!;
export const metadata: Metadata = buildArticleMetadata(article);

export default function GitInternalsPage() {
  return (
    <ArticleShell article={article}>
      <p>
        Git becomes much easier to use when you stop thinking about it as a folder full
        of version numbers and start thinking about it as a content-addressed object
        database. Commits, trees, and blobs describe project state, while refs such as
        branches and tags give humans convenient names for important commits.
      </p>

      <h2>Blobs store file content</h2>
      <p>
        A blob is Git's basic object for file contents. It does not need to know whether
        the file is called <code>app.tsx</code> or <code>README.md</code>; the directory
        structure lives in tree objects. Content is addressed by a hash, which lets Git
        identify identical objects efficiently.
      </p>

      <h2>Trees describe directories</h2>
      <p>
        A tree records entries such as filenames, modes, and the object IDs they point to.
        A repository snapshot is therefore assembled from trees and blobs rather than
        duplicated as a complete folder for every commit.
      </p>

      <h2>Commits connect snapshots</h2>
      <p>
        A commit points to a root tree and includes metadata such as the author, committer,
        message, and parent commit(s). A normal commit has one parent; a merge commit can
        have multiple parents.
      </p>

      <h2>Branches are names, not copies</h2>
      <p>
        A branch is essentially a movable reference to a commit. Creating a branch does
        not copy every file. It creates a lightweight name pointing at a commit, and a
        new commit moves the branch reference forward.
      </p>

      <h2>HEAD explains “where am I?”</h2>
      <p>
        <code>HEAD</code> identifies the currently checked-out reference or commit. When
        you switch branches, Git updates the working tree to match that branch. A
        detached HEAD simply means HEAD points directly to a commit rather than to a
        branch name.
      </p>

      <h2>Useful plumbing commands</h2>
      <pre className="overflow-x-auto rounded-xl border border-border bg-muted/20 p-4 text-sm"><code>{`git cat-file -p HEAD
git rev-parse HEAD
git ls-tree HEAD
git log --oneline --graph --decorate --all`}</code></pre>

      <p>
        These commands are useful because they expose the structures behind familiar
        porcelain commands. Once you understand them, operations like reset, revert,
        rebase, and merge become easier to reason about.
      </p>

      <h2>Reset vs revert</h2>
      <p>
        Reset moves a reference and can change the visible history of a branch. Revert
        creates a new commit that reverses an earlier change. The distinction matters
        when working with shared branches because public history usually should not be
        rewritten casually.
      </p>

      <h2>Why this design is powerful</h2>
      <p>
        Git's object model makes branching cheap, enables deduplication, and provides a
        strong relationship between history and content. You can inspect exactly which
        tree a commit points to and which objects make up that tree.
      </p>

      <p>
        For a broader software engineering workflow, explore our
        <Link href="/courses/devops-git" className="underline ml-1">
          DevOps & Git course
        </Link>
        and the deployment foundations in our
        <Link href="/blog/docker-containers-vs-vms" className="underline ml-1">
          containers guide
        </Link>.
      </p>
    </ArticleShell>
  );
}
