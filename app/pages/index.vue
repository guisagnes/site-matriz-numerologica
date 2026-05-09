<template>
  <div class="landing-page">
    <!-- ════ HERO ════ -->
    <section class="hero">
      <div class="section-container hero-grid">
        <div class="hero-copy">
          <h1 class="hero-title">{{ $t('hero.titleLine1') }}<br />{{ $t('hero.titleLine2') }} <em>{{ $t('hero.titleHighlight') }}</em></h1>
          <div class="title-accent" aria-hidden="true"></div>
          <p class="hero-desc">{{ $t('hero.desc') }}</p>
          <ul class="hero-perks">
            <li>✦ {{ $t('hero.perk1') }}</li>
            <li>✦ {{ $t('hero.perk2') }}</li>
            <li>✦ {{ $t('hero.perk3') }}</li>
          </ul>
        </div>
        <div class="hero-form-col">
          <div class="form-card">
            <p class="form-lead">{{ $t('form.lead') }}</p>
            <form @submit.prevent="handleSubmit" class="premium-form" novalidate>
              <div class="form-group" :class="{ 'has-error': errors.name }">
                <label for="name">{{ $t('form.nameLabel') }}</label>
                <input id="name" v-model="form.name" type="text" :placeholder="$t('form.namePlaceholder')" autocomplete="name" />
                <Transition name="fade"><span class="error-msg" v-if="errors.name">{{ errors.name }}</span></Transition>
              </div>
              <div class="form-group" :class="{ 'has-error': errors.birthdate }">
                <label for="birthdate">{{ $t('form.birthLabel') }}</label>
                <input id="birthdate" v-model="form.birthdate" @input="onDateInput" type="text" :placeholder="$t('form.birthPlaceholder')" maxlength="10" inputmode="numeric" />
                <Transition name="fade"><span class="error-msg" v-if="errors.birthdate">{{ errors.birthdate }}</span></Transition>
              </div>
              <div class="form-group" :class="{ 'has-error': errors.gender }">
                <label>{{ $t('form.genderLabel') }}</label>
                <div class="gender-toggle">
                  <button type="button" class="gender-opt" :class="{ active: form.gender === 'F' }" @click="form.gender = 'F'">{{ $t('form.genderF') }}</button>
                  <button type="button" class="gender-opt" :class="{ active: form.gender === 'M' }" @click="form.gender = 'M'">{{ $t('form.genderM') }}</button>
                </div>
                <Transition name="fade"><span class="error-msg" v-if="errors.gender">{{ errors.gender }}</span></Transition>
              </div>
              <button type="submit" class="submit-btn" :disabled="isLoading">
                <span v-if="!isLoading">{{ $t('form.submit') }}</span>
                <span class="spinner" v-else></span>
              </button>
            </form>
            <div class="trust-strip">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>{{ $t('form.trustMsg') }}</span>
            </div>
          </div>
          <div class="social-proof">
            <p>{{ $t('form.socialProof') }} <strong>{{ $t('form.socialProofCountries') }}</strong></p>
          </div>
        </div>
      </div>
    </section>

    <!-- ════ ABOUT ════ -->
    <section class="about" id="sobre">
      <div class="section-container about-grid">
        <div class="about-copy">
          <h2 class="section-heading">{{ $t('about.title') }}</h2>
          <p>{{ $t('about.p1') }}</p>
          <p>{{ $t('about.p2') }}</p>
        </div>
        <div class="features">
          <div class="feature-card">
            <div class="feature-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <h3>{{ $t('about.feature1Title') }}</h3>
            <p>{{ $t('about.feature1Desc') }}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3>{{ $t('about.feature2Title') }}</h3>
            <p>{{ $t('about.feature2Desc') }}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
            <h3>{{ $t('about.feature3Title') }}</h3>
            <p>{{ $t('about.feature3Desc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ════ HOW IT WORKS ════ -->
    <section class="how" id="como-funciona">
      <div class="section-container">
        <h2 class="section-heading text-center">{{ $t('how.title') }}</h2>
        <div class="steps">
          <div class="step"><span class="step-num">1</span><h3>{{ $t('how.step1Title') }}</h3><p>{{ $t('how.step1Desc') }}</p></div>
          <div class="step"><span class="step-num">2</span><h3>{{ $t('how.step2Title') }}</h3><p>{{ $t('how.step2Desc') }}</p></div>
          <div class="step"><span class="step-num">3</span><h3>{{ $t('how.step3Title') }}</h3><p>{{ $t('how.step3Desc') }}</p></div>
        </div>
      </div>
    </section>

    <!-- ════ FAQ ════ -->
    <section class="faq" id="faq">
      <div class="section-container">
        <h2 class="section-heading text-center">{{ $t('faq.title') }}</h2>
        <div class="faq-list">
          <details class="faq-item" name="faq">
            <summary>{{ $t('faq.q1') }}</summary>
            <div class="faq-body"><p>{{ $t('faq.a1') }}</p></div>
          </details>
          <details class="faq-item" name="faq">
            <summary>{{ $t('faq.q2') }}</summary>
            <div class="faq-body"><p>{{ $t('faq.a2') }}</p></div>
          </details>
          <details class="faq-item" name="faq">
            <summary>{{ $t('faq.q3') }}</summary>
            <div class="faq-body"><p>{{ $t('faq.a3') }}</p></div>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { NumerologyFormData } from '~/types/numerology'
import { useNumerology } from '~/composables/useNumerology'
import { useHead, navigateTo } from '#imports'

const { t } = useI18n()
const localePath = useLocalePath()
const { calculate, isValidDate } = useNumerology()

const form = reactive<NumerologyFormData>({ name: '', birthdate: '', gender: '' })
const errors = reactive({ name: '', birthdate: '', gender: '' })
const isLoading = ref(false)

const onDateInput = (event: Event) => {
  const el = event.target as HTMLInputElement
  let v = el.value.replace(/\D/g, '')
  if (v.length > 8) v = v.substring(0, 8)
  if (v.length > 4) v = v.replace(/^(\d{2})(\d{2})(\d{1,4})$/, '$1/$2/$3')
  else if (v.length > 2) v = v.replace(/^(\d{2})(\d{1,2})$/, '$1/$2')
  form.birthdate = v
}

const validateForm = () => {
  let ok = true
  errors.name = errors.birthdate = errors.gender = ''
  if (!form.name.trim() || form.name.length < 3) { errors.name = t('form.errorName'); ok = false }
  if (!form.birthdate || form.birthdate.length !== 10 || !isValidDate(form.birthdate)) { errors.birthdate = t('form.errorDate'); ok = false }
  if (!form.gender) { errors.gender = t('form.errorGender'); ok = false }
  return ok
}

const handleSubmit = async () => {
  if (!validateForm()) return
  isLoading.value = true
  await new Promise(r => setTimeout(r, 500))
  calculate(form)
  isLoading.value = false
  navigateTo({ path: localePath('/resultado'), query: { name: form.name, birthdate: form.birthdate, gender: form.gender } })
}

useHead({ title: () => t('meta.title') })
</script>

<style scoped>
/* ─── Shared ─────────────────────── */
.landing-page { width: 100%; }
.section-container {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 0 var(--content-padding);
}
.section-heading {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.02em;
  margin-bottom: var(--space-4);
}
.text-center { text-align: center; }

/* ════════════════════════════════════
   HERO
   ════════════════════════════════════ */
.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: calc(100vh - 60px);
  padding: var(--space-16) 0;
  overflow: hidden;
}
.hero-grid {
  position: relative; z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: var(--space-16);
}
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--color-text);
  margin-bottom: var(--space-4);
}
.hero-title em {
  font-style: normal;
  color: var(--color-primary);
}
.title-accent {
  width: 48px; height: 3px;
  background: var(--color-primary);
  border-radius: 2px;
  margin-bottom: var(--space-6);
}
.hero-desc {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  margin-bottom: var(--space-8);
  max-width: 480px;
}
.hero-perks {
  list-style: none; display: flex; flex-wrap: wrap; gap: var(--space-4);
  margin-bottom: 0;
}
.hero-perks li {
  font-size: 0.875rem; font-weight: 500;
  color: var(--color-text-secondary);
}

