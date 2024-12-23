<template>
	<div class="mobile-order-list">
		<h1 class="page-title">{{ $t('orderList.Transactions') }}</h1>

		<div class="summary-container">
			<div class="summary-scroll">
				<div class="summary-main">
					<div class="flew_row">
						<div class="summary-title">{{ $t('orderList.exchangeRateTotal') }}</div>
						<div class="summary-content">
							(<span v-for="(item, i) in labelArr.baseCodes" :key="i" class="base-code">{{ item }}</span>)
						</div>
					</div>
					<div class="summary-row">
						<div class="summary-label">{{ $t('orderList.searchOrderTotalAmount') }}</div>
						<div class="summary-value">
							<span v-for="(val, key, i) in labelArr.sellteAmountMap" :key="i">{{ key }}:{{ val }}</span>
						</div>
					</div>
					<div class="summary-row">
						<div class="summary-label">{{ $t('orderList.successfulAmountStatistics') }}</div>
						<div class="summary-value">
							<span v-for="(val, key, i) in labelArr.settleTradeAmountMap" :key="i">{{ key }}:{{ val }}</span>
						</div>
					</div>
				</div>
				<div class="currency-total">
					<div class="summary-title">{{ $t('orderList.currencyTotal') }}</div>
					<div class="summary-value">
						<span v-for="(val, key, i) in labelArr.sourceAmountMap" :key="i">{{ key }}:{{ val }}</span>
					</div>
				</div>
			</div>
			<div class="success-count">
				{{ $t('orderList.successfulCount') }}<span>{{ labelArr.sum }}</span>
			</div>
		</div>

		<div class="tabs-and-filter-container">
			<div class="tabs-container">
				<div
						v-for="(tab, index) in tabs"
						:key="index"
						:class="['tab', { active: activeTab === index }]"
						@click="selectTab(index)"
				>
					{{ tab }}
				</div>
			</div>
			<div class="filter-button" @click="openFilter">
				<svg-icon icon-class="filter-icon" class="filter"/>
			</div>
		</div>

		<div class="transaction-list">
			<div v-for="transaction in transactions" :key="transaction.id" class="transaction-item" @click="viewDetail(transaction)">
				<div class="transaction-left">
					<img :src="getIcon(transaction.type)" alt="icon" class="icon" />
					<div class="transaction-info">
						<div class="transaction-type">{{ transaction.type === 2 ? $t('sysText.home_send') : $t('sysText.home_add_money') }}</div>
						<div class="transaction-date">{{ transaction.tradeDateTime }}</div>
					</div>
				</div>
				<div class="transaction-right">
					<div class="transaction-amount" v-if="transaction.type === 1">{{ transaction.sourceAmount }} {{ transaction.sourceCurrency }}</div>
					<div class="transaction-amount" v-else>{{ transaction.settleAmount }} {{ transaction.settleCurrency }}</div>
					<div class="transaction-status" :class="getStatusClass(transaction)">{{ getStatusName(transaction) }}</div>
				</div>
			</div>
		</div>

		<div v-if="transactions.length === 0" class="empty-state">
			<p>{{ $t('sysText.none') }}</p>
		</div>

		<div class="pagination">
			<button @click="loadMore" :disabled="loading">{{ loading ? 'Loading...' : 'Load More' }}</button>
		</div>
	</div>
</template>

<script>
import { getNewTradeList } from "@/api/business";

export default {
	name: "MobileOrderList",
	data() {
		return {
			tabs: [this.$t('orderData.alls'), this.$t('sysText.home_buy'), this.$t('sysText.home_sell')],
			activeTab: 0,
			transactions: [],
			labelArr: {
				baseCodes: [],
				sellteAmountMap: {},
				settleTradeAmountMap: {},
				sourceAmountMap: {},
				sourceTradeAmountMap: {},
				sum: 0
			},
			loading: false,
			page: 1,
			pageSize: 10
		};
	},
	created() {
		this.fetchTransactions();
	},
	methods: {
		selectTab(index) {
			this.activeTab = index;
			this.page = 1;
			this.transactions = [];
			this.fetchTransactions();
		},
		async fetchTransactions() {
			this.loading = true;
			try {
				const response = await getNewTradeList({
					pageNum: this.page,
					pageSize: this.pageSize,
					type: this.activeTab + 1
				});
				this.transactions = [...this.transactions, ...response.data.result.list];
				this.labelArr = {
					baseCodes: response.data.baseCodes,
					sellteAmountMap: response.data.sellteAmountMap,
					settleTradeAmountMap: response.data.settleTradeAmountMap,
					sourceAmountMap: response.data.sourceAmountMap,
					sourceTradeAmountMap: response.data.sourceTradeAmountMap,
					sum: response.data.sum
				};
			} catch (error) {
				console.error("Error fetching transactions:", error);
			} finally {
				this.loading = false;
			}
		},
		loadMore() {
			this.page += 1;
			this.fetchTransactions();
		},
		getIcon(type) {
			return type === 2 ? '/icon/zhuanchu.png' : '/icon/zhuanru.png';
		},
		viewDetail(transaction) {
			if (transaction.type === 1) {
				this.$router.push({ path: `/details/info/${transaction.tradeNo}`, params: { key: transaction } });
			} else {
				this.$router.push({ path: `/details/withdrawals/${transaction.id}` });
			}
		},
		getStatusClass(transaction) {
			if (transaction.type === 1) {
				if (transaction.orderStatus === '5') return 'status-success';
				if (transaction.orderStatus === '6') return 'status-fail';
				if (transaction.orderStatus === '1') return 'status-processing';
				return 'status-success';
			} else {
				if (transaction.orderStatus === '2') return 'status-success';
				if (transaction.orderStatus === '3') return 'status-fail';
				if (transaction.orderStatus === '4') return 'status-processing';
				return 'status-processing';
			}
		},
		getStatusName(transaction) {
			if (transaction.type === 1) {
				const orderStates = this.$store.state.order.orderState;
				return orderStates.find(state => state.value === transaction.orderStatus)?.label || '';
			} else {
				const ZT = [
					{ label: this.$t('sysText.bankProcessing'), value: '0' },
					{ label: this.$t('sysText.systemProcessing'), value: '1' },
					{ label: this.$t('withdrawDetails.Success'), value: '2' },
					{ label: this.$t('withdrawDetails.Failure'), value: '3' },
					{ label: this.$t('sysText.to_be_added'), value: '4' },
					{ label: this.$t('sysText.Pending_review'), value: '5' },
				];
				return ZT.find(state => state.value === transaction.orderStatus)?.label || '';
			}
		},
		openFilter() {
			// Implement filter functionality here
			console.log('Open filter');
		},
	}
};
</script>

