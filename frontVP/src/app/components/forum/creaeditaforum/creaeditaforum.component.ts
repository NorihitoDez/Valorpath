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
import { Router } from "@angular/router";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonModule } from "@angular/material/button";

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
  ],
  templateUrl: "./creaeditaforum.component.html",
  styleUrl: "./creaeditaforum.component.css",
})
export class CreaeditaforumComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  //variable para q valide lod e la fecha no se amenor a la de hoy
  today: Date = new Date(); // Fecha de hoy para el Datepicker
  errorMessage: string = "";
  listaUsuarios: User[] = [];
  fm: Forum = new Forum();
  constructor(
    private formBuilder: FormBuilder,
    private uS: UserService,
    private fS: ForumService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.today.setHours(0, 0, 0, 0);
    this.form = this.formBuilder.group({
      //paraq valide
      htitulo: ["", Validators.required],
      //hacer q sno puedanecojer fechas pasadas
      hfecha: [
        "",
        [Validators.required, this.futuraeFechaValidacion.bind(this)],
      ],
      hdescripccion: ["", Validators.required],
      hpsicologo: ["", Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
      //or
      /*this.listaUsuarios = data.filter((data) => {
        return data.username.startsWith("P");
      });*/
    });
  }
  //meotdo de validacion para la fecha

  // Validador para permitir solo fechas de hoy en adelante, esto lo llamo drcmantne en el form
  futuraeFechaValidacion(control: FormControl) {
    const selectedDate = new Date(control.value);
    if (selectedDate < this.today) {
      return { invalidDate: true };
    }
    return null;
  }
  //para e btonn acpetar
  aceptar() {
    if (this.form.valid) {
      //this.forum.id=this.form.value.
      this.fm.title = this.form.value.htitulo;
      this.fm.description = this.form.value.hdescripccion;
      this.fm.date = this.form.value.hfecha;
      this.fm.psychologist.username = this.form.value.hpsicologo;
      //
      this.fS.insert(this.fm).subscribe((data) => {
        this.fS.list().subscribe((data) => {
          this.fS.setlist(data);
        });
      });
      this.router.navigate(['foros']);
    } else {
      this.errorMessage = "Es necesario que complete todos los campos";
      //this.form.markAllAsTouched(); // Marca todos los campos como tocados para mostrar mensajes de error
    }
  }
  //para los errores en expecífcio
  /*getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return `El campo ${fieldName} es obligatorio`;
    }
    return '';
  }*/
  /*getErrorMessage(fieldName: string): string {
      const field = this.form.get(fieldName);
      if (field?.hasError('required')) {
        return `El campo ${fieldName} es obligatorio`;
      }
      if (fieldName === 'hfecha' && field?.hasError('invalidDate')) {
        return 'La fecha debe ser hoy o en el futuro';
      }
      return '';
    }*/
}
