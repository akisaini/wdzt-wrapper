export class Pyramid {
    // id: string | undefined; Is this correct?  
    id: string | undefined;
    name: string | undefined;
    creationDate: Date | undefined;
    job: string | undefined;
    owner: string | undefined;
    publiclyShared: boolean = true;
    _links: any;
  }
  
  export interface PaginatedPyramid {
    page: any;
    data: Pyramid[];
    _links: any;
  }
  