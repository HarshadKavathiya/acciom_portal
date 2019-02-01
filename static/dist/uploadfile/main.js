(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./register/register.component */ "./src/app/register/register.component.ts");
/* harmony import */ var _startup_startup_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./startup/startup.component */ "./src/app/startup/startup.component.ts");
/* harmony import */ var _userdetail_userdetail_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./userdetail/userdetail.component */ "./src/app/userdetail/userdetail.component.ts");
/* harmony import */ var _dbdetails_dbdetails_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dbdetails/dbdetails.component */ "./src/app/dbdetails/dbdetails.component.ts");
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./guards/auth.guard */ "./src/app/guards/auth.guard.ts");
/* harmony import */ var _home_can_deactivate_guard_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./home/can-deactivate-guard.service */ "./src/app/home/can-deactivate-guard.service.ts");











var routes = [
    { path: '', redirectTo: '/startup', pathMatch: 'full' },
    { path: '*', component: _home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"] },
    { path: 'home', component: _home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_9__["AuthGuard"]], canDeactivate: [_home_can_deactivate_guard_service__WEBPACK_IMPORTED_MODULE_10__["CanDeactivateGuard"]] },
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"] },
    { path: 'register', component: _register_register_component__WEBPACK_IMPORTED_MODULE_5__["RegisterComponent"] },
    { path: 'user', component: _userdetail_userdetail_component__WEBPACK_IMPORTED_MODULE_7__["UserdetailComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_9__["AuthGuard"]] },
    { path: 'startup', component: _startup_startup_component__WEBPACK_IMPORTED_MODULE_6__["StartupComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_9__["AuthGuard"]] },
    { path: 'db', component: _dbdetails_dbdetails_component__WEBPACK_IMPORTED_MODULE_8__["DbdetailsComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_9__["AuthGuard"]] },
    { path: '**', redirectTo: '/startup', pathMatch: 'full' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
            providers: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_9__["AuthGuard"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n<ng4-loading-spinner [zIndex]=\"9999\"> </ng4-loading-spinner>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _uploadservice_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uploadservice.service */ "./src/app/uploadservice.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var AppComponent = /** @class */ (function () {
    function AppComponent(fileUploadService, router) {
        this.fileUploadService = fileUploadService;
        this.router = router;
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_uploadservice_service__WEBPACK_IMPORTED_MODULE_2__["UploadserviceService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var angular_2_dropdown_multiselect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-2-dropdown-multiselect */ "./node_modules/angular-2-dropdown-multiselect/esm5/angular-2-dropdown-multiselect.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./register/register.component */ "./src/app/register/register.component.ts");
/* harmony import */ var _dbdetails_dbdetails_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./dbdetails/dbdetails.component */ "./src/app/dbdetails/dbdetails.component.ts");
/* harmony import */ var _startup_startup_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./startup/startup.component */ "./src/app/startup/startup.component.ts");
/* harmony import */ var _uploadservice_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./uploadservice.service */ "./src/app/uploadservice.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/navbar/navbar.component.ts");
/* harmony import */ var _navbarlogout_navbarlogout_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./navbarlogout/navbarlogout.component */ "./src/app/navbarlogout/navbarlogout.component.ts");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm5/table.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/esm5/expansion.es5.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/esm5/radio.es5.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/esm5/tooltip.es5.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/esm5/progress-bar.es5.js");
/* harmony import */ var _directive_color1_directive__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./directive/color1.directive */ "./src/app/directive/color1.directive.ts");
/* harmony import */ var _appcolor_directive__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./appcolor.directive */ "./src/app/appcolor.directive.ts");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/esm5/progress-spinner.es5.js");
/* harmony import */ var ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ng4-loading-spinner */ "./node_modules/ng4-loading-spinner/ng4-loading-spinner.umd.js");
/* harmony import */ var ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var _home_can_deactivate_guard_service__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./home/can-deactivate-guard.service */ "./src/app/home/can-deactivate-guard.service.ts");
/* harmony import */ var _userdetail_userdetail_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./userdetail/userdetail.component */ "./src/app/userdetail/userdetail.component.ts");






































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_9__["HomeComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_17__["LoginComponent"],
                _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_20__["NavbarComponent"],
                _navbarlogout_navbarlogout_component__WEBPACK_IMPORTED_MODULE_21__["NavbarlogoutComponent"],
                _register_register_component__WEBPACK_IMPORTED_MODULE_10__["RegisterComponent"],
                _userdetail_userdetail_component__WEBPACK_IMPORTED_MODULE_34__["UserdetailComponent"],
                _startup_startup_component__WEBPACK_IMPORTED_MODULE_12__["StartupComponent"],
                _dbdetails_dbdetails_component__WEBPACK_IMPORTED_MODULE_11__["DbdetailsComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_9__["DialogOverviewExampleDialog"],
                _startup_startup_component__WEBPACK_IMPORTED_MODULE_12__["DialogOverviewExampleDialogstartup"],
                _directive_color1_directive__WEBPACK_IMPORTED_MODULE_29__["ColorDirective"],
                _appcolor_directive__WEBPACK_IMPORTED_MODULE_30__["AppcolorDirective"],
                _userdetail_userdetail_component__WEBPACK_IMPORTED_MODULE_34__["UserdetailComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_7__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_14__["HttpClientModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_16__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_16__["MatCheckboxModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__["MatFormFieldModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_19__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_16__["MatInputModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"],
                _angular_material_table__WEBPACK_IMPORTED_MODULE_22__["MatTableModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_23__["MatIconModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_24__["MatDialogModule"],
                _angular_material_radio__WEBPACK_IMPORTED_MODULE_26__["MatRadioModule"],
                _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_28__["MatProgressBarModule"],
                _angular_material_expansion__WEBPACK_IMPORTED_MODULE_25__["MatExpansionModule"],
                _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_27__["MatTooltipModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_4__["NgxPaginationModule"],
                angular_2_dropdown_multiselect__WEBPACK_IMPORTED_MODULE_5__["MultiselectDropdownModule"],
                _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_31__["MatProgressSpinnerModule"],
                ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_32__["Ng4LoadingSpinnerModule"].forRoot()
            ],
            providers: [_uploadservice_service__WEBPACK_IMPORTED_MODULE_13__["UploadserviceService"], _home_can_deactivate_guard_service__WEBPACK_IMPORTED_MODULE_33__["CanDeactivateGuard"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"]],
            entryComponents: [_home_home_component__WEBPACK_IMPORTED_MODULE_9__["DialogOverviewExampleDialog"], _startup_startup_component__WEBPACK_IMPORTED_MODULE_12__["DialogOverviewExampleDialogstartup"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/appcolor.directive.ts":
/*!***************************************!*\
  !*** ./src/app/appcolor.directive.ts ***!
  \***************************************/
/*! exports provided: AppcolorDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppcolorDirective", function() { return AppcolorDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppcolorDirective = /** @class */ (function () {
    function AppcolorDirective(eleRef, renderer) {
        this.eleRef = eleRef;
        this.renderer = renderer;
    }
    AppcolorDirective.prototype.ngOnInit = function () {
        this.renderer.setStyle(this.eleRef.nativeElement, 'background-color', 'blue');
    };
    AppcolorDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[appAppcolor]'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], AppcolorDirective);
    return AppcolorDirective;
}());



/***/ }),

/***/ "./src/app/dbdetails/dbdetails.component.css":
/*!***************************************************!*\
  !*** ./src/app/dbdetails/dbdetails.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".body{\ndisplay: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.heading{\n  \n  font-family: 'Quicksand', sans-serif;\n  font-weight: 300;\n}\n\n.form{\n  min-width:400px;\n  \n  display:flex;\n  flex-direction:column;\n  flex-wrap:wrap;\n  justify-content:center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGJkZXRhaWxzL2RiZGV0YWlscy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsY0FBYztFQUNaLHdCQUF3QjtFQUN4QixvQkFBb0I7Q0FDckI7O0FBRUQ7O0VBRUUscUNBQXFDO0VBQ3JDLGlCQUFpQjtDQUNsQjs7QUFDRDtFQUNFLGdCQUFnQjs7RUFFaEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixlQUFlO0VBQ2YsdUJBQXVCO0NBQ3hCIiwiZmlsZSI6InNyYy9hcHAvZGJkZXRhaWxzL2RiZGV0YWlscy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJvZHl7XG5kaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmhlYWRpbmd7XG4gIFxuICBmb250LWZhbWlseTogJ1F1aWNrc2FuZCcsIHNhbnMtc2VyaWY7XG4gIGZvbnQtd2VpZ2h0OiAzMDA7XG59XG4uZm9ybXtcbiAgbWluLXdpZHRoOjQwMHB4O1xuICBcbiAgZGlzcGxheTpmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjpjb2x1bW47XG4gIGZsZXgtd3JhcDp3cmFwO1xuICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/dbdetails/dbdetails.component.html":
/*!****************************************************!*\
  !*** ./src/app/dbdetails/dbdetails.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navbarlogout></app-navbarlogout>\n<div class=\"body\">\n<mat-card class=\"mat\">\n    <div class=\"heading\" > Update Your DB Details</div>\n    <form class=\"form\" [formGroup]=\"createForm\">\n       \n        <mat-form-field class=\"example-full-width\">\n            <input type=\"text\" autocomplete=\"off\" matInput placeholder=\"Database Type*\" formControlName=\"type\">\n            <mat-error>Enter Database Type</mat-error>\n        </mat-form-field>\n        <mat-form-field class=\"example-full-width\">\n            <input type=\"text\" autocomplete=\"off\" matInput placeholder=\" Database Name*\" formControlName=\"name\">\n            <mat-error>Enter  Name</mat-error>\n        </mat-form-field>\n    \n        <mat-form-field class=\"example-full-width\">\n            <input type=\"text\" autocomplete=\"off\" matInput placeholder=\" hostname*\" formControlName=\"hostname\">\n            <mat-error>Enter Host Name</mat-error>\n        </mat-form-field>\n        <mat-form-field class=\"example-full-width\">\n            <input type=\"text\" autocomplete=\"off\" matInput placeholder=\" Username*\" formControlName=\"username\">\n            <mat-error>Enter Username </mat-error>\n        </mat-form-field>\n        <mat-form-field class=\"example-full-width\">\n            <input type=\"password\" autocomplete=\"off\" matInput placeholder=\" Password*\" formControlName=\"password\">\n            <mat-error>Enter Password </mat-error>\n        </mat-form-field>\n\n        <button mat-raised-button [disabled]=\"createForm.invalid\" (click)=\"Update()\" color=\"primary\" >Update</button>\n        \n    </form>\n</mat-card>\n\n\n</div>"

/***/ }),

/***/ "./src/app/dbdetails/dbdetails.component.ts":
/*!**************************************************!*\
  !*** ./src/app/dbdetails/dbdetails.component.ts ***!
  \**************************************************/
/*! exports provided: DbdetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DbdetailsComponent", function() { return DbdetailsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _uploadservice_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../uploadservice.service */ "./src/app/uploadservice.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_5__);






var DbdetailsComponent = /** @class */ (function () {
    function DbdetailsComponent(fb, fileUploadService, router) {
        this.fb = fb;
        this.fileUploadService = fileUploadService;
        this.router = router;
        this.createForm = fb.group({
            type: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            hostname: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
    }
    DbdetailsComponent.prototype.ngOnInit = function () {
    };
    DbdetailsComponent.prototype.Update = function () {
        console.log(this.createForm.invalid);
        this.fileUploadService.StoreDB(this.createForm.value).subscribe(function (data) {
            console.log(data);
            if (data.Success) {
                console.log(data);
                sweetalert2__WEBPACK_IMPORTED_MODULE_5___default()("Success", "Succesfully Updated Details", "success");
            }
            else {
                console.log("error");
                sweetalert2__WEBPACK_IMPORTED_MODULE_5___default()("error", "Something went wrong", "error");
            }
        });
    };
    DbdetailsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dbdetails',
            template: __webpack_require__(/*! ./dbdetails.component.html */ "./src/app/dbdetails/dbdetails.component.html"),
            styles: [__webpack_require__(/*! ./dbdetails.component.css */ "./src/app/dbdetails/dbdetails.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _uploadservice_service__WEBPACK_IMPORTED_MODULE_3__["UploadserviceService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], DbdetailsComponent);
    return DbdetailsComponent;
}());



/***/ }),

/***/ "./src/app/directive/color1.directive.ts":
/*!***********************************************!*\
  !*** ./src/app/directive/color1.directive.ts ***!
  \***********************************************/
/*! exports provided: ColorDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorDirective", function() { return ColorDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ColorDirective = /** @class */ (function () {
    function ColorDirective(elementRef) {
        this.elementRef = elementRef;
    }
    ColorDirective.prototype.ngOnInit = function () {
        this.elementRef.nativeElement.style.backgroundColor = 'red';
    };
    ColorDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[appColor]'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]])
    ], ColorDirective);
    return ColorDirective;
}());



/***/ }),

/***/ "./src/app/guards/auth.guard.ts":
/*!**************************************!*\
  !*** ./src/app/guards/auth.guard.ts ***!
  \**************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _uploadservice_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../uploadservice.service */ "./src/app/uploadservice.service.ts");




var AuthGuard = /** @class */ (function () {
    function AuthGuard(fileUploadService, router) {
        this.fileUploadService = fileUploadService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (this.fileUploadService.loggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    };
    AuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_uploadservice_service__WEBPACK_IMPORTED_MODULE_3__["UploadserviceService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/home/can-deactivate-guard.service.ts":
/*!******************************************************!*\
  !*** ./src/app/home/can-deactivate-guard.service.ts ***!
  \******************************************************/
/*! exports provided: CanDeactivateGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanDeactivateGuard", function() { return CanDeactivateGuard; });
var CanDeactivateGuard = /** @class */ (function () {
    function CanDeactivateGuard() {
    }
    CanDeactivateGuard.prototype.canDeactivate = function (component, currentRoute, currentState, nextState) {
        return component.canDeactivate();
    };
    return CanDeactivateGuard;
}());



/***/ }),

/***/ "./src/app/home/dialog-overview-example-dialog.html":
/*!**********************************************************!*\
  !*** ./src/app/home/dialog-overview-example-dialog.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div mat-dialog-content>\n  <p>Select Your Own Sheet Name?</p>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"data.suitename\">\n  </mat-form-field>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"onNoClick()\">No Thanks</button>\n  <button mat-button [mat-dialog-close]=\"data.suitename\" cdkFocusInitial>Ok</button>\n</div>"

/***/ }),

/***/ "./src/app/home/home.component.css":
/*!*****************************************!*\
  !*** ./src/app/home/home.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card{\n \n  background-color: #eee;\n  display:flex;\n  justify-content: center;\n  padding-top:10px;\n  background-image: linear-gradient(to bottom right, #050505, #373636);\n  float:left;\n    width:100%;\n  \n    height:100vh;\n}\n\n@media screen and (min-height:100vh)\n{\n  .card{\n \n    background-color: #eee;\n    display:flex;\n    justify-content: center;\n    padding-top:10px;\n    background-image: linear-gradient(to bottom right, #050505, #373636);\n    float:left;\n      width:100%;\n      height:300vh;\n  }\n  \n}\n\n.file{\n  margin-bottom: 5px;\n}\n\ninput, label {\n    display: block;\n    border:2px solid black;\n  }\n\ninput[type=file]::-webkit-file-upload-button {\n    border: 0.3px solid grey;\n    background: rgb(20, 20, 20);\n    font-family:'Open Sans', sans-serif;\n    color:white;\n  }\n\n.btn{\n    background: rgb(20, 20, 20);\n    color:white;\n  }\n\n.res{\n    font-size:20px;\n    letter-spacing: 1px;\n    font-weight: 10px;\n  }\n\n.result{\n    font-size: size 20px;\n    font-weight: 600;\n    font-family:'Open Sans', sans-serif;\n    align-content: center\n    /* font-family:inherit */\n  }\n\n.result-card{\n    min-width:300px;\n    min-height:200px;\n    border:2px solid black;\n  }\n\n.cright{\n    text-align: center;\n    margin: 12px 12px 12px 12px;\n}\n\n.testcase{\n  text-align: center\n}\n\n.uploadbtn{\n  margin-right:15px;\n}\n\n.for-form{\n  border:2px solid black; \n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0VBRUUsdUJBQXVCO0VBQ3ZCLGFBQWE7RUFDYix3QkFBd0I7RUFDeEIsaUJBQWlCO0VBQ2pCLHFFQUFxRTtFQUNyRSxXQUFXO0lBQ1QsV0FBVzs7SUFFWCxhQUFhO0NBQ2hCOztBQUVEOztFQUVFOztJQUVFLHVCQUF1QjtJQUN2QixhQUFhO0lBQ2Isd0JBQXdCO0lBQ3hCLGlCQUFpQjtJQUNqQixxRUFBcUU7SUFDckUsV0FBVztNQUNULFdBQVc7TUFDWCxhQUFhO0dBQ2hCOztDQUVGOztBQUVEO0VBQ0UsbUJBQW1CO0NBQ3BCOztBQUdEO0lBQ0ksZUFBZTtJQUNmLHVCQUF1QjtHQUN4Qjs7QUFFRDtJQUNFLHlCQUF5QjtJQUN6Qiw0QkFBNEI7SUFDNUIsb0NBQW9DO0lBQ3BDLFlBQVk7R0FDYjs7QUFDRDtJQUNFLDRCQUE0QjtJQUM1QixZQUFZO0dBQ2I7O0FBRUQ7SUFDRSxlQUFlO0lBQ2Ysb0JBQW9CO0lBQ3BCLGtCQUFrQjtHQUNuQjs7QUFDRDtJQUNFLHFCQUFxQjtJQUNyQixpQkFBaUI7SUFDakIsb0NBQW9DO0lBQ3BDLHFCQUFxQjtJQUNyQix5QkFBeUI7R0FDMUI7O0FBQ0Q7SUFDRSxnQkFBZ0I7SUFDaEIsaUJBQWlCO0lBQ2pCLHVCQUF1QjtHQUN4Qjs7QUFFRDtJQUNFLG1CQUFtQjtJQUNuQiw0QkFBNEI7Q0FDL0I7O0FBRUQ7RUFDRSxrQkFBa0I7Q0FDbkI7O0FBQ0Q7RUFDRSxrQkFBa0I7Q0FDbkI7O0FBRUQ7RUFDRSx1QkFBdUI7Q0FDeEIiLCJmaWxlIjoic3JjL2FwcC9ob21lL2hvbWUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jYXJke1xuIFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xuICBkaXNwbGF5OmZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBwYWRkaW5nLXRvcDoxMHB4O1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tIHJpZ2h0LCAjMDUwNTA1LCAjMzczNjM2KTtcbiAgZmxvYXQ6bGVmdDtcbiAgICB3aWR0aDoxMDAlO1xuICBcbiAgICBoZWlnaHQ6MTAwdmg7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4taGVpZ2h0OjEwMHZoKVxue1xuICAuY2FyZHtcbiBcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xuICAgIGRpc3BsYXk6ZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBwYWRkaW5nLXRvcDoxMHB4O1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20gcmlnaHQsICMwNTA1MDUsICMzNzM2MzYpO1xuICAgIGZsb2F0OmxlZnQ7XG4gICAgICB3aWR0aDoxMDAlO1xuICAgICAgaGVpZ2h0OjMwMHZoO1xuICB9XG4gIFxufVxuXG4uZmlsZXtcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xufVxuXG5cbmlucHV0LCBsYWJlbCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgYm9yZGVyOjJweCBzb2xpZCBibGFjaztcbiAgfVxuICBcbiAgaW5wdXRbdHlwZT1maWxlXTo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xuICAgIGJvcmRlcjogMC4zcHggc29saWQgZ3JleTtcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMjAsIDIwLCAyMCk7XG4gICAgZm9udC1mYW1pbHk6J09wZW4gU2FucycsIHNhbnMtc2VyaWY7XG4gICAgY29sb3I6d2hpdGU7XG4gIH1cbiAgLmJ0bntcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMjAsIDIwLCAyMCk7XG4gICAgY29sb3I6d2hpdGU7XG4gIH1cblxuICAucmVze1xuICAgIGZvbnQtc2l6ZToyMHB4O1xuICAgIGxldHRlci1zcGFjaW5nOiAxcHg7XG4gICAgZm9udC13ZWlnaHQ6IDEwcHg7XG4gIH1cbiAgLnJlc3VsdHtcbiAgICBmb250LXNpemU6IHNpemUgMjBweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGZvbnQtZmFtaWx5OidPcGVuIFNhbnMnLCBzYW5zLXNlcmlmO1xuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlclxuICAgIC8qIGZvbnQtZmFtaWx5OmluaGVyaXQgKi9cbiAgfVxuICAucmVzdWx0LWNhcmR7XG4gICAgbWluLXdpZHRoOjMwMHB4O1xuICAgIG1pbi1oZWlnaHQ6MjAwcHg7XG4gICAgYm9yZGVyOjJweCBzb2xpZCBibGFjaztcbiAgfVxuXG4gIC5jcmlnaHR7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIG1hcmdpbjogMTJweCAxMnB4IDEycHggMTJweDtcbn1cblxuLnRlc3RjYXNle1xuICB0ZXh0LWFsaWduOiBjZW50ZXJcbn1cbi51cGxvYWRidG57XG4gIG1hcmdpbi1yaWdodDoxNXB4O1xufVxuXG4uZm9yLWZvcm17XG4gIGJvcmRlcjoycHggc29saWQgYmxhY2s7IFxufVxuIl19 */"

/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navbarlogout></app-navbarlogout>\n<div  class=\"card\">\n  <div class=\"form-group\">\n    <mat-card class=\"for-form\">\n   \n        <mat-progress-bar  mode=\"determinate\" value=\"{{ prog }}\"></mat-progress-bar>\n       \n\n            <br>\n            <br>\n            <mat-card-title>Upload Your File Here</mat-card-title>\n        <div class=\"container\">\n            <mat-card-content><input type=\"file\"  [(ngModel)]='filevalue' class=\"file\" style=\"display: inline-block;\" (change)=\"incomingfile($event)\" placeholder=\"Upload file\" accept=\".xlsx\"><br></mat-card-content>\n        </div>{{error}}<br>\n    </mat-card>\n    <div *ngIf=\"show\">\n        <mat-card class=\"result-card\">\n            <h2>Select The Page:</h2>\n           \n            <div *ngFor=\"let page of Pages\">\n                <mat-radio-button  value=\"{{ page }}\"\n                (change)=\"selectradio(page)\">{{page}}</mat-radio-button><br><br>\n            </div>\n            <button mat-raised-button [disabled]=\"disable\"  (click)=\"Next(selectedradio)\">Next</button>\n         </mat-card>\n    </div>\n\n\n    <div *ngIf=\"show1\">\n        \n        <mat-card class=\"result-card\">\n            <p class=\"result\">{{ msg }}</p>\n           \n           \n            <table *ngIf=\"show1\" class=\"cright\" cellspacing=12>\n                <div *ngIf=\"afterupload\">\n                    <!-- edit this!!!!-->\n                        \n                <tr>\n                    <th>TestCase</th>\n                    <th>Check</th>\n                </tr>\n  \n               \n                   Select All <input id=\"checkid\" type=\"checkbox\" (change)=\"selectAll()\" [checked]=\"selectedAll\" style=\"float: left;\"> \n                    \n                 \n               \n                <tr *ngFor=\" let case of all_cases\" class=\"cright\">\n\n                    <td >{{ case.name }}</td>\n\n                    <td>   <input class=\"form-check-input\" \n                    value=\"{{ case.name }}\" \n                    [(ngModel)]=\"case.selected\" \n                   \n                    type=\"checkbox\" (change)=\"selectBadge($event, case.name)\" >\n                    </td>\n                </tr>\n                </div><button mat-raised-button  class=\"uploadbtn\" color=\"primary\" [disabled]=\"disable2\" (click)=\"OnClick(0)\" >Upload</button> \n                <button mat-raised-button color=\"primary\" [disabled]=\"disable2\" (click)=\"OnClick(1)\" >Upload And Execute </button> \n                <p>{{ result }}</p>\n                <div *ngIf=\"dis\">\n                <h4>Test Cases To be Tested</h4>\n                </div>\n            </table>\n            <!-- <div *ngFor=\"let x of selectedValue \"> {{ x.testCases }}</div> -->\n           \n        </mat-card>\n    </div>\n        \n </div>     \n</div>\n\n\n\n\n\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent, DialogOverviewExampleDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogOverviewExampleDialog", function() { return DialogOverviewExampleDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _uploadservice_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../uploadservice.service */ "./src/app/uploadservice.service.ts");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! xlsx */ "./node_modules/xlsx/xlsx.js");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(xlsx__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");







var HomeComponent = /** @class */ (function () {
    function HomeComponent(fileUploadService, route, router, dialog) {
        this.fileUploadService = fileUploadService;
        this.route = route;
        this.router = router;
        this.dialog = dialog;
        this.fileToUpload = null;
        this.selectedValue = [];
        this.show = false;
        this.show1 = false;
        this.Pages = [];
        this.copyarr = [];
        this.all_cases = [];
        this.disable = true;
        this.disable2 = true;
        this.selectedtestcases = [];
        this.checkboxes = [];
        this.changessaved = false;
        this.prog = 0;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.afterupload = true;
        this.changessaved = true;
    };
    HomeComponent.prototype.canDeactivate = function () {
        if (!this.changessaved) {
            return confirm('Do you want to discard the changes?');
        }
        else {
            return true;
        }
    };
    HomeComponent.prototype.OnClick = function (v) {
        var _this = this;
        console.log("the test cases are");
        // console.log(this.selectedValue)
        // console.log(this.selectedradio)
        console.log(v);
        this.MyModel = null;
        this.show = false;
        this.show1 = false;
        console.log(this.suitename);
        if (v == 0) {
            this.executevalue = 0;
        }
        else {
            this.executevalue = 1;
        }
        this.changessaved = true;
        this.fileUploadService.postFile(this.file, this.selectedradio, this.selectedValue, this.suitename, this.executevalue).subscribe(function (data) {
            _this.name = data['message'];
            // console.log(data)
            _this.filevalue = null;
            _this.disable = true;
            _this.disable2 = true;
            sweetalert2__WEBPACK_IMPORTED_MODULE_5___default()("Success", "Succesfully Uploaded the file", "success");
            _this.all_cases = [];
            _this.initialisecases();
            _this.response = _this.name;
            _this.router.navigate(['/startup']);
            _this.selectedValue = [];
        }, function (error) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_5___default()("error", " filecannot be uploaded", "error");
            _this.filevalue = null;
            _this.all_cases = [];
            _this.response = "file Can not be Uploaded";
            _this.initialisecases();
        });
    };
    HomeComponent.prototype.initialisecases = function () {
        this.selectedValue = [];
    };
    HomeComponent.prototype.incomingfile = function (event) {
        this.filereadit(event);
    };
    HomeComponent.prototype.filereadit = function (event) {
        var _this = this;
        this.selectedValue = [];
        this.all_cases = [];
        this.changessaved = false;
        this.file = event.target.files[0];
        this.show = true;
        this.prog = 50;
        this.show1 = false;
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
            _this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(_this.arrayBuffer);
            var arr = new Array();
            for (var i = 0; i != data.length; ++i)
                arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            _this.workbook = xlsx__WEBPACK_IMPORTED_MODULE_3__["read"](bstr, { type: "binary" });
            if (typeof _this.Pages !== 'undefined' && _this.Pages.length > 0) {
                _this.Pages = [];
            }
            for (var x = 0; x != data.length; x++) {
                if (_this.workbook.SheetNames[x] == undefined) {
                    break;
                }
                else {
                    _this.Pages.push(_this.workbook.SheetNames[x]); //arr1 contains all the sheetnames
                }
            }
            console.log(_this.Pages);
        };
        fileReader.readAsArrayBuffer(this.file);
    };
    HomeComponent.prototype.selectBadge = function (e, x) {
        if (e.target.checked) {
            this.disable2 = false;
            this.selectedValue.push(x);
        }
        else {
            this.selectedValue.splice(this.selectedValue.indexOf(x), 1);
        }
        this.selectedtestcases = this.selectedValue;
        console.log(this.selectedValue);
        var totalSelected = 0;
        for (var i = 0; i < this.all_cases.length; i++) {
            if (this.all_cases[i].selected)
                totalSelected++;
        }
        this.selectedAll = totalSelected === this.all_cases.length;
        return true;
    };
    HomeComponent.prototype.selectradio = function (x) {
        this.disable = false;
        this.selectedradio = x;
        console.log(this.selectedradio);
    };
    HomeComponent.prototype.testselect = function () {
        console.log('trueeeee');
        this.dis = true;
        console.log(this.selectedValue);
        this.afterupload = false;
    };
    HomeComponent.prototype.selectAll = function () {
        this.selectedValue = [];
        this.disable2 = false;
        this.selectedAll = !this.selectedAll;
        if (this.selectedAll) {
            for (var i = 0; i < this.all_cases.length; i++) {
                this.all_cases[i].selected = this.selectedAll;
                console.log("runit in if");
                this.selectedValue.push(this.all_cases[i].name);
            }
        }
        else if (!this.selectedAll) {
            for (var i = 0; i < this.all_cases.length; i++) {
                this.all_cases[i].selected = this.selectedAll;
                console.log("runit in elif ");
            }
            this.selectedValue = [];
        }
        console.log(this.selectedValue);
    };
    HomeComponent.prototype.Next = function (s) {
        var _this = this;
        this.show = false;
        this.show1 = true;
        var dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            width: '250px',
            data: { suitename: this.suitename }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.suitename = result;
        });
        this.i = this.Pages.findIndex(function (k) { return k == s; });
        this.sheet_name = this.workbook.SheetNames[this.i];
        this.sheet = this.workbook.Sheets[this.sheet_name];
        this.resfinal = (xlsx__WEBPACK_IMPORTED_MODULE_3__["utils"].sheet_to_json(this.sheet, { raw: true }));
        for (var i = 0; i < this.resfinal.length; i++) {
            this.all_cases.push({ 'name': this.resfinal[i]['Test Case ID'], 'selected': false }); //TO DO:HARD CODED.['Test Class']
        }
        console.log(this.all_cases);
        console.log(this.i);
        this.prog = 75;
    };
    HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/home/home.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_uploadservice_service__WEBPACK_IMPORTED_MODULE_2__["UploadserviceService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDialog"]])
    ], HomeComponent);
    return HomeComponent;
}());

