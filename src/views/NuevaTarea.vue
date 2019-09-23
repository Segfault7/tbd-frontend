<template>
    <v-container>
      <h1 class="font-weight-black">Nueva Tarea</h1>
      <v-card color = "#b2b6df">
        <v-card-text>
          <p class="text-left">id_emergencia: {{$route.params.id_emergencia}} <br></p>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <form>
            <v-text-field
              v-model="tarea.titulo"
              label="Titulo"
              required
            ></v-text-field>
            <v-text-field
              v-model="tarea.estado"
              label="Estado"
              required
            ></v-text-field>
            <v-text-field
              v-model="tarea.id_voluntario"
              label="Voluntario"
              required
            ></v-text-field>

            <v-btn class="mr-4" @click="save()" color = "teal lighten-4">Crear</v-btn>
            <v-btn class="mr-4" to="/">Volver</v-btn>
          </form>
        </v-card-text>
      </v-card>
      <span v-if="message.length>0" class="white--text">
        {{message}}
      </span>
    </v-container>
</template>

<script>
export default{
  data:function(){
    return{
      tarea:{},
//      tareaEmergencia: {},
      message:""
    }
  },
  methods:{
    save:async function(){
      this.message = "";
      try {

          let response = await this.$http.post('/tareas', this.tarea);
/*          alert(""+this.$route.params.id_emergencia);
          tareaEmergencia.id_emergencia = this.$route.params.id_emergencia;
          alert("hola");
          alert(""+tareaEmergencia.id_emergencia);
          tareaEmergencia.id_tarea = response.id_tarea;
          alert(""+tareaEmergencia.id_tarea);
          let responseB = await this.$http.post('/emergencia_tarea', this.tareaEmergencia);
*/
          this.message = "Se ha agregado existosamente"
      } catch (e) {
        console.log('error',e)
        this.message= "Ha ocurrido un error"
      }
    }
  }
}
</script>
