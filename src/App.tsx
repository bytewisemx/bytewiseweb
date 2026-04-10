import logo from './assets/logonew.png';
import fondo from './assets/fond.png';
import './App.css';

// SECTION 2 - ABOUT
const values = [
  { title: 'Calidad', desc: 'Excelencia en cada solución, proceso y entregable para superar las expectativas de nuestros clientes.' },
  { title: 'Confiabilidad', desc: 'Cumplimiento puntual y transparente en cada compromiso adquirido.' },
  { title: 'Confidencialidad', desc: 'Resguardo y protección rigurosa de la información sensible de nuestros clientes.' },
  { title: 'Integridad', desc: 'Actuamos con honestidad y rectitud en cada decisión, interna o externa.' },
  { title: 'Responsabilidad', desc: 'Protección proactiva de los activos digitales y la información de nuestros clientes.' },
  { title: 'Vanguardia', desc: 'Cultura de innovación, exploración y adaptación constante al entorno tecnológico.' }
];

// SECTION 3 - SERVICES
const services = [
  {
    num: '01',
    title: 'Consultoría en Ciberseguridad',
    copy: 'Diseñamos e implementamos estrategias de ciberseguridad personalizadas para proteger los activos digitales de su organización a corto, mediano y largo plazo.',
    includes: [
      'Evaluación inicial de brechas y diagnóstico de activos',
      'Plan de respuesta ante incidentes y ciberataques',
      'Implementación de herramientas y procedimientos de seguridad',
      'Concientización y capacitación del personal',
      'Preparación para auditoría de certificación ISO 27001'
    ],
    cta: 'Solicitar consultoría',
    icon: 'pi-shield',
    id: 'ciberseguridad'
  },
  {
    num: '02',
    title: 'Consultoría ISO 27001:2022',
    copy: 'Le acompañamos en todo el proceso de implementación del Sistema de Gestión de Seguridad de la Información (SGSI) bajo la norma ISO 27001:2022, desde el análisis inicial hasta la certificación.',
    includes: [
      'Kit Básico — Consultoría inicial y análisis de brechas',
      'Avanzado — Auditoría Interna de Seguridad',
      'Certificación — Formación y preparación para auditoría externa'
    ],
    cta: 'Conocer niveles de servicio',
    icon: 'pi-check-circle',
    id: 'iso-27001'
  },
  {
    num: '03',
    title: 'Administración de TI por Externalización',
    copy: 'Si su organización necesita fortalecer su área de tecnología sin crear un departamento interno, ByteWise actúa como su aliado estratégico de TI o resuelve sus requerimientos diarios eficientemente.',
    includes: [
      'Reducción de costos frente a un equipo interno de TI',
      'Flexibilidad y escalabilidad según las necesidades del negocio',
      'Acceso a conocimiento especializado sin costo de contratación',
      'Liberación de recursos para enfocarse en el negocio principal'
    ],
    cta: 'Solicitar cotización',
    icon: 'pi-desktop',
    id: 'admin-ti'
  },
  {
    num: '04',
    title: 'Consultoría en Inteligencia Artificial',
    copy: 'Identificamos y aplicamos las oportunidades de IA que generan valor real en su organización: desde la automatización de procesos hasta asistentes virtuales y campañas.',
    includes: [],
    cta: 'Ver más sobre Consultoría IA',
    icon: 'pi-sparkles',
    id: 'consultoria-ia'
  },
  {
    num: '05',
    title: 'Pentesting y Análisis de Vulnerabilidades',
    copy: 'Evaluamos la seguridad de sus sistemas desde la perspectiva de un atacante, identificando vulnerabilidades antes de que puedan ser explotadas.',
    includes: [
      'Pruebas de penetración (Pentesting) controladas',
      'Análisis de vulnerabilidades en sistemas e infraestructura',
      'Evaluación de ingeniería social y resistencia del personal',
      'Hardening y reforzamiento de configuraciones'
    ],
    cta: 'Solicitar evaluación técnica',
    icon: 'pi-search',
    id: 'pentesting'
  },
  {
    num: '06',
    title: 'Forense Informático',
    copy: 'Servicio especializado de análisis forense digital para la investigación de incidentes de seguridad, recopilación de evidencias y respuesta ante brechas.',
    includes: ['Servicio complementario — disponible bajo solicitud específica.'],
    cta: 'Consultar disponibilidad',
    icon: 'pi-folder-open',
    id: 'forense'
  }
];

