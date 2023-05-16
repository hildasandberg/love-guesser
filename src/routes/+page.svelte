<script lang="ts">
	import { Motion } from 'svelte-motion';
	import Hello from './Hello.svelte';
	import type { Couple } from '../types/couple.type';
	import { fade, fly } from 'svelte/transition';

	// import BgImage from '$lib/images/heart_bg.jpg';
	import BgImage from '$lib/images/jonathan-borba-qRNctETJJ_c-unsplash.jpg';
	export const couples: Couple[] = [
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
		}
	];

	let start: boolean = false;
	let name: string;

	const startSwipeShow = () => {
		setTimeout(() => {
			start = true;
		}, 1000);
	};
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Inter&family=Quicksand&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<body>
	<div class="container" style="background-image: url({BgImage}) ">
		<h1>Gift vid första ögonkastet</h1>
		<p class="text">Vilka av paren fortsätter vara gifta?</p>

		{#if !start}
			<p class="text">Skriv ditt namn för att börja</p>
			<input class="name-input" bind:value={name} />
		{/if}

		{#if name}
			<Motion let:motion whileHover={{ scale: 1.2 }} whileTap={{ rotate: 45 }}>
				<button transition:fade class="start-button" use:motion on:click={startSwipeShow}
					>Börja swipea</button
				>
			</Motion>
		{/if}

		{#if start}
			<Hello {couples} />
		{/if}
	</div>
</body>

<style>
	body {
		padding: 0;
		margin: 0;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 2em;
		color: black;
		height: 100vh;
		width: 100vw;
		padding-top: 200px;
		/* background-position: 'bottom'; */
		/* background-position: 'center'; */
		background-position: bottom;
		background-size: cover;
		background-repeat: no-repeat, repeat;
	}
	h1 {
		font-size: 2em;
		text-align: center;
		color: white;
		font-family: 'Abril Fatface', cursive;
		margin-bottom: 0;
		text-shadow: black 1px 0 10px;
	}
	.text {
		font-size: 1em;
		text-align: center;
		color: white;
		/* color: black; */
		font-family: 'Quicksand', sans-serif;
		margin-top: 20px;
		text-shadow: black 1px 0 10px;
		/* text-shadow: #fff 1px 0 5px; */
	}
	.name-input {
		font-size: 1em;
		padding: 20px 20px;
		border: 0;
		border-radius: 10px;
		font-family: 'Quicksand', sans-serif;
	}
	.start-button {
		font-size: 1.2em;
		padding: 0.6em;
		/* padding-left: 1.4em;
		padding-right: 1.4em; */
		margin: auto;
		margin-top: 2em;
		border: 0;
		border-radius: 0.2em;
		font-family: 'Abril Fatface', cursive;
		box-shadow: black 10px 0 10px;
		background-color: cornsilk;
	}
	.start-button:hover {
		opacity: 1;
	}
	@media only screen and (max-width: 480px) {
		.container {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 2em;
			color: black;
			height: 100vh;
			width: 100vw;
			padding-top: 20px;
			padding: 20px;
			/* background-position: 'bottom'; */
			/* background-position: 'center'; */
			background-position: bottom;
			background-size: cover;
			background-repeat: no-repeat, repeat;
		}
	}
</style>
