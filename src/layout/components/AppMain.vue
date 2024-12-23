<template>
    <router-view :key="key"/>

</template>

<script>
	export default {
		name: "AppMain",
		computed: {
			cachedViews() {
				return this.$store.state.tagsView.cachedViews
			},
			key() {
				return this.$route.path
			},
		},
	}
</script>

<style lang="scss" scoped>
  .app-main {
    /* 64= navbar  64  */
    min-height: calc(100vh - 64px);
    width: calc(100% - 270px);
    position: relative;
    overflow: hidden;
    margin-left: 270px;
  }

  .fixed-header + .app-main {
    padding-top: 50px;
  }

  .hasTagsView {
    .app-main {
      /* 84 = navbar + tags-view = 50 + 34 */
      min-height: calc(100vh - 84px);
    }

    .fixed-header + .app-main {
      padding-top: 84px;
    }
  }
</style>

<style lang="scss">
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header {
      padding-right: 15px;
    }
  }
</style>
