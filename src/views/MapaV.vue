<template>

  <div id="mapContainer">

  </div>

  





</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  name: "LeafletMap",
  data() {
    return {
		items:[],
		map: null
    };
  },
  methods:{
	getData: async function(){
      try{
        
        let response = await this.$http.get(`/voluntariosMapa`);
        this.items  = response.data;
        console.log(this.items)
        for (var item of this.items){
        var marker = new L.marker([item.longitude,item.latitude])
        .bindPopup('Nombre: '+ item.nombre + ', Apellido: '+item.apellido)
        .addTo(this.map);
        }

        
        
      } catch (e) {
        console.log('error', e)
      }
      console.log(marker)
    }
  },
  mounted() {

    this.map = L.map("mapContainer").setView([-33.456, -70.648], 3); /*Para que se visualiza dentro de chile*/
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    //var marker = L.marker([-51.760928, -72.482996]).addTo(this.map);
    



  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  },
  created:function(){
	this.getData();
  }


};
</script>


<style scoped>
#mapContainer {
  width: 67vw;
  height: 57vh;
}
</style>