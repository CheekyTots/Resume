"use client"

import { useState, useEffect } from "react"
import "./globals.css"
import {
  Github,
  Link,
  Mail,
  Brain,
  Sun,
  Moon,
  Linkedin,
  CloudRain,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Code,
  Play,
  Microscope,
  FlaskConical,
  Cpu,
  Zap,
} from "lucide-react"

const worldlines = [
  { name: "α", value: "1.130426", color: "#fbbf24" },
  { name: "β", value: "1.130745", color: "#67e8f9" },
  { name: "γ", value: "2.615897", color: "#f87171" },
  { name: "δ", value: "3.284759", color: "#c084fc" },
  { name: "ε", value: "4.591632", color: "#4ade80" },
]

const creativeProjects = [
  {
    title: "ASU at FAU Multimedia Committee: Ramen Social",
    subtitle: "Digital Content Creation • 2024",
    link: "https://www.canva.com/design/DAGdWUBT_d4/fIoJa5zXSpyZ9oc2q0l3vA/view?utm_content=DAGdWUBT_d4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hd7d7f13da5",
    description: "Promotional materials created for the Asian Student Union's Ramen Social fundraiser event.",
    images: [
      {
        src: "/images/1.png",
        alt: "Ramen Social Event Poster",
        caption: "Ramen Social Fundraiser Poster",
      },
      {
        src: "/images/2.png",
        alt: "Ramen Social Graphics",
        caption: "Event Graphics Package",
      },
    ],
  },
  {
    title: "ASU at FAU Multimedia Committee: Big & Little Recap",
    subtitle: "Digital Content Creation • 2024",
    link: "https://www.canva.com/design/DAGSYbdTdbs/EK_cylDbxcmlHwMVcqKdBg/watch?utm_content=DAGSYbdTdbs&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h7530ac378c",
    description: "Recap visuals and promotional content for the Asian Student Union's Big & Little event.",
    images: [
      {
        src: "/images/bandl_1.png",
        alt: "Big & Little Event Group Photo",
        caption: "Big & Little Recap Group Photo",
      },
      {
        src: "/images/bandl_2.png",
        alt: "Event Highlights",
        caption: "Event Highlights Reel",
      },
      {
        src: "/images/3.png",
        alt: "Social Media Graphics",
        caption: "Social Media Content",
      },
      {
        src: "/images/4.png",
        alt: "Event Collage",
        caption: "Memory Collage",
      },
      {
        src: "/images/5.png",
        alt: "Group Activities",
        caption: "Group Activities Documentation",
      },
      {
        src: "/images/6.png",
        alt: "Final Presentation",
        caption: "Final Event Presentation",
      },
      {
        src: "/images/7.png",
        alt: "Behind the Scenes",
        caption: "Behind the Scenes Content",
      },
    ],
  },
]

interface Quote {
  text: string
  author: string
}

interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
}

