<template>
	<div v-if="this.isLoading">
	</div>
<!--	0:审核中 1:审核失败  2:处理中 3:处理失败 4:处理成功 5:已关闭-->
	<OnlinePayCard v-else-if="cards.length === 0&&applicationList.length === 0"
								 title="OnlinePay Card"
								 buttonText="申请开卡"
								 @apply="handleApply"
	/>
	<CardApplicationProcessing v-else-if="isProcessing"
								 title="OnlinePay Card"
								 buttonText="处理中"
								 @apply="handleApply"
	/>
	<CardApplicationFailed v-else-if="isFailed"
								 title="OnlinePay Card"
								 buttonText="申请开卡"
									:remarkText="failedReason"
								 @apply="handleApply"
	/>
	<div class="visa-card-transactions" v-else>
		<div class="content-wrapper" @click="closeDropdowns">
			<!-- Left Column -->
			<div class="left-column">
				<!-- Card Switcher -->
					<div class="left-column_one" >
						<section @click.stop="toggleDropdown">
						<!--						001001:通华金服VISA公务卡 001201:通华金服VISA虚拟卡 021201:通华VPA电子卡-->
							<img v-if="currentCard.productType==='001001'" src="@/assets/card/card_small_entity.png">
							<img v-if="currentCard.productType==='001201'" src="@/assets/card/card_small_virtual.png">
							<img v-if="currentCard.productType==='021201'" src="@/assets/card/card_small_vpa.png">
						<span>{{formatCardNumber(currentCard.cardNo)}}</span>
						<img src="@/assets/card/up_add_down.png" style="height: 11px;width:7px">
					</section>
						<div class="dropdown-menu" v-if="isDropdownOpen">
							<div class="dropdown-item" v-for="card in cards" :key="card.id" @click="handleCardSwitch(card.id)">
								<img v-if="card.productType==='001001'" src="@/assets/card/card_small_entity.png">
								<img v-if="card.productType==='001201'" src="@/assets/card/card_small_virtual.png">
								<img v-if="card.productType==='021201'" src="@/assets/card/card_small_vpa.png">
								<span>{{card.cardNo}}</span>
							</div>
						</div>

					</div>

				<!-- Add Card Button -->
				<div class="left-column_two" @click="openDropdown(true)" @mouseenter="openDropdown(false)" @mouseleave="startCloseDropdown">
					<section>
						<span>{{$t("card.add_card")}}</span>
						<img src="@/assets/card/card_bottom.png">
					</section>
					<div class="dropdown-menu_two"
							 style="padding: 12px 20px;"
							 v-if="isAddCardDropdownOpen"
							 @mouseenter="clearCloseTimeout"
							 @mouseleave="startCloseDropdown">
						<div class="dropdown-item_two"
								 v-for="card in cardOptions"
								 :key="card.id"
								 @click="handleCardOpSwitch(card.id)">
							<span style="margin-right: 10px">+</span>
							<span>{{card.name}}</span>
						</div>
					</div>
				</div>

			</div>

<!--			isActive 0未激活 1已激活-->
			<div v-if="currentCard.isActive === 0" class="active-card-container"  @click="deactivateCard">
				<img class="active-card-icon" src="@/assets/images/gantanhao.png" alt="" />
				<div class="active-card-text">
					{{$t("card.physical_card_shipping")}}
				</div>
				<button class="deactivate-button">
					{{$t("card.activate_your_card")}} >
				</button>
			</div>
			<!-- Right Column -->
<!--			001001:通华金服VISA公务卡 001201:通华金服VISA虚拟卡 021201:通华VPA电子卡-->
			<div class="right-column" v-if="currentCard.productType==='001001' || currentCard.productType==='001201' ">
				<!-- Visa Card Display -->
				<!-- Balance Display -->
				<div class="balance-card">
					<div class="balance">
						<h2>{{$t("card.balance")}} ({{currentCard.currency}})</h2>
						<p class="amount">{{ currentCard.amount.toFixed(2) }}</p>
					</div>

					<!-- Action Buttons -->
					<div class="action-buttons">
						<!--						status0:待激活 1.已激活 2.已冻结 3.冻结处理中 4.销卡处理中 5.已销卡 6.解冻处理中 7.解除销卡处理中-->

						<el-button class="custom-primary" @click="goToFundTransfer" type="primary">{{$t("card.transfer")}}</el-button>
						<el-button class="custom-secondary" v-if="currentCard.status===2" @click="operationCard(currentCard,6)">{{$t("card.unFreeze")}}</el-button>
						<el-button class="custom-secondary" v-else @click="operationCard(currentCard,3)">{{$t("card.freeze")}}</el-button>
