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
            <br>
            <select align="center" name="Voluntarios">
                <option value="1">Voluntario 1</option> 
                <option value="2">Voluntario 2</option>
                <option value="1">Voluntario 3</option> 
                <option value="2">Voluntario 4</option>  
                </select>
                <br>

           
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
          let response = await this.$http.post('/tareas', this.tarea);
          this.message = "Se ha agregado existosamente"
      } catch (e) {
        console.log('error',e)
        this.message= "Ha ocurrido un error"
      }
    }
  }
}
</script>
