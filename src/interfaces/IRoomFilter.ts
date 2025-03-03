export interface RoomFilter {
    startDate: string;
    endDate: string;
    city: string;
    peopleCount: number;
}

export interface IDatesFilter extends Pick<RoomFilter, 'startDate' | 'endDate'>{}