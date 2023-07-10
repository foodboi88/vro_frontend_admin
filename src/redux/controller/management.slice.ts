/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { catchError, concatMap, filter, map, mergeMap, switchMap } from "rxjs/operators";
import { RootEpic } from "../../common/define-type";
import Utils from "../../utils/base-utils";
import IdentityApi from "../../api/identity/identity.api";
import UserApi from "../../api/user/user.api";
import { IBill, IGetUsersRequest, IStatisticUser, IUser } from "../../common/user.interface";
import { QUERY_PARAM } from "../../constants/get-api.constant";
import SketchApi from "../../api/sketch/sketch.api";
import { ISketch, IStatisticSketch } from "../../common/sketch.interface";
import { IOverViewStatictis, IOverViewStatictisDay, IOverViewStatictisMonth, IOverViewStatictisQuarter, IOverViewStatictisYear, IStatictisSellerDay, IStatictisUserDay } from "../../common/statistic.interface";
import StatisticAPI from "../../api/statistic/statistic.api";
import { get } from "http";
import { IReport, IStatisticReport } from "../../common/report.interface";
import ReportApi from "../../api/report/report.api";
import { IWithdrawRequest } from "../../common/withdraw-request.interface";
import WithdrawApi from "../../api/withdraw/withdraw.api";


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
    userStatistic: IStatisticUser | undefined;
    reportList: IReport[];
    reportStatistic: IStatisticReport | undefined;
    totalReportRecords: number;
    sellerRequestList: any[];
    numberOfSellerRequest: number;
    withdrawRequestList: IWithdrawRequest[];
    totalWithdrawRequestRecord: number
    overViewStatisticUserDay: IStatictisUserDay | undefined;
    overViewStatisticSellerDay: IStatictisSellerDay | undefined;
    billList: IBill[];
    totalBillRecord: number;
    detailBill: any | undefined
}

