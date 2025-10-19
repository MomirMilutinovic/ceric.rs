export interface LoginResponse {
    accessToken: string,
    expiresIn: number,
    passwordChangeRequired: boolean
}