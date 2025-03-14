import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  
  constructor(private route: ActivatedRoute,private http:HttpClient,private router: Router) {}
  prgi: any;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.prgi = history.state.project as any;
      console.log(this.prgi); 
    });
  }
 
  getFieldValue(a:any,b:any):any {
    a.preventDefault();
    console.log(b);
    let amt = b.amnt;
    let sd = {
      id:this.prgi._id,
      amount:b.ammount
    };
    const data : any = sessionStorage.getItem('id');
    const headers = new HttpHeaders({"authorization": data })
    this.http.post<any>(AppComponent.rooturl + "/payment", sd,{ headers: headers })
    .subscribe(
      response => {
        console.log('POST request successful:', response);
        window.alert("payment done");
        this.router.navigate(['/progct']);
      },
      error => {
        console.error('POST request failed:', error);
        // Handle error as needed
      }
    );
  }
}
