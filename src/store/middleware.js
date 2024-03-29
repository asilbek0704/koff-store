import { fetchAccessToken } from "./auth/auth.slice";

export const apiTokenErrorMiddleware = (storeAPI) => (next) => async (action) => {
  const state = storeAPI.getState();

  if (action.type.endsWith("rejected") && !action.payload?.status === 401) {
    if (!state.auth.loading) {
      await storeAPI.dispatch(fetchAccessToken());
    }     
  }

  next(action);
}