/* ─── Hero Form Column ───────────── */
.hero-form-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
}
.trust-strip {
  display: flex; align-items: center; gap: var(--space-2);
  margin-top: var(--space-4); padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
  font-size: 0.8125rem; color: var(--color-text-muted); font-weight: 500;
}
.trust-strip svg { color: var(--color-primary); flex-shrink: 0; }
.social-proof {
  display: flex; align-items: center; gap: var(--space-3);
}
.social-proof p {
  font-size: 0.8125rem; color: var(--color-text-muted);
  font-style: italic;
}
.social-proof strong {
  color: var(--color-text-secondary); font-weight: 600;
  font-style: normal;
}
.form-card {
  width: 100%; max-width: 440px;
  background: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-8);
  box-shadow: var(--shadow-md);
}
.form-lead {
  font-family: var(--font-display);
  font-size: 1.125rem; font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--space-6);
}
.premium-form { display: flex; flex-direction: column; gap: var(--space-6); }
.form-group { display: flex; flex-direction: column; gap: var(--space-2); flex: 1; }
.form-group label {
  font-size: 0.875rem; font-weight: 500;
  color: var(--color-text-secondary); margin-left: 2px;
}
.form-group input {
  width: 100%; padding: 0.875rem 1rem;
  background: #fff; border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-body); font-size: 1rem; color: var(--color-text);
  transition: border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out);
}
.form-group input::placeholder { color: var(--color-text-muted); }
.form-group input:hover { border-color: rgba(180,140,72,0.4); }
.form-group input:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-soft); }
.form-group.has-error input,
.form-group.has-error .gender-opt { border-color: var(--color-error); }
.error-msg { font-size: 0.8125rem; color: var(--color-error); font-weight: 500; }
.form-row { display: flex; gap: var(--space-4); }

