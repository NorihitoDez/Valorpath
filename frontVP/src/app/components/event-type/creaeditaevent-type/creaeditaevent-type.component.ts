import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { EventType } from "../../../models/Event-type";
import { EventTypeService } from "../../../services/event-type.service";

@Component({
  selector: 'app-creaeditaevent-type',
  standalone: true,
  imports: [ FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './creaeditaevent-type.component.html',
  styleUrl: './creaeditaevent-type.component.css'
})
export class CreaeditaeventTypeComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  eventT: EventType = new EventType();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private etS: EventTypeService,
    private router: Router,
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      htitulo: ['', Validators.required],
      hdescripcion: ['', Validators.required]
    });

  }

  aceptar() {
    if (this.form.valid) {
      this.eventT.idEventType = this.form.value.hcodigo;
      this.eventT.title = this.form.value.htitulo;
      this.eventT.description = this.form.value.hdescripcion;
      if (this.edicion) {
        //update
        this.etS.update(this.eventT).subscribe(data=> {
          this.etS.list().subscribe(data=>{
            this.etS.setlist(data)
          })
        });
      } else {
        //insertar
        this.etS.insert(this.eventT).subscribe((data) => {
          this.etS.list().subscribe((data) => {
            this.etS.setlist(data);
          });
        });
      }
    }
    this.router.navigate(['tipoevento']);
  }
  init() {
    if (this.edicion) {
      this.etS.listid(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idEventType),
          htitulo: new FormControl(data.title),
          hdescripcion: new FormControl(data.description),
        });
      });
    }
  }


}
