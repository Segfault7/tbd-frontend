<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <nav>
          <router-link to="/emergencias">Emergencias</router-link> |
          <router-link to="/voluntarios">Voluntario</router-link> |
          <router-link to="/dimensiones">Dimensiones</router-link> |


          <!--router-link to="/pruebas">Pruebas</router-link-->
        </nav>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Emergencias from './views/Emergencias';
import NuevaEmergencia from './views/NuevaEmergencia';
import Tareas from './views/Tareas';
import Voluntarios from './views/Voluntarios';
import Dimensiones from './views/Dimensiones';
import Pruebas from './views/Pruebas'
export default {
  name: 'App',
  components: {
    Emergencias,
    NuevaEmergencia,
    Tareas,
    Voluntarios,
    Dimensiones,
    Pruebas
  },
  data: () => ({
    //
  }),
};
</script>
