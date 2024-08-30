import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./components/login.component";
import { LoginRoutingModule } from "./login-routing.module";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";

@NgModule({
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ], 
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        ReactiveFormsModule,
        LoginRoutingModule
    ]

})
export class LoginModule {

}