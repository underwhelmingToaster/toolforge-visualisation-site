<template>
  <UplotVue
    :data="data"
    :options="opts"
  />
</template>

<script>
import jsonData from './../assets/qrank-stats.json'
import UplotVue from 'uplot-vue'
import 'uplot/dist/uPlot.min.css'

export default {
  name: 'QRank-content',
  components: {
    UplotVue
  },
  methods: {
    getJsonData (fileUrl) {
      // axios.get(fileUrl).then(response => (this.jsonData = response.data))
    },
    generateDataSeries () {
      return [
        jsonData.Samples.map((item) => {
          return item[1]
        }),
        jsonData.Samples.map((item) => {
          return item[2]
        })
      ]
    }
  },
  beforeMount () {
    console.log(this.generateDataSeries())
    this.data = this.generateDataSeries()
  },
  props: {
    fileUrl: String
  },
  data () {
    return {
      jsonData: jsonData,
      data: [],
      opts: {
        width: 1920,
        height: 600,
        title: 'Area Fill',
        scales: {
          y: {
            distr: 3
          },
          x: {
            time: false
          }
        },
        series: [
          {
            label: 'Rank'
          },
          {
            label: '',
            points: { show: true },
            stroke: 'blue',
            fill: 'blue'
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
