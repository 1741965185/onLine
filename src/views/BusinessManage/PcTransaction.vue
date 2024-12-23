<template>
	<div class="app-containers" :key="componentKey">
		<div class="page-title mb28">{{$t('orderList.Transactions')}}</div>
		<div class="new-one-container">
			<el-row>
				<el-col :span="12">
					<h4 class="fs16 c-bold success-datas">
						{{$t('orderList.exchangeRateTotal')}}（<span class="base-code" v-for="(item, i) in labelArr.baseCodes" :key="i">{{ item }}</span
					>）
					</h4>
				</el-col>
				<el-col :span="12">
					<h4 class="fs16 c-bold success-datas">{{$t('orderList.currencyTotal')}}</h4>
				</el-col>
			</el-row>
			<!-- 标签 -->
			<div class="label-wrap">
				<div class="label-wrap-row">
					<div class="label-wrap-row-left">
						<div class="label-wrap-row-left-label">{{$t('orderList.searchOrderTotalAmount')}}</div>
						<div class="label-wrap-row-left-text">
							<span v-for="(val, key, i) in labelArr.sellteAmountMap" :key="i">{{ key }}:{{ val }}</span>
						</div>
					</div>
					<div class="label-wrap-row-right">
						<span v-for="(val, key, i) in labelArr.sourceAmountMap" :key="'span1' + i">{{ key }}:{{ val }}</span>
					</div>
				</div>
				<div class="label-wrap-row">
					<div class="label-wrap-row-left">
						<div class="label-wrap-row-left-label">{{$t('orderList.successfulAmountStatistics')}}</div>
						<div class="label-wrap-row-left-text">
							<span v-for="(val, key, i) in labelArr.settleTradeAmountMap" :key="i">{{ key }}:{{ val }}</span>
						</div>
					</div>
					<div class="label-wrap-row-right">
						<span v-for="(val, key, i) in labelArr.sourceTradeAmountMap" :key="'span1' + i">{{ key }}:{{ val }}</span>
					</div>
				</div>
			</div>
			<div class="succ-text">{{$t('orderList.successfulCount')}}<span>{{ labelArr.sum }}</span></div>

		</div>

		<div v-if="newView===0">
			<div style="display: flex;flex-direction: row;width: 942px">
				<div class="tabs-container">
					<div
						v-for="(tab, index) in tabOlds"
						:key="index"
						:class="['tab', { active: activeTab === index, hovered: hoveredTab === index }]"
						@click="selectTab(index)"
						@mouseover="hoverTab(index)"
						@mouseleave="leaveTab"
					>
						{{ tab }}
					</div>
				</div>
				<div class="buttons-container">
					<div
						class="button"
						@click="handleFilter"
						@mouseover="hoverButton('filter')"
						@mouseleave="leaveButton"
						:class="{ active: activeButton === 'filter' }"
					>
						<svg-icon icon-class="filter-icon" class="filter"/>
						{{$t('orderList.screening')}}
					</div>
					<div
						class="button"
						@click="handleDownload"
						@mouseover="hoverButton('download')"
						@mouseleave="leaveButton"
						:class="{ active: activeButton === 'download' }"
					>
						<svg-icon icon-class="download-icon" class="download"/>

<!--						<img src="@/assets/images/download-icon.png" alt="下载" class="download"/>-->
						{{$t('orderList.download')}}
					</div>
					<div
						class="buttons"
						@click="handleToggleView"
						@mouseover="hoverButton('toggleView')"
						@mouseleave="leaveButton"
						:class="{ active: activeButton === 'toggleView' }"
					>
						<svg-icon icon-class="toggle-icon" class="toggle"/>

<!--						<img src="@/assets/images/toggle-view-icon.png" alt="切换视图" class="toggle"/>-->

						{{$t('orderList.switchTables')}}
					</div>
				</div>

			</div>
			<div style="width: 942px;margin-top: 20px;" v-show="activeTab === 0">
				<search-form
					ref="order-search-form"
					v-show="showScreen"
					:option="searchOption"
					:formSearch="form"
					@getSearchForm="getSearchForm($event, 1)"
				></search-form>
			</div>
			<div style="width: 942px;margin-top: 20px;" v-show="activeTab === 1">
				<search-form
					ref="order-search-form2"
					v-show="showScreen"
					:option="searchOption2"
					:formSearch="form"
					@getSearchForm="getSearchForm2($event, 2)"
				></search-form>
			</div>
			<div class="custom-border-table" v-show="activeTab === 0">
				<el-table
					ref="businessTable"
					:data="businessTableData"
					tooltip-effect="dark"
					style="width: 100%"
					v-loading="loading"
					@selection-change="handleSelectionChange"
				>
					<el-table-column v-if="merType === 0" prop="merNo" min-width="140" :label="$t('orderList.merchantID')">
						<template slot-scope="scope">
							{{ scope.row.subMerNo == 0 ? scope.row.merNo : scope.row.subMerNo }}
						</template>
					</el-table-column>
<!--					<el-table-column prop="subMerNo"  :label="$t('sysText.subMerchantAccount')"></el-table-column>-->

					<el-table-column :label="$t('orderList.orderAmount')">
						<template slot-scope="scope">
							{{ scope.row.sourceCurrency + " " + scope.row.sourceAmount }}
						</template>
					</el-table-column>
				<!--	<el-table-column :label="$t('orderList.settlementAmount')">
						<template slot-scope="scope">
							{{ scope.row.settleCurrency + " " + scope.row.settleAmount }}
						</template>
					</el-table-column>-->
					<el-table-column min-width="" :label="$t('orderList.transactionStatus')">
						<template slot-scope="scope">
							{{ scope.row.orderStatus | reasonFilter($store.state.order.orderState) }}
						</template>
					</el-table-column>
					<el-table-column :label="$t('orderList.transactionTime')" min-width="160px">
						<template slot-scope="scope">
							{{ scope.row.tradeDateTime ? dayjs(scope.row.tradeDateTime).format("YYYY-MM-DD HH:mm:ss") : "-" }}
						</template>
					</el-table-column>
					<el-table-column prop="tradeNo" min-width="170px" :label="$t('orderList.serialOrderNumber')"></el-table-column>
					<el-table-column prop="merOrderNo" min-width="200px" :label="$t('orderList.orderNumber')" ></el-table-column>
					<el-table-column prop="cardName" min-width="" :label="$t('orderList.paymentMethod')"></el-table-column>
<!--
					<el-table-column prop="bailAmount" :label="$t('orderList.securityDeposit')"></el-table-column>
-->
<!--
					<el-table-column prop="fee" :label="$t('orderList.fee')"></el-table-column>
