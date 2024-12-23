<template>
	<div class="app-containers">
		<div>
			<div class="page-title mb28">{{$t("orderChange.transactionChange")}}</div>
			<div style="display: flex;flex-direction: row;width:  100%">

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
						v-show="activeTab !== 0"
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
			<div style="width:  100%;margin-top: 20px;">
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
				<template v-else-if="activeTab === 1">
					<search-form
						ref="order-search-form"
						v-show="showScreen"
						:key="activeTab"
						:option="searchOption1"
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
						ref="changeTable"
						:data="changeTableList"
						tooltip-effect="dark"
						style="width: 100%"
						v-loading="loading"
						@selection-change="handleSelectionChange"
					>
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column v-if="merType === 0" prop="tradeNo" min-width="140" :label="$t('orderChange.merchantID')">
							<template slot-scope="scope">
								{{ scope.row.subMerNo == 0 ? scope.row.merNo : scope.row.subMerNo }}
							</template>
						</el-table-column>
						<!--					<el-table-column prop="subMerNo"  :label="$t('sysText.subMerchantAccount')"></el-table-column>-->

						<el-table-column prop="tradeNo" min-width="170" :label="$t('orderChange.transactionSerialNumber')"></el-table-column>
						<el-table-column prop="merOrderno" min-width="150" :label="$t('orderChange.orderNumber')"></el-table-column>
						<el-table-column prop="cardname" min-width="" :label="$t('orderChange.paymentMethod')"></el-table-column>
						<el-table-column prop="sourceamount" :label="$t('orderChange.orderAmount')">
							<template slot-scope="scope">
								{{ scope.row.sourceCurrency + " " + scope.row.sourceamount }}
							</template>
						</el-table-column>
						<el-table-column prop="fee" :label="$t('orderChange.fee')"></el-table-column>
						<!--					<el-table-column prop="cardNumEnd" label="卡号尾数"></el-table-column>-->
						<el-table-column prop="website" min-width="150px" :label="$t('orderChange.transactionWebsite')"></el-table-column>
						<el-table-column min-width="" :label="$t('orderChange.currentStatus')">
							<template slot-scope="scope">
								{{ scope.row.orderStatus | reasonFilter($store.state.order.orderState) }}
							</template>
						</el-table-column>
						<el-table-column min-width="160px" :label="$t('orderChange.transactionTime')">
							<template slot-scope="scope">
								{{ dayjs(scope.row.tradeDateTime).format("YYYY-MM-DD HH:mm:ss") }}
							</template>
						</el-table-column>
						<el-table-column :label="$t('orderChange.action')" fixed="right">
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
				<div class="custom-border-table" v-else-if="activeTab === 1">
					<el-table
						:data="changeTableList1"
						tooltip-effect="dark"
						style="width: 100%"
						v-loading="loading"
						@selection-change="handleSelectionChange"
					>
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column v-if="merType === 0" prop="tradeNo" min-width="140" :label="$t('orderChange.merchantID')">
							<template slot-scope="scope">
								{{ scope.row.subMerNo == 0 ? scope.row.merNo : scope.row.subMerNo }}
							</template>
						</el-table-column>
						<!--					<el-table-column prop="subMerNo"  :label="$t('sysText.subMerchantAccount')"></el-table-column>-->

						<el-table-column prop="tradeNo" min-width="170px" :label="$t('orderChange.transactionSerialNumber')"></el-table-column>
						<el-table-column prop="merOrderNo" min-width="150px" :label="$t('orderChange.orderNumber')"></el-table-column>
						<el-table-column prop="sourceAmount" min-width="" :label="$t('orderChange.totalAmount')"></el-table-column>
						<el-table-column prop="refundAmount" min-width="" :label="$t('orderChange.refundAmount')"></el-table-column>
						<el-table-column :label="$t('orderChange.refundReason')" prop="refundRemark">
							<template slot-scope="scope">
								{{ scope.row.refundRemark | jfReasonFilter($store.state.order.tkReason) }}
							</template>
						</el-table-column>
						<el-table-column prop="status" :label="$t('orderChange.refundStatus')"></el-table-column>
						<el-table-column prop="applyUser" :label="$t('orderChange.applicant')"></el-table-column>
						<el-table-column prop="tradeDateTime" min-width="170px" :label="$t('orderChange.transactionTime')"></el-table-column>
						<el-table-column prop="refundTime" min-width="170px" :label="$t('orderChange.refundTime')"></el-table-column>
						<el-table-column :label="$t('orderChange.view')" fixed="right">
							<template slot-scope="scope">
								<div class="icon-hover-effect" @click="showTkDetails(scope.row)">
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
				<div class="custom-border-table" v-else>
					<el-table
						:data="changeTableList2"
						tooltip-effect="dark"
						style="width: 100%"
						v-loading="loading"
						@selection-change="handleSelectionChange"
					>
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column v-if="merType === 0" prop="tradeNo" min-width="140" :label="$t('orderChange.merchantID')">
							<template slot-scope="scope">
								{{ scope.row.subMerNo == 0 ? scope.row.merNo : scope.row.subMerNo }}
							</template>
						</el-table-column>
						<!--					<el-table-column prop="subMerNo"  :label="$t('sysText.subMerchantAccount')"></el-table-column>-->

						<el-table-column prop="tradeNo" min-width="170px" :label="$t('orderChange.transactionSerialNumber')"></el-table-column>
						<el-table-column prop="merOrderNo" min-width="160px" :label="$t('orderChange.orderNumber')"></el-table-column>
						<el-table-column prop="sourceAmount" min-width="" :label="$t('orderChange.transactionAmount')"></el-table-column>
						<el-table-column prop="protestAmount" min-width="" :label="$t('orderChange.chargebackAmount')"></el-table-column>
						<el-table-column prop="settleRateAmount" :label="$t('orderChange.settlementAmount')"></el-table-column>
						<el-table-column prop="refundRemark" min-width="150px" :label="$t('orderChange.chargebackReason')"></el-table-column>
						<el-table-column prop="refundCode" min-width="150px" :label="$t('orderChange.chargebackReasonCode')"></el-table-column>
						<el-table-column prop="status" :label="$t('orderChange.chargebackStatus')"></el-table-column>
						<el-table-column prop="bankTime" min-width="200" :label="$t('orderChange.chargebackFeedbackDate')"></el-table-column>
						<el-table-column prop="bankNo" min-width="200" :label="$t('orderChange.cardOrganizationARNCode')"></el-table-column>
						<el-table-column prop="refundTime" min-width="180px" :label="$t('orderChange.chargebackTime')"></el-table-column>
						<el-table-column prop="tradeDateTime" min-width="180px" :label="$t('orderChange.transactionTime')"></el-table-column>
						<el-table-column :label="$t('orderChange.userds')" fixed="right">
							<template slot-scope="scope">
								<circular-dropdown :list="jftionList" :row="scope.row" @command="jftionScope"></circular-dropdown>
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
				<div v-if="activeTab === 0">

					<div class="transaction-list" v-if="changeTableList.length != 0">

						<div-dropdown v-for="transaction in changeTableList" :key="transaction.id" @click="viewDetail(transaction)"
													:list="operationList" :row="transaction" @command="operateScope" #dropdown-button
						>
							<div class="transaction-item">
								<div class="transaction-left">
									<img :src="getIcon(transaction.type)" alt="icon" class="icon" />
									<div class="transaction-info">
										<div class="transaction-type">{{ transaction.cardname }}</div>
										<div class="transaction-date">{{ dayjs(transaction.tradeDateTime).format("YYYY-MM-DD HH:mm:ss") }}</div>
									</div>
								</div>
								<div class="transaction-right">
									<div class="transaction-amount">{{ transaction.sourceamount }} {{ transaction.sourceCurrency }}</div>
									<div class="transaction-status" :class="getStatusClass(transaction)">{{ getStatusName(transaction)}}</div>
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
				<div v-else-if="activeTab === 1">

					<div class="transaction-list" v-if="changeTableList1.length != 0">

						<div-dropdown v-for="transaction in changeTableList1" :key="transaction.id" @click="viewDetail(transaction)"
													:list="operationList2" :row="transaction" @command="showTkDetails(transaction)" #dropdown-button
						>
							<div class="transaction-item">
								<div class="transaction-left">
									<img :src="getIcon(transaction.type)" alt="icon" class="icon" />
									<div class="transaction-info">
										<div class="transaction-type">{{ transaction.refundRemark | jfReasonFilter($store.state.order.tkReason) }}</div>
										<div class="transaction-date">{{ dayjs(transaction.tradeDateTime).format("YYYY-MM-DD HH:mm:ss") }}</div>
									</div>
								</div>
								<div class="transaction-right">
									<div class="transaction-amount">{{ transaction.refundAmount }}</div>
									<div class="transaction-status">{{ transaction.status }}</div>
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
				<div v-else>

					<div class="transaction-list" v-if="changeTableList2.length != 0">

						<div-dropdown v-for="transaction in changeTableList2" :key="transaction.id" @click="viewDetail(transaction)"
													:list="jftionList" :row="transaction" @command="jftionScope" #dropdown-button
						>
							<div class="transaction-item">
								<div class="transaction-left">
									<img :src="getIcon(transaction.type)" alt="icon" class="icon" />
									<div class="transaction-info">
										<div class="transaction-type">{{ transaction.refundRemark }}</div>
										<div class="transaction-date">{{ dayjs(transaction.tradeDateTime).format("YYYY-MM-DD HH:mm:ss") }}</div>
									</div>
								</div>
								<div class="transaction-right">
									<div class="transaction-amount">{{ transaction.protestAmount }} {{ transaction.sourceCurrency }}</div>
									<div class="transaction-status">{{ transaction.status }}</div>
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

		</div>

