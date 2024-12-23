<template>
<!--	<div class="app-wrapper" :style="{'&#45;&#45;current-color': theme}">-->
		<app-main />

</template>

<script>
import RightPanel from "@/components/RightPanel";
import { AppMain, Navbar, Settings, Sidebar, TagsView } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import { mapState } from "vuex";
import variables from "@/assets/styles/variables.scss";
import { settlementCurrency, originCurrency, merQueryAccount } from "@/api/commonFn";

export default {
	name: "Layout",
	components: {
		AppMain,
		Navbar,
		RightPanel,
		Settings,
		Sidebar,
		TagsView,
	},
	mixins: [ResizeMixin],
	created() {
		settlementCurrency().then(res => {
			let newRes = res.data.map(item => {
				return {
					label: item.currency,
					value: item.currency,
				};
			});
			this.$store.commit("SET_JsCURRENCY", newRes);
		});
		originCurrency().then(res => {
			let newRes = res.data.map(item => {
				return {
					label: item,
					value: item,
				};
			});
			this.$store.commit("SET_YsCURRENCY", newRes);
		});
		merQueryAccount().then(res => {
			let newRes = res.data.map(item => {
				return {
					label: item,
					value: item,
				};
			});
			this.$store.commit("SET_userMERNo", newRes);
		});
	},
	computed: {
		...mapState({
			theme: state => state.settings.theme,
			sideTheme: state => state.settings.sideTheme,
			sidebar: state => state.app.sidebar,
			device: state => state.app.device,
			showSettings: state => state.settings.showSettings,
			needTagsView: state => state.settings.tagsView,
			fixedHeader: state => state.settings.fixedHeader,
		}),
		classObj() {
			return {
				// hideSidebar: !this.sidebar.opened,
				// openSidebar: this.sidebar.opened,
				// withoutAnimation: this.sidebar.withoutAnimation,
				// mobile: this.device === "mobile",
			};
		},
		variables() {
			return variables;
		},
	},
	methods: {
		// handleClickOutside() {
		// 	this.$store.dispatch("app/closeSideBar", { withoutAnimation: false })
		// },
	},
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/variables.scss";

.app-wrapper {
	@include clearfix;
	position: relative;
	height: 100%;
	width: 100%;
}

.drawer-bg {
	background: #000;
	opacity: 0.3;
	width: 100%;
	top: 0;
	height: 100%;
	position: absolute;
	z-index: 999;
}

.fixed-header {
	position: fixed;
	top: 0;
	right: 0;
	z-index: 9;
	width: calc(100% - #{$sideBarWidth});
	transition: width 0.28s;
}
</style>
