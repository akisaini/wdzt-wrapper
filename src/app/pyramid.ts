export class Pyramid {
  id: string | undefined;
  name: string | undefined;
  _links: any;
}

export interface PaginatedPyramid {
  page: any;
  data: Pyramid[];
  _links: any;
}
