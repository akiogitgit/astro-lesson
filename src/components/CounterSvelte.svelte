<script>
  let count = 0
</script>

<h1>Svelt</h1>
<div>{count}</div>
<div>
  <button on:click={()=> count++}>UP</button>
  <button on:click={()=> count--}>DOWN</button>
</div>