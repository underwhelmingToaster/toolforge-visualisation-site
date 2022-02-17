<template>
  <div class="container">
    <div class="sub-container">
      <DistributionViewer :json-data=jsonData :x-log=true :y-log=true :width=subContainerWidth :height=subContainerHeight  :key= "'Graph OSMViews ' +subContainerWidth + '/' + subContainerHeight"/>
    </div>
    <div class="sub-container">
      <div :style="{'width': subContainerWidth + 'px', 'height': subContainerHeight + 'px'}" class="leaflet-map-pane" >
        <Map :style="{'width': subContainerWidth + 'px', 'height': subContainerHeight + 'px'}" />
      </div>
    </div>
  </div>
</template>

<script>
import Map from '@/components/Map'
import DistributionViewer from '@/components/DistributionGraph'
import jsonData from '../assets/osmviews-stats.json'

export default {
  name: 'OSMViewsContent',
  components: {
    Map,
    DistributionViewer
  },
  data () {
    return {
      jsonData: jsonData,
      subContainerHeight: 0,
      subContainerWidth: 0
    }
  },
  methods: {
    resizeHandler () {
      this.subContainerHeight = this.calculateGraphHeight(window.innerHeight, window.innerWidth)
      this.subContainerWidth = this.calculateGraphWidth(window.innerHeight, window.innerWidth)
    },
    calculateGraphHeight (windowHeight, windowWidth) {
      if (windowWidth < 1100) {
        return windowWidth * 0.8
      } else {
        if (windowHeight < 500) {
          return (500 - 100) * 0.8
        } else {
          return (windowHeight - 100) * 0.8
        }
      }
    },
    calculateGraphWidth (windowHeight, windowWidth) {
      if (windowWidth < 1100) {
        return windowWidth * 0.8
      } else {
        return windowWidth * 0.4
      }
    }
  },
  created () {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted () {
    this.subContainerHeight = this.calculateGraphHeight(window.innerHeight, window.innerWidth)
    this.subContainerWidth = this.calculateGraphWidth(window.innerHeight, window.innerWidth)
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.leaflet-map-pane {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.sub-container {
  margin-bottom: 100px;
}

</style>
