// Year
document.getElementById('year').textContent = new Date().getFullYear();

// --- THEME TOGGLE ---
const toggle = document.getElementById('themeToggle');
const html = document.documentElement;

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

const saved = localStorage.getItem('theme');
if (saved) {
    setTheme(saved);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
}

toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

// --- LANGUAGE TOGGLE ---
const translations = {
    de: {
        "Web Design from Switzerland": "Web Design aus der Schweiz",
        "Websites That<br>Actually Work.": "Websites, die<br>wirklich funktionieren.",
        "Modern, fast, and built to convert. We create clean websites for businesses, coaches, and entrepreneurs — no templates, no fluff, just thoughtful design.": "Modern, schnell und konvertierungsstark. Wir erstellen saubere Websites für Unternehmen, Coaches und Unternehmer — keine Templates, kein Schnickschnack, nur durchdachtes Design.",
        "Get a Free Quote": "Kostenloses Angebot",
        "See How It Works": "So funktioniert's",
        "What We Build": "Was wir bauen",
        "Everything you need. Nothing you don't.": "Alles was du brauchst. Nichts was du nicht brauchst.",
        "Custom Websites": "Individuelle Websites",
        "Bespoke designs built from scratch. Your brand, your vision — no cookie-cutter templates.": "Maßgeschneiderte Designs von Grund auf. Deine Marke, deine Vision — keine Einheits-Templates.",
        "Responsive Design": "Responsive Design",
        "Looks perfect on every device — desktop, tablet, and mobile. Your customers expect it.": "Sieht auf jedem Gerät perfekt aus — Desktop, Tablet und Smartphone. Deine Kunden erwarten das.",
        "Fast & Optimized": "Schnell & Optimiert",
        "Lightweight code, optimized images, and blazing-fast load times. Google loves it too.": "Schlanker Code, optimierte Bilder und blitzschnelle Ladezeiten. Auch Google liebt das.",
        "SEO Ready": "SEO-fähig",
        "Proper meta tags, structured data, and semantic HTML — built to rank from day one.": "Richtige Meta-Tags, strukturierte Daten und semantisches HTML — von Tag eins für Rankings gebaut.",
        "Multilingual": "Mehrsprachig",
        "German, English, or both. Your audience speaks multiple languages — your site should too.": "Deutsch, Englisch oder beides. Deine Zielgruppe spricht mehrere Sprachen — deine Website auch.",
        "Maintenance & Updates": "Wartung & Updates",
        "We don't just build and disappear. Ongoing support, updates, and improvements available.": "Wir bauen nicht nur und verschwinden. Laufende Unterstützung, Updates und Verbesserungen.",
        "How It Works": "So funktioniert's",
        "Simple. Transparent. Fast.": "Einfach. Transparent. Schnell.",
        "Discovery Call": "Erstgespräch",
        "We hop on a quick call to understand your business, goals, and vision. No commitment — just a conversation.": "Wir führen ein kurzes Gespräch, um dein Unternehmen, deine Ziele und deine Vision zu verstehen. Ohne Verpflichtung — einfach ein Gespräch.",
        "Design & Build": "Design & Umsetzung",
        "We design and develop your site. You'll see progress along the way and can provide feedback at every stage.": "Wir designen und entwickeln deine Website. Du siehst den Fortschritt und kannst in jeder Phase Feedback geben.",
        "Launch": "Launch",
        "After your approval, we go live. Your site is deployed, tested, and ready for your customers.": "Nach deiner Freigabe gehen wir online. Deine Website ist deployt, getestet und bereit für deine Kunden.",
        "Grow": "Wachsen",
        "Need changes? New pages? A refresh? We're here to help your site evolve with your business.": "Änderungen nötig? Neue Seiten? Ein Refresh? Wir helfen deiner Website, mit deinem Unternehmen mitzuwachsen.",
        "Our Stack": "Unser Stack",
        "Clean technology. No bloated frameworks.": "Saubere Technologie. Keine aufgeblähten Frameworks.",
        "Simple Pricing": "Einfache Preise",
        "CHF 800 per page. 1 year of support included.": "CHF 800 pro Seite. 1 Jahr Support inklusive.",
        "Your Website": "Deine Website",
        "per page": "pro Seite",
        "Custom design from scratch": "Individuelles Design von Grund auf",
        "Responsive — looks great everywhere": "Responsive — sieht überall super aus",
        "1 year of support included": "1 Jahr Support inklusive",
        "NucciDesign is available by invitation only. Have an invite code?": "NucciDesign ist nur mit Einladung verfügbar. Hast du einen Einladungscode?",
        "No invite? Reach out at <a href=\"mailto:start@nuccidesign.ch\">start@nuccidesign.ch</a>": "Keine Einladung? Melde dich bei <a href=\"mailto:start@nuccidesign.ch\">start@nuccidesign.ch</a>",
        "Let's Build Something Great.": "Lass uns etwas Grossartiges bauen.",
        "Tell us about your project — we'll get back to you within 24 hours.": "Erzähl uns von deinem Projekt — wir melden uns innerhalb von 24 Stunden.",
        "Name": "Name",
        "E-Mail": "E-Mail",
        "Project Type": "Projekttyp",
        "Tell us about your project": "Erzähl uns von deinem Projekt",
        "Send Request": "Anfrage senden",
        "Invitation Code": "Einladungscode",
        "New Website": "Neue Website",
        "Redesign": "Redesign",
        "Other": "Anderes",
        "Thank you — we'll get back to you within 24 hours.": "Vielen Dank — wir melden uns innerhalb von 24 Stunden."
    }
};

let currentLang = localStorage.getItem('lang') || 'en';

function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n-en') || el.textContent.trim();
        if (lang === 'de' && translations.de[key]) {
            el.innerHTML = translations.de[key];
        } else {
            const fallback = el.getAttribute('data-i18n-en') || key;
            el.innerHTML = fallback;
        }
    });
    // Translate select options
    document.querySelectorAll('#project-type option[data-i18n]').forEach(opt => {
        const val = opt.value;
        if (lang === 'de' && translations.de[val]) {
            opt.textContent = translations.de[val];
        } else {
            opt.textContent = opt.getAttribute('data-i18n-en') || val;
        }
    });
}

// Store original English text (including HTML)
document.querySelectorAll('[data-i18n]').forEach(el => {
    el.setAttribute('data-i18n-en', el.innerHTML);
});

const langToggle = document.getElementById('langToggle');

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    applyTranslations(lang);
    if (lang === 'de') {
        langToggle.innerHTML = '<span style="font-weight:700;color:var(--color-accent)">DE</span> | EN';
    } else {
        langToggle.innerHTML = 'DE | <span style="font-weight:700;color:var(--color-accent)">EN</span>';
    }
}

setLang(currentLang);

langToggle.addEventListener('click', () => {
    setLang(currentLang === 'en' ? 'de' : 'en');
});

// --- HAMBURGER MENU ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

// --- FADE-UP ANIMATION ---
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// --- CONTACT FORM ---
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                form.style.display = 'none';
                formSuccess.style.display = 'block';
            }
        } catch (err) {
            window.location.href = 'mailto:start@nuccidesign.ch';
        }
    });
}
