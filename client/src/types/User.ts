export type User ={
    id: number;
    displayName: string;
    email: string;
    token: string;
    
    gender?: string;
    imageUrl?: string;
}

export type RegisterCreds={
    email: string;
    password: string;   
    displayName?: string;
}