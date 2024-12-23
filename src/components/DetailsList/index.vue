<template>
  <div class="app-container">
		<!--顶部标题栏-->
    <div class="top-title-bar">
      <h3 class="page-title">
          {{$t('dataDetail.orderDetails')}} / <span class="c-7F8DFF">{{ tradeNo }}</span>
      </h3>
      <el-button class="go-back-btn" @click="$router.go(-1)">
        <svg-icon icon-class="arrow-left"/>
        <span>{{$t('dataDetail.back')}}</span>
      </el-button>
    </div>
		<!--基础信息栏-->
    <div class="border pd25 detail-info-wrapper">

			<!--订单动态-->
      <el-row  type="flex" justify="space-between" class="detail-info-title">
        <el-col :span="11">{{$t('withdrawDetails.tradeTrends')}}</el-col>
      </el-row>
      <el-divider></el-divider>
      <div style="height: 5px"></div>
      <div class="block">
        <el-timeline  >
          <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              hide-timestamp="false"
              size="large"
              :timestamp="activity.time">
            {{activity.time}}&emsp;&ensp;{{activity.log}}
          </el-timeline-item>
        </el-timeline>
      </div>
			<div style="height: 12px"></div>

			<!--交易明细-->
			<div>
<!--				<el-divider></el-divider>-->
				<el-row type="flex" justify="space-between" class="detail-info-title">
					<el-col>{{$t('dataDetail.transactionDetails')}}</el-col>
				</el-row>
				<el-divider></el-divider>
				<el-row type="flex" justify="space-between">
					<el-col :span="11">
						<p>
							<label>{{$t('dataDetail.amount')}}</label><span>{{ orderInfoForm.sourceAmount || "-" }} {{orderInfoForm.currencyCode}}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.settlementAmount')}}</label><span>{{ orderInfoForm.settleAmount || "0" }} {{orderInfoForm.settleCurrency}}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.payMethod')}}</label><span>{{ orderInfoForm.cardName || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.website')}}</label><span>{{ orderInfoForm.merWebSite || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.userIp')}}</label><span>{{ orderInfoForm.ipAddress || "-" }}</span>
						</p>
					</el-col>
					<el-col :span="11">
						<p>
							<label>{{$t('dataDetail.transactionNo')}}</label><span>{{ orderInfoForm.tradeNo || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.orderNo')}}</label><span>{{ orderInfoForm.merOrderNo || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.paid')}}</label>
							<span v-if="orderInfoForm.hkId > 0">{{$t('dataDetail.yhk')}}</span>
							<span v-else-if="orderInfoForm.hkId == 0">{{$t('dataDetail.whk')}}</span>
							<span v-else>-</span>
						</p>
							<p>
									<label>{{$t('dataDetail.userId')}}</label>
									<span>{{ orderInfoForm.user_id || "-" }}</span>
							</p>
					</el-col>
				</el-row>
			</div>
			<!--交易费用-->
			<div v-if="creditCard.includes(orderInfoForm.cardName)">
				<el-row type="flex" justify="space-between" class="detail-info-title">
					<el-col :span="11">{{$t('dataDetail.transferFee')}}</el-col>
				</el-row>
				<el-divider></el-divider>
				<el-row type="flex" justify="space-between">
					<el-col :span="11">
						<p>
							<label>{{$t('dataDetail.fee')}}</label><span>{{ orderInfoForm.fee || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.deposit')}}</label><span>{{ orderInfoForm.bailAmount || "-" }}</span>
						</p>
					</el-col>
					<el-col :span="11">
						<p>
							<label>{{$t('dataDetail.transfee')}}</label><span>{{ orderInfoForm.tradeFee || "-" }}</span>
						</p>
					</el-col>
				</el-row>
			</div>

			<div v-if="baseCard.includes(orderInfoForm.cardName)
			|| orderInfoForm.cardName === null
			|| orderInfoForm.cardName === 'spea'
			|| orderInfoForm.cardName === 'bankTransfer'">
				<el-row type="flex" justify="space-between" class="detail-info-title">
					<el-col :span="11">{{$t('dataDetail.transferFee')}}</el-col>
				</el-row>
				<el-divider></el-divider>
				<el-row type="flex" justify="space-between">
					<el-col :span="11">
						<p>
							<label>{{$t('dataDetail.fee')}}</label><span>{{ orderInfoForm.fee || "-" }}</span>
						</p>
					</el-col>
					<el-col :span="11">
						<p>
							<label>{{$t('dataDetail.transfee')}}</label><span>{{ orderInfoForm.tradeFee || "-" }}</span>
						</p>
					</el-col>
				</el-row>
			</div>
			<!--账单信息和收货信息-->
			<div v-if="creditCard.includes(orderInfoForm.cardName)">
      <el-row type="flex" justify="space-between" class="detail-info-title">
        <el-col :span="11">{{$t('dataDetail.billInfo')}}</el-col>
        <el-col :span="11">{{$t('dataDetail.receiverInfo')}}</el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row type="flex" justify="space-between">
        <el-col :span="11">
          <p>
            <label>{{$t('dataDetail.receiverName')}}</label><span>{{ orderInfoForm.name || "-" }}</span>
          </p>
          <p>
            <label>{{$t('dataDetail.phone')}}</label><span>{{ orderInfoForm.tel || "-" }}</span>
          </p>
          <p>
            <label>{{$t('dataDetail.email')}}</label><span>{{ orderInfoForm.email || "-" }}</span>
          </p>
          <p>
            <label>{{$t('dataDetail.zipCode')}}</label><span>{{ orderInfoForm.zipCode || "-" }}</span>
          </p>
          <p>
            <label>{{$t('dataDetail.country')}}</label><span>{{ orderInfoForm.country || "-" }}</span>
          </p>
          <p>
            <label>{{$t('dataDetail.state')}}</label><span>{{ orderInfoForm.state || "-" }}</span>
          </p>
          <p>
            <label>{{$t('dataDetail.city')}}</label><span>{{ orderInfoForm.city || "-" }}</span>
          </p>
          <p>
            <label>{{$t('dataDetail.address')}}</label><span>{{ orderInfoForm.address || "-" }}</span>
          </p>
        </el-col>
        <el-col :span="11">
          <p>
            <label>{{$t('dataDetail.receiverName')}}</label><span>{{ orderInfoForm.scardHolder || "-" }}</span>
          </p>
          <p>
            <label>{{$t('dataDetail.receiverPhone')}}</label><span>{{ orderInfoForm.shipPhone || "-" }}</span>
          </p>
          <p>
            <label>{{$t('dataDetail.receiverEmail')}}</label><span>{{ orderInfoForm.shipEmail || "-" }}</span>
          </p>
          <p>
            <label>{{$t('dataDetail.receiverZip')}}</label><span>{{ orderInfoForm.shipZip || "-" }}</span>
          </p>
          <p>
            <label>{{$t('dataDetail.receiverCountry')}}</label><span>{{ orderInfoForm.shipCountry || "-" }}</span>
          </p>
          <p>
            <label>{{$t('dataDetail.receiverState')}}</label><span>{{ orderInfoForm.shipState || "-" }}</span>
          </p>
          <p>
            <label>{{$t('dataDetail.receiverCity')}}</label><span>{{ orderInfoForm.shipCity || "-" }}</span>
          </p>
          <p>
            <label>{{$t('dataDetail.receiverAddress')}}</label><span>{{ orderInfoForm.shipAddress || "-" }}</span>
          </p>
        </el-col>
      </el-row>
		</div>

			<!--数字货币交易费用-->
			<div v-if="orderInfoForm.businessType === 3 ||  orderInfoForm.cardName === 'CRYPTO' ">
				<el-row type="flex" justify="space-between" class="detail-info-title">
					<el-col :span="11">{{$t('dataDetail.transferFee')}}</el-col>
				</el-row>
				<el-divider></el-divider>
				<el-row type="flex" justify="space-between">
					<el-col :span="11">
						<p>
							<label>{{$t('dataDetail.fromAddress')}}</label><span>{{ orderInfoForm.fromAddress || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.toAddress')}}</label><span>{{ orderInfoForm.toAddress || "-" }}</span>
						</p>
					</el-col>
					<el-col :span="11">
						<p>
							<label>{{$t('dataDetail.netWork')}}</label><span>{{ orderInfoForm.paymentType || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.txHash')}}</label><span>{{ orderInfoForm.TXID || "-" }}</span>
						</p>					</el-col>
				</el-row>
			</div>

			<!--银行转账-->
			<div v-if="orderInfoForm.cardName === 'bankTransfer'">
				<el-row type="flex" justify="space-between" class="detail-info-title">
					<el-col :span="11">{{$t('dataDetail.bankTransfer')}}</el-col>
				</el-row>
				<el-divider></el-divider>
				<el-row type="flex" justify="space-between">
					<el-col :span="11">
						<p>
							<label>{{$t('dataDetail.account')}}</label>
							<span>{{ orderInfoForm.account || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.accountName')}}</label>
							<span>{{ orderInfoForm.accountName || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.bankName')}}</label>
							<span>{{ orderInfoForm.bankName || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.payerName')}}</label>
							<span>{{ orderInfoForm.paymentAccountName || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.transferSenderCardNumber')}}</label>
							<span>{{ orderInfoForm.paymentAccount || "-" }}</span>
						</p>
					</el-col>
					<el-col :span="11">
						<p>
							<label>{{$t('dataDetail.bankCountry')}}</label>
							<span>{{ orderInfoForm.receivingCountry || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.bankAccountCurrency')}}</label>
							<span>{{ orderInfoForm.currency || "-" }}</span>
						</p>
						<p>
							<label>SWIFT/BIC</label>
							<span>{{ orderInfoForm.swift || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.transferSenderBankName')}}</label>
							<span>{{ orderInfoForm.paymentBankName || "-" }}</span>
						</p>
					</el-col>
				</el-row>
			</div>
			<!--SEPA信息-->
			<div v-if="orderInfoForm.cardName === 'sepa'">
				<el-row type="flex" justify="space-between" class="detail-info-title">
					<el-col :span="11">{{$t('SEPA')}}</el-col>
				</el-row>
				<el-divider></el-divider>
				<el-row type="flex" justify="space-between">
					<el-col :span="11">
						<p>
							<label>{{$t('Receiver Name')}}</label><span>{{ orderInfoForm.receiverName || "-" }}</span>
						</p>
						<p>
							<label>{{$t('IBAN')}}</label><span>{{ orderInfoForm.iban || "-" }}</span>
						</p>
						<p>
							<label>{{$t('Reference')}}</label><span>{{ orderInfoForm.reference || "-" }}</span>
						</p>
					</el-col>
					<el-col :span="11">
						<p>
							<label>{{$t('BIC')}}</label><span>{{ orderInfoForm.bic || "-" }}</span>
						</p>
						<p>
							<label>{{$t('Bank Name')}}</label><span>{{ orderInfoForm.sepaBankName || "-" }}</span>
						</p>
					</el-col>
				</el-row>
			</div>
			<!--掉单文件-->
			<div v-if="orderInfoForm.cardName === 'sepa'">
				<el-row type="flex" justify="space-between" class="detail-info-title">
					<el-col :span="11">{{$t('orderFile.proof_of_delivery_document')}}</el-col>
				</el-row>
				<el-divider></el-divider>
				<div v-for="item in formItems" :key="item.model" class="page-eve-css" v-if="submitOrderInfo && submitOrderInfo[item.model] && (isFile(item.model) ? submitOrderInfo[item.model].length > 0 : true)">
					<div class="page-eve-key">{{ getLabel(item.model) }}:</div>
					<div class="page-eve-value" v-if="isFile(item.model)">
						<ul class="attachment-list">
							<li v-for="file in submitOrderInfo[item.model]" :key="file.fileName" class="attachment-item">
								<a :href="file.url" target="_blank">{{ file.fileName }}</a>
							</li>
						</ul>
					</div>
					<div class="page-eve-value" v-else>{{ submitOrderInfo[item.model] }}</div>
				</div>      <div style="height: 40px"></div>
			</div>

			<div v-if="orderInfoForm.cardName === 'perTransfer'">
				<el-row type="flex" justify="space-between" class="detail-info-title">
					<el-col :span="11">{{$t('dataDetail.perTransfer')}}</el-col>
				</el-row>
				<el-divider></el-divider>
				<el-row type="flex" justify="space-between">
					<el-col :span="11">
						<p>
							<label>{{$t('dataDetail.accountName')}}</label>
							<span>{{ orderInfoForm.name || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.peremail')}}</label>
							<span>{{ orderInfoForm.email || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.document_type')}}</label>
							<span>{{ getDocumentType(orderInfoForm.customerIdentificationType) || "-" }}</span>
						</p>
					</el-col>
					<el-col :span="11">
						<p>
							<label>{{$t('dataDetail.phone')}}</label>
							<span>{{ orderInfoForm.tel || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.idNumber')}}</label>
							<span>{{ orderInfoForm.customerIdentification || "-" }}</span>
						</p>
					</el-col>
				</el-row>
			</div>


			<div v-if="orderInfoForm.cardName === 'pse'">
				<el-row type="flex" justify="space-between" class="detail-info-title">
					<el-col :span="11">{{$t('pse')}}</el-col>
				</el-row>
				<el-divider></el-divider>
				<el-row type="flex" justify="space-between">
					<el-col :span="11">
						<p>
							<label>{{$t('dataDetail.accountName')}}</label>
							<span>{{ orderInfoForm.name || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.peremail')}}</label>
							<span>{{ orderInfoForm.email || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.document_type')}}</label>
							<span>{{ getDocumentType(orderInfoForm.customerIdentificationType) || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.account')}}</label>
							<span>{{ orderInfoForm.account || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.BankID')}}</label>
							<span>{{ orderInfoForm.account || "-" }}</span>
						</p>
					</el-col>
					<el-col :span="11">
						<p>
							<label>{{$t('dataDetail.phone')}}</label>
							<span>{{ orderInfoForm.tel || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.idNumber')}}</label>
							<span>{{ orderInfoForm.customerIdentification || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.address')}}</label>
							<span>{{ orderInfoForm.address || "-" }}</span>
						</p>
						<p>
							<label>{{$t('dataDetail.Payer')}}</label>
							<span>{{ orderInfoForm.paymentAccountName || "-" }}</span>
						</p>
					</el-col>
				</el-row>
			</div>


<!--			&lt;!&ndash;风险信息&ndash;&gt;-->
<!--      <el-divider></el-divider>-->
<!--      <el-row type="flex" justify="space-between" class="detail-info-title">-->
<!--        <el-col>{{$t('dataDetail.riskInfo')}}</el-col>-->
<!--      </el-row>-->
<!--      <el-divider></el-divider>-->
<!--      <el-row type="flex" justify="space-between">-->
<!--        <el-col :span="6">-->
<!--          <p>-->
<!--            <label>{{$t('dataDetail.crossBorder')}}</label><span>{{ orderInfoForm.countryMatch || "-" }}</span>-->
<!--          </p>-->
<!--          <p>-->
<!--            <label>{{$t('dataDetail.realIssuingCountry')}}</label><span>{{ orderInfoForm.bincountry || "-" }}</span>-->
<!--          </p>-->
<!--          <p>-->
<!--            <label>{{$t('dataDetail.paymentCountry')}}</label><span>{{ orderInfoForm.binCountry || "-" }}</span>-->
<!--          </p>-->
<!--          <p>-->
<!--            <label>{{$t('dataDetail.billingCountry')}}</label><span>{{ orderInfoForm.country || "-" }}</span>-->
<!--          </p>-->
<!--          <p>-->
<!--            <label>{{$t('dataDetail.receivingCountry')}}</label><span>{{ orderInfoForm.shipCountry || "-" }}</span>-->
<!--          </p>-->
<!--          <p>-->
<!--            <label>{{$t('dataDetail.receivingCountry')}}</label><span></span>-->
<!--          </p>-->
<!--        </el-col>-->
<!--        <el-col :span="6">-->
<!--          <p><label>{{$t('dataDetail.ipInfo')}}</label><span>{{ orderInfoForm.ipAddress || "-" }}</span></p>-->
<!--          <p><label>{{$t('dataDetail.country')}}</label><span>{{ orderInfoForm.binCountry || "-" }}</span></p>-->
<!--          <p>-->
<!--            <label>{{$t('dataDetail.completedTransactions')}}</label><span></span>-->
<!--          </p>-->
<!--        </el-col>-->
<!--        <el-col :span="6">-->
<!--          <p>-->
<!--            <label>{{$t('dataDetail.highRiskCountries')}}</label><span>{{ orderInfoForm.highRiskCountry || "-" }}</span>-->
<!--          </p>-->
<!--        </el-col>-->
<!--      </el-row>-->
    </div>

    <el-dialog :title="$t('orderChange.title')" :visible.sync="dialogVisible" width="60%">
      <el-table style="width: 100%" :data="tablelList">
        <el-table-column prop="id" min-width="140px" :label="$t('dataDetail.id')"></el-table-column>
        <el-table-column prop="goodsName" min-width="200px" :label="$t('dataDetail.goodsName')"></el-table-column>
        <el-table-column prop="qty" min-width="170px" :label="$t('dataDetail.qty')"></el-table-column>
        <el-table-column prop="price" min-width="140px" :label="$t('dataDetail.price')"></el-table-column>
        <el-table-column prod="basecode" min-width="140px" :label="$t('dataDetail.currency')"></el-table-column>
        <el-table-column prop="totalPrice" :label="$t('dataDetail.totalPrice')"></el-table-column>
      </el-table>

      <pagination
          :total="total"
          :page.sync="pageNum"
          :limit.sync="pageSize"
          @pagination="emailAndCard"
      ></pagination>
    </el-dialog>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import { queryDd, getCargodeDetails ,getDetailsDynamic} from "@/api/business";
import orderInfo from "@/components/DetailsList/orderInfo.vue";
import i18n from "@/i18n";

export default {
  name: "Info",
  components: {
    pagination,
  },
  data() {
    return {
      formItems: [
        { label: i18n.t('orderFile.payer_name'), model: 'payerName', isFile: false },
        { label: i18n.t('orderFile.payer_email'), model: 'payerEmail', isFile: false },
        { label: i18n.t('orderFile.payer_nationality'), model: 'payerNationality', isFile: false },
        { label: i18n.t('orderFile.payer_birthday'), model: 'payerBirthday', isFile: false },
        { label: i18n.t('orderFile.business_model'), model: 'businessModel', isFile: false },
        { label: i18n.t('orderFile.fund_usage_description'), model: 'fundUsageDescription', isFile: false },
        { label: i18n.t('orderFile.proof_of_delivery_information'), model: 'proofOfDeliveryInformation', isFile: false },
        { label: i18n.t('orderFile.profit_model'), model: 'profitModel', isFile: false },
        { label: i18n.t('orderFile.customer_acquisition_model'), model: 'customerAcquisitionModel', isFile: false },
        { label: i18n.t('orderFile.transaction_website'), model: 'transactionWebsite', isFile: false },
        { label: i18n.t('orderFile.payee_name'), model: 'payeeName', isFile: false },
        { label: i18n.t('orderFile.payee_nationality'), model: 'payeeNationality', isFile: false },
        { label: i18n.t('orderFile.payee_birthday'), model: 'payeeBirthday', isFile: false },
        { label: i18n.t('orderFile.proof_of_funds_documents'), model: 'documentsProvingSourceOfFunds', isFile: true },
        { label: i18n.t('orderFile.payer_identity_document'), model: 'payerIdentityDocument', isFile: true },
        { label: i18n.t('orderFile.buyer_confirmation_letter'), model: 'buyerConfirmationLetter', isFile: true },
        { label: i18n.t('orderFile.buyer_payment_statement'), model: 'buyerPaymentStatement', isFile: true },
        { label: i18n.t('orderFile.business_transaction_documents'), model: 'documentsProvingBusinessTransactions', isFile: true },
        { label: i18n.t('orderFile.transaction_proof_documents'), model: 'transactionProofDocuments', isFile: true },
        { label: i18n.t('orderFile.transaction_details'), model: 'transactionDetails', isFile: true },
        { label: i18n.t('orderFile.historical_order_records'), model: 'historicalOrderRecords', isFile: true },
        { label: i18n.t('orderFile.payer_communication_records'), model: 'communicationRecordsWithPayers', isFile: true }
      ],
      attachments: [],
			creditCard:["visa","master","jcb","ae","diners","discover"],
			baseCard:["alipay","unionpay","gcash","bpi","pix","rabbitLinePay","tng","boost","dana","perTransfer","pse"],
			// 00：身份证（CC）\r\n01：外国人身份证（CE）\r\n02:   税号\r\n03：护照（PAS)\r\n04：离境证（PAR）\r\n05：军官证（LMI',
			documentType:[
				{code:"00",name:i18n.t('dataDetail.Identity')},
				{code:"01",name:i18n.t('dataDetail.Foreigner')},
				{code:"02",name:i18n.t('dataDetail.Tax')},
				{code:"03",name:i18n.t('dataDetail.Passport')},
				{ code: "04", name: i18n.t('dataDetail.ExitCertificate') }, // Exit Certificate
				{ code: "05", name: i18n.t('dataDetail.OfficerCertificate') }
			],
      activeNames: ["1"],
      detailMap: {}, // 交易信息
      tradeNo: undefined, //
      listHistory: [], // 历史变更列表
      dialogVisible: false, // card email 弹窗
      tablelList: [], // 货物交易记录信息
      cardOrEamil: undefined, // 初始化弹窗内容 卡号还是email
      // 分页data
      pageNum: 1,
      pageSize: 15,
      total: 0,
      subtitle: undefined,
      orderStatus: undefined, //状态
      CreditDetail: {}, //账单信息
      goodsDetail: {}, //收获地址
      riskDetail: {
        cardnoNum: "",
        ipNum: "",
      }, //风险信息
      Cur: "",//币种
      orderInfoForm: {},
      submitOrderInfo: {},
      activities: []
    };
  },

  created() {
    const tradeNo = this.$route.params && this.$route.params.id;
    this.tradeNo = tradeNo;
    this.getDetail();
  },
  methods: {
		getDocumentType(typeCode){
			const item =  this.documentType.find(item => item.code === typeCode);
			return item? item.name : '';
		},
    getLabel(model) {
      const item = this.formItems.find(item => item.model === model);
      return item ? item.label : '';
    },
    isFile(model) {
      const item = this.formItems.find(item => item.model === model);
      return item ? item.isFile : false;
    },
    // 请求订单详情
    getDetail() {

      // 获取订单动态
      getDetailsDynamic({
        tradeNo: this.tradeNo,
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.activities = res.data;

        }
        }).catch(err => {
      });

      queryDd({
        tradeNo: this.tradeNo,
      }).then(result => {
        if (result.status === 200){
          this.orderInfoForm = result.data;
          this.submitOrderInfo = result.data.submitOrderInfo;
          // this.attachments=result.data.transferFile.split(',').map(attachment => {
          //   const [name, url] = attachment.split(':@');
          //   return { name, url };
          // });
        }
      }).catch(err => {
      });
    },
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
    // 查询货物详情
    emailAndCard() {
      this.dialogVisible = true;
      getCargodeDetails({
        tradeNo: this.tradeNo,
      }).then(res => {
        this.tablelList = res.data;
      }).catch(err => {
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

}
</style>
