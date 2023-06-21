<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { People } from '../types/couple.type';
	import CoupleCard from './CoupleCard.svelte';
	import { Motion } from 'svelte-motion';
	import { setDoc, collection } from 'firebase/firestore';
	import { doc } from 'firebase/firestore';
	import { db } from '../firebase';

	export let couples: People[];
	export let userId: string;
	export let show: string;
	export let out = 200;

	export const width: number = 350;
	export const height: number = show === 'gvfo-sen' ? 1 * width : 1.4 * width;
	let currentCoupleIndex: number = 0;

	const nextCouple = () => {
		if (currentCoupleIndex === couples.length - 1) {
			endSwipeShow();
		}

		currentCoupleIndex = ++currentCoupleIndex;
		console.log(currentCoupleIndex);
	};

	const handleRightSwipe = async () => {
		out = width;
		saveAnswer(true);
	};

	const handleLeftSwipe = () => {
		out = -width;
		saveAnswer(false);
	};

	const saveAnswer = (guess: boolean) => {
		const person = couples[currentCoupleIndex];
		try {
			const docRef = doc(collection(db, 'users'), userId);
			setDoc(
				docRef,
				{
					[show]: {
						[person.name]: guess
					}
				},
				{ merge: true }
			);
		} catch (error) {
			console.log(error);
		}
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

<div class="swipe-container">
	<div class="container">
		{#if !end}
			<Motion let:motion whileHover={{ scale: 1.2 }} whileTap={{ rotate: 45 }}>
				<div
					transition:fade
					use:motion
					class="false-icon-container desktop-show"
					on:click={handleLeftSwipe}
				>
					<i class="mi mi-close"><span class="u-sr-only">Cross-icon</span></i>
				</div>
			</Motion>
		{/if}

		<div style="width: {width}px">
			{#if end}
				<div class="end-text-container">
					<p class="end-text" style="height: {height}px; width: {width}px;">
						Tack för att du swipeade
						<br />
						<a href={`/results/${show}`}>Se gissningar</a>
					</p>
				</div>
			{:else}
				{#each couples as couple, i}
					<CoupleCard
						{width}
						{height}
						{couple}
						{handleRightSwipe}
						{handleLeftSwipe}
						{out}
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
					class="true-icon-container desktop-show"
					on:click={handleRightSwipe}
				>
					<i class="mi mi-heart"><span class="u-sr-only">Heart-icon</span></i>
				</div>
			</Motion>
		{/if}
	</div>
</div>

<style>
	.swipe-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		font-size: 2em;
		min-height: 400px;
	}
	.container {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.end-text-container {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
	.end-text {
		font-size: 36px;
		text-align: center;
		color: white;
		font-family: 'Abril Fatface', cursive;
		margin-top: 0;
		text-shadow: black 1px 0 10px;
	}
	.false-icon-container {
		color: white;
		justify-content: center;
		align-items: center;
		margin: 4rem;
		cursor: pointer;
		display: flex;
		/* display: none; */
	}
	.true-icon-container {
		display: flex;
		color: white;
		justify-content: center;
		align-items: center;
		margin: 4rem;
		cursor: pointer;
		display: flex;
		/* display: none; */
	}

	.mi {
		font-size: 5rem;
	}

	a {
		font-size: 1.5rem;
		text-align: center;
		color: white;
		font-family: 'Quicksand', sans-serif;
		margin-top: 20px;
		text-shadow: black 1px 0 10px;
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
	@media only screen and (min-width: 900px) {
		.desktop-show {
			display: flex;
			color: white;
			justify-content: center;
			align-items: center;
			margin: 4rem;
			cursor: pointer;
		}
		/* .mobile-hide {
			display: none;
		} */
	}
</style>