var DialogOverviewExampleDialog = /** @class */ (function () {
    function DialogOverviewExampleDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    DialogOverviewExampleDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogOverviewExampleDialog = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'dialog-overview-example-dialog',
            template: __webpack_require__(/*! ./dialog-overview-example-dialog.html */ "./src/app/home/dialog-overview-example-dialog.html"),
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDialogRef"], Object])
    ], DialogOverviewExampleDialog);
    return DialogOverviewExampleDialog;
}());



/***/ }),

/***/ "./src/app/login/login.component.css":
/*!*******************************************!*\
  !*** ./src/app/login/login.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".body{\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n}\n.card{\n  margin-top:10%;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n}\n.heading{\n  text-align: center;\n  margin-bottom:10px;\n  font-family: 'Open Sans', sans-serif;\n  font-weight: 900;\n}\n.form {\n   \n    min-width:400px;\n  \n    display:flex;\n    flex-direction:column;\n    flex-wrap:wrap;\n    justify-content:center;\n  }\n@media screen and (max-width:400px)\n{\n  .form{\n    min-width:200px;\n  \n    display:flex;\n    flex-direction:column;\n    flex-wrap:wrap;\n    justify-content:center;\n  }\n}\n.example-full-width {\n    \n    flex:1 1 0;\n   \n  }\n.register{\n    font-family: 'Open Sans', sans-serif;\n    position:relative;\n    text-align:center;\n    color:red;\n\n  }\n\n  \n  \n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQWM7RUFDZCx3QkFBd0I7RUFDeEIsb0JBQW9COztDQUVyQjtBQUNEO0VBQ0UsZUFBZTtFQUNmLDZFQUE2RTtDQUM5RTtBQUVEO0VBQ0UsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixxQ0FBcUM7RUFDckMsaUJBQWlCO0NBQ2xCO0FBQ0Q7O0lBRUksZ0JBQWdCOztJQUVoQixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGVBQWU7SUFDZix1QkFBdUI7R0FDeEI7QUFFQTs7RUFFRDtJQUNFLGdCQUFnQjs7SUFFaEIsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixlQUFlO0lBQ2YsdUJBQXVCO0dBQ3hCO0NBQ0Y7QUFFQzs7SUFFRSxXQUFXOztHQUVaO0FBRUQ7SUFDRSxxQ0FBcUM7SUFDckMsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixVQUFVOztHQUVYIiwiZmlsZSI6InNyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ib2R5e1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcblxufVxuLmNhcmR7XG4gIG1hcmdpbi10b3A6MTAlO1xuICBib3gtc2hhZG93OiAwIDRweCA4cHggMCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgNnB4IDIwcHggMCByZ2JhKDAsIDAsIDAsIDAuMTkpO1xufVxuXG4uaGVhZGluZ3tcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOjEwcHg7XG4gIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IDkwMDtcbn1cbi5mb3JtIHtcbiAgIFxuICAgIG1pbi13aWR0aDo0MDBweDtcbiAgXG4gICAgZGlzcGxheTpmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcbiAgICBmbGV4LXdyYXA6d3JhcDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuICB9XG5cbiAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NDAwcHgpXG57XG4gIC5mb3Jte1xuICAgIG1pbi13aWR0aDoyMDBweDtcbiAgXG4gICAgZGlzcGxheTpmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcbiAgICBmbGV4LXdyYXA6d3JhcDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuICB9XG59XG4gIFxuICAuZXhhbXBsZS1mdWxsLXdpZHRoIHtcbiAgICBcbiAgICBmbGV4OjEgMSAwO1xuICAgXG4gIH1cblxuICAucmVnaXN0ZXJ7XG4gICAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnLCBzYW5zLXNlcmlmO1xuICAgIHBvc2l0aW9uOnJlbGF0aXZlO1xuICAgIHRleHQtYWxpZ246Y2VudGVyO1xuICAgIGNvbG9yOnJlZDtcblxuICB9XG5cbiAgXG4gICJdfQ== */"

