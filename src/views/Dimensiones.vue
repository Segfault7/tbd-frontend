<template>
  <div>
    <v-container
      class="pa-2"
      fluid
    >
    <v-col
      max-width = "600"
      max-height = "400"
      >
        <v-card color = "#b2b6df">
          <v-title>{{$route.params.nombre}} {{$route.params.apellido}} </v-title>
          
        </v-card>
      </v-col>



      <h1 class="font-weight-black">Dimensiones</h1>
      <v-col
      max-width="800"
      class="mx-auto"
      v-for ="item in items"
      :key ="item.id_dimension_voluntario">
        <v-card>
          <v-card-text>
            <p class="text-left">{{item. nombre}}: {{item.valor}}  <br></p>
          </v-card-text>
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
        let id_voluntario = this.$route.params.id_voluntario;
        let response = await this.$http.get(`/dimensiones_de_voluntarios?id_voluntario=${id_voluntario}`);
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
