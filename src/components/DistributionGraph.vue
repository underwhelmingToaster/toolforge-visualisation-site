<template>
  <UplotVue
    :data="data"
    :options="opts"
  />
</template>

<script>

import UplotVue from 'uplot-vue'
import 'uplot/dist/uPlot.min.css'

export default {
  name: 'QRank-content',
  props: {
    jsonData: {
      type: Object,
      required: true
    },
    xLog: {
      type: Boolean,
      default: false
    },
    yLog: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 1000
    },
    height: {
      type: Number,
      default: 600
    }
  },
  components: {
    UplotVue
  },
  methods: {
    getJsonData (fileUrl) {
      // axios.get(fileUrl).then(response => (this.jsonData = response.data))
    },
    generateDataSeries () {
      return [
        this.jsonData.Samples.map((item) => {
          return item[1]
        }),
        this.jsonData.Samples.map((item) => {
          return item[2]
        })
      ]
    }
  },
  beforeMount () {
    this.data = this.generateDataSeries()
    if (this.xLog) {
      this.opts.scales.x.distr = 3
    }
    if (this.yLog) {
      this.opts.scales.y.distr = 3
    }
    this.opts.width = this.width
    this.opts.height = this.height
  },
  data () {
    return {
      data: [],
      opts: {
        title: 'View Distribution',
        axes: [
          {
            space: 100
          },
          {
            size: 100,
            grid: {
              show: false
            }
          }
        ],
        scales: {
          y: {
            distr: 1
          },
          x: {
            distr: 1,
            time: false
          }
        },
        series: [
          {
            label: 'Rank'
          },
          {
            label: 'Views',
            points: {
              fill: 'blue',
              show: false
            },
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
