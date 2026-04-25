<template>
  <main class="page">
    <!-- Background: Matriz do Destino -->
    <div class="bg-matrix" aria-hidden="true">
      <img src="/matriz-destino.svg" alt="" class="bg-matrix-svg" />
    </div>

    <div class="content">
      <!-- Header -->
      <header class="header">
        <span class="brand" aria-hidden="true">✦</span>
        <h1 class="title">Matriz Numerológica</h1>
        <p class="description">
          Informe seus dados para revelar os números<br />que guiam a sua jornada.
        </p>
      </header>

      <!-- Form — sem card, integrado ao background -->
      <form @submit.prevent="handleSubmit" class="form" novalidate>
        <!-- Nome -->
        <div class="field" :class="{ 'field--error': errors.name }">
          <input
            id="input-name"
            ref="nameInputRef"
            v-model="form.name"
            @input="onNameInput"
            @blur="validateName"
            type="text"
            autocomplete="name"
            class="field-input"
            placeholder="Seu nome completo"
          />
          <Transition name="fade">
            <span v-if="errors.name" class="field-error" role="alert">{{ errors.name }}</span>
          </Transition>
        </div>

        <!-- Data de Nascimento -->
        <div class="field" :class="{ 'field--error': errors.birthdate }">
          <input
            id="input-birthdate"
            v-model="form.birthdate"
            @input="onDateInput"
            @blur="validateDate"
            type="text"
            inputmode="numeric"
            class="field-input"
            placeholder="Data de nascimento"
            maxlength="10"
          />
          <Transition name="fade">
            <span v-if="errors.birthdate" class="field-error" role="alert">{{ errors.birthdate }}</span>
          </Transition>
        </div>

        <!-- Sexo -->
        <div class="gender-row">
          <button
            type="button"
            class="gender-pill"
            :class="{ 'gender-pill--active': form.gender === 'F' }"
            @click="selectGender('F')"
            :aria-pressed="form.gender === 'F'"
          >
            Feminino
          </button>
          <button
            type="button"
            class="gender-pill"
            :class="{ 'gender-pill--active': form.gender === 'M' }"
            @click="selectGender('M')"
            :aria-pressed="form.gender === 'M'"
          >
            Masculino
          </button>
        </div>
        <Transition name="fade">
          <span v-if="errors.gender" class="field-error gender-error" role="alert">{{ errors.gender }}</span>
        </Transition>

        <!-- Submit -->
        <button
          type="submit"
          class="submit"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="submit-content">
            <span class="spinner" aria-hidden="true"></span>
            Calculando…
          </span>
          <span v-else class="submit-content">
            Gerar minha matriz →
          </span>
        </button>
      </form>
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

// ─── Input handlers ─────────────────────────

const onNameInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  form.name = target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')
  if (errors.name) validateName()
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

const selectGender = (value: 'M' | 'F') => {
  form.gender = value
  if (errors.gender) errors.gender = ''
}

// ─── Validations ────────────────────────────

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

const validateDate = () => {
  if (!form.birthdate) {
    errors.birthdate = 'Informe sua data de nascimento.'
  } else if (form.birthdate.length !== 10) {
    errors.birthdate = 'Data incompleta. Use DD/MM/AAAA.'
  } else if (!isValidDate(form.birthdate)) {
    errors.birthdate = 'Data inválida.'
  } else {
    errors.birthdate = ''
  }
}

const validateGender = () => {
  errors.gender = !form.gender ? 'Selecione uma opção.' : ''
}

// ─── Submit ─────────────────────────────────

const handleSubmit = async () => {
  validateName()
  validateDate()
  validateGender()

  if (errors.name || errors.birthdate || errors.gender) return

  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1200))

  const result = calculate(form)
  isLoading.value = false

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
    { name: 'description', content: 'Calcule gratuitamente sua Matriz Numerológica completa.' },
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

/* ─── Background Matrix ─────────────────── */
.bg-matrix {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  height: 550px;
  pointer-events: none;
  z-index: 0;
  animation: rotate-slow 120s linear infinite;
}

.bg-matrix-svg {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@keyframes rotate-slow {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

.content {
  width: 100%;
  max-width: 360px;
  text-align: center;
  position: relative;
  z-index: 1;
}

/* ─── Header ─────────────────────────────── */
.header {
  margin-bottom: var(--space-4);
}

.brand {
  display: inline-block;
  font-size: 1.125rem;
  color: var(--color-primary-light);
  margin-bottom: var(--space-2);
  opacity: 0.7;
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.03em;
  margin-bottom: var(--space-1);
}

.description {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* ─── Form ───────────────────────────────── */
.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

/* ─── Fields — Minimal, sem bordas laterais ─ */
.field {
  text-align: left;
  position: relative;
  padding-bottom: var(--space-3);
}

.field-input {
  width: 100%;
  padding: var(--space-2) 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
  font-family: inherit;
  font-size: 0.9375rem;
  text-align: center;
  transition: border-color var(--duration) var(--ease-default);
  outline: none;
}

.field-input::placeholder {
  color: var(--color-text-muted);
}

.field-input:hover {
  border-bottom-color: #c4c0ba;
}

.field-input:focus {
  border-bottom-color: var(--color-primary);
}

.field--error .field-input {
  border-bottom-color: var(--color-primary-light);
}

.field-error {
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  font-size: 0.7rem;
  color: var(--color-primary-light);
  text-align: center;
  padding-top: 4px;
}

.gender-error {
  position: relative;
  text-align: center;
  margin-top: calc(-1 * var(--space-4));
  height: 0;
}

/* ─── Gender — Pills discretos ───────────── */
.gender-row {
  padding: 1rem;
  display: flex;
  gap: var(--space-3);
  justify-content: center;
}

.gender-pill {
  padding: var(--space-2) var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--color-text-muted);
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--duration) var(--ease-default);
}

.gender-pill:hover {
  border-color: #c4c0ba;
  color: var(--color-text-secondary);
}

.gender-pill:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.gender-pill--active {
  border-color: var(--color-primary);
  background: var(--color-primary-soft);
  color: var(--color-primary);
}

/* ─── Submit — discreto mas clicável ─────── */
.submit {
  width: 100%;
  padding: var(--space-3);
  margin-top: var(--space-2);
  border: none;
  border-radius: var(--radius-full);
  background: var(--color-text);
  color: var(--color-bg);
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: opacity var(--duration) var(--ease-default),
              transform var(--duration) var(--ease-default);
}

.submit:hover:not(:disabled) {
  opacity: 0.85;
}

.submit:active:not(:disabled) {
  transform: scale(0.98);
}

.submit:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}

/* ─── Spinner ────────────────────────────── */
.spinner {
  width: 0.875rem;
  height: 0.875rem;
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
  transition: opacity var(--duration) var(--ease-default);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ─── Responsive ─────────────────────────── */
@media (max-height: 580px) {
  .page {
    align-items: flex-start;
    padding-top: var(--space-8);
  }

  .header {
    margin-bottom: var(--space-8);
  }
}
</style>
