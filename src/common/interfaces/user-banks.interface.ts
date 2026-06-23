export interface IUserBanks {
  id: number;
  initialAmount: number;
  balance: number;
  userId: number;
  bankId: number;
}

export interface IUserBankList extends IUserBanks {
  bankName: string;
  bankCode: string;
  bankIcon: string;
}
