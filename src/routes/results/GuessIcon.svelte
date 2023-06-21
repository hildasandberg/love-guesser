<script lang="ts">
	export let guess: boolean;
	export let result: boolean | undefined;

	console.log('guess', guess, 'result', result);
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" />
</svelte:head>

<div>
	{#if guess === true}
		<div class={`icon-container ${guess === result ? 'correct' : 'true'}`}>
			<i class="mi mi-heart" />
		</div>
	{/if}

	{#if guess === false}
		<div class={`icon-container ${guess === result ? 'correct' : 'false'}`}>
			<i class="mi mi-close" />
		</div>
	{/if}
</div>

<style>
	.icon-container {
		height: 25px;
		width: 25px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.correct {
		background-color: darkseagreen;
		border: 1px solid darkseagreen;
		border-radius: 50%;
		color: white;
	}
	.mi {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 20px;
		width: 20px;
		padding: 0;
		margin: 0;
	}
	.true {
		color: red;
	}
	.false {
		color: black;
	}
</style>
