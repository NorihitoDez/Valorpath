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
import { UserService } from "../../../services/user.service";

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
  usus:User=new User();
  mensaje: string = "";
  id: number = 0;
  edicion: boolean = false;
  habilitado: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: "Enabled" },
    { value: false, viewValue: "Disabled" },
  ];
  usuarios:User[]=[]
  Tipos  = [
    {value: 'Texto', viewValue: 'Texto'},
    {value: 'Video', viewValue: 'Video'},
    {value: 'Audio', viewValue: 'Audio'},
  ];
  constructor(
    private formBuild: FormBuilder,
    private rs: RecursosService,
    private us: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data["id"];
      this.edicion = data["id"] != null;
    });
    this.form = this.formBuild.group({
      Autor: ['', Validators.required],
      Nombre: ['', Validators.required],
      Tipo: ['', Validators.required],
      Descripcion: ["", [Validators.required,Validators.minLength(10)]],
      Id:['',Validators.required]

    });
    this.us.list().subscribe((data) => {
      this.usuarios = data;
    });
  }

  aceptar(): void {
    console.log("Formulario:", this.form.value);  // Imprimir valores del formulario
  console.log("Validez:", this.form.valid);
    if (this.form.valid) {
      this.recursos.Autor = this.form.value.Autor;
      this.recursos.Nombre = this.form.value.Nombre;
      this.recursos.Tipo=this.form.value.Tipo;
      this.recursos.Descripcion=this.form.value.Descripcion;
      this.recursos.use.id = this.form.value.Id;
      if (this.edicion) {
        console.log('Datos a actualizar:', this.recursos);
        this.rs.update(this.recursos).subscribe(() => {
          this.rs.list().subscribe((data) => {
            this.rs.setList(data);
          });
        });
      } else {
        console.log('Datos a insertar:', this.recursos);
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
}