/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<ng4-loading-spinner> </ng4-loading-spinner>\n<div class=\"body\">\n        <mat-card class=\"card\">\n            <div class=\"heading\" > Log In Yourself</div>\n<form class=\"form\" [formGroup]=\"createForm\">\n   \n    <mat-form-field class=\"example-full-width\">\n        <input type=\"email\" autocomplete=\"off\" matInput placeholder=\"email*\" formControlName=\"email\">\n        <mat-error>please enter valid email</mat-error>\n    </mat-form-field>\n\n    <mat-form-field class=\"example-full-width\">\n        <input type=\"password\" autocomplete=\"off\" matInput placeholder=\" Password*\" formControlName=\"password\">\n        <mat-error>please enter valid password</mat-error>\n    </mat-form-field>\n    <button mat-raised-button (click)=\"LogIn()\" color=\"primary\" >Login</button>\n    \n</form>\n<div class=\"register\">Not registered? <button  mat-button color=\"primary\" (click)=\"signup()\" >Signup here</button></div>\n\n</mat-card>\n</div>\n\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _uploadservice_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../uploadservice.service */ "./src/app/uploadservice.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, fileUploadService, router) {
        this.fb = fb;
        this.fileUploadService = fileUploadService;
        this.router = router;
        this.createForm = fb.group({
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        if ((this.fileUploadService.loggedIn())) {
            this.router.navigate(['home']);
        }
    };
    LoginComponent.prototype.LogIn = function () {
        var _this = this;
        console.log(this.createForm.value);
        this.fileUploadService.authenticateUser(this.createForm.value).subscribe(function (data) {
            if (data.success) {
                console.log(data.expires_time);
                _this.fileUploadService.storeUserData(data.access_token, data.user, data.uid, data.refresh_token, data.name);
                _this.router.navigate(['startup']);
            }
            else {
            }
        });
    };
    LoginComponent.prototype.signup = function () {
        this.router.navigate(['register']);
    };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/login/login.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _uploadservice_service__WEBPACK_IMPORTED_MODULE_3__["UploadserviceService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/navbar/navbar.component.css":
/*!*********************************************!*\
  !*** ./src/app/navbar/navbar.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".nav{\n    background-color:rgb(12, 0, 0);\n    color:white;\n    display: flex;\n    justify-content: flex-start;\n\n   \n    margin-bottom:15px;\n    font-family: 'Open Sans', sans-serif;\n   \n\n\n}\n\n/* @media screen and (max-width:200px)\n{.nav{\n\n    margin-bottom:10px;\n    display: flex;\n    align-items: flex-start;\n    letter-spacing: 2px;\n    font-size:25px;\n    \n\n\n} */\n\n.heading{\n \n    letter-spacing: 5px;\n    font-size:25px;\n    font-weight:1000;\n    text-transform: capitalize;\n   \n\n  \n}\n\n.loginbut{\n    font:20px;\n    color:#fff;\n    margin-left:auto\n\n\n\n}\n\n.loginbut:hover{\n    background-color: lightgrey;\n}\n\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbmF2YmFyL25hdmJhci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksK0JBQStCO0lBQy9CLFlBQVk7SUFDWixjQUFjO0lBQ2QsNEJBQTRCOzs7SUFHNUIsbUJBQW1CO0lBQ25CLHFDQUFxQzs7OztDQUl4Qzs7QUFFRDs7Ozs7Ozs7Ozs7SUFXSTs7QUFFSjs7SUFFSSxvQkFBb0I7SUFDcEIsZUFBZTtJQUNmLGlCQUFpQjtJQUNqQiwyQkFBMkI7Ozs7Q0FJOUI7O0FBQ0Q7SUFDSSxVQUFVO0lBQ1YsV0FBVztJQUNYLGdCQUFnQjs7OztDQUluQjs7QUFBQTtJQUNHLDRCQUE0QjtDQUMvQiIsImZpbGUiOiJzcmMvYXBwL25hdmJhci9uYXZiYXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5uYXZ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjpyZ2IoMTIsIDAsIDApO1xuICAgIGNvbG9yOndoaXRlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuXG4gICBcbiAgICBtYXJnaW4tYm90dG9tOjE1cHg7XG4gICAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnLCBzYW5zLXNlcmlmO1xuICAgXG5cblxufVxuXG4vKiBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjIwMHB4KVxuey5uYXZ7XG5cbiAgICBtYXJnaW4tYm90dG9tOjEwcHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICBsZXR0ZXItc3BhY2luZzogMnB4O1xuICAgIGZvbnQtc2l6ZToyNXB4O1xuICAgIFxuXG5cbn0gKi9cblxuLmhlYWRpbmd7XG4gXG4gICAgbGV0dGVyLXNwYWNpbmc6IDVweDtcbiAgICBmb250LXNpemU6MjVweDtcbiAgICBmb250LXdlaWdodDoxMDAwO1xuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICAgXG5cbiAgXG59XG4ubG9naW5idXR7XG4gICAgZm9udDoyMHB4O1xuICAgIGNvbG9yOiNmZmY7XG4gICAgbWFyZ2luLWxlZnQ6YXV0b1xuXG5cblxufS5sb2dpbmJ1dDpob3ZlcntcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyZXk7XG59XG5cbiJdfQ== */"

/***/ }),

/***/ "./src/app/navbar/navbar.component.html":
/*!**********************************************!*\
  !*** ./src/app/navbar/navbar.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar class=\"nav\"><div class=\"heading\">Acciom-Tool</div> </mat-toolbar>\n  <!-- <button *ngIf=\"!login\" class='loginbut' mat-button color=\"primary\" >Logout</button> -->\n"

/***/ }),

