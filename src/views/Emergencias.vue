<template>
  <div>
    <h1 class="font-weight-black">Emergencias</h1>
    <v-container
      class="pa-2"
      fluid
    >
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
          <v-card-actions>
            <v-btn text>Ver tareas</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-container>
    <!--ul class="btn-group-vertical">
      <button v-for="item in items" :key = "item.id_emergencia" type="button" class="btn btn-secondary">{{item.nombre}} | {{item.ubicacion}} | {{item.descripcion}}</button>
    </ul-->
    <pagination class="paginate" :records="totalRecords" v-model="page" :per-page="perPage" @paginate="paginate" :options="pageOptions"></pagination>

    <div v-if="items.length==0" class="empty-list">
      <em>No se han cargado los datos</em>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return {
      items:[
        {
          id_emergencia : 1,
          nombre : "Incendio",
          ubicacion: "Brasil",
          tipo : "asdasd",
          descripcion : "se incendia el bosque"
        },
        {
          id_emergencia : 2,
          nombre : "Terremoto",
          ubicacion: "Chile",
          tipo : "saogn",
          descripcion : "no pasa nada"
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
