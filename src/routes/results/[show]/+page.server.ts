import { getResultsFromShow, getUsers } from '../../../firebase.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const users: any[] = [];
	const results: any[] = [];

	const usersDocs = await getUsers();

	usersDocs.forEach((d) => {
		console.log(d.data());
		users.push({ ...d.data() });
	});

	const resultsDocs = await getResultsFromShow(params.show);

	resultsDocs.forEach((d) => {
		console.log(d.data());
		results.push({ ...d.data() });
	});

	return {
		users: users,
		results: results,
		show: params.show
	};
}
