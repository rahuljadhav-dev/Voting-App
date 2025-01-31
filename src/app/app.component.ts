import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PollComponent } from "./poll/poll.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, PollComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fixed: Changed 'styleUrl' to 'styleUrls'
})
export class AppComponent {
  title = 'poll-application';
}
