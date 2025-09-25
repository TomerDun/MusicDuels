export type LoginResponse = {
    token: string,
    userId: string
}

export type LoginRequest = {
    email: string,
    password: string
}

export type RegisterRequest = {
    username: string,
    email: string,
    password: string,
    profileImageFile: File | null,
}