<script lang="ts">
	export let answer: boolean;
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" />
</svelte:head>

<div>
	{#if answer === true}
		<div class="true-icon-container">
			<i class="mi mi-heart" />
		</div>
	{/if}

	{#if answer === false}
		<div class="false-icon-container">
			<i class="mi mi-close" />
		</div>
	{/if}
</div>

<style>
	.true-icon-container {
		color: red;
	}
	.false-icon-container {
		color: black;
	}
</style>
