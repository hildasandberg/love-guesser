<script lang="ts">
	import { Motion, useSpring, useMotionTemplate } from 'svelte-motion';
	import type { People } from '../types/couple.type';
	import { fade, fly } from 'svelte/transition';
	import { getImage } from '../constants/peopleImages';
	export let visible: boolean;
	export let couple: People;
	export let handleRightSwipe: () => void;
	export let handleLeftSwipe: () => void;

	export let height: number;
	export let width: number;
	export let out: number;

	let swiped: boolean = false;
	let goingRight: boolean = false;
	let goingLeft: boolean = false;
	let springProps = { damping: 115, stiffness: 600, mass: 8 };

	// store the pan information into a motion value
	const y = useSpring(0, springProps);
	const yt = useMotionTemplate`calc(${y}px - 50%)`;
	const x = useSpring(0, springProps);
	const xt = useMotionTemplate`calc(${y}px - 50%)`;

	// save where the motion value started in onPanStart
	let ypanoffset = 0;
	let xpanoffset = 0;
	const handlePanStart = () => {
		console.log('started panning');
		// ypanoffset = y.get();
		// xpanoffset = x.get();
	};

	// let out = 200;

	// called onPan:
	const handlePanMove = async (e, info) => {
		if (swiped === false) {
			// setY
			const yoffset = info.offset.y;
			const yy = Math.sign(yoffset) * Math.pow(Math.abs(yoffset), 1.1);
			y.set(yy + ypanoffset);
			// setX
			const xoffset = info.offset.x;
			const xx = Math.sign(xoffset) * Math.pow(Math.abs(xoffset), 1.1);
			x.set(xx + xpanoffset);
			console.log(xoffset);
			if (xoffset < width * 0.2 && xoffset > -(width * 0.2)) {
				goingRight = false;
				goingLeft = false;
			}
			if (xoffset > width * 0.2) {
				out = width;
				goingRight = true;
				goingLeft = false;
			}
			if (xoffset < -(width * 0.2)) {
				out = -width;
				goingLeft = true;
				goingRight = false;
			}
			// if (xoffset > width * 0.5) {
			// 	out = width;
			// 	swiped = true;
			// 	handleRightSwipe();
			// }
			// if (xoffset < -(width * 0.5)) {
			// 	out = -width;
			// 	swiped = true;
			// 	handleLeftSwipe();
			// }
		}
	};

	const goBackToStartCoordinates = () => {
		x.set(0);
		y.set(0);
	};

	const handlePanEnd = () => {
		if (goingLeft) {
			swiped = true;
			handleLeftSwipe();
		} else if (goingRight) {
			swiped = true;
			handleRightSwipe();
		} else goBackToStartCoordinates();
		if (!swiped) {
			goBackToStartCoordinates();
		}
	};

	function getImageUrl(name: string) {
		return new URL(`../lib/images/${name}.png`, import.meta.url).href;
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" />
</svelte:head>

{#if visible}
	<div
		class="couple-card"
		in:fade
		out:fly={{ x: `${out}`, duration: 2000 }}
		on:introstart={() => console.log('intro started')}
		on:outrostart={() => console.log('outro started')}
		on:introend={() => console.log('intro ended')}
		on:outroend={() => console.log('outro ended')}
		style="width: {width}px"
	>
		<Motion
			let:motion={inner}
			onPanStart={handlePanStart}
			onPan={handlePanMove}
			onPanEnd={handlePanEnd}
		>
			<div
				use:inner
				draggable="false"
				class="unselectable card-container"
				style="transform: translate({$x}px,{$y}px); width: {width}px"
			>
				<!-- <div
					class="image-container"
					style="width:{width}px; height: {height}px; background-image: url({getImageUrl(
						couple.name
					)}); background-position: center;"
				/> -->
				<!-- <div
					class="image-container"
					style="width:{width}px; height: {height}px; background-image: url({getImage(
						couple.id
					)}); background-position: center;"
				/> -->
				<div
					class="image-container"
					style="width:{width}px; height: {height}px; background-image: url({getImage(
						couple.id
					)}); background-position: center;"
				>
					{#if goingLeft}
						<Motion let:motion whileHover={{ scale: 1.2 }} whileTap={{ rotate: 45 }}>
							<div transition:fade use:motion class="false-icon-container">
								<i class="mi mi-close"><span class="u-sr-only">Cross-icon</span></i>
							</div>
						</Motion>
					{/if}
					{#if goingRight}
						<Motion let:motion whileHover={{ scale: 1.2 }} whileTap={{ rotate: 45 }}>
							<div transition:fade use:motion class="true-icon-container">
								<i class="mi mi-heart"><span class="u-sr-only">Heart-icon</span></i>
							</div>
						</Motion>
					{/if}
				</div>
				<div class="name-container">
					{couple.name}
				</div>
			</div>
		</Motion>
	</div>
{/if}

<style>
	.couple-card {
		position: relative;
		margin: auto;
		touch-action: none;
	}
	.card-container {
		cursor: grab;
		position: absolute;
	}
	.unselectable {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.image-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: auto;
		background-size: cover;
		background-color: white;
		border-radius: 14px 14px 0 0;
	}
	.name-container {
		background-color: white;
		padding: 14px;
		text-align: center;
		font-family: 'Abril Fatface', cursive;
		border-radius: 0 0 14px 14px;
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
		font-size: 10rem;
	}
	.u-sr-only {
		position: absolute;
		left: -10000px;
		top: auto;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}
</style>
