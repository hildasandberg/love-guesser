<script lang="ts">
	import { Motion, useSpring, useMotionTemplate } from 'svelte-motion';
	import type { Couple } from '../types/couple.type';
	import { fade, fly } from 'svelte/transition';
	export let visible: boolean;
	export let couple: Couple;
	export let handleRightSwipe: () => void;
	export let handleLeftSwipe: () => void;

	let height: number = 400;
	let swiped: boolean = false;
	let hide: boolean = false;
	let width: number = 2 * height;
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
			if (xoffset > width * 0.9) {
				swiped = true;
				handleRightSwipe();
			}
			if (xoffset < width * -0.9) {
				swiped = true;
				handleLeftSwipe();
			}
		}
	};

	const goBackToStartCoordinates = () => {
		x.set(0 - width / 2);
		y.set(0);
	};

	const handlePanEnd = (e, info) => {
		console.log('panning end');
		goBackToStartCoordinates();
	};
</script>

{#if visible}
	<div class="couple-card" transition:fade>
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
				style="transform: translate({$x}px,{$y}px)"
			>
				<div class="image-container" style="background-image: url({couple.image})" />
				<div>
					{couple.name}
				</div>
			</div>
		</Motion>
	</div>
{/if}

<style>
	.couple-card {
		position: relative;
		min-width: 600px;
		/* width: 100%; */
		margin: auto;
		background-color: blue;
		/* touch-action: none; */
	}

	.card-container {
		cursor: grab;
		position: absolute;
		left: 50%;
		/* transform: translateX(-50%); */
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
		/* width: 100%; */
		width: 600px;
		min-height: 400px;
		margin: auto;
		background-size: cover;
		background-color: white;
	}
</style>
