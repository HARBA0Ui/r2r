export class Product {
  constructor(
    public id: string,
    public title: string,
    public desc: string,
    public price: number,
    public category: string,
    public gender: string,
    public isAvailable: boolean,
    public requiredLevel: number,
    public imgs: string[],
    public codeId?: string ,
  ) {}
}
