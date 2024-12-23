<template>
    <div :id="params.id" :style="{width:'100%',height:'100%'}"></div>
</template>

<script>
  export default {
    name: "pieCharts",
    props: {
      params: Object
    },
    mounted() {
      window.addEventListener('resize', this.chartResize)
    },
    computed: {
      chartAttrDom() {
        const dom = document.getElementById(this.params.id)
        return dom && this.$echarts.init(dom)
      },
      chartResize() {
        return _.throttle(() => this.chartAttrDom && this.chartAttrDom.resize(), 400)
      }
    },
    methods: {
      drawLine() {
        if (this.chartAttrDom) this.chartAttrDom.clear()
        this.chartAttrDom.setOption(this.params.options)
      }
    },
    destroyed() {
      window.removeEventListener('resize', this.chartResize)
    }
  }
</script>