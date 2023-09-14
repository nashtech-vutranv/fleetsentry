/**
 * @class Paginate
 * @author vungpv93@gmail.com
 * @output
 * {
 *     "items": [],
 *     "meta": {
 *          "page": 5
 *          "size": 10,
 *          "total_items": 100,
 *          "total_pages": 10
 *     }
 * }
 * @usage
 *  return new Paginate(items, totalItems, page, size);
 */
export class Paginate {
  private meta: { page: number; size: number; total_items: number; total_pages: number };

  constructor(
    private items: unknown[],
    private total: number = 0,
    private page: number = 1,
    private size: number = 10,
  ) {
    this.meta = this.initMeta();
    this.delete();
  }

  private initMeta(): { page: number; size: number; total_items: number; total_pages: number } {
    const size = this.size;
    const page = this.page;
    const pages = Math.ceil(this.total / this.size);

    return {
      page,
      size,
      total_items: this.total,
      total_pages: pages,
    };
  }

  private delete(): void {
    delete this.total;
    delete this.page;
    delete this.size;
  }
}
