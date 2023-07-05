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
import { IOverViewStatictis } from "../../common/statistic.interface";
import StatisticAPI from "../../api/statistic/statistic.api";


interface ManagementState {
    loading: boolean;
    userList: IUser[];
    totalUserRecords: number;
    sketchList: ISketch[];
    totalSketchRecords: number;
    sketchStatistic: IStatisticSketch| undefined
    overviewStatistic: IOverViewStatictis | undefined;
    
}

const initState: ManagementState = {
    loading: false,
    userList: [],
    totalUserRecords: 0,
    sketchList: [],
    totalSketchRecords: 0,
    overviewStatistic: undefined,
    sketchStatistic: undefined
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

export const ManagementEpics = [
    getUsers$,
    blockUsers$,
    getSketchs$,
    getOverviewStatistic$,
    getSketchStatistic$,
];
export const {
    getUsersRequest,
    blockUsersRequest,
    getSketchsRequest,
    getSketchsStatisticRequest,
    getOverviewStatisticRequest,

} = managementSlice.actions;
export const managementReducer = managementSlice.reducer;
