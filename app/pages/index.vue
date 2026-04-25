<template>
  <main class="page">
    <!-- Decorative subtle background -->
    <div class="bg-decoration" aria-hidden="true">
      <div class="bg-circle bg-circle-1"></div>
      <div class="bg-circle bg-circle-2"></div>
    </div>

    <div class="page-content">
      <div class="form-card">
        <!-- Header -->
        <header class="card-header">
          <div class="brand-icon" aria-hidden="true">✦</div>
          <h1 class="card-title">Descubra sua Matriz Numerológica</h1>
          <p class="card-description">
            Preencha seus dados abaixo para revelar os números que influenciam sua jornada de vida.
          </p>
        </header>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="form" novalidate>
          <!-- Nome -->
          <div class="field" :class="{ 'field--error': errors.name }">
            <label for="input-name" class="field-label">Nome completo</label>
            <input
              id="input-name"
              ref="nameInputRef"
              v-model="form.name"
              @input="onNameInput"
              @blur="validateName"
              type="text"
              autocomplete="name"
              class="field-input"
              placeholder="Ex: Maria da Silva"
            />
            <Transition name="fade">
              <span v-if="errors.name" class="field-error" role="alert">{{ errors.name }}</span>
            </Transition>
          </div>

          <!-- Data de Nascimento -->
          <div class="field" :class="{ 'field--error': errors.birthdate }">
            <label for="input-birthdate" class="field-label">Data de nascimento</label>
            <input
              id="input-birthdate"
              v-model="form.birthdate"
              @input="onDateInput"
              @blur="validateDate"
              type="text"
              inputmode="numeric"
              class="field-input"
              placeholder="DD/MM/AAAA"
              maxlength="10"
            />
            <Transition name="fade">
              <span v-if="errors.birthdate" class="field-error" role="alert">{{ errors.birthdate }}</span>
            </Transition>
          </div>

          <!-- Sexo -->
          <fieldset class="field">
            <legend class="field-label">Sexo</legend>
            <div class="gender-options">
              <button
                type="button"
                class="gender-button"
                :class="{ 'gender-button--active': form.gender === 'F' }"
                @click="form.gender = 'F'"
                :aria-pressed="form.gender === 'F'"
              >
                Feminino
              </button>
              <button
                type="button"
                class="gender-button"
                :class="{ 'gender-button--active': form.gender === 'M' }"
                @click="form.gender = 'M'"
                :aria-pressed="form.gender === 'M'"
              >
                Masculino
              </button>
            </div>
            <Transition name="fade">
              <span v-if="errors.gender" class="field-error" role="alert">{{ errors.gender }}</span>
            </Transition>
          </fieldset>

          <!-- Submit -->
          <button
            type="submit"
            class="submit-button"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="submit-button-content">
              <span class="spinner" aria-hidden="true"></span>
              Calculando sua matriz…
            </span>
            <span v-else class="submit-button-content">
              Gerar minha matriz
            </span>
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { NumerologyFormData } from '~/types/numerology'
import { useNumerology } from '~/composables/useNumerology'

const { calculate, isValidDate } = useNumerology()

const nameInputRef = ref<HTMLInputElement | null>(null)

const form = reactive<NumerologyFormData>({
  name: '',
  birthdate: '',
  gender: '',
})

const errors = reactive({
  name: '',
  birthdate: '',
  gender: '',
})

const isLoading = ref(false)

// ─── Validations ────────────────────────────

const onNameInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  // Permite apenas letras (incluindo acentuadas) e espaços
  form.name = target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')
  if (errors.name) validateName()
}

const validateName = () => {
  if (!form.name.trim()) {
    errors.name = 'Informe seu nome completo.'
  } else if (form.name.trim().length < 3) {
    errors.name = 'O nome precisa ter pelo menos 3 letras.'
  } else if (!form.name.trim().includes(' ')) {
    errors.name = 'Informe nome e sobrenome.'
  } else {
    errors.name = ''
  }
}

const onDateInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let val = target.value.replace(/\D/g, '')

  if (val.length > 8) val = val.substring(0, 8)

  if (val.length > 4) {
    val = val.replace(/^(\d{2})(\d{2})(\d{1,4})$/, '$1/$2/$3')
  } else if (val.length > 2) {
    val = val.replace(/^(\d{2})(\d{1,2})$/, '$1/$2')
  }

  form.birthdate = val
  if (errors.birthdate && val.length === 10) validateDate()
}

const validateDate = () => {
  if (!form.birthdate) {
    errors.birthdate = 'Informe sua data de nascimento.'
  } else if (form.birthdate.length !== 10) {
    errors.birthdate = 'Data incompleta. Use o formato DD/MM/AAAA.'
  } else if (!isValidDate(form.birthdate)) {
    errors.birthdate = 'Data inválida. Verifique o dia, mês e ano.'
  } else {
    errors.birthdate = ''
  }
}

