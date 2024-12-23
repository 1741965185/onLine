<template>
  <el-scrollbar :class="settings.sideTheme" wrap-class="scrollbar-wrapper">
    <el-menu
        class="el-menu-vertical-demo"
        :default-active="activeMenu"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
    >
      <sidebar-item
          v-for="(route, index) in sidebarRouters"
          :key="route.path  + index"
          :item="route"
          :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
	import { mapGetters, mapState } from "vuex"
	import SidebarItem from "./SidebarItem"
	import variables from "@/assets/styles/variables.scss"
	import Bus from "@/utils/bus"

	export default {
		components: { SidebarItem },
		computed: {
			...mapState(["settings"]),
			...mapGetters(["sidebarRouters", "sidebar"]),
			activeMenu() {
				const route = this.$route
				const { meta, path } = route
				// if set path, the sidebar will highlight the path you set
				if (meta.activeMenu) {
					return meta.activeMenu
				}
				Bus.$emit("activeMenu", path)
				return path
			},
			showLogo() {
				return this.$store.state.settings.sidebarLogo
			},
			variables() {
				return variables
			},
			isCollapse() {
				return !this.sidebar.opened
			},
		},
	}
</script>
