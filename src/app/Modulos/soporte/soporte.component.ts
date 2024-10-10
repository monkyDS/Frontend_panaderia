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
  isChatOpen: boolean = false;
  newChatMessage: string = '';
  chatMessages: { type: string; content: string }[] = [];
  hasRespondedOnce: boolean = false; 

  constructor(private http: HttpClient) {}

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendChatMessage() {
    if (this.newChatMessage.trim()) {
        this.chatMessages.push({ type: 'sent', content: this.newChatMessage });

        setTimeout(() => {
            if (!this.hasRespondedOnce) {
                this.chatMessages.push({ type: 'received', content: 'Gracias por tu mensaje, estamos aquí para ayudarte.' });
                this.chatMessages.push({ type: 'received', content: 'Por favor escribe en el chat una de estas opciones disponibles:<br>1. Horario de atención<br>2. Contacto<br>3. Reportar un problema'});
                this.hasRespondedOnce = true;
            } else {
                const lowerMessage = this.newChatMessage.toLowerCase();
                let responseMessage: string;

                if (lowerMessage.includes('Horario de atención') || this.newChatMessage.trim() === '1') {
                    responseMessage = 'Nuestro horario de atención es de 8:00 AM a 6:00 PM de lunes a viernes.';
                } else if (lowerMessage.includes('contacto') || this.newChatMessage.trim() === '2') {
                    responseMessage = 'Puedes contactarnos al correo: jhamsoto669@gmail.com o al teléfono +57 315 7725794.';
                } else if (lowerMessage.includes('pedido') || this.newChatMessage.trim() === '3') {
                    responseMessage = 'Por el momento no contamos con un sistema funcional en la aplicación, por favor comunícate con nosotros a través deL correo jhamsoto669@gmail.com para reportar el problema.';
                } else if (lowerMessage.includes('reportar un problema') || this.newChatMessage.trim() === '3') {
                    responseMessage = 'Por el momento no contamos con un sistema funcional en la aplicación, por favor comunícate con nosotros a través de correo jhamsoto669@gmail.com para reportar el problema.';
                } else {
                    responseMessage = 'No reconozco esa opción. Por favor, selecciona una de las siguientes:<br>1. Horario de atención<br>2. Contacto<br>3. Reportar un problema';
                }

                this.chatMessages.push({ type: 'received', content: responseMessage });
            }

            this.newChatMessage = '';
        }, 1000);
    }
}
  

  enviarMensaje() {
    const payload = {
      nombre: this.nombre,
      email: this.email,
      subject: this.subject,
      mensaje: this.mensaje
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post('URL_DEL_API', payload, { headers })
      .subscribe(response => {
        console.log('Mensaje enviado', response);
      }, error => {
        console.error('Error al enviar el mensaje', error);
      });
  }
}
