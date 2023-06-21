<script lang="ts">
	import { getImage } from '../../../constants/peopleImages';
	import GuessIcon from './../GuessIcon.svelte';
	import { fade } from 'svelte/transition';
	import PageContainer from '../../PageContainer.svelte';

	export let data;

	const calculateNoOfCorrectGuesses = (userGuesses: object) => {
		let correct = 0;
		for (const [name, guess] of Object.entries(userGuesses)) {
			const currentResult = data.results.find((res) => res.name === name).result;

			if (currentResult === guess) {
				++correct;
			}
		}
		return correct;
	};
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Inter&family=Quicksand&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<PageContainer>
	<p class="text">Gissningar</p>
	{#await data}
		<p class="text">Hämtar gissningar</p>
	{:then}
		{#if data.users}
			<table in:fade>
				<tr>
					<th />
					{#each data.results as p}
						<th>
							<div class="image-container" style="background-image: url({getImage(p.id)}); " />
						</th>
					{/each}
				</tr>
				{#each data.users as user}
					{#if user[data.show]}
						<tr>
							<td>{user.name}</td>

							{#each data.results as r}
								<td>
									<GuessIcon
										guess={user[data.show][r.name]}
										result={data.results.find((res) => res.name === r.name).result}
									/>
								</td>
							{/each}
							<td>
								<p>{calculateNoOfCorrectGuesses(user[data.show])}</p>
							</td>
						</tr>
					{/if}
				{/each}
			</table>
		{/if}
	{:catch error}
		<p>Something went wrong: {error.message}</p>
	{/await}
</PageContainer>

<style>
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

	@media only screen and (max-width: 600px) {
		.image-container {
			border-radius: 5px;
			background-position: center;
			height: 50px;
			width: 30px;
		}
		table {
			background-color: white;
			border-radius: 14px;
			padding: 22px;
		}
		tr {
			margin: 0;
			padding: 0;
			font-size: 0.8rem;
			text-align: center;
			color: black;
			font-family: 'Quicksand', sans-serif;
		}
		td {
			margin: 0;
			padding: 2px;
		}
		.text {
			font-size: 1.5rem;
			text-align: center;
			color: white;
			font-family: 'Quicksand', sans-serif;
			margin-top: 20px;
			text-shadow: black 1px 0 10px;
		}
	}
</style>
