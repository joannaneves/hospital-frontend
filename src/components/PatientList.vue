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
        </div>
      </li>
    </ul>

    <!-- Modal para Atualização -->
    <div v-if="isEditing" class="modal">
      <div class="modal-content">
        <h3>Atualizar Paciente</h3>
        <form @submit.prevent="updatePatient">
          <div class="form-group">
            <input v-model="currentPatient.name" placeholder="Nome" required />
          </div>
          <div class="form-group">
            <input
              v-model="currentPatient.age"
              type="number"
              placeholder="Idade"
              required
            />
          </div>
          <div class="form-group">
            <input
              v-model="currentPatient.condition"
              placeholder="Condição"
              required
            />
          </div>
          <div class="form-buttons">
            <button type="submit" class="save-btn">Salvar</button>
            <button type="button" class="cancel-btn" @click="isEditing = false">
              Cancelar
            </button>
          </div>
        </form>
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
      isEditing: false,
      currentPatient: {
        id: null,
        name: "",
        age: "",
        condition: "",
      },
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
      }
    },

    // Deletar paciente
    async deletePatient(id) {
      try {
        await axios.delete(`http://localhost:3000/patients/${id}`)
        alert("Paciente excluído!")
        this.fetchPatients()
      } catch (error) {
        console.error("Erro ao excluir paciente:", error)
      }
    },

    // Abrir modal para editar paciente
    editPatient(patient) {
      this.currentPatient = { ...patient }
      this.isEditing = true
    },

    // Atualizar paciente
    async updatePatient() {
      try {
        await axios.put(
          `http://localhost:3000/patients/${this.currentPatient.id}`,
          {
            patient: this.currentPatient,
          }
        )
        alert("Paciente atualizado!")
        this.isEditing = false
        this.fetchPatients()
      } catch (error) {
        console.error("Erro ao atualizar paciente:", error)
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

button:nth-child(3) {
  background-color: #4caf50;
  color: white;
}

button:nth-child(4) {
  background-color: #e57373;
  color: white;
}

.button-container {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.update-btn,
.delete-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.update-btn {
  background-color: #4caf50;
}

.delete-btn {
  background-color: #e57373;
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
  width: 300px;
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

.cancel-btn {
  background-color: #e57373;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
