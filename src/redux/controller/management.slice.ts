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
import SketchApi from "../../api/sketch/sketch.api";
import { ISketch, IStatisticSketch } from "../../common/sketch.interface";
import { IOverViewStatictis, IOverViewStatictisDay, IOverViewStatictisMonth, IOverViewStatictisQuarter, IOverViewStatictisYear } from "../../common/statistic.interface";
import StatisticAPI from "../../api/statistic/statistic.api";
import { get } from "http";


interface ManagementState {
    loading: boolean;
    userList: IUser[];
    totalUserRecords: number;
    sketchList: ISketch[];
    totalSketchRecords: number;
    sketchStatistic: IStatisticSketch | undefined
    typeViewStatistic: string;
    overviewStatistic: IOverViewStatictis | undefined;
    overViewStatisticDay: IOverViewStatictisDay | undefined;
    overViewStatisticMonth: IOverViewStatictisMonth | undefined;
    overViewStatisticQuarter: IOverViewStatictisQuarter | undefined;
    overViewStatisticYear: IOverViewStatictisYear | undefined;
}

const initState: ManagementState = {
    loading: false,
    userList: [],
    totalUserRecords: 0,
    sketchList: [],
    totalSketchRecords: 0,
    sketchStatistic: undefined,
    typeViewStatistic: 'day',
    overviewStatistic: undefined,
    overViewStatisticDay: undefined,
    overViewStatisticMonth: undefined,
    overViewStatisticQuarter: undefined,
    overViewStatisticYear: undefined,
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

        //Get all sketch
        getSketchsRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        getSketchsSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.sketchList = action.payload.items
            state.totalSketchRecords = action.payload.total
            // notification.open({
            //     message: 'Block người dùng thành công',
            //     onClick: () => {
            //         console.log("Notification Clicked!");
            //     },
            //     style: {
            //         marginTop: 50,
            //         paddingTop: 40,
            //     },
            // });
        },
        getSketchsFail(state, action: any) {
            state.loading = false;


        },

        //Get sketch statistic
        getSketchsStatisticRequest(state) {
            state.loading = true;
        },
        getSketchsStatisticSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload)
            state.sketchStatistic = action.payload
        },
        getSketchsStatisticFail(state, action: any) {
            state.loading = false;


        },

        // Get overview statistic
        getOverviewStatisticRequest(state) {
            state.loading = true;
        },

        getOverviewStatisticSuccess(state, action: PayloadAction<IOverViewStatictis>) {
            state.loading = false;
            console.log(action.payload)
            state.overviewStatistic = action.payload;
        },

        getOverviewStatisticFail(state, action: PayloadAction<any>) {
            state.loading = false;
        },

        setViewStatistic(state, action: PayloadAction<string>) {
            state.typeViewStatistic = action.payload;
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
        },

        // Get overview statistic month
        getOverviewStatisticMonthRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getOverviewStatisticMonthSuccess(state, action: PayloadAction<any>) {
            console.log(action.payload);
            state.loading = false;
            state.overViewStatisticMonth = action.payload;
        },

        getOverviewStatisticMonthFail(state, action: PayloadAction<any>) {
            state.loading = false;
            if (action.payload.status === 400 || action.payload.status === 404) {
                notification.open({
                    message: action.payload.response.message,
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                });
            }
        },

        // Get overview statistic quarter
        getOverviewStatisticQuarterRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getOverviewStatisticQuarterSuccess(state, action: PayloadAction<any>) {
            console.log(action.payload);
            state.loading = false;
            state.overViewStatisticQuarter = action.payload;
        },

        getOverviewStatisticQuarterFail(state, action: PayloadAction<any>) {
            state.loading = false;
            if (action.payload.status === 400 || action.payload.status === 404) {
                notification.open({
                    message: action.payload.response.message,
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                });
            }
        },

        // Get overview statistic year
        getOverviewStatisticYearRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getOverviewStatisticYearSuccess(state, action: PayloadAction<any>) {
            console.log(action.payload);
            state.loading = false;
            state.overViewStatisticYear = action.payload;
        },

        getOverviewStatisticYearFail(state, action: PayloadAction<any>) {
            state.loading = false;
            if (action.payload.status === 400 || action.payload.status === 404) {
                notification.open({
                    message: action.payload.response.message,
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                });
            }
        },

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

const getSketchs$: RootEpic = (action$) =>
    action$.pipe(
        filter(getSketchsRequest.match),
        mergeMap((re) => {
            console.log(re);


            return SketchApi.getAllSketchs(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getSketchsSuccess(res.data),

                    ];
                }),
                catchError((err) => [managementSlice.actions.getSketchsFail(err)])
            )
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

const getSketchStatistic$: RootEpic = (action$) =>
    action$.pipe(
        filter(getSketchsStatisticRequest.match),
        mergeMap((re) => {
            console.log(re);

            return SketchApi.getSketchStatistic().pipe(
                mergeMap((res: any) => {
                    console.log(res.data)
                    return [
                        managementSlice.actions.getSketchsStatisticSuccess(res.data),
                    ];
                }),
                catchError((err) => [
                    managementSlice.actions.getSketchsStatisticFail(err)]
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

const getOverviewStatisticMonth$: RootEpic = (action$) =>
    action$.pipe(
        filter(getOverviewStatisticMonthRequest.match),
        mergeMap((re) => {
            console.log(re);
            return StatisticAPI.getOverViewStatisticMonth(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getOverviewStatisticMonthSuccess(res.data),
                    ]
                }),
                catchError((err) => [managementSlice.actions.getOverviewStatisticMonthFail(err)])
            );
        })
    );

const getOverviewStatisticQuarter$: RootEpic = (action$) =>
    action$.pipe(
        filter(getOverviewStatisticQuarterRequest.match),
        mergeMap((re) => {
            console.log(re);
            return StatisticAPI.getOverViewStatisticQuarter(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getOverviewStatisticQuarterSuccess(res.data),
                    ]
                }),
                catchError((err) => [managementSlice.actions.getOverviewStatisticQuarterFail(err)])
            );
        })
    );

const getOverviewStatisticYear$: RootEpic = (action$) =>
    action$.pipe(
        filter(getOverviewStatisticYearRequest.match),
        mergeMap((re) => {
            console.log(re);
            return StatisticAPI.getOverViewStatisticYear(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getOverviewStatisticYearSuccess(res.data),
                    ]
                }),
                catchError((err) => [managementSlice.actions.getOverviewStatisticYearFail(err)])
            );
        })
    );

export const ManagementEpics = [
    getUsers$,
    blockUsers$,
    getSketchs$,
    getOverviewStatistic$,
    getSketchStatistic$,
    getOverviewStatisticDay$,
    getOverviewStatisticMonth$,
    getOverviewStatisticQuarter$,
    getOverviewStatisticYear$

];
export const {
    getUsersRequest,
    blockUsersRequest,
    getSketchsRequest,
    getSketchsStatisticRequest,
    getOverviewStatisticRequest,
    getOverviewStatisticDayRequest,
    getOverviewStatisticMonthRequest,
    getOverviewStatisticQuarterRequest,
    getOverviewStatisticYearRequest,
    setViewStatistic

} = managementSlice.actions;
export const managementReducer = managementSlice.reducer;