/***/ "./src/app/navbar/navbar.component.ts":
/*!********************************************!*\
  !*** ./src/app/navbar/navbar.component.ts ***!
  \********************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var NavbarComponent = /** @class */ (function () {
    function NavbarComponent() {
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.css */ "./src/app/navbar/navbar.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/navbarlogout/navbarlogout.component.css":
/*!*********************************************************!*\
  !*** ./src/app/navbarlogout/navbarlogout.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".nav{\n    background-color:rgb(1, 0, 0);\n    color:white;\n    display: flex;\n    justify-content: flex-start;\n   /* flex-wrap:wrap-reverse; */\n    font-family: 'Hammersmith One', sans-serif;\n\n\n}\nimg {\n    width: 60px ;\n  height: 60px; \n  -o-object-fit: contain; \n     object-fit: contain;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);  \n  padding: 0px;\n \n}\n/* @media screen and (max-width:200px)\n{.nav{\n\n    margin-bottom:10px;\n    display: flex;\n    align-items: flex-start;\n    letter-spacing: 2px;\n    font-size:25px;\n    \n\n\n} */\n.heading{\n \n    letter-spacing: 5px;\n    font-size:25px;\n    font-weight:1000;\n    text-transform: capitalize;\n    font-family: 'Raleway', sans-serif;\n  \n    /* width:auto;\n    height:auto; */\n   \n   \n\n  \n}\n.loginbut{\n    font-size:20px;\n    font-weight:400;\n    color:rgb(223, 14, 212);\n    margin-left:auto\n\n\n\n}\n/* this is for dropdown bar */\n.dropbtn {\n    color: white;\n    padding: 12px;\n    font-size: 16px;\n    border: none;\n}\n.dropdown {\n   \n    margin-left:auto;\n    /* flex-wrap:wrap; */\n\n}\n.dropdown-content {\n    display: none;\n    position: absolute;\n    background-color: #f1f1f1;\n    min-width: 60px;\n    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\n    z-index: 1;\n}\n.dropdown-content a {\n    color: black;\n    padding: 10px 10px;\n    font-size:12px;\n    text-decoration: none;\n    display: block;\n}\n.dropdown-content a:hover {background-color: #ddd;}\n.dropdown:hover .dropdown-content {display: block;}\n.for-form{\n    border-bottom:2px solid black;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbmF2YmFybG9nb3V0L25hdmJhcmxvZ291dC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksOEJBQThCO0lBQzlCLFlBQVk7SUFDWixjQUFjO0lBQ2QsNEJBQTRCO0dBQzdCLDZCQUE2QjtJQUM1QiwyQ0FBMkM7OztDQUc5QztBQUNEO0lBQ0ksYUFBYTtFQUNmLGFBQWE7RUFDYix1QkFBb0I7S0FBcEIsb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixTQUFTO0VBQ1Qsb0NBQTRCO1VBQTVCLDRCQUE0QjtFQUM1QixhQUFhOztDQUVkO0FBRUQ7Ozs7Ozs7Ozs7O0lBV0k7QUFFSjs7SUFFSSxvQkFBb0I7SUFDcEIsZUFBZTtJQUNmLGlCQUFpQjtJQUNqQiwyQkFBMkI7SUFDM0IsbUNBQW1DOztJQUVuQzttQkFDZTs7Ozs7Q0FLbEI7QUFFRDtJQUNJLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsd0JBQXdCO0lBQ3hCLGdCQUFnQjs7OztDQUluQjtBQUVELDhCQUE4QjtBQUU5QjtJQUNJLGFBQWE7SUFDYixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGFBQWE7Q0FDaEI7QUFJRDs7SUFFSSxpQkFBaUI7SUFDakIscUJBQXFCOztDQUV4QjtBQUVEO0lBQ0ksY0FBYztJQUNkLG1CQUFtQjtJQUNuQiwwQkFBMEI7SUFDMUIsZ0JBQWdCO0lBQ2hCLDZDQUE2QztJQUM3QyxXQUFXO0NBQ2Q7QUFFRDtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsZUFBZTtJQUNmLHNCQUFzQjtJQUN0QixlQUFlO0NBQ2xCO0FBRUQsMkJBQTJCLHVCQUF1QixDQUFDO0FBRW5ELG1DQUFtQyxlQUFlLENBQUM7QUFFbkQ7SUFDSSw4QkFBOEI7Q0FDakMiLCJmaWxlIjoic3JjL2FwcC9uYXZiYXJsb2dvdXQvbmF2YmFybG9nb3V0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubmF2e1xuICAgIGJhY2tncm91bmQtY29sb3I6cmdiKDEsIDAsIDApO1xuICAgIGNvbG9yOndoaXRlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgLyogZmxleC13cmFwOndyYXAtcmV2ZXJzZTsgKi9cbiAgICBmb250LWZhbWlseTogJ0hhbW1lcnNtaXRoIE9uZScsIHNhbnMtc2VyaWY7XG5cblxufVxuaW1nIHtcbiAgICB3aWR0aDogNjBweCA7XG4gIGhlaWdodDogNjBweDsgXG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTsgIFxuICBwYWRkaW5nOiAwcHg7XG4gXG59XG5cbi8qIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6MjAwcHgpXG57Lm5hdntcblxuICAgIG1hcmdpbi1ib3R0b206MTBweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIGxldHRlci1zcGFjaW5nOiAycHg7XG4gICAgZm9udC1zaXplOjI1cHg7XG4gICAgXG5cblxufSAqL1xuXG4uaGVhZGluZ3tcbiBcbiAgICBsZXR0ZXItc3BhY2luZzogNXB4O1xuICAgIGZvbnQtc2l6ZToyNXB4O1xuICAgIGZvbnQtd2VpZ2h0OjEwMDA7XG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gICAgZm9udC1mYW1pbHk6ICdSYWxld2F5Jywgc2Fucy1zZXJpZjtcbiAgXG4gICAgLyogd2lkdGg6YXV0bztcbiAgICBoZWlnaHQ6YXV0bzsgKi9cbiAgIFxuICAgXG5cbiAgXG59XG5cbi5sb2dpbmJ1dHtcbiAgICBmb250LXNpemU6MjBweDtcbiAgICBmb250LXdlaWdodDo0MDA7XG4gICAgY29sb3I6cmdiKDIyMywgMTQsIDIxMik7XG4gICAgbWFyZ2luLWxlZnQ6YXV0b1xuXG5cblxufVxuXG4vKiB0aGlzIGlzIGZvciBkcm9wZG93biBiYXIgKi9cblxuLmRyb3BidG4ge1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBwYWRkaW5nOiAxMnB4O1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBib3JkZXI6IG5vbmU7XG59XG5cblxuXG4uZHJvcGRvd24ge1xuICAgXG4gICAgbWFyZ2luLWxlZnQ6YXV0bztcbiAgICAvKiBmbGV4LXdyYXA6d3JhcDsgKi9cblxufVxuXG4uZHJvcGRvd24tY29udGVudCB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YxZjFmMTtcbiAgICBtaW4td2lkdGg6IDYwcHg7XG4gICAgYm94LXNoYWRvdzogMHB4IDhweCAxNnB4IDBweCByZ2JhKDAsMCwwLDAuMik7XG4gICAgei1pbmRleDogMTtcbn1cblxuLmRyb3Bkb3duLWNvbnRlbnQgYSB7XG4gICAgY29sb3I6IGJsYWNrO1xuICAgIHBhZGRpbmc6IDEwcHggMTBweDtcbiAgICBmb250LXNpemU6MTJweDtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5kcm9wZG93bi1jb250ZW50IGE6aG92ZXIge2JhY2tncm91bmQtY29sb3I6ICNkZGQ7fVxuXG4uZHJvcGRvd246aG92ZXIgLmRyb3Bkb3duLWNvbnRlbnQge2Rpc3BsYXk6IGJsb2NrO31cblxuLmZvci1mb3Jte1xuICAgIGJvcmRlci1ib3R0b206MnB4IHNvbGlkIGJsYWNrO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/navbarlogout/navbarlogout.component.html":
/*!**********************************************************!*\
  !*** ./src/app/navbarlogout/navbarlogout.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar class=\"nav\"> <div class=\"yellowcss\"> <button  mat-button (click)=\"refresh()\" class=\"heading\" >\n  Acciom Tool  <img  src=\"assets/images/accion1.png\">\n  \n</button></div> \n  <!-- <button  class='loginbut' mat-button color=\"primary\" (click)=\"logout()\" >Logout</button> -->\n  \n  <div class=\"dropdown\">\n      <button mat-button color=\"primary\" class=\"dropbtn\">Account<i class=\"material-icons\">\n          account_circle\n          </i>\n          \n          </button>\n      <div class=\"dropdown-content\">\n        <a (click)=\"logout()\">Logout</a>\n        <a (click) =\"Userdetail()\" >User Details</a>\n        <a href=\"#\">More</a>\n        \n      </div>\n    </div>\n   \n    \n\n</mat-toolbar>\n  <!-- <button *ngIf=\"!login\" class='loginbut' mat-button color=\"primary\" >Logout</button> -->\n\n"

/***/ }),

/***/ "./src/app/navbarlogout/navbarlogout.component.ts":
/*!********************************************************!*\
  !*** ./src/app/navbarlogout/navbarlogout.component.ts ***!
  \********************************************************/
/*! exports provided: NavbarlogoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarlogoutComponent", function() { return NavbarlogoutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _uploadservice_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../uploadservice.service */ "./src/app/uploadservice.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var NavbarlogoutComponent = /** @class */ (function () {
    function NavbarlogoutComponent(fileUploadService, router) {
        this.fileUploadService = fileUploadService;
        this.router = router;
        this.login1 = true;
    }
    NavbarlogoutComponent.prototype.ngOnInit = function () {
    };
    NavbarlogoutComponent.prototype.logout = function () {
        this.fileUploadService.logout();
        // this.flashMessage.show("You are now logged Out", {cssClass: 'alert-success', timeout:3000})
        this.router.navigate(['/login']);
        this.login1 = false;
    };
    NavbarlogoutComponent.prototype.refresh = function () {
        this.router.navigate(['/startup']);
    };
    NavbarlogoutComponent.prototype.Userdetail = function () {
        this.router.navigate(['/user']);
    };
    NavbarlogoutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-navbarlogout',
            template: __webpack_require__(/*! ./navbarlogout.component.html */ "./src/app/navbarlogout/navbarlogout.component.html"),
            styles: [__webpack_require__(/*! ./navbarlogout.component.css */ "./src/app/navbarlogout/navbarlogout.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_uploadservice_service__WEBPACK_IMPORTED_MODULE_2__["UploadserviceService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], NavbarlogoutComponent);
    return NavbarlogoutComponent;
}());



/***/ }),

/***/ "./src/app/register/register.component.css":
/*!*************************************************!*\
  !*** ./src/app/register/register.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".body{\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  \n  }\n  .card{\n    margin-top:10%;\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n  }\n  .heading{\n    text-align: center;\n    margin-bottom:10px;\n    font-family: 'Open Sans', sans-serif;\n    font-weight: 900;\n  }\n  .form {\n     \n      min-width:400px;\n    \n      display:flex;\n      flex-direction:column;\n      flex-wrap:wrap;\n      justify-content:center;\n    }\n  @media screen and (max-width:400px)\n  {\n    .form{\n      min-width:200px;\n    \n      display:flex;\n      flex-direction:column;\n      flex-wrap:wrap;\n      justify-content:center;\n    }\n  }\n  .example-full-width {\n      \n      flex:1 1 0;\n     \n    }\n  .register{\n      font-family: 'Open Sans', sans-serif;\n      position:relative;\n      text-align:center;\n      color:red;\n  \n    }\n  \n    \n    \n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGNBQWM7SUFDZCx3QkFBd0I7SUFDeEIsb0JBQW9COztHQUVyQjtFQUNEO0lBQ0UsZUFBZTtJQUNmLDZFQUE2RTtHQUM5RTtFQUVEO0lBQ0UsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixxQ0FBcUM7SUFDckMsaUJBQWlCO0dBQ2xCO0VBQ0Q7O01BRUksZ0JBQWdCOztNQUVoQixhQUFhO01BQ2Isc0JBQXNCO01BQ3RCLGVBQWU7TUFDZix1QkFBdUI7S0FDeEI7RUFFQTs7SUFFRDtNQUNFLGdCQUFnQjs7TUFFaEIsYUFBYTtNQUNiLHNCQUFzQjtNQUN0QixlQUFlO01BQ2YsdUJBQXVCO0tBQ3hCO0dBQ0Y7RUFFQzs7TUFFRSxXQUFXOztLQUVaO0VBRUQ7TUFDRSxxQ0FBcUM7TUFDckMsa0JBQWtCO01BQ2xCLGtCQUFrQjtNQUNsQixVQUFVOztLQUVYIiwiZmlsZSI6InNyYy9hcHAvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ib2R5e1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgXG4gIH1cbiAgLmNhcmR7XG4gICAgbWFyZ2luLXRvcDoxMCU7XG4gICAgYm94LXNoYWRvdzogMCA0cHggOHB4IDAgcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDZweCAyMHB4IDAgcmdiYSgwLCAwLCAwLCAwLjE5KTtcbiAgfVxuICBcbiAgLmhlYWRpbmd7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIG1hcmdpbi1ib3R0b206MTBweDtcbiAgICBmb250LWZhbWlseTogJ09wZW4gU2FucycsIHNhbnMtc2VyaWY7XG4gICAgZm9udC13ZWlnaHQ6IDkwMDtcbiAgfVxuICAuZm9ybSB7XG4gICAgIFxuICAgICAgbWluLXdpZHRoOjQwMHB4O1xuICAgIFxuICAgICAgZGlzcGxheTpmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246Y29sdW1uO1xuICAgICAgZmxleC13cmFwOndyYXA7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuICAgIH1cbiAgXG4gICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NDAwcHgpXG4gIHtcbiAgICAuZm9ybXtcbiAgICAgIG1pbi13aWR0aDoyMDBweDtcbiAgICBcbiAgICAgIGRpc3BsYXk6ZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcbiAgICAgIGZsZXgtd3JhcDp3cmFwO1xuICAgICAganVzdGlmeS1jb250ZW50OmNlbnRlcjtcbiAgICB9XG4gIH1cbiAgICBcbiAgICAuZXhhbXBsZS1mdWxsLXdpZHRoIHtcbiAgICAgIFxuICAgICAgZmxleDoxIDEgMDtcbiAgICAgXG4gICAgfVxuICBcbiAgICAucmVnaXN0ZXJ7XG4gICAgICBmb250LWZhbWlseTogJ09wZW4gU2FucycsIHNhbnMtc2VyaWY7XG4gICAgICBwb3NpdGlvbjpyZWxhdGl2ZTtcbiAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xuICAgICAgY29sb3I6cmVkO1xuICBcbiAgICB9XG4gIFxuICAgIFxuICAgICJdfQ== */"