<!--						<el-button class="custom-secondary" @click="operationCard(currentCard,4)">销卡</el-button>-->
					</div>



				</div>
				<div :class="['credit-card', cardBackground]">
					<div class="credit-card__content">
						<!-- Chip -->
						<div class="card_one_wrapper">
							<div class="credit-card__chip"></div>
							<img src="@/assets/card/card_main_one.png" alt="Visa Logo" />
						</div>


						<!-- Card Number -->
						<div class="credit-card__number">
							<span id="cardNo">{{this.cardConfig.cardNo}}</span>

							<div class="credit-card__eye-icon" @click="toggleEye(false)">
								<img v-if="cardConfig.isShow" src="@/assets/card/card_eye_open.png" alt="Eye Icon" />
								<img v-else src="@/assets/card/card_eye_close.png" alt="Eye Icon" />
							</div>
						</div>

						<!-- Bottom Info -->
						<div class="credit-card__bottom">
							<div class="credit-card__date">
								<span class="label">MM/YY</span>
								<span class="value">{{this.cardConfig.expireDate.slice(0, 2)}}/{{this.cardConfig.expireDate.slice(2, 4)}}</span>
							</div>

							<div class="credit-card__cvv">
								<span class="label">CVV</span>
								<span class="value">{{this.cardConfig.cvv}}</span>
							</div>
						</div>
						<!-- Frozen Text -->
<!--						status0:待激活 1.已激活 2.已冻结 3.冻结处理中 4.销卡处理中 5.已销卡 6.解冻处理中 7.解除销卡处理中-->
						<div class="credit-card__status">{{ getStatusLabel(currentCard.status) }}</div>


					</div>
				</div>
		</div>
			<div class="right-column" v-if="currentCard.productType==='021201' ">
				<!-- Visa Card Display -->
				<!-- Balance Display -->
				<div class="balance-card" style="margin-right: 20px;min-width: 356px;box-sizing: border-box">
					<div class="balance">
						<h2>{{$t("card.balance")}} ({{currentCard.currency}})</h2>
						<p class="amount">{{ currentCard.amount }}</p>
					</div>

					<!-- Action Buttons -->
					<div class="action-buttons">
						<el-button class="custom-primary" type="primary" @click="goToFundTransfer">{{$t("card.transfer")}}</el-button>
						<el-button class="custom-secondary" v-if="currentCard.status===2" @click="operationCard(currentCard,6)">{{$t("card.unFrreze")}}</el-button>
						<el-button class="custom-secondary" v-else @click="operationCard(currentCard,3)">{{$t("card.freeze")}}</el-button>
						<el-button class="custom-secondary" v-if="currentCard.subCards.length !== 0" @click="showLimitDetails(cardConfig.subCards)">{{$t("orderState.CardLimit")}}</el-button>

					</div>



				</div>
<!--				open card-->
				<div class="card-container" v-if="currentCard.subCards.length === 0" @click="goToOpenSubCard">
					<div class="card-header">
						<img class="card-icon" src="@/assets/card/card_open_icon.png" />
						<span class="card-title">{{$t("card.open_sub_card")}}</span>
					</div>
					<span class="card-description">{{$t("card.apa")}}</span>
				</div>

				<div :class="['credit-card', cardBackground]" v-if="currentCard.subCards.length !== 0">
					<div class="credit-card__content">
						<!-- Chip -->
						<div class="card_one_wrapper">
							<div class="credit-card__chip"></div>
							<img src="@/assets/card/card_main_one.png" alt="Visa Logo" />
						</div>


						<!-- Card Number -->
						<div class="credit-card__number">
							<span id="cardNo">{{this.cardConfig.subCards.cardNo}}</span>

							<div class="credit-card__eye-icon" @click="toggleEye(true)">
								<img v-if="cardConfig.isShow" src="@/assets/card/card_eye_open.png" alt="Eye Icon" />
								<img v-else src="@/assets/card/card_eye_close.png" alt="Eye Icon" />
							</div>
						</div>

						<!-- Bottom Info -->
						<div class="credit-card__bottom">
							<div class="credit-card__date">
								<span class="label">MM/YY</span>
								<span class="value">{{this.cardConfig.expireDate.slice(0, 2)}}/{{this.cardConfig.expireDate.slice(2, 4)}}</span>
							</div>

							<div class="credit-card__cvv">
								<span class="label">CVV</span>
								<span class="value">{{this.cardConfig.cvv}}</span>
							</div>
						</div>
						<!-- Frozen Text -->
<!--						status0:待激活 1.已激活 2.已冻结 3.冻结处理中 4.销卡处理中 5.已销卡 6.解冻处理中 7.解除销卡处理中-->
						<div class="credit-card__logo">
							<button class="custom-button">
								<span class="button-label">{{$t("card.subcard")}}</span>
							</button>
						</div>
						<div class="credit-card__status">{{ getStatusLabel(currentCard.status) }}</div>



					</div>
				</div>

				<div v-if="currentCard.subCards.length !== 0" style="margin-left: 12px; max-height: 206px;">
					<div class="scrollable-div">
						<div
							v-for="(item, index) in currentCard.subCards"
							:key="index"
							class="scrollable-div-inner"
							@click="selectCard(item.id)"
						>
							<div class="selected_eve-div" v-if="cardConfig.subCards.id === item.id"></div>
							<div class="selected_eve-div-none" v-else></div>

							<div
								class="color-box"
								:style="{ backgroundColor: getRandomColor(item.id) }"
							></div>
							<span class="item-text">{{ formatCardNo(item.cardNo) }}</span>
						</div>
					</div>
				</div>
		</div>

			</div>
			<!-- Transactions Section -->
		<div class="transaction-section">
			<div class="header">
				<h3>{{$t('sysText.transaction')}}</h3>
