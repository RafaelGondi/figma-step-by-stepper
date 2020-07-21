<template>
	<div>
		<div class="content">
			<div class="input-group">
				<label>Number of steps: </label>
				<input
					type="number"
					v-model.number="number_of_steps"
					value="3"
				/>
			</div>
			<span
				class="validation-message"
				v-if="number_of_steps <= 0"
			>
				The number of steps must be greater than 0
			</span>

			<div class="input-group">
				<label>Width / heigth (in px):</label>
				<input
					type="number"
					v-model.number="size"
					value="28"
				/>
			</div>
			<span
				class="validation-message"
				v-if="size <= 0"
			>
				The width and heigth must be greater than 0px
			</span>

			<div class="input-group">
				<label>Spacing (in px):</label>
				<input
					type="number"
					v-model.number="spacing"
					value="48"
				/>
			</div>
			<span
				class="validation-message"
				v-if="spacing < 0"
			>
				The Spacing must be greater than or equal to 0px
			</span>

			<div class="input-group">
				<label>Active step (Starts by 1):</label>
				<input
					type="number"
					v-model.number="active_step"
					value="1"
				/>
			</div>
			<span
				class="validation-message"
				v-if="active_step > number_of_steps"
			>
				{{ `The active step must be greater than 1 and leasser than ${number_of_steps}` }}
			</span>

			<div class="input-group">
				<label>Direction</label>
				<br>
				<input type="radio" id="horizontal" value="horizontal" v-model="direction">
				<label style="font-size: 1rem" for="horizontal">Horizontal</label>
				<br>
				<input type="radio" id="vertical" value="vertical" v-model="direction">
				<label style="font-size: 1rem" for="vertical">Vertical</label>
			</div>
		</div>

		<div class="footer">
			<button @click="cancel">Cancel</button>
			<button id="create" @click="create">Create</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "App",
	data() {
		return {
			number_of_steps: 3,
			size: 28,
			spacing: 48,
			active_step: 1,
			direction: 'horizontal',
		};
	},
	methods: {
		create: function() {
			const number_of_steps = parseInt(this.number_of_steps, 10);
			const size = parseInt(this.size, 10);
			const spacing = parseInt(this.spacing, 10);
			const active_step = parseInt(this.active_step, 10);
			const direction = this.direction;

			if (
				number_of_steps > 0
				&& size > 0
				&& spacing >= 0
				&& active_step < number_of_steps
			) {
				parent.postMessage({ pluginMessage: { type: 'create-steps', number_of_steps, size, spacing, active_step, direction } }, '*')
			}

		},
		cancel: function() {
			parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
		}
	},
	created() {},
};
</script>

<style>
#app {
	font-family: "Muli", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	margin-top: 60px;
}

.content {
	font: 12px sans-serif;
	margin: 20px;
}

button {
	border-radius: 5px;
	background: white;
	color: black;
	border: none;
	padding: 8px 15px;
	margin: 0 5px;
	box-shadow: inset 0 0 0 1px black;
	outline: none;
}

#create {
	box-shadow: none;
	background: #18a0fb;
	color: white;
}

input[type=number] {
	display: block;
	width: 100%;
	height: calc(1.5em + .75rem + 2px);
	padding: .375rem .75rem;
	font-size: 1rem;
	font-weight: 400;
	line-height: 1.5;
	color: #495057;
	background-color: #fff;
	background-clip: padding-box;
	border: 1px solid #ced4da;
	border-radius: .25rem;
	transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
	outline-color: transparent !important;
	margin-top: 4px;
}

input[type=number]:hover {
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}

button:focus {
	box-shadow: inset 0 0 0 2px #18a0fb;
}

#create:focus {
	box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.3);
}

input[type=number]:focus {
	background-color: #fff;
	border-color: #80bdff;
	outline: 0;
	box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}

.input-group {
	margin: 16px 0px;
}

.validation-message {
	color: #ff4756;
}

.footer {
	margin-top: 24px;
	display: flex;
	justify-content: flex-end;
}
</style>