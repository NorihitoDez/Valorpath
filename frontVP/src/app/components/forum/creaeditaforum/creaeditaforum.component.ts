import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { provideNativeDateAdapter } from "@angular/material/core";
import { User } from "../../../models/user";
import { Forum } from "../../../models/Forum";
import { UserService } from "../../../services/user.service";
import { ForumService } from "../../../services/forum.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-creaeditaforum",
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: "./creaeditaforum.component.html",
  styleUrl: "./creaeditaforum.component.css",
})
export class CreaeditaforumComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  today: Date = new Date();
  errorMessage: string = "";
  listaUsuarios: User[] = [];
  fm: Forum = new Forum();
  id: number = 0;
  edicion: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private uS: UserService,
    private fS: ForumService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  // Validador para permitir solo fechas de hoy en adelante, esto lo llamo drcmantne en el form
  futuraeFechaValidacion(control: FormControl) {
    const selectedDate = new Date(control.value);
    if (selectedDate < this.today) {
      return { invalidDate: true };
    }
    return null;
  }
  ngOnInit(): void {
    //this.today.setHours(0, 0, 0, 0);
    this.form = this.formBuilder.group({
      htitulo: ["", Validators.required],
      hfecha: [
        "",
        [Validators.required, this.futuraeFechaValidacion.bind(this)],
      ],
      hdescripccion: ["", Validators.required],
      hpsicologo: ["", Validators.required],
    });
    this.route.params.subscribe((data: Params) => {
      this.id = data["id"];
      if (this.id != null) {
        this.edicion = true;
        this.init(); // Llamar a init() después de obtener el id
      }
    });
    this.today.setHours(0, 0, 0, 0);
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
    //or
    /*this.listaUsuarios = data.filter((data) => {
        return data.username.startsWith("P");
      });*/
  }
  /*init() {
    if (this.edicion) {
      this.fS.listId(this.id).subscribe((data) => {
        console.log(data); // Agregar esta línea para ver los datos recibidos
        this.form = new FormGroup({
          htitulo: new FormControl(data.title),
          hfecha: new FormControl(data.date),
          hdescripccion: new FormControl(data.description),
          hpsicologo: new FormControl(data.psychologist.id),
        });
      });
    }
  }*/
   //para el actualizar/modificar
  init() {
    if (this.edicion && this.id) {
      this.fS.listId(this.id).subscribe((data) => {
        if (data) {
          console.log("Datos recibidos para edición:", data);  // Verifica los datos recibidos
          this.form.patchValue({
            htitulo: data.title,
            hfecha: data.date,
            hdescripccion: data.description,
            hpsicologo: data.psychologist?.id || null,  // Asegura que `id` exista
          });
        } else {
          console.warn("No se encontró el foro con el ID proporcionado.");
        }
      }, error => {
        console.error("Error al obtener los datos del foro:", error);
      });
    }
  }

    
    
    aceptar() {
      if (this.form.valid) {
        // Asignar valores del formulario al objeto fm
        this.fm.title = this.form.value.htitulo;
        this.fm.description = this.form.value.hdescripccion;
        this.fm.date = this.form.value.hfecha;
        this.fm.psychologist.id = this.form.value.hpsicologo;
    
        if (this.edicion) {
          this.fm.id = this.id; 
          // Aquí la actualización se realiza correctamente con el ID
          this.fS.update(this.fm).subscribe(() => {
            this.fS.list().subscribe((data) => {
              this.fS.setlist(data);
            });
            this.router.navigate(["foros"]);
          });
        } else {
          // Si no es edición, se hace una inserción
          this.fS.insert(this.fm).subscribe(() => {
            this.fS.list().subscribe((data) => {
              this.fS.setlist(data);
            });
          });
        }
    
        this.router.navigate(["foros"]);
      } else {
        this.errorMessage = "Es necesario que complete todos los campos";
      }
    }
     
    
  
}
