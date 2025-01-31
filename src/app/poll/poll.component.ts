import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Poll } from '../poll.models';
import { PollService } from '../poll.service';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ensure FormsModule is included
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})

export class PollComponent implements OnInit {
  polls: Poll[] = [];
  
  newPoll: Poll = {
     id: 0,
      question: '',
      options: [{ optionText: '', voteCount: 0 }, 
        { optionText: '', voteCount: 0 }],
   
  };

  constructor(private pollService:PollService) {}

  ngOnInit(): void {
    this.loadPolls();
  }

  // Load all polls from the backend
  loadPolls(): void {
    this.pollService.getPolls().subscribe(data => {
      this.polls = data;
    });
  }

  // Add a new option to the poll
  addOption(): void {
    this.newPoll.options.push({ optionText: '', voteCount: 0 });
  }

  // Create a new poll
  createPoll(): void {
    if (this.newPoll.question.trim() === '' || this.newPoll.options.some(opt => opt.optionText.trim() === '')) {
      alert('Please enter a question and options.');
      return;
    }

    this.pollService.createPoll(this.newPoll).subscribe(() => {
      this.newPoll = { id: 0, question: '', options: [{ optionText: '', voteCount: 0 }, { optionText: '', voteCount: 0 }] };
      this.loadPolls();
    });
  }

  // Vote for an option
  vote(pollId: number, optionIndex: number): void {
    this.pollService.vote(pollId, optionIndex).subscribe(() => {
      const poll=this.polls.find(p=>p.id===pollId);
      if(poll){
        poll.options[optionIndex].voteCount++;
      }
    });
  }

  deletePoll(pollId: number): void {
    this.pollService.deletePoll(pollId).subscribe({
      next: (response) => {
        console.log(response); // Debugging: Should print "Poll Deleted Successfully"
        this.polls = this.polls.filter(p => p.id !== pollId); // Remove poll from UI
      },
      error: (err) => console.error('Error while deleting:', err)
    });
  }
  

  // Track options by index to avoid errors
  trackByIndex(index: number, item: any): number {
    return index;
  }
}
