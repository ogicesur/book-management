import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import * as bookActions from "./book.actions";
import { BookService } from "./book.service";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class BookEffects {
    //This is an NgRx Effect that responds to 'AddBook' actions.
    addBook$ = createEffect(() => this.actions$.pipe(
        // ofType is a filter that only allows actions of a certain type to pass through.
        ofType(bookActions.AddBook),
        // mergeMap is a function that takes an input Observable and returns an output Observable.
        // In this case, it takes the 'AddBook' action and returns the result of calling the 'addBook' method on the 'bookService'.
        // 'mergeMap' allows multiple concurrent 'addBook' calls.
        mergeMap(action => this.bookService.addBook(action).pipe(
            // If the 'addBook' call is successful, the 'AddBookSuccess' action is dispatched with the book as a payload.
            map(book => bookActions.AddBookSuccess(book)),
            // If the 'addBook' call fails, the 'AddBookFailure' action is dispatched with the error as a payload.
            catchError(error => of(bookActions.AddBookFailure({ error })))
        ))
    ));

    constructor(private actions$: Actions, private bookService: BookService) { }
}