const initState: ManagementState = {
    loading: false,
    userList: [],
    totalUserRecords: 0,
    sketchList: [],
    reportList: [],
    totalSketchRecords: 0,
    totalReportRecords: 0,
    reportStatistic: undefined,
    sketchStatistic: undefined,
    typeViewStatistic: 'day',
    overviewStatistic: undefined,
    overViewStatisticDay: undefined,
    overViewStatisticMonth: undefined,
    overViewStatisticQuarter: undefined,
    overViewStatisticYear: undefined,
    userStatistic: undefined,
    sellerRequestList: [],
    numberOfSellerRequest: 0,
    withdrawRequestList: [],
    totalWithdrawRequestRecord: 0,
    overViewStatisticUserDay: undefined,
    overViewStatisticSellerDay: undefined,
    billList: [],
    totalBillRecord: 0,
    detailBill: undefined
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

        //Get user statistic
        getUsersStatisticRequest(state) {
            state.loading = true;
        },
        getUsersStatisticSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload)
            state.userStatistic = action.payload
        },
        getUsersStatisticFail(state, action: any) {
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
            state.overViewStatisticDay = action.payload;
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

        // Get overview statistic user day
        getOverviewStatisticUserDayRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getOverviewStatisticUserDaySuccess(state, action: PayloadAction<any>) {
            console.log(action.payload);
            state.loading = false;
            state.overViewStatisticUserDay = action.payload[0];
        },

        getOverviewStatisticUserDayFail(state, action: PayloadAction<any>) {
            state.loading = false;
            if (action.payload.status === 400 || action.payload.status === 404) {
                notification.open({
                    message: action.payload.message,
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                });
            }
        },

        // Get overview statistic seller day

        getOverviewStatisticSellerDayRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getOverviewStatisticSellerDaySuccess(state, action: PayloadAction<any>) {
            console.log(action.payload);
            state.loading = false;
            state.overViewStatisticSellerDay = action.payload[0];
        },

        getOverviewStatisticSellerDayFail(state, action: PayloadAction<any>) {
            state.loading = false;
            if (action.payload.status === 400 || action.payload.status === 404) {
                notification.open({
                    message: action.payload.message,
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                });
            }
        },


        getReportsRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            // console.log("da chui vao",state.loading)
        },
        getReportsSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload)
            state.reportList = action.payload.items
            state.totalReportRecords = action.payload.total

        },
        getReportsFail(state, action: PayloadAction<any>) {
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

        //Get user statistic
        getReportsStatisticRequest(state) {
            state.loading = true;
        },
        getReportsStatisticSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload)
            state.reportStatistic = action.payload
        },
        getReportsStatisticFail(state, action: any) {
            state.loading = false;


        },

        // become seller request 
        getSellerRequests(state, action: PayloadAction<any>) {
            state.loading = true;
            // console.log("da chui vao",state.loading)
        },
        getSellerRequestsSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload)
            state.sellerRequestList = action.payload.items
            state.numberOfSellerRequest = action.payload.total

        },
        getSellerRequestsFail(state, action: PayloadAction<any>) {
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

        //Approve seller request
        approveSellerRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        approveSellerRequestSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: 'Chấp thuận yêu cầu thành công',
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });
        },
        approveSellerRequestFail(state, action: any) {
            state.loading = false;
        },

        // get list withdraw request 
        getWithdrawRequests(state, action: PayloadAction<any>) {
            state.loading = true;
            // console.log("da chui vao",state.loading)
        },
        getWithdrawRequestsSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload)
            state.withdrawRequestList = action.payload.items
            state.totalWithdrawRequestRecord = action.payload.total

        },
        getWithdrawRequestsFail(state, action: PayloadAction<any>) {
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


        //Approve withdraw request
        approveWithdrawRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        approveWithdrawRequestSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: 'Chấp thuận yêu cầu thành công',
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });
        },
        approveWithdrawRequestFail(state, action: any) {
            state.loading = false;
        },

        // get list bill
        getBillListRequests(state, action: PayloadAction<any>) {
            state.loading = true;
            // console.log("da chui vao",state.loading)
        },
        getBillListSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload)
            state.billList = action.payload.items
            state.totalBillRecord = action.payload.total

        },
        getBillListFail(state, action: PayloadAction<any>) {
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

        // get detail bill
        getDetailBillRequests(state, action: PayloadAction<any>) {
            state.loading = true;
            // console.log("da chui vao",state.loading)
        },
        getDetailBillSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload)
            state.detailBill = action.payload

        },
        getDetailBillFail(state, action: PayloadAction<any>) {
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
            )
        }
        )
    );

const getUsersStatistic$: RootEpic = (action$) =>
    action$.pipe(
        filter(getUsersStatisticRequest.match),
        mergeMap((re) => {
            console.log(re);

            return UserApi.getUsersStatistic().pipe(
                mergeMap((res: any) => {
                    console.log(res.data)
                    return [
                        managementSlice.actions.getUsersStatisticSuccess(res.data),
                    ];
                }),
                catchError((err) => [
                    managementSlice.actions.getUsersStatisticFail(err)]
                )
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

const getOverviewStatisticUserDay$: RootEpic = (action$) =>
    action$.pipe(
        filter(getOverviewStatisticUserDayRequest.match),
        concatMap((re) => {
            console.log(re);
            return StatisticAPI.getUserStatisticDay(re.payload).pipe(
                concatMap((res: any) => {
                    return [
                        managementSlice.actions.getOverviewStatisticUserDaySuccess(res.data),
                    ]
                }),
                catchError((err) => [managementSlice.actions.getOverviewStatisticUserDayFail(err)])
            );
        })
    );

const getOverviewStatisticSellerDay$: RootEpic = (action$) =>
    action$.pipe(
        filter(getOverviewStatisticSellerDayRequest.match),
        concatMap((re) => {
            console.log(re);
            return StatisticAPI.getSellerStatisticDay(re.payload).pipe(
                concatMap((res: any) => {
                    return [
                        managementSlice.actions.getOverviewStatisticSellerDaySuccess(res.data),
                    ]
                }),
                catchError((err) => [managementSlice.actions.getOverviewStatisticSellerDayFail(err)])
            );
        })
    );

const getReports$: RootEpic = (action$) =>
    action$.pipe(
        filter(getReportsRequest.match),
        mergeMap((re) => {
            console.log(re);


            return ReportApi.getAllReports(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getReportsSuccess(res.data),

                    ];
                }),
                catchError((err) => [managementSlice.actions.getReportsFail(err)])
            )
        })
    );

const getReportsStatistic$: RootEpic = (action$) =>
    action$.pipe(
        filter(getReportsStatisticRequest.match),
        mergeMap((re) => {
            console.log(re);

            return ReportApi.getReportStatistic().pipe(
                mergeMap((res: any) => {
                    console.log(res.data)
                    return [
                        managementSlice.actions.getReportsStatisticSuccess(res.data),
                    ];
                }),
                catchError((err) => [
                    managementSlice.actions.getReportsStatisticFail(err)]
                )
            );
        })
    );

const getSellerRequests$: RootEpic = (action$) =>
    action$.pipe(
        filter(getSellerRequests.match),
        mergeMap((re) => {
            console.log(re);


            return UserApi.getAllSellerRequest(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getSellerRequestsSuccess(res.data),

                    ];
                }),
                catchError((err) => [managementSlice.actions.getSellerRequestsFail(err)])
            )
        })
    );

