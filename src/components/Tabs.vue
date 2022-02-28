<template>
  <div class="tabBar">
    <a href="#/qrank"><button class="tab">QRank</button></a>
    <a href="#/osm-views"><button class="tab">OSM Views</button></a>
  </div>
</template>

<script>
import { store } from '@/store'

export default {
  name: 'Tabs',
  props: {
    tabs: Array
  },
  data () {
    return {
      store
    }
  },
  methods: {
    setTab (tabNr) {
      store.tab = tabNr
      const tabs = document.getElementsByClassName('tab')
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(' active', '')
        if (tabNr === i) {
          tabs[i].className += ' active'
        }
      }
    }
  }
}
</script>

<style scoped>
  .tabBar {
    overflow: hidden;
    margin: 16px;
  }

  .tab {
    background-color: inherit;
    float: left;
    outline: none;
    cursor: pointer;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: .25rem;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.85);
    display: inline-flex;
    font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 16px;
    font-weight: 600;
    justify-content: center;
    line-height: 1.25;
    margin: 8px;
    min-height: 3rem;
    padding: calc(.875rem - 1px) calc(1.5rem - 1px);
    position: relative;
    text-decoration: none;
    transition: all 250ms;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: baseline;
  }

  .tab:hover,
  .tab:focus {
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    color: rgba(0, 0, 0, 0.65);
  }

  .tab:hover {
    transform: translateY(-1px);
  }

  .active {
    background-color: #F0F0F1;
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    color: rgba(0, 0, 0, 0.65);
    transform: translateY(0);
  }
</style>
