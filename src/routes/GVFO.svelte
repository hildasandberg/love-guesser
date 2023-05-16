<script lang="ts">
	import { Motion, useSpring, useMotionTemplate } from 'svelte-motion';
	const couples = [
		{ id: 0, name: 'start', image: '' },
		{
			id: 1,
			name: 'arvid-ida',
			image: 'https://clicklovegrow.com/wp-content/uploads/2018/06/Dana-Whitley3.jpg'
		},
		{
			id: 2,
			name: 'agust-carro',
			image:
				'https://images.unsplash.com/photo-1637870996864-65dc1c00f4dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bG92ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60'
		},
		{
			id: 3,
			name: 'lina-alex',
			image:
				'https://plus.unsplash.com/premium_photo-1664442394234-0e30ddf29a9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bG92ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60'
		},
		{
			id: 4,
			name: 'stina-fredrik',
			image:
				'https://images.unsplash.com/photo-1513279922550-250c2129b13a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGxvdmV8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60'
		},
		{ id: 5, name: 'end', image: '' }
	];

	let x = useSpring(0, { stiffness: 300 });
	let y = useSpring(x, { damping: 10 });
	$: coords = { x, y };

	const y = useSpring(0, springProps);
	const yt = useMotionTemplate`calc(${y}px - 50%)`;

	// save where the motion value started in onPanStart
	let ypanoffset = 0;
	let xpanoffset = 0;
	const handlePanStart = (e, info) => {
		console.log('panning start', info);
		ypanoffset = y.get();
		xpanoffset = x.get();
		console.log('panning start', info);
	};

	function handlePanMove(e, info) {
		// console.log('panning', info);

		const setY = () => {
			const offset = info.offset.y;
			const yy = Math.sign(offset) * Math.pow(Math.abs(offset), 1.1);
			y.set(yy + ypanoffset);
		};
		const setX = () => {
			const offset = info.offset.x;
			const xx = Math.sign(offset) * Math.pow(Math.abs(offset), 1.1);
			x.set(xx + xpanoffset);
		};

		setY();
		setX();
	}

	function handlePanEnd(event) {
		// x.stiffness = 0.2;
		// coords.damping = 0.4;
		// x.set(0);
		// y.set(0);
	}
</script>

<!-- z-index: {couples.length - i}" -->
<div class="gvfo">
	<Motion
		let:motion={outer}
		onPanStart={handlePanStart}
		onPan={handlePanMove}
		onPanEnd={handlePanEnd}
	>
		<!-- <div use:outer class="box" style="transform: translate({x},{y})" /> -->
		<div use:outer class="box" style="top: {coords.y}, bottom: {coords.x})" />
	</Motion>
	<div>
		{x}
		<br />
		{y}
	</div>

	<!-- <Motion let:motion={outer}>
		<div class="container" use:outer>
			{#each couples as couple, i}
				<Motion let:motion={inner} {onPanStart} onPan={setY} onPanEnd={() => console.log('end')}>
					<div
						use:inner
						class="card-container"
						style="background-image: url({couple.image}), z-index: {100 - i}, y: {yt}, x: {xt} }"
					>
						<div class="image-container" style="background-image: url({couple.image})">
							{couple.name}
						</div>
					</div>
				</Motion>
			{/each}
		</div>
	</Motion> -->
</div>

<style>
	.box {
		--width: 100px;
		--height: 100px;
		position: absolute;
		width: var(--width);
		height: var(--height);
		left: calc(50% - var(--width) / 2);
		top: calc(50% - var(--height) / 2);
		border-radius: 4px;
		background-color: #ff3e00;
		cursor: move;
	}
	.gvfo {
		position: relative;
	}
	.container {
		position: relative;
		z-index: -100;
	}
	.card-container {
		width: 600px;
		height: 400px;
		position: absolute;
		/* opacity: 0.5; */
		/* transform: scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px);
       /* opacity:(10 - index) / 10; */
	}
	.image-container {
		position: relative;
		width: 600px;
		height: 400px;
		background-size: cover;
		/* opacity: 0.5; */
		/* transform: scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px);
       /* opacity:(10 - index) / 10; */
	}
	/* .outer {
        overflow: hidden;
        position: relative;
        touch-action: none;
    }
    .inner {
        position: absolute;
        left: 50%;
        pointer-events: none;
    } */
</style>
