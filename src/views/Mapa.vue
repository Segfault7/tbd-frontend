<template>
    <div id="map">
        <v-map :zoom="zoom" :center="center">
            <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
            <v-marker :lat-lng="marker"></v-marker>
            <v-marker v-for="item in markers" :key="item.id" :lat-lng="item.latlng" @l-add="$event.target.openPopup()">
                <v-popup :content="item.content"></v-popup>
            </v-marker>
        </v-map>
    </div>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';
import L from 'leaflet';  

  export default {
    name: 'map',
    components: {
        'v-map': Vue2Leaflet.Map,
        'v-tilelayer' :Vue2Leaflet.TileLayer,
        'v-marker': Vue2Leaflet.Marker,
        L
    },
    data() {
        return {
            zoom: 13,
            center: [47.413220, -1.219482],
            url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            marker: L.latLng(47.413220, -1.219482),

            markers: [
                {
                    id: 1,
                    latlng: L.latLng(47.417220, -1.222482),
                    content: 'Hi! this is my popup data'
                },
                {
                    id: 2,
                    latlng: L.latLng(47.417220, -1.25),
                    content: 'Another'
                }
            ]
        }
    }
  }
</script>


<style scoped>
@import "~leaflet/dist/leaflet.css";

</style>


for (var i = 0; i < this.items.length; i++) {
            marker = new L.marker([this.items[i][5],this.items[i][6]])
            console.log('hola'+'hola')
            .addTo(this.map);
    }