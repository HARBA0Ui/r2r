import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Level } from '../../classes/level';

@Component({
  selector: 'app-levels',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './levels.component.html',
  styleUrl: './levels.component.css',
})
export class LevelsComponent {
  levels: Level[] = [
    {
      name: 'Beginner',
      levelNumber: 1,
    },
    {
      name: 'Intermediate',
      levelNumber: 2,
    },
    {
      name: 'Advanced',
      levelNumber: 3,
    },
  ];
}
