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
  ) {this.route.params.subscribe(params => {
    const id = params['id'];
    console.log(id);});}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data["id"];
      this.edicion = data["id"] != null;
      
      this.init()
    });
    this.form = this.formBuild.group({
      idrecurso: [''],
      autor: ['', Validators.required],
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required],

    });
  }

  aceptar(): void {

    if (this.form.valid) {
      console.log('Formulario válido');
      this.recursos.idrecurso=this.form.value.idrecurso;
      this.recursos.autor = this.form.value.autor;
      this.recursos.nombre = this.form.value.nombre;
      this.recursos.tipo=this.form.value.tipo;
      this.recursos.descripcion=this.form.value.descripcion;

      if (this.edicion) {
        this.rs.update(this.recursos).subscribe((data) => {
          console.log('ID enviado para actualización:', this.recursos.idrecurso);
          this.rs.list().subscribe((data) => {
            this.rs.setList(data);
          });
        },);
      } else {
        this.rs.insert(this.recursos).subscribe((data) => {
          this.rs.list().subscribe((data) => {
            this.rs.setList(data); // lista nueva a listacambio
          });
        });
      }
      this.router.navigate(['rutatemporal']); // router  qme lleve a usuraios una vez dado click al aceptar
    } else {
      this.mensaje = 'Complete todos los campos, revise!!';
    }
  }
  cancelar(): void {
    this.router.navigate(['/rutatemporal']); 
  }
  init() {
    if (this.edicion) {
      this.rs.listId(this.id).subscribe((data) => {
        this.form.patchValue  ({
          idrecurso: new FormControl(data.idrecurso),
          autor: new FormControl(data.autor),
          nombre: new FormControl(data.nombre),
          tipo: new FormControl(data.tipo),
          descripcion: new FormControl(data.descripcion),
        });
      });
    }
}}
