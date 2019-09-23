<template>
    <v-container
      class="pa-2"
      fluid
    >
      <h1 class="font-weight-black">Tareas</h1>
      <v-col
      max-width = "600"
      max-height = "400"
      >
        <v-card color = "#b2b6df">
          <h2>{{$route.params.nombre}}</h2>
          <v-card-text>
            <p class="text-left">Ubicación: {{$route.params.ubicacion}} <br></p>
            <p class="text-left">Tipo: {{$route.params.tipo}} <br></p>
            Descripción: {{$route.params.descripcion}}</v-card-text>
        </v-card>
      </v-col>
      <v-col class="d-flex justify-space-around">
        <v-btn
        class="mr-4"
        color = "teal lighten-4"
        :to="{
          name: 'nuevatarea',
          params: {id_emergencia: this.$route.params.id_emergencia}}"
        >Crear tarea</v-btn>
        <v-btn class="mr-4" to="/">Volver</v-btn>
      </v-col>
      <v-col
      max-width="800"
      class="mx-auto"
      v-for ="item in items"
      :key ="item.id_tarea">
        <v-card>
          <v-card-title>{{item.titulo}}</v-card-title>
          <v-card-text>
            <p class="text-left">Estado de la tarea: {{item.estado}} <br></p>
             <p class="text-left">Id del voluntario encargado: {{item.id_voluntario}} <br></p>
          </v-card-text>
          <v-card-actions class="d-flex justify-space-around">
            <v-btn
            :to="{
                name: 'voluntarios',
                params: {id_tarea: item.id_tarea,
                        titulo: item.titulo}}"
            >Ver Responsable</v-btn>
            <v-btn color="#dfb2cb" @click="borrar(item.id_tarea)">Borrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

    <pagination class="paginate" :records="totalRecords" v-model="page" :per-page="perPage" @paginate="paginate" :options="pageOptions"></pagination>

    <v-card v-if="items.length==0" class="empty-list">
      <v-card-title>No hay tareas asignadas</v-card-title>
    </v-card>
  </v-container>
</template>

<script>
export default{
  data(){
    return {
      id_emergencia : this.$route.params.id_emergencia,
      items:[],
      page:1,
      perPage: 10,
      totalRecords:0,
      pageOptions:{
        texts:{
          count:""
        }
      }
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
        let id_emergencia = this.$route.params.id_emergencia;
        let response = await this.$http.get(`/tareas_de_emergencias?offset=${offset}&limit=${perPage}&id_emergencia=${id_emergencia}`);
        this.items  = response.data;
        console.log('headers', response.headers)
        this.totalRecords = +response.headers['pagination-count']
      } catch (e) {
        console.log('error', e)
      }
    },
    borrar: function(id){
      try{
        this.$http.delete(`/tareas/` + id);
        window.location.reload()
      } catch(e) {
        console.log('error', e)
      }

    }
  },
  created:function(){

    this.getData();
  }
}
</script>
