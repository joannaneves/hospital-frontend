<template>
  <div class="add-patient">
    <h2>Adicionar Paciente</h2>
    <form @submit.prevent="addPatient">
      <div class="form-group">
        <input v-model="newPatient.name" placeholder="Nome" required />
      </div>
      <div class="form-group">
        <input
          v-model="newPatient.age"
          type="number"
          placeholder="Idade"
          required
        />
      </div>
      <div class="form-group">
        <input v-model="newPatient.condition" placeholder="Condição" required />
      </div>
      <button type="submit">Adicionar Paciente</button>
    </form>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      newPatient: {
        name: "",
        age: "",
        condition: "",
      },
    }
  },
  methods: {
    async addPatient() {
      try {
        await axios.post("http://localhost:3000/patients", {
          patient: this.newPatient,
        })
        alert("Paciente adicionado com sucesso!")
        this.newPatient = { name: "", age: "", condition: "" }
      } catch (error) {
        console.error("Erro ao adicionar paciente:", error)
      }
    },
  },
}
</script>

<style scoped>
h2 {
  color: #4caf50;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style>
