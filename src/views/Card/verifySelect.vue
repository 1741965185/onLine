<template>
	<div class="page flex-col">
		<div class="section_1 flex-col justify-center">
			<div class="box_1 flex-col ">
				<div class="section_2 flex-row">
					<img @click="goBack"
						class="label_1"
						referrerpolicy="no-referrer"
						src="./assets/img/SketchPngcf0409b4e46f3940a18dee8cef0a718f8e87f756e6ad8a6a090d89e68dd18479.png"
					/>
				</div>
			</div>
			<div class="section_3 flex-col">
				<span class="text_2">                  {{this.$t('translations.chooseAccountType')}}</span>
				<span class="text_3">{{this.$t('translations.authenticationCompleted')}}</span>
				<div class="box_5 flex-row justify-between">
					<div class="group_1 flex-col" @click="selectPerson">
						<span class="text_5">{{this.$t('translations.personalAccount')}}</span>
					</div>
					<div class="group_2 flex-col" 	@click="selectCompany">
						<span class="text_5">{{this.$t('translations.businessAccount')}}</span>

					</div>
				</div>

			</div>
		</div>
	</div>
</template>
<script>
import router from "@/router";

export default {
	data() {
		return {
			constants: {}
		};
	},
	methods: {
		selectCompany(){
			router.push({ path: '/companyVerification' });
		},
		selectPerson(){
			router.push({ path: '/personalVerification' });
		},
		goBack() {
			router.back();
		}
	}
};
</script>
<style scoped lang="css" src="../Verify/assets/common.css" />
<style scoped lang="css" src="../Verify/assets/verify_select.css" />