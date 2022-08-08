import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-abilitie',
  templateUrl: './abilitie.component.html',
  styleUrls: ['./abilitie.component.css']
})
export class AbilitieComponent implements OnInit {

  id: string | null;
  projectId: string | null;
  phaseId: string | null;

  constructor(
    private aRoute : ActivatedRoute
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
    this.projectId = this.aRoute.snapshot.paramMap.get('projectId');
    this.phaseId = this.aRoute.snapshot.paramMap.get('phaseId');
  }

  ngOnInit(): void {

  }

}
