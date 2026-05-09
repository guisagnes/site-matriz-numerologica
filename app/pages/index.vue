<template>
  <main class="page-container">
    <!-- Wavy shapes bottom -->
    <div class="waves-container">
      <svg class="wave wave1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="#7a6245" fill-opacity="0.2" d="M0,256L48,250.7C96,245,192,235,288,240C384,245,480,267,576,277.3C672,288,768,288,864,261.3C960,235,1056,181,1152,149.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
      <svg class="wave wave2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="#6e573d" fill-opacity="0.5" d="M0,192L48,208C96,224,192,256,288,256C384,256,480,224,576,197.3C672,171,768,149,864,154.7C960,160,1056,192,1152,208C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
      <svg class="wave wave3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="#4a3b2b" fill-opacity="1" d="M0,128L48,149.3C96,171,192,213,288,218.7C384,224,480,192,576,181.3C672,171,768,181,864,208C960,235,1056,277,1152,282.7C1248,288,1344,256,1392,240L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>

    <!-- Mandala -->
    <div class="mandala-container">
      <img src="/matriz-destino.svg" alt="" class="mandala-img" />
    </div>

    <!-- Layout Wrapper -->
    <div class="layout-wrapper">
      <header class="top-header">
        <div class="logo">Logotipo</div>
        <nav class="nav-links">
          <a href="#">quem nós somos</a>
          <a href="#">FAQ</a>
          <a href="#">Sua Matriz</a>
        </nav>
      </header>

      <div class="content-area">
        <h1 class="main-title">Entenda sua verdadeira missão<br/>através da matriz do destino</h1>
        <p class="subtitle">
          Sua data de nascimento esconde um mapa único da sua<br/>
          existência. Padrões, missão de vida, relacionamentos e talentos<br/>
          — revelados pela sua Matriz do Destino.
        </p>

        <form @submit.prevent="handleSubmit" class="matrix-form" novalidate>
          <div class="form-row">
            <input 
              v-model="form.name" 
              type="text" 
              placeholder="Seu nome completo" 
              class="matrix-input"
              :class="{ 'has-error': errors.name }"
            />
          </div>
          
          <div class="form-row split-row">
            <input 
              v-model="form.birthdate" 
              @input="onDateInput"
              type="text" 
              placeholder="Data (DD/MM/AAAA)" 
              class="matrix-input half"
              :class="{ 'has-error': errors.birthdate }"
              maxlength="10"
            />
            
            <div class="gender-toggle half">
              <button 
                type="button" 
                class="gender-btn" 
                :class="{ active: form.gender === 'F' }" 
                @click="form.gender = 'F'"
              >
                Feminino
              </button>
              <button 
                type="button" 
                class="gender-btn" 
                :class="{ active: form.gender === 'M' }" 
                @click="form.gender = 'M'"
              >
                Masculino
              </button>
            </div>
          </div>
          
          <div class="form-row">
            <button type="submit" class="matrix-submit" :disabled="isLoading">
              <span v-if="isLoading">Calculando...</span>
              <span v-else>Gerar minha matriz</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { NumerologyFormData } from '~/types/numerology'
import { useNumerology } from '~/composables/useNumerology'

const { calculate, isValidDate } = useNumerology()

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
}

const validateForm = () => {
  let valid = true
  errors.name = ''
  errors.birthdate = ''
  errors.gender = ''

  if (!form.name.trim() || form.name.length < 3) {
    errors.name = 'Inválido'
    valid = false
  }
  
  if (!form.birthdate || form.birthdate.length !== 10 || !isValidDate(form.birthdate)) {
    errors.birthdate = 'Inválido'
    valid = false
  }
  
  if (!form.gender) {
    errors.gender = 'Inválido'
    valid = false
  }
  
  return valid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 800))

  calculate(form)
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

useHead({
  title: 'Logotipo — Matriz do Destino',
})
</script>

<style scoped>
.page-container {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* ─── Waves ─────────────────────────── */
.waves-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40vh;
  z-index: 0;
  pointer-events: none;
}
.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.wave1 { bottom: -20px; }
.wave2 { bottom: -10px; }
.wave3 { bottom: 0px; }

/* ─── Mandala ───────────────────────── */
.mandala-container {
  position: absolute;
  right: -15%;
  top: 50%;
  transform: translateY(-50%);
  width: 80vh;
  height: 80vh;
  z-index: 0;
  pointer-events: none;
  opacity: 0.9;
}
.mandala-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: sepia(100%) hue-rotate(5deg) saturate(300%) brightness(85%);
}

/* ─── Layout ────────────────────────── */
.layout-wrapper {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-8);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.top-header {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  margin-bottom: 12vh;
}

.logo {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-text);
  margin-right: var(--space-8);
}

.nav-links {
  display: flex;
  gap: var(--space-6);
}

.nav-links a {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text);
  text-transform: lowercase;
  transition: opacity var(--duration);
}

.nav-links a:hover {
  opacity: 0.6;
}

/* ─── Content Area ──────────────────── */
.content-area {
  max-width: 600px;
}

.main-title {
  font-size: 3.2rem;
  line-height: 1.1;
  margin-bottom: var(--space-4);
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 0.95rem;
  color: #716052;
  line-height: 1.6;
  margin-bottom: var(--space-8);
  font-weight: 400;
}

/* ─── Form ──────────────────────────── */
.matrix-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 480px;
}

.form-row {
  width: 100%;
}

.split-row {
  display: flex;
  gap: var(--space-4);
}

.half {
  flex: 1;
}

.matrix-input {
  width: 100%;
  padding: 1.1rem;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-text);
  outline: none;
  transition: background 0.3s, box-shadow 0.3s, border-color 0.3s;
}

.matrix-input::placeholder {
  color: var(--color-text-muted);
}

.matrix-input:focus {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.matrix-input.has-error {
  border-color: var(--color-error);
}

.gender-toggle {
  display: flex;
  gap: var(--space-2);
}

.gender-btn {
  flex: 1;
  padding: 1.1rem;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.3s;
}

.gender-btn.active {
  background: rgba(255, 255, 255, 1);
  color: var(--color-text);
  font-weight: 600;
  border-color: #d1c0b3;
}

.matrix-submit {
  width: 100%;
  padding: 1.1rem;
  border: none;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
  transition: background 0.3s, transform 0.1s;
}

.matrix-submit:hover {
  background: rgba(255, 255, 255, 1);
}

.matrix-submit:active {
  transform: scale(0.98);
}

/* ─── Responsive ────────────────────── */
@media (max-width: 768px) {
  .mandala-container {
    opacity: 0.15;
    right: -30%;
  }

  .main-title {
    font-size: 2.2rem;
  }
  
  .nav-links {
    display: none;
  }
  
  .layout-wrapper {
    padding: var(--space-4);
  }
  
  .matrix-form {
    max-width: 100%;
  }
  
  .split-row {
    flex-direction: column;
  }
}
</style>