-->
					<!-- <el-table-column prop="tradeFee" label="交易处理费"></el-table-column> -->
					<!--					<el-table-column prop="cardNo" label="卡号尾数"></el-table-column>-->
					<el-table-column prop="merWebSite" min-width="200px" :label="$t('orderList.transactionWebsite')"></el-table-column>
					<el-table-column prop="bankInfo" :label="$t('orderList.paymentInformation')"></el-table-column>

					<el-table-column :label="$t('orderChange.action')" fixed="right">
						<template slot-scope="scope">
							<circular-dropdown
								:list="getOperationList(scope.row)"
								:row="scope.row"
								@command="operateScope"></circular-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<pagination
					:total="total"
					:page.sync="form.pageNum"
					:limit.sync="form.pageSize"
					@pagination="$refs['order-search-form'].getList()"
				/>
			</div>
			<div class="custom-border-table" v-show="activeTab === 1">
				<el-table
					ref="businessTable"
					:data="tablePaneList1"
					tooltip-effect="dark"
					style="width: 100%"
					v-loading="loading"
				>
					<el-table-column prop="tradeNo" min-width="220px" :label="$t('withdrawList.withdrawNumber')"/>
					<el-table-column v-if="merType === 0" prop="merNo" min-width="140" :label="$t('orderList.merchantID')">
						<template slot-scope="scope">
							{{ scope.row.subMerNo == 0 ? scope.row.merNo : scope.row.subMerNo }}
						</template>
					</el-table-column>
					<!--                    <el-table-column prop="subMerNo"  :label="$t('sysText.subMerchantAccount')"></el-table-column>-->
					<el-table-column prop="bankNumber" min-width="170px" :label="$t('withdrawList.bankAccount')"/>

					<el-table-column min-width="170px" :label="$t('withdrawDetails.amountCredited')">
						<template slot-scope="scope">
							{{ scope.row.receivedAmount + ' ' + scope.row.receivedCurrency }}
						</template>
					</el-table-column>
					<el-table-column min-width="170px" :label="$t('withdrawDetails.withdrawals')">
						<template slot-scope="scope">
							{{ scope.row.amount + ' ' + scope.row.currency }}
						</template>
					</el-table-column>

					<el-table-column prop="beneficiaryType" min-width="170px" :label="$t('withdrawDetails.type')"/>
					<el-table-column :label="$t('withdrawList.transactionStatus')">
						<template slot-scope="scope">
							<span v-if="scope.row.status==0">{{$t('sysText.bankProcessing')}}</span>
							<span v-if="scope.row.status==1">{{$t('sysText.systemProcessing')}}</span>
							<span v-if="scope.row.status==2">{{$t('withdrawDetails.Success')}}</span>
							<span v-if="scope.row.status==3">{{$t('withdrawList.failed')}}</span>
							<span v-if="scope.row.status==4">{{$t('sysText.to_be_added')}}</span>
							<span v-if="scope.row.status==5">{{$t('sysText.Pending_review')}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="gmtCreate" min-width="160px" :label="$t('withdrawList.transactionTime')"/>

					<el-table-column :label="$t('orderChange.action')" fixed="right">
						<template slot-scope="scope">
							<circular-dropdown
								:list="getOperationList(scope.row)"
								:row="scope.row"
								@command="operateScope"></circular-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<pagination
					:total="total"
					:page.sync="form.pageNum"
					:limit.sync="form.pageSize"
					@pagination="$refs['order-search-form2'].getList()"
				/>
			</div>

			</div>

		<div v-if="newView===1">
			<div style="display: flex;flex-direction: row;width: 942px">
				<div class="tabs-container">
					<div
						v-for="(tab, index) in tabs"
						:key="index"
						:class="['tab', { active: activeTab === index, hovered: hoveredTab === index }]"
						@click="selectTab(index)"
						@mouseover="hoverTab(index)"
						@mouseleave="leaveTab"
					>
						{{ tab }}
					</div>
				</div>
				<div class="buttons-container">
					<div
						class="button"
						@click="handleFilter"
						@mouseover="hoverButton('filter')"
						@mouseleave="leaveButton"
						:class="{ active: activeButton === 'filter' }"
					>
						<svg-icon icon-class="filter-icon" class="filter"/>
						{{$t('orderList.screening')}}
					</div>
					<div
						class="button"
						@click="handleDownload"
						@mouseover="hoverButton('download')"
						@mouseleave="leaveButton"
						:class="{ active: activeButton === 'download' }"
					>
						<svg-icon icon-class="download-icon" class="download"/>

						<!--						<img src="@/assets/images/download-icon.png" alt="下载" class="download"/>-->
						{{$t('orderList.download')}}
					</div>
					<div
						class="buttons"
						@click="handleToggleView"
						@mouseover="hoverButton('toggleView')"
						@mouseleave="leaveButton"
						:class="{ active: activeButton === 'toggleView' }"
					>
						<svg-icon icon-class="toggle-icon" class="toggle"/>

						<!--						<img src="@/assets/images/toggle-view-icon.png" alt="切换视图" class="toggle"/>-->
						{{$t('orderList.switchTables')}}

					</div>
				</div>

			</div>
			<div style="width: 942px;margin-top: 20px;" v-show="activeTab === 0">
				<search-form
					ref="order-search-form3"
					v-show="showScreen"
					:option="searchOption3"
					:formSearch="form"
					@getSearchForm="getSearchForm3($event, 1)"
				></search-form>
			</div>
			<div style="width: 942px;margin-top: 20px;" v-show="activeTab === 1">
				<search-form
					ref="order-search-form4"
					v-show="showScreen"
					:option="searchOption4"
					:formSearch="form"
					@getSearchForm="getSearchForm4($event, 2)"
				></search-form>
			</div>
			<div style="width: 942px;margin-top: 20px;" v-show="activeTab === 2">
				<search-form
					ref="order-search-form4"
					v-show="showScreen"
					:option="searchOption5"
					:formSearch="form"
					@getSearchForm="getSearchForm5($event, 2)"
				></search-form>
			</div>
			<div class="transaction-section" v-if="activeTab === 0">

				<div class="transaction-list" v-if="transactions.length != 0">
					<div-dropdown v-for="transaction in transactions" :key="transaction.id"
												:list="getOperationList(transaction)" :row="transaction" @command="operateScope" #dropdown-button
					>
					<div class="transaction-item">
						<div class="transaction-left">
							<img :src="getIcon(transaction.type)" alt="icon" class="icon" />
							<div class="transaction-info">
								<div class="transaction-type">{{ transaction.type === 2 ? $t('sysText.home_send'):$t('sysText.home_add_money') }}</div>
								<div class="transaction-date">{{ transaction.tradeDateTime }}</div>
							</div>
						</div>
						<div class="transaction-right">
							<div class="transaction-amount" v-if="transaction.type === 1">{{ transaction.sourceAmount }} {{ transaction.sourceCurrency }}</div>
							<div class="transaction-amount" v-else>{{ transaction.settleAmount }} {{ transaction.settleCurrency }}</div>
							<div class="transaction-status" :class="getStatusClass(transaction)">{{ getStatusName(transaction)}}</div>
						</div>
					</div>
					</div-dropdown>

				</div>
				<div class="queshengs" v-if="transactions.length === 0">
<!--					<img src="/icon/zw.png">-->
<!--					<p class="empty-list-text">{{$t('sysText.none')}}</p>-->
				</div>
				<pagination
					:total="total"
					:page.sync="form.pageNum"
					:limit.sync="form.pageSize"
					@pagination="$refs['order-search-form3'].getList()"
				/>
			</div>
			<div class="transaction-section" v-else-if="activeTab === 1">

				<div class="transaction-list" v-if="transactionsChongzhi.length != 0">
					<div-dropdown v-for="transaction in transactionsChongzhi" :key="transaction.id"
												:list="getOperationList(transaction)" :row="transaction" @command="operateScope" #dropdown-button
					>
						<div class="transaction-item">
							<div class="transaction-left">
								<img :src="getIcon(transaction.type)" alt="icon" class="icon" />
								<div class="transaction-info">
									<div class="transaction-type">{{ transaction.type === 2 ? $t('sysText.home_send'):$t('sysText.home_add_money') }}</div>
									<div class="transaction-date">{{ transaction.tradeDateTime }}</div>
								</div>
							</div>
							<div class="transaction-right">
								<div class="transaction-amount" v-if="transaction.type === 1">{{ transaction.sourceAmount }} {{ transaction.sourceCurrency }}</div>
								<div class="transaction-amount" v-else>{{ transaction.settleAmount }} {{ transaction.settleCurrency }}</div>
								<div class="transaction-status" :class="getStatusClass(transaction)">{{ getStatusName(transaction)}}</div>
							</div>
						</div>
					</div-dropdown>


				</div>
				<div class="queshengs" v-if="transactions.length === 0">
<!--					<img src="/icon/zw.png">-->
<!--					<p class="empty-list-text">{{$t('sysText.none')}}</p>-->
				</div>
				<pagination
					:total="total"
					:page.sync="form.pageNum"
					:limit.sync="form.pageSize"
					@pagination="$refs['order-search-form4'].getList()"
				/>

			</div>
			<div class="transaction-section" v-else>

				<div class="transaction-list" v-if="transactionsTixian.length != 0">
					<div-dropdown v-for="transaction in transactionsTixian" :key="transaction.id"
												:list="getOperationList(transaction)" :row="transaction" @command="operateScope" #dropdown-button
					>
						<div class="transaction-item">
							<div class="transaction-left">
								<img :src="getIcon(transaction.type)" alt="icon" class="icon" />
								<div class="transaction-info">
									<div class="transaction-type">{{ transaction.type === 2 ? $t('sysText.home_send'):$t('sysText.home_add_money') }}</div>
									<div class="transaction-date">{{ transaction.tradeDateTime }}</div>
								</div>
							</div>
							<div class="transaction-right">
								<div class="transaction-amount" v-if="transaction.type === 1">{{ transaction.sourceAmount }} {{ transaction.sourceCurrency }}</div>
								<div class="transaction-amount" v-else>{{ transaction.settleAmount }} {{ transaction.settleCurrency }}</div>
								<div class="transaction-status" :class="getStatusClass(transaction)">{{ getStatusName(transaction)}}</div>
							</div>
						</div>
					</div-dropdown>
				</div>
				<div class="queshengs" v-if="transactions.length === 0">
<!--					<img src="/icon/zw.png">-->
<!--					<p class="empty-list-text">{{$t('sysText.none')}}</p>-->
				</div>
				<pagination
					:total="total"
					:page.sync="form.pageNum"
					:limit.sync="form.pageSize"
					@pagination="$refs['order-search-form5'].getList()"
				/>

			</div>


		</div>

		<!--        补充资料-->
		<el-dialog :title="$t('orderList.submit_order_information')" :visible.sync="addPriceVisibles" width="500px" class="custom-dialog" >
			<div v-show="upItem.transferOrderInfo || upItem.transferOrderFile" style="background: #F8F9FC;width: 100%;min-height: 40px;border-top: 1px solid #E6E6E6;padding: 10px 31px;box-sizing: border-box;margin-bottom: 20px">
				<div style="font-family: PingFangSC, PingFang SC; font-weight: 400; font-size: 12px; color: #526484; line-height: 17px; text-align: left; font-style: normal;">
					<span v-if="upItem.transferOrderInfo">[{{ upItem.transferOrderInfo }}]</span>
					<span v-if="upItem.transferOrderInfo && upItem.transferOrderFile">, </span>
					<span v-if="upItem.transferOrderFile">[{{ upItem.transferOrderFile }}]</span>
				</div>
			</div>
		<div style="font-family: PingFangSC, PingFang SC;
font-weight: 500;
font-size: 14px;
color: #364A63;
line-height: 16px;
text-align: left;
font-style: normal;
padding-left: 32px;
padding-bottom: 12px;
">
			<span style="color: red;">*</span> {{ $t('orderList.order_information') }}
		</div>
			<div style="
padding-left: 32px;padding-right: 32px;padding-bottom: 20px;
" v-show="upItem.transferOrderInfo">
				<el-input
					type="textarea"
					:rows="5"
					v-model="upItem.infoValue"
					:placeholder="$t('orderList.tips-t')"
				>
				</el-input>
		</div>

			<!-- 文件上传部分 -->

			<div style="padding-left: 32px;padding-right: 32px;" v-show="upItem.transferOrderFile">

							<el-upload
					action= "http://192.168.3.23:8180/merchant/file/upload"
					:http-request="file => handleAvatarSuccess(file, fileList1)"
					class="upload-demo"
					:headers=headers
					:file-list="fileList1"
					drag
					:auto-upload="true"
					:before-upload="beforeUpload"
								:on-preview="handlePreview"
					:on-change="handleChange(1)"
					:on-remove="handleRemove(1)"
				>

					<i class="el-icon-upload"></i>
					<div class="el-upload__text">{{ $t('orderList.tishi-tis') }}</div>
							</el-upload>
						</div>

			<!-- 文件列表展示部分 -->
			<!--            <div>-->
			<!--                <ul>-->
			<!--                    <li v-for="file in fileList" :key="file.name">-->
			<!--                        {{ file.name }}-->
			<!--                    </li>-->
			<!--                </ul>-->
			<!--            </div>-->

			<div slot="footer" class="dialog-footer">
				<el-button @click="addPriceVisible = false">取 消</el-button>
				<el-button :loading="loading" type="primary" @click="addTraderPrice">确认</el-button>
				</div>
		</el-dialog>


		<el-dialog :title="$t('orderList.submit_order_information')"  :visible.sync="addPriceVisible" width="500px" class="custom-order-dialog">
			<div v-for="(item, index) in filteredFormItems" :key="index" class="form-item">
				<label class="form-label">{{ item.label }}</label>
				<el-input v-if="!item.isFile" v-model="payerForm[item.model]"></el-input>
				<div v-else class="upload-container">
					<el-upload
						action="#"
						list-type="text"
						:http-request="file => handleAvatarSuccess(file, item.model)"
						:headers="headers"
						:auto-upload="true"
						:before-upload="beforeUpload"
						:on-preview="handlePreview"
						:on-remove="handleRemove(item.model)"
						:file-list="fileList[item.model]"
					>
						<el-button class="custom-order-button" size="small">
							{{$t('orderFile.selectFile')}}
						</el-button>
					</el-upload>
				</div>
			</div>
			<div v-show="transferOrderFile" style="font-family: PingFangSC, PingFang SC;
font-weight: 400;
font-size: 12px;
color: #8094AE;
line-height: 14px;
text-align: left;
font-style: normal;margin-top: 27px;margin-bottom: 20px;">
				{{$t('orderFile.tipsOne')}}
			</div>

			<div class="dialog-footer">
				<el-button @click="addPriceVisible = false">{{$t('orderChange.cancel')}}</el-button>
				<el-button type="primary" @click="addTraderPrice" :loading="loading">				{{$t('orderFile.confirm')}}
				</el-button>
			</div>
		</el-dialog>
	</div>


</template>

<script>
import pagination from "@/components/Pagination";
import PageSizeSelect from "@/components/PageSizeSelect/index";
import { downloadOrderListAll, getList, getNewTradeList } from "@/api/business";
import HiddenTab from "@/utils/HiddenTab";
import { downloadOrderList, } from "@/api/download";
import { mapActions, mapGetters } from "vuex";
import SearchForm from "@/components/SearchForm";
import { getQueryAccount } from "@/api/business";
import i18n from "@/i18n";
import CircularDropdown from "@/components/CircularDropdown/index.vue";
import { commit } from "lodash/seq";
import DivDropdown from "@/components/DivDropdown/index.vue";
import { addInformation, submitTransferOrderInfo, upload } from "@/api/certification";
var DDHK = [
	{ label: i18n.t('orderList.alls'), value: "" },
	{ label: i18n.t('orderList.remitted'), value: "1" },
	{ label: i18n.t('orderList.unremitted'), value: "0" },
];
var ZT = [
	{ label: i18n.t('sysText.bankProcessing'), value:'0' },
	{ label: i18n.t('sysText.systemProcessing'), value: '1' },
	{ label: i18n.t('withdrawDetails.Success'), value: '2' },
	{ label: i18n.t('withdrawDetails.Failure'), value: '3' },
	{ label: i18n.t('sysText.to_be_added'),  value: '4' },
	{ label: i18n.t('sysText.Pending_review'),  value: '5' },

];
export default {
	name: "OrderList",
	filters: {
		ellipsis(value) {
			if (!value) return "";
			if (value.length > 8) {
				return value.slice(0, 8) + "...";
			}
			return value;
		},
	},
	components: {
		DivDropdown,
		CircularDropdown,
		PageSizeSelect,
		pagination,
		SearchForm,
	},

	mixins: [HiddenTab],
	data() {
		return {
			transferOrderInfo: "",
			transferOrderFile: "",
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
				documentsProvingSourceOfFunds:[],
				payerIdentityDocument: [],
				buyerConfirmationLetter: [],
				buyerPaymentStatement: [],
				documentsProvingBusinessTransactions: [],
				transactionProofDocuments: [],
				transactionDetails: [],
				historicalOrderRecords: [],
				communicationRecordsWithPayers: [],
				tradeNo:'',

			},
			payerBackup: {
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
				documentsProvingSourceOfFunds:[],
				payerIdentityDocument: [],
				buyerConfirmationLetter: [],
				buyerPaymentStatement: [],
				documentsProvingBusinessTransactions: [],
				transactionProofDocuments: [],
				transactionDetails: [],
				historicalOrderRecords: [],
				communicationRecordsWithPayers: [],
				tradeNo:'',

			},
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
			addPriceVisible:false,
			priceMap: {
				remark:'',
				imageUrl:'',
				id:'',

			},
			fileList: {
				documentsProvingSourceOfFunds: [],
				payerIdentityDocument: [],
				buyerConfirmationLetter: [],
				buyerPaymentStatement: [],
				documentsProvingBusinessTransactions: [],
				transactionProofDocuments: [],
				transactionDetails: [],
				historicalOrderRecords: [],
				communicationRecordsWithPayers: []
			},
			upItem: {
				transferOrderInfo:'',
				transferOrderFile:'',
				tradeNo:'',
				infoValue:'',
				fileValue:'',
			},
			test:'',
			fileList1: [], // 这里存储已上传文件的信息
			headers: { Authorization: sessionStorage.getItem("JWT"),
			},
			activeName: "0", // tabs active
			//条件查询参数表单
			getOperationList(row) {
				// TRANSFER_ORDER(24, "调单", "transfer order"),
				// 	TRANSFER_ORDER_PROCESSING(25, "调单处理中", "transfer order processing");
				if (row.orderStatus === '4') {
					return this.operationList1;
				}else if(row.orderStatus === '24'){
					return this.operationList2;
				}else {
					return this.operationList;
				}

			},

			operationList: [
				// {label: i18n.t('withdrawList.approved'),  value: 0},
				// {label: i18n.t('withdrawList.rejected'),  value: 1},
				{label: i18n.t('orderChange.view'),icon:"eye",  value: 2},
			],
			operationList2: [
				// {label: i18n.t('withdrawList.approved'),  value: 0},
				// {label: i18n.t('withdrawList.rejected'),  value: 1},
				{label: i18n.t('orderChange.view'),icon:"eye",value: 2},
				{label: i18n.t('orderList.submit_order_information'), icon:"update", value: 24},

			],
			operationList1: [
				// {label: i18n.t('withdrawList.approved'),  value: 0},
				// {label: i18n.t('withdrawList.rejected'),  value: 1},
				// {label: i18n.t('补充资料'),  value: 3},
				{label: i18n.t('orderChange.view'),icon:"eye",  value: 2},
			], // 操作列表
			form: {
				pageNum: 1,
				pageSize: 15,
			},
			form2: {
				pageNum: 1,
				pageSize: 15,
			},
			tabs: [i18n.t('orderData.alls'), i18n.t('sysText.home_buy'), i18n.t('sysText.home_sell'),],
			tabOlds: [ i18n.t('sysText.home_buy'), i18n.t('sysText.home_sell')],
			activeTab: 0,
			hoveredTab: null,
			activeButton: null,
			transactions: [],
			transactionsChongzhi: [],
			transactionsTixian: [],

			formProps1: {}, //保存搜索组件传过来的值
			formProps2: {}, //保存搜索组件传过来的值
			formProps3: {}, //保存搜索组件传过来的值
			formProps4: {}, //保存搜索组件传过来的值
			formProps5: {}, //保存搜索组件传过来的值
			businessTableData: [], // business list
			tablePaneList1: [], // business list
			showScreen: false,
			viewOne: true,
			total: 0, // 总条数
			tdList: [], // 通道列表
			multipleSelection: [], // table勾选列表
			loading: false, // table loading状态
			labelArr: [], // top 总金额,标签等数据
			// 订单搜索
			componentKey: 0,
			searchOption: {
				column: [
					{
						label: this.$t('orderList.merchantID'),
						prop: "merNo",
						type: "select",
						dicData:this.$store.state.order.userMerNo , //数据传输
						Vshow: this.$store.state.user.merType === 0,
					},
					{
						label: this.$t('orderList.serialOrderNumber'),
						prop: "TradeNo",
						type: "input",
						btn: true, //是否显示批量输入按钮
					},
					{
						label: this.$t('orderList.orderNumber'),
						prop: "order",
						type: "input",
						btn: true, //是否显示批量输入按钮
					},
					{
						label: this.$t('orderList.transactionStatus'),
						prop: "orderstatus",
						type: "select",
						dicData: () => this.$store.state.order.orderState, //数据传输
					},
					{
						label: this.$t('orderList.paymentMethod'),
						prop: "cardType",
						type: "select",
						dicData: this.$store.state.order.kzState, //数据传输
					},
					{
						label: this.$t('orderList.orderRemittance'),
						prop: "JS",
						type: "select",
						dicData: DDHK, //数据传输
						Vshow: this.$store.state.user.merType === 0,
					},
					{
						label: this.$t('orderList.securityDepositRemittance'),
						prop: "bailHK",
						type: "select",
						dicData: DDHK, //数据传输
						Vshow: this.$store.state.user.merType === 0,
					},
					{
						label: this.$t('orderList.transactionTime'),
						prop: "time",
						type: "datetimerange",
						default: [
							this.dayjs().startOf('day').format("YYYY-MM-DD 00:00:00"),
							this.dayjs().endOf('day').format("YYYY-MM-DD 23:59:59")
						]
					},
				],
			},
			searchOption2:  {
				column: [
					{
						label: i18n.t('withdrawList.merchantId'),
						prop: "merNo",
						type: "select",
						dicData:this.$store.state.order.userMerNo , //数据传输
						Vshow: this.$store.state.user.merType === 0,
					},

					{
						label: "状态",
						prop: "status",
						type: "select",
						multiple: true,
						dicData: ZT, //数据传输
						default:['0','1','4','5'], //select默认值，写的下标

					},
					{
						label:  i18n.t('withdrawList.dateSearch'),
						prop: "time",
						type: "datetimerange",
						default:[
							this.dayjs(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365)).format("YYYY-MM-DD 00:00:00"),
							this.dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
						]
					}
				]
			},
			searchOption3: {
				column: [
					{
						label: this.$t('orderList.merchantID'),
						prop: "merNo",
						type: "select",
						dicData:this.$store.state.order.userMerNo , //数据传输
						Vshow: this.$store.state.user.merType === 0,
					},
					{
						label: this.$t('orderList.serialOrderNumber'),
						prop: "TradeNo",
						type: "input",
						btn: true, //是否显示批量输入按钮
					},
					{
						label: this.$t('orderList.orderNumber'),
						prop: "order",
						type: "input",
						btn: true, //是否显示批量输入按钮
					},
					{
						label: this.$t('orderList.transactionStatus'),
						prop: "orderstatus",
						type: "select",
						dicData: () => this.$store.state.order.orderState, //数据传输
					},
					{
						label: this.$t('orderList.paymentMethod'),
						prop: "cardType",
						type: "select",
						dicData: this.$store.state.order.kzState, //数据传输
					},
					{
						label: this.$t('orderList.orderRemittance'),
						prop: "JS",
						type: "select",
						dicData: DDHK, //数据传输
						Vshow: this.$store.state.user.merType === 0,
					},
					{
						label: this.$t('orderList.securityDepositRemittance'),
						prop: "bailHK",
						type: "select",
						dicData: DDHK, //数据传输
						Vshow: this.$store.state.user.merType === 0,
					},
					{
						label: this.$t('orderList.transactionTime'),
						prop: "time",
						type: "datetimerange",
						default: [
							this.dayjs().startOf('day').format("YYYY-MM-DD 00:00:00"),
							this.dayjs().endOf('day').format("YYYY-MM-DD 23:59:59")
						]
					},
					{
						label: this.$t('orderList.withdrawalStatus'),
						prop: "status",
						type: "select",
						multiple: true,
						dicData: ZT, //数据传输
					},
				],
			},
			searchOption4: {
				column: [
					{
						label: this.$t('orderList.merchantID'),
						prop: "merNo",
						type: "select",
						dicData:this.$store.state.order.userMerNo , //数据传输
						Vshow: this.$store.state.user.merType === 0,
					},
					{
						label: this.$t('orderList.serialOrderNumber'),
						prop: "TradeNo",
						type: "input",
						btn: true, //是否显示批量输入按钮
					},
					{
						label: this.$t('orderList.orderNumber'),
						prop: "order",
						type: "input",
						btn: true, //是否显示批量输入按钮
					},
					{
						label: this.$t('orderList.transactionStatus'),
						prop: "orderstatus",
						type: "select",
						dicData: () => this.$store.state.order.orderState, //数据传输
					},
					{
						label: this.$t('orderList.paymentMethod'),
						prop: "cardType",
						type: "select",
						dicData: this.$store.state.order.kzState, //数据传输
					},
					{
						label: this.$t('orderList.orderRemittance'),
						prop: "JS",
						type: "select",
						dicData: DDHK, //数据传输
						Vshow: this.$store.state.user.merType === 0,
					},
					{
						label: this.$t('orderList.securityDepositRemittance'),
						prop: "bailHK",
						type: "select",
						dicData: DDHK, //数据传输
						Vshow: this.$store.state.user.merType === 0,
					},
					{
						label: this.$t('orderList.transactionTime'),
						prop: "time",
						type: "datetimerange",
						default: [
							this.dayjs().startOf('day').format("YYYY-MM-DD 00:00:00"),
							this.dayjs().endOf('day').format("YYYY-MM-DD 23:59:59")
						]
					},
				],
			},
			searchOption5:  {
				column: [
					{
						label: i18n.t('withdrawList.merchantId'),
						prop: "merNo",
						type: "select",
						dicData:this.$store.state.order.userMerNo , //数据传输
						Vshow: this.$store.state.user.merType === 0,
					},

					{
						label: "状态",
						prop: "status",
						type: "select",
						multiple: true,
						dicData: ZT, //数据传输
						default:['0','1','4','5'], //select默认值，写的下标

					},
					{
						label:  i18n.t('withdrawList.dateSearch'),
						prop: "time",
						type: "datetimerange",
						default:[
							this.dayjs(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365)).format("YYYY-MM-DD 00:00:00"),
							this.dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
						]
					}
				]
			},
		};
	},
	computed: {
		...mapGetters(["merType","newView"]),
		filteredFormItems() {
			const infoKeys = this.transferOrderInfo.split(',');
			const fileKeys = this.transferOrderFile.split(',');
			return this.formItems.filter(item => infoKeys.includes(item.model) || fileKeys.includes(item.model));
		}
	},
	created() {
	},
	methods: {
		// ...mapActions([ 'updateNewView']),
		// 勾选table
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		handleChange(uploadId) {
			return (file, fileList) => {
				// 根据 uploadId 区分不同的上传组件
				this[`fileList${uploadId}`] = fileList;
			};
		},
		async addTraderPrice() {
			this.loading = true;
			// 提醒填写留言
			// if ( this.fileList1.length === 0){
			// 	this.$message.error('请上传附件');
			// 	this.loading = false;
			//
			// 	return ;
			// }else {
			// 	this.fileList1.forEach(item => {
			//
			// 		this.priceMap.imageUrl += item.name +':@' + item.url +',';
			// 	});
			// }

			// this.fileList1.forEach(item => {
			//
			// 	this.upItem.fileValue += item.name +':@' + item.url +',';
			// });
			await submitTransferOrderInfo(this.payerForm)
				.then(res => {
					if (res.status === 200) {
						this.$message.success(res.msg);
						this.addPriceVisible = false; // 关闭弹窗
						this.componentKey += 1;

					} else {
						this.$message.error(res.msg);
					}
				})
				.catch(err => {
					console.error(err);
					this.loading = false;

				}).finally(() => {         // 无论成功或失败都将执行
					this.loading = false;
				});
			// const tradeno = this.$route.params && this.$route.params.id;
			// this.tradeno = tradeno;

		},

		beforeUpload(file) {
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isLt2M) {
				this.$message.error('单个文件大小不能超过2MB!');
				return false;
			}
			if (this.fileList.payerIdentityDocument.length >= 6) {
				this.$message.error('最多上传6个文件!');
				return false;
			}
			return true;
		},
		handlePreview(file) {
			console.log(file);
		},
		handleRemove(model) {
			return (file) => {
				const fileIndex = this.fileList[model].indexOf(file);
				if (fileIndex >= 0) {
					this.fileList[model].splice(fileIndex, 1);
					const fileInfoIndex = this.payerForm[model].findIndex(f => f.fileName === file.name && f.url === file.url);
					if (fileInfoIndex >= 0) {
						this.payerForm[model].splice(fileInfoIndex, 1);
					}
				}
			};
		},
		async handleAvatarSuccess(file, model) {
			const formData = new FormData();
			formData.append('file', file.file); // 将文件对象添加到 FormData 中
			formData.append("type", "certification");

			try {
				const res = await upload(formData);
				if (res.status === 200) {
					// 上传成功
					const fileInfo = { fileName: res.data.fileName, url: res.data.url };
					this.payerForm[model].push(fileInfo);
					this.fileList[model].push({
						name: res.data.fileName,
						url: res.data.url
					});
				} else {
					// 上传失败，移除文件
					this.$message.error('文件上传失败');
					this.removeFileFromList(file, model);
				}
			} catch (err) {
				console.error(err);
				this.$message.error('文件上传失败');
				this.removeFileFromList(file, model);
			}
		},
		removeFileFromList(file, model) {
			// 从 fileList 中移除文件
			const fileIndex = this.fileList[model].findIndex(f => f.name === file.name);
			if (fileIndex >= 0) {
				this.fileList[model].splice(fileIndex, 1);
			}
			// 从 payerForm 中移除文件信息
			const fileInfoIndex = this.payerForm[model].findIndex(f => f.fileName === file.name);
			if (fileInfoIndex >= 0) {
				this.payerForm[model].splice(fileInfoIndex, 1);
			}
		},
		// 其他方法保持不变
		operateScope(params) {
			if (params.command.value === 2) {
				this.viewDetail(params.data);
				// this.$router.push({path: "/details/withdrawals/" + params.data.id});
			} else if (params.command.value === 3) {
				this.addPriceVisible = true;
				this.priceMap.remark=params.data.remark;
				this.priceMap.id=params.data.id;
				this.priceMap.id=params.data.id;
			} else if (params.command.value === 24) {
				this.payerForm=this.payerBackup;
				this.addPriceVisible = true;
				this.transferOrderInfo=params.data.transferOrderInfo;
				this.transferOrderFile=params.data.transferOrderFile;
				this.payerForm.tradeNo=params.data.tradeNo;
			}else if (params.command.value === 1) {
				// this.dialogVisible = true;

			}
		},
		selectTab(index) {
			// this.transactions=[];
			this.form= {
				pageNum: 1,
				pageSize: 15,
			};
			this.activeTab = index;
			if (this.newView === 0) {
				if(this.activeTab === 0){
					this.getSearchForm(this.formProps1);
				}else{
					this.getSearchForm2(this.formProps2);
				}
			}else{
				if(this.activeTab === 0){
					this.getSearchForm3(this.formProps3);
				}else if(this.activeTab === 1){
					this.getSearchForm4(this.formProps4);
				}else{
					this.getSearchForm5(this.formProps5);
				}
			}
		},
		hoverTab(index) {
			this.hoveredTab = index;
		},
		leaveTab() {
			this.hoveredTab = null;
		},
		hoverButton(button) {
			this.activeButton = button;
		},
		leaveButton() {
			this.activeButton = null;
		},
		handleFilter() {
			this.showScreen=!this.showScreen
			console.log('筛选');
		},
		handleDownload() {
			this.download();

			console.log('下载');
		},
		handleToggleView() {
			this.activeTab=0;
			this.$store.commit('SET_NEWVIEW', this.newView === 0 ? 1 : 0);
			this.componentKey += 1;

		},

		getallMerNo(){

			getQueryAccount({
				merNo: params.str,
			}).then(res => {
				let newData = res.data.map(item => {
					return {
						label: item,
						value: item,
					};
				});
				newData.unshift({
					label: "所有",
					value: null,
				});
			});
		},

		// 订单详情
		getDetails(params) {
			this.$router.push({ path: "/details/info/" + params.tradeNo, params: { key: params } });
		},
		// 分页请求
		getSearchForm(params) {
			this.formProps1 = params; //存储点击搜索按钮后的值
			this.getJyList(params,2,1);

		},
		getSearchForm2(params) {
			this.formProps2 = params; //存储点击搜索按钮后的值
			this.getJyList(params,3,2);

		},
		getSearchForm3(params) {
			this.formProps3 = params; //存储点击搜索按钮后的值
			this.getJyList(params,1,3);

		},
		getSearchForm4(params) {
			this.formProps4 = params; //存储点击搜索按钮后的值
			this.getJyList(params,2,4);

		},
		getSearchForm5(params) {
			this.formProps5 = params; //存储点击搜索按钮后的值
			this.getJyList(params,3,5);

		},
		getIcon(type) {
			// 根据交易类型返回相应的图标路径
			return type === 2 ? '/icon/zhuanchu.png' : '/icon/zhuanru.png';
		},
		viewDetail(row) {
			// 在这里添加跳转到详情页的逻辑
			console.log('跳转到详情页', row);
			if (row.type === 1) {
				this.$router.push({ path: "/details/info/" + row.tradeNo, params: { key: row } });

			}else{
				this.$router.push({path: "/details/withdrawals/" + row.id});

			}

		},
		getStatusClass(transaction) {
			console.info(transaction.orderStatus)

			if(transaction.type===1){
				if(transaction.orderStatus === '5'){
					return 'status-success';
				}else if(transaction.orderStatus === '6'){
					return 'status-fail';
				}else if(transaction.orderStatus === '1'){
					return 'status-processing';
				}else{
					return 'status-success';
				}
			}else{
				if(transaction.orderStatus === '2'){
					return 'status-success';
				}else if(transaction.orderStatus === '3'){
					return 'status-fail';
				}else if(transaction.orderStatus === '4'){
					return 'status-processing';
				}else{
					return 'status-processing';

				}
			}

			// return {
			// 	'status-success': status === '5',
			// 	'status-fail': status === '6',
			// 	'status-processing': status === 3 || status === 5
			// };
		},
		getStatusName(transaction) {
			if(transaction.type===1){
				const orderStates =  this.$store.state.order.orderState
				for (let i = 0; i <orderStates.length ; i++) {
					if(orderStates[i].value === transaction.orderStatus){
						return orderStates[i].label;
					}
				}
			}else{
				for (let i = 0; i <ZT.length ; i++) {
					if(ZT[i].value === transaction.orderStatus){
						return ZT[i].label;
					}
				}
			}

		},

		// 查询订单列表
		// 1所有，2 充值，3 汇款
		getJyList(page,type,acticeTab) {
			this.loading = true;
			let data = {
				...page,
				from: page.time[0],
				to: page.time[1],
				type:type
			};
			this.$delete(data, "time");
			getNewTradeList(data)
				.then(res => {
					this.loading = false;
					if (this.newView === 0){
						if(type===2){
							this.businessTableData = res.data.result.list;
							if(this.activeTab===0){
								this.total = res.data.result.total;
								const {
									pageAmount,
									pageSourceAmount,
									sellteAmountMap,
									settleBailMap,
									sourceAmountMap,
									sourceBailMap,
									baseCodes,
									sum,
									settleTradeAmountMap,
									sourceTradeAmountMap
								} = res.data;

								this.labelArr = {
									pageAmount,
									pageSourceAmount,
									sellteAmountMap,
									settleBailMap,
									sourceAmountMap,
									sourceBailMap,
									baseCodes,
									sum,
									settleTradeAmountMap,
									sourceTradeAmountMap
								};
							}
						}else{
							this.tablePaneList1 = res.data.result.list;
							if(this.activeTab!== 0){
								this.total = res.data.result.total;

								const {
									pageAmount,
									pageSourceAmount,
									sellteAmountMap,
									settleBailMap,
									sourceAmountMap,
									sourceBailMap,
									baseCodes,
									sum,
									settleTradeAmountMap,
									sourceTradeAmountMap
								} = res.data;

								this.labelArr = {
									pageAmount,
									pageSourceAmount,
									sellteAmountMap,
									settleBailMap,
									sourceAmountMap,
									sourceBailMap,
									baseCodes,
									sum,
									settleTradeAmountMap,
									sourceTradeAmountMap
								};
							}
						}
					}else {
						if(type===1){
							this.transactions = res.data.result.list;
							this.total = res.data.result.total;

							if(this.activeTab===0){
								const {
									pageAmount,
									pageSourceAmount,
									sellteAmountMap,
									settleBailMap,
									sourceAmountMap,
									sourceBailMap,
									baseCodes,
									sum,
									settleTradeAmountMap,
									sourceTradeAmountMap
								} = res.data;

								this.labelArr = {
									pageAmount,
									pageSourceAmount,
									sellteAmountMap,
									settleBailMap,
									sourceAmountMap,
									sourceBailMap,
									baseCodes,
									sum,
									settleTradeAmountMap,
									sourceTradeAmountMap
								};
							}

						}else if(type===2){
							this.transactionsChongzhi = res.data.result.list;
							this.total = res.data.result.total;

							if(this.activeTab!== 0){
								const {
									pageAmount,
									pageSourceAmount,
									sellteAmountMap,
									settleBailMap,
									sourceAmountMap,
									sourceBailMap,
									baseCodes,
									sum,
									settleTradeAmountMap,
									sourceTradeAmountMap
								} = res.data;

								this.labelArr = {
									pageAmount,
									pageSourceAmount,
									sellteAmountMap,
									settleBailMap,
									sourceAmountMap,
									sourceBailMap,
									baseCodes,
									sum,
									settleTradeAmountMap,
									sourceTradeAmountMap
								};
							}

						}else{
							this.transactionsTixian = res.data.result.list;
							this.total = res.data.result.total;

							if(this.activeTab!== 0){
								const {
									pageAmount,
									pageSourceAmount,
									sellteAmountMap,
									settleBailMap,
									sourceAmountMap,
									sourceBailMap,
									baseCodes,
									sum,
									settleTradeAmountMap,
									sourceTradeAmountMap
								} = res.data;

								this.labelArr = {
									pageAmount,
									pageSourceAmount,
									sellteAmountMap,
									settleBailMap,
									sourceAmountMap,
									sourceBailMap,
									baseCodes,
									sum,
									settleTradeAmountMap,
									sourceTradeAmountMap
								};
							}

						}
					}



				})
				.catch(error => {
					this.loading = false;
				});
		},
		download() {
			let Xz = {};
			let type = 1;

				if (this.newView === 0){
					if(this.activeTab===0){
						Xz=this.formProps1;
						type=2;

					}else{
						Xz=this.formProps2;
						type=3;
					}

			}else {
				if(this.activeTab===0){
					Xz=this.formProps3;
					type=1;
				} else if(this.activeTab===1){
					Xz=this.formProps4;
					type=2;
				}else{
					Xz=this.formProps5;
					type=3;
				}
			}
			let data = {
				...Xz,
				from: Xz.time[0],
				to: Xz.time[1],
				type:type
			};
			this.$delete(data, "time");
			downloadOrderListAll(data)
				.then(result => {
					this.$message(result.data);
				});
		},
	},
};
</script>

