import certification from "@/store/modules/certification";

const getters = {
	sidebar: state => state.app.sidebar,
	size: state => state.app.size,
	device: state => state.app.device,
	visitedViews: state => state.tagsView.visitedViews,
	cachedViews: state => state.tagsView.cachedViews,
	token: state => state.user.token,
	name: state => state.user.name,
	introduction: state => state.user.introduction,
	roles: state => state.user.roles,
	permissions: state => state.user.permissions,
	permission_routes: state => state.permission.routes,
	topbarRouters: state => state.permission.topbarRouters,
	defaultRoutes: state => state.permission.defaultRoutes,
	sidebarRouters: state => state.permission.sidebarRouters,
	orderState: state => state.order.orderState,
	tkState: state => state.order.tkState,
	jfState: state => state.order.jfState,
	merType: state => state.user.merType,
	identity: state => state.user.identity,
	permissionMap: state => state.user.permissionMap,
	jsCurrency: state => state.order.jsCurrency,
	ysCurrency: state => state.order.ysCurrency,
	userMerNo: state => state.order.userMerNo,
	newView: state => state.user.newView,
	isPopupVisible: state => state.certification.isPopupVisible,

}
export default getters