const validateGender = () => {
  if (!form.gender) {
    errors.gender = 'Selecione uma opção.'
  } else {
    errors.gender = ''
  }
}

// ─── Submit ─────────────────────────────────

const handleSubmit = async () => {
  validateName()
  validateDate()
  validateGender()

  if (errors.name || errors.birthdate || errors.gender) return

  isLoading.value = true

  // Simula processamento (será substituído por navegação real depois)
  await new Promise(resolve => setTimeout(resolve, 1200))

  const result = calculate(form)
  isLoading.value = false

  // TODO: Navegar para a página de resultado passando os dados
  // Temporariamente mostra os resultados no console
  navigateTo({
    path: '/resultado',
    query: {
      name: form.name,
      birthdate: form.birthdate,
      gender: form.gender,
    }
  })
}

// ─── Lifecycle ──────────────────────────────

onMounted(() => {
  nameInputRef.value?.focus()
})

useHead({
  title: 'Matriz Numerológica — Descubra seus números',
  meta: [
    { name: 'description', content: 'Calcule gratuitamente sua Matriz Numerológica completa. Descubra o Caminho de Vida, Número da Alma, Expressão e mais.' },
  ],
})
</script>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  position: relative;
  overflow: hidden;
}

/* ─── Background Decoration ──────────────── */
.bg-decoration {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
}

.bg-circle-1 {
  width: 400px;
  height: 400px;
  background: var(--color-primary-soft);
  background: radial-gradient(circle, rgba(124, 92, 191, 0.12) 0%, transparent 70%);
  top: -100px;
  right: -80px;
}

.bg-circle-2 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(201, 149, 60, 0.1) 0%, transparent 70%);
  bottom: -80px;
  left: -60px;
}

/* ─── Content ────────────────────────────── */
.page-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 440px;
}

/* ─── Card ───────────────────────────────── */
.form-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8) var(--space-6);
  box-shadow: var(--shadow-lg);
}

/* ─── Header ─────────────────────────────── */
.card-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.brand-icon {
  font-size: 1.75rem;
  color: var(--color-primary);
  margin-bottom: var(--space-3);
  line-height: 1;
}

.card-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.02em;
  line-height: 1.3;
  margin-bottom: var(--space-2);
}

.card-description {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  max-width: 340px;
  margin: 0 auto;
}

/* ─── Form ───────────────────────────────── */
.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* ─── Fields ─────────────────────────────── */
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  border: none;
  padding: 0;
}

.field-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: 0.01em;
}

.field-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-family: inherit;
  font-size: 0.9375rem;
  transition: border-color var(--duration) var(--ease-default),
              box-shadow var(--duration) var(--ease-default);
  outline: none;
}

.field-input::placeholder {
  color: var(--color-text-muted);
}

.field-input:hover {
  border-color: #d1d5db;
}

.field-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-soft);
}

.field--error .field-input {
  border-color: var(--color-error);
  box-shadow: 0 0 0 3px var(--color-error-soft);
}

.field-error {
  font-size: 0.75rem;
  color: var(--color-error);
  line-height: 1.4;
}

/* ─── Gender Buttons ─────────────────────── */
.gender-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

.gender-button {
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-alt);
  color: var(--color-text-secondary);
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--duration) var(--ease-default);
}

.gender-button:hover {
  border-color: #d1d5db;
  color: var(--color-text);
  background: var(--color-surface);
}

.gender-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.gender-button--active {
  border-color: var(--color-primary);
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-weight: 600;
}

.gender-button--active:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-soft);
  color: var(--color-primary);
}

/* ─── Submit ─────────────────────────────── */
.submit-button {
  width: 100%;
  padding: var(--space-4);
  border: none;
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: #ffffff;
  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color var(--duration) var(--ease-default),
              transform var(--duration) var(--ease-default);
  margin-top: var(--space-2);
}

.submit-button:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.submit-button:active:not(:disabled) {
  transform: scale(0.98);
}

.submit-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.submit-button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}

/* ─── Spinner ────────────────────────────── */
.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ─── Transitions ────────────────────────── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--duration) var(--ease-default),
              transform var(--duration) var(--ease-default);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ─── Responsive ─────────────────────────── */
@media (max-width: 480px) {
  .form-card {
    padding: var(--space-6) var(--space-4);
    border-radius: var(--radius-md);
  }

  .card-title {
    font-size: 1.25rem;
  }
}

@media (max-height: 680px) {
  .page {
    align-items: flex-start;
    padding-top: var(--space-8);
    padding-bottom: var(--space-8);
  }
}
</style>
