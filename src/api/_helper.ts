export type Mock = {
  method: string,
  regex: RegExp,
  response: Response,
};

export const ResponseHelper = {
  Ok: <T>(body: T): Response => new Response(JSON.stringify(body), { status: 200, statusText: 'OK' }),
};

export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
