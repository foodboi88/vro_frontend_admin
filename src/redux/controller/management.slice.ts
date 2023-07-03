/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { catchError, filter, map, mergeMap, switchMap } from "rxjs/operators";
import { RootEpic } from "../../common/define-type";
import Utils from "../../utils/base-utils";
import IdentityApi from "../../api/identity/identity.api";
import UserApi from "../../api/user/user.api";
import { IUser } from "../../common/user.interface";


interface ManagementState {
    loading: boolean;
    userList: IUser[]
}

const initState: ManagementState = {
    loading: false,
    userList: []
};

const managementSlice = createSlice({
    name: "management",
    initialState: initState,
    reducers: {
        getUsersRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            // console.log("da chui vao",state.loading)
        },
        getUsersSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload)
            state.userList = action.payload.items
        },
        getUsersFail(state, action: any) {
            console.log(action);
            state.loading = false;

         
        },
        
    },
});

const getUsers$: RootEpic = (action$) =>
    action$.pipe(
        filter(getUsersRequest.match),
        mergeMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);
            

            return UserApi.getAllUsers(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(res);
                    console.log(res.data.accessToken);

                    return [
                        managementSlice.actions.getUsersSuccess(res.data),
                        
                    ];
                }),
                catchError((err) => [managementSlice.actions.getUsersFail(err)])
            );
        })
    );



export const ManagementEpics = [
    getUsers$,
  
];
export const {
 
    getUsersRequest,
   
} = managementSlice.actions;
export const managementReducer = managementSlice.reducer;
