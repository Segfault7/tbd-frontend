<template>
    <v-container grid-list-md>
      <h1 class="font-weight-black">Nueva emergencia</h1>
      <v-layout row wrap>
      <v-flex xs12 sm6>


      <v-card>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="emergencia.nombre"
              label="Titulo"
              required
            ></v-text-field>
            <v-text-field
              v-model="latitud"
              id="latitud"
              label="Latitud"
              disabled

            ></v-text-field>

            <v-text-field
              v-model="longitud"
              id="longitud"
              label="Longitud"
              disabled
            ></v-text-field>

            <v-text-field
              v-model="radio"
              id="radio"
              label="Radio en KM (Ej. 15)"
              
            ></v-text-field>
            <v-text-field
              v-model="emergencia.tipo"
              label="Tipo"
              required

            ></v-text-field>
            <v-textarea
              outlined
              v-model="emergencia.descripcion"
              label="Descripción de la emergencia"
            ></v-textarea>
            <v-btn class="mr-4" @click="save" color = "teal lighten-4">Crear</v-btn>
            <v-btn class="mr-4" to="/">Volver</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      </v-flex>
      <v-flex xs12 sm6>
      <h2 style="color:White;">Elegir ubicación de la emergencia: </h2>
      <v-card>
        <div id="mapContainer">
        </div>
      </v-card>
      <p style="color:White;">*Antes de seleccionar ubicación, rellenar el campo de radio.</p>
      <p style="color:White;">*PD: Si selecciona más de una ubicación, quedará registrada la última que haya realizado.</p>
    </v-flex>
    </v-layout>





      <span v-if="message.length>0" class="white--text">
        {{this.message}}
      </span>
    </v-container>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default{
  data:function(){
    return{
      latitud:"",
      longitud:"",
      emergencia:{},
      message:"",
      radio:"",
      map: null
    }
  },
  methods:{
    save:async function(){
      this.message = "";
      this.emergencia.latitude = this.latitud;
      this.emergencia.longitude = this.longitud;

      try {
          let response = await this.$http.post('/emergencias', this.emergencia);
          console.log(response);
          this.message = "se ha agregado existosamente";
          alert('La emergencia ' + this.message + '!');
          this.$router.push('/emergencias');

      } catch (e) {
        console.log('error',e)
        this.message= "Ha ocurrido un error"
      }
    }
  }, //FIN METODOS

  mounted() {
    this.map = L.map("mapContainer").setView([-33.456, -70.648], 5); /*Para que se visualiza dentro de chile*/
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    //Para cambiar el icono del GPS
    let iconMarker = L.icon({
      iconUrl:'https://fotos.subefotos.com/2e005ecb9da06991f4fafb24ea0282d7o.png',
      iconSize: [30,40],
      iconAnchor: [15, 40]

    })

    //var marker = L.marker([-51.760928, -72.482996]).addTo(this.map);
    this.map.doubleClickZoom.disable()
    this.map.on('dblclick', e=>{
      let latLng = this.map.mouseEventToLatLng(e.originalEvent)
      //Marca el circulo en el mapa
      L.circle([latLng.lat, latLng.lng],{
        icon: iconMarker,
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: this.radio*1000
      }).addTo(this.map)

      //Marca la imagen de GPS dentro del circulo
      L.marker([latLng.lat, latLng.lng]).addTo(this.map)


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