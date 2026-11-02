import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { changeLanguage } from '@/components/i18n/changeLanguage'
import AnimatedBorder from '@/components/portfolio/AnimatedBorder'
import BlurText from '@/components/portfolio/BlurText'
import CountUp from '@/components/portfolio/CountUp'
import SpotlightCard from '@/components/portfolio/SpotlightCard'
import FlexCarousel from '@/components/react-bits/FlexCarousel'
import GridScanBackground from '@/components/react-bits/GridScan'
import { isLanguage } from '@/types/Languages'

const copy = {
  ru: {
    nav: ['Обо мне', 'Проекты', 'Навыки'],
    availability: 'ОТКРЫТ К НОВЫМ ИДЕЯМ',
    eyebrow: 'ПОРТФОЛИО · 2026',
    heading: 'Моделирую идеи. Создаю цифровые решения.',
    intro:
      'Я Ариман Ахметов — студент ВКТУ, изучаю математическое и компьютерное моделирование. Соединяю математику, код и любопытство, чтобы разбираться в сложных системах.',
    projectsButton: 'Смотреть проекты',
    aboutButton: 'Обо мне',
    degree: '4 курс · ВКТУ',
    degreeNote: 'Математическое и компьютерное моделирование',
    sectionLabel: 'ИЗ УЧЁБЫ В ПРАКТИКУ',
    projectsTitle: 'Проекты-концепты',
    projectsNote:
      'Учебные идеи, которые показывают мой подход к моделированию.',
    projects: [
      {
        title: 'Городской поток',
        type: 'СИСТЕМНОЕ МОДЕЛИРОВАНИЕ',
        description:
          'Концепт модели транспортных потоков: сценарии загруженности, узкие места и сравнение вариантов светофорного управления.',
        tags: ['Python', 'Моделирование', 'Данные'],
      },
      {
        title: 'Численная лаборатория',
        type: 'ВЫЧИСЛИТЕЛЬНАЯ МАТЕМАТИКА',
        description:
          'Интерактивный набор экспериментов с численными методами для исследования устойчивости и точности решений.',
        tags: ['Численные методы', 'Визуализация', 'Математика'],
      },
      {
        title: 'ЭкоБаланс',
        type: 'КОМПЬЮТЕРНЫЕ МОДЕЛИ',
        description:
          'Учебный прототип модели городского энергопотребления с параметрами, графиками и несколькими сценариями развития.',
        tags: ['Системная динамика', 'Анализ', 'Прототип'],
      },
    ],
    stack: 'МОИ ИНСТРУМЕНТЫ',
    stackTitle: 'Математика встречается с кодом',
    stackText:
      'Мой фокус — понимать систему целиком: от постановки задачи и допущений до вычислений и ясного представления результата.',
    skills: [
      'Математическое моделирование',
      'Численные методы',
      'Python и анализ данных',
      'Визуализация результатов',
    ],
    contact: 'ЕСТЬ ИДЕЯ?',
    contactTitle: 'Давайте обсудим, что можно смоделировать.',
    contactText:
      'Открыт к учебным коллаборациям, исследовательским задачам и интересным стажировкам.',
    contactButton: 'Написать мне',
    footer:
      'Учебное портфолио · Восточно-Казахстанский технический университет',
  },
  kk: {
    nav: ['Мен туралы', 'Жобалар', 'Дағдылар'],
    availability: 'ЖАҢА ИДЕЯЛАРҒА ДАЙЫН',
    eyebrow: 'ПОРТФОЛИО · 2026',
    heading: 'Идеяларды модельдеймін. Цифрлық шешімдер жасаймын.',
    intro:
      'Мен — Ариман Ахметов, ШҚТУ студентімін. Математикалық және компьютерлік модельдеуді оқимын. Күрделі жүйелерді түсіну үшін математика, код және ізденісті біріктіремін.',
    projectsButton: 'Жобаларды көру',
    aboutButton: 'Мен туралы',
    degree: '4 курс · ШҚТУ',
    degreeNote: 'Математикалық және компьютерлік модельдеу',
    sectionLabel: 'ОҚУДАН ТӘЖІРИБЕГЕ',
    projectsTitle: 'Жоба тұжырымдамалары',
    projectsNote: 'Модельдеуге деген көзқарасымды көрсететін оқу идеялары.',
    projects: [
      {
        title: 'Қала ағыны',
        type: 'ЖҮЙЕЛЕРДІ МОДЕЛЬДЕУ',
        description:
          'Көлік ағыны моделінің тұжырымдамасы: жүктеме сценарийлері, тар орындар және бағдаршамды басқару нұсқаларын салыстыру.',
        tags: ['Python', 'Модельдеу', 'Деректер'],
      },
      {
        title: 'Сандық зертхана',
        type: 'ЕСЕПТЕУ МАТЕМАТИКАСЫ',
        description:
          'Шешімдердің тұрақтылығы мен дәлдігін зерттеуге арналған сандық әдістердің интерактивті тәжірибелері.',
        tags: ['Сандық әдістер', 'Визуализация', 'Математика'],
      },
      {
        title: 'ЭкоТеңгерім',
        type: 'КОМПЬЮТЕРЛІК МОДЕЛЬДЕР',
        description:
          'Параметрлері, графиктері және даму сценарийлері бар қалалық энергия тұтыну моделінің оқу прототипі.',
        tags: ['Жүйелік динамика', 'Талдау', 'Прототип'],
      },
    ],
    stack: 'ҚҰРАЛДАРЫМ',
    stackTitle: 'Математика кодпен тоғысады',
    stackText:
      'Мәселені қою мен болжамдардан бастап есептеу мен нәтижені түсінікті көрсетуге дейін жүйені тұтас түсінуге ұмтыламын.',
    skills: [
      'Математикалық модельдеу',
      'Сандық әдістер',
      'Python және деректерді талдау',
      'Нәтижелерді визуализациялау',
    ],
    contact: 'ИДЕЯҢЫЗ БАР МА?',
    contactTitle: 'Нені модельдеуге болатынын бірге талқылайық.',
    contactText:
      'Оқу жобаларына, зерттеу міндеттеріне және қызықты тағылымдамаларға ашықпын.',
    contactButton: 'Хат жазу',
    footer: 'Оқу портфолиосы · Шығыс Қазақстан техникалық университеті',
  },
  en: {
    nav: ['About', 'Projects', 'Skills'],
    availability: 'OPEN TO NEW IDEAS',
    eyebrow: 'PORTFOLIO · 2026',
    heading: 'I model ideas. I build digital solutions.',
    intro:
      'I’m Ariman Akhmetov, a fourth-year student at EKTU studying mathematical and computer modeling. I bring together mathematics, code, and curiosity to make complex systems easier to understand.',
    projectsButton: 'Explore projects',
    aboutButton: 'About me',
    degree: 'Year 4 · EKTU',
    degreeNote: 'Mathematical and computer modeling',
    sectionLabel: 'FROM STUDY TO PRACTICE',
    projectsTitle: 'Project concepts',
    projectsNote: 'Learning concepts that show how I approach modeling.',
    projects: [
      {
        title: 'Urban Flow',
        type: 'SYSTEMS MODELING',
        description:
          'A traffic flow modeling concept with congestion scenarios, bottlenecks, and signal control strategies to compare.',
        tags: ['Python', 'Modeling', 'Data'],
      },
      {
        title: 'Numerical Lab',
        type: 'COMPUTATIONAL MATHEMATICS',
        description:
          'Interactive experiments with numerical methods to explore the stability and accuracy of solutions.',
        tags: ['Numerical methods', 'Visualization', 'Math'],
      },
      {
        title: 'EcoBalance',
        type: 'COMPUTER MODELS',
        description:
          'A learning prototype of urban energy use, with adjustable parameters, charts, and alternative scenarios.',
        tags: ['System dynamics', 'Analysis', 'Prototype'],
      },
    ],
    stack: 'MY TOOLKIT',
    stackTitle: 'Where mathematics meets code',
    stackText:
      'I focus on understanding the whole system: from framing the question and its assumptions to computation and clear presentation of results.',
    skills: [
      'Mathematical modeling',
      'Numerical methods',
      'Python and data analysis',
      'Results visualization',
    ],
    contact: 'HAVE AN IDEA?',
    contactTitle: 'Let’s talk about what we can model.',
    contactText:
      'Open to student collaborations, research problems, and interesting internships.',
    contactButton: 'Get in touch',
    footer: 'Student portfolio · East Kazakhstan Technical University',
  },
} as const

