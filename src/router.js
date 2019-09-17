import Vue from 'vue'
import Router from 'vue-router'
import Emergencias from './views/Emergencias.vue'
import NuevaEmergencia from './views/NuevaEmergencia.vue'
import Pruebas from './views/Pruebas.vue'
import Tareas from './views/Tareas.vue'

Vue.use(Router);
var router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Emergencias
    },
    {
      path: '/emergencias',
      name: 'emergencias',
      component: Emergencias
    },
    {
      path:'/nuevaemergencia',
      name:'nuevaemergencia',
      component: NuevaEmergencia
    },
    {
      path:'/pruebas',
      name:'pruebas',
      component: Pruebas
    },
    {
      path:'/tareas',
      name:'tareas',
      component: Tareas
    }
  ]
})

export default router;