<style scoped lang="less">
@import "../../assets/styles/template";

.app-containers {
	margin-top: 32px;
}
.new-one-container {
	width: 942px;
	//height: 166px;
	padding: 20px;
	box-sizing: border-box;
	background: #F7F9FE;
	border-radius: 16px;
	margin-bottom: 24px;
}
.spantex {
	width: 120px;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}

.success-data {
	.base-code + .base-code {
		margin-left: 10px;
	}
}

.label-wrap {
	.label-wrap-row {
		display: flex;
		margin: 0 0 1px 0;

		.label-wrap-row-left {
			display: flex;
			width: 50%;

			.label-wrap-row-left-label {
				font-family: PingFangSC, PingFang SC;
				font-weight: 500;
				font-size: 14px;
				color: #8094AE;
				line-height: 30px;
				text-align: left;
				font-style: normal;
				margin: 0 15px 0 0;

			}

			.label-wrap-row-left-text {
				span {
					display: inline-block;
					margin: 0 25px 0 0;
					font-family: Roboto, Roboto;
					font-weight: 500;
					font-size: 14px;
					color: #526484;
					line-height: 30px;
					text-align: left;
					font-style: normal;
				}
			}
		}

		.label-wrap-row-right {
			width: 50%;

			span {
				display: inline-block;
				margin: 0 25px 0 0;
				font-size: 14px;
				font-weight: 500;
				color: #526484;
			}
		}
	}
}

