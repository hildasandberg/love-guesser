<script lang="ts">
	import { query, getDocs, collection } from 'Firebase/firestore';
	import BgImage from '$lib/images/jonathan-borba-qRNctETJJ_c-unsplash.jpg';
	import { db } from '../../Firebase';
	import type { User } from '../../types/user.type';

	const q = query(collection(db, 'users'));
	let users: any[] = [];

	// const getResults = async () => {
	// 	console.log('helloooo');
	// 	const q = query(collection(db, 'users'));
	// 	try {
	// 		let users: User[] = [];
	// 		const querySnapshot = await getDocs(q);
	// 		// querySnapshot.forEach((user) => {
	// 		// 	users.push({ ...user.data(), name: user.name });
	// 		// });
	// 		console.log(querySnapshot);
	// 		// console.log(users);
	// 		// return users;
	// 	} catch (error) {
	// 		console.log(error);
	// 		return [];
	// 	}
	// };
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
		<p class="text">Resultat</p>
		{#await getDocs(q)}
			<!-- promise is pending -->
			<p>waiting for the promise to resolve...</p>
		{:then documents}
			{documents.forEach((user) => {
				console.log(user.data());
				users.push({ ...user.data() });
			})}

			{#each users as user}
				<p>{user.name}</p>
			{/each}
			<!-- promise was fulfilled -->
		{:catch error}
			<!-- promise was rejected -->
			<p>Something went wrong: {error.message}</p>
		{/await}

		<!-- {#await getResults}
			<p class="text">laddar</p>
		{:then users}
			<p>"klart"</p>

		{/await} -->
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