/***/ }),

/***/ "./src/app/register/register.component.html":
/*!**************************************************!*\
  !*** ./src/app/register/register.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<div class=\"body\">\n        <mat-card class=\"card\">\n            <div class=\"heading\" > Sign Up Here</div>\n<form class=\"form\" [formGroup]=\"createForm\">\n   \n    <mat-form-field class=\"example-full-width\">\n        <input type=\"text\" autocomplete=\"off\" matInput placeholder=\"email*\" formControlName=\"email\">\n        <mat-error>please enter valid email</mat-error>\n    </mat-form-field>\n\n    <mat-form-field class=\"example-full-width\">\n        <input type=\"text\" autocomplete=\"off\" matInput placeholder=\"First Name*\" formControlName=\"first_name\">\n        <mat-error>please enter valid name</mat-error>\n    </mat-form-field>\n\n    <mat-form-field class=\"example-full-width\">\n        <input type=\"text\" autocomplete=\"off\" matInput placeholder=\"Last Name*\" formControlName=\"last_name\">\n        <mat-error>please enter valid name</mat-error>\n    </mat-form-field>\n\n    <mat-form-field class=\"example-full-width\">\n        <input type=\"password\" autocomplete=\"off\" matInput placeholder=\" Password*\" formControlName=\"password\">\n        <mat-error>please enter valid password</mat-error>\n    </mat-form-field>\n\n    <mat-form-field class=\"example-full-width-lname\">\n        <input matInput  type=\"password\"  placeholder=\" Confirm Password\" formControlName=\"cpassword\">\n         </mat-form-field>\n    <button mat-raised-button (click)=\"signIn()\" [disabled]='!createForm.valid' color=\"warn\" >SignIn</button>\n    \n</form>\n\n</mat-card>\n</div>\n"

/***/ }),

/***/ "./src/app/register/register.component.ts":
/*!************************************************!*\
  !*** ./src/app/register/register.component.ts ***!
  \************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _uploadservice_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../uploadservice.service */ "./src/app/uploadservice.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_5__);






var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(fb, fileUploadService, router) {
        this.fb = fb;
        this.fileUploadService = fileUploadService;
        this.router = router;
        this.createForm = fb.group({
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email]],
            first_name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            last_name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            cpassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
        });
    }
    RegisterComponent.prototype.ngOnInit = function () {
        if ((this.fileUploadService.loggedIn())) {
            this.router.navigate(['home']);
        }
    };
    RegisterComponent.prototype.signIn = function () {
        var _this = this;
        console.log(this.createForm.value);
        if (!this.createForm.valid || (this.createForm.controls.password.value != this.createForm.controls.cpassword.value)) {
            alert("please enter correct passwords");
        }
        else {
            this.fileUploadService.register(this.createForm.value).subscribe(function (data) {
                if (data.success) {
                    sweetalert2__WEBPACK_IMPORTED_MODULE_5___default()("Success", "User Created Succesfully", "success");
                    _this.router.navigate(['login']);
                }
                else {
                    sweetalert2__WEBPACK_IMPORTED_MODULE_5___default()("error", data.message, "error");
                }
            });
        }
    };
    RegisterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.css */ "./src/app/register/register.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _uploadservice_service__WEBPACK_IMPORTED_MODULE_3__["UploadserviceService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/startup/dialog-overview-example-startup-dialog.html":
/*!*********************************************************************!*\
  !*** ./src/app/startup/dialog-overview-example-startup-dialog.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<head>\n    <style type=\"text/css\">\n   .panel-body {\n        /* height:90%; width: 90%; */\n        \n        /* transform: rotate(90deg); */\n        max-height: 390px;\n            /* max-width:390px; */\n            overflow: scroll;\n        /* transform-origin: 188px 241px 0; */\n    }\n.close{\n   float:left;\n}\n    </style>\n</head>\n<div mat-dialog-actions class=\"close\">\n    <button mat-button (click)=\"onNoClick()\">Close</button>\n  </div>\n\n\n<div class=\"panel-body\">\n<h1>Result</h1>\n<div mat-dialog-content  *ngIf=\"!data.countcheck\">\n    <table cellspacing=12 border=1 >\n        <tr><th>Source Table</th>\n            <th>Target Table </th>\n        </tr>\n        <tr>\n            <td>{{data.source_log}}</td>\n            <td>{{data.destination_log}}</td>\n        </tr>\n    </table >\n  </div>\n  <div mat-dialog-content  *ngIf=\"!data.nullcheck\">\n        <table>\n            <tr> <th>Target</th></tr>\n            <tr><td>{{data.destination_log}}</td></tr>\n        </table>\n      </div>\n\n  <div mat-dialog-content  *ngIf=\"!data.duplicate\">\n        <table>\n            <tr> <th>Target Table </th></tr>\n            <tr>\n                <td>{{data.destination_log}}</td>\n            </tr>\n        </table>\n      </div>\n\n      <div mat-dialog-content  *ngIf=\"!data.datavalidation\">\n\n          \n            <table >\n                    <tr cellspacing=2>\n                        <th *ngFor=\"let i of data.key_src\">\n                            <div>{{i}}</div>\n                        </th>\n                    </tr>\n                <tr *ngFor=\"let y of data.value_src\" cellspacing=2>\n                    <td *ngFor= \"let z of y\" cellspacing=2>\n                        <div>{{z}}</div>\n                    </td>\n                </tr>\n            </table>\n          </div>\n          <div mat-dialog-content  *ngIf=\"!data.datavalidation_pass\">\n                <table>\n                    <tr> <th>Target</th></tr>\n                    <tr><td>None</td></tr>\n                </table>\n              </div>\n              <div mat-dialog-content  *ngIf=\"!data.ddlcheck\">\n                    <table>\n                        <tr> <th>Target---ddlcheck</th></tr>\n                        <tr><td>None</td></tr>\n                    </table>\n                  </div>\n                  \n        </div>\n\n\n     "

/***/ }),

