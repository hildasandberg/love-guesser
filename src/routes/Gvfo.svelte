<script lang="ts">
	import { Motion } from 'svelte-motion';
	import Hello from './Hello.svelte';
	import { addDoc, collection, query, getDocs } from 'firebase/firestore';
	import { db, poepleRef } from '../firebase';
	import { onMount } from 'svelte';
	import PageContainer from './PageContainer.svelte';

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
		people = [];
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
<div class="gvfo">
	<PageContainer>
		<p class="text">Vem vill fortsätta vara gift?</p>
		{#if start}
			<Hello couples={people} {userId} />
		{/if}
		{#if !start}
			<p class="text">Skriv ditt namn för att börja</p>
			<input class="name-input" placeholder="Ditt namn" bind:value={name} />
			<Motion let:motion whileHover={{ scale: 1.2 }} whileTap={{ rotate: 45 }}>
				<button disabled={!name} class="start-button" use:motion on:click={startSwipeShow}
					>Börja swipea</button
				>
			</Motion>
		{/if}
	</PageContainer>
</div>

<style>
	.text {
		font-size: 1.5rem;
		text-align: center;
		color: white;
		font-family: 'Quicksand', sans-serif;
		margin-top: 20px;
		text-shadow: gainsboro 1px 0 10px;
	}
	.name-input {
		font-size: 1rem;
		width: 200px;
		color: black;
		padding: 20px 20px;
		border: 0;
		border-radius: 10px;
		font-family: 'Quicksand', sans-serif;
	}
	.start-button {
		font-size: 1.5em;
		width: 250px;
		padding: 15px 40px;
		/* padding-left: 1.4em;
		padding-right: 1.4em; */
		margin: auto;
		margin-top: 2em;
		border: 0;
		border-radius: 10px;
		font-family: 'Abril Fatface', cursive;
		box-shadow: gainsboro 1px 0 10px;
		box-shadow: 10px 0 10px;
		background-color: red;
		/* background-color: cornsilk; */
	}
	.start-button:hover {
		opacity: 1;
	}
</style>
