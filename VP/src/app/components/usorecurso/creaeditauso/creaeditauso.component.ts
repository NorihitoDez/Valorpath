import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { RecursosService } from '../../../services/recursos.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { recursos } from '../../../models/recursos';
import { usorecurso } from '../../../models/usorecurso';
import { UsorecursoService } from '../../../services/usorecurso.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-creaeditauso',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
  templateUrl: './creaeditauso.component.html',
  styleUrl: './creaeditauso.component.css'
})
export class CreaeditausoComponent {
  form: FormGroup = new FormGroup({});
  usorecurso: usorecurso = new usorecurso(); //trae toda la data
  Listausuario: User[]=[];
  Listarecurso: recursos[]=[];
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  constructor(
    private formBuild: FormBuilder, 
    private uS: UserService, 
    private usor:UsorecursoService,
    private rs: RecursosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
    });
    this.form = this.formBuild.group({
      iduso: [''],
      fecha:['',Validators.required],
      usuario:['',Validators.required],
      recurso:['',Validators.required]
    });
    this.uS.list().subscribe((data) => {
      this.Listausuario = data;
    });
    this.rs.list().subscribe((data) => {
      this.Listarecurso = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.usorecurso.iduso=this.form.value.iduso;
      this.usorecurso.fecha=this.form.value.fecha;
      this.usorecurso.usuario.id=this.form.value.usuario;
      this.usorecurso.recurso.idrecurso=this.form.value.recurso;
      this.usor.insert(this.usorecurso).subscribe((data) => {
        this.usor.list().subscribe((data) => {
          this.usor.setList(data); 
        });
      })

      this.router.navigate(['usorecurso'])
} else {
  this.mensaje = 'Complete todos los campos, revise!!';
} }

cancelar(): void {
  this.router.navigate(['/rutatemporal']); }
}
