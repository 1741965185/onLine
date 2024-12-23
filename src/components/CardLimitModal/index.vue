<template>
    <div class="modal-overlay" v-if="visible" @click.self="closeModal">
        <div class="modal-container">
            <div class="modal-header">
                <div></div>
                <h2 class="modal-title">{{ $t('card.card_limit') }}</h2>
                <img
                    class="close-icon"
                    src="@/assets/images/close_icon.png"
                    @click="closeModal"
                    :alt="$t('card.close')"
                />
            </div>

            <div class="modal-content">
                <div class="card-limit-form">
                    <div class="card-limit-form__usage-types">
                        <div
                            v-for="type in usageTypes"
                            :key="type.value"
                            :class="[
                'card-limit-form__usage-type',
                { 'card-limit-form__usage-type--selected': formData.type === type.value }
              ]"
                        >
                            <h3 class="h3_label_1">{{ $t(`card.${type.labelKey}`) }}</h3>
                            <div class="p_label_1">{{ $t(`card.${type.descriptionKey}`) }}</div>
                        </div>
                    </div>

                    <template v-if="formData.type === '1'">
                        <div class="card-limit-form__form-group">
                            <label>{{ $t('card.cycle_settings') }}</label>
                            <el-radio-group v-model="formData.cycleType" class="radio-group" disabled>
                                <el-radio label="1">{{ $t('card.natural_day') }}</el-radio>
                                <el-radio label="0">{{ $t('card.natural_month') }}</el-radio>
                            </el-radio-group>
                        </div>
                        <div v-if="formData.cycleType === '1'" class="card-limit-form__form-group">
                            <label>{{ $t('card.natural_day_settings') }}</label>
                            <el-input v-model="formData.cycleDay" class="input-302px" placeholder="1-28"></el-input>
                        </div>
                    </template>

                    <template v-if="formData.type === '0'">
                        <div class="card-limit-form__form-group">
                            <label>{{ $t('card.expiration_date') }}</label>
                            <el-date-picker
                                v-model="dateRange"
                                type="daterange"
                                range-separator="-"
                                class="input-302px"
                                :start-placeholder="$t('card.start')"
                                :end-placeholder="$t('card.end')"
                                value-format="yyyy-MM-dd"
                                @change="updateDateRange"
                                disabled
                            >
                            </el-date-picker>
                        </div>
                    </template>

                    <div>
                        <div class="card-limit-form__form-group">
                            <label>{{ $t('card.max_tradeaction') }}</label>
                            <el-input
                                class="input-302px"
                                v-model="formData.maxNum"
                                :placeholder="formData.type === '2' ? '1' : ''"
                            ></el-input>
                        </div>
                        <div class="card-limit-form__form-group">
                            <label>{{ $t('card.card_limits') }}</label>
                            <el-input class="input-302px" v-model="formData.maxAmount"></el-input>
                        </div>
                    </div>

                    <div class="button-group">
                        <el-button @click="closeModal">{{ $t('card.cancel') }}</el-button>
                        <el-button type="primary" @click="confirmLimit">{{ $t('card.confirmd') }}</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getVpaScene } from "@/api/card";

export default {
    name: 'CardLimitModal',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        initialData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            usageTypes: [
                { value: '1', labelKey: 'periodic_use', descriptionKey: 'preipdic_desc' },
                { value: '0', labelKey: 'time_linited_use', descriptionKey: 'time_limit_desc' },
                { value: '2', labelKey: 'signle_use', descriptionKey: 'signle_use_desc' },
            ],
            formData: {
                type: '1',
                cycleType: '0',
                cycleDay: '',
                startTime: '',
                endTime: '',
                maxNum: '',
                maxAmount: ''
            }
        };
    },
    computed: {
        selectedUsageType() {
            return this.usageTypes.find(type => type.value === this.formData.type) || {};
        },
        dateRange: {
            get() {
                return [this.formData.startTime, this.formData.endTime];
            },
            set() {
                // Do nothing, as we don't want to allow changes
            }
        }
    },
    watch: {
        visible(newValue) {
            if (newValue) {
                this.fetchSceneData();
            }
        }
    },
    methods: {
        async fetchSceneData() {
            try {
                const response = await getVpaScene({ id: this.initialData.sceneId });
                const sceneData = response.data;
                this.formData = { ...this.formData, ...sceneData };
            } catch (error) {
                console.error('Error fetching scene data:', error);
            }
        },
        closeModal() {
            this.$emit('update:visible', false);
        },
        confirmLimit() {
            this.$emit('confirm', this.formData);
        },
        selectUsageType(value) {
            this.formData.type = value;
        },
        updateDateRange(value) {
            if (value) {
                [this.formData.startTime, this.formData.endTime] = value;
            } else {
                this.formData.startTime = '';
                this.formData.endTime = '';
            }
        }
    }
};
</script>

<style scoped>
.modal-overlay {
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

.modal-container {
    background-color: #fff;
    border-radius: 8px;
    width: 684px;
    max-width: 684px;
    padding: 20px 32px 32px 32px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
}

.modal-title {
    font-weight: 500;
    font-size: 24px;
    color: #211F32;
    line-height: 30px;
    text-align: right;
    font-style: normal;
}

.close-icon {
    cursor: pointer;
    width: 16px;
    height: 15px;
}

.card-limit-form {
    font-family: Arial, sans-serif;
}

.card-limit-form__usage-types {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    width: 100%;
}

.card-limit-form__usage-type {
    flex: 1;
    padding: 16px 20px;
    border: 1px solid rgba(219, 223, 234, 1);
    border-radius: 12px;
    text-align: center;
    cursor: pointer;
    margin-right: 16px;
}

.card-limit-form__usage-type:last-child {
    margin-right: 0;
}

.card-limit-form__usage-type--selected {
    border: 2px solid #7F8DFF;
}

.h3_label_1 {
    font-weight: 500;
    font-size: 14px;
    color: #364A63;
    line-height: 16px;
    text-align: left;
    font-style: normal;
    margin-bottom: 6px;
}

.p_label_1 {
    font-weight: 400;
    font-size: 12px;
    color: #8094AE;
    line-height: 14px;
    text-align: left;
    font-style: normal;
}

.card-limit-form__form-group {
    margin-bottom: 16px;
}

.radio-group {
    display: flex;
    gap: 20px;
    margin-top: 10px;
}

.card-limit-form__form-group label {
    display: block;
    margin-bottom: 7px;
    font-weight: 400;
    font-size: 14px;
    color: #526484;
    line-height: 18px;
    text-align: left;
    font-style: normal;
}

.input-302px {
    width: 302px !important;
    font-size: 14px;
}

.button-group {
    display: flex;
    justify-content: flex-end;
    margin-top: 22px;
}

.button-group .el-button {
    width: 90px;
}
</style>

