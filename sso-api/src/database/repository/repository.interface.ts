export interface RepositoryInterface<Input, Output> {
  getById(id: number): Promise<Output>
  getAll(filters?: Partial<Input> & { isDeleted?: boolean, includeDeleted?: boolean }): Promise<Output[]>
  getByExample(example: Partial<Input>): Promise<Output[]>
  create(payload: Input & Omit<any, string>): Promise<Output>
  update(id: number, payload: Partial<Input>): Promise<Output>
  deleteById(id: number): Promise<boolean>
}