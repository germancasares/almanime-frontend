import { Mock, ResponseHelper } from './_helper';

class AccountApi {
  static readonly Mocks: Mock[] = [
    {
      method: 'GET',
      path: 'account/email/german.casares@outlook.com',
      response: ResponseHelper.Ok({ isAvailable: false }),
    },
    {
      method: 'GET',
      path: 'account/email/:email',
      response: ResponseHelper.Ok({ isAvailable: true }),
    },
    {
      method: 'GET',
      path: 'account/username/serosac',
      response: ResponseHelper.Ok({ isAvailable: false }),
    },
    {
      method: 'GET',
      path: 'account/username/:username',
      response: ResponseHelper.Ok({ isAvailable: true }),
    },
  ];

  public static async IsEmailAvailable(email: string): Promise<boolean> {
    const response = await (await fetch(`account/email/${email}`)).json();
    return (response as { isAvailable: boolean }).isAvailable;
  }

  public static async IsUsernameAvailable(username: string): Promise<boolean> {
    const response = await (await fetch(`account/username/${username}`)).json();
    return (response as { isAvailable: boolean }).isAvailable;
  }
}

export default AccountApi;
