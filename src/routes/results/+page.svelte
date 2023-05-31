<script lang="ts">
	import { query, getDocs, collection } from 'Firebase/firestore';
	import BgImage from '$lib/images/jonathan-borba-qRNctETJJ_c-unsplash.jpg';
	import { db } from '../../Firebase';
	import AnswerIcon from './AnswerIcon.svelte';
	import type { Couple } from '../../types/couple.type';

	const q = query(collection(db, 'users'));
	let users: any[] = [];

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
		{#await getDocs(q)}
			<!-- promise is pending -->
			<p>waiting for the promise to resolve...</p>
		{:then documents}
			{documents.forEach((user) => {
				console.log(user.data());
				users.push({ ...user.data() });
			})}

			<table>
				<tr>
					<th />
					{#each couples as couple, i}
						<th>
							<div class="image-container" style="background-image: url({couple.image}); " />
						</th>
					{/each}
				</tr>
				{#each users as user}
					<tr>
						<td>{user.name}</td>
						<td><AnswerIcon answer={user[0]} /></td>
						<td><AnswerIcon answer={user[1]} /></td>
						<td><AnswerIcon answer={user[2]} /></td>
						<td><AnswerIcon answer={user[3]} /></td>
						<td><AnswerIcon answer={user[4]} /></td>
						<td><AnswerIcon answer={user[5]} /></td>
						<td><AnswerIcon answer={user[6]} /></td>
						<td><AnswerIcon answer={user[7]} /></td>
					</tr>
				{/each}
			</table>

			<!-- promise was fulfilled -->
		{:catch error}
			<!-- promise was rejected -->
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
		background-color: aqua;
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
		/* backdrop-filter: blur(10px); */
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
		/* margin-top: 20px; */
		/* text-shadow: burlywood 1px 0 1px; */
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
