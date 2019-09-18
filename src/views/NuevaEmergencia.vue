<template>
  <v-container>
    <form>
      <v-text-field
        v-model="emergencia.nombre"
        label="Titulo"
        required
      ></v-text-field>
      <v-text-field
        v-model="emergencia.ubicacion"
        :error-messages="emailErrors"
        label="Ubicacion"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-textarea
        outlined
        v-model="emergencia.descripcion"
      ></v-textarea>
      <v-btn class="mr-4" @click="save">Crear</v-btn>
    </form>
    <div v-if="message.length>0" class="form-message">
      {{message}}
    </div>
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
