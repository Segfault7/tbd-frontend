<template>
  <div>
    <h1>Emergencias</h1>
    <ul class="item-list">
      <li v-for="item in items" :key = "item.id_emergencia">
        {{item.nombre}} | {{item.ubicacion}} | {{item.descripcion}}
      </li>
    </ul>
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
