export const resMessage = (error) => {
    return (
        error.response &&
        error.response.data &&
        error.response.data.message
    ) ||
    error.toString()
}