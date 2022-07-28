export interface IAccountReceivableMxReport {
    correlationId: number;
    correlationType: string;
    correlationCode: string;
    advancesReceived: number;
    receivables: number;
    actuallyReceived: number;
    endingBalance: number;
    abstract: string;
    reMark: string;
    inDate: Date | null;
    clientid: number;
    printid: number;
    clientcode: string;
    clientname: string;
    ymrep: string;
}