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
    };
  },
  methods: {
    create: function() {
      const number_of_steps = parseInt(this.number_of_steps, 10);

      parent.postMessage({ pluginMessage: { type: 'create-steps', number_of_steps, } }, '*')
    },
    cancel: function() {
      parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
    }
  },
  created() {}
};
</script>

<style>
</style>