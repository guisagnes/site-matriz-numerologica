<template>
  <main class="page-container">
    <div class="page-content">
      <!-- Back link -->
      <a class="back-link" href="/" @click.prevent="navigateTo('/')">
        ← Voltar ao formulário
      </a>

      <!-- Header -->
      <header class="result-header">
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
import { useRoute, navigateTo, useHead } from '#imports'
import { useNumerology } from '~/composables/useNumerology'
import type { NumerologyFormData } from '~/types/numerology'

const route = useRoute()
const { calculate } = useNumerology()

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
.page-container {
  min-height: 100vh;
  padding: var(--space-8) var(--space-4);
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 10;
}

.page-content {
  width: 100%;
  max-width: 800px;
}

/* ─── Back Link ─────────────────────────────── */
.back-link {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  margin-bottom: var(--space-8);
  transition: color var(--duration) var(--ease-default);
}

.back-link:hover {
  color: var(--color-primary);
}

/* ─── Header ────────────────────────────────── */
.result-header {
  text-align: center;
  margin-bottom: var(--space-12);
}

.result-title {
  font-size: 2.5rem;
  color: var(--color-text);
  margin-bottom: var(--space-2);
  letter-spacing: -0.02em;
}

.result-meta {
  font-size: 1rem;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
}

/* ─── Grid ──────────────────────────────────── */
.numbers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-12);
}

.number-card {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: var(--radius-lg);
  padding: var(--space-8) var(--space-6);
  text-align: center;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.02);
  transition: box-shadow var(--duration) var(--ease-default),
              transform var(--duration) var(--ease-default),
              background var(--duration) var(--ease-default);
}

.number-card:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06);
  transform: translateY(-4px);
}

.number-value {
  font-family: var(--font-display);
  font-size: 3.5rem;
  color: var(--color-primary);
  line-height: 1;
  margin-bottom: var(--space-4);
}

.number-label {
  font-family: var(--font-body);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--space-2);
}

.number-description {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* ─── CTA ───────────────────────────────────── */
.cta-section {
  text-align: center;
  padding-bottom: var(--space-8);
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  border: none;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.8);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: all var(--duration) var(--ease-default);
}

.cta-button:hover {
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
  color: var(--color-primary-hover);
}

/* ─── Responsive ────────────────────────────── */
@media (max-width: 600px) {
  .numbers-grid {
    grid-template-columns: 1fr;
  }

  .result-title {
    font-size: 2rem;
  }
}
</style>