<!--				<el-button type="text" class="view-more" @click="viewMore">{{$t('sysText.viewMore')}} &gt;</el-button>-->
			</div>
			<div class="transaction-list" v-if="transactions.length != 0">
				<div class="transaction-item" v-for="transaction in transactions" :key="transaction.id" @click="viewDetail(transaction)">
					<div class="transaction-left">
						<img :src="getIcon(transaction.type)" alt="icon" class="icon" />
						<div class="transaction-info">
<!--							0转入 1消费-->
							<div class="transaction-type">{{ transaction.type === '1' ? Expenditure:transferIn }}</div>
							<div class="transaction-date">{{ transaction.tradeDateTime }}</div>
						</div>
					</div>
					<div class="transaction-right">
						<div class="transaction-amount">{{ transaction.amount }} {{ transaction.amountCurrency }}</div>
						<div class="transaction-status" :class="getStatusClass(transaction.status)">{{ getStatusName(transaction.status)}}</div>
					</div>
				</div>
			</div>
			<div class="quesheng" v-if="transactions.length === 0">
				<img src="icon/zw.png">
				<p class="empty-list-text">{{$t('sysText.none')}}</p>
			</div>
		</div>
		<pagination
			:total="total"
			:page.sync="form.pageNum"
			:limit.sync="form.pageSize"
			@pagination="getCardBottomInfo"
		/>
		<ActivationModal ref="activationModal" @activation-success="activateSuccess" :cardData="currentCard" />
		<div class="successPopup" v-if="showSuccess">
			<div class="dialog">
				<div class="dialog-header">
					<!--					<span class="dialog-title">确认</span>-->
					<img class="close-button" src="@/assets/card/close_icon.png" @click="closeDialog"/>
				</div>
				<div class="dialog-body">
					<p v-if="this.selectedRow.needStatus===3">{{$t('card.ask_frozen')}}?</p>
					<p v-if="this.selectedRow.needStatus===4">{{$t('card.ask_cancelled')}}?</p>
					<p v-if="this.selectedRow.needStatus===6">{{$t('card.ask_freeze_cancelled')}}?</p>
					<p v-if="this.selectedRow.needStatus===7">{{$t('card.ask_cancellation_cancelled')}}?</p>
				</div>
				<div class="dialog-footer">
					<el-button class="cancel-button" @click="closeDialog">{{$t('card.cancel')}}</el-button>
					<el-button :loading="loading" class="confirm-button" type="primary" @click="confirmOp">{{$t('card.confirmd')}}</el-button>
				</div>
			</div>
		</div>
		<card-limit-modal
				:visible.sync="showModal"
				:initial-data="selectedRow"
				@confirm="handleConfirm"
		/>

	</div>
	</div>
</template>
<script>
import OnlinePayCard from '@/components/CardTemplate/cardNotApplied.vue'
import CardApplicationProcessing from '@/components/CardTemplate/CardApplicationProcessing.vue'
import CardApplicationFailed from '@/components/CardTemplate/CardApplicationFailed.vue'
import ActivationModal from './ActivationModal.vue'
import {getCardList, getCardTransactionList, getPayInfo, getCardById, unCancelCard, updateVpaScene} from "@/api/card";
import pagination from "@/components/Pagination/index.vue";
import CardLimitModal from "@/components/CardLimitModal/index.vue";
import { getHomeList } from "@/api/home";
import i18n from "@/i18n";


