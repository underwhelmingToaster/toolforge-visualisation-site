<template>
  <div class="container">
    <div class="sub-container">
      <DistributionViewer :json-data=jsonData :x-log=true :y-log=true :width=subContainerWidth :height=subContainerWidth  :key= "subContainerWidth + '/' + subContainerHeight"/>
    </div>
    <div class="sub-container" >
      <Map :width=subContainerWidth :height=subContainerHeight :key= "subContainerWidth + '/' + subContainerHeight" />
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
      if (windowWidth < 800) {
        return 300
      } else {
        return windowHeight * 0.6
      }
    },
    calculateGraphWidth (windowHeight, windowWidth) {
      if (windowWidth < 800) {
        return 400
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
  justify-content: left;
  flex-wrap: wrap;
}
</style>