const projectImages = [
  {
    src: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=85',
    alt: 'City lights viewed from above',
  },
  {
    src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=85',
    alt: 'Abstract mathematical visualization',
  },
  {
    src: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=85',
    alt: 'Renewable energy landscape',
  },
]
const sumSymbol = '∑'

const Landing = () => {
  const { i18n } = useTranslation()
  const [activeProject, setActiveProject] = useState(0)
  const detectedLanguage = (i18n.resolvedLanguage ?? 'ru').split('-')[0] ?? 'ru'
  const language = isLanguage(detectedLanguage) ? detectedLanguage : 'ru'
  const content = copy[language]
  const projects = useMemo(
    () =>
      content.projects.map((project, index) => ({
        ...project,
        ...projectImages[index],
      })),
    [content.projects]
  )

  return (
    <main className="portfolio-page">
      <div className="portfolio-backdrop" aria-hidden="true">
        <GridScanBackground
          className="h-full w-full"
          linesColor="#52604d"
          scanColor="#c6f36a"
          cells={8}
          depth={2.8}
          depthFade={0.8}
          parallax={0.16}
          shading={0.5}
          scanDuration={5.5}
          scanDelay={1.4}
          glow={0.7}
          autoScan
          interactive
          clickEffect="ping"
        />
      </div>
      <header className="portfolio-header">
        <a className="portfolio-mark" href="#home" aria-label="Ariman Akhmetov">
          {'AA'}
          <span>{'.'}</span>
        </a>
        <nav aria-label="Portfolio navigation">
          {content.nav.map((item, index) => (
            <a key={item} href={['#about', '#projects', '#skills'][index]}>
              {item}
            </a>
          ))}
        </nav>
        <div className="portfolio-languages" aria-label="Language selector">
          {(['ru', 'kk', 'en'] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              className={language === lang ? 'active' : ''}
              onClick={() => changeLanguage(i18n, lang)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <section className="portfolio-hero" id="home">
        <div className="portfolio-hero-copy">
          <div className="portfolio-availability">
            <i />
            {content.availability}
          </div>
          <p className="portfolio-eyebrow">
            {content.eyebrow} <span>{'↗ ӨСКЕМЕН / ÖSKEMEN'}</span>
          </p>
          <h1>
            <BlurText>{content.heading}</BlurText>
          </h1>
          <p className="portfolio-intro">{content.intro}</p>
          <div className="portfolio-actions">
            <a className="portfolio-primary-button" href="#projects">
              {content.projectsButton}
              <span>{'↘'}</span>
            </a>
            <a className="portfolio-text-button" href="#about">
              {content.aboutButton}
              <span>{'↗'}</span>
            </a>
          </div>
          <div className="portfolio-stats">
            <CountUp value="04" label={content.degree} />
            <CountUp value="M × C" label={content.degreeNote} />
          </div>
        </div>
        <div
          className="portfolio-orbit"
          aria-label="Mathematical model visualization"
        >
          <div className="orbit-ring orbit-ring-one" />
          <div className="orbit-ring orbit-ring-two" />
          <div className="orbit-core">
            <span>{sumSymbol}</span>
            <small>{'f(x) → model'}</small>
          </div>
          <span className="orbit-label orbit-label-one">{'DATA / 01'}</span>
          <span className="orbit-label orbit-label-two">{'MATH / 02'}</span>
          <span className="orbit-coordinate">
            {'49° 57′ N'}
            <br />
            {'82° 36′ E'}
          </span>
        </div>
        <span className="portfolio-scroll">
          {'SCROLL TO EXPLORE'} <span>{'↓'}</span>
        </span>
      </section>

      <section className="portfolio-section portfolio-projects" id="projects">
        <div className="portfolio-section-heading">
          <div>
            <p className="portfolio-eyebrow">{content.sectionLabel}</p>
            <h2>{content.projectsTitle}</h2>
            <p>{content.projectsNote}</p>
          </div>
          <span className="portfolio-index">{'01 — 03'}</span>
        </div>
        <div className="portfolio-project-layout">
          <div className="portfolio-carousel">
            <FlexCarousel
              items={projects}
              cardHeight={0.64}
              fit="landscape"
              preset="ribbon"
              intro="rise"
              autoplay
              interval={6200}
              captions
              onChange={(index) => setActiveProject(index)}
            />
          </div>
          <SpotlightCard className="portfolio-project-card">
            <div className="portfolio-project-number">
              {'0'}
              {activeProject + 1} <span>{'/ 03'}</span>
            </div>
            <p className="portfolio-project-type">
              {content.projects[activeProject]?.type}
            </p>
            <h3>{content.projects[activeProject]?.title}</h3>
            <p className="portfolio-project-description">
              {content.projects[activeProject]?.description}
            </p>
            <div className="portfolio-tags">
              {content.projects[activeProject]?.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="portfolio-project-dots">
              {content.projects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  aria-label={`Project ${index + 1}`}
                  className={index === activeProject ? 'active' : ''}
                  onClick={() => setActiveProject(index)}
                />
              ))}
            </div>
          </SpotlightCard>
        </div>
        <div className="portfolio-concept-note">
          {language === 'ru'
            ? 'КОНЦЕПТЫ УЧЕБНЫХ ПРОЕКТОВ · НЕ ЗАВЕРШЁННЫЕ КЕЙСЫ'
            : language === 'kk'
              ? 'ОҚУ ЖОБАЛАРЫНЫҢ ТҰЖЫРЫМДАМАЛАРЫ · АЯҚТАЛҒАН ЖҰМЫСТАР ЕМЕС'
              : 'STUDENT PROJECT CONCEPTS · NOT COMPLETED CASE STUDIES'}
        </div>
      </section>

      <section className="portfolio-section portfolio-skills" id="skills">
        <div className="portfolio-skill-intro" id="about">
          <p className="portfolio-eyebrow">{content.stack}</p>
          <h2>{content.stackTitle}</h2>
          <p>{content.stackText}</p>
        </div>
        <AnimatedBorder>
          <div className="portfolio-skill-list">
            {content.skills.map((skill, index) => (
              <div key={skill}>
                <span>{`0${index + 1}`}</span>
                <strong>{skill}</strong>
                <b>{'↗'}</b>
              </div>
            ))}
          </div>
        </AnimatedBorder>
      </section>

      <section className="portfolio-contact">
        <div>
          <p className="portfolio-eyebrow">{content.contact}</p>
          <h2>{content.contactTitle}</h2>
          <p>{content.contactText}</p>
        </div>
        <a href="mailto:">
          {content.contactButton}
          <span>{'↗'}</span>
        </a>
        <small>{'MAIL / LET’S CONNECT'}</small>
      </section>
      <footer className="portfolio-footer">
        <a href="#home">
          {'AA'}
          <span>{'.'}</span>
        </a>
        <p>{content.footer}</p>
        <span>{'© 2026'}</span>
      </footer>
    </main>
  )
}

export default Landing