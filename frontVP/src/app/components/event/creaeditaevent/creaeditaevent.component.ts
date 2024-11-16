import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Eventt } from "../../../models/Eventt";
import { User } from "../../../models/user";
import { EventService } from "../../../services/event.service";
import { UserService } from "../../../services/user.service";
import { EventTypeService } from "../../../services/event-type.service";
import { EventType } from "../../../models/Event-type";

@Component({
  selector: "app-creaeditaevent",
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    FormsModule,
  ],
  templateUrl: "./creaeditaevent.component.html",
  styleUrl: "./creaeditaevent.component.css",
})
export class CreaeditaeventComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  eventt: Eventt = new Eventt();
  id: number = 0;
  edicion: boolean = false;
  listapsicologos: User[] = [];
  listaveteranos: User[] = [];
  listaeventT: EventType[] = [];
  rolv: string = 'VETERANO';
  rolp: string = 'PSICOLOGO';

  constructor(
    private formBuilder: FormBuilder,
    private eS: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UserService,
    private etS: EventTypeService,
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data["id"];
      this.edicion = data["id"] != null;
      this.init();
    });

    // Inicializar el formulario con los validadores
    this.form = this.formBuilder.group({
      hcodigo: [""],
      hnombre: ["", Validators.required],
      hdescripcion: ["", Validators.required],
      hinicio: ["", Validators.required],
      hfin: ["", Validators.required],
      hregistro: ["", Validators.required],
      hveterano: ["", Validators.required],
      hpsicologo: ["", Validators.required],
      htipoe: ["", Validators.required],
    });

    // Cargar las listas necesarias
    this.cargarListas();
  }

  // Cargar las listas de usuarios y tipos de evento
  cargarListas() {
    this.uS.listarPorRol(this.rolp).subscribe((data) => {
      this.listapsicologos = data;
    });

    this.uS.listarPorRol(this.rolv).subscribe((data: User[]) => {
      this.listaveteranos = data;
    });

    this.etS.list().subscribe((data) => {
      this.listaeventT = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      // Asignar valores al objeto eventt
      this.eventt.idEvent = this.form.value.hcodigo;
      this.eventt.name = this.form.value.hnombre;
      this.eventt.description = this.form.value.hdescripcion;
      this.eventt.startDate = this.form.value.hinicio;
      this.eventt.endDate = this.form.value.hfin;
      this.eventt.registrationDate = this.form.value.hregistro;
      this.eventt.veterano = {id: this.form.value.hveterano} as User;
      this.eventt.psicologo = {id: this.form.value.hpsicologo} as User;
      this.eventt.eventType.idEventType= this.form.value.htipoe;
  
      if (this.edicion) {
        // Actualizar evento existente
        this.eS.update(this.eventt).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setlist(data);
            this.router.navigate(["eventos"]);
          });
        });
      } else {
        // Crear nuevo evento
        this.eS.insert(this.eventt).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setlist(data);
            this.router.navigate(["eventos"]);
          });
        });
      }
    }
  }
  
  // Inicializar el formulario en modo edición
  init() {
    if (this.edicion) {
      this.eS.listid(this.id).subscribe((data) => {
        this.form.patchValue({
          hcodigo: data.idEvent,
          hnombre: data.name,
          hdescripcion: data.description,
          hinicio: data.startDate,
          hfin: data.endDate,
          hregistro: data.registrationDate,
          hveterano: data.veterano.id,
          hpsicologo: data.psicologo.id,
          htipoe: data.eventType.idEventType,
        });
      });
    }
  }
}
