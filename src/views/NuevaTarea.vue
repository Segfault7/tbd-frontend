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
           
            <v-btn class="mr-4" @click="save" color = "teal lighten-4">Crear</v-btn>
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
      message:""
    }
  },
  methods:{
    save:async function(){
      this.message = "";
      try {
          let response = await this.$http.post('/tareas', this.emergencia);
          this.message = "Se ha agregado existosamente"
      } catch (e) {
        console.log('error',e)
        this.message= "Ha ocurrido un error"
      }
    }
  }
}
</script>
