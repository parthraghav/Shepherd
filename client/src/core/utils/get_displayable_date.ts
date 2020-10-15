export const getDisplayableDate = (timestamp: number) => {
    return new Date(timestamp).toDateString().replace(/^\S+\s/,'');
}