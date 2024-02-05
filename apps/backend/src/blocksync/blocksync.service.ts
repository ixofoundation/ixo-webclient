import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BlocksyncService {
  constructor(private readonly httpService: HttpService) {}

  private readonly apiUrl =
    'https://devnet-blocksync-graphql.ixo.earth/graphql';

  query(query: string, variables?: any): Observable<any> {
    return this.httpService
      .post(this.apiUrl, {
        query,
        variables,
      })
      .pipe(
        map((response) => {
          console.log(
            'Data received from API:',
            response.data.data.entities.nodes,
          );
          return response.data.data.entities.nodes;
        }), // Map the observable to extract data
      );
  }
}
