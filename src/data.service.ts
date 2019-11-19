import { Subject } from 'rxjs'
import { AssemblyProcess } from './models/AssemblyProcess'
import axios, { AxiosResponse } from 'axios'

class DataService {
  public assemblyProcesses$: Subject<AssemblyProcess[]> = new Subject()

  private baseApiUrl = 'http://localhost:9999'

  public getAssemblyProcesses(nameFilter: string = ''): void {
    axios.get(`${this.baseApiUrl}/assemblyProcesses`)
    .then((response: AxiosResponse) => {
      const result = (Array.isArray(response.data) ? response.data : []).map(AssemblyProcess.build)
      this.assemblyProcesses$.next(result)
    })
  }
}

const dataService = new DataService()

export default dataService