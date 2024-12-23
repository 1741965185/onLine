<template>
	<div class="app-containers">
		<div v-if="transferMoneyCashDeposit">
			<div class="page-title mb28">{{$t('debitTable.debitTable')}}</div>
			<div style="display: flex;flex-direction: row;width: 100%">

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
<!--					<div-->
<!--						class="button"-->
<!--						@click="handleDownload"-->
<!--						@mouseover="hoverButton('download')"-->
<!--						@mouseleave="leaveButton"-->
<!--						:class="{ active: activeButton === 'download' }"-->
<!--					>-->
<!--						<svg-icon icon-class="download-icon" class="download"/>-->

<!--						&lt;!&ndash;						<img src="@/assets/images/download-icon.png" alt="下载" class="download"/>&ndash;&gt;-->
<!--						{{$t('orderList.download')}}-->
<!--					</div>-->
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
			<div style="width: 100%;margin-top: 20px;" :key="componentKey">
				<template v-if="activeTab === 0">
					<search-form
						ref="order-search-form"
						v-show="showScreen"
						:key="activeTab"
						:option="searchOption"
						:formSearch="form"
						@getSearchForm="getSearchForm($event, 1)"
					></search-form>
				</template>
				<template v-else>
					<search-form
						ref="order-search-form"
						v-show="showScreen"
						:key="activeTab"
						:option="searchOption2"
						:formSearch="form"
						@getSearchForm="getSearchForm($event, 1)"
					></search-form>
				</template>

			</div>
			<div v-if="newView===0">
				<div class="custom-border-table" v-if="activeTab === 0">
					<el-table
						v-loading="loading"
						ref="multipleTable"
						:data="transferMoneyData"
						tooltip-effect="dark"
						style="width: 100%"
						@selection-change="handleSelectionChange"
					>
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column prop="balanceId" min-width="160px" :label="$t('debitTable.batchNumber')"></el-table-column>
						<el-table-column prop="hkCurrency" min-width="80px" :label="$t('debitTable.remittanceCurrency')"></el-table-column>
						<el-table-column prop="hkAmount" :label="$t('debitTable.remittanceAmount')"></el-table-column>
						<el-table-column prop="binName" min-width="140px" :label="$t('debitTable.remittanceBank')"></el-table-column>
						<el-table-column min-width="170px" :label="$t('debitTable.tableCreationTime')">
							<template slot-scope="scope">
								{{ scope.row.createTableDate ? dayjs(scope.row.createTableDate).format("YYYY-MM-DD HH:mm:ss") : "-" }}
							</template>
						</el-table-column>
						<el-table-column min-width="170px" :label="$t('debitTable.remittanceDate')">
							<template slot-scope="scope">
								{{ scope.row.hkdate ? dayjs(scope.row.hkdate).format("YYYY-MM-DD HH:mm:ss") : "-" }}
							</template>
						</el-table-column>
						<el-table-column prop="remark" min-width="100px" :label="$t('debitTable.remittanceRemarks')"></el-table-column>
						<el-table-column :label="$t('debitTable.operation')" fixed="right" min-width="100px">
							<template slot-scope="scope">
								<circular-dropdown :list="operationList" :row="scope.row" @command="operateScope"></circular-dropdown>
							</template>
						</el-table-column>
					</el-table>
					<pagination
						:total="total"
						:page.sync="form.pageNum"
						:limit.sync="form.pageSize"
						@pagination="$refs['order-search-form'].getList()"
					>
					</pagination>

				</div>
				<div class="custom-border-table" v-else>
					<el-table
						:data="bondTableList"
						ref="bondTableList"
						tooltip-effect="dark"
						style="width: 100%"
						v-loading="loading"
						@selection-change="handleSelectionChange"
					>
						<el-table-column type="selection" width="55"> </el-table-column>
						<el-table-column prop="balanceId" min-width="160" :label="$t('depositTransfer.batchNumber')"> </el-table-column>
						<el-table-column prop="hkCurrency" :label="$t('depositTransfer.remittanceCurrency')"> </el-table-column>
						<el-table-column prop="hkAmount" :label="$t('depositTransfer.remittanceMoney')"> </el-table-column>
						<el-table-column prop="createTableDate" min-width="160" :label="$t('depositTransfer.tableCreationTime')"> </el-table-column>
						<el-table-column prop="startDate" min-width="160" :label="$t('depositTransfer.transactionStartTime')"> </el-table-column>
						<el-table-column prop="endDate" min-width="160" :label="$t('depositTransfer.transactionEndTime')"> </el-table-column>
						<el-table-column prop="hkDate" min-width="160" :label="$t('depositTransfer.remittanceDate')"> </el-table-column>
						<el-table-column prop="hkBank" min-width="160" :label="$t('depositTransfer.remittanceBank')"> </el-table-column>
						<el-table-column prop="remark" min-width="160" :label="$t('depositTransfer.remarks')"> </el-table-column>
						<el-table-column :label="$t('depositTransfer.operation')" fixed="right">
							<template slot-scope="scope">
								<div class="icon-hover-effect" @click="getDetails(scope.row)">
									<svg-icon icon-class="eye" />
								</div>
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

			</div>
			<div v-if="newView===1">
				<div class="transaction-list" v-if="transactions.length != 0">

					<div-dropdown v-for="transaction in transactions" :key="transaction.id" @click="viewDetail(transaction)"
							 :list="operationList" :row="transaction" @command="operateScope" #dropdown-button
					>
					<div class="transaction-item">
						<div class="transaction-left">
							<img :src="getIcon(transaction.type)" alt="icon" class="icon" />
							<div class="transaction-info">
								<div class="transaction-type">{{ transaction.balanceId }}</div>
								<div class="transaction-date">{{ transaction.createTableDate }}</div>
							</div>
						</div>
						<div class="transaction-right">
							<div class="transaction-amount">{{ transaction.hkAmount }} {{ transaction.hkCurrency }}</div>
							<div class="transaction-status">{{ transaction.binName }}</div>
						</div>
					</div>
					</div-dropdown>
				</div>
				<el-empty description="" v-else class="custom-empty"></el-empty>

				<pagination
					:total="total"
					:page.sync="form.pageNum"
					:limit.sync="form.pageSize"
					@pagination="$refs['order-search-form'].getList()"
				/>

			</div>

		</div>



		<el-tabs v-model="activeName" v-if="false">
