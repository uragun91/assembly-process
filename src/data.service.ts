import { Subject } from 'rxjs'
import { AssemblyProcess } from './models/AssemblyProcess'
import axios, { AxiosResponse } from 'axios'
import { AssemblyStatuses } from './enums/AssemblyStatuses'
import { ReviewStatuses } from './enums/ReviewStatuses'

class DataService {
  public assemblyProcesses$: Subject<AssemblyProcess[]> = new Subject()
  private baseApiUrl = 'http://localhost:9999'

  public getAssemblyProcesses(
    assemblyStatusFilter: AssemblyStatuses | '' = '',
    reviewStatusFilter: ReviewStatuses | '' = '',
    nameFilter: string = '',
    sortOrder: string = 'asc'
  ): void {
    let url: string = `${this.baseApiUrl}/assemblyProcesses?_sort=updated&_order=${sortOrder}`
    if (assemblyStatusFilter) {
      url += `&assemblyStatus=${assemblyStatusFilter}`
    }
    if (reviewStatusFilter) {
      url += `&reviewStatus=${reviewStatusFilter}`
    }
    if (nameFilter) {
      url += `&title_like=${nameFilter}`
    }
    axios.get(url)
    .then((response: AxiosResponse) => {
      const result = (Array.isArray(response.data) ? response.data : []).map(AssemblyProcess.build)
      this.assemblyProcesses$.next(result)
    })
  }

  public updateAssemblyProcess(item: AssemblyProcess) {
    let url: string = `${this.baseApiUrl}/assemblyProcesses/${item._id}`
    console.log('9789780',item)
    axios.post(url, item)
      .then((response: AxiosResponse) => {
        console.log(response.data)
      })
  }
}

const dataService = new DataService()

export default dataService