/***/ "./src/app/startup/startup.component.css":
/*!***********************************************!*\
  !*** ./src/app/startup/startup.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".body{\n    display: flex;\n    text-align:center;\n}\n.card{\n    float:left;\n    width:100%;\n  \n    height:150vh;\n    /* background-color: lime; */\n     background-image: linear-gradient(to bottom right, #050505, #373636); \n    color:whitesmoke;\n}\n.heading{\n    font-family: 'Quicksand', sans-serif;\n    font-weight: 300;\n    font-size:40px;\n}\nh1, h2, h3, h4, h5, h6 {\n    font-weight: 500;\n   }\nbutton{\n    border-radius: 25px; \n}\n.mat-success {\n    background-color: orangered;\n    color: #fff;\n}\n.mat-success1 {\n    background-color: transparent;\n    color: #fff;\n    border:1px solid #eee;\n    border-color: #fff;\n}\n.dropdown{\n    margin-bottom:15px;\n    font-family: 'Source Sans Pro', sans-serif;\n    /* background-color: rgb(236, 232, 99) */\n}\n.droppanel{\n    margin-top:15px;\n\n\n}\n.panel_title{\n    /* font-family: 'Raleway', sans-serif;  */\n        font-family: 'Quicksand', sans-serif;\n\n    font-weight: 700; \n    font-size:25px;\n}\n.panel_title1{\n    font-family: 'Source Sans Pro', sans-serif;\n    font-weight: 500;\n    font-size:18px;\n    /* margin:auto; */\n}\n.dropdownInside{\n    /* background-image: linear-gradient(to bottom right, #8df714, #65911e); */\n border-radius: 25px;\n border-bottom: 1px solid black;\n\n\n}\n.dropdownInside1{\n    height:auto;\n    word-break:break-all;\n    margin:auto;\n}\n.blue{\n    background-color:rgb(83, 175, 228);\n    border-radius: 25px;\n    border-bottom: 1px solid black;\n\n}\n.orange{\n    background-color: rgb(218, 87, 40);\n    border-radius: 25px;\n    border-bottom: 1px solid black;\n}\n.green{\nbackground-image: linear-gradient(to bottom right, #8df714, #65911e); \n\n  border-radius: 25px;\n  border-bottom: 1px solid black;\n}\n.bold{\n    margin-right: 5px; \n     margin-left:10px;\n}\n.btnplay{\n    margin-left:auto;\n    margin-top:auto;\n    display:block;\n    margin-bottom:auto;\n    position:relative;\n    height:40px;\n    /* min-width: 0; */\n    line-height: 24px;\n    width:40px;\n    border-radius:50%;\n}\n.btnplay:hover{\n  background-color: #4d4a4a\n}\n@media(max-width:470px){\n    .btnplay{\n        margin-left:auto;\n        margin-top:auto;\n        display:block;\n        margin-bottom:auto;\n    }\n    .btnplay1{\n        margin-left:auto;\n        margin-top:auto;\n        margin-bottom: auto;\n    }\n\n    .panel_title{\n        /* font-family: 'Raleway', sans-serif;  */\n            font-family: 'Quicksand', sans-serif;\n    \n        font-weight: 400; \n        font-size:15px;\n        margin:auto;\n    }\n    .panel_title1{\n        font-family: 'Source Sans Pro', sans-serif;\n        font-weight: 500;\n        font-size:18px;\n        margin:auto;\n    }\n}\n.btnplay1{\n    margin-left:auto;\n    margin-top:auto;\n    margin-bottom:auto;\n\n}\n.btnplay1:hover{\n    background-color: #4d4a4a\n\n}\n.page{\n    -webkit-text-fill-color: white;\n\n}\n.spinner{\n    height:100%;\n    width:100%;\n}\n.paneldesc{\n    margin-right:50px;\n}\ntable{\n    border: 1px solid black;\n    border-radius: 3px;\n    /* padding: 25px 30px; */\n    /* display: flex;\n    justify-content: space-between; */\n    margin-bottom: 25px;\n    width:auto;\n    /* font-family: 'Lora', serif; */\n    font-family: 'Quicksand', sans-serif;\n    font-size: 20px;\n\n  }\n/* th{\n    border-bottom: 1px solid black;\n    background-color: #050505;\n    color:white\n  } */\n.table1{\n    border-bottom: 1px solid black;\n    background-color: #050505;\n    color:white;\n    padding:0px;\n    margin:0px;\n  }\n.t1{\n    background-color: whitesmoke;\n}\n.myOwnBg{\n      background-color: #2ecca4\n  }\n.myOwnBgRed{\n    background-color:rgb(245, 124, 76)\n\n  }\n.myOwnBgOrange{\n      background-color: #F7861B;\n  }\n.yellow{\n      background-color: yellow;\n  }\n.redbg{\n      background-color: rgb(240, 72, 11)\n  }\n.greenbg{\n      background-color: #8df714\n  }\n.rowforesult{\n      color:black\n  }\n#myBtn {\n    display: none; /* Hidden by default */\n    position: fixed; /* Fixed/sticky position */\n    bottom: 20px; /* Place the button at the bottom of the page */\n    right: 30px; /* Place the button 30px from the right */\n    z-index: 99; /* Make sure it does not overlap */\n    border: none; /* Remove borders */\n    outline: none; /* Remove outline */\n    background-color: #FFF222; /* Set a background color */\n    color: black; /* Text color */\n    cursor: pointer; /* Add a mouse pointer on hover */\n    padding: 15px; /* Some padding */\n    border-radius: 10px; /* Rounded corners */\n    font-size: 27px; /* Increase font size */\n}\n#myBtn:hover {\n    background-color: rgb(224, 66, 17); /* Add a dark-grey background on hover */\n} \n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3RhcnR1cC9zdGFydHVwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxjQUFjO0lBQ2Qsa0JBQWtCO0NBQ3JCO0FBQ0Q7SUFDSSxXQUFXO0lBQ1gsV0FBVzs7SUFFWCxhQUFhO0lBQ2IsNkJBQTZCO0tBQzVCLHFFQUFxRTtJQUN0RSxpQkFBaUI7Q0FDcEI7QUFDRDtJQUNJLHFDQUFxQztJQUNyQyxpQkFBaUI7SUFDakIsZUFBZTtDQUNsQjtBQUNEO0lBQ0ksaUJBQWlCO0lBQ2pCO0FBRUo7SUFDSSxvQkFBb0I7Q0FDdkI7QUFFRDtJQUNJLDRCQUE0QjtJQUM1QixZQUFZO0NBQ2Y7QUFDRDtJQUNJLDhCQUE4QjtJQUM5QixZQUFZO0lBQ1osc0JBQXNCO0lBQ3RCLG1CQUFtQjtDQUN0QjtBQUVEO0lBQ0ksbUJBQW1CO0lBQ25CLDJDQUEyQztJQUMzQyx5Q0FBeUM7Q0FDNUM7QUFFRDtJQUNJLGdCQUFnQjs7O0NBR25CO0FBRUQ7SUFDSSwwQ0FBMEM7UUFDdEMscUNBQXFDOztJQUV6QyxpQkFBaUI7SUFDakIsZUFBZTtDQUNsQjtBQUNEO0lBQ0ksMkNBQTJDO0lBQzNDLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2Ysa0JBQWtCO0NBQ3JCO0FBQ0Q7SUFDSSwyRUFBMkU7Q0FDOUUsb0JBQW9CO0NBQ3BCLCtCQUErQjs7O0NBRy9CO0FBQ0Q7SUFDSSxZQUFZO0lBQ1oscUJBQXFCO0lBQ3JCLFlBQVk7Q0FDZjtBQUNEO0lBQ0ksbUNBQW1DO0lBQ25DLG9CQUFvQjtJQUNwQiwrQkFBK0I7O0NBRWxDO0FBR0Q7SUFDSSxtQ0FBbUM7SUFDbkMsb0JBQW9CO0lBQ3BCLCtCQUErQjtDQUNsQztBQUNEO0FBQ0EscUVBQXFFOztFQUVuRSxvQkFBb0I7RUFDcEIsK0JBQStCO0NBQ2hDO0FBRUQ7SUFDSSxrQkFBa0I7S0FDakIsaUJBQWlCO0NBQ3JCO0FBQ0Q7SUFDSSxpQkFBaUI7SUFDakIsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLFdBQVc7SUFDWCxrQkFBa0I7Q0FDckI7QUFDRDtFQUNFLHlCQUF5QjtDQUMxQjtBQUNEO0lBQ0k7UUFDSSxpQkFBaUI7UUFDakIsZ0JBQWdCO1FBQ2hCLGNBQWM7UUFDZCxtQkFBbUI7S0FDdEI7SUFDRDtRQUNJLGlCQUFpQjtRQUNqQixnQkFBZ0I7UUFDaEIsb0JBQW9CO0tBQ3ZCOztJQUVEO1FBQ0ksMENBQTBDO1lBQ3RDLHFDQUFxQzs7UUFFekMsaUJBQWlCO1FBQ2pCLGVBQWU7UUFDZixZQUFZO0tBQ2Y7SUFDRDtRQUNJLDJDQUEyQztRQUMzQyxpQkFBaUI7UUFDakIsZUFBZTtRQUNmLFlBQVk7S0FDZjtDQUNKO0FBQ0Q7SUFDSSxpQkFBaUI7SUFDakIsZ0JBQWdCO0lBQ2hCLG1CQUFtQjs7Q0FFdEI7QUFDRDtJQUNJLHlCQUF5Qjs7Q0FFNUI7QUFFRDtJQUNJLCtCQUErQjs7Q0FFbEM7QUFDRDtJQUNJLFlBQVk7SUFDWixXQUFXO0NBQ2Q7QUFDRDtJQUNJLGtCQUFrQjtDQUNyQjtBQUVDO0lBQ0Usd0JBQXdCO0lBQ3hCLG1CQUFtQjtJQUNuQix5QkFBeUI7SUFDekI7c0NBQ2tDO0lBQ2xDLG9CQUFvQjtJQUNwQixXQUFXO0lBQ1gsaUNBQWlDO0lBQ2pDLHFDQUFxQztJQUNyQyxnQkFBZ0I7O0dBRWpCO0FBQ0Q7Ozs7TUFJSTtBQUNKO0lBQ0UsK0JBQStCO0lBQy9CLDBCQUEwQjtJQUMxQixZQUFZO0lBQ1osWUFBWTtJQUNaLFdBQVc7R0FDWjtBQUNIO0lBQ0ksNkJBQTZCO0NBQ2hDO0FBQ0M7TUFDSSx5QkFBeUI7R0FDNUI7QUFDRDtJQUNFLGtDQUFrQzs7R0FFbkM7QUFDRDtNQUNJLDBCQUEwQjtHQUM3QjtBQUNEO01BQ0kseUJBQXlCO0dBQzVCO0FBQ0Q7TUFDSSxrQ0FBa0M7R0FDckM7QUFDRDtNQUNJLHlCQUF5QjtHQUM1QjtBQUNEO01BQ0ksV0FBVztHQUNkO0FBRUQ7SUFDRSxjQUFjLENBQUMsdUJBQXVCO0lBQ3RDLGdCQUFnQixDQUFDLDJCQUEyQjtJQUM1QyxhQUFhLENBQUMsZ0RBQWdEO0lBQzlELFlBQVksQ0FBQywwQ0FBMEM7SUFDdkQsWUFBWSxDQUFDLG1DQUFtQztJQUNoRCxhQUFhLENBQUMsb0JBQW9CO0lBQ2xDLGNBQWMsQ0FBQyxvQkFBb0I7SUFDbkMsMEJBQTBCLENBQUMsNEJBQTRCO0lBQ3ZELGFBQWEsQ0FBQyxnQkFBZ0I7SUFDOUIsZ0JBQWdCLENBQUMsa0NBQWtDO0lBQ25ELGNBQWMsQ0FBQyxrQkFBa0I7SUFDakMsb0JBQW9CLENBQUMscUJBQXFCO0lBQzFDLGdCQUFnQixDQUFDLHdCQUF3QjtDQUM1QztBQUVEO0lBQ0ksbUNBQW1DLENBQUMseUNBQXlDO0NBQ2hGIiwiZmlsZSI6InNyYy9hcHAvc3RhcnR1cC9zdGFydHVwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYm9keXtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHRleHQtYWxpZ246Y2VudGVyO1xufVxuLmNhcmR7XG4gICAgZmxvYXQ6bGVmdDtcbiAgICB3aWR0aDoxMDAlO1xuICBcbiAgICBoZWlnaHQ6MTUwdmg7XG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogbGltZTsgKi9cbiAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSByaWdodCwgIzA1MDUwNSwgIzM3MzYzNik7IFxuICAgIGNvbG9yOndoaXRlc21va2U7XG59XG4uaGVhZGluZ3tcbiAgICBmb250LWZhbWlseTogJ1F1aWNrc2FuZCcsIHNhbnMtc2VyaWY7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICBmb250LXNpemU6NDBweDtcbn1cbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYge1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICB9XG5cbmJ1dHRvbntcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4OyBcbn1cblxuLm1hdC1zdWNjZXNzIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2VyZWQ7XG4gICAgY29sb3I6ICNmZmY7XG59XG4ubWF0LXN1Y2Nlc3MxIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBib3JkZXI6MXB4IHNvbGlkICNlZWU7XG4gICAgYm9yZGVyLWNvbG9yOiAjZmZmO1xufVxuXG4uZHJvcGRvd257XG4gICAgbWFyZ2luLWJvdHRvbToxNXB4O1xuICAgIGZvbnQtZmFtaWx5OiAnU291cmNlIFNhbnMgUHJvJywgc2Fucy1zZXJpZjtcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjM2LCAyMzIsIDk5KSAqL1xufVxuXG4uZHJvcHBhbmVse1xuICAgIG1hcmdpbi10b3A6MTVweDtcblxuXG59XG5cbi5wYW5lbF90aXRsZXtcbiAgICAvKiBmb250LWZhbWlseTogJ1JhbGV3YXknLCBzYW5zLXNlcmlmOyAgKi9cbiAgICAgICAgZm9udC1mYW1pbHk6ICdRdWlja3NhbmQnLCBzYW5zLXNlcmlmO1xuXG4gICAgZm9udC13ZWlnaHQ6IDcwMDsgXG4gICAgZm9udC1zaXplOjI1cHg7XG59XG4ucGFuZWxfdGl0bGUxe1xuICAgIGZvbnQtZmFtaWx5OiAnU291cmNlIFNhbnMgUHJvJywgc2Fucy1zZXJpZjtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGZvbnQtc2l6ZToxOHB4O1xuICAgIC8qIG1hcmdpbjphdXRvOyAqL1xufVxuLmRyb3Bkb3duSW5zaWRle1xuICAgIC8qIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20gcmlnaHQsICM4ZGY3MTQsICM2NTkxMWUpOyAqL1xuIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xuXG5cbn1cbi5kcm9wZG93bkluc2lkZTF7XG4gICAgaGVpZ2h0OmF1dG87XG4gICAgd29yZC1icmVhazpicmVhay1hbGw7XG4gICAgbWFyZ2luOmF1dG87XG59XG4uYmx1ZXtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOnJnYig4MywgMTc1LCAyMjgpO1xuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xuXG59XG5cblxuLm9yYW5nZXtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjE4LCA4NywgNDApO1xuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xufVxuLmdyZWVue1xuYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSByaWdodCwgIzhkZjcxNCwgIzY1OTExZSk7IFxuXG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjaztcbn1cblxuLmJvbGR7XG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7IFxuICAgICBtYXJnaW4tbGVmdDoxMHB4O1xufVxuLmJ0bnBsYXl7XG4gICAgbWFyZ2luLWxlZnQ6YXV0bztcbiAgICBtYXJnaW4tdG9wOmF1dG87XG4gICAgZGlzcGxheTpibG9jaztcbiAgICBtYXJnaW4tYm90dG9tOmF1dG87XG4gICAgcG9zaXRpb246cmVsYXRpdmU7XG4gICAgaGVpZ2h0OjQwcHg7XG4gICAgLyogbWluLXdpZHRoOiAwOyAqL1xuICAgIGxpbmUtaGVpZ2h0OiAyNHB4O1xuICAgIHdpZHRoOjQwcHg7XG4gICAgYm9yZGVyLXJhZGl1czo1MCU7XG59XG4uYnRucGxheTpob3ZlcntcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRkNGE0YVxufVxuQG1lZGlhKG1heC13aWR0aDo0NzBweCl7XG4gICAgLmJ0bnBsYXl7XG4gICAgICAgIG1hcmdpbi1sZWZ0OmF1dG87XG4gICAgICAgIG1hcmdpbi10b3A6YXV0bztcbiAgICAgICAgZGlzcGxheTpibG9jaztcbiAgICAgICAgbWFyZ2luLWJvdHRvbTphdXRvO1xuICAgIH1cbiAgICAuYnRucGxheTF7XG4gICAgICAgIG1hcmdpbi1sZWZ0OmF1dG87XG4gICAgICAgIG1hcmdpbi10b3A6YXV0bztcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogYXV0bztcbiAgICB9XG5cbiAgICAucGFuZWxfdGl0bGV7XG4gICAgICAgIC8qIGZvbnQtZmFtaWx5OiAnUmFsZXdheScsIHNhbnMtc2VyaWY7ICAqL1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6ICdRdWlja3NhbmQnLCBzYW5zLXNlcmlmO1xuICAgIFxuICAgICAgICBmb250LXdlaWdodDogNDAwOyBcbiAgICAgICAgZm9udC1zaXplOjE1cHg7XG4gICAgICAgIG1hcmdpbjphdXRvO1xuICAgIH1cbiAgICAucGFuZWxfdGl0bGUxe1xuICAgICAgICBmb250LWZhbWlseTogJ1NvdXJjZSBTYW5zIFBybycsIHNhbnMtc2VyaWY7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgIGZvbnQtc2l6ZToxOHB4O1xuICAgICAgICBtYXJnaW46YXV0bztcbiAgICB9XG59XG4uYnRucGxheTF7XG4gICAgbWFyZ2luLWxlZnQ6YXV0bztcbiAgICBtYXJnaW4tdG9wOmF1dG87XG4gICAgbWFyZ2luLWJvdHRvbTphdXRvO1xuXG59XG4uYnRucGxheTE6aG92ZXJ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRkNGE0YVxuXG59XG5cbi5wYWdle1xuICAgIC13ZWJraXQtdGV4dC1maWxsLWNvbG9yOiB3aGl0ZTtcblxufVxuLnNwaW5uZXJ7XG4gICAgaGVpZ2h0OjEwMCU7XG4gICAgd2lkdGg6MTAwJTtcbn1cbi5wYW5lbGRlc2N7XG4gICAgbWFyZ2luLXJpZ2h0OjUwcHg7XG59XG5cbiAgdGFibGV7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgIC8qIHBhZGRpbmc6IDI1cHggMzBweDsgKi9cbiAgICAvKiBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgKi9cbiAgICBtYXJnaW4tYm90dG9tOiAyNXB4O1xuICAgIHdpZHRoOmF1dG87XG4gICAgLyogZm9udC1mYW1pbHk6ICdMb3JhJywgc2VyaWY7ICovXG4gICAgZm9udC1mYW1pbHk6ICdRdWlja3NhbmQnLCBzYW5zLXNlcmlmO1xuICAgIGZvbnQtc2l6ZTogMjBweDtcblxuICB9XG4gIC8qIHRoe1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjaztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDUwNTA1O1xuICAgIGNvbG9yOndoaXRlXG4gIH0gKi9cbiAgLnRhYmxlMXtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgYmxhY2s7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzA1MDUwNTtcbiAgICBjb2xvcjp3aGl0ZTtcbiAgICBwYWRkaW5nOjBweDtcbiAgICBtYXJnaW46MHB4O1xuICB9XG4udDF7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTtcbn1cbiAgLm15T3duQmd7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmVjY2E0XG4gIH1cbiAgLm15T3duQmdSZWR7XG4gICAgYmFja2dyb3VuZC1jb2xvcjpyZ2IoMjQ1LCAxMjQsIDc2KVxuXG4gIH1cbiAgLm15T3duQmdPcmFuZ2V7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjc4NjFCO1xuICB9XG4gIC55ZWxsb3d7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB5ZWxsb3c7XG4gIH1cbiAgLnJlZGJne1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MCwgNzIsIDExKVxuICB9XG4gIC5ncmVlbmJne1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzhkZjcxNFxuICB9XG4gIC5yb3dmb3Jlc3VsdHtcbiAgICAgIGNvbG9yOmJsYWNrXG4gIH1cblxuICAjbXlCdG4ge1xuICAgIGRpc3BsYXk6IG5vbmU7IC8qIEhpZGRlbiBieSBkZWZhdWx0ICovXG4gICAgcG9zaXRpb246IGZpeGVkOyAvKiBGaXhlZC9zdGlja3kgcG9zaXRpb24gKi9cbiAgICBib3R0b206IDIwcHg7IC8qIFBsYWNlIHRoZSBidXR0b24gYXQgdGhlIGJvdHRvbSBvZiB0aGUgcGFnZSAqL1xuICAgIHJpZ2h0OiAzMHB4OyAvKiBQbGFjZSB0aGUgYnV0dG9uIDMwcHggZnJvbSB0aGUgcmlnaHQgKi9cbiAgICB6LWluZGV4OiA5OTsgLyogTWFrZSBzdXJlIGl0IGRvZXMgbm90IG92ZXJsYXAgKi9cbiAgICBib3JkZXI6IG5vbmU7IC8qIFJlbW92ZSBib3JkZXJzICovXG4gICAgb3V0bGluZTogbm9uZTsgLyogUmVtb3ZlIG91dGxpbmUgKi9cbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGMjIyOyAvKiBTZXQgYSBiYWNrZ3JvdW5kIGNvbG9yICovXG4gICAgY29sb3I6IGJsYWNrOyAvKiBUZXh0IGNvbG9yICovXG4gICAgY3Vyc29yOiBwb2ludGVyOyAvKiBBZGQgYSBtb3VzZSBwb2ludGVyIG9uIGhvdmVyICovXG4gICAgcGFkZGluZzogMTVweDsgLyogU29tZSBwYWRkaW5nICovXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDsgLyogUm91bmRlZCBjb3JuZXJzICovXG4gICAgZm9udC1zaXplOiAyN3B4OyAvKiBJbmNyZWFzZSBmb250IHNpemUgKi9cbn1cblxuI215QnRuOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjI0LCA2NiwgMTcpOyAvKiBBZGQgYSBkYXJrLWdyZXkgYmFja2dyb3VuZCBvbiBob3ZlciAqL1xufSAiXX0= */"

/***/ }),