const approveSellerRequest$: RootEpic = (action$) =>
    action$.pipe(
        filter(approveSellerRequest.match),
        mergeMap((re) => {
            console.log(re);

            return UserApi.approveSellerRequest(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(re.payload)
                    return [
                        managementSlice.actions.approveSellerRequestSuccess(res.data),
                        managementSlice.actions.getSellerRequests(re.payload.currentSearchValue)
                    ];
                }),
                catchError((err) => [managementSlice.actions.blockUsersFail(err)])
            );
        })
    );

const getWithdrawRequests$: RootEpic = (action$) =>
    action$.pipe(
        filter(getWithdrawRequests.match),
        mergeMap((re) => {
            console.log(re);


            return WithdrawApi.getAllWithdrawRequests(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getWithdrawRequestsSuccess(res.data),

                    ];
                }),
                catchError((err) => [managementSlice.actions.getWithdrawRequestsFail(err)])
            )
        })
    );

const approveWithdrawRequest$: RootEpic = (action$) =>
    action$.pipe(
        filter(approveWithdrawRequest.match),
        mergeMap((re) => {
            console.log(re);

            return WithdrawApi.approveWithdrawRequest(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(re.payload)
                    return [
                        managementSlice.actions.approveWithdrawRequestSuccess(res.data),
                        managementSlice.actions.getWithdrawRequests(re.payload.currentSearchValue)
                    ];
                }),
                catchError((err) => [managementSlice.actions.approveWithdrawRequestFail(err)])
            );
        })
    );

const getBillList$: RootEpic = (action$) =>
    action$.pipe(
        filter(getBillListRequests.match),
        mergeMap((re) => {
            console.log(re);


            return UserApi.getBillList(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getBillListSuccess(res.data),

                    ];
                }),
                catchError((err) => [managementSlice.actions.getBillListFail(err)])
            )
        })
    );

const getDetailBill$: RootEpic = (action$) =>
    action$.pipe(
        filter(getDetailBillRequests.match),
        mergeMap((re) => {
            console.log(re);


            return UserApi.getDetailBill(re.payload.id).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getDetailBillSuccess(res.data),

                    ];
                }),
                catchError((err) => [managementSlice.actions.getDetailBillFail(err)])
            )
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
    getOverviewStatisticYear$,
    getUsersStatistic$,
    getReports$,
    getReportsStatistic$,
    getSellerRequests$,
    approveSellerRequest$,
    getWithdrawRequests$,
    approveWithdrawRequest$,
    getOverviewStatisticUserDay$,
    getOverviewStatisticSellerDay$,
    getBillList$,
    getDetailBill$
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
    setViewStatistic,
    getUsersStatisticRequest,
    getReportsRequest,
    getReportsStatisticRequest,
    getSellerRequests,
    approveSellerRequest,
    getWithdrawRequests,
    approveWithdrawRequest,
    getOverviewStatisticUserDayRequest,
    getOverviewStatisticSellerDayRequest,
    getBillListRequests,
    getDetailBillRequests,

} = managementSlice.actions;
export const managementReducer = managementSlice.reducer;
