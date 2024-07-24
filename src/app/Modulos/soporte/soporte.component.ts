import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html',
  styleUrls: ['./soporte.component.scss']
})
export class SoporteComponent {
  nombre: string = '';
  email: string = '';
  subject: string = '';
  mensaje: string = '';

  constructor(private http: HttpClient) {}

  enviarMensaje() {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = `nombre=${this.nombre}&email=${this.email}&subject=${this.subject}&mensaje=${this.mensaje}`;

    this.http.post('/path/to/enviar_correo.php', body, { headers })
      .subscribe(response => {
        console.log('Mensaje enviado', response);
      }, error => {
        console.error('Error enviando mensaje', error);
      });
  }
}