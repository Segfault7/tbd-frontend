<template>
  <div class="nueva-emergencia">
    <h1>Nueva emergencia</h1>
    <form>
      <div class="form-item">
        <label for="nombre">Nombre</label>
        <input id="nombre" type="text" v-model="emergencia.nombre" />
        <input id="ubicacion" type="text" v-model="emergencia.ubicacion" />
        <textarea id="descripcion" v-model="emergencia.descripcion" />
      </div>
      <button type="button" @click="save">Guardar</button>
    </form>
    <div v-if="message.length>0" class="form-message">
      {{message}}
    </div>
  </div>
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
      if(this.emergencia.nombre==""){
        this.message = "Debe ingresar un nombre";
        return false;
      }
      try {
          let response = await this.$http.post('/emergencias', this.dog);
          this.message = "Se ha agregado existosamente"
      } catch (e) {
        console.log('error',e)
        this.message= "Ha ocurrido un error"
      }
    }
  }
}
</script>
