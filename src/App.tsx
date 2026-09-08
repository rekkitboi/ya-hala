import { useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowRight, Instagram, Linkedin, Menu, X } from 'lucide-react';

const images = {
  hero: 'https://images.pexels.com/photos/35890930/pexels-photo-35890930.jpeg?auto=compress&cs=tinysrgb&h=1600&w=2400',
  architecture: 'https://images.pexels.com/photos/36768849/pexels-photo-36768849.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800',
  culture: 'https://images.pexels.com/photos/36274653/pexels-photo-36274653.jpeg?auto=compress&cs=tinysrgb&h=1200&w=900',
  city: 'https://images.pexels.com/photos/35761/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=1200&w=1800',
};

const programs = [
  { eyebrow: 'Language', title: 'Modern Standard Arabic', text: 'Build a confident foundation for reading, conversation, and everyday connection.', image: images.culture },
  { eyebrow: 'Language', title: 'Saudi Dialect', text: 'Learn the expressions and rhythms that bring daily life in Saudi Arabia closer.', image: images.city },
  { eyebrow: 'Culture', title: 'Saudi Cultural Immersion', text: 'Go beyond the classroom through context, conversation, and lived experience.', image: images.architecture },
];

const navItems = [
  { label: 'About', path: '/about' },
  { label: 'Programs', path: '/programs' },
  { label: 'Culture', path: '/culture' },
];

function Logo({ light = false }: { light?: boolean }) {
  return <img className="brand-logo" src={light ? '/images/Download_Logo_04.png' : '/images/Download_dark-green_horizontal_logo.png'} alt="Ya Hala Academy — أكاديمية يا هلا" />;
}

function Button({ children, href = '/contact', variant = 'primary' }: { children: React.ReactNode; href?: string; variant?: 'primary' | 'secondary' }) {
  return <a className={`button button-${variant}`} href={href} data-route>{children}<ArrowRight size={16} strokeWidth={1.7} /></a>;
}

function ArrowUpRight() {
  return <ArrowRight size={20} strokeWidth={1.6} style={{ transform: 'rotate(-45deg)' }} />;
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`section-label ${light ? 'is-light' : ''}`}><span />{children}</div>;
}