/***/ "./src/app/startup/startup.component.html":
/*!************************************************!*\
  !*** ./src/app/startup/startup.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navbarlogout></app-navbarlogout>\n<div class=\"body\">\n<mat-card class=\"card\">\n  <h1 class=\"heading\">Get Started</h1>\n  <button  [color]=\"'success'\" (click)=\"ToHome()\" mat-button>Upload Your File</button>\n  <!-- <button [disabled]=true [color]=\"'success1'\"  mat-button>Update DB Credetials</button> -->\n<div  class=\"droppanel\">\n  \n  <mat-accordion *ngFor=\"let i of all_test_suite ;let x = index \">\n    <mat-expansion-panel class=\"dropdown\" \n    (opened)=\"yellow = true\"\n    >\n      <mat-expansion-panel-header>\n        <mat-panel-title *ngIf=\"i.test_suite_name !='undefined'\"  class=\"panel_title\"> <!-- TODO: USE *ngIf-->\n        {{i.test_suite_name}}\n        </mat-panel-title>\n        <mat-panel-title *ngIf=\"i.test_suite_name =='undefined' \"  class=\"panel_title\"> <!-- TODO: USE *ngIf-->\n          Test Suite{{x+1}}\n          </mat-panel-title>\n        <mat-panel-description class=\"panel_title1\" [@divState]= \"state\">\n            <div class=\"paneldesc\"> {{ i.excel_name }},<b class=\"bold\">Uploaded At:</b> {{ i.created | date:'medium'}}\n          </div>\n          \n <!-- break;--> <button mat-mini-fab [disabled]=\"!playButtons[x] || !show[x]\" (click)=\"executeTestCase(i.test_suite_id,$event,x)\" color=\"black\" class=\"btnplay\" > \n            <i class=\"material-icons\">\n              <div *ngIf=\"playButtons[x]\">\n                  play_circle_outline\n              </div>\n              <div *ngIf=\"!playButtons[x]\" >\n                  pause\n              </div>\n            </i>\n          </button> \n\n          </mat-panel-description>\n    \n          </mat-expansion-panel-header>\n            <!-- test_case_list from backend -->\n          <div *ngFor=\"let each_test of i.test_case_list;let z = index\"> \n            <mat-accordion  class=\"dropdownInsde1\">\n                <mat-expansion-panel  [ngClass]=\"{'myOwnBgRed':each_test.test_status ==2 ,'myOwnBg':each_test.test_status ==1,'blue':each_test.test_status ==0,'red':each_test.test_status ==4,'myOwnBgOrange':each_test.test_status ==3 }\">\n                  <mat-expansion-panel-header>\n                    <mat-panel-title  class=\"panel_title\"> \n                      {{ each_test.test_id }}  <!-- test_name from backend-->\n                    </mat-panel-title>\n                    <mat-panel-description \n                    class=\"panel_title1\">\n                \n                     TestStatus: \n                   <i  *ngIf=\"each_test.test_status == 0\"    class=\"material-icons\">\n                    fiber_new\n                    </i> \n                      <i *ngIf=\"each_test.test_status == 2\"  class=\"material-icons\">\n                        cancel\n                        </i> \n                        <i *ngIf=\"each_test.test_status == 3\"  class=\"material-icons\">\n                            refresh\n                          </i> \n                          <i *ngIf=\"each_test.test_status == 1\"  class=\"material-icons\">\n                            check_circle\n                            </i> <b class=\"bold\">{{each_test.test_name}} </b> \n                    <!-- break; --> \n                              <button [disabled]=\"!playButtons2[x][z] || !show2[x]\"  (change)=\"ngOnChanges(x)\" mat-mini-fab (click)=\"executeTestByCaseId(each_test.test_case_id,$event,z,x)\"  color=\"black\"  class=\"btnplay1\"> \n                              <i  class=\"material-icons\">\n                            <div *ngIf=\"playButtons2[x][z]\">play_circle_outline</div>\n                            <div *ngIf=\"!playButtons2[x][z]\"> pause </div>\n                              </i>  \n                            </button>\n                    </mat-panel-description>\n                  </mat-expansion-panel-header>\n                  <table  class=\"t1\" cellspacing=22>\n                    <tr class=\"table1\">\n                   \n                      <th>Test Case ID</th>\n                      <th>Test Execution_status</th>\n                      <th>Executed At</th>\n                      <th>Log</th>\n                   \n                    </tr>\n                    <tr class=\"rowforesult\" *ngFor=\"let case_log of each_test.test_case_log \"\n                    [ngStyle]=\"{'background-color':getcolor(case_log.test_execution_status)}\"\n                    >\n                      <td>{{case_log.test_case_id}}</td>\n                      <td *ngIf=\"case_log.test_execution_status== 0\">New</td>\n                      <td *ngIf=\"case_log.test_execution_status== 1\" >Pass</td>\n                      <td *ngIf=\"case_log.test_execution_status== 2\" >Fail</td>\n                      <td *ngIf=\"case_log.test_execution_status== 4\">Error</td>\n                      <td *ngIf=\"case_log.test_execution_status== 3\">Waiting</td>\n                      <td> {{ case_log.executed_at | date:'short' }}</td>\n                      <td><button  mat-button (click)=\"showlog(each_test.test_name,case_log)\"><i class=\"material-icons\">\n                        dehaze\n                        </i></button></td>\n                    </tr>\n                              </table>\n              </mat-expansion-panel>\n            </mat-accordion>\n          </div>\n          \n\n      <!--  this has the logic to write inside the expansion.-->\n    </mat-expansion-panel>\n    <!--  first expansion got closed here.-->\n  </mat-accordion>\n  <!-- <pagination-controls class=\"page\" (pageChange)=\"p = $event\"></pagination-controls> -->\n  <button  matTooltip=\"Go To Top\" (click)=\"topFunction()\" id=\"myBtn\" ><i class=\"material-icons\">\n      keyboard_arrow_up\n      </i></button>\n</div>\n</mat-card>\n</div>\n"

/***/ }),

/***/ "./src/app/startup/startup.component.ts":
/*!**********************************************!*\
  !*** ./src/app/startup/startup.component.ts ***!
  \**********************************************/
/*! exports provided: StartupComponent, DialogOverviewExampleDialogstartup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartupComponent", function() { return StartupComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogOverviewExampleDialogstartup", function() { return DialogOverviewExampleDialogstartup; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _uploadservice_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../uploadservice.service */ "./src/app/uploadservice.service.ts");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng4-loading-spinner */ "./node_modules/ng4-loading-spinner/ng4-loading-spinner.umd.js");
/* harmony import */ var ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_7__);







// import { interval } from 'rxjs';

