declare namespace React {
  interface sharedElementsReturnType {
    id: string;
    animation?: string;
  }

  export interface FunctionComponent {
    sharedElements?(navigation: any): sharedElementsReturnType[];
  }
}
