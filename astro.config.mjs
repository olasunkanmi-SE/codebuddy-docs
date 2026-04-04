// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightBlog from "starlight-blog";
import sitemap from "@astrojs/sitemap";
import VitePWA from "@vite-pwa/astro";
import { remarkMermaid } from "./src/plugins/remark-mermaid.mjs";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://codebuddy-docs.vercel.app/",
  adapter: vercel(),
  markdown: {
    remarkPlugins: [remarkMermaid],
  },
  integrations: [
    sitemap(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "CodeBuddy Documentation",
        short_name: "CodeBuddy Docs",
        description: "Documentation for CodeBuddy, the autonomous AI software engineer.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "favicon.svg",
            sizes: "192x192",
            type: "image/svg+xml",
          },
          {
            src: "favicon.svg",
            sizes: "512x512",
            type: "image/svg+xml",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,jpg,jpeg,gif,webp,woff,woff2}"],
      },
    }),
    starlight({
      title: "CodeBuddy",
      defaultLocale: "root",
      locales: {
        root: { label: "English", lang: "en" },
        es: { label: "Español", lang: "es" },
        fr: { label: "Français", lang: "fr" },
        de: { label: "Deutsch", lang: "de" },
        ja: { label: "日本語", lang: "ja" },
        zh: { label: "简体中文", lang: "zh-CN" },
        yo: { label: "Yorùbá", lang: "yo" },
      },
      head: [
        /* ── Preconnect hints ── */
        { tag: "link", attrs: { rel: "preconnect", href: "https://cdn.jsdelivr.net", crossorigin: true } },
        { tag: "link", attrs: { rel: "dns-prefetch", href: "https://cdn.jsdelivr.net" } },
        /* ── RSS discovery ── */
        {
          tag: "link",
          attrs: { rel: "alternate", type: "application/rss+xml", title: "CodeBuddy Blog", href: "/blog/rss.xml" },
        },
        /* ── Analytics (Plausible — privacy-friendly, no cookies) ── */
        { tag: "script", attrs: { defer: true, "data-domain": "codebuddy-docs.vercel.app", src: "https://plausible.io/js/script.js" } },
        /* ── Open Graph ── */
        { tag: "meta", attrs: { property: "og:site_name", content: "CodeBuddy" } },
        { tag: "meta", attrs: { property: "og:type", content: "website" } },
        { tag: "meta", attrs: { property: "og:image", content: "https://codebuddy-docs.vercel.app/og-image.png" } },
        { tag: "meta", attrs: { property: "og:image:width", content: "1200" } },
        { tag: "meta", attrs: { property: "og:image:height", content: "630" } },
        {
          tag: "meta",
          attrs: { property: "og:image:alt", content: "CodeBuddy — The autonomous AI software engineer for your IDE" },
        },
        /* ── Author ── */
        { tag: "meta", attrs: { name: "author", content: "Oyinlola Olasunkanmi Raymond" } },
        { tag: "meta", attrs: { name: "keywords", content: "AI coding assistant, autonomous AI software engineer, VS Code extension, open source AI agent, LangChain Deep Agents, coding agent, autonomous software engineer" } },
        { tag: "link", attrs: { rel: "author", href: "https://github.com/olasunkanmi-SE" } },
        /* ── Twitter Card ── */
        { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
        { tag: "meta", attrs: { name: "twitter:image", content: "https://codebuddy-docs.vercel.app/og-image.png" } },
        { tag: "meta", attrs: { name: "twitter:creator", content: "@kosemani1" } },
        { tag: "meta", attrs: { name: "twitter:site", content: "@kosemani1" } },
        /* ── JSON-LD Structured Data ── */
        {
          tag: "script",
          attrs: { type: "application/ld+json" },
          content: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "CodeBuddy",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Windows, macOS, Linux",
            description:
              "The autonomous AI software engineer for VS Code, Cursor, Windsurf, and VSCodium. Multi-agent architecture, 27+ tools, local model support, and enterprise-grade security.",
            url: "https://codebuddy-docs.vercel.app/",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            softwareHelp: { "@type": "WebPage", url: "https://codebuddy-docs.vercel.app/getting-started/overview/" },
            author: {
              "@type": "Person",
              name: "Oyinlola Olasunkanmi Raymond",
              url: "https://olasunkanmi.app",
              sameAs: [
                "https://github.com/olasunkanmi-SE",
                "https://www.linkedin.com/in/oyinlola-olasunkanmi-raymond-71b6b8aa/",
                "https://twitter.com/kosemani1",
              ],
              jobTitle: "Software Engineer",
              worksFor: { "@type": "Organization", name: "Carsome" },
            },
            creator: {
              "@type": "Person",
              name: "Oyinlola Olasunkanmi Raymond",
              url: "https://olasunkanmi.app",
            },
          }),
        },
        /* ── JSON-LD Person (creator) for Google Knowledge Panel ── */
        {
          tag: "script",
          attrs: { type: "application/ld+json" },
          content: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Oyinlola Olasunkanmi Raymond",
            url: "https://olasunkanmi.app",
            jobTitle: "Software Engineer",
            worksFor: { "@type": "Organization", name: "Carsome" },
            sameAs: [
              "https://github.com/olasunkanmi-SE",
              "https://www.linkedin.com/in/oyinlola-olasunkanmi-raymond-71b6b8aa/",
              "https://twitter.com/kosemani1",
            ],
            knowsAbout: ["TypeScript", "Node.js", "AI", "LangChain", "LangGraph", "Software Architecture"],
            makesOffer: {
              "@type": "SoftwareApplication",
              name: "CodeBuddy",
              url: "https://codebuddy-docs.vercel.app/",
            },
          }),
        },
        /* ── Site-wide JSON-LD WebSite for Google Sitelinks Search Box ── */
        {
          tag: "script",
          attrs: { type: "application/ld+json" },
          content: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "CodeBuddy Documentation",
            url: "https://codebuddy-docs.vercel.app/",
            author: {
              "@type": "Person",
              name: "Oyinlola Olasunkanmi Raymond",
              url: "https://olasunkanmi.app",
            },
          }),
        },
        /* ── Mermaid JS ── */
        {
          tag: "script",
          attrs: {
            type: "module",
          },
          content: `
						import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

						function getTheme() {
							return document.documentElement.dataset.theme === 'light' ? 'default' : 'dark';
						}

						mermaid.initialize({ startOnLoad: false, theme: getTheme() });

						let currentScale = 1;
						const MIN_SCALE = 0.5;
						const MAX_SCALE = 10;
						const SCALE_STEP = 0.25;

						const IC = {
							zoomIn: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>',
							zoomOut: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>',
							reset: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
							close: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
						};

						/* Store original diagram source so we can re-render on theme change */
						const diagramSources = new Map();

						function openOverlay(mermaidEl) {
							const svg = mermaidEl.querySelector('svg');
							if (!svg) return;

							const overlay = document.createElement('div');
							overlay.className = 'mermaid-overlay';

							const toolbar = document.createElement('div');
							toolbar.className = 'mermaid-toolbar';
							toolbar.innerHTML =
								'<div class="tb-group">'
								+ '<button data-action="zoom-out" title="Zoom out (−)">' + IC.zoomOut + '</button>'
								+ '<span class="zoom-level">Fit</span>'
								+ '<button data-action="zoom-in" title="Zoom in (+)">' + IC.zoomIn + '</button>'
								+ '</div>'
								+ '<span class="tb-sep"></span>'
								+ '<button data-action="reset" title="Fit to screen (0)">' + IC.reset + '</button>'
								+ '<span class="tb-sep"></span>'
								+ '<button data-action="close" title="Close (Esc)">' + IC.close + '</button>';

							const content = document.createElement('div');
							content.className = 'mermaid-overlay-content';
							const wrapper = document.createElement('div');
							wrapper.className = 'mermaid-overlay-wrapper';
							const clonedSvg = svg.cloneNode(true);
							wrapper.appendChild(clonedSvg);
							content.appendChild(wrapper);

							overlay.appendChild(toolbar);
							overlay.appendChild(content);
							document.body.appendChild(overlay);
							document.body.style.overflow = 'hidden';

							/* Get the SVG's intrinsic (original) size from its viewBox or attributes */
							const vb = clonedSvg.getAttribute('viewBox');
							let intrW, intrH;
							if (vb) {
								const parts = vb.split(/[\\s,]+/).map(Number);
								intrW = parts[2];
								intrH = parts[3];
							} else {
								intrW = parseFloat(clonedSvg.getAttribute('width')) || clonedSvg.getBoundingClientRect().width;
								intrH = parseFloat(clonedSvg.getAttribute('height')) || clonedSvg.getBoundingClientRect().height;
							}

							/* Ensure the SVG has a viewBox so it scales cleanly */
							if (!vb) {
								clonedSvg.setAttribute('viewBox', '0 0 ' + intrW + ' ' + intrH);
							}
							clonedSvg.removeAttribute('width');
							clonedSvg.removeAttribute('height');
							clonedSvg.removeAttribute('style');
							clonedSvg.style.display = 'block';

							/* Compute the "fit" size: scale SVG to fill available viewport with padding */
							const PAD = 40;
							const toolbarH = 52;
							const availW = window.innerWidth - PAD * 2;
							const availH = window.innerHeight - toolbarH - PAD * 2;
							const fitScale = Math.min(availW / intrW, availH / intrH);
							const fitW = intrW * fitScale;
							const fitH = intrH * fitScale;

							/* Scale=1 means "fit to viewport". >1 zooms in from there. */
							currentScale = 1;
							clonedSvg.style.width = fitW + 'px';
							clonedSvg.style.height = fitH + 'px';

							requestAnimationFrame(() => overlay.classList.add('active'));

							const zoomLabel = toolbar.querySelector('.zoom-level');

							function applyZoom() {
								const w = fitW * currentScale;
								const h = fitH * currentScale;
								clonedSvg.style.width = w + 'px';
								clonedSvg.style.height = h + 'px';
								if (currentScale === 1) {
									zoomLabel.textContent = 'Fit';
								} else {
									zoomLabel.textContent = Math.round(currentScale * 100) + '%';
								}
							}

							function closeOverlay() {
								overlay.classList.remove('active');
								setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 250);
								document.removeEventListener('keydown', onKey);
								document.removeEventListener('mousemove', onPointerMove);
								document.removeEventListener('mouseup', onPointerUp);
								document.removeEventListener('touchmove', onPointerMove);
								document.removeEventListener('touchend', onPointerUp);
							}

							toolbar.addEventListener('click', (e) => {
								const btn = e.target.closest('button');
								if (!btn) return;
								const action = btn.dataset.action;
								if (action === 'zoom-in') currentScale = Math.min(MAX_SCALE, currentScale + SCALE_STEP);
								else if (action === 'zoom-out') currentScale = Math.max(MIN_SCALE, currentScale - SCALE_STEP);
								else if (action === 'reset') currentScale = 1;
								else if (action === 'close') { closeOverlay(); return; }
								applyZoom();
							});

							/* --- Drag-to-pan --- */
							let isDragging = false;
							let dragStartX = 0, dragStartY = 0;
							let scrollStartX = 0, scrollStartY = 0;
							let hasDragged = false;

							function onPointerDown(e) {
								if (e.button && e.button !== 0) return;
								isDragging = true;
								hasDragged = false;
								const pt = e.touches ? e.touches[0] : e;
								dragStartX = pt.clientX;
								dragStartY = pt.clientY;
								scrollStartX = content.scrollLeft;
								scrollStartY = content.scrollTop;
								content.classList.add('is-dragging');
								e.preventDefault();
							}
							function onPointerMove(e) {
								if (!isDragging) return;
								e.preventDefault();
								const pt = e.touches ? e.touches[0] : e;
								const dx = pt.clientX - dragStartX;
								const dy = pt.clientY - dragStartY;
								if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasDragged = true;
								content.scrollLeft = scrollStartX - dx;
								content.scrollTop = scrollStartY - dy;
							}
							function onPointerUp() {
								isDragging = false;
								content.classList.remove('is-dragging');
							}

							content.addEventListener('mousedown', onPointerDown);
							document.addEventListener('mousemove', onPointerMove);
							document.addEventListener('mouseup', onPointerUp);

							content.addEventListener('touchstart', onPointerDown, { passive: false });
							document.addEventListener('touchmove', onPointerMove, { passive: false });
							document.addEventListener('touchend', onPointerUp);

							/* Close only if not a drag */
							overlay.addEventListener('click', (e) => {
								if (hasDragged) { hasDragged = false; return; }
								if (e.target === overlay || e.target === content) closeOverlay();
							});

							content.addEventListener('wheel', (e) => {
								e.preventDefault();
								if (e.deltaY < 0) currentScale = Math.min(MAX_SCALE, currentScale + SCALE_STEP);
								else currentScale = Math.max(MIN_SCALE, currentScale - SCALE_STEP);
								applyZoom();
							}, { passive: false });

							function onKey(e) {
								if (e.key === 'Escape') closeOverlay();
								else if (e.key === '+' || e.key === '=') { currentScale = Math.min(MAX_SCALE, currentScale + SCALE_STEP); applyZoom(); }
								else if (e.key === '-') { currentScale = Math.max(MIN_SCALE, currentScale - SCALE_STEP); applyZoom(); }
								else if (e.key === '0') { currentScale = 1; applyZoom(); }
							}
							document.addEventListener('keydown', onKey);
						}

						function renderMermaid() {
							const els = document.querySelectorAll('.mermaid');
							if (els.length === 0) return;

							/* Save original source text before first render */
							els.forEach(el => {
								if (!diagramSources.has(el)) {
									diagramSources.set(el, el.textContent.trim());
								}
							});

							mermaid.initialize({ startOnLoad: false, theme: getTheme() });

							/* Reset elements back to source text so mermaid can re-render */
							els.forEach(el => {
								const src = diagramSources.get(el);
								if (src && el.querySelector('svg')) {
									el.textContent = src;
									el.removeAttribute('data-processed');
								}
							});

							mermaid.run({ nodes: els }).then(() => {
								els.forEach(el => {
									if (!el.dataset.overlayBound) {
										el.dataset.overlayBound = '1';
										el.addEventListener('click', () => openOverlay(el));
									}
								});
							});
						}

						renderMermaid();
						document.addEventListener('astro:page-load', renderMermaid);

						/* Re-render diagrams when Starlight theme toggles */
						const themeObserver = new MutationObserver((mutations) => {
							for (const m of mutations) {
								if (m.attributeName === 'data-theme') {
									renderMermaid();
									break;
								}
							}
						});
						themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
					`,
        },
      ],
      disable404Route: true,
      editLink: {
        baseUrl: "https://github.com/olasunkanmi-SE/codebuddy-docs/edit/main/",
      },
      logo: {
        light: "./src/assets/codebuddylogo-light.svg",
        dark: "./src/assets/codebuddylogo.svg",
      },
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/olasunkanmi-SE/codebuddy" }],
      plugins: [
        starlightBlog({
          title: "Blog",
          authors: {
            ola: {
              name: "Oyinlola Olasunkanmi Raymond",
              title: "Creator of CodeBuddy",
              picture: "https://github.com/olasunkanmi-SE.png",
              url: "https://olasunkanmi.app",
            },
          },
          metrics: {
            readingTime: true,
            words: "rounded",
          },
          postCount: 10,
          recentPostCount: 5,
        }),
      ],
      customCss: ["./src/styles/custom.css"],
      components: {
        Header: "./src/components/Header.astro",
        Head: "./src/components/Head.astro",
        PageTitle: "./src/components/PageTitle.astro",
      },
      sidebar: [
        {
          label: "Get Started",
          translations: {
            es: "Empezar",
            fr: "Commencer",
            de: "Loslegen",
            ja: "始めに",
            zh: "快速入门",
            yo: "Bẹ̀rẹ̀",
          },
          items: [
            { label: "Overview", slug: "getting-started/overview" },
            { label: "Installation", slug: "getting-started/installation" },
            { label: "Quickstart", slug: "getting-started/quickstart" },
            { label: "Configuration", slug: "getting-started/configuration" },
            { label: "Onboarding Wizard", slug: "getting-started/onboarding" },
          ],
        },
        {
          label: "Use CodeBuddy",
          translations: {
            es: "Usar CodeBuddy",
            fr: "Utiliser CodeBuddy",
            de: "CodeBuddy verwenden",
            ja: "CodeBuddy を使用する",
            zh: "使用 CodeBuddy",
            yo: "Lo CodeBuddy",
          },
          items: [
            { label: "Inline Completion", slug: "features/inline-completion" },
            { label: "Code Indexing", slug: "features/code-indexing" },
            { label: "Semantic Search", slug: "features/semantic-search" },
            { label: "Composer", slug: "features/composer" },
            { label: "Diff Review", slug: "features/diff-review" },
            { label: "Browser Automation", slug: "features/browser-automation" },
            { label: "Codebase Analysis", slug: "features/codebase-analysis" },
            { label: "Automations", slug: "features/automations" },
            { label: "Smart Reader", slug: "features/smart-reader" },
            { label: "Testing", slug: "features/testing" },
            { label: "Docker", slug: "features/docker" },
            { label: "Internationalization", slug: "features/i18n" },
            { label: "Skills", slug: "features/skills" },
            { label: "Project Rules", slug: "features/project-rules" },
            { label: "Cost Tracking", slug: "features/cost-tracking" },
            { label: "Checkpoints", slug: "features/checkpoints" },
            { label: "Debugger", slug: "features/debugger" },
            { label: "Deep Terminal", slug: "features/deep-terminal" },
            { label: "Web Search", slug: "features/web-search" },
            { label: "News Reader", slug: "features/news-reader" },
            { label: "Concurrency Queue", slug: "features/concurrency-queue" },
            { label: "Connectors", slug: "features/connectors" },
            { label: "Context Compaction", slug: "features/context-compaction" },
            { label: "Doc Generator", slug: "features/documentation-generator" },
            { label: "Doctor", slug: "features/doctor" },
            { label: "Notification Center", slug: "features/notification-center" },
            { label: "Dependency Graph", slug: "features/dependency-graph" },
            { label: "Get started with Skills", slug: "reference/skills-api" },
          ],
        },
        {
          label: "Core Concepts",
          translations: {
            es: "Conceptos principales",
            fr: "Concepts clés",
            de: "Kernkonzepte",
            ja: "コアコンセプト",
            zh: "核心概念",
            yo: "Àwọn Àbá Àyànfẹ́",
          },
          items: [
            { label: "Ask & Agent Modes", slug: "concepts/modes" },
            { label: "Context System", slug: "concepts/context" },
            { label: "LLM Providers", slug: "concepts/providers" },
            { label: "Multi-Agent Architecture", slug: "concepts/architecture" },
            { label: "Subagent System", slug: "concepts/subagents" },
            { label: "Tools", slug: "concepts/tools" },
            { label: "Think Tool", slug: "concepts/think-tool" },
            { label: "MCP Integration", slug: "concepts/mcp" },
            { label: "Memory System", slug: "concepts/memory" },
            { label: "Prompt Pipeline", slug: "concepts/prompt-pipeline" },
            { label: "Multi-Level Cache", slug: "concepts/caching" },
            { label: "Chat History", slug: "concepts/chat-history" },
            { label: "Local Models", slug: "concepts/local-models" },
            { label: "Worker Threads", slug: "concepts/workers" },
            { label: "WebAssembly (WASM)", slug: "concepts/wasm" },
            { label: "Self-Healing Execution", slug: "concepts/self-healing" },
          ],
        },
        {
          label: "Skills Catalog",
          translations: {
            es: "Catálogo de habilidades",
            fr: "Catalogue de compétences",
            de: "Skills-Katalog",
            ja: "スキルカタログ",
            zh: "技能目录",
            yo: "Kàtálọ́ọ̀gù Ìmọ̀",
          },
          collapsed: true,
          autogenerate: { directory: "skills" },
        },
        {
          label: "Administration",
          translations: {
            es: "Administración",
            fr: "Administration",
            de: "Verwaltung",
            ja: "管理",
            zh: "管理",
            yo: "Ìṣàkóso",
          },
          items: [
            { label: "Security", slug: "admin/security" },
            { label: "Access Control", slug: "admin/access-control" },
            { label: "Permission Scoping", slug: "admin/permission-scoping" },
            { label: "Credential Proxy", slug: "admin/credential-proxy" },
            { label: "Telemetry & Observability", slug: "admin/telemetry" },
            { label: "Production Safeguards", slug: "admin/production-safeguards" },
            { label: "Performance Profiler", slug: "admin/performance-profiler" },
            { label: "Troubleshooting", slug: "admin/troubleshooting" },
          ],
        },
        {
          label: "Reference",
          translations: {
            es: "Referencia",
            fr: "Référence",
            de: "Referenz",
            ja: "リファレンス",
            zh: "参考",
            yo: "Ìtọ́kasí",
          },
          items: [
            { label: "Changelog", slug: "reference/changelog" },
            { label: "Commands Reference", slug: "reference/commands" },
            { label: "Skills API", slug: "reference/skills-api" },
            { label: "API Playground", slug: "reference/playground" },
            { label: "Contributing", slug: "reference/contributing" },
            { label: "Settings", slug: "reference/settings" },
          ],
        },
      ],
    }),
  ],
});
