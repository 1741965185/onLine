<template>
	<div class="app-container">
		<div class="top-title-bar">
			<h3 class="page-title">
				{{$t("dataDetail.orderDetails")}} / <span class="c-7F8DFF">{{ activities.tradeNo }}</span>
			</h3>
			<el-button class="go-back-btn" @click="$router.go(-1)">
				<svg-icon icon-class="arrow-left" />
				<span>{{$t("dataDetail.back")}}</span>
			</el-button>
		</div>
		<div class="border pd25 detail-info-wrapper" v-show="activities.type !== '1'">

			<!--基本信息-->
			<el-row type="flex" justify="space-between" class="detail-info-title">
				<el-col :span="11">{{$t("card.basic_information")}}</el-col>
			</el-row>
			<el-divider></el-divider>
			<div style="margin-bottom: 20px"></div>
			<el-row type="flex" justify="space-between">
				<el-col :span="11">
					<p>
						<label>UID</label>
						<span>{{ activities.merNo  || "-" }}</span>
					</p>
					<p>
						<label>{{$t("card.transfer_amount")}}</label><span>{{ activities.amount || "-" }} {{ activities.amountCurrency || "-" }}</span>
					</p>
					<!--					0划转 1支付 改/0转入 1支付 2转出
          -->
					<p>
						<label>{{$t("card.type")}}</label>
						<span>
        {{ activities.type === '0' ? transferIn : activities.type === '1' ? payment : activities.type ==='2' ? transferOut : '' }}
      </span>
					</p>
					<p>
						<label>{{$t("card.date")}}</label><span>{{ activities.tradeDateTime || "-" }}</span>
					</p>
				</el-col>
				<!--				卡号 交易金额 支付信息 交易地点-->
				<el-col :span="11">
					<!--					保留前后四位-->
					<p>
						<label>{{$t("card.card_number")}}</label><span>{{ activities.cardNo || "-" }}</span>
					</p>
					<p>
						<label>{{$t("card.received_amount")}}</label>
						<span>{{ activities.receivedAmount || "-" }} {{ activities.receivedAmountCurrency || "-" }}</span>
					</p>

					<p>
						<label>{{$t("card.rates")}}</label><span>{{ activities.fee  || "-" }} {{ activities.feeCurrency  || "-" }}</span>
					</p>
				</el-col>
			</el-row>


		</div  >
		<div class="border pd25 detail-info-wrapper" v-show="activities.type === '1'">

			<!--交易明细-->
			<el-row type="flex" justify="space-between" class="detail-info-title">
				<el-col :span="11">{{$t("card.transaction_details")}}</el-col>
			</el-row>
			<el-divider></el-divider>
			<div style="margin-bottom: 20px"></div>
			<el-row type="flex" justify="space-between">
				<el-col :span="11">
					<p>
						<label>UID</label>
						<span>{{ activities.merNo  || "-" }}</span>
					</p>
					<p>
						<label>{{$t("card.order_amount")}}</label><span>{{ activities.amount || "-" }} {{ activities.amountCurrency || "-" }}</span>
					</p>
<!--					0划转 1支付
-->
					<p>
						<label>{{$t("card.status")}}</label><span>{{ activities.status === 0 ? tradesuccessed : tradefail }}</span>
					</p>
					<p>
						<label>{{$t("card.mcc")}}</label><span>{{ activities.mcc || "-" }}</span>
					</p>

				</el-col>
<!--				卡号 交易金额 支付信息 交易地点-->
				<el-col :span="11">
<!--					保留前后四位-->
					<p>
						<label>{{$t("card.card_number")}}</label><span>{{ activities.cardNo || "-" }}</span>
					</p>
