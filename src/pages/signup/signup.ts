import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HTTP } from '@ionic-native/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { TermsandconditionsPage } from '../termsandconditions/termsandconditions';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {
    public errorMessage = '';
    public email = "";
    public country = "";
    public showError: boolean = false;
    public user =
    {
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        Country: ""
    };
    public confirmPassword = "";
    public countries: any = [];
    public signUpForm: FormGroup;
    public submitAttempt: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public formBuilder: FormBuilder) {
        //get countries
        this.http.get('http://197.242.149.23/api/getCountries').subscribe(data => {
            this.countries = data;
        }, err => {
            var errorMessage = "";
        });

        this.signUpForm = formBuilder.group({
            emailAddress: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required])],
            firstName: ['', Validators.compose([Validators.required])],
            lastName: ['', Validators.compose([Validators.required])],
            country: ['', Validators.compose([Validators.required])],
            confirmPassword: ['', Validators.compose([Validators.required])],
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SignupPage');
    }

    signup(user) {
        this.showError = false;
        this.submitAttempt = true;
        this.errorMessage = '';
        if (this.user.password != this.confirmPassword) {
            return false;
        }
        if (this.signUpForm.valid) {
            var loader = this.loadingCtrl.create({
                content: "Please wait..."
            });

            loader.present();
            this.http.post('http://197.242.149.23/api/createUser', this.user).subscribe((data: any) => {
                if (data.result) {
                    loader.dismiss();
                    let toast = this.toastCtrl.create({
                        message: 'You have signed up successful.',
                        duration: 2000,
                        position: 'bottom'
                    });
                    toast.present(toast);
                    this.navCtrl.setRoot(LoginPage);
                } else {
                    loader.dismiss();
                    this.showError = true;
                    if (data.errorMessage != null){
                        this.errorMessage = data.errorMessage;
                    }
                    
                }
            });
        }

    }

    termsandconditions() {
        this.navCtrl.push(TermsandconditionsPage);
    }

}