.gender-toggle { display: flex; gap: var(--space-2); }
.gender-opt {
  flex: 1; padding: 0.875rem 0.5rem;
  background: #fff; border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-body); font-size: 0.9375rem; font-weight: 500;
  color: var(--color-text-secondary); cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}
.gender-opt:hover { border-color: rgba(180,140,72,0.4); color: var(--color-text); }
.gender-opt:focus-visible { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-soft); }
.gender-opt.active { background: var(--color-primary-soft); border-color: var(--color-primary); color: var(--color-primary-hover); }

.submit-btn {
  width: 100%; padding: 1rem;
  background: var(--color-primary); border: none; border-radius: var(--radius-md);
  color: #fff; font-family: var(--font-body); font-size: 1rem; font-weight: 600;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all var(--duration-fast) var(--ease-out);
  box-shadow: 0 4px 12px var(--color-primary-soft);
}
.submit-btn:hover:not(:disabled) { background: var(--color-primary-hover); transform: translateY(-2px); box-shadow: 0 8px 20px var(--color-primary-soft); }
.submit-btn:active:not(:disabled) { transform: translateY(0); }
.submit-btn:focus-visible { outline: none; box-shadow: 0 0 0 3px #fff, 0 0 0 6px var(--color-primary); }
.submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
.spinner { width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to{transform:rotate(360deg)} }

/* ════════════════════════════════════
   ABOUT
   ════════════════════════════════════ */
.about {
  padding: var(--space-24) 0;
  background: #fff;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}
.about-grid {
  display: grid;
  grid-template-columns: 6fr 5fr;
  gap: var(--space-12);
  align-items: start;
}
.about-copy p {
  font-size: 1.0625rem; color: var(--color-text-secondary);
  line-height: 1.7; margin-bottom: var(--space-4);
}
.features { display: flex; flex-direction: column; gap: var(--space-4); }
.feature-card {
  background: transparent;
  padding: var(--space-4) var(--space-6);
  border-radius: 0;
  border: none;
  border-left: 3px solid var(--color-border);
  transition: border-color var(--duration) var(--ease-out);
}
.feature-card:hover { border-left-color: var(--color-primary); }
.feature-icon-wrap {
  display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px;
  color: var(--color-primary);
  margin-bottom: var(--space-2);
}
.feature-card h3 {
  font-family: var(--font-display); font-size: 1rem; font-weight: 600;
  color: var(--color-text); margin-bottom: var(--space-1);
}
.feature-card p { font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.5; }

/* ════════════════════════════════════
   HOW IT WORKS
   ════════════════════════════════════ */
.how {
  padding: var(--space-24) 0;
  background: #fff;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}
.steps {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8); margin-top: var(--space-12);
}
.step { text-align: center; }
.step-num {
  display: inline-flex; align-items: center; justify-content: center;
  width: 48px; height: 48px;
  background: var(--color-primary-soft); color: var(--color-primary);
  font-family: var(--font-display); font-size: 1.25rem; font-weight: 700;
  border-radius: var(--radius-full); margin-bottom: var(--space-4);
}
.step h3 {
  font-family: var(--font-display); font-size: 1.125rem; font-weight: 600;
  color: var(--color-text); margin-bottom: var(--space-2);
}
.step p { font-size: 0.9375rem; color: var(--color-text-secondary); line-height: 1.5; }

/* ════════════════════════════════════
   FAQ
   ════════════════════════════════════ */
.faq { padding: var(--space-24) 0; }
.faq-list {
  max-width: 640px; margin: var(--space-8) auto 0;
  display: flex; flex-direction: column; gap: var(--space-3);
}
.faq-item {
  background: #fff; border: 1px solid var(--color-border);
  border-radius: var(--radius-sm); overflow: hidden;
  transition: border-color var(--duration) var(--ease-out);
}
.faq-item:hover { border-color: var(--color-primary-light); }
.faq-item summary {
  padding: var(--space-4) var(--space-6);
  font-family: var(--font-display); font-size: 1rem; font-weight: 600;
  color: var(--color-text); cursor: pointer; list-style: none;
  display: flex; justify-content: space-between; align-items: center;
}
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary::after { content: "+"; font-size: 1.25rem; color: var(--color-primary); }
.faq-item[open] summary::after { content: "−"; }
.faq-body {
  padding: 0 var(--space-6) var(--space-4);
  font-size: 0.9375rem; color: var(--color-text-secondary); line-height: 1.6;
}

/* ─── Transitions ────────────────── */
.fade-enter-active, .fade-leave-active { transition: all var(--duration-fast) var(--ease-out); }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-4px); }

/* ─── Responsive ─────────────────── */
@media (max-width: 960px) {
  .hero-grid, .about-grid { grid-template-columns: 1fr; }
  .hero { min-height: auto; padding: var(--space-12) 0; }
  .hero-form-col { justify-content: stretch; }
  .form-card { max-width: 100%; }
  .steps { grid-template-columns: 1fr; gap: var(--space-6); }
}
@media (max-width: 640px) {
  .form-card { padding: var(--space-6); }
}
</style>
