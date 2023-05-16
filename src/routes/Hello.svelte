<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Couple } from '../types/couple.type';
	import CoupleCard from './CoupleCard.svelte';
	import { Motion } from 'svelte-motion';

	export let couples: Couple[];
	let currentCoupleIndex: number = 0;

	const nextCouple = () => {
		if (currentCoupleIndex === couples.length - 1) {
			endSwipeShow();
		}

		currentCoupleIndex = ++currentCoupleIndex;
		console.log(currentCoupleIndex);
	};

	const handleRightSwipe = () => {
		console.log('hello from right swipe');
		nextCouple();
	};

	const handleLeftSwipe = () => {
		console.log('hello from left swipe');
		nextCouple();
	};

	let end: boolean = false;
	const endSwipeShow = () => {
		end = true;
	};
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" />
</svelte:head>

<div class="hello">
	{#if !end}
		<Motion let:motion whileHover={{ scale: 1.2 }} whileTap={{ rotate: 45 }}>
			<div
				transition:fade
				use:motion
				class="false-icon-container mobile-hide"
				on:click={handleLeftSwipe}
			>
				<i class="mi mi-close"><span class="u-sr-only">Cross-icon</span></i>
			</div>
		</Motion>
	{/if}

	<div>
		{#if end}
			<div class="end-text-container">
				<p class="end-text">Tack för att du swipeade</p>
			</div>
		{:else}
			{#each couples as couple, i}
				<CoupleCard
					{couple}
					{handleRightSwipe}
					{handleLeftSwipe}
					visible={currentCoupleIndex === i}
				/>
			{/each}
		{/if}
	</div>

	{#if !end}
		<Motion let:motion whileHover={{ scale: 1.2 }} whileTap={{ rotate: 45 }}>
			<div
				transition:fade
				use:motion
				class="true-icon-container mobile-hide"
				on:click={handleRightSwipe}
			>
				<i class="mi mi-heart"><span class="u-sr-only">Heart-icon</span></i>
			</div>
		</Motion>
	{/if}
</div>

<style>
	.hello {
		position: relative;
		width: 100vw;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 2em;
		/* width: 100%; */
		min-height: 400px;
	}
	.end-text {
		font-size: 36px;
		text-align: center;
		color: white;
		font-family: 'Abril Fatface', cursive;
		margin-top: 0;
		text-shadow: black 1px 0 10px;
		height: 400;
		height: 400;
		width: 800;
	}
	.false-icon-container {
		display: flex;
		color: white;
		justify-content: center;
		align-items: center;
		margin: 1em;
		cursor: pointer;
	}
	.true-icon-container {
		display: flex;
		color: white;
		justify-content: center;
		align-items: center;
		margin: 1em;
		cursor: pointer;
	}
	.end-text-container {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
	.mi {
		font-size: 5rem;
	}

	/* Use this to make sure screen readers read something sensible when encountering the mi. If you are using the icons decoratively, you can omit the <span> */
	.u-sr-only {
		position: absolute;
		left: -10000px;
		top: auto;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}
	@media only screen and (max-width: 900px) {
		.mobile-hide {
			visibility: hidden;
		}
		/* .hello {
			position: relative;
			flex-direction: column;
			min-height: 400px;
		} */
	}
</style>
