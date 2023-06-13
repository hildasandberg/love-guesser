<script lang="ts">
	import BgImage from '$lib/images/bruna-branco-t8hTmte4O_g-unsplash.jpg';
	// import BgImage from '$lib/images/jonathan-borba-qRNctETJJ_c-unsplash.jpg';
</script>

<body>
	<div class="page-container" style="background-image: url({BgImage}">
		<h1>Gift vid första ögonkastet</h1>
		<slot />
	</div>
</body>

<style>
	:global(html) {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	:global(body) {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	.page-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
		width: 100vw;
		padding-top: 100px;
		background-position: bottom;
		background-size: cover;
		background-repeat: no-repeat, repeat;
		overflow: hidden;
	}
	h1 {
		font-size: 4rem;
		text-align: center;
		color: white;
		font-family: 'Abril Fatface', cursive;
		margin-bottom: 0;
		text-shadow: black 1px 0 10px;
	}

	@media only screen and (max-width: 480px) {
		.page-container {
			padding: 20px;
		}

		h1 {
			font-size: 3rem;
			text-shadow: black 1px 0 5px;
		}
	}
</style>
