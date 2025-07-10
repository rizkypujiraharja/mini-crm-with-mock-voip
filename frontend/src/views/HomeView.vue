<template>
  <div>
    <h1>Home</h1>

    <a-button type="primary">
      Primary
    </a-button>


    <a-range-picker @change="onChange" />
    <br />
  </div>
</template>

<script>
export default {
  methods: {
    onChange(e) {
      console.log(e)
    }
  }
}
</script>