<!--		<el-tabs v-model="activeName" v-show="transferMoneyCashDeposit">-->
			<!-- 划款表  -->
			<el-tab-pane name="0">
				<span slot="label"><i class="el-icon-date"></i> {{$t("debitTable.debitTable")}}</span>
				<div class="Flex spaceB alignC card-tools-toggle">
					<div class="Flex alignC">
						<pageSizeSelect
							class="mr12"
							:limit.sync="form.pageSize"
							@changeSize="$refs['order-search-form'].getList(1)"
						></pageSizeSelect>
						<div class="icon-hover-effect mr12" @click="showScreen_a = !showScreen_a">
							<svg-icon icon-class="select" />
						</div>
					</div>
				</div>
				<!-- 订单列表搜索组件 -->
				<template v-if="activeName == 0">
					<search-form
						ref="order-search-form"
						v-show="showScreen_a"
						:option="searchOption"
						:formSearch="form"
						@getSearchForm="getSearchForm($event, 1)"
					></search-form>
				</template>
				<el-table
					v-loading="loading"
					ref="multipleTable"
					:data="transferMoneyData"
					tooltip-effect="dark"
					style="width: 100%"
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="balanceId" min-width="160px" :label="$t('debitTable.batchNumber')"></el-table-column>
					<el-table-column prop="hkCurrency" min-width="80px" :label="$t('debitTable.remittanceCurrency')"></el-table-column>
					<el-table-column prop="hkAmount" :label="$t('debitTable.remittanceAmount')"></el-table-column>
					<el-table-column prop="binName" min-width="140px" :label="$t('debitTable.remittanceBank')"></el-table-column>
					<el-table-column min-width="170px" :label="$t('debitTable.tableCreationTime')">
						<template slot-scope="scope">
							{{ scope.row.createTableDate ? dayjs(scope.row.createTableDate).format("YYYY-MM-DD HH:mm:ss") : "-" }}
						</template>
					</el-table-column>
					<el-table-column min-width="170px" :label="$t('debitTable.remittanceDate')">
						<template slot-scope="scope">
							{{ scope.row.hkdate ? dayjs(scope.row.hkdate).format("YYYY-MM-DD HH:mm:ss") : "-" }}
						</template>
					</el-table-column>
					<el-table-column prop="remark" min-width="100px" :label="$t('debitTable.remittanceRemarks')"></el-table-column>
					<el-table-column :label="$t('debitTable.operation')" fixed="right">
						<template slot-scope="scope">
							<circular-dropdown :list="operationList" :row="scope.row" @command="operateScope"></circular-dropdown>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<!-- 保证金划款表  -->
			<el-tab-pane name="1">
				<span slot="label"><i class="el-icon-date"></i> {{$t("depositTransfer.marginRemittanceTable")}}</span>
				<div class="Flex spaceB alignC card-tools-toggle">
					<div class="Flex alignC">
						<page-size-select
							class="mr12"
							@changeSize="$refs['order-search-form'].getList(1)"
							:limit.sync="form.pageSize"
						></page-size-select>
						<div class="icon-hover-effect mr12" @click="showScreen = !showScreen">
							<svg-icon icon-class="select" />
						</div>
					</div>
				</div>
				<!-- 订单列表搜索组件 -->
				<template v-if="activeName == 1">
					<search-form
						ref="order-search-form"
						v-show="showScreen"
						:option="searchOption2"
						:formSearch="form"
						@getSearchForm="getSearchForm($event, 1)"
					></search-form>
				</template>
				<el-table
					:data="bondTableList"
					ref="bondTableList"
					tooltip-effect="dark"
					style="width: 100%"
					v-loading="loading"
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="55"> </el-table-column>
					<el-table-column prop="balanceId" min-width="160" :label="$t('depositTransfer.batchNumber')"> </el-table-column>
					<el-table-column prop="hkCurrency" :label="$t('depositTransfer.remittanceCurrency')"> </el-table-column>
					<el-table-column prop="hkAmount" :label="$t('depositTransfer.remittanceMoney')"> </el-table-column>
					<el-table-column prop="createTableDate" min-width="160" :label="$t('depositTransfer.tableCreationTime')"> </el-table-column>
					<el-table-column prop="startDate" min-width="160" :label="$t('depositTransfer.transactionStartTime')"> </el-table-column>
					<el-table-column prop="endDate" min-width="160" :label="$t('depositTransfer.transactionEndTime')"> </el-table-column>
					<el-table-column prop="hkDate" min-width="160" :label="$t('depositTransfer.remittanceDate')"> </el-table-column>
					<el-table-column prop="hkBank" min-width="160" :label="$t('depositTransfer.remittanceBank')"> </el-table-column>
					<el-table-column prop="remark" min-width="160" :label="$t('depositTransfer.remarks')"> </el-table-column>
					<el-table-column :label="$t('depositTransfer.operation')" fixed="right">
						<template slot-scope="scope">
							<div class="icon-hover-effect" @click="getDetails(scope.row)">
								<svg-icon icon-class="eye" />
							</div>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>

			<!-- 分页器 -->
			<pagination
				:total="total"
				:page.sync="form.pageNum"
				:limit.sync="form.pageSize"
				@pagination="$refs['order-search-form'].getList()"
			>
			</pagination>
		</el-tabs>
		<!-- 划款表 和 划款明细 -->
		<div class="" v-show="showCrossSectionDetails">
			<div class="right margin_B20 go-back-btn">
				<el-button @click="hiddenCrossSectionDetails">
					<svg-icon icon-class="arrow-left" />
					{{$t('debitTable.return')}}
				</el-button>
			</div>
			<el-tabs v-model="activeName_HK" @tab-click="HKXQhandleClick">
				<!-- 划款表 和 划款明细 --划款表  -->
				<el-tab-pane>
					<span slot="label"><i class="el-icon-date"></i> {{$t('debitTable.foreignCardRemittance')}} </span>
					<div class="padding_10 font_color">
						<div class="">
							<div class="border-b padding_10">
								<span>{{$t('debitTable.pchhh')}}</span>
								<span>/</span>
								<span>{{ transferMoneyForm.balanceId }}</span>
							</div>
							<el-form :model="transferMoneyForm" ref="transferMoneyForm" label-width="150px" class="demo-ruleForm">
								<el-form-item :label="$t('debitTable.accountName')">
									<span>{{ transferMoneyForm.accountName }}</span>
								</el-form-item>
								<el-form-item :label="$t('debitTable.accountNumber')">
									<span>{{ transferMoneyForm.account }}</span>
								</el-form-item>
								<el-form-item :label="$t('debitTable.bankName')">
									<span>{{ transferMoneyForm.binName }}</span>
								</el-form-item>
								<el-form-item :label="$t('debitTable.currency')">
									<span>{{ transferMoneyForm.hkCurrency }}</span>
								</el-form-item>
								<el-form-item :label="$t('debitTable.transactionHandlingFee')">
									<span>{{ transferMoneyForm.tradeFee }}</span>
								</el-form-item>
								<el-form-item :label="$t('GAS')">
									<span>{{ transferMoneyForm.gas }}</span>
								</el-form-item>
								<el-form-item :label="$t('debitTable.transferAmount')">
									<span>{{ transferMoneyForm.hkAmount }}</span>
								</el-form-item>


							</el-form>
						</div>
						<div class="font_color">
							<div class="flex_l_r_b border-b">
								<span class="padding_10">{{ transferMoneyForm.currentTransactionRemittance }}</span>
							</div>
							<el-table
								v-loading="loading"
								ref="multipleTable"
								:data="DebitForCurrentTransaction"
								tooltip-effect="dark"
								style="width: 100%"
								@selection-change="handleSelectionChange"
							>
								<el-table-column prop="tradeNum" min-width="90px" :label="$t('debitTable.numberOfTransactions')"></el-table-column>
								<el-table-column prop="currencyCode" min-width="90px" :label="$t('debitTable.transactionCurrency')"></el-table-column>
								<el-table-column min-width="90px" prop="tradeSourceAmount" :label="$t('debitTable.transactionAmount')"></el-table-column>
								<el-table-column prop="bailAmount_CNY" min-width="90px" :label="$t('debitTable.margin')"></el-table-column>
								<el-table-column prop="feeAmount_CNY" min-width="90px" :label="$t('debitTable.commission')"></el-table-column>
								<el-table-column prop="tradeAmount_CNY" min-width="90px" :label="$t('debitTable.amountToBeRemitted')"></el-table-column>
								<el-table-column prop="hkCurrency" min-width="90px" :label="$t('debitTable.remittanceCurrency')"></el-table-column>
								<el-table-column prop="otherAmountCNY" min-width="90px" :label="$t('debitTable.otherDeductionAmount')"></el-table-column>
								<el-table-column prop="settleAmount_CNY" min-width="90px" :label="$t('debitTable.remittanceAmount')"></el-table-column>
							</el-table>
						</div>
						<div class="font_color">
							<div class="flex_l_r_b border-b">
								<span class="padding_10">{{$t("debitTable.abnormalRemittanceAndPreviousSupplement")}}</span>
							</div>
							<el-table
								v-loading="loading"
								ref="multipleTable"
								:data="AbnormalCrossSection"
								tooltip-effect="dark"
								style="width: 100%"
								@selection-change="handleSelectionChange"
							>
								<el-table-column prop="counts" min-width="90px" :label="$t('debitTable.numberOfTransactions')"></el-table-column>
								<el-table-column prop="currencyCode" min-width="90px" :label="$t('debitTable.currency')"></el-table-column>
								<el-table-column min-width="90px" prop="tradeSourceAmount" :label="$t('debitTable.transactionAmount')"></el-table-column>
								<el-table-column prop="otherAmount_CNY" min-width="90px" :label="$t('debitTable.otherDeductionAmount')"></el-table-column>
								<el-table-column prop="sourceAmount" min-width="90px" :label="$t('debitTable.amountToBeRemitted')"></el-table-column>
								<el-table-column prop="hkCurrency" min-width="90px" :label="$t('debitTable.remittanceCurrency')"></el-table-column>
								<el-table-column prop="settleAmount_CNY" min-width="90px" :label="$t('debitTable.remittanceAmount')"></el-table-column>
							</el-table>
						</div>
						<div class="font_color">
							<div class="flex_l_r_b border-b">
								<span class="padding_10">{{$t("debitTable.commission")}}</span>
							</div>
							<el-table
								v-loading="loading"
								ref="multipleTable"
								:data="serviceCharge"
								tooltip-effect="dark"
								style="width: 100%"
								@selection-change="handleSelectionChange"
							>
								<el-table-column prop="status" min-width="90px" :label="$t('debitTable.status')">
									<template slot-scope="scope">
										{{ scope.row.status | reasonFilter(freeStatus) }}
									</template>
								</el-table-column>
								<el-table-column prop="refundCurrency" min-width="90px" :label="$t('debitTable.tagCurrency')"></el-table-column>
								<el-table-column prop="number" min-width="90px" :label="$t('debitTable.refundChargebackCount')"></el-table-column>
								<el-table-column prop="refundAndProtestAmount" min-width="90px" :label="$t('debitTable.refundChargebackAmount')"></el-table-column>
								<el-table-column prop="frozenAmount" min-width="90px" :label="$t('debitTable.frozenAmount')"></el-table-column>
								<el-table-column prop="refundProtestAmount" min-width="90px" :label="$t('debitTable.abnormalHandlingFee')"></el-table-column>
							</el-table>
						</div>
						<div class="font_color">
							<div class="flex_l_r_b border-b">
								<span class="padding_10">{{$t("debitTable.otherDeductions")}}</span>
							</div>
							<el-table
								v-loading="loading"
								ref="multipleTable"
								:data="deductionData"
								tooltip-effect="dark"
								style="width: 100%"
							>
								<el-table-column prop="otherDeduction" :label="$t('debitTable.deductions')"></el-table-column>
								<el-table-column prop="otherBaseCode" :label="$t('debitTable.currency')"></el-table-column>
								<el-table-column prop="otherAmount" :label="$t('debitTable.amount')"></el-table-column>
								<el-table-column prop="otherRemark" :label="$t('debitTable.remarks')"></el-table-column>
							</el-table>
						</div>
					</div>
				</el-tab-pane>
				<!-- 划款表 和 划款明细 --划款明细  -->
				<el-tab-pane>
					<span slot="label"><i class="el-icon-date"></i> {{$t("debitTable.remittanceDetails")}}</span>
					<div class="padding_10 font_color">
						<div class="flex_l_r_b padding_t20_b30">
							<h3 class="page-title mb8">{{$t("debitTable.normalTransactionRemittanceRecords")}}</h3>
							<div class="flex">
								<div class="margin-r20">{{$t("debitTable.total")}}</div>
								<div class="margin-r20">
									<span>{{$t("debitTable.settlementAmount")}}</span>
									<span>{{ mountz }}</span>
								</div>
								<div class="margin-r20">
									<span>{{$t("debitTable.settlementAmount")}}</span>
									<span>{{ bailz }}</span>
								</div>
								<div class="margin-r20">
									<span>{{$t("debitTable.fee")}}</span>
									<span>{{ ratez }}</span>
								</div>
							</div>
						</div>
						<el-table
							v-loading="loading"
							ref="multipleTable"
							:data="resultlistz"
							tooltip-effect="dark"
							style="width: 100%"
							@selection-change="handleSelectionChange"
						>
							<el-table-column prop="tradeNo" min-width="170px" :label="$t('debitTable.transactionSerialNumber')"></el-table-column>
							<el-table-column prop="cardname" min-width="60px" :label="$t('debitTable.cardType')"></el-table-column>
							<el-table-column min-width="80px" prop="sourceamount" :label="$t('debitTable.tagAmount')"></el-table-column>
							<el-table-column prop="bail" min-width="90px" :label="$t('debitTable.marginRate')"></el-table-column>
							<el-table-column prop="rate" min-width="80px" :label="$t('debitTable.cardRate')"></el-table-column>
							<el-table-column prop="settleRate" min-width="80px" :label="$t('debitTable.settlementRate')"></el-table-column>
							<el-table-column min-width="100px" :label="$t('debitTable.transactionStatus')">
								<template slot-scope="scope">
									<div>
										{{ scope.row.orderStatus | HKMX_JYstatus }}
									</div>
								</template>
							</el-table-column>
							<el-table-column prop="tradeDateTime" min-width="170px" :label="$t('debitTable.transactionTime')">
								<template slot-scope="scope">
									<div>
										{{ dayjs(scope.row.tradeDateTime).format("YYYY-MM-DD HH:mm:ss") }}
									</div>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div class="padding_10 font_color">
						<div class="flex_l_r_b padding_t20_b30">
							<h3 class="page-title mb8">{{$t("debitTable.abnormalTransactionRemittanceRecords")}}</h3>
							<div class="flex">
								<div class="margin-r20">{{$t("debitTable.total")}}</div>
								<div class="margin-r20">
									<span>{{$t("debitTable.operationAmount")}}</span>
									<span>{{ mounty }}</span>
								</div>
								<div class="margin-r20">
									<span>{{$t("debitTable.chargebackFee")}}</span>
									<span>{{ ratey }}</span>
								</div>
							</div>
						</div>
						<el-table
							v-loading="loading"
							ref="multipleTable"
							:data="resultListy"
							tooltip-effect="dark"
							style="width: 100%"
							@selection-change="handleSelectionChange"
						>
							<el-table-column prop="tradeNo" min-width="170px" :label="$t('debitTable.transactionSerialNumber')"></el-table-column>
							<el-table-column min-width="80px" label="操作类型">
								<template slot-scope="scope">
									<div>
										{{ scope.row.op_Type | HKMX_OpType }}
									</div>
								</template>
							</el-table-column>
							<el-table-column min-width="60px" prop="currencyCode" :label="$t('debitTable.currency')"></el-table-column>
							<el-table-column prop="op_amount" min-width="80px" :label="$t('debitTable.operationAmount')"></el-table-column>
							<el-table-column prop="refundFee" min-width="90px" :label="$t('debitTable.refundFee')"></el-table-column>
							<el-table-column prop="protestFee" min-width="90px" :label="$t('debitTable.chargebackFee')"></el-table-column>
							<el-table-column prop="bail" min-width="100px" :label="$t('debitTable.marginRate')"></el-table-column>
							<el-table-column prop="rate" min-width="80px" :label="$t('debitTable.cardRate')"></el-table-column>
							<el-table-column prop="settleRate" min-width="80px" :label="$t('debitTable.settlementRate')"></el-table-column>
							<el-table-column prop="hkidtime" min-width="170px" :label="$t('debitTable.remittanceTime')">
								<template slot-scope="scope">
									{{ dayjs(scope.row.hkidtime).format("YYYY-MM-DD HH:mm:ss") }}
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>

		<!-- 保证金划款 和 保证金划款明细 -->
		<div class="" v-show="showEarnestMoneyDetails">
			<div class="right margin_B20">
				<el-button @click="hiddenEarnestMoneyDetails"><i class="el-icon-dat"></i> {{$t("debitTable.retetrer")}}</el-button>
			</div>
			<el-tabs v-model="activeName_BZJ">
				<!-- 保证金划款  -->
				<el-tab-pane>
					<span slot="label"><i class="el-icon-date"></i> {{$t("debitTable.foreignCardRemittance")}}</span>
					<div class="padding_10 font_color">
						<div class="">
							<div class="border-b padding_10">
								<span>{{$t("debitTable.batchNumber")}}</span>
								<span>/</span>
								<span>2105211332340</span>
							</div>
							<el-form :model="transferMoneyForm" ref="transferMoneyForm" label-width="150px" class="demo-ruleForm">
								<el-form-item :label="$t('debitTable.accountName')">
									<span>{{ transferMoneyForm.accountName }}</span>
								</el-form-item>
								<el-form-item :label="$t('debitTable.accountNumber')">
									<span>{{ transferMoneyForm.account }}</span>
								</el-form-item>
								<el-form-item :label="$t('debitTable.bankName')">
									<span>{{ transferMoneyForm.binName }}</span>
								</el-form-item>
								<el-form-item :label="$t('debitTable.currency')">
									<span>{{ transferMoneyForm.hkCurrency }}</span>
								</el-form-item>
								<el-form-item :label="$t('debitTable.remittanceAmount')">
									<span>{{ transferMoneyForm.hkAmount }}</span>
								</el-form-item>
								<el-form-item :label="$t('debitTable.transactionHandlingFee')">
									<span>{{ transferMoneyForm.tradeFee }}</span>
								</el-form-item>
							</el-form>
						</div>
						<div class="font_color">
							<div class="flex_l_r_b border-b">
								<span class="padding_10">{{$t("debitTable.currentTransactionRemittance")}}</span>
							</div>
							<el-table
								ref="multipleTable"
								:data="tableData"
								tooltip-effect="dark"
								style="width: 100%"
								@selection-change="handleSelectionChange"
							>
								<el-table-column prop="a" min-width="160px" :label="$t('debitTable.numberOfTransactions')"></el-table-column>
								<el-table-column prop="b" min-width="80px" :label="$t('debitTable.currency')"></el-table-column>
								<el-table-column prop="c" :label="$t('debitTable.transactionAmount')"></el-table-column>
								<el-table-column prop="d" min-width="150px" :label="$t('debitTable.margindad')"></el-table-column>
								<el-table-column prop="e" min-width="160px" :label="$t('debitTable.commission')"></el-table-column>
								<el-table-column prop="f" min-width="160px" :label="$t('debitTable.otherAmount')"></el-table-column>
								<el-table-column prop="g" min-width="160px" :label="$t('debitTable.amountToBeRemitted')"></el-table-column>
								<el-table-column prop="g" min-width="160px" :label="$t('debitTable.remittanceCurrency')"></el-table-column>
								<el-table-column prop="g" min-width="160px" :label="$t('debitTable.remittanceAmount')"></el-table-column>
							</el-table>
						</div>
					</div>
				</el-tab-pane>

				<!-- 保证金划款明细  -->
				<el-tab-pane>
					<span slot="label"><i class="el-icon-date"></i> {{$t("debitTable.remittanceDetails")}}</span>
					<div class="padding_10 font_color">
						<div class="flex_l_r_b padding_t20_b30">
							<h3 class="page-title mb8">{{$t("debitTable.normalTransactionRemittanceRecords")}}</h3>
							<div class="flex">
								<div class="margin-r20">{{$t("debitTable.totalss")}}</div>
								<div class="margin-r20">
									<span>{{$t("debitTable.tagAmount")}}</span>
									<span>39,650.32</span>
								</div>
								<div class="margin-r20">
									<span>{{$t("debitTable.marginsaas")}}</span>
									<span>-3,901.63</span>
								</div>
								<div class="margin-r20">
									<span>{{$t("debitTable.commission")}}</span>
									<span>-2,438.52</span>
								</div>
							</div>
						</div>
						<el-table
							ref="multipleTable"
							:data="tableData"
							tooltip-effect="dark"
							style="width: 100%"
							@selection-change="handleSelectionChange"
						>
							<el-table-column prop="a" min-width="160px" :label="$t('debitTable.transactionSerialNumber')"></el-table-column>
							<el-table-column prop="b" min-width="80px" :label="$t('debitTable.cardType')"></el-table-column>
							<el-table-column prop="c" label="标签金额"></el-table-column>
							<el-table-column prop="d" min-width="150px" :label="$t('debitTable.marginRate')"></el-table-column>
							<el-table-column prop="e" min-width="160px" :label="$t('debitTable.cardRate')"></el-table-column>
							<el-table-column prop="f" min-width="160px" :label="$t('debitTable.settlementRate')"></el-table-column>
							<el-table-column prop="g" min-width="160px" :label="$t('debitTable.transactionStatus')"></el-table-column>
							<el-table-column prop="g" min-width="160px" :label="$t('debitTable.transactionTime')"></el-table-column>
						</el-table>
					</div>
					<div class="padding_10 font_color">
						<div class="flex_l_r_b padding_t20_b30">
							<h3 class="page-title mb8">{{$t("debitTable.abnormalTransactionRemittanceRecords")}}</h3>
							<div class="flex">
								<div class="margin-r20">{{$t("debitTable.totalasdasd")}}</div>
								<div class="margin-r20">
									<span>{{$t("debitTable.operationAmount")}}</span>
									<span>39,650.32</span>
								</div>
								<div class="margin-r20">
									<span>{{$t("debitTable.marginsadada")}}</span>
									<span>-3,901.63</span>
								</div>
								<div class="margin-r20">
									<span>{{$t("debitTable.chargebackFee")}}</span>
									<span>-2,438.52</span>
								</div>
								<div class="margin-r20">
									<span>{{$t("debitTable.commission")}}</span>
									<span>0</span>
								</div>
							</div>
						</div>
						<el-table
							ref="multipleTable"
							:data="tableData"
							tooltip-effect="dark"
							style="width: 100%"
							@selection-change="handleSelectionChange"
						>
							<el-table-column prop="a" min-width="160px" :label="$t('debitTable.transactionTime')"></el-table-column>
							<el-table-column prop="b" min-width="80px" :label="$t('debitTable.operationType')">></el-table-column>
							<el-table-column prop="c" :label="$t('debitTable.cardType')"></el-table-column>
							<el-table-column prop="d" min-width="150px" :label="$t('debitTable.operationAmount')"></el-table-column>
							<el-table-column prop="e" min-width="160px" :label="$t('debitTable.refundFee')"></el-table-column>
							<el-table-column prop="f" min-width="160px" :label="$t('debitTable.chargebackFee')"></el-table-column>
							<el-table-column prop="g" min-width="160px" :label="$t('debitTable.marginRate')"></el-table-column>
							<el-table-column prop="h" min-width="160px" :label="$t('debitTable.cardRate')"></el-table-column>
							<el-table-column prop="i" min-width="160px" :label="$t('debitTable.settlementRate')"></el-table-column>
							<el-table-column prop="j" min-width="160px" :label="$t('debitTable.remittanceTime')"></el-table-column>
						</el-table>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
