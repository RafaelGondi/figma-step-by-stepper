<template>
	<div>
		<h2>Stepper Creator</h2>
		<div class="input-group">
			<label>Number of steps: </label>
			<input
				type="number"
				v-model.number="number_of_steps"
				value="3"
			/>
		</div>

		<div class="input-group">
			<label>Width / heigth (in px):</label>
			<input
				type="number"
				v-model.number="size"
				value="28"
			/>
		</div>

		<div class="input-group">
			<label>Spacing</label>
			<input
				type="number"
				v-model.number="spacing"
				value="48"
			/>
		</div>

		<div class="input-group">
			<label>Active step (Starts by 1)</label>
			<input
				type="number"
				v-model.number="active_step"
				value="1"
			/>
		</div>

		<button @click="cancel">Cancel</button>
		<button id="create" @click="create">Create</button>
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
		};
	},
	methods: {
		create: function() {
			const number_of_steps = parseInt(this.number_of_steps, 10);
			const size = parseInt(this.size, 10);
			const spacing = parseInt(this.spacing, 10);
			const active_step = parseInt(this.active_step, 10);

			parent.postMessage({ pluginMessage: { type: 'create-steps', number_of_steps, size, spacing, active_step } }, '*')
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

body {
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
</style>