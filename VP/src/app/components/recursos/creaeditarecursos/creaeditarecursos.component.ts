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
import { User } from "../../../models/user";


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
  Tipos  = [
    {value: 'Texto', viewValue: 'Texto'},
    {value: 'Video', viewValue: 'Video'},
    {value: 'Audio', viewValue: 'Audio'},
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
      this.init()
    });
    this.form = this.formBuild.group({
      Autor: ['', Validators.required],
      Nombre: ['', Validators.required],
      Tipo: ['', Validators.required],
      Descripcion: ["", Validators.required],

    });
  }

  aceptar(): void {
    console.log("Formulario:", this.form.value);  // Imprimir valores del formulario
  console.log("Validez:", this.form.valid);
    if (this.form.valid) {
      console.log('Formulario válido');
      this.recursos.Autor = this.form.value.Autor;
      this.recursos.Nombre = this.form.value.nombre;
      this.recursos.Tipo=this.form.value.Tipo;
      this.recursos.Descripcion=this.form.value.Descripcion;
      if (this.edicion) {
        this.rs.update(this.recursos).subscribe(() => {
          this.rs.list().subscribe((data) => {
            this.rs.setList(data);
          });
        });
      } else {
        this.rs.insert(this.recursos).subscribe((data) => {
          this.rs.list().subscribe((data) => {
            this.rs.setList(data); // lista nueva a listacambio
          });
        });
      }
      this.router.navigate(['recursos']); // router  qme lleve a usuraios una vez dado click al aceptar
    } else {
      this.mensaje = 'Complete todos los campos, revise!!';
    }
  }
  init() {
    if (this.edicion) {
      this.rs.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          Id: new FormControl(data.idrecurso),
          Autor: new FormControl(data.Autor),
          Nombre: new FormControl(data.Nombre),
          Tipo: new FormControl(data.Tipo),
          Descripcion: new FormControl(data.Descripcion),
        });
      });
    }
}}
