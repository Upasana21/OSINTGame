export interface GameModel {
    id?: any;
    playerName?: string;
    imageId: number;
    guessLatitude: number;
    guessLongitude: number;
    date: Date;
    score: number;
    guessCount: number;
    distanceInMeters?: number;
}