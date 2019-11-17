import { AssemblyStatuses } from '../enums/AssemblyStatuses'
import { ReviewStatuses } from '../enums/ReviewStatuses'

export class AssemblyProcess {
  constructor(
    public readonly _id: string,
    public readonly img: string,
    public readonly assemblyStatus: AssemblyStatuses,
    public readonly reviewStatus: ReviewStatuses,
    public title: string,
    public updatedAt: Date
  ) {}

  public static build(data: any): AssemblyProcess {
    return new AssemblyProcess(
      data._id || '',
      data.img || 'angular.png',
      data.assemblyStatus || '',
      data.reviewStatus || '',
      data.title || '',
      new Date(data.updatedAt)
    )
  }
}