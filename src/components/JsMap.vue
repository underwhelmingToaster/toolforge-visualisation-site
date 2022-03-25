<template>
  <div id="map"></div>
</template>

<script>
/* eslint-disable new-cap */

import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet/dist/leaflet'
import * as markerSVG from '@/assets/marker.svg'
import { fromUrl } from 'geotiff'
import * as plotty from 'plotty'

let map
let marker

const icon = L.icon({
  iconUrl: markerSVG,
  iconSize: [50, 50]
})

export default {
  name: 'JsMap',
  props: {
    markerLoc: Array,
    displayMarker: Boolean,
    geoTiffImage: Object
  },
  data () {
    return {
      geoTiffData: Object,
      dataWidth: 500,
      dataHeight: 500
    }
  },
  watch: {
    markerLoc (val, _) {
      if (marker.map === null) {
        marker.addTo(map)
      }
      marker.setLatLng(val)
    },
    displayMarker (val, _) {
      if (val) {
        marker.addTo(map)
      } else {
        marker.remove()
      }
    }
  },
  mounted () {
    map = L.map('map').setView([40.505, 11.00], 2)
    this.getGeoTiff()
    const self = this

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)
    map.on('zoomend', function () {
      self.calculateWindow(self.geoTIFFImage)
      self.getValuesFromBoundaries()
    })
    marker = L.marker(this.markerLoc, { icon: icon })

    this.getValuesFromBoundaries()
  },
  methods: {
    getGeoTiff () {
      const url = 'https://qrank.wmcloud.org/download/osmviews.tiff'
      fromUrl(url)
        .then(async tiff => {
          this.geoTIFFImage = await tiff.getImage()
          console.log('Loaded geotiff')
        })
    },
    async getValuesFromBoundaries () {
      if (this.geoTIFFImage !== undefined) {
        this.geoTiffData = await this.geoTIFFImage.readRasters({
          window: this.getBounds()
        })
        this.calculateWindow(this.geoTIFFImage)
        this.createPlot(this.geoTiffData)
      } else {
        console.log('Map not yet loaded')
      }
    },
    createPlot (data) {
      console.log(data[0])
      const canvas = document.getElementById('plot')
      const dataLogarithm = data[0].map(x => Math.log10(x))
      const max = (dataLogarithm.sort((a, b) => a - b))[dataLogarithm.length - 1]
      console.log(max)
      const plot = new plotty.plot({
        canvas,
        data: dataLogarithm,
        width: this.dataWidth,
        height: this.dataHeight,
        domain: [0, max]
      })
      plot.render()
      window.open(plot.canvas.toDataURL('image/png'))
    },
    getBounds () {
      const window = this.calculateWindow().map(x => Math.round(x))
      console.log(window)
      this.dataHeight = window[3] - window[1]
      this.dataWidth = window[2] - window[0]
      console.log('Width: ' + this.dataWidth + ' / Height: ' + this.dataHeight)
      return window
    },
    calculateWindowFromBbox () {
      const imageHeight = this.geoTIFFImage.getHeight()
      const imageWidth = this.geoTIFFImage.getWidth()
      const mapBounds = [map.getBounds().getNorth(), map.getBounds().getEast(), map.getBounds().getSouth(), map.getBounds().getWest()]
      return [imageWidth * (mapBounds[3] / 180), imageHeight * (mapBounds[2] / 90), imageWidth * (mapBounds[1] / 180), imageHeight * (mapBounds[0] / 90)]
    },
    calculateWindow () {
      // const imageHeight = this.geoTIFFImage.getHeight()
      // const imageWidth = this.geoTIFFImage.getWidth()
      const radius = 100 // TODO
      const x = 100 // imageWidth * (map.getCenter().lat / 180)
      const y = 100 // imageHeight * (map.getCenter().lng / 90)
      return [x - radius, y - radius, x + radius, y + radius]
    }
  }
}
</script>

<style scoped>
#map {
  height: 50px;
  position: absolute;
  overflow: hidden;
}
</style>