.succ-text {
	font-size: 16px;
	font-weight: 500;
	color: #364A63;
	margin-top: 12px;

	span {
		color: #7F8DFF;
	}
}

.success-datas {
	font-weight: 500;
	margin-bottom: 12px;

	span {
		color: var(--number-color);
	}
}
</style>
<style scoped>
.tabs-container {
	display: flex;
	gap: 10px;
}

.tab {
	min-width: 72px;
	height: 32px;
	border-radius: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background-color 0.3s, color 0.3s;
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 16px;
	color: #8094AE;
	line-height: 16px;
	text-align: center;
	font-style: normal;
}

.tab:hover {
	background-color: #F7F9FE; /* 鼠标移入的背景色 */

	font-weight: 500;
	font-size: 16px;
	color: #364A63;
	line-height: 16px;
	text-align: right;
	font-style: normal;
}

.tab.active {
	background-color: #F7F9FE; /* 激活状态的背景色 */
	font-weight: 500;
	font-size: 16px;
	color: #364A63;
	line-height: 16px;
	text-align: right;
	font-style: normal;
}
.tab-content {
	margin-top: 20px;
}
.buttons-container {
	display: flex;
	gap: 10px;
	margin-left: auto;
}

.button {
	height: 32px;
	padding-left: 16px;
	padding-right: 16px;
	background: #7F8DFF;
	border-radius: 16px;
	border: 1px solid #ECEEF4;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background-color 0.3s, color 0.3s;
	font-weight: 500;
	font-size: 14px;
	color: #FFFFFF;
	line-height: 16px;
	text-align: right;
	font-style: normal;

}
.button:hover {
	background-color: #FFFFFF; /* 鼠标移入的背景色 */

	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 14px;
	color: #8094AE;
	line-height: 16px;
	text-align: center;
	font-style: normal;
}

