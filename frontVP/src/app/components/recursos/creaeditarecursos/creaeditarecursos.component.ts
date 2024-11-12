import { Component, OnInit } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule, NgIf } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, Params, Router, RouterLink } from "@angular/router";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { recursos } from "../../../models/recursos";
import { RecursosService } from "../../../services/recursos.service";

@Component({
  selector: "app-creaeditarecursos",
  standalone: true,
  imports: [
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: "./creaeditarecursos.component.html",
  styleUrl: "./creaeditarecursos.component.css",
})
export class CreaeditarecursosComponent {
  form: FormGroup = new FormGroup({});
  recursos: recursos = new recursos();
  mensaje: string = "";
  id: number = 0;
  edicion: boolean = false;
  habilitado: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: "Enabled" },
    { value: false, viewValue: "Disabled" },
  ];
  constructor(
    private formBuild: FormBuilder,
    private rs: RecursosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data["id"];
      this.edicion = data["id"] != null;
      this.init();
    });
    this.form = this.formBuild.group({
      id: [""],
      Autor: ["", Validators.required],
      Titulo: ["", Validators.required],
      Tipo: ["", Validators.required],
      Descripcion: ["", Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.recursos.id = this.form.value.id;
      this.recursos.Autor = this.form.value.Autor;
      this.recursos.Nombre = this.form.value.Titulo;
      this.recursos.use = this.form.value.use;
      if (this.edicion) {
        this.rs.update(this.recursos).subscribe(() => {
          this.rs.list().subscribe((data) => {
            this.rs.setList(data);
          });
        });
      } else {
        this.rs.insert(this.recursos).subscribe((data) => {
          this.rs.list().subscribe((data) => {
            this.rs.setList(data);
          });
        });
      }
      this.router.navigate(["recursos"]);
    } else {
      this.mensaje = "Complete todos los campos, revise!!";
    }
  }
  init() {
    if (this.edicion) {
      this.rs.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          Titulo: new FormControl(data.Nombre),
          Tipo: new FormControl(data.Tipo),
          Autor: new FormControl(data.Autor),
        });
      });
    }
  }
}
