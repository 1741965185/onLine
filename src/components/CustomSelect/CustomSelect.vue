<template>
  <div class="currency-select">
    <div class="selected-currency" @click="toggleDropdown">
      <img :src="selectedCurrency.flag" :alt="selectedCurrency.code">
      <span>{{ selectedCurrency.code }}</span>
      <img class="header-jt" src="/currency/down_blod.png"  alt="">
    </div>
    <div class="dropdown" v-if="isOpen">
      <div
        v-for="currency in currencies"
        :key="currency.code"
        @click="selectCurrency(currency)"
        class="currency-option"
      >
        <img :src="currency.flag" :alt="currency.code">
        <span>{{ currency.code }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    currencies: {
      type: Array,
      required: true
    },
    initialCurrency: {
      type: String,
      default: 'USDC'
    }
  },
  data() {
    return {
      isOpen: false,
      selectedCurrency: null
    }
  },
	watch:{
		initialCurrency(newVal ,oldVal){
			if(newVal  !== oldVal){
				this.selectedCurrency = this.currencies.find(c => c.code === newVal) || this.currencies[0];
			}
		}
	},
  created() {
    this.selectedCurrency = this.currencies.find(c => c.code === this.initialCurrency) || this.currencies[0];
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectCurrency(currency) {
      this.selectedCurrency = currency;
      this.isOpen = false;
      this.$emit('currency-changed', currency);
    }
  }
}
</script>
<style scoped>
.currency-select {
  position: relative;
}
.selected-currency, .currency-option {
  display: flex;
  align-items: center;
  padding: 10px;
  width:120px;
  border-radius: 8px;
  cursor: pointer;
}


.selected-currency .header-jt{
  width: 12px;height: 7px;margin-left: 10px
}

.selected-currency{
	justify-content: end;
	padding:0px 10px 0px 10px
}

.selected-currency img, .currency-option img {
    width: 32px;
    height: 32px;
  margin-right: 10px;
}

.selected-currency span, .currency-option span {
  font-weight: 500;
  font-size: 18px;
  color: #364A63;
  line-height: 20px;
  text-align: left;
  font-style: normal;
}

.arrow {
  margin-left: auto;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-top: 5px;
	max-height: 190px;
	overflow-y: auto;
	z-index:100;
}

.currency-option {
  transition: background-color 0.2s;
}

.currency-option:hover {
  background-color: #f0f0f0;
}
@media (max-width: 999px) {
  .selected-currency img, .currency-option img{
    width: 24px;
      height: 24px;
      margin-right: 10px;
  }
  .selected-currency, .currency-option {
    display: flex;
    align-items: center;
    padding: 10px;
    width:88px;
    border-radius: 8px;
    cursor: pointer;
  }
  .selected-currency .header-jt{
    width: 12px;height: 7px;margin-left: 6px
  }
  .selected-currency span, .currency-option span{
    font-weight: 500;
    font-size: 14px;
    color: #364A63;
    line-height: 16px;
    text-align: left;
    font-style: normal;
  }
}

</style>