export default function Portfolio() {
  const [currentWorldline, setCurrentWorldline] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [typedText, setTypedText] = useState("")
  const [currentSlides, setCurrentSlides] = useState<{ [key: number]: number }>({})
  const [isLoading, setIsLoading] = useState(true)
  const [currentQuote, setCurrentQuote] = useState<Quote>({ text: "", author: "" })
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [animeRecommendation, setAnimeRecommendation] = useState<{
    title: string
    genre: string
    year: string
    description: string
  } | null>(null)

  const fullText = "Greetings, fellow lab members! I am a mad scientist."

  useEffect(() => {
    // Initialize slides
    const initialSlides: { [key: number]: number } = {}
    creativeProjects.forEach((_, index) => {
      initialSlides[index] = 0
    })
    setCurrentSlides(initialSlides)

    // Loading animation
    setTimeout(() => setIsLoading(false), 2000)

    // Fetch APIs
    fetchQuote()
    fetchWeather()
    fetchAnimeRecommendation()

    // Update quote every 30 seconds
    const quoteInterval = setInterval(fetchQuote, 30000)

    return () => {
      clearInterval(quoteInterval)
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      let i = 0
      const timer = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(fullText.slice(0, i + 1))
          i++
        } else {
          clearInterval(timer)
        }
      }, 50)
      return () => clearInterval(timer)
    }
  }, [isLoading])

  const fetchQuote = async () => {
    try {
      const response = await fetch("/api/quote")
      const data = await response.json()
      setCurrentQuote({ text: data.text, author: data.author })
    } catch (error) {
      console.error("Failed to fetch quote:", error)
      setCurrentQuote({
        text: "I think, therefore I am.",
        author: "René Descartes",
      })
    }
  }

  const fetchWeather = async () => {
    try {
      // Using OpenWeatherMap API (you'd need to replace with actual API key)
      // For now using mock data that simulates real API structure
      const mockWeather: WeatherData = {
        location: "Boca Raton, FL",
        temperature: Math.floor(Math.random() * 10) + 75,
        condition: ["Sunny", "Partly Cloudy", "Clear"][Math.floor(Math.random() * 3)],
        humidity: Math.floor(Math.random() * 20) + 60,
      }
      setWeather(mockWeather)
    } catch (error) {
      console.error("Failed to fetch weather:", error)
    }
  }

  const fetchAnimeRecommendation = async () => {
    try {
      // Using Jikan API for real anime data
      const response = await fetch("https://api.jikan.moe/v4/random/anime")
      const data = await response.json()
      const anime = data.data

      setAnimeRecommendation({
        title: anime.title,
        genre:
          anime.genres
            ?.slice(0, 2)
            .map((g: any) => g.name)
            .join(", ") || "Various",
        year: anime.year?.toString() || "Unknown",
        description: anime.synopsis?.slice(0, 150) + "..." || "No description available.",
      })
    } catch (error) {
      console.error("Failed to fetch anime recommendation:", error)
      // Fallback data
      const animeList = [
        {
          title: "Steins;Gate",
          genre: "Sci-Fi, Thriller",
          year: "2011",
          description: "A self-proclaimed mad scientist discovers time travel through microwaves.",
        },
        {
          title: "Death Note",
          genre: "Psychological, Supernatural",
          year: "2006",
          description: "A high school student gains the power to kill anyone by writing their name.",
        },
      ]
      const today = new Date().getDate()
      const dailyAnime = animeList[today % animeList.length]
      setAnimeRecommendation(dailyAnime)
    }
  }

  const shiftWorldline = () => {
    setIsGlitching(true)
    setTimeout(() => {
      setCurrentWorldline((prev) => (prev + 1) % worldlines.length)
      setIsGlitching(false)
    }, 500)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const nextSlide = (projectIndex: number) => {
    setCurrentSlides((prev) => ({
      ...prev,
      [projectIndex]: (prev[projectIndex] + 1) % creativeProjects[projectIndex].images.length,
    }))
  }

  const prevSlide = (projectIndex: number) => {
    setCurrentSlides((prev) => ({
      ...prev,
      [projectIndex]:
        prev[projectIndex] === 0 ? creativeProjects[projectIndex].images.length - 1 : prev[projectIndex] - 1,
    }))
  }

  if (isLoading) {
    return (
      <div className={`loading-screen ${isDarkMode ? "dark" : "light"}`}>
        <div className="loading-content">
          <div className="loading-logo">
            <span className="loading-triangle">▲</span>
            <span className="loading-text">FUTURE_GADGET_LAB</span>
          </div>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
          <div className="loading-status">INITIALIZING STEINS GATE PROTOCOL...</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`portfolio ${isDarkMode ? "dark" : "light"}`}>
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="lab-info">
            <span className="heartbeat">▲</span>
            <span className="lab-name">FUTURE_GADGET_LAB</span>
            <div className="status-box">
              <span className="status operational">OPERATIONAL</span>
            </div>
          </div>
          <div className="header-controls">
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              <span>{isDarkMode ? "LIGHT" : "DARK"}</span>
            </button>
            <div className="shift-button-container">
              <button className="shift-button" onClick={shiftWorldline}>
                SHIFT WORLDLINE
              </button>
            </div>
          </div>
        </div>
        <div className="divergence-meter">
          <span className="meter-label">DIVERGENCE METER</span>
          <span className="meter-value" style={{ color: worldlines[currentWorldline].color }}>
            {worldlines[currentWorldline].value}%
          </span>
          <span className="worldline">WORLDLINE: {worldlines[currentWorldline].name}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="subject-card">
          <div className="subject-header"> IDENTIFICATION</div>
          <h1 className={`subject-name ${isGlitching ? "glitching" : ""}`}>Eli Antoine</h1>
          <div className="subject-title">MAD SCIENTIST • LAB MEMBER 001</div>
        </div>

        <div className="terminal-section">
          <div className="terminal-line centered">
            <span className="prompt">&gt;</span>
            <span className="command">INITIALIZING ELI ANTOINE PROTOCOL...</span>
          </div>
          <div className="operation-line">
            <span className="operation-label">OPERATION:</span>
            <span className="operation-name">STEINS_GATE.exe</span>
          </div>
          <div className="bio-section">
            <p className="bio-text">
              Computer Science  & Biology Student @ FAU | Undergraduate Researcher | Intern @
              <br />
              <span className="organization">URIKABIOWORKS</span>
            </p>
            <div className="signature">
              <span className="prompt">&gt;</span>
              <span className="el-psy">El Psy Kongroo - The Mind Agrees!</span>
            </div>
          </div>
        </div>

        <div className="action-buttons">
  <a
    href="https://github.com/CheekyTots" // replace with actual GitHub URL
    target="_blank"
    rel="noopener noreferrer"
    className="action-btn github-btn"
  >
    <Github size={16} />
    <span>LAB_GITHUB</span>
  </a>

  <a
    href="https://www.linkedin.com/in/eli-antoine-753486226/" // replace with actual Network URL
    target="_blank"
    rel="noopener noreferrer"
    className="action-btn network-btn"
  >
    <Link size={16} />
    <span>NETWORK_LINK</span>
  </a>

  <a
    href="mailto:eliantelope03@gmail.com" // replace with actual email
    className="action-btn mail-btn"
  >
    <Mail size={16} />
    <span>D_MAIL</span>
  </a>
</div>


        {/* Status Section */}
        <div className="status-section">
          <div className="status-box-container microwave">
            <div className="status-label">MICROWAVE</div>
            <div className="status-value">OPERATIONAL</div>
          </div>
          <div className="status-box-container ibn">
            <div className="status-label">IBN 5100</div>
            <div className="status-value">STANDBY</div>
          </div>
          <div className="status-box-container phonewave">
            <div className="status-label">PHONEWAVE</div>
            <div className="status-value">READY</div>
          </div>
          <div className="status-box-container timeleap">
            <div className="status-label">TIME LEAP</div>
            <div className="status-value">CHARGING</div>
          </div>
        </div>

        {/* Section Separator */}
        <div className="section-separator"></div>

        {/* Profile Section */}
        <section className="content-section">
          <h2 className="section-title">LAB_MEMBER_001. PROFILE.dat</h2>
          <div className="profile-container">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="terminal-title">PERSONAL_LOG.txt</span>
              </div>
              <div className="terminal-content">
                <p className="terminal-text">
                  <span className="prompt">&gt;</span> <span className="typing-text">{typedText}</span>
                  <span className="cursor">|</span>
                </p>
                <p className="terminal-text">
                  <span className="prompt">&gt;</span> When I'm not shifting worldlines, you'll find me
                  experimenting with cutting-edge algorithms, building projects that solve real-world solutions,
                  engaging in research, and pursuing passion projects.
                </p>
                <div className="skills-tags">
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">SQL</span>
                  <span className="skill-tag">JavaScript</span>
                  <span className="skill-tag">C++</span>
                  <span className="skill-tag">ReactJS</span>
                  <span className="skill-tag">AWS</span>
                  <span className="skill-tag">Unity</span>
                  <span className="skill-tag">Windows</span>
                </div>
              </div>
            </div>
            <div className="lab-status">
              <h3 className="status-header">LAB_STATUS:</h3>
              <div className="status-items">
                <div className="card-bullet-item">Completing BS in Computer Science & Biological Science @ FAU</div>
                <div className="card-bullet-item">Incoming GME Master's Student @ UF</div>
                <div className="card-bullet-item">
                  <span className="highlight">Summer Intern @ URIKABIOWORKS</span>
                </div>
                <div className="card-bullet-item">
                  <span className="highlight">Building the future, one project at a time</span>
                </div>
              </div>
              <div className="current-experiment">
                <h4 className="experiment-header">CURRENT EXPERIMENT:</h4>
                <p className="experiment-text">Autonomous Robot- Developing robot using ESP32 that is able to basic tasks</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="section-separator"></div>

        {/* API Data Section */}
        <section className="content-section">
          <h2 className="section-title">LAB_SYSTEMS. STATUS.api</h2>
          <div className="api-grid">
            {/* Weather Data */}
            {weather && (
              <div className="api-card weather-card hoverable">
                <div className="api-header">
                  <CloudRain className="section-icon" size={20} />
                  <div>
                    <h3 className="api-title">LAB CONDITIONS</h3>
                    <p className="api-subtitle">{weather.location}</p>
                  </div>
                </div>
                <div className="api-content">
                  <div className="card-bullet-item">Temperature: {weather.temperature}°F</div>
                  <div className="card-bullet-item">Condition: {weather.condition}</div>
                  <div className="card-bullet-item">Humidity: {weather.humidity}%</div>
                  <div className="card-bullet-item">Status: Optimal for experiments</div>
                </div>
              </div>
            )}

            {/* Philosophical Quote */}
            <div className="api-card quote-card hoverable">
              <div className="api-header">
                <TrendingUp className="section-icon" size={20} />
                <div>
                  <h3 className="api-title">PHILOSOPHICAL WISDOM</h3>
                  <p className="api-subtitle">Daily Reflection</p>
                </div>
              </div>
              <div className="api-content">
                <div className="quote-text">"{currentQuote.text}"</div>
                <div className="quote-author">— {currentQuote.author}</div>
              </div>
            </div>

            {/* Anime Recommendation */}
            {animeRecommendation && (
              <div className="api-card anime-card hoverable">
                <div className="api-header">
                  <Brain className="section-icon" size={20} />
                  <div>
                    <h3 className="api-title">DAILY ANIME REC</h3>
                    <p className="api-subtitle">Lab Entertainment</p>
                  </div>
                </div>
                <div className="api-content">
                  <div className="card-bullet-item">Title: {animeRecommendation.title}</div>
                  <div className="card-bullet-item">Genre: {animeRecommendation.genre}</div>
                  <div className="card-bullet-item">Year: {animeRecommendation.year}</div>
                  <div className="card-bullet-item">Synopsis: {animeRecommendation.description}</div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Section Separator */}
        <div className="section-separator"></div>

        {/* Education Section */}
      <section className="content-section">
  <h2 className="section-title">EXPERIMENT_LOG. EDUCATION.db</h2>
  <div className="experience-list">
    <div className="experience-card hoverable">
              <div className="experience-header">
                <div className="company-info">
                  <Brain className="section-icon" size={20} />
                  <div>
            <h3 className="position-title">Bachelor of Science in Computer Science</h3>
            <p className="company-name">Florida Atlantic University</p>
                 </div>

                </div>
                <span className="status-badge tau-beta">TAU Beta Pi</span>
              </div>
              <ul className="experience-details">
                <li>
                  Introduction to Programming & Foundations of Computer Science
                </li>
                <li>
                  Data Structures and Algorithms & Design and Analysis of Algorithms
                </li>
                <li>
                  Principles of Software Engineering & Programming Languages & Web App Development & Full Stack Development & Operating Systems & Foundations of Cybersecurity
                  
                </li>
              </ul>
            </div>

    <div className="experience-card hoverable">
      <div className="experience-header">
        <div className="company-info">
          <Microscope className="section-icon" size={20} />
          <div>
            <h3 className="position-title">Bachelor of Science in Biological Science</h3>
            <p className="company-name">Florida Atlantic University</p>
          </div>
        </div>
        <span className="status-badge urise">URISE Scholar</span>
      </div>
      <ul className="experience-details">
        <li>Biodiversity, Biological Principles & Ecology</li>
        <li>General Chemistry 1 & 2, Organic Chemistry 1 & 2</li>
        <li>Biochemistry & Neurophysiology</li>
        <li>Grant Writing & Genetics</li>
        <li>Molecular Genetics of Aging</li>
      </ul>
    </div>

    <div className="experience-card hoverable">
      <div className="experience-header">
        <div className="company-info">
          <Zap className="section-icon" size={20} />
          <div>
            <h3 className="position-title">Minor in Cybersecurity</h3>
            <p className="company-name">Florida Atlantic University</p>
          </div>
        </div>
      </div>
      <ul className="experience-details">
        <li>Foundations of Cybersecurity</li>
        <li>Internet Computing</li>
        <li>Cryptography</li>
      </ul>
    </div>

    <div className="experience-card hoverable">
      <div className="experience-header">
        <div className="company-info">
          <FlaskConical className="section-icon" size={20} />
          <div>
            <h3 className="position-title">Undergraduate Research Certificate</h3>
            <p className="company-name">Florida Atlantic University</p>
          </div>
        </div>
      </div>
      <ul className="experience-details">
        <li>Extensive laboratory research experience</li>
        <li>Data analysis and scientific methodology</li>
        <li>Scientific communication and presentation</li>
        <li>Research ethics and integrity</li>
      </ul>
    </div>
  </div>
</section>



        {/* Section Separator */}
        <div className="section-separator"></div>

        {/* Work Experience Section */}
        <section className="content-section">
          <h2 className="section-title">INTERNSHIP_LOG. EXPERIENCE.json</h2>
          <div className="experience-list">
            <div className="experience-card hoverable">
              <div className="experience-header">
                <div className="company-info">
                  <Cpu className="section-icon" size={20} />
                  <div>
                    <h3 className="position-title">Summer Intern</h3>
                    <p className="company-name">URIKABIOWORKS | May 2025 - Present</p>
                  </div>
                </div>
                <span className="status-badge ongoing">ONGOING</span>
              </div>
              <ul className="experience-details">
                <li>
                  Replicated and optimized the PURE algorithm from R, integrating it with Urika's proprietary knowledge
                  graph for enhanced drug discovery insights.
                </li>
                <li>
                  Increased granularity of knowledge graph queries to precisely identify drug-gene upregulation and
                  downregulation for targeted therapeutic identification.
                </li>
                <li>
                  Developed computational pipelines leveraging the knowledge graph to uncover causal relationships
                  between drugs and gene expression.
                </li>
              </ul>
            </div>
            <div className="experience-card hoverable">
              <div className="experience-header">
                <div className="company-info">
                  <Brain className="section-icon" size={20} />
                  <div>
                    <h3 className="position-title">Summer Research Intern</h3>
                    <p className="company-name">Dr. Ted Dawson's Lab | May 2023 - Aug 2023</p>
                  </div>
                </div>
                <span className="status-badge completed">COMPLETED</span>
              </div>
              <ul className="experience-details">
                <li>
                 Conducted Parkinson's disease research, focusing on parthanatos pathway
                </li>
                <li>
                  Studied protein structure and aggregation of alpha-synuclein and amyloid beta
                </li>
                <li>
                  Investigated PAAN1B-1 enantiomers in inhibiting alpha-synuclein pathology
                </li>
              </ul>
             <div className="button-row">
  <a
  href="https://jmp.sh/9loxgxEs"
  target="_blank"
  rel="noopener noreferrer"
  className="future-btn demo-btn"
>
  
  Poster
</a>

  <button className="future-btn github-btn small-btn">
    
    Presented at JHU Symposium & Leadership Alliance Conference
  </button>
  <button className="future-btn link-btn">
    <Link size={16} />
    Article
  </button>
</div>

            </div>
             <div className="experience-card hoverable">
              <div className="experience-header">
                <div className="company-info">
                  <Brain className="section-icon" size={20} />
                  <div>
                    <h3 className="position-title">Summer Research Intern</h3>
                    <p className="company-name">Dr. Jason Chua Lab | May 2023 - Aug 2023</p>
                  </div>
                </div>
                <span className="status-badge completed">COMPLETED</span>
              </div>
              <ul className="experience-details">
                <li>
                  Cultured patient-derived iPSCs for neurological disease models                </li>
                <li>
                  Investigated cellular autophagy mechanisms in neuronal health
                </li>
                <li>
                  Performed quality control on stem cell cultures including mycoplasma testing
                </li>
              </ul>
            </div>
            
            <div className="experience-card hoverable">
              <div className="experience-header">
                <div className="company-info">
                  <Brain className="section-icon" size={20} />
                  <div>
                    <h3 className="position-title">Shadowing Experience</h3>
                    <p className="company-name">Interventional Pain and Wellness Center</p>
                  </div>
                </div>
                <span className="status-badge completed">COMPLETED</span>
              </div>
              <ul className="experience-details">
                <li>
                  Learned to accurately take and record patient vitals, ensuring reliable data for healthcare providers.
                </li>
                <li>
                  Gained proficiency in navigating the CareCloud database, including managing patient information and
                  scheduling.
                </li>
                <li>Prepared patient charts with thoroughness and accuracy to assist in streamlined patient care.</li>
                <li>
                  Developed strong interpersonal skills by interacting directly with patients, gathering essential
                  information on symptoms and pain levels.
                </li>
              </ul>
            </div>
            <div className="experience-card hoverable">
              <div className="experience-header">
                <div className="company-info">
                  <Brain className="section-icon" size={20} />
                  <div>
                    <h3 className="position-title">Shadowing Experience</h3>
                    <p className="company-name">John Hopkins Neurology Clinic - Dr. Jason Chua</p>
                  </div>
                </div>
                <span className="status-badge completed">COMPLETED</span>
              </div>
              <ul className="experience-details">
                <li>
                  Observed the neurologist's systematic approach to evaluating and diagnosing neurological conditions in
                  new patients.
                </li>
                <li>
                  Engaged in post-session discussions where I assessed my knowledge and provided insights on
                  neurological cases, fostering critical thinking.
                </li>
                <li>
                  Witnessed follow-up appointments with returning patients, learning to assess medication effectiveness
                  and monitor patient recovery.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="section-separator"></div>

        {/* Research Section */}
        <section className="content-section">
          <h2 className="section-title">RESEARCH_LOG. EXPERIMENTS.log</h2>
          <div className="research-grid">
            <div className="research-card hoverable">
              <div className="research-header">
                <FlaskConical className="section-icon" size={20} />
                <div>
                  <h3 className="research-title">Undergraduate Research Student</h3>
                  <p className="research-lab">Dr. Kevin Kang's Lab | January 2023 - 2025</p>
                </div>
              </div>
              <div className="research-content">
                <div className="card-bullet-item">
                  Conducted research in tissue and cell engineering using biomaterials
                </div>
                <div className="card-bullet-item">Developed novel biomaterials for tissue engineering applications</div>
                <div className="card-bullet-item">
                  Investigated biomaterial potential for cell proliferation and differentiation
                </div>
                <div className="card-bullet-item">
                  Studied biocompatibility and biodegradability in vitro and in vivo
                </div>
                <div className="card-bullet-item">Conducted esophageal cancer research using mouse models</div>
              </div>
            </div>
            <div className="research-card hoverable">
              <div className="research-header">
                <Brain className="section-icon" size={20} />
                <div>
                  <h3 className="research-title">Direct Independent Research</h3>
                  <p className="research-lab">Dr. Pipoly | January 2024 - May 2024 & January 2025 - May 2025</p>
                </div>
              </div>
              <div className="research-content">
                <div className="card-bullet-item">
                  Designed culturally responsive Urban STEM curriculum for grades 9-12
                </div>
                <div className="card-bullet-item">
                  Collaborated with multidisciplinary team to develop project-based learning materials
                </div>
                <div className="card-bullet-item">
                  Incorporated equity-focused strategies and differentiated instruction
                </div>
                <div className="card-bullet-item">
                  Ensured accessibility and fostered academic success in diverse learning environments
                </div>
              </div>
            </div>
            
            <div className="research-card hoverable">
              <div className="research-header">
                <Cpu className="section-icon" size={20} />
                <div>
                  <h3 className="research-title">Senior Engineering Research Project</h3>
                  <p className="research-lab">Dr. KwangSoo Yang | Aug 2024 - Apr 2025</p>
                </div>
              </div>
              <div className="research-content">
                <div className="card-bullet-item">
                  Developed autoencoder-based model for nanoparticle detection in microscope images
                </div>
                <div className="card-bullet-item">
                  Optimized image processing and CNN architecture for enhanced accuracy
                </div>
                <div className="card-bullet-item">
                  Achieved improved particle detection and size measurement precision
                </div>
                <a
  href="https://jmp.sh/iNx1l2oP"
  target="_blank"
  rel="noopener noreferrer"
  className="future-btn demo-btn"
>
  
  Poster
</a>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="section-separator"></div>

        {/* Creative Projects Section */}
        <section className="content-section">
          <h2 className="section-title">CREATIVE_EXPERIMENTS. ART.lab</h2>
          <div className="creative-grid">
            {creativeProjects.map((project, projectIndex) => (
              <div key={projectIndex} className="creative-card hoverable">
                <div className="creative-header">
                  <Brain className="section-icon" size={20} />
                  <div>
                    <h3 className="creative-title">{project.title}</h3>
                    <p className="creative-subtitle">{project.subtitle}</p>
                  </div>
                </div>
                <p className="creative-description">{project.description}</p>
                <div className="creative-showcase">
                  <div className="showcase-title">{project.title.split(": ")[1]} Graphics</div>
                  <div className="slideshow-container">
                    <button
                      className="slide-btn prev"
                      onClick={() => prevSlide(projectIndex)}
                      disabled={project.images.length <= 1}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <div className="image-placeholder">
                      {project.images[currentSlides[projectIndex] || 0].src === "placeholder" ? (
                        <span>Image Placeholder</span>
                      ) : (
                        <img
                          src={project.images[currentSlides[projectIndex] || 0].src}
                          alt={project.images[currentSlides[projectIndex] || 0].alt}
                        />
                      )}
                    </div>
                    <button
                      className="slide-btn next"
                      onClick={() => nextSlide(projectIndex)}
                      disabled={project.images.length <= 1}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="image-counter">
                    {(currentSlides[projectIndex] || 0) + 1} / {project.images.length} -{" "}
                    {project.images[currentSlides[projectIndex] || 0].caption}
                  </div>
                  <div className="slide-indicators">
                    {project.images.map((_, index) => (
                      <button
                        key={index}
                        className={`indicator ${index === (currentSlides[projectIndex] || 0) ? "active" : ""}`}
                        onClick={() => setCurrentSlides((prev) => ({ ...prev, [projectIndex]: index }))}
                      />
                    ))}
                  </div>
                </div>
                <a 
  href={project.link} 
  target="_blank" 
  rel="noopener noreferrer" 
  className="view-project-btn"
>
  <ExternalLink size={16} />
  View Project
</a>

              </div>
            ))}
          </div>
        </section>

        {/* Section Separator */}
        <div className="section-separator"></div>

        {/* Future Projects Section */}
        <section className="content-section">
          <h2 className="section-title">FUTURE_GADGETS. INVENTORY.exe</h2>
          <div className="future-projects">
            <div className="future-card hoverable">
              <div className="future-header">
                <Brain className="section-icon" size={24} />
                <h3 className="future-title">Future Gadget #XX: Template Project</h3>
              </div>
              <p className="future-description">A placeholder for your next world-changing invention.</p>
              <div className="api-content">
                <div className="card-bullet-item">Ready for your next groundbreaking project</div>
                <div className="card-bullet-item">Describe your innovative work here</div>
                <div className="card-bullet-item">List the technologies and frameworks used</div>
                <div className="card-bullet-item">Link to your code repository or live demo</div>
              </div>
              <div className="future-tags">
                <span className="future-tag placeholder">Placeholder</span>
                <span className="future-tag coming-soon">Coming Soon</span>
              </div>
              <div className="future-buttons">
                <button className="future-btn code-btn">
                  <Code size={16} />
                  Code
                </button>
                <button className="future-btn demo-btn">
                  <Play size={16} />
                  Live Demo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="section-separator"></div>

        {/* Contact Section */}
        <section className="content-section">
          <h2 className="section-title">CONTACT_PROTOCOL. D_MAIL.init()</h2>
          <div className="contact-container">
            <p className="contact-description">
              Ready to join the lab and change the world? Send a D-mail to coordinate our next experiment. El Psy
              Kongroo!
            </p>
            <div className="contact-terminal">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="terminal-title">D_MAIL_ADDRESSES.txt</span>
              </div>
              <div className="contact-content">
                <div className="contact-line">
                  <span className="contact-prompt">&gt;</span>
                  <span className="contact-label">EMAIL:</span>
                  <span className="contact-value">eantoine2021@fau.edu</span>
                </div>
                <div className="contact-line">
                  <span className="contact-prompt">&gt;</span>
                  <span className="contact-label">LINKEDIN:</span>
                  <span className="contact-value">www.linkedin.com/in/eli-antoine-753486226</span>
                </div>
                <div className="contact-line">
                  <span className="contact-prompt">&gt;</span>
                  <span className="contact-label">GITHUB:</span>
                  <span className="contact-value">https://github.com/CheekyTots</span>
                </div>
                <div className="contact-line">
                  <span className="contact-prompt">&gt;</span>
                  <span className="contact-label">STATUS:</span>
                  <span className="contact-value highlight">Available for world-changing opportunities</span>
                </div>
              </div>
            </div>
            <div className="contact-actions">
              <a href="mailto:eliantelope03@gmail.com">
                <button className="contact-btn email-btn">
                <Mail size={16} />
                <span>SEND D-MAIL</span>
              </button>
              </a>
              <a href="www.linkedin.com/in/eli-antoine-753486226">
                <button className="contact-btn linkedin-btn">
                <Linkedin size={16} />
                <span>CONNECT</span>
              </button>
              </a>
              <a href="https://github.com/CheekyTots">
                <button className="contact-btn github-btn">
                <Github size={16} />
                <span>VIEW CODE</span>
              </button>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p className="footer-text">
              © 2024 FUTURE GADGET LABORATORY • Built with React & TypeScript • Powered by mad science
            </p>
            <p className="footer-subtext">Lab uptime: ∞ • Last worldline shift: 7/17/2025 • El Psy Kongroo</p>
            <p className="footer-quote">
              "The universe has a beginning, but no end. Stars, too, have their own beginnings, but their own power
              results in their destruction. — Finite."
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
