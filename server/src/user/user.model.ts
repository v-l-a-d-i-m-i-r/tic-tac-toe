export class UserModel {
  public id: string;
  // public name: string;
  public email: string;
}

export class PrivateUserModel {
  public id: string;
  public email: string;
  public passwordHash: string;
}