// SECTION 4 - AI
const aiUseCases = [
  { title: 'Chatbots y Asistentes Virtuales', desc: 'Implementamos asistentes inteligentes que atienden a sus clientes de forma inmediata, personalizada y disponible las 24 horas. Reducimos tiempos de respuesta y mejoramos la satisfacción del cliente.', icon: 'pi-comments' },
  { title: 'Automatización de Procesos', desc: 'Identificamos tareas repetitivas de su organización y las automatizamos con IA, liberando tiempo de su equipo para actividades estratégicas, desde gestión documental hasta flujos internos.', icon: 'pi-sync' },
  { title: 'Generación de Contenido Multimedia', desc: 'Producimos imágenes, videos y materiales visuales generados con inteligencia artificial, optimizados para comunicación corporativa. Mayor volumen de contenido, menor tiempo de producción.', icon: 'pi-image' },
  { title: 'Campañas Digitales Inteligentes', desc: 'Diseñamos estrategias de marketing potenciadas por IA: segmentación avanzada, generación de creatividades personalizadas y análisis predictivo de resultados.', icon: 'pi-chart-line' },
  { title: 'Análisis de Datos y Decisiones', desc: 'Transformamos los datos de su organización en inteligencia accionable. Mediante análisis predictivo identificamos patrones y apoyamos decisiones estratégicas con base en evidencia.', icon: 'pi-chart-pie' },
  { title: 'Asistentes para Tareas Internas', desc: 'Desarrollamos asistentes para optimizar operaciones internas: soporte en HR, documentos, coordinación y atención a colaboradores, haciendo su negocio más eficiente.', icon: 'pi-users' }
];

// SECTION 5 - SOFTWARE
const softwareSteps = [
  { num: '01', title: 'Discovery y análisis', desc: 'Comprendemos en profundidad sus necesidades, procesos actuales y objetivos. Definimos el alcance y requerimientos.' },
  { num: '02', title: 'Diseño y prototipo', desc: 'Diseñamos la arquitectura del sistema y la experiencia de usuario. Presentamos prototipos para validación temprana.' },
  { num: '03', title: 'Desarrollo iterativo', desc: 'Desarrollamos el software en ciclos cortos y entregas frecuentes, permitiendo ajustes rápidos y eficaces.' },
  { num: '04', title: 'Pruebas y calidad', desc: 'Realizamos pruebas exhaustivas de funcionamiento, seguridad y rendimiento antes de cada liberación o entrega.' },
  { num: '05', title: 'Implementación y soporte', desc: 'Desplegamos la solución en el entorno de producción y brindamos soporte técnico continuo y estabilización.' }
];

// SECTION 6 - TEAM
const team = [
  {
    name: '[NOMBRE COMPLETO 1]',
    role: 'Dirección General / Consultor Senior',
    bio: '[BIO: Especialista en seguridad de la información con más de X años de experiencia en implementación de sistemas de gestión, auditorías ISO 27001 y consultoría estratégica para empresas de diversos sectores.]',
    badges: ['Maestría en Seguridad de la Información', 'Auditor Interno ISO 27001:2022', 'Lead Implementer ISO 27001', 'Consultor en Inteligencia Artificial']
  },
  {
    name: '[NOMBRE COMPLETO 2]',
    role: '[TÍTULO / ROL]',
    bio: '[BIO: Especialista en [área]. Experiencia en [industrias/proyectos]. Certificaciones en [mencionar].]',
    badges: ['[Certificación 1]', '[Certificación 2]', '[Especialidad en IA / área técnica]']
  }
];

// SECTION 8 - NEWS (BLOG FORMAT)
const newsArticles = [
  { title: '¿Por qué las empresas en Aguascalientes necesitan una estrategia de ciberseguridad en 2025?', category: 'Ciberseguridad', date: 'Ene 12, 2026' },
  { title: 'Qué es ISO 27001 y por qué su empresa debería considerar la certificación', category: 'ISO 27001', date: 'Ene 05, 2026' },
  { title: '5 vulnerabilidades comunes en empresas medianas y cómo prevenirlas', category: 'Ciberseguridad', date: 'Dic 28, 2025' },
  { title: 'Inteligencia artificial en ciberseguridad: oportunidades y riesgos para organizaciones', category: 'Inteligencia Artificial', date: 'Dic 14, 2025' },
  { title: 'Cómo preparar a su equipo ante un incidente de seguridad', category: 'Gestión de Riesgos', date: 'Nov 30, 2025' }
];

