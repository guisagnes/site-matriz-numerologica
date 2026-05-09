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

      <!-- Visual Matrix -->
      <section class="matrix-visual" aria-label="Visualização da Matriz">
        <div class="matrix-diagram">
          <!-- The SVG Background -->
          <svg class="sacred-geo-result" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="200" cy="200" r="190" stroke="currentColor" stroke-width="1.5"/>
            <circle cx="200" cy="200" r="150" stroke="currentColor" stroke-width="1.5"/>
            <circle cx="200" cy="200" r="110" stroke="currentColor" stroke-width="1.2"/>
            <circle cx="200" cy="200" r="70" stroke="currentColor" stroke-width="1.2"/>
            <circle cx="200" cy="200" r="30" stroke="currentColor" stroke-width="1.2"/>
            <line x1="200" y1="10" x2="200" y2="390" stroke="currentColor" stroke-width="1.2"/>
            <line x1="10" y1="200" x2="390" y2="200" stroke="currentColor" stroke-width="1.2"/>
            <line x1="56" y1="56" x2="344" y2="344" stroke="currentColor" stroke-width="1.2"/>
            <line x1="344" y1="56" x2="56" y2="344" stroke="currentColor" stroke-width="1.2"/>
            <polygon points="200,50 350,200 200,350 50,200" stroke="currentColor" stroke-width="1.5" fill="none"/>
            <rect x="117" y="117" width="166" height="166" stroke="currentColor" stroke-width="1.2" fill="none"/>
          </svg>

          <!-- Nodes -->
          <div class="matrix-node node-center">
            <span class="node-val">{{ result.lifePath }}</span>
            <span class="node-lbl">Caminho</span>
          </div>
          <div class="matrix-node node-top">
            <span class="node-val">{{ result.soulNumber }}</span>
            <span class="node-lbl">Alma</span>
          </div>
          <div class="matrix-node node-bottom">
            <span class="node-val">{{ result.personalityNumber }}</span>
            <span class="node-lbl">Personalidade</span>
          </div>
          <div class="matrix-node node-left">
            <span class="node-val">{{ result.birthNumber }}</span>
            <span class="node-lbl">Nascimento</span>
          </div>
          <div class="matrix-node node-right">
            <span class="node-val">{{ result.expressionNumber }}</span>
            <span class="node-lbl">Expressão</span>
          </div>
          <div class="matrix-node node-top-right">
            <span class="node-val">{{ result.destinyNumber }}</span>
            <span class="node-lbl">Destino</span>
          </div>
        </div>
      </section>

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

definePageMeta({
  layout: false
})

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
  background: transparent;
}

.page-content {
  width: 100%;
  max-width: 800px;
}

/* ─── Back Link ─────────────────────────────── */
.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  margin-bottom: var(--space-8);
  transition: color var(--duration-fast) var(--ease-out);
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
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--space-2);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.result-meta {
  font-size: 1.0625rem;
  color: var(--color-primary);
  font-family: var(--font-body);
  font-weight: 500;
}

/* ─── Visual Matrix ─────────────────────────── */
.matrix-visual {
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-16);
}
.matrix-diagram {
  position: relative;
  width: 520px;
  height: 520px;
}
.sacred-geo-result {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: var(--color-primary);
  opacity: 0.15;
  pointer-events: none;
}
.matrix-node {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: var(--color-surface);
  border: 2px solid var(--color-primary-light);
  border-radius: 50%;
  box-shadow: var(--shadow-md);
  z-index: 2;
  transition: transform var(--duration-fast) var(--ease-spring);
}
.matrix-node:hover {
  transform: translate(-50%, -50%) scale(1.1);
  border-color: var(--color-primary);
}
.node-val {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-heading);
  line-height: 1;
}
.node-lbl {
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: absolute;
  bottom: -24px;
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.8);
  padding: 2px 6px;
  border-radius: 4px;
  backdrop-filter: blur(4px);
}
.node-center { top: 50%; left: 50%; width: 88px; height: 88px; border-color: var(--color-primary); border-width: 3px; }
.node-center .node-val { font-size: 2.25rem; color: var(--color-primary); }
.node-center .node-lbl { bottom: -28px; font-weight: 700; color: var(--color-primary); }

.node-top { top: 12.5%; left: 50%; }
.node-bottom { top: 87.5%; left: 50%; }
.node-left { top: 50%; left: 12.5%; }
.node-right { top: 50%; left: 87.5%; }
.node-top-right { top: 23.5%; left: 76.5%; }

/* ─── Grid ──────────────────────────────────── */
.numbers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-12);
}

.number-card {
  background: var(--color-surface-glass);
  border: 1px solid rgba(255, 255, 255, 1);
  border-radius: var(--radius-lg);
  padding: var(--space-8) var(--space-6);
  text-align: center;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--duration-fast) var(--ease-out),
              transform var(--duration-fast) var(--ease-out),
              background var(--duration-fast) var(--ease-out);
}

.number-card:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.number-value {
  font-family: var(--font-display);
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1.1;
  margin-bottom: var(--space-2);
}

.number-label {
  font-family: var(--font-body);
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--space-2);
}

.number-description {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* ─── CTA ───────────────────────────────────── */
.cta-section {
  text-align: center;
  padding-bottom: var(--space-12);
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.125rem 2.5rem;
  border: none;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  color: #ffffff;
  font-family: var(--font-body);
  font-size: 1.0625rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px var(--color-primary-soft);
  transition: all var(--duration-fast) var(--ease-out);
}

.cta-button:hover {
  background: var(--color-primary-hover);
  box-shadow: 0 6px 16px var(--color-primary-soft);
  transform: translateY(-2px);
}

.cta-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.8), 0 0 0 6px var(--color-primary);
}

/* ─── Responsive ────────────────────────────── */
@media (max-width: 640px) {
  .numbers-grid {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .result-title {
    font-size: 2rem;
  }
  
  .number-card {
    padding: var(--space-6) var(--space-4);
  }
  
  .matrix-diagram {
    transform: scale(0.8);
    margin: -10% 0;
  }
}
</style>
