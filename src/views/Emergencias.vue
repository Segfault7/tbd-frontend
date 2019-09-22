<template>
    <v-container
      class="pa-2"
      fluid
    >
      <h1 class="font-weight-black">Emergencias</h1>
      <v-col>
        <v-btn class="mx-auto" color = "teal lighten-4" to="/nuevaemergencia">Crear nueva emergencia</v-btn>
      </v-col>
      <v-col
      max-width="800"
      class="mx-auto"
      v-for ="item in items"
      :key ="item.id_emergencia">
        <v-card>
          <v-card-title>{{item.nombre}}</v-card-title>
          <v-card-text>
            <p class="text-left">Ubicación: {{item. ubicacion}} <br></p>
            Descripción: {{item.descripcion}}</v-card-text>
          <v-card-actions class="d-flex justify-space-around">
              <v-btn
              :to="{
                name: 'tareas',
                params: {id_emergencia: item.id_emergencia,
                        nombre: item.nombre,
                        ubicacion: item.ubicacion,
                        descripcion: item.descripcion}}"
              >
                Ver tareas
              </v-btn>
              <v-btn color="#dfb2cb">Borrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <pagination class="paginate" :records="totalRecords" v-model="page" :per-page="perPage" @paginate="paginate" :options="pageOptions"></pagination>

      <v-col
      max-width="800"
      class="mx-auto"
      v-if="items.length==0"
      >
        <v-card>
          <v-card-title>No hay emergencias</v-card-title>
        </v-card>
      </v-col>
  </v-container>
</template>

<script>
export default{
  data(){
    return {
      items:[
        {
          nombre:"hola",
          ubicacion:"mundo",
          descripcion:"esto es una prueba",
          id_emergencia:"1"
        }
      ]
    }
  },
  methods:{
    paginate:function(val){
          this.page = val
          this.getData();
        },
    getData: async function(){
      try{
        let offset = this.perPage*(this.page-1);
        let perPage = this.perPage;
        let resource = this.resource;
        let response = await this.$http.get(`/emergencias?offset=${offset}&limit=${perPage}`);
        this.items  = response.data;
        console.log('headers', response.headers)
        this.totalRecords = +response.headers['pagination-count']
      } catch (e) {
        console.log('error', e)
      }
    }
  },
  created:function(){

    this.getData();
  }
}
</script>