<!--
		<el-tabs ref="tabs" v-model="activeName">
			&lt;!&ndash; 订单列表tab-content &ndash;&gt;
			<el-tab-pane name="0">
				<span slot="label"><svg-icon icon-class="bg" /> {{$t("orderChange.orderList")}}</span>
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
					&lt;!&ndash; <div>
						<span class="download-btn icon ni cp"><a @click="BatchRefund()">批量退款</a></span>
					</div> &ndash;&gt;
				</div>
				&lt;!&ndash; 订单列表搜索组件 &ndash;&gt;
				<template v-if="activeName == 0">
					<search-form
						ref="order-search-form"
						v-show="showScreen"
						:option="searchOption"
						:formSearch="form"
						@getSearchForm="getSearchForm($event, 1)"
					></search-form>
				</template>
				<el-table
					ref="changeTable"
					:data="changeTableList"
					tooltip-effect="dark"
					style="width: 100%"
					v-loading="loading"
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column v-if="merType === 0" prop="tradeNo" min-width="140" :label="$t('orderChange.merchantID')">
						<template slot-scope="scope">
							{{ scope.row.subMerNo == 0 ? scope.row.merNo : scope.row.subMerNo }}
						</template>
					</el-table-column>
&lt;!&ndash;					<el-table-column prop="subMerNo"  :label="$t('sysText.subMerchantAccount')"></el-table-column>&ndash;&gt;

					<el-table-column prop="tradeNo" min-width="170" :label="$t('orderChange.transactionSerialNumber')"></el-table-column>
					<el-table-column prop="merOrderno" min-width="150" :label="$t('orderChange.orderNumber')"></el-table-column>
					<el-table-column prop="cardname" min-width="" :label="$t('orderChange.paymentMethod')"></el-table-column>
					<el-table-column prop="sourceamount" :label="$t('orderChange.orderAmount')">
						<template slot-scope="scope">
							{{ scope.row.sourceCurrency + " " + scope.row.sourceamount }}
						</template>
					</el-table-column>
					<el-table-column prop="fee" :label="$t('orderChange.fee')"></el-table-column>
