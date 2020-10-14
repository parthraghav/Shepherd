
type TransactionType = "Donated" | "Received";

type SupportedCurrencyType = "USD" | "EUR" | "GBP" | "INR";

interface ReceivedTransactionType {
    readonly type: TransactionType;
    readonly isFirstOfKind?: boolean;
    readonly donorCount?: number;
    readonly didMeetDemonstratedNeed?: boolean;
}

interface SentTransactionType {
    readonly type: TransactionType;
    readonly isFirstOfKind?: boolean;
    readonly redistributionCount?: number;
    readonly donationMatchCount?: number;
}

type TransactionSummaryType = ReceivedTransactionType | SentTransactionType;

export default interface Transaction {
    readonly type: TransactionType;
    readonly timestamp: number;
    readonly uuid: string;
    readonly amount: number;
    readonly currency: SupportedCurrencyType;
    readonly summary: TransactionSummaryType;
}