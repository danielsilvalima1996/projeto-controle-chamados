export interface ErrorSpringBoot {
    timestamp: Date,
    status: number,
    error: string,
    message: string,
    trace: string,
    path: string
}