export default {

	name: 'VisaCardTransactions',
	components: {
		pagination,
		OnlinePayCard,
		CardApplicationProcessing,
		CardApplicationFailed,
		ActivationModal,
		CardLimitModal,

	},
	data() {
		return {
			form: {
				pageNum: 1,
				pageSize: 5
			}, // 列表查询表单
			total: 0, // 总条数
			transferIn: i18n.t('card.transfer_in'),
			Expenditure: i18n.t('card.expenditure'),
			statuses: [
				{ label: i18n.t('card.to_be_activated'), value: 0 },
				{ label: i18n.t('card.activated'), value: 1 },
				{ label: i18n.t('card.card_frozen'), value: 2 },
				{ label: i18n.t('card.freezing_in_progress'), value: 3 },
				{ label: i18n.t('card.card_cancellation_in_progress'), value: 4 },
				{ label: i18n.t('card.cancelled'), value: 5 },
				{ label: i18n.t('card.unfreezing'), value: 6 },
				{ label: i18n.t('card.uncancelling'), value: 7 }
			],
			currentPage: 1,
			pageSize: 10,
			totalEntries: 100,
			isDropdownOpen: false,
			isAddCardDropdownOpen: false,
			showSuccess: false,
			showModal: false,
			loading: false,
			selectedRow: null,
			cards: [],
			isLoading: true,
			applicationList: [],
			cardOptions: [
				{ id: 1, name: i18n.t('card.add_main_card') },
				{ id: 2, name: i18n.t('card.add_sub_card') },
			],
			currentCardId: 1,
			cardConfig: {
				isShow: false,
				cvv: "",
				expireDate: "",
				cardNo: "",
				subCards:{} ,
			},
			listStatus: [{ label: i18n.t('orderState.transactionSuccessful'), value: 0 }, { label: i18n.t('orderState.transactionFailed'), value: 1 }, { label: i18n.t('orderState.transactionPreprocessing'), value: 2 }],
			transactions: [],
			cardColors: ['#D3C4AD', '#9AADE3', '#9AE2E3', '#AB9AE3', '#9ABCE3'], // 定义颜色数组

			cardsArray: [
				{
					type: '001001',
					label: '通华金服VISA公务卡',
					description: '公务出行，轻松支付。',
					background: 'url(../../assets/card/card_bg_main_one.png)',
				},
				{
					type: '001201',
					label: '通华金服VISA虚拟卡',
					description: '安全便捷，随时随地。',
					background: 'url(../../assets/card/card_bg_main_two.png)',
				},
				{
					type: '021201',
					label: '通华VPA电子卡',
					description: '电子支付，快速高效。',
					background: 'url(../../assets/card/card_bg_main_one.png)',
				},
			],
		}
	},
	computed: {
		isProcessing() {
			// 0:审核中 1:审核失败  2:处理中 3:处理失败 4:处理成功 5:已关闭
			return this.cards.length === 0 &&this.applicationList.length > 0 && [2, 0].includes(this.applicationList[0].status);
		},

		isFailed() {
			return this.cards.length === 0 &&this.applicationList.length > 0 && [1, 3, 5].includes(this.applicationList[0].status);
		},
		failedReason() {
			return this.cards.length === 0 &&this.applicationList.length > 0
				? this.applicationList[0].remark || ''
				: '';
		},

		cardBackground() {
			// 001001:通华金服VISA公务卡 001201:通华金服VISA虚拟卡 021201:通华VPA电子卡
			switch (this.currentCard.productType) {
				case '001001':
					return 'background-type1';
				case '001201':
					return 'background-type2';
				case '021201':
					return 'background-type3';
				default:
					return 'none'; // 默认背景
			}
		},
		currentCard() {
			return this.cards.find(card => card.id === this.currentCardId);
		},
		totalPages() {
			return Math.ceil(this.totalEntries / this.pageSize);
		}
	},
	created() {
		this.getCardListRequest();
		this.getCardBottomInfo();
	},
	methods: {
		handleConfirm(updatedData) {
			// 准备要发送到服务器的数据
			updatedData.cardId=this.cardConfig.subCards.id;
			// 调用API更新场景
			updateVpaScene(updatedData)
					.then(response => {
						if (response.status === 200) { // 假设200表示成功，根据实际API调整
																					 // 显示成功消息
							this.$message.success('卡片限额更新成功');
							this.showModal = false;
						} else {
							// 显示错误消息
							this.$message.error(response.msg || '更新失败，请重试');
						}
					})
					.catch(error => {
						console.error('更新场景时出错:', error);
						this.$message.error('更新失败，请重试');
					});
		},
		getCardListRequest() {
			this.isLoading=true;
			getCardList().then(response => {
				if (response.status === 200) {
					this.cards = response.data.cardList;
					this.applicationList = response.data.applicationList;
					this.isLoading=false;

					if (this.cards.length > 0) {
						this.currentCardId = this.cards[0].id;
						this.resetCardConfig();
					}
				} else {
					console.log('Error fetching card list');
				}
			}).catch(error => {
				console.log(error);
			});
		},
		getCardBottomInfo(){
			getCardTransactionList(this.form).then(res=>{
				this.transactions  = res.data.list;
				this.total  = res.data.total;
			})
		},
		getIcon(type) {
			// 0转入 1消费
			return type === '1' ? '/icon/xiaofei.png' : '/icon/cardtransfer.png';
		},
		deactivateCard() {
			this.$refs.activationModal.showModal();
		},
		viewDetail(transaction){
			this.$router.push({path: "/details/cardInfo/" + transaction.id});
		},
		goToOpenSubCard() {
			this.$router.push({
				name: 'openSubCard',
				params: {
					mainCardId: this.currentCard.id,
				}
			});
			},
		goToFundTransfer() {
			this.$router.push({
				name: 'fundTransfer',
				params: {
					currentCard: this.currentCard,
				}
			});
			},
		operationCard(row,status) {
			this.selectedRow = row
			this.selectedRow.needStatus=status
			this.showSuccess = true
		},
		showLimitDetails(row) {
			console.log('查看详情', this.cardConfig.subCards.id)
			this.selectedRow = row
			this.showModal = true
		},
		closeDialog() {
			this.showSuccess = false;
		},
		confirmOp() {
			this.loading = true;
			// 处理确认逻辑
			console.info(this.selectedRow.id);
			unCancelCard({ id:this.selectedRow.id,  status:this.selectedRow.needStatus})
				.then(result => {
					this.loading = false;
					this.loading = false;
					getCardById({id:this.currentCard.id}).then(res=>{
						this.currentCard = res.data;
						this.$message.success(res.msg)
						this.closeDialog();
					});
					this.closeDialog();
				})
				.catch(error => {
					this.loading = false;
				});
		},
		activateSuccess() {
			this.currentCard.isActive = 1;
		},
		getStatusName(status) {
			// 0交易成功 1交易失败 2交易预处理

			for (let i = 0; i <this.listStatus.length ; i++) {
				if(this.listStatus[i].value == status){
					return this.listStatus[i].label;
				}
			}
		},
		selectCard(id) {
			this.currentCard.subCards.find(item => {
				item.id === id ? this.cardConfig.subCards = item : null;
			});
		},
		toggleEye(isSubCard) {
			let id = isSubCard? this.cardConfig.subCards.id : this.currentCard.id;

			getPayInfo({id:id}).then(response => {	// 获取支付信息
				if (response.status === 200) {			// 支付信息获取成功
					if (!this.cardConfig.isShow) {


						if (isSubCard) {
							this.cardConfig.subCards.cardNo=response.data.cardNo;
							this.cardConfig.cvv=response.data.cvv;
							this.cardConfig.expireDate=response.data.expireDate;
						}else {
							this.cardConfig = response.data;
						}
						this.cardConfig.isShow = !this.cardConfig.isShow;

					} else {
						this.resetCardConfig();
					}

				} else {									// 支付信息获取失败
					console.log("支付信息获取失败");
				}
			}).catch(error => {							// 支付信息获取失败
				console.log("支付信息获取失败");
			});
		},			// Toggle the visibility of the card number
		toggleDropdown() {
			this.isDropdownOpen = !this.isDropdownOpen;
			this.isAddCardDropdownOpen = false; // Close card switcher dropdown if open
		},
		closeDropdowns() {
			this.isDropdownOpen = false;
			this.isAddCardDropdownOpen = false; // Close card switcher dropdown if open
		},
		toggleAddCardDropdown() {
			// 001001:通华金服VISA公务卡 001201:通华金服VISA虚拟卡 021201:通华VPA电子卡
			if (this.currentCard.productType === '021201'){
				this.isAddCardDropdownOpen = !this.isAddCardDropdownOpen;
				this.isDropdownOpen = false; // Close card switcher dropdown if open
			}else {
				this.$router.push({path: '/cardApplication'});
			}

		},
		handleCardSwitch(cardId) {
			this.currentCardId = cardId;
			this.isDropdownOpen = false; // Close add card dropdown if open
			this.isAddCardDropdownOpen = false; // Close add card dropdown if open
			this.resetCardConfig();

			// Here you would typically fetch the data for the selected card
		},
		handleCardOpSwitch(cardId) {
			// this.currentCardId = cardId;
			if (cardId === 1) {
				this.$router.push({path: '/cardApplication'});
			} else {
				this.goToOpenSubCard();
			}
			this.isAddCardDropdownOpen = false; // Close add card dropdown if open
			this.isDropdownOpen = false; // Close add card dropdown if open

			// Here you would typically fetch the data for the selected card
		},
		openDropdown(isOnclick) {
			if (this.currentCard.productType === '021201') {
				clearTimeout(this.closeTimeout); // 清除关闭定时器
				this.isAddCardDropdownOpen = true;
			} else {
				if (isOnclick){
					this.$router.push({ path: '/cardApplication' });
				}
			}
		},
		startCloseDropdown() {
			this.closeTimeout = setTimeout(() => {
				this.isAddCardDropdownOpen = false;
			}, 200); // 200毫秒后关闭菜单
		},
		clearCloseTimeout() {
			clearTimeout(this.closeTimeout); // 清除关闭定时器
		},
		cardStyle(productType) {
			if (!productType) {
				const card = this.cardsArray.find(item => item.type === productType);
				return {
					backgroundImage: card ? card.background : '',
				};
			}

		},
		formatCardNo(cardNo) {
			const cleanedCardNo = cardNo.replace(/\s/g, ''); // 去掉空格
			return `${cleanedCardNo.slice(0, 4)}***${cleanedCardNo.slice(-4)}`; // 格式化卡号
		},
		getRandomColor(itemId) {
			const index = itemId % this.cardColors.length; // 使用id来选择颜色，确保每个ID都有固定颜色
			return this.cardColors[index];
		},
		getStatusLabel(statusValue) {
			const status = this.statuses.find(item => item.value === statusValue);
			return status ? status.label : '未知状态';
		},
		resetCardConfig() {
			this.cardConfig = {
				isShow: false,
				cvv: "****",
				expireDate: "****",
				cardNo: this.currentCard.cardNo,
				subCards: this.currentCard && this.currentCard.subCards && this.currentCard.subCards.length > 0
					? this.currentCard.subCards[0]// 确保 subCards 存在且有元素
					: {}, // 如果不存在，返回空字符串
			};
		},
		formatCardNumber(cardNo) {
			// 去除空格
			const cleaned = cardNo.replace(/\s+/g, '');

			// 获取开头和结尾的部分
			const start = cleaned.slice(0, 4); // 前四位
			const end = cleaned.slice(-4); // 后四位

			// 返回格式化后的字符串
			return `${start}…${end}`;
		},

		handleApply() {
			// Handle the apply action here
			this.$router.push({path: '/cardApplication'});
			console.log('Apply button clicked')
		},

		handleCurrentChange(val) {
			console.log(`Current page: ${val}`);
			// Here you would typically fetch the data for the new page
		},
		handleAddCard(type) {
			console.log(`Adding ${type} card`);
			// Implement logic to add a new card
		},
		getIconClass(type) {
			return type === 'expense' ? 'el-icon-shopping-cart-full' : 'el-icon-money';
		},
		getStatusClass(status) {
			// 0交易成功 1交易失败 2交易预处理

			switch (status) {
				case 0:
					return 'status-success';
				case 1:
					return 'status-fail';
				case 2:
					return 'status-processing';
				default:
					return '';
			}
		}
	}
}
</script>