&lt;!&ndash;					<el-table-column prop="cardNumEnd" label="卡号尾数"></el-table-column>&ndash;&gt;
					<el-table-column prop="website" min-width="150px" :label="$t('orderChange.transactionWebsite')"></el-table-column>
					<el-table-column min-width="" :label="$t('orderChange.currentStatus')">
						<template slot-scope="scope">
							{{ scope.row.orderStatus | reasonFilter($store.state.order.orderState) }}
						</template>
					</el-table-column>
					<el-table-column min-width="160px" :label="$t('orderChange.transactionTime')">
						<template slot-scope="scope">
							{{ dayjs(scope.row.tradeDateTime).format("YYYY-MM-DD HH:mm:ss") }}
						</template>
					</el-table-column>
					<el-table-column :label="$t('orderChange.action')" fixed="right">
						<template slot-scope="scope">
							<circular-dropdown :list="operationList" :row="scope.row" @command="operateScope"></circular-dropdown>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>

			&lt;!&ndash; 退款 tab-content &ndash;&gt;
			<el-tab-pane name="1">
				<span slot="label"><svg-icon icon-class="tk" />{{$t('orderChange.refund')}}</span>
				<div class="Flex spaceB alignC card-tools-toggle">
					<div class="Flex alignC">
						<page-size-select
							class="mr12"
							:limit.sync="form.pageSize"
							@changeSize="$refs['order-search-form'].getList(1)"
						></page-size-select>
						<div class="icon-hover-effect mr12" @click="showScreen = !showScreen">
							<svg-icon icon-class="select" />
						</div>
					</div>
					<div>
						<span class="download-btn cp" @click="tkDownload">
							<svg-icon icon-class="download" />
						</span>
					</div>
				</div>
				&lt;!&ndash; 退款搜索组件 &ndash;&gt;
				<template v-if="activeName == 1">
					<search-form
						ref="order-search-form"
						v-show="showScreen"
						:option="searchOption1"
						:formSearch="form"
						@getSearchForm="getSearchForm($event, 1)"
					></search-form>
				</template>
				<el-table
					:data="changeTableList1"
					tooltip-effect="dark"
					style="width: 100%"
					v-loading="loading"
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column v-if="merType === 0" prop="tradeNo" min-width="140" :label="$t('orderChange.merchantID')">
						<template slot-scope="scope">
							{{ scope.row.subMerNo == 0 ? scope.row.merNo : scope.row.subMerNo }}
						</template>
					</el-table-column>
