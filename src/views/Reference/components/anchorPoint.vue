<template>
	<!-- 侧边锚点 -->
	<div class="anchor-point-wrap">
		<div class="catalogue">目录</div>
		<a
			:href="'#' + item.id"
			class="anchor-point-one"
			:style="{ color: item.id === active ? '#8491ff' : '#526484' }"
			v-for="item in list"
			:key="item.id"
			@click.stop="setActive(item.id)"
		>
			{{ item.id }}. {{ item.title }}
			<a
				:href="'#' + _item.id"
				class="anchor-point-tow"
				:style="{ color: _item.id === active ? '#8491ff' : '#526484' }"
				v-for="_item in item.children"
				:key="_item.id"
				@click.stop="setActive(_item.id)"
			>
				{{ _item.title }}
				<a
					:href="'#' + __item.id"
					class="anchor-point-three"
					:style="{ color: __item.id === active ? '#8491ff' : '#526484' }"
					v-for="__item in _item.children"
					:key="__item.id"
					@click.stop="setActive(__item.id)"
					>{{ __item.title }}</a
				>
			</a>
		</a>
	</div>
</template>
<script>
export default {
	props: ["list"],
	data() {
		return {
			active: -1,
		};
	},
	methods: {
		setActive(id) {
			this.active = id;
		},
	},
};
</script>
<style lang="less" scoped>
.anchor-point-wrap {
	width: 180px;
	height: 100%;
	border-left: 1px solid #dbdfea;
	box-sizing: border-box;
	padding: 15px 0 15px 15px;
	overflow: scroll;

	.catalogue {
		font-size: 14px;
		line-height: 20px;
	}

	.anchor-point-one {
		font-size: 12px;
		line-height: 20px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;

		.anchor-point-tow {
			margin: 0 0 0 10px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			cursor: pointer;

			.anchor-point-three {
				margin: 0 0 0 10px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				cursor: pointer;
			}
		}
	}
}
a {
	display: block;
}
</style>