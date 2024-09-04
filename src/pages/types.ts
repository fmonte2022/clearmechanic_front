export type NotificationTypes = {
    warning: number;
    error: number;
};

export type UserLoginInfo = {
    userId: number;
    userName: string;
    name: string;
};

export type AppState = {
    section: string;
    auth: UserLoginInfo | null;
    lang: string;
};

export interface Movie {
    id: number;
    title: string;
    gender: Gender;
    year: number;
    actors: string;
    createdAt: string;
    deletedAt: string;
    updatedAt: string;
    active: boolean;
}

export interface Gender {
    id: number;
    nameEs: string;
    nameEn: string;
}

export interface Actor {
    id: number;
    name: string;
}
  
  