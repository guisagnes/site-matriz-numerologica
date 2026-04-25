<template>
  <main class="page">
    <div class="page-content">
      <!-- Back link -->
      <a class="back-link" href="/" @click.prevent="navigateTo('/')">
        ← Voltar ao formulário
      </a>

      <!-- Header -->
      <header class="result-header">
        <span class="brand-icon" aria-hidden="true">✦</span>
        <h1 class="result-title">Sua Matriz Numerológica</h1>
        <p class="result-meta">{{ result.fullName }} · {{ result.birthdate }}</p>
      </header>

      <!-- Numbers Grid -->
      <section class="numbers-grid" aria-label="Números da matriz">
        <article
          v-for="item in numberCards"
          :key="item.key"
          class="number-card"
        >
          <div class="number-value">{{ item.value }}</div>
          <h2 class="number-label">{{ item.label }}</h2>
          <p class="number-description">{{ item.description }}</p>
        </article>
      </section>

      <!-- CTA -->
      <div class="cta-section">
        <button class="cta-button" @click="navigateTo('/')">
          Gerar outra matriz
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNumerology } from '~/composables/useNumerology'
import type { NumerologyFormData } from '~/types/numerology'

const route = useRoute()
const { calculate, isValidDate } = useNumerology()

// Ler dados dos query params
const formData = computed<NumerologyFormData>(() => ({
  name: (route.query.name as string) || '',
  birthdate: (route.query.birthdate as string) || '',
  gender: (route.query.gender as 'M' | 'F' | '') || '',
}))

// Validar se temos dados suficientes; senão, redireciona
if (!formData.value.name || !formData.value.birthdate || !formData.value.gender) {
  navigateTo('/')
}

const result = computed(() => calculate(formData.value))

interface NumberCard {
  key: string
  value: number
  label: string
  description: string
}

const numberCards = computed<NumberCard[]>(() => [
  {
    key: 'lifePath',
    value: result.value.lifePath,
    label: 'Caminho de Vida',
    description: 'Representa a missão principal da sua existência e as lições que você veio aprender.',
  },
  {
    key: 'expression',
    value: result.value.expressionNumber,
    label: 'Expressão',
    description: 'Mostra seus talentos naturais, habilidades e o potencial que você pode desenvolver.',
  },
  {
    key: 'soul',
    value: result.value.soulNumber,
    label: 'Motivação Interior',
    description: 'Revela seus desejos mais profundos, o que realmente move sua alma.',
  },
  {
    key: 'personality',
    value: result.value.personalityNumber,
    label: 'Personalidade',
    description: 'A imagem que você projeta para o mundo, como os outros te percebem.',
  },
  {
    key: 'birth',
    value: result.value.birthNumber,
    label: 'Número de Nascimento',
    description: 'Um talento especial que complementa seu caminho de vida.',
  },
  {
    key: 'destiny',
    value: result.value.destinyNumber,
    label: 'Destino',
    description: 'O propósito maior para o qual você está sendo guiado nesta vida.',
  },
])

useHead({
  title: `Matriz de ${formData.value.name.split(' ')[0]} — Numerologia`,
  meta: [
    { name: 'description', content: 'Resultado da sua Matriz Numerológica completa.' },
  ],
})
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: var(--space-6) var(--space-4);
  display: flex;
  justify-content: center;
}

.page-content {
  width: 100%;
  max-width: 720px;
}

/* ─── Back Link ─────────────────────────────── */
.back-link {
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  margin-bottom: var(--space-6);
  transition: color var(--duration) var(--ease-default);
}

.back-link:hover {
  color: var(--color-primary);
}

/* ─── Header ────────────────────────────────── */
.result-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.brand-icon {
  display: block;
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: var(--space-2);
}

.result-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.02em;
  margin-bottom: var(--space-1);
}

.result-meta {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

/* ─── Grid ──────────────────────────────────── */
.numbers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.number-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-6) var(--space-4);
  text-align: center;
  transition: box-shadow var(--duration) var(--ease-default),
              transform var(--duration) var(--ease-default);
}

.number-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.number-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
  margin-bottom: var(--space-2);
}

.number-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--space-2);
}

.number-description {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

/* ─── CTA ───────────────────────────────────── */
.cta-section {
  text-align: center;
  padding-bottom: var(--space-8);
}

.cta-button {
  display: inline-block;
  padding: var(--space-3) var(--space-8);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--duration) var(--ease-default);
}

.cta-button:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.cta-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ─── Responsive ────────────────────────────── */
@media (max-width: 480px) {
  .numbers-grid {
    grid-template-columns: 1fr;
  }

  .result-title {
    font-size: 1.25rem;
  }
}
</style>
