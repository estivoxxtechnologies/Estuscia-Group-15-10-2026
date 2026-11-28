// Build-time only (never shipped to the browser): renders the same page the browser renders, as static HTML.
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Layout } from './App';
import Loader from './components/layout/Loader';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const noop = () => {};
/** Initial state of the real app: loader on top, hero not yet revealed. Text is always in the HTML; hiding for the reveal only happens once JS adds <html class="js">. */
export const renderPage = () => renderToString(<Layout ready={false} reduce={false} active="hero" onNavigate={noop} loader={<Loader onDone={noop} />} />);
/** The real navbar + footer, for the static pages (privacy, terms, 404) so they always match the site. */
export const renderChrome = () => ({ nav: renderToStaticMarkup(<Navbar active="" onNavigate={noop} reduce />), footer: renderToStaticMarkup(<Footer reduce />) });
export { buildJsonLd, abs, ORIGIN, CLIENT } from './config/seo';
export { SITE } from './config/site';
export { POSTS } from './data/blog';
