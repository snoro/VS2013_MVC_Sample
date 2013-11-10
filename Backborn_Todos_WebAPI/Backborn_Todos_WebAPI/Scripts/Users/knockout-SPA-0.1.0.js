/// <reference path="knockout-3.0.0.js" />
/// <reference path="knockout-3.0.0.js" />
/*
*   Knockout SPA(Single Page Application)
*   Created By Seiji Noro (https://github.com/snoro)
*
*   Source: 
*   MIT License: http://www.opensource.org/licenses/MIT
*/
(function ($, window) {
    //knockout-3.0.0.jsでテスト済み
    if (typeof (ko) === undefined) { throw 'Knockout is required, please ensure it is loaded before loading this knockout-SPA'; }
    //sammy-0.7.4.jsでテスト済み
    if (typeof (Sammy) === undefined) { throw 'Sammy is required, please ensure it is loaded before loading this knockout-SPA'; }


    (function (factory) {
        //公開する関数をkoSPAだけにする

        // Support module loading scenarios
        if (typeof define === 'function' && define.amd) {
            // AMD Anonymous Module
            define(['jquery'], factory);
        } else {
            // No module loader (plain <script> tag) - put directly in global namespace
            $.koSPA = window.koSPA = factory($);
        }
    })(function ($) {
        //koSPAオブジェクト
        var koSPA = {};
        koSPA.VERSION = '0.1.0';

        //CreateApp
        koSPA.CreateApp = function () {
            var koSPAAppFunc = arguments[0];
            //koSPAApp オブジェクトをNewする。
            var koSPAApp = new koSPA.App(koSPAAppFunc);
            return koSPAApp;
        };
        
        //koSPAApp オブジェクト
        //初期値を設定するためにFunctionにしている。
        koSPA.App = function (koSPAParm)
        {
            //////////////////////////////////
            //knockout Model
            //////////////////////////////////
            //これはprototypeでないとメモリにコピーされるためよくない
            koSPAParm.koSPA_Model_Detail.prototype.locationDetailUpdate = function () {
                window.location.hash = "#/DetailUpdate/" + this.Id();
            };


            //////////////////////////////////
            //knockout View-Model
            //////////////////////////////////
            //thisに直接代入すると一覧取得のときにkoSPA_ViewModelを発見できない
            this.koSPA_ViewModel = koSPAParm.koSPA_ViewModel;

            //knockout View-Model Property
            koSPAParm.koSPA_ViewModel.koSPAIsVisibleList = ko.observable(true);
            koSPAParm.koSPA_ViewModel.koSPAIsVisibleDetail = ko.observable(true);
            koSPAParm.koSPA_ViewModel.koSPAIsVisibleDetail_Update = ko.observable(true);



            //knockout View-Model Method
            //(knockoutはViewModelのをprototypeで書くと、clickメソッド等でエラーにになる)
            koSPAParm.koSPA_ViewModel.loadDetails = function () {
                this.koSPA_List.removeAll(); // reset
                $.ajax({
                    type: "GET",
                    url: koSPAParm.url_List,
                    dataType: "json"
                })
                    .done(function (result) {
                        $.each(result, function (i, p) {
                            koSPAParm.koSPA_ViewModel.koSPA_List.push(
                                koSPAParm.koSPA_ViewModel.createDBDetailToObj(p)
                            );
                            koSPAParm.koSPA_ViewModel.koSPA_List_Message("データを取得しました:" + new Date());
                    });
                });
            };


            koSPAParm.koSPA_ViewModel.locationList = function () {
                window.location.hash = "#/List/";
            };


            koSPAParm.koSPA_ViewModel.locationDetailCreate = function () {
                window.location.hash = "#/DetailCreate";
            };


            koSPAParm.koSPA_ViewModel.DBDetailCreate = function () {
                var dbDetailData = this.createDetailToObj();

                $.ajax({
                    type: "POST",
                    url: koSPAParm.url_Detail_Create,
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    data: JSON.stringify(dbDetailData)
                })
                .done(function (result) {
                    koSPAParm.koSPA_ViewModel.koSPA_List.push(
                        koSPAParm.koSPA_ViewModel.createDBDetailToObj(result)
                    );
                    koSPAParm.koSPA_ViewModel.koSPA_Detail_Message("データを新規作成しました:" + new Date());
                })
            };


            koSPAParm.koSPA_ViewModel.DBDetailUpdate = function () {
                var dbDetailData = this.createDetailToObj();

                $.ajax({
                    type: "POST",
                    url: koSPAParm.url_Detail_Update + koSPAParm.koSPA_ViewModel.koSPA_Detail.Id(),
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    data: JSON.stringify(dbDetailData)
                })
                .done(function (result) {
                    var detailOfList = koSPAParm.koSPA_ViewModel.findDetailFromList(koSPAParm.koSPA_ViewModel.koSPA_Detail.Id());
                    koSPAParm.koSPA_ViewModel.setDetailToList(detailOfList)
                    koSPAParm.koSPA_ViewModel.koSPA_Detail_Message("データを更新しました:" + new Date());
                })
            };

            koSPAParm.koSPA_ViewModel.DBDetailDelete = function () {
                $.ajax({
                    type: "DELETE",
                    url: koSPAParm.url_Detail_Delete + koSPAParm.koSPA_ViewModel.koSPA_Detail.Id(),
                    contentType: "application/json;charset=UTF-8",
                })
                .done(function (result) {
                    koSPAParm.koSPA_ViewModel.removeDetailFromList(koSPAParm.koSPA_ViewModel.koSPA_Detail.Id());
                    koSPAParm.koSPA_ViewModel.locationList();
                })
            };


            koSPAParm.koSPA_ViewModel.findDetailFromList = function (Id) {
                var detail = ko.utils.arrayFirst(this.koSPA_List(), function (t) {
                    return Id === t.Id();
                }, this);
                return detail;
            };
            koSPAParm.koSPA_ViewModel.removeDetailFromList = function (Id) {
                this.koSPA_List.remove(function (item) {
                    return item.Id() === Id;
                })
            };

            //////////////////////////////////
            //Sammy
            //////////////////////////////////
            var SammyDipatcher = function (Method, Param1) {

                switch (Method) {
                    case "":
                    case "List":
                        koSPAParm.koSPA_ViewModel.koSPA_List_Message("");
                        koSPAParm.koSPA_ViewModel.koSPAIsVisibleList(true);
                        koSPAParm.koSPA_ViewModel.koSPAIsVisibleDetail(false);
                        break;
                    case "DetailUpdate":
                        koSPAParm.koSPA_ViewModel.koSPA_Detail_Message("");
                        koSPAParm.koSPA_ViewModel.koSPAIsVisibleList(false);
                        koSPAParm.koSPA_ViewModel.koSPAIsVisibleDetail(true);
                        koSPAParm.koSPA_ViewModel.koSPAIsVisibleDetail_Update(true);

                        var detailFromList = koSPAParm.koSPA_ViewModel.findDetailFromList(Param1);
                        koSPAParm.koSPA_ViewModel.setListToDetail(detailFromList);

                        break;
                    case "DetailCreate":
                        //koSPAParm.koSPA_ViewModel.koSPA_Detail_Message("");

                        koSPAParm.koSPA_ViewModel.koSPAIsVisibleList(false);
                        koSPAParm.koSPA_ViewModel.koSPAIsVisibleDetail(true);
                        koSPAParm.koSPA_ViewModel.koSPAIsVisibleDetail_Update(false);

                        koSPAParm.koSPA_ViewModel.initDetail();

                        break;
                }
            }


            // Sammy を使ってブラウザの履歴に対応する(順番関係があるので、一番したにTOPを設置する。)
            this.SammyApp = $.sammy(function () {

                //Method/Parm1
                this.get("#/:Method/:Param1", function () {
                    var Method = this.params["Method"];
                    var Param1 = parseInt(this.params["Param1"]);
                    SammyDipatcher(Method, Param1);
                });

                //Method
                this.get("#/:Method", function () {
                    var Method = this.params["Method"];
                    var Param1 = -1;
                    SammyDipatcher(Method, Param1);
                });

                //Topページ( location.hashが空だった時の処理)
                this.get("", function () {
                    var Method = "";
                    var Param1 = -1;
                    SammyDipatcher(Method, Param1);
                });
            });
        };
        //run
        koSPA.App.prototype = {
            run: function () {
                ko.applyBindings(this.koSPA_ViewModel);
                this.SammyApp.run();
                this.koSPA_ViewModel.loadDetails();

            }
        };


        return koSPA;
    });
})(jQuery, window);