<!--					<p>-->
<!--						<label>交易金额</label>-->
<!--						<span>{{ activities.receivedAmount || "-" }} {{ activities.receivedAmountCurrency || "-" }}</span>-->
<!--					</p>-->
					<p>
						<label>{{$t("card.transaction_information")}}</label><span>{{ activities.payInfo || "-" }}</span>
					</p>
					<p>
						<label>{{$t("card.transaction_location")}}</label><span>{{ activities.tradeAddr || "-" }}</span>
					</p>
					<p>
						<label>{{$t("card.date")}}</label><span>{{ activities.tradeDateTime || "-" }}</span>
					</p>
				</el-col>
			</el-row>

			<!-- 交易费用 -->
			<el-row type="flex" justify="space-between" class="detail-info-title">
				<el-col :span="11">{{$t("card.handling_fee")}}</el-col>
			</el-row>
			<el-divider></el-divider>
			<div style="margin-bottom: 20px"></div>
			<el-row type="flex" justify="space-between">
				<el-col :span="11">
					<p>
						<label>{{$t("card.handling_fee")}}</label>
						<span>{{ activities.fee  || feeDescr }} {{ activities.feeCurrency  || "" }}</span>
					</p>

				</el-col>
				<!--				卡号 交易金额 支付信息 交易地点-->
				<el-col :span="11">

				</el-col>
			</el-row>

		</div  >
	</div>
</template>

<script>
import pagination from "@/components/Pagination";
import {queryDd, queryDeta, getTradeLogList, getCardTransactionById} from "@/api/business";
import i18n from "@/i18n";

export default {
	name: "Info",
	components: {
		pagination,
	},
	data() {
		return {
			feeDescr: i18n.t('card.feeDescr'),
			tradesuccessed:i18n.t('card.success'),
			tradefail:i18n.t('card.fail'),
			transfer: i18n.t('card.transfered'),
			transferIn: i18n.t('sysText.home_buy'),
			transferOut: i18n.t('sysText.home_sell'),
			payment: i18n.t('card.payment'),
			activeNames: ["1"],
			infoForm: {}, // 表单数据
			tradeno: undefined, //
			listHistory: [], // 历史变更列表
			dialogVisible: false, // card email 弹窗
			tablelList: [], // 卡号,邮箱交易记录信息
			cardOrEamil: undefined, // 初始化弹窗内容 卡号还是email
			// 分页data
			pageNum: 1,
			pageSize: 15,
			total: 0,
			subtitle: undefined,
			cardAndEamil: undefined,
			attachments: [],
			payerForm: {
				payerName: '',
				payerEmail: '',
				payerNationality: '',
				payerBirthday: '',
				businessModel: '',
				fundUsageDescription: '',
				proofOfDeliveryInformation: '',
				profitModel: '',
				customerAcquisitionModel: '',
				transactionWebsite: '',
				payeeName: '',
				payeeNationality: '',
				payeeBirthday: '',
				documentsProvingSourceOfFunds: [],
				payerIdentityDocument: [],
				buyerConfirmationLetter: [],
				buyerPaymentStatement: [],
				documentProvingBusinessTransactions: [],
				transactionProofDocuments: [],
				transactionDetails: [],
				historicalOrderRecords: [],
				communicationRecordsWithPayers: []
			},
			fileList: {
				payerIdentityDocument: [],
				buyerConfirmationLetter: [],
				buyerPaymentStatement: [],
				documentProvingBusinessTransactions: [],
				transactionProofDocuments: [],
				transactionDetails: [],
				historicalOrderRecords: [],
				communicationRecordsWithPayers: []
			},
			formItems: [
				{ label: '付款人名称', model: 'payerName', isFile: false },
				{ label: '付款人邮箱', model: 'payerEmail', isFile: false },
				{ label: '付款人国籍', model: 'payerNationality', isFile: false },
				{ label: '付款人出生日期', model: 'payerBirthday', isFile: false },
				{ label: '业务模式', model: 'businessModel', isFile: false },
				{ label: '资金用途说明', model: 'fundUsageDescription', isFile: false },
				{ label: '交货证明信息（物流公司名称）', model: 'proofOfDeliveryInformation', isFile: false },
				{ label: '盈利模式', model: 'profitModel', isFile: false },
				{ label: '客户获取方式', model: 'customerAcquisitionModel', isFile: false },
				{ label: '交易网站', model: 'transactionWebsite', isFile: false },
				{ label: '收款人名称', model: 'payeeName', isFile: false },
				{ label: '收款人国籍', model: 'payeeNationality', isFile: false },
				{ label: '收款人出生日期', model: 'payeeBirthday', isFile: false },
				{ label: '资金来源文件', model: 'documentsProvingSourceOfFunds', isFile: true },
				{ label: '付款人身份证明文件', model: 'payerIdentityDocument', isFile: true },
				{ label: '买家确认函', model: 'buyerConfirmationLetter', isFile: true },
				{ label: '买家付款凭证', model: 'buyerPaymentStatement', isFile: true },
				{ label: '业务证明文件', model: 'documentProvingBusinessTransactions', isFile: true },
				{ label: '交易证明文件', model: 'transactionProofDocuments', isFile: true },
				{ label: '交易详情', model: 'transactionDetails', isFile: true },
				{ label: '订单历史', model: 'historicalOrderRecords', isFile: true },
				{ label: '沟通记录', model: 'communicationRecordsWithPayers', isFile: true }
			],
			submitOrderInfo: {},

			activities:[
          {
          log: '创建提现订单',
          time: '2024-04-07 15:37'
          }, {
          log: '审核通过，订单提交至上游',
          time: '2024-04-07 15:40'
          }, {
          log: '审核拒绝，提现失败',
          time: '2024-04-07 15:41'
          }]
		};
	},
	created() {
		const tradeno = this.$route.params && this.$route.params.id;
		this.tradeno = tradeno;
		this.getDetail(tradeno);
	},
	watch: {
		cardOrEamil: function() {
			this.pageNum = 1;
		},
	},
	methods: {
		getLabel(model) {
			const item = this.formItems.find(item => item.model === model);
			return item ? item.label : '';
		},
		isFile(model) {
			const item = this.formItems.find(item => item.model === model);
			return item ? item.isFile : false;
		},
		// 请求订单详情
		getDetail(tradeno) {
			getCardTransactionById({ id:tradeno }).then(result => {
        this.activities = result.data;
      });

		},
		// 邮件和卡号查询详情
		openAttachment(attachment) {
			// 在这里处理打开附件的逻辑，比如根据附件ID获取内容并展示到页面上
			console.log('打开附件:', attachment.name);

			// 示例逻辑：模拟打开附件的操作
			if (attachment.url) {
				window.open(attachment.url); // 在新标签页中打开附件链接
			} else {
				console.log('附件链接不存在');
			}
		},
		emailAndCard(params) {
			if (params.email) {
				this.cardOrEamil = "email";
			} else {
				this.cardOrEamil = "card";
			}
			this.cardAndEamil = params;
			this.getQueryDeta();
		},
		getQueryDeta() {
			queryDeta({ ...this.cardAndEamil, pageNum: this.pageNum, pageSize: this.pageSize }).then(result => {
				if (this.cardOrEamil === "email") {
					this.subtitle = this.infoForm.email;
				} else {
					this.subtitle = this.infoForm._cardnotruncation;
				}
				this.tablelList = result.list;
				this.total = result.total;
				this.dialogVisible = true;
			});
		},
	},
};
</script>

