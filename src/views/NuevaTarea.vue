<template>
    <v-container>
      <h1 class="font-weight-black">Nueva Tarea</h1>
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
                          <h6>Seleccionar un voluntario</h6>
            <v-col class="d-flex">

              <select name="Voluntario" v-model="tarea.id_voluntario" class="form-control">
                  <option v-for ="voluntario in voluntarios" :key ="voluntario.id_voluntario" :value="voluntario.id_voluntario">{{voluntario.nombre}} {{voluntario.apellido}}</option>
              </select>
            </v-col>

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
      voluntarioBuscado:"",
      voluntarios: [],
      tarea:{},
//      tareaEmergencia: {},
      message:""
    }
  },
  methods:{
    getData: async function(){ //Obtiene todas las emergencias
      try{

        let response = await this.$http.get(`/voluntarios`);
        this.voluntarios  = response.data;
        console.log('headers', response.headers)


      } catch (e) {
        console.log('error', e)
      }
    },
    save:async function(){
      this.message = "";
      let aux = this.$route.params.id_emergencia;
      this.tarea.id_emergencia = aux;
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
          this.message = "Se ha agregado existosamente";
          this.tarea = {};

      } catch (e) {
        console.log('error',e)
        this.message= "Ha ocurrido un error"
      }
    },

  },
  created:function(){

    this.getData();

  }
}
</script>