<style scoped>
.mobile-order-list {
	font-family: PingFangSC, PingFang SC, sans-serif;
	max-width: 375px;
	margin: 0 auto;
	padding: 16px;
}

.page-title {
	font-size: 24px;
	font-weight: 600;
	color: #364A63;
	margin-bottom: 16px;
}

.summary-container {
	position: relative;
	background: #F7F9FE;
	border-radius: 16px;
	padding: 20px;
	margin-bottom: 24px;
	overflow: hidden;
}

.summary-scroll {
	display: flex;
	overflow-x: auto;
	padding-bottom: 15px;
	margin-bottom: -15px;
}

.summary-main {
	flex-shrink: 0;
}

.currency-total {
	flex-shrink: 0;
	margin-left: 101px;
}

.flew_row {
	display: flex;
	align-items: center;
	margin-bottom: 12px;
}

.summary-title {
	font-size: 16px;
	font-weight: 500;
	color: #526484;
	margin-right: 8px;
}

.summary-content {
	display: flex;
	flex-wrap: wrap;
}

.base-code {
	font-size: 16px;
	color: #7F8DFF;
	/*margin-right: 4px;*/
}

.summary-row {
	display: flex;
	align-items: center;
	margin-bottom: 12px;
}

.summary-label {
	font-weight: 500;
	font-size: 14px;
	color: #8094AE;
	line-height: 30px;
	text-align: left;
	font-style: normal;
	margin-right: 16px;

}

.summary-value {
	font-weight: 500;
	font-size: 14px;
	color: #526484;
	line-height: 30px;
	text-align: left;
	font-style: normal;
}

.summary-value {
	font-size: 14px;
	color: #526484;
	font-weight: 500;
}

.success-count {
	font-size: 16px;
	font-weight: 500;
	color: #364A63;
	margin-top: 16px;
}

.success-count span {
	color: #7F8DFF;
}

.tabs-and-filter-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #F7F9FE;
	border-radius: 16px;
	padding: 4px;
	margin-bottom: 16px;
}

.tabs-container {
	display: flex;
	flex-grow: 1;
}

.tab {
	flex: 1;
	text-align: center;
	padding: 8px 16px;
	font-size: 14px;
	color: #8094AE;
	cursor: pointer;
	border-radius: 12px;
	transition: background-color 0.3s, color 0.3s;
}

.tab.active {
	background-color: #FFFFFF;
	color: #364A63;
}

.filter-button {
	width: 32px;
	height: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #FFFFFF;
	border-radius: 50%;
	margin-left: 8px;
	cursor: pointer;
}

.transaction-list {
	margin-bottom: 24px;
}

.transaction-item {
	display: flex;
	justify-content: space-between;
	padding: 16px 0;
	border-bottom: 1px solid #E5E9F2;
}

.transaction-left {
	display: flex;
	align-items: center;
}

.icon {
	width: 40px;
	height: 40px;
	margin-right: 12px;
}

.transaction-info {
	display: flex;
	flex-direction: column;
}

.transaction-type {
	font-size: 14px;
	font-weight: 600;
	color: #364A63;
}

.transaction-date {
	font-size: 12px;
	color: #8094AE;
	margin-top: 4px;
}

.transaction-right {
	text-align: right;
}

.transaction-amount {
	font-size: 14px;
	font-weight: 600;
	color: #364A63;
}

.transaction-status {
	font-size: 12px;
	margin-top: 4px;
}

.status-success {
	color: #1EE0AC;
}

.status-fail {
	color: #FF6B6B;
}

.status-processing {
	color: #F4BD0E;
}

.empty-state {
	text-align: center;
	padding: 32px 0;
	color: #8094AE;
}

.pagination {
	text-align: center;
}

.pagination button {
	background: #7F8DFF;
	color: white;
	border: none;
	padding: 8px 16px;
	border-radius: 4px;
	font-size: 14px;
	cursor: pointer;
}

.pagination button:disabled {
	background: #E5E9F2;
	cursor: not-allowed;
}
</style>