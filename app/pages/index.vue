<template>
  <main class="page-container">
    <div class="form-wrapper">
      <div class="form-card">
        <header class="header">
          <h1 class="title">Matriz Numerológica</h1>
          <p class="subtitle">Decodifique a sua assinatura vibracional.</p>
        </header>

        <form @submit.prevent="generateMap" class="form-content">
          <!-- Nome Completo -->
          <div class="form-group" :class="{ 'is-focused': isNameFocused, 'is-filled': form.name }">
            <label for="name" class="floating-label">Nome Completo</label>
            <div class="input-container">
              <UserIcon class="icon" />
              <input
                id="name"
                v-model="form.name"
                @input="onNameInput"
                @focus="isNameFocused = true"
                @blur="isNameFocused = false"
                type="text"
                required
                class="input-field"
              />
            </div>
          </div>

          <!-- Data de Nascimento -->
          <div class="form-group" :class="{ 'is-focused': isDateFocused, 'is-filled': form.birthdate }">
            <label for="birthdate" class="floating-label">Data de Nascimento</label>
            <div class="input-container">
              <CalendarIcon class="icon" />
              <input
                id="birthdate"
                v-model="form.birthdate"
                @input="onDateInput"
                @focus="isDateFocused = true"
                @blur="isDateFocused = false"
                type="text"
                required
                class="input-field"
                placeholder=" "
                maxlength="10"
              />
            </div>
            <span class="helper-text" v-if="isDateFocused || form.birthdate">DD/MM/AAAA</span>
          </div>

          <!-- Sexo (Segmented Control) -->
          <div class="form-group segmented-control-wrapper">
            <label class="control-label">Sexo</label>
            <div class="segmented-control">
              <div 
                class="segment"
                :class="{ 'active': form.gender === 'M' }"
                @click="form.gender = 'M'"
              >
                Masculino
              </div>
              <div 
                class="segment"
                :class="{ 'active': form.gender === 'F' }"
                @click="form.gender = 'F'"
              >
                Feminino
              </div>
              <div class="segment-indicator" :class="'indicator-' + form.gender"></div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="submit-container">
            <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="submit-button"
            >
              <span v-if="isLoading" class="button-content">
                <Loader2Icon class="icon animate-spin mr-2" />
                Processando
              </span>
              <span v-else class="button-content">
                Gerar Relatório
                <ArrowRightIcon class="icon ml-2" />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { UserIcon, CalendarIcon, ArrowRightIcon, Loader2Icon } from 'lucide-vue-next'

const router = useRouter()

const form = ref({
  name: '',
  birthdate: '',
  gender: ''
})

const isLoading = ref(false)
const isNameFocused = ref(false)
const isDateFocused = ref(false)

const onNameInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  form.value.name = target.value.replace(/[^a-zA-ZáàãâéèêíïóôõöúçñÁÀÃÂÉÈÊÍÏÓÔÕÖÚÇÑ\s]/g, '')
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
  
  form.value.birthdate = val
}

const isFormValid = computed(() => {
  return form.value.name.trim().length >= 3 && form.value.birthdate.length === 10 && form.value.gender !== ''
})

const generateMap = async () => {
  if (!isFormValid.value) return
  
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  isLoading.value = false
  
  alert('Formulário enviado com sucesso!')
}

useHead({
  title: 'Matriz Numerológica | Profissional'
})
</script>

<style scoped>
.page-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow: hidden;
  background-color: var(--color-bg);
}

.form-wrapper {
  width: 100%;
  max-width: 400px;
}

.form-card {
  background-color: #0f121b; /* Tom muito escuro e sólido, zero vidro */
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 2.5rem 2rem;
  box-shadow: 0 4px 24px -6px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(0, 0, 0, 0.5);
}

.header {
  margin-bottom: 2rem;
}

.title {
  font-size: 1.5rem;
  font-weight: 500;
  color: #f8fafc;
  letter-spacing: -0.02em;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 400;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

/* Floating Label Inputs UX/UI */
.form-group {
  position: relative;
  display: flex;
  flex-direction: column;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  transition: border-color 0.3s ease;
}

.form-group.is-focused .input-container {
  border-bottom-color: var(--color-primary);
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #64748b;
  transition: color 0.3s ease;
  margin-right: 0.75rem;
}

.form-group.is-focused .icon {
  color: var(--color-primary);
}

.input-field {
  flex: 1;
  background: transparent;
  border: none;
  color: #e2e8f0;
  font-size: 1rem;
  font-family: inherit;
  padding: 0.5rem 0;
  outline: none;
}

.floating-label {
  position: absolute;
  left: 2rem;
  top: 0.5rem;
  font-size: 1rem;
  color: #64748b;
  pointer-events: none;
  transition: all 0.2s ease-out;
  transform-origin: left top;
}

/* Float active states */
.form-group.is-focused .floating-label,
.form-group.is-filled .floating-label {
  transform: translateY(-1.5rem) scale(0.8);
  color: #94a3b8;
}

.form-group.is-focused .floating-label {
  color: var(--color-primary);
}

.helper-text {
  font-size: 0.65rem;
  color: #475569;
  position: absolute;
  right: 0;
  top: -1.2rem;
  letter-spacing: 0.05em;
}

/* Segmented Control UI for Gender */
.segmented-control-wrapper {
  margin-top: 0.5rem;
  gap: 0.75rem;
}

.control-label {
  font-size: 0.8rem;
  color: #94a3b8;
}

.segmented-control {
  position: relative;
  display: flex;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  padding: 4px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.segment {
  flex: 1;
  text-align: center;
  padding: 0.6rem 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  position: relative;
  z-index: 2;
  transition: color 0.3s ease;
}

.segment.active {
  color: #fff;
}

.segment-indicator {
  position: absolute;
  top: 4px;
  bottom: 4px;
  width: calc(50% - 4px);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  z-index: 1;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0; /* Hidden initially until selected */
}

.segment-indicator.indicator-M {
  transform: translateX(0);
  opacity: 1;
}

.segment-indicator.indicator-F {
  transform: translateX(100%);
  opacity: 1;
}

/* Submit Button Minimalist Professional */
.submit-container {
  margin-top: 1.5rem;
}

.submit-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: inherit;
  color: #111827;
  background-color: var(--color-primary); /* Solid Amber */
  border: none;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
}

.submit-button:hover:not(:disabled) {
  background-color: #fbbf24;
}

.submit-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background-color: #475569;
  color: #94a3b8;
}

.button-content {
  display: flex;
  align-items: center;
}

.mr-2 { margin-right: 0.5rem; }
.ml-2 { margin-left: 0.5rem; }

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@media (max-height: 650px) {
  .page-container {
    height: auto;
    min-height: 100vh;
    overflow: auto;
  }
}
</style>
