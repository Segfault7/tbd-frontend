
<template>
  <div>
    <v-container
      class="pa-2"
      fluid >

       <v-col
      max-width = "600"
      max-height = "400"
      >
        <v-card color = "#b2b6df">
          <v-title><b>Tarea: {{$route.params.titulo}}</b></v-title>
        </v-card>
      </v-col>



      <h1 class="font-weight-black">Voluntarios</h1>
      <v-col
      max-width="800"
      class="mx-auto"
      v-for ="item in items"
      :key ="item.id_tarea">
        <v-card>
          <v-card-title>{{item. nombre}} {{item. apellido}}</v-card-title>
          <v-card-text>
            <p class="text-left">Correo: {{item. correo}} <br></p>
            <p class="text-left">Sexo: {{item. sexo}} <br></p>
          </v-card-text>
          <v-card-actions>
            <v-btn
            :to="{
                name: 'dimensiones',
                params: {id_voluntario: item.id_voluntario,
                        nombre: item.nombre,
                        apellido: item.apellido}}"
            
            >Ver Dimensiones</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-container>

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
          id_Voluntario : 1,
          nombre : "Alvin",
          apellido: "Perez",
          correo : "alvin.perez@gmail.com",
          sexo: "Masculino",

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
        let response = await this.$http.get(`/voluntarios?offset=${offset}&limit=${perPage}`);
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