&lt;!&ndash;					<el-table-column prop="subMerNo"  :label="$t('sysText.subMerchantAccount')"></el-table-column>&ndash;&gt;

					<el-table-column prop="tradeNo" min-width="170px" :label="$t('orderChange.transactionSerialNumber')"></el-table-column>
					<el-table-column prop="merOrderNo" min-width="150px" :label="$t('orderChange.orderNumber')"></el-table-column>
					<el-table-column prop="sourceAmount" min-width="" :label="$t('orderChange.totalAmount')"></el-table-column>
					<el-table-column prop="refundAmount" min-width="" :label="$t('orderChange.refundAmount')"></el-table-column>
					<el-table-column :label="$t('orderChange.refundReason')" prop="refundRemark">
						<template slot-scope="scope">
							{{ scope.row.refundRemark | jfReasonFilter($store.state.order.tkReason) }}
						</template>
					</el-table-column>
					<el-table-column prop="status" :label="$t('orderChange.refundStatus')"></el-table-column>
					<el-table-column prop="applyUser" :label="$t('orderChange.applicant')"></el-table-column>
					<el-table-column prop="tradeDateTime" min-width="170px" :label="$t('orderChange.transactionTime')"></el-table-column>
					<el-table-column prop="refundTime" min-width="170px" :label="$t('orderChange.refundTime')"></el-table-column>
					<el-table-column :label="$t('orderChange.view')" fixed="right">
						<template slot-scope="scope">
							<div class="icon-hover-effect" @click="showTkDetails(scope.row)">
								<svg-icon icon-class="eye" />
							</div>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>

			&lt;!&ndash; 拒付 tab-content &ndash;&gt;
			<el-tab-pane name="2">
				<span slot="label"><svg-icon icon-class="jf" />{{$t('orderChange.chargeback')}}</span>
				<div class="Flex spaceB alignC card-tools-toggle">
					<div class="Flex alignC">
						<page-size-select
							class="mr12"
							:limit.sync="form.pageSize"
							@changeSize="$refs['order-search-form'].getList(1)"
						>
						</page-size-select>
						<div class="icon-hover-effect mr12" @click="showScreen = !showScreen">
							<svg-icon icon-class="select" />
						</div>
					</div>
					<div class="Flex alignC" @click="JUXZ">
						<span class="download-btn cp mr12">
							<svg-icon icon-class="download" />
						</span>
					</div>
				</div>
				&lt;!&ndash; 拒付搜索组件 &ndash;&gt;
				<template v-if="activeName == 2">
					<search-form
						ref="order-search-form"
						v-show="showScreen"
						:option="searchOption2"
						:formSearch="form"
						@getSearchForm="getSearchForm($event, 1)"
					></search-form>
				</template>
				<el-table
					:data="changeTableList2"
					tooltip-effect="dark"
					style="width: 100%"
					v-loading="loading"
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column v-if="merType === 0" prop="tradeNo" min-width="140" :label="$t('orderChange.merchantID')">
						<template slot-scope="scope">
							{{ scope.row.subMerNo == 0 ? scope.row.merNo : scope.row.subMerNo }}
						</template>
					</el-table-column>
