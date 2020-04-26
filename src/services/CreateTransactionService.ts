import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ type, title, value }: Request): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Type is not valid');
    }

    const balance = this.transactionsRepository.getBalance();

    if (balance.total < balance.outcome + value && type === 'outcome') {
      throw Error('Insufficient funds');
    }

    const transaction = this.transactionsRepository.create({
      type,
      title,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
