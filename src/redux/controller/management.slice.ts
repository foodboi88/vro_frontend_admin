/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { catchError, filter, map, mergeMap, switchMap } from "rxjs/operators";
import { RootEpic } from "../../common/define-type";
import Utils from "../../utils/base-utils";
import IdentityApi from "../../api/identity/identity.api";
import UserApi from "../../api/user/user.api";
import { IGetUsersRequest, IUser } from "../../common/user.interface";
import { QUERY_PARAM } from "../../constants/get-api.constant";
import { IOverViewStatictis, IOverViewStatictisDay } from "../../common/statistic.interface";
import StatisticAPI from "../../api/statistic/statistic.api";


interface ManagementState {
    loading: boolean;
    userList: IUser[];
    totalUserRecords: number;
    overviewStatistic: IOverViewStatictis | undefined;
    overViewStatisticDay: IOverViewStatictisDay | undefined;
}

const initState: ManagementState = {
    loading: false,
    userList: [],
    totalUserRecords: 0,
    overviewStatistic: undefined,
    overViewStatisticDay: undefined,
};

const managementSlice = createSlice({
    name: "management",
    initialState: initState,
    reducers: {

        // Get users
        getUsersRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            // console.log("da chui vao",state.loading)
        },
        getUsersSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload)
            state.userList = action.payload.items
            state.totalUserRecords = action.payload.total

        },
        getUsersFail(state, action: PayloadAction<any>) {
            console.log(action);
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },

        //Block user
        blockUsersRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        blockUsersSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: 'Block người dùng thành công',
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });
        },
        blockUsersFail(state, action: any) {
            state.loading = false;
        },

        // Get overview statistic
        getOverviewStatisticRequest(state) {
            state.loading = true;
        },

        getOverviewStatisticSuccess(state, action: PayloadAction<IOverViewStatictis>) {
            state.loading = false;
            state.overviewStatistic = action.payload;
        },

        getOverviewStatisticFail(state, action: PayloadAction<any>) {
            state.loading = false;
        },

        // Get overview statistic day
        getOverviewStatisticDayRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getOverviewStatisticDaySuccess(state, action: PayloadAction<any>) {
            console.log(action.payload);
            state.loading = false;
            state.overViewStatisticDay = action.payload[0];
        },

        getOverviewStatisticDayFail(state, action: PayloadAction<any>) {
            state.loading = false;
            if (action.payload.status === 400 || action.payload.status === 404) {
                notification.open({
                    message: action.payload.response.message,
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                });
            }
        }

    },
});

const getUsers$: RootEpic = (action$) =>
    action$.pipe(
        filter(getUsersRequest.match),
        mergeMap((re) => {
            console.log(re);


            return UserApi.getAllUsers(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getUsersSuccess(res.data),

                    ];
                }),
                catchError((err) => [managementSlice.actions.getUsersFail(err)])
            );
        })
    );

const blockUsers$: RootEpic = (action$) =>
    action$.pipe(
        filter(blockUsersRequest.match),
        mergeMap((re) => {
            console.log(re);

            return UserApi.blockUser(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(re.payload)
                    return [
                        managementSlice.actions.blockUsersSuccess(res.data),
                        managementSlice.actions.getUsersRequest(re.payload.currentSearchValue)
                    ];
                }),
                catchError((err) => [managementSlice.actions.blockUsersFail(err)])
            );
        })
    );

// Get overview statistic
const getOverviewStatistic$: RootEpic = (action$) =>
    action$.pipe(
        filter(getOverviewStatisticRequest.match),
        mergeMap((re) => {
            console.log(re);

            return StatisticAPI.getOverViewStatistic().pipe(
                mergeMap((res: any) => {
                    console.log(re.payload)
                    return [
                        managementSlice.actions.getOverviewStatisticSuccess(res.data),
                    ];
                }),
                catchError((err) => [
                    managementSlice.actions.getOverviewStatisticFail(err)]
                )
            );
        })
    );


const getOverviewStatisticDay$: RootEpic = (action$) =>
    action$.pipe(
        filter(getOverviewStatisticDayRequest.match),
        mergeMap((re) => {
            console.log(re);
            return StatisticAPI.getOverViewStatisticDay(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getOverviewStatisticDaySuccess(res.data),

                    ];
                }),
                catchError((err) => [managementSlice.actions.getOverviewStatisticDayFail(err)])
            );
        })
    );

export const ManagementEpics = [
    getUsers$,
    blockUsers$,
    getOverviewStatistic$,
    getOverviewStatisticDay$,
];
export const {
    getUsersRequest,
    blockUsersRequest,
    getOverviewStatisticRequest,
    getOverviewStatisticDayRequest

} = managementSlice.actions;
export const managementReducer = managementSlice.reducer;
