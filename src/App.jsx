import { useState, useEffect, useRef } from "react";

const data = {
  name: "Kanika Barman",
  title: "Primary School Teacher",
  location: "Siliguri, West Bengal, India",
  phone: "8972169134",
  email: "kanikabarman7151@gmail.com",
  summary:
    "Dedicated and passionate educator with 2 years of teaching experience in primary education. Skilled in creating engaging learning environments for young students and helping them grow academically and personally.",
  objective:
    "To obtain a full-time position as a Primary School Teacher where I can use my teaching skills, subject knowledge, and dedication to support students from Classes 1 to 5 in their academic and personal development.",
  expertise: [
    "English, EVS, Writing",
    "Classes 1 to 5",
    "Lesson Planning & Curriculum",
    "Classroom Management",
    "Student Counseling & Mentoring",
    "Exam Preparation Guidance",
    "Activity-Based Learning",
    "Communication Development",
  ],
  experience: [
    {
      role: "Primary Teacher",
      org: "Santa Uma School, West Bengal",
      period: "April 2024 – Present",
      subjects: "SST, Hindi, Science, Writing, Conversation, Drawing",
      points: [
        "Teaching students of primary classes using child-friendly methods",
        "Managing classroom discipline and student engagement",
        "Preparing lesson plans and worksheets",
        "Conducting assessments and helping students improve performance",
        "Organizing extracurricular activities and school events",
        "Supporting students in communication and confidence building",
        "Worked as Class Teacher with additional responsibilities",
      ],
    },
  ],
  education: [
    {
      degree: "Master of Arts in English (Pursuing)",
      inst: "University of North Bengal, West Bengal",
      year: "December 2025 – Present",
    },
    {
      degree: "Bachelor's Degree in English Honours",
      inst: "Surya Sen Mahavidyalaya, West Bengal",
      year: "September 2022 – March 2025",
    },
    {
      degree: "Higher Secondary (Class 12)",
      inst: "Kendriya Vidyalaya Sevoke Road, West Bengal",
      year: "2021",
    },
    {
      degree: "Secondary (Class 10)",
      inst: "Kendriya Vidyalaya Sevoke Road, West Bengal",
      year: "2019",
    },
  ],
  skills: ["MS Word", "MS Excel", "PowerPoint", "Zoom", "Google Meet", "Google Classroom", "Canva", "LMS Tools"],
  languages: ["Hindi", "English", "Bengali", "Nepali"],
  achievements: [
    "NCC C Certificate Holder",
    "Awarded for Student Calligraphy",
    "Students achieved high academic results under guidance",
    "Organized annual sports, competitions, seminars, and school events",
  ],
  hobbies: ["Dance", "Drawing", "Writing"],
};