.button.active {
	background-color: #FFFFFF; /* 鼠标移入的背景色 */

	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 14px;
	color: #8094AE;
	line-height: 16px;
	text-align: center;
	font-style: normal;
}
.buttons {
	background-color: #FFFFFF; /* 鼠标移入的背景色 */

	height: 32px;
	padding-left: 16px;
	padding-right: 16px;
	border-radius: 16px;
	border: 1px solid #ECEEF4;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background-color 0.3s, color 0.3s;
	font-weight: 500;
	font-size: 14px;
	color: #8094AE;

	line-height: 16px;
	text-align: right;
	font-style: normal;

}
.buttons:hover {
	background: #7F8DFF;

	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	text-align: center;
	color: #FFFFFF;

	font-style: normal;
}

.buttons.active {
	background: #7F8DFF;

	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 14px;
	color: #FFFFFF;
	line-height: 16px;
	text-align: center;
	font-style: normal;
}
/*.toggle*/
.filter{
	width: 16px;
	height: 16px;
	margin-right: 9px;
}
.download{
	width: 16px;
	height: 16px;
	margin-right: 9px;
}
.toggle{
	width: 16px;
	height: 16px;
	margin-right: 9px;
}
</style>
<style scoped>
.custom-border-table,
.custom-border-table .el-table__header-wrapper,
.custom-border-table .el-table__body-wrapper,
.custom-border-table .el-table__footer-wrapper {
	width: 942px;margin-top: 20px;
	border-radius: 0px 0px 4px 4px;
	margin-bottom: 100px;
	border: 1px solid #DBDFEA;
}

