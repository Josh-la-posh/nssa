import * as types from './mutation-types';
import { State, Action } from './types';

function authReducer(state: State, action: Action): State {
  switch (action.type) {
    case types.LOGIN_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case types.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        user: { ...state.user, ...action.payload },
        error: undefined,
        isLoading: false,
      };
    }

    case types.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        error: undefined,
        isLoading: false,
      };
    }

    case types.LOGIN_FAILURE: {
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
        error: action.payload,
        isLoading: false,
      };
    }

    case types.REGISTER_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case types.REGISTER_SUCCESS: {
      return {
        ...state,
        error: undefined,
        isLoading: false,
      };
    }

    case types.REGISTER_FAILURE: {
      return {
        ...state,
        user: undefined,
        error: action.payload,
        isLoading: false,
      };
    }

    case types.LOGOUT_SUCCESS: {
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
        error: undefined,
        activeRole: undefined,
        token: undefined,
        isLoading: false,
      };
    }

    case types.LOGOUT_FAILURE: {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }

    case types.SET_ACTIVE_ROLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        activeRole: action.payload,
      };

    case types.SET_ACTIVE_ROLE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export default authReducer;
