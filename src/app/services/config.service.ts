import { Injectable } from "@angular/core";             //Injectable import
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";      //Http client import for http request
import { Observable, throwError } from "rxjs";           //Observable import to handle response from successful http request
import { catchError, retry } from "rxjs/operators";      //ThrowError and CatchError import to handle error messages from http request
import { environment } from "src/environments/environment"; //use environment variable to set apiUrl
import { HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class ConfigService {

    configUrl = environment.apiUrl;

    //Initializing private variable http in constructor
    constructor(private http: HttpClient) { }

    //Login into api
    login(user: any): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin':'http://localhost:4200',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Methods' : 'POST',
                'Access-Control-Allow-Headers' : 'x-requested-with,content-type',
            })
        }

        return this.http.post<any>(this.configUrl, user, httpOptions)
            .pipe(
                retry(3),       //Retry a failed request up to 3 times
                catchError(this.handleError)        //Catch error using the handleError method
            );
    }

    //Process error messaging to the user
    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            //A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            //The backend returned an unsuccessful response code.
            console.error(
                `Backend return code ${error.status}, body was: `, error.error);
        }

        //Return an observable with a user-facing error message
        return throwError(() => new Error('Something happened; please try again later.'));
    }
}