import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuth: false
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { username: string; password: string }) => {
    const response = await fetch('http://localhost:3030/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password
      })
    });

    const data = await response.json();
    localStorage.setItem('user_token', data.token);
    return data;
  }
);

export const logoutUser = createAsyncThunk<unknown, unknown, {}>(
    'auth/logoutUser',
    () => {
      localStorage.removeItem('user_token');
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        isAuth: (state) => {
            state.isAuth = true;
        },
        logout: (state) => {
            state.isAuth = false;
        }
    },
    extraReducers(builder) {
        builder.addCase(loginUser.fulfilled, (state) => {
            state.isAuth = true;
        })
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.isAuth = false;
        })
    },
})

export default authSlice.reducer;
export const { isAuth, logout } = authSlice.actions;