const hobbyIcons = { Dance: "🩰", Drawing: "🎨", Writing: "✍️" };
const langColors = { Hindi: "#e8734a", English: "#4a90d9", Bengali: "#6bbf8e", Nepali: "#c97db5" };

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  const navLinks = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "achievements", label: "Achievements" },
    { id: "contact", label: "Contact" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", ...navLinks.map((n) => n.id)];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const styles = {
    root: {
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#faf8f4",
      color: "#2c2417",
      minHeight: "100vh",
      overflowX: "hidden",
    },
    nav: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: "rgba(250,248,244,0.95)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid #e8dfc8",
      padding: "0 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "64px",
    },
    navBrand: {
      fontFamily: "'Georgia', serif",
      fontWeight: "700",
      fontSize: "1.1rem",
      color: "#7a3b1e",
      letterSpacing: "0.05em",
    },
    navLinks: {
      display: "flex",
      gap: "0.25rem",
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
    navLink: (active) => ({
      padding: "0.4rem 0.85rem",
      borderRadius: "20px",
      cursor: "pointer",
      fontSize: "0.82rem",
      fontFamily: "'Georgia', serif",
      letterSpacing: "0.04em",
      transition: "all 0.2s",
      background: active ? "#7a3b1e" : "transparent",
      color: active ? "#fff" : "#5a4030",
      border: "none",
    }),
    hero: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      background: "linear-gradient(135deg, #3d1f0e 0%, #6b3520 40%, #9c5a35 70%, #c8855a 100%)",
      overflow: "hidden",
      paddingTop: "64px",
    },
    heroOrb1: {
      position: "absolute",
      width: "500px",
      height: "500px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(255,200,140,0.18) 0%, transparent 70%)",
      top: "-100px",
      right: "-100px",
    },
    heroOrb2: {
      position: "absolute",
      width: "350px",
      height: "350px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(255,180,100,0.12) 0%, transparent 70%)",
      bottom: "50px",
      left: "-80px",
    },
    heroContent: {
      textAlign: "center",
      color: "#fff",
      position: "relative",
      zIndex: 1,
      padding: "2rem",
      maxWidth: "700px",
    },
    heroAvatar: {
      width: "110px",
      height: "110px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #f5c88a, #e8935a)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "3rem",
      margin: "0 auto 1.5rem",
      border: "3px solid rgba(255,255,255,0.4)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    },
    heroName: {
      fontFamily: "'Georgia', serif",
      fontSize: "clamp(2.2rem, 6vw, 3.8rem)",
      fontWeight: "700",
      margin: "0 0 0.5rem",
      lineHeight: 1.1,
      letterSpacing: "-0.01em",
    },
    heroTitle: {
      fontSize: "clamp(1rem, 3vw, 1.3rem)",
      fontWeight: "400",
      color: "rgba(255,230,200,0.9)",
      margin: "0 0 0.6rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      fontFamily: "'Georgia', serif",
    },
    heroLoc: {
      fontSize: "0.9rem",
      color: "rgba(255,220,180,0.75)",
      margin: "0 0 2rem",
    },
    heroBadges: {
      display: "flex",
      gap: "0.75rem",
      justifyContent: "center",
      flexWrap: "wrap",
      marginBottom: "2.5rem",
    },
    heroBadge: {
      background: "rgba(255,255,255,0.15)",
      border: "1px solid rgba(255,255,255,0.3)",
      borderRadius: "20px",
      padding: "0.4rem 1rem",
      fontSize: "0.78rem",
      color: "rgba(255,240,220,0.95)",
      backdropFilter: "blur(6px)",
      letterSpacing: "0.04em",
    },
    heroCta: {
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    ctaBtn: (primary) => ({
      padding: "0.75rem 2rem",
      borderRadius: "30px",
      border: primary ? "none" : "2px solid rgba(255,255,255,0.6)",
      background: primary ? "#fff" : "transparent",
      color: primary ? "#7a3b1e" : "#fff",
      fontFamily: "'Georgia', serif",
      fontWeight: primary ? "700" : "500",
      fontSize: "0.9rem",
      cursor: "pointer",
      letterSpacing: "0.05em",
      transition: "all 0.2s",
    }),
    section: {
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "5rem 2rem",
    },
    sectionLabel: {
      fontSize: "0.7rem",
      letterSpacing: "0.25em",
      textTransform: "uppercase",
      color: "#c8855a",
      marginBottom: "0.5rem",
      fontFamily: "'Georgia', serif",
    },
    sectionTitle: {
      fontFamily: "'Georgia', serif",
      fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
      fontWeight: "700",
      color: "#3d1f0e",
      margin: "0 0 3rem",
      lineHeight: 1.2,
    },
    divider: {
      width: "50px",
      height: "3px",
      background: "linear-gradient(90deg, #c8855a, #e8a070)",
      borderRadius: "2px",
      margin: "0.75rem 0 2.5rem",
    },
    card: {
      background: "#fff",
      borderRadius: "16px",
      padding: "2rem",
      boxShadow: "0 2px 20px rgba(100,60,20,0.07)",
      border: "1px solid #f0e4d0",
    },
    expertiseGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "0.75rem",
      marginTop: "2rem",
    },
    expertiseItem: {
      background: "linear-gradient(135deg, #fdf6ee, #f8ece0)",
      border: "1px solid #e8d4bc",
      borderRadius: "10px",
      padding: "0.75rem 1rem",
      fontSize: "0.85rem",
      color: "#5a3520",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    timelineItem: {
      position: "relative",
      paddingLeft: "2rem",
      marginBottom: "2.5rem",
    },
    timelineDot: {
      position: "absolute",
      left: 0,
      top: "6px",
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      background: "#c8855a",
      border: "2px solid #e8a070",
    },
    timelineLine: {
      position: "absolute",
      left: "5px",
      top: "20px",
      bottom: "-20px",
      width: "2px",
      background: "linear-gradient(180deg, #e8a070, transparent)",
    },
    expRole: {
      fontFamily: "'Georgia', serif",
      fontSize: "1.2rem",
      fontWeight: "700",
      color: "#3d1f0e",
      margin: "0 0 0.2rem",
    },
    expOrg: {
      color: "#c8855a",
      fontSize: "0.9rem",
      fontWeight: "600",
      margin: "0 0 0.15rem",
    },
    expPeriod: {
      fontSize: "0.78rem",
      color: "#9a7a60",
      letterSpacing: "0.05em",
      marginBottom: "0.75rem",
    },
    expSubjects: {
      background: "linear-gradient(135deg, #fdf6ee, #f5e8d6)",
      border: "1px solid #e0ccb0",
      borderRadius: "8px",
      padding: "0.5rem 0.875rem",
      fontSize: "0.8rem",
      color: "#7a4a25",
      marginBottom: "1rem",
      display: "inline-block",
    },
    bulletList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    bullet: {
      display: "flex",
      gap: "0.5rem",
      alignItems: "flex-start",
      fontSize: "0.88rem",
      color: "#5a4030",
      marginBottom: "0.5rem",
      lineHeight: 1.5,
    },
    eduGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "1.25rem",
    },
    eduCard: {
      background: "#fff",
      border: "1px solid #f0e4d0",
      borderRadius: "14px",
      padding: "1.5rem",
      boxShadow: "0 2px 12px rgba(100,60,20,0.06)",
      borderLeft: "4px solid #c8855a",
    },
    eduDeg: {
      fontFamily: "'Georgia', serif",
      fontSize: "0.95rem",
      fontWeight: "700",
      color: "#3d1f0e",
      marginBottom: "0.4rem",
    },
    eduInst: {
      fontSize: "0.82rem",
      color: "#7a5a3a",
      marginBottom: "0.3rem",
    },
    eduYear: {
      fontSize: "0.75rem",
      color: "#c8855a",
      fontWeight: "600",
      letterSpacing: "0.05em",
    },
    skillsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
      gap: "1rem",
    },
    skillCard: {
      background: "#fff",
      border: "1px solid #f0e4d0",
      borderRadius: "12px",
      padding: "1.2rem 1rem",
      textAlign: "center",
      boxShadow: "0 2px 10px rgba(100,60,20,0.06)",
      fontSize: "0.85rem",
      color: "#5a3520",
      fontWeight: "600",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    langGrid: {
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap",
    },
    langBadge: (color) => ({
      padding: "0.6rem 1.4rem",
      borderRadius: "25px",
      background: color + "22",
      border: `2px solid ${color}55`,
      color: color,
      fontWeight: "700",
      fontSize: "0.9rem",
      letterSpacing: "0.04em",
    }),
    achieveGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: "1rem",
    },
    achieveCard: {
      background: "linear-gradient(135deg, #fff, #fdf6ee)",
      border: "1px solid #e8d4bc",
      borderRadius: "12px",
      padding: "1.25rem 1.5rem",
      display: "flex",
      gap: "0.75rem",
      alignItems: "flex-start",
      boxShadow: "0 2px 10px rgba(100,60,20,0.05)",
    },
    achieveIcon: {
      fontSize: "1.4rem",
      flexShrink: 0,
      marginTop: "0.1rem",
    },
    achieveText: {
      fontSize: "0.88rem",
      color: "#4a3020",
      lineHeight: 1.5,
      fontWeight: "500",
    },
    hobbyRow: {
      display: "flex",
      gap: "1.5rem",
      flexWrap: "wrap",
    },
    hobbyCard: {
      background: "#fff",
      border: "1px solid #f0e4d0",
      borderRadius: "16px",
      padding: "1.5rem 2rem",
      textAlign: "center",
      boxShadow: "0 2px 12px rgba(100,60,20,0.07)",
      flex: "1",
      minWidth: "100px",
    },
    hobbyEmoji: {
      fontSize: "2.2rem",
      marginBottom: "0.5rem",
    },
    hobbyLabel: {
      fontSize: "0.85rem",
      fontWeight: "700",
      color: "#7a3b1e",
      letterSpacing: "0.05em",
    },
    contactSection: {
      background: "linear-gradient(135deg, #3d1f0e 0%, #6b3520 60%, #9c5a35 100%)",
      padding: "5rem 2rem",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    },
    contactOrb: {
      position: "absolute",
      width: "300px",
      height: "300px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(255,200,140,0.15) 0%, transparent 70%)",
      top: "-80px",
      right: "10%",
    },
    contactTitle: {
      fontFamily: "'Georgia', serif",
      fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
      fontWeight: "700",
      color: "#fff",
      margin: "0 0 0.5rem",
    },
    contactSub: {
      color: "rgba(255,220,190,0.8)",
      marginBottom: "2.5rem",
      fontSize: "1rem",
    },
    contactCards: {
      display: "flex",
      gap: "1.5rem",
      justifyContent: "center",
      flexWrap: "wrap",
      maxWidth: "600px",
      margin: "0 auto",
    },
    contactCard: {
      background: "rgba(255,255,255,0.12)",
      border: "1px solid rgba(255,255,255,0.25)",
      borderRadius: "14px",
      padding: "1.5rem 2rem",
      backdropFilter: "blur(10px)",
      flex: "1",
      minWidth: "180px",
      color: "#fff",
    },
    contactCardIcon: {
      fontSize: "1.6rem",
      marginBottom: "0.5rem",
    },
    contactCardLabel: {
      fontSize: "0.7rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: "rgba(255,220,180,0.7)",
      marginBottom: "0.3rem",
    },
    contactCardValue: {
      fontSize: "0.9rem",
      fontWeight: "600",
      wordBreak: "break-all",
    },
    footer: {
      background: "#2c1a0a",
      color: "rgba(255,220,180,0.5)",
      textAlign: "center",
      padding: "1.25rem",
      fontSize: "0.8rem",
    },
    hamburger: {
      display: "none",
      flexDirection: "column",
      gap: "5px",
      cursor: "pointer",
      background: "none",
      border: "none",
      padding: "4px",
    },
    hamburgerLine: {
      width: "22px",
      height: "2px",
      background: "#5a4030",
      borderRadius: "2px",
    },
    mobileMenu: {
      position: "fixed",
      top: "64px",
      left: 0,
      right: 0,
      background: "rgba(250,248,244,0.98)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid #e8dfc8",
      zIndex: 99,
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
  };

  const achieveIcons = ["🏅", "✍️", "⭐", "🎉"];

  return (
    <div style={styles.root}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
        }
        .skill-card:hover { transform: translateY(-4px) !important; box-shadow: 0 8px 24px rgba(100,60,20,0.12) !important; }
        .cta-btn-primary:hover { background: #f5e8d6 !important; }
        .cta-btn-secondary:hover { background: rgba(255,255,255,0.15) !important; }
        .scroll-dot {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          animation: bounce 1.8s infinite;
          color: rgba(255,240,220,0.6);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          cursor: pointer;
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        .sep-line {
          border: none;
          border-top: 1px solid #f0e4d0;
          margin: 3rem 0;
        }
      `}</style>

      {/* NAV */}
      <nav style={styles.nav}>
        <span style={styles.navBrand}>KB</span>
        <ul style={styles.navLinks} className="nav-links">
          {navLinks.map((l) => (
            <li key={l.id}>
              <button style={styles.navLink(activeSection === l.id)} onClick={() => scrollTo(l.id)}>
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <button style={{ ...styles.hamburger }} className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span style={styles.hamburgerLine} />
          <span style={styles.hamburgerLine} />
          <span style={styles.hamburgerLine} />
        </button>
      </nav>
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map((l) => (
            <button key={l.id} style={{ ...styles.navLink(activeSection === l.id), textAlign: "left", width: "100%" }} onClick={() => scrollTo(l.id)}>
              {l.label}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="hero" style={styles.hero}>
        <div style={styles.heroOrb1} />
        <div style={styles.heroOrb2} />
        <div style={styles.heroContent}>
          <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.1s forwards" }}>
            <div
              onClick={() => fileInputRef.current?.click()}
              title="Click to upload your photo"
              style={{
                ...styles.heroAvatar,
                cursor: "pointer",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {photo ? (
                <img src={photo} alt="Kanika Barman" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
              ) : (
                <span style={{ fontSize: "3rem" }}>👩‍🏫</span>
              )}
              {/* Hover overlay */}
              <div style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: "rgba(0,0,0,0.45)", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", opacity: 0,
                transition: "opacity 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0}
              >
                <span style={{ fontSize: "1.3rem" }}>📷</span>
                <span style={{ fontSize: "0.55rem", color: "#fff", letterSpacing: "0.08em", marginTop: "3px" }}>
                  {photo ? "CHANGE" : "ADD PHOTO"}
                </span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoUpload}
            />
          </div>
          <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.25s forwards" }}>
            <p style={styles.heroTitle}>{data.title}</p>
            <h1 style={styles.heroName}>{data.name}</h1>
            <p style={styles.heroLoc}>📍 {data.location}</p>
          </div>
          <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.4s forwards" }}>
            <div style={styles.heroBadges}>
              {["2 Years Experience", "Classes 1–5", "English • EVS • Writing"].map((b) => (
                <span key={b} style={styles.heroBadge}>{b}</span>
              ))}
            </div>
          </div>
          <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.55s forwards" }}>
            <div style={styles.heroCta}>
              <button className="cta-btn-primary" style={styles.ctaBtn(true)} onClick={() => scrollTo("contact")}>
                Get in Touch
              </button>
              <button className="cta-btn-secondary" style={styles.ctaBtn(false)} onClick={() => scrollTo("about")}>
                View Portfolio
              </button>
            </div>
          </div>
        </div>
        <div className="scroll-dot" onClick={() => scrollTo("about")}>
          <span>SCROLL</span>
          <span>▾</span>
        </div>
        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div style={styles.section}>
          <FadeIn>
            <p style={styles.sectionLabel}>Who I Am</p>
            <h2 style={styles.sectionTitle}>About Me</h2>
            <div style={styles.divider} />
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            <FadeIn delay={0.1}>
              <div style={styles.card}>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c8855a", marginBottom: "0.75rem" }}>Summary</p>
                <p style={{ lineHeight: 1.8, color: "#4a3020", fontSize: "0.95rem" }}>{data.summary}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={styles.card}>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c8855a", marginBottom: "0.75rem" }}>Career Objective</p>
                <p style={{ lineHeight: 1.8, color: "#4a3020", fontSize: "0.95rem" }}>{data.objective}</p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <p style={{ ...styles.sectionLabel, marginTop: "3rem" }}>Core Competencies</p>
            <h3 style={{ fontFamily: "'Georgia', serif", fontSize: "1.5rem", color: "#3d1f0e", marginBottom: "0" }}>Teaching Expertise</h3>
            <div style={styles.expertiseGrid}>
              {data.expertise.map((e, i) => (
                <div key={i} style={styles.expertiseItem}>
                  <span style={{ color: "#c8855a", fontSize: "0.9rem" }}>✦</span>
                  {e}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <hr className="sep-line" style={{ maxWidth: "1000px", margin: "0 auto" }} />

      {/* EXPERIENCE */}
      <section id="experience">
        <div style={styles.section}>
          <FadeIn>
            <p style={styles.sectionLabel}>Career</p>
            <h2 style={styles.sectionTitle}>Work Experience</h2>
            <div style={styles.divider} />
          </FadeIn>
          {data.experience.map((exp, i) => (
            <FadeIn key={i} delay={0.1}>
              <div style={styles.timelineItem}>
                <div style={styles.timelineDot} />
                <div style={styles.timelineLine} />
                <div style={styles.card}>
                  <h3 style={styles.expRole}>{exp.role}</h3>
                  <p style={styles.expOrg}>{exp.org}</p>
                  <p style={styles.expPeriod}>🗓 {exp.period}</p>
                  <span style={styles.expSubjects}>📚 Subjects: {exp.subjects}</span>
                  <ul style={styles.bulletList}>
                    {exp.points.map((pt, j) => (
                      <li key={j} style={styles.bullet}>
                        <span style={{ color: "#c8855a", fontSize: "0.7rem", marginTop: "0.35rem", flexShrink: 0 }}>◆</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <hr className="sep-line" style={{ maxWidth: "1000px", margin: "0 auto" }} />

      {/* EDUCATION */}
      <section id="education">
        <div style={styles.section}>
          <FadeIn>
            <p style={styles.sectionLabel}>Academic Background</p>
            <h2 style={styles.sectionTitle}>Education</h2>
            <div style={styles.divider} />
          </FadeIn>
          <div style={styles.eduGrid}>
            {data.education.map((e, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={styles.eduCard}>
                  <p style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>🎓</p>
                  <p style={styles.eduDeg}>{e.degree}</p>
                  <p style={styles.eduInst}>{e.inst}</p>
                  <p style={styles.eduYear}>{e.year}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <hr className="sep-line" style={{ maxWidth: "1000px", margin: "0 auto" }} />

      {/* SKILLS */}
      <section id="skills">
        <div style={styles.section}>
          <FadeIn>
            <p style={styles.sectionLabel}>Capabilities</p>
            <h2 style={styles.sectionTitle}>Skills & Languages</h2>
            <div style={styles.divider} />
          </FadeIn>

          <FadeIn delay={0.1}>
            <p style={{ fontFamily: "'Georgia', serif", fontSize: "1.1rem", fontWeight: "700", color: "#3d1f0e", marginBottom: "1.25rem" }}>
              Technical Skills
            </p>
            <div style={styles.skillsGrid}>
              {data.skills.map((s, i) => (
                <div key={i} className="skill-card" style={styles.skillCard}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>
                    {["📝", "📊", "📑", "💻", "🎥", "🖥", "🎨", "🛠"][i]}
                  </div>
                  {s}
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p style={{ fontFamily: "'Georgia', serif", fontSize: "1.1rem", fontWeight: "700", color: "#3d1f0e", margin: "3rem 0 1.25rem" }}>
              Languages Known
            </p>
            <div style={styles.langGrid}>
              {data.languages.map((l) => (
                <span key={l} style={styles.langBadge(langColors[l])}>{l}</span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p style={{ fontFamily: "'Georgia', serif", fontSize: "1.1rem", fontWeight: "700", color: "#3d1f0e", margin: "3rem 0 1.25rem" }}>
              Hobbies & Interests
            </p>
            <div style={styles.hobbyRow}>
              {data.hobbies.map((h) => (
                <div key={h} style={styles.hobbyCard}>
                  <div style={styles.hobbyEmoji}>{hobbyIcons[h]}</div>
                  <div style={styles.hobbyLabel}>{h}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <hr className="sep-line" style={{ maxWidth: "1000px", margin: "0 auto" }} />

      {/* ACHIEVEMENTS */}
      <section id="achievements">
        <div style={styles.section}>
          <FadeIn>
            <p style={styles.sectionLabel}>Recognition</p>
            <h2 style={styles.sectionTitle}>Achievements</h2>
            <div style={styles.divider} />
          </FadeIn>
          <div style={styles.achieveGrid}>
            {data.achievements.map((a, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={styles.achieveCard}>
                  <span style={styles.achieveIcon}>{achieveIcons[i]}</span>
                  <p style={styles.achieveText}>{a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={styles.contactSection}>
        <div style={styles.contactOrb} />
        <FadeIn>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,200,160,0.7)", marginBottom: "0.5rem" }}>
            Let's Connect
          </p>
          <h2 style={styles.contactTitle}>Get in Touch</h2>
          <p style={styles.contactSub}>I'd love to hear from schools and institutions.</p>
          <div style={styles.contactCards}>
            <div style={styles.contactCard}>
              <div style={styles.contactCardIcon}>📞</div>
              <p style={styles.contactCardLabel}>Phone</p>
              <p style={styles.contactCardValue}>{data.phone}</p>
            </div>
            <div style={styles.contactCard}>
              <div style={styles.contactCardIcon}>✉️</div>
              <p style={styles.contactCardLabel}>Email</p>
              <p style={styles.contactCardValue}>{data.email}</p>
            </div>
            <div style={styles.contactCard}>
              <div style={styles.contactCardIcon}>📍</div>
              <p style={styles.contactCardLabel}>Location</p>
              <p style={styles.contactCardValue}>Siliguri, West Bengal</p>
            </div>
          </div>
        </FadeIn>
      </section>

      <footer style={styles.footer}>
        © 2025 Kanika Barman · Primary Educator · Siliguri, West Bengal
      </footer>
    </div>
  );
}