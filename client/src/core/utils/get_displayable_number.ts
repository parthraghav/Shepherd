export const getDisplayableNumber = (num : number) => {
    const withCommas = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const N = 1e4;
    if (num < N) {
        return withCommas(num);
    } else if (num < 1e2 * N) {
        return Math.round(num / (1e2 * N)) + 'K';
    } else if (num < 1e4 * N) {
        return Math.round(num / (1e4 * N)) + 'M';
    } else if (num < 1e6 * N) {
        return Math.round(num / (1e6 * N)) + 'B';
    } else {
        return withCommas(num);
    }
}