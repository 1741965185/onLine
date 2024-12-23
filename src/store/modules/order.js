import i18n from "@/i18n";

//todo 没翻译2
const order = {

	state: {
		orderState: [
			{ label: i18n.t('orderState.alls'), value: null },
			{ label: i18n.t('orderState.transactionPreprocessing'), value: "1" },
			{ label: i18n.t('orderState.transactionSuccessful'), value: "5" },
			{ label: i18n.t('orderState.transactionFailed'), value: "6" },
			{ label: i18n.t('orderState.transactionCancelled'), value: "7" },
			{ label:  i18n.t('orderState.transactionCancellationProcessing'), value: "8" },
			{ label: i18n.t('orderState.refund'), value: "9" },
			{ label: i18n.t('orderState.refundProcessing'), value: "10" },
			{ label: i18n.t('orderState.chargeback'), value: "11" },
			{ label: i18n.t('orderState.chargebackProcessing'), value: "12" },
			{ label: i18n.t('orderState.freeze'), value: "13" },
			{ label: i18n.t('orderState.freezeProcessing'), value: "14" },
			{ label: i18n.t('orderState.unfreeze'), value: "15" },
			{ label: i18n.t('orderState.unfreezeProcessing'), value: "16" },
			{ label: i18n.t('orderState.chargebackAfterRefund'), value: "17" },
			{ label: i18n.t('orderState.appealSuccessful'), value: "18" },
			{ label: i18n.t('orderState.appealInProgress'), value: "19" },
			{ label: i18n.t('orderState.appealFailed'), value: "20" },
			{ label: i18n.t('orderState.preArbitration'), value: "21" },
			{ label: i18n.t('orderState.transferOrder'), value: "24" },
			{ label: i18n.t('orderState.ransferOrderProcessing'), value: "25" },
			{ label: "REVIEW", value: "22" },
		],
		tkState: [
			{ label: i18n.t('orderState.alls'), value: null },
			{ label: i18n.t('orderState.refundApplicationInProgress'), value: "0" },
			{ label: i18n.t('orderState.refundApplicationInvalid'), value: "1" },
			{ label: i18n.t('orderState.refundProcessing'), value: "2" },
			{ label: i18n.t('orderState.refundRejected'), value: "3" },
			{ label: i18n.t('orderState.refundFailed'), value: "4" },
			{ label: i18n.t('orderState.refundSuccessful'), value: "5" },
			{ label: i18n.t('orderState.refundError'), value: "99" },
		], // 退款状态
		jfState: [
			{ label: i18n.t('orderState.alls'), value: null },
			{ label: i18n.t('orderState.chargeback'), value: "11" },
			{ label: i18n.t('orderState.chargebackProcessing'), value: "12" },
			{ label: i18n.t('orderState.chargebackAfterRefund'), value: "17" },
		],
		tkReason: [
			{ label: i18n.t('orderState.outOfStock'), value: "1" },
			{ label: i18n.t('orderState.qualitySizeNegotiatedRefund'), value: "2" },
			{ label: i18n.t('orderState.goodsReturned'), value: "3" },
			{ label: i18n.t('orderState.customerCancelledOrder'), value: "4" },
			{ label: i18n.t('orderState.discount'), value: "5" },
			{ label: i18n.t('orderState.duplicatePayment'), value: "6" },
			{ label: i18n.t('orderState.suspiciousOrder'), value: "7" },
			{ label: i18n.t('orderState.other'), value: "8" },
		],
		jfReason: [
			{ label: "Fraud", value: "10" },
			{ label: "Procesiing Error", value: "12" },
			{ label: "Consumer Dispute", value: "13" },
			{ label: "Unauthorized Purchase", value: "546" },
			{ label: "Requested/required authorization not obtained", value: "4808" },
			{ label: "Transaction amount differs", value: "4831" },
			{ label: "Duplicate processing", value: "4834" },
			{ label: "Fraudulent transaction; nocardholder authorization", value: "4837" },
			{ label: "Cardholder Dispute Defective/Not as Described", value: "4853" },
			{ label: "Non-receipt of merchandise", value: "4855" },
			{ label: "Credit not processed", value: "4860" },
			{ label: "Chip Liability Shift", value: "4870" },
			{ label: "Unauthorized Purchase", value: "0546" },
			{ label: "Fraud - Card Not Present Transaction", value: "C42" },
			{ label: "Cardmember Does Not Recognize", value: "D70" },
			{ label: "Fraud", value: "0010" },
			{ label: "Non-Receipt of Goods or Services", value: "D62" },
			{ label: "other", value: "0000" },
			{ label: "Late Presentment", value: "0012" },
		],
		kzState : [
			{label: i18n.t('orderList.alls'), value: null},
			// {label: "DINERS", value: "ae"},
			{label: "DISCOVER", value: "discover"},
			{label: "WALLET", value: "E-wallet"},
			{label: "JCB", value: "jcb"},
			{label: "MASTER", value: "master"},
			{label: "ALIPAY", value: "alipay"},
			{label: "UNIONPAY", value: "unionpay"},
			{label: "Wechat", value: "wechat"},
			{label: "VISA", value: "visa"},
			{label: "DINERS", value: "diners"},
			{label: "TRC20", value: "TRC20"},
			{label: "BankTransfer", value: "bankTransfer"},
			{label: "PIX", value: "PIX"},
			{label: "AE", value: "ae"},
			{label: "GCASH", value: "gcash"},
			{label: "SEPA", value: "sepa"},
			{label: "BPI", value: "bpi"},
			{label: "TrueMoney", value: "truemoney"},
			{label: "Rabbit-line Pay", value: "rabbitLinePay"},
			{label: "Touch n Go", value: "tng"},
			{label: "Boost", value: "boost"},
			{label: "DANA", value: "dana"},
			{label: "perTransfer", value: "per_transfer"},
			{label: "PSE", value: "pse"},
		],
		jsCurrency: [],
		ysCurrency: [],
		userMerNo: [],
	},

	mutations: {
		SET_ORDER: (state, orderState) => {
			state.orderState = orderState;
		},
		SET_JsCURRENCY: (state, value) => {
			state.jsCurrency = value;
		},
		SET_YsCURRENCY: (state, value) => {
			state.ysCurrency = value;
		},
		SET_userMERNo: (state, value) => {
			value.unshift({
				label: i18n.t('orderState.alls'),
				value: "0",
			});
			state.userMerNo = value;
		},
	},

	actions: {},
};

export default order;
