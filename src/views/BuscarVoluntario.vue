<template>
    <v-container grid-list-md>
      <h1 class="font-weight-black">Buscar Voluntarios</h1>
      <v-layout row wrap>
      <v-flex xs12 sm6>



      <v-card>
        <v-card-text>
          <v-form>

            <h5>Seleccione una emergencia</h5>
          <select name="Emergencia" v-model="emergenciaBuscada" @change="getEmergencia($event)" class="form-control">
              <option v-for ="item in items" :key ="item.id_emergencia" :value="item.id_emergencia">{{item.nombre}}</option>
          </select>

          <v-text-field
              :value="this.tipo"
              label="Tipo"
              disabled

            ></v-text-field>

          <v-text-field
              :value="this.latitud"
              label="Latitude"
              disabled

            ></v-text-field>

            <v-text-field
              :value="this.longitud"
              label="Longitude"
              disabled

            ></v-text-field>


            <v-text-field
              v-model="radio"
              id="radio"
              label="Radio en KM (Ej. 15)"

            ></v-text-field>

            <v-btn class="mr-4" @click="getVoluntarios()" color = "teal lighten-4">Buscar</v-btn>
            <v-btn class="mr-4" to="/">Volver</v-btn>
            <v-btn class="mr-5" @click="onclick()">Resetear puntos</v-btn>
          </v-form>
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
      emergenciaBuscada:"",//guarda el id de la emergencia
      latitud:"",
      longitud:"",
      tipo: "",
      message:"",
      radio:"",
      markerGroup: undefined,
      map: null,
      items:[], //guarda todas las emergencias
      itemsEmergencia:[],//Guarda la emergencia dependiendo del id
      voluntarios:[], //Guarda todos los voluntarios
      circunferencia: [],
      llenado: []
    }
  },
  methods:{
      getData: async function(){ //Obtiene todas las emergencias
      try{

        let response = await this.$http.get(`/emergencias`);
        this.items  = response.data;
        console.log('headers', response.headers)


      } catch (e) {
        console.log('error', e)
      }
    },
    getEmergencia: async function(){ //Obtiene una emergencia

      try{


        let id = this.emergenciaBuscada;

        let response = await this.$http.get(`/emergencias/` + id);
        this.itemsEmergencia = response.data;
        for (var i = this.itemsEmergencia.length - 1; i >= 0; i--) { //Para que se vea por front
          this.latitud = this.itemsEmergencia[i].latitude;
          this.longitud = this.itemsEmergencia[i].longitude;
          this.tipo = this.itemsEmergencia[i].tipo;


        }
        this.markerGroup.clearLayers(); //Se eliminan todos los puntos del mapa, al cambiar select


      }catch(e){
        console.log('error', e)
      }


    },
    getVoluntarios: async function(){
      if(this.markerGroup != undefined){
          this.markerGroup.clearLayers();
      };
      this.message = "";
      this.markerGroup = L.layerGroup().addTo(this.map);
      try{

        let response = await this.$http.get(`/voluntariosMapa`);
        this.voluntarios  = response.data;
        let iconMarker = L.icon({
          iconUrl:'https://fotos.subefotos.com/2e005ecb9da06991f4fafb24ea0282d7o.png',
          iconSize: [30,40],
          iconAnchor: [15, 40]

        })

        for (var i = this.itemsEmergencia.length - 1; i >= 0; i--) {//SE EJECUTA UNA VEZ
            this.latitud = this.itemsEmergencia[i].latitude; //Latitud emergencia
            this.longitud = this.itemsEmergencia[i].longitude;//Longitud emergencia
            let radio = this.radio;

            //Marca la imagen de GPS dentro del circulo
            this.circunferencia = L.marker([this.longitud,this.latitud],{icon: iconMarker}).addTo(this.markerGroup)


            this.llenado = L.circle([this.longitud,this.latitud],{ //Se ponen al reves, longitu y latitud

            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.2,
            radius: radio*1000
            }).addTo(this.markerGroup)

            for (var voluntario of this.voluntarios){
                var marker = new L.marker([voluntario.longitude,voluntario.latitude])

                console.log(radio)
                if (marker.getLatLng().distanceTo(this.circunferencia.getLatLng()) <= radio*1000) {
                  marker.bindPopup('Nombre: '+ voluntario.nombre + ', Apellido: '+voluntario.apellido)
                  .addTo(this.markerGroup)
                  console.log(voluntario)
                }else{
                  console.log("no esta dentro del mapa.")
                }

            }

        }





      } catch (e) {
        console.log('error', e)
      }

    },
    onclick:function(){

      this.markerGroup.clearLayers();

    }
  },
  //FIN METODOS
  created:function(){

    this.getData();
  },

  mounted() {
    this.map = L.map("mapContainer").setView([-33.456, -70.648], 4); /*Para que se visualiza dentro de chile*/
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);


    this.map.doubleClickZoom.disable()

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
