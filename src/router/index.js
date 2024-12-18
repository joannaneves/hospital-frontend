import AddPatient from "@/components/AddPatient.vue"
import CheckoutPage from "@/components/CheckoutPage.vue" // Nome alterado
import MedicationsList from "@/components/MedicationsList.vue" // Nome alterado
import PatientList from "@/components/PatientList.vue"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
  { path: "/", name: "Home", component: AddPatient },
  { path: "/patients", name: "PatientList", component: PatientList },
  { path: "/medications", name: "MedicationsList", component: MedicationsList },
  { path: "/checkout", name: "CheckoutPage", component: CheckoutPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
