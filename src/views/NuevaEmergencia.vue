<template>
    <v-container>
      <h1 class="font-weight-black">Nueva emergencia</h1>
      <v-card>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="emergencia.nombre"
              label="Titulo"
              required
            ></v-text-field>
            <v-text-field
              v-model="emergencia.ubicacion"
              label="Ubicacion"
              required

            ></v-text-field>
            <v-text-field
              v-model="emergencia.tipo"
              label="Tipo"
              required

            ></v-text-field>
            <v-textarea
              outlined
              v-model="emergencia.descripcion"
            ></v-textarea>
            <v-btn class="mr-4" @click="save" color = "teal lighten-4">Crear</v-btn>
            <v-btn class="mr-4" to="/">Volver</v-btn>
          </v-form>
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
      emergencia:{},
      message:""
    }
  },
  methods:{
    save:async function(){
      this.message = "";
      try {
          let response = await this.$http.post('/emergencias', this.emergencia);
          this.message = "Se ha agregado existosamente"
      } catch (e) {
        console.log('error',e)
        this.message= "Ha ocurrido un error"
      }
    }
  }
}
</script>
