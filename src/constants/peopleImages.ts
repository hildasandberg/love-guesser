export const gvfoPeople: Couple[] = [
    {
        id: 1,
        image: 'src/lib/images/arvid.png'
    },
    {
        id: 2,
        image: 'src/lib/images/ida.png'
    },
    {
        id: 3,
        image: 'src/lib/images/agust.png'
    },
    {
        id: 4,
        image: 'src/lib/images/carro.png'
    },
    {
        id: 5,
        image: 'src/lib/images/lina.png'
    },
    {
        id: 6,
        image: 'src/lib/images/alex.png'
    },
    {
        id: 7,
        image: 'src/lib/images/stina.png'
    },
    {
        id: 8,
        image: 'src/lib/images/fredrik.png'
    }
];

export const getImage = (id: number) => {
    const found = gvfoPeople.find((image) => image.id === id);
    return found.image;
};