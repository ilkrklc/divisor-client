export type RootState = {
  version: string;
};

export const rootState: RootState = {
  version: process.env.APP_VERSION as string,
};
