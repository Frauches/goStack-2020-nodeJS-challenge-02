import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    return this.transactions.reduce((accumulator, current) => {
      if (current.type === 'income') {
        accumulator.income += current.value;
      } else {
        accumulator.outcome += current.value;
      }

      accumulator.total = accumulator.income - accumulator.outcome;

      return accumulator;
    }, balance);
  }

  public create({ value, title, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ value, title, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
