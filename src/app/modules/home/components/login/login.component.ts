import { Component } from '@angular/core';
import {faChevronRight, faLock, faSquareUpRight, faUser} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router:Router,private loginService:LoginService) {
  }

  login(loginForm:NgForm){
    this.loginService.login(loginForm.value).subscribe(
      (usuario:any) =>{
        if (usuario){
          localStorage.setItem("usuario",String(usuario.usr_id))
          loginForm.resetForm();
          this.goToLista()
        }
      },error => {
        alert('Credenciales Invalidas')
        loginForm.onReset()
      }
    )
  }

  goToLista(){
    this.router.navigate(['/Cumpleaños/observaciones/lista'])
  }

  protected readonly faUser = faUser;
  protected readonly faLock = faLock;
  protected readonly faChevronRight = faChevronRight;
  protected readonly faSquareUpRight = faSquareUpRight;
}
