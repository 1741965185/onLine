<template>
  <div class="fund-transfer" @click="handleGlobalClick">
    <div class="fund-transfer__header">
      <img
        class="fund-transfer__back-icon"
        src="./assets/img/SketchPngcf0409b4e46f3940a18dee8cef0a718f8e87f756e6ad8a6a090d89e68dd18479.png"
        @click="goBack"
      />
    </div>

    <div class="fund-transfer__content">
      <h1 class="fund-transfer__title">资金划转</h1>
      <p class="fund-transfer__subtitle">钱包余额划转到OnlinePay Card</p>

      <div class="fund-transfer__form">
        <!-- Transfer Account Section -->
        <div class="fund-transfer__accounts">
          <div class="fund-transfer__row">
            <span class="fund-transfer__label">从</span>
            <div class="fund-transfer__select">
              <div class="fund-transfer__select-content">
                <img
                  :src="isSwapped ? '@/assets/card/card_small_entity.png' : './assets/img/wallet_select_foundtransfer.png'"
                  :alt="isSwapped ? 'Card' : 'Wallet'"
                  class="fund-transfer__account-icon"
                >
                <span class="fund-transfer__account-text">
                  {{ isSwapped ? selectedCard : selectedWallet }}
                </span>
              </div>
            </div>
          </div>

          <div class="fund-transfer__swap-wrapper">
            <img
              src="./assets/img/swap_found.png"
              class="fund-transfer__swap-icon"
              @click="handleSwap"
            >
          </div>

          <div class="fund-transfer__row fund-transfer__row--destination">
            <span class="fund-transfer__label">至</span>
            <div class="fund-transfer__select">
              <div class="fund-transfer__select-content">
                <img
                  :src="isSwapped ? './assets/img/wallet_select_foundtransfer.png' : '@/assets/card/card_small_entity.png'"
                  :alt="isSwapped ? 'Wallet' : 'Card'"
                  class="fund-transfer__account-icon"
                >
                <span class="fund-transfer__account-text">
                  {{ isSwapped ? selectedWallet : selectedCard }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Amount Input Section -->
        <div class="fund-transfer__amount">
          <span class="fund-transfer__amount-label">数量</span>
          <div class="fund-transfer__amount-input-container">
            <input
              v-model.trim="amount"
              type="text"
              class="fund-transfer__amount-input"
              placeholder="0"
              @input="validateAmount"
            >
            <div class="fund-transfer__currency-selector">
              <section
                class="fund-transfer__currency-select"
                @click.stop="toggleCurrencyDropdown"
              >
                <img
                  :src="`/currency/${selectedCurrencyMap.flag}.png`"
                  alt="currency"
                  class="fund-transfer__currency-icon"
                >
                <span class="fund-transfer__currency-text">
                  {{ selectedCurrencyMap.currency }}
                </span>
              </section>

              <transition name="fade">
                <div
                  v-show="isCurrencyDropdownOpen"
                  class="fund-transfer__currency-dropdown"
                >
                  <div
                    v-for="currency in merAccount"
                    :key="currency.currency"
                    class="fund-transfer__currency-option"
                    @click.stop="selectCurrency(currency)"
                  >
                    <img
                      :src="`/currency/${currency.flag}.png`"
                      alt="currency"
                      class="fund-transfer__currency-icon"
                    >
                    <span class="fund-transfer__currency-name">
                      {{ currency.currency }}
                    </span>
                  </div>
                </div>
              </transition>
            </div>
          </div>

          <div class="fund-transfer__balance">
            <span class="fund-transfer__balance-label">钱包的可用余额：</span>
            <span class="fund-transfer__balance-amount">
              {{selectedCurrencyMap.overAmount}} {{selectedCurrencyMap.currency}}
            </span>
          </div>
        </div>

        <!-- Submit Button -->
        <el-button
          type="primary"
          :loading="loading"
          class="fund-transfer__submit"
          @click="handleTransfer"
          :disabled="!isValidAmount"
        >
          划转
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { transferIn, transferOut } from "@/api/certification";
import { getAccountBalance } from "@/api/home";

export default {
  name: 'FundTransfer',

  data() {
    return {
      selectedWallet: '钱包',
      selectedCard: '5561...3404',
      merAccount: [],
      amount: '',
      loading: false,
      isSwapped: false,
      selectedCurrencyMap: {
        currency: "USDC",
        overAmount: "0.00",
        flag: "USDC"
      },
      isCurrencyDropdownOpen: false,
      currentCard: {},
      isValidAmount: false
    }
  },

  created() {
    try {
      this.currentCard = this.$route.params.currentCard || {};
      this.selectedCard = this.currentCard.cardNo || '5561...3404';
      this.fetchAccountBalance();
      document.addEventListener('click', this.handleGlobalClick);
    } catch (error) {
      console.error('初始化错误:', error);
    }
  },

  beforeDestroy() {
    document.removeEventListener('click', this.handleGlobalClick);
  },

  methods: {
    async fetchAccountBalance() {
      try {
        const merNo = sessionStorage.getItem('merNo');
        if (!merNo) {
          throw new Error('未找到商户号');
        }

        const res = await getAccountBalance({
          merNo,
          isAll: 1,
          currency: 'all'
        });

        if (res.status === 200 && res.data) {
          this.merAccount = res.data.merAccount || [];
          const usdcAccount = this.merAccount.find(
            item => item.currency === 'USDC'
          );
          if (usdcAccount) {
            this.selectedCurrencyMap = usdcAccount;
          }
        }
      } catch (error) {
        console.error('获取账户余额失败:', error);
        this.$message.error('获取账户余额失败');
      }
    },

    handleSwap() {
      this.isSwapped = !this.isSwapped;
    },

    toggleCurrencyDropdown() {
      this.isCurrencyDropdownOpen = !this.isCurrencyDropdownOpen;
    },

    selectCurrency(currency) {
      if (!currency) return;
      this.selectedCurrencyMap = { ...currency };
      this.isCurrencyDropdownOpen = false;
      this.validateAmount();
    },

    validateAmount() {
      try {
        const numAmount = parseFloat(this.amount);
        const availableBalance = parseFloat(this.selectedCurrencyMap.overAmount);

        if (isNaN(numAmount) || numAmount <= 0) {
          this.isValidAmount = false;
          return;
        }

        if (isNaN(availableBalance) || numAmount > availableBalance) {
          this.isValidAmount = false;
          return;
        }

        this.isValidAmount = true;
      } catch (error) {
        console.error('验证金额错误:', error);
        this.isValidAmount = false;
      }
    },

    async handleTransfer() {
      if (!this.isValidAmount || this.loading) return;

      this.loading = true;
      try {
        if (!this.currentCard.cardId) {
          throw new Error('卡片信息不完整');
        }

        const transferData = {
          cardId: this.currentCard.cardId,
          amount: this.amount,
          currency: this.selectedCurrencyMap.currency,
        };

        const transferMethod = this.isSwapped ? transferOut : transferIn;
        const response = await transferMethod(transferData);

        if (response.status === 200) {
          this.$message.success('划转成功');
          await this.fetchAccountBalance();
          this.amount = '';
          this.goBack();
        }
      } catch (error) {
        console.error('划转失败:', error);
        // this.$message.error('划转失败，请稍后重试');
      } finally {
        this.loading = false;
      }
    },

    handleGlobalClick(event) {
      const currencySelector = event.target.closest('.fund-transfer__currency-selector');
      if (!currencySelector) {
        this.isCurrencyDropdownOpen = false;
      }
    },

    goBack() {
      router.back();
    }
  }
}
</script>

<style scoped>
.fund-transfer {
    position: relative;
}

.fund-transfer__header {
    padding: 17px 0 0 121px;
    height: 64px;
}

.fund-transfer__back-icon {
    width: 31px;
    height: 31px;
    cursor: pointer;
}

.fund-transfer__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.fund-transfer__title {
    font-weight: 600;
    font-size: 28px;
    color: #364A63;
    line-height: 36px;
    margin: 60px 0 16px;
}

.fund-transfer__subtitle {
    font-size: 14px;
    color: #526484;
    line-height: 20px;
    margin-bottom: 24px;
}

.fund-transfer__form {
    width: 516px;
}

.fund-transfer__accounts {
    background-color: #fff;
    border: 1px solid #dbdfea;
    border-radius: 16px;
    margin-bottom: 24px;
    position: relative;
}

.fund-transfer__row {
    display: flex;
    align-items: center;
    padding: 20px;
}

.fund-transfer__row--destination {
    background-color: #f7f9fe;
    border-top: 1px solid #dbdfea;
}

.fund-transfer__label {
    width: 14px;
    font-size: 14px;
    color: #8094ae;
    margin-right: 20px;
}

.fund-transfer__swap-wrapper {
    position: absolute;
    right: 29px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
}

.fund-transfer__swap-icon {
    width: 40px;
    height: 40px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.fund-transfer__swap-icon:hover {
    transform: scale(1.1);
}

.fund-transfer__select {
    flex-grow: 1;
}

.fund-transfer__select-content {
    display: flex;
    align-items: center;
}

.fund-transfer__account-icon {
    width: 36px;
    height: 24px;
    margin-right: 12px;
    object-fit: contain;
}

.fund-transfer__account-text {
    font-size: 14px;
    color: #364a63;
    font-weight: 500;
}

.fund-transfer__amount {
    margin-bottom: 40px;
}

.fund-transfer__amount-label {
    display: block;
    font-size: 14px;
    color: #364a63;
    margin-bottom: 4px;
}

.fund-transfer__amount-input-container {
    display: flex;
    align-items: center;
    background-color: #fff;
    border: 1px solid #dbdfea;
    border-radius: 16px;
    padding: 12px 16px;
    margin-bottom: 6px;
    position: relative;
}

.fund-transfer__amount-input {
    flex-grow: 1;
    border: none;
    font-size: 24px;
    color: #364a63;
    font-weight: 500;
    outline: none;
}

.fund-transfer__currency-selector {
    position: relative;
    margin-left: auto;
}

.fund-transfer__currency-select {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: background-color 0.3s ease;
}

.fund-transfer__currency-select:hover {
    background-color: #f7f9fe;
}

.fund-transfer__currency-icon {
    width: 30px;
    height: 30px;
    margin-right: 6px;
    object-fit: contain;
}

.fund-transfer__currency-text {
    font-size: 24px;
    color: #364a63;
    font-weight: 500;
    margin-right: 12px;
}

.fund-transfer__currency-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background-color: #fff;
    border: 1px solid #dbdfea;
    border-radius: 8px;
    z-index: 10;
    min-width: 120px;
    max-height: 300px;
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.fund-transfer__currency-option {
    display: flex;
    align-items: center;
    padding: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.fund-transfer__currency-option:hover {
    background-color: #f7f9fe;
}

.fund-transfer__currency-name {
    font-size: 20px;
    color: #364a63;
    margin-left: 8px;
}

.fund-transfer__balance {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-top: 8px;
}

.fund-transfer__balance-label {
    color: #8094ae;
    margin-right: 12px;
}

.fund-transfer__balance-amount {
    color: #526484;
    font-weight: 500;
}

.fund-transfer__submit {
    width: 100%;
    height: 44px;
    background: #7F8DFF;
    border-radius: 4px;
    color: #fff;
    border: none;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.fund-transfer__submit:hover {
    background: #6b7aff;
}