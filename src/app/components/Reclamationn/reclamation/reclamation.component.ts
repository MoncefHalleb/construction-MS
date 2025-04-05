import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ReclamationService } from "../../../Services/ReclamationService/reclamation-service.service";
import { ToastrService } from "ngx-toastr";

interface TypeReclamation {
  type: string;
}

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  typeControl = new FormControl<TypeReclamation | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  typeReclamation: TypeReclamation[] = [
    { type: 'ANNULATION' },
    { type: 'MODIFICATION' },
    { type: 'AUTRES' }
  ];

  @Input() title: string = '';
  @Input() description_Reclamation: string = '';

  reclamationForm!: FormGroup;
  selectedFile!: File;

  constructor(
    private formBuilder: FormBuilder,
    private reclamationService: ReclamationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.reclamationForm = this.formBuilder.group({
      title: ['', Validators.required],
      typeReclamation: ['', Validators.required],
      description_Reclamation: ['', Validators.required],
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.reclamationForm.valid) {
      const newReclamation = {
        title: this.reclamationForm.value.title,
        typeReclamation: this.reclamationForm.value.typeReclamation,
        description_Reclamation: this.reclamationForm.value.description_Reclamation,
        statut: 'EN_ATTENTE'
      };

      this.reclamationService.addReclamation(newReclamation).subscribe({
        next: (createdReclamation) => {
          if (this.selectedFile) {
            this.reclamationService.uploadReclamationFile(this.selectedFile, createdReclamation.id_Reclamation).subscribe({
              next: () => {
                this.toastr.success("Réclamation et fichier envoyés !", 'Succès');
                this.reclamationForm.reset();
                this.selectedFile = undefined!;
              },
              error: () => {
                this.toastr.error("Réclamation envoyée, mais échec de l'envoi du fichier", 'Erreur Fichier');
              }
            });
          } else {
            this.toastr.success("Réclamation envoyée !", 'Succès');
            this.reclamationForm.reset();
          }
        },
        error: () => {
          this.toastr.error("Problème technique", 'Erreur');
        }
      });
    } else {
      this.toastr.warning("Veuillez remplir tous les champs", 'Champs requis');
    }
  }

  onDelete(): void {
    this.reclamationForm.reset();
    this.selectedFile = undefined!;
  }
}
