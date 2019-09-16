<template>
  <div class="container-fluid text-center">
    <div class="row content">
      <div class="col-sm-2 sidenav">
        <p><a href="#">Link</a></p>
        <p><a href="#">Link</a></p>
        <p><a href="#">Link</a></p>
      </div>
      <div class="col-sm-8 text-left">
        <h1>Emergencias</h1>

<div class="btn-group-vertical">
  <button type="button" class="btn btn-secondary">LeftLeftLeftLeftLeftLeftLeftLeftLeftLeftLeftLeftLeftLeftLeftLeftLeftLeftLeftLeftLeftLeft</button>
  <button type="button" class="btn btn-secondary">Middle</button>
  <button type="button" class="btn btn-secondary">Right</button>
</div>
        <b-list-group>
  <b-list-group-item href="#some-link">Awesome link</b-list-group-item>
  <b-list-group-item href="#" active>Link with active state</b-list-group-item>
  <b-list-group-item href="#">Action links are easy</b-list-group-item>
  <b-list-group-item href="#foobar" disabled>Disabled link</b-list-group-item>
</b-list-group>
        <pagination class="paginate" :records="totalRecords" v-model="page" :per-page="perPage" @paginate="paginate" :options="pageOptions"></pagination>

        <div v-if="items.length==0" class="empty-list">
          <em>No se han cargado los datos</em>
        </div>
        <hr>
        <h3>Test</h3>
        <p>Lorem ipsum...</p>
      </div>
      <div class="col-sm-2 sidenav">
        <div class="well">
          <p>ADS</p>
        </div>
        <div class="well">
          <p>ADS</p>
        </div>
      </div>
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
