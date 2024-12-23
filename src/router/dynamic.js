/* Layout */
import Layout from "@/layout";

const dynamic = [
	{
		path: "/details",
		component: Layout,
		hidden: true,
		meta: {},
		children: [
			{
				path: "info/:id",
				component: (resolve) => require(["@/components/DetailsList"], resolve),
				name: "Info",
				meta: { title: "" },
			},
			{
				path: "collectionDetail/:id",
				component: (resolve) => require(["@/components/CollectionDetail"], resolve),
				name: "collectionDetail",
				meta: { title: "" },
			}, {
				path: "trackingInfo/:id",
				component: (resolve) => require(["@/views/BusinessManage/tracking-detail"], resolve),
				name: "trackingInfo",
				meta: { title: "" },
			}, {
				path: "changeInfo",
				component: (resolve) => require(["@/views/BusinessManage/change-detail"], resolve),
				name: "changeInfo",
				meta: { title: "" },
			}, {
				path: "bond/:id",
				component: (resolve) => require(["@/views/Settlement/BondDetail"], resolve),
				name: "Bond",
				meta: { title: "" },
			},{
				path: "addChildMerchant",
				component: (resolve) => require(["@/views/Passageway/addChildMerchant"], resolve),
				name: "addChildMerchant",
				meta: { title: "" },
			},{
				path: "editChildMerchant",
				component: (resolve) => require(["@/views/Passageway/editChildMerchant"], resolve),
				name: "editChildMerchant",
				meta: { title: "" },
			},{
				path: "orderTableEdit",
				component: (resolve) => require(["@/views/BusinessManage/orderTableEdit"], resolve),
				name: "orderTableEdit",
				meta: { title: "" },
			}, {
				path: "withdrawals/:id",
				component: () => import("@/components/withdrawalDetails"),
				name: "WithdrawalDetails",
				meta: { title: "提现详情" }
			},{
				path: "openCurrency",
				component: () => import("@/views/Currency/currency-details.vue"),
				name: "WithdrawalDetails",
				meta: { title: "币种详情" }
			},
			{
				path: "cardInfo/:id",
				component: () => import( "@/components/CardInfoList"),
				hidden: true,
				name: "cardInfo",
				meta: {
					title: "cardInfo"
				}
			},
		],
	},
];

export default dynamic;
