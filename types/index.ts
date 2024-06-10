export interface QuestionnaireProps {    
    id: string
    weddingDate: string
    brideName: string
    groomName: string
    email: string
    songsOptions: string
    highlightSong?: string
    videoSongs? : string
    details: string
    address: string
    city: string
    state: string
    zipCode: string    
}


export interface ClientProps {   
        brideName: string;
        groomName: string;
        email: string;
        secondaryEmail?: string;
        phone?: string;
        weddingDate: string;
        services: [];
        packagePrice: string;
}