<template>
  <div class="patient-list">
    <h2>Lista de Pacientes</h2>
    <ul>
      <li v-for="patient in patients" :key="patient.id">
        <span class="patient-name">{{ patient.name }}</span>
        <span class="patient-info"
          >{{ patient.age }} anos - {{ patient.condition }}</span
        >
        <div class="button-container">
          <button class="update-btn" @click="editPatient(patient)">
            Atualizar
          </button>
          <button class="delete-btn" @click="deletePatient(patient.id)">
            Excluir
          </button>
          <button class="recipe-btn" @click="openRecipe(patient)">
            Receita
          </button>
        </div>
      </li>
    </ul>

    <!-- Modal para Receita -->
    <div v-if="isViewingRecipe" class="modal">
      <div class="modal-content">
        <h3>Receita de {{ currentPatient.name }}</h3>
        <p>{{ recipeText }}</p>
        <div class="form-buttons">
          <button
            type="button"
            class="close-btn"
            @click="isViewingRecipe = false"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      patients: [],
      isViewingRecipe: false,
      currentPatient: null,
      recipeText: "",
    }
  },
  created() {
    this.fetchPatients()
  },
  methods: {
    // Buscar pacientes
    async fetchPatients() {
      try {
        const response = await axios.get("http://localhost:3000/patients")
        this.patients = response.data
      } catch (error) {
        console.error("Erro ao buscar pacientes:", error)
        alert("Não foi possível carregar os pacientes.")
      }
    },

    // Exibir receita do paciente
    async openRecipe(patient) {
      this.currentPatient = patient
      this.recipeText = patient.recipe || "Nenhuma receita disponível" // Exibe a receita do paciente
      this.isViewingRecipe = true
    },

    // Deletar paciente
    async deletePatient(id) {
      try {
        await axios.delete(`http://localhost:3000/patients/${id}`)
        alert("Paciente excluído!")
        this.fetchPatients()
      } catch (error) {
        console.error("Erro ao excluir paciente:", error)
        alert("Não foi possível excluir o paciente.")
      }
    },
  },
}
</script>

<style scoped>
.patient-list h2 {
  color: #4caf50;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #f0fdf4;
  border: 1px solid #d4edda;
  border-radius: 6px;
  margin-bottom: 10px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.patient-name {
  font-weight: bold;
  margin-right: 10px;
}

button {
  margin-left: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

.button-container {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.update-btn {
  background-color: #4caf50;
  color: white;
}

.delete-btn {
  background-color: #e57373;
  color: white;
}

.recipe-btn {
  background-color: #2196f3;
  color: white;
}

/* Estilo do Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #f0fdf4;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #4caf50;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 320px;
}

.modal-content h3 {
  color: #4caf50;
  margin-bottom: 15px;
  text-align: center;
}

.form-group {
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #4caf50;
  border-radius: 5px;
  box-sizing: border-box;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.save-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-btn,
.close-btn {
  background-color: #e57373;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
