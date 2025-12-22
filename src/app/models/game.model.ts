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

export interface ScoreModel {
    playerName: string;
    date: Date;
    totalScore: number;
}