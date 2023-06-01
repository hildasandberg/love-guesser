<script lang="ts">
	import BgImage from '$lib/images/jonathan-borba-qRNctETJJ_c-unsplash.jpg';
	import { db } from '../../Firebase';
	import { query, getDocs, collection } from 'Firebase/firestore';
	import { getImage } from '../../constants/peopleImages';
	import GuessIcon from './GuessIcon.svelte';
	import { fade } from 'svelte/transition';

	let users: any[] = [];
	let results: any[] = [];

	const getGuesses = async () => {
		const q = query(collection(db, 'users'));
		const docs = await getDocs(q);
		{
			docs.forEach((d) => {
				console.log(d.data());
				users.push({ ...d.data() });
			});
		}
	};

	const getResults = async () => {
		const q = query(collection(db, 'shows', 'gvfo', 'people'));
		const docs = await getDocs(q);
		{
			docs.forEach((d) => {
				console.log(d.data());
				results.push({ ...d.data() });
			});
		}
		console.log(results);
	};

	const calculateNoOfCorrectGuesses = (userGuesses: object) => {
		let correct = 0;
		for (const [name, guess] of Object.entries(userGuesses)) {
			const currentResult = results.find((res) => res.name === name).result;

			if (currentResult === guess) {
				++correct;
			}
		}
		return correct;
	};

	const getData = async () => {
		await getResults();
		await getGuesses();
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
		<p class="text">Gissningar</p>
		{#await getData()}
			<p class="text">Hämtar gissningar</p>
		{:then}
			{#if users}
				<table in:fade>
					<tr>
						<th />
						{#each results as p}
							<th>
								<div class="image-container" style="background-image: url({getImage(p.id)}); " />
							</th>
						{/each}
					</tr>
					{#each users as user}
						<tr>
							<td>{user.name}</td>

							{#each results as r}
								<td>
									<GuessIcon
										guess={user.gvfo[r.name]}
										result={results.find((res) => res.name === r.name).result}
									/>
								</td>
							{/each}
							<td>
								<p>{calculateNoOfCorrectGuesses(user.gvfo)}</p>
							</td>
						</tr>
					{/each}
				</table>
			{/if}
		{:catch error}
			<p>Something went wrong: {error.message}</p>
		{/await}
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
	.image-container {
		position: relative;
		margin: auto;
		background-size: cover;
		background-color: white;
		border-radius: 5px;
		background-position: center;
		height: 80px;
		width: 50px;
	}
	h1 {
		font-size: 4rem;
		text-align: center;
		color: white;
		font-family: 'Abril Fatface', cursive;
		margin-bottom: 0;
		text-shadow: black 1px 0 10px;
	}
	table {
		background-color: white;
		border-radius: 14px;
		padding: 22px;
	}
	tr {
		margin: 0;
		padding: 0;
		font-size: 1rem;
		text-align: center;
		color: black;
		font-family: 'Quicksand', sans-serif;
	}
	td {
		margin: 0;
		padding: 5px;
	}
	.text {
		font-size: 1.5rem;
		text-align: center;
		color: white;
		font-family: 'Quicksand', sans-serif;
		margin-top: 20px;
		text-shadow: black 1px 0 10px;
	}

	@media only screen and (max-width: 480px) {
		.container {
			padding-top: 20px;
			/* padding: 20px; */
		}
	}
</style>
