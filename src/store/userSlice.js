// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { signInWithPhoneNumber } from 'firebase/auth';
// import axios from 'axios';
// import { auth } from '../firebase.config'; // Assuming you have configured Firebase
// import { AUTH_ENDPOINTS, USER_ENDPOINTS } from '../services/api';

// const { GET_USER_BY_PHONE } = USER_ENDPOINTS;
// const { REGISTER_API } = AUTH_ENDPOINTS;

// export const requestOTP = createAsyncThunk(
//   'user/requestOTP',
//   async (phoneNumber, { rejectWithValue }) => {
//     try {
//       if (window.recaptchaVerifier) {
//         const appVerifier = window.recaptchaVerifier;
//         const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
//         console.log("this is confirm that",confirmationResult)
//         return { phoneNumber, confirmationResult };
//       }
//       return rejectWithValue('Error resolving recaptcha');
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const verifyOTP = createAsyncThunk(
//   'user/verifyOTP',
//   async ({ confirmationResult, otp , navigate}, { rejectWithValue }) => {
//     try {
//       // Confirm the OTP
//       const result = await confirmationResult.confirm(otp);
//       const mobileNumber = result.user.phoneNumber;

//       // Check if the user already exists in the system
//       const checkUserResponse = await axios.post(GET_USER_BY_PHONE, { mobileNumber });
//       const existingUser = checkUserResponse.data.user;

//       if (existingUser) {
//         // If the user exists, log them in
//         // console.log("User already registered");

//         // Generate a token for the existing user
//         const response = await axios.post(REGISTER_API, {
//           name: existingUser.username,
//           mobileNumber,
//         });

//         // Return existing user and token
//         return { user: existingUser, token: response.data.token };
//       }

//       // If the user doesn't exist, proceed with registration flow
//       return { user: result.user, phoneNumber: mobileNumber };
      
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );


// export const registerUser = createAsyncThunk(
//   'user/registerUser',
//   async ({ name, mobileNumber }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(REGISTER_API, { name, mobileNumber });
//       console.log(response)
//       console.log('check')
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     phoneNumber: null,
//     confirmationResult: null,
//     user: null,
//     token: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem('user');
//       localStorage.removeItem('token');
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(requestOTP.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(requestOTP.fulfilled, (state, action) => {
//         state.loading = false;
//         state.phoneNumber = action.payload.phoneNumber;
//         state.confirmationResult = action.payload.confirmationResult;
//       })
//       .addCase(requestOTP.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(verifyOTP.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(verifyOTP.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         localStorage.setItem('user', JSON.stringify(action.payload.user));

//         if (action.payload.token) {
//           state.token = action.payload.token;
//           localStorage.setItem('token', action.payload.token);
//         }

//         // Navigate to the main page after logging in
//         if (action.payload.user && action.payload.token) {
//           action.meta.arg.navigate('/main');
//         }
//       })
//       .addCase(verifyOTP.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         localStorage.setItem('user', JSON.stringify(action.payload.user));
//         localStorage.setItem('token', action.payload.token);

//         // Navigate to the main page after registration
//         action.meta.arg.navigate('/main');
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = userSlice.actions;
// export default userSlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithPhoneNumber } from 'firebase/auth';
import axios from 'axios';
import { auth } from '../firebase.config'; // Assuming you have configured Firebase
import { AUTH_ENDPOINTS, USER_ENDPOINTS } from '../services/api';

const { GET_USER_BY_PHONE } = USER_ENDPOINTS;
const { REGISTER_API } = AUTH_ENDPOINTS;

// Initial state loading from localStorage
const initialState = {
  phoneNumber: null,
  confirmationResult: null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

export const requestOTP = createAsyncThunk(
  'user/requestOTP',
  async (phoneNumber, { rejectWithValue }) => {
    try {
      if (window.recaptchaVerifier) {
        const appVerifier = window.recaptchaVerifier;
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        return { phoneNumber, confirmationResult };
      }
      return rejectWithValue('Error resolving recaptcha');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'user/verifyOTP',
  async ({ confirmationResult, otp, navigate }, { rejectWithValue }) => {
    try {
      // Confirm the OTP
      const result = await confirmationResult.confirm(otp);
      const mobileNumber = result.user.phoneNumber;

      // Check if the user already exists in the system
      const checkUserResponse = await axios.post(GET_USER_BY_PHONE, { mobileNumber });
      const existingUser = checkUserResponse.data.user;

      if (existingUser) {
        // If the user exists, log them in

        // Generate a token for the existing user
        const response = await axios.post(REGISTER_API, {
          name: existingUser.username,
          mobileNumber,
        });

        // Return existing user and token
        return { user: existingUser, token: response.data.token };
      }

      // If the user doesn't exist, proceed with registration flow
      return { user: result.user, phoneNumber: mobileNumber };
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ name, mobileNumber }, { rejectWithValue }) => {
    try {
      const response = await axios.post(REGISTER_API, { name, mobileNumber });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.phoneNumber = action.payload.phoneNumber;
        state.confirmationResult = action.payload.confirmationResult;
      })
      .addCase(requestOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('user', JSON.stringify(action.payload.user));

        if (action.payload.token) {
          state.token = action.payload.token;
          localStorage.setItem('token', action.payload.token);
        }

        // Navigate to the main page after logging in
        if (action.payload.user && action.payload.token) {
          console.log('hit')
          action.meta.arg.navigate('/main');
        }
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);

        // Navigate to the main page after registration
        if(state.user && state.token){
          action.meta.arg.navigate('/main');
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
