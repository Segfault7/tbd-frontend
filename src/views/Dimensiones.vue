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
      items:[
        {
          id_dimension_voluntario : 1,
          id_dimension : 1,
          id_voluntario : 1,
          nombre : "Fuerza",
          valor: "3"
        },
        {
          id_dimension_voluntario : 1,
          id_dimension : 2,
          id_voluntario : 1,
          nombre : "Destresa",
          valor: "3"
        },
        {
          id_dimension_voluntario : 1,
          id_dimension : 3,
          id_voluntario : 1,
          nombre : "Liderazgo",
          valor: "3"
        },
        {
          id_dimension_voluntario : 1,
          id_dimension : 4,
          id_voluntario : 1,
          nombre : "Motivacion",
          valor: "3"
        },
        {
          id_dimension_voluntario : 1,
          id_dimension : 5,
          id_voluntario : 1,
          nombre : "Conocimiento",
          valor: "3"
        },
        {
          id_dimension_voluntario : 1,
          id_dimension : 6,
          id_voluntario : 1,
          nombre : "linterna",
          valor: "3"
        },
        {
          id_dimension_voluntario : 1,
          id_dimension : 7,
          id_voluntario : 1,
          nombre : "botas",
          valor: "3"
        },
        {
          id_dimension_voluntario : 1,
          id_dimension : 8,
          id_voluntario : 1,
          nombre : "cuerda",
          valor: "3"
        },
        {
          id_dimension_voluntario : 1,
          id_dimension : 9,
          id_voluntario : 1,
          nombre : "pala",
          valor: "3"
        },
        {
          id_dimension_voluntario : 1,
          id_dimension : 10,
          id_voluntario : 1,
          nombre : "alta_estatura",
          valor: "3"
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
        let response = await this.$http.get(`/dimension_voluntario?offset=${offset}&limit=${perPage}`);
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
