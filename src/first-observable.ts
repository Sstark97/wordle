import { Observable} from "rxjs"

const observableAlfa$: Observable<number | string> = new Observable(subscriber => {
    subscriber.next("Estoy observando")
    subscriber.next(1)
    subscriber.next(2)
    subscriber.next("Adios")
})

const observer = {
    next: (value: number | string ) => console.log(value),
    complete: () => {},
    error: (error: any) => console.log(error)
}

export {
    observableAlfa$,
    observer
}