.custom-border-table .el-table__row,
.custom-border-table .el-table__cell {
	border-bottom: 1px solid #000; /* 行之间的边框 */
}

.custom-border-table .el-table__header th,
.custom-border-table .el-table__body td {
	border-right: 1px solid #000; /* 列之间的边框 */
}

.custom-border-table .el-table__header th:last-child,
.custom-border-table .el-table__body td:last-child {
	border-right: none; /* 移除最后一列的右边框 */
}

.custom-border-table .el-table__row:last-child td {
	border-bottom: none; /* 移除最后一行的底部边框 */
}
</style>
<style lang="less" scoped>

.quesheng{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%; /* 或者设置一个具体的高度，如 300px */
	padding: 20px;
	margin-bottom: 20px;
	text-align: center;
	width: 900px;
}
.quesheng img{
	max-width: 100%; /* 保证图片宽度不会超过容器宽度 */
	height: auto; /* 高度自动以适应宽度 */
	margin-bottom: 10px; /* 与下方文字保持一些间距 */
	width:300px;
}
.empty-list-text {
	margin: 0; /* 去除默认的margin */
	color: #526484;
	font-weight: 400;
	font-size: 14px;
}

.app-container {
	padding-left: 60px;
	padding-top: 52px;
	//background-color: #EBEDF0;;
}
.group_2 {
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 24px;
	//width: 941px;
	//height: 360px;
	border: 1px solid rgba(255, 255, 255, 1);
	background-color: #EBEDF0;;
	margin: 30px 0 0 0px;
	padding: 30px 40px 0px 40px;
	align-content: center;

}
//::v-deep .el-dialog__header {
//	border-bottom: none;
//}
.page-titles {
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 14px;
	color: #526484;
	line-height: 20px;
	text-align: left;
	font-style: normal;
}
.text-wrapper_16 {
	margin-top: 4px;


}
.text_5 {
	//width: 72px;
	//height: 36px;
	font-size: 18px;
	font-family: PingFangSC, PingFang SC;
	font-weight: 600;
	color: #364A63;
	line-height: 36px;
	//margin-left: 689px;
}
.thumbnail_2 {
	width: 12px;
	height: 9px;
	margin: 13px 0 0 10px;
}
.custom-style {
	//width: 941px;
	//height: 150px;
	background: #FFFFFF;
	border-radius: 16px;
	padding: 24px 30px 53px;
	margin-bottom: 24px;

}
.custom-two-style {
	//width: 941px;
	//height: 203px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 40px;

}
.custom-four-style {
	//width: 941px;
	//height: 150px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 40px;

}
.my-special-class {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.my-special-class .btn {
	width: 146px;
	height: 42px;
	//background: #7F8DFF;
	border-radius: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.my-special-class .btn_two {
	width: 146px;
	height: 42px;
	//background: #7F8DFF;
	border-radius: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.my-special-class .btn + .btn {
	margin-left: 20px;
}

.my-special-class .btn-text {
	font-size: 14px;
	font-family: Roboto-Medium, Roboto;
	font-weight: 500;
	color: #FFFFFF;
	line-height: 16px;
}
.custom-three-style {
	//width: 941px;
	//height: 150px;
	background: #FFFFFF;
	border-radius: 16px;
	flex-grow: 1;

	padding: 20px 30px 22px;
	//margin-bottom: 24px;

}
.text_70 {
	//width: 64px;
	//height: 20px;
	font-size: 16px;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #364A63;
	line-height: 20px;
}
.text_8 {
	width: 56px;
	height: 20px;
	font-size: 14px;
	font-family: 'PingFangSC-Semibold', 'PingFang SC';
	font-weight: 600;
	color: #364A63;
	line-height: 20px;
}
.new-style {
	font-family: Roboto, Roboto;
	font-weight: 500;
	font-size: 24px;
	color: #526484;
	line-height: 26px;
	text-align: left;
	font-style: normal;
}
.new-style-8 {
	width: 110px;
	height: 32px;
	font-size: 28px;
	font-family: 'Roboto-Medium', 'Roboto';
	font-weight: 500;
	color: #7F8DFF;
	line-height: 32px;
}
.custom-title {
	//width: 120px;
	height: 20px;
	font-size: 14px;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #7F8DFF;
	line-height: 20px;
	background: none;
	border: none;
	cursor: pointer;
}

.custom-title:hover {
	text-decoration: underline;
}
.new-two-style {
	font-family: Roboto, Roboto;
	font-weight: 500;
	font-size: 16px;
	color: #526484;
	line-height: 18px;
	text-align: left;
	font-style: normal;
}
.new-two-style-8 {
	width: 42px;
	height: 24px;
	font-size: 20px;
	font-family: 'PingFangSC-Medium', 'PingFang SC';
	font-weight: 500;
	color: #364A63;
	line-height: 24px;
}
.custom-div {
	width: 25px;
}
.dialog-content {
	//width: 506px;
	//height: 527px;
	display: flex;
	flex-direction: column;
}

.section-input {
	margin-bottom: 31px;
	margin-top: 5px;
}
.generated-url {
	width: 436px;
	height: 40px;
	background: #FFFFFF;
	border-radius: 4px;
	border: 1px solid #DBDFEA;
	padding-left: 10px;
	padding-right: 10px;
	margin-bottom: 22px;
	display: flex;
	flex-direction: column;
	justify-content: center;

}
.url-content {
	justify-content: space-between;
	align-content: center;
	align-items: center;
	display: flex;
	flex-direction: row;

}

.copy-div {
	display: flex;
	flex-direction: row;
	justify-content: end;
}
.copy-button {
	//width: 40px;
	//height: 22px;
	width: 40px;
	height: 22px;
	background: #F5F6FF;
	border-radius: 2px;
	border: 1px solid #7F8DFF;
	display: flex;

	justify-content: center;
	align-items: center;
	cursor: pointer;
}
.text_120 {
	//width: 24px;
	//height: 20px;
	font-size: 14px;
	font-family: PingFangSC, PingFang SC;
	font-weight: 400;
	color: #7F8DFF ;
	line-height: 18px;

}
.url-text {
	//width: 404px;
	//height: 36px;
	font-size: 14px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #8094AE;
	//line-height: 18px;
	//margin-bottom: 20px;

}

.generate-link-button {
	width: 146px;
	height: 42px;
	background: #7F8DFF;
	border-radius: 4px;
	float: right;
}

.block-container {
	background-color: rgba(255, 255, 255, 1);
	border-radius: 4px;
	width: 456px;
	height: 300px;
	border: 1px solid rgba(219, 223, 234, 1);
	justify-content: center;
	align-items: center;
	display: flex;
	flex-direction: column;
}

.block-image {
	display: flex;
	flex-direction: column;
	align-items: center;
	//margin:  0  0;
}
.block-image-code-con {
	width: 300-26px;
	height: 267-26px;
}

.block-text-wrapper {
	background-color: rgba(245, 247, 254, 1);
	border-radius: 4px;
	height: 36px;
	width: 160px;
	margin: 24px 0 30px 0;
	display: flex;
	justify-content: center;
	align-items: center;
}

.block-text {
	overflow-wrap: break-word;
	color: rgba(127, 141, 255, 1);
	font-size: 14px;
	font-weight: normal;
	text-align: center;
	white-space: nowrap;
	line-height: 20px;
}
.clean-style {
	//width: 195px;
	height: 36px;
	padding-left: 20px;
	padding-right: 20px;
	background: #FFFFFF;
	border-radius: 18px;
	border: 1px solid #E5E9F2;
}
.text_sdgsga {
	width: 220px;
	font-size: 14px;
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	text-align: end;
	color: #364A63;
}
.chongzhi-button {
	//min-width: 88px;
	height: 32px;
	background: #7F8DFF;
	border-radius: 16px;
	padding: 0 15px;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	margin-right: 12px
}
.chongzhi-button:hover {
	opacity: 0.8; /* 鼠标悬停时的不透明度 */
}
.chongzhi-button2 {
	//min-width: 88px;
	height: 32px;
	background: #F7F9FE;
	border-radius: 16px;
	padding: 0 15px;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	margin-right: 12px
}
.chongzhi-button2:hover {
	background-color: #7F8DFF/* 鼠标悬停时的不透明度 */
}
.chongzhi-button2:hover .btn-text-te2 {
	color: #F7F9FE; /* 修改为你想要的 SVG 填充色 */
}
.chongzhi-button2:hover .svg-tabs {
	color: #F7F9FE; /* 修改为你想要的 SVG 填充色 */
}
.btn-text-te {
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 14px;
	color: #FFFFFF;
	line-height: 16px;
	font-style: normal;
	padding-left: 8px;
}
.btn-text-te2 {
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 14px;
	color: #364A63;
	line-height: 16px;
	text-align: right;
	font-style: normal;
	padding-left: 8px;
}
.scrollable-container {
	width: 900px;

	overflow: scroll;
	white-space: nowrap;
	scrollbar-width: thin;
	scrollbar-color: #C5CAD4 #EBEEF4;
}

.scrollable-container::-webkit-scrollbar {
	width: 6px;
}

.scrollable-container::-webkit-scrollbar-track {
	background-color: #F5F5F5;
}

.scrollable-container::-webkit-scrollbar-thumb {
	background-color: #7F8DFF;
}

.content {
	padding-top: 20px;
	padding-bottom: 10px;
}
.cursor-pointer {
	cursor: pointer;
}
.item {
	display: inline-block;
	width: 256-32px;
	height: 208-32px;
	background: #F7F9FE;
	border-radius: 16px;
	margin-right: 12px;
	padding: 16px;
	cursor: pointer;
}

.transaction-section {
	background: #fff;
	margin-top: 16px;
	width: 942px;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
}

.header h3 {
	margin: 0;
	color: #364A63;
	font-size: 18px;
}

.view-more {
	font-weight: 500;
	font-size: 14px;
	color: #8094AE;
	line-height: 16px;
	text-align: right;
	font-style: normal;
	text-decoration-line: underline;
	cursor: pointer;
	background: none;
	border: none;
	padding: 0;
}

.transaction-list {
	display: flex;
	flex-direction: column;
}

.transaction-item {
	display: flex;
	justify-content: space-between;
	height: 70px;
	padding: 12px 0;
	cursor: pointer;
	box-sizing: border-box;
	border-bottom: 1px solid #EBEEF4;
}

.transaction-item:hover {
	background: #F6F8FE;
}

.transaction-left {
	display: flex;
	align-items: center;
}

.icon {
	width: 48px;
	height: 48px;
	margin-right: 10px;
}

.transaction-info {
	display: flex;
	flex-direction: column;
}

.transaction-type {
	font-size: 14px;
	font-weight: 600;
	color:#364A63;
}

.transaction-date {
	margin-top:5px;
	font-size: 12px;
	color: #8094AE;
}

.transaction-right {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.transaction-amount {
	font-size: 14px;
	font-weight: 600;
}

.transaction-status {
	font-size: 12px;
	margin-top: 5px;
}

.status-success {
	color: #8094AE;
}

.status-fail {
	color: #F23C3C;
}

.status-processing {
	color: #FF7A16;
}
.status-processing-yellow {
	color: yellow;
}

</style>

<style scoped>
.custom-dialog /deep/ .el-dialog__body {
	padding: 0;
}
.upload-demo  /deep/ .el-upload-dragger {
	width: 442px;
}
.custom-dialog /deep/ .el-dialog__footer {
	border-top: none ;
}
/*.custom-dialog /deep/ .el-dialog__header {*/
/*	margin-top: 24px;*/
/*}*/
.custom-order-dialog /deep/ .el-dialog__header {
	/*border-bottom: 1px;*/
	border-bottom: 1px solid #DBDFEA;
	padding: 16px 24px;
}
.custom-order-dialog /deep/ .el-dialog__body {

	padding: 19px 50px 20px 32px;
}
.dialog-footer {
	/*padding: 16px 24px;*/
	/*border-top: none;*/
	/*align-items: end;*/
	flex-direction: row;
	display: flex;
	justify-content: flex-end;
	align-items: end;
}

/deep/ .el-button--small {
	width: 90px;
	/*height: 28px;*/

	background: #FFFFFF;
	border-radius: 4px;
	border: 1px solid #DBDFEA;
	align-items: center;

	font-family: PingFangSC, PingFang SC;
	font-weight: 400;
	font-size: 14px;
	color: #7F8DFF;
	line-height: 14px;
	text-align: center;
	font-style: normal;
	align-items: center;

}
/deep/ .el-button--small:hover {

	background: #F8F9FC;
	/*color: #7F8DFF;*/

}
</style>
<style scoped>
.form-item {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	margin-bottom: 16px;
}

.form-label {
	width: 134px;
	max-width: 134px;
	flex-shrink: 0;
	margin-right: 16px;
	padding-top: 7px;
}

.el-input,
.upload-container {
	flex-grow: 1;
}

.custom-upload {
	display: flex;
	align-items: flex-start;
	flex-direction: row;
}

.custom-order-button {
	/*margin-left: 10px;*/
}

.el-upload-list {
	margin-top: 10px;
}
</style>