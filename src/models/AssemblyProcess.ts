import { AssemblyStatuses } from '../enums/AssemblyStatuses'
import { ReviewStatuses } from '../enums/ReviewStatuses'

export class AssemblyProcess {
  constructor(
    public readonly _id: string,
    public readonly img: string,
    public readonly assemblyStatus: AssemblyStatuses,
    public readonly reviewStatus: ReviewStatuses,
    public title: string,
    public updated: Date
  ) {}

  public static build(data: any): AssemblyProcess {
    let updated = new Date(data.updated.replace(' ', ''))
    if (isNaN(updated.getTime())) {
      updated = new Date()
    }

    return new AssemblyProcess(
      data._id || '',
      data.img || 'angular.png',
      data.assemblyStatus || '',
      data.reviewStatus || '',
      data.title || '',
      updated
    )
  }
}