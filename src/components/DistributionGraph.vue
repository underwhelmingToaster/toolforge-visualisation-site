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
    },
    tooltipsPlugin (opts) {
      function init (u, opts, data) {
        const over = u.over

        const ttc = u.cursortt = document.createElement('div')
        ttc.className = 'tooltip'
        ttc.textContent = '(x,y)'
        ttc.style.pointerEvents = 'none'
        ttc.style.position = 'absolute'
        ttc.style.background = 'rgba(0,0,255,0.1)'
        over.appendChild(ttc)

        u.seriestt = opts.series.map((s, i) => {
          if (i === 0) return

          const tt = document.createElement('div')
          tt.className = 'tooltip'
          tt.textContent = 'Tooltip!'
          tt.style.pointerEvents = 'none'
          tt.style.position = 'absolute'
          tt.style.background = 'rgba(0,0,0,0.1)'
          tt.style.color = s.color
          tt.style.display = s.show ? null : 'none'
          over.appendChild(tt)
          return tt
        })

        function hideTips () {
          ttc.style.display = 'none'
          u.seriestt.forEach((tt, i) => {
            if (i === 0) return

            tt.style.display = 'none'
          })
        }

        function showTips () {
          ttc.style.display = null
          u.seriestt.forEach((tt, i) => {
            if (i === 0) return

            const s = u.series[i]
            tt.style.display = s.show ? null : 'none'
          })
        }

        over.addEventListener('mouseleave', () => {
          if (!u.cursor.lock) {
            // u.setCursor({left: -10, top: -10});
            hideTips()
          }
        })

        over.addEventListener('mouseenter', () => {
          showTips()
        })

        hideTips()
      }

      function setCursor (u) {
        const { left, top, idx } = u.cursor

        // this is here to handle if initial cursor position is set
        // not great (can be optimized by doing more enter/leave state transition tracking)
        // if (left > 0)
        // u.cursortt.style.display = null;

        u.cursortt.style.left = left + 'px'
        u.cursortt.style.top = top + 'px'
        u.cursortt.textContent = '(' + u.posToVal(left, 'x').toFixed(2) + ', ' + u.posToVal(top, 'y').toFixed(2) + ')'

        // can optimize further by not applying styles if idx did not change
        u.seriestt.forEach((tt, i) => {
          if (i === 0) return

          const s = u.series[i]

          if (s.show) {
            // this is here to handle if initial cursor position is set
            // not great (can be optimized by doing more enter/leave state transition tracking)
            // if (left > 0)
            // tt.style.display = null;

            const xVal = u.data[0][idx]
            const yVal = u.data[i][idx]

            tt.textContent = '(' + xVal + ', ' + yVal + ')'

            tt.style.left = Math.round(u.valToPos(xVal, 'x')) + 'px'
            tt.style.top = Math.round(u.valToPos(yVal, s.scale)) + 'px'
          }
        })
      }

      return {
        hooks: {
          init,
          setCursor,
          setScale: [
            (u, key) => {
              console.log('setScale', key)
            }
          ],
          setSeries: [
            (u, idx) => {
              console.log('setSeries', idx)
            }
          ]
        }
      }
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
        ],
        plugins: [
          this.tooltipsPlugin()
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
