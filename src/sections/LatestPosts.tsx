import Reveal from '../components/ui/Reveal';
import Split from '../components/ui/Split';
import { POSTS } from '../data/blog';

/** Latest-posts strip on the home page. Posts come from src/data/blog.ts (generated with the static /blog/ pages). */
export default function LatestPosts() {
  if (!POSTS.length) return null;
  return (
    <section id="blog"><div className="wrap">
      <Reveal as="span" className="eyebrow">From the Blog</Reveal>
      <Split text="Guides for *Founders*" />
      <div className="posts">{POSTS.slice(0, 3).map(p => (
        <Reveal className="post" key={p.slug}><a href={`/blog/${p.slug}/`}>
          <small>{p.dateLabel} · {p.readMins} min read</small><h3>{p.title}</h3><p>{p.description}</p><span>Read the guide →</span>
        </a></Reveal>))}</div>
      <a className="btn" href="/blog/">All articles</a>
    </div></section>
  );
}
