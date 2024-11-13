  import { Component, OnInit } from "@angular/core";
  import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
  } from "@angular/forms";
  import { User } from "../../../models/user";
  import { Role } from "../../../models/role";
  import { RoleService } from "../../../services/role.service";
  import { UserService } from "../../../services/user.service";
  import { ActivatedRoute, Params, Router } from "@angular/router";
  import { MatFormFieldModule } from "@angular/material/form-field";
  import { MatButtonModule } from "@angular/material/button";
  import { MatInputModule } from "@angular/material/input";
  import { MatSelectModule } from "@angular/material/select";
  import {MatDividerModule} from '@angular/material/divider';
  import {MatIconModule} from '@angular/material/icon';
  import { CommonModule } from "@angular/common";

  @Component({
    selector: "app-creaeditarole",
    standalone: true,
    imports: [
      FormsModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatInputModule,
      MatSelectModule,
      MatDividerModule,
      MatIconModule,
      CommonModule
    ],
    templateUrl: "./creaeditarole.component.html",
    styleUrl: "./creaeditarole.component.css",
  })

  export class CreaeditaroleComponent implements OnInit {
    form: FormGroup = new FormGroup({});
    listaUsuarios: User[] = [];
    role: Role = new Role();
    id: number = 0;
    edicion: boolean = false;
  
    listaRoles: { value: string; viewValue: string }[] = [
      { value: 'PSICOLOGO', viewValue: 'PSICOLOGO' },
      { value: 'VETERANO', viewValue: 'VETERANO' },
      { value: 'ADMINISTRADOR', viewValue: 'ADMINISTRADOR' },
    ];
  
    constructor(
      private formBuilder: FormBuilder,
      private rS: RoleService,
      private uS: UserService,
      private route: ActivatedRoute,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        this.id = params['id'];
        this.edicion = this.id != null;
        this.init();
      });
  
      this.form = this.formBuilder.group({
        hcodigo: [{ value: '', disabled: true }], // Solo mostrar el ID
        hrole: ['', Validators.required],
        husuarios: ['', Validators.required],
      });
  
      // Cargar la lista de usuarios para el select
      this.uS.list().subscribe((data) => {
        this.listaUsuarios = data;
      });
    }
  
    init() {
      if (this.edicion) {
        this.rS.listid(this.id).subscribe((data) => {
          this.form = new FormGroup({
            hcodigo: new FormControl(data.idRole),
            hrole: new FormControl(data.nameRole),
            husuarios: new FormControl(data.user.username ),
          });
        });
      }
    }
  
    aceptar(): void {
      if (this.form.valid) {
        this.role.idRole = this.form.value.hcodigo;
        this.role.nameRole = this.form.value.hrole;
        this.role.user = { id: this.form.value.husuarios } as User;
  
        if (this.edicion) {
          this.rS.update(this.role).subscribe(() => {
            this.rS.list().subscribe((data) => {
              this.rS.setlist(data);
            });
          });
        } else {
          this.rS.insert(this.role).subscribe(() => {
            this.rS.list().subscribe((data) => {
              this.rS.setlist(data);
            });
          });
        }
        this.router.navigate(["roles"]);
      }
    }
  }
  