import { useState, useEffect, useRef } from 'react';
import daxtaLogo from './imports/DAXTA_S.A.S-removebg-preview.png';

const NAV_ITEMS = [
  { id: 'inicio', label: 'Inicio', icon: '⊙' },
  { id: 'nosotros', label: 'Sobre Nosotros', icon: '◈' },
  { id: 'servicios', label: 'Servicios', icon: '◇' },
  { id: 'proceso', label: 'Cómo Funciona', icon: '◎' },
  { id: 'publico', label: 'Público Objetivo', icon: '◉' },
  { id: 'diferenciadores', label: 'Diferenciadores', icon: '◆' },
  { id: 'futuro', label: 'Visión Futura', icon: '◐' },
  { id: 'contacto', label: 'Contacto', icon: '◻' },
];

const SERVICES = [
  {
    icon: '📋',
    title: 'Encuestas y Formularios',
    desc: 'Diseñamos y aplicamos instrumentos de recolección de datos adaptados a la población juvenil de Tabio, garantizando respuestas representativas y confiables.',
  },
  {
    icon: '🔍',
    title: 'Análisis de Datos',
    desc: 'Procesamos, limpiamos y analizamos la información recolectada para identificar patrones, tendencias y necesidades relevantes dentro de la comunidad.',
  },
  {
    icon: '📊',
    title: 'Visualización e Informes',
    desc: 'Transformamos los datos en gráficos, tablas, estadísticas y dashboards interactivos que facilitan la comprensión y comunicación de resultados.',
  },
  {
    icon: '🎯',
    title: 'Estudios de Comunidad',
    desc: 'Elaboramos estudios completos sobre comportamientos, intereses y opiniones de los jóvenes para apoyar la toma de decisiones estratégicas.',
  },
  {
    icon: '🏫',
    title: 'Consultoría Educativa',
    desc: 'Asesoramos a instituciones educativas con información precisa para mejorar programas académicos y extracurriculares orientados a jóvenes.',
  },
  {
    icon: '🤝',
    title: 'Apoyo a Proyectos Sociales',
    desc: 'Proveemos datos confiables para entidades públicas y organizaciones que desarrollen iniciativas en beneficio de la juventud cundinamarquesa.',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Recolección', desc: 'Aplicamos encuestas y formularios dirigidos a jóvenes de 12 a 20 años en Tabio, con total respeto a su privacidad y autonomía.' },
  { num: '02', title: 'Organización', desc: 'Estructuramos los datos recolectados en bases de datos limpias, ordenadas y listas para el análisis.' },
  { num: '03', title: 'Análisis', desc: 'Aplicamos técnicas de análisis estadístico para encontrar patrones, correlaciones y tendencias significativas.' },
  { num: '04', title: 'Presentación', desc: 'Entregamos informes claros, gráficos dinámicos y dashboards personalizados según las necesidades del cliente.' },
];

const AUDIENCE = [
  { icon: '🏪', title: 'Empresas Locales', desc: 'Que buscan entender el mercado juvenil de Tabio para crear productos y servicios relevantes.' },
  { icon: '🏫', title: 'Instituciones Educativas', desc: 'Colegios y universidades que quieren mejorar sus programas con base en las necesidades reales de los estudiantes.' },
  { icon: '🏛️', title: 'Entidades Públicas', desc: 'Alcaldías, secretarías e instituciones gubernamentales que desarrollan políticas para la juventud.' },
  { icon: '💡', title: 'Emprendedores', desc: 'Personas con ideas de negocio que necesitan validar su propuesta con datos del mercado local.' },
];

const DIFFERENTIATORS = [
  { title: 'Enfoque Local', desc: 'Conocemos profundamente el contexto social y cultural de Tabio, Cundinamarca, lo que nos permite recolectar datos más precisos y relevantes.' },
  { title: 'Ética en Datos', desc: 'La privacidad de los participantes es nuestra prioridad. Operamos bajo principios estrictos de manejo responsable de información personal.' },
  { title: 'Resultados Accionables', desc: 'No solo entregamos datos, sino insights concretos que permiten a nuestros clientes tomar decisiones mejor fundamentadas.' },
  { title: 'Población Especializada', desc: 'Nos especializamos en el segmento juvenil (12-20 años), un grupo estratégico frecuentemente subestimado en los análisis de datos regionales.' },
];

type FormData = {
  nombre: string;
  email: string;
  organizacion: string;
  telefono: string;
  interes: string;
  mensaje: string;
};

const INITIAL_FORM: FormData = {
  nombre: '',
  email: '',
  organizacion: '',
  telefono: '',
  interes: '',
  mensaje: '',
};

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; show: boolean }>({ msg: '', show: false });
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -80px 0px' }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const showToast = (msg: string) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 4000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    if (isMobile) setSidebarOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.mensaje) {
      showToast('Por favor completa los campos requeridos.');
      return;
    }
    setSubmitting(true);

    // Save to localStorage as clientes_potenciales
    const existing = JSON.parse(localStorage.getItem('clientes_potenciales') || '[]');
    const record = { ...form, fecha: new Date().toISOString(), id: Date.now() };
    existing.push(record);
    localStorage.setItem('clientes_potenciales', JSON.stringify(existing));

    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setForm(INITIAL_FORM);
    showToast('¡Mensaje enviado! Te contactaremos pronto.');
  };

  const sidebarVisible = isMobile ? sidebarOpen : sidebarOpen;

  return (
    <>
      {/* Sidebar */}
      <nav className={`sidebar ${isMobile ? (sidebarOpen ? 'open' : '') : sidebarOpen ? '' : 'collapsed'}`}>
        {/* Logo */}
        <div style={{ padding: '28px 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <img src={daxtaLogo} alt="Daxta logo" style={{ width: 80, height: 80, objectFit: 'contain', flexShrink: 0 }} />
            <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: '#fdfdfd', letterSpacing: '-0.01em' }}>
              Daxta
            </span>
          </div>
          <p style={{ fontSize: 11, color: 'rgba(253,253,253,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'DM Mono, monospace', marginLeft: 46 }}>
            Data & Analytics
          </p>
        </div>

        <div style={{ width: '100%', height: 1, background: 'rgba(72,207,174,0.15)', margin: '0 0 12px' }} />

        {/* Nav links */}
        <div style={{ flex: 1, padding: '0 0 16px' }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollTo(item.id)}
              style={{ width: '100%', textAlign: 'left', background: 'none' }}
            >
              <span style={{ fontSize: 13, opacity: 0.6 }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Footer info */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(72,207,174,0.15)' }}>
          <p style={{ fontSize: 11, color: 'rgba(253,253,253,0.4)', fontFamily: 'DM Mono, monospace', lineHeight: 1.7 }}>
            daxta.s.a.s@gmail.com
            <br />
            +57 323 838 4762
            <br />
            <span style={{ color: 'rgba(72,207,174,0.6)' }}>Tabio, Cundinamarca</span>
          </p>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isMobile && (
        <div
          className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Toggle button */}
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen((v) => !v)}
        style={{ left: !isMobile && sidebarOpen ? 220 : 20 }}
        aria-label="Menú"
      >
        <span style={{ transform: sidebarOpen && !isMobile ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
        <span style={{ opacity: sidebarOpen && !isMobile ? 0 : 1 }} />
        <span style={{ transform: sidebarOpen && !isMobile ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
      </button>

      {/* Main content */}
      <div
        ref={mainRef}
        className={`main-content ${!sidebarOpen && !isMobile ? 'full-width' : ''}`}
      >
        {/* HERO */}
        <section id="inicio" className="hero-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 60px', position: 'relative', overflow: 'hidden' }}>
          {/* Background logo watermark */}
          <div style={{ position: 'absolute', right: '-40px', top: '50%', transform: 'translateY(-50%)', width: 520, height: 520, opacity: 0.06, pointerEvents: 'none' }}>
            <img src={daxtaLogo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(10)' }} />
          </div>
          <div style={{ maxWidth: 720, paddingTop: 60, paddingBottom: 60, position: 'relative', zIndex: 1 }}>
            <span className="tag" style={{ background: 'rgba(72,207,174,0.15)', color: '#48cfae', marginBottom: 24, display: 'inline-block' }}>
              Tabio · Cundinamarca · Colombia
            </span>
            <h1
              className="font-display"
              style={{ fontSize: 'clamp(42px, 6vw, 72px)', color: '#fdfdfd', lineHeight: 1.08, marginBottom: 24, letterSpacing: '-0.02em' }}
            >
              Datos que{' '}
              <span style={{ color: '#48cfae', fontStyle: 'italic' }}>transforman</span>
              <br />
              comunidades
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(253,253,253,0.72)', lineHeight: 1.75, marginBottom: 40, maxWidth: 580 }}>
              Daxta recolecta y analiza datos de los jóvenes de Tabio entre 12 y 20 años para convertir información en decisiones que generan impacto real.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => scrollTo('servicios')}>
                Conocer Servicios
              </button>
              <button
                onClick={() => scrollTo('contacto')}
                style={{
                  background: 'transparent',
                  border: '1.5px solid rgba(72,207,174,0.5)',
                  color: '#48cfae',
                  padding: '14px 28px',
                  borderRadius: 10,
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = 'rgba(72,207,174,0.1)'; }}
                onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = 'transparent'; }}
              >
                Contáctanos
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 64, maxWidth: 500 }}>
              {[
                { val: '12–20', label: 'Años de edad objetivo' },
                { val: '100%', label: 'Manejo ético de datos' },
                { val: '∞', label: 'Potencial de impacto' },
              ].map((s) => (
                <div key={s.label} className="stat-card">
                  <div className="font-display" style={{ fontSize: 28, color: '#48cfae', lineHeight: 1 }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(253,253,253,0.5)', marginTop: 6, lineHeight: 1.4 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NOSOTROS */}
        <section id="nosotros" style={{ background: '#fdfdfd', maxWidth: '100%' }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <span className="tag">Sobre Nosotros</span>
            <div className="section-divider" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
              <div>
                <h2 className="font-display" style={{ fontSize: 'clamp(30px, 4vw, 46px)', color: '#0f2628', lineHeight: 1.15, marginBottom: 20 }}>
                  Conociendo a la juventud de Tabio
                </h2>
                <p style={{ fontSize: 16, color: '#3d5a5c', lineHeight: 1.8, marginBottom: 16 }}>
                  Daxta nació de una idea simple pero poderosa: conocer de manera precisa las necesidades, problemas, gustos, intereses, opiniones y comportamientos de los jóvenes de nuestra comunidad.
                </p>
                <p style={{ fontSize: 16, color: '#3d5a5c', lineHeight: 1.8, marginBottom: 24 }}>
                  Somos un proyecto de emprendimiento en etapa de desarrollo, comprometido con transformar datos reales en información útil que permita a empresas, instituciones y entidades tomar mejores decisiones para la juventud de Tabio, Cundinamarca.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {['Análisis riguroso y transparente', 'Privacidad garantizada para participantes', 'Resultados claros y accionables'].map((v) => (
                    <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#48cfae', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11 }}>
                        ✓
                      </div>
                      <span style={{ fontSize: 15, color: '#195759', fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  background: 'linear-gradient(135deg, #195759 0%, #0f3d3e 100%)',
                  borderRadius: 20,
                  padding: 40,
                  color: '#fdfdfd',
                }}
              >
                <p className="font-mono" style={{ fontSize: 12, color: '#48cfae', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>
                  Misión
                </p>
                <p className="font-display" style={{ fontSize: 22, lineHeight: 1.5, marginBottom: 32 }}>
                  "Transformar datos de la población juvenil en información clara, precisa y útil para la toma de decisiones."
                </p>
                <div style={{ height: 1, background: 'rgba(72,207,174,0.2)', marginBottom: 24 }} />
                <p className="font-mono" style={{ fontSize: 12, color: '#48cfae', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
                  Visión
                </p>
                <p style={{ fontSize: 15, color: 'rgba(253,253,253,0.75)', lineHeight: 1.7 }}>
                  Ser la fuente de referencia en análisis de datos juveniles para Cundinamarca, apoyando soluciones reales a necesidades reales.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" style={{ background: '#f5faf9' }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <span className="tag">Servicios</span>
            <div className="section-divider" />
            <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#0f2628', marginBottom: 12, lineHeight: 1.2 }}>
              Lo que ofrecemos
            </h2>
            <p style={{ fontSize: 16, color: '#3d5a5c', maxWidth: 560, marginBottom: 48, lineHeight: 1.7 }}>
              Servicios diseñados para convertir la información de los jóvenes de Tabio en ventajas competitivas para tu organización.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {SERVICES.map((s) => (
                <div key={s.title} className="service-card">
                  <div style={{ fontSize: 28, marginBottom: 16 }}>{s.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: '#195759', marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: '#5a7a7c', lineHeight: 1.75 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESO */}
        <section id="proceso" style={{ background: '#fdfdfd' }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <span className="tag">Metodología</span>
            <div className="section-divider" />
            <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#0f2628', marginBottom: 12 }}>
              Cómo funciona Daxta
            </h2>
            <p style={{ fontSize: 16, color: '#3d5a5c', maxWidth: 520, marginBottom: 56, lineHeight: 1.7 }}>
              Un proceso estructurado que garantiza datos confiables y resultados útiles.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={step.num}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '52px 1fr',
                    gap: 24,
                    alignItems: 'flex-start',
                    paddingBottom: i < PROCESS_STEPS.length - 1 ? 0 : 0,
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="step-circle font-mono">{step.num}</div>
                    {i < PROCESS_STEPS.length - 1 && (
                      <div style={{ width: 2, height: 48, background: 'rgba(72,207,174,0.2)', marginTop: 4 }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: i < PROCESS_STEPS.length - 1 ? 32 : 0 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: '#195759', marginBottom: 8 }}>{step.title}</h3>
                    <p style={{ fontSize: 15, color: '#5a7a7c', lineHeight: 1.75 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PÚBLICO OBJETIVO */}
        <section id="publico" style={{ background: '#195759' }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <span className="tag" style={{ background: 'rgba(72,207,174,0.15)', color: '#48cfae' }}>Público Objetivo</span>
            <div className="section-divider" />
            <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#fdfdfd', marginBottom: 12 }}>
              ¿Quién puede beneficiarse?
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(253,253,253,0.65)', maxWidth: 540, marginBottom: 48, lineHeight: 1.7 }}>
              Nuestros datos son valiosos para cualquier organización que necesite conocer mejor a la juventud de Tabio.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
              {AUDIENCE.map((a) => (
                <div key={a.title} className="audience-card">
                  <div style={{ fontSize: 28, marginBottom: 14 }}>{a.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#48cfae', marginBottom: 8 }}>{a.title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(253,253,253,0.65)', lineHeight: 1.7 }}>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DIFERENCIADORES */}
        <section id="diferenciadores" style={{ background: '#f5faf9' }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <span className="tag">Por qué elegirnos</span>
            <div className="section-divider" />
            <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#0f2628', marginBottom: 48 }}>
              Nuestra diferencia
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 28 }}>
              {DIFFERENTIATORS.map((d, i) => (
                <div key={d.title} style={{ borderTop: `3px solid ${i % 2 === 0 ? '#48cfae' : '#195759'}`, paddingTop: 20 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#195759', marginBottom: 10 }}>{d.title}</h3>
                  <p style={{ fontSize: 14, color: '#5a7a7c', lineHeight: 1.75 }}>{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VISIÓN FUTURA */}
        <section id="futuro" style={{ background: '#fdfdfd' }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <span className="tag">Visión Futura</span>
            <div className="section-divider" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
              <div>
                <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#0f2628', lineHeight: 1.15, marginBottom: 20 }}>
                  El futuro de Daxta en Cundinamarca
                </h2>
                <p style={{ fontSize: 16, color: '#3d5a5c', lineHeight: 1.8, marginBottom: 16 }}>
                  Nuestro horizonte va más allá de Tabio. Proyectamos expandir el alcance de nuestros análisis a otros municipios de Cundinamarca y a diferentes grupos poblacionales y sectores económicos.
                </p>
                <p style={{ fontSize: 16, color: '#3d5a5c', lineHeight: 1.8 }}>
                  En el futuro, Daxta podrá ofrecer servicios avanzados de visualización de datos, estudios sectoriales, análisis de encuestas a gran escala y dashboards personalizados para múltiples industrias.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: '🗺️', text: 'Expansión a otros municipios de Cundinamarca' },
                  { icon: '📈', text: 'Dashboards personalizados para cada cliente' },
                  { icon: '🧪', text: 'Análisis de múltiples grupos y sectores económicos' },
                  { icon: '🌱', text: 'Alianzas con instituciones académicas y públicas' },
                  { icon: '💻', text: 'Plataforma propia de gestión de encuestas y datos' },
                ].map((item) => (
                  <div
                    key={item.text}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '14px 18px',
                      background: '#f5faf9',
                      borderRadius: 10,
                      border: '1px solid rgba(72,207,174,0.2)',
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    <span style={{ fontSize: 14, color: '#195759', fontWeight: 500 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" style={{ background: 'linear-gradient(160deg, #195759 0%, #0f3d3e 100%)' }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <span className="tag" style={{ background: 'rgba(72,207,174,0.15)', color: '#48cfae' }}>Contacto</span>
            <div className="section-divider" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'flex-start' }}>
              {/* Info */}
              <div>
                <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: '#fdfdfd', lineHeight: 1.15, marginBottom: 20 }}>
                  Hablemos de tus datos
                </h2>
                <p style={{ fontSize: 16, color: 'rgba(253,253,253,0.65)', lineHeight: 1.8, marginBottom: 36 }}>
                  ¿Tu empresa, institución o entidad necesita conocer mejor a la juventud de Tabio? Estamos listos para escucharte y diseñar una solución a tu medida.
                </p>
                {[
                  { icon: '✉️', label: 'Email', val: 'daxta.s.a.s@gmail.com' },
                  { icon: '📞', label: 'Teléfono', val: '+57 323 838 4762' },
                  { icon: '📍', label: 'Ubicación', val: 'Tabio, Cundinamarca, Colombia' },
                ].map((c) => (
                  <div key={c.label} style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
                    <span style={{ fontSize: 18, marginTop: 2 }}>{c.icon}</span>
                    <div>
                      <p className="font-mono" style={{ fontSize: 11, color: '#48cfae', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>{c.label}</p>
                      <p style={{ fontSize: 15, color: '#fdfdfd' }}>{c.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                style={{ background: '#fdfdfd', borderRadius: 20, padding: 40, display: 'flex', flexDirection: 'column', gap: 18 }}
              >
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#195759', marginBottom: 4 }}>Formulario de contacto</h3>
                <p style={{ fontSize: 13, color: '#5a7a7c', marginBottom: 8 }}>
                  Tu información se guardará de forma segura en nuestra base de datos.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#195759', display: 'block', marginBottom: 6 }}>
                      Nombre completo <span style={{ color: '#48cfae' }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Ej: Laura Gómez"
                      value={form.nombre}
                      onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#195759', display: 'block', marginBottom: 6 }}>
                      Email <span style={{ color: '#48cfae' }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#195759', display: 'block', marginBottom: 6 }}>
                      Organización / Empresa
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Nombre de tu empresa"
                      value={form.organizacion}
                      onChange={(e) => setForm((f) => ({ ...f, organizacion: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#195759', display: 'block', marginBottom: 6 }}>
                      Teléfono
                    </label>
                    <input
                      className="form-input"
                      type="tel"
                      placeholder="+57 300 000 0000"
                      value={form.telefono}
                      onChange={(e) => setForm((f) => ({ ...f, telefono: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#195759', display: 'block', marginBottom: 6 }}>
                    ¿Cuál es tu interés principal?
                  </label>
                  <select
                    className="form-input"
                    value={form.interes}
                    onChange={(e) => setForm((f) => ({ ...f, interes: e.target.value }))}
                    style={{ appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="encuestas">Encuestas y recolección de datos</option>
                    <option value="analisis">Análisis de datos</option>
                    <option value="dashboard">Dashboard personalizado</option>
                    <option value="estudio">Estudio de comunidad</option>
                    <option value="consultoria">Consultoría educativa</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#195759', display: 'block', marginBottom: 6 }}>
                    Mensaje <span style={{ color: '#48cfae' }}>*</span>
                  </label>
                  <textarea
                    className="form-input"
                    rows={4}
                    placeholder="Cuéntanos sobre tu proyecto o necesidad..."
                    value={form.mensaje}
                    onChange={(e) => setForm((f) => ({ ...f, mensaje: e.target.value }))}
                    style={{ resize: 'vertical', minHeight: 100 }}
                  />
                </div>

                <button className="btn-primary" type="submit" disabled={submitting} style={{ width: '100%', marginTop: 4 }}>
                  {submitting ? 'Enviando...' : 'Enviar mensaje'}
                </button>

                <p style={{ fontSize: 12, color: '#8aacae', textAlign: 'center', lineHeight: 1.6 }}>
                  Al enviar aceptas que tu información sea guardada de forma segura. Nunca la compartiremos sin tu consentimiento.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ background: '#0a2426', padding: '28px 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={daxtaLogo} alt="Daxta" style={{ width: 60, height: 60, objectFit: 'contain', flexShrink: 0 }} />
            <span style={{ color: 'rgba(253,253,253,0.6)', fontSize: 13 }}>
              © 2025 Daxta — Proyecto de Emprendimiento · Tabio, Cundinamarca
            </span>
          </div>
          <span className="font-mono" style={{ fontSize: 11, color: 'rgba(72,207,174,0.5)', letterSpacing: '0.06em' }}>
            DATA · ANALYTICS · COMMUNITY
          </span>
        </footer>
      </div>

      {/* Toast */}
      <div className={`toast ${toast.show ? 'show' : ''}`}>{toast.msg}</div>
    </>
  );
}
