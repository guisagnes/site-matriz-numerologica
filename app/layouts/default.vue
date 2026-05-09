<template>
  <div class="layout">
    <header class="header">
      <nav class="nav">
        <NuxtLink :to="localePath('/')" class="nav-brand">
          <span class="nav-icon" aria-hidden="true">✦</span>
          <span class="nav-name">{{ $t('nav.brand') }}</span>
        </NuxtLink>

        <div class="nav-links">
          <a href="#sobre" class="nav-link">{{ $t('nav.about') }}</a>
          <a href="#como-funciona" class="nav-link">{{ $t('nav.howItWorks') }}</a>
          <a href="#faq" class="nav-link">{{ $t('nav.faq') }}</a>
        </div>

        <div class="nav-right">
          <div class="lang-switcher" ref="langRef">
            <button class="lang-btn" @click="isLangOpen = !isLangOpen" :aria-expanded="isLangOpen">
              {{ locale.toUpperCase() }}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <Transition name="fade">
              <div v-if="isLangOpen" class="lang-dropdown">
                <button
                  v-for="loc in availableLocales"
                  :key="loc.code"
                  class="lang-opt"
                  :class="{ active: loc.code === locale }"
                  @click="switchLang(loc.code)"
                >{{ loc.name }}</button>
              </div>
            </Transition>
          </div>

          <button class="nav-toggle" @click="isMobileMenuOpen = !isMobileMenuOpen" :aria-expanded="isMobileMenuOpen" aria-label="Menu">
            <span class="hamburger" :class="{ 'is-open': isMobileMenuOpen }">
              <span></span><span></span><span></span>
            </span>
          </button>
        </div>
      </nav>

      <Transition name="slide">
        <div v-if="isMobileMenuOpen" class="mobile-menu">
          <a href="#sobre" class="mobile-link" @click="isMobileMenuOpen = false">{{ $t('nav.about') }}</a>
          <a href="#como-funciona" class="mobile-link" @click="isMobileMenuOpen = false">{{ $t('nav.howItWorks') }}</a>
          <a href="#faq" class="mobile-link" @click="isMobileMenuOpen = false">{{ $t('nav.faq') }}</a>
        </div>
      </Transition>
    </header>

    <main class="main"><slot /></main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <span class="footer-icon" aria-hidden="true">✦</span>
          <p class="footer-tagline">{{ $t('footer.tagline') }}</p>
        </div>
        <div class="footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="YouTube">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="TikTok">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
          </a>
          <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="WhatsApp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          </a>
        </div>
        <p class="footer-copy">{{ $t('footer.copy', { year: currentYear }) }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const { locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()

const isMobileMenuOpen = ref(false)
const isLangOpen = ref(false)
const langRef = ref<HTMLElement | null>(null)
const currentYear = new Date().getFullYear()

const availableLocales = computed(() =>
  locales.value as Array<{ code: string; name: string }>
)

const switchLang = async (code: string) => {
  await setLocale(code)
  isLangOpen.value = false
}

const onClickOutside = (e: MouseEvent) => {
  if (langRef.value && !langRef.value.contains(e.target as Node)) {
    isLangOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<style scoped>
.layout { display: flex; flex-direction: column; min-height: 100vh; scroll-behavior: smooth; }

/* ─── Header ──────────────────── */
.header {
  position: sticky; top: 0; z-index: 100;
  background: rgba(250, 248, 245, 0.85);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}
.nav {
  display: flex; align-items: center; justify-content: space-between;
  max-width: var(--content-width); margin: 0 auto;
  padding: var(--space-4) var(--content-padding);
}
.nav-brand { display: flex; align-items: center; gap: var(--space-2); text-decoration: none; }
.nav-icon { font-size: 1rem; color: var(--color-primary); }
.nav-name { font-family: var(--font-display); font-size: 1.125rem; font-weight: 600; color: var(--color-text); letter-spacing: -0.01em; }
.nav-links { display: flex; gap: var(--space-8); }
.nav-link {
  font-size: 0.8125rem; font-weight: 500; letter-spacing: 0.02em; text-transform: uppercase;
  color: var(--color-text-muted); text-decoration: none;
  position: relative; padding-bottom: 2px;
  transition: color var(--duration) var(--ease-default);
}
.nav-link::after {
  content: ''; position: absolute; bottom: -2px; left: 0;
  width: 0; height: 1.5px; background: var(--color-primary);
  transition: width var(--duration) var(--ease-default);
}
.nav-link:hover { color: var(--color-text-heading); }
.nav-link:hover::after { width: 100%; }

.nav-right { display: flex; align-items: center; gap: var(--space-4); }

/* ─── Language Switcher ───────── */
.lang-switcher { position: relative; }
.lang-btn {
  display: flex; align-items: center; gap: var(--space-1);
  padding: var(--space-2) var(--space-3);
  background: transparent; border: 1px solid var(--color-border);
  border-radius: var(--radius-sm); cursor: pointer;
  font-family: var(--font-body); font-size: 0.8125rem; font-weight: 600;
  color: var(--color-text-secondary);
  transition: border-color var(--duration) var(--ease-default), color var(--duration) var(--ease-default);
}
.lang-btn:hover { border-color: var(--color-primary); color: var(--color-text); }
.lang-dropdown {
  position: absolute; top: calc(100% + 6px); right: 0;
  background: #fff; border: 1px solid var(--color-border);
  border-radius: var(--radius-sm); box-shadow: var(--shadow-md);
  min-width: 120px; overflow: hidden; z-index: 200;
}
.lang-opt {
  display: block; width: 100%; text-align: left;
  padding: var(--space-3) var(--space-4);
  background: none; border: none; cursor: pointer;
  font-family: var(--font-body); font-size: 0.875rem;
  color: var(--color-text-secondary);
  transition: background var(--duration-fast) var(--ease-default), color var(--duration-fast) var(--ease-default);
}
.lang-opt:hover { background: var(--color-bg); color: var(--color-text); }
.lang-opt.active { color: var(--color-primary); font-weight: 600; }

/* ─── Hamburger ───────────────── */
.nav-toggle { display: none; background: none; border: none; cursor: pointer; padding: var(--space-2); }
.hamburger { display: flex; flex-direction: column; gap: 4px; width: 20px; }
.hamburger span { display: block; height: 1.5px; background: var(--color-text); border-radius: 2px; transition: all var(--duration) var(--ease-default); transform-origin: center; }
.hamburger.is-open span:nth-child(1) { transform: translateY(5.5px) rotate(45deg); }
.hamburger.is-open span:nth-child(2) { opacity: 0; }
.hamburger.is-open span:nth-child(3) { transform: translateY(-5.5px) rotate(-45deg); }

/* ─── Mobile menu ─────────────── */
.mobile-menu { display: none; flex-direction: column; padding: 0 var(--content-padding) var(--space-6); gap: var(--space-1); }
.mobile-link { display: block; padding: var(--space-3) 0; font-size: 0.875rem; font-weight: 500; color: var(--color-text-secondary); text-decoration: none; border-bottom: 1px solid var(--color-border); transition: color var(--duration) var(--ease-default); }
.mobile-link:hover { color: var(--color-text); }

/* ─── Main ────────────────────── */
.main { flex: 1; }

/* ─── Footer ──────────────────── */
.footer { border-top: 1px solid var(--color-border); padding: var(--space-12) var(--content-padding); margin-top: auto; }
.footer-content { max-width: var(--content-width); margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: var(--space-6); text-align: center; }
.footer-brand { display: flex; flex-direction: column; align-items: center; gap: var(--space-2); }
.footer-icon { font-size: 1.25rem; color: var(--color-primary-light); opacity: 0.6; }
.footer-tagline { font-family: var(--font-display); font-size: 1rem; font-style: italic; color: var(--color-text-muted); }
.footer-socials { display: flex; gap: var(--space-4); }
.social-link { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: var(--radius-full); color: var(--color-text-muted); transition: color var(--duration) var(--ease-default), background var(--duration) var(--ease-default); }
.social-link:hover { color: var(--color-primary); background: var(--color-primary-soft); }
.social-link:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
.footer-copy { font-size: 0.6875rem; color: var(--color-text-muted); letter-spacing: 0.02em; }

/* ─── Transitions ─────────────── */
.fade-enter-active, .fade-leave-active { transition: all var(--duration-fast) var(--ease-default); }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-4px); }
.slide-enter-active, .slide-leave-active { transition: all 0.3s var(--ease-default); overflow: hidden; }
.slide-enter-from, .slide-leave-to { opacity: 0; max-height: 0; }
.slide-enter-to, .slide-leave-from { max-height: 200px; }

/* ─── Responsive ──────────────── */
@media (max-width: 640px) {
  .nav-links { display: none; }
  .nav-toggle { display: block; }
  .mobile-menu { display: flex; }
  .footer { padding: var(--space-8) var(--content-padding); }
}
</style>