&lt;!&ndash;					<el-table-column prop="subMerNo"  :label="$t('sysText.subMerchantAccount')"></el-table-column>&ndash;&gt;

					<el-table-column prop="tradeNo" min-width="170px" :label="$t('orderChange.transactionSerialNumber')"></el-table-column>
					<el-table-column prop="merOrderNo" min-width="160px" :label="$t('orderChange.orderNumber')"></el-table-column>
					<el-table-column prop="sourceAmount" min-width="" :label="$t('orderChange.transactionAmount')"></el-table-column>
					<el-table-column prop="protestAmount" min-width="" :label="$t('orderChange.chargebackAmount')"></el-table-column>
					<el-table-column prop="settleRateAmount" :label="$t('orderChange.settlementAmount')"></el-table-column>
					<el-table-column prop="refundRemark" min-width="150px" :label="$t('orderChange.chargebackReason')"></el-table-column>
					<el-table-column prop="refundCode" min-width="150px" :label="$t('orderChange.chargebackReasonCode')"></el-table-column>
					<el-table-column prop="status" :label="$t('orderChange.chargebackStatus')"></el-table-column>
					<el-table-column prop="bankTime" min-width="200" :label="$t('orderChange.chargebackFeedbackDate')"></el-table-column>
					<el-table-column prop="bankNo" min-width="200" :label="$t('orderChange.cardOrganizationARNCode')"></el-table-column>
					<el-table-column prop="refundTime" min-width="180px" :label="$t('orderChange.chargebackTime')"></el-table-column>
					<el-table-column prop="tradeDateTime" min-width="180px" :label="$t('orderChange.transactionTime')"></el-table-column>
					<el-table-column :label="$t('orderChange.userds')" fixed="right">
						<template slot-scope="scope">
							<circular-dropdown :list="jftionList" :row="scope.row" @command="jftionScope"></circular-dropdown>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>

			<pagination
				:total="total"
				:page.sync="form.pageNum"
				:limit.sync="form.pageSize"
				@pagination="$refs['order-search-form'].getList()"
			></pagination>
		</el-tabs>-->
		<!-- 退款订单详细信息对话框 -->
		<el-dialog :title="$t('orderChange.refundOrderDetails')" :visible.sync="tkDialogVisible" width="500px">
			<el-form ref="form" :model="tkForm" label-width="120px">
				<el-form-item :label="$t('orderChange.refundOrderDetails')">
					<span>{{ tkForm.tradeNo || "-" }}</span>
				</el-form-item>
				<el-form-item :label="$t('orderChange.refundAmount')">
					<span>{{ tkForm.sourceAmount || "-" }}</span>
				</el-form-item>
				<el-form-item :label="$t('orderChange.refundReason')">
					{{tkForm.refundRemark | jfReasonFilter($store.state.order.tkReason)}}
				</el-form-item>
				<el-form-item :label="$t('orderChange.refundStatus')">
					{{tkForm.status}}
				</el-form-item>
				<el-form-item :label="$t('orderChange.totalAmount')">
					<span>{{ tkForm.sourceAmount || "-" }}</span>
				</el-form-item>
				<el-form-item :label="$t('orderChange.applicant')">
					<span>{{ tkForm.applyUser || "-" }}</span>
				</el-form-item>
				<el-form-item :label="$t('orderChange.applicationTime')">
					<span>{{ dayjs(tkForm.applyTime).format("YYYY-MM-DD HH:mm:ss") }}</span>
				</el-form-item>
				<el-form-item :label="$t('orderChange.remark')">
					<span>{{ tkForm.refundRemark || "-" }}</span>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog v-dialogDrag :title="$t('orderChange.refundApplication')" :visible.sync="tksqDialogVisible" width="500px">
			<el-form ref="tksqForm" :model="tksqForm" :rules="rule" label-width="120px">
				<el-form-item :label="$t('orderChange.orderSerialNumber')">
					<span>{{ tksqForm.tradeNo }}</span>
				</el-form-item>
				<el-form-item :label="$t('orderChange.totalAmount')" prop="settleAmount">
					<span>{{ tksqForm.sourceCurrency }}&nbsp;{{ tksqForm.sourceAmount }}</span>
				</el-form-item>
				<el-form-item :label="$t('orderChange.refundableAmount')">
					<span>{{ tksqForm.sourceCurrency }}&nbsp;{{ tksqForm.canAmount }}</span>
				</el-form-item>
				<el-form-item :label="$t('orderChange.refundedAmount')">
					<span>{{ tksqForm.sourceCurrency }}&nbsp;{{ tksqForm.refundmentAmount }}</span>
				</el-form-item>
				<el-form-item :label="$t('orderChange.refundAmount')" prop="amount">
					<el-input v-model="tksqForm.amount"></el-input>
				</el-form-item>
				<el-form-item :label="$t('orderChange.refundReason')" prop="refundstate">
					<el-select
						:placeholder="$t('orderChange.pleaseSelect')"
						class="select-bottom"
						:popper-append-to-body="false"
						v-model="tksqForm.refundstate"
					>
						<el-option :label="$t('orderChange.pleaseSelect')" value="0"></el-option>
						<el-option :label="$t('orderChange.outOfStock')" value="1"></el-option>
						<el-option :label="$t('orderChange.qualityIssueSizeIssueNegotiatedRefund')" value="2"></el-option>
						<el-option :label="$t('orderChange.goodsReturned')" value="3"></el-option>
						<el-option :label="$t('orderChange.customerCancelledOrder')" value="4"></el-option>
						<el-option :label="$t('orderChange.discount')" value="5"></el-option>
						<el-option :label="$t('orderChange.duplicatePayment')" value="6"></el-option>
						<el-option :label="$t('orderChange.suspiciousOrder')" value="7"></el-option>
						<el-option :label="$t('orderChange.other')" value="8"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('orderChange.remark')">
					<el-input type="textarea" v-model="tksqForm.remark" maxlength="50"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="tksqDialogVisible = false">{{$t('orderChange.cancel')}}</el-button>
				<el-button type="primary" @click="committed('tksqForm')" :disabled="committedFlag">{{$t('orderChange.confirmSubmit')}}</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import pagination from "@/components/Pagination";
import CircularDropdown from "@/components/CircularDropdown/index";
import PageSizeSelect from "@/components/PageSizeSelect/index";
import { getjyListCx, getTkListCx, getJfListCx, Refundapplication, submitRefundDetail } from "@/api/business";
import HiddenTab from "@/utils/HiddenTab";
import { downloadProtest, downloadRefund } from "@/api/download";
import { mapGetters } from "vuex";
import SearchForm from "@/components/SearchForm";
import i18n from "@/i18n";
import DivDropdown from "@/components/DivDropdown/index.vue";

