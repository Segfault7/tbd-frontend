import Vue from 'vue'
import VueRouter from 'vue-router'
import Emergencias from './views/Emergencias.vue'
import NuevaEmergencia from './views/NuevaEmergencia.vue'
import Pruebas from './views/Pruebas.vue'
import Tareas from './views/Tareas.vue'
import NuevaTarea from './views/NuevaTarea.vue'
import NuevoVoluntario from './views/NuevoVoluntario.vue'
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
      path:'/nuevatarea',
      name:'nuevatarea',
      component: NuevaTarea
    },
    {
      path:'/nuevovoluntario',
      name:'nuevovoluntario',
      component: NuevoVoluntario
    },
    {
      path:'/tareas',
      name:'tareas',
      component: Tareas
    }
  ]
})

export default router;
