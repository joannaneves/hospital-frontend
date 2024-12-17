<template>
  <div class="patient-list">
    <h2>Lista de Pacientes</h2>
    <ul>
      <li v-for="patient in patients" :key="patient.id">
        <span class="patient-name">{{ patient.name }}</span>
        <span class="patient-info"
          >{{ patient.age }} anos - {{ patient.condition }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      patients: [],
    }
  },
  created() {
    this.fetchPatients()
  },
  methods: {
    async fetchPatients() {
      try {
        const response = await axios.get("http://localhost:3000/patients")
        this.patients = response.data
      } catch (error) {
        console.error("Erro ao buscar pacientes:", error)
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.patient-name {
  font-weight: bold;
  color: #2e7d32;
}

.patient-info {
  color: #555;
  font-size: 0.9rem;
}
</style>
