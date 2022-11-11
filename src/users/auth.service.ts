import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async signUp(email: string, password: string) {
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email is already registered');
    }
    //Hash the users password

    //generate a salt
    const salt = randomBytes(8).toString('hex');

    //Hash the sat and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer; //32 means hash will be 32 characters

    //join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');
    //create a new user and save it
    const user = await this.usersService.create(email, result);
    //return the
    return user;
  }
  async signIn(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (hash.toString('hex') !== storedHash)
      throw new BadRequestException('wrong Password ');
    return user;
  }
}
