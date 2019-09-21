import Vue from 'vue'
import VueRouter from 'vue-router'
import Emergencias from './views/Emergencias.vue'
import NuevaEmergencia from './views/NuevaEmergencia.vue'
import Pruebas from './views/Pruebas.vue'
import Tareas from './views/Tareas.vue'
import Voluntarios from './views/Voluntarios.vue'
import Dimensiones from './views/Dimensiones.vue'

Vue.use(VueRouter);
var router = new VueRouter({

  mode: 'history',
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
      path:'/voluntarios',
      name:'voluntarios',
      component: Voluntarios
    },
    {
      path:'/dimensiones',
      name:'dimensiones',
      component: Dimensiones
    },
    {
      path:'/tareas',
      name:'tareas',
      component: Tareas
    }
  ]
})

export default router;
