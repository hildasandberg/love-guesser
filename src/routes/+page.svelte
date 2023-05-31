<script lang="ts">
	import { Motion } from 'svelte-motion';
	import Hello from './Hello.svelte';
	import type { Couple } from '../types/couple.type';
	import { addDoc, collection } from 'Firebase/firestore';

	// import BgImage from '$lib/images/heart_bg.jpg';

	import BgImage from '$lib/images/jonathan-borba-qRNctETJJ_c-unsplash.jpg';
	import { db, firebaseConfig } from '../Firebase';
	export const couples: Couple[] = [
		{
			id: 1,
			name: 'Arvid',
			image: 'src/lib/images/arvid.png'
		},
		{
			id: 2,
			name: 'Ida',
			image: 'src/lib/images/ida.png'
		},
		{
			id: 3,
			name: 'Agust',
			image: 'src/lib/images/agust.png'
		},
		{
			id: 4,
			name: 'Carro',
			image: 'src/lib/images/carro.png'
		},
		{
			id: 5,
			name: 'Lina',
			image: 'src/lib/images/lina.png'
		},
		{
			id: 6,
			name: 'Alex',
			image: 'src/lib/images/alex.png'
		},
		{
			id: 7,
			name: 'Stina',
			image: 'src/lib/images/stina.png'
		},
		{
			id: 8,
			name: 'Fredrik',
			image: 'src/lib/images/fredrik.png'
		}
	];

	let start: boolean = false;
	let name: string;
	export let userId: string;

	const startSwipeShow = () => {
		saveName();
		setTimeout(() => {
			start = true;
		}, 1000);
	};

	async function saveName() {
		try {
			const docRef = await addDoc(collection(db, 'users'), { name: name });

			console.log(docRef);
			console.log(docRef.id);
			userId = docRef.id;
		} catch (error) {
			console.log(error);
		}
	}
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Inter&family=Quicksand&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<body>
	<div class="container" style="background-image: url({BgImage}) ">
		<h1>Gift vid första ögonkastet</h1>
		<p class="text">Vem vill fortsätta vara gift?</p>

		{#if !start}
			<p class="text">Skriv ditt namn för att börja</p>
			<input class="name-input" placeholder="Ditt namn" bind:value={name} />
			<Motion let:motion whileHover={{ scale: 1.2 }} whileTap={{ rotate: 45 }}>
				<button disabled={!name} class="start-button" use:motion on:click={startSwipeShow}
					>Börja swipea</button
				>
			</Motion>
		{/if}

		{#if start}
			<Hello {couples} {userId} />
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
		height: 100vh;
		width: 100vw;
		padding-top: 200px;
		background-position: bottom;
		background-size: cover;
		background-repeat: no-repeat, repeat;
	}
	h1 {
		font-size: 4rem;
		text-align: center;
		color: white;
		font-family: 'Abril Fatface', cursive;
		margin-bottom: 0;
		text-shadow: black 1px 0 10px;
	}
	.text {
		font-size: 1.5rem;
		text-align: center;
		color: white;
		font-family: 'Quicksand', sans-serif;
		margin-top: 20px;
		text-shadow: black 1px 0 10px;
	}
	.name-input {
		font-size: 1rem;
		color: black;
		padding: 20px 20px;
		border: 0;
		border-radius: 10px;
		font-family: 'Quicksand', sans-serif;
	}
	.start-button {
		font-size: 2em;
		padding: 0.6em;
		padding-left: 1.4em;
		padding-right: 1.4em;
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
			padding-top: 20px;
			/* padding: 20px; */
		}
	}
</style>
