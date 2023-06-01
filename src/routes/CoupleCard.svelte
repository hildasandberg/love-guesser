<script lang="ts">
	import { Motion, useSpring, useMotionTemplate } from 'svelte-motion';
	import type { Couple } from '../types/couple.type';
	import { fade, fly } from 'svelte/transition';
	import { getImage } from '../constants/peopleImages';
	export let visible: boolean;
	export let couple: Couple;
	export let handleRightSwipe: () => void;
	export let handleLeftSwipe: () => void;

	export let height: number;
	export let width: number;

	let swiped: boolean = false;
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

	let out = 200;

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
			if (xoffset > width * 0.5) {
				out = width;
				swiped = true;
				handleRightSwipe();
			}
			if (xoffset < -(width * 0.5)) {
				out = -width;
				swiped = true;
				handleLeftSwipe();
			}
		}
	};

	const goBackToStartCoordinates = () => {
		x.set(0);
		y.set(0);
	};

	const handlePanEnd = () => {
		if (!swiped) {
			goBackToStartCoordinates();
		}
	};
</script>

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
				<div
					class="image-container"
					style="width:{width}px; height: {height}px; background-image: url({getImage(
						couple.id
					)}); background-position: center;"
				/>
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
</style>