var SJ = [
	{ label: i18n.t('orderChange.refundTime'), value: "1" },
	{ label: i18n.t('orderChange.transactionTime'), value: "0" },
];
var SFSCZJ = [
	{ label: i18n.t('orderChange.alls'), value: "" },
	{ label: i18n.t('orderChange.uploaded'), value: "1" },
	{ label: i18n.t('orderChange.notUploaded'), value: "0" },
];
var JFZT = [
	{ label: i18n.t('orderChange.alls'), value: "" },
	{ label: i18n.t('orderChange.chargeback'), value: "11" },
	{ label: i18n.t('orderChange.chargebackProcessing'), value: "12" },
	{ label: i18n.t('orderChange.chargebackAfterRefund'), value: "17" },
];
var JFSJ = [
	{ label: i18n.t('orderChange.chargebackTime'), value: "1" },
	{ label: i18n.t('orderChange.transactionTime'), value: "0" },
];
export default {
	name: "order-change",

	components: {
		DivDropdown,
		CircularDropdown,
		pagination,
		PageSizeSelect,
		SearchForm,
	},

	mixins: [HiddenTab],

	data() {
		var checktkamount = (rule, value, callback) => {
			if (!value) {
				return callback(new Error(this.$t('orderChange.refundAmountCannotBeEmpty')));
			} else if (value > this.tksqForm.can_op_amount) {
				return callback(new Error(this.$t('orderChange.refundAmountCannotExceedRefundableAmount')));
			} else if (value <= 0) {
				return callback(new Error(this.$t('orderChange.refundAmountMustBeGreaterThanZero')));
			} else {
				return callback();
			}
		};

		return {
			activeName: "0", // tabs active

			componentKey: 0,
			activeTab: 0,
			hoveredTab: null,
			activeButton: null,
			dialogVisible:false,
			tabs: [ i18n.t('orderChange.orderList'), i18n.t('orderChange.refund'),i18n.t('orderChange.chargeback'),],

			rule: {
				amount: [{ required: true, validator: checktkamount, trigger: "blur" }],
				refundstate: [{ required: true, message: this.$t('orderChange.pleaseSelectRefundReason'), trigger: "change" }],
			},

			applicationConditions: [
				{ label: this.$t('orderChange.transactionCancellationRequest'), value: 8 },
				{ label: this.$t('orderChange.applyForRefund'), value: 10 },
				{ label: this.$t('orderChange.chargebackApplication'), value: 12 },
				{ label: this.$t('orderChange.freezeApplication'), value: 14 },
				{ label: this.$t('orderChange.review'), value: 22 },
			], // 批量操作list (多复核条件)
			operationList: [
				{ label: this.$t('orderChange.view'), icon: "ck", value: 10 },
				{ label: this.$t('orderChange.refund'), icon: "tk", value: 12 },
			], // table 操作list
			operationList2: [
				{ label: this.$t('orderChange.view'), icon: "ck", value: 10 },
			], // table 操作list
			jftionList: [
				{ label: this.$t('orderChange.view'), icon: "ck", value: 10 },
				// { label: "上传", icon: "bg", value: 12 },
			], //拒付table 操作list
			tkstatus: undefined, // 退款状态
			form: {
				pageNum: 1,
				pageSize: 15,
			},
			formProps: {}, //保存搜索组件传过来的值
			changeTableList: [],
			changeTableList1: [],
			changeTableList2: [],
			showScreen: false,
			total: 0, // 总条数
			loading: false, // 更变交易loading
			multipleSelection: [], // table 勾选列表
			tkDialogVisible: false, // 退款详情弹窗
			tksqDialogVisible: false, //退款申请弹窗
			tkForm: {}, // 退款详情表单
			activeNames: "1", // 退款弹窗中折叠面板
			jfDialogVisible: false, // 拒付录入弹窗
			jfForm: {}, // 拒付录入表单
			tksqForm: {
				can_op_amount: "",
				sourceamount: "",
				merno: undefined,
				tradeno: undefined,
				amount: undefined,
				orderstatus: undefined,
				refundstate: undefined,
				remark: undefined,
			}, //退款申请表达单
			tksqmerno: undefined,
			tksqorderstatus: undefined,
			tksqtradeno: undefined,
			tksqcanopamount: undefined,
			tksqsourceCurrency: undefined,
			//订单列表搜索
			searchOption: {
				column: [
					{
						label: this.$t('orderChange.merchantID'),
						prop: "merNo",
						type: "select",
						dicData:this.$store.state.order.userMerNo , //数据传输
						Vshow: this.$store.state.user.merType === 0,
					},
					{
						label: this.$t('orderChange.serialOrderNumber'),
						prop: "tradeNos",
						type: "input",
						btn: true,
					},
					{
						label: this.$t('orderChange.transactionTime'),
						prop: "time",
						type: "datetimerange",
					},
				],
			},
			//退款表搜索
			searchOption1: {
				column: [
					{
						label: this.$t('orderChange.merchantID'),
						prop: "merNo",
						type: "select",
						dicData:this.$store.state.order.userMerNo , //数据传输
						Vshow: this.$store.state.user.merType === 0,
					},
					{
						label: this.$t('orderChange.transactionSerialNumber'),
						prop: "tradeno",
						type: "input",
						btn: true,
					},
					{
						label:  this.$t('orderChange.orderNumber'),
						prop: "merorderno",
						type: "input",
						btn: true,
					},
					{
						label: this.$t('orderChange.refundStatus'),
						prop: "status",
						type: "select",
						dicData: () => this.$store.state.order.tkState,
					},
					{
						label: this.$t('orderChange.time'),
						prop: "timeType",
						type: "select",
						dicData: SJ,
						width: 130,
						default: 0, //select默认值，写的下标
					},
					{
						label: "",
						prop: "time",
						type: "datetimerange",
					},
				],
			},
			//拒付表搜索
			searchOption2: {
				column: [
					{
						label: this.$t('orderChange.merchantID'),
						prop: "merNo",
						type: "select",
						dicData:this.$store.state.order.userMerNo , //数据传输
						Vshow: this.$store.state.user.merType === 0,
					},
					{
						label: this.$t('orderChange.transactionSerialNumber'),
						prop: "tradeNo",
						type: "input",
						btn: true,
					},
					{
						label: this.$t('orderChange.orderNumber'),
						prop: "merOrderNo",
						type: "input",
						btn: true,
					},
					// {
					// 	label: "是否上传资料",
					// 	prop: "isuploaddata",
					// 	type: "select",
					// 	dicData: SFSCZJ,
					// },
					{
						label: this.$t('orderChange.chargebackStatus'),
						prop: "status",
						type: "select",
						dicData: JFZT,
					},
					{
						label: this.$t('orderChange.time'),
						prop: "timeType",
						type: "select",
						dicData: JFSJ,
						width: 160,
						default: 0, //select默认值，写的下标
					},
					{
						label: "",
						prop: "time",
						type: "datetimerange",
					},
				],
			},
			committedFlag: false,
		};
	},

	filters: {
		jfReasonFilter: function(val, jfReason) {
			let str = "";
			jfReason.map(item => {
				if (item.value === val) str = item.label;
			});
			return str;
		},
	},
	computed: {
		...mapGetters(["merType","newView"]),

	},
	created() {
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
			if (this.activeTab === 0) {
			} else if (this.activeTab === 1) {
				this.tkDownload();
			} else if (this.activeTab === 2) {
				this.JUXZ();
			}
		},
		handleToggleView() {
			this.activeTab=0;
			this.$store.commit('SET_NEWVIEW', this.newView === 0 ? 1 : 0);
			this.componentKey += 1;

		},
		getIcon(type) {
			if (this.activeTab === 0){
				return '/icon/dingdanbiangen.png';
			}else if (this.activeTab === 1){
				return '/icon/tuikuan.png';
			}else{
				return '/icon/jufu.png';
			}
			// 根据交易类型返回相应的图标路径
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
				if(transaction.orderStatus === '5'){
					return 'status-success';
				}else if(transaction.orderStatus === '6'){
					return 'status-fail';
				}else if(transaction.orderStatus === '1'){
					return 'status-processing';
				}else{
					return 'status-success';
				}

		},
		getStatusName(transaction) {
				const orderStates =  this.$store.state.order.orderState
				for (let i = 0; i <orderStates.length ; i++) {
					if(orderStates[i].value === transaction.orderStatus){
						return orderStates[i].label;
					}
				}

		},
		// 退款下载
		tkDownload() {
			const Xz = {
				fromdate: this.formProps.time[0],
				todate: this.formProps.time[1],
				tradeno: this.formProps.tradeno,
				merorderno: this.formProps.merorderno,
				status: this.formProps.status,
				timeType: this.formProps.timeType,
			};
			downloadRefund(Xz)
				.then(result => {
					this.$message(result.data);
				});
		},
		// 拒付下载
		JUXZ() {
			let Xz = {
				tradeNo: this.formProps.tradeNo,
				merOrderNo: this.formProps.merOrderNo,
				subMerNo: this.formProps.subMerNo,
				status: this.formProps.status,
				timeType: this.formProps.timeType,
				from: this.formProps.time[0],
				to: this.formProps.time[1],
			};
			downloadProtest(Xz)
				.then(result => {
					this.$message(result.data);
				});
		},
		// 打开退款订单详细信息弹窗
		showTkDetails(params) {
			this.tkForm = params;
			this.tkDialogVisible = true;
		},

		// 分页请求
		getSearchForm(params) {
			this.formProps = params; //存储点击搜索按钮后的值
			if (this.activeTab ===0) {
				// 订单列表
				this.getDdList(params);
			} else if (this.activeTab === 1) {
				// 退款
				this.getTkList(params);
			} else if (this.activeTab === 2) {
				// 拒付
				this.getJfList(params);
			}
		},

		// 订单列表
		getDdList(page) {
			const data = {
				...page,
				from: page.time[0],
				to: page.time[1],
			};
			this.$delete(data, "time");
			this.loading = true;
			getjyListCx(data)
				.then(result => {
					this.loading = false;
					this.changeTableList = result.data.resultList.list;
					this.total = result.data.resultList.total;
				})
				.catch(error => {
					this.loading = false;
				});
		},

		// 退款列表
		getTkList(page) {
			this.loading = true;
			const data = {
				...page,
				fromdate: page.time[0],
				todate: page.time[1],
			};
			this.$delete(data, "time");
			getTkListCx(data)
				.then(result => {
					this.changeTableList1 = result.data.resultList.list;
					this.total = result.data.resultList.total;
					this.loading = false;
				})
				.catch(error => {
					this.loading = false;
				});
		},

		// 拒付列表
		getJfList(page) {
			const data = {
				...page,
				from: page.time[0],
				to: page.time[1],
			};
			this.$delete(data, "time");
			this.loading = true;
			getJfListCx(data)
				.then(result => {
					this.changeTableList2 = result.data.list;
					this.total = result.data.total;
					this.loading = false;
				})
				.catch(error => {
					this.loading = false;
				});
		},
		// table 勾选列表
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		//打开退款申请窗口
		operateScope(params) {
			if (params.command.label === this.$t('orderChange.view')) {
				this.$router.push({ path: "/details/info/" + params.data.tradeNo });
			} else if (params.command.label === this.$t('orderChange.refund')) {
				if (params.data.orderStatus === "10") {
					this.$message.warning(this.$t('orderChange.refundProcessingCannotRequestRefund'));
				} else if (params.data.orderStatus === "11") {
					this.$message.warning(this.$t('orderChange.chargebackOrderCannotRequestRefund'));
				} else if (params.data.orderStatus === "12") {
					this.$message.warning(this.$t('orderChange.chargebackProcessingCannotRequestRefund'));
				} else {
					this.tksqForm.tradeNo = params.data.tradeNo;
					this.tksqForm.orderstatus = params.data.orderStatus;
					this.getsubmitRefundDetail();
				}
			}
		},
		getsubmitRefundDetail() {
			submitRefundDetail({
				tradeNo: this.tksqForm.tradeNo,
			}).then(res => {
				this.tksqForm = res.data;
				this.tksqDialogVisible = true;
			});
		},
		//退款申请提交
		committed(formName) {
			if (formName == "tksqForm" && this.tksqForm.refundstate == 0) {
				this.tksqForm.refundstate = undefined;
				return;
			}
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.committedFlag = true;
					this.$confirm(this.$t('orderChange.areYouSureYouWantToRefund'), this.$t('orderChange.prompt'), {
						confirmButtonText:  this.$t('orderChange.confirm'),
						cancelButtonText:  this.$t('orderChange.cancel'),
						type: "warning",
					})
						.then(() => {
							const data = {
								// merno: this.tksqmerno,
								tradeno: this.tksqForm.tradeNo,
								sourceamount: this.tksqForm.sourceAmount,
								amount: this.tksqForm.amount,
								orderstatus: this.tksqForm.orderStatus,
								refundstate: this.tksqForm.refundstate,
								remark: this.tksqForm.remark,
								canopamount: this.tksqForm.canAmount, //可退金额
								sourceCurrency: this.tksqForm.sourceCurrency,
								merOrderNo: this.tksqForm.merOrderNo,
							};
							Refundapplication(data)
								.then(res => {
									this.$message(res.data);
									this.tksqDialogVisible = false;
									this.$refs["order-search-form"].getList();
									setTimeout(() => {
										this.committedFlag = false;
									}, 1000);
								})
								.catch(err => {
									this.tksqDialogVisible = false;
									this.committedFlag = false;
								});
						})
						.catch(() => {
							this.committedFlag = false;
							this.$message(this.$t('orderChange.operationCancelled'));
						});
				} else {
					return false;
				}
			});
		},
		//拒付操作
		jftionScope(params) {
			if (params.command.label === this.$t('orderChange.view')) {
				this.$router.push({ path: "/details/info/" + params.data.tradeno });
			}
		},
		jftionScope2(params) {
			if (params.command.label === this.$t('orderChange.view')) {
				this.$router.push({ path: "/details/info/" + params.data.tradeno });
			}
		},
		//批量退款
		// BatchRefund() {
		// 	this.$router.push({ path: "/details/changeInfo" });
		// },
	},
};
</script>

<style scoped lang="less">
/deep/ .select-bottom {
	.el-select-dropdown {
		position: absolute !important;
		top: 37px !important;
		left: 0 !important;
	}
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
	width:  100%;
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
	width:  100%;
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