<style scoped>
.visa-card-transactions {
	font-family: Arial, sans-serif;
	width: 100%;
	padding: 36px 0 36px 60px;
	box-sizing: border-box;
}

.content-wrapper {
	/*display: flex;*/
	/*justify-content: space-between;*/
}

.left-column {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.left-column_one {
	padding: 7px 10px 7px 10px;background: #F7F9FE;display: flex;
	cursor: pointer;
	position: relative;
	align-items: center;
	border-radius: 8px;
	img {
		width: 40px;
		height: 26px;
		margin-right: 10px;
	}
	span{
		font-weight: 500;
		font-size: 16px;
		color: #364A63;
		line-height: 16px;
		text-align: right;
		font-style: normal;
		margin-right: 10px;

	}
}
.left-column_two {
	padding: 8px 13px 8px 15px;background: #7F8DFF;display: flex;
	cursor: pointer;
	position: relative;
	align-items: center;
	border-radius: 16px;
	height: 32px;
	box-sizing: border-box;
	img {
		width: 10px;
		height: 6px;
		margin-left: 8px;
	}
	span{
		font-weight: 500;
		font-size: 14px;
		color: #FFFFFF;
		line-height: 16px;
		text-align: center;
		font-style: normal;


	}
}
.dropdown-item_two {
	padding: 8px 0 8px 0;display: flex;
	cursor: pointer;
	position: relative;
	align-items: center;
	img {
		width: 10px;
		height: 6px;
		margin-left: 8px;
	}
	span{
		font-weight: 500;
		font-size: 14px;
		color: #526484;
		line-height: 14px;
		text-align: left;
		font-style: normal;
		white-space: nowrap;



	}
}
.dropdown-item {
	padding: 7px 10px 7px 10px;
	display: flex;
	cursor: pointer;
	align-items: center;
	img {
		width: 40px;
		height: 26px;
		margin-right: 10px;
	}
	span{
		font-weight: 500;
		font-size: 16px;
		color: #364A63;
		line-height: 16px;
		text-align: right;
		font-style: normal;
		margin-right: 10px;
		white-space: nowrap;
	}
}
.dropdown-menu {
	position: absolute;
	left: 0;
	top: calc(100% + 4px);
	background: #FFFFFF;
	/*width: 100%;*/
	box-shadow: 0px 2px 6px 0px #DBDFEA;
	border-radius: 10px;
	border: 1px solid #DBDFEA;
	overflow-y: auto; /* Scrollable */
	z-index: 10;
}

.dropdown-menu_two {
	position: absolute;
	right: 0;
	top: calc(100% + 4px);
	background: #FFFFFF;
	/*width: 100%;*/
	box-shadow: 0px 2px 6px 0px #DBDFEA;
	border-radius: 10px;
	border: 1px solid #DBDFEA;
	overflow-y: auto; /* Scrollable */
	z-index: 10;
	width: 124px;
	height: 86px;
	box-sizing: border-box;
}

.dropdown-item:hover {
	background-color: #f0f0f0;
}
.dropdown-item_two:hover span{
	color: #7F8DFF;
}

.right-column {
	display: flex;
	justify-content: start;
	margin-bottom: 32px;
	margin-top: 16px;
}
.balance-card {

	padding: 25px;
	width: 475px;
	height: 219px;
	box-sizing: border-box;
	background: #F7F9FE;
	border-radius: 24px;
	margin-right: 32px;

}

.balance {
	h2{
		font-weight: 500;
		font-size: 14px;
		color: #8094AE;
		line-height: 20px;
		text-align: left;
		font-style: normal;margin-bottom: 23px;
	}

}
.action-buttons{
	margin-right: 32px;
	display: flex;
}
.amount {
	font-weight: 500;
	font-size: 44px;
	color: #364A63;
	line-height: 54px;
	text-align: left;
	font-style: normal;
	margin-bottom: 33px;
}

.custom-primary {
	background: #7F8DFF;
	border-radius: 20px;
	color: #FFFFFF;
	height: 40px;
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	text-align: left;
}

.custom-primary:hover {
	background: #5A6BC1;
	color: #FFFFFF;
}

.custom-secondary {
	background: #FFFFFF;
	border-radius: 20px;
	border: 1px solid #F4F5F9;
	color: #526484;
	height: 40px;
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	text-align: left;
}

.custom-secondary:hover {
	background: #F4F5F9;
	color: #526484; /* 保持字体颜色 */
}
.visa-card {
	position: relative;
	width: 100%;
	height: 200px;
	border-radius: 10px;
	overflow: hidden;
	background-size: cover;
	background-position: center;
	margin-bottom: 20px;
}
.credit-card {
	position: relative;
	box-sizing: border-box;
	width: 387px; /* 固定宽度 */
	height: 217px; /* 固定高度 */
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	min-width: 387px; /* 确保最小宽度 */
	min-height: 217px; /* 确保最小高度 */
}
.background-type1 {
	background-image: url(../../assets/card/card_bg_main_two.png);
}

.background-type2 {
	background-image: url(../../assets/card/card_bg_main_one.png);
}
.background-type3 {
	background-image: url(../../assets/card/card_bg_main_three.png);
}
.credit-card__content {
	padding: 39px 23px 19px 23px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.card_one_wrapper{
	display: flex; justify-content: space-between; align-items: center;
	margin-bottom: 16px;
	img{
		width: 58px;
		height: 24px;
	}
}

.credit-card__chip {
	width: 39px;
	height: 28px;

	background: #FFFFFF;

	opacity: 0.9;
	border-radius: 4px;
}

.credit-card__number {
	display: flex;
	align-items: center;
	font-weight: bold;
	font-size: 22px;
	color: #FFFFFF;
	line-height: 30px;
	text-align: left;
	font-style: normal;
	margin-bottom: 12px;
}

.credit-card__number span {
	margin-right: 8px;
}

.credit-card__eye-icon {
	margin-left: 4px;
	img{
		width: 20px;
		height: 20px;
		cursor: pointer;
	}
}

.credit-card__bottom {
	display: flex;
}

.credit-card__date,
.credit-card__cvv {
	display: flex;
	flex-direction: column;
	margin-right: 40px;
}

.label {
	font-weight: 400;
	font-size: 11px;
	color: #F8F8F9;
	line-height: 14px;
	text-align: left;
	font-style: normal;
	opacity: 0.9;
	margin-bottom: 2px;
}

.value {
	font-weight: 400;
	font-size: 11px;
	color: #F8F8F9;
	line-height: 14px;
	text-align: left;
	opacity: 0.9;
	font-style: normal;
}

.credit-card__status {
	position: absolute;
	bottom: 19px;
	right: 24px;
	font-weight: 400;
	font-size: 16px;
	color: #FFFFFF;
	line-height: 18px;
	text-align: center;
	font-style: normal;
}

.credit-card__logo {
	position: absolute;
	bottom: 13px;
	left: 24px;
	font-weight: 400;
	font-size: 16px;
	color: #FFFFFF;
	line-height: 18px;
	text-align: center;
	font-style: normal;
}

.credit-card_logo {
	position: absolute;
	bottom: 19px;
	right: 24px;
	font-weight: 400;
	font-size: 16px;
	color: #FFFFFF;
	line-height: 18px;
	text-align: center;
	font-style: normal;
}


.transaction-section {
	background: #fff;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12px;
}

.header h3 {
	font-weight: 600;
	font-size: 20px;
	color: #364A63;
	line-height: 24px;
	text-align: left;
	font-style: normal;

}

.transaction-list {
	display: flex;
	flex-direction: column;
}

.transaction-item {
	display: flex;
	justify-content: space-between;
	padding: 12px 0;
	cursor: pointer;
	border-bottom: 1px solid #F4F5F9;
}

.transaction-item:hover {
	background:#F6F8FE;
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
	font-weight: 500;
	font-size: 16px;
	color: #364A63;
	line-height: 18px;
	text-align: left;
	font-style: normal;
}

.transaction-date {
	margin-top:8px;
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
	font-weight: bold;
	font-size: 16px;
	color: #364A63;
	line-height: 18px;
	text-align: left;
	font-style: normal;
}

.transaction-status {
	font-size: 12px;
	margin-top: 5px;
}

.status-success {
	color: #67c23a;
}

.status-fail {
	color: #f56c6c;
}

.status-processing {
	color: #e6a23c;
}
.card-container {
	cursor: pointer;

	padding: 24px;
	width: 524px;
	height: 219px;
	box-sizing: border-box;
	background: rgba(127, 141, 255, 0.1);
	border-radius: 16px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.card-header {
	display: flex;
	align-items: center; /* 垂直居中 */
}

.card-icon {
	width: 49px;
	height: 49px;
	margin-right: 12px; /* 图标与标题之间的间距 */
}

.card-title {
	font-weight: 600;
	font-size: 18px;
	color: #364a63;
	line-height: 16px;
	text-align: left;
	font-style: normal;
}

.card-description {
	font-weight: 400;
	font-size: 16px;
	color: #8094ae;
	line-height: 16px;
	text-align: left;
	font-style: normal;
}
.active-card-container {
	margin-top: 10px;
	height: 40px;
	display: flex;
	background: rgba(255, 143, 31, 0.12);
	align-items: center;
	cursor: pointer;
	margin-bottom: 24px;
	border-radius: 8px;
	padding: 0 16px; /* 添加内边距 */
}

.active-card-icon {
	width: 20px;
	height: 20px;
	margin-right: 8px;
}

.active-card-text {
	font-weight: 400;
	font-size: 14px;
	color: #FF8F1F;
	line-height: 20px;
	text-align: left;
	font-style: normal;
	flex-grow: 1;
}

.deactivate-button {
	background: transparent;
	border: none;
	color: #FF8F1F;
	font-weight: 400;
	font-size: 14px;
	cursor: pointer;
	padding: 0; /* 去除内边距 */
}
.custom-button {
	border-radius: 13px;
	border: 1px solid #FFFFFF;
	padding: 4px 12px; /* 内边距 */
	background: transparent;
	cursor: pointer; /* 鼠标样式 */
	transition: background-color 0.3s, color 0.3s; /* 动画效果 */
}
.button-label {
	font-weight: 400;
	font-size: 14px;
	color: #FFFFFF;
	line-height: 18px;
	text-align: center;
	font-style: normal;

}
.scrollable-div {
	width: 300px; /* 可根据需要设置 */
	height: 200px; /* 可根据需要设置 */
	overflow-y: auto; /* 纵向滚动条 */
	/*padding: 15px 0; !* 内边距 *!*/
	cursor: pointer;
}

.selected_eve-div {
	width: 4px;
	height: 40px;
	margin-right: 22px;
	background: #7F8DFF;
	border-radius: 2px;

}
.selected_eve-div-none {
	width: 3px;
	height: 40px;
	margin-right: 22px;
	background: #F4F5F9;
	border-radius: 2px;

}

.scrollable-div-inner {
	display: flex; /* 使用 flexbox 排列内容 */
	align-items: center; /* 垂直居中对齐 */
	/*padding-bottom: 10px;*/ /* 每个条目的底部间距 */
}

.color-box {
	width: 10px;
	height: 10px;
	background-color: #9AE2E3;
	margin-right: 10px; /* 右边距 */
}

.item-text {
	font-weight: 400;
	font-size: 14px;
	color: #364A63;
	line-height: 16px;
	text-align: left;
	font-style: normal;
}


.successPopup {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 2000;
}
.dialog {
	background-color: white;
	border-radius: 4px;
	width: 500px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dialog-header {
	display: flex;
	justify-content: end;
	align-items: center;
	padding: 25px 24px 0 24px;
//border-bottom: 1px solid #eaeaea;
}

.dialog-title {
	font-size: 18px;
	font-weight: bold;
}

.close-button {
	border: none;
	background: none;
	width: 17px;
	height: 17px;
//margin-top:17px;
	cursor: pointer;
}

.dialog-body {
	padding: 20px 70px;
}
.dialog-body p {
	font-weight: 500;
	font-size: 20px;
	color: #364A63;
	line-height: 28px;
	text-align: left;
	font-style: normal;

}

.dialog-footer {
	display: flex;
	justify-content: flex-end;
	padding: 15px 23px;
}

.cancel-button {
//margin-right: 16px;
	padding: 10px 26px;
	background-color: #f5f5f5;
	border: 1px solid #dcdcdc;
	border-radius: 4px;
	cursor: pointer;
}

.confirm-button {
	padding: 10px 26px;
	background-color: #7F8DFF;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

.confirm-button:hover {
	background-color: #66b1ff;
}
@media (max-width: 1200px) {
	.content-wrapper {
		flex-direction: column;
	}

	.left-column,
	.right-column {
		width: 100%;
	}

	.right-column {
		margin-top: 20px;
	}
}
</style>