
export interface ICandidate {
    candidateId: number,
    red: boolean,
    imageId: number,
    firstname: string,
    lastname: string,
    position: string,
    experience: string,
    country: string,
    city: string
}


export interface CandidateState {
    candidates: ICandidate[],
    isLoading: boolean,
    error: string,
}


