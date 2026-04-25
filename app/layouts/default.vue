<template>
  <div class="layout">
    <!-- Header / Menu -->
    <header class="header">
      <nav class="nav">
        <NuxtLink to="/" class="nav-brand">
          <span class="nav-icon" aria-hidden="true">✦</span>
          <span class="nav-name">Matriz Numerológica</span>
        </NuxtLink>

        <div class="nav-links">
          <NuxtLink to="/" class="nav-link">Início</NuxtLink>
          <NuxtLink to="/sobre" class="nav-link">Sobre</NuxtLink>
          <NuxtLink to="/contato" class="nav-link">Contato</NuxtLink>
        </div>

        <!-- Mobile hamburger -->
        <button
          class="nav-toggle"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Abrir menu"
        >
          <span class="hamburger" :class="{ 'is-open': isMobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </nav>

      <!-- Mobile menu -->
      <Transition name="slide">
        <div v-if="isMobileMenuOpen" class="mobile-menu">
          <NuxtLink to="/" class="mobile-link" @click="isMobileMenuOpen = false">Início</NuxtLink>
          <NuxtLink to="/sobre" class="mobile-link" @click="isMobileMenuOpen = false">Sobre</NuxtLink>
          <NuxtLink to="/contato" class="mobile-link" @click="isMobileMenuOpen = false">Contato</NuxtLink>
        </div>
      </Transition>
    </header>

    <!-- Page content -->
    <main class="main">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <span class="footer-icon" aria-hidden="true">✦</span>
          <p class="footer-tagline">Decifrando os números da sua jornada.</p>
        </div>

        <div class="footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="YouTube">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="TikTok">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
          </a>
          <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="WhatsApp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </a>
        </div>

        <p class="footer-copy">© {{ currentYear }} Matriz Numerológica. Todos os direitos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* ─── Header ─────────────────────────────── */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(250, 248, 245, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 960px;
  margin: 0 auto;
  padding: var(--space-4) var(--space-6);
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
}

.nav-icon {
  font-size: 1rem;
  color: var(--color-primary);
}

.nav-name {
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: -0.01em;
}

.nav-links {
  display: flex;
  gap: var(--space-8);
}

.nav-link {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  position: relative;
  transition: color var(--duration) var(--ease-default);
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-text);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 1.5px;
  background: var(--color-primary);
  border-radius: 1px;
}

/* Hamburger */
.nav-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-2);
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 20px;
}

.hamburger span {
  display: block;
  height: 1.5px;
  background: var(--color-text);
  border-radius: 2px;
  transition: all var(--duration) var(--ease-default);
  transform-origin: center;
}

.hamburger.is-open span:nth-child(1) {
  transform: translateY(5.5px) rotate(45deg);
}

.hamburger.is-open span:nth-child(2) {
  opacity: 0;
}

.hamburger.is-open span:nth-child(3) {
  transform: translateY(-5.5px) rotate(-45deg);
}

/* Mobile menu */
.mobile-menu {
  display: none;
  flex-direction: column;
  padding: 0 var(--space-6) var(--space-6);
  gap: var(--space-1);
}

.mobile-link {
  display: block;
  padding: var(--space-3) 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  border-bottom: 1px solid var(--color-border);
  transition: color var(--duration) var(--ease-default);
}

.mobile-link:hover {
  color: var(--color-text);
}

/* ─── Main ───────────────────────────────── */
.main {
  flex: 1;
}

/* ─── Footer ─────────────────────────────── */
.footer {
  border-top: 1px solid var(--color-border);
  padding: var(--space-12) var(--space-6);
  margin-top: auto;
}

.footer-content {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
  text-align: center;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.footer-icon {
  font-size: 1.25rem;
  color: var(--color-primary-light);
  opacity: 0.6;
}

.footer-tagline {
  font-family: var(--font-display);
  font-size: 1rem;
  font-style: italic;
  color: var(--color-text-muted);
}

.footer-socials {
  display: flex;
  gap: var(--space-4);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  color: var(--color-text-muted);
  transition: color var(--duration) var(--ease-default),
              background var(--duration) var(--ease-default);
}

.social-link:hover {
  color: var(--color-primary);
  background: var(--color-primary-soft);
}

.social-link:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.footer-copy {
  font-size: 0.6875rem;
  color: var(--color-text-muted);
  letter-spacing: 0.02em;
}

/* ─── Transitions ────────────────────────── */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s var(--ease-default);
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 200px;
}

/* ─── Responsive ─────────────────────────── */
@media (max-width: 640px) {
  .nav-links {
    display: none;
  }

  .nav-toggle {
    display: block;
  }

  .mobile-menu {
    display: flex;
  }

  .footer {
    padding: var(--space-8) var(--space-4);
  }
}
</style>
