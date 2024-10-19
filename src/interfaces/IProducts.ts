export interface IProducts {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: RTCSignalingState;
}
export interface Rating{
    rate: number;
    count: number;
}