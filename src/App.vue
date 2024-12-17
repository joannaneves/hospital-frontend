<template>
  <div id="app">
    <h1>HOSPITAL</h1>
    <div class="container">
      <PatientForm @patientAdded="reloadPatients" />
      <PatientList ref="patientList" />
    </div>
  </div>
</template>

<script>
import PatientForm from "./components/PatientForm.vue"
import PatientList from "./components/PatientList.vue"

export default {
  components: {
    PatientForm,
    PatientList,
  },
  methods: {
    reloadPatients() {
      this.$refs.patientList.fetchPatients() // Chama o método para atualizar a lista
    },
  },
}
</script>

<style>
/* Estilos globais */
#app {
  text-align: center;
  font-family: "Arial", sans-serif;
  background-color: #f9f9f9;
  color: #333;
  min-height: 100vh;
  padding: 20px;
}

h1 {
  color: #4caf50;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>
