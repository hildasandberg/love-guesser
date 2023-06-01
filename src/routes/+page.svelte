<script lang="ts">
	import { Motion } from 'svelte-motion';
	import Hello from './Hello.svelte';
	import { addDoc, collection, query, getDocs } from 'Firebase/firestore';

	import BgImage from '$lib/images/jonathan-borba-qRNctETJJ_c-unsplash.jpg';
	import { db, poepleRef } from '../Firebase';
	import { onMount } from 'svelte';

	let people: any[] = [];

	const getPeople = async () => {
		const q = query(poepleRef);
		const docs = await getDocs(q);
		{
			docs.forEach((d) => {
				console.log(d.data());
				people.push({ ...d.data() });
			});
		}
	};

	onMount(async () => {
		await getPeople();
	});

	let start: boolean = false;
	let name: string;
	export let userId: string;

	const startSwipeShow = async () => {
		await saveName();
		setTimeout(() => {
			start = true;
		}, 1000);
	};

	const saveName = async () => {
		try {
			const docRef = await addDoc(collection(db, 'users'), { name: name });

			console.log(docRef);
			console.log(docRef.id);
			userId = docRef.id;
		} catch (error) {
			console.log(error);
		}
	};
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
			<Hello couples={people} {userId} />
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
		padding-top: 100px;
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
