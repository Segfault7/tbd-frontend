<template>
    <v-container
      class="pa-2"
      fluid
    >
      <h1 class="font-weight-black">Tareas</h1>
      <v-col
      max-width="800"
      class="mx-auto"
      v-for ="item in items"
      :key ="item.id_tarea">
        <v-card>
          <v-card-title>{{item.titulo}}</v-card-title>
          <v-card-text>
            <p class="text-left">Estado de la tarea: {{item. estado}} <br></p>
             <p class="text-left">Id del voluntario encargado: {{item. id_voluntario}} <br></p>
          </v-card-text>
          <v-card-actions>
            <v-btn>Ver Responsable</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

    <pagination class="paginate" :records="totalRecords" v-model="page" :per-page="perPage" @paginate="paginate" :options="pageOptions"></pagination>

    <v-card v-if="items.length==0" class="empty-list">
      <v-card-title>No se han cargado los datos</v-card-title>
    </v-card>
  </v-container>
</template>

<script>
export default{
  data(){
    return {
      items:[
       {
          id_tarea : 1,
          titulo : "Transporte de agua",
          estado: "Completado",
          id_voluntario:"1",

        },
        {
           id_tarea : 2,
          titulo : "Construir media Agua",
          estado: "En curso",
          id_voluntario:"2",
        }
      ],
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
        let response = await this.$http.get(`/tareas?offset=${offset}&limit=${perPage}`);
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
