import { reactive } from 'vue'

export const store = reactive({
  qrankData: null,
  osmData: null,
  currentTooltipRank: 0,
  currentLink: ''
})
