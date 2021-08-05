import { User } from "../../model/User";
import { IUser } from "../../Protocols/UserProtocol";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: IUser[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): IUser | undefined {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  findByEmail(email: string): IUser | undefined {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  turnAdmin(receivedUser: IUser): User {
    const user = this.findById(receivedUser.id);
    user.admin = true;
    return user;
  }

  list(): IUser[] {
    return this.users;
  }
}

export { UsersRepository };