function App() {
  const pageStyle = {
    backgroundImage: `linear-gradient(rgba(11, 18, 36, 0.85), rgba(11, 18, 36, 0.95)), url(${fondo})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    backgroundBlendMode: 'overlay',
  };

  return (
    <div className="page" style={pageStyle}>
      {/* BACKGROUND ELEMENTS */}
      <div className="bg-geometry" aria-hidden="true">
        <div className="glow top-left"></div>
        <div className="glow bottom-right"></div>
      </div>

      {/* TOPBAR */}
      <header className="topbar">
        <div className="brand">
          <img src={logo} alt="ByteWise" className="brand-mark" />
        </div>
        <nav>
          <a href="#sobre-bytewise">Nosotros</a>
          <a href="#servicios">Servicios</a>
          <a href="#ia">Inteligencia Artificial</a>
          <a href="#noticias">Blog</a>
          <a href="#equipo">Equipo</a>
          <a href="#contacto" className="pill pulse-hover">Contacto</a>
        </nav>
      </header>

      <main>
        {/* SECTION 1 — HERO */}
        <section className="hero-section text-center">
          <div className="hero-content">
            <span className="eyebrow bg-tag">Consultoría en Ciberseguridad e Inteligencia Artificial</span>
            <h1>Protegemos su información.<br/><span className="accent">Aseguramos su futuro.</span></h1>
            <p className="lede fade-in">
              ByteWise es la firma especializada en ciberseguridad e inteligencia artificial que guía a su organización desde la evaluación inicial hasta la certificación ISO 27001:2022 y la implementación de soluciones de IA que optimizan sus operaciones. Trabajamos con empresas de todos los tamaños en Aguascalientes y México.
            </p>
            <div className="cta-group animated-fade">
              <a href="#contacto" className="primary shadow-pulse">Solicitar diagnóstico gratuito</a>
              <a href="#servicios" className="ghost">Conocer nuestros servicios</a>
            </div>
            <div className="trust-badges mt-6">
              <span>ISO 27001:2022</span>
              <span className="dot">•</span>
              <span>Auditor Certificado</span>
              <span className="dot">•</span>
              <span>Consultoría en IA</span>
              <span className="dot">•</span>
              <span>Aguascalientes, México</span>
            </div>
          </div>
        </section>

        {/* SECTION 2 — SOBRE BYTEWISE */}
        <section className="about-section" id="sobre-bytewise">
          <div className="container">
            <div className="section-heading text-center">
              <span className="eyebrow">¿Por qué ByteWise?</span>
              <h2>Protección Integral y Estratégica</h2>
            </div>
            <p className="section-p intro text-center">
              En ByteWise entendemos que la seguridad de la información no es un lujo, es una condición indispensable para la continuidad de cualquier organización. Somos una firma de consultoría especializada en ciberseguridad e inteligencia artificial, con un enfoque práctico y alineado a estándares internacionales como la norma ISO 27001:2022.
            </p>
            <p className="section-p intro text-center mb-5">
              Acompañamos a nuestros clientes en cada etapa: desde el diagnóstico inicial de brechas y vulnerabilidades, pasando por la implementación de controles de seguridad efectivos, hasta la preparación para auditoría de certificación y el mantenimiento continuo del sistema.
            </p>

            <div className="mission-vision-grid mt-4">
              <div className="card glass-card">
                <h3><i className="pi pi-compass mr-2"></i>Nuestra Misión</h3>
                <p>Ofrecer servicios de ciberseguridad de calidad certificada, basados en el entendimiento profundo de las necesidades de cada cliente, estableciendo relaciones de confianza a largo plazo.</p>
              </div>
              <div className="card glass-card">
                <h3><i className="pi pi-eye mr-2"></i>Nuestra Visión</h3>
                <p>Ser reconocidos como la firma líder en soluciones de ciberseguridad e inteligencia artificial en Aguascalientes y México, distinguidos por un servicio personalizado y a la vanguardia del entorno digital.</p>
              </div>
            </div>

            <h3 className="text-center mt-5 mb-3">Nuestros Valores</h3>
            <div className="values-grid">
              {values.map(v => (
                <div key={v.title} className="value-item">
                  <div className="value-bullet"></div>
                  <div>
                    <h4>{v.title}</h4>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="differentiator mt-5">
              <i className="pi pi-star-fill glow-icon"></i>
              <p><strong>La combinación de experiencia en ISO 27001:2022 e Inteligencia Artificial</strong> nos permite ofrecer una solución integral única en el mercado: seguridad robusta y procesos optimizados, bajo un mismo equipo consultor.</p>
            </div>
          </div>
        </section>

        {/* SECTION 3 — SERVICIOS */}
        <section className="services-section" id="servicios">
          <div className="container">
            <div className="section-heading text-center">
              <span className="eyebrow">Soluciones Integrales</span>
              <h2>Nuestros Servicios</h2>
              <p className="lede">Soluciones integrales de ciberseguridad, tecnología e inteligencia artificial diseñadas a la medida de su organización.</p>
            </div>

            <div className="services-grid mt-5">
              {services.map(service => (
                <div className="service-card" key={service.title} id={service.id}>
                  <div className="card-header">
                    <span className="service-num">{service.num}</span>
                    <i className={`pi ${service.icon} service-icon`}></i>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  
                  {service.includes && service.includes.length > 0 && (
                    <ul className="service-includes">
                      {service.includes.map(item => (
                        <li key={item}><i className="pi pi-check text-blue"></i> {item}</li>
                      ))}
                    </ul>
                  )}
                  
                  <a href="#contacto" className="service-link">
                    &rarr; {service.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 — CONSULTORÍA IA */}
        <section className="ai-section mt-5" id="ia">
          <div className="container p-relative">
            <div className="ai-backdrop"></div>
            <div className="section-heading text-center">
              <span className="eyebrow">Inteligencia Artificial</span>
              <h2>IA aplicada a su negocio</h2>
              <p className="lede mx-auto">No se trata de tecnología por sí misma, sino de resultados. Nuestros consultores identifican dónde y cómo la IA puede transformar sus procesos, reducir costos y mejorar la experiencia de sus clientes.</p>
            </div>
            <p className="section-p text-center mb-5">
              Un consultor de IA es el puente entre la tecnología disponible y los objetivos reales de su organización. En ByteWise analizamos sus procesos, diseñamos soluciones a la medida e implementamos herramientas que generan valor desde el primer día.
            </p>

            <div className="ai-grid">
              {aiUseCases.map(ai => (
                <div className="ai-card" key={ai.title}>
                  <i className={`pi ${ai.icon} ai-icon`}></i>
                  <h4>{ai.title}</h4>
                  <p>{ai.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-5">
              <a href="#contacto" className="primary large">
                &rarr; Agendar diagnóstico de IA gratuito
              </a>
              <p className="support-text mt-2">En 30 minutos identificamos las oportunidades de IA con mayor impacto para su organización.</p>
            </div>
          </div>
        </section>

        {/* SECTION 5 — DESARROLLO DE SOFTWARE */}
        <section className="software-section mt-5" id="software">
           <div className="container">
              <div className="section-heading text-center">
                <span className="eyebrow">Soluciones a Medida</span>
                <h2>Desarrollo de Software</h2>
                <p className="lede">Construimos las herramientas tecnológicas que su organización necesita, diseñadas específicamente para sus procesos, integraciones y objetivos de negocio.</p>
              </div>
              <p className="text-center mb-5 section-p">
                Cada organización es única. Por eso en ByteWise no ofrecemos soluciones genéricas: desarrollamos software a la medida que se adapta a sus flujos de trabajo, se integra con sus sistemas existentes y escala junto con su crecimiento.
              </p>

              <div className="timeline">
                {softwareSteps.map(step => (
                  <div className="timeline-item" key={step.title}>
                    <div className="step-num">{step.num}</div>
                    <div className="step-content">
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <a href="#contacto" className="ghost">&rarr; Platiquemos sobre su proyecto</a>
              </div>
           </div>
        </section>

        {/* SECTION 6 — NUESTRO EQUIPO */}
        <section className="team-section mt-5" id="equipo">
           <div className="container">
            <div className="section-heading text-center">
              <span className="eyebrow">El equipo detrás de ByteWise</span>
              <h2>Profesionales Certificados</h2>
              <p className="lede">Experiencia en ciberseguridad, inteligencia artificial y gestión de tecnología, comprometidos con el crecimiento de su organización.</p>
            </div>

            <div className="team-grid mt-5">
              {team.map((member, i) => (
                <div className="team-card" key={i}>
                  <div className="avatar-placeholder">
                    <i className="pi pi-user"></i>
                  </div>
                  <h3>{member.name}</h3>
                  <div className="team-role">{member.role}</div>
                  <p className="team-bio">{member.bio}</p>
                  <div className="badges-container">
                    {member.badges.map(b => (
                      <span className="badge-chip" key={b}>{b}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-center section-p mt-4 text-muted">
              Nuestro equipo se mantiene en constante actualización frente a las amenazas emergentes y las nuevas capacidades de la inteligencia artificial, garantizando que nuestros clientes siempre cuenten con la orientación más vigente del mercado.
            </p>
           </div>
        </section>

        {/* SECTION 7, 8, 9 — CLIENTES, NOTICIAS, DESCARGAS */}
        <section className="grid-3-sections mt-5">
          <div className="container">
            <div className="complex-grid">
              
              {/* Clientes */}
              <div className="panel clientes-panel" id="clientes">
                <h3>Organizaciones que confían en ByteWise</h3>
                <p className="mb-3 text-muted">Trabajamos con organizaciones de distintos sectores e industrias en Aguascalientes y México, acompañándolas en su proceso de madurez en ciberseguridad.</p>
                <div className="placeholder-box">
                  <p><em>Actualmente estamos construyendo este espacio. Próximamente encontrará aquí los logos y testimonios de nuestros clientes.</em></p>
                </div>
                <blockquote className="testimonial-mock mt-4">
                  "ByteWise transformó la manera en que gestionamos la seguridad de nuestra información. El acompañamiento durante todo el proceso de certificación ISO 27001 fue invaluable."
                  <footer>— [Nombre], [Cargo], [Empresa] | [Ciudad]</footer>
                </blockquote>
                <a href="#contacto" className="mock-link mt-3 d-inline-block">&rarr; Conviértase en nuestro próximo caso de éxito</a>
              </div>

              {/* Descargas */}
              <div className="panel descargas-panel" id="descargas">
                <h3>Recursos Descargables</h3>
                <p className="text-muted mb-4">Acceda a nuestra documentación comercial para conocer en detalle nuestros servicios, metodología y propuesta de valor.</p>
                
                <div className="download-item">
                  <h4><i className="pi pi-file-pdf text-red-500 mr-2"></i> Presentación Ejecutiva ByteWise</h4>
                  <p className="small-text">Descripción completa de servicios, metodología de trabajo, equipo y casos de referencia.</p>
                  <span className="doc-meta">Formato: PDF · Actualizado 2025</span>
                  <a href="#" className="download-link text-blue">&rarr; Descargar presentación</a>
                </div>

                <div className="download-item mt-4">
                  <h4><i className="pi pi-file-pdf text-red-500 mr-2"></i> Brochure Comercial de Servicios</h4>
                  <p className="small-text">Resumen visual de todos los servicios de ByteWise con descripción y niveles de atención.</p>
                  <span className="doc-meta">Formato: PDF · Próximamente disponible</span>
                </div>

                <div className="capture-form mt-4">
                  <p className="small-text mb-2"><strong>Acceso a materiales:</strong> Le pedimos sus datos de contacto. No enviamos spam.</p>
                  <form onSubmit={e => e.preventDefault()}>
                    <input type="text" placeholder="Nombre completo" required />
                    <input type="text" placeholder="Empresa" required />
                    <input type="email" placeholder="Correo electrónico" required />
                    <button className="primary block outline-none border-none mt-2">Acceder</button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 8 — NOTICIAS Y RECURSOS (BLOG) */}
        <section className="blog-section mt-5" id="noticias">
          <div className="container">
            <div className="section-heading text-center">
              <span className="eyebrow">Nuestro Blog</span>
              <h2>Noticias y Recursos</h2>
              <p className="lede">Manténgase informado sobre las últimas amenazas, tendencias en seguridad e inteligencia artificial.</p>
            </div>
            
            <div className="blog-social-header">
              <span>Síguenos en nuestras redes sociales:</span>
              <a href="https://instagram.com/bytewise_mx" target="_blank" rel="noreferrer"><i className="pi pi-instagram"></i> @bytewise_mx</a>
              <a href="https://facebook.com/Bytewise.mx" target="_blank" rel="noreferrer"><i className="pi pi-facebook"></i> Bytewise.mx</a>
            </div>

            <div className="blog-grid mt-4">
              {newsArticles.map((article, i) => (
                <article className={`blog-card ${i === 0 ? 'featured' : ''}`} key={i}>
                  <div className="blog-image-placeholder">
                    <i className="pi pi-image mr-2"></i> Insertar Imagen
                  </div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span className="blog-tag">{article.category}</span>
                      <span className="blog-date">{article.date}</span>
                    </div>
                    <h3><a href="#">{article.title}</a></h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10 — CONTACTO */}
        <section className="contact-section mt-5" id="contacto">
          <div className="container">
            <div className="contact-card">
              <div className="contact-info">
                <h2>Hablemos sobre su organización</h2>
                <p className="mb-4">Estamos disponibles para resolver sus dudas, presentar una propuesta o agendar un diagnóstico inicial sin costo.</p>
                
                <ul className="contact-list">
                  <li><i className="pi pi-envelope"></i> <strong>General:</strong> contact@bytewise.mx</li>
                  <li><i className="pi pi-shopping-cart"></i> <strong>Ventas:</strong> ventas@bytewise.mx</li>
                  <li><i className="pi pi-briefcase"></i> <strong>Estrategia:</strong> f.covarrubias@bytewise.mx</li>
                  <li><i className="pi pi-phone"></i> <strong>Tel/WhatsApp:</strong> [AGREGAR NÚMERO CELULAR]</li>
                  <li><i className="pi pi-globe"></i> <strong>Web:</strong> www.bytewise.mx</li>
                  <li><i className="pi pi-map-marker"></i> <strong>Ubicación:</strong> Aguascalientes, México</li>
                </ul>

                <a href="https://wa.me/numerocelular" className="whatsapp-btn mt-4 inline-flex items-center">
                  <i className="pi pi-whatsapp mr-2 text-xl"></i>
                  ¿Consulta urgente? Escríbanos por WhatsApp
                </a>
              </div>

              <div className="contact-form">
                <h3>Envíenos un mensaje</h3>
                <p className="small-text mb-3">Le contactaremos en menos de 24 horas hábiles.</p>
                <form onSubmit={(e) => { e.preventDefault(); alert("Gracias por contactarnos. Hemos recibido su mensaje y un miembro de nuestro equipo se comunicará con usted en las próximas 24 horas hábiles."); }}>
                  <div className="input-group">
                    <input type="text" placeholder="Nombre completo *" required />
                    <input type="text" placeholder="Empresa / Organización *" required />
                  </div>
                  <div className="input-group">
                    <input type="email" placeholder="Correo electrónico *" required />
                    <input type="tel" placeholder="Teléfono (opcional)" />
                  </div>
                  <select required>
                    <option value="" disabled selected>Servicio de interés *</option>
                    <option value="ciberseguridad">Ciberseguridad</option>
                    <option value="iso">ISO 27001</option>
                    <option value="admin-ti">Administración TI</option>
                    <option value="ia">Consultoría IA</option>
                    <option value="software">Desarrollo de Software</option>
                    <option value="pentesting">Pentesting</option>
                    <option value="forense">Forense</option>
                    <option value="otro">Otro</option>
                  </select>
                  <textarea placeholder="Mensaje *" rows={4} required></textarea>
                  <button type="submit" className="primary btn-submit">Enviar mensaje</button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* SECTION 11 — FOOTER */}
      <footer className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col brand-col">
              <img src={logo} alt="ByteWise Logo" className="footer-logo mb-3" />
              <h4>ByteWise: Data & Cybersecurity</h4>
              <p>Protegiendo tus datos, asegurando tu futuro.</p>
            </div>
            
            <div className="footer-col">
              <h4>Servicios</h4>
              <ul>
                <li><a href="#ciberseguridad">Consultoría en Ciberseguridad</a></li>
                <li><a href="#iso-27001">ISO 27001:2022</a></li>
                <li><a href="#admin-ti">Administración de TI</a></li>
                <li><a href="#consultoria-ia">Consultoría en IA</a></li>
                <li><a href="#pentesting">Pentesting</a></li>
                <li><a href="#software">Desarrollo de Software</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contacto</h4>
              <ul>
                <li>contact@bytewise.mx</li>
                <li>[TELÉFONO / WHATSAPP]</li>
                <li>Aguascalientes, México</li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Redes Sociales</h4>
              <ul>
                <li><a href="https://instagram.com/bytewise_mx" target="_blank" rel="noreferrer">Instagram: @bytewise_mx</a></li>
                <li><a href="https://facebook.com/Bytewise.mx" target="_blank" rel="noreferrer">Facebook: Bytewise.mx</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 ByteWise: Data & Cybersecurity. Todos los derechos reservados.</p>
            <div className="legal-links">
              <a href="#">Política de Privacidad</a>
              <span className="dot">•</span>
              <a href="#">Términos de Uso</a>
              <span className="dot">•</span>
              <a href="#">Aviso de Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