function Header({ path }: { path: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [menuOpen]);
  useEffect(() => { const close = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false); window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, []);
  return <>
    <header className={`site-header ${scrolled || path !== '/' ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(item => <a key={item.path} href={item.path} className={path === item.path ? 'active' : ''} data-route>{item.label}</a>)}
        </nav>
        <a href="/" className="header-logo" data-route><Logo light={!scrolled && path === '/'} /></a>
        <div className="header-actions"><a className="language" href={path === '/ar' ? '/' : '/ar'} data-route>عربي</a><Button href="/contact">Start a conversation</Button><button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button></div>
      </div>
    </header>
    <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
      <div className="mobile-menu-top"><Logo light /><button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={24} /></button></div>
      <nav aria-label="Mobile navigation">{[...navItems, { label: 'Contact', path: '/contact' }].map((item, index) => <a key={item.path} href={item.path} data-route onClick={() => setMenuOpen(false)} style={{ '--i': index } as React.CSSProperties}>{item.label}<ArrowDownRight size={22} /></a>)}</nav>
      <div className="mobile-menu-bottom"><span>أكاديمية يا هلا</span><a href="/ar" data-route>العربية</a></div>
    </div>
  </>;
}

function Footer() {
  return <footer className="site-footer"><div className="footer-pattern" /><div className="container footer-grid"><div className="footer-brand"><Logo light /><p>A welcoming place to learn Arabic and encounter Saudi culture with depth, curiosity, and care.</p><span className="footer-arabic">أكاديمية يا هلا</span></div><div><span className="footer-heading">Explore</span><a href="/about" data-route>About Ya Hala</a><a href="/programs" data-route>Programs</a><a href="/culture" data-route>Culture</a></div><div><span className="footer-heading">Connect</span><a href="/contact" data-route>Start a conversation</a><a href="mailto:[Add contact email]">[Add contact email]</a><div className="socials"><a href="#" aria-label="Instagram"><Instagram size={17} /></a><a href="#" aria-label="LinkedIn"><Linkedin size={17} /></a></div></div></div><div className="container footer-bottom"><span>© 2026 Ya Hala Academy</span><span>Designed for welcome</span></div></footer>;
}

function Home() {
  const [language, setLanguage] = useState<'arabic' | 'transliteration' | 'english'>('arabic');
  const word = { arabic: 'يا هلا', transliteration: 'Ya hala', english: 'Welcome' }[language];
  return <main>
    <section className="hero"><img src={images.hero} alt="Historic architecture and a sunlit street in Al-Balad" /><div className="hero-overlay" /><div className="hero-pattern" /><div className="container hero-content"><SectionLabel light>Arabic language · Saudi culture</SectionLabel><h1>Come closer<br /><em>to Saudi.</em></h1><p>Learn the language. Read the context. Find your place in a culture that knows how to welcome.</p><div className="hero-actions"><Button href="/programs">Explore our programs</Button><a className="text-link light-link" href="#experience">Discover Ya Hala <ArrowDownRight size={17} /></a></div></div><div className="hero-scroll"><span>Scroll to explore</span><div /></div></section>
    <section className="intro section-pad"><div className="container intro-grid"><div><SectionLabel>Our point of view</SectionLabel><span className="display-arabic">أهلاً بك</span></div><div className="intro-copy"><h2>Language opens the door. <i>Welcome</i> invites you in.</h2><p>Ya Hala Academy brings Arabic language learning and Saudi cultural understanding together in one generous, grounded experience.</p><a className="text-link" href="/about" data-route>Meet Ya Hala <ArrowRight size={17} /></a></div></div></section>
    <section className="program-section section-pad"><div className="container"><div className="section-heading-row"><div><SectionLabel>Ways to begin</SectionLabel><h2>Learn with<br /><i>intention.</i></h2></div><p>Whether you are arriving for work, study, or a deeper cultural connection, your learning should meet you where you are.</p></div><div className="program-grid">{programs.map((program, index) => <a className={`program-card card-${index}`} href="/programs" data-route key={program.title}><div className="card-image"><img src={program.image} alt="" loading="lazy" /></div><div className="program-card-content"><span>{program.eyebrow}</span><h3>{program.title}</h3><p>{program.text}</p><ArrowUpRight /></div></a>)}</div></div></section>
    <section className="culture-feature" id="experience"><div className="container culture-grid"><div className="culture-image"><img src={images.architecture} alt="A geometric lattice window illuminated by warm light" loading="lazy" /><span className="image-caption">Learning lives in the details</span></div><div className="culture-copy"><SectionLabel>Beyond the classroom</SectionLabel><h2>Language as a <i>living</i> experience.</h2><p>Some words are best understood in a room, a market, a meal, or a moment shared. Our cultural experiences make space for that kind of learning.</p><a className="text-link" href="/culture" data-route>Explore cultural experiences <ArrowRight size={17} /></a><div className="word-discovery"><div className="word-display">{word}</div><div className="word-controls">{(['arabic', 'transliteration', 'english'] as const).map(item => <button key={item} className={language === item ? 'selected' : ''} onClick={() => setLanguage(item)}>{item === 'arabic' ? 'العربية' : item === 'transliteration' ? 'Transliteration' : 'English'}</button>)}</div></div></div></div></section>
    <section className="journey section-pad"><div className="container"><div className="journey-top"><SectionLabel>The Ya Hala way</SectionLabel><h2>A thoughtful beginning<br />to your <i>next chapter.</i></h2><p>Arrive curious. Leave connected.</p></div><div className="journey-line"><div className="journey-step"><b>01</b><span>Discover</span><p>Find the path that feels right for you.</p></div><div className="journey-step"><b>02</b><span>Learn</span><p>Build confidence through meaningful practice.</p></div><div className="journey-step"><b>03</b><span>Experience</span><p>Meet Saudi Arabia with fresh perspective.</p></div></div></div></section>
    <Cta />
  </main>;
}

function PageHero({ label, title, description, image }: { label: string; title: React.ReactNode; description: string; image: string }) {
  return <section className="page-hero"><img src={image} alt="" /><div className="page-hero-overlay" /><div className="container page-hero-content"><SectionLabel light>{label}</SectionLabel><h1>{title}</h1><p>{description}</p></div></section>;
}

function About() { return <main><PageHero label="About Ya Hala" title={<>A warm welcome<br /><i>to something deeper.</i></>} description="Ya Hala Academy is a place for language, culture, and the meaningful connections between them." image={images.hero} /><section className="about-story section-pad"><div className="container about-grid"><SectionLabel>Our approach</SectionLabel><div><h2>Study the words.<br /><i>Understand the world.</i></h2><p>We believe Arabic is not simply a subject to master. It is a way into the gestures, histories, humour, and hospitality that shape everyday life in Saudi Arabia.</p><p>Our approach is rigorous without being rigid, and welcoming without losing depth. Every experience begins with respect for the learner and the culture they are entering.</p></div></div></section><section className="about-image-band"><div className="container about-band-inner"><span className="display-arabic">يا هلا</span><p>“Ya hala” is an invitation: come in, you are welcome here.</p></div></section><section className="principles section-pad"><div className="container"><SectionLabel>What guides us</SectionLabel><div className="principles-grid"><div><span>01</span><h3>Hospitality</h3><p>Learning begins when people feel they belong.</p></div><div><span>02</span><h3>Context</h3><p>Language becomes alive when it is connected to place.</p></div><div><span>03</span><h3>Curiosity</h3><p>There is always more to notice, ask, and discover.</p></div></div></div></section><Cta /></main>; }

function Programs() { const [filter, setFilter] = useState('All'); const filters = ['All', 'Language', 'Culture']; const visible = useMemo(() => filter === 'All' ? programs : programs.filter(item => item.eyebrow === filter), [filter]); return <main><PageHero label="Programs" title={<>Find your way<br /><i>into Arabic.</i></>} description="Learning pathways designed for real life, real conversations, and a richer understanding of Saudi Arabia." image={images.culture} /><section className="programs-list section-pad"><div className="container"><div className="programs-intro"><SectionLabel>Explore the offering</SectionLabel><h2>Start where<br /><i>you are.</i></h2><div className="filter-row" aria-label="Program filters">{filters.map(item => <button key={item} onClick={() => setFilter(item)} className={filter === item ? 'selected' : ''}>{item}</button>)}</div></div><div className="program-list-grid">{visible.map((program, index) => <article className="program-list-card" key={program.title}><div className="list-card-number">0{index + 1}</div><img src={program.image} alt="" loading="lazy" /><div><SectionLabel>{program.eyebrow}</SectionLabel><h3>{program.title}</h3><p>{program.text}</p><a className="text-link" href="/contact" data-route>Enquire about this program <ArrowRight size={16} /></a></div></article>)}</div></div></section><Cta /></main>; }

function Culture() { return <main><PageHero label="Saudi culture" title={<>The places<br /><i>between words.</i></>} description="Culture is not a backdrop to learning. It is the landscape where understanding takes root." image={images.architecture} /><section className="culture-page-intro section-pad"><div className="container split-heading"><SectionLabel>Living context</SectionLabel><div><h2>See differently.<br /><i>Listen closely.</i></h2><p>Our cultural experiences are designed as invitations to notice more: the shape of a doorway, the cadence of a greeting, the story held in a shared table.</p></div></div></section><section className="culture-stories section-pad"><div className="container stories-grid"><article className="story-large"><img src={images.city} alt="Riyadh city lights at twilight" loading="lazy" /><div><SectionLabel light>Experience 01</SectionLabel><h3>Architecture<br /><i>as memory.</i></h3><p>Walk through the layers of a place and see how the past continues to shape the present.</p></div></article><article className="story-small"><img src={images.culture} alt="Person reading in a peaceful interior" loading="lazy" /><SectionLabel>Experience 02</SectionLabel><h3>Words shared<br /><i>over time.</i></h3><p>Conversation is where language starts to feel like your own.</p></article></div></section><Cta /></main>; }

function Contact() { const [sent, setSent] = useState(false); return <main><PageHero label="Start a conversation" title={<>Your next chapter<br /><i>starts here.</i></>} description="Tell us a little about what brings you to Arabic and Saudi culture." image={images.city} /><section className="contact-section section-pad"><div className="container contact-grid"><div><SectionLabel>Enquire</SectionLabel><h2>We would love<br /><i>to hear from you.</i></h2><p>Share a little about your goals and we will help you find the right place to begin.</p><div className="contact-note"><span>Prefer email?</span><a href="mailto:[Add contact email]">[Add contact email]</a></div></div>{sent ? <div className="form-success"><span className="success-mark">✓</span><h3>Thank you for reaching out.</h3><p>Your message has been noted. Connect a verified academy inbox to complete delivery.</p><a className="text-link" href="/">Return home <ArrowRight size={16} /></a></div> : <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>Full name<input required autoComplete="name" /></label><label>Email address<input required type="email" autoComplete="email" /></label><label>What brings you to Ya Hala?<select defaultValue=""><option value="" disabled>Select an option</option><option>Arabic language learning</option><option>Saudi cultural understanding</option><option>Professional or academic journey</option></select></label><label>Message<textarea required rows={4} /></label><button className="button button-primary" type="submit">Send enquiry <ArrowRight size={16} /></button></form>}</div></section></main>; }

function Cta() { return <section className="final-cta"><div className="cta-pattern" /><div className="container cta-inner"><SectionLabel light>أكاديمية يا هلا</SectionLabel><h2>There is always<br /><i>room to begin.</i></h2><Button href="/contact" variant="secondary">Start a conversation</Button></div></section>; }

function ArabicPage() { return <main className="arabic-page"><section className="arabic-hero"><div className="container"><Logo light /><span className="arabic-kicker">أكاديمية يا هلا</span><h1>أهلاً بك<br /><span>في يا هلا</span></h1><p>مساحة لتعلّم العربية وفهم الثقافة السعودية بعمق ودفء.</p><Button href="/">Return to English</Button></div></section></main>; }

function App() {
  const [path, setPath] = useState(window.location.pathname || '/');
  useEffect(() => { const onClick = (event: MouseEvent) => { const target = (event.target as HTMLElement).closest('a[data-route]') as HTMLAnchorElement | null; if (!target || target.origin !== window.location.origin) return; event.preventDefault(); window.history.pushState({}, '', target.pathname); setPath(target.pathname); window.scrollTo({ top: 0, behavior: 'smooth' }); }; const onPop = () => setPath(window.location.pathname || '/'); document.addEventListener('click', onClick); window.addEventListener('popstate', onPop); return () => { document.removeEventListener('click', onClick); window.removeEventListener('popstate', onPop); }; }, []);
  useEffect(() => { document.title = path === '/' ? 'Ya Hala Academy — Arabic & Saudi Culture' : `Ya Hala Academy — ${path.slice(1).replace('-', ' ')}`; document.documentElement.lang = path === '/ar' ? 'ar' : 'en'; document.documentElement.dir = path === '/ar' ? 'rtl' : 'ltr'; }, [path]);
  if (path === '/ar') return <ArabicPage />;
  const Page = path === '/about' ? About : path === '/programs' ? Programs : path === '/culture' ? Culture : path === '/contact' ? Contact : Home;
  return <><Header path={path} /><Page /><Footer /></>;
}

export default App;
