<template>
    <div class="input-group color-picker module module-settings">
        <label class="pr-4 pb-2">{{ label }}</label>
		<div ref="colorpicker" class="flex items-center">
			<input type="text" ref="colourInput" class="form-control text-gray-800 w-full border-2 p-2" v-model="colorValue" @focus="showPicker()" @input="updateFromInput" />
			<span class="input-group-addon flex items-center px-2 color-picker-container">
				<span class="current-color" :style="'background-color: ' + colorValue" @click="togglePicker()"></span>
				<chrome-picker :value="colorValue" @input="updateFromPicker" v-if="displayPicker" />
			</span>
   	 	</div>
    </div>
</template>
<script>
import { Chrome } from 'vue-color'
import componentCRUD from '../../mixins/componentCRUD';

export default {
    components: {
		'chrome-picker': Chrome,
	},
    props: {
        color: String,
		label: String,
		path: {
			type: String,
			default: 'inline'
		},
		attribute: {
			type: String,
			default: 'backgroundColor'
		}
    },
	data() {
		return {
			colors: {
				hex: '',
			},
			colorValue: '',
			displayPicker: false,
		}
	},
	mixins: [componentCRUD],
	mounted() {
		this.setColor(this.color || (this.component.inline.backgroundColor ? this.component.inline.backgroundColor : ''));
	},
	methods: {
		setColor(color) {
			this.updateColors(color);
			this.colorValue = color;
		},
		updateColors(color) {
			if(color.slice(0, 1) == '#') {
				this.colors = {
					hex: color
				};
			}
			else if(color.slice(0, 4) == 'rgba') {
				var rgba = color.replace(/^rgba?\(|\s+|\)$/g,'').split(','),
					hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1);
				this.colors = {
					hex: hex,
					a: rgba[3],
				}
			}
		},
		showPicker() {
			document.addEventListener('click', this.documentClick);
			this.displayPicker = true;
		},
		hidePicker() {
			document.removeEventListener('click', this.documentClick);
			this.displayPicker = false;
		},
		togglePicker() {
			this.displayPicker ? this.hidePicker() : this.showPicker();
		},
		updateFromInput() {
			this.updateColors(this.colorValue);
		},
		updateFromPicker(color) {
			this.colors = color;
			if(color.rgba.a == 1) {
				this.colorValue = color.hex;
			}
			else {
				this.colorValue = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')';
			}
		},
		documentClick(e) {
			if (e) {
				let el = this.$refs.colorpicker,
					target = e.target;
				if((el !== target && !el.contains(target))) {
					this.hidePicker()
				}
			}
		}
	},
	watch: {
		colorValue(val) {
			if(val) {
				this.updateColors(val);
				this.$emit('input', val);
				this.updateStoreComponent({ path: this.path, prop: this.colorValue})
			}
		}
	}    
}
</script>
<style scoped>
.vc-chrome {
	position: absolute;
	right: 56px;
	z-index: 9;
}
.current-color {
	display: inline-block;
	width: 16px;
	height: 16px;
	background-color: #000;
	cursor: pointer;
}
</style>