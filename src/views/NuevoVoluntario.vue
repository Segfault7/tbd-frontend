<template>

    <v-container grid-list-md>

      <h1 class="font-weight-black">Nuevo voluntario</h1>
      <v-layout row wrap>
      <v-flex xs12 sm6>
      <v-card>
        <v-card-text>
          <form>
            <v-text-field
              v-model="voluntario.nombre"
              label="Nombre"
              required
            ></v-text-field>
            <v-text-field
              v-model="voluntario.apellido"
              label="Apellido"

              required
            ></v-text-field>
            <v-text-field
              v-model="voluntario.correo"
              label="Correo"
              type="email"
              required
            ></v-text-field>



            <v-select v-model="voluntario.sexo" :items="sexo" hide-details
          label="Seleccione un sexo."
          single-line
        ></v-select>

            <v-text-field
              v-model="latitud"
              id="latitud"
              disabled

            ></v-text-field>




            <v-text-field
              v-model="longitud"
              id="longitud"
              disabled
            ></v-text-field>



            <v-btn class="mr-4" @click="save" color = "teal lighten-4">Crear</v-btn>
            <v-btn class="mr-4" to="/voluntarios">Volver</v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6>

      <v-card>
        <div id="mapContainer">
        </div>
      </v-card>
      
    </v-flex>
  </v-layout>
      <span v-if="message.length>0" class="white--text">
        {{message}}
      </span>
    </v-container>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default{
  name: "LeafletMap",
  data(){
    return{
      message:"",
      sexo:[

      {value: 'Male', text: 'Hombre'},
      {value: 'Female', text: 'Mujer'},
      {value: 'Other', text: 'Otro'},
      ],
      latitud:"",
      longitud:"",
      voluntario:{},
      map: null
    };
  },
  methods:{
    save:async function(){
      this.message = "";
      this.voluntario.latitude = this.latitud;
      this.voluntario.longitude = this.longitud;


      try {
          let response = await this.$http.post('/voluntarios', this.voluntario);
          console.log(response)
          this.message = "Se ha agregado existosamente"
          alert('El voluntario ' + this.message + '!')
          this.$router.push('/voluntarios');
      } catch (e) {
        console.log('error',e)
        this.message= "Ha ocurrido un error";

      }
    }
  },//FIN METODOS

  mounted() {
    this.map = L.map("mapContainer").setView([-33.456, -70.648], 5); /*Para que se visualiza dentro de chile*/
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    var marker = {};
    this.map.doubleClickZoom.disable()
    this.map.on('dblclick', e=>{

      let latLng = this.map.mouseEventToLatLng(e.originalEvent)
      if(marker != undefined){
          this.map.removeLayer(marker);
      };


      marker = L.marker([latLng.lat, latLng.lng]).addTo(this.map)
      var latitud = latLng.lat;
      var longitud = latLng.lng;
      //Hay que hacerlo al reves, porque leaflet intercambia los datos, latitud=longitud, longitud=latitud
      this.latitud = longitud;
      this.longitud =  latitud;
      //document.getElementById('latitud').value = this.latitud;
      //document.getElementById('longitud').value= this.longitud;
    })
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
};
</script>

<style scoped>
#mapContainer {
  width: 47vw;
  height: 47vh;
}
</style>
