export const gvfoPeople = [
    {
        id: 1,
        image: 'images/arvid.png',
        url: "https://www.gp.se/image/policy:1.95520058:1681157519/F7T4u6tSWJRLH8L6hCSxc6U4mPU.jpg?f=Tall&w=960&$p$f$w=78e8e4c"
    },
    {
        id: 2,
        image: 'src/lib/images/ida.png',
        url:"https://image.femina.se/gift-vid-forsta-ogonkastet-2023-9360758.jpg?imageId=9360758&x=0&y=0&cropw=100&croph=100&width=1600&height=1381&compression=80"
    },
    {
        id: 3,
        image: '../lib/images/agust.png',
        url: "https://metromode.se/mmImages/1/2023/03/august-gift-vid-forsta-ogonkastet-2023-deltagare.jpg"
    },
    {
        id: 4,
        image: 'src/lib/images/carro.png',
        url: 'https://images.lomediehus.se/app/uploads/sites/5/2023/04/28151026/svt-giftvidforstaogonkastet-2023-e00-34c1.jpg?w=1600&auto=format&crop=faces&facepad=10&fit=crop&q=50',
    },
    {
        id: 5,
        url: "https://images.aftonbladet-cdn.se/v2/images/6ceaf52a-42d7-48c2-9694-f8f2ba83769c?fit=crop&format=auto&h=867&q=50&w=1300&s=e3e7d891651389dba5cc2deaefe3a7db3de5c1f6",
        image: 'src/lib/images/lina.png'
    },
    {
        id: 6,
        image: 'https://metromode.se/mmImages/1/2023/03/alexander-gift-vid-forsta-ogonkastet-2023-deltagare.jpg',
        url: 'https://metromode.se/mmImages/1/2023/03/alexander-gift-vid-forsta-ogonkastet-2023-deltagare.jpg'
    },
    {
        id: 7,
        image: 'https://metromode.se/mmImages/1/2023/03/stina-gift-vid-forsta-ogonkastet-2023-deltagare.jpg',
        url: 'https://metromode.se/mmImages/1/2023/03/stina-gift-vid-forsta-ogonkastet-2023-deltagare.jpg'
    },
    {
        id: 8,
        image: 'https://metromode.se/mmImages/1/2023/03/fredrik-32-gift-vid-forsta-ogonkastet-2023-deltagare__mmcompress-large__.jpg',
        url: 'https://metromode.se/mmImages/1/2023/03/fredrik-32-gift-vid-forsta-ogonkastet-2023-deltagare__mmcompress-large__.jpg'
    }
];

export const getImage = (id: number) => {
    const found = gvfoPeople.find((image) => image.id === id);
    return found?.url;
};