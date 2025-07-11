import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  createUser(name: string, email: string, company: string, isBlocked: boolean) {
    const user = this.usersRepository.create({
      name,
      email,
      company,
      isBlocked,
    });
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  updateUser(id: number, updateData: Partial<User>) {
    return this.usersRepository.update(id, updateData);
  }

  deleteUser(id: number) {
    return this.usersRepository.delete(id);
  }
}
