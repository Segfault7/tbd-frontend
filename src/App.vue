<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <nav>
          <router-link to="/emergencias">Emergencias</router-link> |
          <router-link to="/voluntarios">Voluntarios</router-link> |
          <router-link to="/buscarvoluntarios">Buscar voluntarios</router-link> |

          <!--router-link to="/pruebas">Pruebas</router-link-->
        </nav>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-img src="./assets/background.png" height="auto">
      <v-content>
        <router-view/>
      </v-content>
    </v-img>
  </v-app>
</template>

<script>
import Emergencias from './views/Emergencias';
import NuevaEmergencia from './views/NuevaEmergencia';
import Tareas from './views/Tareas';
import NuevaTarea from './views/NuevaTarea';
import Voluntarios from './views/Voluntarios';
import NuevoVoluntario from './views/NuevoVoluntario';
import Dimensiones from './views/Dimensiones';
import Pruebas from './views/Pruebas';
import MapaV from './views/MapaV'
export default {
  name: 'App',
  components: {
    Emergencias,
    NuevaEmergencia,
    Tareas,
    NuevaTarea,
    Voluntarios,
    NuevoVoluntario,
    Dimensiones,
    Pruebas
  },
  data: () => ({
    //
  }),
};
</script>
