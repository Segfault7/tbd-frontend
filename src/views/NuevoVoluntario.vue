<template>
    <v-container>
      <h1 class="font-weight-black">Nuevo voluntario</h1>
      <v-card>
        <v-card-text>
          <form>
            <v-text-field
              v-model="voluntario.nombre"
              label="Nombre"
              required
            ></v-text-field>
            <v-text-field
              v-model="voluntario.apellido"
              label="Apellido"
              required
            ></v-text-field>
            <v-text-field
              v-model="voluntario.correo"
              label="Correo"
              required
            ></v-text-field>
            <v-text-field
              v-model="voluntario.sexo"
              label="Sexo"
              required
            ></v-text-field>

            <v-text-field
              v-model="voluntario.latitude"
              label="Latitud"
              required
            ></v-text-field>

            <v-text-field
              v-model="voluntario.longitude"
              label="Longitud"
              required
            ></v-text-field>

            <v-btn class="mr-4" @click="save" color = "teal lighten-4">Crear</v-btn>
            <v-btn class="mr-4" to="/voluntarios">Volver</v-btn>
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
      voluntario:{},
      message:""
    }
  },
  methods:{
    save:async function(){
      this.message = "";
      try {
          let response = await this.$http.post('/voluntarios', this.voluntario);
          this.message = "Se ha agregado existosamente"
          alert('El voluntario ' + this.message + '!')
          this.$router.push('/voluntarios');
      } catch (e) {
        console.log('error',e)
        this.message= "Ha ocurrido un error"
      }
    }
  }
}
</script>
