
import { getPeopleFromShow } from '../../../firebase';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const people: unknown[] = [];
    const docs = await getPeopleFromShow(params.show)
    
    docs.forEach((d) => {
				console.log(d.data());
				people.push({ ...d.data() });
			});


    return {
        people: people,
        show: params.show
    };
}