<template>
  <main class="page-container">
    <div class="form-wrapper">
      <!-- Glow effect behind the card -->
      <div class="glow-effect"></div>
      
      <!-- Main Form Card -->
      <div class="form-card">
        <div class="header">
          <div class="icon-container">
            <SparklesIcon class="icon-sparkle" />
          </div>
          <h1 class="title">Matriz Numerológica</h1>
          <p class="subtitle">Revele os padrões ocultos do seu destino.</p>
        </div>

        <form @submit.prevent="generateMap" class="form-content">
          <!-- Nome Completo -->
          <div class="form-group">
            <label for="name">Nome Completo</label>
            <div class="input-wrapper">
              <div class="input-icon">
                <UserIcon class="icon" />
              </div>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="input-field"
                placeholder="Seu nome de batismo"
              />
            </div>
          </div>

          <!-- Data de Nascimento -->
          <div class="form-group">
            <label for="birthdate">Data de Nascimento</label>
            <div class="input-wrapper">
              <div class="input-icon">
                <CalendarIcon class="icon" />
              </div>
              <input
                id="birthdate"
                v-model="form.birthdate"
                type="date"
                required
                class="input-field"
              />
            </div>
          </div>

          <!-- Sexo -->
          <div class="form-group">
            <label>Sexo</label>
            <div class="radio-group">
              <label 
                class="radio-card"
                :class="{ 'active': form.gender === 'M' }"
              >
                <input type="radio" name="gender" value="M" v-model="form.gender" class="sr-only" />
                <span class="radio-label">Masculino</span>
              </label>

              <label 
                class="radio-card"
                :class="{ 'active': form.gender === 'F' }"
              >
                <input type="radio" name="gender" value="F" v-model="form.gender" class="sr-only" />
                <span class="radio-label">Feminino</span>
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="submit-container">
            <button
              type="submit"
              :disabled="isLoading"
              class="submit-button"
            >
              <span v-if="isLoading" class="button-content">
                <Loader2Icon class="icon animate-spin mr-2" />
                Gerando...
              </span>
              <span v-else class="button-content">
                Gerar Meu Mapa
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { SparklesIcon, UserIcon, CalendarIcon, ArrowRightIcon, Loader2Icon } from 'lucide-vue-next'

const router = useRouter()

const form = ref({
  name: '',
  birthdate: '',
  gender: 'F'
})

const isLoading = ref(false)

const generateMap = async () => {
  isLoading.value = true
  
  // Simulate API call / generation delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  isLoading.value = false
  
  alert('Formulário enviado com sucesso!')
}

useHead({
  title: 'Matriz Numerológica | Descubra o seu Destino'
})
</script>

<style scoped>
.page-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.form-wrapper {
  max-width: 28rem;
  width: 100%;
  position: relative;
}

.glow-effect {
  position: absolute;
  top: -4px;
  right: -4px;
  bottom: -4px;
  left: -4px;
  background: linear-gradient(to right, rgba(245, 158, 11, 0.2), rgba(139, 92, 246, 0.2));
  border-radius: var(--radius-lg);
  filter: blur(20px);
  opacity: 0.5;
  z-index: 0;
}

.form-card {
  position: relative;
  background-color: var(--color-surface);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--color-border);
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-full);
  background-color: rgba(245, 158, 11, 0.1);
  color: var(--color-primary);
  margin-bottom: 1rem;
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.icon-sparkle {
  width: 1.5rem;
  height: 1.5rem;
}

.title {
  font-size: 1.875rem;
  font-weight: 700;
  background: linear-gradient(to right, #fef3c7, #f59e0b);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: -0.025em;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #cbd5e1;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  padding-left: 0.75rem;
  display: flex;
  align-items: center;
  pointer-events: none;
  color: #64748b;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

.input-field {
  display: block;
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  background-color: rgba(15, 23, 42, 0.5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-family: inherit;
  font-size: 1rem;
  transition: var(--transition);
  outline: none;
}

.input-field:focus {
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.25);
}

.input-field::placeholder {
  color: #475569;
}

.input-field[type="date"] {
  color-scheme: dark;
}

.radio-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.radio-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  padding: 1rem;
  background-color: rgba(15, 23, 42, 0.5);
  transition: var(--transition);
}

.radio-card:hover {
  background-color: var(--color-surface-hover);
}

.radio-card.active {
  border-color: var(--color-border-focus);
  background-color: rgba(245, 158, 11, 0.05);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.radio-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-muted);
}

.radio-card.active .radio-label {
  color: #fbbf24;
}

.submit-container {
  padding-top: 1rem;
}

.submit-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  color: #0f172a;
  background: linear-gradient(to right, #fbbf24, #d97706);
  border: none;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
}

.submit-button:hover:not(:disabled) {
  background: linear-gradient(to right, #fcd34d, #f59e0b);
  box-shadow: 0 0 30px rgba(251, 191, 36, 0.5);
}

.submit-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.5), 0 0 20px rgba(251, 191, 36, 0.3);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.button-content {
  display: flex;
  align-items: center;
}

.mr-2 {
  margin-right: 0.5rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@media (max-width: 640px) {
  .form-card {
    padding: 2rem;
  }
}
</style>