var StartupComponent = /** @class */ (function () {
    function StartupComponent(router, fileUploadService, spinnerService, dialog) {
        this.router = router;
        this.fileUploadService = fileUploadService;
        this.spinnerService = spinnerService;
        this.dialog = dialog;
        this.panelOpenState = false;
        this.all_test_suite = [];
        this.arr1 = [];
        this.playButtons = [];
        this.playButtons2 = new Array();
        this.temparr = [];
        this.p = 1;
        this.show = [];
        this.show2 = [];
        this.q = 1;
        this.res = "sas";
        this.countcheck = true;
        this.nullcheck = true;
        this.duplicate = true;
        this.datavalidation_pass = true;
        this.datavalidation = true;
        this.ddlcheck = true;
        this.keys_src = [];
        this.value_src = [];
        this.first_obj = [];
        this.parsed_obj = "";
    }
    StartupComponent.prototype.ngOnInit = function () {
        this.Initialize();
    };
    StartupComponent.prototype.Initialize = function () {
        var _this = this;
        this.id = localStorage.getItem('id');
        this.fileUploadService.getSuiteById(this.id).subscribe(function (data) {
            if (data.success) {
                // console.log(data.suites.user) 
                //  console.log(data.suites.user.length)
                // for(var x=0;x<data.suites.user.length;x++)
                // {
                //   // console.log(data.suites.user[x].test_case_list)
                //   for(var y=0;y<data.suites.user[x].test_case_list.length;y++)
                //   {
                //   }
                //  console.log(this.playButtons1)
                // }
                _this.all_test_suite = data.suites.user;
                _this.arr1 = [];
                // console.log(this.all_test_suite)
                for (var i = 0; i < _this.all_test_suite.length; i++) {
                    _this.arr1.push(_this.all_test_suite[i]['test_case_list']); //TO DO:HARD CODED.['Test Class']
                    _this.playButtons[i] = true;
                    _this.show[i] = true;
                }
                _this.playButtons2 = new Array();
                _this.show2 = [];
                //console.log(this.arr1)
                for (var i = 0; i < _this.arr1.length; i++) {
                    _this.temparr = [];
                    _this.show2.push(true);
                    for (var j = 0; j < _this.arr1[i].length; j++) {
                        _this.temparr.push(true);
                    }
                    _this.playButtons2.push(_this.temparr);
                }
                // console.log(this.playButtons2)
            }
        });
    };
    StartupComponent.prototype.ngOnChanges = function (changes) {
        this.Initialize();
        // console.log(changes)
    };
    StartupComponent.prototype.ToHome = function () {
        this.router.navigate(['home']);
    };
    StartupComponent.prototype.ToDB = function () {
        this.router.navigate(['db']);
    };
    StartupComponent.prototype.executeTestCase = function (test_Suite_id, event, x) {
        var _this = this;
        event.stopPropagation();
        // this.spinnerService.show();
        this.show2[x] = false;
        this.playButtons[x] = !this.playButtons[x];
        this.fileUploadService.ExecuteTestbySuiteId(test_Suite_id).subscribe(function (data) {
            if (data.success) {
                _this.ngOnInit();
                // this.spinnerService.hide();       
                _this.playButtons[x] = !_this.playButtons[x];
                _this.show2[x] = true;
                sweetalert2__WEBPACK_IMPORTED_MODULE_4___default()("Success", "Test Done Succesfully", "success");
            }
            else {
                _this.ngOnInit();
                sweetalert2__WEBPACK_IMPORTED_MODULE_4___default()("error", "Something went wrong", "error");
            }
        });
    };
    StartupComponent.prototype.executeTestByCaseId = function (test_case_id, event, z, x) {
        var _this = this;
        event.stopPropagation();
        console.log(x);
        this.playButtons2[x][z] = false;
        this.show[x] = false;
        // this.spinnerService.show();
        this.fileUploadService.ExecuteTestbyCaseId(test_case_id).subscribe(function (data) {
            if (data.success) {
                // this.show=true;
                _this.show[x] = true;
                // this.spinnerService.hide();
                _this.playButtons2[x][z] = true;
                _this.ngOnInit();
                sweetalert2__WEBPACK_IMPORTED_MODULE_4___default()("Success", "Test Done Succesfully", "success");
            }
            else {
                _this.ngOnInit();
                sweetalert2__WEBPACK_IMPORTED_MODULE_4___default()("error", "Something went wrong", "error");
            }
        });
    };
    StartupComponent.prototype.getcolor = function (x) {
        switch (x) {
            case 0:
                return 'blue';
            case 1:
                return '#45CE30';
            case 2:
                return "#E84342";
            case 3:
                return '#F7861B';
            case 4:
                return 'red';
        }
    };
    StartupComponent.prototype.onWindowScroll = function () {
        this.scrollFunction();
    };
    // When the user scrolls down 20px from the top of the document, show the button
    StartupComponent.prototype.scrollFunction = function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("myBtn").style.display = "block";
        }
        else {
            document.getElementById("myBtn").style.display = "none";
        }
    };
    // When the user clicks on the button, scroll to the top of the document
    StartupComponent.prototype.topFunction = function () {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };
    StartupComponent.prototype.showlog = function (test_name, case_log) {
        if (test_name == 'CountCheck') {
            this.countcheck = false;
            this.nullcheck = true;
            this.datavalidation = true;
            this.datavalidation_pass = true;
            this.duplicate = true;
            this.ddlcheck = true;
        }
        else if (test_name == 'NullCheck') {
            this.countcheck = true;
            this.nullcheck = false;
            this.datavalidation = true;
            this.datavalidation_pass = true;
            this.duplicate = true;
            this.ddlcheck = true;
        }
        else if (test_name == "DuplicateCheck") {
            this.countcheck = true;
            this.nullcheck = true;
            this.datavalidation = true;
            this.datavalidation_pass = true;
            this.duplicate = false;
            this.ddlcheck = true;
        }
        else if (test_name == "Datavalidation") {
            this.value_src = [];
            this.keys_src = [];
            if (case_log.source_log == 'none') {
                this.countcheck = true;
                this.nullcheck = true;
                this.datavalidation = true;
                this.datavalidation_pass = false;
                this.duplicate = true;
                this.ddlcheck = true;
            }
            else {
                this.parsed_obj = (eval(case_log.source_log)[0]);
                this.first_obj = (JSON.parse(String(this.parsed_obj)));
                this.keys_src = (Object.keys(this.first_obj));
                //console.log(this.keys_src.length)
                this.len = eval(case_log.source_log).length;
                //console.log((Object.values(this.first_obj)))
                console.log(this.len);
                for (var i = 0; i < this.len; i++) {
                    this.parsed_obj = (eval(case_log.source_log)[i]);
                    this.first_obj = (JSON.parse(String(this.parsed_obj)));
                    this.value_src.push(Object.values(this.first_obj));
                }
                console.log(this.value_src);
                this.countcheck = true;
                this.nullcheck = true;
                this.datavalidation = false;
                this.datavalidation_pass = true;
                this.duplicate = true;
                this.ddlcheck = true;
            }
        }
        else if (test_name == 'DDLCheck') {
            this.countcheck = true;
            this.nullcheck = true;
            this.datavalidation = true;
            this.datavalidation_pass = true;
            this.duplicate = true;
            this.ddlcheck = false;
        }
        var dialogRef = this.dialog.open(DialogOverviewExampleDialogstartup, {
            width: '90%',
            height: '90%',
            data: { countcheck: this.countcheck, nullcheck: this.nullcheck, duplicate: this.duplicate,
                datavalidation: this.datavalidation, source_log: case_log.source_log, destination_log: case_log.destination_log,
                key_src: this.keys_src, value_src: this.value_src, datavalidation_pass: this.datavalidation_pass, ddlcheck: this.ddlcheck }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])("window:scroll", []),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", []),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], StartupComponent.prototype, "onWindowScroll", null);
    StartupComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-startup',
            template: __webpack_require__(/*! ./startup.component.html */ "./src/app/startup/startup.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].Default,
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["trigger"])('divState', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["state"])('normal', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["style"])({
                        'background-color': 'transarent',
                        transform: 'translateX(0px)'
                    })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["state"])('high', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["style"])({
                        backgroundColor: 'black',
                        transform: 'translateX(0px)'
                    })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["transition"])('normal => high', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["style"])({ transform: 'translateX(-100%)' }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["animate"])(100)
                    ]),
                ])
            ],
            styles: [__webpack_require__(/*! ./startup.component.css */ "./src/app/startup/startup.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _uploadservice_service__WEBPACK_IMPORTED_MODULE_3__["UploadserviceService"],
            ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_7__["Ng4LoadingSpinnerService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDialog"]])
    ], StartupComponent);
    return StartupComponent;
}());

var DialogOverviewExampleDialogstartup = /** @class */ (function () {
    function DialogOverviewExampleDialogstartup(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    DialogOverviewExampleDialogstartup.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogOverviewExampleDialogstartup = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'dialog-overview-example-startup-dialog',
            template: __webpack_require__(/*! ./dialog-overview-example-startup-dialog.html */ "./src/app/startup/dialog-overview-example-startup-dialog.html"),
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDialogRef"], Object])
    ], DialogOverviewExampleDialogstartup);
    return DialogOverviewExampleDialogstartup;
}());



/***/ }),

/***/ "./src/app/uploadservice.service.ts":
/*!******************************************!*\
  !*** ./src/app/uploadservice.service.ts ***!
  \******************************************/
/*! exports provided: UploadserviceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadserviceService", function() { return UploadserviceService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");




var UploadserviceService = /** @class */ (function () {
    function UploadserviceService(http) {
        this.http = http;
        this.url = 'http://127.0.0.1:8000/api';
    }
    UploadserviceService.prototype.postFile = function (fileToUpload, selectedsheet, selectedCase, suitename, executevalue) {
        var upload = new FormData();
        console.log(selectedCase);
        console.log(suitename);
        upload.append('inputFile', fileToUpload);
        upload.append('sheet', selectedsheet);
        upload.append('selectedcase', selectedCase);
        upload.append('suitename', suitename);
        upload.append('exvalue', executevalue);
        this.loadToken();
        this.newtoken = 'Bearer' + " " + this.authToken;
        console.log(this.newtoken);
        console.log(upload);
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', this.newtoken);
        return this.http.post(this.url + "/upload", upload, { headers: headers });
    };
    UploadserviceService.prototype.authenticateUser = function (createForm) {
        console.log(createForm);
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/json');
        return this.http.post(this.url + "/login", createForm, { headers: headers });
    };
    UploadserviceService.prototype.storeUserData = function (token, user, uid, refresh_token, name) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('id', uid);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('name', name);
        this.authToken = token;
        this.user = user;
    };
    UploadserviceService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token');
        this.authToken = token;
    };
    UploadserviceService.prototype.loggedIn = function () {
        // const helper = new JwtHelperService();
        //   const isExpired = helper.isTokenExpired('id_token');
        return !!localStorage.getItem('id_token');
        //  return isExpired ;debugger
    };
    UploadserviceService.prototype.logout = function () {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    };
    UploadserviceService.prototype.register = function (createForm) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/json');
        return this.http.post(this.url + "/register", createForm, { headers: headers });
    };
    UploadserviceService.prototype.StoreDB = function (createForm) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/json');
        return this.http.post(this.url + "/add", createForm, { headers: headers });
    };
    UploadserviceService.prototype.getSuiteById = function (id) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/json');
        return this.http.get(this.url + "/getsuite/" + id, { headers: headers });
    };
    UploadserviceService.prototype.ExecuteTestbySuiteId = function (suite_id) {
        var run = new FormData();
        this.loadToken();
        this.newtoken = 'Bearer' + " " + this.authToken;
        console.log(this.newtoken);
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'Authorization': this.newtoken,
        });
        // headers = headers.append('Content-Type','application/json')
        // // let headers = new HttpHeaders().set('Authorization',this.newtoken)
        // headers = headers.append('Authorization',this.newtoken)
        run.append("suite_id", suite_id);
        return this.http.post(this.url + "/testdb/", run, { headers: headers });
    };
    UploadserviceService.prototype.ExecuteTestbyCaseId = function (case_id) {
        var run = new FormData();
        run.append('case_id', case_id);
        this.loadToken();
        this.newtoken = 'Bearer' + " " + this.authToken;
        // let headers = new HttpHeaders()
        // headers.append('Content-Type','application/json')
        // headers.append('Authorization',this.newtoken)
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'Authorization': this.newtoken,
        });
        return this.http.post(this.url + "/testdb/", run, { headers: headers });
    };
    UploadserviceService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], UploadserviceService);
    return UploadserviceService;
}());



/***/ }),

/***/ "./src/app/userdetail/userdetail.component.css":
/*!*****************************************************!*\
  !*** ./src/app/userdetail/userdetail.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card{\n \n    background-color: #eee;\n    display:flex;\n    justify-content: center;\n    padding-top:10px;\n    background-image: linear-gradient(to bottom right, #050505, #373636);\n    float:left;\n      width:100%;\n    \n      height:100vh;\n  }\n\n  .for-form{\n    border:2px solid black; \n    height:200px;\n    width:auto;\n    padding-right:0px;\n    padding-left:0px;\n    padding-top:0px;\n    font-family: 'Hammersmith One', sans-serif;\n  }\n\n  .title{\n    color:rgb(241, 248, 230);\n    background-image: linear-gradient(to bottom right, #FF4848, #FF4848);\n    margin:0px;\n    text-align:center;\n    font-family: 'Hammersmith One', sans-serif;\n    \n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXNlcmRldGFpbC91c2VyZGV0YWlsLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0lBRUksdUJBQXVCO0lBQ3ZCLGFBQWE7SUFDYix3QkFBd0I7SUFDeEIsaUJBQWlCO0lBQ2pCLHFFQUFxRTtJQUNyRSxXQUFXO01BQ1QsV0FBVzs7TUFFWCxhQUFhO0dBQ2hCOztFQUVEO0lBQ0UsdUJBQXVCO0lBQ3ZCLGFBQWE7SUFDYixXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixnQkFBZ0I7SUFDaEIsMkNBQTJDO0dBQzVDOztFQUNIO0lBQ0kseUJBQXlCO0lBQ3pCLHFFQUFxRTtJQUNyRSxXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLDJDQUEyQzs7Q0FFOUMiLCJmaWxlIjoic3JjL2FwcC91c2VyZGV0YWlsL3VzZXJkZXRhaWwuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jYXJke1xuIFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gICAgZGlzcGxheTpmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIHBhZGRpbmctdG9wOjEwcHg7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSByaWdodCwgIzA1MDUwNSwgIzM3MzYzNik7XG4gICAgZmxvYXQ6bGVmdDtcbiAgICAgIHdpZHRoOjEwMCU7XG4gICAgXG4gICAgICBoZWlnaHQ6MTAwdmg7XG4gIH1cblxuICAuZm9yLWZvcm17XG4gICAgYm9yZGVyOjJweCBzb2xpZCBibGFjazsgXG4gICAgaGVpZ2h0OjIwMHB4O1xuICAgIHdpZHRoOmF1dG87XG4gICAgcGFkZGluZy1yaWdodDowcHg7XG4gICAgcGFkZGluZy1sZWZ0OjBweDtcbiAgICBwYWRkaW5nLXRvcDowcHg7XG4gICAgZm9udC1mYW1pbHk6ICdIYW1tZXJzbWl0aCBPbmUnLCBzYW5zLXNlcmlmO1xuICB9XG4udGl0bGV7XG4gICAgY29sb3I6cmdiKDI0MSwgMjQ4LCAyMzApO1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20gcmlnaHQsICNGRjQ4NDgsICNGRjQ4NDgpO1xuICAgIG1hcmdpbjowcHg7XG4gICAgdGV4dC1hbGlnbjpjZW50ZXI7XG4gICAgZm9udC1mYW1pbHk6ICdIYW1tZXJzbWl0aCBPbmUnLCBzYW5zLXNlcmlmO1xuICAgIFxufSJdfQ== */"

/***/ }),

/***/ "./src/app/userdetail/userdetail.component.html":
/*!******************************************************!*\
  !*** ./src/app/userdetail/userdetail.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navbarlogout></app-navbarlogout>\n<div class=\"card\">\n    <mat-card class=\"for-form\">\n        <mat-card-title class=\"title\">User Details<hr></mat-card-title>\n      <table cellspacing=10>\n        <tr>\n        <th>Name:</th>\n        <th>{{  name }}</th>\n      </tr>\n      <tr>\n          <th>Email:</th>\n          <th>{{ email }}</th>\n        </tr>\n        <tr>\n            <th>Test Suites:</th>\n            <th></th>\n          </tr>\n      </table>\n\n    </mat-card>\n\n\n</div>\n"

/***/ }),

/***/ "./src/app/userdetail/userdetail.component.ts":
/*!****************************************************!*\
  !*** ./src/app/userdetail/userdetail.component.ts ***!
  \****************************************************/
/*! exports provided: UserdetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserdetailComponent", function() { return UserdetailComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var UserdetailComponent = /** @class */ (function () {
    function UserdetailComponent() {
    }
    UserdetailComponent.prototype.ngOnInit = function () {
        this.email = localStorage.getItem('user');
        this.name = localStorage.getItem('name');
    };
    UserdetailComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-userdetail',
            template: __webpack_require__(/*! ./userdetail.component.html */ "./src/app/userdetail/userdetail.component.html"),
            styles: [__webpack_require__(/*! ./userdetail.component.css */ "./src/app/userdetail/userdetail.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], UserdetailComponent);
    return UserdetailComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/roja/Documents/Acciom_portal/acciom_portal/static/src/main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!************************!*\
  !*** stream (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map