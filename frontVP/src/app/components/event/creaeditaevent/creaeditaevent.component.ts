import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user';
import { Event } from '../../../models/event';
import { EventType } from '../../../models/event-type';
import { UserService } from '../../../services/user.service';
import { EventService } from '../../../services/event.service';
import { EventTypeService } from '../../../services/event-type.service';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-creaeditaevent',
  standalone: true,
  providers: [ provideNativeDateAdapter() ],
  imports: [
    FormsModule, 
    MatDatepickerModule,
    MatFormFieldModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatInputModule, 
    MatSelectModule,
    CommonModule
  ],
  templateUrl: './creaeditaevent.component.html',
  styleUrl: './creaeditaevent.component.css'
})
export class CreaeditaeventComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  event: Event = new Event();
  id: number = 0;
  edicion: boolean = false;
  title: string = '';
  buttonText: string = '';
  listaPsicologos: User[] = [];
  listaVeteranos: User[] = [];
  listaEventTypes: EventType[] = [];
  rolPsicologo: string = 'PSICOLOGO';
  rolVeterano: string = 'VETERANO';
  
  

  constructor(
    private formBuilder: FormBuilder,
    private eS: EventService,
    private etS: EventTypeService,
    private uS: UserService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params)=>{
      this.id = data["id"];
      this.edicion = data["id"] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [{ value: '', disabled: true }], // Solo mostrar el ID
      hevent: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hpsicologo: ['', Validators.required],
      hveterano: ['', Validators.required],
      heventType: ['', Validators.required],
      hfechaRegistro: ["", Validators.required],
      hfechaInicio: ['', Validators.required],
      hfechaFin: ['', Validators.required],
    });

    this.uS.listbyrole(this.rolPsicologo).subscribe((data: User[]) => {
      this.listaPsicologos = data;
    });

    this.uS.listbyrole(this.rolVeterano).subscribe((data: User[]) => {
      this.listaVeteranos = data;
    });

    this.etS.list().subscribe((data) => {
      this.listaEventTypes = data;
    });
  }

  aceptar(): void{
    if(this.form.valid){
      this.event.idEvent = this.form.value.hcodigo;
      this.event.name = this.form.value.hevent;
      this.event.description = this.form.value.hdescripcion;
      this.event.startDate = this.form.value.hfechaInicio;
      this.event.endDate = this.form.value.hfechaFin;
      this.event.registrationDate = this.form.value.hfechaRegistro;
      this.event.verterano = this.listaVeteranos.find(v => v.id === this.form.value.hveterano) || new User();
      this.event.psicologo = this.listaPsicologos.find(p => p.id === this.form.value.hpsicologo) || new User();
      this.event.eventType = this.listaEventTypes.find(e => e.idEventType ===this.form.value.heventType) || new EventType();

      if(this.edicion){
        this.eS.update(this.event).subscribe(()=>{
          this.eS.list().subscribe((data)=>{
            this.eS.setlist(data);
            this.router.navigate(['eventos']);
          });
        });
      }
      else{
        this.eS.insert(this.event).subscribe(()=>{
          this.eS.list().subscribe((data)=>{
            this.eS.setlist(data);
            this.router.navigate(['eventos']); 
          });
        });
      }
    }
  }
  cancelar() {
    this.router.navigate(['/eventos']);
  }

  init() {
    if (this.edicion) {
      this.eS.listid(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idEvent),
          hevent: new FormControl(data.name),
          hdescripcion: new FormControl(data.description ),
          hveterano : new FormControl(data.verterano.id),
          hpsicologo : new FormControl(data.psicologo.id),
          heventType : new FormControl(data.eventType.idEventType),
          hfechaRegistro: new FormControl(data.registrationDate),
          hfechaInicio: new FormControl(data.startDate),
          hfechaFin: new FormControl(data.endDate),
        });
      });
    }
  }
}