<style scoped lang="less">
@import "../../assets/styles/detailsList";
</style>
<style scoped lang="less">
.app-container {
	/deep/ .el-dialog {
		display: flex;
		display: -ms-flex; /* 兼容IE */
		flex-direction: column;
		-ms-flex-direction: column; /* 兼容IE */
		margin: 0 !important;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-width: calc(100% - 30px);
		height: 480px;
	}

	/deep/ .el-dialog .el-dialog__body {
		max-height: 100%;
		flex: 1;
		-ms-flex: 1 1 auto; /* 兼容IE */
		overflow-y: auto;
		overflow-x: hidden;
	}

	/deep/ .el-dialog__wrapper {
		/*隐藏ie和edge中遮罩的滚动条*/
		overflow: hidden;
	}
}

.clearfix {
	overflow: hidden;
}

.page-eve-css {
	display: flex;
	align-items: flex-start;
	margin-bottom: 15px;
	padding: 10px;
	background: #fff;
	//border-radius: 5px;
	//box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.page-eve-key {
	font-weight: bold;
	width: 200px;
	color: #34495e;
}
.page-eve-value {
	flex: 1;
	color: #7f8c8d;
}
.attachment-list {
	list-style: none;
	padding: 0;
	margin: 0;
}
.attachment-item {
	cursor: pointer;
	color: #3498db;
	text-decoration: underline;
	margin-bottom: 5px;
}
.attachment-item:hover {
	color: #2980b9;
}
.attachment-item img {
	max-width: 100%;
	display: block;
	margin-top: 10px;
}
</style>
