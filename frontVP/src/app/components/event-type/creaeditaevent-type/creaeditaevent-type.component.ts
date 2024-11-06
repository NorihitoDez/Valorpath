import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { EventType } from "../../../models/event-type";
import { EventTypeService } from "../../../services/event-type.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-creaeditaevent-type",
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./creaeditaevent-type.component.html",
  styleUrl: "./creaeditaevent-type.component.css",
})
export class CreaeditaeventTypeComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  eventT: EventType = new EventType();

  constructor(
    private formBuilder: FormBuilder,
    private etS: EventTypeService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      htitulo: ['', Validators.required],
      hdescripcion: ['', Validators.required],

    });

  }

  aceptar(): void {

    if(this.form.valid){
      this.eventT.title=this.form.value.htitulo
      this.eventT.description=this.form.value.hdescripcion
      

      this.etS.insert(this.eventT).subscribe(data=>{
        this.etS.list().subscribe((data)=>{
          this.etS.setlist(data);
        });
      });
      this.router.navigate(['tipoevento'])
    }

  }

}
