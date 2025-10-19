import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../../shared/api-urls.enum';
import { User } from '../user-management.service';

export interface UserSearchResult {
  content: User[];
  totalPages: number;
  totalElements: number;
}

/**
 * Data source for the UserTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UserTableDataSource extends DataSource<User> {
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  userCount = 0;
  roleFilter$: BehaviorSubject<string> = new BehaviorSubject('');
  searchQuery$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<User[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf([]),
        this.paginator.page,
        this.sort.sortChange,
        this.roleFilter$.asObservable(),
        this.searchQuery$.asObservable()
      ).pipe(
        switchMap(() => this.getUsers()),
        tap((result) => {
          this.userCount = result.totalElements;
        }),
        map((result) => result.content)
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  private getUsers(): Observable<UserSearchResult> {
    let userListUrl = ApiUrls.Users.toString();
    userListUrl = this.addPageParameters(userListUrl);
    userListUrl = this.addSortParameters(userListUrl);
    userListUrl = this.addSearchQuery(userListUrl);
    userListUrl = this.addRole(userListUrl);
    return this.http.get<UserSearchResult>(userListUrl);
  }

  private addPageParameters(url: string) {
    if (this.paginator) {
      url += `?page=${this.paginator.pageIndex}&size=${this.paginator.pageSize}`;
    }
    return url;
  }

  private addSortParameters(url: string) {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return url;
    }
    url += url.includes('?') ? '&' : '?';
    url += `sort=${this.sort?.active},${this.sort?.direction}`;
    return url;
  }

  private addSearchQuery(url: string) {
    url += url.includes('?') ? '&' : '?';
    url += `query=${this.searchQuery$.value}`;
    return url;
  }

  private addRole(url: string) {
    if (!this.roleFilter$.value) {
      return url;
    }
    url += url.includes('?') ? '&' : '?';
    url += `role=${this.roleFilter$.value}`;
    return url;
  }
}