import pageSizeSelect from "@/components/PageSizeSelect";
import pagination from "@/components/Pagination";
import CircularDropdown from "@/components/CircularDropdown/index";
import DivDropdown from "@/components/DivDropdown/index";
import SearchForm from "@/components/SearchComponent";
import {
	getHKList, //获取划款表数据
	getCXList, //按条件查询 划款表数据
	getwkhk, // 本期交易划款   异常单划款以及上期补划  手续费
	getCrossSectionDetails,
} from "@/api/Settlement";
import { downloadQueryUpload } from "@/api/download";
import { hkSeeBondList } from "@/api/bond";
import i18n from "@/i18n";
import { mapGetters } from "vuex";

export default {
	name: "Basics",
	components: { CircularDropdown, pageSizeSelect, pagination, SearchForm,DivDropdown },
	data() {
		return {
			transactions: [],
			componentKey: 0,

			MerNo: "",
			tabs: [ i18n.t('debitTable.debitTable'), i18n.t('depositTransfer.marginRemittanceTable'),],
			tableData: [],
			// 默认选中的是划款表， （activeName:"0"）
			activeName: "0",
			activeTab: 0,
			hoveredTab: null,
			activeButton: null,
			// 划款表保证金划款表 显示
			transferMoneyCashDeposit: true,
			// 划款表 的隐藏头部 表单
			showScreen_a: false,
			// 保证金划款表 的隐藏头部 表单
			showScreen_b: false,
			form: {
				pageNum: 1,
				pageSize: 15,
			},
			// 总页数
			total: 0,
			loading: false,
			// 划款表  数据
			transferMoneyData: [],
			operationList: [
				{ label: this.$t('debitTable.view'), icon: "tk", value: 10 },
				{ label:  this.$t('debitTable.download'), icon: "download", value: 12 },
			],
			// 在 划款页面 未点击 查看 时   划款和划款明细 不显示
			showCrossSectionDetails: false,
			// 外卡划卡 表单 (查看里面的)
			transferMoneyForm: {
				accountName: "",
				account: "",
				binName: "",
				hkCurrency: "",
				hkAmount: "",
				balanceId: "", //批次号
			},
			// 本期交易划款 (查看里面的)  数据
			DebitForCurrentTransaction: [],
			// 异常单划款以及上期补划 (查看里面的)  数据
			AbnormalCrossSection: [],
			// 手续费 (查看里面的) 数据
			serviceCharge: [],
			deductionData: [],
			activeName_HK: "0",
			// 划款明细 正常交易划款记录 数据
			resultlistz: [],
			//
			mountz: "", //正常  标签金额
			bailz: "", //正常  保证金合计
			ratez: "", //正常  手续费合计
			mounty: "", //异常  操作金额合计
			baily: "", //异常  保证金合计
			ratey: "", //异常  拒付处理费合计
			protestfeey: "", //异常 手续费合计
			// 划款明细 异常交易划款记录 数据
			resultListy: [],
			// 在 保证金划款 未点击 查看 时   保证金划款和保证金划款明细  不显示
			showEarnestMoneyDetails: false,
			activeName_BZJ: "0",
			// 当前行的批次号  请求 外卡划款 和 划款明细 的参数
			balanceId: "2104281000467",
			// 划款表搜索
			searchOption: {
				column: [
					{
						label:  this.$t('debitTable.batchNumber'),
						prop: "balanceId",
						type: "input",
					},
					{
						label: this.$t('debitTable.tableCreationTime'),
						prop: "time",
						type: "datetimerange",
					},

				],
			},
			bondTableList: [],
			showScreen: false,

			searchOption2: {
				column: [
					{
						label: this.$t('depositTransfer.batchNumber'),
						prop: "balanceId",
						type: "input",
					},
					{
						label: this.$t('depositTransfer.tableCreationTime'),
						prop: "time",
						type: "datetimerange",
					},
				],
			},

			freeStatus: [
				{ label: this.$t('debitTable.refund'), value: 5 },
				{ label: this.$t('debitTable.chargeback'), value: 11 },
				{ label: this.$t('debitTable.refundAfterChargeback'), value: 17 },
			],
		};
	},
	created() {
	},
	computed: {
		...mapGetters(["merType","newView"]),
	},
	filters: {
		// 划款明细之 交易状态
		HKMX_JYstatus(val) {
			switch (val) {
				case 0:
					return "";
				case 1:
					return i18n.t('debitTable.transactionFailed');
				case 2:
					return i18n.t('debitTable.authorizationPending');
				case 3:
					return i18n.t('debitTable.authorizationSuccessful');
				case 4:
					return i18n.t('debitTable.authorizationFailed');
				case 5:
					return i18n.t('debitTable.transactionSuccessful');
				case 6:
					return i18n.t('debitTable.transactionFailed');
				case 7:
					return i18n.t('debitTable.transactionCancelled');
				case 8:
					return i18n.t('debitTable.transactionCancellationProcessing');
				case 9:
					return i18n.t('debitTable.refundSuccessful');
				case 10:
					return i18n.t('debitTable.refundProcessing');
				case 11:
					return i18n.t('debitTable.chargeback');
				case 12:
					return i18n.t('debitTable.chargebackProcessing');
				case 13:
					return i18n.t('debitTable.frozen');
				case 14:
					return i18n.t('debitTable.frozenProcessing');
				case 15:
					return i18n.t('debitTable.unfreeze');
				case 16:
					return i18n.t('debitTable.unfreezeProcessing');
				case 17:
					return i18n.t('debitTable.refundAfterChargeback');
				case null:
					return "--";
			}
		},
		// 划款明细之 操作类型
		HKMX_OpType(value) {
			switch (value) {
				case "0":
					return i18n.t('debitTable.other');
				case "1":
					return i18n.t('debitTable.refund');
				case "2":
					return i18n.t('debitTable.chargeback');
				case "3":
					return i18n.t('debitTable.frozen');
				case "4":
					return i18n.t('debitTable.unfreeze');
				case "5":
					return i18n.t('debitTable.refundAfterRemittance');
				case "6":
					return i18n.t('debitTable.chargebackAfterRemittance');
				case "7":
					return i18n.t('debitTable.frozenAfterRemittance');
				case "8":
					return i18n.t('debitTable.unfreezeAfterRemittance');
				case "9":
					return i18n.t('debitTable.successfulAppeal');
				case "17":
					return i18n.t('debitTable.refundAfterChargeback');
				case null:
					return "";
			}
		},
		// shouXuFei(val)
	},
	methods: {
		selectTab(index) {
			// this.transactions=[];
			this.form= {
				pageNum: 1,
				pageSize: 15,
			};
			this.activeTab = index;
					this.getSearchForm(this.formProps);

			// if (this.newView === 0) {
			// 	if(this.activeTab === 0){
			// 		this.getSearchForm(this.formProps1);
			// 	}else{
			// 		this.getSearchForm(this.formProps2);
			// 	}
			// }else{
			// 	if(this.activeTab === 0){
			// 		this.getSearchForm(this.formProps3);
			// 	}else if(this.activeTab === 1){
			// 		this.getSearchForm(this.formProps4);
			// 	}else{
			// 		this.getSearchForm(this.formProps5);
			// 	}
			// }
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
		getIcon(type) {
			// 根据交易类型返回相应的图标路径
			return '/icon/huakuanbiao.png';
		},
		viewDetail(params) {
			// 当点击查看 且 页面是  外卡划款 的时候
			this.transferMoneyCashDeposit = false;
			this.showCrossSectionDetails = true;
			//当点击查看的时候 获取 当前行 个人信息
			this.transferMoneyForm = params;
			//获取批次号 后面 要当前行的 批次号 获取 外卡划款 数据
			this.balanceId = params.balanceId;
			//
			//当点击查看的时候   获取 外卡划款 和 划款明细的数据
			// if (params.balanceId)
			// 	this.$router.push({
			// 		path: "/details/bond/" + params.balanceId,
			// 		query: { hkType: params.hkType },
			// 	});
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
		// 分页请求
		getSearchForm(params) {
			if (this.activeTab === 0) {
				// 外卡划款
				this.getHKdataList(params);
			}else if (this.activeTab === 1) {
				// 划款明细
				this.$hkSeeBondList(params);
			}
		},
		$hkSeeBondList(page) {
			this.loading = true;
			let data = {
				...page,
				startDate: page.time[0],
				endDate: page.time[1],
			}
			this.$delete(data, "time");
			hkSeeBondList(data)
				.then(result => {
					this.loading = false;
					this.bondTableList = result.list;
					this.transactions = result.list;

					this.total = result.total;
				})
				.catch(error => {
					this.loading = false;
				});
		},

		getDetails(params) {
			if (params.balanceId)
				this.$router.push({
					path: "/details/bond/" + params.balanceId,
					query: { hkType: params.hkType },
				});
		},
		//  获取划款数据
		getHKdataList(page) {
			this.loading = true;
			let data = {
				...page,
				createtimeFrom: page.time[0],
				createtimeTo: page.time[1],
			};
			this.$delete(data, "time");
			getHKList(data)
				.then(res => {
					this.loading = false;
					this.total = res.data.result.total;
					this.transferMoneyData = res.data.result.list;
					this.transactions = res.data.result.list;
				})
				.catch(error => {
					this.loading = false;
				});
		},
		// 根据批次号搜索划款
		checkHK() {
			this.transferMoneyData = [];
			this.loading = true;
			getCXList({
				pageNum: this.params.pageNum,
				pageSize: this.params.pageSize,
				balanceId: this.form.balanceId,
				createtimeFrom: this.form.time[0],
				createtimeTo: this.form.time[1],
			})
				.then(res => {
					this.loading = false;
					this.total = res.data.result.total;
					this.transferMoneyData = res.data.result.list;
					this.form.balanceId = null;
				})
				.catch(error => {
					this.form.balanceId = null;
					this.loading = false;
				});
		},
		HKhiddenClearForm() {
			// (this.form.time = ["", ""]), (this.form.balanceId = "");
		},
		// 当点击查看时 显示  划款和划款明细 划款和保证金划款页面隐藏
		operateScope(params) {
			this.loading = true;
			// 当点击查看的时候
			if (params.command.label == this.$t('debitTable.view')) {
				// 当点击查看 且 页面是  外卡划款 的时候
				this.transferMoneyCashDeposit = false;
				this.showCrossSectionDetails = true;
				//当点击查看的时候 获取 当前行 个人信息
				this.transferMoneyForm = params.data;
				//获取批次号 后面 要当前行的 批次号 获取 外卡划款 数据
				this.balanceId = params.data.balanceId;
				//
				//当点击查看的时候   获取 外卡划款 和 划款明细的数据
				this.getXQList();
			} else if (params.command.label == this.$t('debitTable.download')) {
				downloadQueryUpload({
					id: params.data.balanceId,
				})
					.then(res => {
						this.loading = false;
						this.$message.success(res.data);
					});
			}
		},
		// tabs click 的分页 点击分页 获取 当前页（划款详情）的数据
		HKXQhandleClick(tab) {
			this.getXQList();
		},
		// 划款详情
		getXQList() {
			// 当查看 的 页面是  外卡划款 的时候
			if (this.activeName_HK === "0") {
				this.getWKHKData();
			} else {
				// 当查看 的 页面是  划款明细 的时候
				this.getHKMXData();
			}
		},
		// 获取 外卡划款 数据
		getWKHKData() {
			getwkhk({
				balanceId: this.balanceId,
				MerNo: this.MerNo,
			}).then(res => {
				this.loading = false;
				this.DebitForCurrentTransaction = res.data.wkgetListz.list;
				this.AbnormalCrossSection = res.data.wkgetListy.list;
				this.serviceCharge = res.data.wkgetLisshou.list;
				this.deductionData = res.data.otherAmountList.list;
			});
		},
		// 获取 划款 明细 数据
		getHKMXData() {
			this.loading = true;
			getCrossSectionDetails({
				id: this.balanceId,
			}).then(res => {
				this.loading = false;
				//  this.HKMX_JYJL=res.data
				this.mountz = res.data.mountz.USD; //正常  标签金额
				this.bailz = res.data.bailz.USD; //正常  保证金合计
				this.ratez = res.data.ratez.USD; //正常  手续费合计
				this.tradeFee = res.data.tradeFee.USD; //正常  交易处理费合计
				this.mounty = res.data.mounty.USD; //异常  操作金额合计
				this.baily = res.data.baily.USD; //异常  保证金合计
				this.ratey = res.data.ratey.USD; //异常  拒付处理费合计
				this.protestfeey = res.data.protestfeey; //异常 手续费合计
				this.resultlistz = res.data.resultlistz.list;
				this.resultListy = res.data.resultListy.list;
			});
		},
		// 勾选table
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		// 当点击查看时 显示  保证金划款和保证金划款明细  划款和保证金划款页面隐藏
		operateScope_a(params) {
			if (params.command.label == this.$t('debitTable.view') ) {
				this.transferMoneyCashDeposit = false;
				this.showEarnestMoneyDetails = true;
			} else if (params.command.label == this.$t('debitTable.download') ) {
			}
		},
		// 当点击返回 时 划款和保证金划款页面 显示 划款和划款明细 隐藏
		hiddenCrossSectionDetails() {
			this.transferMoneyCashDeposit = true;
			this.showCrossSectionDetails = false;
		},
		// 当点击返回 时 划款和保证金划款页面 显示 保证金划款和保证金划款明细 隐藏
		hiddenEarnestMoneyDetails() {
			this.transferMoneyCashDeposit = true;
			this.showEarnestMoneyDetails = false;
		},
	},
};
</script>

<style scoped lang="less">
.margin_icon_l_r {
	margin: 10px;
}

.pointer {
	cursor: pointer;
}

.right {
	text-align: right;
}

.padding_10 {
	padding: 10px;
	box-sizing: border-box;
}

.flex_l_r_b {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
}

.flex {
	display: flex;
}

.margin_B20 {
	margin-bottom: 20px;
}

.margin-r20 {
	margin-right: 20px;
}

.padding_t20_b30 {
	padding: 20px 0 30px 0;
	box-sizing: border-box;
}

.font_color {
	color: #8094ae;
}

.border-b {
	border-bottom: 1px solid #8094ae;
}

@import "../../assets/styles/template";
</style>
<style scoped lang="less">
@import "../../assets/styles/detailsList";

.go-back-btn {
	border: none;
	width: auto;
	display: block;
}
.app-containers {
	margin-top: 32px;
	width: 100%;
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
	padding-left: 21px;
	padding-right: 21px;
	box-sizing: border-box;
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
::v-deep .el-dialog__header {
	border-bottom: none;
}
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
	width: 100%;
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
	height: 58px;
	//padding: 12px 0;
	margin-top: 12px;
	cursor: pointer;
	box-sizing: border-box;
	border-bottom: 1px solid #F4F5F9;
}

.transaction-item:hover {
	background: #F6F8FE;
}

.transaction-left {
	display: flex;
	align-items: flex-start;
}

.icon {
	width: 48px;
	height: 48px;
	margin-right: 10px;
}

.transaction-info {
	display: flex;
	flex-direction: column;
	align-items: start;
}

.transaction-type {
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 16px;
	color: #364A63;
	line-height: 18px;
	text-align: left;
	font-style: normal;
	margin-top: 3px;
}

.transaction-date {
	margin-top:8px;
	font-family: PingFangSC, PingFang SC;
	font-weight: 400;
	font-size: 14px;
	color: #8094AE;
	line-height: 16px;
	text-align: right;
	font-style: normal;

}

.transaction-right {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.transaction-amount {
	font-family: Roboto, Roboto;
	font-weight: bold;
	font-size: 16px;
	color: #364A63;
	line-height: 18px;
	text-align: left;
	font-style: normal;
	padding-top: 3px;

}

.transaction-status {
	font-family: PingFangSC, PingFang SC;
	font-weight: 400;
	font-size: 14px;
	color: #8094AE;
	line-height: 16px;
	text-align: right;
	font-style: normal;

	margin-top: 8px;
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
.custom-border-table,
.custom-border-table .el-table__header-wrapper,
.custom-border-table .el-table__body-wrapper,
.custom-border-table .el-table__footer-wrapper {
	margin-top: 20px;
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
<style scoped>
.custom-empty ::v-deep .el-empty__image {
	display: none;
}
</style>