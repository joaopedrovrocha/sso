import { Model, ModelStatic, Op, Transaction } from "sequelize";
import { RepositoryInterface } from "./repository.interface";

export class BaseRepository<Input, Output> implements RepositoryInterface<Input, Output> {
  protected model: ModelStatic<Model>
  protected t: Transaction | undefined

  constructor(model: ModelStatic<Model>) {
    this.model = model
  }

  async getById(id: number): Promise<Output> {
    const response = await this.model.findByPk(id, { raw: true, transaction: this.t || null })

    if (!response) {
      throw new Error(`${this.model.name} not found with id ${id}`)
    }

    return response as Output
  }

  async getAll(filters?: (Partial<Input> & { isDeleted?: boolean | undefined; includeDeleted?: boolean | undefined; }) | undefined): Promise<Output[]> {
    const response = await this.model.findAll({
      raw: true,
      where: {
        ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } })
      },
      ...(filters?.isDeleted || filters?.includeDeleted) && { paranoid: true },
      transaction: this.t || null
    })

    return response as Output[]
  }

  async getByExample(example: Partial<Input>): Promise<Output[]> {
    const response = await this.model.findAll({ where: example, raw: true })

    return response as Output[]
  }

  async create(payload: Input & Omit<any, string>): Promise<Output> {
    return this.model.create(payload, { transaction: this.t || null }) as Output
  }

  async update(id: number, payload: Partial<Input>): Promise<Output> {
    // only to check if model exists
    await this.model.findByPk(id, { transaction: this.t || null })

    await this.model.update(payload, {
      where: { id },
      transaction: this.t || null
    })

    return this.getById(id)
  }

  async deleteById(id: number): Promise<boolean> {
    const deletedCount = await this.model.destroy({ where: { id }, transaction: this.t || null })

    return !!deletedCount
  }

  setTranscation(t: Transaction) {
    this.t = t
  }
}