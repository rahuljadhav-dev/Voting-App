import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Poll } from './poll.models';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private apiUrl = 'http://localhost:8080/api/polls';

  constructor(private http: HttpClient) {}

  // Fetch all polls
  getPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>(`${this.apiUrl}`);
  }

  // Create a new poll
  createPoll(poll: Poll): Observable<Poll> {
    return this.http.post<Poll>(`${this.apiUrl}`, poll);
  }

  // Vote for an option
  vote(pollId: number, optionIndex: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/vote`, { pollId: pollId, optionIndex });
  }

  deletePoll(pollId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${pollId}`, { responseType: 'text' }).pipe(
      tap(response => console.log('Delete Response:', response)), // Debugging
      catchError(error => {
        console.error('Error deleting poll:', error);
        return throwError(error);
      })
    );
  }
  
}
